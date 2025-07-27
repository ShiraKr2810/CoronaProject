using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.api;
using Dal.Models;

namespace Dal.implementation
{
    public class MemberServiceDal:IMemberServiceDal
    {
        public bool Create(Member member)
        {
            MyContext db = new MyContext();

            db.Members.Add(member);

            int x = db.SaveChanges();

            return x == 0 ? true : false;
            db.SaveChanges();
        }
        public List<Member?> GetAll()
        {
            MyContext db = new MyContext();

            var members = db.Members.ToList<Member>();

            return members;

        }

        public void DeleteMemberById(int memberId)
        {
            MyContext db = new MyContext();
            var m = db.Members.ToList().Find(x => x.Id == memberId);
            if (m != null)
            {
                db.Members.Remove(m);
                db.SaveChanges();
            }


        }
        public Member GetMemberById(int id)
        {
            MyContext db = new MyContext();
            Member m=db.Members.ToList().Find(x=>x.Id==id);
            return m;
        }
        public void UpdateMemberById(Member m)
        {
            MyContext db = new MyContext();
            Member member = db.Members.ToList().Find(x => x.Id == m.Id);
            member.FirstName = m.FirstName;
            member.LastName = m.LastName;
            member.Telephone = m.Telephone;
            member.Phone = m.Phone;
            member.City = m.City;
            member.Street = m.Street;
            member.HouseNumber = m.HouseNumber;
            db.SaveChanges();
        }
    }
}
