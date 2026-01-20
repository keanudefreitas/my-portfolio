# Business Inquiry Backend

A fully functional Node.js/Express backend with SQLite database for managing business inquiries.

## ✅ Setup Complete

The backend is now fully configured and running with the following components:

### What's Included:
- **Express.js** - Web framework
- **SQLite Database** - Local database (no external server needed)
- **Body Parser** - JSON request parsing
- **CORS Ready** - Form can communicate with the API

## 🚀 Running the Server

The server is currently running on `http://localhost:3000`

To start it manually (in a terminal):
```bash
node backend.js
```

## 📡 API Endpoints

### 1. Submit an Inquiry
**POST** `/api/inquiries`

Request body:
```json
{
  "businessName": "Your Business",
  "email": "your@email.com",
  "businessNumber": "555-1234",
  "inquiry": "Your message here"
}
```

Response:
```json
{
  "message": "Inquiry submitted successfully!",
  "id": 1
}
```

### 2. Get All Inquiries
**GET** `/api/inquiries`

Returns all inquiries ordered by newest first.

### 3. Get Single Inquiry
**GET** `/api/inquiries/:id`

Returns a specific inquiry by ID.

## 🎨 Web Form

Open `form.html` in your browser to access the inquiry submission form. The form includes:
- Business name, email, phone number, and message fields
- Real-time form validation
- Success/error messages
- Display of recent submissions

## 📦 Dependencies

```
- express@4.x - Web server framework
- body-parser - JSON parsing middleware
- sqlite3 - SQLite database driver
```

## 🗄️ Database

The database file is automatically created as `inquiries.db` in the project folder.

**Table Structure:**
- `id` - Auto-increment primary key
- `business_name` - Business name (text)
- `email` - Email address (text)
- `business_number` - Phone number (text)
- `inquiry` - Message content (text)
- `created_at` - Submission timestamp

## 🔧 Troubleshooting

### Port 3000 already in use?
Change the port in `backend.js` line 70: `const PORT = 3000;`

### CORS issues when submitting form?
The current setup allows requests from `http://localhost`. If you're accessing from a different domain, modify the form headers or add CORS middleware.

### Database locked error?
Make sure only one instance of `node backend.js` is running.

## 📝 Notes

- All data is stored locally in SQLite
- No external database configuration needed
- Database persists between server restarts
- Perfect for local development and testing

---

**Status:** ✅ Ready to use!
