# Student Room Finder Project

## 1. Introduction

College students often face difficulties in finding suitable rooms, PGs, or flats near their college. After course completion, many students vacate rooms, but this information is not easily available to new students. Due to this gap, students depend on brokers, who charge high fees and often provide unreliable information.

The **Student Room Finder System** aims to solve this problem by providing a centralized digital platform where students can share and search room availability easily.

---

## 2. Problem Statement

* Difficulty in finding vacant rooms near colleges
* Lack of verified room information
* Dependence on brokers and high brokerage charges
* No proper platform to share room details with photos and exact location

---

## 3. Proposed Solution

This project proposes an online system where:

* Students vacating rooms can upload room details
* Room seekers can search rooms based on location, rent, and room type
* Complete information including photos, address, and flat number is available

This system ensures transparency, reduces dependency on brokers, and saves time and money.

---

## 4. Objectives

* To simplify room searching for college students
* To provide verified and genuine room information
* To enable direct student-to-student communication
* To reduce brokerage costs

---

## 5. System Features

### 5.1 User Registration & Login

* Student signup and login
* Secure authentication

### 5.2 Post Room Details

* Upload room images
* Enter address and flat number
* Specify rent and deposit
* Select room type (Single / Sharing)
* Mention availability date

### 5.3 Search Room

* Location-based search
* Rent filter
* Room type filter
* Nearby college search

### 5.4 Contact Facility

* Direct phone contact
* Optional chat system

### 5.5 Admin Panel

* Manage users
* Verify room listings
* Remove fake or invalid posts

---

## 6. Technology Stack

### Frontend

* React.js
* React Router DOM
* CSS (Glassmorphism design)
* Responsive layout

### Backend

* Node.js / PHP / Django

### Database

* MySQL / MongoDB

### Additional Tools

* Google Maps API
* Cloud image storage

---

## 7. System Workflow

1. User registers and logs in
2. Room provider uploads room details
3. Room seeker searches available rooms
4. User views photos and address
5. User contacts room provider directly
6. Admin monitors and verifies data

---

## 8. Advantages

* Broker-free system
* Easy and fast room search
* Trusted student-generated data
* Cost-effective solution

---

## 9. Future Scope

* Mobile application development
* Rating and review system
* AI-based room recommendations
* Integration with college hostels and PGs

---

## 10. Conclusion

The **Student Room Finder System** is a practical, real-world solution to a common problem faced by college students. It improves accessibility, transparency, and efficiency in the room searching process and can be further expanded into a full-scale application.

---

## Setup Instructions

1. Install Node.js and npm
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. Open http://localhost:3000 in your browser

## Project Structure

```
src/
├── components/
│     └── Navbar.js
├── pages/
│     ├── Home.js
│     ├── Login.js
│     ├── Register.js
│     ├── PostRoom.js
│     └── SearchRoom.js
├── App.js
└── index.js
```