using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.API.Models
{
    [Table("receipt_items")]
    public class ReceiptItem
    {
        [Key]
        [Column("receipt_item_id")]
        public int ReceiptItemId { get; set; }

        [Required]
        [Column("receipt_id")]
        public int ReceiptId { get; set; }
        
        [ForeignKey("ReceiptId")]
        public Receipt Receipt { get; set; } = null!;

        [Required]
        [Column("product_id")]
        public int ProductId { get; set; }
        
        [ForeignKey("ProductId")]
        public Product Product { get; set; } = null!;

        [Required]
        public int Quantity { get; set; }

        [Required]
        [Column("unit_price", TypeName = "decimal(10,2)")]
        public decimal UnitPrice { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Subtotal { get; set; }
    }
}