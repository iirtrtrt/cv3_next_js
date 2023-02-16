import { useEffect, useRef, useState } from "react";
import BaseLayout from "../components/base_layout";
import Link from "next/link";
import Image from "next/image";
import { useCookies } from "react-cookie";
import typeApi from "./api/type_api";
import rankingApi from "./api/ranking_api";
import getTypeByCid from "../functions/get_type_by_cid";
import {
  Body,
  NavBar,
  NavBtnDiv,
  NavDot,
  NavLink,
  SecondBody,
  SubjectDiv,
  SubjectSpan,
  SubtitlePTag,
  TableDiv,
  Table,
  THead,
  SubjectTR,
  TR,
  TD,
  IndexTD,
  TitleSpan1,
  TitleSpan2,
  LinkStyle,
  ToCenter,
  ToRight,
  TH,
  SubjectSvg,
  TableSvg,
  ClickDiv,
  ClickITag,
  ClickH5,
  ClickPTag,
} from "../styles/main_style";
import { ePlatform } from "../enum/platform";
import { dateMaker, timeMaker } from "../functions/date_time_maker";
import { numToKor } from "../functions/num_to_kor";

export default function Home() {
  const [cookies, setCookie] = useCookies(["access-token"]);

  const [ranking, setRanking] = useState();
  const [types, setTypes] = useState();
  const [click1, setClick1] = useState(false);

  function handleLogout() {
    setCookie("access-token", "");
    rankingApi().then((res) => setRanking(res));
    typeApi().then((res) => setTypes(res));
  }

  useEffect(() => {
    rankingApi().then((res) => setRanking(res));
    typeApi().then((res) => setTypes(res));
  }, []);

  function openPopUp(e) {
    setClick1(true);
  }

  function closePopUp(e) {
    setClick1(false);
  }

  return (
    <BaseLayout>
      <NavBar>
        <Link href={"/"}>
          <Image src="/gnb_bi.png" width={74} height={31} alt={"Logo"} />
        </Link>
        <NavBtnDiv>
          {cookies["access-token"] === "undefined" ||
          cookies["access-token"] === "" ? (
            <div>
              <Image
                src={"https://datalab.labangba.com/_app/Nav/gnb_user.svg"}
                width={18}
                height={18}
                style={{ verticalAlign: "middle", marginRight: "8px" }}
              />
              <NavLink href={"/login"}>로그인</NavLink>
              <NavDot />
              <NavLink href={"/register"}>회원가입 </NavLink>
            </div>
          ) : (
            <div>
              <NavLink href={"/"} onClick={handleLogout}>
                로그아웃
              </NavLink>
            </div>
          )}
        </NavBtnDiv>
      </NavBar>
      <Body>
        <SecondBody>
          {click1 && (
            <ClickDiv style={{ left: "255.172px", top: "67.6562px" }}>
              <ClickITag onClick={closePopUp} />
              <ClickH5>라방랭킹</ClickH5>
              <ClickPTag>
                상단에서 선택한 카테고리의 추정 매출액이 높은 방송 표기
              </ClickPTag>
            </ClickDiv>
          )}
          <SubjectDiv>
            <SubjectSpan>라방 랭킹</SubjectSpan>
            <SubjectSvg onClick={openPopUp} />
          </SubjectDiv>
          <SubtitlePTag>72시간 동안 가장 매출액 높은 라이브방송</SubtitlePTag>
          <TableDiv>
            <Table>
              <THead>
                <SubjectTR>
                  <TH style={{ width: "4%" }}>
                    <div></div>
                  </TH>
                  <TH style={{ width: "31%" }}>
                    <div>방송정보</div>
                  </TH>
                  <TH style={{ width: "12%" }}>
                    <div>분류</div>
                  </TH>
                  <TH style={{ width: "12.5%" }}>
                    <div>방송시간</div>
                  </TH>
                  <TH style={{ width: "10%" }}>
                    <div>조회수</div>
                  </TH>
                  <TH style={{ width: "10%" }}>
                    <div>
                      판매량
                      <TableSvg />
                    </div>
                  </TH>
                  <TH style={{ width: "12.5%" }}>
                    <div>
                      매출액
                      <TableSvg />
                    </div>
                  </TH>
                  <TH style={{ width: "8%" }}>
                    <div>상품수</div>
                  </TH>
                </SubjectTR>
              </THead>
              <tbody>
                {ranking &&
                  ranking.map((row, index) => (
                    <TR key={index + 1}>
                      <IndexTD>{index + 1}</IndexTD>
                      <TD>
                        <LinkStyle href={row.link} target={"_blank"}>
                          <TitleSpan1 style={{ width: "297.594px" }}>
                            {row.title}
                          </TitleSpan1>
                          <TitleSpan2>
                            {ePlatform[row.platform_id] === undefined
                              ? row.platform_id
                              : ePlatform[row.platform_id]}
                          </TitleSpan2>
                        </LinkStyle>
                      </TD>
                      <TD>
                        <ToCenter>
                          {types && getTypeByCid(types, row.cid)}
                        </ToCenter>
                      </TD>
                      <TD>
                        <ToCenter>{dateMaker(row.datetime_start)}</ToCenter>
                        <ToCenter style={{ color: "#7e7d77" }}>
                          {timeMaker(row.datetime_start)}
                        </ToCenter>
                      </TD>
                      <TD>
                        {row.visit_cnt === null ? (
                          <ToCenter>로그인</ToCenter>
                        ) : (
                          <ToRight>{numToKor(row.visit_cnt)}</ToRight>
                        )}
                      </TD>
                      <TD>
                        {row.sales_cnt === null ? (
                          <ToCenter>로그인</ToCenter>
                        ) : (
                          <ToRight>{numToKor(row.sales_cnt)}</ToRight>
                        )}
                      </TD>
                      <TD>
                        {row.sales_amt === null ? (
                          <ToCenter>로그인</ToCenter>
                        ) : (
                          <ToRight>{numToKor(row.sales_amt)}</ToRight>
                        )}
                      </TD>
                      <TD style={{ textAlign: "right" }}>{row.product_cnt}</TD>
                    </TR>
                  ))}
              </tbody>
            </Table>
          </TableDiv>
        </SecondBody>
      </Body>
    </BaseLayout>
  );
}
