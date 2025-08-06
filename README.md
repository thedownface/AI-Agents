# Resume Parser Agent

This project is an AI-powered Resume Parser Agent built with LangGraph, LangChain, and OpenAI's GPT-4o. It reads resumes in `.txt`, `.pdf`, or `.docx` formats, compares them against a provided job description, and suggests missing skills or courses required for the job.

## Features
- Reads resumes in `.txt`, `.pdf`, or `.docx` formats
- Accepts job descriptions as plain text
- Extracts and analyzes resume content
- Compares resume with job description
- Suggests missing skills or courses
- Handles errors for missing files, unsupported formats, and empty files

## Requirements
- Python 3.8+
- OpenAI API key
- Required Python packages:
  - langgraph
  - langchain-core
  - langchain-openai
  - pymupdf (for PDF parsing)
  - python-docx (for DOCX parsing)

## Installation
1. Clone this repository or copy the files to your local machine.
2. Create and activate a virtual environment:
   ```sh
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```sh
   pip install langgraph langchain-core langchain-openai pymupdf python-docx
   ```

## Usage
1. Place your resume file (e.g., `Faizan khan Resume V3.pdf`) in the project directory.
2. Open the notebook `Resume_parser.ipynb` in VS Code or Jupyter.
3. Set the path to your resume and paste your job description in the provided cells.
4. Run the notebook. The agent will:
   - Load and parse your resume
   - Accept the job description
   - Analyze and compare the resume with the job description
   - Output missing skills or courses required for the job

## Example
```
Resume loaded: Faizan khan Resume V3.pdf
Job description successfully received.
🤖 AI: [AI's analysis and suggestions will appear here]
```

## Error Handling
- If the file is not found, is empty, or is in an unsupported format, the agent will return a clear error message.
- If the job description is not provided, the agent will prompt for it.

## License
This project is for educational and demonstration purposes only.
