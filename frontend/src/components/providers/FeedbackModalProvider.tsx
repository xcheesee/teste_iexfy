import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type FeedbackType = "success" | "warning" | "error";

interface FeedbackState {
  open: boolean;
  title: string;
  message: string;
  type: FeedbackType;
  onHide?: () => void;
}

interface FeedbackContextValue {
  state: FeedbackState;
  show: (title: string, message: string, type?: FeedbackType, onHide?: () => void) => void;
  hide: () => void;
}

const FeedbackModalContext = createContext<FeedbackContextValue | undefined>(
  undefined
);

export function FeedbackModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FeedbackState>({
    open: false,
    title: "",
    message: "",
    type: "success",
    onHide: () => {}
  });

  const show = useCallback((title: string, message: string, type: FeedbackType = "success", onHide: () => void = () => {}) => {
    setState({
      open: true,
      title,
      message,
      type,
      onHide,
    });
  }, []);

  const hide = useCallback(() => {
    setState((prev) => {
      prev.onHide?.();

      return { ...prev, open: false };
    });
  }, []);

  return (
    <FeedbackModalContext.Provider value={{ state, show, hide }}>
      {children}
    </FeedbackModalContext.Provider>
  );
}

export function useFeedbackModal(): FeedbackContextValue {
  const ctx = useContext(FeedbackModalContext);

  if (!ctx) {
    throw new Error(
      "useFeedbackModal must be used within FeedbackModalProvider"
    );
  }

  return ctx;
}