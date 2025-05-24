import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { use } from "react";
import { Button } from "../ui/button";
import ModalContext from "@/context/modalContext";
import LoginForm from "./LoginForm";
import RegisterForml from "./RegisterForm";

const AuthModal = () => {
  const { modal, setModal } = use(ModalContext);
  const title =
    modal.type === "login" ? "Welcome to notify" : "Create an account";
  const description =
    modal.type === "login"
      ? "Please login to your account"
      : "Please register to create an account";
  return (
    <>
      <Button
        className="group flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all"
        onClick={() => setModal({ isOpen: true, type: "login" })}
      >
        Login
      </Button>
      <Dialog
        open={modal.isOpen}
        onOpenChange={(open) => setModal({ isOpen: open, type: modal.type })}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          {modal.isOpen && modal.type === "login" ? (
            <LoginForm />
          ) : (
            <RegisterForml />
          )}

          <div className="text-sm text-center text-slate-500 dark:text-slate-400 mt-4">
            {modal.type === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <Button
              variant="link"
              onClick={() =>
                setModal({
                  isOpen: true,
                  type: modal.type === "login" ? "register" : "login",
                })
              }
            >
              {modal.type === "login" ? "Register" : "Login"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthModal;
