"use client";

import styles from "./ErrorDialog.module.css";
import { Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import Icons from "@/utils/icons";

interface ErrorDialogProps {
  message: string | null;
  show: boolean;
  setShowError: Dispatch<SetStateAction<boolean>>;
}

export default function ErrorDialog({
  message,
  show,
  setShowError,
}: ErrorDialogProps) {
  return (
    <div
      className={clsx(
        styles.errorDialog,
        !show && styles.hide,
        "fixed bottom-0 flex justify-around items-center",
      )}
    >
      <p className="p-4 text-sm">{message}</p>
      <button
        className="cursor-pointer me-2"
        onClick={() => setShowError(false)}
      >
        <Icons.Dismiss className="text-md" />
      </button>
    </div>
  );
}
