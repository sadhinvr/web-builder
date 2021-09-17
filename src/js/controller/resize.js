import Action from "../models/Action";
import { onResize } from "../models/sizing";

const resize = new Action(window);

resize.on('resize',e=>{
    onResize();
    console.log('dkj')
})
