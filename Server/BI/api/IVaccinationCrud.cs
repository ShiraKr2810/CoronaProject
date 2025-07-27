using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.api
{
    public interface IVaccinationCrud<T>
    {
        public List<T> GetAll();
        public bool Create(T item);
        public List<T> GetVaccinatinsByMemberId(int id);
    }
}
