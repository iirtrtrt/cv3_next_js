import { useState } from "react";
import BaseLayout from "../../components/base_layout";
import validateEmail from "../../functions/validate_email";
import loginApi from "../api/login_api";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import registerApi from "../api/register_api";

export default function Register() {
  const [cookies, setCookie] = useCookies(["access-token"]);
  const router = useRouter();

  const [userData, setUserData] = useState({
    email: "",
    password1: "",
    password2: "",
  });

  function handleChange(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  const [errors, setErrors] = useState({
    email: "",
    password1: "",
    password2: "",
    password3: "",
  });

  function checkRegisterError() {
    const errors = {
      email: "",
      password1: "",
      password2: "",
      password3: "",
    };

    if (!userData.email) {
      errors.email = "이메일 에러";
    } else if (!validateEmail(userData.email)) {
      errors.email = "이메일 형식 에러";
    }
    if (!userData.password1) {
      errors.password1 = "비밀번호 에러";
    }
    if (!userData.password2) {
      errors.password2 = "비밀번호 확인 에러";
    }
    if (userData.password1 !== userData.password2) {
      errors.password3 = "비밀번호와 비밀번호 확인이 같지 않음";
    }

    return errors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errors = checkRegisterError();
    setErrors(errors);
    
    if (
      !errors.email &&
      !errors.password1 &&
      !errors.password2 &&
      !errors.password3
    ) {
      registerApi(userData).then((res) => {
        loginApi(res).then((res) => {
          setCookie("access-token", res.accessToken);
          router.push("/");
        });
      });
    }
  }

  return (
    <BaseLayout>
      <div>
        <form onSubmit={handleSubmit}>
          <h3>회원가입</h3>
          <div>
            {errors.email && <span>{errors.email}</span>}
            {errors.password1 && <span>{errors.password1}</span>}
            {errors.password2 && <span>{errors.password2}</span>}
            {errors.password3 && <span>{errors.password3}</span>}
          </div>
          <div>
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
          </div>
          <div>
            <div>
              <label name="password1">비밀번호</label>
              <div>
                <input
                  type="password"
                  name="password1"
                  placeholder="비밀번호를 입력해주세요."
                  value={userData.password1}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              <label name="password2">비밀번호 확인</label>
              <div>
                <input
                  type="password"
                  name="password2"
                  placeholder="비밀번호를 한번 더 입력해주세요."
                  value={userData.password2}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <button type="submit">회원가입 신청</button>
        </form>
      </div>
    </BaseLayout>
  );
}
