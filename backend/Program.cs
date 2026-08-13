using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Database
builder.Services.AddDbContext<MissionControlDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("MissionControl")
    ));

// OpenAPI
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseCors("Frontend");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Health check
app.MapGet("/api/health", () =>
{
    return Results.Ok(new
    {
        status = "operational",
        message = "Mission Control API is online 🚀"
    });
});


// Get all missions
app.MapGet("/api/missions", async (MissionControlDbContext db) =>
{
    var missions = await db.Missions.ToListAsync();

    return Results.Ok(missions);
});

// Get a mission by ID
app.MapGet("/api/missions/{id}", async (
    int id,
    MissionControlDbContext db) =>
{
    var mission = await db.Missions.FindAsync(id);

    if (mission is null)
    {
        return Results.NotFound();
    }

    return Results.Ok(mission);
});

// Create a mission
app.MapPost("/api/missions", async (
    Mission mission,
    MissionControlDbContext db) =>
{
    db.Missions.Add(mission);

    await db.SaveChangesAsync();

    return Results.Created(
        $"/api/missions/{mission.Id}",
        mission
    );
});

// Delete a mission
app.MapDelete("/api/missions/{id}", async (
    int id,
    MissionControlDbContext db) =>
{
    var mission = await db.Missions.FindAsync(id);

    if (mission is null)
    {
        return Results.NotFound();
    }

    db.Missions.Remove(mission);

    await db.SaveChangesAsync();

    return Results.NoContent();
});


// Update a mission
app.MapPut("/api/missions/{id}", async (
    int id,
    Mission updatedMission,
    MissionControlDbContext db) =>
{
    var mission = await db.Missions.FindAsync(id);

    if (mission is null)
    {
        return Results.NotFound();
    }

    mission.Name = updatedMission.Name;
    mission.Description = updatedMission.Description;
    mission.Status = updatedMission.Status;
    mission.Priority = updatedMission.Priority;
    mission.StartDate = updatedMission.StartDate;
    mission.TargetDate = updatedMission.TargetDate;

    await db.SaveChangesAsync();

    return Results.Ok(mission);
});

app.Run();