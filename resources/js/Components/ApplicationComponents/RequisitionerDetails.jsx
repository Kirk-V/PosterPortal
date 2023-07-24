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
      <p>This printing service is only available to Social Science undergraduate students who are enrolled in the Pre-approved courses arranged by the course Professor. We are aware that the Psychology thesis poster presentation is Friday March 24. The undergraduate Social Science student donation discount ($12.00) only applies when funds are available and the correct Pre-approved course number, Department, and Cash payment options are selected. Posters are printed on a first come, first served basis. We will be dedicating our printing service to try and print all posters for this event. Discounts DO NOT apply to speedcode payments.</p>
    </>

  );

  const ToggleApplyForDiscount = () => {
    setApplyingforDiscount(!ApplyingForDiscount);
  }



  const UnderGradCheckBox = (
    <Row className="mb-3">

      <Form.Group as={Col} md="12" controlId="validationCustomUsername">

        <InputGroup className="mb-3">
          <strong> Undergraduate Student -</strong> Paying by Cash?
          <Form.Check
            className="ms-2 me-1 form-check-inline"
            type="checkbox"
            label="Click to apply for the pre-approved course discount."
            id={`discountText`}
            name="apply_for_discount"
            value={ApplyingForDiscount ? 0 : 1}

            onChange={(e) => { handleControlUpdate(e), ToggleApplyForDiscount() }}
          />
          (Note: discount does not apply to Speedcode payments).

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
          className="mb-3"
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
          className="mb-3"
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
        label="Non SSC Department"
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
              pattern="[A-Za-z]+"
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
              pattern="[A-Za-z ]+"
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
        <Form.Group as={Col} sm="8" controlId="validationCustomUsername">
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
        {formData?.department == "Non Social Science Department" ? ExternalReqDepartment : null}
      </Row>
      {formSettings?.undergrad == "1" ? UnderGradCheckBox : null}
      {ApplyingForDiscount ? CourseInfo : null}
    </>
  )
}
