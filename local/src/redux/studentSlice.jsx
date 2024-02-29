import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  studentItems: [
    { id: '1', name: 'React', score: 99 },
    { id: '2', name: 'Redux', score: 89 },
    { id: '3', name: 'State', score: 73 },
  ],
}

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      const addedState = {
        ...state,
        studentItems: [...state.studentItems, action.payload],
      }
      return addedState
    },
    deleteStudent: (state, action) => {
      const deletedState = {
        ...state,
        studentItems: state.studentItems.filter(
          (item) => item.id !== action.payload
        ),
      }
      return deletedState
    },
    editStudent: (state, action) => {
      const indexForEdit = state.studentItems.findIndex(
        (item) => item.id === action.payload.id
      )

      state.studentItems[indexForEdit] = {
        id: action.payload.id,
        name: action.payload.name,
        score: action.payload.score,
      }

      return state
    },
  },
})

export const { addStudent, deleteStudent, editStudent } = studentSlice.actions

export default studentSlice.reducer
