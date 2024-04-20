const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');
const registrationsData = require('./registrations.json');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());

//acquire data from forms and store in json
const fs = require('fs');

// Generate a unique student ID number
function generateStudentID() {
  const studentID = Math.floor(100000 + Math.random() * 900000);

  return studentID.toString();
}

app.get('/', (req, res) => {
  res.send('Hello, welcome to the server!');
});


app.post('/api/registration', (req, res) => {
  const formData = req.body;

  // Generate a student ID
  const studentID = generateStudentID();

  // Add the student ID to the form data
  formData.studentID = studentID;

  // Read the existing data from the JSON file
  let registrations = [];
  try {
    const data = fs.readFileSync('registrations.json');
    registrations = JSON.parse(data);
  } catch (error) {
    console.error('Error reading registrations.json', error);
  }

  // Add the new registration to the array
  registrations.push(formData);

  // Write the updated data back to the JSON file
  try {
    fs.writeFileSync('registrations.json', JSON.stringify(registrations));
  } catch (error) {
    console.error('Error writing registrations.json', error);
  }

  res.json({ message: 'Registration successful', studentID });

  const updatedData = fs.readFileSync('registrations.json');
  const jsonData = JSON.parse(updatedData);

  res.json(jsonData); // Send the updated JSON data as a response
});


//VIEW code in table
app.get('/api/registrations', (req, res) => {
  res.json(registrationsData); // Return the JSON data
});


//search for student details implementation
app.post('/api/search', (req, res) => {
  const studentID = req.body.studentID; // Retrieve the student ID from the request body
  const firstName = req.body.firstName; // Retrieve the first name from the request body
  const lastName = req.body.lastName; // Retrieve the last name from the request body
  const email = req.body.email; // Retrieve the email from the request body
  const city = req.body.city; // Retrieve the city from the request body
  const course = req.body.course; // Retrieve the course from the request body
  const guardian = req.body.guardian; // Retrieve the guardian from the request body

  // Read the registrations data from the JSON file
  let registrations = [];
  try {
    const data = fs.readFileSync('registrations.json');
    registrations = JSON.parse(data);
  } catch (error) {
    console.error('Error reading registrations.json', error);
  }

  // Perform the search based on the criteria
  const searchResults = registrations.filter(registration => {
    // Check if any of the search criteria match the corresponding properties in the registration
    return (
      (studentID && registration.studentID === studentID) ||
      (firstName && registration.firstName === firstName) ||
      (lastName && registration.lastName === lastName) ||
      (email && registration.email === email) ||
      (city && registration.city === city) ||
      (course && registration.course === course) ||
      (guardian && registration.guardian === guardian)
    );
  });

  res.json(searchResults); // Send the matching results as a response
});

//delete student by id implementation
app.post('/api/delete', (req, res) => {
  const studentID = req.body.studentID; // Assuming you're deleting by student ID

  // Read the registrations data from the JSON file
  let registrations = [];
  try {
    const data = fs.readFileSync('registrations.json');
    registrations = JSON.parse(data);
  } catch (error) {
    console.error('Error reading registrations.json', error);
  }

  // Find the index of the student with the provided ID
  const index = registrations.findIndex(registration => registration.studentID === studentID);

  if (index !== -1) {
    // Remove the student data from the array
    registrations.splice(index, 1);

    // Write the updated data back to the JSON file
    try {
      fs.writeFileSync('registrations.json', JSON.stringify(registrations));
      res.json({ message: 'Student data deleted successfully.' });
    } catch (error) {
      console.error('Error writing registrations.json', error);
      res.status(500).json({ error: 'An error occurred while deleting the student data.' });
    }
  } else {
    res.status(404).json({ error: 'Student not found.' });
  }
});


//update student endpoint API
app.post('/api/update', (req, res) => {
  const updatedDetails = req.body; // Get the updated student details

  // Read the registrations data from the JSON file
  let registrations = [];
  try {
    const data = fs.readFileSync('registrations.json');
    registrations = JSON.parse(data);
  } catch (error) {
    console.error('Error reading registrations.json', error);
  }

  // Find the student with the provided ID
  const student = registrations.find(registration => {
    // Check if either the student ID or first name matches the search criteria
    return registration.studentID === studentID || registration.firstName === firstName;
  });

  if (student) {
    // Update the student details
    Object.assign(student, updatedDetails);

    // Write the updated data back to the JSON file
    try {
      fs.writeFileSync('registrations.json', JSON.stringify(registrations));
      res.json({ message: 'Student data updated successfully.' });
    } catch (error) {
      console.error('Error writing registrations.json', error);
      res.status(500).json({ error: 'An error occurred while updating the student data.' });
    }
  } else {
    res.status(404).json({ error: 'Student not found.' });
  }
});


//Handling newsletters and contact form
// Handle form submission
app.post('/submit', (req, res) => {
  // Extract form data from the request body
  const { name, email, message } = req.body;

  // Create a Nodemailer transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'indranigk@gmail.com',
      pass: 'Qwerty1234!@#'
    }
  });

  // Compose the email
  const mailOptions = {
    from: 'indranigk@gmail.com',
    to: email,
    subject: 'Newsletter Subscription',
    text: `Dear ${name},\n\nThank you for subscribing to our newsletter!\n\nWe appreciate your interest and will keep you updated with the latest news and updates.\n\nBest regards,\nThe Newsletter Team`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('An error occurred while sending the email.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent successfully!');
    }
  });
});





const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

