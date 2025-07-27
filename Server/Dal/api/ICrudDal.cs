using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.api
{
    public interface ICrudDal<T>
    {
        public bool Create(T item);
        public List<T> GetAll();
    }
}
