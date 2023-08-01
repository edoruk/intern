import {
  faUser,
  faUserGraduate,
  faFileArrowUp,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function ProgressBar({ page }) {
  return (
    <main className="fixed top-0 sm:left-0 p-4 sm:px-0 w-full sm:w-[20%] sm:h-screen flex flex-col gap-3 justify-center sm:justify-evenly items-center bg-[#262626] text-slate-200">
      <h1 className=" text-[30px] font-extralight text-center w-full sm:w-full sm:text-[24px] sm:-rotate-90">
        A TASARIM MIMARLIK
      </h1>
      <div className="flex sm:flex-col w-full px-4 gap-3 sm:gap-24 justify-center items-center ">
        <section className="p-2 relative w-[3.5rem] h-[3.5rem] flex justify-center items-center">
          <FontAwesomeIcon icon={faUser} className="w-full h-full" />
          <FontAwesomeIcon
            id="check0"
            icon={faCircleCheck}
            style={{ color: "#1F9F24" }}
            size="xl"
            className={`absolute right-1 bottom-0 ${page > 0 ? "" : "hidden"}`}
          />
        </section>
        <span className=" w-28 h-[4px] rounded border-2 border-slate-200 sm:rotate-90 "></span>
        <section className="p-2 relative w-[3.5rem] h-[3.5rem]  flex justify-center items-center">
          <FontAwesomeIcon icon={faUserGraduate} className="w-full h-full" />
          <FontAwesomeIcon
            id="check01"
            icon={faCircleCheck}
            style={{ color: "#1F9F24" }}
            size="xl"
            className={`absolute right-1 bottom-0 ${page > 1 ? "" : "hidden"}`}
          />
        </section>
        <span className=" w-28 h-[4px] rounded border-2 border-slate-200 sm:rotate-90 "></span>
        <section className="p-2 relative w-[3.5rem] h-[3.5rem]  flex justify-center items-center">
          <FontAwesomeIcon icon={faFileArrowUp} className="w-full h-full" />
          <FontAwesomeIcon
            id="check012"
            icon={faCircleCheck}
            style={{ color: "#1F9F24" }}
            size="xl"
            className={`absolute right-1 bottom-0 ${page > 2 ? "" : "hidden"}`}
          />
        </section>
      </div>
    </main>
  )
}
