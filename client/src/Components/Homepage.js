import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { slugify } from "../Utils/slugify";
import {history} from '../Helpers';

const Homepage = (props) => {

    console.log(props.location)
    const [signUpForm, setSignUpForm] = useState(
        props.location.state.signUpForm ? props.location.state.signUpForm :
        {
            name: '',
            slug: '',
            email: '',
            password: ''
        })
    const [signInForm, setSignInForm] = useState({
        slug: '',
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
    const onChangeSignIn = (e) => {
        setSignInForm(
            {
                ...signInForm,
                [e.target.name]: e.target.value
            }
        )
    }

    const onSubmitSignUp = (e) => {
        e.preventDefault();
        console.log(signUpForm)
        history.push(`/continue-app`,{signUpForm:signUpForm})
        // history.push({
        //     pathname:`/continue/${signUpForm.slug}`,
        //     state: {signUpForm:signUpForm}
        // })
    }

    const onSubmitSignIn = (e) => {
        e.preventDefault();
        console.log(signInForm)
    }




    return (
        <div style={{ backgroundColor: '#B23CFD', height: '100vh' }}>
            <div className="display-2">
                <center>Hello, Welcome to GOD app</center>
            </div>
            <div className="container-fluid" style={{ paddingLeft: '50px', paddingRight: "50px" }}>
                <div className="row">
                    <div className="col-md-7" style={{ backgroundColor: '#00B74A', height: '80vh', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px'}}>
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
                                            padding:'20px',
                                            paddingTop:'30px',
                                            paddingBottom:'30px',
                                            fontSize:"20px",
                                            borderTopRightRadius:"20px",
                                            borderBottomRightRadius:"20px"
                                        }}
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
                                            padding:'20px',
                                            paddingTop:'30px',
                                            paddingBottom:'30px',
                                            fontSize:"20px",
                                            borderTopRightRadius:"20px",
                                            borderBottomRightRadius:"20px"
                                        }}
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
                                            padding:'20px',
                                            paddingTop:'30px',
                                            paddingBottom:'30px',
                                            fontSize:"20px",
                                            borderTopRightRadius:"20px",
                                            borderBottomRightRadius:"20px"
                                        }}
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
                                            padding:'20px',
                                            paddingTop:'30px',
                                            paddingBottom:'30px',
                                            fontSize:"20px",
                                            borderTopRightRadius:"20px",
                                            borderBottomRightRadius:"20px"
                                        }}
                                    />
                                </FormGroup>
                                <span className="float float-right">
                                    <Button 
                                        onClick={onSubmitSignUp}
                                        color="primary" 
                                        style={{
                                            fontSize:"20px",
                                            padding:"10px",
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
                    <div className="col-md-5" style={{ backgroundColor: '#262626', height: '80vh', borderTopRightRadius: '20px', borderBottomRightRadius: '20px', color: 'white' }}>
                        <div className="display-4">
                            <center>Sign in to your app</center>
                        </div>
                        <div className="signin-form">
                            <Form onSubmit={onSubmitSignIn}>
                                <FormGroup>
                                    <Label for="slug" style={{fontSize:"20px"}}>App Slug</Label>
                                    <Input 
                                        type="text" 
                                        name="slug" 
                                        placeholder="Enter your app slug (without spaces)"
                                        value={signInForm.slug}
                                        onChange={onChangeSignIn}
                                        style={{
                                            padding:'20px',
                                            paddingTop:'30px',
                                            paddingBottom:'30px',
                                            fontSize:"20px",
                                            borderTopLeftRadius:"20px",
                                            borderBottomLeftRadius:"20px"
                                        }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password" style={{fontSize:"20px"}}>Password</Label>
                                    <Input 
                                        type="password" 
                                        name="password" 
                                        placeholder="Enter your admin password" 
                                        value={signInForm.password}
                                        onChange={onChangeSignIn}    
                                        style={{
                                            padding:'20px',
                                            paddingTop:'30px',
                                            paddingBottom:'30px',
                                            fontSize:"20px",
                                            borderTopLeftRadius:"20px",
                                            borderBottomLeftRadius:"20px"
                                        }}
                                    />
                                </FormGroup>
                                <span className="float float-right">
                                    <Button 
                                        color="primary" 
                                        style={{
                                            fontSize:"20px",
                                            padding:"10px",
                                            width:"400px",
                                            borderTopLeftRadius:"20px",
                                            borderBottomLeftRadius:"20px"
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