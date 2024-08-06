import React, { useState } from 'react';
import {AdminRegisterContainer,FormContainer,InputField,SubmitButton} from "../Styles/AdminRegisterStyles";
import axios from "axios";


const AdminRegister = () => {
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone,setPhone]=useState("");
    

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission
      
        try {
          const response = await axios.post("https://student-managment-system-zja5.onrender.com/api/v1.1/admin/register",{firstName,lastName, email, password,phone }); 
          if (response.status === 200) {
            // Registration successful, redirect to admin login
            window.location.href = '/admin-signIn';
          } else {
            // Handle registration errors
            console.error('Registration failed');
          }
        } catch (error) {
          console.error('Error during registration:', error);
        }
      };

    return (
        
        <AdminRegisterContainer>
      <h2>Admin Register</h2>
      <FormContainer>
        
      <InputField
          type="text"
          placeholder="FirstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <InputField
          type="text"
          placeholder="LastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <InputField
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <SubmitButton onClick={(e) => handleRegister(e)}>Register</SubmitButton>

      </FormContainer>
    </AdminRegisterContainer>    
        
    );
};

export default AdminRegister;