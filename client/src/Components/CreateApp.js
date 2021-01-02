import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col} from 'reactstrap';
import { history } from "../Helpers";
// import { slugify } from "../Utils/slugify";

const CreateApp = (props) => {

    const { signUpForm } = props.location.state;


    return (
        <div style={{ backgroundColor: '#B23CFD', height: '100vh' }}>
            <div className="display-2">
                <center>Continue creating your application...</center>
            </div>
            <div className="container-fluid" style={{ paddingLeft: '50px', paddingRight: "50px", marginTop:'20px',overflowY:'scroll' }}>
                <div className="row">
                    <div className="col-md-12" style={{ backgroundColor: '#00B74A', height: '80vh', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px'}}>
                        <div className="display-4">
                            <center>Create a new app</center>
                        </div>
                        <div className="signup-form">
                            <Form>
                                
                                <Row form>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="name" style={{fontSize:"20px"}}>App Name</Label>
                                            <Input 
                                                type="text" 
                                                name="name" 
                                                value={signUpForm.name}
                                                style={{
                                                    padding:'20px',
                                                    paddingTop:'30px',
                                                    paddingBottom:'30px',
                                                    fontSize:"20px",
                                                }}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="slug" style={{fontSize:"20px"}}>App Slug</Label>
                                            <Input 
                                                type="text" 
                                                name="slug" 
                                                value={signUpForm.slug}
                                                style={{
                                                    padding:'20px',
                                                    paddingTop:'30px',
                                                    paddingBottom:'30px',
                                                    fontSize:"20px",
                                                }}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                    <FormGroup>
                                        <Label for="email" style={{fontSize:"20px"}}>Email</Label>
                                        <Input 
                                            type="email" 
                                            name="email" 
                                            value={signUpForm.email}
                                            style={{
                                                padding:'20px',
                                                paddingTop:'30px',
                                                paddingBottom:'30px',
                                                fontSize:"20px",
                                            }}
                                            disabled
                                        />
                                </FormGroup>
                                    </Col>
                                </Row>
                                
                                <span className="float float-Left">
                                    <Button 
                                        onClick={()=>history.push('/',{signUpForm:signUpForm})}
                                        color="warning" 
                                        style={{
                                            fontSize:"20px",
                                            padding:"10px",
                                            width:"400px",
                                            borderTopLeftRadius:"20px",
                                            borderBottomLeftRadius:"20px"
                                        }}
                                    >
                                            Back
                                    </Button>
                                </span>
                                <span className="float float-right">
                                    <Button 
                                        color="danger" 
                                        style={{
                                            fontSize:"20px",
                                            padding:"10px",
                                            width:"400px",
                                            borderTopRightRadius:"20px",
                                            borderBottomRightRadius:"20px"
                                        }}
                                    >
                                            Save
                                    </Button>
                                </span>
                            </Form>

                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}


export default CreateApp;