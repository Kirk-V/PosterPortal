

import React from 'react';
import { pdf, Page, Text, View, Document, StyleSheet, PDFViewer, BlobProvider, Image,  } from '@react-pdf/renderer';

export default function PDFRow({rowData}) {
    // console.log("NEW ROW "+JSON.stringify(rowData));
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
    return (
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
    )
}
