import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { AuthenticationContext } from "../app/context/AuthContext";
import { getCookie, deleteCookie } from "cookies-next";

const useAuth = () => {
  const { loading, data, error, setAuthState } = useContext(
    AuthenticationContext
  );

  const signIn = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });

    try {
      const res = await axios.post("http://localhost:3000/api/auth/signin", {
        email,
        password,
      });

      setAuthState({
        data: res.data,
        error: null,
        loading: false,
      });

      handleClose();
    } catch (e) {
      const error = e as AxiosError;
      setAuthState({
        data: null,
        error: error.response
          ? (error.response as any).data.errorMessage
          : error.message,
        loading: false,
      });
    }
  };

  const signUp = async (
    {
      email,
      password,
      firstName,
      lastName,
      city,
      phone,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      city: string;
      phone: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });

    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", {
        email,
        password,
        firstName,
        lastName,
        city,
        phone,
      });
      setAuthState({
        data: res.data,
        error: null,
        loading: false,
      });

      handleClose();
    } catch (e) {
      const error = e as AxiosError;
      setAuthState({
        data: null,
        error: error.response
          ? (error.response as any).data.errorMessage
          : error.message,
        loading: false,
      });
    }
  };

  const logout = () => {
    deleteCookie("jwt");
    setAuthState({
      data: null,
      error: null,
      loading: false,
    });
  };

  return { signIn, signUp, logout };
};

export default useAuth;
