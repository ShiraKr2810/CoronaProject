import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { FC, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import MyNav from './components/MyNav/MyNav';
import UserDetails from './components/MemberDetails/MemberDetails';
import { NOTFOUND } from 'dns';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from './redux/store';
import Members from './components/Members/Members';
import MemberDetails from './components/MemberDetails/MemberDetails';
import AddMember from './components/AddMember/AddMember';
import EditMember from './components/EditMember/EditMember';
import SummaryView from './components/SummaryView/SummaryView';


function App() {
  const[currentUser,setCurrentUser]=useState<any>(7)
    //האזנה לחנות
    const allStore=useSelector((store:StoreType)=>store)

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<LogIn></LogIn>}></Route> */}
        <Route path='/' element={<MyNav></MyNav>}>
          <Route path='members' element={<Members></Members>}></Route>
          <Route path='members/:memberId' element={<MemberDetails></MemberDetails>}></Route>
          <Route path='addMember' element={<AddMember></AddMember>}></Route>
          <Route path='edit-member/:memberId' element={<EditMember></EditMember>}></Route>
          <Route path={'summary-view'} element={<SummaryView></SummaryView>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
