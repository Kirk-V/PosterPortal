import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';





export default function RequisitionerDetails({ allowUndergrad = true, serverValidationAttempted, validationFields, formData, handleControlUpdate, departmentList, formSettings }) {
  const [ApplyingForDiscount, setApplyingforDiscount] = useState(false);
  const departments = departmentList;

  const DiscountText = (
    <>
      <p>This printing discount is only available to undergraduate Social Science students enrolled in a pre-approved Social Science course. To activate the discount (${parseFloat(formSettings?.discount).toFixed(2)}), you must enter the correct <strong>Course Number</strong>, correct <strong>Department</strong> and select <strong>Cash</strong>. The discount will be applied to the total cost AFTER the poster has been printed. You will receive an email when the poster is ready to pick up.</p>
    </>

  );

  const ToggleApplyForDiscount = () => {
    setApplyingforDiscount(!ApplyingForDiscount);
  }



  const UnderGradCheckBox = (
    <Row className="mb-3">

      <Form.Group as={Col} md="12" controlId="validationCustomUsername">

        <InputGroup className="mb-3">
          <div><strong className='fs-5 text-primary'> Undergraduate Student -</strong> Paying by Cash?
          <Form.Check
            className="ps-1 pe-1 ms-2 me-1 bg-primary bg-gradient rounded form-check-inline shadow"
            type="checkbox"
            id={`discountText`}
            name="apply_for_discount"
            value={ApplyingForDiscount ? 0 : 1}
            onChange={(e) => { handleControlUpdate(e), ToggleApplyForDiscount() }}
          /><strong>click</strong> to apply for the pre-approved Social Science course discount.
          (Note: discount does not apply to Speedcode payments).
          </div>
        </InputGroup>

      </Form.Group>

      {ApplyingForDiscount ? DiscountText : null}
    </Row>
  );

  const CourseInfo = (
    <Row>
      <Form.Group as={Col} sm="6" controlId="validationCustom01">
        <FloatingLabel
          controlId="floatingInput"
          label="Course Number"
          className="mb-3 text-primary"
        >
          <Form.Control
            required
            type="text"
            name="course_number"
            maxLength="5"
            onChange={handleControlUpdate}
            isInvalid={serverValidationAttempted ? validationFields?.hasOwnProperty('course_number') ?? false ? true : false : false}
            isValid={serverValidationAttempted ? validationFields?.hasOwnProperty('course_number') ?? false ? false : true : false}
            defaultValue={formData?.course_number}
          />
        </FloatingLabel>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} sm="6" controlId="validationCustom03">
        <FloatingLabel
          controlId="floatingInput"
          label="Course Department"
          className="mb-3 text-primary"
        >
          <Form.Select
            aria-label="Department Select"
            name="course_department"
            required
            isInvalid={serverValidationAttempted ? validationFields?.hasOwnProperty('course_department') ?? false ? true : false : false}
            isValid={serverValidationAttempted ? validationFields?.hasOwnProperty('course_department') ?? false ? false : true : false}
            onChange={handleControlUpdate}
            defaultValue="">
            <option value="" disabled hidden></option>
            {departments.map((departmentName) => (
              <option key={departmentName} value={departmentName}>{departmentName}</option>
            ))}
          </Form.Select>
        </FloatingLabel>
      </Form.Group>
    </Row>


  )

  const ExternalReqDepartment = (
    <Form.Group as={Col} sm="6" controlId="externalReqDept">
      <FloatingLabel
        controlId="floatingInput"
        label="Your Department"
        className="mb-3"
      >
        <Form.Control
          required
          type="text"
          name="external_department"
          isInvalid={serverValidationAttempted ? validationFields?.hasOwnProperty('external_department') ?? false ? true : false : false}
          isValid={serverValidationAttempted ? validationFields?.hasOwnProperty('external_department') ?? false ? false : true : false}
          onChange={(e) => handleControlUpdate(e)}
        />
      </FloatingLabel>
    </Form.Group>
  )

  const handleChange = (event) => {
    console.log(event.target.value);
  }

  return (
    <>
      <Row>
        <h1>Requisitioner Details</h1>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} sm="6" controlId="firstName">
          <FloatingLabel
            controlId="floatingFirstName"
            label="First Name"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              name="first_name"
              maxLength="50"
              pattern="[A-Za-z\- ]+"
              isInvalid={serverValidationAttempted ? validationFields?.hasOwnProperty('first_name') ?? false ? true : false : false}
              isValid={serverValidationAttempted ? validationFields?.hasOwnProperty('first_name') ?? false ? false : true : false}
              //If server validation has not occured false. If server validation has occuredcheck for first_name: if first_name exists false, else true
              onChange={(e) => handleControlUpdate(e)}
            />
          </FloatingLabel>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} sm="6" controlId="validationCustom02">
          <FloatingLabel
            controlId="floatingInput"
            label="Last Name"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              name="last_name"
              pattern="[A-Za-z\- ]+"
              isInvalid={serverValidationAttempted ? validationFields?.hasOwnProperty('last_name') ?? false ? true : false : false}
              isValid={serverValidationAttempted ? validationFields?.hasOwnProperty('last_name') ?? false ? false : true : false}
              maxLength="50"
              onChange={(e) => handleControlUpdate(e)}
            />
          </FloatingLabel>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>



      </Row>
      <Row>
        <Form.Group as={Col} sm="6" controlId="validationCustomUsername">
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              required
              type="email"
              name="email"
              pattern="[a-z0-9._%+-]+[@]\buwo\.ca"
              isInvalid={serverValidationAttempted ? validationFields?.hasOwnProperty('email') ?? false ? true : false : false}
              isValid={serverValidationAttempted ? validationFields?.hasOwnProperty('email') ?? false ? false : true : false}
              onChange={(e) => handleControlUpdate(e)}
            />
          </FloatingLabel>
        </Form.Group>
      </Row>



      <Row>

        <Form.Group as={Col} sm="6" controlId="validationCustom03">
          <FloatingLabel
            controlId="floatingInput"
            label="Department"
            className="mb-3"
          >
            <Form.Select
              aria-label="Department Select"
              required
              name="department"
              isInvalid={serverValidationAttempted ? validationFields?.hasOwnProperty('department') ?? false ? true : false : false}
              isValid={serverValidationAttempted ? validationFields?.hasOwnProperty('department') ?? false ? false : true : false}
              onChange={handleControlUpdate}
              defaultValue="">
              <option value="" disabled hidden></option>
              {departments.map((departmentName) => (
                <option key={departmentName} value={departmentName}>{departmentName}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
        {formData?.department == "Other" ? ExternalReqDepartment : null}
      </Row>
      {formSettings?.undergrad == "1" ? UnderGradCheckBox : null}
      {ApplyingForDiscount ? CourseInfo : null}
    </>
  )
}
