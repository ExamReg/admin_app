import React from 'react';
import Example from './ButtonDropDown';
// import {Button,ButtonDropdown,DropdownMenu,DropdownItem,DropdownToggle} from 'reactstrap';
// import {IoMdArrowDropdown} from 'react-icons/io';


class Header extends React.Component {
    
    
    render() {
        // const toggle = () => isOpen(!dropdownOpen);
        // const [dropdownOpen, isOpen] = useState(false);
        return (
            
            // <ButtonDropdown isOpen={isOpen} toggle={toggle}>
            //     <DropdownToggle caret color="primary">
            //         Nghia
            //     </DropdownToggle>
            //     <DropdownMenu>
            //         <DropdownItem>Home</DropdownItem>
            //         <DropdownItem>Thong tin</DropdownItem>
            //         <DropdownItem>Dang xuat</DropdownItem>
                    
            //     </DropdownMenu>
            // </ButtonDropdown>   
            <div style={{backgroundColor:'#00dbffde', height:'100px'}}>
                <div style={{fontSize:'24px'}}>ABCUni đăng ký lịch thi trực tuyến</div>
                {/* <Button style={{float:'right'}} color="success">Nguyen Ngoc Nghia <IoMdArrowDropdown/></Button> */}
                <Example/>
            </div>
        );
    }
}
export default Header;