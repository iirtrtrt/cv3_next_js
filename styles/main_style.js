import styled from "styled-components";
import Link from "next/link";

export const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  padding-left: 25px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 60px;
  width: 100%;
  background: white;
  border-bottom: 1px solid #f3f3f3;
  z-index: 999999;
`;

export const NavBtnDiv = styled.div`
  margin-left: auto;
  height: 20px;
  padding: 0 20px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-left: 1px solid #e0e0e0;
  font-size: 12px;
  color: #333333;
`;

export const NavDot = styled.i`
  background: #8f8f8f;
  width: 3px;
  height: 3px;
  border-radius: 3px;
  margin: 0 8px;
  font-size: 12px;
  color: #333333;
`;

export const NavLink = styled(Link)`
  font-size: 12px;
  color: #9e9e9e;
  text-decoration: none;
`;

export const Body = styled.div`
  margin-top: 60px;
`;

export const SecondBody = styled.div`
  width: 1000px;
  margin: 0 auto;
  padding: 40px 20px 100px;
`;

export const SubjectDiv = styled.div`
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: 500;
  color: #212121;
`;

export const SubjectSpan = styled.span`
  margin-bottom: 6px;
  font-size: 16px;
  font-weight: 500;
  color: #212121;
`;

export const SubjectSvg = styled.i`
  display: inline-block;
  margin-left: 4px;
  height: 22px;
  width: 22px;
  cursor: pointer;
  background: url("https://datalab.labangba.com/__modules/Title/tooltip_icon.svg");
  vertical-align: middle;
`;

export const SubtitlePTag = styled.p`
  margin-bottom: 16px;
  font-size: 13px;
  color: #9e9e9e;
`;

export const TableDiv = styled.div`
  -webkit-flex-grow: 1;
  flex-grow: 1;
`;

export const Table = styled.table`
  text-indent: initial;
  border-spacing: 2px;
  display: table;
  border-collapse: collapse;
  box-sizing: border-box;
  text-indent: initial;
  border-spacing: 2px;
  border-color: grey;
  width: 100%;
`;

export const THead = styled.thead`
  height: 45px;
  font-size: 13px;
  font-weight: 400;
  color: #7e7d77;
`;

export const SubjectTR = styled.tr`
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
  border-bottom: 1px solid #8f8f8f;
  border-top: 1px solid #f3f3f3;
`;

export const TH = styled.th`
  display: table-cell;
  vertical-align: inherit;
  text-align: -internal-center;
  height: 45px;
  font-size: 13px;
  font-weight: 400;
  color: #7e7d77;
`;

export const TableSvg = styled.i`
  display: inline-block;
  margin-left: 2px;
  height: 18px;
  width: 18px;
  cursor: pointer;
  background: url("https://datalab.labangba.com/__modules/Title/tooltip_icon.svg")
    no-repeat 50%;
  vertical-align: middle;
`;

export const TR = styled.tr`
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
  border-bottom: 1px solid #f3f3f3;
  border-top: 1px solid #f3f3f3;
  height: 55px;
`;

export const IndexTD = styled.td`
  padding: 0 8px;
  text-align: center;
  font-weight: 700;
  color: #fca600;
`;

export const TD = styled.td`
  font-size: 15px;
  font-weight: 400;
  color: #333;
`;

export const LinkStyle = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  padding: 0 8px;
  line-height: 20px;
  cursor: pointer;
`;

export const TitleSpan1 = styled.span`
  font-weight: 500;
  color: #212121;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
`;

export const TitleSpan2 = styled.span`
  color: #7e7d77;
`;

export const ToCenter = styled.div`
  display: flex;
  justify-content: center;
`;

export const ToRight = styled.div`
  display: flex;
  justify-content: end;
`;

export const ClickDiv = styled.div`
  position: absolute;
  border: 1px solid #333;
  border-radius: 4px;
  background: #fff;
  width: 280px;
  padding: 14px 20px;
  z-index: 99999;
  display: block;
`;

export const ClickITag = styled.i`
  float: right;
  width: 18px;
  height: 18px;
  cursor: pointer;
  background: url("https://datalab.labangba.com/_app/tooltip_close.svg")
    no-repeat 50%;
`;

export const ClickH5 = styled.h5`
  font-size: 14px;
  color: #333;
  font-weight: 700;
`;

export const ClickPTag = styled.p`
  white-space: pre-line;
  font-size: 14px;
  color: #8f8f8f;
  margin-top: 10px;
`;
