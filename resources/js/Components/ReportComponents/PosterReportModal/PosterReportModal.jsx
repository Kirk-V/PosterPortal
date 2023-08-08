import React from "react";
import { Modal, Row, Col, Form } from "react-bootstrap";
import RequisitionerSection from "./RequisitionerSection";
import DiscountSection from "./DiscountSection";
import SpeedCodeSection from "./SpeedCodeSection";
import PaymentSection from "./PaymentSection";

const PosterReportModal = ({ Display = false, PosterData, handleModalHide}) => {
    return (
        <>
            <Modal size="xl" show={Display} onHide={handleModalHide}>
                <Modal.Header>
                    <Modal.Title>
                        Poster {PosterData.poster_id} -{" "}
                        <small>
                            {PosterData.transactions.transaction_date}
                        </small>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Date, Technician, Position, Department, course, requisitioner, req email, payment type,  */}
                    <RequisitionerSection
                        first_name={PosterData.requests.first_name}
                        last_name={PosterData.requests.last_name}
                        email={PosterData.requests.email}
                        department={PosterData.requests.department}
                        payment_method={PosterData.payment_method}
                    />
                    {PosterData.discount_eligible == 1 ? (
                        <DiscountSection
                            course={PosterData.requests.course_id}
                            department={PosterData.requests.course_department}
                        />
                    ) : null}
                    {PosterData.Payment_method== 'speed_code' ? <SpeedCodeSection
                        approver={PosterData.requests.approver_name}
                        grant_holder_name={
                            PosterData.requests.grant_holder_name
                        }
                        approver_type={PosterData.requests.approver_type}
                        designate_name={PosterData.requests.designate_name}
                        approver_email={PosterData.requests.approver_email}
                        speed_code={PosterData.speed_code}
                        account={PosterData.account}
                    /> : null}
                    <PaymentSection
                        quantity={PosterData.quantity}
                        width={PosterData.width}
                        height={PosterData.height}
                        units={PosterData.units}
                        total={PosterData.transactions.total}
                        total_received={PosterData.transactions.total_received}
                        discount={PosterData.discount}
                        discount_eligible={PosterData.discount_eligible}
                        payment_method={PosterData.payment_method}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PosterReportModal;
