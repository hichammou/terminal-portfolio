"use client";

import History from "@/components/history";
import HistoryContextProvider from "@/context/HistoryContext";
import { linux } from "@/lib/ascii-logos";

export default function Home() {
  const name = String.raw`    __  ______________  _____    __  ___   __  _______  __  ____    ______    ____
   / / / /  _/ ____/ / / /   |  /  |/  /  /  |/  / __ \/ / / / /   /  _/ /   /  _/
  / /_/ // // /   / /_/ / /| | / /|_/ /  / /|_/ / / / / / / / /    / // /    / /  
 / __  // // /___/ __  / ___ |/ /  / /  / /  / / /_/ / /_/ / /____/ // /____/ /   
/_/ /_/___/\____/_/ /_/_/  |_/_/  /_/  /_/  /_/\____/\____/_____/___/_____/___/   
                                                                                  `;

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
                <pre className="text-blue">
                  {"ctrl + l".padEnd(15, " ")} {"-->"} clear terminal output
                </pre>
                <pre className="text-blue">
                  {"tab".padEnd(15, " ")} {"-->"} autocomplete command
                </pre>
                <pre className="text-blue">
                  {"↑ & ↓".padEnd(15, " ")} {"-->"} navigate command history
                </pre>
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

/*
------ dark -----
#1E1E2E // background

// red
#E06C75
#F38BA8

// gray
#BAC2DE
#A6ADC8

// green
#7ED88B
#A6E3A1

// yellow
#EBD391
#F9E2AF

// blue
#89B4FA
#74A8FC

// pink
#F5C2E7
#F2AEDE

// cyan
#94E2D5
#6BD7CA

------ light -----
#EFF1F5 // background
*/
