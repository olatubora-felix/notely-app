/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, type ReactNode } from "react";
const initalState = {
  isOpen: false,
  type: "default",
} as ModalType;
const ModalContext = createContext({
  modal: initalState as ModalType,
  setModal: (_modal: { isOpen: boolean; type: string }) => {},
  onClose: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState(initalState);

  const onClose = () => {
    setModal(initalState);
  };

  return (
    <ModalContext
      value={{
        modal,
        setModal,
        onClose,
      }}
    >
      {children}
    </ModalContext>
  );
};

export default ModalContext;
interface ModalType {
  isOpen: boolean;
  type: string;
}
