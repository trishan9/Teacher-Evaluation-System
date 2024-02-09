import axios from 'axios'
import List from '../_components/List'

const getSchool = async () => {
    try{
        const res = await axios.get('https://teacher-evaluation-system.onrender.com/api/school')
        return res.data.data
    } catch (error) {
        console.log(error)
    }   
}

export default async function ManageSchool() {
    const schools = await getSchool()
  return (
    <div className=' mt-2 md:px-6 w-full'>   
        {schools.map((school:any) => ( 
             <List school={school} key={school.id}  />
        ))}
    </div>
  )
}
