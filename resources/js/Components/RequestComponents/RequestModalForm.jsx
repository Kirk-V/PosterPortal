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

export default function RequestModalForm({ formD, settings, courseData, onUpdate, onHandleAccept, departments }) {
    const [formData, setformData] = useState(formD);
    const [isSpeedCode, setIsSpeedCode] = useState(false);
    const [total, setTotal] = useState(0);
    const [validated, setValidated] = useState(false);
    const [sdfBalance, setSDFBalance] = useState(null);
    //I think that data should be pulled here, and joined with the course ID + whatever other info is needed
    // This will allow for users to change the course info attached to the request..
    // Alternative...we make a new call for each modal form (this component), or instead just the undergrad section
    // can become its own component.

    useEffect(() => {
        let options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        }
        fetch(`api/SDFBalance`, options)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return res.json();
            })
            .then((response) => {
                console.log(`okay, Balance is: ${JSON.stringify(response)}`);
                if (response.status == "Success") {
                    setSDFBalance(response.data.Balance);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    console.log("total is " + formD.total);
    function handleOpenFile() {
        console.log("file opening");
    }

    function updateRequest() {
        //send the request data in its current form to backend for database update
    }

    function acceptRequest() {
        //update any changed data and create job
    }

    const calculateTotal = (data) => {
        let costPer = data.cost;
        let quantity = data.quantity;
        let discount = data.discount;
        console.log(`cost: ${costPer} quant: ${quantity} disc: ${discount}`);
        console.log("calculated Total" + costPer  * quantity);
        return Math.floor((costPer * quantity)).toFixed(2);
    };


    const calculateCost = (data) => {
        console.log(JSON.stringify(settings));
        let pricePerFoot = settings.cost;
        //must convert to inches first
        console.log("cost being calculated");
        let inchWidth = data.units == "centimeters" ? 0.3937007874 * data.width : data.width;
        let inchHeight = data.units == "centimeters" ? 0.3937007874 * data.height : data.height;
        var total = (((inchWidth * inchHeight) / 144) * pricePerFoot).toFixed(2);
        if (data.payment_method == 'cash') {
            //round down
            total = Math.floor(total);
        }
        console.log("cost:" + total);
        return total;
    }

    const calcualteDiscount = (data) => {
        if (data.discount_eligible) {
            return data.quantity * settings.discount;
        }
    }

    const handleControlChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        var data = { ...formD }; //Deep copy so that setformD will trigger rerender
        console.log(`${name} being updated`);
        data[`${name}`] = value;
        if (["width", "height", "units", "discount"].includes(name)) {
            data.cost = parseFloat(calculateCost(data)).toFixed(2); //The cost per poster
            data.total = parseFloat(calculateTotal(data)).toFixed(2); //The total cost
            console.log(`cost now: ${data.cost}`);
        }
        else if (["quantity", "cost"].includes(name)) {
            data.discount = parseFloat(calcualteDiscount(data)).toFixed(2);
            data.total = parseFloat(calculateTotal(data)).toFixed(2);
            console.log(`total now: ${data.total}`);
        }
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

    const handleApproved = () => {
        let data = { ...formData };
        data.speed_code_approved = 1;
        onUpdate(data);
    }

    const handleRequestSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log("form not valid!");
        }
        else {
            console.log("form valid!");
            onHandleAccept();
        }
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
    };

    const handleApplyDiscount = (event) => {
        let data = { ...formD };
        console.log("adding in discount " + settings.discount);
        data['discount'] = settings.discount * data.quantity;
        data['discount_eligible'] = 1;
        data.cost = calculateCost(data);
        data.total = calculateTotal(data);
        onUpdate(data);
    }

    const handleRemoveDiscount = (event) => {
        console.log("removing discount");
        let data = { ...formD };
        data['discount'] = 0;
        data['discount_eligible'] = 0;
        data.cost = calculateCost(data);
        data.total = calculateTotal(data);
        onUpdate(data);
    }

    const handleDiscountAppliedChange = (event) => {
        let discountApplied = event.target.value;
        if (discountApplied == 1) {
            console.log("discount has been applied for");
            handleControlChange(event);
        }
        else {
            handleRemoveDiscount(event);
            // handleControlChange(event);
        }
    }

    const grantholderName = (
        <Col>
            <Form.Group className="mb-3" controlId="requestFormFirstName">
                <Form.Label>Grant Holder Name</Form.Label>
                <Form.Control
                    name="grant_holder_name"
                    type="text"
                    defaultValue={formD.grant_holder_name}
                    required
                />
            </Form.Group>
        </Col>
    )

    var GrantHolderInfo = (
        <>
            <Col xs={2}>
                <Form.Group
                    className="mb-3"
                    controlId="requestFormGrantFirstName"
                >
                    <Form.Label>Approver Type</Form.Label>
                    <Form.Control
                        name="approver_type"
                        type="text"
                        defaultValue={formD.approver_type}
                        required
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3" controlId="requestFormFirstName">
                    <Form.Label>Approver Name</Form.Label>
                    <Form.Control
                        name="approver_name"
                        type="text"
                        defaultValue={formD.approver_name}
                        required
                    />
                </Form.Group>
            </Col>
        {formD.approver_type == 'dosa' ?grantholderName:null}

            <Col>
                <Form.Group
                    className="mb-3"
                    controlId="requestFormGrantFirstName"
                >
                    <Form.Label>Approver Email</Form.Label>
                    <Form.Control
                        name="approver_email"
                        type="text"
                        defaultValue={formD.approver_email}
                        required
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
                    <Form.Label>SpeedCode | Account</Form.Label>
                    <InputGroup>

                        <Form.Control
                            name="speed_code"
                            type="text"
                            defaultValue={formD.speed_code}
                            onChange={(e) => handleControlChange(e)}
                            required
                            isValid={formD.speed_code_approved == 1}
                        />
                        <Form.Control
                            name="account"
                            type="text"
                            defaultValue={formD.account}
                            onChange={(e) => handleControlChange(e)}
                            required
                            isValid={formD.speed_code_approved == 1}
                        />

                        <Button
                            variant="outline-secondary"
                            id="approveSpeedCode"
                            onClick={handleApproved}
                        >
                            Approve
                        </Button>
                    </InputGroup>

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
            <Col xs={3}>
                <Form.Group
                    className="mb-3"
                    controlId="requestFormFirstName"
                >
                    <Form.Label>Remaining SDF Balance</Form.Label>
                    <Form.Control
                        name="sdf_balance"
                        type="number"
                        className="border-0"
                        readOnly
                        value={sdfBalance?.toFixed(2)}
                        required
                    />
                </Form.Group>
            </Col>
            <Col xs={3} className="align-self-center">
                <Button variant="primary" onClick={handleApplyDiscount}>Apply discount</Button>{' '}
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

    var externalDepartment = (
        <Form.Control
            className='mt-1'
            name="external_department"
            type="text"
            onChange={(e) => handleControlChange(e)}
            value={formD.external_department ?? ""}
            required
        />
    )


    //display request data in a formdata.position
    return (
        <Form noValidate validated={validated} onSubmit={handleRequestSubmit} id="requestForm" >
            <Row>
                <Col>
                    <h5>Requsitioner Details</h5>
                </Col>
            </Row>
            <Row className="mb-2 g-2">
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
                            required
                        />
                    </Form.Group>
                </Col>
                <Col >
                    <Form.Group
                        className="mb-3"
                        controlId="requestFormLastName"
                    >
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            name="last_name"
                            type="text"
                            defaultValue={formD.last_name}
                            required
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
                            required
                        />
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Label >Department</Form.Label>
                    <Form.Select
                        name="department"
                        defaultValue={formD.department}
                        onChange={(e) => handleControlChange(e)}>
                        {departments.map((departmentName) => (
                            <option key={departmentName} value={departmentName}>{departmentName}</option>
                        ))}
                    </Form.Select>
                    {formD.department == 'Other (Non Social Science Department)' ? externalDepartment : null}

                </Col>
                <Col xs={2}>
                    <Form.Group
                        className="mb-3"
                        controlId="requestFormFirstName"
                    >
                        <Form.Label>Wants Discount</Form.Label>
                        <Form.Select
                            name="applied_for_discount"
                            defaultValue={formD.applied_for_discount}
                            onChange={(e) => handleDiscountAppliedChange(e)}
                            required
                        >
                            <option value={1}>Yes</option>
                            <option value={0}>no</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-3">
                {formD.applied_for_discount == 1 ? undergradInfo : null}
            </Row>
            <Row>
                <Col>
                    <h5>Payment Details</h5>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col xs={2}>
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
                            <option value="speed_code">Speedcode</option>
                            <option value="cash">Cash</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                {formD.payment_method == "speed_code"
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
                            name="file_location"
                            defaultValue={formD.file_location ?? 'email'}
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
                            as="input"
                            onChange={(e) => handleControlChange(e)}
                            type="number"
                            name="width"
                            step=".01"
                            defaultValue={parseFloat(formD.width).toFixed(2)}
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text id="basic-addon2">X</InputGroup.Text>
                        <Form.Control
                            as="input"
                            step=".01"
                            type="number"
                            onChange={(e) => handleControlChange(e)}
                            name="height"
                            defaultValue={parseFloat(formD.height).toFixed(2)}
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
                            <option value="centimeters">cm</option>
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
                                type="number"
                                as="input"
                                name="cost"
                                step="0.01"
                                onChange={(e) => handleControlChange(e)}
                                defaultValue={parseFloat(formD.cost).toFixed(2)}
                            />
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormEmail">
                        <Form.Label>Quantity</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon2">
                                #
                            </InputGroup.Text>
                            <Form.Control
                                name="quantity"
                                type="number"
                                defaultValue={formD.quantity}
                                onChange={(e) => handleControlChange(e)}
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
                            <Form.Control
                                name="total"
                                type="number"
                                value={(parseFloat(formD.payment_method == 'speed_code'? formD.total : Math.floor(formD.total))).toFixed(2)}
                                // value={calculateTotal()} 
                                onChange={(e) => handleControlChange(e)}
                                readOnly />
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs='8'>
                    <Form.Label className="float-end">
                        Discount
                    </Form.Label>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormEmail">

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon2">
                                $
                            </InputGroup.Text>
                            <Form.Control
                                name="discount"
                                type="number"
                                value={parseFloat(formD.discount).toFixed(2)}
                                // readOnly={formD.discount_eligible ? false: true}
                                onChange={(e) => handleControlChange(e)}
                                disabled={formD.discount_eligible == "0" ? true : false}
                            />
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs='8'>
                    <Form.Label className="float-end">
                        Total Payment
                    </Form.Label>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="requestFormEmail">

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon2">
                                $
                            </InputGroup.Text>
                            <Form.Control
                                type="number"
                                value={parseFloat(formD.cost * formD.quantity - formD.discount).toFixed(2)}
                                onChange={(e) => handleControlChange(e)}
                            />
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs={4}>
                    <Form.Label>
                        Technician
                    </Form.Label>
                    <Form.Select
                        name="technician"
                        defaultValue={formD.technician}
                        onChange={(e) => handleControlChange(e)}>
                        <option value="Rick">Rick</option>
                        <option value="Steve">Steve</option>
                    </Form.Select>
                </Col>
            </Row>
        </Form>
    );
}
