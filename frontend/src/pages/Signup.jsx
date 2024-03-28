import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { IoIosMail } from "react-icons/io";
import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import image from "../asset/signin.jpg";
import { register } from "../redux/AuthReducer/action";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useSelector((state) => state.isLoading); // Accessing loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Dispatch the register action
      dispatch(register({ username: name, email, password }));
      alert("User registered Successfully")
      navigate("/login");
    } catch (error) {
      console.error("Error occurred:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Flex
        direction={{ base: "column-reverse", md: "row" }}
        align="center"
        justify="center"
        minHeight="50vh"
        width={"60%"}
        margin={"auto"}
        padding={4}
      >
        <Flex
          bg="gray.50"
          flex="1"
          p={{ base: 8, md: 4 }}
          flexDirection={["column", "column", "row", "row"]}
          mt={"3%"}
        >
          {["base", "sm"].includes(
            useBreakpointValue({ base: "base", sm: "sm", md: "md" })
          ) ? null : (
            <Flex justify="center" mb={8} margin={"auto"}>
              <Image
                src={image}
                alt="image"
                maxWidth={"100%"}
                maxHeight={"600px"}
                objectFit={"cover"}
                mt={"-4%"}
                p={"10px"}
              />
            </Flex>
          )}
          <Box mx="auto" W="100%" pt={"5%"} mt={{ base: "5%", md: "0" }}>
            <Heading as="h1" size="lg" textAlign="center" mb={4}>
              S I G N U P
            </Heading>
            <FormControl id="name" mb={4}>
              <FormLabel>Username</FormLabel>
              <Flex align="center">
                <FaUser size={18} color="gray.400" />
                <Input
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  ml={2}
                />
              </Flex>
            </FormControl>
            <FormControl id="email" mb={4}>
              <FormLabel>Email</FormLabel>
              <Flex align="center">
                <IoIosMail size={18} color="gray.400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  ml={2}
                />
              </Flex>
            </FormControl>
            <FormControl id="password" mb={4}>
              <FormLabel>Password</FormLabel>
              <Flex align="center">
                <FaLock size={18} color="gray.400" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  ml={2}
                />
              </Flex>
            </FormControl>
            <Button
              colorScheme="blue"
              size="lg"
              width="full"
              mb={4}
              mt={6}
              onClick={handleSignUp}
              isLoading={isLoading} // Pass isLoading to Button component
            >
              {isLoading ? "Signing Up..." : "SIGN UP"}
            </Button>
            <Text textAlign="center">
              Already registered?{" "}
              <Link to="/login">
                <Text
                  color="blue.500"
                  fontWeight="bold"
                  _hover={{ textDecoration: "underline" }}
                >
                  Login to continue
                </Text>
              </Link>
            </Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default SignUpForm;
