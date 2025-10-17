import React from "react";

type Command = {
  cmd: string;
  description: string;
  usage: string;
  component?: React.LazyExoticComponent<React.ComponentType>;
};

export const availableCommands: Command[] = [
  {
    cmd: "help",
    description: "List all available commands",
    usage: "help",
    component: React.lazy(() => import("@/components/commands/help")),
  },
  {
    cmd: "clear",
    description: "Clear the terminal screen",
    usage: "clear",
  },

  {
    cmd: "history",
    description: "show command history",
    usage: "history",
    component: React.lazy(() => import("@/components/commands/history")),
  },

  {
    cmd: "about",
    description: "About Me",
    usage: "about",
    component: React.lazy(() => import("@/components/commands/about")),
  },
  {
    cmd: "education",
    description: "My Education background",
    usage: "education",
    component: React.lazy(() => import("@/components/commands/education")),
  },
  {
    cmd: "skills",
    description: "What technologies I work with",
    usage: "skills",
    component: React.lazy(() => import("@/components/commands/skills")),
  },
];

export const rawCommands = availableCommands.map((command) => command.cmd);

export const getSimilarCommand = (input: string) => {
  const commands = [];

  if (input.trim() === "") return "";

  for (const cmd of rawCommands) {
    if (cmd.startsWith(input)) {
      commands.push(cmd);
    }
  }

  return commands.length === 1 ? commands[0] : commands;
};

export const getCommandOutput = (command: string) => {
  return availableCommands.find((cmd) => cmd.cmd === command);
};
