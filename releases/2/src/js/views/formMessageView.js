const formMessageMock = document.createElement('p');
formMessageMock.style.display = "none";



const formMessage = (state, status) => {
    formMessageMock.style.display = '';
    if (state == 'success') {
        formMessageMock.className = "form_message--success";
        formMessageMock.innerText = `${status}: Success message`
    } else if (state == 'error') {
        formMessageMock.className = "form_message--error";
        formMessageMock.innerText = `${status}: error message`
    } else {
        formMessageMock.className = "form_message";
        formMessageMock.innerText = ` other message`
    }
}

export {
    formMessageMock,
    formMessage
};