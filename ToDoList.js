import React, { useState, useEffect } from "react";

function ToDoList() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });
    const [newTask, setNewTask] = useState("");
    const [dueDate, setDueDate] = useState(() => {
        const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
        return currentDate;
    });
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const toggleTheme = () => setIsDark(!isDark);

    const handleInputChange = (e) => setNewTask(e.target.value);

    const getEmoji = (task) => {
        const keywords = {
            study: "📚",
            read: "📖",
            gym: "🏋️‍♂️",
            workout: "💪",
            code: "💻",
            meeting: "📅",
            shopping: "🛒",
            call: "📞"
        };
        for (let key in keywords) {
            if (task.toLowerCase().includes(key)) return keywords[key] + " ";
        }
        return "📝 ";
    };

    const addTask = () => {
        if (newTask.trim() !== "") {
            const task = {
                text: getEmoji(newTask) + newTask,
                dueDate,
                completed: false,
            };
            setTasks([...tasks, task]);
            setNewTask("");
        }
    };

    const toggleCompletion = (index) => {
        const updated = tasks.map((task, i) => i === index ? { ...task, completed: !task.completed } : task);
        setTasks(updated);
    };

    const deleteTask = (index) => {
        const updated = tasks.filter((_, i) => i !== index);
        setTasks(updated);
    };

    const moveTaskUp = (index) => {
        if (index > 0) {
            const updated = [...tasks];
            [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
            setTasks(updated);
        }
    };

    const moveTaskDown = (index) => {
        if (index < tasks.length - 1) {
            const updated = [...tasks];
            [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
            setTasks(updated);
        }
    };

    return (
        <div className={`page ${isDark ? "dark" : ""}`}>
            <nav className="navbar">
                <div className="logo">✅ TaskMaster</div>
                <div className="nav-links">
                    <a href="youtube.com">Home</a>
                    <a href="youtube.com">Tasks</a>
                    <a href="youtube.com">About</a>
                    <button className="theme-toggle" onClick={toggleTheme}>
                        {isDark ? "🌞 Light" : "🌙 Dark"}
                    </button>
                </div>
            </nav>

            <div className="to-do-list">
                <h1>📝 To-Do List</h1>
                <div className="input-section">
                    <input
                        type="text"
                        placeholder="Enter a task..."
                        value={newTask}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === "Enter" && addTask()}
                    />
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <button onClick={addTask}>Add Task</button>
                </div>

                {tasks.length === 0 ? (
                    <div className="empty-state">
                        <p>Be productive! Add your tasks to start the day. ✨</p>
                    </div>
                ) : (
                    <ol>
                        {tasks.map((task, index) => (
                            <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleCompletion(index)}
                                />
                                <span className="task-text">{task.text}</span>
                                <span className="task-date">{task.dueDate}</span>
                                <div className="buttons">
                                    <button className="move-left" onClick={() => moveTaskUp(index)}>👆</button>
                                    <button className="move-right" onClick={() => moveTaskDown(index)}>👇</button>
                                    <button className="delete" onClick={() => deleteTask(index)}>🗑️</button>
                                </div>
                            </li>
                        ))}
                    </ol>
                )}
            </div>
        </div>
    );
}

export default ToDoList;
