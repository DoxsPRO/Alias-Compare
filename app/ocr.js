import Tesseract from "tesseract.js";

const { createWorker } = require('tesseract.js');

export async function start_OCR() {

    const worker = await createWorker('ita');

    (async () => {
        const { data: { text } } = await worker.recognize('/images/prova.jpg');
        console.log(text);
        await worker.terminate();
    })();
    
}

/*
export async function performOCR(imageUrl) {
    const { data: { text } } = await Tesseract.recognize(imageUrl);
    return text;
} 
*/
