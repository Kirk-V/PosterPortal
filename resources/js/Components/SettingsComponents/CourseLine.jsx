import React from 'react'
import { useState } from 'react'
import { Button } from 'react-bootstrap';

export default function CourseLine({data}) {
    const [courseData, setCourseData] = useState(data);

    const handleDataUpdate = (e) =>
    {

    }

    return (
        <Row className="justify-content-between">
            <Col xs={3}>
                {courseData.year}
                {courseData.number}
            </Col>
            <Col xs={5}>
                {courseData.department}
            </Col>
            <Col xs={3} className="d-flex justify-content-end">
                <Button>Delete</Button>
            </Col>
        </Row>
    )
}
