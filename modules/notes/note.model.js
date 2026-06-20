import mongoose from "mongoose";
import slugify from "slugify";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      trim: true,
      default: "",
    },

    slug: {
      type: String,
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

noteSchema.pre("save", async function () {
  if (!this.isModified("title")) {
    return;
  }

  const baseSlug = slugify(this.title, {
    lower: true,
    strict: true,
    trim: true,
  });

  let slug = baseSlug;
  let counter = 1;

  const Note = this.constructor;

  while (
    await Note.findOne({
      slug,
    })
  ) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;
});

export const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);
