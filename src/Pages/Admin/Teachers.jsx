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
} from "../../Styles/TechaersStyles"

const Teachers = () => {

    const [newTeacher, setNewTeacher] = useState({ name: '', email: '', subject: '' });
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


  const handleAddTeacher = async (e) => {
    e.preventDefault();
    if (newTeacher.name.trim() !== '' && newTeacher.email.trim() !== '' && newTeacher.subject.trim() !== '') {
      try {
        const response = await axios.post('https://student-management-project.onrender.com/api/v1.1/teacher/create', newTeacher);
        const createdTeacher = response.data.teacher;
        setTeachers([...teachers, createdTeacher]);
        setNewTeacher({ name: '', email: '', subject: '' });
      } catch (error) {
        console.error('Error adding teacher:', error);
      }
    }
  };

    return (
        <TeachersContainer>
      <Sidebar />
      <Content>
        <TeachersContent>
          <TeachersHeader>Teachers</TeachersHeader>
          <AddTeacherForm onSubmit={handleAddTeacher}>
            <AddTeacherInput
              type="text"
              placeholder="Enter teacher name"
              value={newTeacher.name}
              onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
            />
            <AddTeacherInput
              type="email"
              placeholder="Enter teacher email"
              value={newTeacher.email}
              onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
            />
            <AddTeacherInput
              type="text"
              placeholder="Enter teacher subject"
              value={newTeacher.subject}
              onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
            />
            <AddTeacherButton type="submit">Add Teacher</AddTeacherButton>
          </AddTeacherForm>
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
