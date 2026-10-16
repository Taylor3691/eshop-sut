# Bug Reports

One Markdown record per defect ID, based on recorded FAIL outcomes in detailed reports or AI-gap execution tables. Observations are separated from requirement classifications that remain uncertain.

- Reports: **28**.
- No test outcomes or screenshots were created in this reporting step.
- AI-gap tables without standalone screenshots retain their recorded textual evidence; screenshot capture is still needed before those findings can be published as GitHub Issues.
- Reports marked for oracle review are not presented as confirmed requirement violations.

| Defect ID | Report | Status |
|---|---|---|
| `D-FR03-MOB-001` | [D-FR03-MOB-001](BUG-D-FR03-MOB-001.md) | Recorded FAIL |
| `D-FR03-MOB-002` | [D-FR03-MOB-002](BUG-D-FR03-MOB-002.md) | Recorded FAIL |
| `D-FR03-MOB-003` | [D-FR03-MOB-003](BUG-D-FR03-MOB-003.md) | Recorded FAIL |
| `D-FR03-MOB-004` | [D-FR03-MOB-004](BUG-D-FR03-MOB-004.md) | Recorded FAIL |
| `D-FR03-MOB-005` | [D-FR03-MOB-005](BUG-D-FR03-MOB-005.md) | Recorded FAIL |
| `D-FR03-MOB-006` | [D-FR03-MOB-006](BUG-D-FR03-MOB-006.md) | Recorded FAIL |
| `DEF-FR03-01` | [DEF-FR03-01](BUG-DEF-FR03-01.md) | Recorded FAIL |
| `DEF-FR03-02` | [DEF-FR03-02](BUG-DEF-FR03-02.md) | Review requirement/oracle |
| `DEF-FR03-03` | [DEF-FR03-03](BUG-DEF-FR03-03.md) | Recorded FAIL |
| `DEF-FR03-04` | [DEF-FR03-04](BUG-DEF-FR03-04.md) | Recorded FAIL |
| `DEF-FR03-05` | [DEF-FR03-05](BUG-DEF-FR03-05.md) | Recorded FAIL |
| `DEF-FR03-06` | [DEF-FR03-06](BUG-DEF-FR03-06.md) | Recorded FAIL |
| `DEF-FR03-07` | [DEF-FR03-07](BUG-DEF-FR03-07.md) | Recorded FAIL |
| `DEF-FR03-08` | [DEF-FR03-08](BUG-DEF-FR03-08.md) | Recorded FAIL |
| `DEF-FR03-09` | [DEF-FR03-09](BUG-DEF-FR03-09.md) | Recorded FAIL |
| `DEF-FR03-10` | [DEF-FR03-10](BUG-DEF-FR03-10.md) | Recorded FAIL |
| `DEF-FR03-11` | [DEF-FR03-11](BUG-DEF-FR03-11.md) | Recorded FAIL |
| `DEF-FR09-01` | [DEF-FR09-01](BUG-DEF-FR09-01.md) | Recorded FAIL |
| `DEF-FR09-02` | [DEF-FR09-02](BUG-DEF-FR09-02.md) | Recorded FAIL |
| `DEF-FR09-03` | [DEF-FR09-03](BUG-DEF-FR09-03.md) | Recorded FAIL |
| `DEF-FR09-04` | [DEF-FR09-04](BUG-DEF-FR09-04.md) | Recorded FAIL |
| `DEF-FR09-05` | [DEF-FR09-05](BUG-DEF-FR09-05.md) | Recorded FAIL |
| `DEF-FR14-01` | [DEF-FR14-01](BUG-DEF-FR14-01.md) | Recorded FAIL |
| `DEF-FR14-02` | [DEF-FR14-02](BUG-DEF-FR14-02.md) | Recorded FAIL |
| `DEF-FR14-03` | [DEF-FR14-03](BUG-DEF-FR14-03.md) | Review requirement/oracle |
| `DEF-FR14-04` | [DEF-FR14-04](BUG-DEF-FR14-04.md) | Review requirement/oracle |
| `DEF-FR14-05` | [DEF-FR14-05](BUG-DEF-FR14-05.md) | Review requirement/oracle |
| `DEF-FR14-06` | [DEF-FR14-06](BUG-DEF-FR14-06.md) | Review requirement/oracle |

## Classification conflicts and limitations

- FR-03 `DEF-FR03-02` assumes HTML5 email validation; its source report says the requirement does not explicitly require that input type. Review the oracle before confirming this as a bug.
- FR-14 `DEF-FR14-03` expects a 404 for an unknown ID, and `DEF-FR14-05` expects deletion to be blocked when products refer to a category. The source requirement material does not clearly define these rules; review before confirming.
- FR-14 `DEF-FR14-04` (empty form validation) and `DEF-FR14-06` (duplicate names) are recorded failures, but confirm the feature oracle supports the expected behavior before classifying them as specification defects.
- FR-14 AI-gap references were aligned to the detailed catalog: orphaned category -> `DEF-FR14-05`, duplicate name -> `DEF-FR14-06`, empty form -> `DEF-FR14-04`. Test IDs and outcomes were preserved.
- Existing GitHub Issue links in older reports were not treated as proof that an Issue still exists or is current. Check for duplicates and attach screenshots before publishing.
