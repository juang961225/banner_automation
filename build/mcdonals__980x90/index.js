console.log("i'm here");

var tl;
$(document).ready(function () {
    tl = new TimelineMax();

    // Frame 1
    tl.from(".bg_mc_biggood", 3, {	x: 40, height:"100px", ease: Back.easeOut}, "primero")
.from(".big_good_logo", 3, {	x: 40, height:"100px", ease: Back.easeOut}, "primero")
.from(".cta", 3, {	x: 40, height:"100px", ease: Back.easeOut}, "primero")
.from(".cta_2", 3, {	x: 40, height:"100px", ease: Back.easeOut}, "primero")
.from(".disclaimer_legal", 3, {	x: 40, height:"100px", ease: Back.easeOut}, "primero")
.from(".mc_logo", 3, {	x: 40, height:"100px", ease: Back.easeOut}, "primero")
.from(".titular_1", 3, {	x: 40, height:"100px", ease: Back.easeOut}, "primero")
.from(".titular_2", 3, {	x: 40, height:"100px", ease: Back.easeOut}, "primero");
});
