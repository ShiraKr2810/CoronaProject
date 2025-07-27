using System;
using System.Collections.Generic;

namespace Dal.Models
{
    public partial class Vaccination
    {
        public int Id { get; set; }
        public int? MemberId { get; set; }
        public DateTime? VaccineDate { get; set; }
        public string? Manufacturer { get; set; }

        public virtual Member? Member { get; set; }
    }
}
