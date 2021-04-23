import { $ } from "../reuse";


var state='html',
    texta = document.getElementById("code"),
    toggleBtn = $('#toggle_code'),
    codeHolder = $('.code_holder'),
    rightPop = $('.right_pop'),
    html=$('.o-html'),
    css=$('.o-css'),
    js=$('.o-js');

//eventListeners

toggleBtn.addEventListener('click',()=>{
    if(codeHolder.style.display == 'none'){
        codeHolder.style.display="";
        rightPop.style.display="";
        toggleBtn.classList.add('active_col');
        loadCode();
    }else{
        codeHolder.style.display="none";
        rightPop.style.display="none";
        toggleBtn.classList.remove('active_col')
    }
})

html.addEventListener('click',()=>{
    state="html";
    loadCode();
})

css.addEventListener('click',()=>{
    state="css";
    loadCode();
})

js.addEventListener('click',()=>{
    state="javascript";
    loadCode();
})

// functions

function loadCode(){

    if(state == 'html'){
        if(localStorage.getItem('DOM')){
            texta.value=localStorage.getItem('DOM');
        }else{
            texta.value='nothing yet..'
        }
    }else if(state == 'css'){
        texta.value = '';

        if(localStorage.getItem('stylesheet')){
            const tempCss=JSON.parse(localStorage.getItem('stylesheet'));
            for(let i=0;i<Object.keys(tempCss).length;i++){
                texta.value+=tempCss[i];
            }
        }else{
            texta.value='nothing yet..'
        }

    }else{
        texta.value=`try{
            $('.CodeMirror').remove();
        }catch(e){
            console.log('no thing')
        }`
    }

    beautify();
}


function beautify(){
    try{
        $('.CodeMirror').remove();
    }catch(e){
        console.log('no thing')
    }

    const mixedMode = {
        name: "htmlmixed",
        scriptTypes: [{
                matches: /\/x-handlebars-template|\/x-mustache/i,
                mode: null
            },
            {
                matches: /(text|application)\/(x-)?vb(a|script)/i,
                mode: null
            }
        ]
    };


    var editor = CodeMirror.fromTextArea(texta, {
        mode: state == 'html'?mixedMode:state,
        selectionPointer: true,
        theme: 'material-palenight',
    });
    
    indentCode(editor);
}


function indentCode(editor){
    CodeMirror.commands["selectAll"](editor);
    
    function getSelectedRange() {
        return {
            from: editor.getCursor(true),
            to: editor.getCursor(false)
        };
    }
    
    function autoFormatSelection() {
        var range = getSelectedRange();
        editor.autoFormatRange(range.from, range.to);
    }
    
    function commentSelection(isComment) {
        var range = getSelectedRange();
        editor.commentRange(isComment, range.from, range.to);
    }
    
    autoFormatSelection();
}

rightPop.style.display="none";
codeHolder.style.display="none";