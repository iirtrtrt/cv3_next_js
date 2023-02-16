import styled from "styled-components";
import Link from "next/link";

export const Foot = styled.footer`
  margin: 0;
  padding: 0;
  font-family: Noto Sans KR, sans-serif;
  letter-spacing: -0.04em;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
  -webkit-text-size-adjust: none;
  border-top: 1px solid #e0e0e0;
`;

export const FootDiv = styled.div`
  width: 960px;
  margin: 48px auto 60px;
`;

export const FootDivRight = styled.div`
  float: right;
  margin-top: 9px;
  font-size: 12px;
  color: #a8a8a8;
`;

export const FootLink = styled(Link)`
  font-size: 13px;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  margin-right: 30px;
`;

export const FootPTag = styled.p`
  font-size: 12px;
  color: #a8a8a8;
  margin-top: 14px;
`;
