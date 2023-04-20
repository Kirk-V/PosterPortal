import Form from 'react-bootstrap/Form';

export default function CourseSelect({courseData, value}) {
    console.log("course data is"+JSON.stringify(courseData))
  return (
    <>
    <Form.Label>Course</Form.Label>
    
    <Form.Select aria-label="Default select example">
        {Object.values(courseData).map((course, key) => <option key={key} value={course.course_id}>{course.number} - {course.year}</option>)}
    </Form.Select>
    </>
  );
}