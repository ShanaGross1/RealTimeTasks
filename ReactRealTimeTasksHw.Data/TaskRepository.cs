using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactRealTimeTasksHw.Data
{
    public class TaskRepository
    {
        private string _conectionString;
        public TaskRepository(string connectionString)
        {
            _conectionString = connectionString;
        }

        public List<TaskItem> GetTasks()
        {
            var ctx = new TaskItemDataContext(_conectionString);
           
            return ctx.Tasks.Include(t=>t.User).ToList();
        }

        public void AddTask(TaskItem task)
        {
            var ctx = new TaskItemDataContext(_conectionString);
            ctx.Tasks.Add(task);
            ctx.SaveChanges();
        }

        public void AddTaskAssignee(TaskItem task)
        {
            var ctx = new TaskItemDataContext(_conectionString);
            ctx.Tasks.FirstOrDefault(t => t.Id == task.Id).UserId = task.UserId;
            ctx.SaveChanges();
        }

        public void DeleteTask(int taskId)
        {
            var ctx = new TaskItemDataContext(_conectionString);
            ctx.Database.ExecuteSqlInterpolated($"DELETE FROM Tasks WHERE Id = {taskId}");
        }
    }
}
