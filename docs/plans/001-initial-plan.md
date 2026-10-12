# Executive summary

Build a minimal local coding assistant in **Go**, powered by Ollama and `gemma4:2b`.
The focus is on improving answer quality through better context management, focused prompts, and optional test automation—not building an autonomous coding agent.
The result will be a lightweight CLI that helps with everyday development tasks across existing projects.

# Goal

Create a simple, reusable coding assistant that:

- Answers questions using relevant repository context.
- Generates useful code snippets and explanations.
- Helps debug errors using source code and logs.
- Manages context to avoid overwhelming the model.
- Optionally generates tests and verifies code changes.
- Works across projects without requiring complex setup.

# Proposed solution

## 1. Technology stack

| Component | Technology |
|---|---|
| Language | Go |
| LLM runtime | Ollama |
| Model | `gemma4:2b` |
| Model communication | Ollama HTTP API |
| CLI | Cobra or standard Go flags |
| Terminal output | Lip Gloss (optional) |
| Code search | `ripgrep` |
| Configuration | TOML or YAML |
| Session storage | SQLite (optional) |
| Testing | Go testing package |

Keep the application self-contained. Avoid unnecessary frameworks and external services.

## 2. MVP features

### Repository context

- Discover project files.
- Respect `.gitignore`.
- Exclude generated files and dependencies.
- Search code and select relevant sections.
- Support explicit file and line-range selection.

### Context management

- Prioritize relevant code and project instructions.
- Limit the amount of context sent to Ollama.
- Preserve recent conversation history selectively.
- Leave sufficient room for generated responses.

### Coding workflows

- **Ask:** Explain code and answer project questions.
- **Code:** Generate snippets and suggest changes.
- **Debug:** Analyze errors using relevant code and logs.
- **Test (optional):** Generate tests, execute them, and analyze failures.

### Safety

- Do not modify files automatically.
- Display proposed changes before applying them.
- Report actual test results rather than relying on model claims.

## 3. Architecture

    CLI
     |
     v
    Workflow Manager
     |-- Ask
     |-- Code
     |-- Debug
     |-- Test (optional)
     |
     v
    Context Manager
     |-- File discovery
     |-- Code search
     |-- Context selection
     |
     v
    Prompt Builder
     |
     v
    Ollama HTTP Client
     |
     v
    Response Renderer
     |
     v
    Optional Test Runner

## 4. Project structure

    local-coder/
    ├── go.mod
    ├── go.sum
    ├── README.md
    ├── config.toml
    ├── cmd/
    │   └── local-coder/
    │       └── main.go
    ├── internal/
    │   ├── cli/
    │   ├── ollama/
    │   ├── context/
    │   ├── prompts/
    │   ├── workflows/
    │   └── testing/
    └── tests/

Start with fewer packages if that keeps development simpler. Split components as the implementation grows.

## 5. Implementation plan

| Phase | Deliverable |
|---|---|
| 1 | Go CLI connected to Ollama |
| 2 | Repository scanning and code search |
| 3 | Context selection and prompt templates |
| 4 | Ask, code, and debug workflows |
| 5 | Optional test generation and execution |
| 6 | Evaluate on real projects and improve context retrieval |

Evaluate using representative tasks from Python, Go, and Node.js projects. Measure answer correctness, context relevance, code usability, and manual correction required.

# Visuals / diagram

    User request
         |
         v
    Find relevant code
         |
         v
    Build focused context
         |
         v
    Construct prompt
         |
         v
    Ollama / gemma4:2b
         |
         v
    Display answer or snippet
         |
         v
    Optional: Run tests

# No-go

- Autonomous agents and multi-agent orchestration.
- Git history analysis.
- Firecracker or dedicated sandbox infrastructure.
- Vector databases and semantic indexing.
- Automatic code modifications without approval.
- Full IDE integration.
- Premature performance optimization.

**Guiding principle:** Build a small Go application that gets the right context to the model. Improve retrieval and answer quality before adding automation.
