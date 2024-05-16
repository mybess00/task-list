import { useRef, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addTask, editTask } from '../redux/tasksSlice'
import { useNavigate } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";

export default function CreateTask() {
    const dispatch = useAppDispatch()
    const titleRef = useRef(null)
    const descriptionRef = useRef(null)
    const navigate = useNavigate()
    const { taskId } = useParams()
    const tasks = useAppSelector(state => state.tasks)
    useEffect(() => {
        if(taskId && titleRef.current && descriptionRef.current) {
            const index = tasks.findIndex(el => el.id == taskId);
            (titleRef.current as HTMLInputElement).value = tasks[index].title;
            (descriptionRef.current as HTMLInputElement).value = tasks[index].description;
        }
    }, [])

    const create = () => {
        if (!titleRef.current || !descriptionRef.current) {
            return
        }
        const title = (titleRef.current as HTMLInputElement).value
        const description = (descriptionRef.current as HTMLInputElement).value
        if (title.length === 0 || description.length === 0) {
            alert('You should complete all data.')
            return
        }
        console.log('creando')
        if (taskId) {
            dispatch(editTask({
                id: taskId,
                title,
                description,

            }))
        } else {
            dispatch(addTask({
                title,
                description
            }))
        }
        navigate(-1)
    }
    return (
        <div className='lg:w-[40vw] w-full'>
            <Link to={'/'} className='flex text-3xl'>
                <IoMdArrowRoundBack/>
            </Link>
            <h1 className='mt-0'>
                {taskId ? "Edit Task" : "Create Task"}
            </h1>
            <div className='flex flex-col'>
                <h3 className='m-1 place-self-start text-xl'>
                    Title
                </h3>
                <input type="text" ref={titleRef} className='rounded-lg h-8 p-1'/>
                <h3 className='place-self-start mt-3 text-xl'>Description</h3>
                <input type="text" ref={descriptionRef} className='rounded-lg h-16 p-1'/>
                <button onClick={create} className='mt-3 py-2 px-3'>
                    {taskId ? "Edit Task" : "Create Task"}
                </button>
            </div>
        </div>
    )
}
