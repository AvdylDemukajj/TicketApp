import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { AiOutlineUser } from 'react-icons/ai'
import { GrSecure } from 'react-icons/gr'

const index = () => {
  return (
    <div className="min-vh-100 d-flex flex-row align-items-center" style={{backgroundColor: '#2A303D'}}>
      <CContainer>
        <CRow className="justify-content-center" >
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody style={{backgroundColor: '#2A303D'}} className="p-4">
                <CForm>
                  <h1 style={{color: "white"}}>Register</h1>
                  <p style={{color: "rgba(255, 255, 255, 0.6)"}}>Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      {/* <CIcon icon={cilUser} /> */}
                      <AiOutlineUser />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      {/* <CIcon icon={cilLockLocked} /> */}
                      <GrSecure />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      {/* <CIcon icon={cilLockLocked} /> */}
                      <GrSecure />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success">Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default index
