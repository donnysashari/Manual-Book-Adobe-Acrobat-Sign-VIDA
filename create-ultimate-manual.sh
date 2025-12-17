#!/bin/bash

# Ultimate PDF Manual Generator - Extract ALL content from existing tutorials
echo "🚀 Creating Ultimate Comprehensive PDF Manual..."

BASE_DIR="/Users/donnysashari/Documents/GitHub/Manual Book Adobe Acrobat Sign VIDA"
OUTPUT_HTML="manual-ultimate-full.html"
OUTPUT_PDF="Buku-Manual-Adobe-Ultimate-Full.pdf"

cd "$BASE_DIR"

echo "📖 Extracting and compiling ALL tutorial content..."

# Create comprehensive HTML with all tutorial content
cat > "$OUTPUT_HTML" << 'EOF'
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buku Manual Adobe - Ultimate Comprehensive Edition</title>
    <style>
        @page {
            margin: 1.5cm;
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
            line-height: 1.5;
            color: #333;
            margin: 0;
            padding: 10px;
        }
        
        .cover-page {
            text-align: center;
            page-break-after: always;
            padding-top: 80px;
            height: 100vh;
        }
        
        .cover-page h1 {
            font-size: 28pt;
            color: #dc143c;
            margin-bottom: 30pt;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .cover-page h2 {
            font-size: 16pt;
            color: #666;
            margin-bottom: 50pt;
            line-height: 1.4;
        }
        
        .toc-page {
            page-break-after: always;
            padding: 15pt 0;
        }
        
        .toc-page h1 {
            text-align: center;
            color: #dc143c;
            font-size: 20pt;
            margin-bottom: 25pt;
            border-bottom: 3px solid #dc143c;
            padding-bottom: 8pt;
        }
        
        .toc-page ul {
            list-style-type: none;
            padding-left: 0;
        }
        
        .toc-page > ul > li {
            margin-bottom: 12pt;
            font-weight: bold;
            font-size: 12pt;
            color: #dc143c;
        }
        
        .tutorial-chapter {
            page-break-before: always;
            margin-bottom: 30pt;
        }
        
        .chapter-title {
            color: #dc143c;
            font-size: 18pt;
            font-weight: bold;
            margin: 0 0 20pt 0;
            padding: 15pt 0 10pt 0;
            border-bottom: 3px solid #dc143c;
            text-align: center;
        }
        
        h1 {
            color: #dc143c;
            font-size: 16pt;
            font-weight: bold;
            margin: 25pt 0 12pt 0;
            border-bottom: 2px solid #dc143c;
            padding-bottom: 6pt;
        }
        
        h2 {
            color: #dc143c;
            font-size: 14pt;
            font-weight: bold;
            margin: 20pt 0 10pt 0;
            border-bottom: 1px solid #dc143c;
            padding-bottom: 4pt;
        }
        
        h3 {
            color: #333;
            font-size: 12pt;
            font-weight: bold;
            margin: 15pt 0 8pt 0;
        }
        
        h4 {
            color: #555;
            font-size: 11pt;
            font-weight: bold;
            margin: 12pt 0 6pt 0;
        }
        
        p {
            margin-bottom: 6pt;
            text-align: justify;
            line-height: 1.4;
        }
        
        ul, ol {
            margin: 10pt 0;
            padding-left: 25pt;
        }
        
        li {
            margin-bottom: 4pt;
            line-height: 1.3;
        }
        
        .content-box {
            background-color: #f8f9fa;
            border: 2px solid #dc143c;
            border-radius: 6pt;
            padding: 15pt;
            margin: 15pt 0;
        }
        
        .highlight-box {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 12pt;
            margin: 12pt 0;
            border-radius: 0 6pt 6pt 0;
        }
        
        .tip-box {
            background-color: #d1ecf1;
            border-left: 4px solid #17a2b8;
            padding: 12pt;
            margin: 12pt 0;
            border-radius: 0 6pt 6pt 0;
        }
        
        .warning-box {
            background-color: #f8d7da;
            border-left: 4px solid #dc3545;
            padding: 12pt;
            margin: 12pt 0;
            border-radius: 0 6pt 6pt 0;
        }
        
        .feature-grid {
            display: block;
            margin: 12pt 0;
        }
        
        .feature-item {
            border: 1px solid #ddd;
            padding: 12pt;
            margin: 8pt 0;
            background-color: #fafafa;
            border-radius: 4pt;
        }
        
        .steps-container {
            background-color: #f0f8ff;
            border: 2px solid #4682b4;
            border-radius: 6pt;
            padding: 15pt;
            margin: 15pt 0;
        }
        
        strong {
            color: #dc143c;
            font-weight: bold;
        }
        
        .section-intro {
            background-color: #e8f4fd;
            border: 2px dashed #007bff;
            padding: 15pt;
            margin: 15pt 0;
            border-radius: 8pt;
            text-align: center;
            font-style: italic;
        }
        
        .navigation {
            display: none;
        }
        
        nav, .navbar {
            display: none;
        }
        
        .back-to-home {
            display: none;
        }
        
        @media print {
            body { padding: 0; }
            .tutorial-chapter { page-break-before: always; }
            .navigation { display: none !important; }
            nav { display: none !important; }
        }
    </style>
</head>
<body>

    <!-- Cover Page -->
    <div class="cover-page">
        <h1>BUKU MANUAL ADOBE</h1>
        <h2>Panduan Komprehensif dan Lengkap<br>Adobe Acrobat Pro & Adobe Sign<br><br>Ultimate Comprehensive Edition</h2>
        
        <div style="margin: 60pt 0; font-size: 12pt; color: #666;">
            <p><strong>Tutorial Mendalam dengan Langkah Detail</strong></p>
            <p>Mencakup Semua Aspek Manajemen Dokumen Digital</p>
            <p>Dari Pembuatan hingga Enterprise Workflow</p>
            <p>Konten Lengkap dari Semua Tutorial Pages</p>
        </div>
        
        <div style="margin-top: 80pt; font-size: 11pt; color: #999;">
            <p><strong>Ultimate Comprehensive Edition</strong></p>
            <p>Versi 4.0 • Desember 2024</p>
            <p>© 2024 Manual Book Adobe. Semua hak dilindungi.</p>
        </div>
    </div>

    <!-- Table of Contents -->
    <div class="toc-page">
        <h1>DAFTAR ISI LENGKAP</h1>
        
        <ul>
            <li>BAB I: Tutorial Membuat PDF</li>
            <li>BAB II: Tutorial Edit PDF</li>
            <li>BAB III: Tutorial Berbagi, Review & Export PDF</li>
            <li>BAB IV: Tutorial E-Sign & Digital Signature</li>
            <li>BAB V: Tutorial Adobe Sign Enterprise</li>
        </ul>
    </div>

EOF

# Function to extract and clean content from tutorial files
extract_tutorial_content() {
    local file_path="$1"
    local chapter_title="$2"
    local chapter_num="$3"
    
    if [ -f "$file_path" ]; then
        echo "📄 Extracting content from: $file_path"
        
        # Add chapter header
        cat >> "$OUTPUT_HTML" << EOF
    <!-- Chapter ${chapter_num}: ${chapter_title} -->
    <div class="tutorial-chapter">
        <div class="chapter-title">BAB ${chapter_num}: ${chapter_title}</div>
        
EOF

        # Extract body content, remove navigation and scripts
        node -e "
        const fs = require('fs');
        const path = '$file_path';
        
        try {
            let content = fs.readFileSync(path, 'utf8');
            
            // Remove DOCTYPE and html opening tag
            content = content.replace(/<!DOCTYPE[^>]*>/i, '');
            content = content.replace(/<html[^>]*>/i, '');
            content = content.replace(/<\/html>/i, '');
            
            // Remove head section completely
            content = content.replace(/<head[^>]*>[\s\S]*?<\/head>/i, '');
            
            // Remove opening and closing body tags but keep content
            content = content.replace(/<body[^>]*>/i, '');
            content = content.replace(/<\/body>/i, '');
            
            // Remove navigation elements
            content = content.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');
            content = content.replace(/<div[^>]*class=\"[^\"]*nav[^>]*>[\s\S]*?<\/div>/gi, '');
            content = content.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
            content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
            
            // Remove specific navigation classes
            content = content.replace(/<div[^>]*class=\"[^\"]*back-to-home[^>]*>[\s\S]*?<\/div>/gi, '');
            content = content.replace(/<a[^>]*href=\"index\.html[^>]*>[\s\S]*?<\/a>/gi, '');
            
            // Remove scripts
            content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
            
            // Clean up extra whitespace but preserve structure
            content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
            content = content.trim();
            
            console.log(content);
        } catch (error) {
            console.error('Error reading file:', error.message);
        }
        "
        
        # Close chapter div
        cat >> "$OUTPUT_HTML" << EOF
        
    </div>
    
EOF
        
    else
        echo "⚠️  File not found: $file_path"
    fi
}

# Extract content from all tutorial files
extract_tutorial_content "tutorial-membuat-pdf.html" "TUTORIAL MEMBUAT PDF" "I"
extract_tutorial_content "tutorial-edit-pdf.html" "TUTORIAL EDIT PDF" "II"  
extract_tutorial_content "tutorial-share-review-export.html" "TUTORIAL BERBAGI, REVIEW & EXPORT PDF" "III"
extract_tutorial_content "tutorial-e-sign.html" "TUTORIAL E-SIGN & DIGITAL SIGNATURE" "IV"
extract_tutorial_content "tutorial-adobe-sign.html" "TUTORIAL ADOBE SIGN ENTERPRISE" "V"

# Close HTML
cat >> "$OUTPUT_HTML" << 'EOF'

</body>
</html>
EOF

echo "✅ Ultimate comprehensive HTML created: $OUTPUT_HTML"

# Convert to PDF with maximum settings
echo "📖 Converting to PDF with maximum content processing..."

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
    --headless \
    --disable-gpu \
    --print-to-pdf="$OUTPUT_PDF" \
    --print-to-pdf-no-header \
    --no-margins \
    --run-all-compositor-stages-before-draw \
    --virtual-time-budget=180000 \
    --disable-web-security \
    --disable-extensions \
    --no-sandbox \
    --disable-dev-shm-usage \
    --memory-pressure-off \
    --max_old_space_size=4096 \
    "file://$BASE_DIR/$OUTPUT_HTML"

if [ -f "$OUTPUT_PDF" ]; then
    FILE_SIZE=$(ls -lh "$OUTPUT_PDF" | awk '{print $5}')
    PAGE_COUNT=$(pdfinfo "$OUTPUT_PDF" 2>/dev/null | grep Pages | awk '{print $2}' || echo "N/A")
    
    echo "✅ Ultimate PDF generated: $OUTPUT_PDF ($FILE_SIZE)"
    echo "📑 Total pages: $PAGE_COUNT"
    echo "📍 Location: $BASE_DIR/$OUTPUT_PDF"
    
    # Open PDF
    open "$OUTPUT_PDF"
    
    # Detailed comparison
    echo ""
    echo "📊 Comparison with all previous versions:"
    
    if [ -f "Buku-Manual-Adobe-All-Tutorials.pdf" ]; then
        PREV_PAGES_1=$(pdfinfo "Buku-Manual-Adobe-All-Tutorials.pdf" 2>/dev/null | grep Pages | awk '{print $2}' || echo "N/A")
        echo "   Version 1 (All Tutorials): $PREV_PAGES_1 pages"
    fi
    
    if [ -f "Buku-Manual-Adobe-Enhanced-Full.pdf" ]; then
        PREV_PAGES_2=$(pdfinfo "Buku-Manual-Adobe-Enhanced-Full.pdf" 2>/dev/null | grep Pages | awk '{print $2}' || echo "N/A")
        echo "   Version 2 (Enhanced): $PREV_PAGES_2 pages"  
    fi
    
    echo "   Version 3 (Ultimate): $PAGE_COUNT pages"
    echo ""
    
    # Show content size comparison
    HTML_SIZE=$(ls -lh "$OUTPUT_HTML" | awk '{print $5}')
    echo "📄 Source HTML size: $HTML_SIZE"
    
    # Count content elements
    HEADING_COUNT=$(grep -c "<h[1-6]" "$OUTPUT_HTML" || echo "0")
    PARAGRAPH_COUNT=$(grep -c "<p>" "$OUTPUT_HTML" || echo "0")
    LIST_COUNT=$(grep -c "<li>" "$OUTPUT_HTML" || echo "0")
    
    echo "📝 Content analysis:"
    echo "   Headings: $HEADING_COUNT"
    echo "   Paragraphs: $PARAGRAPH_COUNT"  
    echo "   List items: $LIST_COUNT"
    
else
    echo "❌ Failed to generate ultimate PDF"
    echo "📄 HTML file size: $(ls -lh "$OUTPUT_HTML" | awk '{print $5}')"
    echo "🔍 Let's check the HTML content..."
    head -50 "$OUTPUT_HTML"
    exit 1
fi

echo ""
echo "🎉 Ultimate Comprehensive PDF Manual Completed!"
echo "💡 This version extracts ALL content from existing tutorial pages:"
echo "   • Complete content from 5 comprehensive tutorials"
echo "   • No artificial limitations or page restrictions"
echo "   • Professional formatting with consistent styling"
echo "   • Extracted and cleaned content from actual tutorial files"
echo ""
echo "🔍 Script explanation: No 30-page limit - content length depends on source tutorials!"
echo "📈 To get more pages, we need to expand the tutorial content files themselves."
