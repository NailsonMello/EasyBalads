namespace EasyBalads.Dominio
{
    public class EasyBalad
    {
        
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public int QtdPessoas { get; set; }
        public string ImagemURL { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public string cep { get; set; }
        public string address_type { get; set; }
        public string address_name { get; set; }
        public string address { get; set; }
       
        public string district { get; set; }
        
        public string city { get; set; }
        public string state { get; set; }
        public string lat { get; set; }
        public string lng { get; set; }
        public string city_ibge { get; set; }
        public string ddd { get; set; }
    }
}