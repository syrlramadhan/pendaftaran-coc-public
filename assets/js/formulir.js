document.querySelector('#buktitf').addEventListener('change', function (e) {
	var fileName = e.target.files[0].name;
	var nextSibling = e.target.nextElementSibling;
	nextSibling.innerText = fileName;
});

document.addEventListener('DOMContentLoaded', function () {
	const form = document.querySelector('form')
	const enpoint = `http://localhost:9000/api/pendaftar/add`;

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
				return response.json();
			})
			.then(data => {
				if (data.code === 200) alert(data.message);
				if (data.code === 400) alert(data.message);
				if (data.code === 500) alert(data.message);
			})
			.catch(error => {
				console.error('Error:', error);
			});
	});
});

function tampilkanFramework() {
	document.getElementById('frameworkForm').style.display = 'block';
}

function sembunyikanFramework() {
	document.getElementById('frameworkForm').style.display = 'none';
}