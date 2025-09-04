class DirectoryState {
  private currentPath: string[] = [];

  public getCurrentPath(): string {
    if (this.currentPath.length === 0) {
      return "~";
    }
    return "~/" + this.currentPath.join("/");
  }

  public getCurrentDirectory(): string {
    if (this.currentPath.length === 0) {
      return "~";
    }
    return this.currentPath[this.currentPath.length - 1];
  }

  public changeDirectory(target: string): string {
    // Remove trailing slash if present
    target = target.replace(/\/$/, "");
    
    if (target === "/" || target === "" || target === "~") {
      this.currentPath = [];
      return this.getCurrentPath();
    }

    // Handle multiple .. patterns like ../.. or ../../..
    if (target.startsWith("../")) {
      const parts = target.split("/");
      const upLevels = parts.filter(part => part === "..").length;
      
      // Go up the specified number of levels
      for (let i = 0; i < upLevels; i++) {
        if (this.currentPath.length > 0) {
          this.currentPath.pop();
        }
      }
      
      // If there's a remaining path after the .. parts, navigate to it
      const remainingPath = parts.filter(part => part !== ".." && part !== "").join("/");
      if (remainingPath) {
        return this.changeDirectory(remainingPath);
      }
      
      return this.getCurrentPath();
    }

    if (target === "..") {
      if (this.currentPath.length > 0) {
        this.currentPath.pop();
      }
      return this.getCurrentPath();
    }

    // Check if target is a valid folder
    const validFolders = ["personal_projects", "APIs", "container_services", "packages"];
    if (validFolders.includes(target)) {
      this.currentPath.push(target);
      return this.getCurrentPath();
    }

    // Provide helpful error message with available folders
    const availableFolders = this.getAvailableFolders();
    if (availableFolders.length > 0) {
      throw new Error(`cd: ${target}: No such file or directory. Available: ${availableFolders.join(", ")}`);
    } else {
      throw new Error(`cd: ${target}: No such file or directory`);
    }
  }

  public getAvailableFolders(): string[] {
    if (this.currentPath.length === 0) {
      // We're in root, show all folders
      return ["personal_projects", "APIs", "container_services", "packages"];
    }
    
    // For now, we don't have subdirectories, so return empty array
    // In the future, you could add subdirectories based on current path
    return [];
  }
}

// Export a singleton instance
export const directoryState = new DirectoryState();
