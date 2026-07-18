using System.ComponentModel.DataAnnotations;

namespace Ecommerce.API.DTOs
{
    public record ReceiptItemRequest(
        [Required] int ProductId,
        [Required][Range(1, int.MaxValue)] int Quantity
    );

    public record CreateReceiptRequest(
        [Required] int UserId,
        [Required][MinLength(1)] List<ReceiptItemRequest> Items
    );

    public record ReceiptItemResponse(
        int ProductId,
        string ProductName,
        int Quantity,
        decimal UnitPrice,
        decimal Subtotal
    );

    public record ReceiptResponse(
        int ReceiptId,
        int UserId,
        string UserEmail,
        decimal Total,
        int AmountOfItems,
        DateTime CreatedAt,
        List<ReceiptItemResponse> Items
    );
}