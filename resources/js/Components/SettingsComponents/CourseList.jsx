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
                console.log("Got Course Data:");
                // console.log(`okay, Scourse Data is: ${JSON.stringify(response)}`);
                if (response.status == "Success") {
                    console.log("setting course data");
                    setAllCourses(response.data);
                    setLoadedCourses(true);
                }
            })
            .catch((error) => {
                console.log(`Got an error retrieving course Data`);
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
        //Get object index if it exists
        let index = allCourses.findIndex(function(course, i){
            return courseData === course
        });
        console.log(index);

        if(!allCourses.some(course => course === courseData))
        {
            console.log("Course not found for deletion "+JSON.stringify(courseData));
            return;
        }
        let options = {
            method: "DELETE",
        }
        fetch(`api/courses/delete?id=${courseData.course_id}`, options)
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
                console.log("Deleted Course");

                let newCourses = [...allCourses];
                newCourses.splice(index, 1);
                setAllCourses(newCourses);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    console.log("showing course lines");
    return (
        <>
            {allCourses.map((c) => (
                <CourseLine key={c.course_id} data={c} handleDelete={deleteCourse}/>
            ))}
        </>
    );
}
