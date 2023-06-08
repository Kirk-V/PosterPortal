import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { CurrencyDollar } from 'react-bootstrap-icons';

export default function PosterFile() {
  const [posterFileType, setPosterFileType] = useState(null);

  const HandleFileTypeChange = (e) => {
    let radio = e.target;
    console.log("changing file type to "+ radio.value);
    setPosterFileType(radio.value)
  }

  const EmailSecton = (
    <Row>
      <p className="lead">After submitting this form, you will be emailed a request for a poster file(s) along with further instructions. Please reply to this email with your poster file attached.</p>
    </Row>
  )

  const OneDriveSection = (
    <>
    <Row>
      <p>Please provide a oneDrive link to your Shared Poster File</p>
    </Row>
    <Row>
    <Form.Group as={Col} sm="6" controlId="validationCustom01">
          <FloatingLabel
            controlId="floatingInput"
            label="oneDrive link"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              name="one_drive_link"
            />
          </FloatingLabel>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
    </Row>
    <Row>
      <small>Please make file viewable via the shared link. The image should have the same aspect ratio as the provided poster dimensions. Instructions for sharing a file from one drive: <a href="https://support.microsoft.com/en-us/office/share-onedrive-files-and-folders-9fcc2f7d-de0c-4cec-93b0-a82024800c07#:~:text=Share%20by%20using%20%22Copy%20link%22">Sharing Link</a></small>
    </Row>
    </>
  )
  return (
    <>
      <Row>
        <h1>Poster File</h1>
      </Row>
      <Row>
        <p>Your <strong>PDF or PowerPoint</strong> poster file can be shared using a oneDrive link or via email. Please select an option and follow the instructions that appear.</p>
      </Row>
      <Row className="mt-2 mb-2">
        <Col sm="3">
          <Form.Check
            inline
            required
            label="OneDrive"
            name="poster_file"
            type="radio"
            id="poster_file_one_drive"
            value="oneDrive"
            onChange={HandleFileTypeChange}
          />
        </Col>
        <Col sm="3">
          <Form.Check
            inline
            required
            label="Email"
            name="poster_file"
            type="radio"
            id="poster_file_email"
            value="email"
            onChange={HandleFileTypeChange}
          />
        </Col>
      </Row>
      {posterFileType == "oneDrive"? OneDriveSection: posterFileType == "email"? EmailSecton : null}
    </>
  )
}
