// const psd = require('psd');

// // Ruta al archivo PSD
// const psdFilePath = '../banners__aCrear/MCD_McAuto__320x50/320x50_Verano.psd';

// // Cargar el archivo PSD
// psd.open(psdFilePath).then(psdFile => {
//   // Acceder a las capas del archivo PSD
//   const tree = psdFile.tree();
  
//   // Recorrer las capas
//   tree.descendants().forEach(layer => {
//     // Obtener información de la capa
//     console.log('Nombre de la capa:', layer.name);
//     console.log('Dimensiones de la capa:', layer.width, 'x', layer.height);
//     console.log('Visibilidad de la capa:', layer.visible);
//     console.log('Opacidad de la capa:', layer.opacity);
//     console.log('Modo de fusión de la capa:', layer.blendMode);
//     console.log('Tipo de capa:', layer.type);
//     console.log('---');
//   });
// }).catch(err => {
//   console.error('Error al abrir el archivo PSD:', err);
// });

// __________________________________________________________________________________________

// const psd = require('psd');

// // Ruta al archivo PSD
// const psdFilePath = '../banners__aCrear/MCD_McAuto__320x50/320x50_Verano.psd';

// // Cargar el archivo PSD
// psd.open(psdFilePath).then(psdFile => {
//   // Acceder al fondo
//   const background = psdFile.tree().descendants()[0];

//   // Recorrer las capas
//   psdFile.tree().descendants().forEach(layer => {
//     // Calcular la distancia desde la capa al borde del fondo
//     const distanceLeft = layer.left - background.left;
//     const distanceTop = layer.top - background.top;
//     const distanceRight = background.right - (layer.left + layer.width);
//     const distanceBottom = background.bottom - (layer.top + layer.height);

//     // Imprimir la distancia de cada capa al borde del fondo
//     console.log('Capa:', layer.name);
//     console.log('Distancia al borde izquierdo:', distanceLeft);
//     console.log('Distancia al borde superior:', distanceTop);
//     console.log('Distancia al borde derecho:', distanceRight);
//     console.log('Distancia al borde inferior:', distanceBottom);
//     console.log('---');
//   });
// }).catch(err => {
//   console.error('Error al abrir el archivo PSD:', err);
// });

// ____________________________________________________________________________________

const psd = require('psd');

// Ruta al archivo PSD
const psdFilePath = '../banners__aCrear/MCD_McAuto__320x100/300x100_Verano.psd';

// Capa de referencia
const referenceLayerName = 'Fondo'; // Reemplaza con el nombre de la capa de referencia

// Cargar el archivo PSD
psd.open(psdFilePath).then(psdFile => {
  // Obtener la capa de referencia
  const referenceLayer = psdFile.tree().descendants().find(layer => layer.name === referenceLayerName);

  if (!referenceLayer) {
    console.error('La capa de referencia no se encontró en el archivo PSD.');
    return;
  }

  // Recorrer las capas y calcular la distancia a la capa de referencia
  psdFile.tree().descendants().forEach(layer => {
    if (layer === referenceLayer) {
      return; // Ignorar la capa de referencia
    }

    // Calcular la distancia desde la capa actual a la capa de referencia
    const distanceLeft = referenceLayer.left - layer.left;
    const distanceTop = referenceLayer.top - layer.top;
    const distanceRight = layer.left - referenceLayer.left - referenceLayer.width;
    const distanceBottom = layer.top - referenceLayer.top - referenceLayer.height;

    // Imprimir la distancia de cada capa a la capa de referencia
    console.log('Capa:', layer.name);
    console.log('Distancia al borde izquierdo:', distanceLeft);
    console.log('Distancia al borde superior:', distanceTop);
    console.log('Distancia al borde derecho:', distanceRight);
    console.log('Distancia al borde inferior:', distanceBottom);
    console.log('---');
  });
}).catch(err => {
  console.error('Error al abrir el archivo PSD:', err);
});
