import { React, useState } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Fade from "react-bootstrap/Fade";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export default function OptionsBar({ parentOptions, handleOptionsUpdate, getPosters, BudgetYears }) {

    console.log("options bar: "+JSON.stringify(parentOptions));

    
    return (
        <Row> 
            <Col xs="4">
                {/* start date */}
                <InputGroup>
                    <Form.Group>
                        <Form.Label>
                            Start
                        </Form.Label>
                        <Form.Control
                            placeholder="start"
                            required
                            type="date"
                            name="start_date"
                            value={parentOptions?.start_date ?? null}
                            onChange={(e) => handleOptionsUpdate(e)}>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            End
                        </Form.Label>
                        <Form.Control
                            required
                            type="date"
                            name="end_date"
                            value={parentOptions?.end_date ?? null}
                            onChange={(e) => handleOptionsUpdate(e)}>
                        </Form.Control>
                    </Form.Group>
                </InputGroup>


            </Col>
            <Col xs="2">
                {/* Type */}
                <Form.Label>
                    Budget Year
                </Form.Label>
                <Form.Select
                    name="budget_year"
                    value={parentOptions?.budget_year}
                    onChange={(e) => handleOptionsUpdate(e)}>
                    {BudgetYears.map((year, i) => {
                        return <option key={year} value={year}>{year}/{year-1}</option>
                    })}
                </Form.Select>
            </Col>
            <Col xs="2">
                {/* Type */}
                <Form.Label>
                    Payment Type
                </Form.Label>
                <Form.Select
                    name="payment_type"
                    defaultValue={parentOptions?.payment_type ?? null}
                    onChange={(e) => handleOptionsUpdate(e)}>
                    <option value="SDF">SDF</option>
                    <option value="CASH">Cash</option>
                    <option value="SPEED">Speed Code</option>
                    <option value="All">All</option>
                </Form.Select>
            </Col>
            <Col className="align-self-end">
                <Button onClick={getPosters}>Go!</Button>
            </Col>
            <Col xs="2" className="ms-auto">
                {/* Type */}
                <Form.Label>
                    Search Posters
                </Form.Label>
                <Form.Control
                    name="poster_id"
                    type="number"
                    defaultValue={parentOptions?.poster_id ?? null}
                    onChange={(e) => handleOptionsUpdate(e)}>
                    
                </Form.Control>
            </Col>
        </Row>
    )
}
