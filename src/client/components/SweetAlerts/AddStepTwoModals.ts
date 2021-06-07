import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Modal = withReactContent(Swal);

const advanceConfirm = () => {
    return Modal.fire
        ({
            title: 'Are you sure?',
            text: "You haven't added any new ingredients!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'That is okay, take me to the next step to edit quantities and measures for existing recipe ingredients !',
            cancelButtonText: 'No, cancel! Stay here and Let me double check'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Final Step here we come!',
                    'Remember to update qty and measure for ALL ingredients before submittal',
                    'success'
                )
                return result.isConfirmed
            }
        })
    
}

export default {
    advanceConfirm
}