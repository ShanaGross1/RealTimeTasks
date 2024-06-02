import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { AuthContextComponent } from './AuthContext';
import Logout from './Pages/Logout';
import AuthenticatedRoute from './components/AuthenticatedRoute';

const App = () => {
    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/' element={
                        <AuthenticatedRoute>
                            <Home />
                        </AuthenticatedRoute>
                    } />
                    <Route path='/logout' element={<Logout />} />

                </Routes>
            </Layout>
        </AuthContextComponent>
    );
}

export default App;