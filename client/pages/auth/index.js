import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import React from 'react';
import Link from 'next/link';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { AiOutlineUser } from "react-icons/ai";
import { GrSecure } from "react-icons/gr";
import { cilLockLocked, cilUser } from '@coreui/icons';      

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: (data) => {
      document.cookie = `token=${data.token}; path=/`;
      if (data.role === 'admin') {
        Router.push('/dashboard/adminpage');
      } else if (data.role === 'salesman') {
        Router.push('dashboard/salesman');
      } else {
        Router.push('/');
      }
    }
  });

  const onSubmit = async event => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className="min-vh-100 d-flex flex-row align-items-center" style={{backgroundColor: '#2A303D'}}  >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4" style={{backgroundColor: '#212632'}}>
                <CCardBody>
                  <CForm onSubmit={onSubmit}>
                    <h1 style={{color: "white"}}>Login</h1>
                    <p  style={{color: "rgba(255, 255, 255, 0.6)"}}>Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        {/* <CIcon icon={cilUser} /> */}
                        <AiOutlineUser />
                      </CInputGroupText>
                      <CFormInput 
                        placeholder="Email Address" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="email" 
                        style={{backgroundColor: "#212631",color: "white"}}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        {/* <CIcon icon={cilLockLocked} /> */}
                        <GrSecure />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                        style={{backgroundColor: "#212631",color: "white"}}
                      />
                    </CInputGroup>
                    {errors}
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" style={{ backgroundColor: "rgb(98, 97, 204)" }} className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white py-5" style={{ width: '44%',backgroundColor: "rgb(98, 97, 204)" }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link href="/auth/signup" passHref>
                      <CButton style={{ backgroundColor: "#4e4ea3", color: "white" }} className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Signin;
