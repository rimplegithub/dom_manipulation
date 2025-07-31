const form = document.getElementById('studentForm');
const tableBody = document.querySelector('#studentsTable tbody');
let students = JSON.parse(localStorage.getItem('students')) || [];

function renderTable() {
    tableBody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
     if (students.length > 5) {
        document.getElementById('container').style.overflowY = 'scroll';
    }
    
    
    localStorage.setItem('students', JSON.stringify(students));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('studentName').value.trim();
    const id = document.getElementById('studentID').value.trim();
    const email = document.getElementById('emailID').value.trim();
    const contact = document.getElementById('contactNumber').value.trim();

    // Basic validation
    const validName = /^[A-Za-z\s]+$/.test(name);
    const validID = /^\d+$/.test(id);
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validContact = /^\d{10,}$/.test(contact);

    if (!validName || !validID || !validEmail || !validContact) {
        alert("Invalid input. Please check all fields.");
        return;
    }

    students.push({ name, id, email, contact });
    form.reset();
    renderTable();
});

function deleteStudent(index) {
    students.splice(index, 1);
    renderTable();
}

function editStudent(index) {
    const student = students[index];
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('emailID').value = student.email;
    document.getElementById('contactNumber').value = student.contact;
    students.splice(index, 1); // Remove before re-adding on submit
}

renderTable();
