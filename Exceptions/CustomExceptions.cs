namespace Ecommerce.API.Exceptions
{
    public class ResourceNotFoundException : Exception
    {
        public ResourceNotFoundException(string message) : base(message) { }
    }

    public class BadRequestException : Exception
    {
        public BadRequestException(string message) : base(message) { }
    }

    public class InvalidCredentialsException : Exception
    {
        public InvalidCredentialsException() : base("Credenciales inválidas") { }
    }
}