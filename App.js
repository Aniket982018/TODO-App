import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Switch, TouchableOpacity } from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Function to add a new task
  const addTask = () => {
    if (taskTitle.trim() !== '') {
      setTasks([...tasks, { id: Date.now().toString(), title: taskTitle, status: false }]);
      setTaskTitle('');
      setIsButtonDisabled(true);  // Disable button after task is added
    }
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Function to toggle the status of the task
  const toggleStatus = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: !task.status } : task
      )
    );
  };

  // Handle input change to enable/disable button
  const handleInputChange = (text) => {
    setTaskTitle(text);
    setIsButtonDisabled(text.trim() === '');  // Enable button only if the input is not empty
  };

  // Render a single task item
  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Switch
        value={item.status}
        onValueChange={() => toggleStatus(item.id)}
      />
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>🗑</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ToDo App <Text style={styles.subHeader}>by Aniket</Text></Text>

      {/* Input for new task */}
      <TextInput
        placeholder="Task Title"
        style={styles.input}
        value={taskTitle}
        onChangeText={handleInputChange}
      />

      {/* Add Task Button */}
      <Button
        title="Add Task"
        onPress={addTask}
        disabled={isButtonDisabled}  // Disable button if no input
      />

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'ultralight',
    color: '#aaa'
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    elevation: 5
  },
  taskTitle: {
    fontSize: 18,
  },
  deleteButton: {
    color: 'red',
    fontSize: 18,
  },
});