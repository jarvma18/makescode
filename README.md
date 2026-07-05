# Makescode

The makescode is a light-weight agentic cli for local ollama models.
Trying to setup e.g. opencode with local ollama models is daunting task and yet it might not work so reliably.
This project is for those that want to achieve agentic coding workflows efficiently with local light-weight agents.

This is currently ongoing.

## Target Project Structure

```
makescode/
├── src/
│   ├── main.rs              # Entry point and CLI argument parsing (clap integration)
│   ├── cli.rs               # Handles all command-line argument parsing and input validation.
│   ├── api/                 # Module dedicated to Ollama communication
│   │   └── client.rs        # Core functions for making HTTP requests to the Ollama API.
│   ├── agent/               # Module dedicated to agent logic (planning, memory, tool execution)
│   │   ├── planner.rs       # Logic for breaking down tasks and planning steps.
│   │   └── context.rs       # Logic for managing conversation history and state.
│   └── lib.rs               # Public API definitions and utility functions.
├── Cargo.toml               # Project dependencies and configuration.
├── README.md                # The primary documentation (this guide).
├── tests/                   # Directory for all unit and integration tests.
└── .env                     # (Optional) For storing local configurations or secrets.
```
