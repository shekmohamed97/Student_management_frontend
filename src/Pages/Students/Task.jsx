import React,{useState,useEffect} from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
    AssignmentsContainer,
    SidebarContainer,
    Content,
    AssignmentCard,
    AssignmentTitle,
    AssignmentDescription,
    AssignmentButton,
    AssignmentDoneMessage

} from "../../Styles/Task"


const Task = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
      }, []);
    

      const fetchTasks = async () => {
        try {
          const response = await axios.get('https://student-management-project.onrender.com/api/v1.1/task/getall');
          setTasks(response.data.tasks);
        } catch (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Error fetching tasks:', error.response.status, error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('Error fetching tasks: No response from server');
          } else {
            // Something else happened in making the request that triggered an error
            console.error('Error fetching tasks:', error.message);
          }
        }
      };
      

      const handleDoTasks = async (taskId) => {
        try {
          // Assuming you have an API endpoint to mark a task as done
          const response = await axios.put(`https://student-management-project.onrender.com/api/v1.1/task/${id}/submit`);
          if (response.data.success){
            setTasks((prevTasks)=>
              prevTasks.map((task)=>
                 task._id===id ?{...task, done:true}:task
              )
            )
          }else{
            console.error("Failed to mark task as done :",response.data.message);
          }
        }catch(error){
          console.error("Error marking task as done",error.message);
        }
      };
      

    return (
        <AssignmentsContainer>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <Content>
          <h1>Tasks</h1>
          {tasks.map((task) => (
            <AssignmentCard key={task.id}>
              <AssignmentTitle>{task.title}</AssignmentTitle>
              <AssignmentDescription>{task.description}</AssignmentDescription>
              {!task.done ? (
                <TaskForm onDoTask={() => handleDoTasks(task.id)} />
              ) : (
                <AssignmentDoneMessage>Task Done</AssignmentDoneMessage>
              )}
            </AssignmentCard>
          ))}
        </Content>
      </AssignmentsContainer>
    );
  };
  
  const TaskForm = ({ onDoTask }) => {
    const [opinion, setOpinion] = useState('');
  
    const handleInputChange = (event) => {
      setOpinion(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (opinion.trim() !== '') {
        onDoTask();
      } else {
        alert("Please provide your opinion/Task.");
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <textarea value={opinion} onChange={handleInputChange} placeholder="Enter your opinion/Task..." />
        <AssignmentButton type="submit">Submit</AssignmentButton>
      </form>
    );
};

export default Task;