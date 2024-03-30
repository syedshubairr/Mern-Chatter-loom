import Login from '@/components/Login';
import Signup from '@/components/SignUp';
import '@/styles/Home.module.css';
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
export default function Home() {
  return (
    <div className="App">
      <Container maxW="xl" centerContent>
        <Box
          display="flex"
          justifyContent="center"
          p={3}
          bg="white"
          width="100%"
          m="40px 0px 15px 0px"
          borderRadius="lg"
          borderWidth="1px">
          <Text fontSize="4xl" color={'black'} fontFamily="Fira Sans">
            Chatter Loom
          </Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs variant="soft-rounded">
            <TabList mb={'1em'}>
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  );
}
