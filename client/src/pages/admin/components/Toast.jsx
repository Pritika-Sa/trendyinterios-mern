import React, { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import './Toast.css';

const Toast = ({ type = 'success', message, onClose, autoClose = true, duration = 4000 }) => {
    useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [autoClose, duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <FaCheckCircle />;
            case 'error':
                return <FaExclamationCircle />;
            case 'warning':
                return <FaInfoCircle />;
            default:
                return <FaInfoCircle />;
        }
    };

    return (
        <div className={`toast toast-${type}`}>
            <div className="toast-icon">
                {getIcon()}
            </div>
            <div className="toast-message">
                {message}
            </div>
            <button
                className="toast-close"
                onClick={onClose}
                aria-label="Close"
            >
                <FaTimes />
            </button>
            <div className="toast-progress" style={{
                '--duration': `${duration}ms`
            }}></div>
        </div>
    );
};

export default Toast;
