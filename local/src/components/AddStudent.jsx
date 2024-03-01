import react from '../assets/react.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { addStudent } from '../redux/studentSlice'

function AddStudent() {
  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  function onSubmitForm(event) {
    event.preventDefault()
    const newData = {
      id: new Date().getTime().toString(),
      name: form.name,
      email: form.email,
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
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
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
