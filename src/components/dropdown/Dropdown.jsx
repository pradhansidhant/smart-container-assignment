import React from 'react';
import Select from "react-dropdown-select";

const Dropdown = (props) => {
    return (<Select
        options={props.options}
        labelField={props.labelField}
        valueField={props.valueField}
        onChange={props.onChange}
        placeholder={props.placeholder}
        multi={props.multi} />)
};

Dropdown.defaultProps = {
    multi: false,
    placeholder: "Select",
    labelField: "label",
    valueField: "value",
}

export default Dropdown;