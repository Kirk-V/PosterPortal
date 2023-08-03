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

export default function PDFRow({ rowData }) {
    // console.log("NEW ROW "+JSON.stringify(rowData));
    const styles = StyleSheet.create({
        rowView: {
            flexDirection: "row",
            paddingTop: 5,
            paddingBottom: 5,
            borderBottom: 1,
            borderColor: "grey"
        },
        infoColumn: {
            flexDirection: "col",
            width: "100%",

        },

        valueDollars: {
            fontSize: 12,
            textAlign: "center",
        },
    });
    return (
        <View style={styles.rowView}>
            <DateCell date={rowData.transactions.transaction_date} />
            <PosterNumberCell posterNumber={rowData.poster_id} />
            <RequisitionerCell
                first={rowData.requests.first_name}
                last={rowData.requests.last_name}
                email={rowData.requests.email}
            />
            <ApproverCell name={rowData.requests.approver_name} type={rowData.requests.approver_type} email={rowData.requests.approver_email}/>
            <DollarCell amount={rowData.transactions.total} active={rowData.requests.payment_method == "speed_code"}/>
            <DollarCell amount={rowData.transactions.total} active={rowData.requests.payment_method == "cash"}/>
            <DollarCell amount={rowData.discount} active={rowData.discount_eligible == "1"}/>
            <DollarCell amount={rowData.transactions.total}/>
            <DollarCell amount={rowData.transactions.total_received}/>
        </View>
    );
}

function RequisitionerCell({ first, last, email }) {
    const styles = StyleSheet.create({
        infoColumn: {
            flexDirection: "col",
            width: "200%",

        },
        value: {
            fontSize: 10,
            width: "100%",
            textAlign: "left",
        },
    });
    return (
        <View style={styles.infoColumn}>
            <Text style={styles.value}>
                {first} {last}
            </Text>
            <Text style={styles.value}>{email}</Text>
        </View>
    );
}

function DateCell({ date }) {
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
            <Text style={styles.valueDate}>{date}</Text>
        </View>
    );
}

function PosterNumberCell({ posterNumber }) {
    const styles = StyleSheet.create({
        infoColumn: {
            flexDirection: "col",
            width: "65%",

        },
        value: {
            fontSize: 12,
            textAlign: "center",
        },
    });
    return (
        <View style={styles.infoColumn}>
            <Text style={styles.value}>{posterNumber}</Text>
        </View>
    );
}

function ApproverCell({ name, type, email }) {
    const styles = StyleSheet.create({
        infoColumn: {
            flexDirection: "col",
            width: "200%",

        },
        value: {
            fontSize: 10,
            width: "100%",
            textAlign: "left",
        },
    });
    return (
        <View style={styles.infoColumn}>
            <Text style={styles.value}>{name}</Text>
            <Text style={styles.value}>{type}</Text>
            <Text style={styles.value}>{email}</Text>
        </View>
    );
}

function DollarCell({amount, active=true}) {
    const styles = StyleSheet.create({
        infoColumn: {
            flexDirection: "col",
            width: "80%",

        },
        value: {
            fontSize: 10,
            width: "100%",
            textAlign: "left",
        },
    });
    return (
        <View style={styles.infoColumn}>
            {active ? <Text style={styles.value}>{parseFloat(amount).toFixed(2)}</Text> : <Text>-</Text>}
        </View>
    );
}
