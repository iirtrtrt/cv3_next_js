import { useEffect, useState } from "react";
import BaseLayout from "../components/base_layout";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";
import typeApi from "./api/type_api";
import rankingApi from "./api/ranking_api";
import getTypeByCid from "../functions/get_type_by_cid";

export default function Home() {
  const [cookies, setCookie] = useCookies(["access-token"]);

  const [ranking, setRanking] = useState();
  const [types, setTypes] = useState();

  useEffect(() => {
    rankingApi().then((res) => setRanking(res));
    typeApi().then((res) => setTypes(res));
  }, []);

  function handleLogout() {
    setCookie("access-token", "");
    rankingApi().then((res) => setRanking(res));
    typeApi().then((res) => setTypes(res));
  }

  return (
    <BaseLayout>
      <div>
        <Link href={"/"}>
          <Image src="/gnb_bi.png" width={74} height={31} alt={"Logo"} />
        </Link>
        {cookies["access-token"] === "undefined" ||
        cookies["access-token"] === "" ? (
          <div>
            <Link href={"/login"}>로그인</Link>
            <Link href={"/register"}>회원가입 </Link>
          </div>
        ) : (
          <div>
            <Link href={"/"} onClick={handleLogout}>
              로그아웃
            </Link>
          </div>
        )}
      </div>
      <div>
        <div>
          <span>라방 랭킹</span>
        </div>
        <p>72시간 동안 가장 매출액 높은 라이브방송</p>
        <table>
          <thead>
            <tr>
              <th width="4%">
                <div></div>
              </th>
              <th width="31%">
                <div>방송정보</div>
              </th>
              <th width="12%">
                <div>분류</div>
              </th>
              <th width="12.5%">
                <div>방송시간</div>
              </th>
              <th width="10%">
                <div>조회수</div>
              </th>
              <th width="10%">
                <div>판매량</div>
              </th>
              <th width="12.5%">
                <div>매출액</div>
              </th>
              <th width="8%">
                <div c>상품수</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {ranking &&
              ranking.map((row, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>
                    <Link href={row.link} target={"_blank"}>
                      <span>{row.title}</span>
                      <span>{row.platform_id}</span>
                    </Link>
                  </td>
                  <td>{types && getTypeByCid(types, row.cid)}</td>
                  <td>{row.datetime_start}</td>
                  <td>{row.visit_cnt === null ? "로그인" : row.visit_cnt}</td>
                  <td>{row.sales_cnt === null ? "로그인" : row.sales_cnt}</td>
                  <td>{row.sales_amt === null ? "로그인" : row.sales_amt}</td>
                  <td>{row.product_cnt}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </BaseLayout>
  );
}
