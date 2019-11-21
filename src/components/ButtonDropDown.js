import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Example = (props) => {
    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);

    return (
        <ButtonDropdown style={{float:'right'}} isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                Nguyen Ngoc Nghia
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>Home</DropdownItem>
                <DropdownItem divider />
                <DropdownItem >Profile</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Log out</DropdownItem>
            </DropdownMenu>
        </ButtonDropdown>
    );
}

export default Example;
