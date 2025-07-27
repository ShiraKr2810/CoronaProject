using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.api
{
    public interface ICoronaCrud<T>
    {
        public List<T> GetAll();
        public bool Create(T item);
        public T GetCoronasByMemberId(int id);
    }
}
