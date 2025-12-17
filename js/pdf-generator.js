// PDF Generator for Adobe Manual Books
class PDFGenerator {
    constructor() {
        this.initializePrintStyles();
        console.log('PDF Generator initialized');
    }

    initializePrintStyles() {
        // Add print-specific CSS if not already added
        if (!document.getElementById('print-styles')) {
            const printStyles = `
                @media print {
                    @page {
                        margin: 2cm;
                        size: A4;
                    }
                    
                    /* Hide UI elements */
                    .header, .footer, .nav, .pdf-controls, .tutorial-toggle, 
                    .pdf-download-btn, .complete-download, .stats, .cards-grid {
                        display: none !important;
                    }
                    
                    /* Show all sections and content */
                    .section {
                        display: block !important;
                        page-break-after: always;
                    }
                    
                    .tutorial-content {
                        display: block !important;
                        page-break-inside: avoid;
                        margin-top: 10px;
                        padding: 15px;
                        border-left: 3px solid #333;
                        background-color: #f8f8f8 !important;
                    }
                    
                    .tutorial-item {
                        margin-bottom: 25px;
                        page-break-inside: avoid;
                        border: 1px solid #ddd;
                        padding: 15px;
                        border-radius: 5px;
                    }
                    
                    /* Typography for print */
                    body {
                        font-family: "Times New Roman", serif;
                        font-size: 11pt;
                        line-height: 1.4;
                        color: #000 !important;
                    }
                    
                    h1 {
                        font-size: 24pt;
                        color: #000 !important;
                        text-align: center;
                        margin-bottom: 20pt;
                        page-break-after: avoid;
                    }
                    
                    h2 {
                        font-size: 18pt;
                        color: #000 !important;
                        margin-top: 20pt;
                        margin-bottom: 10pt;
                        page-break-after: avoid;
                        border-bottom: 2px solid #000;
                        padding-bottom: 5pt;
                    }
                    
                    h3 {
                        font-size: 14pt;
                        color: #000 !important;
                        margin-top: 15pt;
                        margin-bottom: 8pt;
                        page-break-after: avoid;
                        font-weight: bold;
                    }
                    
                    h4 {
                        font-size: 12pt;
                        color: #000 !important;
                        margin-top: 12pt;
                        margin-bottom: 6pt;
                        font-weight: bold;
                    }
                    
                    /* Lists and content */
                    ul, ol {
                        margin-left: 20pt;
                        margin-bottom: 10pt;
                    }
                    
                    li {
                        margin-bottom: 3pt;
                        line-height: 1.3;
                    }
                    
                    p {
                        margin-bottom: 8pt;
                        text-align: justify;
                    }
                    
                    /* Hero section styling */
                    .hero {
                        text-align: center;
                        margin-bottom: 30pt;
                        padding: 20pt;
                        border: 2px solid #000;
                    }
                    
                    .hero h2 {
                        border-bottom: none;
                        margin-top: 0;
                    }
                    
                    /* Section headers */
                    .section-header {
                        margin-bottom: 20pt;
                    }
                    
                    .section-header p {
                        font-style: italic;
                        font-size: 10pt;
                    }
                    
                    /* External links */
                    .external-link {
                        color: #000 !important;
                        text-decoration: none;
                        font-style: italic;
                    }
                    
                    .external-link:after {
                        content: " (Lihat: " attr(href) ")";
                        font-size: 9pt;
                        color: #666;
                    }
                    
                    /* Table of contents styling */
                    .pdf-toc {
                        page-break-after: always;
                        margin-bottom: 30pt;
                    }
                    
                    .pdf-toc h2 {
                        text-align: center;
                    }
                    
                    .pdf-toc ul {
                        list-style: none;
                        margin-left: 0;
                    }
                    
                    .pdf-toc li {
                        margin-bottom: 8pt;
                        border-bottom: 1px dotted #ccc;
                        padding-bottom: 3pt;
                    }
                }
            `;
            
            const style = document.createElement('style');
            style.id = 'print-styles';
            style.textContent = printStyles;
            document.head.appendChild(style);
        }
    }

    async generatePDF(section) {
        console.log(`Generating PDF for section: ${section}`);
        
        // Store original title
        const originalTitle = document.title;
        
        try {
            // Set appropriate title for the PDF
            if (section === 'acrobat') {
                document.title = 'Tutorial Adobe Acrobat Pro - Buku Manual Adobe';
            } else if (section === 'sign') {
                document.title = 'Panduan Adobe Sign - Buku Manual Adobe';
            }
            
            // Hide all sections first
            const allSections = document.querySelectorAll('.section');
            const originalDisplay = {};
            
            allSections.forEach((s, index) => {
                originalDisplay[index] = s.style.display;
                s.style.display = 'none';
            });
            
            // Show only target section
            const targetSection = document.getElementById(section);
            if (targetSection) {
                targetSection.style.display = 'block';
                
                // Expand all tutorial content for printing
                const tutorialContents = targetSection.querySelectorAll('.tutorial-content');
                const originalContentDisplay = {};
                
                tutorialContents.forEach((content, index) => {
                    originalContentDisplay[index] = content.style.display;
                    content.style.display = 'block';
                });
                
                // Wait for content to be visible
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Trigger print dialog
                window.print();
                
                // Restore original state after printing
                setTimeout(() => {
                    // Restore section display
                    allSections.forEach((s, index) => {
                        s.style.display = originalDisplay[index] || '';
                    });
                    
                    // Restore tutorial content display
                    tutorialContents.forEach((content, index) => {
                        content.style.display = originalContentDisplay[index] || 'none';
                    });
                    
                    // Restore original title
                    document.title = originalTitle;
                }, 1000);
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
            document.title = originalTitle;
        }
    }

    async downloadAllAsPDF() {
        console.log('Generating complete manual PDF');
        
        // Store original title
        const originalTitle = document.title;
        document.title = 'Buku Manual Adobe - Panduan Lengkap Adobe Acrobat Pro & Adobe Sign';
        
        try {
            // Create table of contents
            this.createTableOfContents();
            
            // Show all tutorial sections
            const tutorialSections = ['acrobat', 'sign'];
            const allSections = document.querySelectorAll('.section');
            const originalDisplay = {};
            
            // Hide dashboard, show only tutorial sections
            allSections.forEach((section, index) => {
                originalDisplay[index] = section.style.display;
                const sectionId = section.id;
                
                if (tutorialSections.includes(sectionId)) {
                    section.style.display = 'block';
                    
                    // Expand all tutorial content
                    const tutorialContents = section.querySelectorAll('.tutorial-content');
                    tutorialContents.forEach(content => {
                        content.style.display = 'block';
                    });
                } else if (sectionId === 'dashboard') {
                    // Show only hero section of dashboard
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
            
            // Wait for content to be ready
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Trigger print
            window.print();
            
            // Restore original state
            setTimeout(() => {
                // Remove table of contents
                const toc = document.getElementById('pdf-toc');
                if (toc) {
                    toc.remove();
                }
                
                // Restore sections
                allSections.forEach((section, index) => {
                    section.style.display = originalDisplay[index] || '';
                    
                    // Hide tutorial contents again
                    const tutorialContents = section.querySelectorAll('.tutorial-content');
                    tutorialContents.forEach(content => {
                        content.style.display = 'none';
                    });
                });
                
                document.title = originalTitle;
            }, 1000);
            
        } catch (error) {
            console.error('Error generating complete manual PDF:', error);
            document.title = originalTitle;
        }
    }

    createTableOfContents() {
        // Remove existing TOC if any
        const existingToc = document.getElementById('pdf-toc');
        if (existingToc) {
            existingToc.remove();
        }
        
        // Create table of contents
        const toc = document.createElement('div');
        toc.id = 'pdf-toc';
        toc.className = 'pdf-toc';
        toc.innerHTML = `
            <h1>BUKU MANUAL ADOBE</h1>
            <h2>Daftar Isi</h2>
            <ul>
                <li>1. Selamat Datang di Buku Manual Adobe</li>
                <li>2. Tutorial Adobe Acrobat Pro
                    <ul style="margin-left: 20px; margin-top: 5px;">
                        <li>2.1. Memulai dengan Adobe Acrobat Pro</li>
                        <li>2.2. Membuat File PDF</li>
                        <li>2.3. Mengedit Teks dan Gambar dalam PDF</li>
                        <li>2.4. Mengisi dan Menandatangani PDF</li>
                        <li>2.5. Ekspor PDF ke Format Lain</li>
                        <li>2.6. Berbagi dan Kolaborasi PDF</li>
                        <li>2.7. Optimasi dan Kompresi PDF</li>
                        <li>2.8. Aksesibilitas dalam PDF</li>
                    </ul>
                </li>
                <li>3. Panduan Pengguna Adobe Sign
                    <ul style="margin-left: 20px; margin-top: 5px;">
                        <li>3.1. Panduan Setup Pengguna Baru</li>
                        <li>3.2. Mengirim Perjanjian untuk Ditandatangani</li>
                        <li>3.3. Mengelola Perjanjian Anda</li>
                        <li>3.4. Panduan Setup Cepat untuk Administrator</li>
                        <li>3.5. Library Tutorial Video Adobe Sign</li>
                        <li>3.6. Integrasi Adobe Sign untuk Salesforce</li>
                        <li>3.7. Developer Guide dan SDK</li>
                        <li>3.8. Customer Support Resources</li>
                    </ul>
                </li>
            </ul>
            <div style="margin-top: 30pt; text-align: center; font-style: italic;">
                <p>© 2025 Buku Manual Adobe. Semua hak dilindungi.</p>
                <p>Panduan lengkap untuk Adobe Acrobat Pro, Adobe Sign, dan solusi digital VIDA.</p>
            </div>
        `;
        
        // Insert TOC at the beginning of main content
        const mainContent = document.querySelector('.main .container');
        mainContent.insertBefore(toc, mainContent.firstChild);
    }

    // Add Share, Review & Export tutorial to compilation
    addShareReviewExportContent() {
        return `
        <div class="pdf-section">
            <h1 style="color: #dc3545; border-bottom: 3px solid #dc3545; padding-bottom: 10px;">
                📤 Tutorial Berbagi, Review & Export Adobe Acrobat
            </h1>
            
            <div class="section-intro">
                <p><strong>Panduan lengkap untuk kolaborasi dan ekspor dokumen PDF dengan Adobe Acrobat</strong></p>
            </div>

            <h2>📤 Berbagi Dokumen PDF</h2>
            
            <h3>1. Berbagi PDF untuk Ditinjau dan Dikomentari</h3>
            <div class="steps">
                <h4>Langkah-langkah:</h4>
                <ol>
                    <li><strong>Buka dokumen</strong> yang ingin Anda bagikan</li>
                    <li>Dari menu atas, pilih <strong>Share</strong></li>
                    <li><strong>Atur akses khusus</strong> (opsional):
                        <ul>
                            <li><strong>Anyone on the internet with the link</strong> - Link publik untuk audiens besar</li>
                            <li><strong>People in [organization] with the link</strong> - Akses untuk pengguna enterprise</li>
                            <li><strong>Invited people only</strong> - Akses terbatas untuk kolaborator yang diundang</li>
                        </ul>
                    </li>
                    <li>Masukkan <strong>alamat email penerima</strong> di field "Enter name or email"</li>
                    <li><strong>Atur deadline review</strong> (opsional) dengan memilih "Add deadline"</li>
                    <li>Tambahkan pesan untuk penerima dan pastikan toggle <strong>"People can comment on this file"</strong> aktif</li>
                    <li>Klik <strong>Invite</strong></li>
                </ol>
            </div>
            
            <div class="highlight-box">
                <h4>🔒 Catatan Keamanan:</h4>
                <ul>
                    <li>Penerima harus sign in untuk meninjau dan menambahkan komentar</li>
                    <li>Dokumen yang dibagikan muncul di daftar "Shared by you"</li>
                    <li>Anda dapat melacak status dokumen yang dibagikan</li>
                </ul>
            </div>

            <h3>2. Berbagi Dokumen Hanya untuk Dilihat</h3>
            <div class="steps">
                <h4>Untuk berbagi tanpa kemampuan komentar:</h4>
                <ol>
                    <li>Buka dokumen yang ingin dibagikan</li>
                    <li>Pilih <strong>Share</strong> dari menu atas</li>
                    <li>Masukkan alamat email penerima</li>
                    <li><strong>Pastikan toggle "People can comment" dimatikan</strong></li>
                    <li>Tambahkan pesan (opsional)</li>
                    <li>Klik <strong>Send</strong></li>
                </ol>
            </div>

            <h3>3. Berbagi Dokumen Melalui Link</h3>
            <div class="steps">
                <h4>Cara cepat berbagi dengan link:</h4>
                <ol>
                    <li>Dari daftar <strong>Your documents</strong> atau <strong>Recent files</strong></li>
                    <li>Hover di atas dokumen yang ingin dibagikan</li>
                    <li>Klik ikon <strong>Get a link</strong> 🔗</li>
                    <li>Aktifkan toggle <strong>"Allow comments"</strong> jika ingin mengizinkan komentar</li>
                    <li>Klik <strong>Get link</strong></li>
                    <li>Link akan tersalin ke clipboard - bagikan dengan cara apa pun</li>
                </ol>
            </div>

            <h2>🔐 Melindungi Dokumen PDF</h2>
            
            <h3>1. Menambahkan Password ke PDF</h3>
            <div class="steps">
                <ol>
                    <li>Di homepage <strong>Acrobat on the web</strong>, pilih <strong>Edit > Protect a PDF</strong></li>
                    <li>Pilih lokasi file dan pilih file yang ingin dilindungi</li>
                    <li>Klik <strong>Continue</strong></li>
                    <li>Masukkan password di field <strong>"Set password"</strong></li>
                    <li>Konfirmasi password di field <strong>"Confirm password"</strong></li>
                    <li>Klik <strong>Set password</strong></li>
                </ol>
            </div>

            <div class="warning-box">
                <p><strong>⚠️ Penting:</strong> Setelah password diatur, pengguna harus memasukkan password untuk melihat PDF.</p>
            </div>

            <h2>📊 Mengelola Dokumen yang Dibagikan</h2>
            
            <h3>Dashboard Dokumen Bersama</h3>
            <div class="steps">
                <h4>Mengakses dashboard:</h4>
                <ol>
                    <li>Di homepage Acrobat, pilih <strong>Documents > Shared by you</strong></li>
                    <li>Lihat informasi dokumen bersama:
                        <ul>
                            <li><strong>Name:</strong> Nama file yang dibagikan</li>
                            <li><strong>Sharing:</strong> Nama orang yang diberi akses</li>
                            <li><strong>Status:</strong> Jumlah orang yang telah melihat file</li>
                            <li><strong>Last Activity:</strong> Timestamp aktivitas terakhir</li>
                        </ul>
                    </li>
                </ol>
            </div>

            <h4>Fitur manajemen dokumen:</h4>
            <ul>
                <li><strong>👥 Menambahkan Orang:</strong> Pilih dokumen → Expand recipient list → Klik "Add people"</li>
                <li><strong>🔗 Berbagi Link:</strong> Pilih dokumen → Klik "Get link" → Link tersalin ke clipboard</li>
                <li><strong>🚫 Mencabut Akses:</strong> Pilih dokumen → Klik "Unshare" untuk mencabut akses</li>
                <li><strong>🗑️ Menghapus File:</strong> Pilih dokumen → Klik "Delete" untuk menghapus permanen</li>
            </ul>

            <h2>💬 Review dan Komentar PDF</h2>
            
            <h3>Proses Review Dokumen</h3>
            
            <h4>Untuk reviewer (penerima dokumen):</h4>
            <ol>
                <li><strong>Terima email notifikasi</strong> dengan link ke dokumen</li>
                <li><strong>Sign in</strong> ke Adobe Acrobat untuk mengakses dokumen</li>
                <li><strong>Baca dan tinjau</strong> dokumen dengan seksama</li>
                <li><strong>Tambahkan komentar</strong> pada bagian yang relevan</li>
                <li><strong>Simpan perubahan</strong> - komentar otomatis tersinkronisasi</li>
            </ol>
            
            <h4>Untuk pemilik dokumen:</h4>
            <ul>
                <li><strong>Notifikasi real-time</strong> saat ada yang melihat dokumen</li>
                <li><strong>Pantau aktivitas</strong> di dashboard "Shared by you"</li>
                <li><strong>Kelola deadline</strong> dan kirim pengingat jika diperlukan</li>
                <li><strong>Tinjau semua komentar</strong> dan berikan respons</li>
            </ul>

            <h2>💡 Tips & Best Practices</h2>
            
            <h3>Tips Kolaborasi Efektif</h3>
            <ul>
                <li><strong>🎯 Atur Deadline yang Realistis:</strong> Berikan waktu cukup untuk reviewer memahami dokumen</li>
                <li><strong>📝 Berikan Konteks yang Jelas:</strong> Sertakan pesan yang menjelaskan tujuan review</li>
                <li><strong>🔐 Pilih Level Akses yang Tepat:</strong> Gunakan "Invited people only" untuk dokumen sensitif</li>
                <li><strong>📊 Monitor Aktivitas Rutin:</strong> Periksa dashboard "Shared by you" secara berkala</li>
                <li><strong>🔄 Kelola Siklus Review:</strong> Unshare dokumen lama dan buat versi baru setelah revisi</li>
                <li><strong>💾 Backup Dokumen Penting:</strong> Simpan salinan lokal dokumen penting sebelum berbagi</li>
            </ul>
        </div>`;
    }

    // Add E-Sign tutorial content
    addESignContent() {
        return `
        <div class="pdf-section">
            <h1 style="color: #dc3545; border-bottom: 3px solid #dc3545; padding-bottom: 10px;">
                ✍️ Tutorial E-Sign & Tanda Tangan Digital Adobe Acrobat
            </h1>
            
            <div class="section-intro">
                <p><strong>Panduan komprehensif untuk e-signature dan digital signature dengan standar keamanan tinggi</strong></p>
            </div>

            <h2>📋 Perbedaan E-Signature dan Digital Signature</h2>
            
            <h3>E-Signature (Tanda Tangan Elektronik)</h3>
            <ul>
                <li>Mudah digunakan untuk persetujuan dokumen</li>
                <li>Dapat berupa gambar, teks, atau tanda tangan yang digambar</li>
                <li>Tersimpan di cloud Adobe untuk sinkronisasi perangkat</li>
                <li>Ideal untuk workflow persetujuan umum</li>
            </ul>

            <h3>Digital Signature (Tanda Tangan Digital)</h3>
            <ul>
                <li>Menggunakan sertifikat dan enkripsi untuk keamanan tinggi</li>
                <li>Memverifikasi identitas penandatangan</li>
                <li>Melindungi dokumen dari perubahan tidak sah</li>
                <li>Memenuhi standar compliance industri (ETSI, PAdES, CAdES)</li>
            </ul>

            <h2>🆔 Persiapan Digital Signature</h2>
            
            <h3>Mendapatkan Digital ID</h3>
            <ol>
                <li><strong>Minta dari organisasi Anda</strong> (untuk penggunaan corporate)</li>
                <li><strong>Beli dari Adobe security partner</strong> (sertifikat terpercaya)</li>
                <li><strong>Buat self-signed digital ID</strong> di Acrobat (untuk kebutuhan internal)</li>
            </ol>

            <h3>Konfigurasi Signature di Acrobat</h3>
            <ol>
                <li>Buka Menu (Windows) atau Acrobat (macOS) > Preferences > Signatures</li>
                <li>Pilih More di bawah Creation & Appearance</li>
                <li>Pilih metode signing default yang diinginkan</li>
                <li>Di bagian Appearances, pilih New untuk membuat tampilan signature</li>
                <li>Aktifkan "Enable Protected Mode at startup" untuk keamanan</li>
            </ol>

            <h2>📤 Mengirim Dokumen untuk E-Signature</h2>
            
            <h3>Request E-Signatures Individual</h3>
            <ol>
                <li>Pilih E-Sign > Request e-signatures</li>
                <li>Masukkan email dan nama penerima</li>
                <li>Tambah penerima lain: Add recipient, Add yourself, Add CC</li>
                <li>Centang "Recipients must sign in order" jika perlu urutan</li>
                <li>Pilih Prepare document</li>
                <li>Drag dan drop field signature di posisi yang diinginkan</li>
                <li>Review dan Send</li>
            </ol>

            <h3>Bulk Signing (Acrobat Pro)</h3>
            <ol>
                <li>Pilih E-Sign > Send in bulk</li>
                <li>Pilih Choose files dan dokumen untuk bulk signing</li>
                <li>Atur Agreement name dan message</li>
                <li>Konfigurasi deadline, reminder, password, bahasa</li>
                <li>Add recipients (hingga 50 penerima)</li>
                <li>Preview & add fields untuk setiap penerima</li>
                <li>Send (setiap agreement independen dengan audit report sendiri)</li>
            </ol>

            <h2>✍️ Menandatangani Dokumen</h2>
            
            <h3>E-Sign Agreement</h3>
            <ol>
                <li>Pilih Home > Waiting for you di bawah Agreements</li>
                <li>Double-click agreement yang akan ditandatangani</li>
                <li>Pilih signature field</li>
                <li>Buat signature dengan memilih: Type, Draw, Image, atau Mobile</li>
                <li>Apply signature</li>
                <li>Lengkapi semua field required</li>
                <li>Click to Sign untuk finalisasi</li>
            </ol>

            <h3>Digital Signature</h3>
            <ol>
                <li>Pastikan memiliki Digital ID yang valid</li>
                <li>Pilih alat Sign atau klik signature field</li>
                <li>Pilih Digital ID dan masukkan password</li>
                <li>Pilih tipe: Approval signature atau Certification signature</li>
                <li>Konfirmasi untuk menandatangani dokumen</li>
            </ol>

            <h2>📊 Mengelola Agreement</h2>
            
            <h3>Status Agreement</h3>
            <ul>
                <li><strong>All agreements:</strong> Semua agreement dengan berbagai status</li>
                <li><strong>In progress:</strong> Agreement yang sedang dalam proses</li>
                <li><strong>Waiting for you:</strong> Agreement yang memerlukan tanda tangan Anda</li>
                <li><strong>Completed:</strong> Agreement yang telah ditandatangani semua pihak</li>
                <li><strong>Drafts:</strong> Agreement yang disimpan sebagai draft</li>
                <li><strong>Templates:</strong> Template agreement yang dapat digunakan ulang</li>
            </ul>

            <h3>Aksi Manajemen</h3>
            <ul>
                <li><strong>Cancel Agreement:</strong> Batalkan dengan alasan dan notifikasi</li>
                <li><strong>Send Reminders:</strong> Kirim pengingat dengan pesan optional</li>
                <li><strong>Share Draft:</strong> Bagikan draft melalui sharing workflow</li>
            </ul>

            <h2>🔒 Permissions & Limitasi</h2>
            
            <h3>Yang Terjadi Setelah PDF Ditandatangani</h3>
            <ul>
                <li><strong>Single signer:</strong> Dapat menghapus signature dengan Clear Signature</li>
                <li><strong>Multiple signers:</strong> Harus meminta copy unsigned</li>
                <li><strong>Digital signature:</strong> Mengunci dokumen dari perubahan</li>
                <li><strong>Lock after signing:</strong> Memblokir semua edit dan signature tambahan</li>
            </ul>

            <h3>Best Practices</h3>
            <ul>
                <li>Selalu backup copy unsigned PDF sebelum menandatangani</li>
                <li>Hindari "Lock document after signing" jika butuh signature tambahan</li>
                <li>Simpan versi unsigned asli untuk edit future</li>
                <li>Koordinasikan urutan signing untuk multiple signatures</li>
            </ul>

            <h2>🛡️ Keamanan & Compliance</h2>
            
            <h3>Standar yang Didukung</h3>
            <ul>
                <li><strong>ETSI, PAdES, dan CAdES</strong> untuk perlindungan data</li>
                <li><strong>XML Signature standard (W3C)</strong> untuk integrity dan authentication</li>
                <li><strong>Adobe LiveCycle Rights Management</strong> untuk kebijakan akses terpusat</li>
                <li><strong>Adobe Approved Trust List (AATL)</strong> untuk signature terpercaya global</li>
            </ul>

            <h3>Format File yang Didukung</h3>
            <p>Selain PDF: DOC, DOCX, RTF, XLSX, PPT, PPTX, TXT, CSV, HTML, HTM, TIFF, TIF, BMP, GIF, JPG, JPEG, PNG</p>
        </div>`;
    }

    // Enhanced PDF compilation method
    async generateComprehensivePDF() {
        const doc = this.createPDFDocument();
        
        // Cover page
        this.addCoverPage(doc);
        
        // Table of contents
        this.addTableOfContents(doc);
        
        // Add all tutorial content
        const sections = [
            this.addAcrobatTutorialContent(),
            this.addSignTutorialContent(), 
            this.addEditPDFContent(),
            this.addShareReviewExportContent(),
            this.addESignContent() // Add the new E-Sign section
        ];
        
        sections.forEach(section => {
            doc.addPage();
            this.addContentToPage(doc, section);
        });
        
        // Generate and download
        const pdfBlob = doc.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Manual_Adobe_Acrobat_Sign_VIDA_Lengkap.pdf';
        link.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('PDF Manual Lengkap berhasil diunduh!', 'success');
    }

    async generatePDF(section) {
        console.log(`Generating PDF for section: ${section}`);
        
        // Store original title
        const originalTitle = document.title;
        
        try {
            // Set appropriate title for the PDF
            if (section === 'acrobat') {
                document.title = 'Tutorial Adobe Acrobat Pro - Buku Manual Adobe';
            } else if (section === 'sign') {
                document.title = 'Panduan Adobe Sign - Buku Manual Adobe';
            }
            
            // Hide all sections first
            const allSections = document.querySelectorAll('.section');
            const originalDisplay = {};
            
            allSections.forEach((s, index) => {
                originalDisplay[index] = s.style.display;
                s.style.display = 'none';
            });
            
            // Show only target section
            const targetSection = document.getElementById(section);
            if (targetSection) {
                targetSection.style.display = 'block';
                
                // Expand all tutorial content for printing
                const tutorialContents = targetSection.querySelectorAll('.tutorial-content');
                const originalContentDisplay = {};
                
                tutorialContents.forEach((content, index) => {
                    originalContentDisplay[index] = content.style.display;
                    content.style.display = 'block';
                });
                
                // Wait for content to be visible
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Trigger print dialog
                window.print();
                
                // Restore original state after printing
                setTimeout(() => {
                    // Restore section display
                    allSections.forEach((s, index) => {
                        s.style.display = originalDisplay[index] || '';
                    });
                    
                    // Restore tutorial content display
                    tutorialContents.forEach((content, index) => {
                        content.style.display = originalContentDisplay[index] || 'none';
                    });
                    
                    // Restore original title
                    document.title = originalTitle;
                }, 1000);
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
            document.title = originalTitle;
        }
    }

    async downloadAllAsPDF() {
        console.log('Generating complete manual PDF');
        
        // Store original title
        const originalTitle = document.title;
        document.title = 'Buku Manual Adobe - Panduan Lengkap Adobe Acrobat Pro & Adobe Sign';
        
        try {
            // Create table of contents
            this.createTableOfContents();
            
            // Show all tutorial sections
            const tutorialSections = ['acrobat', 'sign'];
            const allSections = document.querySelectorAll('.section');
            const originalDisplay = {};
            
            // Hide dashboard, show only tutorial sections
            allSections.forEach((section, index) => {
                originalDisplay[index] = section.style.display;
                const sectionId = section.id;
                
                if (tutorialSections.includes(sectionId)) {
                    section.style.display = 'block';
                    
                    // Expand all tutorial content
                    const tutorialContents = section.querySelectorAll('.tutorial-content');
                    tutorialContents.forEach(content => {
                        content.style.display = 'block';
                    });
                } else if (sectionId === 'dashboard') {
                    // Show only hero section of dashboard
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
            
            // Wait for content to be ready
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Trigger print
            window.print();
            
            // Restore original state
            setTimeout(() => {
                // Remove table of contents
                const toc = document.getElementById('pdf-toc');
                if (toc) {
                    toc.remove();
                }
                
                // Restore sections
                allSections.forEach((section, index) => {
                    section.style.display = originalDisplay[index] || '';
                    
                    // Hide tutorial contents again
                    const tutorialContents = section.querySelectorAll('.tutorial-content');
                    tutorialContents.forEach(content => {
                        content.style.display = 'none';
                    });
                });
                
                document.title = originalTitle;
            }, 1000);
            
        } catch (error) {
            console.error('Error generating complete manual PDF:', error);
            document.title = originalTitle;
        }
    }

    createTableOfContents() {
        // Remove existing TOC if any
        const existingToc = document.getElementById('pdf-toc');
        if (existingToc) {
            existingToc.remove();
        }
        
        // Create table of contents
        const toc = document.createElement('div');
        toc.id = 'pdf-toc';
        toc.className = 'pdf-toc';
        toc.innerHTML = `
            <h1>BUKU MANUAL ADOBE</h1>
            <h2>Daftar Isi</h2>
            <ul>
                <li>1. Selamat Datang di Buku Manual Adobe</li>
                <li>2. Tutorial Adobe Acrobat Pro
                    <ul style="margin-left: 20px; margin-top: 5px;">
                        <li>2.1. Memulai dengan Adobe Acrobat Pro</li>
                        <li>2.2. Membuat File PDF</li>
                        <li>2.3. Mengedit Teks dan Gambar dalam PDF</li>
                        <li>2.4. Mengisi dan Menandatangani PDF</li>
                        <li>2.5. Ekspor PDF ke Format Lain</li>
                        <li>2.6. Berbagi dan Kolaborasi PDF</li>
                        <li>2.7. Optimasi dan Kompresi PDF</li>
                        <li>2.8. Aksesibilitas dalam PDF</li>
                    </ul>
                </li>
                <li>3. Panduan Pengguna Adobe Sign
                    <ul style="margin-left: 20px; margin-top: 5px;">
                        <li>3.1. Panduan Setup Pengguna Baru</li>
                        <li>3.2. Mengirim Perjanjian untuk Ditandatangani</li>
                        <li>3.3. Mengelola Perjanjian Anda</li>
                        <li>3.4. Panduan Setup Cepat untuk Administrator</li>
                        <li>3.5. Library Tutorial Video Adobe Sign</li>
                        <li>3.6. Integrasi Adobe Sign untuk Salesforce</li>
                        <li>3.7. Developer Guide dan SDK</li>
                        <li>3.8. Customer Support Resources</li>
                    </ul>
                </li>
            </ul>
            <div style="margin-top: 30pt; text-align: center; font-style: italic;">
                <p>© 2025 Buku Manual Adobe. Semua hak dilindungi.</p>
                <p>Panduan lengkap untuk Adobe Acrobat Pro, Adobe Sign, dan solusi digital VIDA.</p>
            </div>
        `;
        
        // Insert TOC at the beginning of main content
        const mainContent = document.querySelector('.main .container');
        mainContent.insertBefore(toc, mainContent.firstChild);
    }

    // Utility method to show print preview (for testing)
    showPrintPreview(section) {
        if (section) {
            this.generatePDF(section);
        } else {
            this.downloadAllAsPDF();
        }
    }
}

// Initialize PDF Generator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize PDF generator
    window.pdfGenerator = new PDFGenerator();
    console.log('PDF Generator ready');
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PDFGenerator;
}
