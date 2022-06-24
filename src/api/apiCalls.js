const DOMAIN = process.env.DOMAIN;
// const DOMAIN = "http://localhost:8000";

//-------------------------------------------------------- ADD URL TO DATABASE

export async function addUrlToDatabase(url) {
  const response = await fetch(DOMAIN + "/url/add", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: url }),
  });
  const res = await response.json();
  console.log("ADDED URL :", res);
  return res;
}

//-------------------------------------------------------- GET REDIRECT DATA

export async function getRedirectData(path) {
  const response = await fetch(DOMAIN + "/url/redirect?path=" + path, {
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({ data: path }),
  });
  const res = await response.json();
  console.log("REDIRECT DATA (frontend)", res);
  return res;
}
