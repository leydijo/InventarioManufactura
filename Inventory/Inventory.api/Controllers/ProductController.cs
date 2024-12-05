using Inventory.api.Models;
using Inventory.application.Interfaces;
using Inventory.domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [Authorize]
        [HttpGet("products")]
        public async Task<IActionResult> GetProducts()
        {
            try
            {
                var products = await _productService.GetProductsAsync();
                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] Product product)
        {
            try
            {
                await _productService.AddProductAsync(product);
                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] UpdateProductRequest request)
        {
            
            if (id != request.IdProduct)
            {
                return BadRequest("Product ID does not exist.");
            }
            try
            {
                var result = await _productService.UpdateProductAsync(request.IdProduct, request.Stock, request.State);
                if(result) return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                await _productService.DeleteProductAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("bulk-upload")]
        public async Task<IActionResult> BulkUploadProducts([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            List<Product> products = new List<Product>();

            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                string line;
                while ((line = await reader.ReadLineAsync()) != null)
                {
                    var productData = line.Split(',');

                    if (productData.Length >= 2)
                    {
                        var product = new Product
                        {
                            Name = productData[0],
                            TypeProcessing = productData[1],
                            State = productData[2],
                            Stock = string.IsNullOrEmpty(productData[3]) ? "Disponible" : productData[3],
                            Category = productData[4],
                            DateRecord = DateTime.Now
                        };

                        products.Add(product);
                    }
                }
            }
            var result = await _productService.BulkCreateProductsAsync(products);

            if (result)
            {
                return Ok("Productos cargados correctamente.");
            }

            return StatusCode(500, "Error al guardar los productos.");
        }


    }
}
