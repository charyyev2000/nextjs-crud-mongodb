"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditTopicForm({ topic }) {
  const [newTitle, setNewTitle] = useState(topic.title);
  const [newDescription, setNewDescription] = useState(topic.description);

  const router = useRouter();
  // const { id } = topic._id;
  // console.log("id", topic);
  // console.log("id", topic._id);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${topic._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update the title");
      }
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Something went wrong, please try again", error);
    }
  };

  return (
    <form onSubmit={handleEdit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Topic Title"
        className="border border-slate-500 px-8 py-2"
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
      />
      <input
        type="text"
        placeholder="Topic Description"
        className="border border-slate-500 px-8 py-2"
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
      />
      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Update Topic
      </button>
    </form>
  );
}
