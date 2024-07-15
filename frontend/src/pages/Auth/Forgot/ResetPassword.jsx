import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../config/axiosConfig.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const ResetPassword = () => {
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Required").min(6, "Too Short!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const { newPassword } = values;
      const token = window.location.pathname.split("/").pop();

      axios
        .post(`users/reset-password/${token}`, { newPassword })
        .then((response) => {
          toast.success(response.data.message);
          setTimeout(() => {
            window.location.href = "/signin";
          }, 3000);
        })
        .catch((error) => {
          toast.error("Your link has expired");
        });
    },
  });

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%", mt: 1 }}>
          <TextField
            fullWidth
            id="newPassword"
            name="newPassword"
            label="New Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPassword;
