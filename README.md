# 📦 Bulk Data Uploader

A scalable and real-time system for uploading and processing large CSV/Excel files asynchronously, with Redis queue, Socket.IO for live progress updates, and MongoDB for data storage.

---

## 🚀 Features

### ✅ File Upload UI
- Supports CSV and Excel (.xlsx) files
- Client-side file format validation
- Upload progress bar indicator

### ⚙️ Background Processing
- Files are temporarily stored and pushed into a Redis queue
- Background worker service processes the file in batches
- Efficient handling to avoid memory overflow

### 🔄 Real-Time Feedback
- Uses `Socket.IO` to send progress updates to the client
- Sends updates every X% records processed
- Notifies when processing is complete

### 🗄️ Database Handling
- Stores validated records in MongoDB
- Skips duplicates and validates fields
- Tracks success/failure per record

### 📢 Notifications
- Browser alert or email notification on completion
- Summary report showing:
  - Total Records
  - Successful Records
  - Failed Records (with reasons)

---