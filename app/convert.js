const testoOCR = `* * * CASELLARIO CENTRALE IDENTITA' * * * | POPE LLI * - FOGLIO 1 - ESATTE GENERALITA': SCONOSCIUTE ELENCO PRECEDENTI DATTILOSCOPICI relativi a KONARA MUDIYANSELAGE Dinesh Doshmantha Rupasimgha C.U.I. (Codice Univoco Identificativo) : 03190E26 Prelievo DNA eseguito presso CASA CIRCONDARIALE di CREMONA (CR) in data 18/05/2020; > MI00JSK GABINETTO REGIONALE DI POLIZIA SCIENTIFICA di MILANO (Ufficio richiedente: UPGSP) il 08.04.2024 per "DENUNCIATO IN STATO DI LIBERTA' PER TENTATO FURTO", sotto il nome di KONARA MUDIYANSELAGE Dinesh Doshmantha Rupasimgha, nato in * SRI LANKA (CEYLON) il 11.09.1987, paese di appartenenza SRI LANKA (CEYLON); - MI00JFJ GABINETTO REGIONALE DI POLIZIA SCIENTIFICA di MILANO (Ufficio richiedente: SQUADRA MOBILE) il 05.04.2024 per "ARRESTATO PER CONCORSO IN FURTO AGGRAVATO", sotto il nome di KONARA MUDIANSELAGE Dinesh Dushmantha Rupasinghe, nato in SRI LANKA (CEYLON) il 11.09.1987, paese di appartenenza SRI LANKA (CEYLON); - MI0OIQU GABINETTO REGIONALE DI POLIZIA SCIENTIFICA di MILANO (Ufficio richiedente: COMM.TO CENTRO) il 02.04.2024 per "IDENTIFICAZIONE", sotto il nome di KONARA Mudyanselage Dinesh Dushmana Rupasinghe, nato in SRI LANKA (CEYLON) il 11.09.1987, paese di appartenenza SRI LANKA (CEYLON); - MIOOIHN GABINETTO REGIONALE DI POLIZIA SCIENTIFICA di MILANO (Ufficio richiedente: UPGSP) il 29.03.2024 per i “IDENTIFICAZIONE”, sotto il nome di KONARA MUDYANSELAGE | Dinesh Dushmantha Rupasimgha, nato in SRI LANKA (CEYLON) il 11.09.1987, paese di appartenenza SRI LANKA (CEYLON); - MI0OHFS GABINETTO REGIONALE DI POLIZIA SCIENTIFICA di MILANO (Ufficio richiedente: UPGSP) il 25.03.2024 per "DENUNCIATO | IN STATO DI LIBERTA' PER TENTATO FURTO", sotto il nome di KONARA Dinesh, nato in SRI LANKA (CEYLON) il 11.09.1987, i paese di appartenenza SRI LANKA (CEYLON); | = CCB3KT6 COMPAGNIA NUCLEO OPERATIVO E RADIOMOBILE di SAN DONATO | MILANESE (Ufficio richiedente: TENENZA SAN GIULIANO MILANESE) il 31.12.2023 per "IDENTIFICAZIONE", sotto il nome di KONARA MUDIYANSELAGE Dinesh Dushmantha Rupsasinghe di SISIRA, nato in COMUNE ESTERO EE (SRI-LANKA) il 11.09.1987, paese di appartenenza SRI LANKA (CEYLON); 08-04-2024 ## SEGUE ELENCO ##`;

// Dividi il testo in righe
const righe = testoOCR.split('\n');

// Funzione per estrarre i dati relativi ai precedenti
const estraiPrecedenti = (righe) => {
  const precedenti = [];
  for (let riga of righe) {
    if (riga.trim().startsWith('-')) {
      const infoPrecedente = riga.trim().split(' ');
      const gabinetto = infoPrecedente[0].substr(1); // Rimuovi il carattere '-' dal gabinetto
      const data = infoPrecedente[infoPrecedente.length - 5];
      const motivo = riga.split('"')[1]; // Estrai il motivo tra virgolette
      const nome = riga.split('sotto il nome di ')[1].split(',')[0]; // Estrai il nome tra "sotto il nome di" e la virgola
      const cognome = nome.toUpperCase().split(' ')[1]; // Estrai il cognome (assume che il cognome sia tutto in maiuscolo e separato da altri nomi da uno spazio)
      const natoIn = riga.split('nato in ')[1].split(' il')[0]; // Estrai il luogo di nascita tra "nato in" e "il"
      const dataDiNascita = riga.split('il ')[1].split(',')[0]; // Estrai la data di nascita tra "il" e la virgola
      const paeseDiAppartenenza = riga.split('paese di appartenenza ')[1]; // Estrai il paese di appartenenza dopo "paese di appartenenza"
      precedenti.push({
        gabinetto,
        data,
        motivo,
        nome,
        cognome,
        natoIn,
        dataDiNascita,
        paeseDiAppartenenza
      });
    }
  }
  return precedenti;
};

// Funzione per estrarre i dati relativi al prelievo del DNA
const estraiPrelievoDNA = (righe) => {
  for (let riga of righe) {
    if (riga.includes('Prelievo DNA eseguito presso')) {
      const luogo = riga.split('Prelievo DNA eseguito presso ')[1].split(' in data')[0]; // Estrai il luogo tra "Prelievo DNA eseguito presso " e " in data"
      const data = riga.split(' in data ')[1].split(';')[0]; // Estrai la data tra " in data " e ";"
      return { luogo, data };
    }
  }
  return null;
};

// Estrai le informazioni generali
const estraiInformazioniGeneral = (righe) => {
  const info = {
    nome: '',
    cognome: '',
    cui: '',
    prelievoDNA: null,
    precedenti: []
  };

  for (let riga of righe) {
    if (riga.includes('ESATTE GENERALITA')) {
      const nomeCompleto = riga.split('relativi a ')[1].split(' C.U.I.')[0]; // Estrai il nome completo tra "relativi a " e " C.U.I."
      const nomi = nomeCompleto.split(' ');
      info.nome = nomi.slice(0, -1).join(' '); // Unisci i primi nomi (escludendo l'ultimo)
      info.cognome = nomi[nomi.length - 1].toUpperCase(); // Estrai l'ultimo nome come cognome e trasforma in maiuscolo
      info.cui = riga.split('C.U.I. (Codice Univoco Identificativo) : ')[1].split(' Prelievo DNA')[0]; // Estrai il CUI tra "C.U.I. (Codice Univoco Identificativo) : " e " Prelievo DNA"
    }
  }

  info.prelievoDNA = estraiPrelievoDNA(righe);
  info.precedenti = estraiPrecedenti(righe);

  return info;
};

// Estrai le informazioni generali
const informazioniGenerali = estraiInformazioniGeneral(righe);

// Converti le informazioni in formato JSON
const jsonOutput = JSON.stringify(informazioniGenerali, null, 2); // Il terzo parametro 2 indenta la stringa JSON di 2 spazi

console.log(jsonOutput);
