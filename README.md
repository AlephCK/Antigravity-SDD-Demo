# Spec-Driven Development (Kiro Workflow) Demo

This repository is set up for **Spec-Driven Development** using the Kiro workflow, compatible with Antigravity/Gemini.

## Project Structure
- **`.ai-rules/`**: Global rules (`product.md`, `tech.md`, `structure.md`).
- **`docs/`**: Documentation Source of Truth.
  - `docs/features/`: Feature specs live here.
- **`prompts/`**: The system prompts for the AI personas (`planner.md`, `executor.md`, `steering.md`).
- **`.agent/workflows/`**: Antigravity workflows to automate the process.

## How to Work

### 1. Planning a New Feature
Run the planner workflow to create a detailed spec.
- Command: Ask the agent to "Start planner mode" or "Plan a new feature".
- The agent will guide you through creating `requirements.md` -> `design.md` -> `tasks.md`.

### 2. Executing a Feature
Run the executor workflow to build the feature from the spec.
- Command: Ask the agent to "Start executor mode" or "Execute feature X".
- The agent will read `tasks.md` and implement tasks one by one, writing tests for every step.

### 3. Steering the Project
Update global rules using the Steering Architect.
- Command: Ask the agent to "Update project rules" or use `prompts/steering.md`.

## Key Rules
- **No Mocks**: All integration tests must use real services.
- **Atomic Tasks**: Do one task at a time.
- **Documentation First**: Never write code without a plan in `docs/features/`.
