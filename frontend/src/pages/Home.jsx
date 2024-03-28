import React from 'react';
import { Box, Center, Heading, Text } from '@chakra-ui/react';
import video from "../asset/video.mp4"
import "./style.css"
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <>
        <Navbar/>
        <Box position="relative">
            {/* Video background */}
            <video
                autoPlay
                loop
                muted
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: '-1',
                }}
            >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <Center height="100vh">
                <Box textAlign="center" color="white">
                    <Heading as="h1" size="2xl" mb="4" >
                        Welcome to <span style={{ fontWeight: "900", color: "#2c4466" }} className="animated-text"> T A S K M A N A G E R</span>
                    </Heading>
                    <Text fontSize="xl" >
                        This is a simple task manager application where you can manage your tasks and user profile.
                    </Text>
                </Box>
            </Center>
        </Box>
        </>
    );
};

export default Home;
