using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController(AppDbContext context) : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await context.Activities.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivityDetail(string id)
        {
            var activity = await context.Activities.FindAsync(id);
            if (activity == null) return NotFound();
            return activity;
        }
    }
}

// findAsync is not guaranteed to return a non-null value, so we need to check for null and return NotFound if it is null
// findAsync is a method that is available on DbSet, which is a property of the AppDbContext class
// DbSet is a collection of entities that can be queried, added, modified, and deleted
// DbContext is a class that represents a session with the database and allows us to query and save instances of entities

// https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/tutorials/primary-constructors
// this class use the Primary constructors paradigm to 
// inject the AppDbContext into the controller
// and then use it to query the database for a list of activities