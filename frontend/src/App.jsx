import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Education from './pages/Education';
import Chatbot from './components/Chatbot';
import EmergencyButton from './components/EmergencyButton';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-center mb-6">SafeGuard AI</h1>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/education" component={Education} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
          <Chatbot />
          <EmergencyButton />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App; 