import * as React from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { BsFillQuestionCircleFill } from 'react-icons/bs';

const HowToAddIngredPopOver = (props: HowToAddIngredPopOverProps) => {

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Tips for this element</Popover.Title>
            <Popover.Content>
                This is a creatable multi select. Start typing an ingredient, if a match exists it will be shown...if not, click create to add it to the list.  Hit Submit when finished.  Additional Ingredients can easily be added later.
            </Popover.Content>
        </Popover>
    );
    return (
        <div className='ml-4'>
            <OverlayTrigger trigger={"focus"} placement="right" overlay={popover}>
                <Button variant="primary"><BsFillQuestionCircleFill className='question' /></Button>
            </OverlayTrigger>
        </div>
    );

};

interface HowToAddIngredPopOverProps { }

export default HowToAddIngredPopOver;