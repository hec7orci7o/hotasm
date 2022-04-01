import { useScreen } from "../context/ScreenContext";
import { useSession, signIn, signOut } from "next-auth/react";
import Tippy from "@tippyjs/react";
import Link from "next/link";
import Image from "next/image";
import { FiUserPlus, FiLogOut } from "react-icons/fi";
import { useState, useEffect } from "react";
import copy from "copy-to-clipboard";

export default function Navbar() {
  const { data: session, status } = useSession();
  const { mzLayout } = useScreen();
  const [menu, setMenu] = useState(false);
  const handleMenu = () => setMenu(!menu);
  let user;
  if (status === "authenticated") {
    user = session.user;
  }

  useEffect(() => {
    const checkIfClickedOutside = () => {
      if (menu) {
        setMenu(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [menu]);

  return (
    <div
      className={`items-center justify-between h-16 w-full bg-dark px-2
      ${!mzLayout ? "flex" : "hidden"}`}
    >
      <Link href="/">
        <a className="px-4 py-2 rounded hover:bg-gray-900">
          <span className="text-white uppercase font-medium tracking-wide">
            hotasm
          </span>
        </a>
      </Link>

      <div>
        {status === "authenticated" ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                copy("https://hotasm.vercel.app/", {
                  debug: false,
                  format: "text/plain",
                })
              }
              className="flex items-center text-green-300 gap-2 bg-green-500 px-4 py-1.5 bg-opacity-10 hover:bg-opacity-10 rounded hover:bg-green-600 focus:ring-green-500 focus:ring-2 focus:ring-opacity-75"
            >
              <FiUserPlus className="text-lg" />
              <span className="text-base">Invite</span>
            </button>
            <div className="relative">
              <Tippy
                arrow={false}
                content={
                  <span className="bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md">
                    {user.name}
                  </span>
                }
              >
                <button
                  onClick={() => {
                    handleMenu();
                  }}
                  className="flex items-center"
                >
                  <div className="w-8 h-8 relative bg-dark rounded-full">
                    <Image
                      src={user.image}
                      alt="Picture of the author"
                      layout="fill"
                      className="object-contain rounded-full"
                    />
                  </div>
                </button>
              </Tippy>
              {menu && (
                <div className="w-40 flex flex-col gap-3 divide-y divide-gray-500 bg-dark shadow-md bg-blend-hard-light px-2 py-1 absolute top-0 right-0 mt-10">
                  <div className="flex flex-col text-white opacity-60">
                    <span className="text-sm">{user.name}</span>
                    <span className="text-xs">{user.email}</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="mt-2 py-2 text-white opacity-60 hover:opacity-100 hover:bg-gray-600 hover:bg-opacity-30 rounded px-3">
                      <button
                        onClick={() => signOut()}
                        className="flex items-center gap-2"
                      >
                        <FiLogOut className="text-sm" />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={() => signIn("github")}
              className="flex items-center px-3.5 py-1.5 rounded bg-indigo-500 hover:bg-indigo-600"
            >
              <span className="text-white text-sm capitalize font-medium tracking-wide">
                Login
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
