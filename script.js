const paketSelect = document.getElementById('paketSelect');
const outPaket = document.getElementById('outPaket');
const outInstalasi = document.getElementById('outInstalasi');
const outTotal = document.getElementById('outTotal');
const btnHitung = document.getElementById('btnHitung');
const form = document.getElementById('cyberForm');

const INSTALLATION_FEE = 100000;

function formatRupiah(value) {
    return 'Rp ' + value.toLocaleString('id-ID');
}

function calculateCosts() {
    const paketValue = Number(paketSelect.value);

    if (!paketValue || isNaN(paketValue)) {
        outPaket.textContent = 'Rp 0';
        outInstalasi.textContent = 'Rp 0';
        outTotal.textContent = 'Rp 0';
        return null;
    }

    const instalasi = INSTALLATION_FEE;
    const total = paketValue + instalasi;

    outPaket.textContent = formatRupiah(paketValue);
    outInstalasi.textContent = formatRupiah(instalasi);
    outTotal.textContent = formatRupiah(total);

    return {
        paket: paketValue,
        instalasi,
        total,
    };
}

btnHitung.addEventListener('click', () => {
    if (!paketSelect.value) {
        alert('Silakan pilih paket terlebih dahulu.');
        return;
    }
    calculateCosts();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nama = document.getElementById('nama').value.trim();
    const alamat = document.getElementById('alamat').value.trim();

    if (!nama || !alamat || !paketSelect.value) {
        alert('Mohon lengkapi semua data sebelum mengirim pesanan.');
        return;
    }

    const costData = calculateCosts();
    if (!costData) {
        alert('Perhitungan gagal. Silakan coba lagi.');
        return;
    }

    alert(
        `Pesanan berhasil dihitung:\n` +
        `Nama: ${nama}\n` +
        `Alamat: ${alamat}\n` +
        `Biaya Langganan: ${formatRupiah(costData.paket)}\n` +
        `Biaya Instalasi: ${formatRupiah(costData.instalasi)}\n` +
        `TOTAL ESTIMASI: ${formatRupiah(costData.total)}`
    );

    form.reset();
    outPaket.textContent = 'Rp 0';
    outInstalasi.textContent = 'Rp 0';
    outTotal.textContent = 'Rp 0';
});
