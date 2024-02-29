import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editStudent } from '../redux/studentSlice'

const EditStudent = () => {
  const student = useSelector((state) =>
    state.students.studentItems.find(
      (s) => s.id === window.location.pathname.split('/')[2]
    )
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState(student ? student.name : '')
  const [score, setScore] = useState(student ? student.score : '')

  const onSubmitForm = (event) => {
    event.preventDefault()
    const updatedStudent = { id: student.id, name, score }
    dispatch(editStudent(updatedStudent))
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Score</label>
              <input
                type="text"
                className="form-control"
                name="score"
                value={score}
                onChange={(e) => setScore(e.target.value)}
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
