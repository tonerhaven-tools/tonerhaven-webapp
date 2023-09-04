import { Layout, Page } from "@/shared/components";
import SecuredLayout from "@/shared/components/auth/SecuredLayout";
import {
  Alert,
  Button,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
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
      fullName: isAuthenticated ? `${user.given_name} ${user.family_name}` : "",
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
          <Alert>asd</Alert>
          <Form>
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormControl
                isValid={formik.values.email_verified}
                disabled={true}
                value={formik.values.email}
              />
              <FormControl.Feedback type="invalid">
                This email was not verified.
                <Button
                  hidden={email_sent}
                  size="sm"
                  variant="link"
                  onClick={handleResendEmail}
                >
                  Send email verification
                </Button>
              </FormControl.Feedback>

              <FormControl.Feedback type="valid">
                Email verified
              </FormControl.Feedback>
            </FormGroup>

            <FormGroup>
              <FormLabel>First Name</FormLabel>
              <FormControl
                isValid={formik.values.email_verified}
                disabled={true}
                value={formik.values.fullName}
              />
            </FormGroup>
          </Form>
        </ProfileOptionLayout>
      </SecuredLayout>
    </Page>
  );
};

export default Profile;
