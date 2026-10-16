---
name: full-site-check
description: Run a full security, legal, privacy, pricing, accessibility and site-quality check of a business's website and apps, fix what is safe, and hand the owner one list of actions and questions. Use when asked to audit, review or "check everything" before launch, before taking payments, or on a schedule. Covers South Africa, the US, Australia, the EU and the UK, and works with any host, payment provider or framework.
---

# Full site check

A repeatable audit of a business's websites and apps: security, site quality, pricing and payments, terms, privacy, accessibility and other laws. It finds problems, fixes the safe ones in one reviewable change, and gives the owner a single message with everything they must do themselves.

This is a checklist, not legal advice. Say so in the report. A lawyer should review the terms, the privacy notice and anything marked **Needs a lawyer**.

## Step 1: Find out what exists

Before checking anything, build a picture of the business from the code, config, docs and any project notes you can read. Record each answer with where you found it:

- Every website, subdomain and app in scope, and every page or screen (including sign-in, checkout, error and 404 pages).
- Who the business is: name, legal form, country, contact details, as shown on the site.
- Every outside service the product uses: hosting and CDN, database and file storage, email sending and receiving, sign-in or identity, payment provider, contact forms, analytics, error tracking, fonts, maps, AI or other APIs. Look in code, config files, environment variable names, DNS hints, CSP headers and package files.
- What personal data is collected, where it is stored, and for how long.
- What is sold, at what price, in which currency, how billing works (one-off, subscription, auto-renewal, free trial), and where prices are shown.
- Which countries the business sells to or markets to (currency, language, tax settings, payment methods, wording on the site).
- Existing legal pages (terms, privacy, cookies, accessibility, refunds) and existing security or access rules (README, SECURITY.md, contributing guide, AI assistant instructions file, role matrix).

Anything you cannot find goes on the question list at the end. Do not guess it.

## How to work

- **Work with the tools you have.** If you can't read the code, run commands, open a browser, browse the web or edit files, say which checks that limits at the start of the report. Check what you can from what the owner pastes or uploads, and give them exact steps to collect the rest. Mark anything you couldn't check as **Not checked** with the reason, never as Pass.
- **Verify every claim.** Each result needs evidence: a `file:line`, a command and its output, a screenshot, or a source URL with the date you checked it. Never write "compliant" without evidence.
- **Check the law is current.** Laws, thresholds and court rulings change. For every law in the checklist, confirm on official government or regulator sites that it is still in force and what it requires now. Record the source and date. If the checklist is out of date, follow the current law and note the difference.
- **Test it running.** Run the site and apps locally or on a preview and test them in a real browser at 320 px and 1280 px wide. Use fake sample data only. Never make live payments, change production settings or touch real secrets; use the payment provider's test mode or a mock.
- **Fix what is safe** in one reviewable change (a draft pull request, or a list of exact edits), following the project's conventions. Do not change the legal meaning of terms or a privacy notice yourself: draft the wording and list it for the owner and their lawyer.
- **Label when each rule applies:** **Applies now** (home country and anything already live), **When selling in the US**, **When selling in Australia**, **When selling in South Africa**, **When selling in the EU or UK**, or **Only above a size threshold** (say which). A country's rules apply once the business markets to, takes payment from, or holds data about people there. If the home country isn't one of these, check that country's equivalents (privacy, consumer protection, e-commerce disclosures, accessibility, spam, tax).

## Step 2: Work through the checklist

Read [references/checklist.md](references/checklist.md) and work through every section:

1. Security (access control, secrets, input and output, headers, sign-in, public endpoints, payments, uploads, email, dependencies, stored data, admin accounts, breach plan)
2. Site quality (footers, links, metadata, cookies, devices and keyboard, forms, business details, error messages)
3. Pricing and payments (what must be shown before paying, cancellation, country rules)
4. Terms and conditions
5. Privacy (compare the notice with what the code really does)
6. Accessibility (WCAG 2.2 AA, statement page)
7. Other laws to confirm

Do not skip a section because it was checked before: things change.

## Step 3: Deliver

1. **A dated report file** with one table per section: item, label, result (**Pass**, **Fixed**, **Needs the owner**, **Needs a lawyer**, **Not applicable yet**, **Not checked**), evidence, and the fix or exact next step. Include the source and date for each law you confirmed.
2. **The safe fixes** as one reviewable change.
3. **Proposed wording** for any terms, privacy or accessibility changes, kept separate for the owner and their lawyer to approve.
4. **One message to the owner** that:
   - leads with **every action they must take themselves**, in one list (add missing business details, register with a regulator, turn on 2FA, add DNS records, confirm prices, book a lawyer review);
   - then gives **the questions you could not answer from the code**, each answerable in a word or a short line, with your best guess where you have one. Ask at least these when the answer wasn't found: full legal business name and legal form; registration number (or none); physical and postal address; contact email and phone for customers, privacy and accessibility; countries they sell to now and plan to; rough annual turnover band and number of customers (for size thresholds); VAT, GST or sales tax registrations; payment provider and whether it accepts foreign cards; prices, billing periods, trials and refund policy; services in use that aren't visible in the code; whether children could use the product; whether health, financial or other sensitive data is handled; who handles security incidents; whether 2FA is on for every admin account;
   - ends with a short summary of what was fixed and what is still open, and says plainly that the report is not legal advice.
5. **Once the owner answers**, update the report, the legal drafts and the fixes, and save the confirmed facts wherever the project keeps notes, so the next check starts from them.

## Using it without a skills-aware tool

Any AI assistant can run this check. Paste this file, then the checklist file, into the chat and ask it to start with Step 1.
