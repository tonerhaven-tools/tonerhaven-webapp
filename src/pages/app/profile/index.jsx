import { Layout, Page } from "@/shared/components";
import SecuredLayout from "@/shared/components/auth/SecuredLayout";
import {
  Alert,
  Button,
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { Form, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import { ResendVerification } from "@/shared/hooks/auth0/methods";
import { useEffect, useState } from "react";
import useOnboarding from "@/shared/hooks/store/useOnboarding";
import Axios from "axios";
import { status } from "nprogress";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [email_sent, setSendEmailState] = useState(false);
  const [new_acct, setNewAcct] = useState(true);

  const { isLoading, isAuthenticated, user } = useAuth0();

  const [data, setData] = useState({
    id: 0,
    first_name: new_acct && user !== undefined ? user.given_name : "",
    last_name: new_acct && user !== undefined ? user.family_name : "",
    address: new_acct && user !== undefined ? "" : "",
    email: new_acct && user !== undefined ? user.email : "",
    company: new_acct && user !== undefined ? "" : "",
    company_phone: new_acct && user !== undefined ? "" : "",
    personal_phone: new_acct && user !== undefined ? "" : "",
    auth_id: new_acct && user !== undefined ? user.sub : "",
  });

  const handleInitialize = () => {
    Axios.get(`/api/profiles/${user.sub}`).then((resp) => {
      if (resp.data !== "") {
        setData(resp.data);
        setNewAcct(false);
      }
    });
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      handleInitialize();
    }
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      first_name: yup.string().required(),
      last_name: yup.string().required(),
      address: yup.string().required(),
      email: yup.string().required(),
      company: yup.string().required(),
      company_phone: yup.string().required(),
      personal_phone: yup.string().required(),
      auth_id: yup.string().required(),
    }),
    initialValues: {
      first_name: data.first_name,
      last_name: data.last_name,
      address: data.address,
      email: data.email,
      company: data.company,
      company_phone: data.company_phone,
      personal_phone: data.personal_phone,
      auth_id: data.auth_id,
    },
    onSubmit: (value) => {
      if (data.id > 0) {
        Axios.put(`/api/profiles/${data.id}`, value).then((resp) => {
          if (resp.status == 204) {
            toast.success("Saved!");
            handleInitialize();
          }
        });
      } else {
        Axios.post("/api/profiles/create", value).then((resp) => {
          if (resp.status == 201) {
            toast.success(
              "Thank you! your details has been successfully submitted"
            );
            handleInitialize();
          }
        });
      }
    },
  });

  const handleResendEmail = () => {
    ResendVerification(user.sub ?? "");
    setSendEmailState(true);
  };

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
                <FormLabel>First Name</FormLabel>
                <FormControl
                  id="first_name"
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                  isInvalid={!!formik.errors.first_name}
                />
                <FormControl.Feedback type="invalid">
                  {formik.errors.first_name}
                </FormControl.Feedback>
              </FormGroup>
            </Col>
            <Col xl={6}>
              <FormGroup>
                <FormLabel>Last Name</FormLabel>
                <FormControl
                  id="last_name"
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                  isInvalid={!!formik.errors.last_name}
                />
                <FormControl.Feedback type="invalid">
                  {formik.errors.last_name}
                </FormControl.Feedback>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup as={Col}>
            <FormLabel>Email</FormLabel>
            <FormControl
              id="email"
              disabled={true}
              value={formik.values.email}
            />
            <FormControl.Feedback type="invalid">
              {email_sent
                ? "The verification email was sent, please check your inbox."
                : "This email was not verified."}
              <Button
                hidden={email_sent}
                size="sm"
                variant="link"
                onClick={handleResendEmail}
              >
                Send email verification
              </Button>
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup>
            <FormLabel>Address</FormLabel>
            <FormControl
              id="address"
              onChange={formik.handleChange}
              value={formik.values.address}
              isInvalid={!!formik.errors.address}
            />
            <FormControl.Feedback type="invalid">
              {formik.errors.address}
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup>
            <FormLabel>Company</FormLabel>
            <FormControl
              id="company"
              onChange={formik.handleChange}
              value={formik.values.company}
              isInvalid={!!formik.errors.company}
            />
            <FormControl.Feedback type="invalid">
              {formik.errors.company}
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup>
            <FormLabel>Company Phone</FormLabel>
            <FormControl
              id="company_phone"
              onChange={formik.handleChange}
              value={formik.values.company_phone}
              isInvalid={!!formik.errors.company_phone}
            />
            <FormControl.Feedback type="invalid">
              {formik.errors.company_phone}
            </FormControl.Feedback>
          </FormGroup>
          <FormGroup>
            <FormLabel>Personal Phone</FormLabel>
            <FormControl
              id="personal_phone"
              onChange={formik.handleChange}
              value={formik.values.personal_phone}
              isInvalid={!!formik.errors.personal_phone}
            />
            <FormControl.Feedback type="invalid">
              {formik.errors.personal_phone}
            </FormControl.Feedback>
          </FormGroup>

          <Button type="submit" className="mt-3">
            Save
          </Button>
        </Form>
      </SecuredLayout>
    </Page>
  );
};

export default Profile;
