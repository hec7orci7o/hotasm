import { useScreen } from "../../context/ScreenContext";

export default function Navbar() {
  const { mzLayout } = useScreen();
  return (
    <div
      className={`items-center justify-between h-16 w-full bg-dark px-2 
      ${!mzLayout ? "flex" : "hidden"}`}
    >
      <div className="px-4 py-2 rounded hover:bg-gray-900">
        <span className="text-white uppercase font-medium tracking-wide">
          Assambly
        </span>
      </div>
      <div>
        <button className="flex items-center px-3.5 py-1.5 rounded bg-indigo-500 hover:bg-indigo-600">
          <span className="text-white text-sm capitalize font-medium tracking-wide">
            Login
          </span>
        </button>
      </div>
    </div>
  );
}
