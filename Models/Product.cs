using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ecommerce.API.Models
{
    [Table("products")]
    public class Product
    {
        [Key]
        [Column("product_id")]
        public int ProductId { get; set; }

        [Required]
        [Column("product_name")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Range(0.01, double.MaxValue)]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        public string? Description { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int Amount { get; set; }

        public string? ImageUrl { get; set; }
    }
}