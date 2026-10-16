---
name: route-access-audit
description: Audit who can do what in a multi-user or multi-tenant app. Builds a role-by-action access matrix, checks every server route enforces it, and hunts for IDOR, cross-tenant leaks, privilege escalation and limits only enforced in the browser. Use when asked to review permissions, roles, tenancy or authorization, before inviting outside customers into a shared app, or when adding a new route.
---

# Route access audit

Most serious bugs in multi-user apps are not clever exploits. They are a route that forgot to check who is asking, or that checked the role but not whether the record belongs to the caller. This skill finds them by writing down the rules once and testing every route against them.

The browser is not a security boundary. A hidden button, a disabled field or a filtered list proves nothing. Only the check the server runs on every request counts.

## Step 1: Learn the access model

From the code and docs, write down:

- **Who can call the app:** signed-out visitors, signed-in users, admins, service accounts, webhooks, scheduled jobs.
- **How identity is resolved:** session cookie, bearer token, API key, signed URL. Find the one function that turns a request into a user, and note any route that bypasses it.
- **The tenancy unit:** the thing that separates customers' data (company, workspace, team, board, project, organisation). Note how each record links to it (`org_id` column, path prefix, nested document).
- **The roles and where they live:** global roles (owner, staff, support) and per-tenant roles (admin, member, viewer). Note the ranking if roles nest.
- **The written rules:** any role matrix, README, SECURITY.md or AI assistant instructions that say who may do what. These are the claims you will test.

If the app has no written rules, that is the first finding.

## Step 2: List every route

Find every way in. Search for the framework's routing calls and keep going until the list is complete:

- HTTP handlers (`app.get(`, `router.post(`, `export async function GET`, `@app.route`, `url.pathname ===`, `case '/api/`), server actions, GraphQL resolvers, RPC methods.
- Webhooks, file and image routes, export and import endpoints, admin pages, health and debug routes.
- Background jobs, queues, cron handlers and email handlers that act on user data.

Write each one down with its method, path and what it reads or changes.

## Step 3: Write the matrix

Make a table with actions as rows and roles as columns. Use the template in [references/matrix-template.md](references/matrix-template.md). Each cell says **All**, **Own tenant**, **Own records**, **Up to <role>** or **No**.

Group routes into actions people understand ("Invite people", "Edit customers", "Change billing") rather than one row per URL. Put the matrix where developers and AI assistants will read it (the project's instructions file or SECURITY.md), and name the functions that enforce it, so every future route is written against it.

## Step 4: Check every route

For each route, answer these, citing `file:line`:

1. **Authenticated?** Does it resolve the caller before doing anything? Signed-out routes must be deliberate, rate limited by IP or verified by signature, and reveal nothing about whether an account, email or token exists.
2. **Role checked on the server?** Is the caller's role compared with the matrix, not inferred from what the browser sent?
3. **Object-level check (IDOR)?** When the request names a record by id, does the server confirm the record belongs to a tenant the caller can see, for the action asked? Fetching by id alone is the most common hole.
4. **Tenant scoping in every query?** List, search, count, export and autocomplete queries filter by the caller's tenants. Look for queries with no tenant filter at all.
5. **Cross-tenant references?** When a request links two records (assign a ticket to a customer, move an item to a board, attach a file), are both sides checked? A user allowed on tenant A must not link to records in tenant B.
6. **Mass assignment?** Does the server copy request bodies into records wholesale? Strip fields the caller may not set (`role`, `tenant_id`, `owner`, `plan`, `price`, `verified`).
7. **Privilege escalation?** Can a role grant a role higher than its own, change its own access, remove the last owner, or invite into a tenant it doesn't manage? "Admins can invite up to admin" must be enforced in code.
8. **Limits on the server?** Seat counts, plan limits, sending caps and quotas are checked where the action happens, not just greyed out in the UI.
9. **Data in responses?** Responses carry only what that role may see. No other tenants' names, emails, tokens or internal ids in lists, errors or debug output.
10. **Side doors?** Webhooks, jobs, file links and exports apply the same rules, or are deliberately public with unguessable, expiring links.

See [references/common-holes.md](references/common-holes.md) for patterns to search for.

## Step 5: Prove it

Static reading misses things. Set up two tenants with fake data and a user for every role in each, then for every route:

- call it as each role in its own tenant and compare with the matrix;
- call it with record ids from the other tenant;
- call it signed out;
- send extra fields (`role: "owner"`, another `tenant_id`).

Turn these into automated tests where the project has a test suite, so the matrix stays true.

## Step 6: Deliver

1. The access matrix, written where the team and their AI tools will read it.
2. A findings table: route, rule broken, severity (**High**: crosses tenants or escalates; **Medium**: wrong role within a tenant; **Low**: leaks minor detail), evidence, and the fix.
3. The fixes in one reviewable change. Prefer one central check (`canSee(user, record)`, `rank(user, tenant) >= ADMIN`) called by every route over copies of the logic in each handler.
4. A short note to the owner: what was wrong, what is fixed, and any rule in the matrix that needs their decision.
