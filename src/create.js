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
const { getFileList, prepareEnvironment, copyAssets } = require("./utils");
const { markups } = require("./markups");

// instances
const fs = require("fs"); // Módulo 'fs' para interactuar con el sistema de archivos
const path = require("path"); // Módulo 'path' para trabajar con rutas de archivos y directorios

// constants
const folderLocation = "../banners__aCrear"; // Ruta de la carpeta donde se encuentran los banners a crear
const outPutFolder = "../build"; // Ruta de la carpeta de salida donde se generarán los banners
const emailOptions = {
    "BB--": "indexEmailBB.html",
    "CL--": "indexEmailCL.html",
    "EL--": "indexEmailEL.html",
    "JM--": "indexEmailJM.html",
    "MC--": "indexEmailMC.html",
};

/**
 * checks if string includes "__email"
 * @param {str} name 
 * @returns boolean
 */
const isEmail = (name) => name.includes("__email");

/**
 * this function prepares the folder and performs
 *  the banner creation process for each of the folders
 *  that you have.
 * @param {Array} list
 */
const createBaseFolders = (list) => {
    prepareEnvironment(outPutFolder); // Prepara el entorno eliminando el contenido de la carpeta de salida si existe y creándola nuevamente
    list.forEach((element) => {
        const folderPath = path.join(__dirname, outPutFolder, element); // Genera la ruta completa de la carpeta de salida para cada elemento
        fs.mkdirSync(folderPath); // Crea la carpeta de salida para cada elemento
        if (!isEmail(element)) {
            fs.writeFileSync(path.join(folderPath, "index.js"), ""); // Crea un archivo vacío llamado 'index.js' en la carpeta creada
        }
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
const elementMarkup = (fileName, type = "bannerHtml") => {
    const [name, special] = fileName.split("."); // Obtiene el nombre base del archivo eliminando la extensión

    return markups[special === 'link' ? 'emailHtmlLink' : type](name, fileName);
};


/**
 * executes all the logic to create the html structure with its style and base script
 * @param {string} list
 */
const createHtmlFiles = (list) => {

    // leer plantilla
    const baseBannerHtml = fs.readFileSync(
        "./template/indexbanner.html",
        "utf8"
    ); // Lee el contenido del archivo 'index.html' de la carpeta 'template'

    let baseEmailHtml = fs.readFileSync(`./template/indexEmail.html`, "utf8");
    const baseJs = fs.readFileSync("./template/index.js", "utf8"); // Lee el contenido del archivo 'index.js' de la carpeta 'template'

    // crear html por cada folderLocation
    list.forEach((element) => {
        let baseHtml = isEmail(element) ? baseEmailHtml : baseBannerHtml;

        if (isEmail(element)) {
            const option = Object.keys(emailOptions).find((key) => element.includes(key));
            if (option) {
                const fileName = emailOptions[option];
                baseHtml = fs.readFileSync(`./template/${fileName}`, "utf8");
            }
        }
        const { width, height, name } = getbannerData(element); // Obtiene el ancho, alto y nombre del banner a partir del título de la carpeta

        const assetsDestination = isEmail(element)
            ? path.join(`../build/${element}`, "img")
            : path.join(`../build/${element}`, "assets");
        const assetFolder = isEmail(element)
            ? `${folderLocation}/${element}/img`
            : `${folderLocation}/${element}/assets`;
        // Ruta de la carpeta de activos del banner
        const bannerAssets = fs.existsSync(assetFolder)
            ? getFileList(assetFolder)
            : []; // Obtiene la lista de activos del banner (imágenes) si la carpeta existe, de lo contrario, es un array vacío

        copyAssets(assetFolder, assetsDestination);

        let html = "";

        if (isEmail(element)) {
            const bannerMarkup = bannerAssets
                .map((element) => elementMarkup(element, "emailHtml"))
                .join("\n");

            // replace tags in html for content
            html = baseHtml.replace("__CONTENTEMAIL__", bannerMarkup);
        } else {
            const bannerMarkup = bannerAssets
                .map((element) => elementMarkup(element))
                .join("\n"); // Genera el marcado HTML de los elementos del banner
            const codeMarkup = bannerAssets
                .map((element) => elementMarkup(element, "jsAnimation"))
                .join("\n"); // Genera el marcado JS de los elementos del banner
            const styleMarkup = bannerAssets
                .map((element) => elementMarkup(element, "cssNode"))
                .join("\n"); // Genera el marcado CSS de los elementos del banner

            const bannerBackground = "#00809a"; // Color de fondo del banner
            const baseStyles = fs.readFileSync(
                "./template/bannerStyles.css",
                "utf8"
            ); //; // Estilos CSS para el banner

            // replace tags in html for content
            const bannerStyles = baseStyles
                .replace("__WIDTH__", width)
                .replace("__HEIGHT__", height)
                .replace("__stylesMarkup__", styleMarkup)
                .replace("__BG__", bannerBackground); // Reemplaza las etiquetas en el HTML base por el contenido generado

            // replace tags in html for content
            html = baseHtml
                .replace("__NOMBRE__", name)
                .replace("__WIDTH__", width)
                .replace("__HEIGHT__", height)
                .replace("__BANNER__", bannerMarkup)
                .replace("/*__STYLES__*/", bannerStyles); // Reemplaza las etiquetas en el HTML base por el contenido generado

            // replace tags in js for content
            const contetJs = baseJs.replace("__CODE__", codeMarkup); // Reemplaza las etiquetas en el JS base por el contenido generado

            fs.writeFileSync(
                `${outPutFolder}/${element}/index.js`,
                contetJs,
                "utf8"
            ); // Guarda el contenido JS generado en el archivo correspondiente
        }

        fs.writeFileSync(
            `${outPutFolder}/${element}/${name}.html`,
            html,
            "utf8"
        ); // Guarda el contenido HTML generado en el archivo correspondiente

        console.log(`${element}/${name}.html created successfully!`); // Muestra un mensaje de éxito en la consola
    });
};


/**
 * starts the execution of the script
 */
const startProcess = () => {
    const fileList = getFileList(folderLocation); // Obtiene la lista de archivos y carpetas dentro de la carpeta proporcionada
    createBaseFolders(fileList); // Crea las carpetas de salida necesarias
    createHtmlFiles(fileList);
};

startProcess(); // Inicia la ejecución del script
