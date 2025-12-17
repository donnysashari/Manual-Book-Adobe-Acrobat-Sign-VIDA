#!/bin/bash

# Script to generate PDF from HTML manual

echo "🚀 Generating PDF Manual Adobe..."

# Set variables
HTML_FILE="manual-lengkap.html"
PDF_FILE="Buku-Manual-Adobe-Lengkap.pdf"
BASE_DIR="/Users/donnysashari/Documents/GitHub/Manual Book Adobe Acrobat Sign VIDA"

cd "$BASE_DIR"

# Check if HTML file exists
if [ ! -f "$HTML_FILE" ]; then
    echo "❌ Error: HTML file not found: $HTML_FILE"
    exit 1
fi

echo "📄 Converting HTML to PDF using Chrome headless..."

# Convert HTML to PDF using Chrome headless
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
    --headless \
    --disable-gpu \
    --print-to-pdf="$PDF_FILE" \
    --print-to-pdf-no-header \
    --no-margins \
    --run-all-compositor-stages-before-draw \
    --virtual-time-budget=30000 \
    "file://$BASE_DIR/$HTML_FILE"

# Check if PDF was generated successfully
if [ -f "$PDF_FILE" ]; then
    echo "✅ PDF generated successfully: $PDF_FILE"
    
    # Get file size for confirmation
    FILE_SIZE=$(ls -lh "$PDF_FILE" | awk '{print $5}')
    echo "📊 File size: $FILE_SIZE"
    
    echo "🎉 Manual lengkap Adobe telah berhasil di-compile menjadi PDF!"
    echo "📂 Lokasi: $BASE_DIR/$PDF_FILE"
    
    # Open PDF to preview
    echo "🔍 Opening PDF for preview..."
    open "$PDF_FILE"
    
else
    echo "❌ Error: Failed to generate PDF"
    exit 1
fi

echo "✨ Process completed!"
