# 📝 Todo Task Application

A modern, full-stack task management application built with Angular and .NET Core.

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white)

## ✨ Features

- 📌 Create new tasks with title and description
- 📋 View organized list of tasks
- ✅ Mark tasks as complete
- 🎨 Clean, modern user interface
- 📱 Responsive design for all devices
- 🔒 Secure API endpoints
- 📊 Efficient data management with SQL Server

## 🛠️ Technologies Used

### Frontend 🌐
- **Angular 17** - Latest version of the powerful SPA framework
- **TypeScript** - For type-safe code
- **HTML/CSS** - Modern, responsive design
- **Angular CLI** - For efficient development workflow

### Backend ⚙️
- **ASP.NET Core 8.0** - Modern, high-performance web API
- **C#** - Robust backend programming
- **SQL Server** - Reliable database management
- **Dapper** - Light-weight ORM for optimal performance
- **Swagger/OpenAPI** - API documentation and testing

## 🚀 Getting Started

### Prerequisites 📋
- Node.js (v18 or higher)
- .NET 8.0 SDK
- SQL Server LocalDB or SQL Server
- Git

### Backend Setup 🔧

1. Clone the repository
   ```bash
   git clone https://github.com/it21053450/todo-task-app.git
   cd todo-task-app
   ```

2. Navigate to the API directory
   ```bash
   cd TodoApi
   ```

3. Run the database setup script
   ```bash
   sqlcmd -S "(localdb)\mssqllocaldb" -i setup.sql
   ```

4. Start the API
   ```bash
   dotnet run
   ```

The API will be running at http://localhost:7115 🎉

### Frontend Setup 🎨

1. Navigate to the Angular project directory
   ```bash
   cd todo-ui
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   ng serve
   ```

Visit http://localhost:4200 in your browser 🌐

## 📚 API Documentation

### Endpoints

#### Tasks
- `GET /api/tasks` - Retrieve all tasks
  - Response: 200 OK with array of tasks
  
- `POST /api/tasks` - Create a new task
  - Body: `{ "title": "string", "description": "string" }`
  - Response: 201 Created with task details
  
- `PUT /api/tasks/{id}/complete` - Mark task as complete
  - Response: 204 No Content

### Models 📋

#### Task
```json
{
  "id": number,
  "title": string,
  "description": string,
  "createdAt": datetime,
  "isCompleted": boolean
}
```

## 🔧 Development

### Running Tests

#### Backend Tests
```bash
cd TodoApi
dotnet test
```

#### Frontend Tests
```bash
cd todo-ui
ng test
```

## 📱 Screenshots

[Add your application screenshots here]

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✨ Acknowledgments

- Angular Documentation
- .NET Documentation
- SQL Server Documentation
- Dapper Documentation

## 📞 Contact

Your Name - [@Oditha Herath)

Project Link: [https://github.com/it21053450/todo-task-app](https://github.com/it21053450/todo-task-app)

---
⌨️ with ❤️ by [Oditha) 🚀
