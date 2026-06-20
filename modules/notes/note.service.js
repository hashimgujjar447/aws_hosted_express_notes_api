import { Note } from "./note.model.js";

export async function createNote({ title, content, userId }) {
  const note = await Note.create({
    title,
    content,
    createdBy: userId,
  });

  return note;
}

export async function getAllNotes(userId) {
  const notes = await Note.find({
    createdBy: userId,
  })
    .populate("createdBy", "name email")
    .sort({
      isPinned: -1,
      createdAt: -1,
    });

  return notes;
}

export async function getNoteDetail({ slug, userId }) {
  const note = await Note.findOne({
    slug,
    createdBy: userId,
  }).populate("createdBy", "name email");

  return note;
}

export async function updateNote({ slug, userId, content }) {
  const note = await Note.findOneAndUpdate(
    {
      slug,
      createdBy: userId,
    },
    {
      content,
    },
    {
      new: true,
    },
  ).populate("createdBy", "name email");

  return note;
}

export async function deleteNote({ slug, userId }) {
  const note = await Note.findOneAndDelete({
    slug,
    createdBy: userId,
  });

  return note;
}
