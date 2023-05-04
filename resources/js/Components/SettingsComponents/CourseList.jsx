import React from 'react'
import { useEffect, useState } from 'react';
import { Button, Row, Col, ListGroup, Placeholder } from 'react-bootstrap';
export default function CourseList({ }) {
    const [allCourses, setAllCourses] = useState(null);

    // Fetch all course
    useEffect(() => {
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        }
        fetch(`api/courses/all`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return res.json();
            })
            .then((response) => {
                console.log("req data:");
                console.log(`okay, Scourse Data is: ${JSON.stringify(response)}`);
                if (response.status == "success") {
                    setCourseData(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <ListGroup>
            <ListGroup.Item>
                <Row>
                    <Col>
                        <Placeholder as="p" animation="glow">
                            <Placeholder as="p" animation="glow" xs={12} />
                        </Placeholder>
                    </Col>
                    <Col>
                    <Placeholder as="p" animation="glow">
                            <Placeholder xs={12} />
                        </Placeholder>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={12}/>
                        </Placeholder>
                        {/* <Button variant="danger">del</Button> */}
                    </Col>
                </Row>
            </ListGroup.Item>
        </ListGroup>
    )
}
