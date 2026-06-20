import {
  createNote,
  getNoteDetail,
  getAllNotes,
  deleteNote,
  updateNote,
} from "./note.service.js";
export async function CreateNote(req, res) {
  try {
    const { title, content } = req.body;

    const note = await createNote({
      title,
      content,
      userId: req.user._id,
    });

    return res.status(201).json({
      success: true,
      note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function GetAllNotes(req, res) {
  try {
    const notes = await getAllNotes(req.user._id);

    return res.status(200).json({
      success: true,
      count: notes.length,
      notes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function GetNote(req, res) {
  try {
    const note = await getNoteDetail({
      slug: req.params.slug,
      userId: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function UpdateNote(req, res) {
  try {
    const { content } = req.body;

    const note = await updateNote({
      slug: req.params.slug,
      userId: req.user._id,
      content,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function DeleteNote(req, res) {
  try {
    const note = await deleteNote({
      slug: req.params.slug,
      userId: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
