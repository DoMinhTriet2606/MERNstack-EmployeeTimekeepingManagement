import React from "react";

const WorkShift = ({ array }) => {
    return (
        <div style={{ padding: "10px 20px" }}>
            <ul className="shift__name-list">
                {array.map((user, index) => {
                    return (
                        <li key={index}>
                            {user.username} - Shift {user.shiftTime % 10}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default WorkShift;
