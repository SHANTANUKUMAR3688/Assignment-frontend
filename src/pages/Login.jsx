import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API/Api";
import land from "../assets/land.avif";
import logo from "../assets/logo.jpg";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { FcGoogle } from "react-icons/fc";
function Login() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
 
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleClick = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/login", data);
      setData({
        email: "",
        password: "",
      });
    sessionStorage.setItem("id",response.data.customer.id);
      navigate("/page", { replace: true });
      console.log(response.data);
    } catch (err) {
      const message = err.response?.data?.message || "login failed";
      alert(message);
      console.log("login error:", err);
    }
  };

  const sigin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log(user);
      navigate("/page");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };
  return (
    <div className="flex items-center justify-center bg-linear-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] h-screen">
      <div className="mb-4 mt-4 flex max-w-5xl flex-col sm:mx-2 xl:flex-row">
        {/* Left Side */}
        <div className="w-full bg-white shadow-2xl xl:w-auto xl:rounded-bl-2xl xl:rounded-tl-2xl">
          <div className="mx-7 mt-14 mb-5 rounded-xl bg-white shadow-2xl">
            <div className="m-10">
              <img src={logo} loading="lazy" alt="logo" className="w-24 pt-1" />
              <h1 className="mb-4 text-2xl font-bold">WELCOME !</h1>

              <div className="flex flex-col justify-center gap-1 text-left">
                <span className="text-xl">
                  EMAIL <span className="text-red-500">*</span>
                </span>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  id="email"
                  required
                  placeholder="Email Address"
                  className="w-full appearance-none rounded border px-3 py-2 shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="relative mt-4 flex flex-col justify-center gap-1 text-left">
                <span className="text-xl">
                  Password <span className="text-red-500">*</span>
                </span>
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                  value={data.password}
                  onChange={handleChange}
                  className="w-full appearance-none rounded border px-3 py-2 pr-10 shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-500"
                />
                <button
                  type="button"
                  className="absolute right-4 top-11 text-gray-400"
                  onClick={handleClick}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                onClick={handlesubmit}
                className="mt-4 rounded-md bg-red-500 px-6 py-2 text-xl font-semibold text-white hover:bg-red-600 hover:shadow-lg active:bg-red-700 active:shadow-lg hover:rounded-full transition duration-200 ease-in-out"
              >
                Login
              </button>
              <span className="ml-4">
                If not registered,{" "}
                <a href="/register" className="text-blue-500 hover:underline">
                  Register
                </a>
              </span>
              <div className="text-xl font-semibold ml-26">OR</div>
              <div className="flex justify-center items-center gap-2 bg-blue-500 rounded-md px-4 py-2 mt-4 hover:bg-blue-600 hover:shadow-lg active:bg-blue-700 active:shadow-lg transition duration-200 ease-in-out mb-4">
                <span>
                  <FcGoogle className="text-xl" />
                </span>
                <button
                  onClick={sigin}
                  className="text-xl font-semibold hover:cursor-pointer text-white transition duration-200 ease-in-out"
                >
                  signIn with google
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full bg-white shadow-2xl xl:w-auto xl:rounded-br-2xl xl:rounded-tr-2xl">
          <img
            src={land}
            alt="land"
            loading="lazy"
            className="hidden w-full object-cover xl:block xl:w-100 xl:rounded-br-2xl xl:rounded-tr-2xl h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
