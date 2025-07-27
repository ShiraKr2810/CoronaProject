import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { StoreType } from '../../redux/store';
import './MyNav.css';

interface MyNavProps {}

const MyNav: FC<MyNavProps> = () => {
const navigate=useNavigate();
const allStore=useSelector((store:StoreType)=>store)
useEffect(() => {
  navigate("/members")
},[]);
  return(<div className="MyNav">
    <div className="topnav">
    <a onClick={()=>{navigate("/members")}} className="active">Members</a>
    <a onClick={()=>{navigate("/addMember")}} className="active">Add Member</a>  
</div>
<Outlet></Outlet>
  </div>
);
}

export default MyNav;
