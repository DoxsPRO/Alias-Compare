import { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { riconosciNome } from '../app/json.js';

function OCRComponent() {
  const [ocrResult, setOCRResult] = useState(null);
  const [nomiPresi, setnomiPresi] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const worker = await createWorker('ita');
    const { data: { text } } = await worker.recognize(file);
    setOCRResult(text);
    const convertedJson = riconosciNome(text);
    setnomiPresi(convertedJson);
    await worker.terminate();
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {ocrResult && <p>Risultato OCR: {ocrResult}</p>}
      {nomiPresi && (
        <div>
          <p>Nominativi:</p>
          <ul>
            {nomiPresi.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

export default OCRComponent;
