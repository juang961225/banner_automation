const psd = require("psd");
const fs = require("fs");
const { exit } = require("process");
const PNG = require("pngjs").PNG;

// Ruta al archivo PSD
const psdFilePath = "../banners__aCrear/MCD_McAuto__320x100/300x100_Verano.psd";

// Cargar el archivo PSD
const psdFile = psd.fromFile(psdFilePath);

// Obtener las capas del archivo PSD
const tree = psdFile.tree();
const layers = tree.descendants();

// Iterar sobre las capas y guardar las imágenes en archivos PNG
layers.forEach((layer) => {
    // Obtener los datos de píxeles de la capa
    const pixels = layer.layer.image.toPng();

    // Crear un objeto PNG y asignar los datos de píxeles
    const png = new PNG();
    png.width = layer.layer.width;
    png.height = layer.layer.height;
    png.data = pixels;

    // Guardar la imagen en un archivo PNG
    const fileName = `capa_${layer.layer.name}.png`;
    const filePath = `./${fileName}`;

    png.pack().pipe(fs.createWriteStream(filePath));

    console.log(
        `Imagen de la capa ${layer.layer.name} guardada en ${filePath}`
    );
});
