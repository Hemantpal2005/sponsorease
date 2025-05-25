# 📦 Sponsorease

**Sponsorease** is a sponsorship platform to help event organizers find suitable sponsors online. Built with Node.js, Express, HTML/CSS, and JSON storage.

---

## 🚀 Getting Started

### 1. Clone or Open the Project in VS Code
Make sure all your project files are inside one folder (e.g., `sponsorease`).

### 2. Open the Terminal
In VS Code:
- Go to `Terminal` → `New Terminal`
- You’ll see a terminal open at the bottom

### 3. Install Required Packages
Paste the following into your terminal:

```bash
npm install express body-parser express-session
```

This installs the backend packages needed to run the site.

### 4. Run the Server
Start the backend server with:

```bash
node server.js
```

You’ll see:
```
Sponsorease running on http://localhost:3000
```

### 5. Open the Website
Open your browser and go to:
```
http://localhost:3000
```
✅ You now have a fully working sponsorship website!

---

## ⚠️ Important Notes
- Do **not use “Go Live”** (VS Code Live Server) — it **only runs HTML**, not the backend.
- To submit forms, handle logins, and store data, you must run `node server.js`.

---

## 📂 Project Structure

```
/sponsorease
├── public/
│   ├── index.html
│   ├── login.html
│   ├── user-request.html
│   ├── sponsor-request.html
│   ├── user-dashboard.html
│   ├── sponsor-dashboard.html
│   ├── thank-you.html
│   ├── about.html
│   ├── contact.html
│   ├── style.css
│   ├── script.js
│   ├── images/
│   └── icons/
├── requests.json
├── sponsors.json
├── connections.json
├── server.js
└── README.md
```

---

## 🛠 Features
- Organizer & Sponsor Login (session-based)
- Form submission and JSON data saving
- Sponsor interest tracking
- Organizer/sponsor dashboards

---

## ✅ To Do (Future)
- Add admin panel
- Add authentication and user accounts
- Add real-time notifications or chat

---

Made with ❤️ for smarter sponsorships!
