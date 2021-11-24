const isFunction = (func) => typeof func === "function";

export const getNotes = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/note/`);
    var { data } = await res.json();
  } catch (e) {
    console.error(e);
  } finally {
    return { notes: data ?? [] };
  }
};

export const getNote = async (id, onSuccess) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/note/${id}`
    );
    var { data } = await res.json();
    isFunction(onSuccess) && onSuccess();
  } catch (e) {
    console.error(e);
  } finally {
    return data ?? {};
  }
};

export const submitNote = async (value, onSuccess) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: value, tasks: [] }),
    });
    const data = await res.json();
    const id = data._id;
    isFunction(onSuccess) && onSuccess(id);
  } catch (e) {
    console.error("Error:", e);
  }
};

export const updateTasks = async (tasks, id, onSuccess) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/note/${id}/tasks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasks),
    });
    isFunction(onSuccess) && onSuccess();
  } catch (e) {
    console.error("Error:", e);
  }
};

export const deleteNote = async (id, onSuccess) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/note/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    isFunction(onSuccess) && onSuccess();
  } catch (e) {
    console.error(e);
  }
};
