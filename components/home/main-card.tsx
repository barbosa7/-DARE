"use client";

import { useState } from "react";
import TransferButton from "./transfer-btn";

const MainCard = () => {
  const [dare, setDare] = useState("");

  const onChange = (e: any) => {
    setDare(e.target.value);
  };
  return (
    <div className="flex flex-col space-y-2 md:space-y-3 p-4 basis-1/2 items-center justify-center">
      <div className="w-full">
        <textarea
          value={dare}
          onChange={onChange}
          rows={4}
          placeholder="what's your dare?"
          className="w-full h-[100px] md:h-[200px] resize-none overflow-y-auto bg-transparent p-4 border rounded-lg"
        />
      </div>
      <div className="w-full">
        <TransferButton message={dare} reset={() => setDare("")} />
      </div>
    </div>
  );
};

export default MainCard;
