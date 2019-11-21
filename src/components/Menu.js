import React from 'react';
import {Button,ListGroup} from 'reactstrap';
import {Link} from 'react-router-dom';
class Menu extends React.Component{
    
    render(){
        return(
            <ListGroup>
                <Link to="/HomeAdmin/Courses"><Button outline color="primary" style={{width:'240px'}} onClick={this.handleClick}>Quản lý kỳ thi</Button></Link>
                <Link to="/HomeAdmin/Students"><Button outline color="primary" style={{width:'240px'}}>Quản lý sinh viên</Button></Link>
                <Link to="/HomeAdmin/System"><Button outline color="primary" style={{width:'240px'}}>Quản lý hệ thống</Button></Link>
            </ListGroup>
            
        );
    }
}
export default Menu;