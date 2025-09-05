import { projects } from "./projects";
import { directoryState } from "../classes/directory-state";

// Dummy data for different folders
const apisData = [
  {
    name: "Blog API",
    description: "CRUD operations for blog posts",
    link: "https://github.com/Hordunlarmy/APIs/tree/master/blogAPI",
  },
  {
    name: "Library API",
    description: "Book management system",
    link: "https://github.com/Hordunlarmy/libraryAPI/tree/9fe8e6a3b6f8b750d2ef2fafc9bbc567cd4da294",
  },
  {
    name: "SIWES API",
    description: "SIWES management system",
    link: "https://github.com/Hordunlarmy/APIs/tree/master/siwesAPI",
  },
  {
    name: "Result Checker",
    description: "School result checking system",
    link: "https://github.com/Hordunlarmy/ResultChecker",
  },
];

const containersData = [
  {
    name: "nginx-proxy",
    description: "Reverse proxy with SSL termination",
    link: "https://github.com/hordunlarmy/nginx-proxy",
  },
  {
    name: "postgres-db",
    description: "PostgreSQL database container",
    link: "https://github.com/hordunlarmy/postgres-db",
  },
  {
    name: "redis-cache",
    description: "Redis caching layer",
    link: "https://github.com/hordunlarmy/redis-cache",
  },
  {
    name: "elasticsearch",
    description: "Search and analytics engine",
    link: "https://github.com/hordunlarmy/elasticsearch",
  },
  {
    name: "prometheus",
    description: "Monitoring and metrics collection",
    link: "https://github.com/hordunlarmy/prometheus",
  },
];

const packagesData = [
  {
    name: "oguild",
    description:
      "A comprehensive multi-language utilities pack providing essential tools and helper functions for modern software development",
    link: "https://pypi.org/project/oguild/",
  },
  {
    name: "devcommit",
    description:
      "A command-line AI tool for generating meaningful commit messages",
    link: "https://pypi.org/project/DevCommit/",
  },
];

const commands: Map<string, string> = new Map<string, string>();

commands.set("motd", motdText());
commands.set("whoami", "whoami");
commands.set("cat", "Here's a cute cat for you! 😊");
commands.set("about", "about");
commands.set("date", new Date().toLocaleString());
commands.set("ubuntu", ubuntuLogo());
commands.set("ls", foldersText());
commands.set("cd", "Change directory");
commands.set("pwd", "Print working directory");
commands.set("github", openLink("https://github.com/hordunlarmy"));
commands.set("linkedin", openLink("https://www.linkedin.com/in/hordunlarmy"));
commands.set(
  "repo",
  openLink("https://github.com/hordunlarmy/hordunlarmy.github.io")
);
commands.set("email", openLink("mailto:horduntech@gmail.com"));
commands.set(
  "codersrank",
  openLink("https://profile.codersrank.io/user/hordunlarmy/")
);
commands.set(
  "socials",
  "Usage: [command]<br><br>github, linkedin, email, codersrank"
);
commands.set("techstack", techStack());
commands.set("help", helpText());

// Create a map of all linkable items for easy lookup
const linkableItems = new Map<string, string>();

// Add all projects to linkable items
projects.forEach(project => {
  linkableItems.set(project.name.toLowerCase().replace(/\s+/g, ''), project.link);
});

// Add all APIs to linkable items
apisData.forEach(api => {
  linkableItems.set(api.name.toLowerCase().replace(/\s+/g, ''), api.link);
});

// Add all containers to linkable items
containersData.forEach(container => {
  linkableItems.set(container.name.toLowerCase().replace(/\s+/g, ''), container.link);
});

// Add all packages to linkable items
packagesData.forEach(pkg => {
  linkableItems.set(pkg.name.toLowerCase().replace(/\s+/g, ''), pkg.link);
});

export const getCommandByName = (
  input: string,
  username: string = "user"
): string => {
  const parts = input.trim().split(" ");
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  // Handle commands with arguments
  switch (command) {
    case "cd":
      if (args.length === 0) {
        directoryState.changeDirectory("/");
        return "";
      }
      try {
        const newPath = directoryState.changeDirectory(args[0]);
        return "";
      } catch (error) {
        return error instanceof Error ? error.message : "cd: unknown error";
      }
    case "pwd":
      return directoryState.getCurrentPath();
    case "ls":
      const folders = directoryState.getAvailableFolders();
      if (folders.length === 0) {
        return "No files or directories found.";
      }

      // Special cases: show folder-specific content
      if (folders.length === 1) {
        switch (folders[0]) {
          case "projects":
            return projectsText();
          case "APIs":
            return apisText();
          case "containers":
            return containersText();
          case "packages":
            return packagesText();
        }
      }

      return foldersText(folders);
    case "about":
      return aboutText(username);
    case "whoami":
      return username;
  }

  // Check if it's a linkable item first
  if (linkableItems.has(command)) {
    const link = linkableItems.get(command);
    if (link) {
      window.open(link, "_blank");
      return "";
    }
  }

  // commands that require redirecting
  switch (command) {
    case "github":
      window.open("https://github.com/hordunlarmy", "_blank");
      break;
    case "repo":
      window.open(
        "https://github.com/hordunlarmy/hordunlarmy.github.io",
        "_blank"
      );
      break;
    case "linkedin":
      window.open("https://www.linkedin.com/in/hordunlarmy", "_blank");
      break;
    case "email":
      window.open("mailto:horduntech@gmail.com", "_blank");
      break;
    case "codersrank":
      window.open("https://profile.codersrank.io/user/hordunlarmy/", "_blank");
      break;
    case "cat":
      window.open("https://cataas.com/cat/cute", "_blank");
      break;
  }

  return commands.get(command) ?? `${command}: command not found`;
};

export const getCommandNames = (): string[] => {
  const commandNames: string[] = ["clear"];
  for (const entry of Array.from(commands.entries())) {
    commandNames.push(entry[0]);
  }

  return commandNames.sort();
};

export const getFolderNames = (): string[] => {
  return ["projects", "APIs", "containers", "packages"];
};

export function motdText(): string {
  return `
    Welcome to hordunlarmy.github.io!<br>

    <br>&nbsp;* GitHub: 
    <a class="terminal-link" href="https://github.com/hordunlarmy" target="_blank" rel="noreferrer">
      https://github.com/hordunlarmy
    </a>

    <br>&nbsp;* Repo: 
    <a class="terminal-link" href="https://github.com/hordunlarmy/hordunlarmy.github.io" target="_blank" rel="noreferrer">
      https://github.com/hordunlarmy/hordunlarmy.github.io
    </a>

    <br>
    <br>&nbsp;* Type 'help' to see the list of available commands.
  `;
}

function helpText(): string {
  const basicCommands = [
    "about",
    "clear", 
    "help",
    "whoami"
  ];

  const navigationCommands = [
    "cd [directory]",
    "ls",
    "pwd"
  ];

  const socialCommands = [
    "github",
    "linkedin", 
    "email",
    "codersrank",
    "socials"
  ];

  const specialCommands = [
    "ubuntu",
    "cat",
    "date"
  ];

  // Add some popular project/package names to help
  const popularItems = [
    "devcommit",
    "stealthportal", 
    "eduhub",
    "oguild",
    "blogapi",
    "libraryapi",
    "nginx-proxy",
    "postgres-db"
  ];

  const availableDirectories = [
    "projects",
    "APIs", 
    "containers",
    "packages"
  ];

  return `
    <div class="text-ubuntu-white">
      <span class="text-ubuntu-orange font-bold text-lg">Available Commands</span>
      <br><br>
      
      <span class="text-ubuntu-green font-bold">📁 Navigation:</span>
      <br>
      ${navigationCommands.map(cmd => `&nbsp;&nbsp;${cmd}`).join("<br>")}
      <br><br>
      
      <span class="text-ubuntu-blue font-bold">ℹ️  Information:</span>
      <br>
      ${basicCommands.map(cmd => `&nbsp;&nbsp;${cmd}`).join("<br>")}
      <br><br>
      
      <span class="text-ubuntu-yellow font-bold">🔗 Social Links:</span>
      <br>
      ${socialCommands.map(cmd => `&nbsp;&nbsp;${cmd}`).join("<br>")}
      <br><br>
      
      <span class="text-ubuntu-cyan font-bold">🎯 Special:</span>
      <br>
      ${specialCommands.map(cmd => `&nbsp;&nbsp;${cmd}`).join("<br>")}
      <br><br>
      
      <span class="text-ubuntu-orange font-bold">📂 Directories:</span>
      <br>
      ${availableDirectories.map(dir => `&nbsp;&nbsp;cd ${dir}`).join("<br>")}
      <br><br>
      
      <span class="text-ubuntu-green font-bold">⚡ Quick Access (type any name to open):</span>
      <br>
      ${popularItems.join(", ")}
      <br><br>
      
      <div class="text-ubuntu-white text-sm bg-ubuntu-dark p-2 rounded">
        <span class="text-ubuntu-orange font-bold">💡 Tips:</span>
        <br>
        • Use <span class="text-ubuntu-yellow">cd [directory]</span> to navigate into folders
        <br>
        • Use <span class="text-ubuntu-yellow">ls</span> to see contents of current directory
        <br>
        • Type any project/API/container/package name to open it directly
        <br>
        • Use <span class="text-ubuntu-yellow">cd ..</span> to go back to parent directory
      </div>
    </div>
  `;
}

function aboutText(username: string = "user"): string {
  return `
    Hello, ${username}!
    <br><br>

    I'm a <span class="terminal-bold">backend and DevOps engineer</span> with a strong focus on building reliable, scalable, and secure systems. My expertise spans <span class="terminal-bold">API development with Python/FastAPI</span>, <span class="terminal-bold">database design and optimization with PostgreSQL and MongoDB</span>, and <span class="terminal-bold">real-time event-driven architectures with Redis</span>.<br><br>

    On the infrastructure side, I work with <span class="terminal-bold">Docker and Kubernetes</span> to containerize, orchestrate, and scale applications, while leveraging <span class="terminal-bold">CI/CD pipelines</span> to streamline deployments. I'm passionate about designing resilient architectures, automating workflows, and ensuring that systems perform smoothly in production.<br><br>

    Would you like to connect with me? Enter the 'socials' command!<br>
    Want to take a look at my projects? 
    Navigate to the 'projects' folder with 'cd projects' and use 'ls' to see them, or visit my GitHub with the 'github' command!
  `;
}

function openLink(link: string): string {
  return `
    Redirecting to 
      <a class="terminal-link" href="${link}" target="_blank" rel="noreferrer">
        ${link}</a>...
    `;
}

function projectsText(): string {
  return `
    <div class="text-ubuntu-green">
      ${projects
        .map((project) => {
          return `
          <div class="mb-2">
            <a 
              class="text-ubuntu-orange font-bold hover:text-ubuntu-yellow terminal-link" 
              href="${project.link}" 
              target="_blank" 
              rel="noreferrer"
            >${project.name}</a>
            <br>
            <span class="text-ubuntu-white text-sm ml-4">${project.description}</span>
          </div>`;
        })
        .join("")}
    </div>
  `;
}

function foldersText(folders?: string[]): string {
  const defaultFolders = ["projects", "APIs", "containers", "packages"];
  const foldersToShow = folders || defaultFolders;

  const folderColors: { [key: string]: string } = {
    projects: "text-ubuntu-green",
    APIs: "text-ubuntu-blue",
    containers: "text-ubuntu-yellow",
    packages: "text-ubuntu-cyan",
  };

  return `
    ${foldersToShow
      .map((folder) => {
        const color = folderColors[folder] || "text-ubuntu-white";
        return `<span class="${color}">${folder}/</span>`;
      })
      .join("&nbsp;&nbsp;&nbsp;")}
  `;
}

function ubuntuLogo() {
  return `
    <span class="text-ubuntu-orange flex flex-col">
      <span>${"    _    _ _                 _       _".replaceAll(" ", "&nbsp;")}</span>
      <span>${"   | |  | | |               | |     | |".replaceAll(" ", "&nbsp;")}</span>
      <span>${"   | |  | | |__  _   _ _ __ | |_ ___| |".replaceAll(" ", "&nbsp;")}</span>
      <span>${"   | |  | | '_ \\| | | | '_ \\| __/ _ \\ |".replaceAll(" ", "&nbsp;")}</span>
      <span>${"   | |__| | |_) | |_| | | | | ||  __/ |".replaceAll(" ", "&nbsp;")}</span>
      <span>${"    \\____/|_.__/ \\__,_|_| |_|\\__\\___|_|".replaceAll(" ", "&nbsp;")}</span>
      <br>
      <span>${"Welcome to Ubuntu!".replaceAll(" ", "&nbsp;")}</span>
    </span>
  `;
}

function techStack() {
  return `<a href="https://github.com/hordunlarmy/github-readme-tech-stack" target="_blank"><img src="https://github-readme-tech-stack.vercel.app/api/cards?title=Tech+Stack&width=420&align=center&titleAlign=center&fontSize=20&lineHeight=10&lineCount=2&theme=hordunlarmy&line1=node.js%2Cnode.js%2Cauto%3Bexpress%2Cexpress%2Cffffff%3Bnestjs%2Cnestjs%2Ce12a54%3B&line2=react%2Creact%2Cauto%3Btailwindcss%2Ctailwind%2Cauto%3Btypescript%2Ctypescript%2Cauto%3B" alt="Tech Stack" /></a>`;
}

function apisText(): string {
  return `
    <div class="text-ubuntu-blue">
      ${apisData
        .map((api) => {
          return `
          <div class="mb-2">
            <a 
              class="text-ubuntu-orange font-bold hover:text-ubuntu-yellow terminal-link" 
              href="${api.link}" 
              target="_blank" 
              rel="noreferrer"
            >${api.name}</a>
            <br>
            <span class="text-ubuntu-white text-sm ml-4">${api.description}</span>
          </div>`;
        })
        .join("")}
    </div>
  `;
}

function containersText(): string {
  return `
    <div class="text-ubuntu-yellow">
      ${containersData
        .map((container) => {
          return `
          <div class="mb-2">
            <a 
              class="text-ubuntu-orange font-bold hover:text-ubuntu-yellow terminal-link" 
              href="${container.link}" 
              target="_blank" 
              rel="noreferrer"
            >${container.name}</a>
            <br>
            <span class="text-ubuntu-white text-sm ml-4">${container.description}</span>
          </div>`;
        })
        .join("")}
    </div>
  `;
}

function packagesText(): string {
  return `
    <div class="text-ubuntu-cyan">
      ${packagesData
        .map((pkg) => {
          return `
          <div class="mb-2">
            <a 
              class="text-ubuntu-orange font-bold hover:text-ubuntu-yellow terminal-link" 
              href="${pkg.link}" 
              target="_blank" 
              rel="noreferrer"
            >${pkg.name}</a>
            <br>
            <span class="text-ubuntu-white text-sm ml-4">${pkg.description}</span>
          </div>`;
        })
        .join("")}
    </div>
  `;
}

