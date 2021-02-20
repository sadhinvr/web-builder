const $=function (q,a=false){
    if(a){
        return document.querySelectorAll(q)
    }
    return document.querySelector(q);
}

export {$};
