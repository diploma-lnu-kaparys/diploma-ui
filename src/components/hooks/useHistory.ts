/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

import React from "react";
import { History, Location, Action } from "history";
import { canUseDOM } from "./env";

const loadScrollPositions = (): Map<string, number> => {
  if ("sessionStorage" in window) {
    const saved = sessionStorage.getItem("scrollPositions");
    if (saved) {
      return new Map(JSON.parse(saved));
    }
  }
  return new Map();
};

const saveScrollPositions = (): void => {
  if ("sessionStorage" in window) {
    sessionStorage.setItem(
      "scrollPositions",
      JSON.stringify(Array.from(scrollPositions))
    );
  }
};

const scrollPositions = loadScrollPositions();

let last_known_scroll_position = 0;
let ticking = false;
let history: History | null = null;
let ready = false;

if (canUseDOM) {
  window.addEventListener("scroll", () => {
    last_known_scroll_position = window.scrollY;
    if (!ticking && ready) {
      window.requestAnimationFrame(() => {
        if (history) {
          scrollPositions.set(history.location.key, last_known_scroll_position);
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

export const HistoryContext = React.createContext<History | null>(null);

export function useHistory(): History {
  const hist = React.useContext(HistoryContext);
  if (!hist) {
    throw new Error("History is not available!");
  }
  return hist;
}

const historyListener = ({
  location,
  action
}: {
  location: Location;
  action: Action;
}): void => {
  ready = false;
  saveScrollPositions();
};

export function setHistory(_history: History): void {
  if (!history) {
    _history.listen(historyListener);
  }
  history = _history;
}
