import React, { useContext, useEffect, useRef } from "react";
import { ShiftContext } from "../../contexts/ShiftContext";
import { message } from "antd";

const ShiftShow = ({ shifts }) => {
    useEffect(() => {
        const shiftContent = document.getElementById("shift-content");
        const checkboxes = shiftContent.querySelectorAll('input[type="checkbox"]');
        const inputs = Array.from(checkboxes);
        shifts.forEach((shift) => {
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].value == shift.shiftTime) {
                    inputs[i].checked = true;
                }
            }
        });
        success();
    }, []);

    const { getUser } = useContext(ShiftContext);

    // Message
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: "success",
            content: `Here is your Shift Register next week!`,
        });
    };
    const error = () => {
        messageApi.open({
            type: "error",
            content: "You need to register at least 5 shifts",
        });
    };
    const warning = () => {
        messageApi.open({
            type: "warning",
            content: "This is a warning message",
        });
    };

    const changeShift = () => {
        getUser();
    };

    let currentDate = new Date("2023-10-23");
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

    let weekNumber = Math.ceil(days / 7);

    const buttonRef = useRef();
    useEffect(() => {
        if (currentDate.getDay() === 5) {
            buttonRef.current.classList.toggle("input--disabled");
        }
    }, [currentDate.getDay()]);

    // let day = currentDate.getDate(),
    //     month =
    //         currentDate.getMonth() + 1 < 10
    //             ? "0" + currentDate.getMonth() + 1
    //             : currentDate.getMonth() + 1,
    //     year = currentDate.getFullYear();
    // console.log(`${year}-${month}-${day}`);

    return (
        <div className="home-content">
            {contextHolder}
            <div className="shift">
                <div className="shift__title">
                    <h2>Shift Registration</h2>
                </div>

                <form>
                    <div className="shift__content" id="shift-content">
                        <div className="shift__item">
                            <h3>Monday</h3>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={21} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 1</span>
                                </label>
                            </div>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={22} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 2</span>
                                </label>
                            </div>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={23} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 3</span>
                                </label>
                            </div>
                        </div>
                        <div className="shift__item">
                            <h3>Tuesday</h3>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={31} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 1</span>
                                </label>
                            </div>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={32} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 2</span>
                                </label>
                            </div>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={33} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 3</span>
                                </label>
                            </div>
                        </div>
                        <div className="shift__item">
                            <h3>Wednesday</h3>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={41} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 1</span>
                                </label>
                            </div>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={42} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 2</span>
                                </label>
                            </div>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={43} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 3</span>
                                </label>
                            </div>
                        </div>
                        <div className="shift__item">
                            <h3>Thursday</h3>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={51} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 1</span>
                                </label>
                            </div>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={52} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 2</span>
                                </label>
                            </div>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={53} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 3</span>
                                </label>
                            </div>
                        </div>
                        <div className="shift__item">
                            <h3>Friday</h3>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={61} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 1</span>
                                </label>
                            </div>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={62} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 2</span>
                                </label>
                            </div>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={63} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 3</span>
                                </label>
                            </div>
                        </div>
                        <div className="shift__item">
                            <h3>Saturday</h3>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={71} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 1</span>
                                </label>
                            </div>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={72} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 2</span>
                                </label>
                            </div>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={73} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 3</span>
                                </label>
                            </div>
                        </div>
                        <div className="shift__item">
                            <h3>Sunday</h3>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={81} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 1</span>
                                </label>
                            </div>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={82} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 2</span>
                                </label>
                            </div>
                            <div className="shift__check input--disabled">
                                <label className="checkbox path">
                                    <input type="checkbox" name="shiftTime" value={83} />
                                    <svg viewBox="0 0 21 21">
                                        <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                                    </svg>
                                    <span>St 3</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <aside>
                        <h3>
                            <span>Shift 1 :</span> From 7h55 to 13h
                        </h3>
                        <h3>
                            <span>Shift 2:</span> From 12h55 to 18h
                        </h3>
                        <h3>
                            <span>Shift 3:</span> From 17h55 to 23h
                        </h3>
                    </aside>
                    <footer className="form__footer">
                        <span className="">
                            Week {weekNumber + 1} - Lock when it is pass 23:59 Thursday
                        </span>
                        <div className="button secondary" ref={buttonRef}>
                            <input type="button" value="Change" onClick={changeShift} />
                        </div>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default ShiftShow;
