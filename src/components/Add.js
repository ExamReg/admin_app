import React from "react";
import { Button, Form, Row, Label, Input } from "reactstrap";
import { MdNoteAdd } from "react-icons/md";
class Add extends React.Component {
  render() {
    return (
      <Form style={{ width: "500px", padding: "10px", margin: "auto" }}>
        <fieldset>
          <legend>Create Course</legend>
          <Row>
            <Label for="MaMH">Mã môn học:</Label>
            <Input type="text" name="MaMH" id="MaMH" />
          </Row>
          <Row>
            <Label for="TenMH">Tên môn học:</Label>
            <Input type="text" name="TenMH" id="TenMH" />
          </Row>
          <Row>
            <Label for="KH">Kỳ học:</Label>
            <Input type="text" name="KH" id="KH" />
          </Row>
          <Row>
            <Label for="file">File Excel:</Label>
            <Input type="file" name="file" id="file" />
          </Row>
          <Row style={{ float: "right" }}>
            <Button outline color="success">
              Add <MdNoteAdd />
            </Button>
          </Row>
        </fieldset>
      </Form>
    );
  }
}
export default Add;
