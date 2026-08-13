import { createContext } from "react";

interface IErrorContext {
  isError: boolean;
  setIsError: (isError: boolean) => void;
}

export const ErrorContext = createContext<IErrorContext>({
  isError: false,
  setIsError: () => {},
});
