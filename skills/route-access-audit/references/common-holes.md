# Common holes and how to find them

| Hole | What it looks like | Where to look |
| --- | --- | --- |
| Fetch by id, no owner check | `SELECT * FROM tickets WHERE id = ?` with only the id bound | Every query that takes an id from the request |
| List with no tenant filter | `SELECT * FROM customers ORDER BY name` | List, search, autocomplete, export and count routes |
| Trusting the client's tenant | `tenant_id` read from the body or query string and used as-is | Create and move routes |
| Cross-tenant link | Ticket in tenant A saved with `customer_id` from tenant B | Any route that stores another record's id |
| Mass assignment | `Object.assign(record, body)`, `{...body}`, `update(**data)` | Profile, settings and member update routes |
| Role escalation | Admin sets someone to owner; user edits own role | Invite and role-change routes |
| Last owner removed | A tenant left with nobody who can manage it | Role change and leave routes |
| UI-only limit | Seat or plan limit checked in the front end only | Invite, create and send routes |
| Whole-state save | The browser sends everything it can see and the server writes it back | Sync or "save all" endpoints: check each changed record against the caller's rights |
| Account enumeration | "No account with that email" vs "Code sent" | Sign-in, reset and invite routes |
| Leaky errors | Stack traces, SQL, other users' emails in error bodies | Error handlers |
| Guessable public links | Sequential ids or short tokens on file or invoice links | File, image, invoice and order routes |
| Unsigned webhook | Handler acts on the body before checking a signature | Payment, email and integration webhooks |
| Jobs with god mode | Scheduled job acts for a user without re-checking their rights | Cron, queue and email handlers |

## Quick searches

Adjust to the stack. These find candidates, not proof.

```sh
# routes
rg -n "app\.(get|post|put|patch|delete)\(|router\.|export (async )?function (GET|POST|PUT|PATCH|DELETE)|pathname ===|@app\.route" .
# queries by id only
rg -n "WHERE id = \?" .
# body copied into records
rg -n "Object\.assign\([^,]+, *(body|req\.body|data)\)|\.\.\.(body|req\.body)" .
# role fields set from input
rg -n "(role|tenant_?id|org_?id|plan|owner)\s*[:=]\s*(body|req\.body|input|data)\." .
```
