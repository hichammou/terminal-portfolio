import { Suspense } from "react";
import { getCommandOutput } from "@/lib/available-commands";

function Output({ command }: { command: string }) {
  const commandOutput = getCommandOutput(command);

  // make empty commands not pass this check
  if (command && !commandOutput) {
    return <div>command not found: {command}</div>;
  }

  if (commandOutput?.component) {
    return (
      <Suspense fallback={<div></div>}>
        <commandOutput.component />
      </Suspense>
    );
  }

  // clear does not have any output
  return <div></div>;
}

export default Output;
