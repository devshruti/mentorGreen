import React, { useEffect, useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, Text } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch hook
import image from "../asset/signup.jpg";
import { login } from "../redux/AuthReducer/action";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  useEffect(() => {
    // Check if user is already logged in
    const storedAccessToken = localStorage.getItem("access_token");
    const storedRefreshToken = localStorage.getItem("refresh_token");

    if (storedAccessToken && storedRefreshToken) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
    }
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Dispatch the login action
      const response = await dispatch(login({ email, password }));
      console.log("res", response)
      // Check if the login was successful
      if (response && response.data) {
        const { accessToken, refreshToken, uid } = response.data;

        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        localStorage.setItem("email", email);
        localStorage.setItem('uid', uid)
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        console.log("uid", uid)
        alert("Login Successful!");

        // Redirect to the home page upon successful login
        navigate("/");
      } else {
        // Handle login failure
        alert("Login Failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during login. Please try again later.");
    }
  };


  return (
    <>
      <Flex
        direction={{ base: "column-reverse", md: "row" }}
        align="center"
        justify="center"
        minHeight="50vh"
        width={{ base: "80%", md: "80%", lg: "60%" }}
        margin={"auto"}
        padding={4}
      >
        <Flex bg="gray.100" flex="1" p={{ base: 4, md: 4, sm: 4 }} flexDirection={["column", "column", "row", "row"]} mt={"3%"} justify={"center"}>
          {["base", "sm"].includes(useBreakpointValue({ base: "base", sm: "sm", md: "md" })) ? null : (
            <Flex justify="center" mb={8} margin={"auto"} >
              <Image
                src={image}
                alt="image"
                Width={"100%"}
                maxHeight={"600px"}
                objectFit={"cover"}
              />
            </Flex>
          )}
          <Box mx="auto" maxW="100%" padding={"10px"} mt={"10%"}>
            <Heading as="h4" size="lg" textAlign="center" mb={4}>
              L O G I N
            </Heading>
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <Flex align="center">
                <IoIosMail size={18} color="gray.400" mr={2} />
                <Input
                  type="email"
                  value={email}
                  ml={2}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Flex>
            </FormControl>
            <FormControl id="password" mb={4}>
              <FormLabel>Password</FormLabel>
              <Flex align="center">
                <FaLock size={18} color="gray.400" mr={2} />
                <Input
                  type="password"
                  value={password}
                  ml={2}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Flex>
            </FormControl>
            <Button
              colorScheme="blue"
              size="lg"
              width="full"
              mb={4}
              mt={6}
              onClick={handleSignIn}
            >
              Login
            </Button>
            <Text textAlign="center">
              Don’t you have an account?{" "}
              <Link to="/signup" >
                <Text color="blue.500" fontWeight="bold" _hover={{ textDecoration: "underline" }}>
                  sign up
                </Text>
              </Link>
            </Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default SignInForm;
