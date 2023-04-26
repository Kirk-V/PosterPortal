import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Fade from "react-bootstrap/Fade";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import CourseSelect from "@/Components/RequestComponents/CourseSelect";
import { useEffect } from "react";

export default function RequestModalForm({formD, settings, courseData, onUpdate, pricePerFoot }) {
    const [formData, setformData] = useState(formD);
    const [isSpeedCode, setIsSpeedCode] = useState(false);
    const [total, setTotal] = useState(0);
    //I think that data should be pulled here, and joined with the course ID + whatever other info is needed
    // This will allow for users to change the course info attached to the request..
    // Alternative...we make a new call for each modal form (this component), or instead just the undergrad section
    // can become its own component.

    console.log("Re-render form");

    function handleOpenFile() {
        console.log("file opening");
    }

    function updateRequest() {
        //send the request data in its current form to backend for database update
    }

    function acceptRequest() {
        //update any changed data and create job
    }

    const calculateTotal = () => {
        let costPer = formD.cost;
        let quantity = formD.quantity;
        let discount = formD.discount_eligible == "1" ? formD.discount : 0;
        console.log(`cist: ${costPer} quant: ${quantity} disc: ${discount}`);
        console.log("calculated Total"+(costPer - discount) * quantity);
        return (costPer - discount) * quantity;
    };

    const handleControlChange = (event) => 
    {
        const value = event.target.value;
        const name = event.target.name;
        let data = { ...formD }; //Deep copy so that setformD will trigger rerender
        data[`${name}`] = value;
        // setformD(data);
        onUpdate(data);
    }

    const handleCourseChange = (event) => {
        const value = event.target.value;
        let data = { ...formD }; //Deep copy so that setformD will trigger rerender
        data.course_id = value;
        // setformD(data);
        onUpdate(data);
    }

    // const handleQuantityChange = (event) => {
    //     const value = event.target.value;
    //     let data = { ...formD }; //Deep copy so that setformD will trigger rerender
    //     data.quantity = value;
    //     // setformD(data);
    //     onUpdate(data);
    //     // setTotal(calculateTotal());
    //     // console.log(JSON.stringify(formD));
    // };

    // const handleCostChange = (event) => {
    //     const value = event.target.value;
    //     let data = { ...formD }; //Deep copy so that setformData will trigger rerender
    //     data.cost = value;
    //     onUpdate(data);
    //     // setformData(data);
    //     // let newTotal = calculateTotal();
    //     // setTotal(newTotal);
    //     // console.log(JSON.stringify(formData));
    // };

    // const handleDiscountChange = (event) => {
    //     const value = event.target.value;
    //     let data = { ...formD }; //Deep copy so that setformData will trigger rerender
    //     data.discount = value;
    //     // setformData(data);
    //     onUpdate(data);
    //     // setTotal(calculateTotal());
    //     // console.log(JSON.stringify(formData));
    // };

    // const handlePaymentChange = (event) => {
    //     const value = event.target.value;
    //     let data = { ...formData }; //Deep copy so that setformData will trigger rerender
    //     data.payment_method = value;
    //     // setformData(data);
    //     onUpdate(data);
    //     // if (value == "speedcode") {
    //     //     setIsSpeedCode(true);
    //     // }
    //     // console.log(JSON.stringify(formData));
    // };

    // const handlePositionChange = (event) => {
    //     const value = event.target.value;
    //     let data = { ...formD }; //Deep copy so that setformData will trigger rerender
    //     data.position = value;
    //     data.discount_eligible = data.position == "undergraduate" ? "1":0;
    //     onUpdate(data);
    //     // setformData(data);
    //     // console.log(JSON.stringify(formData));
    // };

    // const handleUnitsChange = (event) => {
    //     const value = event.target.value;
    //     let data = { ...formD }; //Deep copy so that setformData will trigger rerender
    //     data.units = value;
    //     onUpdate(data);
    //     // setformData(data);
    //     // console.log(JSON.stringify(formData));
    // };

    // const handleWidthChange = (event) => {
    //     const value = event.target.value;
    //     let data = { ...formD }; //Deep copy so that setformData will trigger rerender
    //     data.width = value;
    //     onUpdate(data);
    // }

    // const handleHeightChange = (event) => {
    //     const value = event.target.value;
    //     let data = { ...formD }; //Deep copy so that setformData will trigger rerender
    //     data.height = value;
    //     onUpdate(data);
    // }

    // const handleFirstNameChange = (event) => {
    //     const value = event.target.value;
    //     let data = { ...formD }; //Deep copy so that setformData will trigger rerender
    //     data.first_name = value;
    //     onUpdate(data);
    // }

    var GrantHolderInfo = (
        <>
            <Col>
                <Form.Group className="mb-3" controlId="requestFormFirstName">
                    <Form.Label>Grant Holder</Form.Label>
                    <Form.Control
                        name="grant_holder_name"
                        type="text"
                        defaultValue={formD.first_name}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group
                    className="mb-3"
                    controlId="requestFormGrantFirstName"
                >
                    <Form.Label>Grant Holder Email</Form.Label>
                    <Form.Control
                        name="grant_holder_email"
                        type="text"
                        defaultValue={formD.first_name}
                    />
                </Form.Group>
            </Col>
            <Row>
                <Col xs={5}>
                    <Alert
                        className={"mt-3"}
                        variant={
                            formD.speed_code_approved == 0
                                ? "danger"
                                : "success"
                        }
                    >
                        Speedcode has{" "}
                        {formD.speed_code_approved == 0 ? "not" : null} been
                        approved
                    </Alert>
                </Col>
                <Col>
                    <Form.Group
                        className="mb-3"
                        controlId="requestFormGrantFirstName"
                    >
                        <Form.Label>SpeedCode</Form.Label>
                        <Form.Control
                            name="speed_code"
                            type="text"
                            defaultValue={formD.speed_code}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </>
    );

    var undergradInfo = (
        <>
            <Col xs={6}>
                <CourseSelect
                    updateCourse={handleCourseChange}
                    courseData={courseData}
                    value={formD.course_id}
                />
            </Col>
        </>
    );

    var posterInfo = (
        <Row>
            <Col>
                <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">Width</InputGroup.Text>
                    <Form.Control type="text" defaultValue={formD.width} />
                    <InputGroup.Text id="basic-addon3">Height</InputGroup.Text>
                    <Form.Control type="text" defaultValue={formD.height} />
                </InputGroup>
            </Col>
        </Row>
    );


    //display request data in a formdata.position
    return (
        <Form>
            <Row>
                <Col>
                    <h5>Requsitioner Details</h5>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Form.Group
                        className="mb-3"
                        controlId="requestFormFirstName"
                    >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            name="first_name"
                            type="text"
                            defaultValue={formD.first_name}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group
                        className="mb-3"
                        controlId="requestFormLastName"
                    >
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            name="last_name"
                            type="text"
                            defaultValue={formD.last_name}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name="email"
                            type="text"
                            defaultValue={formD.email}
                        />
                    </Form.Group>
                </Col>
                <Col xs={3}>
                    <Form.Group
                        className="mb-3"
                        controlId="requestFormFirstName"
                    >
                        <Form.Label>Position</Form.Label>
                        <Form.Select
                            name="position"
                            defaultValue={formD.position}
                            onChange={(e) => handleControlChange(e)}
                        >
                            <option value="undergraduate">undergraduate</option>
                            <option value="graduate">graduate</option>
                            <option value="faculty">faculty</option>
                            <option value="staff">staff</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-3">
                {formD.position == "undergraduate" ? undergradInfo : null}
            </Row>
            <Row>
                <Col>
                    <h5>Payment Details</h5>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col xs={3}>
                    <Form.Group
                        className="mb-3"
                        controlId="requestFormLastName"
                    >
                        <Form.Label>Payment</Form.Label>
                        <Form.Select
                            name="payment_method"
                            defaultValue={formD.payment_method}
                            onChange={(e) => handleControlChange(e)}
                        >
                            <option value="speedcode">Speedcode</option>
                            <option value="cash">Cash</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                {formD.payment_method == "speedcode"
                    ? GrantHolderInfo
                    : null}
            </Row>
            <Row>
                <Col>
                    <h5>Poster Details</h5>
                </Col>
            </Row>
            <Row>
                <Col xs={5}>
                    <Form.Label>File</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            name="file_name"
                            defaultValue={formD.payment_method}
                            aria-describedby="basic-addon2"
                        />
                        <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            onClick={handleOpenFile}
                        >
                            open
                        </Button>
                    </InputGroup>
                </Col>
                <Col xs={5}>
                    <Form.Label>Dimensions</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={(e) => handleControlChange(e)}
                            name="width"
                            defaultValue={formD.width}
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text id="basic-addon2">X</InputGroup.Text>
                        <Form.Control
                            onChange={(e) => handleControlChange(e)}
                            name="height"
                            defaultValue={formD.height}
                            aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                </Col>
                <Col xs={2}>
                    <Form.Group
                        className="mb-3"
                        controlId="requestFormFirstName"
                    >
                        <Form.Label>Unit</Form.Label>
                        <Form.Select
                            name="units"
                            defaultValue={formD.units}
                            onChange={(e) => handleControlChange(e)}
                        >
                            <option value="cm">cm</option>
                            <option value="inches">inches</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Pricing</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormEmail">
                        <Form.Label>Cost Per Poster</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon2">
                                $
                            </InputGroup.Text>
                            <Form.Control
                                name="cost"
                                type="number"
                                value={formD.cost}
                                onChange={(e) => handleControlChange(e)}
                            />
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormEmail">
                        <Form.Label>Quantity</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon2">
                                $
                            </InputGroup.Text>
                            <Form.Control
                                name="quantity"
                                type="number"
                                value={formD.quantity}
                                onChange={(e) => handleControlChange(e)}
                            />
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormEmail">
                        <Form.Label>Discount</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon2">
                                $
                            </InputGroup.Text>
                            <Form.Control
                                name="discount"
                                type="number"
                                value={formD.discount_eligible == "0" ? null : formD.discount}
                                onChange={(e) => handleControlChange(e)}
                                disabled={formD.discount_eligible == "0" ? true:false}
                            />
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormEmail">
                        <Form.Label>Total</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon2">
                                $
                            </InputGroup.Text>
                            <Form.Control name="total" type="number" value={calculateTotal()} readOnly/>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}
