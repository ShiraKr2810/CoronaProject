import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import { User } from '../../type/User';
import './AddMember.css';
import * as yup from 'yup'
import { useSelector } from 'react-redux';
import { StoreType } from '../../redux/store';
import axios from 'axios';
import { Button } from 'react-bootstrap';

interface AddMemberProps { }

function AddMember() {
  const allStore = useSelector((store: StoreType) => store)
  const [isFormValid, setIsFormValid] = useState(false);

    // Check if the form is valid and update state accordingly
  const handleFormValidation = () => {
    myForm.validateForm().then((errors) => {
      setIsFormValid(Object.keys(errors).length == 0);
    });
  };
    
  async function sendToServer() {
    try {
      const response = await axios.post(`https://localhost:7258/CreateMember`, myForm.values);
      alert('Member added successfully!'); // Show success message only after successful response
    } catch (error) {
      console.error('Error adding member:', error); // Log the error details for debugging
  
      // Handle the error for the user (optional):
      alert('error');
    }
  }
  // יצירת אובייקט של טופס לניהול הטופס שלי
  const myForm = useFormik({
    initialValues: {
      id: undefined,
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      telephone: "",
      phone: "",
      city: "",
      street: "",
      houseNumber: undefined
    },
      onSubmit: sendToServer,
      validationSchema: yup.object().shape({
        id:yup.number().required('can not be empty'),
        firstName: yup.string().required('can not be empty'),
        lastNeme: yup.string().required('can not be empty'),
        dateOfBirth: yup.string().required('can not be empty'),
        telephone: yup.string(),
        phone: yup.string().required('can not be empty'),
        city: yup.string(),      
        street: yup.string(),
        houseNumber: yup.number()
      }),
      validateOnChange: false, // Disable onChange validation
    })



  return (
    <React.Fragment>
      <div className="AddMemberForm">
        <form id="addMemberForm" onSubmit={(e) => { e.preventDefault();
          if (isFormValid) sendToServer();
          else {alert('Please fill all required fields.');}
        }}>
          <h3 style={{color:'black'}}>Add Member</h3>

          <label>id:</label>
          <input type="text" onBlur={myForm.handleChange} id="id" name="id" /><br></br>
          {myForm.errors.id ? <p className="error-p">*{myForm.errors.id}</p> : ''}<br></br>
          
          <label>first name:</label>
          <input type="text" onBlur={myForm.handleChange} id="firstName" name="firstName" /><br></br>
          {myForm.errors.firstName ? <p className="error-p">*{myForm.errors.firstName}</p> : ''}<br></br>

          <label>last name:</label>
          <input type="text" onBlur={myForm.handleChange} id="lastName" name="lastName" /><br></br>
          {myForm.errors.lastName ? <p className="error-p">*{myForm.errors.lastName}</p> : ''}<br></br>

          <label>date of birth:</label>
          <input type="date" placeholder="XX.XX.XXXX" onBlur={myForm.handleChange} id="dateOfBirth" name="dateOfBirth" /><br></br>
          {myForm.errors.dateOfBirth ? <p className="error-p">*{myForm.errors.dateOfBirth}</p> : ''}<br></br>

          <label>telephone:</label>
          <input type="text" minLength={9} maxLength={9} onBlur={myForm.handleChange} id="telephone" name="telephone" /><br></br><br></br>

          <label>phone:</label>
          <input type="text" minLength={10} maxLength={10} onBlur={myForm.handleChange} id="phone" name="phone" /><br></br>
          {myForm.errors.phone ? <p className="error-p">*{myForm.errors.phone}</p> : ''}<br></br>

          <label>adress: </label><br></br>
          <label>city </label>
          <input type="text" onBlur={myForm.handleChange} id="city" name="city" /><br></br><br></br>

          <label>street:</label>
          <input type="text" onBlur={myForm.handleChange} id="street" name="street" /><br></br><br></br>

          <label>house number </label>
          <input type="number" onBlur={myForm.handleChange} id="houseNumber" name="houseNumber" /><br></br>
          <Button onClick={()=>handleFormValidation()} type='submit' variant="dark">add</Button>

        </form>
      </div>
    </React.Fragment>
  )

}
export default AddMember;

