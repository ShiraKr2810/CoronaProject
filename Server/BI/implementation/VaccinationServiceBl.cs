using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bl.api;
using Bl.data;
using Dal.Models;
using Dal.implementation;
using AutoMapper;
namespace Bl.implementation
{
    public class VaccinationServiceBl
    {
        VaccinationsServiceDal vaccinationService = new VaccinationsServiceDal();
        IMapper mapper;

        public VaccinationServiceBl()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<VaccinationTBL, Vaccination>().ReverseMap();
            });

            mapper = config.CreateMapper();
        }

        public bool Create(VaccinationTBL item)
        {
            var v = mapper.Map<Vaccination>(item);
            if(v!=null && v.VaccineDate < DateTime.Now)
                vaccinationService.Create(v);
            else return false;
            return vaccinationService != null ? true : false;
        }

        public List<VaccinationTBL> GetAll()
        {
            var vaccinations = mapper.Map<List<VaccinationTBL>>(vaccinationService.GetAll());
            return vaccinations;
        }

        public List<VaccinationTBL> GetVaccinatinsByMemberId(int id)
        {
            var vaccinationList = mapper.Map<List<VaccinationTBL>>(vaccinationService.GetVaccinatinsByMemberId(id));
            return vaccinationList;
        }
    }
}
