using Microsoft.AspNetCore.Mvc;
using Dal.Models;
using Bl.implementation;
using Bl.data;
using Bl.implementation;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VaccinationController : Controller
    {
        VaccinationServiceBl vaccinatinService = new VaccinationServiceBl();
        //private object product;

        [HttpGet("/GetAllVaccinations/")]
        public List<VaccinationTBL> GetAll()
        {
            return vaccinatinService.GetAll();
        }

        [HttpPost("/CreateVaccination/")]
        public bool Create(VaccinationTBL v)
        {
            return vaccinatinService.Create(v);
        }


        [HttpGet("/GetVaccinationByMemberId/")]
        public List<VaccinationTBL> GetVaccinationByMemberId(int id)
        {
            return vaccinatinService.GetVaccinatinsByMemberId(id);
        }
    }
}
