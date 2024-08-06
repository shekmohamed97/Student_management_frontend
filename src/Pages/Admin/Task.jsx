import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
    AssignmentsContainer,
    Content,
    AssignmentsContent,
    AssignmentsHeader,
    AssignmentList,
    AssignmentItem,
    AddAssignmentForm,
    AddAssignmentInput,
    AddAssignmentTextArea,
    AddAssignmentButton
} from "../../Styles/Task"
const Task = () => {

    const [newTask,setNewTask]=useState({
        title:"",
        description:"",
        grade:"",
        deadline:""
    });
    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        fetchTasks();
    },[]);

    const fetchTasks=async()=>{
        try {
            const response = await axios.get('https://student-management-project.onrender.com/api/v1.1/task/getall');
            setTasks(response.data.assignments);
          } catch (error) {
            console.error('Error fetching assignments:', error);
          } 
    }


    const handleAddTask = async (e) => {
        e.preventDefault();
        if (newTask.title.trim() !== '' && newTask.description.trim() !== '' && newTask.grade.trim() !== '' && newTask.deadline.trim() !== '') {
          try {
            const response = await axios.post('https://student-management-project.onrender.com/api/v1.1/task/create', newTask);
            // Display success toast message
            toast.success('Task added successfully');
            // Add the new assignment to the list
            setTasks([...tasks, response.data.task]);
            // Clear the form
            setNewTask({ title: '', description: '', grade: '', deadline: '' });
          } catch (error) {
            console.error('Error adding Task:', error);
            // Display error toast message
            toast.error('Error adding Task');
          }
        }
      };

    return (
        <AssignmentsContainer>
      <ToastContainer />
      <Sidebar />
      <Content>
        <AssignmentsContent>
          <AssignmentsHeader>Tasks</AssignmentsHeader>
          <AddAssignmentForm onSubmit={handleAddTask}>
            <AddAssignmentInput
              type="text"
              placeholder="Enter Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <AddAssignmentTextArea
              placeholder="Enter Task description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <AddAssignmentInput
              type="text"
              placeholder="Enter Task grade"
              value={newTask.grade}
              onChange={(e) => setNewTask({ ...newTask, grade: e.target.value })}
            />
            <AddAssignmentInput
              type="text"
              placeholder="Enter Task deadline"
              value={newTask.deadline}
              onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
            />
            <AddAssignmentButton type="submit">Add Task</AddAssignmentButton>
          </AddAssignmentForm>
          <AssignmentList>
            {tasks.map((task) => (
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