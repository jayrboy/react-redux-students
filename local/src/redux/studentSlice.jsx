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
