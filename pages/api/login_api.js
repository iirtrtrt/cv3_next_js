import axios from "axios";

export default async function loginApi(json) {
  const res = await axios
    .post(
      "http://localhost:5000/api/auth/login/",
      JSON.stringify({
        email: json.email,
        password: json.password,
      }),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    )
    .catch((err) => console.log(err));

  return res.data;
}
