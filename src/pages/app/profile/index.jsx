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
import ProfileOptionLayout from "../ProfileOptionLayout";
import { Form, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import { ResendVerification } from "@/shared/hooks/auth0/methods";
import { useState } from "react";

const schema = yup.object().shape({
  given_name: yup.string().required(),
  family_name: yup.string().required(),
  username: yup.string().required(),
  address: yup.string().required(),
  contact_number: yup.string().required(),
  email: yup.string().required(),
});

const Profile = () => {
  const [email_sent, setSendEmailState] = useState(false);

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: schema,
    initialValues: {
      email: isAuthenticated ? user.email : "",
      email_verified: isAuthenticated ? user.email_verified : false,
      given_name: isAuthenticated ? user.given_name : "",
      family_name: isAuthenticated ? user.family_name : "",
      address: isAuthenticated ? user.address : "",
      contact_number: isAuthenticated ? user.phone_number : "",
    },
  });

  const handleResendEmail = () => {
    ResendVerification(user.sub ?? "");
    setSendEmailState(true);
  };

  return (
    <Page title={"Toner Haven | My Profile"}>
      <SecuredLayout>
        <ProfileOptionLayout>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col xl={6}>
                <FormGroup>
                  <FormLabel>First Name</FormLabel>
                  <FormControl
                    id="given_name"
                    onChange={formik.handleChange}
                    value={formik.values.given_name}
                    isInvalid={!!formik.errors.given_name}
                  />
                  <FormControl.Feedback type="invalid">
                    {formik.errors.given_name}
                  </FormControl.Feedback>
                </FormGroup>
              </Col>
              <Col xl={6}>
                <FormGroup>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl
                    id="family_name"
                    onChange={formik.handleChange}
                    value={formik.values.family_name}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup as={Col}>
              <FormLabel>Email</FormLabel>
              <FormControl
                id="email"
                isInvalid={!formik.values.email_verified}
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
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Contact Number</FormLabel>
              <FormControl
                id="contact_number"
                onChange={formik.handleChange}
                value={formik.values.contact_number}
              />
            </FormGroup>
            <Button type="submit" className="mt-3">
              Save
            </Button>
          </Form>
        </ProfileOptionLayout>
      </SecuredLayout>
    </Page>
  );
};

export default Profile;
