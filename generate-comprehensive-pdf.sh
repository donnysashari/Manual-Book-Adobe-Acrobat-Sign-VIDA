#!/bin/bash

# Script to compile all Adobe tutorial pages into one comprehensive PDF manual

echo "🚀 Compiling Complete Adobe Manual from All Tutorial Pages..."

# Set variables
BASE_DIR="/Users/donnysashari/Documents/GitHub/Manual Book Adobe Acrobat Sign VIDA"
OUTPUT_HTML="manual-komprehensif.html"
OUTPUT_PDF="Buku-Manual-Adobe-Komprehensif.pdf"

cd "$BASE_DIR"

echo "📋 Extracting content from all tutorial pages..."

# Tutorial files to compile (excluding VIDA content)
TUTORIAL_FILES=(
    "tutorial-membuat-pdf.html"
    "tutorial-edit-pdf.html"
    "tutorial-share-review-export.html"
    "tutorial-e-sign.html" 
    "tutorial-adobe-sign.html"
)

# Start creating comprehensive HTML file
echo "🔨 Building comprehensive HTML manual..."

cat > "$OUTPUT_HTML" << 'EOF'
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buku Manual Adobe - Komprehensif</title>
    <style>
        @page {
            margin: 2.5cm;
            size: A4;
            @bottom-center {
                content: "Buku Manual Adobe - Halaman " counter(page);
                font-size: 9pt;
                color: #666;
            }
        }
        
        body {
            font-family: "Times New Roman", serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #333;
            max-width: 100%;
            margin: 0;
            padding: 15px;
        }
        
        .cover {
            text-align: center;
            page-break-after: always;
            padding-top: 150px;
        }
        
        .cover h1 {
            font-size: 32pt;
            color: #dc143c;
            margin-bottom: 30pt;
            font-weight: bold;
        }
        
        .cover h2 {
            font-size: 18pt;
            color: #666;
            margin-bottom: 50pt;
            font-weight: normal;
        }
        
        h1 {
            color: #dc143c;
            font-size: 20pt;
            font-weight: bold;
            margin: 40pt 0 20pt 0;
            page-break-after: avoid;
            border-bottom: 3px solid #dc143c;
            padding-bottom: 10pt;
        }
        
        h2 {
            color: #dc143c;
            font-size: 16pt;
            font-weight: bold;
            margin: 30pt 0 15pt 0;
            page-break-after: avoid;
            border-bottom: 1px solid #dc143c;
            padding-bottom: 5pt;
        }
        
        h3 {
            color: #333;
            font-size: 14pt;
            font-weight: bold;
            margin: 25pt 0 10pt 0;
            page-break-after: avoid;
        }
        
        h4 {
            color: #555;
            font-size: 12pt;
            font-weight: bold;
            margin: 20pt 0 8pt 0;
        }
        
        h5 {
            color: #666;
            font-size: 11pt;
            font-weight: bold;
            margin: 15pt 0 5pt 0;
        }
        
        p, li {
            margin-bottom: 8pt;
            text-align: justify;
            line-height: 1.5;
        }
        
        ul, ol {
            margin: 12pt 0;
            padding-left: 30pt;
        }
        
        li {
            margin-bottom: 5pt;
        }
        
        .tutorial-section {
            page-break-before: always;
            margin-bottom: 40pt;
        }
        
        .content-box, .highlight-box, .info-box {
            background-color: #f8f9fa;
            border: 1px solid #dc143c;
            border-left: 4px solid #dc143c;
            padding: 20pt;
            margin: 20pt 0;
            page-break-inside: avoid;
        }
        
        .warning-box {
            background-color: #fff3cd;
            border: 1px solid #ffc107;
            border-left: 4px solid #ffc107;
            padding: 20pt;
            margin: 20pt 0;
            page-break-inside: avoid;
        }
        
        .tip-box {
            background-color: #d1ecf1;
            border: 1px solid #17a2b8;
            border-left: 4px solid #17a2b8;
            padding: 20pt;
            margin: 20pt 0;
            page-break-inside: avoid;
        }
        
        .feature-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15pt;
            margin: 15pt 0;
        }
        
        .feature-item {
            border: 1px solid #ddd;
            padding: 15pt;
            page-break-inside: avoid;
            background-color: #fafafa;
        }
        
        .method-item, .export-methods .method-item {
            border: 1px solid #ddd;
            padding: 10pt;
            margin: 10pt 0;
            page-break-inside: avoid;
        }
        
        .comparison-table table {
            width: 100%;
            border-collapse: collapse;
            margin: 15pt 0;
        }
        
        .comparison-table th, .comparison-table td {
            border: 1px solid #ddd;
            padding: 10pt;
            text-align: left;
        }
        
        .comparison-table th {
            background-color: #f8f9fa;
            font-weight: bold;
            color: #dc143c;
        }
        
        strong {
            color: #dc143c;
            font-weight: bold;
        }
        
        .steps {
            margin: 15pt 0;
        }
        
        .steps ol {
            counter-reset: step-counter;
        }
        
        .steps li {
            margin-bottom: 8pt;
            page-break-inside: avoid;
        }
        
        .breadcrumb, .nav, .header, .footer, .tutorial-navigation, .sidebar {
            display: none !important;
        }
        
        .hero {
            text-align: center;
            margin-bottom: 30pt;
            padding: 20pt;
            border: 2px solid #dc143c;
            background-color: #f8f9fa;
        }
        
        .tutorial-page-content {
            margin: 0;
            padding: 0;
        }
        
        .toc {
            page-break-after: always;
            margin-bottom: 30pt;
        }
        
        .toc h1 {
            text-align: center;
            border: none;
        }
        
        .toc ul {
            list-style-type: none;
            padding-left: 0;
        }
        
        .toc > ul > li {
            margin-bottom: 12pt;
            font-weight: bold;
            font-size: 12pt;
        }
        
        .toc ul ul {
            margin-top: 8pt;
            padding-left: 30pt;
        }
        
        .toc ul ul li {
            font-weight: normal;
            margin-bottom: 5pt;
            font-size: 11pt;
        }
        
        @media print {
            body {
                padding: 0;
            }
            .tutorial-section {
                page-break-before: always;
            }
        }
    </style>
</head>
<body>

    <!-- Cover Page -->
    <div class="cover">
        <h1>BUKU MANUAL ADOBE</h1>
        <h2>Panduan Komprehensif Adobe Acrobat Pro & Adobe Sign</h2>
        
        <div style="margin: 80pt 0;">
            <p style="font-size: 16pt; color: #666;">
                <strong>5 Tutorial Lengkap</strong><br>
                Dari Dokumentasi Resmi Adobe Indonesia<br>
                Membuat • Edit • Berbagi • E-Sign • Adobe Sign
            </p>
        </div>
        
        <div style="margin-top: 100pt; font-size: 12pt; color: #999;">
            <p>Versi Komprehensif • Desember 2024</p>
            <p>© 2024 Manual Book Adobe. Semua hak dilindungi.</p>
        </div>
    </div>

    <!-- Table of Contents -->
    <div class="toc">
        <h1>DAFTAR ISI</h1>
        
        <ul>
            <li>1. Tutorial Membuat PDF
                <ul>
                    <li>Overview dan Metode Pembuatan</li>
                    <li>PDF dari Halaman Kosong</li>
                    <li>Konversi Dokumen Office</li>
                    <li>Konversi File dan Email</li>
                    <li>Form PDF Interaktif</li>
                    <li>Tips Optimasi</li>
                </ul>
            </li>
            <li>2. Tutorial Edit PDF
                <ul>
                    <li>Edit Teks dan Format</li>
                    <li>Manipulasi Halaman</li>
                    <li>Edit Gambar dan Media</li>
                    <li>Watermark dan Background</li>
                    <li>OCR dan Text Recognition</li>
                    <li>Menggabung dan Memisah PDF</li>
                </ul>
            </li>
            <li>3. Tutorial Berbagi & Export
                <ul>
                    <li>Berbagi untuk Review</li>
                    <li>Proteksi dan Keamanan</li>
                    <li>Manajemen Dokumen Bersama</li>
                    <li>Export ke Format Lain</li>
                    <li>Best Practices Kolaborasi</li>
                </ul>
            </li>
            <li>4. Tutorial E-Sign Lengkap
                <ul>
                    <li>E-Sign vs Digital Signature</li>
                    <li>Setup Digital ID</li>
                    <li>Mengirim untuk E-Signature</li>
                    <li>Menandatangani Dokumen</li>
                    <li>Mengelola Agreement</li>
                    <li>Security dan Compliance</li>
                </ul>
            </li>
            <li>5. Tutorial Adobe Sign
                <ul>
                    <li>Setup dan Konfigurasi</li>
                    <li>Workflow Enterprise</li>
                    <li>Templates dan Automation</li>
                    <li>Integration dan API</li>
                    <li>Reporting dan Analytics</li>
                </ul>
            </li>
        </ul>
    </div>

EOF

# Function to extract content from tutorial pages
extract_tutorial_content() {
    local file=$1
    local title=$2
    
    echo "📖 Extracting content from: $file"
    
    # Extract hero section and main tutorial content, skip navigation elements
    sed -n '/<div class="hero">/,/<\/div>/p' "$file" | head -n -1 >> temp_content.html
    sed -n '/<div class="tutorial-page-content">/,/<\/div>$/p' "$file" | 
        sed '/<nav class="breadcrumb">/,/<\/nav>/d' |
        sed '/<section class="tutorial-navigation">/,/<\/section>/d' |
        sed '/<div class="tutorial-navigation">/,/<\/div>/d' |
        head -n -1 >> temp_content.html
}

# Extract content from each tutorial
for i in "${!TUTORIAL_FILES[@]}"; do
    file="${TUTORIAL_FILES[$i]}"
    
    if [ -f "$file" ]; then
        echo "    <div class=\"tutorial-section\">" >> "$OUTPUT_HTML"
        
        # Extract and add content
        extract_tutorial_content "$file"
        
        # Clean up and add the extracted content
        if [ -f "temp_content.html" ]; then
            cat temp_content.html >> "$OUTPUT_HTML"
            rm temp_content.html
        fi
        
        echo "    </div>" >> "$OUTPUT_HTML"
        echo "" >> "$OUTPUT_HTML"
    else
        echo "⚠️  Warning: File not found: $file"
    fi
done

# Close HTML
cat >> "$OUTPUT_HTML" << 'EOF'

</body>
</html>
EOF

echo "✅ Comprehensive HTML compiled: $OUTPUT_HTML"

# Convert to PDF using Chrome headless
echo "📄 Converting comprehensive manual to PDF..."

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
    --headless \
    --disable-gpu \
    --print-to-pdf="$OUTPUT_PDF" \
    --print-to-pdf-no-header \
    --no-margins \
    --run-all-compositor-stages-before-draw \
    --virtual-time-budget=45000 \
    "file://$BASE_DIR/$OUTPUT_HTML"

# Check if PDF was generated successfully
if [ -f "$OUTPUT_PDF" ]; then
    echo "✅ Comprehensive PDF generated successfully: $OUTPUT_PDF"
    
    # Get file size for confirmation
    FILE_SIZE=$(ls -lh "$OUTPUT_PDF" | awk '{print $5}')
    echo "📊 File size: $FILE_SIZE"
    
    # Count pages (approximation)
    PAGE_COUNT=$(pdfinfo "$OUTPUT_PDF" 2>/dev/null | grep Pages | awk '{print $2}' || echo "N/A")
    echo "📑 Estimated pages: $PAGE_COUNT"
    
    echo "🎉 Manual komprehensif Adobe telah berhasil di-compile!"
    echo "📂 Lokasi: $BASE_DIR/$OUTPUT_PDF"
    
    # Open PDF to preview
    echo "🔍 Opening comprehensive PDF for preview..."
    open "$OUTPUT_PDF"
    
    # Clean up temporary HTML
    if [ -f "$OUTPUT_HTML" ]; then
        echo "🧹 Cleaning up temporary files..."
        # rm "$OUTPUT_HTML" # Keep for debugging
    fi
    
else
    echo "❌ Error: Failed to generate comprehensive PDF"
    exit 1
fi

echo "✨ Comprehensive compilation completed!"
echo "📚 Manual includes: Membuat PDF, Edit PDF, Berbagi & Export, E-Sign, Adobe Sign"
echo "🚫 VIDA content excluded as requested"
