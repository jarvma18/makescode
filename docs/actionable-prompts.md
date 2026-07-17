# Development Roadmap: Micro-Prompts for Building the LLM CLI Tool (Rust)

The goal is to move sequentially through the phases below. **Do not proceed to the next phase until the tasks in the current phase are demonstrably complete and working.**

## Phase 1: The Core Engine (Connectivity & Plumbing)
**Goal:** Establish a reliable, functional connection between the Rust CLI tool and the Ollama service. This is about proving you can send a request and receive data correctly.

### 🎯 Task Focus: API Interaction and Error Handling
*   **Micro-Prompt 1.1: HTTP Client Setup:** Write the foundational Rust code to establish an asynchronous HTTP client (using `reqwest` or similar) configured to communicate with the local Ollama endpoint. Ensure robust 
error handling for network failures and invalid responses.
*   **Micro-Prompt 1.2: Basic Query Implementation:** Implement a single function that takes a raw prompt string, formats it into the exact JSON payload required by the Ollama API, sends the request, and returns the raw 
response text (without worrying about parsing yet).
*   **Micro-Prompt 1.3: JSON Parsing Test:** Integrate `serde` to successfully parse the raw JSON response from Ollama into a structured Rust struct. Focus only on confirming that you can extract the model's generated text 
successfully.
*   **Micro-Prompt 1.4: CLI Skeleton:** Using `clap`, define the basic command structure (e.g., `mytool generate <prompt>`) and wire it up to execute the core logic from Task 1.2.

---

## Phase 2: Configuration and Interface Polish
**Goal:** Make the tool configurable, user-friendly, and resilient. The focus shifts from "can it talk?" to "can it talk *smartly* and *reliably*."

### 🎯 Task Focus: Setup, Settings, and Usability
*   **Micro-Prompt 2.1: Configuration System:** Implement the logic to read configuration (e.g., default model name, API base URL) from environment variables or a simple local `.toml`/`.yaml` file. Implement sensible 
defaults if no config is found.
*   **Micro-Prompt 2.2: Model Listing Utility:** Create a separate command (`mytool list-models`) that interacts with the Ollama API to fetch and print a list of all locally available models, demonstrating robust model 
discovery.
*   **Micro-Prompt 2.3: Input Validation:** Implement strict input validation for user prompts (e.g., ensuring prompts are not excessively long, or that required fields are present) before sending data to the LLM.
*   **Micro-Prompt 2.4: Simple Output Display:** Refine the CLI output so it clearly presents the model name and the generated text in a readable format.

---

## Phase 3: Performance & UX Optimization (The Rust Advantage)
**Goal:** Leverage Rust's strengths to create an experience that is fast, responsive, and maximizes the utility of context handling, especially crucial for large models like Gemma4.

### 🎯 Task Focus: Speed, Streaming, and Context
*   **Micro-Prompt 3.1: Implement Response Streaming:** Refactor the core API interaction to handle streaming responses. This means reading the response stream chunk by chunk and printing the tokens immediately as they 
arrive, rather than waiting for the full 16k response. (This is a major UX win.)
*   **Micro-Prompt 3.2: Context State Manager:** Design a simple data structure within your application to manage conversation history or multi-part context. Implement logic on how old context is pruned or summarized when 
approaching the model's context limits.
*   **Micro-Prompt 3.3: Optimized Memory Flow:** Review all code for potential bottlenecks related to large string and buffer handling. Ensure data is processed efficiently, minimizing heap allocations and unnecessary copies 
inherent in working with large text data.
*   **Micro-Prompt 3.4: Fine-Tuning the Prompt Layer:** Create a dedicated subsystem for loading and managing advanced prompt templates (e.g., one template optimized specifically for code review prompts) that can be 
dynamically inserted into the main API call payload.

---

## Phase 4: Advanced Functionality (Specialization)
**Goal:** Integrate domain-specific features (Code, Review, etc.) to make the tool a true expert assistant rather than just an API wrapper.

### 🎯 Task Focus: Specialized Tooling and Output Control
*   **Micro-Prompt 4.1: Structured Output Enforcement:** Implement a mechanism (e.g., using Pydantic or custom logic) that attempts to force the LLM response into a predictable structure, such as strict JSON, which is 
essential for automated coding tasks.
*   **Micro-Prompt 4.2: Multi-File Context Loader:** Develop a specific command feature (e.g., `mytool review <file1> <file2>`) that manages reading multiple file contents, properly concatenating them into the context 
window, and feeding this consolidated context to the LLM for cross-reference analysis.
*   **Micro-Prompt 4.3: Context Window Feedback:** Build a diagnostic feature that reports (or warns) the user if the input prompt, combined with the current conversation history, is approaching the model's known context 
limits.

---

## Phase 5: Finalization and Tooling
**Goal:** Polish the tool into a production-ready, delightful CLI experience.

### 🎯 Task Focus: Documentation and Distribution
*   **Micro-Prompt 5.1: Comprehensive Documentation:** Write clear usage examples, setup instructions, and explanations for all commands and configuration options.
*   **Micro-Prompt 5.2: Benchmarking:** Perform basic performance tests to benchmark the latency of your streaming feature versus a standard blocking call, demonstrating the advantage of your design.
*   **Micro-Prompt 5.3: Packaging:** Prepare the final Rust binary for distribution and ensure it runs seamlessly across common operating systems (cross-compilation considerations).
