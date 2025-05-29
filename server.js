const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'sponsorease-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Page Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'public/about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public/contact.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'public/signup.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public/login.html')));
app.get('/role-select', (req, res) => res.sendFile(path.join(__dirname, 'public/role-select.html')));
app.get('/user-request', (req, res) => res.sendFile(path.join(__dirname, 'public/user-request.html')));
app.get('/thank-you', (req, res) => res.sendFile(path.join(__dirname, 'public/thank-you.html')));

// Dashboards
app.get('/user-dashboard', (req, res) => {
  if (req.session.userEmail) {
    res.sendFile(path.join(__dirname, 'public/user-dashboard.html'));
  } else {
    res.redirect('/login');
  }
});
app.get('/sponsor-dashboard', (req, res) => {
  if (req.session.userEmail) {
    res.sendFile(path.join(__dirname, 'public/sponsor-dashboard.html'));
  } else {
    res.redirect('/login');
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

// Signup Route
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const filePath = path.join(__dirname, 'users.json');
  const users = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];

  const userExists = users.find(u => u.email === email);
  if (userExists) return res.send('User already exists. Please login.');

  users.push({ name, email, password });
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  res.redirect('/login');
});

// Login Route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json')));
  const foundUser = users.find(u => u.email === email && u.password === password);

  if (!foundUser) return res.send('Invalid credentials.');

  req.session.userEmail = email;
  req.session.userName = foundUser.name;
  res.redirect('/role-select');
});

// Submit Event
app.post('/submit-user-request', (req, res) => {
  const formData = req.body;
  const filePath = path.join(__dirname, 'requests.json');
  const existing = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
  existing.push({ ...formData, submittedAt: new Date().toISOString() });
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
  res.redirect('/thank-you');
});

// Submit Sponsor
app.post('/submit-sponsor-request', (req, res) => {
  const formData = req.body;
  const filePath = path.join(__dirname, 'sponsors.json');
  const existing = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
  existing.push({ ...formData, submittedAt: new Date().toISOString() });
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
  res.redirect('/thank-you');
});

// Express Interest
app.post('/express-interest', (req, res) => {
  const filePath = path.join(__dirname, 'connections.json');
  const existing = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
  existing.push({
    sponsorEmail: req.body.sponsorEmail,
    userEmail: req.body.userEmail,
    event: req.body.event,
    message: req.body.message || '',
    status: 'interested',
    timestamp: new Date().toISOString()
  });
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
  res.json({ success: true });
});

// Get Notifications for a User
app.get('/notifications/:email', (req, res) => {
  const email = req.params.email;
  const connections = fs.existsSync('connections.json') ? JSON.parse(fs.readFileSync('connections.json')) : [];
  const notifications = connections.filter(c => c.userEmail === email);
  res.json(notifications);
});

// Messaging System
app.post('/messages', (req, res) => {
  const messages = fs.existsSync('messages.json') ? JSON.parse(fs.readFileSync('messages.json')) : [];
  messages.push({ ...req.body, timestamp: new Date().toISOString() });
  fs.writeFileSync('messages.json', JSON.stringify(messages, null, 2));
  res.status(200).send({ success: true });
});
app.get('/messages', (req, res) => {
  const { eventId } = req.query;
  const messages = fs.existsSync('messages.json') ? JSON.parse(fs.readFileSync('messages.json')) : [];
  const filtered = messages.filter(m => m.eventId === eventId);
  res.json(filtered);
});

// Utility Routes
app.get('/requests.json', (req, res) => {
  const data = fs.existsSync('requests.json') ? fs.readFileSync('requests.json') : '[]';
  res.type('application/json').send(data);
});
app.get('/connections.json', (req, res) => {
  const data = fs.existsSync('connections.json') ? fs.readFileSync('connections.json') : '[]';
  res.type('application/json').send(data);
});
app.get('/check-session', (req, res) => {
  if (req.session.userEmail) {
    res.json({ loggedIn: true, name: req.session.userName });
  } else {
    res.json({ loggedIn: false });
  }
});

app.listen(PORT, () => console.log(`Sponsorease running on http://localhost:${PORT}`));
