import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiUrl = 'http://localhost:3001/api/students'

const initialState = {
  students: [],
  isLoading: false,
}

export const getStudentLists = createAsyncThunk(
  'student/getStudentLists',
  async (student, thunkAPI) => {
    try {
      const response = await axios('/api/students')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('get all students error')
    }
  }
)

export const getStudent = createAsyncThunk(
  'student/getStudent',
  async (id, thunkAPI) => {
    try {
      const response = await axios('/api/students/' + id)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('get all students error')
    }
  }
)

export const delStudent = createAsyncThunk(
  'student/delStudent',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete('/api/students/' + id)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('delete student error')
    }
  }
)

export const editStudent = createAsyncThunk(
  'student/editStudent',
  async (student, thunkAPI) => {
    try {
      const response = await axios.put('/api/students/' + student.id, student)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('edit student error')
    }
  }
)

export const addStudent = createAsyncThunk(
  'students/getStudentItems',
  async (student, thunkAPI) => {
    try {
      const response = await axios.post('/api/students', student)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)

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

export const { getStudents, deletedStudent, addedStudent, editedStudent } =
  studentSlice.actions

export default studentSlice.reducer
