import React from 'react';
import Head from './Header';
import Menu from './Menu';

class System extends React.Component{
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
                    <h1>Ngân hàng đề trực tuyến</h1>
                    <p>
                        
                        Hỗ trợ nhiều dạng câu hỏi: lựa chọn, đa lựa chọn, phân loại, đối sánh, sắp thứ tự, điền khuyết, tự luận, điền giá trị. Ngân hàng đề đa phương tiện: văn bản, hình ảnh, audio, video. Hỗ trợ câu hỏi độc lập và câu hỏi theo nhóm. Hỗ trợ công thức toán học. Biên soạn ngân hàng dễ dàng trên môi trường webdoc. Chia sẻ trực tuyến cho nhiều người sử dụng. Có thể ra đề thi cho các trình độ khác nhau. Có thể ra đề kiểm tra cho từng phần kiến thức. Tự đánh giá đề thi. Cho quản lý câu hỏi và đề thi ở chế độ mật.
                        Thi trực tuyến
                        Chọn đề thi ngẫu nhiên cho các thí sinh. Thí sinh làm bài thi trên mạng. Hàng trăm thí sinh có thể thi đồng thời. Tự động ghi nhận bài làm của thí sinh. Có thể phục hồi sau sự cố. Có thể thi thử trước khi thi thật.
                        Quản lý thi
                        Tạo và quản lý các kỳ thi. Lập, in danh sách thí sinh dự thi. Nhận chuỗi phương án trả lời của thí sinh. Tự động chấm và lập bảng điểm. In bảng điểm. Cho xem lại bài làm của thí sinh. Thống kê điểm. Thống kê trả lời của thí sinh. Tự đánh giá đề thi.
                    </p>
                </div>
            </div>
        );
    }
}
export default System;