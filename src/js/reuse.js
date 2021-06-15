const b_URL = 'https://webflow-back-end.herokuapp.com';

const $ = function (q, a = false ,i = false) {
    if(i){
        if (a) {
            return document.getElementById('iframe').contentDocument.querySelectorAll(q);
        }
        return document.getElementById('iframe').contentDocument.querySelector(q);
    }

    if (a) {
        return document.querySelectorAll(q)
    }
    return document.querySelector(q);
}

const elements = {
    top_holder: $('.top_holder'),
    top: $('.top'),
    left_holder: $('.left_holder'),
    left: $('.left'),
    right_holder: $('.right_holder'),
    right: $('.right'),
    middle: $('.middle'),

}


export {
    $,
    elements,
    b_URL
};