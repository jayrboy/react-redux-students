import { useDispatch } from 'react-redux'
import { deleteStudent } from '../redux/studentSlice'
import { Link } from 'react-router-dom'

const Student = ({ data }) => {
  const dispatch = useDispatch()

  return (
    <div className="card">
      <div className="card-header">
        name: {data.name}
        <button
          className="btn btn-outline-danger btn-sm float-end mx-1"
          onClick={() => dispatch(deleteStudent(data.id))}
        >
          ลบ
        </button>
        <Link to={`/edit/${data.id}`}>
          <button className="btn btn-success btn-sm float-end">แก้ไข</button>
        </Link>
      </div>
      <div className="card-body">score: {data.score}</div>
    </div>
  )
}

export default Student
