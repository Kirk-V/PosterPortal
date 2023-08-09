import React from 'react'
import { pdf, Page, Text, View, Document, StyleSheet, PDFViewer, BlobProvider, Image, } from '@react-pdf/renderer';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { ModalBody } from 'react-bootstrap';
import PDFRow from './PDFRow';
import PDFReportHead from './PDFReportHead';
import PDFReportLastRow from './PDFReportLastRow';

export default function ReportPDF({ reportSettings, reportData, handleCloseModal, totals }) {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        handleCloseModal();
    }
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#fff',
            padding: 20, 
            fontSize: 12,
        },
    });

    return (
        <>
            <Modal show={show} onHide={handleCloseModal} size='xl'>
                <ModalBody>
                    <PDFViewer width={"100%"} height={"800px"} showToolbar={false}>
                        <Document>
                            <Page size="A4" style={styles.page}>
                                <PDFReportHead reportSettings={reportSettings}/>
                                {reportData.map( (row) => {return  <PDFRow key={(row.poster_id)} rowData={row}></PDFRow>})}
                                <PDFReportLastRow totals={totals}/>
                            </Page>
                        </Document>
                    </PDFViewer>

                </ModalBody>
            </Modal>
        </>
    )
}
