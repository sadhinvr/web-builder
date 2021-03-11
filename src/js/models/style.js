import {
    $
} from "../reuse";
import {
    active
} from "./drag";
import {
    idocument
} from "./iframe";

const style = {
    // id: '',
    display: '',
    margin: '',
    width: '',
    'min-width': '',
    'max-width': '',
    height: '',
    'min-height': '',
    'max-height': '',
};

const styleEle = {
    tagName: $('#tagName'),
    className: $('#className'),
};








const sheet = idocument.getElementById('main_style').sheet;
sheet.insertRule(':root{}', 0);
sheet.insertRule('@media all {*{box-sizing:border-box;} .named{width:200px}}', 1);
sheet.insertRule('@media (max-width:991px){body{color:#333;}}', 2);
sheet.insertRule('@media (max-width:767px){}', 3);
sheet.insertRule('@media (max-width:479px){}', 4);

sheet.cssRules[1].__sad_style = 'main';
sheet.cssRules[2].__sad_style = 'medium';
sheet.cssRules[3].__sad_style = 'small';
sheet.cssRules[4].__sad_style = 'tiny';

console.log(sheet)

// sheet.insertRule('@media (max-width:480){}',5);

$('input', true).forEach(cur => {
    cur.addEventListener('input', inputValue)
});


function inputValue(e) {
    if (active) { // console.log(e.target.value)
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
                    if (sheet.cssRules[0].style.cssText.includes(e.target.name)) {
                        const regex = new RegExp(`${e.target.name}(.|\n)*?;`, 'g');
                        sheet.cssRules[0].style.cssText = sheet.cssRules[0].style.cssText.replace(regex, property + ';');
                        // console.log(sheet.cssRules[0].style.cssText.replace(regex,property+';'))
                    } else {
                        sheet.cssRules[0].style.cssText += property;
                    }
                } else {
                    sheet.insertRule(`${selector}{${property}}`)
                }
            }
        }
    }
}

function getStyle(active) {

    // intial
    $('#tagName').innerText = active.tagName + ' ';
    $('#className').innerText = active.className ? active.className + ' ' : '-';
    $('#countEle').parentElement.style.display= 'none';


    if (active.className) {
        $('#countEle').innerText = $('.' + active.className, true, true).length;
        $('#countEle').parentElement.style.display= '';

        // console.log($('.'+active.className, true,true))
        // active.classList.forEach(cls=>{

        for (let i = 0; i < sheet.cssRules[1].cssRules.length; i++) {

            if (sheet.cssRules[1].cssRules[i].selectorText.includes('.' + active.className)) {
                // console.log(sheet.cssRules[1].cssRules[i].style.cssText)
                for (const cur in style) {

                    style[cur] = sheet.cssRules[1].cssRules[i].style[cur];
                }
                break;

            }
            // console.log(sheet.cssRules[1].cssRules[i].selectorText.includes('.' + active.className))
        }

        // })
    }

    viewStyle()


}

function viewStyle() {
    $('input[data-style]', true).forEach(ele => {
        ele.value = style[ele.dataset.style]
    })
    for (const cur in style) {
        style[cur] = ''
    }
}



export {
    getStyle
};