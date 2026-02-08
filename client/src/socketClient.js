// Simple socket client example for subscribing to admin/customer events
import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_WS_URL || '/', {
  autoConnect: true,
});

socket.on('connect', () => {
  console.log('Connected to socket server', socket.id);
});

// When admin updates content
socket.on('content:update', (payload) => {
  console.log('Content updated', payload);
  // trigger local state refresh / revalidate cache
});

// New testimonial approved
socket.on('testimonial:approved', (data) => {
  console.log('Testimonial approved', data);
  // refresh testimonials list or append
});

export default socket;
