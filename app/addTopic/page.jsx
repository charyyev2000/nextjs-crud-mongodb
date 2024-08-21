"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Title and Description are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        setError("Title and Description are required");
        throw new Error("Failed to create the topic");
      }
    } catch (error) {
      console.error("Something went wrong, please try again");
    }
  };

  return (
    <form onSubmit={handleSumbit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Topic Title"
        className="border border-slate-500 px-8 py-2"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        type="text"
        placeholder="Topic Description"
        className="border border-slate-500 px-8 py-2"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      {error}
      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Topic
      </button>
    </form>
  );
}
