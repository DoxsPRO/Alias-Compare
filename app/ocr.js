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
    const valNomi = riconosciNome(text);
    setnomiPresi(valNomi);
    await worker.terminate();
  };

  return (
    <div class="input-group mb-3">
      <input type="file" class="form-control" id="inputGroupFile02" accept="image/*" onChange={handleFileChange} />
      {ocrResult && <p>Risultato OCR: {ocrResult}</p>}
      {nomiPresi && (
        <div>
          <p>Nominativi Rilevati:</p>
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
