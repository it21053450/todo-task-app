using TodoApi.Models;

namespace TodoApi.Repositories
{
    public interface ITaskRepository
    {
        Task<IEnumerable<TaskItem>> GetRecentTasksAsync(int count);
        Task<TaskItem?> GetTaskByIdAsync(int id);
        Task<int> CreateTaskAsync(TaskItem task);
        Task<bool> CompleteTaskAsync(int id);
    }
}