import {
  CREATE_STUDENT,
  RETRIEVE_STUDENTS,
  UPDATE_STUDENT,
  DELETE_STUDENT
} from '../actions/type.action'

const initialState = {}

function studentReducer(students = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case CREATE_STUDENT:
      return [...students, payload];

    case RETRIEVE_STUDENTS:
      return payload;

    case UPDATE_STUDENT:
      return students.map((student) => {
        if (student.id === payload.id) {
          return {
            ...student,
            ...payload,
          };
        } else {
          return student;
        }
      });

    case DELETE_STUDENT:
      return students.filter(({ id }) => id !== payload.id);
    default:
      return students;
  }
}

export default studentReducer