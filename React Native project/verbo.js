
export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const nameTiempos = index => {

  switch (index) {
      case '0': return 'Indicativo presente'
      case '1': return 'Indicativo pretérito perfecto compuesto'
      case '2': return 'Indicativo pretérito imperfecto'
      case '3': return 'Indicativo pretérito perfecto simple'
      case '4': return 'Indicativo futuro'
      case '5': return 'Subjuntivo presente'
      default: return
  }
};

export const nameTiemposCorto = index => {

    switch (index) {
        case '0': return 'presente'
        case '1': return 'compuesto'
        case '2': return 'imperfecto'
        case '3': return 'simple'
        case '4': return 'futuro'
        case '5': return 'subjuntivo'
        default: return
    }
};

export const nameRosto = index => {

    switch (index) {
        case '0': return 'yo'
        case '1': return 'tú'
        case '2': return 'él/ella'
        case '3': return 'nosotros/as'
        case '4': return 'vosotros/as'
        case '5': return 'ellos/ellas'
        default: return
    }
};
