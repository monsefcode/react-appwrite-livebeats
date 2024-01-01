import Layout from "@/components/Layout";
import Container from "@/components/Container";
import FormRow from "@/components/FormRow";
import FormLabel from "@/components/FormLabel";
import InputText from "@/components/InputText";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";

function LogIn() {
  const { logIn, session } = useAuth();

  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    switch (error) {
      case "user_not_found":
        setErrorMsg("User not found, please sign up.");
        break;
      case "user_invalid_token":
        setErrorMsg("Invalid token, please try again.");
        break;
      default:
        break;
    }
  }, []);

  async function handleLogin(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
    };
    const email = target.email.value;
    await logIn(email);
    setSent(true);
  }

  if (session) {
    return <Redirect to="/" />;
  }

  return (
    <Layout>
      <Container>
        <h1 className="mb-6 text-3xl font-bold text-center">Log In</h1>

        {errorMsg && (
          <p className="max-w-sm p-4 mx-auto mb-6 bg-red-500 rounded">
            {errorMsg}
          </p>
        )}

        {sent ? (
          <p className="mt-6 text-center transition-all duration-300 transform translate-y-0 opacity-100">
            Check your email for the magic link.
          </p>
        ) : (
          <form
            className="max-w-sm p-6 mx-auto border rounded border-slate-200 dark:border-slate-500"
            onSubmit={handleLogin}
          >
            <FormRow className="mb-5">
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputText id="email" name="email" type="email" />
            </FormRow>

            <Button
              disabled={sent}
              className={cn("w-full", sent && "cursor-not-allowed")}
              type="submit"
            >
              Submit
            </Button>
          </form>
        )}
      </Container>
    </Layout>
  );
}

export default LogIn;
