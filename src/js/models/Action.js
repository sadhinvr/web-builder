export default class Action{
    constructor(){

    }

    click(ele,fun){
        ele.addEventListener('click',fun);
    }

    mouseMove(ele,fun){
        ele.addEventListener('mousemove',fun);
    }

    mousePos(e){
        return {x:e.clientX,y:e.clientY}
    }

}