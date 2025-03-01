import './App.css'
import FileUpload from './components/FileUpload'

function App() {

  const handleUploadComplete = (files: File[]) => {}

  return (
    <>
      <FileUpload onUploadComplete={handleUploadComplete} maxFiles={2} square={true} />
    </>
  )
}

export default App
