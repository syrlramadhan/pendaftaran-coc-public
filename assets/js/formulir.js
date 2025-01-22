document.querySelector('#buktitf').addEventListener('change', function (e) {
    var fileName = e.target.files[0].name;
    var nextSibling = e.target.nextElementSibling;
    nextSibling.innerText = fileName;
});

document.addEventListener('DOMContentLoaded', function () {
	const form = document.querySelector('form')
	const enpoint = `http://pendaftaran-coc-api-production.up.railway.app/api/pendaftar/add`;

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		const namaLengkap = document.getElementById('nama-lengkap').value;
		const email = document.getElementById('email').value;
		const noTelp = document.getElementById('no-telp').value;
		const buktitf = document.getElementById('buktitf').files[0];
		// const framework = document.getElementById('framework').value;

		let framework = '';
        if (document.getElementById('jsFrameworkYa').checked) {
            framework = document.getElementById("framework").value;
        } else {
            framework = 'belum pernah menggunakan framework js';
        }

		const formData = new FormData();
		formData.append('nama-lengkap', namaLengkap);
        formData.append('email', email);
        formData.append('no-telp', noTelp);
        formData.append('bukti-transfer', buktitf);
        formData.append('framework', framework);

		const requestOptions = {
            method: 'POST',
            body: formData
        };

		fetch(enpoint, requestOptions)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				console.log('Response:', data);
				if (data['message'] == 'success to add pendaftar') alert("Pendaftaran berhasil");
				if (data['message'] == 'nama') alert("Harap mengisi nama lengkap");
                if (data['message'] == 'email') alert('Harap mengisi email')
                if (data['massage'] == 'telepon') alert('Harap mengisi no telepon')
                if (data['message'] == 'success') alert("data berhasil diterima");
			})
			.catch(error => {
                console.error('Error:', error);
                // Handle error, misalnya menampilkan pesan error kepada pengguna
            });
	});
});

function tampilkanFramework() {
    document.getElementById('frameworkForm').style.display = 'block';
}

function sembunyikanFramework() {
    document.getElementById('frameworkForm').style.display = 'none';
}