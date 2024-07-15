import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../config/axiosConfig.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const ForgetPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("users/forgetPassword", values)
        .then((response) => {
          toast.success("Email sent successfully");
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            toast.error("Email not found");
          } else {
            toast.error("Server error");
          }
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
          Forgot Password
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%", mt: 1 }}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            variant="outlined"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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

export default ForgetPassword;
