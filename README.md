# 📝 Todo Manager

A full-stack **Todo Management Application** built using the **MERN stack** that allows users to create, manage, and organize their tasks based on deadlines.

Users can add todos with a title, description, and deadline. Tasks are automatically categorized into **Overdue**, **Today**, and **Upcoming** to help users stay organized and track their work efficiently.

---

# 🚀 Features

* ➕ Add new todos with title, description, and deadline
* ✏️ Edit existing todos
* ❌ Delete todos
* ✅ Mark todos as completed
* 📅 Automatic categorization:

  * **Overdue Tasks**
  * **Today's Tasks**
  * **Upcoming Tasks**
* 🔐 Authentication using cookies


---

# 🛠 Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Icons

## Backend

* Node.js
* Express.js
* MongoDB
* Cookie-based authentication

---

#  Project Structure

```
todo-app
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── index.js
│
├── frontend
│   ├── components
│   │   ├── Navbar.jsx
│   │   ├── TodoList.jsx
│   │   └── AddEditTodo.jsx
│   │
│   ├── pages
│   │   └── Dashboard.jsx
│   │   └── Login.jsx
│   │   └── Signup.jsx
│   │
│   ├── context
│   │   └── userContext.jsx
│   │   └── userContextProvider.jsx
│   └── main.jsx
│   └── App.jsx
```

---

#  Installation


##  Install dependencies

### Backend

```
cd backend
npm install
```

### Frontend

```
cd frontend
npm install
```

---

#  Run the Application

### Start Backend

```
npm run dev
```

### Start Frontend

```
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

#  Environment Variables

Create a `.env` file in the backend folder.

Example:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
```

---
