import React,{useState,useEffect} from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
    ClassContainer,
    Content,
    ClassHeader,
    ClassesContent,
    ClassList,
    ClassItem,
    AddClassForm,
    AddClassInput,
    AddClassButton
} from "../../Styles/ClassStyles"
const Class = () => {

    const[newClassName,setNewClassName]=useState("");
    const[classes,setClasses]=useState([]);
    
    useEffect(()=>{
        fetchClasses();
    },[])

    const fetchClasses=async()=>{
     try{   
      const response = await axios.get('https://student-management-project.onrender.com/api/v1.1/class/getall');
      if (response.data && Array.isArray(response.data.classes)) {
        setClasses(response.data.classes);
      } else {
        console.error('Error fetching classes: Invalid data format', response.data);
      }
    } catch (error) {
      console.error('Error fetching classes:', error.message);
    }
    }

    const handleAddClass = async (e) => {
        e.preventDefault();
        if (newClassName.trim() !== '') {
          try {
            const response = await axios.post('https://student-management-project.onrender.com/api/v1.1/class/create', { grade: newClassName });
            console.log('Response data:', response.data); // Log the response data
            setClasses(prevClasses => {
              if (Array.isArray(prevClasses)) {
                return [...prevClasses, response.data]; // Use callback function to update state
              } else {
                console.error('Error adding class: Invalid state for classes:', prevClasses);
                return []; // Reset classes state to an empty array
              }
            });
            setNewClassName('');
          } catch (error) {
            console.error('Error adding class:', error);
          }
        }
      };
    return (
        <ClassContainer>
      <Sidebar />
      <Content>
        <ClassesContent>
          <ClassHeader>Classes</ClassHeader>
          <AddClassForm onSubmit={handleAddClass}>
            <AddClassInput
              type="text"
              placeholder="Enter class name"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
            />
            <AddClassButton type="submit">Add Class</AddClassButton>
          </AddClassForm>
          <ClassList>
            {/* Ensure that classes is an array before mapping over it */}
            {Array.isArray(classes) && classes.map((classItem, index) => (
              <ClassItem key={index}>{classItem.grade}</ClassItem>
            ))}
          </ClassList>
        </ClassesContent>
      </Content>
    </ClassContainer>
    );
};

export default Class;