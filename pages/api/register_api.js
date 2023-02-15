import axios from "axios";

export default async function registerApi(json) {
  const res = await axios
    .post(
      "http://localhost:5000/api/auth/register/",
      JSON.stringify({
        email: json.email,
        password: json.password1,
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
