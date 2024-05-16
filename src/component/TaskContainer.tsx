import { useAppDispatch } from '../redux/hooks'
import { deleteTask, toggleDone } from '../redux/tasksSlice'
import { TaskInterface } from "../redux/tasksSlice"
import { Link } from 'react-router-dom';
import { MdDelete, MdEdit, MdOutlineDone, MdOutlineDoneAll  } from "react-icons/md";
import '../App.css'

export default function TaskContainer ({ id, title, description, isDone}: TaskInterface) {
    const dispatch = useAppDispatch()
    const eraser = () => {
        dispatch(deleteTask({
            id
        }))
    }
    const toggle = () => {
        dispatch(toggleDone({
            id
        }))
    }
    return (
        <div className={`flex flex-col border-black border-solid border-2 rounded-lg transition-all duration-300 p-1 ${isDone ? ' opacity-60' : ''}`}>
            <h2 className={`pl-1 text-xl place-self-start m-1 ${isDone ? 'line-through' : ''}`}>
                {title}
            </h2>
            <p className="pl-2 place-self-start m-1">
                {description}
            </p>
            <div className="flex flex-row justify-end gap-1 mt-3">
                <button className="py-2 px-3 flex flex-row flex-nowrap items-center gap-1" onClick={toggle}>
                    {isDone ? <MdOutlineDoneAll/> : <MdOutlineDone/>}
                    Mark Done
                </button>
                <Link to={`/edit-task/${id}`}>
                    <button className='py-2 px-3 flex flex-row flex-nowrap items-center gap-1' disabled={isDone}>
                        <MdEdit />
                        Edit
                    </button>
                </Link>
                <button className='bg-red-600 hover:bg-red-900 hover:border-white duration-300 transition-all py-2 px-3 flex flex-row flex-nowrap items-center gap-1' onClick={eraser}>
                    <MdDelete/>
                    Delete
                </button>
            </div>
        </div>
    )
}