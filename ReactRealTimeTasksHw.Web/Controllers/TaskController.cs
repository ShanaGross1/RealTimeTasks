using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using ReactRealTimeTasksHw.Data;
using ReactRealTimeTasksHw.Web.ViewModels;
using System;
using System.Net.NetworkInformation;
using System.Threading.Tasks;

namespace ReactRealTimeTasksHw.Web.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private string _connectionString;
        private readonly IHubContext<TestHub> _hub;

        public TaskController(IConfiguration configuration, IHubContext<TestHub> hub)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
            _hub = hub;

        }

        [HttpGet("gettasks")]
        public List<TaskItem> GetTasks()
        {
            var repo = new TaskRepository(_connectionString);
            return repo.GetTasks();
        }

        [HttpPost("addtask")]
        public void AddTask(TaskItem task)
        {
            var repo = new TaskRepository(_connectionString);
            repo.AddTask(task);

            _hub.Clients.All.SendAsync("newTask", task);
        }

        [HttpPost("deletetask")]
        public void DeleteTask(DeleteTaskViewModel viewModel)
        {
            var repo = new TaskRepository(_connectionString);
            repo.DeleteTask(viewModel.TaskId);
            _hub.Clients.All.SendAsync("deleteTask", viewModel.TaskId);

        }

        [HttpPost("addassignee")]
        public void AddTaskAssignee(TaskItem task)
        {
            task.UserId = GetCurrentUserId();
            var repo = new TaskRepository(_connectionString);
            repo.AddTaskAssignee(task);

            _hub.Clients.All.SendAsync("addAssignee", repo.GetTasks());
        }

        private int GetCurrentUserId()
        {
            var userRepo = new UserRepository(_connectionString);
            return userRepo.GetByEmail(User.Identity.Name).Id;
        }
    }
}
