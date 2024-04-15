
function separaParoleAttaccate(stringa) {
  return stringa.replace(/([a-z])([A-Z])/g, '$1 $2').trim();
}

export const convertiTestoInJson = (testo) => {
  //console.log(testo);
  var datiPersona = {};
  const regexNome = /sotto\s*([^,;]+)/g;
  //const regexCognomeNome = /([A-Z]+(?:\s+[A-Z]+)*)\s+(?:\||)([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)(?:\s{2,}|\n|,)/;
  //const regexCognomeNome = /([A-Z]+(?:\s+[A-Z]+)*)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*),/;
  const regexCognomeNome = /([A-Z]+(?:\s+[A-Z]+)*)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)|([A-Z]+[a-z]+)\s*([A-Z][a-z]+)/;
  let precedenti = [];
  let precedente = {};
  const linee = testo.split('\n');

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
            }
          }
          
        }
      //const matches = linea.match(regexNome);
      
    //}
    //console.log(linea);
    //const [campo, valore] = linea.split(/:(.+)/).map(item => item.trim());
    //console.log(campo, valore);
    /*
    if (linea === '|') {
      datiPersona[campo.toLowerCase().replace(/ /g, '_')] = precedenti;
    } else if (campo && valore) {
      if (campo.startsWith('-')) {
        precedenti.push(precedente);
        precedente = {};
      } else {
        precedente[campo.toLowerCase().replace(/ /g, '_')] = valore;
      }
    }*/
  });
  return datiPersona;
};

/*export const convertiTestoInJson = (testo) => {
  //console.log(testo);
  const datiPersona = {};
  let precedenti = [];
  let precedente = {};
  testo.split('\n').forEach((linea) => {
    //console.log(linea);
    //const [campo, valore] = linea.split(/:(.+)/).map(item => item.trim());
    //console.log(campo, valore);
    if (campo === 'Precedenti') {
      datiPersona[campo.toLowerCase().replace(/ /g, '_')] = precedenti;
    } else if (campo && valore) {
      if (campo.startsWith('-')) {
        precedenti.push(precedente);
        precedente = {};
      } else {
        precedente[campo.toLowerCase().replace(/ /g, '_')] = valore;
      }
    }
  });
  return datiPersona;
}; */


