using System.Linq;
using System.Threading.Tasks;
using EasyBalads.Dominio;
using Microsoft.EntityFrameworkCore;

namespace EasyBalads.Repositorio
{
    public class EasyBaladsRepositorio : IEasyBaladsRepositorio
    {
        private readonly EasyBaladsContext _context;
        public EasyBaladsRepositorio(EasyBaladsContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
           
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public void DeleteRange<T>(T[] entityArray) where T : class
        {
            _context.RemoveRange(entityArray);
        }

        public async Task<EasyBalad[]> GetAllEasyAsync()
        {
            IQueryable<EasyBalad> query = _context.easyBalad;
             query = query.AsNoTracking()
                        .OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }

        public async Task<EasyBalad[]> GetAllEasyAsyncByNome(string nome)
        {
            IQueryable<EasyBalad> query = _context.easyBalad;
             query = query.AsNoTracking()
                        .OrderByDescending(c => c.DataEvento)
                        .Where(c => c.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<EasyBalad> GetEasyAsyncById(int Id)
        {
            IQueryable<EasyBalad> query = _context.easyBalad;
            query = query
                        .AsNoTracking()
                        .OrderBy(c => c.Id)
                        .Where(c => c.Id == Id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
           return (await _context.SaveChangesAsync()) > 0;
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
    }
}