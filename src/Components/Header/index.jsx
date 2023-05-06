import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const location = useLocation();
  let navigate = useNavigate();
  const navItem = [
    {
      text: "Food",
      value: "/food",
    },
    {
      text: "Transaksi",
      value: "/",
    },
  ];

  const checkActivePath = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.indexOf(path) > -1;
  };

  return (
    <header className="bg-white shadow">
      <div className="bg-primer mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Alan Resto
        </h1>
      </div>
      <div className=" w-full px-4 sm:px-6 lg:px-8">
        <div className="text-sm font-medium text-center">
          <ul className="flex flex-wrap -mb-px">
            {navItem.map((item, index) => {
              return (
                <li className="mr-2" key={item.value}>
                  <a
                    href={item.value}
                    className={`${
                      checkActivePath(item.value)
                        ? "border-primer text-primer"
                        : "text-gray-500 border-transparent"
                    } inline-block p-4 border-b-2  rounded-t-lg hover:text-gray-600 hover:border-primer dark:hover:text-primer`}
                  >
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
