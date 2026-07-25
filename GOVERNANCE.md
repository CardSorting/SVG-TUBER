# ⚖️ Project Governance & Decision-Making Model

SVG-TUBER is an open-source project created and maintained by the community. This document outlines the project's governance model, roles, and RFC (Request for Comments) decision-making process.

---

## 👥 Roles & Responsibilities

### Contributors
Anyone who contributes code, documentation, bug reports, or feedback to SVG-TUBER.

### Maintainers
Active project leaders who review Pull Requests, triage issues, manage security releases, and drive technical strategy.

---

## 💡 Technical Decision Process (RFC)

For major architectural changes, engine refactors, breaking API changes, or core feature additions:

1. **Submit an RFC Issue**: Open a GitHub Issue using the `[RFC]` title prefix.
2. **Community Discussion**: Discuss implementation details, performance impact, and zero-allocation compliance.
3. **Approval**: Require approval from at least two core maintainers before merging.

---

## 📦 Release Schedule

SVG-TUBER follows [Semantic Versioning 2.0.0](https://semver.org/):
- **Patch Releases (`v4.0.x`)**: Bug fixes and zero-allocation performance optimizations.
- **Minor Releases (`v4.x.0`)**: New built-in avatars, post-processing shaders, or props.
- **Major Releases (`vX.0.0`)**: Breaking API changes or core architecture upgrades.
