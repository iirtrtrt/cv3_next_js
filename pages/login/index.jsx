import { useState } from "react";
import { useRouter } from "next/router";
import BaseLayout from "../../components/base_layout";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";
import validateEmail from "../../functions/validate_email";
import loginApi from "../api/login_api";

export default function Login() {
  const [cookies, setCookie] = useCookies(["access-token"]);
  const router = useRouter();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  function checkLoginError() {
    const errors = {
      email: "",
      password: "",
    };

    if (!userData.email) {
      errors.email = "이메일 에러";
    } else if (!validateEmail(userData.email)) {
      errors.email = "이메일 형식 에러";
    }
    if (!userData.password) {
      errors.password = "비밀번호 에러";
    }

    return errors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const checkedError = checkLoginError();
    setErrors(checkedError);

    if (!errors.email && !errors.password) {
      loginApi(userData).then((res) => {
        setCookie("access-token", res.accessToken);
        router.push("/");
      });
    }
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
                placeholder="비밀번호를 입력해주세요."
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
