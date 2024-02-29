import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './redux/store'
import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import Header from './components/Header'
import StudentLists from './components/StudentLists'
import PageNotFound from './components/PageNotFound'
import AddStudent from './components/AddStudent'
import EditStudent from './components/EditStudent'

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<StudentLists />} />
            <Route path="/edit/:id" element={<EditStudent />} />
            <Route path="/add" element={<AddStudent />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App
