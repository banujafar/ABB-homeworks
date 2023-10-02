import React from "react";
import Button from "./components/Button/Button";

export const getModalData = (handleCloseModal) => [
  {
    id:1,
    header: "Do you want to delete this file?",
    closeButton: true,
    text: "Once you delete this file, it won't be possible to undo this action. Are you sure you want to delete it?",
    actions: (
      <>
        <Button
          backgroundColor="white"
          text="Ok"
          onClick={handleCloseModal}
        />
        <Button
          backgroundColor="white"
          text="Close"
          onClick={handleCloseModal}
        />
      </>
    ),
  },
  {
    id:2,
    header: "Notepad",
    closeButton: true,
    text: "Once you delete this file, it won't be possible to undo this action. Are you sure you want to delete it?",
    actions: (
      <>
        <Button
          backgroundColor="white"
          text="Save"
          onClick={handleCloseModal}
        />
        <Button
          backgroundColor="white"
          text="Don't Save"
          onClick={handleCloseModal}
        />
        <Button
          backgroundColor="white"
          text="Close"
          onClick={handleCloseModal}
        />
      </>
    ),
  },
];
