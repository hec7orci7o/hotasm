import { useState } from "react";
import { FiMinus, FiRepeat } from "react-icons/fi";

export default function Setting({ id, name, num, df, updFun, delFun }) {
  const [data, setData] = useState({ id, name, num, df });
  return (
    <form
      id={id}
      onSubmit={(e) => {
        e.preventDefault();
        updFun(data);
      }}
      className="grid grid-cols-8 gap-1"
    >
      <button
        onClick={() => delFun(id)}
        className="col-span-1 font-medium mx-auto"
      >
        <FiMinus className="w-4 h-4 hover:text-red-600" />
      </button>
      <input
        onChange={(e) => setData({ ...data, name: e.target.value })}
        className="w-full flex justify-center col-span-2 border-2 rounded-sm text-sm font-medium py-2 px-3"
        defaultValue={name}
        value={name}
      />
      <input
        onChange={(e) => setData({ ...data, num: Number(e.target.value) })}
        className="w-full flex justify-center col-span-2 border-2 rounded-sm text-sm font-medium py-2 px-3"
        defaultValue={num}
        value={num}
      />
      <input
        onChange={(e) => setData({ ...data, df: e.target.value })}
        className="w-full flex justify-center col-span-2 border-2 rounded-sm text-sm font-medium py-2 px-3"
        defaultValue={df}
        value={df}
      />
      <button type="submit" className="col-span-1 font-medium mx-auto">
        <FiRepeat className="w-4 h-4 hover:text-blue-600" />
      </button>
    </form>
  );
}
