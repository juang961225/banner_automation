const fs = require('fs');
const path = require('path');
const jsonContent = {
    "content_blocks": [
        "{{content_blocks.${ES_BB_cabecera_logo_UTM}}}",
        "{{content_blocks.${ES_BB_cabecera_logo_FSS_UTM}}}",
        "{{content_blocks.${ES_BB_cabecera_club_ON_UTM}}}",
        "{{content_blocks.${ES_BB_footer_menu_ON}}}",
        "{{content_blocks.${ES_BB_footer_RRSS_ON}}}",
        "{{content_blocks.${ES_BB_footer_descubrela_negro_FSS_UTM}}}",
        "{{content_blocks.${ES_BB_footer_descubrelas_negro_FSS_UTM}}}",
        "{{content_blocks.${ES_BB_footer_consiguelo_negro_FSS_UTM}}}",
        "{{content_blocks.${ES_BB_footer_consiguela_negro_FSS_UTM}}}",
        "{{content_blocks.${ES_BB_footer_consiguelos_negro_FSS_UTM}}}",
        "{{content_blocks.${ES_BB_footer_disfrutalo_negro_FSS_UTM}}}",
        "{{content_blocks.${ES_BB_footer_pruebala_negro_FSS_UTM}}}",
        "{{content_blocks.${ES_BB_footer_pruebalo_negro_FSS_UTM}}}",
        "{{content_blocks.${ES_BB_footer_pruebalos_negro_FSS}}}",
        "{{content_blocks.${ES_BB_footer_visitanos_negro_FSS_UTM}}}",
        "{{content_blocks.${ES_BB_footer_descubrelo_FSS_UTM}}}",
        "{{content_blocks.${ES_BB_footer_pruebalo_FSS_UTM}}}",
        "{{content_blocks.${ES_BB_footer_visitanos_FSS_UTM}}}",
        "{{content_blocks.${ES_BB_footer_descubrelos_negro_FSS_UTM}}}",
        "{{content_blocks.${ES_BB_footer_descubrelo_negro_FSS_UTM}}}",
        "{{content_blocks.${ES_BB_footer_visitanos_FSS}}}",
        "{{content_blocks.${ES_BB_footer_RRSS_FSS}}}",
        "{{content_blocks.${ES_BB_VOAB_POSTCONSULTATION}}}",
        "{{content_blocks.${ES_BB_VOAB_REMINDER}}}",
        "{{content_blocks.${ES_BB_VOAB_MODIFICATION}}}",
        "{{content_blocks.${ES_BB_VOAB_CANCELLATION}}}",
        "{{content_blocks.${ES_BB_VOAB_CONFIRMATION}}}",
        "{{content_blocks.${ES_BB_OAB_NO_SHOW}}}",
        "{{content_blocks.${ES_BB_OAB_CANCELLATION}}}",
        "{{content_blocks.${ES_BB_OAB_REMINDER}}}",
        "{{content_blocks.${ES_BB_OAB_MODIFICATION}}}",
        "{{content_blocks.${ES_BB_OAB_CONFIRMATION}}}",
        "{{content_blocks.${ES_BB_OAB_THANK_YOU}}}",
        "{{content_blocks.${ES_BB_VOAB_THANK_YOU}}}",
        "{{content_blocks.${ES_BB_VOAB_NO_SHOW}}}",
        "{{content_blocks.${ES_BB_OAB_ARTIST_CANCELLATION}}}",
        "{{content_blocks.${ES_BB_VOAB_ARTIST_CANCELLATION}}}",
        "{{content_blocks.${BB_FOOTER_TRIGGER_VOAB_2}}}",
        "{{content_blocks.${BB_FOOTER_TRIGGER_VOAB}}}",
        "{{content_blocks.${BB_FOOTER_TRIGGER_OAB}}}",
        "{{content_blocks.${ES_BB_FOOTER_ON_legal_OK_v5}}}",
        "{{content_blocks.${ES_BB_FOOTER_ON_legal_OK_v4}}}",
        "{{content_blocks.${ES_BB_FOOTER_ON_legal_OK_v3}}}",
        "{{content_blocks.${ES_BB_FOOTER_ON_legal_OK_v2}}}",
        "{{content_blocks.${ES_BB_FOOTER_ON_RRSS_OK_v4}}}",
        "{{content_blocks.${ES_BB_FOOTER_ON_RRSS_OK_v2}}}",
        "{{content_blocks.${ES_BB_FOOTER_ON_RRSS_OK}}}",
        "{{content_blocks.${ES_BB_FOOTER_ON_legal_OK}}}",
        "{{content_blocks.${ES_BB_FOOTER_ON_v2}}}",
        "{{content_blocks.${ES_BB_FOOTER_ON_legal}}}",
        "{{content_blocks.${ES_BB_FOOTER_ON_RRSS}}}",
        "{{content_blocks.${ES_BB_FOOTER_ON}}}",
        "{{content_blocks.${TEST_ES_BB_footer_ON}}}",
        "{{content_blocks.${TEST_ES_BB_logo_cabecera_ON_3}}}",
        "{{content_blocks.${Copy_of_ES_BB_logo_cabecera_ON_3}}}",
        "{{content_blocks.${ES_BB_logo_cabecera_ON_3}}}",
        "{{content_blocks.${ES_BB_redessociales}}}",
        "{{content_blocks.${ES_BB_modulopromo_ON}}}",
        "{{content_blocks.${ES_BB_modulo_preheader_ON}}}",
        "{{content_blocks.${ES_BB_footer_ON}}}",
        "{{content_blocks.${ES_BB_logo_cabecera_FSS}}}",
        "{{content_blocks.${ES_BB_logo_cabecera_ON}}}",
        "{{content_blocks.${SMS-Footer-Short}}}",
        "{{content_blocks.${BB_FOOTER__LOYALTY_TRIGGER}}}",
        "{{content_blocks.${BB_FOOTER_TRIGGER}}}",
        "{{content_blocks.${BB_FOOTER_LOYALTY_ANIVERSARY_TRIGGER}}}",
        "{{content_blocks.${Replenishment_SKUs}}}",
        "{{content_blocks.${SMS-Footer}}}",
        "{{content_blocks.${bobbi_brown_product_catalogue}}}",
        "{{content_blocks.${ES_BB_calendarioevento1}}}",
        "{{content_blocks.${BB_HEADER_TRIGGER}}}"
    ]
};

const createBuildFolder = () => {
    const buildFolderPath = path.join(__dirname, 'build');
    if (!fs.existsSync(buildFolderPath)) {
        fs.mkdirSync(buildFolderPath);
    }
};

const sanitizeFileName = (fileName) => {
    return fileName.replace(/[\\/:"*?<>|]/g, '-'); // Replace invalid characters with '-'
};

const createEmptyFiles = () => {
    const buildFolderPath = path.join(__dirname, 'build');

    jsonContent.content_blocks.forEach((contentBlock, index) => {
        const fileNameRegex = /\${([^}]+)}/;
        const fileNameMatch = contentBlock.match(fileNameRegex);

        if (fileNameMatch && fileNameMatch[1].includes("BB")) {
            const fileName = sanitizeFileName(fileNameMatch[1]) + '.js';
            const filePath = path.join(buildFolderPath, fileName);
            fs.writeFileSync(filePath, '', 'utf-8');
        } else {
            console.log(`No se encontró un nombre de archivo válido para el elemento ${index}.`);
        }
    });
};

createBuildFolder();
createEmptyFiles();