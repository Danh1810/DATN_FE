// import React from "react";
// import { toast } from "react-toastify";
// // import { useNavigate } from "react-router-dom";

// const LoginPage: React.FC = () => {
//   // const navigate = useNavigate();

//   // const handleLogin = () => {
//   //   navigate("/dashboard");
//   // };

//   const handleSignUp = () =>{
//     toast.success('You click sign up')
//   }
import React, { useState } from "react";
import { toast } from "react-toastify";
import log from "../services/auth/login";
import { useDispatch } from "react-redux";
import { login } from "../slice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronDownIcon, BellIcon } from "@heroicons/react/20/solid";

//import Logo from "@/img/logo.png";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("HS230001");
  const [password, setPassword] = useState("123Admin");
  const [valid, setValid] = useState({ username: true, password: true });
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isOpportunityOpen, setIsOpportunityOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const dispatch = useDispatch();
  console.log("dakda");
  const handleSummit = async () => {
    let check = true;
    if (!username) {
      check = false;
      setValid({ ...valid, username: false });
      toast.error("Please enter your username");
    }
    if (!password) {
      check = false;
      setValid({ ...valid, username: false });
      toast.error("Please enter your password");
    }
    if (check) {
      // api
      const res = await log(username, password);
      console.log(res);

      if (res && +res.code === 0) {
        localStorage.setItem("token", `${res.data.access_token}`);
        toast.success(res.message);
        localStorage.setItem("isAuth", true);
        localStorage.setItem("username", res.data.name);
        localStorage.setItem("group_id", res.data.group_id);
        localStorage.setItem("role", res.data.role);
        dispatch(login({ ...res.data, isAuth: true }));
      }
      if (res && +res.code !== 0) {
        toast.error(res.message);
      }
    }
  };
  const handleGoogleSummit = async () => {
    // api
    const res = await axios.get("/google/callback");
    console.log(res);

    if (res && +res.code === 0) {
      localStorage.setItem("token", `${res.data.access_token}`);
      toast.success(res.message);
      console.log(res.data);
      // localStorage.setItem("isAuth", true);
      localStorage.setItem("username", res.data.name);
      localStorage.setItem("group_id", res.data.group_id);
      localStorage.setItem("role", res.data.role);
      dispatch(login({ ...res.data, isAuth: true }));
    }
    if (res && +res.code !== 0) {
      toast.error(res.message);
    }
  };
  return (
    <div>
      <nav className="bg-purple-700 text-white flex items-center justify-between p-4">
        {/* Left side (Logo) */}
        <div className="flex items-center space-x-4">
          <img
            src="https://example.com/logo.png"
            alt="Company Logo"
            className="h-8"
          />
          <span className="text-xl font-bold">việc làm 24h</span>
        </div>

        {/* Center (Menu Items) */}
        <div className="hidden md:flex space-x-8">
          {/* Menu Item 1 */}
          <div className="relative">
            <button
              onClick={() => setIsOpportunityOpen(!isOpportunityOpen)}
              className="flex items-center space-x-1"
            >
              <span>Cơ hội việc làm</span>
              <ChevronDownIcon className="h-4 w-4" />
            </button>
            {isOpportunityOpen && (
              <div className="absolute bg-white text-black mt-2 p-2 rounded shadow-lg">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Job Opportunity 1
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Job Opportunity 2
                </a>
              </div>
            )}
          </div>

          {/* Menu Item 2 */}
          <div className="relative">
            <button
              onClick={() => setIsToolOpen(!isToolOpen)}
              className="flex items-center space-x-1"
            >
              <span>Công cụ</span>
              <ChevronDownIcon className="h-4 w-4" />
            </button>
            {isToolOpen && (
              <div className="absolute bg-white text-black mt-2 p-2 rounded shadow-lg">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Tool 1
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Tool 2
                </a>
              </div>
            )}
          </div>

          {/* Additional Menu Item 3 */}
          <div className="relative">
            <button className="flex items-center space-x-1">
              <span>Thư viện</span>
            </button>
          </div>

          {/* Additional Menu Item 4 */}
          <div className="relative">
            <button className="flex items-center space-x-1">
              <span>Liên hệ</span>
            </button>
          </div>
        </div>

        {/* Right side (Icons and Region Selector) */}
        <div className="flex items-center space-x-6">
          {/* Region Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRegionOpen(!isRegionOpen)}
              className="flex items-center space-x-1"
            >
              <span>Miền Nam</span>
              <ChevronDownIcon className="h-4 w-4" />
            </button>
            {isRegionOpen && (
              <div className="absolute bg-white text-black mt-2 p-2 rounded shadow-lg">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Miền Bắc
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Miền Trung
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Miền Nam
                </a>
              </div>
            )}
          </div>

          {/* Notification Icon */}
          <div className="relative">
            <BellIcon className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs font-bold px-1.5 py-0.5 rounded-full">
              8
            </span>
          </div>

          {/* User Role Selector */}
          <div className="flex items-center space-x-1">
            <span className="flex items-center space-x-1">
              <span>Dành cho</span>
              <span className="font-semibold">Nhà Tuyển Dụng</span>
            </span>
          </div>

          {/* Language Selector */}
          <img
            src="https://example.com/flag.png" // Replace with your flag image URL
            alt="English"
            className="h-6 w-6"
          />
        </div>
      </nav>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center">
        <div className="max-w-screen-xl mx-auto sm:m-10 bg-white shadow-lg sm:rounded-lg flex w-full">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold mt-8 mb-6">
              Đăng Nhập
            </h1>
            <div className="w-full flex-1">
              <div className="mx-auto max-w-xs">
                <input
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className={`w-full px-4 py-3 rounded-lg bg-gray-100 text-sm font-medium placeholder-gray-500 border ${
                    valid.username
                      ? "border-gray-200"
                      : "border-red-500 focus:border-red-500"
                  } focus:outline-none focus:bg-white focus:border-indigo-400 transition`}
                  placeholder="Email"
                />
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full px-4 py-3 mt-5 rounded-lg bg-gray-100 text-sm font-medium placeholder-gray-500 border ${
                    valid.password
                      ? "border-gray-200"
                      : "border-red-500 focus:border-red-500"
                  } focus:outline-none focus:bg-white focus:border-indigo-400 transition`}
                  placeholder="Password"
                />
                <button
                  type="submit"
                  onClick={handleSummit}
                  className="mt-5 flex items-center justify-center w-full py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:shadow-outline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span>Đăng Nhập</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 hidden lg:flex items-center justify-center">
            <div
              className="w-full h-full bg-center bg-no-repeat bg-contain"
              style={{
                backgroundImage:
                  "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
