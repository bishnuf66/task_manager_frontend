import React, { useEffect, useState, useRef } from "react";
import { getCookie } from "../utils/cookieutil";
import { jwtDecode } from "jwt-decode";
import { ChevronDown } from "lucide-react";

interface DecodedToken {
  userName: string;
  // Add more fields here if needed
}

const Header: React.FC = () => {
  const token = getCookie("token");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("User");
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Create a ref for the dropdown

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUserName(decoded?.userName);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, [token]);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const firstLetter = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    console.log("Logging out...");
    // Remove token/cookies and redirect to login
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">Task Manager</h1>

      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-lg">
            {firstLetter}
          </div>
          <span className="text-gray-700 font-medium capitalize flex flex-row items-center gap-2">
            <span> {userName}</span>
            <ChevronDown />
          </span>
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
