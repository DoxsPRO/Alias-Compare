
export const convertiTestoInJson = (testo) => {
  //console.log(testo);
  const datiPersona = {};
  const regexNome = /sotto\s*([^,;]+)/g;
  let precedenti = [];
  let precedente = {};
  const linee = testo.split('\n');

  linee.forEach((linea, index) => {
    //if (!(linea.startsWith('|') || linea.startsWith('*'))) {
      //console.log(linea);
        if(linea.match(regexNome))
          console.log("SUCC: " + linea + linee[index + 1]);
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


