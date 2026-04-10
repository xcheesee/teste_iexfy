import { useContext } from "react";
import { FeedbackContextValue, FeedbackModalContext } from "../components/providers/FeedbackModalProvider";

export function useFeedbackModal(): FeedbackContextValue {
  const ctx = useContext(FeedbackModalContext);

  if (!ctx) {
    throw new Error(
      "useFeedbackModal must be used within FeedbackModalProvider"
    );
  }

  return ctx;
}