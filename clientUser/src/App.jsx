import { useState } from "react"

import ProgressBar from "./components/ProgressBar"
import FooterButtons from "./components/FooterButtons"
import DocumentInfo from "./pages/DocumentInfo"
import EducationInfo from "./pages/EducationInfo"
import PersonalInfo from "./pages/PersonalInfo"

import { AnimatePresence, motion as m } from "framer-motion"

function App() {
  const [page, setPage] = useState(0)

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    dateOfBirth: "",
    address: "",
    gender: "",
    school: "",
    major: "",
    year: Number,
    softwareTools: [],
    trainingDates: "",
    image: "",
    cv: "",
    portfolio: "",
  })

  const [animateDir, setAnimateDir] = useState(0)
  const variants = {
    initial: (animateDir) => {
      return {
        x: animateDir > 0 ? "100%" : "-100%",
        opacity: 0,
      }
    },
    animate: {
      x: "0%",
      opacity: 1,
    },
    exit: (animateDir) => {
      return { x: animateDir > 0 ? "-100%" : "100%", opacity: 0 }
    },
  }

  function pageDisplay() {
    switch (page) {
      case 0:
        return <PersonalInfo formData={formData} setFormData={setFormData} />
      case 1:
        return <EducationInfo formData={formData} setFormData={setFormData} />
      case 2:
        return <DocumentInfo formData={formData} setFormData={setFormData} />
    }
  }

  return (
    <main
      id="App"
      className="w-full flex flex-col sm:flex-row items-center justify-center font-raleway overflow-x-hidden"
    >
      <ProgressBar page={page} />
      <section
        id="center"
        className="w-[30rem] flex flex-col  justify-center items-center mt-40 mb-12 sm:ml-25"
      >
        <AnimatePresence initial={false} mode={"wait"} custom={animateDir}>
          <m.section
            id="body"
            className=" w-[70%] h-[70%]"
            key={page}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.1, ease: "linear" }}
            custom={animateDir}
          >
            {pageDisplay()}
          </m.section>
        </AnimatePresence>

        <FooterButtons
          page={page}
          setPage={setPage}
          formData={formData}
          setAnimateDir={setAnimateDir}
        />
      </section>
      <canvas className="hidden width-[30%] h-full bg-building bg-cover bg-no-repeat md:block md:fixed md:w-[20%] md:h-full md:top-0 md:right-0 md:shadow-left"></canvas>
    </main>
  )
}

export default App

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email)
}
