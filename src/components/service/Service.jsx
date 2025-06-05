const Service = () => {
    const _apiBase = import.meta.env.VITE_API_BASE;

    const createGama = async (key) => {
        try {
            const res = await fetch(`${_apiBase}/gammashuffle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    key: key
                })
            });

            const data = await res.json();
            console.log(data);
            return data;
        } catch (err) {
            console.log(err);
            return;
        }
    }

    const xor2Encode = async (text, gama) => {
        try {
            const res = await fetch(`${_apiBase}/encode/xor2v2`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    request: text,
                    key: gama
                })
            });

            const data = await res.json();
            return data.result;
        } catch (err) {
            console.log(err);
            return;
        }
    }

    const xor2Decode = async (text, gama) => {
        try {
            const res = await fetch(`${_apiBase}/decode/xor2v2`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    request: text,
                    key: gama,
                    requestType: 'binary',
                    keyType: 'binary'
                })
            });

            const data = await res.json();
            return data.result;
        } catch (err) {
            console.log(err);
            return;
        }
    }

    const xorHexEncode = async (text, gama) => {
        try {
            const res = await fetch(`${_apiBase}/encode/xor2hex`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    request: text,
                    key: gama
                })
            });

            const data = await res.json();
            return data.result;
        } catch (err) {
            console.log(err);
            return;
        }
    }

    const xorHexDecode = async (text, gama) => {
        try {
            const res = await fetch(`${_apiBase}/decode/xor2hex`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    request: text,
                    key: gama
                })
            });

            const data = await res.json();
            return data.result;
        } catch (err) {
            console.log(err);
            return;
        }
    }

    return {
        createGama,
        xor2Encode,
        xor2Decode,
        xorHexEncode,
        xorHexDecode
    }
};

export default Service;