using System;
using System.Collections.Generic;

namespace Dal.Models
{
    public partial class Corona
    {
        public int Id { get; set; }
        public int MemberId { get; set; }
        public DateTime? PositiveDate { get; set; }
        public DateTime? RecoveryDate { get; set; }

        public virtual Member Member { get; set; } = null!;
    }
}
