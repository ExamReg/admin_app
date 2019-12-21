import React from 'react';
import "./style.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";

class DatePickerCustom extends React.Component{
    render() {
        let selected = this.props[this.props.name];
        return(
                <DatePicker selected={moment(selected).valueOf()} onChange={(value) => this.props.handleChangeDate(value, this.props.name)}/>        )
    }
}

export default DatePickerCustom;