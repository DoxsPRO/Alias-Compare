import { useState } from 'react';
import { createWorker } from 'tesseract.js';

function OCRComponent() {
  const [ocrResult, setOCRResult] = useState(null);

  const startOCR = async () => {
    const worker = await createWorker('ita');
    const { data: { text } } = await worker.recognize('/images/prova.jpg');
    setOCRResult(text);
    await worker.terminate();
  };

  return (
    <div>
      <button onClick={startOCR}>Esegui OCR</button>
      {ocrResult && <p>Risultato OCR: {ocrResult}</p>}
    </div>
  );
}

export default OCRComponent;


/*
export async function performOCR(imageUrl) {
    const { data: { text } } = await Tesseract.recognize(imageUrl);
    return text;
} 
*/
