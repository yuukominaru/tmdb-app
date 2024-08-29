import { useEffect } from "react";
import { useState } from "react";

const apiKey = process.env.REACT_APP_APIKEY;
const token = process.env.REACT_APP_TOKEN;

export const useGetSessionToken = () => {
  const [sessionToken, setSessionToken] = useState(localStorage.getItem("userSessionToken") || null);

  useEffect(() => {
    const checkSessionToken = async () => {
      const approvedToken = localStorage.getItem("requestToken");
      if (approvedToken && !sessionToken) {
        await createSession(approvedToken);
      }
    };
    checkSessionToken();
  }, [sessionToken]);

  const getRequestToken = async () => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        redirect_to: window.location.origin + "/",
      }),
    };

    const url = "https://api.themoviedb.org/4/auth/request_token";
    await fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem("requestToken", response.request_token);
        window.location.href = `https://www.themoviedb.org/auth/access?request_token=${response.request_token}`;
      })
      .catch((err) => console.error(err));
  };

  const createSession = async (approvedToken) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ request_token: approvedToken }),
    };

    const url = "https://api.themoviedb.org/4/auth/access_token";
    await fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem("userSessionToken", response.access_token);
        setSessionToken(response.access_token);
        localStorage.removeItem("requestToken");
      })
      .catch((err) => console.error(err));
  };

  const deleteSession = async (approvedToken) => {
    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        access_token: approvedToken,
      }),
    };

    const url = "https://api.themoviedb.org/4/auth/access_token";
    await fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
        localStorage.removeItem("userSessionToken");
        setSessionToken(null);
      })
      .catch((err) => console.error(err));
  };

  return { sessionToken, getRequestToken, deleteSession };
};
