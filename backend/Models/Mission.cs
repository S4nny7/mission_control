namespace backend.Models;

public class Mission
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Status { get; set; } = "Active";

    public string Priority { get; set; } = "Medium";

    public DateTime? StartDate { get; set; }

    public DateTime? TargetDate { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}