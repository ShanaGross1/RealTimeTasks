import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios'
import { HubConnectionBuilder } from '@microsoft/signalr';

const Home = () => {
    const { user } = useAuth();

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('')

    const connectionRef = useRef();

    useEffect(() => {
        const loadTasks = async () => {
            const { data } = await axios.get('/api/task/gettasks');
            setTasks(data);
        }

        loadTasks();
    }, []);


    useEffect(() => {
        const connectToHub = async () => {
            const connection = new HubConnectionBuilder().withUrl("/api/test").build();
            await connection.start();
            connectionRef.current = connection;

            connection.on('newTask', task => {
                setTasks(tasks => [...tasks, task]);
            })
            connection.on('deleteTask', taskId => {
                setTasks(tasks => [...tasks.filter(t => t.id !== taskId)]);
            })
            connection.on('addAssignee', tasks => {
                setTasks([...tasks])
            })
        }

        connectToHub();
    }, []);

    const onAddTaskClick = async () => {
        await axios.post('/api/task/addtask', { taskTitle: newTask });
    }

    const onClaimTaskClick = async (taskId) => {
        await axios.post('/api/task/addassignee', { Id: taskId });
    }

    const onDeleteClick = async (taskId) => {
        await axios.post('/api/task/deletetask', { taskId: taskId });
    }

    return (
        <div style={{ marginTop: 70 }} >
            <div className="row">
                <div className="col-md-10">
                    <input type="text" className="form-control" placeholder="Task Title" value={newTask} onChange={e => setNewTask(e.target.value)} />
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary w-100" onClick={onAddTaskClick}>Add Task</button>
                </div>
            </div>
            <table className="table table-hover table-striped table-bordered mt-3">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    { user && tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.taskTitle}</td>
                            <td>
                                {!task.userId && <button className="btn btn-primary" onClick={() => onClaimTaskClick(task.id)}>I'm doing this one!</button>}
                                {task.userId === user.id && <button className="btn btn-info" onClick={() => onDeleteClick(task.id)}>I'm done</button>}
                                {task.userId && (task.userId !== user.id) && <button className="btn btn-warning" disabled >{task.user.firstName} {task.user.lastName} is doing this</button>}

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;