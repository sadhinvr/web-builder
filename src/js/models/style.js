import {
    $
} from "../reuse";
import {
    active
} from "./drag";
import {
    idocument
} from "./iframe";


let style = {};

const suffixArr = ['px', 'vh', 'vw', '%', 'rem', 'em'];
const regexSuffix = new RegExp(/(px)|(vh)|(vw)|(%)|(rem)|(em)|(deg)+/, 'g');
const removeNum = new RegExp(/(\d)|(-)+/, 'g');

//style sheet 
const sheet = idocument.getElementById('main_style').sheet;

if (window.localStorage.getItem('stylesheet')) {
    let storedData = JSON.parse(window.localStorage.getItem('stylesheet'));
    for (const cur in storedData) {
        sheet.insertRule(storedData[cur], cur);
    }
} else {
    sheet.insertRule(':root{}', 0);
    sheet.insertRule('@media all {*{box-sizing:border-box;} .named{width:20vh ;min-width:150px;}}', 1);
    sheet.insertRule('@media (max-width:991px){body{color:#333;}}', 2);
    sheet.insertRule('@media (max-width:767px){}', 3);
    sheet.insertRule('@media (max-width:479px){}', 4);
}



sheet.cssRules[1].__sad_style = 'main';
sheet.cssRules[2].__sad_style = 'medium';
sheet.cssRules[3].__sad_style = 'small';
sheet.cssRules[4].__sad_style = 'tiny';

let sheetNum = 1;

//local storage

function storeAllStyle() {
    let storeStyle = {};
    for (let i = 0; sheet.cssRules.length > i; i++) {
        storeStyle[i] = sheet.cssRules[i].cssText;
    }
    window.localStorage.setItem('stylesheet', JSON.stringify(storeStyle));
}

//eventListener
$('.reveal_tab_btn',true).forEach(cur=>{
    cur.addEventListener('click',tab);
})

$('.style .border>div',true).forEach(cur=>{
    cur.addEventListener('click',(e)=>{
        if(!active){return 0}
        $('.active_border')?$('.active_border').classList.remove('active_border'):0;
        e.currentTarget.classList.add('active_border'); 

        //border style
        $('.borderStyle',true).forEach(ele=>{
            let b='';
            const s=ele.dataset.style.split(' ');
            s.forEach((c, i) => {
                if(i != 4){
                    i != s.length -1? b+=c+' ':b+=c;
                }else{
                    i != s.length -1? b+='border'+e.currentTarget.dataset.border+'Style'+' ':b+='border'+e.currentTarget.dataset.border+'Style';
                }
            })

            ele.dataset.style =b;
        })

        //border width
        let b='';
        const bw=$('.borderWidth');
        const sw=bw.dataset.style.split(' ');
        sw.forEach((c, i) => {
            if(i != 4){
                i != sw.length -1? b+=c+' ':b+=c;
            }else{
                i != sw.length -1? b+='border'+e.currentTarget.dataset.border+'Width'+' ':b+='border'+e.currentTarget.dataset.border+'Width';
            }
        })
        bw.dataset.style=b;

        //border color
        b='';
        const bc=$('.borderColor');
        const sc=bc.dataset.style.split(' ');
        sc.forEach((c, i) => {
            if(i != 4){
                i != sc.length -1? b+=c+' ':b+=c;
            }else{
                i != sc.length -1? b+='border'+e.currentTarget.dataset.border+'Color'+' ':b+='border'+e.currentTarget.dataset.border+'Color';
            }
        })
        bc.dataset.style=b;

        getStyle();
    });
})

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
                e.currentTarget.value = e.currentTarget.value.replace(/([a-z])+/gi, '');
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
        let v = parseFloat(e.target.value.replace(regexSuffix, ''), e.target);
        e.target.value == '' ? v = -1 : 0;
        if (s[5].includes('-')) {
            setStyle(s[4], (v - 1) + s[5].replace(removeNum, ''));
            e.target.value = v - 1;
        } else if (v > 0) {
            setStyle(s[4], (v - 1) + s[5].replace(removeNum, ''));
            e.target.value = v - 1;
        }

    } else if (e.keyCode == '13') {
        //enter
        e.target.blur();
    }

    getSuffix(s, e.target.value, e.target);
}




function click(e) {
    if (active) {
        const s = e.currentTarget.dataset.style.split(' ');
        if (e.currentTarget.classList && e.currentTarget.classList.contains('active_style')) {
            resetActiveStyle(e.currentTarget)
            setStyle(s[4], '');
            e.currentTarget.classList.remove('active_style');
        } else {
            resetActiveStyle(e.currentTarget);
            setStyle(s[4], s[5]);
            e.currentTarget.classList.add('active_style');

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
        const s = e.currentTarget.dataset.style.split(' ');
        const suffix = getSuffix(s, e.currentTarget.value, e.currentTarget);
        if (e.currentTarget.value != '' && suffix) {
            setStyle(s[4], e.currentTarget.value.replace(regexSuffix, '') + suffix)
        } else if (e.currentTarget.value != '' && suffix == undefined) {
            setStyle(s[4], e.currentTarget.value);
        } else {
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

function setStyle(st, p) {

    const cssom = findSelector(active.className);
    if (cssom) {
        cssom.style[st] = p;
        // console.log(cssom);
        getStyle(false);
    } else {
        if (!active.className) {
            active.classList.add(`${active.tagName}${Math.floor(Math.random()*1000)}`)
        }
        sheet.cssRules[sheetNum].insertRule(`.${active.className}{}`, 1);
        findSelector(active.className).style[st] = p;
        getStyle(false);
    }

    storeAllStyle();
}


function getStyle(rewrite = true) {
    //intial
    style = '';
    resetActiveStyle();
    const cssom = findSelector(active.className);

    $('#tagName').innerText = active.tagName + ' ';
    $('#className').innerText = active.className ? active.className + ' ' : '-';
    $('#countEle').parentElement.style.display = 'none';


    if (active.className) {
        $('#countEle').innerText = $('.' + active.className, true, true).length;
        $('#countEle').parentElement.style.display = '';

        if (cssom) {
            style = cssom.style;
        }
    }
    viewStyle(rewrite);

}

function viewStyle(rewrite = true) {
    if (rewrite) {
        // if (style == '') {
        //     $('[data-style]', true).forEach(ele => {
        //         const s = ele.dataset.style.split(' ');
        //         color(s, ele);

        //         //input
        //         if (s[2] == true) {
        //             if (ele.tagName == 'SELECT') {
        //                 ele.value = ele.querySelector('option').value;
        //             }
        //             if (ele.type == 'color') {
        //                 ele.value = "#000000";
        //             }
        //         }
        //     })
        //     return 0;
        // }

        $('[data-style]', true).forEach(ele => {
            const s = ele.dataset.style.split(' ');
            color(s, ele);
            

            //click
            if (s[0] == true && style[s[4]] === s[5]) {
                ele.classList.add('active_style');
                // console.log(ele.classList)
                
            }

            //dblclick
            if (s[1] == true) {

            }

            //input
            if (s[2] == true) {
                //select tag
                if (ele.tagName == 'SELECT') {
                    if(style[s[4]]){
                        ele.value = style[s[4]]
                    }else{
                        ele.value = ele.querySelector('option').value
                        console.log(ele.value)
                    }
                    
                } 

                ////////////////////
                if(style[s[4]] == undefined){return 0}
                ///////////////////

                // border width
                else if(ele.classList.contains('borderWidth')){

                }
                // other tag
                else{
                    const suffix = getSuffix(s, style[s[4]], ele);
                    if (ele.type == 'color') {
                        ele.value = style[s[4]]!=''?rgbToHex(...style[s[4]].replace(/^rgba?\(|\s+|\)$/g, '').split(',')) : ele.value = "#000000";
                    } else {
                        ele.value = style[s[4]].replace(suffix, '');
                    }
                } 

            }

            //drag
            if (s[3] == true) {

            }
        })
    }else{
        $('[data-style]', true).forEach(ele => {
            const s = ele.dataset.style.split(' ');
            color(s, ele);
        })
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


function getSuffix(s, p, e) {
    if (s[5] != undefined) {
        let a;
        e.style.borderColor = '';
        e.style.color = '';

        if (p) {
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
    e.nextElementSibling?e.nextElementSibling.innerHTML = v:0;

    if(e.name != 'inherit'){
        e.dataset.style = b
    }else{
        e.dataset.style = b ;
        e.parentElement.parentElement.querySelector('input[type="range"]').dataset.style = b;
    }
}

function color(s, ele, st = 1) {
    if (!style[s[4]] || st == '') {
        if (ele.previousElementSibling && ele.previousElementSibling.classList.contains('active_style_property')) {
            ele.previousElementSibling.classList.remove('active_style_property');
            // ele.previousElementSibling.removeEventListener()
        } else if (ele.parentElement.previousElementSibling.classList.contains('active_style_property')) {
            ele.parentElement.previousElementSibling.classList.remove('active_style_property');
            // ele.parentElement.previousElementSibling.removeEventListener()
        }
    } else if (style[s[4]] != '') {
        if (ele.previousElementSibling && ele.previousElementSibling.classList.contains('--light')) {
            ele.previousElementSibling.classList.add('active_style_property');
            // ele.previousElementSibling.addEventListener();
        } else {
            ele.parentElement.previousElementSibling.classList.add('active_style_property');
            // ele.previousElementSibling.addEventListener();
        }
    }
}

function tab(e){
    if(e.currentTarget.classList.contains('open')){
        e.currentTarget.classList.remove('open');
        e.currentTarget.parentElement.style.height='';
        e.currentTarget.firstElementChild.firstElementChild?e.currentTarget.firstElementChild.firstElementChild.style.transform="":e.currentTarget.lastElementChild.style.transform="";
    }else{
        e.currentTarget.classList.add('open');
        e.currentTarget.parentElement.style.height=e.currentTarget.getBoundingClientRect().height+2+'px';
        e.currentTarget.firstElementChild.firstElementChild?e.currentTarget.firstElementChild.firstElementChild.style.transform="rotate(-90deg)":e.currentTarget.lastElementChild.style.transform="rotate(-90deg)";
    }
}


////////////////////////////////////////



function rgba2hex(orig) {
    let a, isPercent,
        rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
        alpha = (rgb && rgb[4] || "").trim(),
        hex = rgb ?
        (rgb[1] | 1 << 8).toString(16).slice(1) +
        (rgb[2] | 1 << 8).toString(16).slice(1) +
        (rgb[3] | 1 << 8).toString(16).slice(1) : orig;

    if (alpha !== "") {
        a = alpha;
    } else {
        a = 1;
    }
    // multiply before convert to HEX
    a = ((a * 255) | 1 << 8).toString(16).slice(1)
    hex = hex + a;

    return hex;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (parseInt(r) << 16) + (parseInt(g) << 8) + parseInt(b)).toString(16).slice(1);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
// console.log(rgbToHex(...'rgb(51,51,51)'.replace(/^rgba?\(|\s+|\)$/g, '').split(',')))


export {
    getStyle
};



//  data-style="{[ 0 click] [ 1 dblclick] [ 2 input] [ 3 drag]} {[ 4 style] [ 5 value]}"