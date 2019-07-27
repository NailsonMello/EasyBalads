﻿// <auto-generated />
using EasyBalads.Repositorio;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace EasyBalads.Repositorio.Migrations
{
    [DbContext(typeof(EasyBaladsContext))]
    [Migration("20190727032924_initPostre")]
    partial class initPostre
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("EasyBalads.Dominio.EasyBalad", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("DataEvento");

                    b.Property<string>("Descricao");

                    b.Property<string>("Email");

                    b.Property<string>("ImagemURL");

                    b.Property<string>("Local");

                    b.Property<string>("Nome");

                    b.Property<int>("QtdPessoas");

                    b.Property<string>("Telefone");

                    b.Property<string>("address");

                    b.Property<string>("address_name");

                    b.Property<string>("address_type");

                    b.Property<string>("cep");

                    b.Property<string>("city");

                    b.Property<string>("city_ibge");

                    b.Property<string>("ddd");

                    b.Property<string>("district");

                    b.Property<string>("lat");

                    b.Property<string>("lng");

                    b.Property<string>("state");

                    b.HasKey("Id");

                    b.ToTable("easyBalad");
                });
#pragma warning restore 612, 618
        }
    }
}
