import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import DocsExample from './formBase'

import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/root-reducer";
import { getDistrictAction } from "../../../store/modules/partials/district"
import { getCatListAction } from '../../../store/modules/partials/categories';
import {getMuniciapilityListAction} from '../../../store/modules/partials/getmunicapality';

const CustomStyles = () => {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event:any) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  const [hasPromo, setHasPromo] = useState(false);
  const onChangeCheckBox = (e:any) => {
    setHasPromo(e.target.checked);
  };

  // the promo code input field value and the onChange method
  const [promo, setPromo] = useState("");
  const onChangePromo = (e:any) => {
    setPromo(e.target.value);
  };

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch<any>(getDistrictAction())
    dispatch<any>(getCatListAction())

  }, [])
  const district = useSelector(
    (state: RootState) => state.getDistrictReducer.data
  );

  const catList= useSelector(
    (state:RootState) => state.getCatListReducer.data
  )

  const HandleMunicipality = (event:any) => {
    const id = event.target.value
    React.useEffect(() => {
      dispatch<any>(getMuniciapilityListAction(id))
  
    }, []) 

    const muniList  = useSelector(
      (state:RootState) => state.getMuniciapilityReducer.data
    )
    console.log(muniList, "----------------");
    
  }




  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={3}>
        <CFormLabel htmlFor="validationCustom01">User Address</CFormLabel>
        <CFormInput type="text" id="validationCustom01" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="validationCustom02">Pet Name</CFormLabel>
        <CFormInput type="text" id="validationCustom02" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="validationCustomUsername">Pet Age</CFormLabel>
        <CInputGroup className="has-validation">
          <CFormInput
            type="text"
            id="validationCustomUsername"
            defaultValue=""
            aria-describedby="inputGroupPrepend"
            required
          />
          <CFormFeedback invalid>Please choose a username.</CFormFeedback>
        </CInputGroup>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="validationCustomUsername">Gender</CFormLabel>
        <CFormSelect id="validationCustom04">
          <option disabled>Choose...</option>
          <option value={"Male"}>Male</option>
          <option value={"Female"}>Female</option>
          <option value={"Other"}>Other</option>
        </CFormSelect>
        <CFormFeedback invalid>Please choose one value.</CFormFeedback>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom03">Description</CFormLabel>
        <CFormInput type="textarea" id="validationCustom03" required />
        <CFormFeedback invalid>required field.</CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="validationCustom03">Price</CFormLabel>
        <CFormInput type="number" id="validationCustom04" required />
        <CFormFeedback invalid>required field.</CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="validationCustom07">Discount</CFormLabel>
        <CFormInput type="number" id="validationCustom07" required />
        <CFormFeedback invalid>required field.</CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="validationCustom05">District</CFormLabel>
        <CFormSelect id="validationCustom05" onClick={HandleMunicipality}>
          <option>Choose...</option>
          {district && district.map((item, id) =>(
              <option value={item.id} key={id}>{item.district}</option>
          ))}
        </CFormSelect>
        <CFormFeedback invalid>Please provide a  District.</CFormFeedback>
      </CCol>


     <CCol md={3}>
        <CFormLabel htmlFor="validationCustom05">Municiapality</CFormLabel>
        <CFormSelect id="validationCustom05">
          <option>Choose...</option>
        </CFormSelect>
        <CFormFeedback invalid>Please provide a Municiapality.</CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="validationCustom05">Cartegory</CFormLabel>
        <CFormSelect id="validationCustom05">
          <option>Choose...</option>
          {catList && catList.map((item, id) => (
              <option value={item.id} key={id}>{item.name}</option>
          ) )}
        </CFormSelect>
        <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="validationCustom05">Breed</CFormLabel>
        <CFormSelect id="validationCustom05">
          <option disabled>Choose...</option>
          <option>...</option>
        </CFormSelect>
        <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
      </CCol>


      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom06">Image1</CFormLabel>
        <CFormInput type="file" id="validationCustom06" required />
        <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom06">Image2</CFormLabel>
        <CFormInput type="file" id="validationCustom06"  />
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom06">Image3</CFormLabel>
        <CFormInput type="file" id="validationCustom06"  />
      </CCol>

      <CCol md={2}>
        <CFormCheck
         type="checkbox"
         id="invalidCheck"
         label="Is Give Milk"
            checked={hasPromo}
            onChange={onChangeCheckBox}
        />
        <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
      </CCol>
      {hasPromo && (
        //   <input type="text"  />
        <CCol md={3}>
        <CFormLabel htmlFor="validationCustom03">Milk Value</CFormLabel>
        <CFormInput type="number" id="validationCustom04"value={promo} onChange={onChangePromo} required />
        <CFormFeedback invalid>required field.</CFormFeedback>
      </CCol>
        )}
      
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Submit form
        </CButton>
      </CCol>
    </CForm>
  )
}



const CreatePost = () => {
    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Validation</strong> <small>Custom styles</small>
            </CCardHeader>
            <CCardBody>
              <h5>Create Your New Post</h5>
              <hr />
              <DocsExample href="forms/validation">{CustomStyles()}</DocsExample>
            </CCardBody>
          </CCard>
        </CCol>
       
      </CRow>
    )
  }
  
  export default CreatePost
  