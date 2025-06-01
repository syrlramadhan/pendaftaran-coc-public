document.addEventListener('DOMContentLoaded', function () {
  fetchDataPendaftar();
});

let registrantData = []; // Store data globally for export

async function fetchDataPendaftar() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  const url = 'https://pendaftaran-coc-api.up.railway.app/api/pendaftar/get';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Gagal mengambil data pendaftar');
    }
    const result = await response.json();
    registrantData = result.data; // Store data for export
    renderTableData(result.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

function renderTableData(data) {
  const tableBody = document.getElementById('tbl').getElementsByTagName('tbody')[0];
  const jumlahElement = document.getElementById('jumlah');
  jumlahElement.textContent = data.length;

  // Clear existing rows
  tableBody.innerHTML = '';

  data.forEach((pendaftar, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${pendaftar["nama-lengkap"]}</td>
      <td>${pendaftar.email}</td>
      <td>${pendaftar["no-telp"]}</td>
      <td>
        <i class="fas fa-image text-primary" 
           style="cursor: pointer;" 
           data-image-url="https://pendaftaran-coc-api.up.railway.app/api/pendaftar/uploads/${pendaftar["bukti-follow"]}"
           onclick="showImageModal(this.getAttribute('data-image-url'))"
           title="Lihat Bukti Follow">
        </i>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function showImageModal(src) {
  const modalImage = document.getElementById('modalImage');
  modalImage.src = src;
  $('#imageModal').modal('show');
}

function exportToExcel() {
  if (!registrantData.length) {
    alert('Tidak ada data untuk diekspor!');
    return;
  }

  const excelData = registrantData.map((pendaftar, index) => ({
    'No ID': index + 1,
    'Nama Lengkap': pendaftar['nama-lengkap'],
    'Email': pendaftar.email,
    'No Telepon': pendaftar['no-telp'],
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Pendaftar');
  worksheet['!cols'] = [
    { wch: 10 },
    { wch: 30 },
    { wch: 30 },
    { wch: 20 },
    { wch: 50 }
  ];
  XLSX.writeFile(workbook, 'Pendaftar_Coconut_Open_Class.xlsx');
}

async function downloadImagesAsZip() {
  if (!registrantData.length) {
    alert('Tidak ada gambar untuk diunduh!');
    return;
  }

  const zip = new JSZip();
  const folder = zip.folder('bukti_follow');

  try {
    for (let i = 0; i < registrantData.length; i++) {
      const pendaftar = registrantData[i];
      const imageUrl = `https://pendaftaran-coc-api.up.railway.app/api/pendaftar/uploads/${pendaftar["bukti-follow"]}`;
      const fileName = pendaftar["bukti-follow"] || `image_${i + 1}.jpg`;

      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          console.warn(`Gagal mengambil gambar untuk ${fileName}`);
          continue;
        }
        const blob = await response.blob();
        folder.file(fileName, blob);
      } catch (error) {
        console.warn(`Error mengambil gambar ${fileName}:`, error);
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'Bukti_Follow_Coconut_Open_Class.zip');
  } catch (error) {
    console.error('Error membuat file ZIP:', error);
    alert('Gagal membuat file ZIP. Silakan coba lagi.');
  }
}