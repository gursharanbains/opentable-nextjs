import React from "react";
import Header from "./components/Header";

export default function Loading() {
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {[1, 2, 3, 4, 5, 6, 7.8, 9, 10].map((num) => (
          <div
            key={num}
            className="m-3 animate-pulse bg-slate-200 w-64 h-64 rounded overflow-hidden border cursor-pointer"
          ></div>
        ))}
      </div>
    </main>
  );
}
