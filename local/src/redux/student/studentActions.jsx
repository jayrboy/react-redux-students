import axios from 'axios'

export const delStudent = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'LOADING_START' })
      const response = await axios.delete(
        `http://localhost:3001/api/students/${id}`
      )
      dispatch({
        type: 'DEL_STUDENT',
        payload: response.data.id,
      })
    } catch (error) {
      console.log('delete student error')
    } finally {
      dispatch({ type: 'LOADING_END' })
    }
  }
}

export const addStudent = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'LOADING_START' })
      const response = await axios.post(
        'http://localhost:3001/api/students/',
        data
      )
      dispatch({
        type: 'ADD_STUDENT',
        payload: response.data,
      })
    } catch (error) {
      console.log('add a student error')
    } finally {
      dispatch({ type: 'LOADING_END' })
    }
  }
}

export const editStudent = (data) => async (dispatch) => {
  try {
    dispatch({ type: 'LOADING_START' })
    const response = await axios.put(
      `http://localhost:3001/api/students/${data.id}`,
      data
    )
    dispatch({
      type: 'EDIT_STUDENT',
      payload: response.data,
    })
    return { success: true }
  } catch (error) {
    console.log('edit student error')
    return { success: false, message: error.message }
  } finally {
    dispatch({ type: 'LOADING_END' })
  }
}

export const getStudent = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'LOADING_START' })
      await axios.get(`http://localhost:3001/api/students/${id}`)
      dispatch({
        type: 'GET_STUDENT',
        payload: id,
      })
    } catch (error) {
      console.log('get a student error')
    } finally {
      dispatch({ type: 'LOADING_END' })
    }
  }
}

export const getStudentLists = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'LOADING_START' })
      const responseponse = await axios.get(
        'http://localhost:3001/api/students/'
      )
      dispatch({
        type: 'GET_STUDENT_LISTS',
        payload: responseponse.data,
      })
    } catch (error) {
      console.log('get all students error')
    } finally {
      dispatch({ type: 'LOADING_END' })
    }
  }
}
