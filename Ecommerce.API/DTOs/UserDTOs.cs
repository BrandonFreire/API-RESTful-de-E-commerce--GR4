using System.ComponentModel.DataAnnotations;

namespace Ecommerce.API.DTOs
{
    public record RegisterUserRequest(
        [Required] string FirstName,
        [Required] string LastName,
        [Required][EmailAddress] string Email,
        [Required] string Password,
        string? Address,
        string? PhoneNumber
    );

    public record UpdateUserRequest(
        string? FirstName,
        string? LastName,
        [EmailAddress] string? Email,
        string? Password,
        string? Address,
        string? PhoneNumber
    );

    public record LoginRequest(
        [Required][EmailAddress] string Email,
        [Required] string Password
    );

    public record UserResponse(
        int UserId,
        string FirstName,
        string LastName,
        string Email,
        string? Address,
        string? PhoneNumber
    );
}