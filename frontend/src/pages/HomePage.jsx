import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";
import { fetchTasks as fetchTasksAPI } from "../api/tasks";

function HomePage() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function getTasks() {
            try {
                const res = await fetchTasksAPI();
                setTasks(res);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
                
            }
        }
        getTasks();
    }, []);

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task._id !== taskId));
    };

    return <
        TaskList tasks={tasks} onDelete={deleteTask} 
        />;
}

export default HomePage;
