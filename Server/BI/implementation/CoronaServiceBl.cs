using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Bl.api;
using Bl.data;
using Dal.Models;
using Dal.implementation;

namespace Bl.implementation
{
    public class CoronaServiceBl:ICoronaCrud<CoronaTBL>
    {
        CoronaServiceDal corona = new CoronaServiceDal();
        IMapper mapper;

        public CoronaServiceBl()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<CoronaTBL, Corona>().ReverseMap();
            });

            mapper = config.CreateMapper();
        }

        public bool Create(CoronaTBL item)
        {
            var c = mapper.Map<Corona>(item);
            if(c.PositiveDate!=null&&c.RecoveryDate!=null&& c.PositiveDate <= c.RecoveryDate)
                corona.Create(c);
            else return false;
            return corona != null ? true : false;
            
        }

        public List<CoronaTBL> GetAll()
        {

            var coronas = mapper.Map<List<CoronaTBL>>(corona.GetAll());
            return coronas;
        }

        public CoronaTBL GetCoronasByMemberId(int id)//לתקן
        {
            var coronaList = mapper.Map<CoronaTBL>(corona.GetCoronasByMemberId(id));
            return coronaList;
        }
    }
}
