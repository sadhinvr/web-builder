import{active} from '../models/drag';
import { idocument, iwindow } from '../models/iframe';
import { $ } from '../reuse';

window.addEventListener('keyup',deleteEle)

iwindow.addEventListener('keyup',deleteEle)

function deleteEle(e){
    if(e.key === 'Delete' && active && active.tagName != 'BODY'){
        active.remove();
        const box=idocument.querySelector('#dev #activeBox');
        const mover=idocument.querySelector('#dev #mover');
        box?box.remove():0;
        mover?mover.remove():0;
        if (idocument.body.children.length < 2) {
            idocument.body.style.height = "100vh";
        }
        idocument.querySelectorAll('div,section').forEach(cur => {
            if (cur.dataset.drag) {
                if (cur.children.length > 0) {
                    cur.removeAttribute("style")
                } else if (cur.style !== "padding:30px;box-shadow:0px 0px 3px inset #848484") {
                    cur.style = "padding:30px;box-shadow:0px 0px 3px inset #848484";
                }
            }
        })

        $('.reveal_tab',true).forEach((cur)=>{
            cur.style.display='none'
        })

        $('#tagName').innerText = 'Tagname';
        $('#className').innerText = 'classname';
        $('#countEle').parentElement.style.display = 'none';
    }
}