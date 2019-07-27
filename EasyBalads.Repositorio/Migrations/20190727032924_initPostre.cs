using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace EasyBalads.Repositorio.Migrations
{
    public partial class initPostre : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "easyBalad",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Local = table.Column<string>(nullable: true),
                    DataEvento = table.Column<string>(nullable: true),
                    Nome = table.Column<string>(nullable: true),
                    Descricao = table.Column<string>(nullable: true),
                    QtdPessoas = table.Column<int>(nullable: false),
                    ImagemURL = table.Column<string>(nullable: true),
                    Telefone = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    cep = table.Column<string>(nullable: true),
                    address_type = table.Column<string>(nullable: true),
                    address_name = table.Column<string>(nullable: true),
                    address = table.Column<string>(nullable: true),
                    district = table.Column<string>(nullable: true),
                    city = table.Column<string>(nullable: true),
                    state = table.Column<string>(nullable: true),
                    lat = table.Column<string>(nullable: true),
                    lng = table.Column<string>(nullable: true),
                    city_ibge = table.Column<string>(nullable: true),
                    ddd = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_easyBalad", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "easyBalad");
        }
    }
}
