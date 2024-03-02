# Initialized

```sh
npm create vite@latest local -- --template react
cd local && npm install
npm run dev
```

setting package.json

```json
{
  "type": "module",
  "proxy": "http://localhost:3001",
  "author": "Jakkrit Onsomkrit"
}
```

setting vite.config.js

```js
plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
```

# Set up Redux , React Router DOM, Bootstrap

Install Library Redux Toolkit, React Router DOM, Bootstrap

```sh
npm install @reduxjs/toolkit react-redux react-router-dom bootstrap
```

1. src/main.jsx

```js
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
```

2. reducers/store.jsx

```js
import { configureStore } from '@reduxjs/toolkit'

import studentReducer from './studentSlice'

const store = configureStore({
  reducer: {
    student: studentReducer,
  },
})

export default store
```

3. reducers/studentSlice.jsx

```js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  students: [],
  isLoading: false,
}

//TODO: Reducers
export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    getStudents: (state, action) => {},
    deletedStudent: (state, action) => {},
    addedStudent: (state, action) => {},
    editedStudent: (state, action) => {},
    loadingStart: (state) => {},
    loadingEnd: (state) => {},
  },
})

export const {
  getStudents,
  deletedStudent,
  addedStudent,
  editedStudent,
  loadingStart,
  loadingEnd,
} = studentSlice.actions

export default studentSlice.reducer
```

## Set Application

src/App.jsx

```js
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
```

### Navbar

components/Navbar.jsx

```js
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  const [state, setState] = useState({
    collapse: false,
  })
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light
        bg-light mx-auto "
    >
      <NavLink className="navbar-brand" to="/">
        Home
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="true"
        aria-label="Toggle navigation"
      >
        <span
          className="navbar-toggler-icon"
          onClick={() => {
            setState({ collapse: !state.collapse })
            console.log(state.collapse)
          }}
        ></span>
      </button>
      <div
        className={
          state.collapse
            ? 'collapse navbar-collapse show text-center pt-3'
            : 'collapse navbar-collapse'
        }
      >
        <ul className="navbar-nav">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/">
              All Students
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/add">
              Add Student
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default Navbar
```

### Student List

components/StudentList.jsx

```js
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getStudentLists } from '../redux/studentSlice'
import Student from './Student'

function StudentLists() {
  const { students, isLoading } = useSelector((state) => state.student)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStudentLists())
  }, [dispatch])

  let lists = (
    <div className="col-12 mx-auto">
      <div className="alert-info text-center pt-5 pb-5">
        ไม่พบข้อมูลนักเรียน
      </div>
    </div>
  )
  if (students.length > 0) {
    lists = students.map((student) => (
      <div className="col-12 col-sm-6 col-lg-4 mt-3" key={student.id}>
        <Student {...student} />
      </div>
    ))
  }
  if (isLoading === true) {
    return (
      <div className="d-flex justify-content-center p-5">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading..</span>
        </div>
      </div>
    )
  }
  return <div className="row">{lists}</div>
}
export default StudentLists
```

### Student

components/Student.jsx

```js
import { useDispatch } from 'react-redux'
import { delStudent, deletedStudent } from '../redux/studentSlice'
import { Link } from 'react-router-dom'

function Student({ id, name, email }) {
  const dispatch = useDispatch()

  return (
    <div className="card">
      <div className="card-header">
        name: {name}
        <button
          className="btn btn-outline-danger btn-sm float-end mx-1"
          onClick={() => dispatch(delStudent(id))}
        >
          ลบ
        </button>
        <Link to={`/edit/${id}`}>
          <button className="btn btn-success btn-sm float-end">แก้ไข</button>
        </Link>
      </div>
      <div className="card-body">email: {email}</div>
    </div>
  )
}
export default Student
```

### Edit Student

components/EditStudent.jsx

```js
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { editStudent } from '../redux/studentSlice'

function EditStudent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const studentsFromStore = useSelector((state) => state.student.students)
  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
  })

  useEffect(() => {
    const student = getCurrentStudent(id)
    if (student) {
      setForm({
        id: student.id,
        name: student.name,
        email: student.email,
      })
    } else {
      navigate('/')
    }
  }, [id, dispatch])

  function getCurrentStudent(id) {
    const student = studentsFromStore.find((item) => item.id === id)
    return student
  }
  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }
  function onSubmitForm(event) {
    event.preventDefault()
    dispatch(editStudent(form))
    navigate('/')
  }

  return (
    <div className="row mt-3 mb-5 ml-5 mr-5">
      <div className="card col-12 col-sm-8 col-lg-6 mx-auto">
        <div className="card-body">
          <form onSubmit={onSubmitForm}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group text-center pt-3">
              <button
                onClick={() => navigate('/')}
                className="btn btn-outline-success mx-1"
              >
                ยกเลิก
              </button>
              <button type="submit" className="btn btn-primary mx-1">
                แก้ไข
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default EditStudent
```

### Add Student

components/AddStudent.jsx

```js
import react from '../assets/react.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addStudent } from '../redux/studentSlice'

function AddStudent() {
  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }
  function onSubmitForm(event) {
    event.preventDefault()
    const newData = {
      id: new Date().getTime().toString(),
      name: form.name,
      email: form.email,
    }
    dispatch(addStudent(newData))
    navigate('/')
  }

  return (
    <div className="row mt-3 mb-5 ml-5 mr-5">
      <div className="card col-12 col-sm-8 col-lg-6 mx-auto">
        <div className="card-body">
          <form onSubmit={onSubmitForm}>
            <div className="block-4 text-center">
              <img
                className="img img-thumbnail mt-5 mb-3"
                src={react}
                alt="LOGO"
              />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group text-center pt-3">
              <button
                className="btn btn-outline-success btn-sm mx-1"
                onClick={() => navigate('/')}
              >
                ยกเลิก
              </button>
              <button className="btn btn-sm btn-primary mx-1">เพิ่ม</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default AddStudent
```

### Page Not Found

components/PageNotFound.jsx

```js
function PageNotFound() {
  return (
    <div className="row mt-5 mb-5">
      <div className="col-10 text-center p-5 mx-auto">
        <h1 className="display-4 mb-4 pb-3">
          <span className="text-danger">ERROR 404</span>&nbsp;Page Not Found!!
        </h1>
        <p className="lead">ขออภัยในความไม่สะดวก</p>
      </div>
    </div>
  )
}
export default PageNotFound
```

# Reducers and Actions from Redux

reducers/studentSlice.jsx

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiUrl = 'http://localhost:3001/api/students'
const initialState = {
  students: [],
  isLoading: false,
}
//TODO: Actions
export const getStudentLists = createAsyncThunk(
  'student/getStudentLists',
  async (student, thunkAPI) => {
    try {
      const response = await axios(apiUrl)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('get all students error')
    }
  }
)
export const getStudent = createAsyncThunk(
  'student/getStudent',
  async (id, { dispatch }) => {
    try {
      dispatch(loadingStart())
      const response = await axios('/api/students/' + id)
      return response.data
    } catch (error) {
      console.log('get a student error')
      throw error
    } finally {
      dispatch(loadingEnd())
    }
  }
)
export const delStudent = createAsyncThunk(
  'student/delStudent',
  async (id, { dispatch }) => {
    try {
      dispatch(loadingStart())
      const response = await axios.delete('/api/students/' + id)
      dispatch(deletedStudent(id))
      return response.data
    } catch (error) {
      console.log('delete student error')
      throw error
    } finally {
      dispatch(loadingEnd())
    }
  }
)
export const editStudent = createAsyncThunk(
  'student/editStudent',
  async (student, { dispatch }) => {
    try {
      dispatch(loadingStart())
      const response = await axios.put('/api/students/' + student.id, student)
      dispatch(editedStudent(student))
      return response.data
    } catch (error) {
      console.log('edit student error')
    } finally {
      dispatch(loadingEnd())
    }
  }
)
export const addStudent = createAsyncThunk(
  'student/addStudent',
  async (student, { dispatch }) => {
    try {
      dispatch(loadingStart())
      const response = await axios.post('/api/students', student)
      dispatch(addedStudent(student))
      return response.data
    } catch (error) {
      console.log('something went wrong')
    } finally {
      dispatch(loadingEnd())
    }
  }
)
//TODO: Reducers
export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    getStudents: (state, action) => {
      return {
        ...state,
        students: action.payload,
      }
    },
    deletedStudent: (state, action) => {
      return {
        ...state,
        students: state.students.filter(
          (student) => student.id !== action.payload
        ),
      }
    },
    addedStudent: (state, action) => {
      return {
        ...state,
        students: [...state.students, action.payload],
      }
    },
    editedStudent: (state, action) => {
      return {
        ...state,
        students: [...state.students, action.payload],
      }
    },
    loadingStart: (state) => {
      return {
        ...state,
        isLoading: true,
      }
    },
    loadingEnd: (state) => {
      return {
        ...state,
        isLoading: false,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudentLists.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getStudentLists.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false
        state.students = action.payload
      })
      .addCase(getStudentLists.rejected, (state, action) => {
        console.log(action)
        state.isLoading = false
      })
  },
})
export const {
  getStudents,
  deletedStudent,
  addedStudent,
  editedStudent,
  loadingStart,
  loadingEnd,
} = studentSlice.actions
export default studentSlice.reducer
```
