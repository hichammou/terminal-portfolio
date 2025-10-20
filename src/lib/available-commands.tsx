import React from "react";
import { themes } from "./theme";

type SubCommand = {
  cmd: string;
  description?: string;
  usage?: string;
  acceptsArgs: boolean;
};

export type Command = {
  cmd: string;
  description: string;
  usage: string;
  subCmd?: SubCommand[];
  args?: string[];
  component?:
    | React.LazyExoticComponent<React.ComponentType>
    | React.LazyExoticComponent<
        React.ComponentType<{ subCommand: string; args: string[] }>
      >;
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
    cmd: "theme",
    description: "terminal theme",
    usage: "theme [OPTIONS] [ARGS]",
    component: React.lazy(() => import("@/components/commands/theme")),
    subCmd: [
      {
        cmd: "get",
        acceptsArgs: false,
        description: "Get the current theme",
        usage: "theme get",
      },
      {
        cmd: "set",
        acceptsArgs: true,
        description: "change theme",
        usage: `theme set <theme>\navailable themes: ${themes.join(", ")}.
        `,
      },
    ],
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

export const getSimilarCommands = (input: string) => {
  const commands = [];

  if (input.trim() === "") return "";

  for (const cmd of rawCommands) {
    if (cmd.startsWith(input)) {
      commands.push(cmd);
    }
  }

  return commands.length === 1 ? commands[0] : commands;
};

export const getCommand = (command: string) => {
  return availableCommands.find((cmd) => cmd.cmd === command);
};

export const checkSubCommand = (command: Command, subCommand: string) => {
  return command.subCmd
    ? command.subCmd.findIndex((cmd) => cmd.cmd === subCommand)
    : -1;
};

export const renderSubCommandMessage = (
  command: Command,
  subCommand: SubCommand | string,
  {
    isError,
    argsNotProvided,
    tooManyArgs,
  }: {
    isError?: boolean;
    unvalidSubCommand?: boolean;
    argsNotProvided?: boolean;
    tooManyArgs?: boolean;
  }
) => {
  const commandHasOptions = command.subCmd && command.subCmd.length > 0;

  const genericMessage = (
    <div className="space-y-1.5">
      <p>Usage: {command.usage}</p>
      <p>Options: </p>
      <ul className="ms-4">
        {commandHasOptions &&
          command.subCmd?.map((cmd) => (
            <li key={cmd.cmd}>
              <div className="flex">
                <pre className="text-blue">
                  {`${cmd.cmd}  ${cmd.acceptsArgs ? "[ARGS]" : ""}`.padEnd(
                    17,
                    " "
                  )}
                </pre>
                <p>{cmd.description}</p>
              </div>
              <pre className="text-sm ms-2 text-red">{cmd.usage}</pre>
            </li>
          ))}
      </ul>
    </div>
  );

  let message = `unvalid option: ${
    typeof subCommand === "string" ? subCommand : subCommand?.cmd
  }`;

  if (argsNotProvided) message = "command needs at least one argument";

  if (tooManyArgs) message = "too many arguments";

  return (
    <>
      {isError && <p>{message}</p>}
      {genericMessage}
    </>
  );
};
