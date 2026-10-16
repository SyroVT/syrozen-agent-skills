# Full site check: the checklist

Work through every section. Each item gets a result, a label and evidence (see SKILL.md).

## 1. Security

1. **Access control.** Every server route checks who the caller is and what they may do, on the server, on every request. If the repo has a role or permission matrix, test every role against every route; if it has none, write one from the code and flag it. Try direct requests with other users' or other accounts' ids (IDOR). Hiding buttons in the browser does not count.
2. **Secrets.** No API key or secret reaches the browser, a URL, a log or the repo. Run a secret scan over the whole git history.
3. **Input and output.** Every input is validated on the server (type, length, format). Everything written into HTML is escaped. Look for XSS, SQL injection, path traversal and open redirects, especially in user-written content, file names and email bodies.
4. **Headers.** Content Security Policy (ideally no inline scripts or styles), HSTS, X-Content-Type-Options, frame protection, Referrer-Policy, Permissions-Policy. Every external domain the CSP allows is still needed and is listed in the privacy notice.
5. **Sign-in.** Passwords or codes are rate limited, codes expire and are single use, password resets are safe, error messages don't reveal whether an account exists, session cookies are HttpOnly, Secure and SameSite, and sign-out ends the session. Offer or require 2FA for admin users.
6. **Public endpoints** (forms, checkout, webhooks, public file links) are rate limited by IP or verified by signature, and reveal nothing beyond what they need.
7. **Payments.** Card details never touch the business's servers (the provider's hosted checkout or elements only). Payment webhooks verify the provider's signature first, check amount and currency, and ignore replays.
8. **Uploads.** Size caps, allowed file types only, dangerous files (scripts, executables) blocked, files served from unguessable links with safe content types.
9. **Email.** SPF, DKIM and DMARC are set for every sending domain; sending limits are enforced to protect the domain's reputation.
10. **Dependencies.** Run the package manager's audit (`npm audit`, `pip-audit` or similar) and check for outdated frameworks with known issues.
11. **Stored data.** Sensitive tokens and personal data are encrypted where it matters; backups exist and have been restored at least once.
12. **Accounts.** 2FA on every admin account for hosting, domain, payment provider, code host, email and form services (ask the owner; don't assume).
13. **Breach plan.** A written plan for who to tell, and how fast, under each country's breach rules that apply.

## 2. Site quality

1. Every page, including sign-in, checkout, error and 404 pages, has the same footer with links to Terms, Privacy (and Cookies, Accessibility and Refunds where they exist), a contact method and the current copyright year.
2. No broken links or images. Every page has a title, description, favicon and link-preview image. A sitemap lists every public page, robots.txt is correct, and private apps are not indexed.
3. Cookies and tracking match what the privacy notice says. List every cookie and every third-party request each page makes. If there are non-essential cookies or analytics, a consent banner is needed where the law requires it (EU/UK, and check the others).
4. Works on phone and desktop, by keyboard only, and with reduced motion. Save screenshots of every page at both widths.
5. Contact and sign-up forms show a short privacy line, work, and the form service's data retention matches the privacy notice.
6. Business details: list any placeholder text, missing name, address or contact details on any page.
7. User-facing text and error messages don't leak technical details (stack traces, server names, internal service names).

## 3. Pricing and payments

1. **Is pricing shown?** List every place a price appears (pricing page, checkout, upgrade screens, invoices, emails). Flag any page where a price is charged but not shown first, and any mismatch between what is shown and what is charged.
2. **Before anyone pays, they must see:** the total price and currency, whether tax (VAT, GST, sales tax) is included, the billing period, that it renews automatically and when, how to cancel, any minimum term, refund and cooling-off rights, and a link to the terms. They actively agree to the terms (an unticked box or clear button wording), and the agreement is recorded with the terms version and date.
3. **Cancellation** is at least as easy as signing up, and works online.
4. **When selling in South Africa:** ECT Act section 43 disclosures and the section 44 cooling-off right for consumers; Consumer Protection Act fixed-term agreement rules (section 14: cancellation on 20 business days' notice, reasonable penalty, renewal notice); VAT registration threshold.
5. **When selling in the US:** the Restore Online Shoppers' Confidence Act (clear terms before billing, express consent, simple cancellation); the FTC's current rules on subscriptions and "click to cancel" (check whether the 2024 rule is in force or was struck down); state automatic renewal laws, especially California's (disclosure next to the pay button, acknowledgment email with cancellation steps, online cancellation, notice before trials convert or prices rise, annual reminders where required); state sales tax on digital services (economic nexus thresholds).
6. **When selling in Australia:** Australian Consumer Law: total price shown up front including unavoidable fees, no misleading "free" or discount claims, clear subscription terms; check the current status of any ban on "subscription traps" or unfair trading practices; GST registration for overseas sellers of digital services to Australian consumers once sales reach the threshold, and GST-inclusive prices for consumers.
7. **When selling in the EU or UK:** prices include VAT for consumers, the 14-day withdrawal right and how it applies to digital services, VAT on digital services (OSS), and the "order with obligation to pay" button wording.

## 4. Terms and conditions

Check the terms against each item and list what is missing.

1. **Everywhere:** who the business is (full legal name, legal form, address, contact, registration number or a statement that there is none), what is sold, prices and payment, renewal and cancellation, refunds, acceptable use, account suspension, limits of liability, governing law and disputes, how the terms change. Liability limits and indemnities must be easy to see.
2. **When selling in South Africa:** ECT Act section 43 details; Consumer Protection Act: plain language, no unfair terms, risky clauses drawn to attention (section 49), no excluding gross negligence.
3. **When selling in the US:** conspicuous warranty disclaimer and liability cap; whether to have an arbitration or class action clause (lawyer's decision); a DMCA notice section and a registered designated agent if users can upload content; no users under 13; sanctions and export wording if needed.
4. **When selling in Australia:** the terms must not exclude or limit the consumer guarantees under the Australian Consumer Law; "no warranty" and liability cap clauses need a carve-out for rights that can't be excluded. Check the unfair contract terms rules (now with penalties) for consumer and small business standard-form contracts: one-sided changes, one-sided termination, broad indemnities and broad exclusions are risky.
5. **When selling in the EU or UK:** consumer rights that can't be excluded, withdrawal right, online dispute information where required.
6. If the business processes its customers' data (for example a CRM, email or SaaS tool), the terms or a data processing agreement cover that role.

## 5. Privacy

Compare the privacy notice with what the code actually does. Every data type, every outside service found in Step 1, every cookie and every country data goes to must be in the notice, and nothing in the notice may be untrue (for example "we don't use cookies" when one is set).

1. **Everywhere:** who is responsible and how to contact them; what is collected and why; the legal reason; every service provider that handles the data; transfers abroad; how long each kind of data is kept (and that the code and services really delete it then); security; people's rights and how to use them; marketing only with the consent the law needs; children; how changes are announced; effective date.
2. **When selling in South Africa (POPIA):** Information Officer named and registered with the Information Regulator; section 72 transfers abroad; section 69 opt-in for electronic marketing; section 22 breach notices; whether a PAIA manual is needed or the business is exempt.
3. **When selling in the US:** California's CalOPPA applies to any site collecting personal information from Californians, whatever its size (categories collected, sharing, how changes are notified, effective date, how the site responds to "Do Not Track"). Check CCPA/CPRA and other state privacy laws and their size thresholds; mark them "Only above a size threshold" unless the business meets one. COPPA if children under 13 could use it. State breach notification laws. CAN-SPAM for marketing email (honest sender and subject, postal address, working unsubscribe honoured within 10 business days). HIPAA if health data is handled.
4. **When selling in Australia:** Privacy Act 1988 and the Australian Privacy Principles; check the small business exemption (turnover threshold) and its current status, as reforms are under way. If the APPs apply: APP 1 policy content (including any new requirement to explain automated decisions; check its start date), APP 5 notice, APP 8 overseas disclosure, access and correction, complaints, and the Notifiable Data Breaches scheme. The statutory tort for serious invasions of privacy applies regardless of size. Spam Act 2003 for commercial email: consent, sender identified, working unsubscribe.
5. **When selling in the EU or UK:** GDPR / UK GDPR: lawful bases, data processing agreements with every processor, transfer safeguards, cookie consent, a representative if required.

## 6. Accessibility

1. Run axe-core (WCAG 2.2 AA) on every page and app screen at phone and desktop widths, then check by hand with keyboard only and a screen reader: focus order and visibility, labels, contrast, error messages, dialogs, and an alternative to any drag-and-drop. Report each issue by page with its fix.
2. An accessibility statement page exists and is accurate: the standard aimed for, an honest conformance claim ("partially conformant" unless an independent audit says otherwise), known gaps, a contact for problems, a reply time the business can keep, and the review date. No accessibility overlay widgets.
3. **When selling in the US:** ADA Title III website claims are common; WCAG 2.1/2.2 AA is the usual benchmark.
4. **When selling in Australia:** the Disability Discrimination Act 1992 covers websites; WCAG 2.2 AA is the benchmark.
5. **When selling in the EU:** the European Accessibility Act applies to many e-commerce and digital services (check the small business exemption).

## 7. Other laws to confirm

- **Marketing claims everywhere:** no claim on the site that reads as a guarantee or can't be backed up (security, uptime, "compliant", "certified", reviews and testimonials must be genuine).
- **South Africa:** Cybercrimes Act duties for electronic communications service providers; Consumer Protection Act marketing rules.
- **US:** FTC Act section 5 (deceptive claims); OFAC sanctions (who can buy); a content policy for user-generated content.
- **Australia:** Online Safety Act 2021 and its industry codes and standards (check whether messaging, email, file sharing or user content features are covered); misleading or deceptive conduct.
- **EU:** Digital Services Act duties if users can post content.
