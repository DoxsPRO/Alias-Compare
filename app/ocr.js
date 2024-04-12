import { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { convertiTestoInJson } from '../app/json.js';

function OCRComponent() {
  const [ocrResult, setOCRResult] = useState(null);
  const [jsonObject, setJsonObject] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const worker = await createWorker('ita');
    const { data: { text } } = await worker.recognize(file);
    setOCRResult(text);
    const convertedJson = convertiTestoInJson(text);
    setJsonObject(convertedJson);
    await worker.terminate();
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {ocrResult && <p>Risultato OCR: {ocrResult}</p>}
      {jsonObject && (
        <div>
          <p>JSON:</p>
          <pre>{JSON.stringify(jsonObject, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default OCRComponent;
