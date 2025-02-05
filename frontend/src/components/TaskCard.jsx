import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { deleteTask, updateTask } from '../api/tasks';

function TaskCard({ task, onDelete }) {
    const navigate = useNavigate();
    const [completed, setCompleted] = useState(task.completed); // Estado local para controlar si la tarea está completada

    const toggleCompleted = async () => {
        try {
            const res = await updateTask(task._id, { completed: !completed });
            console.log(res);
            setCompleted(!completed); // Actualizamos el estado local
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className={`bg-slate-600 p-4 hover:cursor-pointer hover:bg-gray-950 ${
                completed ? 'bg-green-800 hover:bg-green-950' : ''
            }`}
        >
            <div className="flex justify-between">
                <h2 className="font-bold text-2xl">{task.title}</h2>
                <button onClick={toggleCompleted}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className={'size-6 hover:text-green-500'}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </button>
            </div>
            <p className="text-slate-300">{task.description}</p>
            <div className="mt-5">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => {
                        navigate(`/tasks/${task._id}`);
                    }}
                >
                    Edit
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 ml-5 rounded"
                    onClick={async () => {
                        try {
                            deleteTask(task._id)
                            onDelete(task._id);
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskCard;
