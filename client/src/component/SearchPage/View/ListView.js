//import { useSSRSafeId } from '@react-aria/ssr'; //.?
//import userEvent from '@testing-library/user-event';
import React from "react";
import styled from "styled-components";

const contentBoxStyle = styled.div`
  .contentBox:hover {
    background: gray;
    margin: 0 auto;
  }
`;
const ContentBoxStyle = {
  display: "flex",
  border: "1px solid gray",
  height: "auto",
  float: "none",
  padding: "3px",
  justifyContent: "space-between",
  //margin : '0 auto'
};
const categoryStyle = {
  display: "flex",
  border: "1px solid gray",
  height: "auto",
  float: "none",
  padding: "3px",
  background: "#f4bf5a",
  justifyContent: "space-between",
};

const naverUrl =
  "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=";

function ContentBox({ content }) {
  //console.log(content);
  //
  return (
    <div style={ContentBoxStyle} className="col-sm-11 col-md-8 contentBox">
      <table
        style={{ textAlign: `left`, height: `auto`, wordBreak: `break-all` }}
      >
        <tr>
          <td width="190px">
            <a
              href={naverUrl + `${content.이름}`}
              target="_blank"
              style={{ color: `black`, textDecoration: `none` }}
            >
              <b>{content.이름}</b>
            </a>
          </td>
          <td width="100px">{content.주소}</td>
          <td width="100px">{content.대표음식}</td>
          <td width="500px">{content.간단한설명}</td>
          <td width="150px">{content.태그}</td>
        </tr>
      </table>
    </div>
  );
}
function ListView(props) {
  //console.log(props);
  const { contents, Data } = props;

  return (
    <div className={"row justify-content-center"}>
      <div style={categoryStyle} className="col-sm-11 col-md-8 contentBox">
        <tr style={{ textAlign: `left` }}>
          <td className="title" width="190px">
            <b>식당 이름</b>
          </td>
          <td className="title" width="100px">
            <b>위치</b>
          </td>
          <td className="title" width="100px">
            <b>대표 메뉴</b>
          </td>
          <td className="title" width="500px">
            <b>설명</b>
          </td>
          <td width="150px">
            <b>태그</b>
          </td>
        </tr>
      </div>
      {contents.map((content) => (
        <ContentBox content={content} key={content.id} />
      ))}
    </div>
  );
}

export default ListView;
