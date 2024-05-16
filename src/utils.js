const fs = require("fs");
const path = require("path"); // Módulo 'path' para trabajar con rutas de archivos y directorios

/**
 *  is responsible for deleting everything in the folder
 * @param {string} filePath
 */
const hardDelete = (filePath) => {
    fs.rmSync(filePath, { recursive: true }); // Elimina de forma recursiva el contenido de la carpeta proporcionada
};

/**
 *  search for a folder path
 * @param {string} filePath
 * @returns items within that folder
 */
const getFileList = (filePath) => {
    const files = fs.readdirSync(filePath); // Lee los archivos y directorios dentro de la ruta proporcionada
    return files.filter((file) => file !== ".DS_Store"); // Filtra los archivos, eliminando el archivo .DS_Store (común en macOS)
};

exports.getFileList = getFileList;

/**
 * validates if a folder exists and deletes everything
 *  in it to make the environment ready for new banners
 */
exports.prepareEnvironment = (outPutFolder) => {
    if (fs.existsSync(outPutFolder)) {
        hardDelete(outPutFolder); // Elimina su contenido si existe
    }
    fs.mkdirSync(outPutFolder); // Crea la carpeta de salida
};

exports.copyAssets = (originFolder, destinationFolder) => {
    // Verificar si el archivo existe y moverlo
    if (fs.existsSync(originFolder)) {
        fs.mkdirSync(destinationFolder); // Crear la carpeta 'assets' en el directorio de salida
        const assetFiles = getFileList(originFolder);

        assetFiles.forEach((file) => {
            const originPath = path.join(originFolder, file);
            const destinationPath = path.join(destinationFolder, file);
            fs.copyFileSync(originPath, destinationPath);
        });
    } else {
        console.log("La carpeta de activos no existe");
    }
};
