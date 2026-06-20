# ⚔️ Hunter Tracker – BTech Solo Leveling PWA

Your personal Solo Leveling-style tracker for 4 years of BTech CSE at Acharya, Bangalore.

---

## 🚀 Deploy to Your Phone in 15 Minutes

### Step 1 — Install tools (one time only)
Install [Node.js](https://nodejs.org) (LTS version) and [Git](https://git-scm.com).

### Step 2 — Create a GitHub repo
1. Go to [github.com](https://github.com) → New repository
2. Name it `hunter-tracker`, make it **Public**, click Create
3. Copy the repo URL (e.g. `https://github.com/yourname/hunter-tracker.git`)

### Step 3 — Push the code
Open terminal / command prompt in this folder and run:

```bash
npm install
git init
git add .
git commit -m "Initial commit – Hunter Tracker"
git branch -M main
git remote add origin https://github.com/YOURNAME/hunter-tracker.git
git push -u origin main
```

### Step 4 — Deploy on Vercel (free forever)
1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **Add New Project** → Import your `hunter-tracker` repo
3. Leave all settings as default → Click **Deploy**
4. In ~2 minutes you get a live URL like `https://hunter-tracker-xyz.vercel.app`

### Step 5 — Add to your phone home screen

**Android (Chrome):**
1. Open your Vercel URL in Chrome
2. Tap the 3-dot menu → "Add to Home screen"
3. Done — it opens like a real app!

**iPhone (Safari):**
1. Open your Vercel URL in Safari
2. Tap the Share button → "Add to Home Screen"
3. Done!

---

## 🔄 Updating the app later

Whenever you want to change quests or add features, just edit the code and run:

```bash
git add .
git commit -m "update"
git push
```

Vercel auto-deploys in ~30 seconds. Your phone app updates automatically.

---

## 📁 Project Structure

```
hunter-tracker/
├── public/
│   ├── index.html      # PWA entry point
│   ├── manifest.json   # App name, icons, theme
│   └── sw.js           # Service worker (offline support)
├── src/
│   ├── index.js        # React root
│   └── App.js          # Main tracker app
├── package.json
└── README.md
```

---

## 🧠 How data is saved

Progress is saved in your **browser's localStorage** — it persists across sessions on the same device/browser. If you want data synced across devices in the future, the next step would be adding a free Firebase or Supabase backend.

---

> *Arise.* 🔥
