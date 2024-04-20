const textContainer = document.getElementById('logo');
const text = "EduPrime";
let index = 0;
let typing = true;
let typingSpeed = 300; // Adjust typing speed (in milliseconds)

function updateText() {
  if (typing) {
    // Append the next character to the text container
    textContainer.textContent += text[index];
    index++;

    // Check if the whole text has been typed
    if (index >= text.length) {
      typing = false;
      
      // Pause before starting the erase process
      setTimeout(() => {
        typingSpeed = 200; // Adjust erasing speed (in milliseconds)
      }, 1000); // Adjust pause time (in milliseconds)
    }
  } else {
    // Erase the typed text from the text container
    textContainer.textContent = textContainer.textContent.slice(0, -1);
    
    // Check if the text has been completely erased
    if (textContainer.textContent === "") {
      typing = true;
      index = 0;
      typingSpeed = 250; // Reset typing speed
    }
  }
}

// Call the updateText function with the specified typing speed
setInterval(updateText, typingSpeed);


//implementing jquery
$(document).ready(function () {
        // jQuery code to toggle navigation menu
        $(".navOpenBtn").click(function () {
            $(".nav-links").slideToggle();
        });

        // jQuery code to show the table on button click
        $("#showTableBtn").click(function () {
            $("#student-table").show();
            $(this).hide();
        });
    });


// retrieving the JSON data to display on table
fetch("/api/registrations")
  .then(response => response.json())
  .then(data => {
    // Process the data and display the table
    console.log(data);
    createTable(data);
  })
  .catch(error => {
    console.error('Error fetching JSON data:', error);
  });

  function createTable(data) {
  // Get a reference to the table element
  var table = document.getElementById('student-table');

  // Clear existing table rows
  table.innerHTML = '';

  // Create table headers
  var headers = ['First Name', 'Last Name', 'Email', 'Phone Number', 'Birth Date', 'Gender', 'Address', 'City', 'Course', 'Guardian Name', 'Student ID'];
  var headerRow = document.createElement('tr');
  headers.forEach(function (headerText) {
    var headerCell = document.createElement('th');
    headerCell.textContent = headerText;
    headerRow.appendChild(headerCell);
  });
  table.appendChild(headerRow);

  // Create table rows
  data.forEach(function (student) {
    var row = document.createElement('tr');

    var firstNameCell = document.createElement('td');
    firstNameCell.textContent = student.firstName;
    row.appendChild(firstNameCell);

    var lastNameCell = document.createElement('td');
    lastNameCell.textContent = student.lastName;
    row.appendChild(lastNameCell);

    var emailCell = document.createElement('td');
    emailCell.textContent = student.email;
    row.appendChild(emailCell);

    var phoneNumberCell = document.createElement('td');
    phoneNumberCell.textContent = student.phoneNumber;
    row.appendChild(phoneNumberCell);

    var birthDateCell = document.createElement('td');
    birthDateCell.textContent = student.birthDate;
    row.appendChild(birthDateCell);

    var genderCell = document.createElement('td');
    genderCell.textContent = student.gender;
    row.appendChild(genderCell);

    var addressCell = document.createElement('td');
    addressCell.textContent = student.address1;
    row.appendChild(addressCell);

    var cityCell = document.createElement('td');
    cityCell.textContent = student.city;
    row.appendChild(cityCell);

    var courseCell = document.createElement('td');
    courseCell.textContent = student.course;
    row.appendChild(courseCell);

    var guardianNameCell = document.createElement('td');
    guardianNameCell.textContent = student.guardianName;
    row.appendChild(guardianNameCell);

    var studentIDCell = document.createElement('td');
    studentIDCell.textContent = student.studentID;
    row.appendChild(studentIDCell);

    table.appendChild(row);
  });
}