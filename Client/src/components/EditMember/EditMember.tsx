import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import './EditMember.css';
import { Member } from "../../type/Member.type";
import { Button } from "react-bootstrap";
import axios from "axios";

function EditMember() {
    const location = useLocation();
    const { member } = location.state;
    const [updatedMember, setUpdatedMember] = useState<Member>(member);
    const navigate=useNavigate();

    async function onSubmitMemberClick() {
        if (!updatedMember.firstName || !updatedMember.lastName || !updatedMember.telephone || !updatedMember.phone || !updatedMember.city || !updatedMember.street || !updatedMember.houseNumber) {
            alert("Please fill in all required fields.");
            // setErrorMessage("Please fill in all required fields.");
            return;
        }
        updatedMember.houseNumber=Number(updatedMember.houseNumber)
        setUpdatedMember({...updatedMember})
        // setUpdatedMember({...updatedMember,[houseNumber]:Number(updatedMember.houseNumber)})
        const memberData = JSON.stringify(updatedMember);
        try{
            const response = await axios.put(`https://localhost:7258/UpdateMember`, memberData, {
              headers: { 'Content-Type': 'application/json' },
            });
            console.log('updated'); alert('updated')
            navigate("/members")
        }catch{
            alert('error')
        }
    };

    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setUpdatedMember({ ...updatedMember, [name]: value });
        // console.log("updatedMember", updatedMember);
    };


    return (
        <div className="EditMember">
            <label>Member details:</label>
            <br/><label htmlFor="Id">Id</label>
            <input type="text" id="id" name="id" value={updatedMember.id} placeholder="" disabled onChange={handleInputChange} />
            <br />

            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstname" value={updatedMember.firstName} onChange={handleInputChange} />
            <br />

            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value={updatedMember.lastName} onChange={handleInputChange} />
            <br />


            <label htmlFor="telephone">Telephone:</label>
            <input type="text" id="telephone" name="telephone" value={updatedMember.telephone} maxLength={9} onChange={handleInputChange} />
            <br />

            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="phone" value={updatedMember.phone} maxLength={10} onChange={handleInputChange} />
            <br /><br />

            <label>Address:</label><br/>
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" value={updatedMember.city} onChange={handleInputChange} />
            <br />

            <label htmlFor="street">Street:</label>
            <input type="text" id="street" name="street" value={updatedMember.street} onChange={handleInputChange} />
            <br />

            <label htmlFor="houseNumber">House Number:</label>
            <input type="number" id="number" name="houseNumber" value={updatedMember.houseNumber} onChange={handleInputChange} />
            <br />

            <Button onClick={() => onSubmitMemberClick()}>Submit</Button>
        </div>
    );
}

export default EditMember;