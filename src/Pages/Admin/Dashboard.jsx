import React,{useState,useEffect} from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import Announcement from './Announcement';

import {
    AdminDashboardContainer,
    Content,
    TopContent,
    BottomContent,
    Section,
    SectionTitle,
    CardContainer,
    Card,
    CardTitle,
    CardContent
} from "../../Styles/DashboardStyles"

const Dashboard = () => {
      
    const [isOpen,setIsOpen]=useState(true);
    const[announcement,setAnnouncement]=useState([]);

    useEffect(()=>{
        fetchAnnouncement();
    },[]);

    const fetchAnnouncement = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
          setAnnouncement(response.data.announcements || []);
        } catch (error) {
          console.error('Error fetching announcements:', error);
        }
      };


    return (
        <AdminDashboardContainer>
        <Sidebar />
        <Content isOpen={isOpen}>
          <TopContent>
            <Section>
              <SectionTitle>Overview</SectionTitle>
              <CardContainer>
                <Card>
                  <CardTitle>Total Students</CardTitle>
                  <CardContent>500</CardContent>
                </Card>
                <Card>
                  <CardTitle>Total Teachers</CardTitle>
                  <CardContent>50</CardContent>
                </Card>
                <Card>
                  <CardTitle>Total Classes</CardTitle>
                  <CardContent>50</CardContent>
                </Card>
              </CardContainer>
            </Section>
          </TopContent>
  
          <BottomContent>
            <Announcement announcements={announcement} />
          </BottomContent>
        </Content>
      </AdminDashboardContainer>
    );
};

export default Dashboard;