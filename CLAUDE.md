## Client progress page

`progress.json` at the repo root is the source of truth for the client-facing `/progress` page. The client reads it. Treat every edit to it as something Juan will see.

Rules:

1. The item list mirrors the written proposal. Never add, remove, rename, reorder, or merge items. If scope changes, Walid edits the file by hand. You do not.
2. When you finish an item that is listed there: set its `status` to `done`, set `doneOn` to today's date, and update `updated`. If the item you finished was the `now` item, pick the next item in proposal order that is `planned` or `next`, set it to `next`, and update `now`. Do this in the same commit as the work, with a commit message that starts with `progress:` and names the item.
3. When you start work on an item: set it to `in_progress`, set `now` to it, write a one-sentence `note` about what is happening, and update `updated`. Only one item may be `in_progress` at a time.
4. If an item is blocked on something from the client (wording, a decision, a file): set it to `waiting`, put what is needed in `note`, and move `now` to the next item you can actually work on. The note must be one plain sentence, nothing the client did wrong, no technical detail.
5. Do not mark an item `done` until the pre-ship checks pass on it. Built but unchecked is `in_progress`.
6. Never touch `payments`. Walid updates payment status manually.
7. Notes are read by the client. Plain English, one sentence, no file names, no branch names, no jargon.
8. Run the progress schema check before committing. If it fails, fix the JSON, do not skip the check.
9. `/progress` is preview-only. Never add a link to it from a production page, never remove the noindex, never ship `progress.json` in a production bundle.
