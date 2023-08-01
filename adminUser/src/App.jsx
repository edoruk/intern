import Login from "./pages/Login"
import AdminHomepage from "./pages/AdminHomepage"
import { useAppContext } from "./context/AppContext"

function App() {
  const { isAuth } = useAppContext()

  return (
    <main className=" w-full h-screen font-raleway">
      {!isAuth ? <Login /> : <AdminHomepage />}
    </main>
  )
}

export default App
