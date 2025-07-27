using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.data
{
    public class VaccinationTBL
    {
        public int Id { get; set; }
        public int? MemberId { get; set; }
        public DateTime? VaccineDate { get; set; }
        public string? Manufacturer { get; set; }
    }
}
