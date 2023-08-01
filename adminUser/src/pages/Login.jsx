import { useState } from "react"
import { TextField, Button } from "@mui/material"
import Fingerprint from "@mui/icons-material/Fingerprint"
import axios from "axios"
import { useAppContext } from "../context/AppContext"

function Login() {
  const { setIsAuth, setToken } = useAppContext()
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  })

  async function handleLogin(loginData) {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin/login",
        loginData
      )
      setToken(response.data)
      setIsAuth(true)

      console.log("logged In as admin")
      setLoginData({
        username: "",
        password: "",
      })
    } catch (error) {
      console.log(error)
      setIsAuth(false)
    }
  }

  return (
    <main className="w-full h-full flex flex-col justify-center items-center ">
      <div className=" border rounded-2xl py-12 px-4 w-[70%] max-w-md min-w-sm flex flex-col gap-16 justify-center items-center">
        <h1 className=" text-2xl font-thin">A TASARIM MIMARLIK</h1>
        <section className="flex flex-col w-full gap-10">
          <TextField
            id="username"
            label="Username"
            onChange={(event) =>
              setLoginData({ ...loginData, username: event.target.value })
            }
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            onChange={(event) =>
              setLoginData({ ...loginData, password: event.target.value })
            }
          />
        </section>
        <Button
          color="primary"
          className="flex justify-center items-center gap-1"
          onClick={() => {
            handleLogin(loginData)
          }}
        >
          <p className=" text-[18px]">Log In</p>
          <Fingerprint className="text-md" />
        </Button>
      </div>
    </main>
  )
}

export default Login
