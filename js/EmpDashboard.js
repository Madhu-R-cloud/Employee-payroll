window.addEventListener("DOMContentLoaded", function () {
  try {
    displayDetails();

    document.getElementById("addUserBtn").addEventListener("click", function () {
      location.href = "../pages/index.html";
    });

    document.getElementById("searchInput").addEventListener("input", function () {
      searchByName(this.value.trim());
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

function displayDetails() {
  let template = "";
  let DisplayData = JSON.parse(localStorage.getItem("EmployeeDetailsList")) || [];
  let tableContainer = document.getElementById("tableBody");

  for (let ele of DisplayData) {
    let template1 = ele.departments.map((Element) => `<div>${Element}</div>`).join("");

    template += `
      <tr>
        <td>
          <img src="${ele.profile}" alt="img">
        </td>
        <td>${ele.name}</td>
        <td>${ele.gender}</td>
        <td>
          <div class="depttable">
            ${template1}
          </div>
        </td>
        <td>Rs.${ele.rangeInput} LPA</td>
        <td>${ele.startDate}</td>
        <td>
          <div class="actionsdiv">
            <i class='bx bxs-trash-alt' onclick="deleteEmpdetails('${ele.name}')"></i>
            <i class='bx bxs-pencil' onclick="updateEmpDetails('${ele.name}')"></i>
          </div>
        </td>
      </tr>
    `;
  }
  tableContainer.innerHTML = template;
}

function searchByName(name) {
  let DisplayData = JSON.parse(localStorage.getItem("EmployeeDetailsList")) || [];
  let filteredData = DisplayData.filter((ele) => ele.name.toLowerCase().includes(name.toLowerCase()));
  displayDetailsTable(filteredData);
}

function displayDetailsTable(data) {
  let template = "";
  let tableContainer = document.getElementById("tableBody");

  for (let ele of data) {
    let template1 = ele.departments.map((Element) => `<div>${Element}</div>`).join("");

    template += `
      <tr>
        <td>
          <img src="${ele.profile}" alt="img">
        </td>
        <td>${ele.name}</td>
        <td>${ele.gender}</td>
        <td>
          <div class="depttable">
            ${template1}
          </div>
        </td>
        <td>Rs.${ele.rangeInput}</td>
        <td>${ele.startDate}</td>
        <td>
          <div class="actionsdiv">
            <i class='bx bxs-trash-alt' onclick="deleteEmpdetails('${ele.name}')"></i>
            <i class='bx bxs-pencil' onclick="updateEmpDetails('${ele.name}')"></i>
          </div>
        </td>
      </tr>
    `;
  }
  tableContainer.innerHTML = template;
}

function deleteEmpdetails(name) {
  let localDetails = JSON.parse(localStorage.getItem('EmployeeDetailsList'));
  let updatedDetails = localDetails.filter(element => element.name !== name);
  localStorage.setItem('EmployeeDetailsList', JSON.stringify(updatedDetails));
  location.reload();
}

function updateEmpDetails(name) {
  let localUpdateDetails = JSON.parse(localStorage.getItem('EmployeeDetailsList'));
  let updateDetails = localUpdateDetails.filter(element => element.name === name);
  localStorage.setItem("ModifiedData", JSON.stringify(updateDetails[0]));
  location.href = '../pages/index.html';
}
