import { useEffect } from "react";
import { useFeedbackModal } from "../../providers/FeedbackModalProvider";
import { Modal } from "./index";
import Button from "../button/Button";

export function FeedbackModal() {
  const { state, hide } = useFeedbackModal();

  useEffect(() => {
    if (!state.open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [state.open, hide]);

  if (!state.open) return null;

  //const colors: Record<string, string> = {
  //  success: "#2e7d32",
  //  warning: "#ed6c02",
  //  error: "#d32f2f",
  //};

  return (
    <Modal 
        isOpen={state.open}
        onClose={hide}
        title={state.title}
    >
          <div className="w-[min(100vw,400px)] p-4 grid gap-8">
            <div>{state.message}</div>

            <Button 
              className="w-full"
              onClick={() => {
                hide();
            }}>Ok</Button>
          </div>
    </Modal>
  );
}