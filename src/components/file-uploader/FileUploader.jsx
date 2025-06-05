import { useState } from 'react';
import './file-uploader.scss';

const FileUploader = ({ title, setFileText }) => {
    const [fileContent, setFileContent] = useState('');
    const [isShow, setIsShow] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result;
            setFileContent(text);
            setFileText(text);
        };
        reader.readAsText(file);
    };

    const handleTextChange = (e) => {
        const updatedText = e.target.value;
        setFileContent(updatedText);
        setFileText(updatedText);
    };

    return (
        <div className='file-uploader'>
            <h5 className="file-uploader__title">{title}</h5>
            <input
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                className="file-uploader__input"
            />
            <div
                className="file-uploader__show"
                onClick={() => setIsShow(prev => !prev)}
            >
                {isShow ? 'Приховати' : 'Показати'}
            </div>
            {isShow && (
                <div className="file-uploader__editor">
                    <textarea
                        value={fileContent}
                        onChange={handleTextChange}
                        className="file-uploader__textarea"
                        rows={15}
                    />
                </div>
            )}
        </div>
    );
};

export default FileUploader;