import React from 'react';
import {Button,Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import {MdNoteAdd} from 'react-icons/md';
import Head from './Header';
import Menu from './Menu';

class ContentCourses extends React.Component{
    

    
    render(){
        return(
            <div>
                <div>
                    <Head/>
                </div>
                <div style={{float:'left', width:'240px'}}>
                    <Menu/>
                </div>
                <div style={{position:'absolute',left:'240px',width:'1059px'}}>
                    <Link to="/HomeAdmin/Add">
                        <Button color="warning" style={{float:'right', margin:'3px'}}>Add <MdNoteAdd/></Button>
                    </Link>
                    <Table>
                        <thead>
                            <tr>
                                <th>Mã môn học</th>
                                <th>Tên môn học</th>
                                <th>Kỳ học</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>   
                        <tbody>  
                            
                        </tbody>
                    </Table>
                   
                </div>
            </div>

        );
    }
}
export default ContentCourses;
