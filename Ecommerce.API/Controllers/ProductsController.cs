using Ecommerce.API.DTOs;
using Ecommerce.API.Models;
using Ecommerce.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Esto mapea automáticamente a /api/products
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<Product>> Create([FromBody] ProductRequest request)
        {
            var product = await _productService.CreateProductAsync(request);
            return StatusCode(201, product);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Read(int id)
        {
            return Ok(await _productService.ReadProductAsync(id));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> ReadAll()
        {
            return Ok(await _productService.ReadAllProductsAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> Update(int id, [FromBody] ProductRequest request)
        {
            return Ok(await _productService.UpdateProductAsync(id, request));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> Delete(int id)
        {
            await _productService.DeleteProductAsync(id);
            return NoContent();
        }
    }
}