
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** portfolio
- **Date:** 2026-07-16
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 Submit a complete contact message successfully
- **Test Code:** [TC001_Submit_a_complete_contact_message_successfully.py](./TC001_Submit_a_complete_contact_message_successfully.py)
- **Test Error:** TEST FAILURE

Submitting the contact form did not succeed — an error prevented message delivery.

Observations:
- The page produced repeated JavaScript alerts stating "Oops! There was a problem submitting your form" (these alerts were auto-closed).
- The contact form remained visible with the entered values (Name, Email, Subject, Message) after submission.
- No success confirmation or "message sent" notification was displayed.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/79c6924d-a15f-4906-a4e9-0ffe34e23f97/5d6d16a5-30fa-4fcb-af28-91c5779ab4ca
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 Show validation feedback when required contact fields are missing
- **Test Code:** [TC002_Show_validation_feedback_when_required_contact_fields_are_missing.py](./TC002_Show_validation_feedback_when_required_contact_fields_are_missing.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/79c6924d-a15f-4906-a4e9-0ffe34e23f97/72bd4621-0649-4705-b68f-ed6c25924bb2
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 Open a project repository from a project card
- **Test Code:** [TC003_Open_a_project_repository_from_a_project_card.py](./TC003_Open_a_project_repository_from_a_project_card.py)
- **Test Error:** TEST BLOCKED

The test could not be completed because the repository page did not load due to a network/connection error.

Observations:
- Clicking the 'View on GitHub' link opened a new browser tab for the repository URL.
- The new tab displayed "This site can't be reached" with error ERR_CONNECTION_CLOSED (page shows Reload and Details buttons).

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/79c6924d-a15f-4906-a4e9-0ffe34e23f97/31b49e42-1ae3-4b3b-91d7-2e8c51f03d96
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 Open a project demo from a project card
- **Test Code:** [TC004_Open_a_project_demo_from_a_project_card.py](./TC004_Open_a_project_demo_from_a_project_card.py)
- **Test Error:** TEST FAILURE

A live/demo link is not present on the project card or reachable from the card — the feature to open a live demo from the Projects section appears to be missing.

Observations:
- The Newton's Glitch project card (visible under 'Selected Projects') shows a 'View on GitHub' link but no 'Live Demo', 'Demo', 'Launch', or similarly labeled link is visible on the card.
- The project's GitHub repository was opened and README searches for demo-related labels returned no usable live/demo link; repeated attempts to enumerate anchors entered a loop and did not find a demo target.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/79c6924d-a15f-4906-a4e9-0ffe34e23f97/088a8346-d96e-45d3-97ae-4268bf1b4ae7
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 Open a certification credential from a certification card
- **Test Code:** [TC005_Open_a_certification_credential_from_a_certification_card.py](./TC005_Open_a_certification_credential_from_a_certification_card.py)
- **Test Error:** TEST FAILURE

A clickable credential link for the 'Career & Soft Skills Program' certification card could not be found on the Certifications section, so the requested action (open credential link in a new tab) cannot be performed.

Observations:
- The Certifications section and the card titled 'Career & Soft Skills Program' are visible on the page.
- No anchor (<a>) element corresponding to the 'Career & Soft Skills Program' card was present in the visible interactive elements or DOM excerpt near that text.
- Multiple attempts to enumerate page links did not reveal any credential link for this certification card.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/79c6924d-a15f-4906-a4e9-0ffe34e23f97/80d0ed29-c6ee-4fc2-8aa3-997dfc90272d
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 Browse the portfolio sections from top to contact
- **Test Code:** [TC006_Browse_the_portfolio_sections_from_top_to_contact.py](./TC006_Browse_the_portfolio_sections_from_top_to_contact.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/79c6924d-a15f-4906-a4e9-0ffe34e23f97/6c617e4c-6848-4cfe-ac60-db230e2bb5b6
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007 Use the project card hover interaction
- **Test Code:** [TC007_Use_the_project_card_hover_interaction.py](./TC007_Use_the_project_card_hover_interaction.py)
- **Test Error:** TEST BLOCKED

The test could not be run — the automation environment does not provide a reliable way to simulate a mouse hover on the project card without causing navigation.

Observations:
- The 'Selected Projects' section and the "Newton's Glitch" card are visible on the homepage (confirmed in the viewport and screenshot).
- Clicking the project card opens the project's GitHub repository in a new tab (observed previously), so clicking cannot be used to simulate hover.
- No automated mouse-hover action is available in the current toolset, and keyboard focus does not guarantee the same CSS :hover effects.

Recommendation: A human tester should manually hover the "Newton's Glitch" card on the homepage and confirm the visual hover effects (e.g., outline glow, tag highlighting, or any movement/animation). Once a human confirms the visual change, mark the test as PASS. If automation with an actual mouse-move API becomes available, re-run the automated hover verification.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/79c6924d-a15f-4906-a4e9-0ffe34e23f97/9de11efe-25cd-4907-9c3a-d33be76c2700
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008 Use the certification card hover interaction
- **Test Code:** [TC008_Use_the_certification_card_hover_interaction.py](./TC008_Use_the_certification_card_hover_interaction.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/79c6924d-a15f-4906-a4e9-0ffe34e23f97/a7ccf0e5-0b23-4ef2-afec-7ed358e74c35
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009 Reject an invalid email in the contact form
- **Test Code:** [TC009_Reject_an_invalid_email_in_the_contact_form.py](./TC009_Reject_an_invalid_email_in_the_contact_form.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/79c6924d-a15f-4906-a4e9-0ffe34e23f97/75b30854-551f-4680-bb0f-a4596b7539a9
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 Browse content when a certification has no credential link
- **Test Code:** [TC010_Browse_content_when_a_certification_has_no_credential_link.py](./TC010_Browse_content_when_a_certification_has_no_credential_link.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/79c6924d-a15f-4906-a4e9-0ffe34e23f97/9742f386-680c-4cef-9d02-d7803bae70d5
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **50.00** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---