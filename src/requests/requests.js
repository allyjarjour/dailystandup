import { signOut } from "next-auth/react";

const isFunction = (func) => typeof func === "function";

export const getUserData = async (email) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  var { data } = await res.json();
  return data;
};

export const getNote = async (noteId, userId, onSuccess) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/notes/${noteId}`
    );
    var { data } = await res.json();
    isFunction(onSuccess) && onSuccess();
  } catch (e) {
    console.error(e);
  } finally {
    return data ?? {};
  }
};

export const submitNote = async (value, id, onSuccess) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note: { title: value, tasks: [] }, id }),
    });
    const { _id } = await res.json();
    isFunction(onSuccess) && onSuccess(_id);
  } catch (e) {
    console.error("Error:", e);
  }
};

export const updateTasks = async (tasks, noteId, userId, onSuccess) => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/notes/${noteId}/tasks`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tasks),
      }
    );
    isFunction(onSuccess) && onSuccess();
  } catch (e) {
    console.error("Error:", e);
  }
};

// update w/ new path
export const deleteNote = async (id, userId, onSuccess) => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/notes/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    isFunction(onSuccess) && onSuccess();
  } catch (e) {
    console.error(e);
  }
};

export const getUserEmail = async (accessToken) => {
  if (!accessToken) return {};
  try {
    const res = await fetch("https://api.github.com/user/emails", {
      headers: new Headers({
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${accessToken}`,
      }),
    });
    const emails = await res.json();
    var data = emails?.find((e) => e.primary);
  } catch (e) {
    console.error(e);
    signOut();
  } finally {
    return data ?? {};
  }
};
