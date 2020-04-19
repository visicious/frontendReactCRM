export const colorPrioridad = (porcentajeBuscado, topeMinimo = 1, topeMaximo = 10) => {
    // console.log('procentaje buscado => ' + porcentajeBuscado)
    porcentajeBuscado = porcentajeBuscado - topeMinimo;
    let paletaColores = [[255, 3, 0], [255, 137, 3], [36, 95, 179], [0, 196, 219]];
    let diferenciaColor = [];
    let colorFinal = [];
    let tamanoPaso = ((topeMaximo - topeMinimo) + 1) / (paletaColores.length - 1);
    if (tamanoPaso <= 1) {
        colorFinal = paletaColores[porcentajeBuscado]
    } else {
        let preIndiceColorBase = parseFloat(((porcentajeBuscado + 1) / tamanoPaso).toFixed(4));
        let indiceColorBase = Math.floor(preIndiceColorBase);
        let indiceColorTope = indiceColorBase + 1;
        if (Number.isInteger(preIndiceColorBase)) {
            colorFinal = paletaColores[preIndiceColorBase]
        } else if (indiceColorBase == 1 && indiceColorTope == 2) {
            for (let i = 0; i < 3; i++) {
                diferenciaColor.push(Math.abs((paletaColores[0][i] - paletaColores[paletaColores.length - 1][i]) / ((topeMaximo - topeMinimo))));
            }
            for (let j = 0; j < diferenciaColor.length; j++) {
                colorFinal.push(Math.ceil(Math.abs(paletaColores[0][j] - diferenciaColor[j] * (porcentajeBuscado * 1.2))));
            }
        } else {
            for (let i = 0; i < 3; i++) {
                diferenciaColor.push(Math.abs((paletaColores[indiceColorBase][i] - paletaColores[indiceColorTope][i]) / tamanoPaso));
            }
            for (let j = 0; j < diferenciaColor.length; j++) {
                let componenteColor = paletaColores[indiceColorTope][j] - diferenciaColor[j] * ((indiceColorBase + 1) * tamanoPaso - (porcentajeBuscado + 1));
                colorFinal.push(Math.ceil(Math.abs(componenteColor)));
            }
        }
    }
    // console.log(`rgba(${Math.round(colorFinal[0])},${Math.round(colorFinal[1])},${Math.round(colorFinal[2])})`);
    return `rgba(${Math.round(colorFinal[0])},${Math.round(colorFinal[1])},${Math.round(colorFinal[2])})`
}
export const colorPorcentaje = (porcentajeBuscado) => {
    let paletaColores = [[236, 255, 4], [106, 247, 0]];
    let diferenciaColor = [];
    let colorFinal = [];
    for (let i = 0; i < 3; i++) {
        diferenciaColor.push(Math.abs((paletaColores[0][i] - paletaColores[1][i]) / 100));
    }
    for (let j = 0; j < diferenciaColor.length; j++) {
        colorFinal.push(Math.ceil(Math.abs(paletaColores[0][j] - diferenciaColor[j] * porcentajeBuscado)));
    }
    return `rgb(${Math.round(colorFinal[0])},${Math.round(colorFinal[1])},${Math.round(colorFinal[2])})`
}