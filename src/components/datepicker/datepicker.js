import React from 'react';
import "./style.css"
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

class DatePickerCustom extends React.Component {
    render() {
        let selected = this.props[this.props.name];
        return (
            <DatePicker selected={selected}
                        timeFormat={this.props.timeFormat}
                        timeIntervals={30}
                        timeCaption="time"
                        showTimeSelect
                        dateFormat={this.props.dateFormat}
                        onChange={(value) => this.props.handleChangeDate(value, this.props.name)}/>
        )
    }
}

export default DatePickerCustom;