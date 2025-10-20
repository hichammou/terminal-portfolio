import { getTheme, setTheme, themes, themesString } from "@/lib/theme";

function Theme({ subCommand, args }: { subCommand: string; args: string[] }) {
  if (subCommand === "get") {
    return <p>{getTheme()}</p>;
  }

  if (subCommand === "set") {
    if (!themes.find((t) => t === args[0])) {
      return <p>available themes: {themesString}</p>;
    }
    setTheme(args[0]);
  }

  return;
}

export default Theme;
