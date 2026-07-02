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
- Rotating paper modules that change after every reset.
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

The app includes video-based questions in each section. By default, the demo serves small local WebM files in `assets/video-cases/` so the questions work on GitHub Pages without depending on external video hotlinks.

To replace them with your own clips, put MP4 files in:

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

Then update `videoCases` in `data.js`.

If a local file is missing, the question still appears with a poster placeholder.

## Video Sources

The demo video cases use local copies of open Wikimedia Commons media for:

- Lung ultrasound phantom clip.
- Human kidney ultrasound scan.
- Fetal movement ultrasound.

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

## Rotating Question Modules

The app has four paper modules: `Module A`, `Module B`, `Module C`, and `Module D`.

When the user completes the exam and clicks `Reset Demo And Load Next Module`, the app loads the next module. The sections, timer and marking stay the same, but the question sequence and video-question positions change.

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
