import React from 'react'
import { Row, Col, Form, FloatingLabel } from 'react-bootstrap'

// Width isthe bootstrap column width, name is the control name, departments is a listof departments to show
export default function DepartmentsDropDown({width=6, name, departments, onChangeCallBack, invalid, valid}) {
  return (
    <Form.Group as={Col} sm={width} controlId="validationCustom03">
          <FloatingLabel
            controlId="floatingInput"
            label="Course Department"
            className="mb-3"
          >
            <Form.Select
              aria-label="Department Select"
              name={name}
              required
              isInvalid={invalid}
              isValid={valid}
              onChange={(e) => onChangeCallBack(e)}
              defaultValue="">
              <option value="" disabled hidden></option>
              {departments.map((departmentName) => (
                <option key={departmentName} value={departmentName}>{departmentName}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
  )
}
