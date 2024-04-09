import { useState } from 'react';
import { createWorker } from 'tesseract.js';

function OCRComponent() {
  const [ocrResult, setOCRResult] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return; // If no file selected, do nothing

    const worker = await createWorker('ita');
    const { data: { text } } = await worker.recognize(file);
    setOCRResult(text);
    await worker.terminate();
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {ocrResult && <p>Risultato OCR: {ocrResult}</p>}
    </div>
  );
}

export default OCRComponent;
