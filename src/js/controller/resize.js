import Action from "../models/Action";
import { onResize } from "../models/sizing";
import {risizeBox} from "./mouse";

const resize = new Action(window);

resize.on('resize',e=>{
    onResize();
    // console.log('dkj')
})

resize.on('resize',e=>{
    risizeBox();
},domEle.iwin);
