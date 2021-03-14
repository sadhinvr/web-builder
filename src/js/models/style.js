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
    display: '',
    margin: '',
    width: '',
    minWidth: '',
    maxWidth: '',
    height: '',
    minHeight: '',
    maxHeight: '',
    objectFit: ''
};

const suffixArr = ['px', 'vh', 'vw', '%', 'rem', 'em'];
const regexSuffix = new RegExp(/(px)|(vh)|(vw)|(%)|(rem)|(em)|(deg)+/, 'g');
const removeNum = new RegExp(/(\d)|(-)+/, 'g');

//style sheet 
const sheet = idocument.getElementById('main_style').sheet;
sheet.insertRule(':root{}', 0);
sheet.insertRule('@media all {*{box-sizing:border-box;} .named{width:20vh ;min-width:150px;}}', 1);
sheet.insertRule('@media (max-width:991px){body{color:#333;}}', 2);
sheet.insertRule('@media (max-width:767px){}', 3);
sheet.insertRule('@media (max-width:479px){}', 4);

sheet.cssRules[1].__sad_style = 'main';
sheet.cssRules[2].__sad_style = 'medium';
sheet.cssRules[3].__sad_style = 'small';
sheet.cssRules[4].__sad_style = 'tiny';

let sheetNum = 1;



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
        if (s[5]) {
            cur.addEventListener('focus', e => {
                if (active) {
                    document.addEventListener('keydown', arrow);
                }

            })
            cur.addEventListener('blur', e => {
                if (active) {
                    document.removeEventListener('keydown', arrow);
                }
                e.target.value = e.target.value.replace(/([a-z])+/gi, '');
            })
        }
    }

    //drag
    if (s[3] == true) {
        cur.addEventListener('mousedown', mousedown);
    }

})

function arrow(e) {
    const s = e.target.dataset.style.split(' ')

    if (e.keyCode == '38') {
        // up arrow
        let v = parseFloat(e.target.value.replace(regexSuffix, ''));
        e.target.value == '' ? v = -1 : 0;
        setStyle(s[4], (v + 1) + s[5].replace(removeNum, ''));
        e.target.value = v + 1;

    } else if (e.keyCode == '40') {
        // down arrow
        let v = parseFloat(e.target.value.replace(regexSuffix, ''));
        e.target.value == '' ? v = -1 : 0;
        if (s[5].includes('-')) {
            setStyle(s[4], (v - 1) + s[5].replace(removeNum, ''));
            e.target.value = v - 1;
        } else if (v > 0) {
            setStyle(s[4], (v - 1) + s[5].replace(removeNum, ''));
            e.target.value = v - 1;
        }

    } else if (e.keyCode == '13') {
        //e.target.value = e.target.value.replace(/([a-z])+/gi, '');
        e.target.blur();
    }

    getSuffix(s, e.target.value, e.target);
}




function click(e) {
    if (active) {
        const s = e.target.dataset.style.split(' ');
        if (e.target.classList && e.target.classList.contains('active_style')) {
            resetActiveStyle(e.target)
            setStyle(s[4], '');
            e.target.classList.remove('active_style');
        } else {
            resetActiveStyle(e.target);
            setStyle(s[4], s[5]);
            e.target.classList.add('active_style');

            const flexMore = $('.flex--more');
            const gridMore = $('.grid--more');
            if (s[5] == 'flex') {
                flexMore.parentElement.style.display = 'flex';
                flexMore.style.display = 'block';
                gridMore.style.display = 'none';
            } else if (s[5] == 'grid') {
                flexMore.parentElement.style.display = 'flex';
                gridMore.style.display = 'block';
                flexMore.style.display = 'none';
            } else {
                flexMore.style.display = 'none';
                gridMore.style.display = 'none';
                flexMore.parentElement.style.display = 'none';
            }
        }
    }
}

function input(e) {
    if (active) {
        const s = e.target.dataset.style.split(' ');
        const suffix = getSuffix(s, e.target.value, e.target);
        console.log(e.target.value != '', suffix)
        if (e.target.value != '' && suffix) {
            setStyle(s[4], e.target.value.replace(regexSuffix, '') + suffix)
        } else if (e.target.value != '' && suffix == undefined) {
            console.log(s[4], e.target.value)
            setStyle(s[4], e.target.value);
        } else {
            console.log('remove')
            setStyle(s[4], '');
        };
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
        // console.log(cssom);
    } else {
        if (!active.className) {
            active.classList.add(`${active.tagName}${Math.floor(Math.random()*1000)}`)
        }
        sheet.cssRules[sheetNum].insertRule(`.${active.className}{}`, 1);
        findSelector(active.className).style[s] = p;
    }
}


function getStyle() {
    //intial
    for (const cur in style) {
        style[cur] = '';
    }
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
        }

        //dblclick
        if (s[1] == true) {

        }

        //input
        if (s[2] == true) {
            if (style[s[4]] && ele.tagName == 'SELECT') {
                ele.value = style[s[4]];
            }else if(ele.tagName != 'SELECT'){
                const suffix = getSuffix(s, style[s[4]], ele);
                ele.value = style[s[4]].replace(suffix, '');
            }else if(ele.tagName == 'SELECT'){
                ele.value = ele.querySelector('option').value;
            }
            
        }

        //drag
        if (s[3] == true) {

        }
    })

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


function getSuffix(s, p, e) {
    if (s[5] != undefined) {
        let a;
        e.style.borderColor = '';
        e.style.color = '';


        if (p != '') {
            const ptext = p.replace(removeNum, '');
            // console.log('inside')

            a = suffixArr.find(ele => ele == ptext);

            if (a != undefined) {
                e.value = e.value.replace(ptext, '')

            } else if (ptext.length == 0 && a == undefined) {
                //nothing
                a = s[5].replace(removeNum, '');
                e.style.borderColor = '';
                e.style.color = '';
            } else if (ptext.length > 0 && a == undefined) {
                //err
                a = s[5].replace(removeNum, '');
                e.style.borderColor = '#e04f4f';
                e.style.color = '#e04f4f';
            } else {
                a = s[5].replace(removeNum, '')
            }
        } else {
            if (s[5] != 'deg') {
                a = 'px';
            } else {
                a = s[5].replace(removeNum, '');
            }
        }


        setSuffix(s, a, e);
        return a;
    }

}

function setSuffix(s, v, e) {
    let b = '';
    s.forEach((cur, i) => {
        if (i == 5) {
            if (s.length - 1 == i) {
                b += s[5].replace(regexSuffix, v)
            } else {
                b += s[5].replace(regexSuffix, v) + ' ';
            };
        } else {

            if (s.length - 1 == i) {
                b += cur;
            } else {
                b += cur + ' '
            };
        }
    })
    // console.log(b);
    e.nextSibling.nextSibling.innerHTML = v;
    // console.log(e.nextSibling.nextSibling)
    e.dataset.style = b;
}


export {
    getStyle
};



//  data-style="{[ 0 click] [ 1 dblclick] [ 2 input] [ 3 drag]} {[ 4 style] [ 5 value]}"