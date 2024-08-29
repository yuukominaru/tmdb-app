import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const token = process.env.REACT_APP_TOKEN;

export const useGetSessionToken = () => {
  const [sessionToken, setSessionToken] = useState(
    localStorage.getItem("userSessionToken") || null
  );
  const [accountId, setAccountId] = useState(
    localStorage.getItem("userSessionId") || null
  );
  const [sessionV3, setSessionV3] = useState(
    localStorage.getItem("userSessionIdV3") || null
  );

  useEffect(() => {
    const checkSessionToken = async () => {
      const approvedToken = localStorage.getItem("requestToken");
      if (approvedToken && !sessionToken && !accountId) {
        await createSession(approvedToken);
      }
      if (!sessionV3 && sessionToken && accountId) {
        await createSessionV3(sessionToken);
      }
    };
    checkSessionToken();
  }, [accountId, sessionToken, sessionV3]);

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

    try {
      const url = "https://api.themoviedb.org/4/auth/request_token";
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (responseJson && responseJson.request_token) {
        localStorage.setItem("requestToken", responseJson.request_token);
        window.location.href = `https://www.themoviedb.org/auth/access?request_token=${responseJson.request_token}`;
      } else {
        toast.error("Failed to get Request Token");
        console.error("Failed to get Request Token", responseJson);
      }
    } catch (error) {
      toast.error("Error fetching Request Token");
      console.error("Error fetching Request Token", error);
    }
  };

  const createSession = async (approvedTokens) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ request_token: approvedTokens }),
    };

    try {
      const url = "https://api.themoviedb.org/4/auth/access_token";
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (
        responseJson &&
        responseJson.access_token &&
        responseJson.account_id
      ) {
        localStorage.setItem("userSessionToken", responseJson.access_token);
        setSessionToken(responseJson.access_token);

        localStorage.setItem("userSessionId", responseJson.account_id);
        setAccountId(responseJson.account_id);

        toast.success("Login success!");
        localStorage.removeItem("requestToken");
      } else {
        toast.error("Failed to create user session");
        console.error("Failed to create user session", responseJson);
      }
    } catch (error) {
      toast.error("Error fetching user session");
      console.error("Error fetching user session", error);
    }
  };

  const createSessionV3 = async (sessionTokens) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        access_token: sessionTokens,
      }),
    };

    try {
      const url =
        "https://api.themoviedb.org/3/authentication/session/convert/4";
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (responseJson && responseJson.session_id) {
        localStorage.setItem("userSessionIdV3", responseJson.session_id);
        setSessionV3(responseJson.session_id);
      } else {
        toast.error("Failed to create user session ID v3");
        console.error("Failed to create user session ID v3", responseJson);
      }
    } catch (error) {
      toast.error("Error fetching user session ID v3");
      console.error("Error fetching user session ID v3", error);
    }
  };

  const deleteSession = async (sessionTokens) => {
    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        access_token: sessionTokens,
      }),
    };

    try {
      const url = "https://api.themoviedb.org/4/auth/access_token";
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (responseJson && responseJson.success) {
        localStorage.removeItem("userSessionToken");
        setSessionToken(null);

        localStorage.removeItem("userSessionId");
        setAccountId(null);

        localStorage.removeItem("listFavorites");
        toast.success("Logout success!");
      } else {
        toast.error("Failed to delete session");
        console.error("Failed to delete session", responseJson);
      }
    } catch (error) {
      toast.error("Error fetching delete session");
      console.error("Error fetching delete session", error);
    }
  };

  const deleteSessionV3 = async (sessionId) => {
    const options = {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ session_id: sessionId }),
    };

    try {
      const url = "https://api.themoviedb.org/3/authentication/session";
      const response = await fetch(url, options);
      const responseJson = await response.json();

      if (responseJson && responseJson.success) {
        localStorage.removeItem("userSessionIdV3");
        setSessionV3(null);
      } else {
        toast.error("Failed to get delete session ID v3");
        console.error("Failed to get delete session ID v3", responseJson);
      }
    } catch (error) {
      toast.error("Error fetching delete session ID v3");
      console.error("Error fetching delete session ID v3", error);
    }
  };

  return {
    sessionToken,
    sessionV3,
    getRequestToken,
    deleteSession,
    deleteSessionV3,
  };
};
