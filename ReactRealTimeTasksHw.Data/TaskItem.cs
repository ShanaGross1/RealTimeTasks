using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ReactRealTimeTasksHw.Data
{
    public class TaskItem
    {
        public int Id { get; set;}
        public string TaskTitle { get; set;}
        public int? UserId {get;set;}
        public User User { get; set; }
    }
}
