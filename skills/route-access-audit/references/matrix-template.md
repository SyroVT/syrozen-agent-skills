# Access matrix template

Copy this into the project's instructions file (for example `CLAUDE.md`, `AGENTS.md` or `SECURITY.md`) and fill it in. Rename the roles to match the app.

## Roles

- **Owner**: runs the whole service (your company). Who counts as an owner, and where that is configured.
- **Staff**: your team members. Say what they can't do that an owner can (billing, licensing).
- **Tenant owner** > **Tenant admin** > **Member** > **Viewer**: customer roles, set per tenant.
- Anyone else gets 403.

## Matrix

| Action | Owner | Staff | Tenant owner | Tenant admin | Member | Viewer |
| --- | --- | --- | --- | --- | --- | --- |
| See records | All | All | Own tenant | Own tenant | Own tenant | Own tenant |
| Create and edit records | All | All | Own tenant | Own tenant | Own tenant | No |
| Delete records | All | All | Own tenant | Own tenant | Own records | No |
| Settings and automations | All | All | Own tenant | Own tenant | No | No |
| Invite people, set roles | All | All | Own tenant, any role | Own tenant, up to admin | No | No |
| Change anyone's access, including their own | Yes | Yes | No | No | No | No |
| Connect outside accounts (email, calendar) | All | All | Own tenant | Own tenant | No | No |
| Billing and plan | All | No | Own tenant | No | No | No |
| Invite past the plan's seat limit | Yes | Yes | No (403) | No (403) | No | No |
| Export all data | All | All | Own tenant | No | No | No |

## Enforced by

Name the server functions that make these checks, so every new route uses them. For example:

- `currentUser(request)`: resolves the caller or returns 401.
- `rankIn(user, tenantId)`: 0 none, 1 viewer, 2 member, 3 admin, 4 tenant owner.
- `canSee(user, record)`: loads the record's tenant and checks rank ≥ 1.

## Public, no sign-in

List every route that works signed out, and how it is protected (rate limit, signature, unguessable expiring link).
