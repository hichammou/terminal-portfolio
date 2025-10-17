import { availableCommands } from "@/lib/available-commands";

function Help() {
  return (
    <div className="text-base">
      <p className="">Available commands:</p>
      <div className="mt-2 space-y-1">
        {availableCommands.map((command) => (
          <div key={command.cmd} className="flex gap-3">
            <pre className="text-blue">{command.cmd.padEnd(15, " ")}</pre>{" "}
            <span>-</span> <span className="">{command.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Help;
