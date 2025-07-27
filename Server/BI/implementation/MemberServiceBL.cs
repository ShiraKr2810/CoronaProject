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
    public class MemberServiceBL:IMemberCrud<MemberTBL>
    {
        MemberServiceDal memberServiceDal = new MemberServiceDal();
        VaccinationsServiceDal vaccinationsServiceDal = new VaccinationsServiceDal();
        CoronaServiceDal coronaServiceDal = new CoronaServiceDal();
        IMapper mapper;

        public MemberServiceBL()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<MemberTBL, Member>().ReverseMap();
            });

            mapper = config.CreateMapper();
        }

        public bool Create(MemberTBL item)
        {
            var c = mapper.Map<Member>(item);
            if(c!=null && c.FirstName!="" && c.LastName!="" && c.Id!=0 && (c.Phone.All((char a) => char.IsDigit(a))))
            memberServiceDal.Create(c);
            return memberServiceDal != null ? true : false;
        }

        public List<MemberTBL> GetAll()
        {

            var members = mapper.Map<List<MemberTBL>>(memberServiceDal.GetAll());
            return members;
        }

        public MemberTBL GetMemberById(int id)
        {
            var memberList = mapper.Map<MemberTBL>(memberServiceDal.GetMemberById(id));
            return memberList;
        }

        public void UpdateMemberById(MemberTBL member)
        {
            var m=mapper.Map<Member>(member);
            if(m!=null&&m.FirstName!="" && m.LastName!="" && m.DateOfBirth!=null && m.Phone!=null)
                memberServiceDal.UpdateMemberById(m);
            else
                Console.WriteLine("error");
        }
        public void DeleteMemberById(int memberId)
        {
            vaccinationsServiceDal.DeleteVaccinationByMemberId(memberId);
            coronaServiceDal.DeleteCoronaByMemberId(memberId);
            memberServiceDal.DeleteMemberById(memberId);
            
        }
    }
}
