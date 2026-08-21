# Flipbook back-cover verification

## Verified behavior

The repaired static GitHub Pages artifact was opened at the menu route and the dFlip **Goto Last Page** control was used to reach page **12/12**. The visible last sheet was the black-and-gold **Cafe & Bar LUXOR — SPEISEKARTE** cover, not a blank white sheet.

The browser showed only a **Previous Page** control at page 12/12; there was no Next Page control, confirming the flipbook had reached its closed end state. Moving from page 11/12 to 12/12 visibly rendered the hard back cover without an empty trailing sheet.

## Regression safeguards

The source now appends `MENU_BACK_COVER` after the final thank-you page, making the sequence 12 pages long. The automated test suite verifies both the hard-cover option and the even page count.
