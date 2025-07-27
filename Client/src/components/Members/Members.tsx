import React, { FC, useState, useEffect } from 'react';
import './Members.css';
import axios from 'axios';
import { Member } from '../../type/Member.type'
import { Button, Spinner } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';


const Members = () => {
  const navigate=useNavigate();
  const [memberList, setMemberList] = useState<Member[]>([])
  const [showList, setShowList] = useState(false)

  async function getmemberList(){
    let a = axios.get(`https://localhost:7258/GetAllMembers`)
      .then((response) => {
        let a = response.data;
        setMemberList([...a]);
        console.log("members get all")
      })
  }

  const gotoMemberDetails=(id:any)=>{
    //כשאר רוצים לשלוח לקומפוננטה בנתיב פרמטרים נוספים , אבל שלא יראו בנתיב משלח אובייקט נוסף עם המאפיין state 
    navigate(`/members/${id}`)
  }

  async function deleteMember(id:any){
    await axios.delete(`https://localhost:7258/DeleteMemberById?memberId=${id}`)
    .then(response => {
      console.log(`Deleted member with ID ${id}`);
      getmemberList()
    })
    .catch(error => {
      console.error(error);
    });
  }

  useEffect(() => {
    getmemberList()
  },[]);
  return (
    <div className="Member">

      <table>
        <tr>
          <th>Id</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Date of birth</th>
          <th>Telephone</th>
          <th>Phone</th>
          <th>City</th>
          <th>Street</th>
          <th>House number</th>
          <th></th>
        </tr>
        {
          memberList.map((member,index) => {
            return (<tr><td>{member.id}</td><td>{member.firstName}</td><td>{member.lastName}</td><td>{member.dateOfBirth}</td><td>{member.telephone}</td>
            <td>{member.phone}</td><td>{member.city}</td><td>{member.street}</td><td>{member.houseNumber}</td>
            <td><Button className='btnCRUD' onClick={()=>gotoMemberDetails(member.id)}>view</Button><Button className='btnCRUD' onClick={()=>{navigate("/edit-member/" + member.id, { state: { member } })}}>update</Button><Button onClick={()=>deleteMember(member.id)} className='btnCRUD'>delete</Button></td></tr>)
          })
        }
      </table> 
    </div>
  );
}

export default Members;
