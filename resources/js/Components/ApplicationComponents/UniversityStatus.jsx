import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function UniversityStatus() {
  return (
    <>
    <Row>
        <h1>University Status</h1>
    </Row>
    <Row>
        <div key="inline-radio" className='mb-3'>
            <Form.Check
            inline
            label="Undergraduate"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
          />
        </div>
    </Row>
    </>
  )
}
