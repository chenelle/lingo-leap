# Customer Acquisition Paths — Lingoleap

There are **three ways** a visitor can become a lead. Each path ends with the person's email being captured and added to Sender.net.

---

## Path 1 — Hero CTA Button (Direct)

> **Who it catches:** Motivated visitors who arrive ready to act.

1. Visitor lands on the homepage
2. Clicks **"Take Free Quiz 🎯"** in the hero section
3. Goes straight to `free-quiz.html`
4. Answers 5 questions (grammar, vocabulary, reading)
5. Quiz complete → **email gate modal** appears: *"Enter your email to see your Band Score"*
6. Email submitted → added to Sender.net (`SENDER_GROUP_ID`) → redirected to `quiz-results.html`

**Best for:** High-intent visitors who already know they want the quiz.

---

## Path 2 — 75% Scroll Popup (Engagement-Based)

> **Who it catches:** Visitors who are reading and exploring but haven't clicked anything yet.

1. Visitor scrolls down through the landing page
2. At **75% scroll depth**, a popup appears: *"Don't leave empty handed!"*
3. Visitor enters name + email directly in the popup form
4. Email submitted → added to Sender.net (`SENDER_NEWSLETTER_GROUP_ID`)
5. A quiz link is sent to their inbox (no redirect, stays on the page)

**Best for:** Curious browsers who need a nudge before they bounce.

---

## Path 3 — Footer Newsletter Form (Passive)

> **Who it catches:** Visitors who scrolled all the way to the bottom — high-intent but cautious.

1. Visitor reaches the footer and sees the **"Free English Evaluation"** form
2. Enters name + email
3. Email submitted → added to Sender.net (`SENDER_NEWSLETTER_GROUP_ID`)
4. A quiz link is sent to their inbox

**Best for:** Thorough visitors who read everything before committing.

---

## Summary

| Path | Trigger | Email goes to | Quiz delivery |
|---|---|---|---|
| **Hero CTA** | Click "Take Free Quiz" | `SENDER_GROUP_ID` | Immediate (on-site) |
| **Scroll Popup** | 75% page scroll | `SENDER_NEWSLETTER_GROUP_ID` | Via email |
| **Footer Form** | Scrolled to bottom | `SENDER_NEWSLETTER_GROUP_ID` | Via email |

---

## Key Difference Between the Groups

- **`SENDER_GROUP_ID`** — Quiz completers. These people *finished* the quiz and saw their band score. They are warm leads who have already experienced the product.
- **`SENDER_NEWSLETTER_GROUP_ID`** — Newsletter subscribers. These people gave their email in exchange for the quiz link. They are interested but haven't taken the quiz yet. They need a welcome + quiz delivery email to move them forward.
