import Container from "@/components/Container";
import { useAuth } from "@/hooks/use-auth";
import { AppwriteException } from "appwrite";
import { useEffect } from "react";
import { useLocation } from "wouter";

function Session() {
  const { verifySession } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const secret = urlParams.get("secret");
    const userId = urlParams.get("userId");

    if (typeof secret !== "string" || typeof userId !== "string") {
      navigate("/login");
      return;
    }

    (async function run() {
      try {
        await verifySession({ userId, secret });
        navigate("/");
      } catch (error: unknown) {
        if (error instanceof AppwriteException) {
          navigate(`/login?error=${error?.type}`);
        } else {
          navigate(`/login?error=something-went-wrong`);
        }
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="flex items-center justify-center h-screen text-center">
      <p>Logging you in...</p>
    </Container>
  );
}

export default Session;
