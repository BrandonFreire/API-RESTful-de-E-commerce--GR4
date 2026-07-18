using Ecommerce.API.Data;
using Ecommerce.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.API.Repositories
{
    public interface IReceiptRepository
    {
        Task<Receipt?> GetByIdAsync(int id);
        Task<List<Receipt>> GetAllAsync();
        Task<List<Receipt>> GetByUserIdAsync(int userId);
        Task<Receipt> AddAsync(Receipt receipt);
        Task DeleteAsync(Receipt receipt);
    }

    public class ReceiptRepository : IReceiptRepository
    {
        private readonly ApplicationDbContext _context;
        public ReceiptRepository(ApplicationDbContext context) => _context = context;

        public async Task<Receipt?> GetByIdAsync(int id) => 
            await _context.Receipts.Include(r => r.User).Include(r => r.Items).ThenInclude(i => i.Product).FirstOrDefaultAsync(r => r.ReceiptId == id);

        public async Task<List<Receipt>> GetAllAsync() => 
            await _context.Receipts.Include(r => r.User).Include(r => r.Items).ThenInclude(i => i.Product).ToListAsync();

        public async Task<List<Receipt>> GetByUserIdAsync(int userId) => 
            await _context.Receipts.Include(r => r.User).Include(r => r.Items).ThenInclude(i => i.Product).Where(r => r.UserId == userId).ToListAsync();

        public async Task<Receipt> AddAsync(Receipt receipt)
        {
            _context.Receipts.Add(receipt);
            await _context.SaveChangesAsync();
            return receipt;
        }

        public async Task DeleteAsync(Receipt receipt)
        {
            _context.Receipts.Remove(receipt);
            await _context.SaveChangesAsync();
        }
    }
}