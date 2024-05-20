"use client";

import { useFetchUser } from "@/hooks/use-fetch-user";
import LoginButton from "./login-btn";
import UserButton from "./user-button";

const User = () => {
  const userAddress = useFetchUser();

  if (!userAddress) {
    return <LoginButton />;
  }
  return <UserButton address={userAddress} />;
};

export default User;
