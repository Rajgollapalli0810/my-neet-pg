# NEET PG 2026 Demo Exam App

A static HTML, CSS and JavaScript demo exam app for NEET PG 2026 practice.

## Features

- 180 total MCQs.
- 5 locked sections.
- 36 questions per section.
- Strict 42-minute timer for each section.
- Auto-submit when section time ends.
- No access to previous sections after submission.
- Current-section question navigator.
- Save & Next, Mark for Review, Clear Response and Submit Section controls.
- Correct +4, wrong -1, unattempted 0 scoring.
- Final result with total score, correct, wrong, unattempted and section-wise score.
- Sample medical MCQs.
- Video-based question placeholders.
- Mobile-friendly exam layout.

## Preview Locally

From this folder:

```powershell
python -m http.server 4173
```

Open:

```text
http://localhost:4173
```

You can also open `index.html` directly in a browser, but a local server is better for video files.

## Files

- `index.html` - app shell.
- `styles.css` - exam UI styling.
- `data.js` - exam configuration and sample MCQ bank.
- `app.js` - timer, navigation, answer state, section locking and scoring logic.

## Add Real Video Questions

The app already includes video-based questions in each section. Put MP4 files in:

```text
assets/video-cases/
```

Use these names, or update the paths in `data.js`:

```text
respiratory-case.mp4
neuro-gait-case.mp4
obstetric-usg-case.mp4
ecg-monitor-case.mp4
surgery-case.mp4
```

If the files are missing, the question still appears with a poster placeholder.

## Edit Questions

Open `data.js` and edit objects inside:

```js
questionBank: [
```

Each question has:

```js
{
  subject: "Medicine",
  stem: "Question text",
  options: ["Option A", "Option B", "Option C", "Option D"],
  answer: 1,
  explanation: "Short explanation"
}
```

`answer` is zero-based:

- `0` means option A.
- `1` means option B.
- `2` means option C.
- `3` means option D.

The demo generates 180 questions from the sample bank.

## Add To Git

If Git is installed, run:

```powershell
git init
git add index.html styles.css app.js data.js README.md .nojekyll assets
git commit -m "Create NEET PG 2026 demo exam app"
```

Then create a GitHub repository and push:

```powershell
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

## Deploy With GitHub Pages

1. Open the repository on GitHub.
2. Go to `Settings`.
3. Open `Pages`.
4. Select `Deploy from a branch`.
5. Choose branch `main`.
6. Choose folder `/root`.
7. Save.

GitHub will show the live link after the page deploys.
