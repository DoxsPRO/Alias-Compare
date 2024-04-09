import { useState } from 'react';
import { createWorker } from 'tesseract.js';
import nlp from 'compromise';

function OCRComponent() {
  const [ocrResult, setOCRResult] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const worker = await createWorker('ita');
    const { data: { text } } = await worker.recognize(file);
    setOCRResult(text);
    await worker.terminate();

    const doc = nlp(text);
    const terms = doc.terms().out('array');
    setAnalysisResult(terms);

  };

  const convertToJSON = () => {
    if (!analysisResult) return;

    const jsonText = JSON.stringify(analysisResult);
    console.log(jsonText);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {ocrResult && <p>Risultato OCR: {ocrResult}</p>}
      {analysisResult && (
        <div>
          <h2>Analisi del testo:</h2>
          <ul>
            {analysisResult.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ul>
          <button onClick={convertToJSON}>Converti in JSON</button>
        </div>
      )}
    </div>
  );
}

export default OCRComponent;
