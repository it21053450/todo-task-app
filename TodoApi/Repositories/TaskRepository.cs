using Dapper;
using Microsoft.Data.SqlClient;
using TodoApi.Models;

namespace TodoApi.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly string _connectionString;

        public TaskRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new ArgumentNullException("Connection string not found");
        }

        private SqlConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }

        public async Task<IEnumerable<TaskItem>> GetRecentTasksAsync(int count)
        {
            using var connection = GetConnection();
            var query = @"
                SELECT TOP (@Count) Id, Title, Description, CreatedAt, IsCompleted 
                FROM Task 
                WHERE IsCompleted = 0 
                ORDER BY CreatedAt DESC";

            return await connection.QueryAsync<TaskItem>(query, new { Count = count });
        }

        public async Task<TaskItem?> GetTaskByIdAsync(int id)
        {
            using var connection = GetConnection();
            var query = "SELECT Id, Title, Description, CreatedAt, IsCompleted FROM Task WHERE Id = @Id";

            return await connection.QueryFirstOrDefaultAsync<TaskItem>(query, new { Id = id });
        }

        public async Task<int> CreateTaskAsync(TaskItem task)
        {
            using var connection = GetConnection();
            var query = @"
                INSERT INTO Task (Title, Description, CreatedAt, IsCompleted) 
                VALUES (@Title, @Description, @CreatedAt, @IsCompleted);
                SELECT CAST(SCOPE_IDENTITY() as int)";

            return await connection.QuerySingleAsync<int>(query, task);
        }

        public async Task<bool> CompleteTaskAsync(int id)
        {
            using var connection = GetConnection();
            var query = "UPDATE Task SET IsCompleted = 1 WHERE Id = @Id";

            var affectedRows = await connection.ExecuteAsync(query, new { Id = id });
            return affectedRows > 0;
        }
    }
}