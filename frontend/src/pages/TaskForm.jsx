import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { fetchTask, createTask, updateTask, deleteTask } from "../api/tasks";


function TaskForm() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const params = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!params.id) {
                const res = await createTask({ title, description });
                console.log(res);
            } else {
                const res = await updateTask(params.id, { title, description });
                console.log(res);
            }
            navigate(`/`);
        } catch (error) {
            console.log(error)
        }
        e.target.reset();
    };

    useEffect(() => {

        if (params.id) {
            fetchTask(params.id)
                .then(res => {
                    setTitle(res.data.title)
                    setDescription(res.data.description)
                })
                .catch(err => console.log(err));
        }
    }, []);

    return (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
            <form className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
                <h1 className="text-3xl font-bold my-4">
                    {params.id ? "Update Task" : "Create Task"}
                </h1>
                <input
                    type="text"
                    placeholder="title"
                    className="block py-2 px-3 mb-4 w-full text-black"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    autoFocus
                />
                <textarea
                    placeholder="description"
                    rows="3"
                    className="block py-2 px-3 mb-4 w-full text-black"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                ></textarea>
                <button className="
                bg-green-500 
                hover:bg-green-700 
                text-white font-bold py-1 px-2 rounded"
                >
                    {params.id ? "Update Task" : "Create Task"}
                </button>
                {
                    params.id && (
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 ml-5 rounded"
                            onClick={async () => {
                                try {
                                    deleteTask(params.id)
                                    console.log(res);
                                    navigate('/');
                                } catch (error) {
                                    console.log(error)
                                }
                            }}
                        >
                            Delete
                        </button>
                    )
                }
            </form>

        </div>
    )
}

export default TaskForm