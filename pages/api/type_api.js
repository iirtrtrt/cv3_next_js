export default async function typeApi() {
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