interface Project {
  name: string;
  link: string;
  category: "frontend" | "backend" | "fullstack" | "other";
}

export const projects: Project[] = [
  {
    name: "GitHub README Tech Stack",
    link: "https://github.com/hordunlarmy/github-readme-tech-stack?ref=hordunlarmy.github.io",
    category: "fullstack",
  },
  {
    name: "Trello Clone",
    link: "https://github.com/hordunlarmy/trello-clone?ref=hordunlarmy.github.io",
    category: "fullstack",
  },
  {
    name: "CLI File Manager",
    link: "https://github.com/hordunlarmy/cli-file-manager?ref=hordunlarmy.github.io",
    category: "other",
  },
  {
    name: "Pathfinding Visualizer",
    link: "https://github.com/hordunlarmy/pathfinding-visualizer?ref=hordunlarmy.github.io",
    category: "frontend",
  },
  {
    name: "Portfolio Website",
    link: "https://github.com/hordunlarmy/hordunlarmy.github.io?ref=hordunlarmy.github.io",
    category: "frontend",
  },
];
