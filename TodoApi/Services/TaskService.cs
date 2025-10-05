using TodoApi.DTOs;
using TodoApi.Models;
using TodoApi.Repositories;

namespace TodoApi.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        private readonly ILogger<TaskService> _logger;

        public TaskService(ITaskRepository taskRepository, ILogger<TaskService> logger)
        {
            _taskRepository = taskRepository;
            _logger = logger;
        }

        public async Task<IEnumerable<TaskResponseDto>> GetRecentTasksAsync()
        {
            try
            {
                var tasks = await _taskRepository.GetRecentTasksAsync(5);
                return tasks.Select(t => new TaskResponseDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    CreatedAt = t.CreatedAt
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving recent tasks");
                throw;
            }
        }

        public async Task<TaskResponseDto> CreateTaskAsync(CreateTaskDto createTaskDto)
        {
            try
            {
                var task = new TaskItem
                {
                    Title = createTaskDto.Title,
                    Description = createTaskDto.Description,
                    CreatedAt = DateTime.UtcNow,
                    IsCompleted = false
                };

                var id = await _taskRepository.CreateTaskAsync(task);
                task.Id = id;

                return new TaskResponseDto
                {
                    Id = task.Id,
                    Title = task.Title,
                    Description = task.Description,
                    CreatedAt = task.CreatedAt
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating task");
                throw;
            }
        }

        public async Task<bool> CompleteTaskAsync(int id)
        {
            try
            {
                var task = await _taskRepository.GetTaskByIdAsync(id);
                if (task == null)
                {
                    _logger.LogWarning("Task with id {TaskId} not found", id);
                    return false;
                }

                return await _taskRepository.CompleteTaskAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error completing task with id {TaskId}", id);
                throw;
            }
        }
    }
}