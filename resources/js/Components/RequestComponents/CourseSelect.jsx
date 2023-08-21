import Form from 'react-bootstrap/Form';

export default function CourseSelect({courseData, value, onUpdateCourse}) {
    // console.log("course data is"+JSON.stringify(courseData))
  return (
    <>
    <Form.Label>Course</Form.Label>

    <Form.Select aria-label="Default select example"
        required
        defaultValue={value}
        onChange={onUpdateCourse}>
          <option value="">select</option>
        {Object.values(courseData).map((course, key) => <option key={key} value={course.course_id}>{course.number} - {course.year} - {course.department}</option>)}
    </Form.Select>
    </>
  );
}
