"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { LoginModal } from "@/features/auth/components/LoginModal";
import { SignUpModal } from "@/features/auth/components/SignUpModal";
import { ForgotPasswordModal } from "@/features/auth/components/ForgotPasswordModal";

interface LoginContextType {
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isLoginModalOpen: boolean;
  openSignUpModal: () => void;
  closeSignUpModal: () => void;
  isSignUpModalOpen: boolean;
  openForgotPasswordModal: () => void;
  closeForgotPasswordModal: () => void;
  isForgotPasswordModalOpen: boolean;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({ children }: { children: ReactNode }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsSignUpModalOpen(false);
    setIsForgotPasswordModalOpen(false);
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignUpModal = () => {
    setIsLoginModalOpen(false);
    setIsForgotPasswordModalOpen(false);
    setIsSignUpModalOpen(true);
  };
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  const openForgotPasswordModal = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(false);
    setIsForgotPasswordModalOpen(true);
  };
  const closeForgotPasswordModal = () => setIsForgotPasswordModalOpen(false);

  return (
    <LoginContext.Provider value={{
      openLoginModal,
      closeLoginModal,
      isLoginModalOpen,
      openSignUpModal,
      closeSignUpModal,
      isSignUpModalOpen,
      openForgotPasswordModal,
      closeForgotPasswordModal,
      isForgotPasswordModalOpen,
    }}>
      {children}
      <LoginModal
        open={isLoginModalOpen}
        onClose={closeLoginModal}
        onSwitchToSignUp={openSignUpModal}
        onSwitchToForgotPassword={openForgotPasswordModal}
      />
      <SignUpModal
        open={isSignUpModalOpen}
        onClose={closeSignUpModal}
        onSwitchToLogin={openLoginModal}
      />
      <ForgotPasswordModal
        open={isForgotPasswordModalOpen}
        onClose={closeForgotPasswordModal}
        onBack={openLoginModal}
      />
    </LoginContext.Provider>
  );
}

export function useLoginModal() {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useLoginModal must be used within a LoginProvider");
  }
  return context;
}
