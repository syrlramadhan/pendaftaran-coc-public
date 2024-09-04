window.onload = function(){
  const apiUrl = `http://localhost:5000/api/get/coc02/coconut@013`;
  fetch(apiUrl)
  .then(response => {
    if (!response.ok){
      throw new Error("Gagal mengambil data");
    }
    return response.json();
  })
  .then(data => {
      document.getElementById("nama").innerText = data.nama;
      document.getElementById("usia").innerText = data.usia;
    console.log(data);
  })
  .catch(error => {
    console.error("Terjadi kesalahan baru");
  })
}