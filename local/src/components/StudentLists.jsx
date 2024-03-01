import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getStudentLists } from '../redux/studentSlice'
import Student from './Student'

function StudentLists() {
  const { students, isLoading } = useSelector((state) => state.student)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStudentLists())
  }, [dispatch])

  let lists = (
    <div className="col-12 mx-auto">
      <div className="alert-info text-center pt-5 pb-5">
        ไม่พบข้อมูลนักเรียน
      </div>
    </div>
  )

  if (students.length > 0) {
    lists = students.map((student) => (
      <div className="col-12 col-sm-6 col-lg-4 mt-3" key={student.id}>
        <Student {...student} />
      </div>
    ))
  }

  if (isLoading === true) {
    return (
      <div className="d-flex justify-content-center p-5">
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading..</span>
        </div>
      </div>
    )
  }

  return <div className="row">{lists}</div>
}

export default StudentLists
