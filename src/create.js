/**
 * this program will build the base of the banners automatically
 *  regardless of their size or number of images.
 */

// instances
const fs = require("fs");
const path = require("path");

//constants
const folderLocation = "../banners__aCrear";
const outPutFolder = "../build";

/**
 *  search for a folder path
 * @param {string} filePath
 * @returns items within that folder
 */
const getFileList = (filePath) => {
    const files = fs.readdirSync(filePath);
    return files.filter((file) => file !== ".DS_Store");
};

/**
 *  is responsible for deleting everything in the folder
 * @param {string} filePath
 */
const hardDelete = (filePath) => {
    fs.rmSync(filePath, { recursive: true });
};

/**
 * validates if a folder exists and deletes everything
 *  in it to make the environment ready for new banners
 */
const prepareEnvironment = () => {
    if (fs.existsSync(outPutFolder)) {
        hardDelete(outPutFolder);
    }
    fs.mkdirSync(outPutFolder);
};

/**
 * this function prepares the folder and performs
 *  the banner creation process for each of the folders
 *  that you have.
 * @param {Array} list
 */
const createBaseFolders = (list) => {
    prepareEnvironment();
    list.forEach((element) => {
        const folderPath = path.join(__dirname, outPutFolder, element);
        fs.mkdirSync(folderPath);
        fs.writeFileSync(path.join(folderPath, "index.js"), ""); // Crea un archivo vacío llamado 'index.js' en la carpeta creada
    });
};

/**
 * receives and clears the folder titles that already
 * have an established format
 * @param {*} element
 * @returns clean elements
 */
const getbannerData = (element) => {
    return {
        width: element.split("__").pop().split("x").shift(),
        height: element.split("x").pop(),
        name: element.split("__").shift(),
    };
};

/**
 * creates the elements html
 * @param {string} clasName
 * @returns template string
 */
const elementMarkup = (clasName, type = "html") => {
    const x = clasName.split(".").shift();
    if (type == "js") {
        return `.from(".${x}", 3, {	x: 40, height:"100px", ease: Back.easeOut}, "primero")`;
    }
    if (type == "css") {
        return `
        .${x} {
            top: 0px;
            left: 0px;
            text-align: center;
            position: absolute;
            /* z-index: 0; */
            /* width: 100%; */
            /* right: 210px; */
            /* bottom: -10px; */
        }`;
    }
    if (type == "html") {
        return `<div class="${x}"><img src="./assets/${clasName}" alt=""></div>`;
    }
};

/**
 * executes all the logic to create the html structure with its style and base script
 * @param {string} list
 */
const createHtmlFiles = (list) => {
    // leer plantilla
    const baseHtml = fs.readFileSync("./template/index.html", "utf8");
    const baseJs = fs.readFileSync("./template/index.js", "utf8");

    // crear html porcada folderLocation
    list.forEach((element) => {
        const { width, height, name } = getbannerData(element);

        const assetFolder = `${folderLocation}/${element}/assets`;
        const newAssetPath = `../build/${element}`;
        const bannerAssets = fs.existsSync(assetFolder)
            ? getFileList(assetFolder)
            : [];

        // Verificar si el archivo existe y moverlo
        if (fs.existsSync(assetFolder)) {
            const nuevaRutaCarpetaAssets = path.join(newAssetPath, "assets");
            fs.mkdirSync(nuevaRutaCarpetaAssets); // Crear la carpeta 'assets' en el directorio de salida

            const archivosAssets = getFileList(assetFolder);
            archivosAssets.forEach((archivo) => {
                const rutaArchivoOrigen = path.join(assetFolder, archivo);
                const rutaArchivoDestino = path.join(
                    nuevaRutaCarpetaAssets,
                    archivo
                );
                fs.copyFileSync(rutaArchivoOrigen, rutaArchivoDestino);
                console.log(`Archivo ${archivo} copiado con éxito`);
            });
        } else {
            console.log("La carpeta de activos no existe");
        }

        const bannerMarkup = bannerAssets
            .map((element) => elementMarkup(element))
            .join("\n");

        const codeMarkup = bannerAssets
            .map((element) => elementMarkup(element, "js"))
            .join("\n");

        const styleMarkup = bannerAssets
            .map((element) => elementMarkup(element, "css"))
            .join("\n");

        const bannerBackground = "#00809a";
        const bannerStyles = `
        * {
            position: absolute;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box
        }

        body {
            margin: 0
        }

        ${styleMarkup}

        .ad {
            width: ${width}px;
            height: ${height}px;
            border: 1px solid #000;
            background-color: transparent;
            z-index: 10;
            cursor: pointer;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
            background: ${bannerBackground};
        }

        .ad:hover {
            animation: shake 150ms 2 linear;
            -moz-animation: shake 150ms 2 linear;
            -webkit-animation: shake 150ms 2 linear;
            -o-animation: shake 150ms 2 linear
        }
        @keyframes shake {
            0 {
                transform: translate(3px, 0)
            }
            50% {
                transform: translate(-3px, 0)
            }
            100% {
                transform: translate(0, 0)
            }
        }
        @-moz-keyframes shake {
            0 {
                -moz-transform: translate(3px, 0)
            }
            50% {
                -moz-transform: translate(-3px, 0)
            }
            100% {
                -moz-transform: translate(0, 0)
            }
        }
        @-webkit-keyframes shake {
            0 {
                -webkit-transform: translate(3px, 0)
            }
            50% {
                -webkit-transform: translate(-3px, 0)
            }
            100% {
                -webkit-transform: translate(0, 0)
            }
        }
        @-ms-keyframes shake {
            0 {
                -ms-transform: translate(3px, 0)
            }
            50% {
                -ms-transform: translate(-3px, 0)
            }
            100% {
                -ms-transform: translate(0, 0)
            }
        }
        @-o-keyframes shake {
            0 {
                -o-transform: translate(3px, 0)
            }
            50% {
                -o-transform: translate(-3px, 0)
            }
            100% {
                -o-transform: translate(0, 0)
            }
        }


        `;

        // replace tags in html for content
        const html = baseHtml
            .replace("__WIDTH__", width)
            .replace("__NOMBRE__", name)
            .replace("__HEIGHT__", height)
            .replace("__BANNER__", bannerMarkup)
            .replace("/*__STYLES__*/", bannerStyles);

        fs.writeFileSync(
            `${outPutFolder}/${element}/${name}.html`,
            html,
            "utf8"
        );

        // replace tags in js for content
        const contetJs = baseJs.replace("__CODE__", codeMarkup);

        fs.writeFileSync(
            `${outPutFolder}/${element}/index.js`,
            contetJs,
            "utf8"
        );
    });
};

const buildBanners = () => {
    const bannerFolders = getFileList(folderLocation);

    createBaseFolders(bannerFolders);
    createHtmlFiles(bannerFolders);
};

buildBanners();

//organizar css con posiciones
