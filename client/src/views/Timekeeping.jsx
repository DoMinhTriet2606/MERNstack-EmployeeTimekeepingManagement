import React, { useContext, useEffect } from "react";
import { ShiftContext } from "../contexts/ShiftContext";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { Button, Col, Row, ConfigProvider, message, Statistic, Card } from "antd";

import "../assets/css/timekeeping/timekeeping.css";
import SingleShift from "../components/shift/SingleShift";
import { SalaryContext } from "../contexts/SalaryContext";
import { AuthContext } from "../contexts/AuthContext";

const Timekeeping = () => {
    useEffect(() => {
        messageApi.info("Here is your timekeeping! ^^");
        getWorkShift(user._id);
        getSalary(user._id);
    }, []);

    // Context
    const {
        authState: { user },
    } = useContext(AuthContext);

    const {
        shiftState: { workShift, shiftLoading },
        getWorkShift,
    } = useContext(ShiftContext);
    const data = workShift[0];

    const { salaryState, getSalary, createSalary } = useContext(SalaryContext);
    console.log(salaryState);
    let salaryChecked = [];
    let totalEarnings = 0,
        monthlyEarnings = 0;
    if (salaryState[0]) {
        salaryChecked = salaryState[0].timekeeper;
        totalEarnings = salaryState[0].totalEarnings;
        monthlyEarnings = salaryState[0].monthlyEarnings;
    }

    // Handle events
    const generateSalary = async () => {
        const { success, message } = await createSalary(user._id);

        if (success) {
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: message,
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: message,
            });
        }
    };

    // Message
    const [messageApi, contextHolder] = message.useMessage();

    let body = null;
    if (shiftLoading || data === undefined) {
        body = (
            <>
                <div className="container">
                    <Loader />
                </div>
            </>
        );
    } else {
        body = (
            <>
                <Card className="mt-16" style={{ width: 400, border: "2px solid #E7BCDE" }}>
                    <Statistic title="Monthly Earnings" value={monthlyEarnings} prefix="VND" />
                    <Statistic title="Total Earnings" value={totalEarnings} prefix="VND" />
                </Card>

                <Row gutter={[16, 16]}>
                    {data.shifts.map((shift, index) => (
                        <Col span={6} key={index}>
                            <SingleShift shift={shift} timekeeper={salaryChecked} />
                        </Col>
                    ))}
                </Row>
            </>
        );
    }

    let generateButton = null;
    if (!Array.isArray(salaryState)) {
        generateButton = (
            <>
                <div>
                    <h2 className="fs-lg">Click this button to generate your salary</h2>
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    colorPrimary: "#33BBC5",
                                    colorPrimaryHover: "#85E6C5",
                                },
                            },
                        }}
                    >
                        <Button
                            className="mt-16 transition"
                            type="primary"
                            size="large"
                            onClick={generateSalary}
                        >
                            Generate
                        </Button>
                    </ConfigProvider>
                </div>
            </>
        );
    }

    return (
        <div className="home-content">
            {contextHolder}
            <div className="container--v5">
                {generateButton}

                {body}
            </div>
        </div>
    );
};

export default Timekeeping;
