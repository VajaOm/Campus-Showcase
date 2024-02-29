import React, { useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function UploadFields({ label, onFileChange }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [deletedIndex, setDeletedIndex] = useState(null);

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        setSelectedFiles((prev) => [...prev, ...files]);
        onFileChange([...selectedFiles, ...files]);
    };

    const deleteFileBtnClickHandler = (index) => {
        setDeletedIndex(index);
        setTimeout(() => {
            const updatedFiles = [...selectedFiles];
            updatedFiles.splice(index, 1);
            setSelectedFiles(updatedFiles);
            setDeletedIndex(null);
            onFileChange(updatedFiles);
        }, 300);
    };

    return (
        <>
            <p className='text-md'>{label}</p>
            <div className='w-full h-1/4 border-2 border-white border-dotted p-2 hover:bg-[#0d142e] rounded-md mt-2'>
                {selectedFiles.length > 0 ? (
                    <table className='w-1/2'>
                        <tbody>
                            {selectedFiles.map((file, index) => (
                                <tr key={index} className={deletedIndex === index ? 'fade-out' : ''}>
                                    <td>
                                        <p className="text-slate-100 text-md mt-2 ">{file.name}</p>
                                    </td>
                                    <td className=' flex mt-2'>
                                        <HighlightOffIcon fontSize="medium" onClick={() => deleteFileBtnClickHandler(index)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className='w-full h-full flex justify-center items-center'>
                        <p className='text-sm'>No file yet</p>
                    </div>
                )}
            </div>
            <div className='flex flex-col items-end p-4 '>
                <label
                    htmlFor={`select-file-btn-${label}`}
                    className='text-center text-md md:text-md  border-2 hover:text-black rounded-md  md:p-0 p-2 cursor-pointer hover:bg-[#9290C3] transform duration-200 hover:font-semibold'
                    style={{ boxSizing: 'border-box', padding: '10px' }}>
                    Select
                </label>
                <input
                    type="file"
                    name={`select-file-btn-${label}`}
                    id={`select-file-btn-${label}`}
                    className='hidden p-4'
                    onChange={handleFileInputChange}
                    multiple
                />
            </div>
        </>
    );
}
