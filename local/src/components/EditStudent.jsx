import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { editStudent } from '../redux/student/studentActions'

function EditStudent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const studentsFromStore = useSelector((state) => state.student.students)

  const [form, setForm] = useState({
    id: '',
    name: '',
    score: '',
  })

  useEffect(() => {
    const student = getCurrentStudent(id)
    if (student) {
      setForm({
        id: student.id,
        name: student.name,
        score: student.score,
      })
    } else {
      navigate('/')
    }
  }, [id, dispatch])

  function getCurrentStudent(id) {
    const student = studentsFromStore.find((item) => item.id === id)
    return student
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  function onSubmitForm(event) {
    event.preventDefault()
    dispatch(editStudent(form))
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
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Score</label>
              <input
                type="text"
                className="form-control"
                name="score"
                value={form.score}
                onChange={handleChange}
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
