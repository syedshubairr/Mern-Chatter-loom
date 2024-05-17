import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { onLogin } from "./utils";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast(); // TODO: make a separate component for toast.
  const router = useRouter();
  const dispatch = useAppDispatch();
  const resetState = () => {
    setPassword("");
    setIsError(false);
    setIsLoading(false);
  };
  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired isInvalid={isError}>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        {isError && !email && (
          <FormErrorMessage>Email is required.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl id="password" isRequired isInvalid={isError}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={password}
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h={"1.75rem"}
              size="sm"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {isError && <FormErrorMessage>Password is required.</FormErrorMessage>}
      </FormControl>
      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        isLoading={isLoading}
        onClick={() =>
          onLogin(
            email,
            password,
            setIsError,
            setIsLoading,
            resetState,
            toast,
            router,
            dispatch
          )
        }
      >
        Login
      </Button>
      <Button
        colorScheme="red"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("shubair@gmail.com");
          setPassword("12345678");
        }}
      >
        Get Guest Credentials
      </Button>
    </VStack>
  );
};

export default Login;
