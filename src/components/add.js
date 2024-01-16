import App from "../App";
import { useState } from "react";
function Add(props){
    const [name,setName] = useState('');
    const [surname,setSurname] = useState('');
    const [idnumber,setIdnumber] = useState('');
    const [posistion,setPosistion] = useState('');
    const addNewEmployee = () => {
        let userData = {
          firstName: "Tshenolo",
          lastName: "Khumalo",
          email: "khumalotshenolo55@gmail.com"
        };
        fetch('http://localhost:8080/addemployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(result => {
            console.log("result: ", result);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
      }
        return (
          <div className="App">
            <button  onClick={addNewEmployee}>addemployee</button>
          </div>
        );
      }
export default Add;
