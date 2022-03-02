/* https://es.stackoverflow.com/questions/498354/numerar-l%C3%ADneas-en-un-textarea-de-html */

/*
mov 30000, r1
mov 30000, r2
mov 30000, r3
mov 8000, r4
mov 0, r5
mov 90, r6
mov 5, r7
add r1, r2, r0
add r3, r0, r0
add r4, r0, r0
add r5, r0, r0
add r6, r0, r0
add r7, r0, r0
*/

/*
; escribe aqui tu codigo
mov 30000, r1; esto es un comentario
add r1, r2, r3
 */
import { useState } from "react";

export default function Editor() {
  const [rawCode, setRawCode] = useState("");

  // const formatCode = () => {
  //   let code = new Array();
  //   let line = "";
  //   for (let i = 0; i < rawCode.length; i++) {
  //     if (rawCode[i] === "\n") {
  //       code.push(line);
  //       line = "";
  //     } else {
  //       line += rawCode[i];
  //     }
  //   }
  //   code.forEach((e) => console.log(e));
  // };

  return (
    <div className="col-span-3 bg-[#EFF2F5] p-8">
      <textarea
        onChange={(e) => {
          setRawCode(e.target.value);
        }}
        className="w-full bg-[#EFF2F5] focus:outline-none h-full resize-none"
        placeholder="Write your asm here..."
      />
    </div>
  );
}
