import { DataGrid } from "@mui/x-data-grid"
import axios from "axios"
import { useAppContext } from "../context/AppContext"
import Base64PDFViewer from "./Base64PDFViewer"

const columns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
  { field: "surname", headerName: "Surname" },
  { field: "email", headerName: "email" },
  { field: "school", headerName: "School" },
  { field: "dateOfBirth", headerName: "Date of Birth" },
  { field: "actions", headerName: "Actions", renderCell: renderActions },
]

function renderActions() {
  return (
    <button
      className=""
      onClick={(params) => {
        console.log(params.id + "deleted")
      }}
    >
      X
    </button>
  )
}

export default function InternTable() {
  const { interns, setInternInfo, internInfo } = useAppContext()

  async function getIntern(internId) {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/admin/${internId}`
      )
      setInternInfo(response.data)
      console.log(internInfo)
    } catch (error) {
      console.log(error)
    }
  }

  const updatedInterns = interns.map((intern) => {
    return {
      id: intern._id,
      name: intern.name,
      surname: intern.surname,
      email: intern.email,
      gender: intern.gender,
      school: intern.school,
      major: intern.major,
      softwareTools: intern.softwareTools,
      trainingDates: intern.trainingDates,
      address: intern.address,
      dateOfBirth: intern.dateOfBirth,
      image: intern.image,
      cv: intern.cv,
      portfolio: intern.portfolio,
      createdAt: intern.createdAt,
      updatedAt: intern.updatedAt,
      __v: intern.__v,
    }
  })

  return (
    <div className="w-full">
      <DataGrid
        columns={columns}
        rows={updatedInterns}
        onRowClick={(params) => {
          getIntern(params.id)
        }}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      {internInfo && (
        <Base64PDFViewer className="w-[5rem]" base64PDF={internInfo.cv} />
      )}
    </div>
  )
}
