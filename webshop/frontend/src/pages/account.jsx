import React, { useState } from "react";
import { useSnackbar } from "notistack";
import api from "../utils/api";

export default function Account() {
  const { enqueueSnackbar } = useSnackbar();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      enqueueSnackbar("New password and confirm password do not match", {
        variant: "error",
      });
      return;
    }
    try {
      await api.patch("/change-password", {
        old_password: oldPassword,
        new_password: newPassword,
      });
      enqueueSnackbar("Password updated successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(
        "Error updating password. Make sure your old password is correct",
        { variant: "error" }
      );
    }
  };
  return (
    <div className="container d-flex justify-content-center align-products-center vh-100">
      <div className="card">
        <div className="card-header">Register</div>
        <form onSubmit={handleSubmit} className="p-4">
          <div>
            <span className="text-gray-200">Old Password:</span>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <span className="text-gray-200">New Password:</span>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <span className="text-gray-200">Confirm Password:</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-4 w-100">
            UPDATE PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
}
