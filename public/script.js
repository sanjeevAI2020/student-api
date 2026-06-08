async function loadStudents() {
    const response = await fetch('/students');
    const data = await response.json();

    document.getElementById('result').innerHTML =
        JSON.stringify(data, null, 2);
}