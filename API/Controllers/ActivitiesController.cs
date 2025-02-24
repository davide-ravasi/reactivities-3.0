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
    }
}

// https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/tutorials/primary-constructors
// this class use the Primary constructors paradigm to 
// inject the AppDbContext into the controller
// and then use it to query the database for a list of activities