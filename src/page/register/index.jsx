import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Navbar from "../../components/navbar";
import styles from "../../assets/css/styles.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'First name must be at least 3 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(3, 'Last name must be at least 3 characters')
    .required('Last name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const { email, password } = values;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken(); // Mendapatkan token dari user
      // Simpan token di localStorage
      localStorage.setItem('authToken', token);
      // Redirect ke halaman pembuatan produk setelah registrasi berhasil
      navigate('/create-product');
    } catch (error) {
      console.error("Error during registration:", error);
      // Set pesan kesalahan jika registrasi gagal karena kesalahan
      setErrorMessage("Gagal mendaftar. Silakan coba lagi nanti.");
    } finally {
      // Pastikan untuk mengatur submitting menjadi false terlepas dari hasilnya
      setSubmitting(false);
    }
  };

  return (
    <div className={styles['body']}>
      <Navbar />
      <div className="container mt-4 ps-5">
        <div className="row">
          <div className="col-md-6">
            <h1 className="fs-3 fw-bold ">WELCOME!</h1>
            <h3 className="fs-6 mt-3">
              Have an account? 
              <Link to="/login" className="text-decoration-none">
                <span className="text-primary ps-1">Log In</span>
              </Link>
            </h3>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="needs-validation mt-4">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <Field type="text" name="firstName" className={`form-control ${errors.firstName && touched.firstName ? 'is-invalid' : ''}`} />
                        <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <Field type="text" name="lastName" className={`form-control ${errors.lastName && touched.lastName ? 'is-invalid' : ''}`} />
                        <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                      </div>
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="username" className="form-label">Username</label>
                      <Field type="text" name="username" className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`} style={{ width: '418px' }} />
                      <ErrorMessage name="username" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="email" className="form-label">Email</label>
                      <Field type="email" name="email" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} style={{ width: '418px' }} />
                      <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="password" className="form-label">Password</label>
                      <Field type="password" name="password" className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`} style={{ width: '418px' }} />
                      <ErrorMessage name="password" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <Field type="password" name="confirmPassword" className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`} style={{ width: '418px' }} />
                      <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                    </div>
                    <div className="col-12 text-danger mt-2">{errorMessage}</div>
                    <div className="">
                      <button type="submit" className="btn btn-primary btn-create mt-4" style={{ width: ' 418px' }} disabled={isSubmitting}>Register</button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="col-md-6">
            <img src="https://i.ibb.co/Hp4mz8X/logo.png" alt="logo" border="0" />
          </div>
        </div>
      </div>
    </div>
  );
}
