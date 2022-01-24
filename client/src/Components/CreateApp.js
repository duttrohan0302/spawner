import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { setAlert } from "../Actions/alertActions";
import slugify from "../Utils/slugify";

import store from "../Helpers/store";
import axios from "axios";
import { Link } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const CreateApp = (props) => {
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    slug: "",
    email: "",
    password: "",
    schema: [],
  });
  const [showDownloadLink, setShowDownloadLink] = useState(false);

  const [loading, setLoading] = useState(false);
  const [appCreated, setAppCreated] = useState(false);
  const checkBasicsFilled = () => {
    console.log(signUpForm);
    console.log(!signUpForm.password);
    if (
      signUpForm.name &&
      signUpForm.slug &&
      signUpForm.email &&
      signUpForm.password
    ) {
      return true;
    } else {
      return false;
    }
  };
  const saveForm = async () => {
    let form = signUpForm;
    setLoading(true);
    form.schema.map((model) => {
      if (model.name) {
        if (!model.isAuth || model.isAuth === "isAuth") {
          model.isAuth = false;
        }
        model.attributes.map((attribute) => {
          if (attribute.name) {
            if (!attribute.type || attribute.type === "0") {
              attribute.type = "String";
            }
            if (!attribute.ref || attribute.ref === "0") {
              attribute.ref = null;
            }
            if (!attribute.required || attribute.required === "0") {
              attribute.required = false;
            }
            return attribute;
          }
          return null;
        });
        return model;
      }

      return null;
    });
    console.log(form);
    setSignUpForm(form);
    try {
      const data = await axios.post("/app", form);

      if (data.data) {
        setLoading(false);
        setShowDownloadLink(true);
        window.scrollTo(0, 0);
        setAppCreated(true);
        store.dispatch(
          setAlert(
            "Your backend app has been created successfully. Click on the download button to get it now.",
            "success"
          )
        );
      }
    } catch (err) {
      setLoading(false);
      window.scrollTo(0, 0);
      if (err.response.status === 409) {
        store.dispatch(setAlert(err.response.data.slug, "danger", 4000));
      } else {
        store.dispatch(
          setAlert("An error occurred. Please try again.", "danger", 4000)
        );
      }
    }
  };

  const addModel = (e) => {
    e.preventDefault();

    if (checkBasicsFilled()) {
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
    } else {
      store.dispatch(
        setAlert("Please enter basic app credentials first", "danger", 3000)
      );
    }
  };

  const updateModel = (e, index) => {
    e.preventDefault();
    const tempSchema = signUpForm.schema;
    tempSchema[index][e.target.name] = e.target.value;
    setSignUpForm({ ...signUpForm, schema: tempSchema });
  };

  const updateAttribute = (e, modelIndex, attributeIndex) => {
    e.preventDefault();
    const tempSchema = signUpForm.schema;
    tempSchema[modelIndex].attributes[attributeIndex][e.target.name] =
      e.target.value;
    setSignUpForm({ ...signUpForm, schema: tempSchema });
  };

  const deleteModel = (modelIndex) => {
    let tempSchema = signUpForm.schema;
    tempSchema.splice(modelIndex, 1);
    setSignUpForm({ ...signUpForm, schema: tempSchema });
  };
  const deleteAttribute = (modelIndex, attributeIndex) => {
    let tempSchema = signUpForm.schema;
    tempSchema[modelIndex].attributes.splice(attributeIndex, 1);
    setSignUpForm({ ...signUpForm, schema: tempSchema });
  };
  const addAttribute = (e, modelIndex) => {
    e.preventDefault();

    const tempSchema = signUpForm.schema;
    if (!tempSchema[modelIndex].name) {
      window.scroll(0, 0);
      store.dispatch(setAlert("Please enter model name first", "danger", 3000));
    } else {
      if (!tempSchema[modelIndex].attributes) {
        tempSchema[modelIndex].attributes = [];
      }
      tempSchema[modelIndex].attributes.push({
        name: "",
        type: "",
        ref: "",
        required: "",
      });

      setSignUpForm({ ...signUpForm, schema: tempSchema });
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#B23CFD",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <div className="display-3">
        <center>
          Create your application...
          {showDownloadLink ? (
            <Button
              className="float float-right"
              style={{
                backgroundColor: "#fff",
                fontSize: "20px",
              }}
            >
              <Link
                to={`zips/${signUpForm.slug}.zip`}
                target="_blank"
                style={{
                  color: "black",
                  textDecoration: "none",
                  display: "inline-block",
                }}
                download
              >
                Download App
              </Link>
            </Button>
          ) : null}
        </center>
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
              // backgroundColor: "#00B74A",
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
              padding: "20px",
            }}
          >
            <div className="signup-form">
              <Form>
                <Row form>
                  <Col>
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
                        onChange={(e) =>
                          setSignUpForm({
                            ...signUpForm,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col>
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
                        autoComplete="off"
                        onChange={(e) =>
                          setSignUpForm({
                            ...signUpForm,
                            [e.target.name]: slugify(e.target.value),
                          })
                        }
                      />
                      {signUpForm.slug ? (
                        <Label>Your slug is {slugify(signUpForm.slug)}</Label>
                      ) : null}
                    </FormGroup>
                  </Col>
                  <Col>
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
                        onChange={(e) =>
                          setSignUpForm({
                            ...signUpForm,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="password" style={{ fontSize: "20px" }}>
                        Password
                      </Label>
                      <Input
                        type="password"
                        name="password"
                        value={signUpForm.password}
                        style={{
                          fontSize: "20px",
                        }}
                        onChange={(e) =>
                          setSignUpForm({
                            ...signUpForm,
                            [e.target.name]: e.target.value,
                          })
                        }
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
                        width: "50%",
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
                          backgroundColor: "#666699",
                          padding: "10px",
                          marginBottom: "10px",
                          borderRadius: "10px",
                        }}
                      >
                        <Row form style={{ marginBottom: "10px" }}>
                          <Col md={3}>
                            <div
                              style={{
                                fontSize: "30px",
                                display: "flex",
                                color: "white",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              Model #{modelIndex + 1}
                            </div>
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
                          <Col md={3}>
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
                              color="warning"
                              onClick={(e) => addAttribute(e, modelIndex)}
                              style={{
                                fontSize: "20px",
                                width: "100%",
                              }}
                            >
                              Add Attribute
                              {/* {model.attributes && model.attributes.length
                                ? "Add another attribute"
                                : "Add an attribute"} */}
                            </Button>
                          </Col>
                        </Row>
                        <div>
                          {model.attributes &&
                            model.attributes.map(
                              (attribute, attributeIndex) => (
                                <Row
                                  form
                                  key={attributeIndex}
                                  style={{ marginTop: "20px" }}
                                >
                                  <Col md={3}>
                                    <Input
                                      type="text"
                                      name="name"
                                      value={attribute.name}
                                      onChange={(e) =>
                                        updateAttribute(
                                          e,
                                          modelIndex,
                                          attributeIndex
                                        )
                                      }
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
                                        onChange={(e) =>
                                          updateAttribute(
                                            e,
                                            modelIndex,
                                            attributeIndex
                                          )
                                        }
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
                                        <option value="ObjectId">
                                          ObjectId
                                        </option>
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
                                        onChange={(e) =>
                                          updateAttribute(
                                            e,
                                            modelIndex,
                                            attributeIndex
                                          )
                                        }
                                      >
                                        <option value="0">
                                          Select Attribute Ref (if exists)
                                        </option>
                                        {signUpForm.schema.map((mod, ind) => {
                                          if (mod.name)
                                            return (
                                              <option
                                                key={ind}
                                                value={mod.name}
                                              >
                                                {mod.name}
                                              </option>
                                            );
                                          else return null;
                                        })}
                                      </Input>
                                    </FormGroup>
                                  </Col>
                                  <Col md={2}>
                                    <FormGroup>
                                      <Input
                                        type="select"
                                        name="required"
                                        style={{ fontSize: "20px" }}
                                        onChange={(e) =>
                                          updateAttribute(
                                            e,
                                            modelIndex,
                                            attributeIndex
                                          )
                                        }
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
                                      onClick={() =>
                                        deleteAttribute(
                                          modelIndex,
                                          attributeIndex
                                        )
                                      }
                                      style={{
                                        fontSize: "20px",
                                        width: "100%",
                                      }}
                                    >
                                      Remove
                                    </Button>
                                  </Col>
                                </Row>
                              )
                            )}
                        </div>
                      </div>
                    ))}
                </div>
                <div
                  style={{ marginTop: "10px" }}
                  className="float float-right"
                >
                  <span className="float float-right">
                    {loading ? (
                      <MutatingDots
                        ariaLabel="loading-indicator"
                        color="yellow"
                      />
                    ) : (
                      <Button
                        color="success"
                        onClick={saveForm}
                        style={{
                          fontSize: "20px",
                          padding: "10px",
                          minWidth: "200px",
                          borderTopRightRadius: "20px",
                          borderBottomRightRadius: "20px",
                        }}
                        disabled={appCreated}
                      >
                        {appCreated ? "Saved" : "Save"}
                      </Button>
                    )}
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
