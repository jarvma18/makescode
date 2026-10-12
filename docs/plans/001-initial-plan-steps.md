## Phase 1: Core Setup and Connection (The Plumbing)

**Goal:** Get a working Go application that can send a simple query to the local Ollama model.

### Step 1.1: Set up the Basic Go Application Structure
*   **Goal:** Create the basic Go project structure (`go.mod`, main entry point, basic CLI flag handling).
*   **Action:** Initialize a new Go module and create a simple `main.go` file that prints "Hello World" when run.
*   **Test:** Run `go run main.go`. Verify that the application compiles and runs without errors.

### Step 1.2: Implement the Ollama Client
*   **Goal:** Write a function that successfully sends a hardcoded prompt to the local `gemma4:2b` model via the Ollama HTTP API.
*   **Action:** Implement the HTTP client logic to send a simple prompt (e.g., "What is the capital of France?") and print the raw response.
*   **Test:** Execute the function. Verify that the application successfully connects to Ollama and returns a valid, non-error response from the model.

### Step 1.3: Create the Basic CLI Interface
*   **Goal:** Create a simple command structure that allows the user to input a query.
*   **Action:** Use Go flags (or Cobra) to allow the user to pass a single string query to the application.
*   **Test:** Run the CLI and provide a query. Verify that the input query is correctly passed to the Ollama client function.

---

## Phase 2: Basic Repository Context (The Retrieval)

**Goal:** Implement the ability to scan a project and retrieve relevant code snippets based on a simple file search.

### Step 2.1: Implement Project File Discovery
*   **Goal:** Write a function that scans the current directory and returns a list of all files.
*   **Action:** Implement a Go function that uses standard library functions (e.g., `filepath.Walk`) to find all files in the current project directory.
*   **Test:** Run the function. Verify that the output list contains all the relevant `.go`, `.txt`, or other project files, and excludes temporary files.

### Step 2.2: Implement Code Search
*   **Goal:** Write a function that searches the discovered files for a specific keyword.
*   **Action:** Implement a function that takes a file path and a search term, and returns the matching lines. *Initially, skip complex `.gitignore` logic.*
*   **Test:** Run the search function. Verify that it correctly identifies and returns lines containing the search term in one of the project files.

### Step 2.3: Integrate Search into the Workflow
*   **Goal:** Combine file discovery and code search to retrieve context before sending the prompt.
*   **Action:** Modify the main workflow to run the file discovery and search functions *before* calling the Ollama client. The search results must be included in the prompt.
*   **Test:** Run a workflow query (e.g., "Explain how function X works") that requires context. Verify that the retrieved code snippets are included in the prompt sent to the model.

---

## Phase 3: Workflow Refinement (The Functionality)

**Goal:** Implement the core user workflows: Ask and Code.

### Step 3.1: Implement the "Ask" Workflow
*   **Goal:** Ensure the system accurately answers general questions using the provided context.
*   **Action:** Define a specific prompt template for "Ask" questions that explicitly instructs the model to answer *only* based on the provided code context.
*   **Test:** Ask a question that is easily answerable from the current project code. Verify that the model's response is accurate and grounded in the project files.

### Step 3.2: Implement the "Code Generation" Workflow
*   **Goal:** Enable the assistant to generate small, useful code snippets.
*   **Action:** Define a prompt template for "Code" requests (e.g., "Generate a function that does X").
*   **Test:** Request a simple, self-contained code snippet. Verify that the model returns valid, syntactically correct code.

### Step 3.3: Implement the "Debug" Workflow (Initial Pass)
*   **Goal:** Start the process of analyzing errors by sending the error message and relevant code.
*   **Action:** Define a prompt template for "Debug" requests. This prompt must include the error log and the surrounding relevant code.
*   **Test:** Simulate a simple error scenario (e.g., a syntax error or a clear logical error) and run the Debug workflow. Verify that the model suggests a plausible fix.

---

## Phase 4: Safety and Output Control (The Polish)

**Goal:** Ensure the application follows safety rules and displays results clearly.

### Step 4.1: Implement Output Filtering
*   **Goal:** Control the response format to make it easier to use (e.g., separating code blocks from explanations).
*   **Action:** Implement post-processing logic to parse the Ollama response and format the output clearly (e.g., using markdown code fences).
*   **Test:** Run a complex generation task. Verify that the output is clean, readable, and properly formatted.

### Step 4.2: Implement Safety Guardrail 1 (No Auto-Modification)
*   **Goal:** Ensure the application never automatically changes files.
*   **Action:** Implement a safety check in the "Code" workflow that prevents the application from executing file write operations unless explicitly confirmed by the user.
*   **Test:** Attempt to run a workflow that involves generating a file modification. Verify that the application prompts the user for confirmation instead of executing the change.

### Step 4.3: Implement Safety Guardrail 2 (Report vs. Claim)
*   **Goal:** Train the model to report facts rather than making false claims.
*   **Action:** Add instructions to the prompt templates that require the model to reference the source code (e.g., "Based on the code provided, state the error," instead of just guessing).
*   **Test:** Ask the model a question where the answer might be ambiguous. Verify that the response points directly to a specific line or file in the context provided.

---

## Phase 5: Optional Feature and Final Evaluation (The Test)

**Goal:** Implement the optional testing workflow and plan for final evaluation.

### Step 5.1: Implement Optional Test Generation
*   **Goal:** Create the mechanism to ask the model to generate unit tests for a given function.
*   **Action:** Define a specific prompt template for "Test" requests. This template must instruct the model to generate tests in a specific format (e.g., Go unit tests).
*   **Test:** Request the generation of tests for a simple function. Verify that the model produces valid, runnable Go test code.

### Step 5.2: Implement Optional Test Execution (Simple)
*   **Goal:** Execute the generated tests and report the result back to the user. (Keep this implementation minimal, relying on Go's `go test` command).
*   **Action:** Write the Go code necessary to write the generated tests to a temporary file, run the external `go test` command, and capture the exit code.
*   **Test:** Run the full Test workflow. Verify that the generated tests are executed and that the reported result accurately reflects success or failure.

### Step 5.3: Final Evaluation Plan
*   **Goal:** Measure the quality of the assistant against real-world tasks.
*   **Action:** Select three simple projects (one Go, one Python, one Node.js). Create five representative tasks for each (Ask, Code, Debug, Test).
*   **Test:** Run the assistant against these tasks. Manually measure: 1) Answer correctness, 2) Context relevance, and 3) Usability of generated code. Document findings for future improvements.
