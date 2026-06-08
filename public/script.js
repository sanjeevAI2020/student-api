async function loadStudents() {
  const response = await fetch("/students");
  const students = await response.json();

  let html = `
        <table>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Age</th>
            </tr>
    `;

  students.forEach((student) => {
    html += `
            <tr>
                <td>${student.id}</td>
                <td>${student.first_name}</td>
                <td>${student.last_name}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>${student.age}</td>
            </tr>
        `;
  });

  html += `</table>`;

  document.getElementById("result").innerHTML = html;
}
