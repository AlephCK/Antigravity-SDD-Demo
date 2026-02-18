---
title: Project Structure
description: "Explain the project's file and directory structure."
inclusion: always
---

# Project Structure

## Directory Layout
- `.ai-rules/`: Global steering files (product, tech, structure).
- `docs/`: Comprehensive project documentation.
  - `docs/architecture/`: Core architectural documentation.
  - `docs/features/`: Feature-specific independent specifications.
  - `docs/operations/`: Operational guides.
  - `docs/schemas/`: Data schemas.
- `prompts/`: Workflow prompts (planner, executor, steering).
- `.cursor/rules`: Symlink to `.ai-rules/`.
- `.kiro/steering`: Symlink to `.ai-rules/`.

## Conventions
- **Feature Isolation**: Each feature in `docs/features/<feature-name>` must be self-contained within the documentation.
- **Spec-First**: `requirements.md` -> `design.md` -> `tasks.md` sequence must be followed.
