"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function forgotPassword() {
  const [user, setUser] = React.useState({
    email: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onFpLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", user);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Forgot Password"}</h1>
      <hr />
      <label className="mt-4" htmlFor="email">
        email
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <button
        onClick={onFpLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "No submit" : "Submit"}
      </button>
      <Link href="/login">Visit Login page</Link>
    </div>
  );
}
