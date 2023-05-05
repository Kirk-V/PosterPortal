import React from 'react'
import { useEffect, useState } from 'react';
import { Button, Row, Col, ListGroup, Placeholder } from 'react-bootstrap';
export default function CourseList({ }) {
    const [allCourses, setAllCourses] = useState(null);
    const [loadedCourses, setLoadedCourses] = useState(false);

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

    let unLoadedLine = (
        <Row className="justify-content-between">
            <Col xs={3}>
                <Placeholder xs={9}/>
                <Placeholder xs={12}/>
            </Col>
            <Col xs={5}>
                <Placeholder xs={12}><br></br></Placeholder>
            </Col>
            <Col xs={3} className="d-flex justify-content-end">
                <Placeholder.Button xs={12} aria-hidden="true" />
            </Col>
        </Row>
    )

    const handleCourseDelete = (courseData) =>
    {
        console.log("delete this course")
    }

    let line = (
        <Row className="justify-content-between">
        <Col xs={3}>
            <Placeholder xs={9}/>
            <Placeholder xs={12}/>
        </Col>
        <Col xs={5}>
            <Placeholder xs={12}><br></br></Placeholder>
        </Col>
            <Col xs={3} className="d-flex justify-content-end">
                <Placeholder.Button xs={12} aria-hidden="true" />
            </Col>
        </Row>
    )

    let loadedLines =
    (
        <>
            {allCourses.map()}
        </>

    )

    return (
        <ListGroup>
            <ListGroup.Item>
                {loadedCourses ? null : unLoadedLine}

            </ListGroup.Item>
        </ListGroup>
    )
}
