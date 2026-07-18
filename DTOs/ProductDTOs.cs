using System.ComponentModel.DataAnnotations;

namespace Ecommerce.API.DTOs
{
    public record ProductRequest(
        [Required] string Name,
        [Required][Range(0.01, double.MaxValue)] decimal Price,
        string? Description,
        [Required][Range(0, int.MaxValue)] int Amount,
        string? ImageUrl
    );
}