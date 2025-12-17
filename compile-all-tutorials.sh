#!/bin/bash

# Script to compile all Adobe tutorial pages into one comprehensive PDF manual
# Version 2.0 - More robust content extraction

echo "🚀 Compiling Complete Adobe Manual from All Tutorial Pages (v2.0)..."

# Set variables
BASE_DIR="/Users/donnysashari/Documents/GitHub/Manual Book Adobe Acrobat Sign VIDA"
OUTPUT_HTML="manual-all-tutorials.html"
OUTPUT_PDF="Buku-Manual-Adobe-All-Tutorials.pdf"

cd "$BASE_DIR"

# Create comprehensive HTML with proper content extraction
cat > "$OUTPUT_HTML" << 'EOF'
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buku Manual Adobe - Semua Tutorial</title>
    <style>
        @page {
            margin: 2cm;
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
            margin: 0;
            padding: 15px;
        }
        
        .cover {
            text-align: center;
            page-break-after: always;
            padding-top: 120px;
        }
        
        .cover h1 {
            font-size: 28pt;
            color: #dc143c;
            margin-bottom: 30pt;
            font-weight: bold;
        }
        
        h1 {
            color: #dc143c;
            font-size: 18pt;
            font-weight: bold;
            margin: 35pt 0 15pt 0;
            page-break-after: avoid;
            border-bottom: 3px solid #dc143c;
            padding-bottom: 8pt;
        }
        
        h2 {
            color: #dc143c;
            font-size: 15pt;
            font-weight: bold;
            margin: 25pt 0 12pt 0;
            page-break-after: avoid;
            border-bottom: 1px solid #dc143c;
            padding-bottom: 4pt;
        }
        
        h3 {
            color: #333;
            font-size: 13pt;
            font-weight: bold;
            margin: 20pt 0 8pt 0;
            page-break-after: avoid;
        }
        
        h4 {
            color: #555;
            font-size: 12pt;
            font-weight: bold;
            margin: 15pt 0 6pt 0;
        }
        
        h5 {
            color: #666;
            font-size: 11pt;
            font-weight: bold;
            margin: 12pt 0 4pt 0;
        }
        
        p, li {
            margin-bottom: 6pt;
            text-align: justify;
            line-height: 1.5;
        }
        
        ul, ol {
            margin: 10pt 0;
            padding-left: 25pt;
        }
        
        li {
            margin-bottom: 4pt;
        }
        
        .tutorial-section {
            page-break-before: always;
            margin-bottom: 30pt;
        }
        
        .content-box, .highlight-box, .info-box, .feature-highlight {
            background-color: #f8f9fa;
            border: 1px solid #dc143c;
            border-left: 4px solid #dc143c;
            padding: 15pt;
            margin: 15pt 0;
            page-break-inside: avoid;
        }
        
        .warning-box {
            background-color: #fff3cd;
            border: 1px solid #ffc107;
            border-left: 4px solid #ffc107;
            padding: 15pt;
            margin: 15pt 0;
            page-break-inside: avoid;
        }
        
        .tip-box {
            background-color: #d1ecf1;
            border: 1px solid #17a2b8;
            border-left: 4px solid #17a2b8;
            padding: 15pt;
            margin: 15pt 0;
            page-break-inside: avoid;
        }
        
        .feature-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12pt;
            margin: 12pt 0;
        }
        
        .feature-item {
            border: 1px solid #ddd;
            padding: 12pt;
            page-break-inside: avoid;
        }
        
        .comparison-table table {
            width: 100%;
            border-collapse: collapse;
            margin: 12pt 0;
        }
        
        .comparison-table th, .comparison-table td {
            border: 1px solid #ddd;
            padding: 8pt;
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
            margin: 12pt 0;
        }
        
        .steps ol, .steps ul {
            margin-left: 20pt;
        }
        
        .steps li {
            margin-bottom: 6pt;
            page-break-inside: avoid;
        }
        
        .hero {
            text-align: center;
            margin-bottom: 25pt;
            padding: 15pt;
            border: 2px solid #dc143c;
            background-color: #f8f9fa;
        }
        
        .hero h2 {
            border: none;
            margin-top: 0;
            color: #dc143c;
        }
        
        /* Hide navigation elements */
        .breadcrumb, .nav, .header, .footer, .tutorial-navigation, .sidebar, .nav-grid, .nav-card {
            display: none !important;
        }
        
        .tutorial-subsection {
            margin: 20pt 0;
        }
        
        .export-methods {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10pt;
            margin: 10pt 0;
        }
        
        .method-item {
            border: 1px solid #ddd;
            padding: 10pt;
            page-break-inside: avoid;
        }
        
        @media print {
            body { padding: 0; }
        }
    </style>
</head>
<body>

    <!-- Cover Page -->
    <div class="cover">
        <h1>BUKU MANUAL ADOBE</h1>
        <h2 style="font-size: 16pt; color: #666; margin-bottom: 40pt;">Kompilasi Lengkap Semua Tutorial</h2>
        
        <div style="margin: 60pt 0;">
            <p style="font-size: 14pt; color: #666;">
                <strong>5 Tutorial Komprehensif</strong><br>
                Membuat PDF • Edit PDF • Berbagi & Export<br>
                E-Sign Lengkap • Adobe Sign Enterprise
            </p>
        </div>
        
        <div style="font-size: 11pt; color: #999; margin-top: 80pt;">
            <p>Kompilasi dari Tutorial Resmi Adobe Indonesia</p>
            <p>Versi All-Tutorials • Desember 2024</p>
        </div>
    </div>

EOF

# Function to extract main content from each tutorial page
extract_main_content() {
    local file=$1
    echo "📄 Processing: $file"
    
    # Use Node.js to parse HTML and extract content properly
    cat > extract_content.js << 'JSEOF'
const fs = require('fs');

const file = process.argv[2];
const html = fs.readFileSync(file, 'utf8');

// Extract hero section
const heroMatch = html.match(/<div class="hero">[\s\S]*?<\/div>/);
if (heroMatch) {
    console.log(heroMatch[0]);
}

// Extract tutorial page content, excluding navigation
let content = html.match(/<div class="tutorial-page-content">[\s\S]*?<\/div>\s*<\/div>\s*<\/main>/);
if (content) {
    let cleanContent = content[0]
        .replace(/<nav class="breadcrumb">[\s\S]*?<\/nav>/, '')
        .replace(/<section class="tutorial-navigation">[\s\S]*?<\/section>/, '')
        .replace(/<div class="tutorial-navigation">[\s\S]*?<\/div>/, '')
        .replace(/<a href="[^"]*" class="nav-card">[\s\S]*?<\/a>/g, '')
        .replace(/<div class="nav-grid">[\s\S]*?<\/div>/, '')
        .replace(/(<\/div>\s*){2,3}<\/main>$/, '');
    
    console.log(cleanContent);
}
JSEOF

    node extract_content.js "$file" >> "$OUTPUT_HTML"
    rm extract_content.js
}

# Process each tutorial file
TUTORIAL_FILES=(
    "tutorial-membuat-pdf.html"
    "tutorial-edit-pdf.html" 
    "tutorial-share-review-export.html"
    "tutorial-e-sign.html"
    "tutorial-adobe-sign.html"
)

echo "📚 Processing tutorial files..."

for file in "${TUTORIAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "    <div class=\"tutorial-section\">" >> "$OUTPUT_HTML"
        extract_main_content "$file"
        echo "    </div>" >> "$OUTPUT_HTML"
    else
        echo "⚠️  File not found: $file"
    fi
done

# Close HTML
echo "</body></html>" >> "$OUTPUT_HTML"

echo "✅ Comprehensive HTML created: $OUTPUT_HTML"

# Convert to PDF
echo "📖 Converting to PDF..."

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
    --headless \
    --disable-gpu \
    --print-to-pdf="$OUTPUT_PDF" \
    --print-to-pdf-no-header \
    --no-margins \
    --run-all-compositor-stages-before-draw \
    --virtual-time-budget=60000 \
    "file://$BASE_DIR/$OUTPUT_HTML"

if [ -f "$OUTPUT_PDF" ]; then
    FILE_SIZE=$(ls -lh "$OUTPUT_PDF" | awk '{print $5}')
    echo "✅ PDF generated: $OUTPUT_PDF ($FILE_SIZE)"
    echo "📍 Location: $BASE_DIR/$OUTPUT_PDF"
    open "$OUTPUT_PDF"
else
    echo "❌ Failed to generate PDF"
    exit 1
fi

echo "🎉 All tutorials compiled successfully!"
echo "📋 Included: Membuat PDF, Edit PDF, Berbagi & Export, E-Sign, Adobe Sign"
echo "🚫 VIDA content excluded as requested"
