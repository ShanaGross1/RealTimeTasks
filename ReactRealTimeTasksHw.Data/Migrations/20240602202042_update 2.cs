using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactRealTimeTasksHw.Data.Migrations
{
    /// <inheritdoc />
    public partial class update2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TaskAssigneeId",
                table: "Tasks");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TaskAssigneeId",
                table: "Tasks",
                type: "int",
                nullable: true);
        }
    }
}
