namespace Inventory.api.Models
{
    public class UpdateProductRequest
    {
        public int IdProduct { get; set; }
        public string Stock { get; set; }
        public string State { get; set; }
    }
}
