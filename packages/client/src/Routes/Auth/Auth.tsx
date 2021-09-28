import { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useInput from "../../hooks/useInput";
import Helmet from "react-helmet";
import {
  CONFIRM_SECRET,
  CREATE_ACCOUNT,
  LOCAL_LOG_IN,
  LOG_IN,
} from "./Auth.queries";
import { toast } from "react-toastify";
import { Form, Link, StateChanger, Wrapper } from "./Auth.styled";

export const Auth: React.FC = () => {
  const [action, setAction] = useState<"logIn" | "signUp" | "confirmSecret">(
    "logIn"
  );

  const username = useInput("");
  const secret = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("admin@admin.com");

  const [requestSecret] = useMutation<{ requestSecret: boolean }>(LOG_IN, {
    variables: { email: email.value },
    update: (_, { data }): void => {
      if (!data?.requestSecret) {
        toast.error("You don't have an account yet, create one");
        setTimeout(() => setAction("signUp"), 2000);
      } else {
        toast.success("Check your inbox for your login secret");
        setAction("confirmSecret");
      }
    },
  });

  const [createAccount] = useMutation<{ createAccount: boolean }>(
    CREATE_ACCOUNT,
    {
      variables: {
        userName: username.value,
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
      },
      update: (_, { data }): void => {
        if (!data?.createAccount) {
          toast.error("You don't have an account yet, create one");
          setTimeout(() => setAction("signUp"), 2000);
        } else {
          requestSecret();
        }
      },
    }
  );

  const [confirmSecretMutation] = useMutation<{ confirmSecret: string }>(
    CONFIRM_SECRET,
    {
      variables: {
        email: email.value,
        secret: secret.value,
      },
    }
  );

  const [loginLocalMutation] = useMutation(LOCAL_LOG_IN);

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    if (action === "logIn") {
      if (email.value !== "") {
        try {
          await requestSecret();
        } catch (error) {
          toast.error("Can't request secret, try again");
        }
      } else {
        toast.error("Email is required");
      }
    } else if (action === "signUp") {
      if (
        username.value !== "" &&
        email.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          await createAccount();
        } catch (error) {
          toast.error((error as { message: string }).message);
        }
      }
    } else if (action === "confirmSecret") {
      if (email.value !== "" && secret.value !== "") {
        try {
          const { data } = await confirmSecretMutation();

          const token = data?.confirmSecret;
          if (typeof token !== "string" || token === "") {
            throw new Error();
          } else {
            loginLocalMutation({ variables: { token } });
          }
        } catch (error) {
          toast.error("Can't confirm secret");
        }
      } else {
        toast.error("All fields required");
      }
    }
  };

  return (
    <Wrapper>
      <Form>
        {action === "logIn" && (
          <>
            <Helmet>
              <title>Log In | Photo service</title>
            </Helmet>
            <form action="" onSubmit={handleSubmit}>
              <Input placeholder={"Email"} type={"email"} {...email}></Input>
              <Button text={"Log in"}></Button>
            </form>
          </>
        )}
        {action === "confirmSecret" && (
          <>
            <Helmet>
              <title>Sign Up | Photo service</title>
            </Helmet>
            <form action="" onSubmit={handleSubmit}>
              <Input placeholder={"Email"} type={"email"} {...email}></Input>
              <Input placeholder={"Secret from Email"} {...secret}></Input>
              <Button text={"Confirm"}></Button>
            </form>
          </>
        )}

        {action === "signUp" && (
          <>
            <Helmet>
              <title>Confirm Secret | Photo service</title>
            </Helmet>
            <form action="" onSubmit={handleSubmit}>
              <Input placeholder={"First Name"} {...firstName}></Input>
              <Input placeholder={"Last Name"} {...lastName}></Input>
              <Input placeholder={"Email"} type={"email"} {...email}></Input>
              <Input placeholder={"Username"} {...username}></Input>
              <Button text={"Sign Up"}></Button>
            </form>
          </>
        )}
      </Form>
      <StateChanger>
        {action === "logIn" ? (
          <>
            Don't have an account?{" "}
            <Link onClick={() => setAction("signUp")}>Sign Up</Link>
          </>
        ) : (
          <>
            Have an account?{" "}
            <Link onClick={() => setAction("logIn")}>Sign In</Link>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
};
