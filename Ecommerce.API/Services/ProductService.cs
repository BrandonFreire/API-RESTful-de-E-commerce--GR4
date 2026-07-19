using Ecommerce.API.DTOs;
using Ecommerce.API.Exceptions;
using Ecommerce.API.Models;
using Ecommerce.API.Repositories;

namespace Ecommerce.API.Services
{
    public interface IProductService
    {
        Task<Product> CreateProductAsync(ProductRequest request);
        Task<Product> ReadProductAsync(int id);
        Task<List<Product>> ReadAllProductsAsync();
        Task<Product> UpdateProductAsync(int id, ProductRequest request);
        Task DeleteProductAsync(int id);
    }

    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<Product> CreateProductAsync(ProductRequest request)
        {
            var product = new Product
            {
                Name = request.Name,
                Price = request.Price,
                Description = request.Description,
                Amount = request.Amount,
                ImageUrl = request.ImageUrl
            };

            return await _productRepository.AddAsync(product);
        }

        public async Task<Product> ReadProductAsync(int id)
        {
            return await FindProductEntityAsync(id);
        }

        public async Task<List<Product>> ReadAllProductsAsync()
        {
            return await _productRepository.GetAllAsync();
        }

        public async Task<Product> UpdateProductAsync(int id, ProductRequest request)
        {
            var product = await FindProductEntityAsync(id);

            product.Name = request.Name;
            product.Price = request.Price;
            product.Description = request.Description;
            product.Amount = request.Amount;
            product.ImageUrl = request.ImageUrl;

            await _productRepository.UpdateAsync(product);
            return product;
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await FindProductEntityAsync(id);
            await _productRepository.DeleteAsync(product);
        }

        private async Task<Product> FindProductEntityAsync(int id)
        {
            return await _productRepository.GetByIdAsync(id)
                ?? throw new ResourceNotFoundException($"Producto no encontrado con id: {id}");
        }
    }
}