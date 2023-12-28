window.addEventListener("DOMContentLoaded", function () {
  const cancel = document.getElementById("cancelBtn");
  cancel.addEventListener("click", function () {
    window.location.href = "../pages/dashboard.html";
  });

  const reset = document.getElementById("resetBtn");
  reset.addEventListener("click", function () {
    resetForm();
  });

  const submit = document.getElementById("submitBtn");
  submit.addEventListener("click", function () {
    if (localStorage.getItem("ModifiedData") !== null) {
      submitUpdatedDetails(); 
    } else {
      submitForm(); 
    }
  });
  if (localStorage.getItem("ModifiedData") !== null) {
    populateFormWithModifiedData();
  }

});



function populateFormWithModifiedData() {
  let modified = JSON.parse(localStorage.getItem("ModifiedData"));

  document.getElementById("name123").value = modified.name;

  let image = document.getElementsByName("profileImage");
  for (let i of image) {
    if (i.value == modified.profile) {
      i.checked = true;
    }
  }
  document.querySelector(
    `input[name="gendername"][value="${modified.gender}"]`
  ).checked = true;

  modified.departments.forEach((department) => {
    document.getElementById(department.toLowerCase()).checked = true;
  });

  document.getElementById("rangeInput").value = modified.salary;
  const [day, month, year] = modified.startDate.split(" ");
  document.getElementById("day").value = day;
  document.getElementById("month").value = month;
  document.getElementById("year").value = year;
  document.getElementById("note").value = modified.note;

}

//update details function
function submitUpdatedDetails() {
  let day = document.getElementById("day").value;
  let month = document.getElementById("month").value;
  let year = document.getElementById("year").value;

  const EmployeeDetailsList = {
    profile: document.querySelector('input[name="profileImage"]:checked').value,
    name: document.getElementById("name123").value,
    gender: document.querySelector('input[name="gendername"]:checked').value,
    departments: Array.from(document.querySelectorAll(".dept:checked")).map(
      (checkbox) => checkbox.value
    ),
    rangeInput: document.getElementById("rangeInput").value,
    startDate: `${day} ${month} ${year}`,
    note: document.getElementById("note").value,
  };

  let previousData = JSON.parse(localStorage.getItem("EmployeeDetailsList")) || [];
  let storedData = JSON.parse(localStorage.getItem("ModifiedData"));

  for (let index = 0; index < previousData.length; index++) {
    if (previousData[index].name === storedData.name) {
      previousData[index] = EmployeeDetailsList;
      console.log(previousData[index]);
    }
  }

  localStorage.setItem("EmployeeDetailsList", JSON.stringify(previousData));
  localStorage.removeItem("ModifiedData");
  location.href='../pages/dashboard.html'
}


function resetForm() {
  const name = document.getElementById("name");
  const profileImage = document.getElementById("profile");
  const gender = document.getElementById("gender");
  const checkboxes = document.querySelectorAll(".dept");

  const rangeInputs = document.querySelectorAll(".rangeClass");
  rangeInputs.forEach((rangeInput) => {
    rangeInput.value = 0;
  });

  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");
  const note = document.getElementById("note");

  checkboxes.forEach((checkbox) => (checkbox.checked = false));

  profileImage.checked = false;
  name.value = "";
  profileImage.value = "";
  gender.checked = false;
  dayInput.value = "";
  monthInput.value = "";
  yearInput.value = "";
  note.value = "";
}

function submitForm() {

  let day = document.getElementById("day").value;
  let month = document.getElementById("month").value;
  let year = document.getElementById("year").value;

  const EmployeeDetailsList = {
    profile: document.querySelector('input[name="profileImage"]:checked').value,
    name: document.getElementById("name123").value,
    gender: document.querySelector('input[name="gendername"]:checked').value,
    departments: Array.from(document.querySelectorAll(".dept:checked")).map(
      (checkbox) => checkbox.value
    ),
    rangeInput: document.getElementById("rangeInput").value,
    startDate: `${day} ${month} ${year}`,
    note: document.getElementById("note").value,
  };

  let storedData = JSON.parse(localStorage.getItem("EmployeeDetailsList"));

  if (!Array.isArray(storedData)) {
    storedData = [];
  }

  storedData.push(EmployeeDetailsList);

  localStorage.setItem("EmployeeDetailsList", JSON.stringify(storedData));

  location.href = "../pages/dashboard.html";

  resetForm();
}
