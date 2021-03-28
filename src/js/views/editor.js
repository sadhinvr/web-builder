import {
    $
} from '../reuse';

// ########  top  ########

// code viewer
// var texta=document.getElementById("html");
// texta.value=`<html></html>`;
// var mixedMode = {
//     name: "htmlmixed",
// };
// var editor = CodeMirror.fromTextArea(texta, {
//     mode: mixedMode,
//     selectionPointer: true,
//     theme: 'material-palenight',
// });



// ########  left  ########

// left menu 
const right_menu = $('.left .right_menu');
$('.left_menu div[data-open]', true).forEach(cur => {
    cur.addEventListener('click', rightMenu);
});

function rightMenu(e) {
    right_menu.style.display != '' ? right_menu.style.display = '' : right_menu.style.display = 'none';
    const o = $('.' + e.currentTarget.dataset.open).style;
    o.display != '' ? o.display = '' : o.display = 'none';
}