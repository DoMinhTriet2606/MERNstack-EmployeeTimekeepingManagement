import React, { useContext, useEffect } from "react";
import { message, Col, Row, Card } from "antd";
import { NavLink } from "react-router-dom";
import { ShiftContext } from "../contexts/ShiftContext";
import WorkShift from "../components/shift/WorkShift";
import { SalaryContext } from "../contexts/SalaryContext";

const DashboardUser = ({ userId, userData, shiftData }) => {
    const date = new Date();
    let isTrue = date.getDay() > 0;
    useEffect(() => {
        if (firstName === "") {
            info();
        } else {
            if (isTrue) {
                getWorkShift(userId);
            }
            getSalary(userId);
            success();
        }
    }, [isTrue]);

    const { firstName, lastName, gender, birth, email, role, address } = userData;

    const { shiftQuantity, userShift } = shiftData;
    userShift.sort();
    const gridStyle = {
        width: "25%",
        textAlign: "center",
    };

    const {
        shiftState: { workShift },
        getWorkShift,
    } = useContext(ShiftContext);

    const { salaryState, getSalary } = useContext(SalaryContext);
    let totalEarnings = 0,
        monthlyEarnings = 0;
    if (salaryState[0]) {
        totalEarnings = salaryState[0].totalEarnings;
        monthlyEarnings = salaryState[0].monthlyEarnings;
    }

    // Main code
    const s2 = [];
    const s3 = [];
    const s4 = [];
    const s5 = [];
    const s6 = [];
    const s7 = [];
    const s8 = [];

    if (workShift.length > 0) {
        const workShiftItem = workShift[0];
        console.log(workShiftItem.user.username);
        workShiftItem.shifts.forEach((shift) => {
            if (shift.shiftTime === 21 || shift.shiftTime === 22 || shift.shiftTime === 23) {
                s2.push({ username: workShiftItem.user.username, shiftTime: shift.shiftTime });
            }
            if (shift.shiftTime === 31 || shift.shiftTime === 32 || shift.shiftTime === 33) {
                s3.push({ username: workShiftItem.user.username, shiftTime: shift.shiftTime });
            }
            if (shift.shiftTime === 41 || shift.shiftTime === 42 || shift.shiftTime === 43) {
                s4.push({ username: workShiftItem.user.username, shiftTime: shift.shiftTime });
            }
            if (shift.shiftTime === 51 || shift.shiftTime === 52 || shift.shiftTime === 53) {
                s5.push({ username: workShiftItem.user.username, shiftTime: shift.shiftTime });
            }
            if (shift.shiftTime === 61 || shift.shiftTime === 62 || shift.shiftTime === 63) {
                s6.push({ username: workShiftItem.user.username, shiftTime: shift.shiftTime });
            }
            if (shift.shiftTime === 71 || shift.shiftTime === 72 || shift.shiftTime === 73) {
                s7.push({ username: workShiftItem.user.username, shiftTime: shift.shiftTime });
            }
            if (shift.shiftTime === 81 || shift.shiftTime === 82 || shift.shiftTime === 83) {
                s8.push({ username: workShiftItem.user.username, shiftTime: shift.shiftTime });
            }
        });
    }

    // Message
    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.info("Please fill your information in the Information section");
    };
    const success = () => {
        messageApi.open({
            type: "success",
            content: `Hello ${lastName}! Welcome back`,
        });
    };

    return (
        <div className="home-content">
            {contextHolder}
            <div className="dashboard__container">
                <Row gutter={16}>
                    <Col span={8}>
                        <NavLink to="/user/information">
                            <Card
                                title="Information"
                                bordered={false}
                                style={{ minHeight: 224 }}
                                className="hover"
                            >
                                <Row gutter={[8, 16]} justify={"space-between"}>
                                    <Col span={12}>
                                        Name: {firstName} {lastName}
                                    </Col>
                                    <Col span={12}>Gender: {gender}</Col>
                                    <Col span={12}>Birthday: {birth}</Col>
                                    <Col span={12}>Role: {role}</Col>
                                    <Col span={12}>Email: {email}</Col>
                                    <Col span={12}>Address: {address}</Col>
                                </Row>
                            </Card>
                        </NavLink>
                    </Col>

                    <Col span={8}>
                        <NavLink to="/user/shift">
                            <Card
                                title="Next week schedule"
                                bordered={false}
                                style={{ minHeight: 224 }}
                                className="hover"
                            >
                                <Row>
                                    <Col span={12}>Registered: {shiftQuantity}</Col>
                                </Row>
                                <Row gutter={[24, 8]} className="mt-8">
                                    {userShift.map((shift, index) => {
                                        return <Col key={index}>Shift: {shift}</Col>;
                                    })}
                                </Row>
                            </Card>
                        </NavLink>
                    </Col>

                    <Col span={8}>
                        <NavLink to="/user/salary">
                            <Card
                                title="Salary"
                                bordered={false}
                                style={{ minHeight: 224 }}
                                className="hover"
                            >
                                <Row>
                                    <Col span={24}>Total Earnings: {totalEarnings}</Col>
                                </Row>
                                <Row gutter={[24, 8]} className="mt-8">
                                    <Col span={24}>Monthly Earnings: {monthlyEarnings}</Col>
                                </Row>
                            </Card>
                        </NavLink>
                    </Col>
                </Row>

                <Row className="mt-24">
                    <Col span={24}>
                        <Card title="Shift Table" bordered={false}>
                            <Card.Grid style={gridStyle}>
                                <Card
                                    title="Monday"
                                    bordered={false}
                                    style={{ minHeight: 100 }}
                                    className="config-mouse"
                                >
                                    <WorkShift array={s2} />
                                </Card>
                            </Card.Grid>
                            <Card.Grid style={gridStyle}>
                                <Card
                                    title="Tuesday"
                                    bordered={false}
                                    style={{ minHeight: 100 }}
                                    className="config-mouse"
                                >
                                    <WorkShift array={s3} />
                                </Card>
                            </Card.Grid>
                            <Card.Grid style={gridStyle}>
                                <Card
                                    title="Wednesday"
                                    bordered={false}
                                    style={{ minHeight: 100 }}
                                    className="config-mouse"
                                >
                                    <WorkShift array={s4} />
                                </Card>
                            </Card.Grid>
                            <Card.Grid style={gridStyle}>
                                <Card
                                    title="Thursday"
                                    bordered={false}
                                    style={{ minHeight: 100 }}
                                    className="config-mouse"
                                >
                                    <WorkShift array={s5} />
                                </Card>
                            </Card.Grid>
                            <Card.Grid style={gridStyle}>
                                <Card
                                    title="Friday"
                                    bordered={false}
                                    style={{ minHeight: 100 }}
                                    className="config-mouse"
                                >
                                    <WorkShift array={s6} />
                                </Card>
                            </Card.Grid>
                            <Card.Grid style={gridStyle}>
                                <Card
                                    title="Saturday"
                                    bordered={false}
                                    style={{ minHeight: 100 }}
                                    className="config-mouse"
                                >
                                    <WorkShift array={s7} />
                                </Card>
                            </Card.Grid>
                            <Card.Grid style={gridStyle}>
                                <Card
                                    title="Sunday"
                                    bordered={false}
                                    style={{ minHeight: 100 }}
                                    className="config-mouse"
                                >
                                    <WorkShift array={s8} />
                                </Card>
                            </Card.Grid>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default DashboardUser;
