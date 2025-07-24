"use client";
import { Member } from "@/types/member";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";

interface MemberContextType {
  member: Member | null;
  loaded: boolean;
  login: (member: Member) => void;
  logout: () => void;
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export const MemberProvider = ({ children }: { children: ReactNode }) => {
  const [member, setMember] = useState<Member | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);

  // 최초 렌더링 시 sessionStorage에서 사용자 정보 복원

  useEffect(() => {
    const storedMember = sessionStorage.getItem("member");
    if (storedMember) {
      try {
        const parsed = JSON.parse(storedMember);
        setMember(parsed);
      } catch (e) {
        console.error("Failed to parse member from sessionStorage", e);
      }
    }
    setLoaded(true);
  }, []);

  const login = useCallback((member: Member) => {
    setMember(member);
    sessionStorage.setItem("member", JSON.stringify(member));
  }, []);

  const logout = useCallback(() => {
    setMember(null);
    sessionStorage.removeItem("member");
  }, []);

  const returnValue = useMemo(
    () => ({
      member,
      loaded,
      login,
      logout,
    }),
    [member, loaded]
  );

  return <MemberContext.Provider value={returnValue}>{children}</MemberContext.Provider>;
};

export const useMemberContext = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error("useMemberContext must be used within a MemberProvider");
  }
  return context;
};
