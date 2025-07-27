import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { StoreType } from '../../redux/store';
import { Corona } from '../../type/Corona.type';
import { Vaccination } from '../../type/Vaccination.type';
import './MemberDetails.css';
import { Button } from 'react-bootstrap';
import * as yup from 'yup'

interface MemberDetailsProps { }

function MemberDetails() {
  const urlParams = useParams();

  const location = useLocation();
  const [coronaList, setcoronaList] = useState<Corona>()
  const [vaccinationList, setvaccinationList] = useState<Vaccination[]>([])
  const [isCoronaCreateClicked, setisCoronaCreateClicked]=useState(false)
  const allStore=useSelector((store:StoreType)=>store)
  const [isFormValid, setIsFormValid] = useState(false);
  const baseUrl="https://localhost:7258"

  useEffect(()=> { 
    const id=urlParams.memberId
    axios.get(`${baseUrl}/GetCoronasByMemberId?id=${id}`)
    .then((response) => {
      setcoronaList(response.data);
      })
    axios.get(`${baseUrl}/GetVaccinationByMemberId?id=${id}`)
    .then((response) => {
      setvaccinationList(response.data);
      })
  },[])  
  
  
  // Check if the form is valid and update state accordingly
const handleFormValidation = () => {
  console.log((document.getElementById("positiveDate")as HTMLInputElement).value)
  if((document.getElementById("positiveDate")as HTMLInputElement).value !="" && (document.getElementById("recoveryDate")as HTMLInputElement).value!="")
    {setIsFormValid(true);
    createCorona()
  }
  else
    alert("error")
  
};

  async function createVaccination(){
    if(vaccinationList.length<4)
    {
      let vaccineDateStr=(document.getElementById("vaccineDate") as HTMLInputElement).value
      let vaccineDate=new Date((document.getElementById("vaccineDate") as HTMLInputElement).value)
      let manufacturer=(document.getElementById("manufacturer") as HTMLInputElement)?.value
      let today = new Date()
      if(vaccineDate>today){
        alert("vaccine date is invalid");
        return
      }
      if(vaccineDateStr!="" && manufacturer && manufacturer!="")
      {
        const vaccinObj:Vaccination={
          memberId: Number(urlParams.memberId),
          vaccineDate: vaccineDateStr,
          manufacturer: manufacturer
        }
        try {
          const response = await axios.post(`${baseUrl}/CreateVaccination`, vaccinObj);
          alert('Vaccination added successfully!'); console.log('Vaccination added successfully!') // Show success message only after successful response
          vaccinationList.concat(vaccinObj)
          setvaccinationList([...vaccinationList])
          return true
        } 
        catch (error) {
          console.error('Error adding vaccination:', error);
          alert('error in server');
        }
      }
      
    }
    else{
      if(vaccinationList.length>=4)
        alert("The member has been vaccinated four times")
      else
        alert("error")
    }
  }

  const addCorona=()=>{
    setisCoronaCreateClicked(true)
  }
  
  async function createCorona(){
    const positiveDateInput = new Date(Date.parse((document.getElementById("positiveDate") as HTMLInputElement).value));
    const recoveryDateInput = new Date(Date.parse((document.getElementById("recoveryDate") as HTMLInputElement).value));
    
    const coronaObj: Corona = {
      memberId: Number(urlParams.memberId),
      positiveDate: positiveDateInput,
      recoveryDate: recoveryDateInput
    };
    let diff=(recoveryDateInput.getTime() - positiveDateInput.getTime()) / 86_400_000;
    if(positiveDateInput>=recoveryDateInput || diff<6 || diff > 14 || (new Date).getTime()<recoveryDateInput.getTime())
      {alert("error not logical dates"); return}
    try {
      const response = await axios.post(`${baseUrl}/CreateCorona`, coronaObj);
      alert('Corona dates added successfully!'); console.log('Member added successfully!') // Show success message only after successful response
      setcoronaList(coronaObj)
    } 
    catch (error) {
      console.error('Error adding member:', error); // Log the error details for debugging
      // Handle the error for the user (optional):
      alert('error');
    }
    setisCoronaCreateClicked(false)
  }


  return (
    <div className="MemberDetails">
        {coronaList?
            <div id='CoronaDetails'>
              <b>Corona details:</b><br></br>
              <table>
                <tr>
                  <th>Positive date</th>
                  <th>Recovery date</th>
                </tr>
                <tr>
                  <td>{new Date(coronaList.positiveDate).toLocaleDateString()}</td>
                  <td>{new Date(coronaList.recoveryDate).toLocaleDateString()}</td>
                </tr>
              </table>
            </div>
        :<div>
          <b>Corona details:</b><br></br>this member wasn't sick
          {!isCoronaCreateClicked && !coronaList && <Button onClick={()=>addCorona()}>create</Button>}
          {isCoronaCreateClicked?
            <form>        
              <div>
                <label htmlFor="positiveDate">Positive Date:</label>
                <input type="date" name="positiveDate" id="positiveDate" />
              </div>
              <div>
                <label htmlFor="recoveryDate">Recovery Date:</label>
                <input type="date" name="recoveryDate" id="recoveryDate" />
              </div>
              <Button onClick={(e)=>{e.preventDefault();handleFormValidation()}} type='submit' variant='dark'>Submit</Button>
            </form>:''}
        </div>
        }
        <br></br><br></br>
        
        
        <div id='VaccinationDetails'>
          <b>Vaccination details:</b><br></br>
          <table>
            <tr>
              <th>Vaccine date</th>
              <th>Manufacturer</th>
              <th></th>
            </tr>
            {
              vaccinationList.map((v, index)=>{
                return(<tr><td>{new Date(v.vaccineDate).toLocaleDateString()}</td><td>{v.manufacturer}</td></tr>)
              })
            }
            <tr><td><input id="vaccineDate" type='date' required></input></td><td><input id="manufacturer"type='text' required></input></td>
            <td><Button onClick={(e)=>{createVaccination()}}>create</Button></td></tr>
          </table></div>{vaccinationList?.length > 0?"":<div><b>*</b>The member was not vaccinated
        </div>
        }
    </div>
  );
}

export default MemberDetails;
