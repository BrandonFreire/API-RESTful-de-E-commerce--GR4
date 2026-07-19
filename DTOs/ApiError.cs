namespace Ecommerce.API.DTOs
{
    public record ApiError(
        DateTime Timestamp,
        int Status,
        string Error,
        string Message,
        string Path
    );
}