using EasyBalads.Dominio;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace EasyBalads.Repositorio
{
    public class EasyBaladsContext : DbContext
    {
        public EasyBaladsContext(DbContextOptions<EasyBaladsContext> options) : base(options)
        {}

        public DbSet<EasyBalad> easyBalad {get; set;}
    }
}