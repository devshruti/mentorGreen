import React from "react";
import { Link as ChakraLink, Button, Center, Heading, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Center h="100vh" bg="blue.50">
      <div>
        {/* Display the "404" text */}
        <Heading
          as="h2"
          fontSize="6xl"
          bgGradient="linear(to-r, blue.400, blue.600)"
          bgClip="text"
          fontWeight="bold"
          mb="3"
        >
          404
        </Heading>

        {/* Display the "Page Not Found" message */}
        <Text fontSize="3xl" mb="2">
          Page Not Found
        </Text>
        <Text fontSize="2xl" color="gray.500" mb="6">
          The page you're looking for does not seem to exist
        </Text>

        {/* Button to go to Home Page */}
        <Button as={RouterLink} to="/" colorScheme="blue" size="lg">
          Go to Home Page
        </Button>
      </div>
    </Center>
  );
};

export default PageNotFound;
