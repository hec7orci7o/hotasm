import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import Output from "../components/Output";
import useEditor from "../hooks/useEditor";
import useSettings from "../hooks/useSettings";

export default function Home() {
  const { binOut, memOut, updateCode } = useEditor();
  const { handleLoad, handleUnload } = useSettings();

  return (
    <div className="h-screen grid grid-cols-7 gap-4">
      {/* CONFIG */}
      <Sidebar load={handleLoad} unload={handleUnload} />
      {/* EDITOR */}
      <Editor write={() => {}} />
      {/* OUTPUT */}
      <Output bin={binOut} mem={memOut} />
    </div>
  );
}

/*
// formatos de inst
mov K,rd ; SignExt(K) -> BR(rd) K cte de 16 bits 
add ra,rb,rd ; BR(ra) + BR(rb) -> BR(rd) 
Plantilla:
--------------------------------
add @ra, rb, rd; 1 22:22 15:10 9:5 4:0
mov K, rd; 0 22:22 21:16 4:0

"add" : {
  co : 1
  fields : {
    co: (22, 22)
    ra: (15, 10),
    rb: (9, 5),
    rd: (4, 0)
  }
}


ld r1, [r1]
add r4, r1, r3
mov #4, r5
*/

/*
[
  "add ra, rb, rd; 1 22:22 15:10 9:5 4:0",
  "mov #K, rd; 0 22:22 21:16 4:0"
]
*/
