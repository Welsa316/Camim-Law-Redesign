"""
`progress.json` is what the client reads. This fails the build if it has
drifted from the proposal or into a state the page cannot render honestly.

It asserts the shape, the allowed status values, that at most one item is in
progress and at most one is next, that `now` points at a real item which is
actually in progress or waiting, and that every item name still matches the
written proposal word for word. The names live here as a frozen copy: the
point of the file is that the client sees the proposal, so a rename has to be
a deliberate edit in two places rather than a drift in one.

    python3 verify/progress.py
"""
import json, pathlib, sys, datetime

ROOT = pathlib.Path(__file__).resolve().parents[2]
SRC = ROOT / "progress.json"

STATUSES = {"done", "in_progress", "next", "planned", "waiting"}
PAYMENT_STATUSES = {"paid", "pending"}

# The proposal, frozen. Phase title -> the item names in their proposal order.
PROPOSAL = {
    "Foundation, home page and about page": [
        "Spanish first, English complete", "The design system", "The home page",
        "The about page", "Bar, footer and phone bar", "Every word traced to a source",
        "Ten checks that run before anything ships", "A private preview",
    ],
    "The rest of the site, and launch": [
        "Fourteen practice-area pages", "The services index",
        "Consultation page and intake form", "Payments page",
        "The statements the Bar rules expect", "Search and existing links",
        "Launch on camimlaw.com",
    ],
    "Video, reviews and conversation": [
        "The eleven Spanish videos", "The broadcast segments", "Transcripts",
        "Google reviews on the site", "Live chat, Spanish first", "Instagram",
    ],
    "Measurement, review and handover": [
        "Analytics", "Search, after launch", "The checks across every page",
        "Every imported fact confirmed", "A design review of the whole site",
        "Handover",
    ],
}


def main() -> int:
    bad: list[str] = []
    try:
        data = json.loads(SRC.read_text())
    except Exception as e:
        print(f"  FAIL progress.json does not parse: {e}")
        print("\nPROGRESS FAILURES: 1")
        return 1

    def iso(v, where):
        try:
            datetime.date.fromisoformat(v)
        except Exception:
            bad.append(f"{where}: '{v}' is not a YYYY-MM-DD date")

    for key in ("updated", "now", "payments", "phases"):
        if key not in data:
            bad.append(f"missing top-level key '{key}'")
    if bad:
        for b in bad: print(f"  FAIL {b}")
        print(f"\nPROGRESS FAILURES: {len(bad)}")
        return 1

    iso(data["updated"], "updated")

    # --- the item list still is the proposal --------------------------------
    titles = [p.get("title") for p in data["phases"]]
    if titles != list(PROPOSAL):
        bad.append(f"phase titles drifted from the proposal: {titles}")
    else:
        for phase in data["phases"]:
            names = [i.get("name") for i in phase["items"]]
            want = PROPOSAL[phase["title"]]
            if names != want:
                for a, b in zip(names, want):
                    if a != b:
                        bad.append(f"phase {phase['id']}: item renamed — '{a}' should be '{b}'")
                if len(names) != len(want):
                    bad.append(f"phase {phase['id']}: {len(names)} items, the proposal has {len(want)}")

    # --- statuses ------------------------------------------------------------
    items = {}
    for phase in data["phases"]:
        for it in phase["items"]:
            if it["id"] in items:
                bad.append(f"duplicate item id '{it['id']}'")
            items[it["id"]] = (phase["id"], it)
            if it.get("status") not in STATUSES:
                bad.append(f"{it['id']}: status '{it.get('status')}' is not one of {sorted(STATUSES)}")
            if it.get("status") == "done" and not it.get("doneOn"):
                bad.append(f"{it['id']}: done without a doneOn date")
            if it.get("doneOn"):
                iso(it["doneOn"], it["id"])
            if it.get("status") == "waiting" and not it.get("note"):
                bad.append(f"{it['id']}: waiting without a note saying what is needed")

    n_prog = [i for i, (_, it) in items.items() if it.get("status") == "in_progress"]
    n_next = [i for i, (_, it) in items.items() if it.get("status") == "next"]
    if len(n_prog) > 1: bad.append(f"{len(n_prog)} items in progress at once: {n_prog}")
    if len(n_next) > 1: bad.append(f"{len(n_next)} items marked next: {n_next}")

    # --- `now` points somewhere real ----------------------------------------
    now = data["now"]
    if now.get("item") not in items:
        bad.append(f"now.item '{now.get('item')}' is not an item in any phase")
    else:
        phase_id, it = items[now["item"]]
        if now.get("phase") != phase_id:
            bad.append(f"now.phase is {now.get('phase')} but '{now['item']}' is in phase {phase_id}")
        if it.get("status") not in ("in_progress", "waiting"):
            bad.append(f"now points at '{now['item']}', which is '{it.get('status')}' rather than in progress")
    if not (now.get("note") or "").strip():
        bad.append("now.note is empty; it is the first thing the client reads")

    # --- payments ------------------------------------------------------------
    for p in data["payments"]:
        if p.get("status") not in PAYMENT_STATUSES:
            bad.append(f"payment {p.get('id')}: status '{p.get('status')}' is not paid or pending")
        if not isinstance(p.get("amount"), (int, float)):
            bad.append(f"payment {p.get('id')}: amount is not a number")

    for b in bad:
        print(f"  FAIL {b}")
    if not bad:
        done = sum(1 for _, it in items.values() if it.get("status") == "done")
        print(f"  OK   {len(items)} items across {len(data['phases'])} phases, {done} done, "
              f"now: {now['item']}")
    print(f"\nPROGRESS FAILURES: {len(bad)}")
    return 1 if bad else 0


sys.exit(main())
