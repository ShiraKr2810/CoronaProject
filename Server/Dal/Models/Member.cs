using System;
using System.Collections.Generic;

namespace Dal.Models
{
    public partial class Member
    {
        public Member()
        {
            Coronas = new HashSet<Corona>();
            Vaccinations = new HashSet<Vaccination>();
        }

        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Telephone { get; set; }
        public string? Phone { get; set; }
        public string? City { get; set; }
        public string? Street { get; set; }
        public int? HouseNumber { get; set; }

        public virtual ICollection<Corona> Coronas { get; set; }
        public virtual ICollection<Vaccination> Vaccinations { get; set; }
    }
}
