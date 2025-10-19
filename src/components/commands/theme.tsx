import { getTheme, setTheme } from "@/lib/theme";

function Theme({ subCommand, args }: { subCommand: string; args: string[] }) {
  if (subCommand === "get") {
    return <div>{getTheme()}</div>;
  }

  if (subCommand === "set") {
    setTheme(args[0]);
  }

  return;
}

export default Theme;
