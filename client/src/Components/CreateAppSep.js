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
import { setAlert } from '../Actions/alertActions'
import store from '../Helpers/store';
import axios from 'axios';
import {Link} from "react-router-dom"

const CreateApp = (props) => {
    if (!props.location.state || !props.location.state.signUpForm.email) {
    history.push("/");
  }
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    slug: "",
    email: "",
    password: "",
    schema: [
    ],
  });
  const [showDownloadLink,setShowDownloadLink] = useState(false)

  // const tryRequire = (path) => {
  //   try {
  //   //  return require(`../../public/${path}`);
  //    return true
  //   } catch (err) {
  //    return null;
  //   }
  // };
  const saveForm = async () => {
    let form = signUpForm

    form.schema.map(model=>{
      if(model.name){
        if(!model.isAuth || model.isAuth==='isAuth'){
          model.isAuth=false
        }
        model.attributes.map(attribute=>{

          if(attribute.name){
            if(!attribute.type || attribute.type==="0"){
              attribute.type="String"
            }
            if(!attribute.ref || attribute.ref==="0"){
              attribute.ref=null
            }
            if(!attribute.required || attribute.required==="0"){
              attribute.required=false
            }
            return attribute
          }
          return null
        })
        return model
      }

      return null
    })
    console.log(form)
    setSignUpForm(form)
    try{

      const data = await axios.post('/app',form)

      if(data.data){
        // const showLinkCheck = () =>{
          // if(tryRequire(`zips/${data.data.slug}.zip`)){
            // clearInterval(checkInterval)
            setShowDownloadLink(true)
            window.scrollTo(0,0)
            store.dispatch(setAlert("Your backend app has been created successfully. Click on the download button to get it now.","success"))
          // }
        // }
        // const checkInterval = setInterval(showLinkCheck,2000)


      }
    }catch(err){
      console.log(err)
    }

  }



  useEffect(() => {
    if (props.location && props.location.state) {
      if (!props.location.state || !props.location.state.signUpForm || props.location.state.signUpForm.name === "") {
        history.push("/");
      }
      setSignUpForm({
        ...signUpForm,
        name: props.location.state.signUpForm.name,
        email: props.location.state.signUpForm.email,
        slug: props.location.state.signUpForm.slug,
        password: props.location.state.signUpForm.password,
      });
    }

  }, [props.location, props.location.state]);

  const addModel = (e) => {
    e.preventDefault();
    setSignUpForm({
      ...signUpForm,
      schema: [
        ...signUpForm.schema,
        {
          isAuth: false,
          name: "",
          attributes: [],
        },
      ],
    });
  };

  const updateModel = (e, index) => {
    e.preventDefault();
    const tempSchema = signUpForm.schema;
    tempSchema[index][e.target.name] = e.target.value;
    setSignUpForm({ ...signUpForm, schema: tempSchema });
  };

  const updateAttribute = (e, modelIndex,attributeIndex) => {
    e.preventDefault();
    const tempSchema = signUpForm.schema;
    tempSchema[modelIndex].attributes[attributeIndex][e.target.name] = e.target.value
    setSignUpForm({ ...signUpForm, schema: tempSchema });
  };

  const deleteModel = (modelIndex) => {
    let tempSchema = signUpForm.schema;
    tempSchema.splice(modelIndex,1)
    setSignUpForm({ ...signUpForm, schema: tempSchema });
  } 
  const deleteAttribute = (modelIndex,attributeIndex) => {
    let tempSchema = signUpForm.schema;
    tempSchema[modelIndex].attributes.splice(attributeIndex,1)
    setSignUpForm({ ...signUpForm, schema: tempSchema });
  }
  const addAttribute = (e, modelIndex) => {
    e.preventDefault();

    const tempSchema = signUpForm.schema;
    if(!tempSchema[modelIndex].name){
      window.scroll(0,0)
      store.dispatch(setAlert("Please enter model name first","danger",3000))
    }else{
      if(!tempSchema[modelIndex].attributes) {
        tempSchema[modelIndex].attributes = []
      }
      tempSchema[modelIndex].attributes.push({
        name: "",
        type: "",
        ref: "",
        required: ""
      })

  
      setSignUpForm({ ...signUpForm, schema: tempSchema });
    }

  };
  return (
    <div
      style={{ backgroundColor: "#B23CFD", padding: "20px", minHeight: "100vh" }}
    >
      <div className="display-2">
        <center>Continue creating your application...</center>
      </div>
      <div
        className="container-fluid"
        style={{
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
                  <Col >
                    <FormGroup>
                      <Label for="name" style={{ fontSize: "20px" }}>
                        App Name
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        value={signUpForm.name}
                        style={{
                          fontSize: "20px",
                        }}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col >
                    <FormGroup>
                      <Label for="slug" style={{ fontSize: "20px" }}>
                        App Slug
                      </Label>
                      <Input
                        type="text"
                        name="slug"
                        value={signUpForm.slug}
                        style={{
                          fontSize: "20px",
                        }}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  <Col >
                    <FormGroup>
                      <Label for="email" style={{ fontSize: "20px" }}>
                        Email
                      </Label>
                      <Input
                        type="email"
                        name="email"
                        value={signUpForm.email}
                        style={{
                          fontSize: "20px",
                        }}
                        disabled
                      />
                    </FormGroup>
                  </Col>
                  {
                    showDownloadLink ?
                    <Col>
                      <Button
                        color="info"
                        style={{
                          fontSize: "20px",
                          width: "100%",
                          marginTop:"38px"
                        }}
                        >
                          <Link to={`zips/${signUpForm.slug}.zip`} target="_blank" style={{color:"white",textDecoration:"none"}} download>Download App</Link>
                        </Button>
                    </Col>
                    :
                    null
                  }
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
                <div>
                  {signUpForm.schema &&
                    signUpForm.schema.map((model, modelIndex) => (
                      <div 
                        key={modelIndex} 
                        style={{
                          backgroundColor:"seagreen", 
                          padding:"10px",
                          margin:"10px",
                          borderRadius:"10px"
                        }}
                      >
                        <Row form>
                          <Col md={6}>
                            <FormGroup>
                              <Input
                                type="text"
                                name="name"
                                placeholder="Model Name"
                                value={model.name}
                                onChange={(e) => updateModel(e, modelIndex)}
                                style={{
                                  fontSize: "20px",
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={2}>
                            <FormGroup>
                              <Input
                                type="select"
                                name="isAuth"
                                id="isAuth"
                                style={{
                                  fontSize: "20px",
                                }}
                                onChange={(e) => updateModel(e, modelIndex)}
                              >
                                <option value="isAuth">Is Auth?</option>
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md={2}>
                            <Button
                              color="danger"
                              onClick={() => deleteModel(modelIndex)}
                              style={{
                                fontSize: "20px",
                                width: "100%",
                              }}
                            >
                                Delete Model
                            </Button>
                          </Col>
                          <Col md={2}>
                            <Button
                              color="warning"
                              onClick={(e) => addAttribute(e, modelIndex)}
                              style={{
                                fontSize: "20px",
                                width: "100%",
                              }}
                            >
                              {model.attributes && model.attributes.length
                                ? "Add another attribute"
                                : "Add an attribute"}
                            </Button>
                          </Col>
                        </Row>
                        <div>
                          {model.attributes && model.attributes.map((attribute, attributeIndex) => (
                            <Row form key={attributeIndex}>
                              <Col md={3}>
                                <Input
                                  type="text"
                                  name="name"
                                  value={attribute.name}
                                  onChange = {(e) => updateAttribute(e, modelIndex,attributeIndex)}
                                  placeholder="Attribute Name"
                                  style={{
                                    fontSize: "20px",
                                  }}
                                />
                              </Col>
                              <Col md={3}>
                                <FormGroup>
                                  <Input
                                    type="select"
                                    name="type"
                                    style={{ fontSize: "20px" }}
                                    onChange = {(e) => updateAttribute(e, modelIndex,attributeIndex)}
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
                                    style={{ fontSize: "20px" }}
                                    onChange = {(e) => updateAttribute(e, modelIndex,attributeIndex)}
                                  >
                                    <option value="0">
                                      Select Attribute Ref (if exists)
                                    </option>
                                    {
                                      signUpForm.schema.map((mod,ind)=>
                                      <option key={ind} value={mod.name}>{mod.name}</option>
                                        )
                                    }
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col md={2}>
                                <FormGroup>
                                  <Input
                                    type="select"
                                    name="required"
                                    style={{ fontSize: "20px" }}
                                    onChange = {(e) => updateAttribute(e, modelIndex,attributeIndex)}
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
                                  onClick={()=>deleteAttribute(modelIndex,attributeIndex)}
                                  style={{
                                    fontSize: "20px"
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
                        minWidth: "200px",
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
                      onClick={saveForm}
                      style={{
                        fontSize: "20px",
                        padding: "10px",
                        minWidth: "200px",
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
