using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.API.Models
{
    [Table("receipts")]
    public class Receipt
    {
        [Key]
        [Column("receipt_id")]
        public int ReceiptId { get; set; }

        [Required]
        [Column("created_by")]
        public int UserId { get; set; }
        
        [ForeignKey("UserId")]
        public User User { get; set; } = null!;

        public ICollection<ReceiptItem> Items { get; set; } = new List<ReceiptItem>();

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Total { get; set; }

        [Required]
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Required]
        [Column("amount_of_items")]
        public int AmountOfItems { get; set; }
    }
}