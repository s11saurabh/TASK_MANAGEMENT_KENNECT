# Task Management Application

A modern task management solution built with React and Node.js, featuring task organization, progress tracking, and statistical analysis.

## 🚀 Live Demo
- **Application**: [Task Management App](https://tm-sigma-five.vercel.app)
- **Repository**: [GitHub](https://github.com/s11saurabh/TASK_MANAGEMENT)
-  Demo Credentials--> Email: saurabhsinghania111@gmail.com , Password : dfghj@890
- **Demo**: [Video](https://drive.google.com/file/d/1vU6ZInki-IMKvWxvdQ9jVdYomhawc2fJ/view?usp=drive_link)
- **Hosted**: [ Frontend ](https://tm-sigma-five.vercel.app)
- **Hosted**: [ Backend ](https://task-management-5rxx.onrender.com/)
- 
<img width="1468" alt="image" src="https://github.com/user-attachments/assets/12e4cfad-cbe9-4abc-8f4d-c2b952795f5e" />
<img width="1468" alt="image" src="https://github.com/user-attachments/assets/c401b2d7-ea88-42cd-8972-10d460f3518a" />
<img width="1469" alt="image" src="https://github.com/user-attachments/assets/7967d8fa-b958-452b-b47a-0b89b74f323d" />
<img width="1465" alt="image" src="https://github.com/user-attachments/assets/0e6284d4-a25a-4968-8cb8-1df7d38ecba6" />
<img width="1467" alt="image" src="https://github.com/user-attachments/assets/41362e5b-219c-4c90-b582-38b47f96a547" />
<img width="1461" alt="image" src="https://github.com/user-attachments/assets/26f13d62-2238-4de5-88fe-35e045481f1f" />
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/f276fd3a-8877-456d-8d33-c354e49e126a" />

## ✨ Features

### 🔐 Authentication
The application implements a robust authentication system:

- **JWT-based Authentication**: 
  - Secure token-based user sessions
  - Automatic token refresh mechanism
  - Token blacklisting for logout

- **Smart Navigation**:
  - Redirects authenticated users to dashboard
  - Protects private routes
  - Prevents authenticated users from accessing auth pages

### 📋 Task Management
Comprehensive task management with:

**Core Features**:
- Create, update, and delete tasks
- Task priority levels (1-5)
- Status tracking (pending/finished)
- Time management (start/end times)
- Auto-calculated durations

**Time Tracking**:
- Real-time elapsed time calculation
- Automatic completion time updates
- Estimated time remaining for pending tasks
- Time-based analytics

### 📊 Dashboard
Interactive analytics dashboard featuring:

**Overview Statistics**:
- Total task count
- Task completion rates
- Pending vs completed task ratio
- Performance metrics

**Time Analysis**:
- Average completion time
- Time distribution by priority
- Task completion trends
- Workload analysis

**Priority Insights**:
- Priority-based task grouping
- Time investment per priority level
- Priority-based progress tracking
- Workload distribution visualization

### 📝 Task List Features

**Advanced Filtering**:
- Priority-based filtering
- Status filtering
- Multi-filter support
- Filter combinations

**Smart Sorting**:
- Start time (ASC/DESC)
- End time (ASC/DESC)
- Priority levels
- Status-based sorting

**Additional Features**:
- Efficient pagination
- Bulk operations
- Custom task IDs (T-00001 format)
- Real-time updates

## 🛠️ Tech Stack

### Frontend
```javascript
{
  "core": [
    "React 18",
    "React Router DOM",
    "Axios",
    "Tailwind CSS",
    "Heroicons"
  ],
  "state": "Context API + Hooks"
}
```

### Backend
```javascript
{
  "core": [
    "Node.js",
    "Express",
    "MongoDB",
    "Mongoose"
  ],
  "security": [
    "JWT",
    "bcryptjs",
    "Express Validator"
  ]
}
```

## 📁 Project Structure

### Frontend
```
📦 frontend
┣ 📂 src
┃ ┣ 📂 components
┃ ┃ ┣ 📂 auth
┃ ┃ ┃ ┣ 📄 LoginForm.js
┃ ┃ ┃ ┗ 📄 RegisterForm.js
┃ ┃ ┣ 📂 dashboard
┃ ┃ ┃ ┣ 📄 PriorityStats.js
┃ ┃ ┃ ┣ 📄 TaskProgress.js
┃ ┃ ┃ ┗ 📄 TimeStats.js
┃ ┃ ┣ 📂 tasks
┃ ┃ ┃ ┣ 📄 TaskCard.js
┃ ┃ ┃ ┣ 📄 TaskForm.js
┃ ┃ ┃ ┣ 📄 TaskFilters.js
┃ ┃ ┃ ┣ 📄 TaskList.js
┃ ┃ ┃ ┗ 📄 TaskSort.js
┃ ┃ ┗ 📂 layout
┃ ┃   ┣ 📄 Navbar.js
┃ ┃   ┗ 📄 Layout.js
┃ ┣ 📂 hooks
┃ ┃ ┣ 📄 useAuth.js
┃ ┃ ┣ 📄 usePagination.js
┃ ┃ ┗ 📄 useTasks.js
┃ ┣ 📂 services
┃ ┃ ┣ 📄 api.js
┃ ┃ ┗ 📄 auth.js
┃ ┣ 📂 utils
┃ ┃ ┣ 📄 dateUtils.js
┃ ┃ ┣ 📄 validation.js
┃ ┃ ┗ 📄 constants.js
┃ ┣ 📂 context
┃ ┃ ┗ 📄 AuthContext.js
┃ ┣ 📄 App.js
┃ ┗ 📄 index.js
```

### Backend
```
📦 backend
┣ 📂 src
┃ ┣ 📂 config
┃ ┃ ┣ 📄 database.js
┃ ┃ ┗ 📄 jwt.js
┃ ┣ 📂 controllers
┃ ┃ ┣ 📄 authController.js
┃ ┃ ┣ 📄 taskController.js
┃ ┃ ┗ 📄 statsController.js
┃ ┣ 📂 middleware
┃ ┃ ┣ 📄 auth.js
┃ ┃ ┣ 📄 errorHandler.js
┃ ┃ ┗ 📄 validation.js
┃ ┣ 📂 models
┃ ┃ ┣ 📄 Task.js
┃ ┃ ┗ 📄 User.js
┃ ┣ 📂 routes
┃ ┃ ┣ 📄 auth.js
┃ ┃ ┣ 📄 tasks.js
┃ ┃ ┗ 📄 stats.js
┃ ┣ 📂 utils
┃ ┃ ┣ 📄 dateHelpers.js
┃ ┃ ┗ 📄 responseFormatter.js
┃ ┣ 📂 services
┃ ┃ ┣ 📄 taskService.js
┃ ┃ ┗ 📄 statsService.js
┃ ┗ 📄 app.js
```

## 🚀 API Endpoints

### Authentication
```javascript
{
  "POST /api/auth/register": "Create new user account",
  "POST /api/auth/login": "Authenticate user",
  "GET /api/auth/me": "Get current user profile"
}
```

### Tasks
```javascript
{
  "GET /api/tasks": "Fetch tasks with filters",
  "POST /api/tasks": "Create new task",
  "PUT /api/tasks/:id": "Update task",
  "DELETE /api/tasks/:id": "Delete task",
  "GET /api/stats": "Get dashboard statistics"
}
```

## 🛠️ Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm/yarn

### Environment Setup

**.env.frontend**
```
REACT_APP_API_URL=http://localhost:5001/api
```

**.env.backend**
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=24h
```

### Quick Start
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm start
```

## 🔒 Security Features

- JWT Authentication
- Password Hashing (bcrypt)
- Input Validation
- XSS Protection
- CORS Configuration
- Rate Limiting

## 📊 Data Models

### User Schema
```javascript
{
  name: String,
  email: String,
  password: String,
  createdAt: Date
}
```

### Task Schema
```javascript
{
  title: String,
  startTime: Date,
  endTime: Date,
  priority: Number,
  status: String,
  user: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔜 Future Enhancements

- Team Collaboration
- File Attachments
- Email Notifications
- Task Comments
- Advanced Analytics
- Mobile App
- Dark/Light Theme
- Task Categories

## 📄 License
MIT License

## 💬 Support
DEVELOPED BY SAURABH KUMAR
### For queries: saurabhsinghania111@gmail.com
