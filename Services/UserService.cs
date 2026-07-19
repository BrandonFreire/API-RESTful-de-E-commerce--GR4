using Ecommerce.API.DTOs;
using Ecommerce.API.Exceptions;
using Ecommerce.API.Models;
using Ecommerce.API.Repositories;
using BCrypt.Net;

namespace Ecommerce.API.Services
{
    public interface IUserService
    {
        Task<UserResponse> RegisterUserAsync(RegisterUserRequest request);
        Task<UserResponse> LoginUserAsync(LoginRequest request);
        Task<UserResponse> ReadUserAsync(int id);
        Task<UserResponse> UpdateUserAsync(int id, UpdateUserRequest request);
        Task DeleteUserAsync(int id);
    }

    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserResponse> RegisterUserAsync(RegisterUserRequest request)
        {
            if (await _userRepository.ExistsByEmailAsync(request.Email))
                throw new BadRequestException("El correo ya se encuentra registrado");

            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                // Encriptación idéntica a Spring Security Crypto
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Address = request.Address,
                PhoneNumber = request.PhoneNumber
            };

            var savedUser = await _userRepository.AddAsync(user);
            return ToResponse(savedUser);
        }

        public async Task<UserResponse> LoginUserAsync(LoginRequest request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email)
                ?? throw new InvalidCredentialsException();

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                throw new InvalidCredentialsException();

            return ToResponse(user);
        }

        public async Task<UserResponse> ReadUserAsync(int id)
        {
            var user = await FindUserEntityAsync(id);
            return ToResponse(user);
        }

        public async Task<UserResponse> UpdateUserAsync(int id, UpdateUserRequest request)
        {
            var user = await FindUserEntityAsync(id);

            if (request.FirstName != null) user.FirstName = request.FirstName;
            if (request.LastName != null) user.LastName = request.LastName;

            if (request.Email != null && request.Email != user.Email)
            {
                if (await _userRepository.ExistsByEmailAsync(request.Email))
                    throw new BadRequestException("El correo ya se encuentra registrado");
                user.Email = request.Email;
            }

            if (!string.IsNullOrWhiteSpace(request.Password))
                user.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);

            if (request.Address != null) user.Address = request.Address;
            if (request.PhoneNumber != null) user.PhoneNumber = request.PhoneNumber;

            await _userRepository.UpdateAsync(user);
            return ToResponse(user);
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await FindUserEntityAsync(id);
            await _userRepository.DeleteAsync(user);
        }

        private async Task<User> FindUserEntityAsync(int id)
        {
            return await _userRepository.GetByIdAsync(id)
                ?? throw new ResourceNotFoundException($"Usuario no encontrado con id: {id}");
        }

        private static UserResponse ToResponse(User user)
        {
            return new UserResponse(
                user.UserId,
                user.FirstName,
                user.LastName,
                user.Email,
                user.Address,
                user.PhoneNumber
            );
        }
    }
}