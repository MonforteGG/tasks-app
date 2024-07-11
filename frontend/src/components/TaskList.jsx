import TaskCard from "../components/TaskCard";

function TaskList({ tasks, onDelete }) {
    return ( 
        <div className="grid grid-cols-3 gap-4 mx-10 my-10">
            {
                tasks.map(task => (
                    <TaskCard task={task} key={task._id} onDelete={onDelete} />
                ))
            }
        </div>
    );
}

export default TaskList;
