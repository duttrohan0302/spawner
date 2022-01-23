import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
} from "reactstrap";
import { history } from "../Helpers";

const CreateApp = (props) => {
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    slug: "",
    email: "",
    password: "",
    appSchema: [
      {
        name: "",
        attributes: [
          {
            name: "",
            type: "",
            ref: "",
            required: "",
          },
        ],
      },
    ],
  });
  useEffect(() => {
    if (props.location && props.location.state) {
      setSignUpForm({
        ...signUpForm,
        name: props.location.state.signUpForm.name,
        email: props.location.state.signUpForm.email,
        slug: props.location.state.signUpForm.slug,
        password: props.location.state.signUpForm.password,
      });
    }
  }, []);

  const addModel = (e) => {
    e.preventDefault();
    setSignUpForm({
      ...signUpForm,
      appSchema: [
        ...signUpForm.appSchema,
        {
          name: "",
          attributes: [],
        },
      ],
    });
  };

  const addAttribute = (e, name) => {
    e.preventDefault();

    const elementsIndex = signUpForm.appSchema.findIndex(
      (model) => model.name === name
    );
    let newArray = [...signUpForm.appSchema];
    newArray[elementsIndex].attributes = [
      ...newArray[elementsIndex].attributes,
      {
        name: "",
        type: "",
        ref: "",
        required: "",
      },
    ];

    setSignUpForm({ ...signUpForm, appSchema: [...newArray] });
  };
  return (
    <div
      style={{ backgroundColor: "#B23CFD", padding: "20px", height: "100vh" }}
    >
      <div className="display-2">
        <center>Continue creating your application...</center>
      </div>
      <div
        className="container-fluid"
        style={{
          paddingLeft: "50px",
          paddingRight: "50px",
          marginTop: "20px",
          overflowY: "auto",
        }}
      >
        <div className="row">
          <div
            className="col-md-12"
            style={{
              backgroundColor: "#00B74A",
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
              padding: "20px",
            }}
          >
            <div className="display-4">
              <center>Create a new app</center>
            </div>
            <div className="signup-form">
              <Form>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="name" style={{ fontSize: "20px" }}>
                        App Name
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        value={signUpForm.name}
                        style={{
                          padding: "20px",
                          paddingTop: "30px",
                          paddingBottom: "30px",
                          fontSize: "20px",
                        }}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="slug" style={{ fontSize: "20px" }}>
                        App Slug
                      </Label>
                      <Input
                        type="text"
                        name="slug"
                        value={signUpForm.slug}
                        style={{
                          padding: "20px",
                          paddingTop: "30px",
                          paddingBottom: "30px",
                          fontSize: "20px",
                        }}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="email" style={{ fontSize: "20px" }}>
                        Email
                      </Label>
                      <Input
                        type="email"
                        name="email"
                        value={signUpForm.email}
                        style={{
                          padding: "20px",
                          paddingTop: "30px",
                          paddingBottom: "30px",
                          fontSize: "20px",
                        }}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <center>
                  <div style={{ marginBottom: "20px" }}>
                    <Button
                      color="info"
                      onClick={addModel}
                      style={{
                        fontSize: "20px",
                        // padding:"10px",
                        width: "400px",
                        borderRadius: "20px",
                      }}
                    >
                      Add a new Model
                    </Button>
                  </div>
                </center>
                {/* {console.log(appSchema)} */}
                <div>
                  {signUpForm.appSchema &&
                    signUpForm.appSchema.map((model, modelIndex) => (
                      <div>
                        <Row form key={modelIndex}>
                          <Col md={9}>
                            <FormGroup>
                              <Input
                                type="text"
                                name="name"
                                placeholder="Model Name"
                                // value={signUpForm.email}
                                style={{
                                  padding: "20px",
                                  paddingTop: "30px",
                                  paddingBottom: "30px",
                                  fontSize: "20px",
                                  // width:"800px"
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={3}>
                            <Button
                              color="warning"
                              onClick={(e) => addAttribute(e, "")}
                              style={{
                                fontSize: "20px",
                                // width:"400px",
                                padding: "15px 50px",
                                // borderTopLeftRadius:"20px",
                                // borderBottomLeftRadius:"20px"
                              }}
                            >
                              Add a new attribute
                            </Button>
                          </Col>
                        </Row>
                        <div>
                          {model.attributes.map((attribute, attributeIndex) => (
                            <Row form key={attributeIndex}>
                              <Col md={3}>
                                <Input
                                  type="text"
                                  name="name"
                                  placeholder="Attribute Name"
                                  // value={signUpForm.email}
                                  style={{
                                    padding: "20px",
                                    paddingTop: "30px",
                                    paddingBottom: "30px",
                                    fontSize: "20px",
                                  }}
                                />
                              </Col>
                              <Col md={3}>
                                <FormGroup>
                                  <Input
                                    type="select"
                                    name="type"
                                    style={{ height: "60px", fontSize: "20px" }}
                                  >
                                    <option value="0">
                                      Select Attribute Type
                                    </option>
                                    <option value="String">String</option>
                                    <option value="Number">Number</option>
                                    <option value="Date">Date</option>
                                    <option value="Buffer">Buffer</option>
                                    <option value="Boolean">Boolean</option>
                                    <option value="Mixed">Mixed</option>
                                    <option value="ObjectId">ObjectId</option>
                                    <option value="Array">Array</option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col md={3}>
                                <FormGroup>
                                  <Input
                                    type="select"
                                    name="ref"
                                    style={{ height: "60px", fontSize: "20px" }}
                                  >
                                    <option value="0">
                                      Select Attribute Ref (if exists)
                                    </option>
                                    <option value="String">Model 1</option>
                                    <option value="Number">Model 2</option>
                                    <option value="Date">Model 3</option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col md={2}>
                                <FormGroup>
                                  <Input
                                    type="select"
                                    name="required"
                                    style={{ height: "60px", fontSize: "20px" }}
                                  >
                                    <option value="0">
                                      Attribute Required
                                    </option>
                                    <option value={true}>True</option>
                                    <option value={false}>False</option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col md={1}>
                                <Button
                                  color="danger"
                                  style={{
                                    // width:"100px",
                                    padding: "16px",
                                  }}
                                >
                                  Remove
                                </Button>
                              </Col>
                            </Row>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
                {/* <Form style={{marginTop:'10px'}}>
                                    <Row form>
                                        <Col md={9}>
                                            <FormGroup>
                                                <Input
                                                    type="text" 
                                                    name="name" 
                                                    placeholder="Model Name"
                                                    // value={signUpForm.email}
                                                    style={{
                                                        padding:'20px',
                                                        paddingTop:'30px',
                                                        paddingBottom:'30px',
                                                        fontSize:"20px",
                                                        // width:"800px"
                                                    }}
                                                />
                                            </FormGroup>
                                            
                                        </Col>
                                        <Col md={3}>
                                                <Button 
                                                    onClick={addAttribute}
                                                    color="warning" 
                                                    style={{
                                                        fontSize:"20px",
                                                        width:"400px",
                                                        padding:'15px'
                                                        // borderTopLeftRadius:"20px",
                                                        // borderBottomLeftRadius:"20px"
                                                    }}
                                                >
                                                    Add a new attribute
                                                </Button>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={3}>
                                            <Input
                                                    type="text" 
                                                    name="name" 
                                                    placeholder="Attribute Name"
                                                    // value={signUpForm.email}
                                                    style={{
                                                        padding:'20px',
                                                        paddingTop:'30px',
                                                        paddingBottom:'30px',
                                                        fontSize:"20px",
                                                    }}
                                                />
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Input type="select" name="type" style={{height:'60px',fontSize:"20px"}}>
                                                    <option value="0">Select Attribute Type</option>
                                                    <option value="String">String</option>
                                                    <option value="Number">Number</option>
                                                    <option value="Date">Date</option>
                                                    <option value="Buffer">Buffer</option>
                                                    <option value="Boolean">Boolean</option>
                                                    <option value="Mixed">Mixed</option>
                                                    <option value="ObjectId">ObjectId</option>
                                                    <option value="Array">Array</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Input type="select" name="ref" style={{height:'60px',fontSize:"20px"}}>
                                                    <option value="0">Select Attribute Ref (if exists)</option>
                                                    <option value="String">Model 1</option>
                                                    <option value="Number">Model 2</option>
                                                    <option value="Date">Model 3</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <Input type="select" name="required" style={{height:'60px',fontSize:"20px"}}>
                                                    <option value="0">Attribute Required</option>
                                                    <option value={true}>True</option>
                                                    <option value={false}>False</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={1}>
                                            <Button 
                                                color="danger"
                                                style={{
                                                    // width:"100px",
                                                    padding:"16px"
                                                }}
                                            >Remove</Button>
                                        </Col>
                                    </Row>
                                    

                                </Form> */}
                <div style={{ marginTop: "10px" }}>
                  <span className="float float-Left">
                    <Button
                      onClick={() =>
                        history.push("/", { signUpForm: signUpForm })
                      }
                      color="warning"
                      style={{
                        fontSize: "20px",
                        padding: "10px",
                        width: "400px",
                        borderTopLeftRadius: "20px",
                        borderBottomLeftRadius: "20px",
                      }}
                    >
                      Back
                    </Button>
                  </span>
                  <span className="float float-right">
                    <Button
                      color="secondary"
                      onClick={()=>console.log(signUpForm)}
                      style={{
                        fontSize: "20px",
                        padding: "10px",
                        width: "400px",
                        borderTopRightRadius: "20px",
                        borderBottomRightRadius: "20px",
                      }}
                    >
                      Save
                    </Button>
                  </span>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateApp;
