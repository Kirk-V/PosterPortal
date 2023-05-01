import React from 'react';
import { pdf, Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

export default function PDF({show}){
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

    const blob = pdf(MyDocument).toBlob();
    

    return (
        <>
            <PDFViewer width={"100%"} height="400px" showToolbar={false}>
                {MyDocument}
            </PDFViewer>
        </>
        
        
    )
    }

