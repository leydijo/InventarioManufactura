using System.ComponentModel.DataAnnotations;

namespace Inventory.domain.Entities
{
    public class Operation
    {
        [Key]
        public int IdOperation { get; set; }
        public int IdProduct { get; set; }
        public string TypeOperation { get; set; }
        public string Quantity { get; set; }
        public DateTime DateOperation { get; set; }
        public Product Product { get; set; }
    }
}
