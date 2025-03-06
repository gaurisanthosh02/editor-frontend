import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import EditingComponent from './pages/EditingComponent'


function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/editor' element={<EditingComponent/>}/>
      </Routes>
    </>
  )
}

export default App
