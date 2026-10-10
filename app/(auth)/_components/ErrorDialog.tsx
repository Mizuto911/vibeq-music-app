"use client";

import styles from "./ErrorDialog.module.css";
import { useEffect, useState } from "react";
import { use } from "react";
import clsx from "clsx";
import Icons from "@/utils/icons";

interface ErrorDialogProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function ErrorDialog({ searchParams }: ErrorDialogProps) {
  const error = use(searchParams);
  const errorMessage = error.error;

  const [showDialog, setShowDialog] = useState(false);
  useEffect(() => {
    setTimeout(() => setShowDialog(true), 300);
    const closeTimeout = setTimeout(() => setShowDialog(false), 3000);
    return () => {
      clearTimeout(closeTimeout);
      setShowDialog(false);
    };
  }, []);

  if (!errorMessage) {
    return null;
  }

  return (
    <div
      className={clsx(
        styles.errorDialog,
        !showDialog && styles.hide,
        "fixed bottom-0 flex justify-around items-center",
      )}
    >
      <p className="p-4 text-sm">{errorMessage}</p>
      <button
        className="cursor-pointer me-2"
        onClick={() => setShowDialog(false)}
      >
        <Icons.Dismiss className="text-md" />
      </button>
    </div>
  );
}
