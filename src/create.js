/**
 * Este código se encarga de crear los archivos HTML y JS necesarios para los banners. Aquí hay una descripción general de lo que hace:
    Lee la lista de archivos y carpetas dentro de la carpeta banners__aCrear.
    Prepara el entorno eliminando el contenido de la carpeta de salida build si ya existe y crea la carpeta nuevamente.
    Para cada elemento en la lista de archivos y carpetas:
    a. Crea una carpeta con el nombre del elemento en la carpeta de salida.
    b. Crea un archivo vacío llamado index.js en la carpeta creada.
    c. Obtiene el ancho, alto y nombre del banner a partir del título de la carpeta.
    d. Verifica si existe una carpeta de activos para el banner.
    e. Si la carpeta de activos existe, copia los archivos de activos al directorio de salida.
    f. Genera el marcado HTML de los elementos del banner y el marcado JS para animar los elementos.
    g. Genera los estilos CSS para el banner.
    h. Reemplaza las etiquetas en la plantilla HTML y JS base por el contenido generado.
    i. Guarda el contenido HTML y JS generados en los archivos correspondientes.
    j. Muestra un mensaje de éxito en la consola.
    En resumen, este código automatiza la creación de los archivos HTML y JS para cada banner en la carpeta banners__aCrear, generando el marcado y estilos necesarios.
 */

// instances
const fs = require("fs"); // Módulo 'fs' para interactuar con el sistema de archivos
const path = require("path"); // Módulo 'path' para trabajar con rutas de archivos y directorios

// constants
const folderLocation = "../banners__aCrear"; // Ruta de la carpeta donde se encuentran los banners a crear
const outPutFolder = "../build"; // Ruta de la carpeta de salida donde se generarán los banners

/**
 *  search for a folder path
 * @param {string} filePath
 * @returns items within that folder
 */
const getFileList = (filePath) => {
    const files = fs.readdirSync(filePath); // Lee los archivos y directorios dentro de la ruta proporcionada
    return files.filter((file) => file !== ".DS_Store"); // Filtra los archivos, eliminando el archivo .DS_Store (común en macOS)
};

/**
 *  is responsible for deleting everything in the folder
 * @param {string} filePath
 */
const hardDelete = (filePath) => {
    fs.rmSync(filePath, { recursive: true }); // Elimina de forma recursiva el contenido de la carpeta proporcionada
};

/**
 * validates if a folder exists and deletes everything
 *  in it to make the environment ready for new banners
 */
const prepareEnvironment = () => {
    if (fs.existsSync(outPutFolder)) {
        hardDelete(outPutFolder); // Elimina su contenido si existe
    }
    fs.mkdirSync(outPutFolder); // Crea la carpeta de salida
};

/**
 * this function prepares the folder and performs
 *  the banner creation process for each of the folders
 *  that you have.
 * @param {Array} list
 */
const createBaseFolders = (list) => {
    prepareEnvironment(); // Prepara el entorno eliminando el contenido de la carpeta de salida si existe y creándola nuevamente
    list.forEach((element) => {
        const folderPath = path.join(__dirname, outPutFolder, element); // Genera la ruta completa de la carpeta de salida para cada elemento
        fs.mkdirSync(folderPath); // Crea la carpeta de salida para cada elemento
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
        width: element.split("__").pop().split("x").shift(), // Obtiene el ancho del banner a partir del título de la carpeta
        height: element.split("x").pop(), // Obtiene el alto del banner a partir del título de la carpeta
        name: element.split("__").shift(), // Obtiene el nombre del banner a partir del título de la carpeta
    };
};

/**
 * Creates the HTML markup for different elements
 * @param {string} className - The class name of the element
 * @param {string} type - The type of markup to generate (html, js, css, img, img-a)
 * @returns {string} - The generated markup
 */
const elementMarkup = (className, type = "html") => {
    const x = className.split(".").shift(); // Obtiene el nombre base del archivo eliminando la extensión

    switch (type) {
        case "js":
            // Genera una cadena de texto en formato JS para animar un elemento
            return `.from(".${x}", 3, { x: 40, height: "100px", ease: Back.easeOut}, "primero")`;

        case "css":
            // Genera una cadena de texto en formato CSS para estilizar un elemento
            return `
        .${x} {
            top: 0px;
            left: 0px;
            text-align: center;
            position: absolute;
            /* z-index: 0; */
        }`;

        case "html":
            // Genera una cadena de texto en formato HTML para representar un elemento
            return `<div class="${x}"><img src="./assets/${className}" alt=""></div>`;

        case "img":
            // Genera una cadena de texto en formato HTML para representar una imagen dentro de una tabla
            return `                        
    <tr>
        <td>
            <img
                style="
                    width: 100%;
                    max-width: 600px;
                    display: block;
                "
                src="./assets/${className}"
                alt="${x}"
            />
        </td>
    </tr>`;

        case "img-a":
            // Genera una cadena de texto en formato HTML para representar una imagen dentro de una tabla con un enlace
            return `                        
    <tr>
        <td>
            <a
                href="${className}"
                target="_blank"
            >
                <img
                    style="
                        width: 100%;
                        max-width: 600px;
                        display: block;
                    "
                    src="./assets/${className}"
                    alt="${x}"
                />
            </a>
        </td>
    </tr>`;

        default:
            return ""; // Si el tipo de marcado no coincide con ninguna opción, devuelve una cadena vacía
    }
};

/**
 * executes all the logic to create the html structure with its style and base script
 * @param {string} list
 */
const createHtmlBannersFiles = (list) => {
    // leer plantilla
    const baseHtml = fs.readFileSync("./template/indexbanner.html", "utf8"); // Lee el contenido del archivo 'index.html' de la carpeta 'template'
    const baseJs = fs.readFileSync("./template/index.js", "utf8"); // Lee el contenido del archivo 'index.js' de la carpeta 'template'

    // crear html por cada folderLocation
    list.forEach((element) => {
        const { width, height, name } = getbannerData(element); // Obtiene el ancho, alto y nombre del banner a partir del título de la carpeta

        const assetFolder = `${folderLocation}/${element}/assets`; // Ruta de la carpeta de activos del banner
        const newAssetPath = `../build/${element}`; // Ruta de la carpeta de activos en la carpeta de salida
        const bannerAssets = fs.existsSync(assetFolder)
            ? getFileList(assetFolder)
            : []; // Obtiene la lista de activos del banner (imágenes) si la carpeta existe, de lo contrario, es un array vacío

        // Verificar si el archivo existe y moverlo
        if (fs.existsSync(assetFolder)) {
            // Verifica si la carpeta de activos existe
            const nuevaRutaCarpetaAssets = path.join(newAssetPath, "assets"); // Genera la ruta completa de la carpeta de activos en la carpeta de salida
            fs.mkdirSync(nuevaRutaCarpetaAssets); // Crea la carpeta 'assets' en el directorio de salida

            const archivosAssets = getFileList(assetFolder); // Obtiene la lista de archivos de la carpeta de activos
            archivosAssets.forEach((archivo) => {
                const rutaArchivoOrigen = path.join(assetFolder, archivo); // Genera la ruta completa del archivo de origen
                const rutaArchivoDestino = path.join(
                    nuevaRutaCarpetaAssets,
                    archivo
                ); // Genera la ruta completa del archivo de destino en la carpeta de salida
                fs.copyFileSync(rutaArchivoOrigen, rutaArchivoDestino); // Copia el archivo de origen al destino
            });
        } else {
            console.log("La carpeta de activos no existe"); // Muestra un mensaje de que la carpeta de activos no existe en la consola
        }

        const bannerMarkup = bannerAssets
            .map((element) => elementMarkup(element))
            .join("\n"); // Genera el marcado HTML de los elementos del banner
        const codeMarkup = bannerAssets
            .map((element) => elementMarkup(element, "js"))
            .join("\n"); // Genera el marcado JS de los elementos del banner
        const styleMarkup = bannerAssets
            .map((element) => elementMarkup(element, "css"))
            .join("\n"); // Genera el marcado CSS de los elementos del banner

        const bannerBackground = "#00809a"; // Color de fondo del banner
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
        `; // Estilos CSS para el banner

        // replace tags in html for content
        const html = baseHtml
            .replace("__WIDTH__", width)
            .replace("__NOMBRE__", name)
            .replace("__HEIGHT__", height)
            .replace("__BANNER__", bannerMarkup)
            .replace("/*__STYLES__*/", bannerStyles); // Reemplaza las etiquetas en el HTML base por el contenido generado

        fs.writeFileSync(
            `${outPutFolder}/${element}/${name}.html`,
            html,
            "utf8"
        ); // Guarda el contenido HTML generado en el archivo correspondiente

        // replace tags in js for content
        const contetJs = baseJs.replace("__CODE__", codeMarkup); // Reemplaza las etiquetas en el JS base por el contenido generado

        fs.writeFileSync(
            `${outPutFolder}/${element}/index.js`,
            contetJs,
            "utf8"
        ); // Guarda el contenido JS generado en el archivo correspondiente

        console.log(`${element}/${name}.html created successfully!`); // Muestra un mensaje de éxito en la consola
    });
};

/**
 * executes all the logic to create the html structure with its style and base script
 * @param {string} list
 */
const createHtmlEmailsFiles = (list) => {
    // leer plantilla
    const baseHtml = fs.readFileSync("./template/indexEmail.html", "utf8");

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
            });
        } else {
            console.log("La carpeta de activos no existe");
        }

        const bannerMarkup = bannerAssets
            .map((element) => elementMarkup(element))
            .join("\n");

        // replace tags in html for content
        const html = baseHtml.replace("__CONTENTEMAIL__", bannerMarkup);

        fs.writeFileSync(
            `${outPutFolder}/${element}/${name}.html`,
            html,
            "utf8"
        );
    });
};

/**
 * starts the execution of the script
 */
const startProcess = () => {
    const fileList = getFileList(folderLocation); // Obtiene la lista de archivos y carpetas dentro de la carpeta proporcionada
    createBaseFolders(fileList); // Crea las carpetas de salida necesarias
    let fileListEmails = [];
    let fileListBanners = [];

    fileList.forEach((element) => {
        if (element.includes("__email")) {
            fileListEmails.push(element); // Inyectar el elemento en fileListEmails
        } else {
            fileListBanners.push(element); // Inyectar el elemento en fileListBanners
        }
    });

    createHtmlBannersFiles(fileListBanners); // Crea los archivos HTML y JS para cada banner
    createHtmlEmailsFiles(fileListEmails); // Crea los archivos HTML y JS para cada email
    console.log(fileListEmails);
    console.log(fileListBanners);
};

startProcess(); // Inicia la ejecución del script
