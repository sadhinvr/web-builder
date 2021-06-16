import {
    loading
} from "../views/signView";

const formLoading = (l=true) => {
    l ? loading.style.display = "" : loading.style.display = "none";
}

export default formLoading;