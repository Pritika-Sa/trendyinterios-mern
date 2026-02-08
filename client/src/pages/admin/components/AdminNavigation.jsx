import React from 'react';
import {
    FaProjectDiagram, FaComments, FaLightbulb, FaUsers, FaCog
} from 'react-icons/fa';
import './AdminNavigation.css';

const AdminNavigation = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'projects', label: 'Projects', icon: FaProjectDiagram },
        { id: 'testimonials', label: 'Testimonials', icon: FaComments },
        { id: 'expertise', label: 'Expertise', icon: FaLightbulb },
        { id: 'team', label: 'Team', icon: FaUsers },
        { id: 'services', label: 'Services', icon: FaCog }
    ];

    return (
        <nav className="admin-navigation-container">
            <div className="admin-navigation-content">
                {tabs.map(tab => {
                    const IconComponent = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            className={`admin-nav-pill ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                            title={tab.label}
                        >
                            <IconComponent className="nav-pill-icon" />
                            <span className="nav-pill-label">{tab.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default AdminNavigation;
