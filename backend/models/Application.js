import mongoose from "mongoose";

const interviewRoundSchema = new mongoose.Schema({
  title: { type: String, default: "" }, // e.g. "Recruiter Screen", "Technical Round 1"
  date: { type: Date },
  completed: { type: Boolean, default: false },
  notes: { type: String, default: "" }
});

const checklistItemSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const applicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Wishlist", "Applied", "Assessment", "Interview", "Offered", "Rejected"],
      default: "Applied",
    },
    location: {
      type: String,
      default: "",
    },
    jobLink: {
      type: String,
      default: "",
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
    },
    notes: {
      type: String,
      default: "",
    },
    jobType: {
      type: String,
      enum: ["Internship", "Co-op", "Full-Time", "Part-Time", "Contract"],
      default: "Internship",
    },
    workplaceType: {
      type: String,
      enum: ["Remote", "Hybrid", "On-site"],
      default: "On-site",
    },
    salary: {
      type: String,
      default: "",
    },
    contactName: {
      type: String,
      default: "",
    },
    contactEmail: {
      type: String,
      default: "",
    },
    resumeLink: {
      type: String,
      default: "",
    },
    tags: {
      type: [String],
      default: [],
    },
    interviewRounds: [interviewRoundSchema],
    checklist: [checklistItemSchema],
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;