import { useContext, useEffect, useState } from "react";
import { ErrorContext } from "../../store/ErrorContext";
import { toast } from "sonner";

const ErrorToast = () => {
  const { isError, setIsError } = useContext(ErrorContext);

  useEffect(() => {
    if (!isError) return;

    toast.error("Wystąpił błąd podczas łączenia z API");

    const timer = setTimeout(() => {
      setIsError(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isError]);

  if (!isError) {
    return null;
  }
};

export default ErrorToast;
