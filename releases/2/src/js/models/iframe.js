import {
    elements
} from '../reuse';
// create the iframe and attach it to the document
const iframe = document.createElement("iframe");
elements.middle.appendChild(iframe);
const idocument=iframe.contentDocument;
const iwindow=iframe.contentWindow;

// iframe.setAttribute("scrolling", "no");
iframe.setAttribute("frameborder", "0");
iwindow.scrollTo(0,0);
iframe.id = "iframe";

setInterval(() => {
    // let getDom="";
    // idocument.body.querySelectorAll('* :not(#dev)').forEach(cur=>{
    //     getDom+=cur.outerHTML+'\n';
    // })
    if(window.localStorage.getItem('DOM') !== idocument.body.innerHTML.replace(/<!---->(.|\n)*?<!---->/g,'')){
        window.localStorage.setItem('DOM',idocument.body.innerHTML.replace(/<!---->(.|\n)*?<!---->/g,''));
        console.log('saved');
    }
}, 2000);

export {iframe,idocument,iwindow};