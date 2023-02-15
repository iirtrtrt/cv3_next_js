import { useEffect, useState } from "react";
import BaseLayout from "../../components/base_layout";
import axios from "axios";

export default function Register() {
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  function validateEmail(email) {
    return emailRegEx.test(email); //형식에 맞을 경우, true 리턴
  }
  async function registerApi(json) {
    await axios
      .post(
        "http://localhost:5000/api/auth/register/",
        JSON.stringify({
          email: json.email,
          password: json.password1,
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
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

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

  function validate() {
    const errors = {
      email: "",
      password1: "",
      password2: "",
      password3: "",
    };

    if (!userData.email) {
      errors.email = "이메일 에러";
    } else if (!validateEmail(userData.email)) {
      errors.email = "이메일 에러";
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
    const errors = validate();
    setErrors(errors);
    if (Object.values(errors).some((v) => v)) {
      return;
    }

    registerApi(userData);
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
                  placeholder="8자 이상, 숫자, 특수문자 포함"
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
                  placeholder="8자 이상, 숫자, 특수문자 포함"
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
