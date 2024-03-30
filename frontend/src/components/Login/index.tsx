import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import {onLogin} from './utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);
  return (
    <VStack spacing="5px">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your Name"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        {isError ? (
          <FormHelperText>Error Text.</FormHelperText>
        ) : (
          <FormErrorMessage>Name is required.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={password}
            type={showPass ? 'text' : 'password'}
            placeholder="Enter your Password"
            onChange={e => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h={'1.75rem'}
              size="sm"
              onClick={() => setShowPass(!showPass)}>
              {showPass ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
          {isError ? (
            <FormHelperText>Error Text.</FormHelperText>
          ) : (
            <FormErrorMessage>Name is required.</FormErrorMessage>
          )}
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width={'100%'}
        style={{marginTop: 15}}
        onClick={onLogin}>
        Login
      </Button>
      <Button
        colorScheme="red"
        width={'100%'}
        style={{marginTop: 15}}
        onClick={() => {
          setEmail('shubair@gmail.com');
          setPassword('12345678');
        }}>
        Get Guest Credentials
      </Button>
    </VStack>
  );
};

export default Login;
