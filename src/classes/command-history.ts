class CommandHistory {
  private history: string[] = [];
  private currentIndex: number = -1;
  private maxHistorySize: number = 100;

  public addCommand(command: string): void {
    // Don't add empty commands or duplicate consecutive commands
    if (command.trim() === "" || (this.history.length > 0 && this.history[this.history.length - 1] === command)) {
      return;
    }

    this.history.push(command);
    
    // Limit history size
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    }
    
    // Reset current index to the end
    this.currentIndex = this.history.length;
  }

  public getPreviousCommand(): string | null {
    if (this.history.length === 0) {
      return null;
    }

    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }

    return null;
  }

  public getNextCommand(): string | null {
    if (this.history.length === 0) {
      return null;
    }

    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }

    // If we're at the end, return empty string to clear the input
    if (this.currentIndex === this.history.length - 1) {
      this.currentIndex = this.history.length;
      return "";
    }

    return null;
  }

  public resetIndex(): void {
    this.currentIndex = this.history.length;
  }

  public getHistory(): string[] {
    return [...this.history];
  }

  public clearHistory(): void {
    this.history = [];
    this.currentIndex = -1;
  }
}

// Export a singleton instance
export const commandHistory = new CommandHistory();
