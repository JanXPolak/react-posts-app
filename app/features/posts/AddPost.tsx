import { FC, useState } from "react";
import { isPostFormValid } from "../../validation/validation";
import { REQUIRED_POST_TITLE_AND_BODY_LENGTH } from "@/app/validation/consts";

interface Props {
  onAddHandler: (title: string, body: string) => void;
}

const AddPost: FC<Props> = ({ onAddHandler }) => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputBody, setInputBody] = useState("");
  const [isError, setIsError] = useState(true);

  return (
    <div className="mb-4 w-full">
      <form
        className="flex w-full items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();

          if (!isPostFormValid(inputTitle, inputBody)) {
            setIsError(true);
            return;
          }

          onAddHandler(inputTitle, inputBody);
          setInputTitle("");
          setInputBody("");
          setIsError(true);
        }}
      >
        <input
          placeholder="Podaj tytuł"
          className="h-10 w-64 rounded-lg border border-gray-300 bg-white px-3 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          onChange={(e) => {
            const title = e.target.value;
            setInputTitle(title);
            setIsError(!isPostFormValid(title, inputBody));
          }}
          value={inputTitle}
        />
        <input
          placeholder="Podaj opis"
          className="h-10 w-64 rounded-lg border border-gray-300 bg-white px-3 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          onChange={(e) => {
            const body = e.target.value;
            setInputBody(body);
            setIsError(!isPostFormValid(inputTitle, body));
          }}
          value={inputBody}
        />
        <button
          className="h-10 rounded-lg bg-gray-100 px-5 text-base font-medium text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
          disabled={isError}
        >
          Dodaj
        </button>
      </form>
      {isError && (
        <p className="mt-2 text-sm font-medium text-red-500">
          Tytuł i opis muszą minimum {REQUIRED_POST_TITLE_AND_BODY_LENGTH} znaki.
        </p>
      )}
    </div>
  );
};

export default AddPost;
