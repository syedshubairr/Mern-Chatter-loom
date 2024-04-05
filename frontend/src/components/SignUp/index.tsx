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
  useToast,
} from '@chakra-ui/react';
import React, {useState} from 'react';
import {handlePost, onSubmit} from './utils';
const Signup = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [pic, setPic] = useState<string | unknown>('');
  const [showPass, setShowPass] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast(); // TODO: make a separate component for toast.
  return (
    <VStack spacing="5px">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your Name"
          onChange={e => setName(e.target.value)}
          value={name}
        />
        {isError ? (
          <FormHelperText>Error Text.</FormHelperText>
        ) : (
          <FormErrorMessage>Name is required.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your Email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        {isError ? (
          <FormHelperText>Error Text.</FormHelperText>
        ) : (
          <FormErrorMessage>Email is required.</FormErrorMessage>
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
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            value={confirmPassword}
            type={showPass ? 'text' : 'password'}
            placeholder="Confirm your Password"
            onChange={e => setConfirmPassword(e.target.value)}
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
      <FormControl id="pic" justifyContent={'center'} alignItems={'center'}>
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={3}
          accept="image/jpeg, image/png, image/jpg"
          onChange={e => handlePost(e.target.files, toast, setLoading, setPic)}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width={'100%'}
        isLoading={loading}
        style={{marginTop: 15}}
        onClick={onSubmit}>
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
