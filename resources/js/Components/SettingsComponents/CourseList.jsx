import React from "react";
import { useEffect, useState } from "react";
import { Button, Row, Col, ListGroup, Placeholder } from "react-bootstrap";
import CourseLine from "./CourseLine";

export default function CourseList({}) {
    const [allCourses, setAllCourses] = useState(null);
    const [loadedCourses, setLoadedCourses] = useState(false);

    // Fetch all course
    useEffect(() => {
        let options = {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        };
        fetch(`api/courses/all`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return res.json();
            })
            .then((response) => {
                console.log("req data:");
                // console.log(`okay, Scourse Data is: ${JSON.stringify(response)}`);
                if (response.status == "Success") {
                    console.log("setting course data");
                    setAllCourses(response.data);
                    setLoadedCourses(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    let unLoadedLine = (
        <Row className="justify-content-between">
            <Col xs={3}>
                <Placeholder xs={9} />
                <Placeholder xs={12} />
            </Col>
            <Col xs={5}>
                <Placeholder xs={12}>
                    <br></br>
                </Placeholder>
            </Col>
            <Col xs={3} className="d-flex justify-content-end">
                <Placeholder.Button xs={12} aria-hidden="true" />
            </Col>
        </Row>
    );

    const handleCourseDelete = (courseData) => {
        console.log("delete this course");
    };

    let line = (
        <>
            {/* {loadedCourses? allCourses.map((course) => {(<p>course</p>)}) :null} */}
        </>
    );

    return (
        <ListGroup>
            <ListGroup.Item>
                {loadedCourses ? (
                    <CourseLines courseData={allCourses} />
                ) : (
                    unLoadedLine
                )}
                {/* {loadedCourses ? <p>test</p> : unLoadedLine} */}
            </ListGroup.Item>
        </ListGroup>
    );
}

// import React from 'react'
// import { data } from 'autoprefixer';

export function CourseLines({ courseData }) {
    const [allCourses, setAllCourses] = useState(courseData);

    const deleteCourse = (courseData) => {
        if(!(courseData in allCourses))
        {
            console.log("Course not found for deletion");
            return;
        }
        let options = {
            method: "DELETE",
        }
        fetch(`/api/courses/Delete&id=${courseData.course_id}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return res.json();
        })
        .then((response) => {
            console.log("req data:");
            // console.log(`okay, Scourse Data is: ${JSON.stringify(response)}`);
            if (response.status == "Success") {
                console.log("setting course data");
                setAllCourses(response.data);
                setLoadedCourses(true);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    console.log("showing course lines");
    return (
        <>
            {courseData.map((c) => (
                <CourseLine data={c} />
            ))}
        </>
    );
}
