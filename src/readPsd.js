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

// const psd = require('psd');

// // Ruta al archivo PSD
// const psdFilePath = '../banners__aCrear/MCD_McAuto__320x100/300x100_Verano.psd';

// // Capa de referencia
// const referenceLayerName = 'Fondo'; // Reemplaza con el nombre de la capa de referencia

// // Cargar el archivo PSD
// psd.open(psdFilePath).then(psdFile => {
//   // Obtener la capa de referencia
//   const referenceLayer = psdFile.tree().descendants().find(layer => layer.name === referenceLayerName);

//   if (!referenceLayer) {
//     console.error('La capa de referencia no se encontró en el archivo PSD.');
//     return;
//   }

//   // Recorrer las capas y calcular la distancia a la capa de referencia
//   psdFile.tree().descendants().forEach(layer => {
//     if (layer === referenceLayer) {
//       return; // Ignorar la capa de referencia
//     }

//     // Calcular la distancia desde la capa actual a la capa de referencia
//     const distanceLeft = referenceLayer.left - layer.left;
//     const distanceTop = referenceLayer.top - layer.top;
//     const distanceRight = layer.left - referenceLayer.left - referenceLayer.width;
//     const distanceBottom = layer.top - referenceLayer.top - referenceLayer.height;

//     // Imprimir la distancia de cada capa a la capa de referencia
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

// const PSD = require('psd');

// // Ruta del archivo PSD
// const psdPath = '../banners__aCrear/MCD_McAuto__320x100/300x100_Verano.psd';

// // Carga el archivo PSD
// PSD.open(psdPath).then(psd => {
//   // Recorre todas las capas del archivo PSD
//   psd.tree().descendants().forEach(layer => {
//     // Comprueba si la capa contiene una imagen rasterizada
//     if (layer.isPixelLayer()) {
//       const width = layer.width();  // Ancho de la imagen en píxeles
//       const height = layer.height();  // Alto de la imagen en píxeles
//       console.log(`Capa: ${layer.name()}, Tamaño: ${width}x${height}`);
//     }
//   });
// }).catch(err => {
//   console.error('Error al abrir el archivo PSD:', err);
// });

// ____________________________________________________________________________________
// const PSD = require("psd");

// // Ruta del archivo PSD
// const psdPath = "../banners__aCrear/MCD_McAuto__300x250/300x250.psd";

// // Carga el archivo PSD
// PSD.open(psdPath)
//     .then((psd) => {
//         // Verificar si hay un lienzo y obtener sus dimensiones
//         if (psd.tree().children.length > 0) {
//             const rootNode = psd.tree().children[0];
//             const canvasWidth = rootNode.width;
//             const canvasHeight = rootNode.height;
//             console.log(`Tamaño del lienzo: ${canvasWidth}x${canvasHeight}`);

//             // Verificar si hay grupos de capas
//             if (rootNode.children && rootNode.children.length > 0) {
//                 const groups = rootNode.children.filter((child) =>
//                     child.isGroup()
//                 );

//                 if (groups.length > 0) {
//                     // Seleccionar el primer grupo de capas
//                     const selectedGroup = groups[0];
//                     console.log(`Grupo seleccionado: ${selectedGroup.name}`);

//                     // Verificar si hay capas dentro del grupo seleccionado
//                     if (
//                         selectedGroup.children &&
//                         selectedGroup.children.length > 0
//                     ) {
//                         const layers = selectedGroup.children.filter((child) =>
//                             child.isPixelLayer()
//                         );

//                         if (layers.length > 0) {
//                             console.log(`Imágenes encontradas:`);

//                             // Obtener información de tamaño y posición de cada imagen
//                             layers.forEach((layer) => {
//                                 const width = layer.width;
//                                 const height = layer.height;
//                                 const left = layer.left;
//                                 const top = layer.top;

//                                 console.log(`- Tamaño: ${width}x${height}`);
//                                 console.log(
//                                     `  Posición: ${left}px desde la izquierda, ${top}px desde la parte superior`
//                                 );
//                             });
//                         } else {
//                             console.log(
//                                 "No se encontraron imágenes dentro del grupo de capas."
//                             );
//                         }
//                     } else {
//                         console.log(
//                             "No hay capas dentro del grupo de capas seleccionado."
//                         );
//                     }
//                 } else {
//                     console.log("No se encontraron grupos de capas.");
//                 }
//             } else {
//                 console.log("No hay grupos de capas en el archivo PSD.");
//             }
//         } else {
//             console.log("El archivo PSD no contiene un lienzo válido.");
//         }
//     })
//     .catch((err) => {
//         console.error("Error al abrir el archivo PSD:", err);
//     });

//______________________________________________________________________________________________
const fs = require("fs");
const path = require("path");
const PSD = require("psd");

// Ruta del archivo PSD
const psdPath = "../banners__aCrear/MCD_McAuto__300x250/300x250.psd";

// Carga el archivo PSD
PSD.open(psdPath)
    .then((psd) => {
        const layerTree = psd.tree();

        // Obtener todas las capas en el árbol de capas
        const layers = layerTree.descendants();

        // Filtrar solo las capas visibles
        const visibleLayers = layers.filter((layer) => layer.visible());

        // Recorrer las capas y mostrar la información
        visibleLayers.forEach((layer) => {
            // Obtener información de la capa
            const layerName = layer.get("name");
            const top = layer.get("top");
            const left = layer.get("left");
            const width = layer.get("width");
            const height = layer.get("height");

            // Imprimir información en la consola
            console.log(`- Nombre: ${layerName}`);
            console.log(`  Posición: (${left}, ${top})`);
            console.log(`  Dimensiones: ${width}x${height}`);
        });
    })
    .catch((err) => {
        console.error("Error al abrir el archivo PSD:", err);
    });
