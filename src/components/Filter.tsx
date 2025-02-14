"use client";
import React, { useState } from "react";
import { IoFilter } from "react-icons/io5";

const Filter = ({ filterClick }: { filterClick?: (type: string) => void }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center gap-4">
      <p className="text-md font-extrabold tracking-tight">Filter</p>
      <IoFilter
        size={20}
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      {open ? (
        <div className="bg-gray-400 text-white uppercase flex gap-6 p-4 rounded-md">
          <div className="flex flex-col gap-3">
            <h1>Price:</h1>
            <button
              onClick={() => filterClick("PLH")}
              className="bg-black p-2 hover:bg-slate-600"
            >
              Lowest to Highest
            </button>
            <button
              onClick={() => filterClick("PHL")}
              className="bg-black p-2 hover:bg-slate-600"
            >
              Highest to Lowest
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <h1>Rating:</h1>
            <button
              onClick={() => filterClick("RLH")}
              className="bg-black p-2 hover:bg-slate-600"
            >
              Lowest to Highest
            </button>
            <button
              onClick={() => filterClick("RHL")}
              className="bg-black p-2 hover:bg-slate-600"
            >
              Highest to Lowest
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Filter;
