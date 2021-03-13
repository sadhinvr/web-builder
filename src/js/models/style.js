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
    minWidth: '',
    maxWidth: '',
    height: '',
    minHeight: '',
    maxHeight: '',
};

const styleEle = {
    tagName: $('#tagName'),
    className: $('#className'),
};

//style sheet 
const sheet = idocument.getElementById('main_style').sheet;
sheet.insertRule(':root{}', 0);
sheet.insertRule('@media all {*{box-sizing:border-box;} .named{width:200px ;min-width:150px;}}', 1);
sheet.insertRule('@media (max-width:991px){body{color:#333;}}', 2);
sheet.insertRule('@media (max-width:767px){}', 3);
sheet.insertRule('@media (max-width:479px){}', 4);

sheet.cssRules[1].__sad_style = 'main';
sheet.cssRules[2].__sad_style = 'medium';
sheet.cssRules[3].__sad_style = 'small';
sheet.cssRules[4].__sad_style = 'tiny';

let sheetNum = 1;

console.log(sheet)


//eventListener
$('[data-style]', true).forEach(cur => {
    const s = cur.dataset.style.split(' ');

    //click
    if (s[0] == true) {
        cur.addEventListener('click', click);
    }

    //dblclick
    if (s[1] == true) {
        cur.addEventListener('dblclick', dblClick);
    }

    //input
    if (s[2] == true) {
        cur.addEventListener('input', input);
    }

    //drag
    if (s[3] == true) {
        cur.addEventListener('mousedown', mousedown);
    }

})

function click(e) {
    if (active) {
        const s = e.target.dataset.style.split(' ');
        if (e.target.classList && e.target.classList.contains('active_style')) {
            resetActiveStyle(e.target)
            setStyle(s[4], '');
            e.target.classList.remove('active_style');
        } else {
            resetActiveStyle(e.target)
            setStyle(s[4], s[5]);
            e.target.classList.add('active_style');
        }
    }
}

function input(e) {
    if (active) {
        const s = e.target.dataset.style.split(' ');
        setStyle(s[4],e.target.value)
    }
}


function findSelector(t) {
    let selector;
    for (let i = 0; i < sheet.cssRules[sheetNum].cssRules.length; i++) {
        if (sheet.cssRules[sheetNum].cssRules[i].selectorText === '.' + t) {

            selector = sheet.cssRules[sheetNum].cssRules[i];
            break;
        } else {
            selector = false;
        }
    }

    return selector;
}

function setStyle(s, p) {
    const cssom = findSelector(active.className);
    if (cssom) {
        cssom.style[s] = p;
    } else {
        if (!active.className) {
            active.classList.add(`${active.tagName}${Math.floor(Math.random()*1000)}`)
        }
        sheet.cssRules[sheetNum].insertRule(`.${active.className}{${s}:${p}}`, 1)
    }
}


function getStyle() {
    // intial
    resetActiveStyle();
    const cssom = findSelector(active.className);

    $('#tagName').innerText = active.tagName + ' ';
    $('#className').innerText = active.className ? active.className + ' ' : '-';
    $('#countEle').parentElement.style.display = 'none';


    if (active.className) {
        $('#countEle').innerText = $('.' + active.className, true, true).length;
        $('#countEle').parentElement.style.display = '';


        if (cssom) {
            // console.log(sheet.cssRules[1].cssRules[i].style.cssText)
            for (const cur in style) {
                style[cur] = cssom.style[cur];
            }
        }


    }
    viewStyle();

}

function viewStyle() {

    $('[data-style]', true).forEach(ele => {
        const s = ele.dataset.style.split(' ');

        //click
        if (s[0] == true && style[s[4]] === s[5]) {
            ele.classList.add('active_style');
        } else {

        }

        //dblclick
        if (s[1] == true) {

        }

        //input
        if (s[2] == true) {

        }

        //drag
        if (s[3] == true) {

        }
    })

    for (const cur in style) {
        style[cur] = ''
    }
}


function resetActiveStyle(e) {
    if (e) {
        try {
            $(`.${e.parentElement.className} .active_style`).classList.remove('active_style')
        } catch (err) {
            // console.log(err)
        }
    } else {
        try {
            $(`.active_style`, true).forEach(cur => {
                cur.classList.remove('active_style');
            })
        } catch (err) {
            // console.log(err)
        }
    }
}





export {
    getStyle
};



//  data-style="{[ 0 click] [ 1 dblclick] [ 2 input] [ 3 drag]} {[ 4 style] [ 5 value]}"