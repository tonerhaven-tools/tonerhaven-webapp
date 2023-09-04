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
import { User, useAuth0 } from "@auth0/auth0-react";
import { ResendVerification } from "@/shared/hooks/auth0/methods";
import { useState } from "react";

const Profile = () => {
  const [email_sent, setSendEmailState] = useState(false);

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: isAuthenticated ? user.email : "",
      email_verified: isAuthenticated ? user.email_verified : false,
      given_name: isAuthenticated ? user.given_name : "",
      family_name: isAuthenticated ? user.family_name : "",
      address: isAuthenticated ? user.address : "",
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
          <Form>
            <Row>
              <Col xl={6}>
                <FormGroup>
                  <FormLabel>First Name</FormLabel>
                  <FormControl value={formik.values.given_name} />
                </FormGroup>
              </Col>
              <Col xl={6}>
                <FormGroup>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl value={formik.values.family_name} />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup as={Col}>
              <FormLabel>Email</FormLabel>
              <FormControl
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
              <FormControl value={formik.values.address} />
            </FormGroup>
          </Form>
        </ProfileOptionLayout>
      </SecuredLayout>
    </Page>
  );
};

export default Profile;
