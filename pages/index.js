import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BaseLayout from "../components/base_layout";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";

export default function Home() {
  const router = useRouter();

  const [cookies, setCookie] = useCookies(["access-token"]);

  const [data, setData] = useState();
  const [types, setTypes] = useState();

  async function rankingApi() {
    await axios
      .get("http://localhost:5000/api/ranking", {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }

  async function logoutApi() {
    await axios
      .post("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
  }

  async function typesApi() {
    const res = await fetch("https://datalab.labangba.com/home/gnb", {
      headers: {
        accept: "*/*",
        "accept-language": "en-AU,en;q=0.9,ko-KR;q=0.8,ko;q=0.7,en-US;q=0.6",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        Referer: "https://datalab.labangba.com/recruit",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: "{}",
      method: "POST",
    });

    return res.json();
  }

  useEffect(() => {
    rankingApi();
    typesApi().then((res) => setTypes(res));
  }, []);

  function typeByCid(cid) {
    const current = types["cats"][cid];
    if (current["pid"] !== null) {
      return types["cats"][current.pid]["name"];
    } else {
      return current["name"];
    }
  }

  function handleLogout() {
    setCookie("access-token", "");
    rankingApi();
    typesApi().then((res) => setTypes(res));
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
            {data &&
              data.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <span>{row.title}</span>
                    <span>{row.platform_id}</span>
                  </td>
                  <td>{typeByCid(row.cid)}</td>
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
