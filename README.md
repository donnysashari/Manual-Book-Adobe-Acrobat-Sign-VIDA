# 📚 Buku Manual Adobe - Website Tutorial Komprehensif

Website tutorial lengkap untuk Adobe Acrobat Pro, Adobe Sign, dan VIDA dalam bahasa Indonesia. Dilengkapi dengan PDF viewer, generator PDF, dan tutorial detail.

## Fitur

- **Beranda**: Tinjauan semua bagian manual yang tersedia
- **Adobe Acrobat Pro**: Tautan ke tutorial dan dokumentasi resmi Adobe
- **Adobe Sign**: Panduan pengguna dengan alur kerja tanda tangan digital
- **VIDA**: PDF viewer terintegrasi untuk dokumen manual VIDA lokal
- **Desain Responsif**: Bekerja di desktop dan perangkat mobile
- **UI Modern**: Antarmuka yang bersih dan profesional

## Memulai

### Prasyarat
- Node.js (untuk menjalankan server lokal)
- Browser web modern

### Instalasi & Penggunaan

1. **Jalankan server:**
   ```bash
   node server.js
   ```

2. **Buka browser Anda:**
   Navigasi ke `http://localhost:8000`

3. **Nikmati buku manual!**

## Struktur File

```
├── index.html              # File HTML utama
├── styles/
│   └── main.css            # Stylesheet
├── js/
│   └── main.js             # Fungsionalitas JavaScript
├── server.js               # Server HTTP sederhana
├── package.json            # Informasi paket Node.js
└── File PDF (dokumen VIDA)
```

## Detail Fitur

### Bagian Adobe Acrobat Pro
- Tautan ke dokumentasi resmi Adobe
- Tutorial komprehensif yang mencakup semua fitur utama
- Tautan eksternal ke https://helpx.adobe.com/acrobat/web.html

### Bagian Adobe Sign
- Panduan pengguna dari sumber resmi Adobe
- Dokumentasi alur kerja tanda tangan digital
- Tautan ke https://helpx.adobe.com/sign/using/user-guide-landing.html

### PDF Viewer VIDA
- PDF viewer terintegrasi menggunakan PDF.js
- Kontrol navigasi (halaman sebelumnya/berikutnya)
- Fungsi zoom
- Mode layar penuh
- Beralih antara dua dokumen VIDA:
  - Tanda Tangan Digital untuk Pengguna Eksternal
  - eKYC, Kelengkapan Akun, eSignature & Tanda Tangan Digital

## Teknologi yang Digunakan

- HTML5, CSS3, JavaScript
- PDF.js untuk viewing PDF
- Ikon Font Awesome
- Node.js (server sederhana)
- CSS Grid/Flexbox responsif

## Dukungan Browser

- Chrome (direkomendasikan)
- Firefox
- Safari
- Edge

## Lisensi

Lisensi MIT - silakan gunakan dan modifikasi sesuai kebutuhan.
