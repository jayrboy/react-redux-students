import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import StudentLists from './components/StudentLists'
import EditStudent from './components/EditStudent'
import AddStudent from './components/AddStudent'
import PageNotFound from './components/PageNotFound'

function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<StudentLists />} />
        <Route path="/edit/:id" element={<EditStudent />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App
