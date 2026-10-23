# TaskFlow ✨

**A clean, responsive to-do app built with vanilla JavaScript.** TaskFlow helps you capture tasks, set priorities and due dates, track progress, and keep your day organized.

🌐 **Live app:** https://shreebalaji767.github.io/TaskFlow/  
📦 **Repository:** https://github.com/shreebalaji767/TaskFlow

## Features

- **Task management** — add, edit, complete, and delete tasks.
- **Priority levels** — label tasks as high, medium, or low priority.
- **Due dates and times** — set a due date and exact reminder time; overdue tasks are highlighted.
- **Browser notifications** — after you enable notifications, TaskFlow checks due tasks while the app is running and can show one catch-up notification for a task that became overdue within the last 24 hours when you reopen or return to the app. Browser permission is required. Because this is a static, localStorage-only site with no server, notifications cannot be guaranteed while the browser/site is fully closed.
- **Free calendar reminders** — export unfinished tasks with due dates to an `.ics` calendar file. Import it into your calendar app to use that app’s own reminder system; calendar behavior depends on the app and its settings. No TaskFlow account, server, trial, or payment is required.
- **Search and filters** — find tasks and switch between all, active, and completed.
- **Sorting** — organize by newest, oldest, priority, or due date.
- **Progress dashboard** — see total, active, and completed task counts plus a completion bar.
- **Light and dark themes** — choose a comfortable look; the theme preference is saved.
- **Backup and restore** — export tasks as JSON and import a TaskFlow backup to restore your list.
- **Installable PWA** — install TaskFlow on supported browsers and use its cached app shell offline after the first successful load.
- **App icon** — custom SVG favicon and app icon.
- **Keyboard shortcuts** — press `/` to focus search, or `Ctrl+K` (`⌘K` on Mac) to focus search.
- **Responsive design** — works on desktop, tablet, and mobile.
- **No frameworks or build step** — plain browser JavaScript, no package installation required.

## JavaScript-only approach

TaskFlow uses **vanilla JavaScript** to create the app interface and inject its styles at runtime:

- `app.js` creates the page elements, adds styles through a dynamically created `<style>` element, and handles application behavior.
- `index.html` stays minimal, links the favicon and web app manifest, and loads `app.js`.
- `app.js` creates the install and reminder controls, requests notification permission after explaining the limitation, checks due tasks while running, checks for recent missed reminders when reopened, and exports due-dated tasks as an `.ics` calendar file. A static site cannot schedule reliable notifications while the browser/site is fully closed; this would require a background push service.
- `manifest.webmanifest` describes the installable app; `sw.js` caches the app shell for offline loading.
- There is **no separate CSS file** and no frontend framework.

Browsers still use HTML and CSS internally to display a webpage, but you do not need to maintain separate HTML layout or CSS stylesheet files for the app interface.

## Run locally

1. Clone or download this repository.
2. Open `index.html` in a modern browser.

For a smoother development workflow, you can also open the folder in VS Code and use an extension such as Live Server. No build command or dependency installation is required.

## Deploy with GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

1. Open the repository's **Settings → Pages** page.
2. Under **Build and deployment**, set the source to **GitHub Actions**.
3. Push changes to the `main` branch, or manually run the deployment workflow from the **Actions** tab.
4. Wait for the workflow to complete successfully.
5. Open the deployed site over HTTPS, then use **Install app** in TaskFlow or your browser menu when the browser offers installation. On iPhone/iPad, open the site in Safari, tap **Share → Add to Home Screen**.

When deployment succeeds, the website is available at:

**https://shreebalaji767.github.io/TaskFlow/**

## Data and privacy

- Tasks, theme preference, and reminder de-duplication records are saved in your browser using `localStorage`.
- Data stays in that browser on that device; it is **not automatically synced** across browsers or devices.
- Clearing browser site data can remove saved tasks. Use **Export tasks** to download a JSON backup.
- Avoid putting passwords, financial details, medical information, or other sensitive data into task titles.

## Project structure

```text
TaskFlow/
├── index.html                 # Minimal entry point
├── app.js                     # UI generation, injected styles, and app logic
├── favicon.svg                # TaskFlow app icon and favicon
├── manifest.webmanifest       # PWA metadata and install settings
├── sw.js                      # Service worker for app-shell caching
├── README.md                  # Project documentation
└── .github/
    └── workflows/
        └── deploy.yml         # GitHub Pages deployment workflow
```

## Contributing

Ideas and improvements are welcome. For a change, update the relevant JavaScript, test the app in a browser, and confirm that task creation, editing, completion, filtering, theme switching, and persistence still work as expected.

## License

No license has been specified yet. Unless a license is added to this repository, reuse and redistribution are not automatically granted.
