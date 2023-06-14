exports.markups = {
    jsAnimation:(name) => `.from(".${name}", 3, { x: 40, height: "100px", ease: Back.easeOut}, "primero")`,
    cssNode:(name) => `
    .${name} {
        top: 0px;
        left: 0px;
        text-align: center;
        position: absolute;
        /* z-index: 0; */
    }`,
    bannerHtml:(name, fileName) => `<div class="${name}"><img src="./assets/${fileName}" alt=""></div>`,
    emailHtml:(name, fileName) => `                        
    <tr>
        <td>
            <img
                style="
                    width: 100%;
                    max-width: 600px;
                    display: block;
                "
                src="./assets/${fileName}"
                alt="${name}"
            />
        </td>
    </tr>`,
    emailHtmlLink:(name, fileName) =>  `                        
    <tr>
        <td>
            <a
                href="__link__"
                target="_blank"
            >
                <img
                    style="
                        width: 100%;
                        max-width: 600px;
                        display: block;
                    "
                    src="./assets/${fileName}"
                    alt="${name}"
                />
            </a>
        </td>
    </tr>`,
}