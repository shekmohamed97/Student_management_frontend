// AssignmentSection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { AssignmentsContainer, Content, AssignmentsContent, AssignmentsHeader, AssignmentList, AssignmentItem, AddAssignmentForm, 
  AddAssignmentInput, AddAssignmentTextArea, AddAssignmentButton } from '../../Styles/Task';
   

const Task = () => {
  const [newTask, setNewTask] = useState({ title: '', description: '', grade: '', deadline: '' });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://student-management-project.onrender.com/api/v1.1/task/getall');
      setTasks(response.data.assignments);
    } catch (error) {
      console.error('Error fetching Task:', error);
    }
  };

  const handleAddTasks = async (e) => {
    e.preventDefault();
    if (newTask.title.trim() !== '' && newTask.description.trim() !== '' && newTask.grade.trim() !== '' && newTask.deadline.trim() !== '') {
      try {
        const response = await axios.post('https://student-management-project.onrender.com/api/v1.1/task/create', newTask);
        setTasks(prevTasks => {
          if (Array.isArray(prevTasks)) {
            return [...prevTasks, response.data.assignments];
          } else {
            console.error('Previous tasks is not an array:', prevTasks);
            return [];
          }
        });
        setNewTask({ title: '', description: '', grade: '', deadline: '' });
      } catch (error) {
        console.error('Error adding assignment:', error);
      }
    }
  };
  
  
  

  return (
    <AssignmentsContainer>
      <Sidebar />
      <Content>
        <AssignmentsContent>
          <AssignmentsHeader>Tasks</AssignmentsHeader>
          <AddAssignmentForm onSubmit={handleAddTasks}>
            <AddAssignmentInput
              type="text"
              placeholder="Enter assignment title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <AddAssignmentTextArea
              placeholder="Enter assignment description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <AddAssignmentInput
              type="text"
              placeholder="Enter assignment grade"
              value={newTask.grade}
              onChange={(e) => setNewTask({ ...newTask, grade: e.target.value })}
            />
            <AddAssignmentInput
              type="text"
              placeholder="Enter assignment deadline"
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
            />
            <AddAssignmentButton type="submit">Add Task</AddAssignmentButton>
          </AddAssignmentForm>
          <AssignmentList>
  {tasks && tasks.map((task) => (
    <AssignmentItem key={task.id}>
      <strong>{task.title}: </strong>
      {task.description}, {task.grade}, {task.deadline}
    </AssignmentItem>
  ))}
</AssignmentList>

        </AssignmentsContent>
      </Content>
    </AssignmentsContainer>
  );
};

export default Task;