import { Link } from "wouter";
import Container from "@/components/Container";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

const Nav = () => {
  const { session, logOut } = useAuth();
  const [isSubmitting, setIsSubmiting] = useState<boolean>(false);

  async function handleLogout() {
    setIsSubmiting(true);
    await logOut();
    setIsSubmiting(false);
  }

  return (
    <nav>
      <Container className="py-12">
        <p className="mb-2 text-center">
          <Link href="/">
            <a className="text-4xl font-bold text-slate-900 dark:text-white hover:text-slate-900 dark:hover:text-gray-100 drop-shadow-[0_2px_0px_rgba(255,255,255,1)] dark:drop-shadow-[0_2px_0px_rgba(0,0,0,1)]">
              LiveBeat
            </a>
          </Link>
        </p>
        <p className="flex justify-center gap-4">
          {isSubmitting && <p>Loading...</p>}
          {session ? (
            <button
              className="font-medium text-red-300 cursor-pointer hover:text-red-400"
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <Link href="/login">
              <a className="font-medium text-inherit">Log In</a>
            </Link>
          )}
        </p>
      </Container>
    </nav>
  );
};

export default Nav;
