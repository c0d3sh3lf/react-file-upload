import React, {useCallback, useState} from "react";
import {useDropzone, FileRejection} from "react-dropzone";
import './FileUpload.css';
import upload_icon from "../assets/images/upload-icon.png";

interface FileUploadProps {
    onUploadComplete?: (file: File[]) => void;
    maxFiles?: number;
    accept?: string;
    maxSize?: number;
    square?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
    onUploadComplete, 
    maxFiles = 1, 
    accept,
    square = false,
    maxSize = 5242880 // 5 MB
}) => {
    const [files, setFiles] = useState<File[]>([]);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const onDropAccepted = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
        setUploadError(null);
        onUploadComplete && onUploadComplete(acceptedFiles);
    }
    , [onUploadComplete]);

    const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
        const errors = fileRejections.map(
            (rejection) => `${rejection.file.name} - ${rejection.errors.map(e => e.message).join(', ')}`
        )
        setUploadError(errors.join('\n'));
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDropAccepted,
        onDropRejected,
        maxFiles,
        maxSize,
        accept : {
            ...(accept ? {accept} : {})
        }
    });

    return (
        <div className={`upload-container`}>
            <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? 'active' : ''} ${square ? 'square' : ''}`}
            >
                <div className="content">
                    <img src={upload_icon} alt="upload logo" className="uploadIcon" />
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    )}
                </div>
                
            </div>
            {uploadError && <div className="error-message">{uploadError}</div>}
            { files.length > 0 && (
                <div className="file-list">
                    <h4>Selected Files: </h4>
                    <ul>
                        {files.map((file, index) => (
                            <li key={index}>{file.name} - {(file.size / 1024).toFixed(2)} KB</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )

}
export default FileUpload;