// src/components/Navbar.js

import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Link, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [state, setstate] = useState(false);
    const [accessToken, setAccessToken] = useState("")
    const navigate = useNavigate();
    // const { setToken } = useAuth()

    useEffect(() => {
        const storedAccessToken = localStorage.getItem("access_token");
        if (storedAccessToken) {
            setIsLoggedIn(true);
            setAccessToken(storedAccessToken);
            // setToken(storedAccessToken)
        }
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("email")

        setIsLoggedIn(false);
        setAccessToken("");
        // setToken("")
        alert("User Logged out!")

        navigate("/");
    };


    return (
        <Box bg="rgba(0, 0, 0, 0.5)" w="100%" position="fixed" zIndex="999" px={10} mb={"5%"}>
            <Flex p="2" align="center">
                <Box p="2">
                    <Link color="blue.800" size={"xl"} fontWeight={"900"} href="/">
                        T A S K M A N A G E R
                    </Link>
                </Box>
                <Spacer />
                <Box p="2">
                    <Link color="white" href="/">
                        Home
                    </Link>
                </Box>
                <Box p="2">
                    <Link color="white" href="/task">
                        Tasks
                    </Link>
                </Box>
                {isLoggedIn ? (
                    <Box p="2">
                        <Link color="white" href="/">
                            <Button onClick={handleLogout}>Logout</Button>
                        </Link>
                    </Box>
                ) : (
                    <Box p="2">
                        <Link color="white" href="/login">
                            Login
                        </Link>
                    </Box>
                )}
            </Flex>
        </Box>
    );
};

export default Navbar;
