import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { slugify } from "../Utils/slugify";
import {history} from '../Helpers';

const Homepage = (props) => {

    const [signUpForm, setSignUpForm] = useState(
        (props.location && props.location.state && props.location.state.signUpForm) ? props.location.state.signUpForm :
        {
            name: '',
            slug: '',
            email: '',
            password: ''
        })

    const onChangeSignUp = (e) => {
        setSignUpForm(
            {
                ...signUpForm,
                [e.target.name]: e.target.name==="slug" ? slugify(e.target.value) : e.target.value
            }
        )
    }

    const onSubmitSignUp = (e) => {
        e.preventDefault();
        console.log(signUpForm)
        history.push(`/continue-app`,{signUpForm:signUpForm})

    }

    return (
        <div style={{ backgroundColor: '#B23CFD',overflowY:"hidden",minHeight:"100vh" }}>
            <div className="display-2">
                <center>Hello, Welcome to Spawner</center>
            </div>
            <div className="container-fluid" style={{ paddingLeft: '50px', paddingRight: "50px" }}>
                <div className="row">
                    <div className="col-md-12" style={{ backgroundColor: '#00B74A', minHeight: '80vh', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px'}}>
                        <div className="display-4">
                            <center>Create a new app</center>
                        </div>
                        <div className="signup-form">
                            <Form>
                                <FormGroup>
                                    <Label for="name" style={{fontSize:"20px"}}>App Name</Label>
                                    <Input 
                                        type="text" 
                                        name="name" 
                                        placeholder="Please enter your app name"
                                        value={signUpForm.name}
                                        onChange={onChangeSignUp}
                                        style={{
                                            fontSize:"20px",
                                            borderTopRightRadius:"20px",
                                            borderBottomRightRadius:"20px"
                                        }}
                                        required={true}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="slug" style={{fontSize:"20px"}}>App Slug</Label>
                                    <Input 
                                        type="text" 
                                        name="slug" 
                                        placeholder="Enter your app slug (without spaces)"
                                        value={signUpForm.slug}
                                        onChange={onChangeSignUp}
                                        style={{
                                            fontSize:"20px",
                                            borderTopRightRadius:"20px",
                                            borderBottomRightRadius:"20px"
                                        }}                                        
                                        required={true}
                                    />
                                    {
                                        signUpForm.slug ?
                                        <Label>Your slug is {slugify(signUpForm.slug)}</Label>
                                        : null
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email" style={{fontSize:"20px"}}>Email</Label>
                                    <Input 
                                        type="email" 
                                        name="email" 
                                        placeholder="Please enter your email" 
                                        value={signUpForm.email}
                                        onChange={onChangeSignUp}
                                        style={{
                                            fontSize:"20px",
                                            borderTopRightRadius:"20px",
                                            borderBottomRightRadius:"20px"
                                        }}
                                        required={true}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password" style={{fontSize:"20px"}}>Password</Label>
                                    <Input 
                                        type="password" 
                                        name="password" 
                                        placeholder="Enter your admin password" 
                                        value={signUpForm.password}
                                        onChange={onChangeSignUp}    
                                        style={{
                                            fontSize:"20px",
                                            borderTopRightRadius:"20px",
                                            borderBottomRightRadius:"20px"
                                        }}
                                        required={true}
                                    />
                                </FormGroup>
                                <span className="float float-right">
                                    <Button 
                                        onClick={onSubmitSignUp}
                                        color="primary" 
                                        style={{
                                            fontSize:"20px",
                                            width:"400px",
                                            borderTopRightRadius:"20px",
                                            borderBottomRightRadius:"20px"
                                        }}
                                    >
                                            Next
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


export default Homepage;