import React, { useState, useEffect } from 'react';
import { Box, Heading, Input, Button, Flex, Textarea, Text, Stack, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Select } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ReactDatePicker from 'react-datepicker';

const initForm = {
    title: '',
    description: '',
    status: 'pending',
    date: Date.now(),
}

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState(initForm);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        // Fetch tasks from the backend when the component mounts
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${process.env.React_App_Baseurl}/tasks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `${localStorage.getItem("access_token")}`
                }
            });
            setTasks(response.data);
            console.log(localStorage.getItem("uid"))
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const formChangeHandler = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send task data to the backend for creation
            const response = await fetch(`${process.env.React_App_Baseurl}/tasks/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify(form),
            });

            // Clear input fields after submission
            if (response.ok) {
                alert("New task added")
                fetchTasks();
                setForm(initForm)
            } else {
                alert("Unable to add the task")
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`${process.env.React_App_Baseurl}/tasks/delete/${taskId}`, {
                headers: {
                    authorization: `${localStorage.getItem("access_token")}`
                }
            });
            // Fetch updated tasks after deletion
            fetchTasks();
            alert("Task deleted")
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = async (taskId) => {
        try {
            const updatedTask = tasks.find(task => task._id === taskId);
            if (updatedTask) {
                // Set the editing form with the data of the task being edited
                setForm(updatedTask);
                setEditingTaskId(taskId);
                onOpen(); // Open the modal
            }
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    const handleSaveEdit = async () => {
        try {
            // Send PUT request to update the task
            await axios.patch(`${process.env.React_App_Baseurl}/tasks/update/${editingTaskId}`, form, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${localStorage.getItem("access_token")}`
                }
            });
            // Fetch updated tasks after editing
            fetchTasks();
            alert("Updated the Task successfully!")
            // Clear editing form and task id
            setForm(initForm);
            setEditingTaskId(null);
            onClose(); // Close the modal
        } catch (error) {
            alert("Unable to update the Task")
            console.error('Error saving edit:', error);
        }
    };

    const handleCancelEdit = () => {
        // Clear editing form and task id
        setForm(initForm);
        setEditingTaskId(null);
        onClose(); // Close the modal
    };

    return (
        <>
            <Navbar />
            <Box mb={"5%"} h={"50px"}></Box>
            <Box p="4" mt={"5%"} w={"80%"} mx="auto" bg={"gray.50"}>
                <Heading mb="4" >Add New Task</Heading>
                <form onSubmit={handleSubmit}>
                    <Input
                        name="title"
                        placeholder="Enter task title"
                        value={form.title}
                        onChange={formChangeHandler}
                        mb="2"
                    />
                    <Textarea
                        name="description"
                        placeholder="Enter task description"
                        value={form.description}
                        onChange={formChangeHandler}
                        mb="4"
                    />
                    <Button colorScheme="blue" type="submit">
                        Add Task
                    </Button>
                </form>
            </Box>
            <Box p="4" w={"90%"} mx={"auto"}>
                <Heading mb="4">Tasks</Heading>
                <Stack spacing="4">
                    {tasks?.map(task => (
                        <Box key={task._id} borderWidth="1px" p="4" borderRadius="md" bg={"gray.200"}>
                            <Flex justifyContent="space-between">
                                <Heading size="md" color={task.status === 'pending' ? 'orange.500' : 'blue.500'}>{task.title}</Heading>
                                <Box>
                                    <IconButton
                                        colorScheme="red"
                                        aria-label="Delete Task"
                                        icon={<DeleteIcon />}
                                        onClick={() => handleDelete(task._id)}
                                        mr="2"
                                    />
                                    <IconButton
                                        colorScheme="blue"
                                        aria-label="Edit Task"
                                        icon={<EditIcon />}
                                        onClick={() => handleEdit(task._id)}
                                    />
                                </Box>
                            </Flex>
                            <Text mt="2">{task.description}</Text>
                            {/* <Flex justify={"center"}>
                                <Text maxW={"20%"}>Status : </Text>
                                <Select
                                    name="status"
                                    value={form.status}
                                    onChange={formChangeHandler}
                                    w={"25%"} ml={2}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                </Select>
                            </Flex> */}
                            <Text mt="2" fontSize="sm" color="gray.500">Status: {task.status}</Text>
                            <Text mt="2" fontSize="sm" color="gray.500">Date: {new Date(task.date).toLocaleDateString()}</Text>
                        </Box>
                    ))}
                </Stack>
            </Box>

            {/* Modal for editing task */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb="4">
                            <FormLabel>Title</FormLabel>
                            <Input
                                name="title"
                                value={form.title}
                                onChange={formChangeHandler}
                            />
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                name="description"
                                value={form.description}
                                onChange={formChangeHandler}
                            />
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel>Status</FormLabel>
                            <Select
                                name="status"
                                value={form.status}
                                onChange={formChangeHandler}
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </Select>
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel>Date</FormLabel>
                            <ReactDatePicker // Include the DatePicker component here
                                value={form.date}
                                onChange={formChangeHandler}
                                dateFormat="MM/dd/yyyy"
                                placeholderText="Select a date"
                                isClearable
                                showYearDropdown
                                scrollableYearDropdown
                                yearDropdownItemNumber={15}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>
                            Save
                        </Button>
                        <Button onClick={handleCancelEdit}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    );
};

export default TaskPage;

