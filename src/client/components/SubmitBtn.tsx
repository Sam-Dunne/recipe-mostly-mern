import * as React from 'react';

import { Button } from 'react-bootstrap';


const SubmitBtn = (props: SubmitBtnProps) => {

    return (
        <div className='row justify-content-center mt-4'>
            <Button
                variant='danger'
                type="submit"
                className='btn-link mx-auto border-info text-info p-3 font-weight-bold mb-3'
                onClick={props.onClick}
            >
                {props.children}
            </Button>
        </div>
    );
};

interface SubmitBtnProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children: string;
    
 }

export default SubmitBtn;