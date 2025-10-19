"use client";

import { useEffect } from "react";
import History from "@/components/history";
import HistoryContextProvider from "@/context/HistoryContext";
import { linux, name } from "@/lib/ascii-logos";
import { loadTheme } from "@/lib/theme";

const shortcuts = [
  { sh: "ctrl + l", desc: "clear terminal output" },
  { sh: "tab", desc: "autocomplete command" },
  { sh: "↑ & ↓", desc: "navigate command history" },
  { sh: "theme", desc: "for terminal theming" },
];

export default function Home() {
  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <div className="min-h-screen text-sm px-4 py-7 space-y-4 text-foreground-text dark:text-gray">
      <HistoryContextProvider>
        {/* The first terminal input */}
        {/* <Input /> */}
        <div className="flex gap-20">
          <div>
            <pre className="font-mono whitespace-pre text-sm leading-tight bg-gradient-to-l from-green to-red px-3 bg-clip-text text-transparent">
              {name}
            </pre>

            <div className="mt-4 space-y-2">
              <p>Welcome to my terminal protfolio. (Version 1.0.0)</p>
              <p>---------</p>
              <p>
                This Project's source code can be found in this{" "}
                <a
                  href="https://github.com/hichammou/terminal-portfolio"
                  target="_blank"
                  rel="noreferrer"
                  className="text-pink underline decoration-dashed hover:decoration-solid transition-all"
                >
                  Github Repo
                </a>
              </p>
              <p>---------</p>
              <p>
                run '<span className="text-pink">help</span>' to see the list of
                available commands.
              </p>
              <p>---------</p>
              <div>
                {shortcuts.map((sh) => (
                  <pre key={sh.sh} className="text-blue">
                    {sh.sh.padEnd(15, " ")} ➡️ {sh.desc}
                  </pre>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <pre className="font-mono whitespace-pre text-sm leading-tight bg-gradient-to-r from-green to-red px-3 bg-clip-text text-transparent">
              {linux}
            </pre>
          </div>
        </div>
        <History />
        {/* <Help /> */}
      </HistoryContextProvider>
    </div>
  );
}
