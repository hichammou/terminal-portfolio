import { Suspense } from "react";
import {
  checkSubCommand,
  getCommandOutput,
  renderSubCommandMessage,
} from "@/lib/available-commands";
import Loader from "./loader";

function Output({ command }: { command: string }) {
  const commandParts = command.split(" ");

  const commandOutput = getCommandOutput(commandParts[0]);

  // make empty commands not pass this check
  if (command !== "" && !commandOutput) {
    return (
      <div>
        command not found: <code className="text-cyan">{commandParts[0]}</code>
      </div>
    );
  }

  const subCommands = commandOutput?.subCmd;
  // check if the command has subcommand
  if (subCommands && subCommands.length > 0) {
    // check if the given command has no subcommands
    if (commandParts.length === 1) {
      return renderSubCommandMessage(commandOutput, "", {});
    }
    // check that the subcommand is valid
    const indexCheck = checkSubCommand(commandOutput, commandParts[1]);
    if (indexCheck === -1) {
      return renderSubCommandMessage(commandOutput, commandParts[1], {
        isError: true,
      });
    }

    const selectedSubCommand = subCommands[indexCheck];
    // check if it accepts args
    if (selectedSubCommand.acceptsArgs && commandParts.length < 3) {
      return renderSubCommandMessage(commandOutput, selectedSubCommand, {
        isError: true,
        argsNotProvided: true,
      });
    }
  }

  if (commandOutput?.component) {
    const Component =
      commandOutput.subCmd && commandOutput.subCmd.length > 0 ? (
        <commandOutput.component
          args={commandParts.slice(2)}
          subCommand={commandParts.at(1) || ""}
        />
      ) : (
        // @ts-expect-error | at this point it is sure that the component does not need any props
        <commandOutput.component />
      );
    return <Suspense fallback={<Loader />}>{Component}</Suspense>;
  }

  // clear does not have any output
  return <div></div>;
}

export default Output;
