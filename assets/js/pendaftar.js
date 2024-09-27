// Ambil parameter URL
const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get('nama');
const kunci = urlParams.get('kunci');
const apiUrl = `https://pendaftaran-coc-api-production.up.railway.app/api/get/${nama}/${kunci}`;

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
        if (nama !== 'coc013' || kunci !== 'pendaftar@coc013') {
            document.getElementById('jumlah').innerHTML = "0";
            const dataPendaftarElement = document.getElementById('data-pendaftar');
            const pendaftarElement = document.createElement('p');
            pendaftarElement.innerHTML = `
                    <a class="txt-biru"><b>Anda :</b></a> ${data['message']}<br>
                    <hr>
                `;
            dataPendaftarElement.appendChild(pendaftarElement);
        }
            document.getElementById('jumlah').innerHTML = Object.keys(data['data']).length;
            const dataPendaftarElement = document.getElementById('tbl');
            for (const key in data['data']) {
                const pendaftarElement = document.createElement('tr');
                pendaftarElement.innerHTML = `
                        <td class="txt-biru">${key}</td>
                        <td class="txt-biru">${data['data'][key]['NamaLengkap']}</td>
                        <td class="txt-biru">${data['data'][key]['Email']}</td>
                        <td class="txt-biru">${data['data'][key]['NoTelp']}</td>
                        <td class="txt-biru">${data['data'][key]['Framework']}</td>
                        <td><img src="${data['data'][key]['BuktiTransfer']}" alt="buktitf" width="200"></td>
                    `;
                dataPendaftarElement.appendChild(pendaftarElement);
            }
        
    })
    .catch(error => {
        console.error('Ada kesalahan:', error); // Menampilkan kesalahan jika permintaan gagal
    });
