import React from 'react';
import { Table,Button} from 'reactstrap';
import Search from './Search';
import Head from './Header';
import Menu from './Menu';
import {Link} from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import {TiUserAdd} from 'react-icons/ti';

class Students extends React.Component{
    render(){
        return(
            <div>
                <div>
                    <Head/>
                </div>
                <div style={{float:'left', width:'240px'}}>
                    <Menu/>
                </div>

                <div style={{marginLeft:'240px'}}>
                    <Row>
                        <Col><Search/></Col>
                        <Col>
                            <Link to="/HomeAdmin/AddStudent">
                                <Button color="warning" style={{margin:'3px'}}>Thêm <TiUserAdd/></Button>
                            </Link>
                        </Col>
                    </Row>
                    <Table>
                        <thead>
                            <tr>
                                <th>MSSV</th>
                                <th>Họ và tên</th>
                                <th>Ngày sinh</th>
                            </tr>
                        </thead>
                    </Table>
                </div>
            </div>
        );
    }
}
export default Students;