import React from 'react';
import { pdf, Page, Text, View, Document, StyleSheet, PDFViewer, BlobProvider, Image,  } from '@react-pdf/renderer';
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
            width: "100%",
        },
        infoColumnSmall: {
            flexDirection: 'col',
            marginLeft: 10,
            marginRight: 10,
            width: 150,
        },
        infoColumnSmallRight: {
            flexDirection: 'col',
            marginRight: 10,
            width: 150,
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
        headerColumn : {
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

    let GrantHolderSection = (
        <>
            <View style={styles.subSectionHeader}>
                <Text>Grant Holder Information</Text>
            </View>
            <View style={styles.rowView}>
                <View style={styles.infoColumn}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>{jobData.grant_holder_name}</Text>
                </View>
                <View style={styles.infoColumn}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{jobData.grant_holder_email}</Text>
                </View>
            </View>
            <View style={styles.rowView}>
                <View style={styles.infoColumn}>
                    <Text style={styles.label}>Speed Code and Account</Text>
                    <Text style={styles.value}>{redactSpeedCode ? "" : jobData.speed_code}</Text>
                </View>
                <View style={styles.infoColumn}>
                    <Text style={styles.label}>Designate Name</Text>
                    <Text style={styles.value}>Need to add designate to migrations</Text>
                </View>

            </View>
        </>
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
                    <Text style={styles.label}>Cost</Text>
                    <Text style={styles.value}>{jobData.cost}</Text>
                </View>
            </View>
            <View style={styles.rowView}>
                <View style={styles.infoColumnSmallRight}>
                    <Text style={styles.label}>Total</Text>
                    <Text style={styles.value}>{jobData.cost}</Text>
                </View> 
            </View>
        </>

    )

    let Header= (
        <>
        <View style={styles.headerRow}>
            <Image src={"SSC_Stacked_PurpleGrey.png"} style={styles.headerImage}/>
            <View style={styles.headerColumn}>
                <Text style={styles.headerTextLine}>SocialScience Technology Services</Text>
                <Text style={styles.headerTextLine}>Poster Printing</Text>
                <Text style={styles.headerTextLine}>Social Sciences Centre 1226</Text>
                <Text style={styles.headerTextLine}>ssts-posters@uwo.ca</Text>
            </View>
            
        </View>
        </>
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
                        <Text style={styles.label}>Department</Text>
                        <Text style={styles.value}>{jobData.department}</Text>
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
                        <Text style={styles.label}>Requisitioner Type</Text>
                        <Text style={styles.value}>{jobData.position}</Text>
                    </View>
                    <View style={styles.infoColumn}>
                        <Text style={styles.label}>Course No.</Text>
                        <Text style={styles.value}>NEED TO GET COURSE INFO</Text>
                    </View>
                </View>
                <View style={styles.sectionHeader}>
                    <Text>Payment</Text>
                </View>
                <View style={styles.rowView}>
                    <View style={styles.infoColumn}>
                        <Text style={styles.label}>Type</Text>
                        <Text style={styles.value}>{jobData.payment_method}</Text>
                    </View>
                </View>
                {jobData.payment_method == "speedcode" ? GrantHolderSection : null}
                {DetailsSection}
            </Page>
        </Document>
    );



    async function handleEmailClick(to) {

        let bodydata = await pdf(MyDocument).toBlob();
        console.log(bodydata);
        let options = {
            method: 'POST',
            body: bodydata
        }
        fetch(`api/jobs/sendPDFEmail?id=${jobData.poster_id}&to=${to}`, options)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return res.json()
            })
            .then((response) => {
                console.log(`okay, Email response: ${JSON.stringify(response)}`);
            })
            .catch((error) => {
                console.log("Error : " + error);
            })
    }

    const handleRedactClick = () => {
        setRedactSpeedCode(true);
    }

    const emailReqBtn = (
        <Button variant={jobData.emailed_receipt_req ? "primary": "danger"} className="" onClick={() => handleEmailClick("Requisitioner")}>Email Requisitioner</Button>
    )

    const redactSpeedCodeBtn = (
        <Button className="" onClick={() => handleRedactClick()}>Redact SpeedCode</Button>
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
                        {jobData.payment_method == 'speedcode' ? redactSpeedCode ? emailReqBtn : redactSpeedCodeBtn : emailReqBtn}
                        <Button variant={jobData.emailed_receipt_grant_holder ? "primary": "danger"} className="" onClick={() => handleEmailClick("GrantHolder")}>Email Grant Holder</Button>
                        <Button variant={jobData.emailed_receipt_ssts ? "primary": "danger"} className="" onClick={() => handleEmailClick("AdminAssistant")}>Email Mary</Button>
                    </div>
                </div>

            </Col>
        </Row>
    )
}

