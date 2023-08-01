import { useEffect } from "react"
import axios from "axios"
import InternTable from "../components/InternTable"
import { useAppContext } from "../context/AppContext"

export default function AdminHomepage({}) {
  const {
    interns,
    setInterns,
    token,
    isAuth,
    setInternId,
    internInfo,
    setInternInfo,
  } = useAppContext()

  async function getInterns() {
    if (!isAuth) {
      return console.log("not auth")
    }
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      const response = await axios.get("http://localhost:4000/api/admin/")
      setInterns(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getInterns()
  }, [isAuth])
  return (
    <div>
      <InternTable
        interns={interns}
        setInternId={setInternId}
        internInfo={internInfo}
        setInternInfo={setInternInfo}
      />
    </div>
  )
}
