import React,{useState,useEffect} from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
    StudentsContainer,
    Content,
    StudentsContent,
    StudentsHeader,
    StudentList,
    StudentItem,
    AddStudentForm,
    AddStudentInput,
    AddStudentButton
} from "../../Styles/StudentStyles"


const Students = () => {

    const [newStudent, setNewStudent] = useState({ name: '', registrationNumber: '', grade: '' });
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
      }, []);

      const fetchStudents = async () => {
        try {
          const response = await axios.get("https://student-management-project.onrender.com/api/v1.1/student/getall");
          setStudents(response.data.students);
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      };
    return (
        <StudentsContainer>
        <Sidebar />
        <Content>                                          
          <StudentsContent>
            <StudentsHeader>Students</StudentsHeader>
            <StudentList>
            {students.map((student) => (
              <StudentItem key={student.id}>
                {student.name} - {student.registrationNumber} - {student.grade}
              </StudentItem>
            ))}
          </StudentList>
          </StudentsContent>
        </Content>
      </StudentsContainer>
    );
};

export default Students;