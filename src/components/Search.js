import React from 'react';
import { InputGroup, Button, InputGroupAddon, Input } from 'reactstrap';
import {AiOutlineSearch} from 'react-icons/ai';

const Search = (props) => {
  return (
    <div>
      
      <InputGroup style={{width:'500px', margin:'3px'}}>
        <Input  />
        <InputGroupAddon addonType="append">
          <Button outline color="success">Tim kiem<AiOutlineSearch/></Button>
        </InputGroupAddon>
      </InputGroup>
     
    </div>
  );
};

export default Search;