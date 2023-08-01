import { useState } from "react"
import imageCompression from "browser-image-compression"
import { PDFDocument } from "pdf-lib"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function DocumentInfo({ formData, setFormData }) {
  const [accepted, setAccepted] = useState(["", "", ""])
  const inputs = [
    {
      htmlFor: "profileImage",
      label: "Profile Image",
      index: 0,
      accept: ".jpeg, .png, .webp",
    },
    {
      htmlFor: "cv",
      label: "CV",
      index: 1,
      accept: ".pdf",
    },
    {
      htmlFor: "portfolio",
      label: "Portfolio",
      index: 2,
      accept: ".pdf",
    },
  ]
  async function handleFileUpload(event) {
    const file = event.target.files[0]

    const maxSizeMB = 1
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024) // Convert to MB
      if (fileSizeMB > maxSizeMB) {
        alert(`File size should be less than ${maxSizeMB}MB.`)
        event.target.value = null // Clear the selected file
        return
      }
    }
    try {
      let compressedData
      let copyAccepted = [...accepted]
      if (file.type.includes("image") && event.target.id === "profileImage") {
        const options = {
          // You can adjust this value as needed to set the maximum file size after compression.
          maxWidthOrHeight: 800,
          useWebWorker: true,
        }

        compressedData = await compressImage(file, options)
        setFormData({ ...formData, image: compressedData })
        copyAccepted[0] = "1"
        setAccepted(copyAccepted)
      } else if (file.type === "application/pdf" && event.target.id === "cv") {
        compressedData = await compressPDF(file)
        setFormData({ ...formData, cv: compressedData })
        copyAccepted[1] = "1"
        setAccepted(copyAccepted)
      } else if (
        file.type === "application/pdf" &&
        event.target.id === "portfolio"
      ) {
        compressedData = await compressPDF(file)
        setFormData({ ...formData, portfolio: compressedData })
        copyAccepted[2] = "1"
        setAccepted(copyAccepted)
      } else {
        // For other file types, no compression is performed
        const reader = new FileReader()
        reader.onloadend = () => {
          console.log("Wrong file...")
        }
        reader.readAsDataURL(file)
      }
    } catch (error) {
      console.error("Error compressing file:", error)
    }
  }
  return (
    <div className="flex flex-col h-full justify-center items-center gap-12">
      <h1 className=" text-[30px] text-center">Documentation</h1>

      {inputs.map((input) => {
        return (
          <section key={input.index}>
            <label htmlFor={input.htmlFor}>{input.label}</label>

            {accepted[input.index] === "1" && (
              <FontAwesomeIcon
                id={input.index}
                icon={faCircleCheck}
                className={`  pl-4 text-[#1F9F24]`}
                size="lg"
              />
            )}

            <input
              type="file"
              id={input.htmlFor}
              accept={input.accept}
              className="w-full"
              onChange={(e) => {
                handleFileUpload(e)
              }}
            />
          </section>
        )
      })}
    </div>
  )
}

export default DocumentInfo

async function compressImage(file, options) {
  const compressedFile = await imageCompression(file, options)
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(compressedFile)
    reader.onloadend = () => {
      resolve(reader.result)
      console.log("compressed image")
    }
  })
}

async function compressPDF(file) {
  const pdfBytes = await file.arrayBuffer()
  const pdfDoc = await PDFDocument.load(pdfBytes)
  const compressedPDFBytes = await pdfDoc.save({ useObjectStreams: false })
  const compressedPDFUint8Array = new Uint8Array(compressedPDFBytes)

  const base64PDF = arrayBufferToBase64(compressedPDFUint8Array)
  console.log("compressed pdf")
  return base64PDF
}

function arrayBufferToBase64(buffer) {
  let binary = ""
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}
