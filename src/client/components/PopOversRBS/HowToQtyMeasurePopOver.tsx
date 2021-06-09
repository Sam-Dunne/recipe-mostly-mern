import * as React from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { BsFillQuestionCircleFill } from 'react-icons/bs';


/* HOOK REACT EXAMPLE */
const HowToQtyMeasurePopOver = (props: HowToQtyMeasurePopOverProps) => {

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Tips for this element</Popover.Title>
            <Popover.Content>
                Please enter a (single spaced) Quantity and Unit of Measure for each ingredient. Don't forget to hit Submit Button.
          </Popover.Content>
            <Popover.Content>
               You may leave an entry blank. Simply return to this page to add it later.
          </Popover.Content>
            <Popover.Content>
               If you previously entered values, upon returning to this page, all recipe ingredient's corresponding values will be displayed in the input fields. Leave them be or begin typing to edit. Pretty freakin' nifty!
          </Popover.Content>
        </Popover>
    );
    return (
        <OverlayTrigger trigger={["focus", "click"]} placement="left" overlay={popover}>
            <Button variant="primary"><BsFillQuestionCircleFill className='bg-primary text-info question' /></Button>
        </OverlayTrigger>
    );

};

interface HowToQtyMeasurePopOverProps { }

export default HowToQtyMeasurePopOver;