import React from "react";
import { css } from "@emotion/core";
import {PulseLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 a;
  border-color: red;
  display: flex;
  align-items: center;
`;

export default class SpinnerCustom extends React.Component {
    render() {
        console.log(this.props.loading);
        return (
                <PulseLoader
                    css={override}
                    size={16}
                    color={"white"}
                    loading={this.props.loading}
                />
        );
    }
}