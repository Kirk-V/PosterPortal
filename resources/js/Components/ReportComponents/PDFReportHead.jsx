import React from "react";
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

export default function PDFReportHead({ reportSettings }) {
    const styles = StyleSheet.create({
        rowView: {
            flexDirection: "row",
            paddingTop: 5,
            borderBottom: "2"
        },

        headerRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 5,
            paddingLeft: 20,
            marginBottom: 10,
            height: 80,
            borderBottom: "2px solid black",
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
            {/* Header */}
            <View style={styles.headerRow}>
                <Image
                    src={"SSC_Stacked_PurpleGrey.png"}
                    style={styles.headerImage}
                />
                <View style={styles.headerColumn}>
                    <Text style={styles.headerTextLine}>
                        Start: {reportSettings.start_date}
                    </Text>
                    <Text style={styles.headerTextLine}>
                        End: {reportSettings.start_date}
                    </Text>
                    <Text style={styles.headerTextLine}>
                        Payment type: {reportSettings.payment_type}
                    </Text>
                </View>
            </View>
            {/* Top Row */}
            <View style={styles.rowView}>
                <DateColumnHead />
                <PosterNumberHead />
                <RequisitionerHead />
                <ApproverHead/>
                <DollarAmountHead title="Grant"/>
                <DollarAmountHead title="Cash"/>
                <DollarAmountHead title="Total"/>
                <DollarAmountHead title="Discount"/>
                <DollarAmountHead title="Recieved"/>

            </View>
        </>
    );
}

function DateColumnHead() {
    const styles = StyleSheet.create({
        dateColumn: {
            flexDirection: "row",
            width: "110%",
        },
        value: {
            fontSize: 12,
            textAlign: "center",
        },
        valueDate: {
            fontSize: 12,
            textAlign: "left",
        },
    });
    return (
        <View style={styles.dateColumn}>
            <Text style={styles.valueDate}>Date</Text>
        </View>
    );
}

function PosterNumberHead() {
    const styles = StyleSheet.create({
        columnHeader: {
            flexDirection: "col",
            width: "65%",

        },
        columnHeaderValue: {
            fontSize: 12,
            textAlign: "center",

        },
    });
    return (
        <View style={styles.columnHeader}>
            <Text style={styles.columnHeaderValue}>#</Text>
        </View>
    );
}

function RequisitionerHead() {
    const styles = StyleSheet.create({
        columnHeader: {
            flexDirection: "row",
            width: "200%",
        },
        columnHeaderValue: {
            fontSize: 12,
            textAlign: "center",

        },
    });
    return (
        <View style={styles.columnHeader}>
            <Text style={styles.columnHeaderValue}>Requisitioner</Text>
        </View>
    );
}

function ApproverHead() {
    const styles = StyleSheet.create({
        columnHeader: {
            flexDirection: "row",
            width: "200%",
        },
        columnHeaderValue: {
            fontSize: 12,
            textAlign: "center",
        },
    });
    return (
        <View style={styles.columnHeader}>
            <Text style={styles.columnHeaderValue}>Requisitioner</Text>
        </View>
    );
}

function DollarAmountHead({ title }) {
    const styles = StyleSheet.create({
        columnHeader: {
            flexDirection: "row",
            width: "80%",
        },
        columnHeaderValue: {
            fontSize: 10,
            textAlign: "center",
        },
    });
    return (
        <View style={styles.columnHeader}>
            <Text style={styles.columnHeaderValue}>{title}</Text>
        </View>
    );
}
