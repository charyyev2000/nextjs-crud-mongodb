import EditTopicForm from "@/components/editTopicForm";

const editTopicContent = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to get the topic content");
    }

    return await res.json();
  } catch (error) {
    console.error("Something went wrong, please try again", error);
  }
};

export default async function EditTopic({ params }) {
  const id = params.id;
  const res = await editTopicContent(id);
  const topic = res.topic;
  // console.log(topic);
  return <EditTopicForm topic={topic} />;
}
