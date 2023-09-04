import { Layout, Page } from "@/shared/components";
import SecuredLayout from "@/shared/components/auth/SecuredLayout";
import { Container, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import ProfileOptionLayout from "../ProfileOptionLayout";
import { Form } from "react-router-dom";
import { useFormik } from "formik";
import { User, useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: isAuthenticated ? user.email : "",
      email_verified: isAuthenticated ? user.email_verified : false,
      fullName: isAuthenticated ? `${user.given_name} ${user.family_name}` : "",
    },
  });
  return (
    <Page title={"Toner Haven | My Profile"}>
      <SecuredLayout>
        <ProfileOptionLayout>
          <Form>
            <FormGroup>
              <FormLabel>Email {user.sub}</FormLabel>
              <FormControl
                isValid={formik.values.email_verified}
                disabled={true}
                value={formik.values.email}
              />
              <FormControl.Feedback type="invalid">
                This email was not verified, Please check your email
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
