document.addEventListener('DOMContentLoaded', function () {
    fetchDataPendaftar();
});

async function fetchDataPendaftar() {
    const token = localStorage.getItem('authToken');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const url = 'https://pendaftaran-coc-api-production.up.railway.app/api/pendaftar/get';
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
    <td>
        <img src="https://pendaftaran-coc-api-production.up.railway.app/api/pendaftar/uploads/${pendaftar["bukti-transfer"]}" 
             alt="buktitf" style="max-width: 200px; max-height: 200px; object-fit: cover;">
    </td>
`;


        table.appendChild(row);
    });
}
