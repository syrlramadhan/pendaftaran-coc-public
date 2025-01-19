document.addEventListener('DOMContentLoaded', function () {
    fetchDataPendaftar();
});

async function fetchDataPendaftar() {
    const token = localStorage.getItem('authToken');

    if (!token) {
        alert('You need to log in first');
        window.location.href = 'login.html';
        return;
    }

    const url = 'http://localhost:9000/api/pendaftar/get';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Gagal mengambil data pendaftar');
        }
        const result = await response.json();
        renderTableData(result.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function renderTableData(data) {
    const table = document.getElementById('tbl');
    const jumlahElement = document.getElementById('jumlah');
    jumlahElement.textContent = data.length;

    data.forEach((pendaftar, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${pendaftar["nama-lengkap"]}</td>
            <td>${pendaftar.email}</td>
            <td>${pendaftar["no-telp"]}</td>
            <td>${pendaftar.framework}</td>
            <td><img src="http://localhost:9000/api/pendaftar/uploads/${pendaftar["bukti-transfer"]}" alt="buktitf"></td>
        `;

        table.appendChild(row);
    });
}
