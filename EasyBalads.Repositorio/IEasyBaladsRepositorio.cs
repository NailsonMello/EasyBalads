using System.Threading.Tasks;
using EasyBalads.Dominio;

namespace EasyBalads.Repositorio
{
    public interface IEasyBaladsRepositorio
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void DeleteRange<T>(T[] entity) where T : class;
        Task<bool> SaveChangesAsync();

        Task<EasyBalad[]> GetAllEasyAsyncByNome(string nome);
        Task<EasyBalad[]> GetAllEasyAsync();
        Task<EasyBalad> GetEasyAsyncById(int Id);
    }
}