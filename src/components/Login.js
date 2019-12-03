import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Input,Form,Row,Col} from 'reactstrap';
import {Link} from 'react-router-dom';



class Login extends Component {
    // state nam trong constructor
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
            
    }   
    handleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({[name] : value });
        
    };
    handleSubmit = event => {
        if(this.state.username==="" && this.state.password===""){
                alert("Nhap tai khoan va mat khau");
        }
        else{
                
                //cai data gui len phai giong voi cai body trong postman
                axios.post(`http://18.162.115.187:3001/api/a/login`,
                        {
                                user_name: this.state.username,
                                password: this.state.password
                        }
                )
                .then(res => {
                console.log(res);
                console.log(res.data);
                console.log("dang nhap thanh cong");
                })
                .catch(function (error) {
                        // handle error
                        console.log(error+"that bai");
                }) 
                event.preventDefault(); 
        }
        
}
render() {
        return (
            <center>
                <Form style={{border:'1px solid', marginTop:'30px', padding:'10px', borderRadius:'5px', width:'450px', textAlign:'center'}}>
                    <fieldset>
                        <Row style={{padding:'10px' }}>
                            <Col >
                                <Input onChange={this.handleChange} name="username" placeholder="User"/>
                            </Col>
                        </Row>
                        <Row style={{padding:'10px'}}>
                            <Col>
                                <Input onChange={this.handleChange} type="password" name="password" placeholder="Password" />
                            </Col>
                        </Row>
                        <Row style={{padding:'10px'}}>
                            <Col>
                                <Button outline color="success" onClick={this.handleSubmit}>
                                    <Link to="/HomeAdmin" style={{textDecoration:'none', color:'black'}}>Log in</Link>
                                </Button>
                            </Col>
                        </Row>
                    </fieldset>
                </Form>
            </center>
        );
    }
}

export default Login;
