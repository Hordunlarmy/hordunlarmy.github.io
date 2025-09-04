import { projects } from "./projects";
import { directoryState } from "../classes/directory-state";

const commands: Map<string, string> = new Map<string, string>();

commands.set("motd", motdText());
commands.set("whoami", "user");
commands.set("touch", "Why would you touch anything?");
commands.set("rm", "Why would you remove anything?");
commands.set("cat", "Here's a cute cat for you! 😊");
commands.set("about", aboutText());
commands.set("date", new Date().toLocaleString());
commands.set("projects", projectsText());
commands.set("ubuntu", ubuntuLogo());
commands.set("ls", foldersText());
commands.set("cd", "Change directory");
commands.set("pwd", "Print working directory");
commands.set("github", openLink("https://github.com/hordunlarmy"));
commands.set("linkedin", openLink("https://www.linkedin.com/in/hordunlarmy"));
commands.set("repo", openLink("https://github.com/hordunlarmy/hordunlarmy.github.io"));
commands.set("email", openLink("mailto:oliver.mrakovics@gmail.com"));
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

export const getCommandByName = (input: string): string => {
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
      return foldersText(folders);
  }

  // commands that require redirecting
  switch (command) {
    case "github":
      window.open("https://github.com/hordunlarmy", "_blank");
      break;
    case "repo":
      window.open("https://github.com/hordunlarmy/hordunlarmy.github.io", "_blank");
      break;
    case "linkedin":
      window.open("https://www.linkedin.com/in/hordunlarmy", "_blank");
      break;
    case "email":
      window.open("mailto:oliver.mrakovics@gmail.com", "_blank");
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
  return ["personal_projects", "APIs", "container_services", "packages"];
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
  const commandNames: string[] = ["clear", "help"];
  for (const entry of Array.from(commands.entries())) {
    commandNames.push(entry[0]);
  }

  return `
    Usage: [command] [options]
    <br>
    <br>

    ${commandNames.sort().join(", ")}
  `;
}

function aboutText(): string {
  return `
    Hello, user!
    <br><br>

    Passionate about web development, I am an experienced <span class="terminal-bold">full-stack engineer</span> specializing in <span class="terminal-bold">front-end development</span>.
    Beginning my coding journey at the age of <span class="terminal-bold">12</span>, I have grown into a <span class="terminal-bold">national champion</span>, demonstrating my dedication and expertise in the field.<br><br>

    My focus on delivering high-quality applications is fueled by a genuine interest in leading technologies, specifically <span class="terminal-bold">React and TypeScript</span>.
    With hands-on experience in various JavaScript frameworks and libraries such as <span class="terminal-bold">Next.js, NodeJS, and Express</span>, I bring a versatile skill set to each project.
    I also have a strong background in SQL databases.<br><br>

    Would you like to connect with me? Enter the 'socials' command!<br>
    Want to take a look at my projects? 
    Enter the 'projects' command or visit my GitHub with the 'github' command!
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
    ${projects
      .map((project) => {
        return `
        <a 
          class="project-${project.category}"
          href="${project.link}"
          target="_blank"
          rel="noreferrer"
        >${project.name}</a>`;
      })
      .join("&nbsp;&nbsp;&nbsp;")}
  `;
}

function foldersText(folders?: string[]): string {
  const defaultFolders = ["personal_projects", "APIs", "container_services", "packages"];
  const foldersToShow = folders || defaultFolders;
  
  const folderColors: { [key: string]: string } = {
    "personal_projects": "text-ubuntu-green",
    "APIs": "text-ubuntu-blue", 
    "container_services": "text-ubuntu-yellow",
    "packages": "text-ubuntu-cyan"
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
