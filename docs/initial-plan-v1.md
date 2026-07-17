
## Initial Plan: Phase 1 - The Core Engine (Minimum Viable Product)

The goal of Phase 1 is to establish a robust pipeline that can successfully send a prompt to Ollama and return the result via the CLI, regardless of how simple the output is.

### Step 1: Define the Communication Protocol (The Bridge)
Before writing any complex logic, you need to know exactly how your tool will talk to Ollama.

*   **Action:** Study the Ollama API documentation (or how it exposes the local service). You will likely be interacting with a standard HTTP request structure.
*   **Focus:** Identify the endpoints required for:
    1.  Listing models.
    2.  Generating text (the main interaction).
*   **Rust Focus:** Start prototyping the HTTP client setup using a robust crate like `reqwest` (async) or potentially focusing on raw TCP/WebSocket if you choose to interact more directly with the Ollama server, although 
the HTTP API is usually easiest to start with.

### Step 2: Implement Basic Ollama Interaction
Build the simplest possible functional module that proves you can get a response.

*   **Action:** Create a simple command (e.g., `mytool generate "Hello world"`) that correctly formats the input, sends it via HTTP to your running Ollama instance, and parses the raw JSON response from the server.
*   **Focus:** Master prompt engineering within the context of the API request structure. How do you package your CLI input into the format the LLM expects?

### Step 3: Handle Configuration (Setup)
A good CLI needs to know where to look for models and settings.

*   **Action:** Implement logic to read configuration from a standard source (e.g., environment variables, or a local config file like `~/.mytoolrc`).
*   **Focus:** Store crucial settings: the default model name (`gemma4:e2b-16k`), potential API keys (if applicable), and default context handling parameters.

### Step 4: Build the Basic CLI Interface (I/O)
Create the command-line wrapper for your core logic.

*   **Action:** Use a Rust CLI library (like `clap` or `structopt`) to define your commands, arguments, and flags clearly.
*   **Focus:** Ensure the tool is easy to use. Define clear commands like:
    *   `mytool generate <prompt>`
    *   `mytool chat <session_id>`
    *   `mytool list-models`

---

## Phase 2 - Optimization and Feature Expansion

Once you have a working end-to-end connection, you focus on the performance and unique features that make your tool better than just calling Ollama directly.

### Step 5: Performance Deep Dive (Rust Optimization)
Leverage Rust to squeeze out maximum efficiency, especially given the model size constraints.

*   **Action:** Focus heavily on efficient memory management and asynchronous I/O. Since you are dealing with potentially large text responses (16k context), focus on **streaming**.
*   **Focus Areas:**
    *   **Streaming Responses:** Implement handling of LLM streaming responses (token by token) to give the user immediate feedback, rather than waiting for the entire 16k response. This is a massive UX win.
    *   **Zero-Copy Principles:** Ensure you are reading and processing data in an efficient way without unnecessary memory copies. Use Rust's strong type system to manage buffers.

### Step 6: Context Management (The Specialty Feature)
This is where your tool distinguishes itself from generic Ollama wrappers.

*   **Action:** Build specific logic for managing the context window. Since you are working with a constrained model size, explore strategies for optimizing prompts and managing conversational history to stay within the 
limits efficiently.
*   **Focus:** Implement logic that handles conversation state (e.g., if it’s a chat tool) and how history is included in subsequent prompts.

### Step 7: Advanced Features (The "Code" Assistant Layer)
Now, layer on the specific functionality you want to deliver (coding/review).

*   **Action:** Implement features like multi-file processing, code block handling (Markdown/ReStructuredText parsing), and structured output prompting (e.g., forcing the model to return JSON for structured data).
*   **Focus:** Create specialized prompt templates that are optimized for coding tasks. For example: "You are an expert Rust programmer. Review the following code and suggest improvements..."

---

## Summary Checklist & Key Considerations

| Priority | Area of Focus | Why it Matters | Recommended Rust/Tooling |
| :--- | :--- | :--- | :--- |
| **1 (MVP)** | Ollama API Bridge | Establishes core functionality. | `reqwest` (async), JSON serialization (`serde`). |
| **2** | CLI Interface | Makes the tool usable and discoverable. | `clap` for robust argument parsing. |
| **3** | Streaming I/O | Essential for good UX with large models. | Async Rust, careful use of streams (`tokio::io`). |
| **4** | Configuration | Enables flexible local operation. | `config` or simple file I/O. |
| **5** | Performance Tuning | Ensures the tool feels snappy and fast (Rust's strength). | Zero-cost abstractions, efficient memory use. |

### 💡 Key Takeaway for Gemma:e2b-16k Context Management

Since you are constrained by a 16k context window, don't try to force it into a generic chat UI immediately. Focus on applications where context management is critical:

1.  **Code Review:** Inputting multiple files and asking for cross-file dependencies analysis (requires sophisticated prompt packing).
2.  **Refactoring:** Providing large blocks of code and asking the model to refactor based on specific style guides or architectural constraints.
3.  **Structured Output:** Using tools like Pydantic/Serde in Rust to force the LLM output into strict JSON formats, which is highly predictable and useful for automated coding tasks.
