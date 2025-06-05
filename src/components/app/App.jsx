import { useState } from 'react';

import Service from '../service/Service';
import FileUploader from "../file-uploader/FileUploader.jsx";
import FileDownloader from "../file-downloader/FileDownloader.jsx";

import './app.scss';

// x8 + x4 + x3 + x2 + 1
const _bitKeyLength = 8;
const _models = ['binary', 'hex'];

const App = () => {
    const [model, setModel] = useState(_models[0]);
    const [gama, setGama] = useState('');
    const [gamaHex, setGamaHex] = useState('');
    const [gamaFileContent, setGamaFileContent] = useState('');
    const [encodedText, setEncodedText] = useState('');
    const [text, setText] = useState('');
    const { createGama, xor2Encode, xor2Decode, xorHexEncode, xorHexDecode } = Service();

    const readyCheck = () => {
        if (!gama || gama.length !== _bitKeyLength) {
            return {
                status: false,
                message: 'Gama is not set or not correct'
            }
        }
        if (!text) {
            return {
                status: false,
                message: 'Text is not set'
            }
        }
        return {
            status: true,
            message: 'Ready to crypt'
        }
    }

    const gamaGen = async () => {
        const res = await createGama(gamaFileContent);
        setGama(res.rawGamma);
        setGamaHex(res.hexResult)
    }

    const modelsRender = () => {
        return _models.map((md) => (
            <li
                key={md}
                onClick={() => setModel(md)}
                className={md === model ? 'models__item active' : 'models__item'}
            >
                {md}
            </li>
        ));
    }

    const crypt = async () => {
        const isReady = readyCheck();

        if (isReady.status === false) {
            alert(isReady.message);
            return;
        }

        let res;

        if (model === 'hex') {
            res = await xorHexEncode(text, gamaHex);
        }
        if (model === 'binary') {
            res = await xor2Encode(text, gama);
        }
        if (Array.isArray(res)) {
            setEncodedText(res.reduce((acc, curr) => acc.toString() + curr.toString(), ''));
        } else {
            setEncodedText(res);
        }
    }

    const decrypt = async () => {
        const isReady = readyCheck();

        if (isReady.status === false) {
            alert(isReady.message);
            return;
        }

        let res;
        if (model === 'hex') {
            res = await xorHexDecode(text, gamaHex);
        }
        if (model === 'binary') {
            res = await xor2Decode(text, gama);
        }

        alert(res);
        console.log(res);
        setEncodedText(res);
    }

    return (
        <>
            <main className="main">
                <div className="main__container">
                    <div className="main__start">
                        <FileUploader title={'Gama Init'} setFileText={setGamaFileContent}/>
                        <FileUploader title={'Text'} setFileText={setText}/>
                    </div>
                    <div className="main__mid">
                        <ul className="main__list models">
                            {modelsRender()}
                        </ul>
                        <div className="main__actions">
                            <button
                                className="main__button main__button_crypt"
                                onClick={gamaGen}
                            >
                                Згенерувати гаму
                            </button>
                            <button
                                className="main__button main__button_crypt"
                                onClick={crypt}
                            >
                                Crypt
                            </button>
                            <button
                                className="main__button main__button_decrypt"
                                onClick={decrypt}
                            >
                                Decrypt
                            </button>
                        </div>
                    </div>
                    <div className="main__end">
                        <span>
                            Raw: {gama}
                        </span>
                        <span>
                            Hex: {gamaHex}
                        </span>
                        <FileDownloader title={'Зашифроване повідомлення'} fileContent={encodedText}/>
                    </div>
                </div>
            </main>
        </>
    )
}

export default App;
