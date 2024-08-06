import React,{useState,useEffect} from 'react';
import Sidebar from './Sidebar';

import axios from 'axios';
import {
    TeachersContainer,
    Content,
    TeachersContent,
    TeachersHeader,
    TeacherList,
    TeacherItem,
    AddTeacherForm,
    AddTeacherInput,
    AddTeacherButton
} from "../../Styles/TechaersStyles";

const Teachers = () => {
    
    const[newteacher,setnewTeacher]=useState({
        name: '', email: '', subject: '' 
    })
    const [teachers, setTeachers] = useState([]);


    useEffect(() => {
        fetchTeachers();
      }, []);

      const fetchTeachers = async () => {
        try {
          const response = await axios.get('https://student-management-project.onrender.com/api/v1.1/teacher/getall');
          setTeachers(response.data.teachers);
        } catch (error) {
          console.error('Error fetching teachers:', error);
        }
      }; 


    return (
        <TeachersContainer>
        <Sidebar />
        <Content>
          <TeachersContent>
            <TeachersHeader>Teachers</TeachersHeader>
            <TeacherList>
              {teachers.map((teacher) => (
                <TeacherItem key={teacher.id}>{teacher.name} - {teacher.email} - {teacher.subject}</TeacherItem>
              ))}
            </TeacherList>
          </TeachersContent>
        </Content>
      </TeachersContainer>
    );
};

export default Teachers;