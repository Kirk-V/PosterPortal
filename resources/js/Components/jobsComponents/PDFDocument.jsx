import React from 'react';
import { pdf, Page, Text, View, Document, StyleSheet, PDFViewer, BlobProvider } from '@react-pdf/renderer';
import { Form, Button, Modal, Row, Col, Container } from "react-bootstrap";

export default function PDF({show, jobData}){
    // Create styles
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            // margin: 10,
            padding: 10,
            flexGrow: 1
        },
        viewer: {
            borderRadius: '0%, 0%, 2%, 2%',
        }
    });
    
    // Create Document Component
    let MyDocument = (
        
            <Document >
                <Page size="A4" style={styles.page} >
                    <View style={styles.section}>
                    <Text>Section #1</Text>
                    </View>
                    <View style={styles.section}>
                    <Text>Section #2</Text>
                    </View>
                </Page>
            </Document>
        
    );


    async function handleEmailClick(to)
    {
        
        let bodydata = await pdf(MyDocument).toBlob();
        console.log(bodydata);
        let options = {
            method: 'POST',
            body: bodydata
        }
        fetch(`api/jobs/sendEmail`, options)
            .then( (res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return res.json()
            })
            .then((response) => {
                console.log(`okay, Email response: ${JSON.stringify(response)}`);
            })
            .catch((error) => {
                console.log("Error : "+error);
            }
        )
    }
    
    

    return (

        <Row className="justify-content-sm-center">
            <Col xs={10}>
                <div className="height-100 shadow rounded bg-secondary bg-gradient ">
                    <div className="d-flex">
                        <Button className="ms-auto">x</Button>
                    </div>
                    
                    <PDFViewer width={"100%"} height="400px" showToolbar={false}>
                        {MyDocument}
                    </PDFViewer>
                    <div className="d-flex justify-content-evenly align-items-center p-3">
                        <Button className="" onClick={() => handleEmailClick("Requisitioner")}>Email Requisitioner</Button>
                        <Button className="">Email Mary</Button>
                        <Button className="">Email Grant Holder</Button>
                    </div>
                </div>
            
            </Col>
        </Row>
            
        
        
    )
    }

