using System.ComponentModel.DataAnnotations;

namespace Inventory.domain.Entities
{
    public class User
    {
        [Key]
        public int IdUser { get; set; }
        [Required]
        public string UserName { get; set; }
        public string FullName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public DateTime DateCreation { get; set; }
        public DateTime LastSession { get; set; }

    }
}
