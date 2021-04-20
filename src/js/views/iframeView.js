import {
    $,
    elements
} from '../reuse';
import {
    idocument,
    iwindow
} from '../models/iframe';



// find the iframe's document and write some content

idocument.open();
idocument.write(`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>

        * {
            box-sizing: border-box;
        }

        body:after {
            visibility: hidden;
            display: block;
            font-size: 0;
            content: " ";
            clear: both;
            height: 0;
        }

        img,video {
            max-width: 100%;
        }

        .element {
            font-size: 14px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: grab;
            background: #404040;
        }

        .element img {
            padding: 10px;

        }

        .fade {
            opacity: .5;
            cursor: grabbing;
        }

        body,body *{
            cursor:default;
            -webkit-user-select: none;
            /* Chrome all / Safari all */
            -moz-user-select: none;
            /* Firefox all */
            -ms-user-select: none;
            /* IE 10+ */
            user-select: none;
        }

        .grabbing , body.grabbing * {
            cursor:grabbing !important;
        }

        body.grabbing.not_allowed * ,body.grabbing.not_allowed{
            cursor:not-allowed !important;
        }

        .fade{
            opacity: .5;
            pointer-events: none;
        }

    </style>

    <style>
        /*change the thinkness of the scrollbar here*/
        body::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0); 
            -webkit-border-radius: 6px;
            border-radius: 6px;
        }
        /*add a shadow to the scrollbar here*/
        body::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 0px rgba(0,0,0,0); 
            -webkit-border-radius: 6px;
            border-radius: 6px;
        }
        /*this is the little scrolly dealio in the bar*/ 
        body::-webkit-scrollbar-thumb {
            border-radius: 6px;
            background: #0000007a;
            height: 3px;
        }
        /*nobody needs this little scrollbar corner, I mean really, get rid of it haha*/  
        body::-webkit-scrollbar-corner       { display: none; height: 0px; width: 0px; }
        
    </style> 

    <style id="main_style" rel="stylesheet"></style>

</head>

<body data-ele="body">

<!----><div id="dev" style="pointer-events: none;width:0;height:0;"></div><!---->
</body>

</html>`);


window.addEventListener('load', () => {
    if (window.localStorage.getItem('DOM')) {
        idocument.body.insertAdjacentHTML('afterbegin', window.localStorage.getItem('DOM'));
    }
    if (idocument.body.children.length < 2) {
        idocument.body.style.height = "100vh";
    }

})

idocument.close();


//create boxes
let on;
const mover = idocument.createElement('div');
mover.id = 'mover';




idocument.body.addEventListener('mouseover', mouseOver);
idocument.body.addEventListener('mouseleave', mouseLeave);
$('#reset').addEventListener('click', resetDocument);

function resetDocument() {
    idocument.body.innerHTML = `<!----><div id="dev" style="pointer-events: none;width:0;height:0;"></div><!---->`;
    idocument.body.style = 'height: 100vh;'
}

function mouseOver(e) {
    on = true;
    setStyleData(e.target, mover, '1px solid dodgerblue');
    // console.log(mover)
    idocument.getElementById('dev').appendChild(mover);

}

function setStyleData(e, box, bor = false, bg = false) {
    box.setAttribute('focusable', "false");
    box.style = 'position:absolute;pointer-events: none;';
    let style = e.currentStyle || window.getComputedStyle(e),
        width = e.offsetWidth,
        height = e.offsetHeight,
        margin1 = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
        margin2 = parseFloat(style.marginTop) + parseFloat(style.marginBottom),
        padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
        border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

    // change style
    box.style.top = e.offsetTop - parseFloat(style.marginTop) + 'px';
    box.style.left = e.offsetLeft - parseFloat(style.marginLeft) + 'px';

    box.style.width = width + margin1 + 'px';
    box.style.height = height + margin2 + 'px';
    if (e.dataset.ele && e.dataset.ele === 'body') {
        box.style.top = e.offsetTop + 'px';
        box.style.left = e.offsetLeft + 'px';
    }

    bor ? box.style.border = bor : box.style.background = bg;
}

function mouseLeave() {
    on = false;
    mover.remove();
}

function iframeAppend(html, pos) {
    try {
        pos[0].insertAdjacentElement(pos[1], html);
    } catch (error) {
        console.log(error)
    }
}

export {
    iframeAppend,
    on,
    setStyleData
};