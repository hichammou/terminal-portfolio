"use client";

import { useEffect, useRef, useState } from "react";
import { useHistory } from "@/context/HistoryContext";
import { getCommandOutput, getSimilarCommand } from "@/lib/available-commands";
import Output from "./output";

function Input() {
  const [command, setCommand] = useState("");
  const [disabled, setIsDisabled] = useState(false);
  const [commandCache, setCommandCache] = useState("");
  const [hints, setHints] = useState<{ cmd: string; selected: boolean }[]>([]);
  const [nextHint, setNextHint] = useState(0);
  const {
    addToHistory,
    clearHistory,
    isHistoryEmpty,
    navigateHistory,
    resetHistoryIndex,
  } = useHistory();
  const [isValid, setIsValid] = useState(false);

  // a ref to the input element
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleDocumentClick() {
      inputRef.current?.focus();
    }

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  // focus on the input when
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // an effect to reset the first input if history is cleared
  useEffect(() => {
    if (isHistoryEmpty) {
      setIsDisabled(false);
      setCommand("");

      // focus on the first input
      inputRef.current?.focus();
    }
  }, [isHistoryEmpty]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // check if "enter" is clicked
    if (e.key === "Enter") {
      // check if there is a selected hint
      if (hints.length > 0) {
        setCommand(hints.find((h) => h.selected)?.cmd || command);
        setNextHint(0);
        setHints([]);
        return;
      }

      addToHistory?.(command);

      resetHistoryIndex();

      // clear history if command is "clear"
      if (command === "clear") {
        clearHistory?.();
        return;
      }
      setIsDisabled(true);

      return;
    }

    // clear history if "ctrl + l" is clicked
    if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      clearHistory?.();

      return;
    }

    // handle arrows up and down to navigate through history
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      let result = "";
      if (e.key === "ArrowUp") {
        result = navigateHistory("up");
      } else {
        result = navigateHistory("down");
      }
      if (result === "") {
        setCommand(commandCache);
        return;
      }
      setCommand(result);

      return;
    }

    // handle tab to autocomplete command
    if (e.key === "Tab") {
      e.preventDefault();

      // do nothing if command is empty
      if (!command.trim()) return;

      const findCommand = getSimilarCommand(command);

      if (findCommand) {
        if (Array.isArray(findCommand)) {
          setHints(
            findCommand.map((cmd, idx) => ({
              cmd,
              selected: nextHint === idx,
            }))
          );
          setNextHint(nextHint + 1 >= findCommand.length ? 0 : nextHint + 1);
        } else {
          setCommand(findCommand);
          setHints([]);
        }
      }
      return;
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // check if the command is available
    const isValidCommand =
      getCommandOutput(e.target.value)?.cmd === e.target.value;

    if (isValidCommand) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    // clear hints if command is not included in hints
    if (!getSimilarCommand(e.target.value).length && hints.length > 0) {
      setHints([]);
      setNextHint(0);
    }

    setCommand(e.target.value);
    setCommandCache(e.target.value);
  };

  return (
    <div>
      <span className="text-yellow-light">guest</span>
      <span>@</span>
      <span className="text-green">terminal.hicham-moulili.dev</span>
      <span>:~$</span>
      <input
        type="text"
        ref={inputRef}
        disabled={disabled}
        className={`border-none outline-0 ms-2 + ${
          isValid ? " text-blue" : ""
        }`}
        value={command}
        // onBlur={() => inputRef.current?.focus()} // keep focus on input
        onKeyDown={onKeyDown}
        onChange={onChange}
      />
      <div className="mt-2">
        {disabled && command !== "clear" && <Output command={command} />}
        {hints.length > 0 && (
          <ul>
            {hints.map((hint) => (
              <li key={hint.cmd} className={hint.selected ? "font-bold" : ""}>
                {hint.cmd}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Input;
