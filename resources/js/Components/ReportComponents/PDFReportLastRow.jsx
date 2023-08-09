import React from 'react'
import {
    pdf,
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    PDFViewer,
    BlobProvider,
    Image,
} from "@react-pdf/renderer";

export default function PDFReportLastRow({totals}) {

    const styles = StyleSheet.create({
        rowView: {
            flexDirection: "row",
            borderBottom: "2"
        },
        aboveHeader: {
            borderTop: "2",
            flexDirection: "row",
            height: 25,
        },
        headerRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 5,
            paddingLeft: 20,
            height: 80,
        },
        headerColumn: {
            flexDirection: "column",
            alignItems: "center",
        },
        headerTextLine: {
            textAlign: "center",
        },
        headerImage: {
            width: 150,
            height: 40,
        },

    });
    //Date	Poster #	Requisitioner	Approver	Grant Payment	Cash Payment	Total	SDF Discount	Received
    return (
        <>
            {/* Top Row */}
            <View style={styles.aboveHeader}>
                <InformationTitle />
                <DollarTotal ammount={totals?.grant.toFixed(2)}/>
                <DollarTotal ammount={totals?.cash.toFixed(2)}/>
                <DollarTotal ammount={totals?.SDF.toFixed(2)}/>
                <DollarTotal ammount={(totals?.grant + totals?.cash + totals?.SDF)}/>
            </View>
        </>
    );
}

function InformationTitle() {
    const styles = StyleSheet.create({
        AboveHeaderCell: {
            width : "55%",
            borderRight: '1px',
        },
        centerValue: {
            fontSize: 12,
        },
    });
    return (
        <View style={styles.AboveHeaderCell}>
            <Text style={styles.centerValue}>Total</Text>
        </View>
    );
}

function DollarTotal({ammount}) {
    const styles = StyleSheet.create({
        cell: {
            width : "11.2%",
        },
        centerValue: {
            fontSize: 10,
        },
    });
    return (
        <View style={styles.cell}>
            <Text style={styles.centerValue}>${ammount}</Text>
        </View>
    );
}

