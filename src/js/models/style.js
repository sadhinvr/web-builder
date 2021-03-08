import {
    $
} from "../reuse";
import {
    active
} from "./drag";
import {
    idocument
} from "./iframe";

const sheet = idocument.getElementById('main_style').sheet;

$('input', true).forEach(cur => {
    cur.addEventListener('input', inputValue)
});

function inputValue(e) {
    if(active){// console.log(e.target.value)
    if (e.target.id === 'id') {
        active.className = e.target.value;
    } else {
        if (!active.className) {
            active.className = 'hello';
            $('#id').value = active.className;
        }

        if (active.className) {
            const selector = `.${active.className}`;
            const property = `${e.target.name}:${e.target.value+e.target.dataset.suffix}`;
            if (sheet.cssRules[0]) {
                if(sheet.cssRules[0].style.cssText.includes(e.target.name)){
                    const regex = new RegExp(`${e.target.name}(.|\n)*?;`,'g');
                    sheet.cssRules[0].style.cssText=sheet.cssRules[0].style.cssText.replace(regex,property+';');
                    // console.log(sheet.cssRules[0].style.cssText.replace(regex,property+';'))
                }else{
                    sheet.cssRules[0].style.cssText+=property;
                }
            } else {
                sheet.insertRule(`${selector}{${property}}`)
            }
        }
    }}
}

function activeStyle() {
    $('#id').value = active.className;
}

export {
    activeStyle
};