using Ecommerce.API.DTOs;
using System.Net;
using System.Text.Json;

namespace Ecommerce.API.Exceptions
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public GlobalExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            context.Response.ContentType = "application/json";
            
            int statusCode = (int)HttpStatusCode.InternalServerError;
            string error = "Internal Server Error";

            switch (ex)
            {
                case ResourceNotFoundException:
                    statusCode = (int)HttpStatusCode.NotFound;
                    error = "Not Found";
                    break;
                case BadRequestException:
                    statusCode = (int)HttpStatusCode.BadRequest;
                    error = "Bad Request";
                    break;
                case InvalidCredentialsException:
                    statusCode = (int)HttpStatusCode.Unauthorized;
                    error = "Unauthorized";
                    break;
            }

            context.Response.StatusCode = statusCode;

            var apiError = new ApiError(
                DateTime.UtcNow,
                statusCode,
                error,
                ex.Message,
                context.Request.Path
            );

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            var result = JsonSerializer.Serialize(apiError, options);
            
            return context.Response.WriteAsync(result);
        }
    }
}