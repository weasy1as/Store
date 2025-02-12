"use client";
import React, { useState } from "react";
import { IoFilter } from "react-icons/io5";

const Filter = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center gap-4">
      <p className="text-md font-extrabold tracking-tight">Filter</p>
      <IoFilter size={20} />
    </div>
  );
};

export default Filter;
