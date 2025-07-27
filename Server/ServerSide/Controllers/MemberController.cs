using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using Dal.Models;
using Bl.implementation;
using Bl.data;
using Bl.implementation;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class MemberController : Controller
    {


        MemberServiceBL member = new MemberServiceBL();
        //private object product;

        [HttpGet("/GetAllMembers/")]
        public List<MemberTBL> GetAll()
        {
            return member.GetAll();
        }

        [HttpGet("/GetMemberById/")]
        public MemberTBL GetMemberById(int id)
        {
            return member.GetMemberById(id);
        }

        [HttpPost("/CreateMember/")]
        public bool Create(MemberTBL Member2)
        {
            return member.Create(Member2);
        }

        [HttpDelete("/DeleteMemberById/")]
        public void DeleteMemberById(int memberId)
        {
            member.DeleteMemberById(memberId);
        }

        [HttpPut("/UpdateMember")]
        public void UpdateMember(MemberTBL member2)
        {
            member.UpdateMemberById(member2);
        }

    }
}





