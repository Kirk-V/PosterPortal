import React from 'react';
import { pdf, Page, Text, View, Document, StyleSheet, PDFViewer, BlobProvider, Image, } from '@react-pdf/renderer';
import { Form, Button, Modal, Row, Col, Container } from "react-bootstrap";
import { useEffect, useState } from 'react';

export default function PDF({ show, jobData, handleCloseReceipt }) {
    const [redactSpeedCode, setRedactSpeedCode] = useState(false);
    // Create styles
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#fff',
            padding: 20,
            fontSize: 12,
        },
        rowView:
        {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingTop: 5
        },
        infoColumn: {
            flexDirection: 'col',
            marginLeft: 10,
            marginRight: 10,
            width: "50%",
        },
        label: {
            fontSize: 12,
            color: 'gray',
            textAlign: 'left',
            marginBottom: 2,
        },
        value: {
            fontSize: 14,
            height: 30,
            width: "100%",
            padding: 4,
            textAlign: 'left',
            border: '2px solid gray',
        },
        sectionHeader: {
            marginLeft: 20,
            fontSize: 24,
            color: 'gray',
            marginTop: 20,
        },
        subSectionHeader: {
            marginLeft: 20,
            fontSize: 16,
            color: 'gray',
            marginTop: 10,
        },
        infoColumnLarge: {
            flexDirection: 'col',
            marginLeft: 10,
            marginRight: 10,
            width: "50%",
        },
        infoColumnSmall: {
            flexDirection: 'col',
            marginLeft: 10,
            marginRight: 10,
            width: 100,
        },
        infoColumnMedium: {
            flexDirection: 'col',
            marginLeft: 10,
            marginRight: 10,
            width: 140,
        },
        infoColumnSmallRight: {
            flexDirection: 'col',
            marginRight: 10,
            width: 100,
            marginLeft: "auto"
        },
        headerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
            paddingLeft: 20,
            marginBottom: 10,
            height: 80,
            borderBottom: "2px solid black",
        },
        headerColumn: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        headerTextLine: {
            textAlign: 'center',

        },
        headerImage: {
            width: 210,
            height: 50,
        }


    });

    let SpeedCodeSection = (
        <>
            <View style={styles.infoColumn}>
                <Text style={styles.label}>Speed Code</Text>
                <Text style={styles.value}>{redactSpeedCode ? "" : jobData.speed_code}</Text>
            </View>
            <View style={styles.infoColumn}>
                <Text style={styles.label}>Account</Text>
                <Text style={styles.value}>{redactSpeedCode ? "" : jobData.account}</Text>
            </View>
        </>
    )


    let GrantHolderSection = (
        <>
            <View style={styles.rowView}>
                <View style={styles.infoColumn}>
                    <Text style={styles.label}>Approver Name</Text>
                    <Text style={styles.value}>{jobData.approver_name}</Text>
                </View>
                <View style={styles.infoColumn}>
                    <Text style={styles.label}>Approver Department</Text>
                    <Text style={styles.value}>{jobData.approver_department}</Text>
                </View>

                <View style={styles.infoColumn}>
                    <Text style={styles.label}>Approver Email</Text>
                    <Text style={styles.value}>{jobData.approver_email}</Text>
                </View>
            </View>
        </>
    )

    let DiscountField = (
        <View style={styles.rowView}>
            <View style={styles.infoColumnSmallRight}>
                <Text style={styles.label}>SDF Discount</Text>
                <Text style={styles.value}>$ {parseFloat(jobData.discount).toFixed(2)}</Text>
            </View>
        </View>
    )

    let DetailsSection = (
        <>
            <View style={styles.sectionHeader}>
                <Text>Details</Text>
            </View>
            <View style={styles.rowView}>
                <View style={styles.infoColumnSmall}>
                    <Text style={styles.label}>Quantity</Text>
                    <Text style={styles.value}>{jobData.quantity}</Text>
                </View>
                <View style={styles.infoColumnLarge}>
                    <Text style={styles.label}>Description</Text>
                    <Text style={styles.value}>{`${jobData.width} X ${jobData.height} Poster`}</Text>
                </View>
                <View style={styles.infoColumnSmall}>
                    <Text style={styles.label}>Cost Per Poster</Text>
                    <Text style={styles.value}>$ {parseFloat(jobData.cost).toFixed(2)}</Text>
                </View>
            </View>
            <View style={styles.rowView}>
                <View style={styles.infoColumnSmallRight}>
                    <Text style={styles.label}>Sub Total</Text>
                    <Text style={styles.value}>$ {parseFloat(jobData.cost * jobData.quantity).toFixed(2)}</Text>
                </View>
            </View>
            {jobData.discount_eligible == 1 ? DiscountField : null}
            <View style={styles.rowView}>
                <View style={styles.infoColumnSmallRight}>
                    <Text style={styles.label}>Total</Text>
                    <Text style={styles.value}>$ {parseFloat(jobData.total_received).toFixed(2)}</Text>
                </View>
            </View>
        </>

    )

    let Header = (
        <>
            <View style={styles.headerRow}>
                <Image src={"SSC_Stacked_PurpleGrey.png"} style={styles.headerImage} />
                <View style={styles.headerColumn}>
                    <Text style={styles.headerTextLine}>Social Science Technology Services</Text>
                    <Text style={styles.headerTextLine}>Poster Printing</Text>
                    <Text style={styles.headerTextLine}>Social Sciences Centre 1226</Text>
                    <Text style={styles.headerTextLine}>ssts-posters@uwo.ca</Text>
                </View>

            </View>
        </>
    )


    let CourseField = (
        <View style={styles.infoColumn}>
            <Text style={styles.label}>Course Number</Text>
            <Text style={styles.value}>{jobData.course}</Text>
        </View>
    )

    // Create Document Component
    let MyDocument = (
        <Document>
            <Page size="A4" style={styles.page}>
                {Header}
                <View style={styles.rowView}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.label}>Date</Text>
                        <Text style={styles.value}>{jobData.transaction_date}</Text>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.label}>Technician</Text>
                        <Text style={styles.value}>{jobData.technician}</Text>
                    </View>

                    <View style={styles.infoColumn}>
                        <Text style={styles.label}>Poster No.</Text>
                        <Text style={styles.value}>{jobData.poster_id}</Text>
                    </View>
                </View>
                <View style={styles.sectionHeader}>
                    <Text>Requisitioner</Text>
                </View>
                <View style={styles.rowView}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.value}>{`${jobData.first_name} ${jobData.last_name}`}</Text>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.value}>{jobData.email}</Text>
                    </View>
                </View>
                <View style={styles.rowView}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.label}>Department</Text>
                        <Text style={styles.value}>{jobData.department}</Text>
                    </View>
                    {jobData.discount_eligible ? CourseField : null}

                </View>
                <View style={styles.sectionHeader}>
                    <Text>Payment</Text>
                </View>
                <View style={styles.rowView}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.label}>Type</Text>
                        <Text style={styles.value}>{jobData.payment_method}</Text>
                    </View>
                    {jobData.payment_method == "speed_code" ? SpeedCodeSection : null}
                </View>
                {jobData.payment_method == "speed_code" ? GrantHolderSection : null}

                {DetailsSection}
            </Page>
        </Document>
    );



    async function handleEmailClick(event, to) {
        event.preventDefault();
        event.stopPropagation();
        let bodydata = await pdf(MyDocument).toBlob();
        console.log(bodydata);

        let options = {
            method: 'POST',
            body: bodydata,
            headers: {
                'Accept': 'application/json',
            },
        }
        fetch(`api/jobs/sendPDFEmail?id=${jobData.poster_id}&to=${to}`, options)
            .then((res) => {
                if (!res.ok) {
                    console.log("response not okay!");
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return res.json()
            })
            .then((response) => {
                console.log(`okay, Email response: ${JSON.stringify(response)}`);
                if (response.status == "Success") {
                    if (to == "Requisitioner") {
                        // jobData.emailed_receipt_req = 1;
                        console.log("Recieved response! " + JSON.stringify(response));
                    }
                }
            })
            .catch((error) => {
                console.log("Error : " + error);
            });
        return;
    }

    const handleRedactClick = () => {
        setRedactSpeedCode(true);
    }

    const handleEmailRequisitionerClick = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        pdf(MyDocument).toBlob().then((blobData) => {
            console.log(`BlobData ${blobData}`);
            let options = {
                method: 'POST',
                ContentType: 'application/octet-stream',
                body: blobData,
            }
            let goGetIt = fetch(`api/jobs/sendPDFEmail?id=${jobData.poster_id}&to=Requisitioner`, options)
                .then((res) => {
                    if (!res.ok) {
                        console.log("response not okay!");
                        // throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return res.json()
                })
                .then((response) => {
                    console.log(`okay, Email response: ${JSON.stringify(response)}`);
                    return;
                })
                .catch((error) => {
                    console.log("Error : " + error);
                });
            console.log("finished");
            return;
        }
    )
}

    const emailReqBtn = (
        <Button type="button" variant={jobData.emailed_receipt_req == 0 ? "primary" : "danger"} onClick={async function (e) { await handleEmailRequisitionerClick(e); e.preventDefault(); e.stopPropagation(); console.log("never ends"); }}>Email Requisitioner</Button>
    )

    const redactSpeedCodeBtn = (
        <Button type="button" className="" onClick={() => handleRedactClick()}>Redact SpeedCode</Button>
    )



    return (
        <Row className="justify-content-sm-center">
            <Col xs={10}>
                <div className="height-100 shadow rounded bg-secondary bg-gradient ">
                    <div className="d-flex">
                        <Button className="ms-auto" onClick={() => handleCloseReceipt()}>x</Button>
                    </div>

                    <PDFViewer width={"100%"} height="400px" showToolbar={false}>
                        {MyDocument}
                    </PDFViewer>
                    <div className="d-flex justify-content-evenly align-items-center p-3">
                        {jobData.payment_method == 'speed_code' ? redactSpeedCode ? emailReqBtn : redactSpeedCodeBtn : emailReqBtn}
                        {/* <Button type="button" variant={jobData.emailed_receipt_grant_holder == 0 ? "primary" : "danger"} className="" onClick={() => handleEmailClick("GrantHolder")}>Email Grant Holder</Button> */}
                        {/* <Button type="button" variant={jobData.emailed_receipt_ssts == 0 ? "primary" : "danger"} className="" onClick={() => handleEmailClick("AdminAssistant")}>Email Mary</Button> */}
                    </div>
                </div>

            </Col>
        </Row>
    )
}

