import {
    signin
} from "../controller/signin";
import {
    signup
} from "../controller/signup";
import {
    $
} from "../reuse";
import {
    getCookie
} from "../utils/cookie";
import {formMessageMock} from "./formMessageView";

const loading = document.createElement('img');

function createSign(state) {
    const sign = $('.sign');

    sign.style.display = "flex";
    //mockup
    const m = `
        <div class="pop_up_heading"><span>Sign ${state} </span> </div>
        <div class="div">
            <legend>${state === 'up'?'Name & ':''}Username</legend>
            <div>
                ${state === 'up'?'<input required type="text" placeholder="Your name" name="name" autocomplete="name" spellcheck="false">':''}
                <input required type="text" placeholder="Username unique" name="userName" autocomplete="username">        
            </div>
        </div>
        <div>
            <legend>Password</legend>
            <div>
                <input required type="password" name="password" placeholder="#####" autocomplete="current-password">
                <button type="submit">Sign ${state}</button><br>
            </div>
        </div>
    `
    //set other option
    const p = document.createElement('p');
    p.className = 'sign_other';
    p.innerText = `sign ${state === 'up'?'in':'up'}`;
    p.addEventListener('click', () => state === 'up' ? createSign('in') : createSign('up'))

    const cross = document.createElement('img');
    cross.src = "assets/cross.svg";
    cross.className ="cross";
    cross.title ='close';
    cross.addEventListener('click',()=>sign.style.display="none");

    loading.src = "assets/loading.svg";
    loading.className ="sign_loading";
    loading.title ='loading';
    loading.style.display = 'none';

    // set form
    const form = document.createElement('form');
    form.dataset.sign = state;
    form.innerHTML = m;
    form.appendChild(p);
    form.appendChild(cross);
    form.appendChild(loading);
    form.appendChild(formMessageMock)
    form.addEventListener('submit', state === 'up' ? signup : signin)
    sign.innerHTML = '';
    sign.appendChild(form);
}

export {
    createSign,
    loading
};