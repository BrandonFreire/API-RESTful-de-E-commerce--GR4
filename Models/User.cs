using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Ecommerce.API.Models
{
    [Table("users")]
    public class User
    {
        [Key]
        [Column("user_id")]
        public int UserId { get; set; }

        [Required]
        [Column("first_name")]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [Column("last_name")]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [JsonIgnore] // Equivalente a @JsonIgnore para no exponer la contraseña
        public string Password { get; set; } = string.Empty;

        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }

        [JsonIgnore]
        public ICollection<Receipt> Receipts { get; set; } = new List<Receipt>();
    }
}