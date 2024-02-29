import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { addStudent } from '../redux/studentSlice'

import react from '../assets/react.svg'

const AddStudent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [score, setScore] = useState('')

  const onSubmitForm = (event) => {
    event.preventDefault()
    const newData = {
      id: new Date().getTime().toString(),
      name: name,
      score: score,
    }
    dispatch(addStudent(newData))
    navigate('/')
  }
  return (
    <div className="row mt-3 mb-5 ml-5 mr-5">
      <div className="card col-12 col-sm-8 col-lg-6 mx-auto">
        <div className="card-body">
          <form onSubmit={onSubmitForm}>
            <div className="block-4 text-center">
              <img
                className="img img-thumbnail mt-5 mb-3"
                src={react}
                alt="LOGO"
              />
            </div>
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
                className="btn btn-outline-success btn-sm mx-1"
                onClick={() => navigate('/')}
              >
                ยกเลิก
              </button>
              <button className="btn btn-sm btn-primary mx-1">เพิ่ม</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddStudent
