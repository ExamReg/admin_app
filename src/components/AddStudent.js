import React from 'react';
import {TiUserAdd} from 'react-icons/ti';
import { Button, Form, Row, Label, Input } from 'reactstrap';
class AddStudent extends React.Component{
    render(){
        return(
            <Form style={{width:'500px',padding:'10px', margin:'auto'}}>
                <fieldset >
                    <legend>Add Student</legend>
                    <Row>
                        <Label for="MSSV">MSSV:</Label>
                        <Input type="text" name="MSSV" id="MSSV"/>
                    </Row>
                    <Row>
                        <Label for="name">Họ và tên:</Label>
                        <Input type="text" name="name" id="name"/>
                    </Row>
                    <Row>
                        <Label for="date">Ngày sinh:</Label>
                        <Input type="date" name="date" id="date"/>
                    </Row>
                    <Row style={{float:'right', margin:'10px'}}>
                        <Button outline color="success">Thêm <TiUserAdd/></Button>
                    </Row>
                </fieldset>
            </Form>
        );
    }
}
export default AddStudent;