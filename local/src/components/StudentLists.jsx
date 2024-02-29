import { useSelector } from 'react-redux'
import Student from './Student'

const StudentLists = () => {
  const { studentItems } = useSelector((store) => store.students)

  return (
    <div className="row">
      {studentItems &&
        studentItems.map((item) => {
          return (
            <div className="col-12 col-sm-6 col-lg-4 mt-3" key={item.id}>
              <Student data={item} />
            </div>
          )
        })}
    </div>
  )
}

export default StudentLists
