/* eslint-disable react-refresh/only-export-components */
import {
  deleteSession,
  getCurrentSession,
  logIn,
  verifySession,
} from "@/lib/auth";
import { AuthContextType } from "@/lib/types";
import { getTeams } from "@/lib/user";
import { adminTeamId } from "@/lib/utils";
import { Models } from "appwrite";
import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";

// =======================================================================================
// * Context & Provider
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthState();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// =======================================================================================
// * Hooks
export function useAuthState() {
  const [session, setSession] = useState<Models.Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    (async function run() {
      const data = await getCurrentSession();
      setSession(data.session);
    })();
  }, []);

  useEffect(() => {
    if (!session?.$id) return;
    (async function run() {
      const { teams } = await getTeams();
      const isAdmin = teams.some((team) => team.$id === adminTeamId);
      setIsAdmin(isAdmin);
    })();
  }, [session?.$id]);

  async function logOut() {
    if (!session?.$id) return;
    await deleteSession(session?.$id);
    setSession(null);
  }

  async function verifySessionAndSaveIt(options: {
    userId: string;
    secret: string;
  }) {
    const data = await verifySession(options);
    setSession(data);
  }

  return {
    session,
    logOut,
    logIn,
    verifySession: verifySessionAndSaveIt,
    isAdmin,
  };
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
}
