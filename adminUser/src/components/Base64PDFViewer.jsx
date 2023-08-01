import { Document, Page, pdfjs } from "react-pdf"

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const Base64PDFViewer = ({ base64PDF }) => {
  // Convert base64 string to Uint8Array
  const byteArray = new Uint8Array(
    atob(base64PDF)
      .split("")
      .map((char) => char.charCodeAt(0))
  )

  return (
    <div>
      <Document file={{ data: byteArray }}>
        <Page pageNumber={1} />
      </Document>
    </div>
  )
}

export default Base64PDFViewer
