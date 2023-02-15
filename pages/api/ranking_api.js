import axios from "axios";

export default async function rankingApi() {
  const res = await axios
    .get("http://localhost:5000/api/ranking", {
      withCredentials: true,
    })
    .catch((err) => console.log(err));

  return res.data;
}
