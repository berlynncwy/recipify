import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const DropdownMenu = ({ options = [], value, onSelect }) => {
    return (
        <Dropdown onSelect={onSelect}>
            <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                {value ? value : "Select supplier name"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {options.map((option) => (
                    <Dropdown.Item key={option.value} eventKey={option.value}>
                        {option.label}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropdownMenu;
