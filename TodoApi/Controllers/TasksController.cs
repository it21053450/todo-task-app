using Microsoft.AspNetCore.Mvc;
using TodoApi.DTOs;
using TodoApi.Services;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;
        private readonly ILogger<TasksController> _logger;

        public TasksController(ITaskService taskService, ILogger<TasksController> logger)
        {
            _taskService = taskService;
            _logger = logger;
        }

        // GET: api/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskResponseDto>>> GetRecentTasks()
        {
            try
            {
                var tasks = await _taskService.GetRecentTasksAsync();
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetRecentTasks");
                return StatusCode(500, "An error occurred while retrieving tasks");
            }
        }

        // POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<TaskResponseDto>> CreateTask([FromBody] CreateTaskDto createTaskDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var task = await _taskService.CreateTaskAsync(createTaskDto);
                return CreatedAtAction(nameof(GetRecentTasks), new { id = task.Id }, task);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in CreateTask");
                return StatusCode(500, "An error occurred while creating the task");
            }
        }

        // PUT: api/tasks/{id}/complete
        [HttpPut("{id}/complete")]
        public async Task<ActionResult> CompleteTask(int id)
        {
            try
            {
                var result = await _taskService.CompleteTaskAsync(id);
                if (!result)
                {
                    return NotFound(new { message = $"Task with id {id} not found" });
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in CompleteTask for id {TaskId}", id);
                return StatusCode(500, "An error occurred while completing the task");
            }
        }
    }
}