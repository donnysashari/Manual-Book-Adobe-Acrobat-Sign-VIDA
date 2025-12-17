// Main JavaScript for Adobe Manual Books Website

class ManualBooksApp {
    constructor() {
        this.currentSection = 'dashboard';
        this.pdfDoc = null;
        this.pageNum = 1;
        this.pageRendering = false;
        this.pageNumPending = null;
        this.scale = 1.0;
        this.canvas = null;
        this.ctx = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadAcrobatTutorials();
        this.loadSignUserGuide();
        this.setupPDFViewer();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.dataset.section;
                this.showSection(section);
            });
        });

        // Dashboard cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                if (section) {
                    this.showSection(section);
                }
            });
        });

        // PDF controls
        document.getElementById('prev-page')?.addEventListener('click', () => this.onPrevPage());
        document.getElementById('next-page')?.addEventListener('click', () => this.onNextPage());
        document.getElementById('zoom-in')?.addEventListener('click', () => this.zoomIn());
        document.getElementById('zoom-out')?.addEventListener('click', () => this.zoomOut());
        document.getElementById('fullscreen')?.addEventListener('click', () => this.toggleFullscreen());

        // PDF selector buttons
        document.querySelectorAll('.pdf-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const pdfType = e.currentTarget.dataset.pdf;
                this.selectPDF(pdfType);
            });
        });
    }

    showSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');

        this.currentSection = sectionName;

        // Load section-specific content
        if (sectionName === 'vida') {
            console.log('Switching to VIDA section');
            if (!this.pdfDoc) {
                console.log('No PDF loaded, loading default PDF');
                this.loadDefaultPDF();
            }
        }
    }

    async loadAcrobatTutorials() {
        const container = document.getElementById('acrobat-content');
        const loading = document.getElementById('acrobat-loading');

        try {
            // Simulate loading tutorials from Adobe's documentation
            await new Promise(resolve => setTimeout(resolve, 1000));

            const tutorials = [
                {
                    title: "Memulai dengan Adobe Acrobat Pro",
                    description: "Pelajari dasar-dasar antarmuka Adobe Acrobat Pro dan fitur-fitur utama.",
                    url: "https://helpx.adobe.com/acrobat/desktop/get-started/learn-the-basics/overview.html",
                    content: `
                        <h4>Fitur Utama Acrobat Desktop</h4>
                        <p>Adobe Acrobat Pro menyediakan alat PDF komprehensif untuk:</p>
                        <ul>
                            <li><strong>AI Assistant</strong> - Scan konten yang panjang dan kompleks untuk ringkasan dan jawaban cepat</li>
                            <li><strong>Workspace</strong> - Area kerja yang dapat disesuaikan dengan tools yang mudah diakses</li>
                            <li><strong>Document Pane</strong> - Area utama untuk melihat dan mengedit PDF</li>
                            <li><strong>Navigation Panel</strong> - Thumbnail, bookmarks, dan navigasi dokumen</li>
                        </ul>
                        <h4>Mulai Menggunakan</h4>
                        <ol>
                            <li>Buka Adobe Acrobat Pro</li>
                            <li>Familiarisasi dengan interface utama</li>
                            <li>Explore menu File untuk membuat PDF baru</li>
                            <li>Gunakan Tools untuk mengakses fitur editing</li>
                        </ol>
                    `
                },
                {
                    title: "Membuat File PDF",
                    description: "Berbagai cara untuk membuat file PDF dari berbagai sumber dan format.",
                    url: "https://helpx.adobe.com/acrobat/desktop/create-documents/create-pdfs/create-pdf-scratch.html",
                    tutorialLink: "tutorial-membuat-pdf.html",
                    content: `
                        <div class="tutorial-quick-access">
                            <div class="tutorial-header-actions">
                                <a href="tutorial-membuat-pdf.html" target="_blank" class="btn-tutorial-full">
                                    <i class="fas fa-external-link-alt"></i> Tutorial Lengkap & Detail
                                </a>
                            </div>
                        </div>
                        
                        <div class="tutorial-summary">
                            <h5><i class="fas fa-info-circle"></i> Ringkasan Singkat</h5>
                            <p>Berikut adalah ringkasan cara membuat PDF. Untuk panduan lengkap dengan screenshot dan detail, <strong>buka Tutorial Lengkap di atas</strong>.</p>
                        </div>
                        <h4>1. Membuat PDF dari Halaman Kosong</h4>
                        <p><strong>Windows:</strong></p>
                        <ol>
                            <li>Pilih Menu → Create → Blank page</li>
                            <li>Untuk menambahkan teks dan gambar, pilih Edit dari menu atas:</li>
                            <li>• Pilih Text untuk mengetik teks statis untuk label, instruksi, atau lebih</li>
                            <li>• Pilih Image untuk memasukkan logo, grafik, atau gambar lainnya</li>
                            <li>Untuk menyimpan PDF baru, pilih Menu → Save as, pilih lokasi, masukkan nama file, dan pilih Save</li>
                        </ol>
                        <p><strong>macOS:</strong></p>
                        <ol>
                            <li>Pilih File → Create → Blank page</li>
                            <li>Untuk menambahkan teks dan gambar, pilih Edit dari menu atas</li>
                            <li>Untuk menyimpan, pilih File → Save as, pilih lokasi dan nama file</li>
                        </ol>

                        <h4>2. Konversi Dokumen Microsoft Office</h4>
                        <p><strong>Dari Word, Excel, atau PowerPoint:</strong></p>
                        <ol>
                            <li>Buka dokumen di Word, Excel, atau PowerPoint</li>
                            <li>Dari menu atas, pilih tab Acrobat</li>
                            <li>Pilih Create PDF</li>
                        </ol>

                        <h4>3. Konversi dari File Lain</h4>
                        <p><strong>Untuk berbagai format file:</strong></p>
                        <ul>
                            <li><strong>AutoCAD files (Windows, Acrobat Pro):</strong> Menu → Create → PDF from file → pilih file DWG atau DXF</li>
                            <li><strong>Adobe Creative files:</strong> File → Create PDF from file → pilih PSD, AI, atau INDD</li>
                            <li><strong>PostScript files:</strong> File → Create PDF from file → pilih file .ps atau .eps</li>
                            <li><strong>3D Files (Acrobat Pro):</strong> File → Create PDF from file → pilih U3D atau .PRC files</li>
                        </ul>

                        <h4>4. Konversi Email (Windows Only)</h4>
                        <ol>
                            <li>Buka Outlook dan pilih pesan email yang ingin dikonversi</li>
                            <li>Pilih tab Adobe PDF</li>
                            <li>Pilih Create PDF</li>
                        </ol>

                        <h4>5. Membuat Form PDF dari Scratch</h4>
                        <ol>
                            <li>Mulai dengan blank page seperti langkah 1</li>
                            <li>Pilih Prepare a form dari panel kiri</li>
                            <li>Pilih jenis field, drag ke halaman</li>
                            <li>Double-click untuk kustomisasi field</li>
                        </ol>

                        <h4>Tips Penting</h4>
                        <ul>
                            <li><strong>Untuk dokumen sederhana:</strong> Gunakan blank page untuk 1-2 halaman</li>
                            <li><strong>Untuk dokumen kompleks:</strong> Gunakan Adobe InDesign atau Microsoft Word, lalu export ke PDF</li>
                            <li><strong>Kualitas tinggi:</strong> Pastikan gambar resolusi tinggi sebelum konversi</li>
                            <li><strong>File size:</strong> Pertimbangkan tujuan akhir (web/print) untuk optimasi</li>
                        </ul>
                    `
                },
                {
                    title: "Mengedit Teks dan Gambar dalam PDF",
                    description: "Edit teks, gambar, dan konten lainnya dalam dokumen PDF Anda.",
                    url: "https://helpx.adobe.com/acrobat/desktop/edit-documents/edit-text-in-pdfs/modify-text.html",
                    tutorialLink: "tutorial-edit-pdf.html",
                    content: `
                        <div class="tutorial-quick-access">
                            <div class="tutorial-header-actions">
                                <a href="tutorial-edit-pdf.html" target="_blank" class="btn-tutorial-full">
                                    <i class="fas fa-external-link-alt"></i> Tutorial Edit PDF Lengkap & Detail
                                </a>
                            </div>
                        </div>
                        
                        <div class="tutorial-summary">
                            <h5><i class="fas fa-info-circle"></i> Ringkasan Singkat</h5>
                            <p>Berikut adalah ringkasan cara edit PDF. Untuk panduan lengkap dengan tips advanced dan troubleshooting, <strong>buka Tutorial Lengkap di atas</strong>.</p>
                        </div>
                        <h4>1. Menambahkan Teks Baru</h4>
                        <ol>
                            <li>Pilih <strong>Edit</strong> dari global bar</li>
                            <li>Di Edit pane, pilih <strong>Text</strong></li>
                            <li>Klik dimana Anda ingin menambah teks</li>
                            <li>Ketik teks dalam text box yang muncul</li>
                            <li>Gunakan FORMAT TEXT options untuk mengatur font, size, color</li>
                        </ol>
                        
                        <h4>2. Mengubah Teks yang Ada</h4>
                        <ol>
                            <li>Pilih <strong>Edit</strong> dari global bar</li>
                            <li>Di Edit pane, pilih <strong>Text</strong> under Add Content</li>
                            <li>Klik pada teks yang ingin diubah</li>
                            <li>Ketik konten baru untuk mengganti teks existing</li>
                            <li>Text box berubah warna biru dengan selection handles</li>
                        </ol>
                        
                        <h4>3. Format Teks</h4>
                        <p>Pilih teks yang ingin diformat, lalu gunakan FORMAT TEXT options:</p>
                        <ul>
                            <li><strong>Font:</strong> Pilih font yang berbeda dari dropdown</li>
                            <li><strong>Font size:</strong> Pilih ukuran atau masukkan nilai custom</li>
                            <li><strong>Font color:</strong> Buka color picker untuk pilih warna</li>
                            <li><strong>Bold, Italic, Underline:</strong> Toggle style sesuai kebutuhan</li>
                            <li><strong>Text alignment:</strong> Left, center, right, atau justify</li>
                            <li><strong>Line spacing:</strong> Atur jarak antar baris</li>
                            <li><strong>Character spacing:</strong> Atur jarak antar huruf</li>
                        </ul>
                        <h4>Mengedit Gambar</h4>
                        <ul>
                            <li>Klik pada gambar untuk memilihnya</li>
                            <li>Drag handles untuk resize</li>
                            <li>Right-click untuk opsi edit (crop, replace, etc.)</li>
                            <li>Double-click untuk edit di aplikasi eksternal</li>
                        </ul>
                        <h4>Menambahkan Konten Baru</h4>
                        <ul>
                            <li><strong>Add Text</strong> - Klik di area kosong untuk menambah teks</li>
                            <li><strong>Add Image</strong> - Insert gambar dari komputer</li>
                            <li><strong>Add Link</strong> - Buat hyperlink ke web atau dokumen lain</li>
                        </ul>
                    `
                },
                {
                    title: "Mengisi dan Menandatangani PDF",
                    description: "Isi formulir PDF secara digital, tambahkan e-signature, dan kirim untuk ditandatangani.",
                    url: "https://helpx.adobe.com/acrobat/desktop/e-sign-documents/fill-sign-documents/add-esign.html",
                    content: `
                        <h4>Mengisi Formulir PDF</h4>
                        <p>Acrobat secara otomatis mendeteksi form fields:</p>
                        <ul>
                            <li>Klik pada field untuk mengisi</li>
                            <li>Use Tab untuk berpindah antar field</li>
                            <li>Dropdown dan checkbox otomatis terdeteksi</li>
                        </ul>
                        <h4>Menambahkan E-Signature</h4>
                        <ol>
                            <li>Klik Tools > Fill & Sign</li>
                            <li>Klik "Sign" dan pilih "Add Signature"</li>
                            <li>Pilih metode: Type, Draw, atau Image</li>
                            <li>Tempatkan signature di lokasi yang diinginkan</li>
                        </ol>
                        <h4>Mengirim untuk Signature</h4>
                        <ul>
                            <li>File > Send for Signature</li>
                            <li>Tambahkan email recipients</li>
                            <li>Tentukan lokasi signature fields</li>
                            <li>Kirim dan track progress</li>
                        </ul>
                    `
                },
                {
                    title: "Ekspor PDF ke Format Lain",
                    description: "Export PDF ke Word, Excel, PowerPoint, atau format gambar untuk berbagi yang mudah.",
                    url: "https://helpx.adobe.com/acrobat/desktop/save-export-documents/convert-to-other-formats/pdfs-to-image-formats.html",
                    content: `
                        <h4>Format Export yang Tersedia</h4>
                        <ul>
                            <li><strong>Microsoft Word</strong> - Pertahankan formatting dan layout</li>
                            <li><strong>Excel</strong> - Convert tabel dan data</li>
                            <li><strong>PowerPoint</strong> - Setiap halaman menjadi slide</li>
                            <li><strong>Image formats</strong> - JPG, PNG, TIFF</li>
                            <li><strong>Text</strong> - Plain text atau rich text</li>
                        </ul>
                        <h4>Cara Export</h4>
                        <ol>
                            <li>File > Export To > [pilih format]</li>
                            <li>Pilih pengaturan kualitas dan opsi</li>
                            <li>Tentukan lokasi penyimpanan</li>
                            <li>Klik Save untuk mulai export</li>
                        </ol>
                        <h4>Tips Export</h4>
                        <ul>
                            <li>Gunakan OCR untuk PDF yang di-scan</li>
                            <li>Preview hasil sebelum export final</li>
                            <li>Pilih range halaman jika tidak perlu semua</li>
                        </ul>
                    `
                },
                {
                    title: "Berbagi dan Kolaborasi PDF",
                    description: "Bagikan PDF untuk kolaborasi real-time dan kumpulkan feedback dengan mudah.",
                    url: "https://helpx.adobe.com/acrobat/desktop/share-and-review-documents/share-documents/share-pdfs.html",
                    content: `
                        <h4>Metode Berbagi</h4>
                        <ul>
                            <li><strong>Send via Email</strong> - Langsung dari Acrobat</li>
                            <li><strong>Share Link</strong> - Generate link untuk viewing online</li>
                            <li><strong>Cloud Storage</strong> - Save ke Document Cloud</li>
                            <li><strong>Review Workflow</strong> - Structured review process</li>
                        </ul>
                        <h4>Real-time Collaboration</h4>
                        <ol>
                            <li>Klik "Share" di toolbar</li>
                            <li>Pilih "Get Link" untuk sharing</li>
                            <li>Set permissions (view, comment, edit)</li>
                            <li>Share link dengan collaborators</li>
                        </ol>
                        <h4>Review dan Comments</h4>
                        <ul>
                            <li>Reviewers dapat add comments dan annotations</li>
                            <li>Real-time sync untuk semua participants</li>
                            <li>Track changes dan version history</li>
                            <li>Resolve comments setelah addressed</li>
                        </ul>
                    `
                },
                {
                    title: "Optimasi dan Kompresi PDF",
                    description: "Mengurangi ukuran file dan mengoptimalkan PDF untuk web dan cetak.",
                    url: "https://helpx.adobe.com/acrobat/desktop/save-export-documents/optimize-pdfs/reduce-pdf-file-size.html",
                    content: `
                        <h4>Metode Optimasi</h4>
                        <p>File > Save As Other > Optimized PDF untuk:</p>
                        <ul>
                            <li><strong>Images</strong> - Kompres dan resample gambar</li>
                            <li><strong>Fonts</strong> - Subset dan unembed fonts</li>
                            <li><strong>Transparency</strong> - Flatten transparency effects</li>
                            <li><strong>Objects</strong> - Remove unused objects dan metadata</li>
                        </ul>
                        <h4>Pengaturan Kompresi</h4>
                        <ul>
                            <li><strong>Web</strong> - Optimasi untuk viewing online</li>
                            <li><strong>Print</strong> - Pertahankan kualitas untuk cetak</li>
                            <li><strong>Archive</strong> - Balance antara quality dan size</li>
                            <li><strong>Custom</strong> - Atur manual sesuai kebutuhan</li>
                        </ul>
                        <h4>Tools Tambahan</h4>
                        <ul>
                            <li>Preflight untuk check dokumen</li>
                            <li>PDF Optimizer untuk kontrol detail</li>
                            <li>Batch processing untuk multiple files</li>
                        </ul>
                    `
                },
                {
                    title: "Aksesibilitas dalam PDF",
                    description: "Membuat dokumen PDF yang dapat diakses oleh semua pengguna termasuk penyandang disabilitas.",
                    url: "https://helpx.adobe.com/acrobat/desktop/create-documents/create-accessible-pdfs/overview-accessibility.html",
                    content: `
                        <h4>Fitur Aksesibilitas</h4>
                        <ul>
                            <li><strong>Tags</strong> - Struktur dokumen untuk screen reader</li>
                            <li><strong>Alt Text</strong> - Deskripsi alternatif untuk gambar</li>
                            <li><strong>Reading Order</strong> - Urutan pembacaan yang logical</li>
                            <li><strong>Language</strong> - Set bahasa dokumen dengan benar</li>
                        </ul>
                        <h4>Accessibility Checker</h4>
                        <ol>
                            <li>Tools > Accessibility > Full Check</li>
                            <li>Review laporan masalah yang ditemukan</li>
                            <li>Fix masalah satu per satu</li>
                            <li>Re-run check untuk verifikasi</li>
                        </ol>
                        <h4>Best Practices</h4>
                        <ul>
                            <li>Buat dokumen dengan struktur heading yang jelas</li>
                            <li>Gunakan meaningful link text</li>
                            <li>Provide alt text untuk semua gambar</li>
                            <li>Ensure sufficient color contrast</li>
                            <li>Test dengan screen reader</li>
                        </ul>
                    `
                },
                {
                    title: "Menggunakan AI Assistant di Acrobat",
                    description: "Manfaatkan fitur Generative AI untuk analisis dokumen, ringkasan otomatis, dan insight intelligent.",
                    url: "https://helpx.adobe.com/acrobat/desktop/use-acrobat-ai/set-up-acrobat-generative-ai/access-in-acrobat.html",
                    content: `
                        <h4>Akses AI Assistant dari Desktop</h4>
                        <ol>
                            <li>Di Acrobat homepage, cari section <strong>"Recommended tools for you"</strong></li>
                            <li>Pilih <strong>"Select files"</strong> di AI Assistant card</li>
                            <li>Upload satu atau multiple files untuk analysis</li>
                            <li>Mulai conversation dengan dokumen untuk extract insights</li>
                        </ol>
                        
                        <h4>Akses AI Assistant dari Web</h4>
                        <ol>
                            <li>Pilih <strong>"All tools"</strong> di Acrobat web</li>
                            <li>Pilih <strong>"AI Assistant"</strong> atau <strong>"Generative summary"</strong></li>
                            <li>Jika diminta, pilih <strong>"Get started"</strong> untuk continue</li>
                        </ol>
                        
                        <h4>Fitur AI yang Tersedia</h4>
                        <ul>
                            <li><strong>AI Assistant:</strong> Chat dengan dokumen untuk mendapat answers</li>
                            <li><strong>Generative Summary:</strong> Ringkasan otomatis dari konten dokumen</li>
                            <li><strong>Insights Extraction:</strong> Analysis mendalam dari multiple documents</li>
                            <li><strong>Question Answering:</strong> Tanya jawab specific tentang content</li>
                        </ul>
                        
                        <h4>Tips Menggunakan AI Assistant</h4>
                        <ul>
                            <li>Upload dokumen dengan format PDF untuk hasil optimal</li>
                            <li>Ajukan pertanyaan specific untuk mendapat jawaban yang focused</li>
                            <li>Gunakan untuk analisis data, extract key points, atau summarize content</li>
                            <li>Combine multiple documents untuk comparative analysis</li>
                        </ul>
                        
                        <h4>Akses dari Acrobat Reader</h4>
                        <p>Jika sudah sign in ke Acrobat Reader, Anda bisa akses generative AI features dari Home. Tools akan muncul di section "Recommended tools for you".</p>
                    `
                }
            ];

            container.innerHTML = tutorials.map(tutorial => `
                <div class="tutorial-item expandable">
                    <h3>${tutorial.title}</h3>
                    <p>${tutorial.description}</p>
                    <a href="${tutorial.url}" target="_blank" class="external-link">
                        <i class="fas fa-external-link-alt"></i> Lihat di Adobe Help
                    </a>
                    <button class="tutorial-toggle btn-primary">
                        <i class="fas fa-chevron-down"></i> Lihat Detail
                    </button>
                    <div class="tutorial-content">
                        ${tutorial.content}
                    </div>
                </div>
            `).join('');

            // Add toggle functionality
            container.querySelectorAll('.tutorial-toggle').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const content = e.target.closest('.tutorial-item').querySelector('.tutorial-content');
                    const icon = e.target.querySelector('i');
                    
                    if (content.style.display === 'none' || !content.style.display) {
                        content.style.display = 'block';
                        icon.className = 'fas fa-chevron-up';
                        e.target.innerHTML = '<i class="fas fa-chevron-up"></i> Tutup Detail';
                    } else {
                        content.style.display = 'none';
                        icon.className = 'fas fa-chevron-down';
                        e.target.innerHTML = '<i class="fas fa-chevron-down"></i> Lihat Detail';
                    }
                });
            });

            loading.style.display = 'none';
            container.style.display = 'block';

        } catch (error) {
            console.error('Error loading Acrobat tutorials:', error);
            loading.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Kesalahan memuat tutorial';
        }
    }

    async loadSignUserGuide() {
        const container = document.getElementById('sign-content');
        const loading = document.getElementById('sign-loading');

        try {
            // Simulate loading user guide from Adobe's documentation
            await new Promise(resolve => setTimeout(resolve, 800));

            const guides = [
                {
                    title: "Panduan Setup Pengguna Baru",
                    description: "Baru menggunakan Adobe Sign? Gunakan panduan ini untuk verifikasi dan konfigurasi profil pengguna.",
                    url: "https://helpx.adobe.com/sign/using/get-started-guide.html",
                    tutorialLink: "tutorial-adobe-sign.html",
                    content: `
                        <div class="tutorial-quick-access">
                            <div class="tutorial-header-actions">
                                <a href="tutorial-adobe-sign.html" target="_blank" class="btn-tutorial-full">
                                    <i class="fas fa-external-link-alt"></i> Tutorial Adobe Sign Lengkap & Detail
                                </a>
                            </div>
                        </div>
                        
                        <div class="tutorial-summary">
                            <h5><i class="fas fa-info-circle"></i> Ringkasan Singkat</h5>
                            <p>Berikut adalah ringkasan dasar Adobe Sign. Untuk panduan lengkap dengan workflow detail dan troubleshooting, <strong>buka Tutorial Lengkap di atas</strong>.</p>
                        </div>
                        <h4>Setup Akun Pertama Kali</h4>
                        <ol>
                            <li><strong>Verifikasi Email</strong> - Konfirmasi alamat email Anda</li>
                            <li><strong>Setup Profil</strong> - Lengkapi informasi dasar akun</li>
                            <li><strong>Create Signature</strong> - Buat tanda tangan digital pertama</li>
                            <li><strong>Notification Preferences</strong> - Atur preferensi notifikasi</li>
                        </ol>
                        <h4>Fitur Utama yang Perlu Diketahui</h4>
                        <ul>
                            <li><strong>Send for Signature</strong> - Kirim dokumen untuk ditandatangani</li>
                            <li><strong>Sign Documents</strong> - Tandatangani dokumen yang diterima</li>
                            <li><strong>Manage Agreements</strong> - Kelola dan track dokumen</li>
                            <li><strong>Templates</strong> - Buat template untuk dokumen berulang</li>
                        </ul>
                        <h4>Quick Tour Interface</h4>
                        <ul>
                            <li>Dashboard untuk overview agreements</li>
                            <li>Manage page untuk tracking detail</li>
                            <li>Library untuk templates dan forms</li>
                            <li>Account settings untuk konfigurasi</li>
                        </ul>
                    `
                },
                {
                    title: "Mengirim Perjanjian untuk Ditandatangani",
                    description: "Pelajari cara mengkonfigurasi perjanjian dan mengirimnya dengan dokumen custom untuk menangkap tanda tangan legal.",
                    url: "https://helpx.adobe.com/sign/using/send-document-for-signature.html",
                    content: `
                        <h4>Langkah Mengirim Dokumen</h4>
                        <ol>
                            <li><strong>Upload Document</strong> - Drag & drop atau browse file</li>
                            <li><strong>Add Recipients</strong> - Masukkan email dan nama penerima</li>
                            <li><strong>Place Signature Fields</strong> - Tentukan lokasi signature dan form fields</li>
                            <li><strong>Add Message</strong> - Tulis pesan untuk recipients</li>
                            <li><strong>Send Agreement</strong> - Kirim untuk proses signature</li>
                        </ol>
                        <h4>Jenis Form Fields</h4>
                        <ul>
                            <li><strong>Signature Field</strong> - Untuk tanda tangan elektronik</li>
                            <li><strong>Initial Field</strong> - Untuk paraf</li>
                            <li><strong>Date Field</strong> - Tanggal otomatis saat signing</li>
                            <li><strong>Text Field</strong> - Input teks bebas</li>
                            <li><strong>Checkbox</strong> - Pilihan centang ya/tidak</li>
                            <li><strong>Radio Button</strong> - Pilihan eksklusif</li>
                        </ul>
                        <h4>Opsi Pengiriman</h4>
                        <ul>
                            <li>Set signing order (sequential vs parallel)</li>
                            <li>Add deadline untuk completion</li>
                            <li>Require authentication untuk signers</li>
                            <li>Enable reminders otomatis</li>
                        </ul>
                    `
                },
                {
                    title: "Mengelola Perjanjian Anda",
                    description: "Review halaman Manage untuk penjelasan semua tindakan yang dapat digunakan untuk menjaga perjanjian berjalan hingga tanda tangan final.",
                    url: "https://helpx.adobe.com/sign/using/adobesign-manage-page-overview.html",
                    content: `
                        <h4>Status Perjanjian</h4>
                        <p>Monitor status dokumen di Manage page:</p>
                        <ul>
                            <li><strong>Draft</strong> - Dokumen belum dikirim</li>
                            <li><strong>Out for Signature</strong> - Menunggu tanda tangan</li>
                            <li><strong>Waiting for Others</strong> - Menunggu signer lain</li>
                            <li><strong>Signed</strong> - Sudah ditandatangani semua pihak</li>
                            <li><strong>Completed</strong> - Proses selesai</li>
                            <li><strong>Cancelled</strong> - Dibatalkan</li>
                            <li><strong>Expired</strong> - Melewati deadline</li>
                        </ul>
                        <h4>Aksi yang Dapat Dilakukan</h4>
                        <ul>
                            <li><strong>Send Reminder</strong> - Kirim pengingat ke signer</li>
                            <li><strong>View Agreement</strong> - Lihat dokumen dan progress</li>
                            <li><strong>Download</strong> - Download dokumen yang sudah signed</li>
                            <li><strong>Cancel</strong> - Batalkan agreement jika diperlukan</li>
                            <li><strong>Replace Signer</strong> - Ganti signer jika perlu</li>
                            <li><strong>View History</strong> - Lihat audit trail lengkap</li>
                        </ul>
                        <h4>Filtering dan Pencarian</h4>
                        <ul>
                            <li>Filter by status, date, atau recipient</li>
                            <li>Search by document name atau email</li>
                            <li>Sort by berbagai criteria</li>
                            <li>Export data untuk reporting</li>
                        </ul>
                    `
                },
                {
                    title: "Panduan Setup Cepat untuk Administrator",
                    description: "Tidak punya waktu untuk membaca semuanya? Gunakan panduan ini untuk mengaktifkan akun dengan fitur yang paling umum digunakan.",
                    url: "https://helpx.adobe.com/sign/using/quick-setup-guide.html",
                    content: `
                        <h4>Konfigurasi Akun Administrator</h4>
                        <ol>
                            <li><strong>Admin Console Setup</strong> - Akses Adobe Admin Console</li>
                            <li><strong>Add Users</strong> - Tambahkan users ke organisasi</li>
                            <li><strong>Group Configuration</strong> - Setup groups dan permissions</li>
                            <li><strong>Brand Settings</strong> - Customize branding dan logo</li>
                        </ol>
                        <h4>Pengaturan Account-Level</h4>
                        <ul>
                            <li><strong>Default Settings</strong> - Set default untuk semua groups</li>
                            <li><strong>Security Options</strong> - Configure authentication requirements</li>
                            <li><strong>Workflow Settings</strong> - Default sending dan signing options</li>
                            <li><strong>Notification Templates</strong> - Customize email notifications</li>
                        </ul>
                        <h4>Group-Level Customization</h4>
                        <ul>
                            <li>Refine settings untuk specific groups</li>
                            <li>Set group-specific branding</li>
                            <li>Configure different workflows per group</li>
                            <li>Manage group-specific templates</li>
                        </ul>
                        <h4>User Management</h4>
                        <ul>
                            <li>Provisioning otomatis vs manual</li>
                            <li>Role assignments dan permissions</li>
                            <li>Bulk user operations</li>
                            <li>Monitor user activity dan usage</li>
                        </ul>
                    `
                },
                {
                    title: "Library Tutorial Video Adobe Sign",
                    description: "Tonton video pendek tentang pertanyaan yang paling sering diajukan oleh pengguna dan administrator.",
                    url: "https://experienceleague.adobe.com/docs/document-cloud-learn/sign-learning-hub/overview.html",
                    content: `
                        <h4>Kategori Tutorial Video</h4>
                        <ul>
                            <li><strong>Getting Started</strong> - Video intro untuk pengguna baru</li>
                            <li><strong>Send & Sign</strong> - Tutorial pengiriman dan signing dasar</li>
                            <li><strong>Advanced Features</strong> - Fitur lanjutan dan workflows</li>
                            <li><strong>Administration</strong> - Setup dan management untuk admin</li>
                            <li><strong>Integrations</strong> - Integrasi dengan aplikasi lain</li>
                        </ul>
                        <h4>Format Tutorial</h4>
                        <ul>
                            <li>Video pendek (2-5 menit) untuk quick learning</li>
                            <li>Step-by-step visual guidance</li>
                            <li>Real-world use cases dan scenarios</li>
                            <li>Best practices dari experts</li>
                        </ul>
                        <h4>Topics yang Sering Ditanyakan</h4>
                        <ul>
                            <li>How to send your first agreement</li>
                            <li>Creating reusable templates</li>
                            <li>Setting up advanced workflows</li>
                            <li>Troubleshooting common issues</li>
                            <li>Mobile signing best practices</li>
                        </ul>
                    `
                },
                {
                    title: "Integrasi Adobe Sign untuk Salesforce",
                    description: "Panduan instalasi dan konfigurasi Adobe Sign untuk Salesforce CRM integration.",
                    url: "https://helpx.adobe.com/sign/integrations/salesforce-installation-guide.html",
                    content: `
                        <h4>Prerequisites</h4>
                        <ul>
                            <li>Adobe Sign Enterprise account</li>
                            <li>Salesforce Administrator access</li>
                            <li>Integration key dari Adobe Sign</li>
                        </ul>
                        <h4>Instalasi Package</h4>
                        <ol>
                            <li>Download Adobe Sign package untuk Salesforce</li>
                            <li>Install package di Salesforce org</li>
                            <li>Configure OAuth connection</li>
                            <li>Set up user permissions</li>
                        </ol>
                        <h4>Konfigurasi Dasar</h4>
                        <ul>
                            <li><strong>Object Configuration</strong> - Enable pada Accounts, Contacts, dll</li>
                            <li><strong>Field Mapping</strong> - Map Salesforce fields ke Adobe Sign</li>
                            <li><strong>Template Setup</strong> - Import templates dari Adobe Sign</li>
                            <li><strong>Workflow Rules</strong> - Automate sending berdasarkan criteria</li>
                        </ul>
                        <h4>Use Cases</h4>
                        <ul>
                            <li>Send contracts langsung dari Opportunity</li>
                            <li>Auto-populate agreements dengan Salesforce data</li>
                            <li>Track signing status dalam CRM</li>
                            <li>Store signed documents di Salesforce Files</li>
                        </ul>
                    `
                },
                {
                    title: "Developer Guide dan SDK",
                    description: "Resources untuk developers yang ingin mengintegrasikan Adobe Sign dengan aplikasi custom.",
                    url: "https://opensource.adobe.com/acrobat-sign/developer_guide/index.html",
                    content: `
                        <h4>REST API Overview</h4>
                        <p>Adobe Sign menyediakan REST API untuk:</p>
                        <ul>
                            <li><strong>Agreement Management</strong> - Send, track, dan manage agreements</li>
                            <li><strong>Library Templates</strong> - Access dan manage templates</li>
                            <li><strong>User Management</strong> - Manage users dalam organisation</li>
                            <li><strong>Webhooks</strong> - Real-time notifications untuk events</li>
                        </ul>
                        <h4>Authentication</h4>
                        <ul>
                            <li>OAuth 2.0 untuk secure access</li>
                            <li>Integration keys untuk app identification</li>
                            <li>Access tokens dengan expiration</li>
                            <li>Refresh tokens untuk long-lived access</li>
                        </ul>
                        <h4>SDKs dan Libraries</h4>
                        <ul>
                            <li><strong>JavaScript SDK</strong> - For web applications</li>
                            <li><strong>Java SDK</strong> - For enterprise applications</li>
                            <li><strong>C# SDK</strong> - For .NET applications</li>
                            <li><strong>PHP SDK</strong> - For PHP applications</li>
                        </ul>
                        <h4>Sandbox Environment</h4>
                        <ul>
                            <li>Test environment untuk development</li>
                            <li>Same API features sebagai production</li>
                            <li>Separate data dan agreements</li>
                            <li>No charges untuk sandbox usage</li>
                        </ul>
                    `
                },
                {
                    title: "Customer Support Resources",
                    description: "Akses resources dukungan pelanggan dan troubleshooting untuk Adobe Sign.",
                    url: "https://helpx.adobe.com/sign/admin/contact-support.html",
                    content: `
                        <h4>Jenis Support yang Tersedia</h4>
                        <ul>
                            <li><strong>Self-Service Help</strong> - Documentation dan tutorials</li>
                            <li><strong>Community Forums</strong> - Discussion dengan users lain</li>
                            <li><strong>Live Chat</strong> - Real-time support untuk urgent issues</li>
                            <li><strong>Phone Support</strong> - Direct phone access untuk enterprise</li>
                            <li><strong>Email Support</strong> - Submit tickets untuk complex issues</li>
                        </ul>
                        <h4>Enterprise Customer Success</h4>
                        <ul>
                            <li>Dedicated customer success manager</li>
                            <li>Onboarding assistance dan best practices</li>
                            <li>Regular check-ins dan optimization reviews</li>
                            <li>Training sessions untuk teams</li>
                        </ul>
                        <h4>Troubleshooting Common Issues</h4>
                        <ul>
                            <li><strong>Login Problems</strong> - Password reset dan account access</li>
                            <li><strong>Sending Issues</strong> - Document upload dan recipient problems</li>
                            <li><strong>Signing Problems</strong> - Browser compatibility dan mobile issues</li>
                            <li><strong>Integration Issues</strong> - API errors dan connection problems</li>
                        </ul>
                        <h4>Status dan Maintenance</h4>
                        <ul>
                            <li>System status page untuk service availability</li>
                            <li>Scheduled maintenance notifications</li>
                            <li>Performance monitoring dan uptime stats</li>
                            <li>Incident reports dan resolution updates</li>
                        </ul>
                    `
                }
            ];

            container.innerHTML = guides.map(guide => `
                <div class="tutorial-item expandable">
                    <h3>${guide.title}</h3>
                    <p>${guide.description}</p>
                    <a href="${guide.url}" target="_blank" class="external-link">
                        <i class="fas fa-external-link-alt"></i> Lihat di Adobe Help
                    </a>
                    <button class="tutorial-toggle btn-primary">
                        <i class="fas fa-chevron-down"></i> Lihat Detail
                    </button>
                    <div class="tutorial-content">
                        ${guide.content}
                    </div>
                </div>
            `).join('');

            // Add toggle functionality
            container.querySelectorAll('.tutorial-toggle').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const content = e.target.closest('.tutorial-item').querySelector('.tutorial-content');
                    const icon = e.target.querySelector('i');
                    
                    if (content.style.display === 'none' || !content.style.display) {
                        content.style.display = 'block';
                        icon.className = 'fas fa-chevron-up';
                        e.target.innerHTML = '<i class="fas fa-chevron-up"></i> Tutup Detail';
                    } else {
                        content.style.display = 'none';
                        icon.className = 'fas fa-chevron-down';
                        e.target.innerHTML = '<i class="fas fa-chevron-down"></i> Lihat Detail';
                    }
                });
            });

            loading.style.display = 'none';
            container.style.display = 'block';

        } catch (error) {
            console.error('Error loading Sign user guide:', error);
            loading.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Kesalahan memuat panduan pengguna';
        }
    }

    setupPDFViewer() {
        this.canvas = document.getElementById('pdf-canvas');
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
        }
    }

    selectPDF(pdfType) {
        // Update button states
        document.querySelectorAll('.pdf-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-pdf="${pdfType}"]`).classList.add('active');

        // Load the selected PDF
        this.loadPDF(pdfType);
    }

    async loadPDF(pdfType) {
        const loadingEl = document.getElementById('pdf-loading');
        const canvas = document.getElementById('pdf-canvas');
        
        if (loadingEl) loadingEl.style.display = 'block';
        if (canvas) canvas.style.display = 'none';

        try {
            let pdfPath;
            if (pdfType === 'external-user') {
                // Use updated filename without spaces and special characters
                pdfPath = 'Adobe_Sign_powered_by_VIDA-Digital_Signing_for_External_User.pdf';
            } else if (pdfType === 'ekyc-complete') {
                // Use updated filename without spaces and special characters
                pdfPath = 'Adobe_Sign_powered_by_VIDA_eKYC_Complete_Account_eSignature_Digital_Signature.pdf';
            }

            console.log(`Attempting to load PDF: ${pdfPath}`);

            if (window.pdfjsLib) {
                const loadingTask = window.pdfjsLib.getDocument({
                    url: pdfPath,
                    cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
                    cMapPacked: true
                });
                
                this.pdfDoc = await loadingTask.promise;
                this.pageNum = 1;
                this.renderPage(this.pageNum);
                
                if (loadingEl) loadingEl.style.display = 'none';
                if (canvas) canvas.style.display = 'block';
                
                console.log(`PDF loaded successfully: ${pdfPath}`);
            } else {
                throw new Error('PDF.js not loaded');
            }
        } catch (error) {
            console.error('Error loading PDF:', error);
            
            // Try alternative loading methods
            if (pdfType === 'external-user') {
                await this.tryAlternativeLoad('external-user', [
                    './Adobe_Sign_powered_by_VIDA-Digital_Signing_for_External_User.pdf',
                    encodeURIComponent('Adobe_Sign_powered_by_VIDA-Digital_Signing_for_External_User.pdf')
                ]);
            } else if (pdfType === 'ekyc-complete') {
                await this.tryAlternativeLoad('ekyc-complete', [
                    './Adobe_Sign_powered_by_VIDA_eKYC_Complete_Account_eSignature_Digital_Signature.pdf',
                    encodeURIComponent('Adobe_Sign_powered_by_VIDA_eKYC_Complete_Account_eSignature_Digital_Signature.pdf')
                ]);
            }
        }
    }

    async tryAlternativeLoad(pdfType, alternativeNames) {
        const loadingEl = document.getElementById('pdf-loading');
        const canvas = document.getElementById('pdf-canvas');
        
        for (const altName of alternativeNames) {
            try {
                console.log(`Trying alternative name: ${altName}`);
                
                const loadingTask = window.pdfjsLib.getDocument({
                    url: altName,
                    cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
                    cMapPacked: true
                });
                
                this.pdfDoc = await loadingTask.promise;
                this.pageNum = 1;
                this.renderPage(this.pageNum);
                
                if (loadingEl) loadingEl.style.display = 'none';
                if (canvas) canvas.style.display = 'block';
                
                console.log(`PDF loaded successfully with alternative name: ${altName}`);
                return; // Success, exit the function
                
            } catch (error) {
                console.error(`Failed to load with name: ${altName}`, error);
                continue; // Try next alternative
            }
        }
        
        // If all alternatives failed, show error message
        if (loadingEl) {
            const expectedFiles = {
                'external-user': 'Adobe_Sign_powered_by_VIDA-Digital_Signing_for_External_User.pdf',
                'ekyc-complete': 'Adobe_Sign_powered_by_VIDA_eKYC_Complete_Account_eSignature_Digital_Signature.pdf'
            };
            
            loadingEl.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i> 
                Kesalahan memuat PDF: File tidak ditemukan
                <br><br>
                <small>Pastikan file PDF berada di direktori root dengan nama:<br>
                "${expectedFiles[pdfType] || 'File PDF'}"</small>
                <br><br>
                <button onclick="location.reload()" class="btn-primary" style="margin-top: 10px;">
                    <i class="fas fa-refresh"></i> Coba Lagi
                </button>
            `;
        }
    }

    loadDefaultPDF() {
        console.log('Loading default PDF...');
        this.loadPDF('external-user');
    }

    // Add helper function to check if PDF exists
    async checkPDFExists(filename) {
        try {
            const response = await fetch(filename, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    renderPage(num) {
        if (!this.pdfDoc) return;

        this.pageRendering = true;
        
        this.pdfDoc.getPage(num).then((page) => {
            const viewport = page.getViewport({ scale: this.scale });
            this.canvas.height = viewport.height;
            this.canvas.width = viewport.width;

            const renderContext = {
                canvasContext: this.ctx,
                viewport: viewport
            };
            
            const renderTask = page.render(renderContext);
            
            renderTask.promise.then(() => {
                this.pageRendering = false;
                if (this.pageNumPending !== null) {
                    this.renderPage(this.pageNumPending);
                    this.pageNumPending = null;
                }
            });
        });

        // Update page info
        document.getElementById('page-info').textContent = `Halaman ${num} dari ${this.pdfDoc.numPages}`;
        
        // Update button states
        document.getElementById('prev-page').disabled = (num <= 1);
        document.getElementById('next-page').disabled = (num >= this.pdfDoc.numPages);
    }

    queueRenderPage(num) {
        if (this.pageRendering) {
            this.pageNumPending = num;
        } else {
            this.renderPage(num);
        }
    }

    onPrevPage() {
        if (this.pageNum <= 1) return;
        this.pageNum--;
        this.queueRenderPage(this.pageNum);
    }

    onNextPage() {
        if (this.pageNum >= this.pdfDoc.numPages) return;
        this.pageNum++;
        this.queueRenderPage(this.pageNum);
    }

    zoomIn() {
        this.scale += 0.2;
        this.queueRenderPage(this.pageNum);
        document.getElementById('zoom-level').textContent = Math.round(this.scale * 100) + '%';
    }

    zoomOut() {
        if (this.scale <= 0.4) return;
        this.scale -= 0.2;
        this.queueRenderPage(this.pageNum);
        document.getElementById('zoom-level').textContent = Math.round(this.scale * 100) + '%';
    }

    toggleFullscreen() {
        const pdfViewer = document.querySelector('.pdf-viewer');
        if (!document.fullscreenElement) {
            pdfViewer.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ManualBooksApp();
});

// Configure PDF.js worker
if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}
