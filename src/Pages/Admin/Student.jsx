import React, { useEffect, useState } from 'react';
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
const Student = () => {

    const [newStuden,setNewStudent]=useState({name:"",registrationNumber:"",grade:""});
    const [student,setStudent]=useState([]);


    useEffect(()=>{
        fetchStudents();
    },[]);

    const fetchStudents=async()=>{
        try {
            const response = await axios.get('https://student-management-project.onrender.com/api/v1.1/student/getall');
            setStudent(response.data.students);
          } catch (error) {
            console.error('Error fetching students:', error);
          }  
    }

    const handleAddStudent = async (e) => {
        e.preventDefault();
        if (newStuden.name.trim() !== '' && newStudent.registrationNumber.trim() !== '' && newStudent.grade.trim() !== '') {
          try {
            const response = await axios.post('https://student-management-project.onrender.com/api/v1.1/student/create', newStuden);
            setStudent([...student, response.data.student]);
            setNewStudent({ name: '', registrationNumber: '', grade: '' });
          } catch (error) {
            console.error('Error adding student:', error);
          }
        }
      };
    return (
        <StudentsContainer>
        <Sidebar />
        <Content>
          <StudentsContent>
            <StudentsHeader>Students</StudentsHeader>
            <AddStudentForm onSubmit={handleAddStudent}>
              <AddStudentInput
                type="text"
                placeholder="Enter student name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              />
              <AddStudentInput
                type="text"
                placeholder="Enter registration number"
                value={newStudent.registrationNumber}
                onChange={(e) => setNewStudent({ ...newStudent, registrationNumber: e.target.value })}
              />
              <AddStudentInput
                type="text"
                placeholder="Enter grade"
                value={newStudent.grade}
                onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
              />
              <AddStudentButton type="submit">Add Student</AddStudentButton>
            </AddStudentForm>
            <StudentList>
              {students.map((student) => (
                <StudentItem key={student.id}>{student.name} - {student.registrationNumber} - {student.grade}</StudentItem>
              ))}
            </StudentList>
          </StudentsContent>
        </Content>
      </StudentsContainer>
    );
};

export default Student;