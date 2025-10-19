"use client";

import { useEffect, useRef, useState } from "react";
import getCaretCoordinates from "textarea-caret";
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
  const [coords, setCoords] = useState({ left: 0, top: 0 });

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

  // to track the input caret position
  const handleCaretUpdate = () => {
    const el = inputRef.current;
    if (!el) return;
    const caretPos = el.selectionStart || 0;
    const { left, top } = getCaretCoordinates(el, caretPos);
    setCoords({ left, top });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // prevent the user from entering non sense texts
    if (e.target.value.length > 30) return;
    const commandFirstPart = e.target.value.split(" ")[0];
    // check if the command is available
    const isValidCommand =
      getCommandOutput(commandFirstPart)?.cmd === commandFirstPart;

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

  const rendredCommand = command.split(" ");

  return (
    <div className="relative">
      <div className="flex items-center">
        <span className="text-yellow">guest</span>
        <span>@</span>
        <span className="text-green">terminal.hicham-moulili.dev</span>
        <span>:~$</span>
        <div className="inline-flex relative items-end ms-2">
          <input
            type="text"
            ref={inputRef}
            disabled={disabled}
            className={`absolute opacity-0 peer top-4  border-none outline-0 ms-2 + ${
              isValid ? " text-blue" : ""
            }`}
            value={command}
            onKeyUp={handleCaretUpdate}
            onKeyDown={onKeyDown}
            onChange={onChange}
          />
          <pre className="font-sans">
            {isValid ? (
              <>
                <span className="text-blue">{rendredCommand.at(0)}</span>
                {rendredCommand.length > 1 && (
                  <span> {rendredCommand.slice(1).join(" ")}</span>
                )}
              </>
            ) : (
              command
            )}
          </pre>
          {!disabled && (
            <span
              style={{ left: coords.left, top: coords.top }}
              className={`animate hidden peer-focus:inline-block w-px h-5 bg-gray animate-blink ${
                command.length > 0 ? "absolute" : "relative"
              }`}
            />
          )}
        </div>
      </div>
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
