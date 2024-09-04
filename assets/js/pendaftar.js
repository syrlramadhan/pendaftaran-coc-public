const urlParams = new URLSearchParams(window.location.search);

const apiUrl = `http://localhost:5000/api/get/coc02/coconut@013`;

// Konfigurasi permintaan
const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

fetch(apiUrl, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Terjadi kesalahan saat melakukan permintaan.');
        }
        return response.json(); // Mengubah respon menjadi objek JavaScript
    })
    .then(data => {
        if (data['message'] == 'success') {
            document.getElementById('jumlah').innerHTML = Object.keys(data['data']).length;
            const dataPendaftarElement = document.getElementById('tbl');
            for (const key in data['data']){
                const pendaftarElement = document.createElement('tr');
                pendaftarElement.innerHTML = `
                    <td class="txt-biru">${key}</td>
                    <td class="txt-biru">${data['data'][key]['NamaLengkap']}</td>
                    <td class="txt-biru">${data['data'][key]['Email']}</td>
                    <td class="txt-biru">${data['data'][key]['NoTelp']} </td>
                    <td><img src="${data['data'][key]['BuktiTransfer']}" alt="buktitf" width="200"></td>

                `;
                dataPendaftarElement.appendChild(pendaftarElement);
            }
        } else {
            document.getElementById('jumlah').innerHTML = "0";
            const dataPendaftarElement = document.getElementById('data-pendaftar');
            const pendaftarElement = document.createElement('p');
            pendaftarElement.innerHTML = `
                <a class="txt-biru"><b>Anda :</b></a> ${data['message']}</a><br>
                <hr>
            `;
            dataPendaftarElement.appendChild(pendaftarElement);
        }
        console.log(data)
        // Lakukan operasi lainnya dengan data pendaftar jika diperlukan
    })
    .catch(error => {
        console.error('Ada kesalahan:', error); // Menampilkan kesalahan jika permintaan gagal
    });
