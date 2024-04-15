
function separaParoleAttaccate(stringa) {
  return stringa.replace(/([a-z])([A-Z])|(\|)/g, '$1 $2').trim();
}

export const riconosciNome = (testo) => {
  //console.log(testo);
  var datiPersona = {};
  const regexNome = /sotto\s*([^,;]+)/g;
  const regexCognomeNome = /([A-Z]+(?:\s+[A-Z]+)*)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)|([A-Z]+[a-z]+)\s*([A-Z][a-z]+)/;
  const linee = testo.split('\n');
  let nomiCognomiArray = []; // Dichiarazione dell'array per salvare nomi e cognomi


  linee.forEach((linea, index) => {
    //if (!(linea.startsWith('|') || linea.startsWith('*'))) {
      //console.log(linea);
        if(linea.match(regexNome)) {
          if (linee[index + 1]){ //controlla se la linea succ esiste
            datiPersona = linea + linee[index + 1];
            datiPersona.replace(/\n/g, ' ');
            datiPersona = separaParoleAttaccate(datiPersona);
            console.log(datiPersona);
            var matchNome = datiPersona.match(regexCognomeNome);
            if (matchNome) {
              console.warn(matchNome[1] +" "+ matchNome[2]);
              nomiCognomiArray.push(`${matchNome[1]} ${matchNome[2]}`);
            }
          }
          
        }
  });
  //datiPersona.nomiCognomi = nomiCognomiArray;

  return nomiCognomiArray;
};



