"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeToast } from "@/store/slices/notificationsSlice";

const toneClasses: Record<string, string> = {
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-950 dark:text-emerald-50",
  info: "border-sky-500/30 bg-sky-500/10 text-sky-950 dark:text-sky-50",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-950 dark:text-amber-50",
  error: "border-rose-500/30 bg-rose-500/10 text-rose-950 dark:text-rose-50",
};

export function Toaster() {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((s) => s.notifications.toasts);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="w-full max-w-md space-y-3">
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <ToastItem
              key={t.id}
              id={t.id}
              tone={t.type}
              title={t.title}
              message={t.message}
              durationMs={t.durationMs ?? 3500}
              onClose={() => dispatch(removeToast(t.id))}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ToastItem(props: {
  id: string;
  tone: string;
  title?: string;
  message: string;
  durationMs: number;
  onClose: () => void;
}) {
  // auto-dismiss via animation lifecycle
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.15 }}
      onAnimationComplete={() => {
        // schedule after entrance completes (ensures consistent timing)
        window.setTimeout(props.onClose, props.durationMs);
      }}
      className={[
        "pointer-events-auto rounded-2xl border px-4 py-3 shadow-lg backdrop-blur",
        "bg-white/80 text-zinc-900 dark:bg-zinc-900/70 dark:text-zinc-50",
        toneClasses[props.tone] ?? "",
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {props.title ? (
            <div className="text-sm leading-6 font-semibold">{props.title}</div>
          ) : null}
          <div className="text-sm leading-6 text-zinc-700 dark:text-zinc-200">{props.message}</div>
        </div>
        <button
          type="button"
          onClick={props.onClose}
          className="rounded-lg px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-950/5 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-zinc-50"
          aria-label="إغلاق"
        >
          ×
        </button>
      </div>
    </motion.div>
  );
}
