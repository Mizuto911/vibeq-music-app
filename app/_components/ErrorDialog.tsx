"use client";

import styles from "./ErrorDialog.module.css";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Icons from "@/utils/icons";

interface ErrorDialogProps {
  message: string;
}

export default function ErrorDialog({ message }: ErrorDialogProps) {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowDialog(true), 300);
    setTimeout(() => setShowDialog(false), 3000);
  }, []);

  return (
    <div
      className={clsx(
        styles.errorDialog,
        !showDialog && styles.hide,
        "fixed bottom-0 flex justify-around items-center",
      )}
    >
      <p className="p-4 text-sm">{message}</p>
      <p className="h-full pe-2">
        <Icons.Dismiss
          className="text-md cursor-pointer"
          onClick={() => setShowDialog(false)}
        />
      </p>
    </div>
  );
}
