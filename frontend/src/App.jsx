import Signup from './pages/Auth/Signup/Signup';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login/Login';
import TaskPage from './pages/TaskPage/TaskPage';
import LeavePage from './pages/LeavePage/LeavePage';
import AllTask from './pages/Admin/Tasks/AllTask.jsx';
import AllLeaves from './pages/Admin/Leaves/AllLeaves.jsx';
import UserDashboard from './pages/UserDashboard/UserDashboard.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard.jsx';
import MyLeaveStatus from './pages/LeavePage/MyLeaveStatus.jsx';
import LandingPage from './pages/Landing/LandingPage.jsx';
import EmployeeTable from './pages/Admin/Employee/EmployeeTable.jsx';
import Work from './pages/Work/Work.jsx';
import Navbar from './components/Navbar/Navbar.jsx';

function App() {
  return (
    
      <div>
      <div >
        <Navbar />
      </div>
        <div className='adj'>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/task" element={<TaskPage />} />
            <Route path="/leave" element={<LeavePage />} />
            <Route path="/seeTask" element={<AllTask />} />
            <Route path="/seeLeave" element={<AllLeaves />} />
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/status" element={<MyLeaveStatus />} />
            <Route path="/emp" element={<EmployeeTable />} />
            <Route path="/work" element={<Work />} />
          </Routes>
        </div>
      </div>
    
  )
}

export default App;
