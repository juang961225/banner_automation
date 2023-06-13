console.log("i'm here");

var tl;
$(document).ready(function () {
    tl = new TimelineMax();

    // Frame 1
    tl.from(".bg_mc", 3, { x: 40, height: "100px", ease: Back.easeOut}, "primero")
.from(".text_1", 3, { x: 40, height: "100px", ease: Back.easeOut}, "primero")
.from(".text_2", 3, { x: 40, height: "100px", ease: Back.easeOut}, "primero")
.from(".Verano", 3, { x: 40, height: "100px", ease: Back.easeOut}, "primero");
});
