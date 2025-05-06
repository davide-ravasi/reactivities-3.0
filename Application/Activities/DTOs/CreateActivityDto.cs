using System.ComponentModel.DataAnnotations;

namespace Application.Activities.DTOs;

public class CreateActivityDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Category { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Venue { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}

// is a layer between the application and the domain model. It is used to transfer data between the application and the client. 
// The DTO is used to create a new activity. The DTO contains properties that are required to create a new activity, 
// such as Title, Description, Date, Category, City, Venue, Latitude, and Longitude. 
// The DTO is used to validate the data before it is sent to the application layer. 
// The DTO is also used to map the data from the client to the domain model. 
// The DTO is used to create a new activity in the application layer.
// Through application layer
