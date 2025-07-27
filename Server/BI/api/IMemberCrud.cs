using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.api
{
    public interface IMemberCrud<T>
    {
        public List<T> GetAll();
        public bool Create(T item);
        public void DeleteMemberById(int memberId);
        public T GetMemberById(int id);
        public void UpdateMemberById(T item);
    }
}
