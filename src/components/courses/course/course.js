import React from 'react';

export default class Course extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        console.log(this.props.location)
        return(
            <h1>Course</h1>
        )
    }
}