using TodoApi.DTOs;

namespace TodoApi.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskResponseDto>> GetRecentTasksAsync();
        Task<TaskResponseDto> CreateTaskAsync(CreateTaskDto createTaskDto);
        Task<bool> CompleteTaskAsync(int id);
    }
}