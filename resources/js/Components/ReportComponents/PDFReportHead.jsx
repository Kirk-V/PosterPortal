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
            height: 35,
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
            <View style={styles.aboveHeader}>
                <InformationTitle />
                <PaymentMethodsTitle />
            </View>
            <View style={styles.rowView}>
                <DateColumnHead />
                <PosterNumberHead />
                <RequisitionerHead />
                <ApproverHead/>
                <DollarAmountHead title="Grant"/>
                <DollarAmountHead title="Cash"/>
                <DollarAmountHead title="Discount" rightBorder={true}/>
                <DollarAmountHead title="Total"/>
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
            marginLeft: '100px'
        },
    });
    return (
        <View style={styles.AboveHeaderCell}>
            <Text style={styles.centerValue}>Information</Text>
        </View>
    );
}

function PaymentMethodsTitle() {
    const styles = StyleSheet.create({
        AboveHeaderCell: {
            width : "33.6%",
            borderRight: '1px',
        },
        centerValue: {
            fontSize: 12,
            marginLeft: '12px'
        },
        blankSpace: {
            width: "8.93%"
        }
    });
    return (
        <>
        <View style={styles.AboveHeaderCell}>
            <Text style={styles.centerValue}>Payment Methods</Text>
        </View>
        <View style={styles.blankSpace}>
            
        </View>
        </>
    );
}

function DateColumnHead() {
    const styles = StyleSheet.create({
        dateColumn: {
            flexDirection: "row",
            width: "8%",
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
            width: "7%",

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
            width: "20%",
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
            width: "20%",
            borderRight: '1px',
        },
        columnHeaderValue: {
            fontSize: 12,
            textAlign: "center",
        },
    });
    return (
        <View style={styles.columnHeader}>
            <Text style={styles.columnHeaderValue}>Approver</Text>
        </View>
    );
}

function DollarAmountHead({ title, rightBorder=false }) {
    const styles = StyleSheet.create({
        columnHeader: {
            flexDirection: "row",
            paddingLeft : "5px",
            width: "11.2%",
        },
        columnHeaderWithRightBorder :
        {
            paddingLeft : "5px",
            flexDirection: "row",
            width: "11.2%",
            borderRight: "1px",
        },
        
        columnHeaderValue: {
            fontSize: 10,
            textAlign: "center",
        },
        borderEnd: {
            borderRight: "1px",
        }
    });
    return (
        <View style={rightBorder ? styles.columnHeaderWithRightBorder : styles.columnHeader }>
            <Text style={styles.columnHeaderValue}>{title}</Text>
        </View>
    );
}
