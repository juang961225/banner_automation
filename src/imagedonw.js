const fs = require("fs");
const path = require("path");
const PSD = require("psd");

// Ruta del archivo PSD
const psdPath = "../banners__aCrear/MCD_McAuto__300x250/300x250.psd";

// Carga el archivo PSD
PSD.open(psdPath)
    .then((psd) => {
        const layerTree = psd.tree();

        // Función recursiva para obtener las capas de píxeles (imágenes)
        function getPixelLayers(layers) {
            const pixelLayers = [];

            layers.forEach((layer) => {
                if (layer.isGroup()) {
                    // Si es un grupo, se exploran las capas internas
                    pixelLayers.push(...getPixelLayers(layer.children()));
                } else {
                    // Si es una capa de píxeles, se agrega a la lista
                    pixelLayers.push(layer);
                }
            });

            return pixelLayers;
        }

        // Obtener todas las capas de píxeles (imágenes)
        const pixelLayers = getPixelLayers(layerTree.children());

        if (pixelLayers.length > 0) {
            console.log(`Imágenes encontradas:`);

            // Recorrer todas las capas de píxeles (imágenes)
            pixelLayers.forEach((layer, index) => {
                // Verificar si la capa tiene una representación de imagen válida
                if (layer.image && typeof layer.image.toPng === "function") {
                    // Obtener información de tamaño y posición de la capa
                    const width = layer.width;
                    const height = layer.height;
                    const left = layer.left;
                    const top = layer.top;
                    const layerName = layer.name;

                    console.log(`- Tamaño: ${width}x${height}`);
                    console.log(
                        `  Posición: ${left}px desde la izquierda, ${top}px desde la parte superior`
                    );

                    // Guardar la imagen en disco
                    const imageBuffer = layer.image.toPng();
                    const imageName = `${layerName.replace(
                        /[^a-zA-Z0-9]/g,
                        "_"
                    )}.png`;
                    const imagePath = path.join(__dirname, imageName);
                    fs.writeFileSync(imagePath, imageBuffer);

                    console.log(`  Imagen guardada: ${imageName}`);
                } else {
                    console.log(
                        `- Capa "${layer.name}" no tiene una representación de imagen válida.`
                    );
                }
            });
        } else {
            console.log("No se encontraron imágenes en el archivo PSD.");
        }
    })
    .catch((err) => {
        console.error("Error al abrir el archivo PSD:", err);
    });
