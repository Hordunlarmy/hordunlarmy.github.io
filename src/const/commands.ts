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
commands.set("fortune", fortuneText());
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
projects.forEach((project) => {
  linkableItems.set(
    project.name.toLowerCase().replace(/\s+/g, ""),
    project.link
  );
});

// Add all APIs to linkable items
apisData.forEach((api) => {
  linkableItems.set(api.name.toLowerCase().replace(/\s+/g, ""), api.link);
});

// Add all containers to linkable items
containersData.forEach((container) => {
  linkableItems.set(
    container.name.toLowerCase().replace(/\s+/g, ""),
    container.link
  );
});

// Add all packages to linkable items
packagesData.forEach((pkg) => {
  linkableItems.set(pkg.name.toLowerCase().replace(/\s+/g, ""), pkg.link);
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
    <div class="text-ubuntu-white">
      <div class="text-ubuntu-orange font-bold text-xl mb-4">
        🌟 Welcome! 🌟
      </div>
      
      <div class="space-y-2">
        <div class="flex items-center">
          <span class="text-ubuntu-green font-bold mr-2">📁</span>
          <span class="text-ubuntu-yellow">GitHub:</span>
          <a class="terminal-link ml-2 text-ubuntu-cyan hover:text-ubuntu-yellow" href="https://github.com/hordunlarmy" target="_blank" rel="noreferrer">
            https://github.com/hordunlarmy
          </a>
        </div>

        <div class="flex items-center">
          <span class="text-ubuntu-blue font-bold mr-2">💻</span>
          <span class="text-ubuntu-yellow">Repo:</span>
          <a class="terminal-link ml-2 text-ubuntu-cyan hover:text-ubuntu-yellow" href="https://github.com/hordunlarmy/hordunlarmy.github.io" target="_blank" rel="noreferrer">
            https://github.com/hordunlarmy/hordunlarmy.github.io
          </a>
        </div>
      </div>

      <div class="mt-6 p-3 bg-ubuntu-dark rounded-lg border-l-4 border-ubuntu-orange">
        <div class="flex items-center">
          <span class="text-ubuntu-orange text-lg mr-2">💡</span>
          <span class="text-ubuntu-white">
            Type <span class="text-ubuntu-yellow font-bold">'help'</span> to see the list of available commands
          </span>
        </div>
      </div>
    </div>
  `;
}

function helpText(): string {
  const basicCommands = ["about", "clear", "help", "whoami"];

  const navigationCommands = ["cd [directory]", "ls", "pwd"];

  const socialCommands = [
    "github",
    "linkedin",
    "email",
    "codersrank",
    "socials",
  ];

  const specialCommands = ["ubuntu", "cat", "fortune"];

  // Add some popular project/package names to help
  const popularItems = ["devcommit", "stealthportal", "eduhub", "oguild"];

  const availableDirectories = ["projects", "APIs", "containers", "packages"];

  return `
    <div class="text-ubuntu-white">
      <span class="text-ubuntu-orange font-bold text-lg">Available Commands</span>
      <br><br>
      
      <div class="grid grid-cols-3 gap-6">
        <div>
          <span class="text-ubuntu-green font-bold">📁 Navigation:</span>
          <br>
          ${navigationCommands.map((cmd) => `&nbsp;&nbsp;${cmd}`).join("<br>")}
        </div>
        
        <div>
          <span class="text-ubuntu-blue font-bold">ℹ️  Information:</span>
          <br>
          ${basicCommands.map((cmd) => `&nbsp;&nbsp;${cmd}`).join("<br>")}
        </div>
        
        <div>
          <span class="text-ubuntu-yellow font-bold">🔗 Social Links:</span>
          <br>
          ${socialCommands.map((cmd) => `&nbsp;&nbsp;${cmd}`).join("<br>")}
        </div>
      </div>
      
      <br>
      
      <div class="grid grid-cols-3 gap-6">
        <div>
          <span class="text-ubuntu-cyan font-bold">🎯 Special:</span>
          <br>
          ${specialCommands.map((cmd) => `&nbsp;&nbsp;${cmd}`).join("<br>")}
        </div>
        
        <div>
          <span class="text-ubuntu-orange font-bold">📂 Directories:</span>
          <br>
          ${availableDirectories.map((dir) => `&nbsp;&nbsp;cd ${dir}`).join("<br>")}
        </div>
        
        <div>
          <span class="text-ubuntu-green font-bold">⚡ Quick Access:</span>
          <br>
          ${popularItems.map((item) => `&nbsp;&nbsp;${item}`).join("<br>")}
        </div>
      </div>
      
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
    <div class="flex flex-col md:flex-row items-start gap-4">
      <div class="flex-shrink-0">
        <img 
          src="./profile.jpeg" 
          alt="Profile Picture" 
          class="w-32 h-32 rounded-full border-2 border-ubuntu-orange object-cover shadow-lg"
        />
      </div>
      <div class="flex-1">
        <h2 class="text-ubuntu-orange font-bold text-xl mb-2">Hello, ${username}!</h2>
        
        <p class="text-ubuntu-white mb-4">
          I'm a <span class="terminal-bold">backend and DevOps engineer</span> with a strong focus on building reliable, scalable, and secure systems. My expertise spans <span class="terminal-bold">API development with Python/FastAPI</span>, <span class="terminal-bold">database design and optimization with PostgreSQL and MongoDB</span>, and <span class="terminal-bold">real-time event-driven architectures with Redis</span>.
        </p>

        <p class="text-ubuntu-white mb-4">
          On the infrastructure side, I work with <span class="terminal-bold">Docker and Kubernetes</span> to containerize, orchestrate, and scale applications, while leveraging <span class="terminal-bold">CI/CD pipelines</span> to streamline deployments. I'm passionate about designing resilient architectures, automating workflows, and ensuring that systems perform smoothly in production.
        </p>

        <div class="text-ubuntu-white">
          <p class="mb-2">Would you like to connect with me? Enter the <span class="text-ubuntu-yellow">'socials'</span> command!</p>
          <p>Want to take a look at my projects? Navigate to the <span class="text-ubuntu-green">'projects'</span> folder with <span class="text-ubuntu-yellow">'cd projects'</span> and use <span class="text-ubuntu-yellow">'ls'</span> to see them, or visit my GitHub with the <span class="text-ubuntu-yellow">'github'</span> command!</p>
        </div>
      </div>
    </div>
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
    <span class="text-ubuntu-orange flex flex-col font-mono">
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

function fortuneText(): string {
  const fortunes = [
    // Inspirational & Motivational
    "The best way to predict the future is to create it.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The only way to do great work is to love what you do.",
    "Innovation distinguishes between a leader and a follower.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "It's not that I'm so smart, it's just that I stay with problems longer.",
    "The way to get started is to quit talking and begin doing.",
    "Don't be afraid to give up the good to go for the great.",
    "The only impossible journey is the one you never begin.",
    "Success is walking from failure to failure with no loss of enthusiasm.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Dream big and dare to fail.",
    "The future depends on what you do today.",
    "Believe you can and you're halfway there.",
    "The only person you are destined to become is the person you decide to be.",
    "Your limitation—it's only your imagination.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn't just find you. You have to go out and get it.",
    "The harder you work, the luckier you get.",

    // Programming Wisdom
    "Code is like humor. When you have to explain it, it's bad.",
    "First, solve the problem. Then, write the code.",
    "Experience is the name everyone gives to their mistakes.",
    "The best error message is the one that never shows up.",
    "It's not a bug; it's an undocumented feature.",
    "There are only two hard things in Computer Science: cache invalidation and naming things.",
    "A good programmer is someone who always looks both ways before crossing a one-way street.",
    "The best code is no code at all.",
    "Premature optimization is the root of all evil.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "The most disastrous thing that you can ever learn is your first programming language.",
    "Real programmers count from 0.",
    "If debugging is the process of removing software bugs, then programming must be the process of putting them in.",
    "Walking on water and developing software from a specification are easy if both are frozen.",
    "It's not a bug, it's a feature.",
    "The best way to get a project done faster is to start sooner.",
    "A program is never less than 90% complete, and never more than 95% complete.",
    "The first 90% of the code accounts for the first 90% of the development time.",
    "Good code is its own best documentation.",
    "Code never lies, comments sometimes do.",
    "The best error handling is the one that prevents errors.",
    "A good programmer is someone who always looks both ways before crossing a one-way street.",
    "The best way to learn a programming language is by writing programs in it.",
    "Code is poetry written in logic.",
    "The best programs are written by programmers who are having fun.",
    "A program is a poem that does something useful.",
    "The best code is the code you don't have to write.",
    "Programming is not about typing, it's about thinking.",
    "The best way to debug a program is to not write bugs in the first place.",
    "Code is like a joke. If you have to explain it, it's bad.",
    "The best programs are the ones that make the computer do the work.",

    // Tech Humor
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?'",
    "Why do Java developers wear glasses? Because they can't C#.",
    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
    "Why do programmers hate nature? It has too many bugs.",
    "What's a programmer's favorite hangout place? The Foo Bar.",
    "Why did the programmer quit his job? He didn't get arrays.",
    "What do you call a programmer from Finland? Nerdic.",
    "Why do programmers prefer iOS development? Because Android is too fragmented.",
    "What's a programmer's favorite type of music? Algo-rhythms.",
    "Why don't programmers like to go outside? The sunlight causes too many reflections.",
    "What do you call a programmer who doesn't comment their code? A silent partner.",
    "Why did the developer go broke? Because he used up all his cache.",
    "What's a programmer's favorite snack? Microchips.",
    "Why do programmers love nature? It has the best algorithms.",
    "What do you call a programmer who doesn't use version control? A time traveler.",
    "Why did the programmer get fired? He kept trying to debug production on a Friday.",
    "What's a programmer's favorite type of tree? A binary tree.",
    "Why do programmers hate stairs? They're always up to something.",
    "What do you call a programmer who doesn't test their code? An optimist.",

    // Life Wisdom
    "Life is what happens to you while you're busy making other plans.",
    "The way to get started is to quit talking and begin doing.",
    "Life is either a daring adventure or nothing at all.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "It is during our darkest moments that we must focus to see the light.",
    "The way to get started is to quit talking and begin doing.",
    "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    "The only impossible journey is the one you never begin.",
    "In the end, it's not the years in your life that count. It's the life in your years.",
    "Life is a learning process, and if you stop learning, you stop living.",
    "The only way to do great work is to love what you do.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "The only person you are destined to become is the person you decide to be.",
    "Your limitation—it's only your imagination.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn't just find you. You have to go out and get it.",
    "The harder you work, the luckier you get.",
    "Don't be afraid to give up the good to go for the great.",
    "The only impossible journey is the one you never begin.",

    // Creative & Artistic
    "Creativity is intelligence having fun.",
    "The creative adult is the child who survived.",
    "Imagination is more important than knowledge.",
    "Art is the lie that enables us to realize the truth.",
    "Creativity takes courage.",
    "The worst enemy to creativity is self-doubt.",
    "Creativity is a wild mind and a disciplined eye.",
    "The creative process is a process of surrender, not control.",
    "Creativity is the way I share my soul with the world.",
    "The creative adult is the child who survived.",
    "Imagination is the beginning of creation.",
    "Creativity is intelligence having fun.",
    "The creative process is a process of surrender, not control.",
    "Creativity is the way I share my soul with the world.",
    "The creative adult is the child who survived.",
    "Imagination is the beginning of creation.",
    "Creativity is intelligence having fun.",
    "The creative process is a process of surrender, not control.",
    "Creativity is the way I share my soul with the world.",
    "The creative adult is the child who survived.",

    // Problem Solving
    "Every problem is a gift—without problems we would not grow.",
    "The problem is not the problem. The problem is your attitude about the problem.",
    "A problem is a chance for you to do your best.",
    "The way to get started is to quit talking and begin doing.",
    "Don't be afraid to give up the good to go for the great.",
    "The only impossible journey is the one you never begin.",
    "Success is walking from failure to failure with no loss of enthusiasm.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Dream big and dare to fail.",
    "The future depends on what you do today.",
    "Believe you can and you're halfway there.",
    "The only person you are destined to become is the person you decide to be.",
    "Your limitation—it's only your imagination.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn't just find you. You have to go out and get it.",
    "The harder you work, the luckier you get.",
    "Don't be afraid to give up the good to go for the great.",
    "The only impossible journey is the one you never begin.",
    "Success is walking from failure to failure with no loss of enthusiasm.",
  ];

  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

  return `
    <div class="text-ubuntu-cyan">
      <div class="bg-ubuntu-dark p-4 rounded-lg border-l-4 border-ubuntu-orange">
        <div class="flex items-start">
          <span class="text-ubuntu-orange text-2xl mr-3">🔮</span>
          <div>
            <p class="text-ubuntu-white italic text-lg mb-2">"${randomFortune}"</p>
            <p class="text-ubuntu-yellow text-sm">~ Fortune Cookie</p>
          </div>
        </div>
      </div>
    </div>
  `;
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

