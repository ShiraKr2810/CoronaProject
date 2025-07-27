using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.api;
using Dal.Models;
using System.Data.Entity;

namespace Dal.implementation
{
    public class CoronaServiceDal:ICoronaServiceDal
    {
        public bool Create(Corona corona)
        {
            MyContext db = new MyContext();

            db.Coronas.Add(corona);

            int x = db.SaveChanges();

            return x == 0 ? true : false;
            db.SaveChanges();
        }
        public List<Corona?> GetAll()
        {
            MyContext db = new MyContext();

            var coronas = db.Coronas.ToList<Corona>();

            return coronas;
        }

        public Corona GetCoronasByMemberId(int id)
        {
            MyContext db = new MyContext();
            return db.Coronas.ToList().Find(x => x.MemberId == id);
        }
        public void DeleteCoronaByMemberId(int memberId)
        {
            MyContext db = new MyContext();
            var cList = db.Coronas.Where(c => c.MemberId == memberId);
            foreach (var c in cList)
                db.Coronas.Remove(c);
            db.SaveChanges();
            
        }
    }
}
