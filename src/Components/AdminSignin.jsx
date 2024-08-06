import React,{useState} from 'react';
import {AdminSignInContainer,FormContainer,InputField,SubmitButton} from "../Styles/AdminSigninStyles";
import axios from 'axios';


const AdminSignin = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post("https://student-management-project.onrender.com/api/v1.1/admin/signin",{email, password }); 
          if (response.status === 200) {
            // Sign-in successful, redirect to admin dashboard
            window.location.href = '/admin/dashboard';
          } else {
            // Handle sign-in errors
            console.error('Sign-in failed');
          }
        } catch (error) {
          console.error('Error during sign-in:', error.response ? error.response.data : error.message);
        }
      };
    return (
        
        <AdminSignInContainer>
        <h2>Admin Sign In</h2>
        <FormContainer>
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
          <SubmitButton onClick={handleSignIn}>Sign In</SubmitButton>
        </FormContainer>
      </AdminSignInContainer>    
        
    );
};

export default AdminSignin;