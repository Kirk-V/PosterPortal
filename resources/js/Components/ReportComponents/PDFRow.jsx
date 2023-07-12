

import React from 'react';
import { pdf, Page, Text, View, Document, StyleSheet, PDFViewer, BlobProvider, Image, } from '@react-pdf/renderer';

export default function PDFRow({ rowData }) {
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
            paddingTop: 5,
            border: '1'
        },
        infoColumn: {
            flexDirection: 'col',
            width: "50%",
        },
        label: {
            fontSize: 12,
            color: 'gray',
            textAlign: 'left',
            marginBottom: 2,
        },
        value: {
            fontSize: 8,
            height: 20,
            width: "100%",
            textAlign: 'left',
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
                <Text style={styles.value}>{rowData.transactions.transaction_date}</Text>
            </View>
            <View style={styles.infoColumn}>
                <Text style={styles.value}>{rowData.poster_id}</Text>
            </View>

            <View style={styles.infoColumn}>
                <Text style={styles.value}>{rowData.requests.first_name} {rowData.requests.first_name}</Text>
                <Text style={styles.value}>{rowData.requests.email}</Text>
            </View>
            <View style={styles.infoColumn}>
                <Text style={styles.value}>{rowData.poster_id}</Text>
            </View>
            <View style={styles.infoColumn}>
                <Text style={styles.value}>{rowData.poster_id}</Text>
            </View>
            <View style={styles.infoColumn}>
                <Text style={styles.value}>{rowData.poster_id}</Text>
            </View>
            <View style={styles.infoColumn}>
                <Text style={styles.value}>{rowData.poster_id}</Text>
            </View>
        </View>
    )
}
