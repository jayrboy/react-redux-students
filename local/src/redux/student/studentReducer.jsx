/* eslint-disable */

const initialState = {
  students: [],
  isLoading: false,
}

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_STUDENT_LISTS':
      return {
        ...state,
        students: action.payload,
      }
    case 'DEL_STUDENT':
      return {
        ...state,
        students: state.students.filter(
          (student) => student.id !== action.payload
        ),
      }
    case 'ADD_STUDENT':
      return {
        ...state,
        students: [...state.students, action.payload],
      }
    case 'EDIT_STUDENT':
      return {
        ...state,
        students: state.students.map((student) =>
          student.id === action.payload.id ? action.payload : student
        ),
      }
    case 'LOADING_START':
      return {
        ...state,
        isLoading: true,
      }
    case 'LOADING_END':
      return {
        ...state,
        isLoading: false,
      }
    default:
      break
  }
  return state
}

export default studentReducer
