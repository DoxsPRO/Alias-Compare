
function separaParoleAttaccate(stringa) {
  return stringa.replace(/([a-z])([A-Z])|(\|)|(\*)/g, '$1 $2').trim();
};

const riconosciNome = (testo) => {
  //console.log(testo);
  var datiPersona = {};
  let RilArray = []; // Dichiarazione dell'array per salvare nomi e cognomi

  const regexNome = /sotto\s*([^,;]+)/g;
  const regexCognomeNome = /([A-Z]+(?:\s+[A-Z]+)*)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)|([A-Z]+[a-z]+)\s*([A-Z][a-z]+)/;
  const regexData = /nato(?:in)?\s+(.*?)\s+(?:il\s*)?(\d{2}\.\d{2}\.\d{4})/;
  //const regexData = /nato(?:in)?\s+(.*?)\s+(?:il\s+)?(\d{2}\.\d{2}\.\d{4})/; ULTIMA VERSIONE
  //const regexData = /nato(?:in)?\s+(.*?)\s+il\s+(\d{2}\.\d{2}\.\d{4})/;


  const linee = testo.split('\n');

  linee.forEach((linea, index) => {
    //if (!(linea.startsWith('|') || linea.startsWith('*'))) {
    //console.log(linea);
    if (linea.match(regexNome)) {
      if (linee[index + 1] && linee[index + 2] && linee[index + 3]) { //controlla se la linea succ esiste
        datiPersona = linea + linee[index + 1] + linee[index + 2] + linee[index + 3];
        datiPersona.replace(/\n/g, ' ');
        datiPersona = separaParoleAttaccate(datiPersona);
        console.log(datiPersona);
        var matchNome = datiPersona.match(regexCognomeNome);
        if (matchNome) {
          //console.warn(matchNome[1] + " " + matchNome[2]);
        }
        var matchData = datiPersona.match(regexData);
        if (matchData) {
          matchData = matchData.map(function (stringa) {
            // Rimuove "in" e "il" dalla stringa
            return stringa.replace(/\b(?:in|il)\b/g, '');
          });
          console.warn(matchData[1] + " " + matchData[2]);
        }
        RilArray.push(`${matchNome[1]} ${matchNome[2]} ${matchData[1]} ${matchData[2]}`);

      }

    }
  });
  //datiPersona.nomiCognomi = nomiCognomiArray;

  return RilArray;
};


export function riconosciNominativo(textPass) {
  return riconosciNome(textPass);
}


