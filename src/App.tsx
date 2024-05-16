import './App.css'
import { useAppSelector } from './redux/hooks'
import TaskContainer from './component/TaskContainer'
import { Link } from 'react-router-dom'

function App() {
  const tasks = useAppSelector(state => state.tasks)
  return ( 
    <main className=' w-[40vw]'>
      <h1>Task List</h1>
      <div className='flex flex-col gap-4 mt-4'>
        <Link className=' rounded-lg transition-all duration-300 border-2 border-black border-solid hover:bg-[#81818193] hover:border-purple-800' to={'/new-task'}>
          <button className=' bg-transparent border-none w-full'>Create new Task +</button>
        </Link>
        {
          tasks.map((element, index) => {
            return  <TaskContainer 
                      id={element.id} 
                      title={element.title} 
                      description={element.description} 
                      isDone={element.isDone}
                      key={index}/>
          })
        }
      </div>
    </main>
  )
}

export default App
