using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using EasyBalads.Dominio;
using EasyBalads.Repositorio;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestSharp;

namespace EasyBalads.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EasyBaladsController : ControllerBase
    {
        private readonly IEasyBaladsRepositorio _repo;
        public EasyBaladsController(IEasyBaladsRepositorio repo)
        {
            _repo = repo;
        }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllEasyAsync();

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "imgs");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var filename = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName;
                    var fullPath = Path.Combine(pathToSave, filename.Replace("\"", " ").Trim());

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }

                return Ok();
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }

            return BadRequest("Erro ao tentar realizar upload");
        }

        // GET api/values/5
        [HttpGet("{IdEvento}")]
        public async Task<IActionResult> Get(int IdEvento)
        {
            
            try
            {
                var results = await _repo.GetEasyAsyncById(IdEvento);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
        }

         // GET api/values/5
        [HttpGet("getByNome/{nome}")]
        public async Task<IActionResult> Get(string nome)
        {
            
            try
            {
                var results = await _repo.GetAllEasyAsyncByNome(nome);

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco Dados Falhou {ex.Message}");
            }
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post(EasyBalad model)
        {
             try
            {
                _repo.Add(model);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/easybalad/{model.Id}", model);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Banco Dados Falhou {ex.Message}");
            }

            return BadRequest();
        }

        // GET: api/EasyBalads/cep/50000000
        [HttpGet("cep/{cep}")]
        public BuscaCep GetCep(int cep)
        {
            var client = new RestClient("https://cep.awesomeapi.com.br/json/" + cep);
            var RSrequest = new RestRequest(Method.GET);
            RSrequest.AddHeader("Accept", "application/json");
            RSrequest.RequestFormat = DataFormat.Json;

            IRestResponse res = client.Execute(RSrequest);
            BuscaCep buscaCep = JsonConvert.DeserializeObject<BuscaCep>(res.Content);
            if(buscaCep == null)
            {
                return null;
                
            }
            return buscaCep;
        }
         [HttpPut("{Id}")]
        public async Task<IActionResult> Put(int Id, EasyBalad model)
        {
            try
            {
                var evento = await _repo.GetEasyAsyncById(Id);
                if (evento == null) return NotFound();

                _repo.Update(evento);

                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/easybalads/{model.Id}", model);
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou " + ex.Message);
            }

            return BadRequest();
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            try
            {
                var evento = await _repo.GetEasyAsyncById(Id);
                if (evento == null) return NotFound();

                _repo.Delete(evento);

                if (await _repo.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
            }

            return BadRequest();
        }

    }
}