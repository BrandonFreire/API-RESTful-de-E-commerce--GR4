using Ecommerce.API.DTOs;
using Ecommerce.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Esto mapea automáticamente a /api/receipts
    public class ReceiptsController : ControllerBase
    {
        private readonly IReceiptService _receiptService;

        public ReceiptsController(IReceiptService receiptService)
        {
            _receiptService = receiptService;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<ReceiptResponse>> Create([FromBody] CreateReceiptRequest request)
        {
            var receipt = await _receiptService.CreateReceiptAsync(request);
            return StatusCode(201, receipt);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReceiptResponse>> Read(int id)
        {
            return Ok(await _receiptService.ReadReceiptAsync(id));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReceiptResponse>>> ReadAll()
        {
            return Ok(await _receiptService.GetAllReceiptsAsync());
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<ReceiptResponse>>> ReadByUser(int userId)
        {
            return Ok(await _receiptService.GetReceiptsByUserAsync(userId));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult> Delete(int id)
        {
            await _receiptService.DeleteReceiptAsync(id);
            return NoContent();
        }
    }
}