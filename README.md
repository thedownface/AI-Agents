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

---

# For Tahura — Romantic Next.js Experience 💌

A beautiful, animated single-page Next.js experience deployed on Vercel, created as a heartfelt, apologetic romantic message for Tahura.

## Features

- 🎨 **Awwwards-style design** — white background, red love-themed accents, Great Vibes flirty font
- 💎 **3D animated heart** — built with Three.js via `@react-three/fiber` + `@react-three/drei`
- 💖 **Floating heart particles** — lightweight canvas-based animation
- 📖 **7-step story flow** — smooth Framer Motion transitions between scenes
- 🎵 **YouTube song embed** — "Tujhe Kitna Chahne Lage" by Arijit Singh
- ✍️ **Original Urdu shayari** dedicated to Tahura
- 📱 **Fully responsive** — works beautifully on mobile and desktop

## Story Flow

1. **Splash** — 3D heart + name reveal with shimmer effect
2. **Hello** — Gentle intro, inviting her to read
3. **You** — Celebrating her beauty inside and out
4. **Gift** — The "Taj Mahal in code" message
5. **Sorry** — Sincere apology; explicitly says she is NOT irritating and NOT delusional
6. **Us** — Romantic declaration of feelings
7. **Shayari** — Original Urdu poetry dedicated to Tahura
8. **Song** — Embedded YouTube song + sign-off

## Running Locally

```bash
cd for-tahura
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploying to Vercel

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/thedownface/AI-Agents&root=for-tahura)

### Manual deploy

1. Install the [Vercel CLI](https://vercel.com/docs/cli): `npm i -g vercel`
2. From the `for-tahura` directory:
   ```bash
   vercel --prod
   ```
3. Set the **Root Directory** to `for-tahura` in the Vercel project settings.

The app will be live at your Vercel URL (e.g. `https://for-tahura.vercel.app`).

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 16 (App Router) | Framework |
| Tailwind CSS v4 | Styling |
| Three.js + @react-three/fiber | 3D heart scene |
| @react-three/drei | Float + MeshDistortMaterial helpers |
| Framer Motion | Page transitions |
| HTML Canvas | Floating heart particles |
| Google Fonts (Great Vibes + Lato) | Typography |
