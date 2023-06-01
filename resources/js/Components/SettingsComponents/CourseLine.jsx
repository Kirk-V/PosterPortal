import React from 'react'
import { useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap';


export default function CourseLine({data, handleDelete}) {
    const [courseData, setCourseData] = useState(data);

    return (
        <Row className="justify-content-between p-1 border-bottom">
            <Col xs={3}>
                {courseData.year}
                {courseData.number}
            </Col>
            <Col xs={5}>
                {courseData.department}
            </Col>
            <Col xs={3} className="d-flex justify-content-end">
                <Button variant={"danger"} onClick={(e) => handleDelete(courseData)}>Delete</Button>
            </Col>
        </Row>
    )
}
