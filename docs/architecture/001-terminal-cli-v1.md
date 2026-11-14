# ARCHITECTURE: LocalAI CLI Platform

## 1. System Topology

```
cli-platform/
├── ollama-connector
├── agent-loader
├── cli-interface
└── main-loop
```

---

## 2. Shared Contracts

- `AgentConfig`: `model_name: string`, `temperature: number`, `max_tokens: number?`
- `OllamaResponse`: `response: string`, `tokens_used: number`
- `Command`: `command: string`, `arguments: { [key: string]: any }`
- `ErrorName`: `MODEL_NOT_FOUND`, `INVALID_COMMAND`, `API_ERROR`

---

## 3. Ordered Work Packets

### Packet 1: ollama-connector

#### [COPY FOR CODER]

- **Purpose:** Establish connection to Ollama API and retrieve model list
- **Dependencies:** None
- **Signatures:** `connect(host: string, port: number) -> boolean`, `list_models() -> [string]`
- **Behavior:**
  - Returns true if connection is successful
  - Returns list of available model names
  - Throws `API_ERROR` on network failures

#### [COPY FOR TESTER]

- **Target Module:** ollama-connector
- **Test Cases:**
  1. Happy path: `connect("localhost", 11434)` -> `true`
  2. Edge case: `list_models()` when no models exist -> empty array

---

### Packet 2: agent-loader

#### [COPY FOR CODER]

- **Purpose:** Load and configure AI agents from Modelfiles
- **Dependencies:** `ollama-connector`
- **Signatures:** `load_agent(config: AgentConfig) -> Agent`, `get_agents() -> [Agent]`
- **Behavior:**
  - Validates model existence via Ollama API
  - Returns configured agent object
  - Throws `MODEL_NOT_FOUND` if model doesn't exist

#### [COPY FOR TESTER]

- **Target Module:** agent-loader
- **Test Cases:**
  1. Happy path: `load_agent({model_name: "test-model"})` -> configured Agent
  2. Edge case: `load_agent({model_name: "nonexistent"})` -> `MODEL_NOT_FOUND`

---

### Packet 3: cli-interface

#### [COPY FOR CODER]

- **Purpose:** Parse user commands and arguments
- **Dependencies:** None
- **Signatures:** `parse_command(input: string) -> Command`, `help_message() -> string`
- **Behavior:**
  - Supports "use AGENT_NAME" and "ask PROMPT" commands
  - Generates help message with available agents
  - Throws `INVALID_COMMAND` for unrecognized syntax

#### [COPY FOR TESTER]

- **Target Module:** cli-interface
- **Test Cases:**
  1. Happy path: `parse_command("ask Hello")` -> {"command": "ask", "arguments": {"prompt": "Hello"}}
  2. Edge case: `parse_command("invalid")` -> `INVALID_COMMAND`

---

### Packet 4: main-loop

#### [COPY FOR CODER]

- **Purpose:** Run CLI main loop and handle agent interactions
- **Dependencies:** `ollama-connector`, `agent-loader`, `cli-interface`
- **Signatures:** `run_cli() -> void`
- **Behavior:**
  - Loads available agents
  - Displays help message
  - Processes commands in loop
  - Handles "exit" command to terminate

#### [COPY FOR TESTER]

- **Target Module:** main-loop
- **Test Cases:**
  1. Happy path: `run_cli()` starts loop and processes "ask Hello" -> returns OllamaResponse
  2. Edge case: `run_cli()` with "exit" command -> terminates loop
