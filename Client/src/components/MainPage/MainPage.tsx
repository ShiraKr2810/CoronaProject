import React, { FC, useEffect, useState } from 'react';
import './MainPage.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import axios, { all } from 'axios';
import { User } from '../../type/User';
import { useSelector } from 'react-redux';
import { StoreType } from '../../redux/store';
import { useFormik } from 'formik';
import * as yup from 'yup'
interface MainPageProps { }

function MainPage() {
  const userRducer = useSelector((store: StoreType) => store.userReducer)
  const navigate = useNavigate();
  const [list, setList] = useState<User[]>([])
  const [showList, setShowList] = useState(false)
  const [showSpinner, setShowspinner] = useState(false)
  const allStore = useSelector((store: StoreType) => store)
  const [messageList, setMessageList] = useState<any[]>([])

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setMessageList(response.data);
      })
  }, [])

  const getUserList = () => {
    setShowspinner(true)
    let a = axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => {
        let a = list.concat(response.data);
        setList([...a]);
        setShowspinner(false)
      })
  }
  useEffect(() => {
    getUserList()
    setShowList(true)
  }, [])
  const shoeUserDetails = (id: number) => {
    navigate(`/myNav/main-page/${id}`)
  }
  const sortByName = () => {
    const sortedList = list.sort((a, b) => a.username.localeCompare(b.username));
    setList([...sortedList]);
  }

  const myForm = useFormik({
    initialValues: {
      userId: allStore.userReducer.userId,
      body: "",
      title: ""
    },
    validationSchema: yup.object().shape({
      body: yup.string().required("can't be empty"),
      title: yup.string().required("can't be empty")
    }),
    onSubmit: sendPostToServer
  })
  async function sendPostToServer() {
    await axios.post("https://jsonplaceholder.typicode.com/posts", myForm.values)
    alert("success")
    messageList.push(myForm.values)
    setMessageList([...messageList])
  }

  return (
    <div>
      <p style={{ color: 'black' }}>hello {allStore.userReducer.username}</p>
      {allStore.userReducer.userId == 7 ? (<div className="User">
        {showSpinner ? <Spinner animation="border" variant="primary" /> : ''}
        <table style={{ color: "black" }}>
          <tr>
            <td ><b>user id</b></td>
            <td><b>name</b></td>
            <td><b>email</b></td>
          </tr>
          {list.map((user, index) => {
            return (<tr onClick={() => { shoeUserDetails(user.id) }}><td>{user.id}</td><td>{user.username}</td><td>{user.email}</td></tr>)
          })
          }
        </table>
        <Button onClick={sortByName} variant="dark">sort by name</Button>
      </div>) : (<div className="UserDetails">
        <ul id="ul">
          {
            messageList ? messageList.filter((user, index) => user.userId == Number(allStore.userReducer.userId)).map((a, index) => (
              <li>
                {index + 1}. {a.title}
                {a.body}
              </li>
            )) : ""
          }
        </ul>
        {/* קומפוננטה להוסיף הודעה */}
        <div className="AddMessage">
          <h3 style={{ color: 'black' }}>Add message</h3>
          <form id='addMessageForm' onSubmit={myForm.handleSubmit}>
            <div className="login__field">
              <input type="text" name="title" onBlur={myForm.handleChange} className="login__input" placeholder="title" />
              {myForm.errors.title ? <p className="error-p">* {myForm.errors.title}</p> : ''}
            </div>
            <br></br>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input type="text" name='body' onBlur={myForm.handleChange} className="login__input" placeholder="body" />
              {myForm.errors.body ? <p className="error-p">* {myForm.errors.body}</p> : ''}
            </div>
            <br></br>
            <Button variant="dark" type="submit" className="button login__submit">add message</Button>
          </form>
        </div>
      </div>)}
    </div>
  );
}

export default MainPage;
