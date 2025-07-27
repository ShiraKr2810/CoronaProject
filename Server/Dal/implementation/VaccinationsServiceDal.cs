using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.api;
using Dal.Models;

namespace Dal.implementation
{
    public class VaccinationsServiceDal : IVaccinationsServiceDal
    {
        public bool Create(Vaccination vaccination)
        {
            MyContext db = new MyContext();

            db.Vaccinations.Add(vaccination);

            int x = db.SaveChanges();

            return x == 0 ? true : false;
            db.SaveChanges();
        }
        public List<Vaccination?> GetAll()
        {
            MyContext db = new MyContext();
            var vaccinations = db.Vaccinations.ToList<Vaccination>();
            return vaccinations;
        }

        public List<Vaccination> GetVaccinatinsByMemberId(int id)
        {
            MyContext db = new MyContext();
            return db.Vaccinations.Where(x => x.MemberId == id).ToList<Vaccination>();
        }

        //public void DeleteVaccinationByMemberId(int memberId)
        //{
        //    MyContext db = new MyContext();
        //    var vaccinationsList = db.Vaccinations.ToList().Where(x => x.MemberId == memberId);
        //    foreach (var vaccination in vaccinationsList)
        //        db.Vaccinations.Remove((Vaccination)vaccination);
        //    db.SaveChangesAsync();
        //}
        public void DeleteVaccinationByMemberId(int memberId)
        {
            MyContext db = new MyContext();
            var vList=db.Vaccinations.Where(v => v.MemberId == memberId).ToList();
            foreach (var v in vList)
                db.Vaccinations.Remove(v);

            db.SaveChanges();

        }
    }

}