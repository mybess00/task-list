import './App.css'
import { useState } from 'react'
import { useAppSelector } from './redux/hooks'
import TaskContainer from './component/TaskContainer'
import Pagination from './component/Pagination'
import { Link } from 'react-router-dom'



function App() {
  const tasks = useAppSelector(state => state.tasks)
  const [currentPage, setCurrentPage] = useState(1)
  const SPLIT_PAGE = 3
  const taskEl: JSX.Element[][] = []
  const getTasksPages = () => {
    let pageEl: JSX.Element[] = []
    tasks.forEach((el, index) => {
      pageEl.push(
        <TaskContainer 
          id={el.id} 
          title={el.title} 
          description={el.description} 
          isDone={el.isDone}
          key={index}/>
      )
      if (pageEl.length == SPLIT_PAGE) {
        taskEl.push(pageEl)
        pageEl = []
      }
    })
    if (pageEl.length != 0) {
      taskEl.push(pageEl)
        pageEl = []
    }
  }
  getTasksPages()
  return ( 
    <main className='lg:w-[40vw] w-full'>
      <h1>Task List</h1>
      <div className='flex flex-col gap-4 mt-4'>
        <Link className=' rounded-lg transition-all duration-300 border-2 border-black border-solid hover:bg-[#81818193] hover:border-purple-800' to={'/new-task'}>
          <button className=' bg-transparent border-none w-full'>Create new Task +</button>
        </Link>
        {
          taskEl[currentPage-1] ? taskEl[currentPage-1].map(el => el) : ""
        }
        <Pagination page={currentPage} setPage={setCurrentPage} length={taskEl.length} split={SPLIT_PAGE}/>
      </div>
    </main>
  )
}

export default App
