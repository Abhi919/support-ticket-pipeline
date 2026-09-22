# UI flows — SUPPORT-2847

## Routes

| Path | Screen |
|------|--------|
| `/` | Ticket list with search + status filter |
| `/new` | Create ticket form |
| `/tickets/:id` | Detail, edit, comments, status actions |

## List page

1. User types in search → debounced GET with `q`
2. User picks status filter → GET with `status`
3. Row click → detail

## Detail page

1. Load ticket by id
2. Edit fields → Save → PUT
3. Allowed status buttons only (derived from current status)
4. Invalid transition → red error banner with API message
5. Add comment → POST → thread refreshes

## Error display

API errors surfaced via `ErrorBanner` — validation field errors concatenated into readable message.
