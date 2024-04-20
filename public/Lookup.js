document.getElementById("searchForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the search criteria values
  const studentID = document.getElementById("studentIDInput").value;
  const firstName = document.getElementById("studentfirstNameInput").value;
  const lastName = document.getElementById("studentlastNameInput").value;
  const email = document.getElementById("studentemailInput").value;
  const city = document.getElementById("studentcityInput").value;
  const course = document.getElementById("studentcourseInput").value;
  const guardian = document.getElementById("studentguardianInput").value;

  // Create an object with the search criteria
  const searchData = {
    studentID: studentID,
    firstName: firstName,
    lastName: lastName,
    email: email,
    city: city,
    course: course,
    guardian: guardian
  };

  // Make an AJAX request to the server
  $.ajax({
    type: 'POST',
    url: '/api/search', // Update the URL to point to the correct server endpoint
    data: searchData, // Pass the search criteria object as data
    success: function(response) {
      displaySearchResults(response); // Display the search results
    },
    error: function(error) {
      console.error(error); // Output any errors
      // Handle the error as needed
    }
  });
});

    // Function to display the search results
    function displaySearchResults(results) {
      const searchResultsDiv = document.getElementById("searchResults");
  
      // Clear previous search results
      searchResultsDiv.innerHTML = "";
  
      // Check if there are any results
      if (results.length === 0) {
        searchResultsDiv.innerHTML = "No results found.";
        return;
      }
  
      // Iterate over the results and display them
      results.forEach(function(result) {
        const studentDiv = document.createElement("div");
        studentDiv.innerHTML = `
          <p>[{ Student ID : ${result.studentID},</p>
          <p>Name : ${result.firstName} ${result.lastName},</p>
          <p>Email : ${result.email},</p>
          <p>Contact : ${result.phoneNumber},<p>
          <p>Birth Date : ${result.birthDate},<p>
          <p>Gender : ${result.gender},<p>
          <p>Address : ${result.address1},<p>
          <p>Contact : ${result.phoneNumber},<p>
          <p>Guardian :${result.guardianName}}]<p>
          
          <hr>
        `;
        searchResultsDiv.appendChild(studentDiv);
      });
    }







//FOR DELETE
    document.getElementById("deleteForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the student ID to be deleted
    const studentID = document.getElementById("deleteStudentIDInput").value;

    // Make an AJAX request to the server
    $.ajax({
      type: 'POST',
      url: '/api/delete', // Update the URL to point to the correct server endpoint
      data: { studentID: studentID },
      success: function(response) {
        alert(response.message); // Display a success message
      },
      error: function(error) {
        console.error(error); // Output any errors
        // Handle the error as needed
      }
    });
  });


  //update functionality
  document.getElementById("updateForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the updated student details
    const studentID = document.getElementById("updateStudentIDInput").value;
    const firstName = document.getElementById("updateFirstNameInput").value;
    const lastName = document.getElementById("updateLastNameInput").value;
    const email = document.getElementById("updateEmailInput").value;
    const city = document.getElementById("updateCityInput").value;
    const guardian = document.getElementById("updateGuardianInput").value;
    const course =  document.getElementById("updateCourseInput").value;

    // Get other updated fields

    // Create an object with the updated details
    const updatedDetails = {
        studentID: studentID,
        firstName: firstName,
        lastName: lastName,
        email: email,
        city: city,
        guardianName: guardian,
        course:course
    };

    // Make an AJAX request to the server
    $.ajax({
      type: 'POST',
      url: '/api/update', // Update the URL to point to the correct server endpoint
      data: updatedDetails,
      success: function(response) {
        alert(response.message); // Display a success message
      },
      error: function(error) {
        console.error(error); // Output any errors
        // Handle the error as needed
      }
    });
  });
