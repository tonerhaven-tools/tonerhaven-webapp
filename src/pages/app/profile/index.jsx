import React, { useEffect, useState } from "react";
import Axios from "axios";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { BehaviorSubject, Subject, Observable, delay } from "rxjs";
import { useAuth0 } from "@auth0/auth0-react";
import { useFormik } from "formik";
import { Layout, Page, SecuredLayout } from "@/shared/components";

import {
  Form,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  FloatingLabel,
} from "react-bootstrap";

const validationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  address: yup.string().required(),
  email: yup.string().required(),
  company: yup.string().required(),
  company_phone: yup.string().required(),
  personal_phone: yup.string().required(),
  auth_id: yup.string().required(),
});

const useFormSubmissionObservable = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const formSubmitSubject = new Subject();

  const formSubmitObservable = new Observable((observer) => {
    formSubmitSubject.pipe(delay(10001)).subscribe((data) => {
      observer.next(data);
    });
  });

  const handleSubmit = (data) => {
    if (data.id > 0) {
      Axios.put(`/api/profiles/${data.id}`, data).then((resp) => {
        if (resp.status === 204) {
          toast.success("Saved!");
        }
      });
    } else {
      Axios.post("/api/profiles/create", data).then((resp) => {
        if (resp.status === 201) {
          toast.success(
            "Thank you! your details have been successfully submitted"
          );
        }
      });
    }
    setFormSubmitted(false);

    // Trigger the form submission event with a data payload
    formSubmitSubject.next(data);
  };

  return {
    handleSubmit,
    formSubmitted,
    formSubmitObservable,
  };
};

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [data, setData] = useState(undefined);
  const dataSubject = new BehaviorSubject(undefined);
  const { handleSubmit, formSubmitted, formSubmitObservable } =
    useFormSubmissionObservable();

  const handleInitialize = () => {
    if (user !== undefined) {
      Axios.get(`/api/profiles/${user.sub}`).then((resp) => {
        if (resp.data !== "") {
          setData(resp.data);
        }
      });
    }
  };

  useEffect(() => {
    handleInitialize();
  }, [isAuthenticated]);

  useEffect(() => {
    const subscription = dataSubject.subscribe((newValue) => {
      setData(newValue);
    });

    return () => {
      subscription.unsubscribe(); // Clean up the subscription when the component unmounts
    };
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: {
      id: data !== undefined ? data.id : 0,
      first_name: data !== undefined ? data.first_name : user?.given_name ?? "",
      last_name: data !== undefined ? data.last_name : user?.last_name ?? "",
      address: data !== undefined ? data.address : user?.address ?? "",
      email: data !== undefined ? data.email : user?.email ?? "",
      company: data !== undefined ? data.company : "",
      company_phone: data !== undefined ? data.company_phone : "",
      personal_phone:
        data !== undefined ? data.personal_phone : user?.personal_phone ?? "",
      auth_id: data !== undefined ? data.auth_id : user?.sub ?? "",
    },
    onSubmit: (value) => {
      handleSubmit(value);
    },
  });

  return (
    <Page title={"Toner Haven | My Profile"}>
      <SecuredLayout>
        <h2>
          <strong>Manage Profile</strong>
        </h2>
        <hr />
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Row>
            <Col xl={6}>
              <FormGroup>
                <FloatingLabel className="mt-3 mb-3" label="First Name">
                  <FormControl
                    id="first_name"
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                    isInvalid={!!formik.errors.first_name}
                  />
                  <FormControl.Feedback type="invalid">
                    {formik.errors.first_name}
                  </FormControl.Feedback>
                </FloatingLabel>
              </FormGroup>
            </Col>
            <Col xl={6}>
              <FormGroup>
                <FloatingLabel className="mt-3 mb-3" label="Last Name">
                  <FormControl
                    id="last_name"
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                    isInvalid={!!formik.errors.last_name}
                  />
                  <FormControl.Feedback type="invalid">
                    {formik.errors.last_name}
                  </FormControl.Feedback>
                </FloatingLabel>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <FloatingLabel className="mt-3 mb-3" label="Personal Phone">
              <FormControl
                id="personal_phone"
                onChange={formik.handleChange}
                value={formik.values.personal_phone}
                isInvalid={!!formik.errors.personal_phone}
              />
              <FormControl.Feedback type="invalid">
                {formik.errors.personal_phone}
              </FormControl.Feedback>
            </FloatingLabel>
          </FormGroup>
          <FormGroup as={Col}>
            <FloatingLabel className="mt-3 mb-3" label="Email">
              <FormControl
                id="email"
                disabled={true}
                value={formik.values.email}
              />
            </FloatingLabel>
          </FormGroup>

          <FormGroup>
            <FloatingLabel className="mt-3 mb-3" label="Company">
              <FormControl
                id="company"
                onChange={formik.handleChange}
                value={formik.values.company}
                isInvalid={!!formik.errors.company}
              />
              <FormControl.Feedback type="invalid">
                {formik.errors.company}
              </FormControl.Feedback>
            </FloatingLabel>
          </FormGroup>
          <FormGroup>
            <FloatingLabel className="mt-3 mb-3" label="Company Phone">
              <FormControl
                id="company_phone"
                onChange={formik.handleChange}
                value={formik.values.company_phone}
                isInvalid={!!formik.errors.company_phone}
              />
              <FormControl.Feedback type="invalid">
                {formik.errors.company_phone}
              </FormControl.Feedback>
            </FloatingLabel>
          </FormGroup>

          <FormGroup>
            <FloatingLabel className="mt-3 mb-3" label="Address">
              <FormControl
                style={{ height: "100px" }}
                id="address"
                as="textarea"
                onChange={formik.handleChange}
                value={formik.values.address}
                isInvalid={!!formik.errors.address}
              />
              <FormControl.Feedback type="invalid">
                {formik.errors.address}
              </FormControl.Feedback>
            </FloatingLabel>
          </FormGroup>

          <div className="mt-3 align-right">
            <Button disabled={formSubmitted} type="submit">
              Save
            </Button>
          </div>
        </Form>
      </SecuredLayout>
    </Page>
  );
};

export default Profile;
