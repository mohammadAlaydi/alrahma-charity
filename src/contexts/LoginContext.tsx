"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { LoginModal } from "@/features/auth/components/LoginModal";
import { SignUpModal } from "@/features/auth/components/SignUpModal";

interface LoginContextType {
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isLoginModalOpen: boolean;
  openSignUpModal: () => void;
  closeSignUpModal: () => void;
  isSignUpModalOpen: boolean;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({ children }: { children: ReactNode }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsSignUpModalOpen(false);
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignUpModal = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(true);
  };
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  return (
    <LoginContext.Provider value={{ 
      openLoginModal, 
      closeLoginModal, 
      isLoginModalOpen,
      openSignUpModal,
      closeSignUpModal,
      isSignUpModalOpen,
    }}>
      {children}
      <LoginModal open={isLoginModalOpen} onClose={closeLoginModal} onSwitchToSignUp={openSignUpModal} />
      <SignUpModal open={isSignUpModalOpen} onClose={closeSignUpModal} onSwitchToLogin={openLoginModal} />
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
