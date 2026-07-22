import express from "express";
import Application from "../models/Application.js";

const router = express.Router();

const SAMPLE_APPLICATIONS = [
  {
    company: "Google",
    position: "Software Engineering Intern",
    status: "Interview",
    location: "Mountain View, CA (Hybrid)",
    jobLink: "https://careers.google.com/jobs/results/123456",
    appliedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    jobType: "Internship",
    workplaceType: "Hybrid",
    salary: "$58 / hr",
    contactName: "Sarah Jenkins (University Recruiter)",
    contactEmail: "sjenkins@google.com",
    notes: "Completed Technical Screening on Graph Algorithms. Next up: Onsite Technical Interview with Senior SWE.",
    tags: ["Dream Company", "Tier 1", "Graphs"],
    interviewRounds: [
      { title: "Recruiter Screen", date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), completed: true, notes: "Passed resume check and general fit." },
      { title: "Technical Round 1", date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), completed: true, notes: "Solved DFS/BFS question efficiently." },
      { title: "Technical Round 2", date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), completed: false, notes: "Focusing on Dynamic Programming & System Design concepts." }
    ],
    checklist: [
      { task: "Review LeetCode Hard DP problems", completed: true },
      { task: "Prepare story for Google leadership principles", completed: true },
      { task: "Send follow-up thank you email", completed: false }
    ]
  },
  {
    company: "Virtusa",
    position: "Full Stack Developer Intern",
    status: "Offered",
    location: "Colombo, Sri Lanka",
    jobLink: "https://virtusa.com/careers/intern-dev",
    appliedDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    jobType: "Internship",
    workplaceType: "On-site",
    salary: "LKR 120,000 / mo",
    contactName: "Kamal Perera (Talent Acquisition)",
    contactEmail: "kperera@virtusa.com",
    notes: "Official offer received via email! Deadline to accept: Next Monday.",
    tags: ["Local", "Full-Stack", "Offer Received"],
    interviewRounds: [
      { title: "Online Assessment", date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), completed: true, notes: "Scored 100% on React & Node.js test." },
      { title: "Technical & Managerial Interview", date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), completed: true, notes: "Discussed MERN stack projects and architecture." }
    ],
    checklist: [
      { task: "Review contract terms and stipend breakdown", completed: true },
      { task: "Sign and submit offer letter", completed: false }
    ]
  },
  {
    company: "Meta",
    position: "Frontend Engineering Intern",
    status: "Assessment",
    location: "Remote (USA)",
    jobLink: "https://www.metacareers.com/jobs/intern-fe",
    appliedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    jobType: "Internship",
    workplaceType: "Remote",
    salary: "$55 / hr",
    contactName: "Alex Rivera",
    contactEmail: "arivera@meta.com",
    notes: "Received Codesignal OA invitation. 70-minute timed coding test.",
    tags: ["Frontend", "CodeSignal"],
    interviewRounds: [
      { title: "CodeSignal Online Assessment", date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), completed: false, notes: "4 problems: array manipulation, string math, 2D matrix." }
    ],
    checklist: [
      { task: "Practice CodeSignal practice tests", completed: true },
      { task: "Complete OA before deadline", completed: false }
    ]
  },
  {
    company: "Stripe",
    position: "Backend Infrastructure Intern",
    status: "Applied",
    location: "Seattle, WA (Hybrid)",
    jobLink: "https://stripe.com/jobs/intern-infra",
    appliedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    jobType: "Internship",
    workplaceType: "Hybrid",
    salary: "$62 / hr",
    contactName: "University Recruitment Team",
    contactEmail: "internships@stripe.com",
    notes: "Applied via employee referral from Senior Engineer on LinkedIn.",
    tags: ["Referral", "Fintech", "High Pay"],
    interviewRounds: [],
    checklist: [
      { task: "Follow up with referrer after 2 weeks", completed: false }
    ]
  },
  {
    company: "Canva",
    position: "UI/UX & Frontend Development Intern",
    status: "Wishlist",
    location: "Sydney, Australia (Remote option)",
    jobLink: "https://canva.com/careers/intern-frontend",
    appliedDate: new Date(),
    jobType: "Internship",
    workplaceType: "Remote",
    salary: "$45 / hr",
    notes: "Applications open next week! Need to tailor portfolio projects beforehand.",
    tags: ["Wishlist", "Design Systems"],
    interviewRounds: [],
    checklist: [
      { task: "Update GitHub portfolio link", completed: false },
      { task: "Submit application on day 1", completed: false }
    ]
  },
  {
    company: "Amazon",
    position: "AWS Cloud Software Intern",
    status: "Rejected",
    location: "Arlington, VA",
    jobLink: "https://amazon.jobs/en/jobs/209384",
    appliedDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
    jobType: "Internship",
    workplaceType: "On-site",
    salary: "$52 / hr",
    notes: "Passed OA1 & OA2. Received automated rejection after final interview phase due to headcount limit.",
    tags: ["Cloud", "AWS"],
    interviewRounds: [
      { title: "OA1 Debugging", date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000), completed: true, notes: "Passed 7/7 questions." },
      { title: "OA2 Coding & Work Simulation", date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), completed: true, notes: "Passed test cases." }
    ],
    checklist: []
  }
];

router.post("/seed", async (req, res) => {
  try {
    await Application.deleteMany({});
    const seeded = await Application.insertMany(SAMPLE_APPLICATIONS);
    res.json({ message: "Database successfully seeded with realistic sample data!", count: seeded.length, data: seeded });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
