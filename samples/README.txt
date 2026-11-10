ADVERA CREATIVE — EXCEL/CSV CLEANUP DEMONSTRATION
Self-initiated fictional sample, NOT commissioned client work.
Source: raw_orders.csv, 12 rows × 5 fields.
Output: cleaned_orders.csv, 10 rows × 6 fields (additional review flag).
Change rules approved for this fictional sample:
1. Exact matching WORK_ORDER values WO-101 and WO-104 each occurred twice with identical row values. Kept one instance of each (2 duplicates removed). We would NEVER merge conflicting records solely on similar names without buyer approval.
2. Date formats normalized to ISO YYYY-MM-DD, after explicitly assuming AU DD-MM-YYYY for 03-11-2026 (3 November 2026). Ambiguous dates require client confirmation in real projects.
3. Trimmed whitespace from the Client field of WO-103.
4. Standardized status IN PROGRESS/In progress to In Progress, and Complete to Completed, while preserving New/Pending.
5. Blank status for WO-105 remains BLANK, flagged for human review rather than invented.
6. All source work orders remain accounted for (10 distinct keys).
7. No customer data, real client deliverables or performance claims appear in this sample.

This demonstrates a repeatable output-and-audit workflow. An actual A$49 cleanup is scoped to at most 300 structured rows and 6 columns of existing client-approved source data, with exact-duplicate definitions agreed before production. No customer personally identifying data or sensitive business files should be emailed until access, permissions, and data handling are agreed.

Advera Creative | creativeadvera@gmail.com | https://advera-creative.onrender.com/quick-fixes.html
