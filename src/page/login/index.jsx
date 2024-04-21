import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Navbar from "../../components/navbar";
import styles from "../../assets/css/styles.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const { email, password } = values;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken(); // Get user token
      
      // Store token in local storage
      localStorage.setItem('authToken', token);

      navigate('/create-product');
    } catch (error) {
      setErrorMessage("Failed to Login. Please check your email and password");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles['body']}>
      <Navbar />
      <div className="container mt-3 ps-5">
        <div className="row">
          <div className="col-md-6">
            <h1 className="fs-3 fw-bold pt-5 mt-3">WELCOME BACK!</h1>
            <h3 className="fs-6 mt-3">
              Don't have an account? 
              <Link to="/register" className="text-decoration-none">
                <span className="text-primary ps-1">Register</span>
              </Link>
            </h3>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="needs-validation mt-5 pt-2">
                  <div className="row">
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
                    <div className="col-12 text-danger mt-2">{errorMessage}</div>
                    <div className="">
                      <button type="submit" className="btn btn-primary btn-create mt-4" style={{ width: ' 418px' }} disabled={isSubmitting}>Log In</button>
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
  )
}
