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


export {iframe,idocument,iwindow};