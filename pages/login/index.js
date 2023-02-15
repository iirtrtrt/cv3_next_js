import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BaseLayout from "../../components/base_layout";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";

export default function Login() {
  const [cookies, setCookie] = useCookies(["access-token"]);
  const router = useRouter();

  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  function validateEmail(email) {
    return emailRegEx.test(email); //형식에 맞을 경우, true 리턴
  }
  async function loginApi(json) {
    await axios
      .post(
        "http://localhost:5000/api/auth/login/",
        JSON.stringify({
          email: json.email,
          password: json.password,
        }),
        {
          headers: {
            "Content-Type": `application/json`,
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        setCookie("access-token", res.data.accessToken);
        router.push("/");
      })
      .catch((err) => console.log(err));
  }

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function validate() {
    const errors = {
      email: "",
      password: "",
    };

    if (!userData.email) {
      errors.email = "이메일 에러";
    } else if (!validateEmail(userData.email)) {
      errors.email = "이메일 에러";
    }
    if (!userData.password) {
      errors.password = "비밀번호 에러";
    }

    return errors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
    if (Object.values(errors).some((v) => v)) {
      return;
    }

    loginApi(userData);
  }

  return (
    <BaseLayout>
      <div>
        <Link href={"/"}>
          <Image src="/gnb_bi.png" width={110} height={50} alt={"Logo"} />
        </Link>
        <form onSubmit={handleSubmit}>
          <div>
            {errors.email && <span>{errors.email}</span>}
            {errors.password && <span>{errors.password}</span>}
          </div>
          <div>
            <label name="email">이메일(ID)</label>
            <div>
              <input
                type="text"
                name="email"
                placeholder="이메일을 입력해주세요."
                value={userData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label name="password">비밀번호</label>
            <div>
              <input
                type="password"
                name="password"
                placeholder="8자 이상, 숫자, 특수문자 포함"
                value={userData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit">로그인</button>
        </form>
        <div>
          <Link href={""}>이메일 · 비밀번호 찾기</Link>
        </div>
        <Link href={"/register"}>
          <button>라방바 회원가입 하기</button>
        </Link>
      </div>
    </BaseLayout>
  );
}
