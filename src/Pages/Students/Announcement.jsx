import React,{useState,useEffect} from 'react';
import Sidebar from "./Sidebar";
import axios from 'axios';
import {
    AnnouncementContainer,
    SidebarContainer,
    Content,
    AnnouncementHeader,
    AnnouncementList,
    AnnouncementItem,
    AnnouncementTitle,
    AnnouncementContent
} from "../../Styles/Announcement";


const Announcement = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true); //
    useEffect(() => {
        fetchAnnouncements();
      }, []);

      const fetchAnnouncements = async () => {
        try {
          const response = await axios.get('https://student-management-project.onrender.com/api/v1.1/announcement/getall');
          setAnnouncements(response.data.announcements);
        } catch (error) {
          console.error('Error fetching announcements:', error);
        }
      }; 
    return (
        <AnnouncementContainer>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <Content>
          <AnnouncementHeader>Announcements</AnnouncementHeader>
          {loading ? (
          <p>Loading...</p> // Show loading indicator
        ) : (
          <AnnouncementList>
            {announcements.map((announcement) => (
              <AnnouncementItem key={announcement._id}>
                <AnnouncementTitle>{announcement.announcement}</AnnouncementTitle>
              </AnnouncementItem>
            ))}
          </AnnouncementList>
        )}
        </Content>
      </AnnouncementContainer>
    );
};

export default Announcement;