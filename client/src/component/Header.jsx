import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center mx-w-6xl mx-auto py-3 px-9">
        <Link to="/">
          <h1 className="font-bold text-xl sm:text-3xl flex flex-wrap">
            <span className="text-slate-500">Sky</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600 " />
        </form>
        <ul className="flex gap-5 font-semibold">
          <Link to="/">
            <li className="hidden md:inline hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden md:inline hover:underline">About</li>
          </Link>
          <Link to="/">
            {currentUser ? (
              <img src={currentUser.avatar} alt="profile" />
            ) : (
              <li className="hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
