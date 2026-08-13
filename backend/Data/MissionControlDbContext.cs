using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class MissionControlDbContext : DbContext
{
    public MissionControlDbContext(
        DbContextOptions<MissionControlDbContext> options)
        : base(options)
    {
    }

    public DbSet<Mission> Missions => Set<Mission>();
}