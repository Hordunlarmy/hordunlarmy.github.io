interface Project {
  name: string;
  link: string;
  description: string;
  category: "frontend" | "backend" | "fullstack" | "other";
}

export const projects: Project[] = [
  {
    name: "DevCommit",
    link: "https://github.com/Hordunlarmy/DevCommit",
    description: "A command-line AI tool for autocommits.",
    category: "backend",
  },
  {
    name: "StealthPortal",
    link: "https://github.com/Hordunlarmy/StealthPortal",
    description: "A web-based communication platform",
    category: "fullstack",
  },
  {
    name: "EduHub",
    link: "https://github.com/Hordunlarmy/eduhub",
    description: "A feature-rich Learning Management System (LMS)",
    category: "fullstack",
  },
  {
    name: "Portfolio Website",
    link: "https://github.com/hordunlarmy/hordunlarmy.github.io?ref=hordunlarmy.github.io",
    description:
      "Terminal-style portfolio website built with React and TypeScript",
    category: "frontend",
  },
];

