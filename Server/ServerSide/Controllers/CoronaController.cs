using Microsoft.AspNetCore.Mvc;
using Dal.Models;
using Bl.implementation;
using Bl.data;
using Bl.implementation;


namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CoronaController : Controller
    {


        CoronaServiceBl corona = new CoronaServiceBl();
        //private object product;

        [HttpGet("/GetAllCoronas/")]
        public List<CoronaTBL> GetAll()
        {
            return corona.GetAll();
        }

        [HttpPost("/CreateCorona/")]
        public bool Create(CoronaTBL Corona2)
        {
            return corona.Create(Corona2);
        }


        [HttpGet("/GetCoronasByMemberId/")]
        public CoronaTBL GetCoronasByMemberId(int id)
        {
            return corona.GetCoronasByMemberId(id);
        }
    }
}


