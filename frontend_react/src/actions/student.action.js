import {
  CREATE_STUDENT,
  RETRIEVE_STUDENTS,
  UPDATE_STUDENT,
  DELETE_STUDENT
} from './type.action'

import StudentDataService from '../services/student.service'

export const createStudent = (student) => async (dispatch) => {
  try {
    const res = await StudentDataService.create(student);

    dispatch({
      type: CREATE_STUDENT,
      payload: res.data
    })

    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const retrieveStudents = () => async(dispatch) => {
  try {
    const res = await StudentDataService.getAll()

    dispatch({
      type: RETRIEVE_STUDENTS,
      payload: res.data
    })

    return Promise.resolve(res.data)
  } catch(err) {
    return Promise.reject(err)
  }
}

export const updateStudent = (id, data) => async(dispatch) => {
  try {
    const res = await StudentDataService.update(id, data)

    dispatch({
      type: UPDATE_STUDENT,
      payload: res.data
    })

    return Promise.resolve(res.data)
  } catch(err) {
    return Promise.reject(err)
  }
}

export const deleteStudent = (id) => async(dispatch) => {
  try {
    const res = await StudentDataService.delete(id)

    dispatch({
      type: DELETE_STUDENT,
      payload: res.data
    })

    return Promise.resolve(res.data)
  } catch(err) {
    return Promise.reject(err)
  }
}