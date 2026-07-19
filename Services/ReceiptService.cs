using Ecommerce.API.DTOs;
using Ecommerce.API.Exceptions;
using Ecommerce.API.Models;
using Ecommerce.API.Repositories;

namespace Ecommerce.API.Services
{
    public interface IReceiptService
    {
        Task<ReceiptResponse> CreateReceiptAsync(CreateReceiptRequest request);
        Task<ReceiptResponse> ReadReceiptAsync(int id);
        Task<List<ReceiptResponse>> GetReceiptsByUserAsync(int userId);
        Task<List<ReceiptResponse>> GetAllReceiptsAsync();
        Task DeleteReceiptAsync(int id);
    }

    public class ReceiptService : IReceiptService
    {
        private readonly IReceiptRepository _receiptRepository;
        private readonly IUserRepository _userRepository;
        private readonly IProductRepository _productRepository;

        public ReceiptService(
            IReceiptRepository receiptRepository, 
            IUserRepository userRepository, 
            IProductRepository productRepository)
        {
            _receiptRepository = receiptRepository;
            _userRepository = userRepository;
            _productRepository = productRepository;
        }

        public async Task<ReceiptResponse> CreateReceiptAsync(CreateReceiptRequest request)
        {
            var user = await _userRepository.GetByIdAsync(request.UserId)
                ?? throw new ResourceNotFoundException($"Usuario no encontrado con id: {request.UserId}");

            var receipt = new Receipt
            {
                UserId = user.UserId,
                CreatedAt = DateTime.UtcNow,
                Total = 0m,
                AmountOfItems = 0,
                Items = new List<ReceiptItem>()
            };

            decimal total = 0m;
            int amountOfItems = 0;

            foreach (var itemRequest in request.Items)
            {
                var product = await _productRepository.GetByIdAsync(itemRequest.ProductId)
                    ?? throw new ResourceNotFoundException($"Producto no encontrado con id: {itemRequest.ProductId}");

                if (product.Amount < itemRequest.Quantity)
                    throw new BadRequestException($"Stock insuficiente para el producto: {product.Name}");

                decimal unitPrice = product.Price;
                decimal subtotal = unitPrice * itemRequest.Quantity;

                var receiptItem = new ReceiptItem
                {
                    ProductId = product.ProductId,
                    Quantity = itemRequest.Quantity,
                    UnitPrice = unitPrice,
                    Subtotal = subtotal
                };

                receipt.Items.Add(receiptItem);
                
                // Descontar el stock automáticamente
                product.Amount -= itemRequest.Quantity;
                await _productRepository.UpdateAsync(product);

                total += subtotal;
                amountOfItems += itemRequest.Quantity;
            }

            receipt.Total = total;
            receipt.AmountOfItems = amountOfItems;

            var savedReceipt = await _receiptRepository.AddAsync(receipt);
            return ToResponse(savedReceipt);
        }

        public async Task<ReceiptResponse> ReadReceiptAsync(int id)
        {
            var receipt = await _receiptRepository.GetByIdAsync(id)
                ?? throw new ResourceNotFoundException($"Recibo no encontrado con id: {id}");
            return ToResponse(receipt);
        }

        public async Task<List<ReceiptResponse>> GetReceiptsByUserAsync(int userId)
        {
            var receipts = await _receiptRepository.GetByUserIdAsync(userId);
            return receipts.Select(ToResponse).ToList();
        }

        public async Task<List<ReceiptResponse>> GetAllReceiptsAsync()
        {
            var receipts = await _receiptRepository.GetAllAsync();
            return receipts.Select(ToResponse).ToList();
        }

        public async Task DeleteReceiptAsync(int id)
        {
            var receipt = await _receiptRepository.GetByIdAsync(id)
                ?? throw new ResourceNotFoundException($"Recibo no encontrado con id: {id}");
            await _receiptRepository.DeleteAsync(receipt);
        }

        private static ReceiptResponse ToResponse(Receipt receipt)
        {
            var items = receipt.Items.Select(item => new ReceiptItemResponse(
                item.ProductId,
                item.Product?.Name ?? string.Empty,
                item.Quantity,
                item.UnitPrice,
                item.Subtotal
            )).ToList();

            return new ReceiptResponse(
                receipt.ReceiptId,
                receipt.UserId,
                receipt.User?.Email ?? string.Empty,
                receipt.Total,
                receipt.AmountOfItems,
                receipt.CreatedAt,
                items
            );
        }
    }
}