"use client";

import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "../../hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface ILoginModalProps {
  isSignIn: boolean;
}

export default function AuthModal({ isSignIn }: ILoginModalProps) {
  const { loading, data, error, setAuthState } = useContext(
    AuthenticationContext
  );
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signIn, signUp } = useAuth();

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (isSignIn) {
      if (inputs.password && inputs.email) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.phone &&
        inputs.city &&
        inputs.password
      ) {
        return setDisabled(false);
      }
    }

    setDisabled(true);
  }, [inputs]);

  const handleClick = () => {
    if (isSignIn) {
      signIn({ email: inputs.email, password: inputs.password }, handleClose);
    } else {
      signUp(
        {
          email: inputs.email,
          password: inputs.password,
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          city: inputs.city,
          phone: inputs.phone,
        },
        handleClose
      );
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className={`${
          isSignIn ? "bg-blue-400 text-white" : ""
        } border p-1 px-4 rounded`}
      >
        {isSignIn ? "Sign In" : "Sign Up"}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="h-[75vh]">
          {loading ? (
            <div className="px-2 py-24 h-[600px] flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <>
              <div className="p-2">
                {error ? (
                  <Alert severity="error" className="mb-4">
                    {error}
                  </Alert>
                ) : null}
                <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                  <p className="text-sm">
                    {isSignIn ? "Sign In" : "Create Account"}
                  </p>
                  <p>
                    {data?.firstName} {data?.lastName}
                  </p>
                </div>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {isSignIn
                    ? "Log into your account"
                    : "Create your OpenTable account"}
                </h2>
                <AuthModalInputs
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSignIn={isSignIn}
                />
                <button
                  className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                  disabled={disabled}
                  onClick={handleClick}
                >
                  {isSignIn ? "Sign In" : "Sign Up"}
                </button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
