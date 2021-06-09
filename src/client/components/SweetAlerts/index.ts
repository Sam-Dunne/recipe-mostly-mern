import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MyModal = withReactContent(Swal);

const timeoutSuccess = (title: string, text: string) => {
    return MyModal.fire({
        icon: 'success',
        title: title,
        text: text,
        timer: 2300,
        timerProgressBar: true,
    })
}

const fieldValidation = (title: string, text: string) => {
    return MyModal.fire({
        icon: 'error',
        title: title,
        text: text,
    })
}

export default {
    timeoutSuccess,
    fieldValidation
}