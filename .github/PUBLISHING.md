# Chrome Extension Publishing & Release Automation Guide

This repository includes automated CI/CD pipelines via GitHub Actions to build, test, create GitHub Releases, and submit updates to the Chrome Web Store.

---

## 🚀 How to Create a New Release

1. **Update Version**: Ensure `version` in `package.json` is updated (e.g., `1.0.2`).
2. **Commit & Tag**:
   ```bash
   git add package.json
   git commit -m "chore: bump version to 1.0.2"
   git tag v1.0.2
   git push origin main --tags
   ```
3. **Automated Pipeline**:
   Pushing the `v*` tag triggers [`.github/workflows/release.yml`](workflows/release.yml) which will:
   - Run type checks and tests.
   - Package the extension into `.output/youtube-aspect-ratio-changer-*-chrome.zip`.
   - Create a GitHub Release with auto-generated release notes and the `.zip` attached.
   - Automatically submit the update to the Chrome Web Store for review.

---

## 🔑 Chrome Web Store API Setup

To enable automated uploads to the Chrome Web Store, add the required secrets in **GitHub Repository → Settings → Secrets and variables → Actions**.

### Extension ID Secret
- `CHROME_EXTENSION_ID`: `iliinafimaknnhelpmjaochndmjlolla`

---

### Option A: Google Cloud Service Account (API v2 - Recommended)

Google Cloud Service Accounts provide secure, non-expiring server-to-server authorization.

#### 1. Obtain your Publisher ID
1. Open the [Chrome Web Store Developer Dashboard](https://chromewebstore.google.com/devconsole).
2. Check your browser address bar:
   `https://chromewebstore.google.com/developer/dashboard/<PUBLISHER_ID>`
3. Copy the string of characters after `/dashboard/` — this is your `CHROME_PUBLISHER_ID`.

#### 2. Create a Service Account in Google Cloud Console
1. Navigate to the [Google Cloud Console](https://console.cloud.google.com/).
2. Select your project (or create a new one, e.g. `chrome-extensions-publisher`).
3. Go to **APIs & Services → Library** → Search for **Chrome Web Store API** → Click **Enable**.
4. Go to **IAM & Admin → Service Accounts** → Click **Create Service Account**.
   - Name: `cws-publisher`
   - Role: Project Viewer (or default)
   - Click **Done**.
5. Select the newly created service account → Go to the **Keys** tab.
6. Click **Add Key → Create new key → JSON** and download the key file.

#### 3. Authorize Service Account in Chrome Developer Dashboard
1. Go to [Chrome Developer Dashboard](https://chromewebstore.google.com/devconsole) → **Account** tab → **Management Permissions** (or **Developer Access**).
2. Add the Service Account's email (found in the JSON key as `client_email`, e.g. `cws-publisher@<project>.iam.gserviceaccount.com`).
3. Grant permission to publish and manage extensions.

#### 4. Add GitHub Repository Secrets
From your downloaded JSON key file, add these repository secrets:
- `CHROME_PUBLISHER_ID`: Your publisher ID from Step 1.
- `CHROME_SERVICE_ACCOUNT_CLIENT_EMAIL`: The `client_email` field in the JSON file.
- `CHROME_SERVICE_ACCOUNT_PRIVATE_KEY`: The entire `private_key` string (including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`).

---

### Option B: OAuth 2.0 Credentials (API v1.1 - Alternative)

If you prefer using classic OAuth 2.0 refresh tokens:
1. In Google Cloud Console, create an **OAuth 2.0 Client ID** (Desktop app / Web application).
2. Run WXT's interactive credential wizard locally:
   ```bash
   npx wxt submit init
   ```
3. Set the following secrets in GitHub Repository Settings:
   - `CHROME_CLIENT_ID`
   - `CHROME_CLIENT_SECRET`
   - `CHROME_REFRESH_TOKEN`

---

## 🧪 Testing with Dry Run

You can test your release workflow without publishing to users:
1. Go to **Actions → Release & Publish** in your GitHub repository.
2. Click **Run workflow**.
3. Check the **Dry run** checkbox.
4. The workflow will validate your credentials against Google's API without submitting the extension for store review.
