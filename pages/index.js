import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import Output from "../components/Output";

export default function Home() {
  const bin = [
    "0011101010011000000001",
    "0011101010011000000010",
    "0011101010011000000011",
    "0000111110100000000100",
    "0000000000000000000101",
    "0000000000101101000110",
    "0000000000000010100111",
    "1000000000010001000000",
    "1000000000110000000000",
    "1000000001000000000000",
    "1000000001010000000000",
    "1000000001100000000000",
    "1000000001110000000000",
    "1000000001110000000000",
  ];
  const mem = (
    <>
      v2.0 raw <br /> ea601 ea602 ea603 3e804 5 b46 a7 200440 200c00 201000
      201400 201800 201c00
    </>
  );

  return (
    <div className="h-screen grid grid-cols-7 gap-4">
      {/* CONFIG */}
      <Sidebar />
      {/* EDITOR */}
      <Editor />
      {/* OUTPUT */}
      <Output bin={bin} mem={mem} />
    </div>
  );
}
