# TrendyInterios MERN Stack Application

A full-stack web application built with MongoDB, Express, React, and Node.js that replicates the TrendyInterios interior design website with complete e-commerce and customer engagement features.

## 🎯 Project Overview

This is a complete MERN stack clone of the TrendyInterios website featuring:
- Responsive design matching the original website
- Product catalog with categories
- Customer testimonial system
- Contact form management
- Admin dashboard capabilities
- Modern UI with smooth animations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes with Node.js
- **MongoDB** (v4.0 or higher) - [Download Community Edition](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

## 📦 Installation & Setup

### Step 1: Clone or Create the Project Directory


# TrendyInterios MERN Stack Clone

A complete full-stack web application built with MongoDB, Express, React, and Node.js - an exact clone of the TrendyInterios interior design website.

## Features

✅ Complete responsive design matching original website
✅ Product catalog with categories (Kitchen, Accessories)
✅ Project showcase (Commercial, Residential, Art & Craft)
✅ Customer testimonial system
✅ Contact form management
✅ Modern UI with smooth animations
✅ RESTful API backend
✅ MongoDB database integration

## Technology Stack

**Frontend:**
- React 18
- React Router DOM
- Axios
- CSS3 with responsive design

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS & Body Parser

**Tools:**
- npm
- Nodemon (development)

## Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm (v6+)

### Installation

1. **Clone the repository**
git clone https://github.com/yourusername/trendyinterios-mern.git
cd trendyinterios-mern

text

2. **Setup Backend**
cd server
npm install

Create .env file with:
MONGODB_URI=mongodb://localhost:27017/trendyinterios
PORT=5000
npm run dev

text

3. **Setup Frontend**
cd ../client
npm install
npm start

text

The application will run on:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Endpoints

### Contacts
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Get all contacts (Admin)
- `GET /api/contacts/:id` - Get single contact

### Testimonials
- `POST /api/testimonials` - Submit testimonial
- `GET /api/testimonials` - Get approved testimonials
- `GET /api/testimonials/admin/all` - Get all testimonials (Admin)
- `PATCH /api/testimonials/:id/approve` - Approve testimonial

## Pages

- Home (/) - Hero carousel, services, projects, design process
- About (/abouts) - Company info, team, vision/mission
- Testimonials (/testimonials) - Customer reviews
- Reach Us (/reachus) - Contact form & information
- Give Testimonial (/registers) - Testimonial submission
- Projects (/projects) - Project showcase with filters
- Buy Online (/buy-online) - Product catalog

## Project Structure

trendyinterios-mern/
├── server/ # Express backend
├── client/ # React frontend
└── README.md # This file

text

## Environment Variables

**server/.env:**
MONGODB_URI=mongodb://localhost:27017/trendyinterios
PORT=5000
NODE_ENV=development

text

**client/.env:**
REACT_APP_API_URL=http://localhost:5000/api

text

## Features Implemented

### Frontend
- Responsive navigation with dropdown menus
- Hero carousel with auto-play
- Service cards grid
- Project showcase with category filters
- Product catalog with pricing
- Contact forms (2 types)
- Testimonial carousel
- Footer with quick links

### Backend
- RESTful API with Express
- MongoDB database with Mongoose schemas
- Form validation
- Error handling
- CORS enabled for frontend communication

## Development

To run in development mode with auto-reload:

Terminal 1 - Backend
cd server
npm run dev

Terminal 2 - Frontend
cd client
npm start

text

## Production Build

Build frontend
cd client
npm run build

Backend runs with: npm start
cd ../server
npm start

text

## Future Enhancements

- [ ] User authentication & authorization
- [ ] Shopping cart functionality
- [ ] Payment integration
- [ ] Image upload for testimonials
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Search & filtering
- [ ] User profiles

## License

This project is open source and available under the MIT License.

## Contact

For queries or support, contact the development team.

---

**Created:** December 2025
**Version:** 1.0.0
SETUP_INSTRUCTIONS.md
text
# Complete Step-by-Step Setup Instructions

## Installation Requirements

1. **Node.js & npm**
   - Download: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. **MongoDB**
   - Download: https://www.mongodb.com/try/download/community
   - Verify: `mongod --version`

3. **Git (Optional)**
   - Download: https://git-scm.com/

## Step 1: Clone or Create Project

Clone from GitHub
git clone https://github.com/yourusername/trendyinterios-mern.git
cd trendyinterios-mern

OR create new
mkdir trendyinterios-mern
cd trendyinterios-mern

text

## Step 2: Setup Backend (Server)

cd server

Install dependencies
npm install

Create .env file with:
MONGODB_URI=mongodb://localhost:27017/trendyinterios
PORT=5000
NODE_ENV=development

Start MongoDB (in separate terminal)
mongod

Start backend server
npm run dev

or: npm start
text

Expected output:
MongoDB connected successfully
Server running on port 5000

text

## Step 3: Setup Frontend (Client)

cd ../client

Install dependencies
npm install

Start development server
npm start

text

The app will open at: http://localhost:3000

## Step 4: Test the Application

1. Visit http://localhost:3000 in your browser
2. Test all navigation links
3. Try submitting a contact form
4. Try submitting a testimonial
5. Check browser console for errors
6. Check terminal for server logs

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env file
- Verify port 27017 is not blocked

### Port Already in Use
Kill process using port 5000
lsof -i :5000
kill -9 <PID>