import React from 'react';
import Sidebar from './Sidebar';
import {
     ProfileContainer,
     SidebarContainer,
     Content,
     ProfileHeader,
     ProfileDetails,
     ProfileLabel,
     ProfileInfo,
     EditButton
} from "../../Styles/SettingsProfileStyles"

const SettingsProfile = () => {

   const teacherInfo={
    name:"john Doe",
    email:"johndeo@gmail.com",
    phone:"1234-567-890",
    address:"123 main st, city,Country",
    qualification:"Master of education"
   };


   
    return (
          <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ProfileHeader>Profile Details</ProfileHeader>
        <ProfileDetails>
          <ProfileLabel>Name:</ProfileLabel>
          <ProfileInfo>{teacherInfo.name}</ProfileInfo>
          <ProfileLabel>Email:</ProfileLabel>
          <ProfileInfo>{teacherInfo.email}</ProfileInfo>
          <ProfileLabel>Phone:</ProfileLabel>
          <ProfileInfo>{teacherInfo.phone}</ProfileInfo>
          <ProfileLabel>Address:</ProfileLabel>
          <ProfileInfo>{teacherInfo.address}</ProfileInfo>
          <ProfileLabel>Qualification:</ProfileLabel>
          <ProfileInfo>{teacherInfo.qualification}</ProfileInfo>
        </ProfileDetails>
        <EditButton>Edit Profile</EditButton>
      </Content>
    </ProfileContainer>
    );
};

export default SettingsProfile;