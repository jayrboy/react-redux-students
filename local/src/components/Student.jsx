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
          onClick={() => {
            dispatch(delStudent(id))
            dispatch(deletedStudent(id))
          }}
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
