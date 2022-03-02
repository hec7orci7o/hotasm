/* https://es.stackoverflow.com/questions/498354/numerar-l%C3%ADneas-en-un-textarea-de-html */
export default function Editor() {
  return (
    <div className="col-span-3 bg-[#EFF2F5] p-8">
      <textarea
        className="w-full bg-[#EFF2F5] focus:outline-none h-full resize-none"
        placeholder="Write your asm here..."
      ></textarea>
    </div>
  );
}
