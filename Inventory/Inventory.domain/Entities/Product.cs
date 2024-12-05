using System.ComponentModel.DataAnnotations;

namespace Inventory.domain.Entities
{
    public class Product
    {
        [Key]
        public int IdProduct { get; set; }
        public string Name { get; set; }
        public string TypeProcessing { get; set; }
        public string State { get; set; }
        [Required]
        public string Stock { get; set; } = "Disponible";
        [Required]
        public string Category { get; set; }
        public DateTime DateRecord { get; set; }
    }
}
