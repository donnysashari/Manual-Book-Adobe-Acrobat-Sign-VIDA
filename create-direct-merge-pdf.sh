#!/bin/bash

# Simple Direct PDF Generation - Merge All Tutorial Pages
echo "🚀 Creating Comprehensive PDF by Direct Page Merge..."

BASE_DIR="/Users/donnysashari/Documents/GitHub/Manual Book Adobe Acrobat Sign VIDA"
OUTPUT_PDF="Buku-Manual-Adobe-Complete-All.pdf"

cd "$BASE_DIR"

echo "📖 Converting each tutorial page to individual PDF first..."

# Convert each tutorial page to PDF first
tutorial_files=("tutorial-membuat-pdf.html" "tutorial-edit-pdf.html" "tutorial-share-review-export.html" "tutorial-e-sign.html" "tutorial-adobe-sign.html")
pdf_files=()

for tutorial in "${tutorial_files[@]}"; do
    if [ -f "$tutorial" ]; then
        pdf_name="${tutorial%.html}.pdf"
        echo "   Converting $tutorial to $pdf_name..."
        
        /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
            --headless \
            --disable-gpu \
            --print-to-pdf="$pdf_name" \
            --print-to-pdf-no-header \
            --no-margins \
            --run-all-compositor-stages-before-draw \
            --virtual-time-budget=60000 \
            --disable-web-security \
            --disable-extensions \
            --no-sandbox \
            "file://$BASE_DIR/$tutorial"
            
        if [ -f "$pdf_name" ]; then
            pages=$(pdfinfo "$pdf_name" 2>/dev/null | grep Pages | awk '{print $2}' || echo "0")
            echo "   ✅ $pdf_name created ($pages pages)"
            pdf_files+=("$pdf_name")
        else
            echo "   ❌ Failed to create $pdf_name"
        fi
    else
        echo "   ⚠️ $tutorial not found"
    fi
done

echo ""
echo "📑 Merging all tutorial PDFs into single comprehensive manual..."

if [ ${#pdf_files[@]} -gt 0 ]; then
    # Use Python to merge PDFs (requires PyPDF2)
    python3 -c "
import sys
try:
    from PyPDF2 import PdfMerger, PdfReader
    import os
    
    print('📚 Using PyPDF2 to merge PDFs...')
    merger = PdfMerger()
    
    pdf_files = ['${pdf_files[0]}'$(printf ", '%s'" "${pdf_files[@]:1}")']
    total_pages = 0
    
    for pdf_file in pdf_files:
        if os.path.exists(pdf_file):
            try:
                reader = PdfReader(pdf_file)
                pages = len(reader.pages)
                print(f'   Adding {pdf_file} ({pages} pages)')
                merger.append(pdf_file)
                total_pages += pages
            except Exception as e:
                print(f'   ❌ Error reading {pdf_file}: {e}')
        else:
            print(f'   ⚠️ {pdf_file} not found')
    
    if total_pages > 0:
        merger.write('$OUTPUT_PDF')
        merger.close()
        print(f'✅ Merged PDF created: $OUTPUT_PDF ({total_pages} total pages)')
    else:
        print('❌ No pages to merge')
        
except ImportError:
    print('❌ PyPDF2 not installed. Installing now...')
    import subprocess
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'PyPDF2'])
    print('✅ PyPDF2 installed. Please run the script again.')
"

    if [ -f "$OUTPUT_PDF" ]; then
        FILE_SIZE=$(ls -lh "$OUTPUT_PDF" | awk '{print $5}')
        PAGE_COUNT=$(pdfinfo "$OUTPUT_PDF" 2>/dev/null | grep Pages | awk '{print $2}' || echo "N/A")
        
        echo ""
        echo "🎉 Complete PDF Manual Generated!"
        echo "📄 File: $OUTPUT_PDF"
        echo "📊 Size: $FILE_SIZE"
        echo "📑 Pages: $PAGE_COUNT"
        echo "📍 Location: $BASE_DIR/$OUTPUT_PDF"
        
        # Show page breakdown
        echo ""
        echo "📋 Page breakdown by tutorial:"
        for pdf in "${pdf_files[@]}"; do
            if [ -f "$pdf" ]; then
                pages=$(pdfinfo "$pdf" 2>/dev/null | grep Pages | awk '{print $2}' || echo "0")
                echo "   $pdf: $pages pages"
            fi
        done
        
        # Clean up individual PDFs
        echo ""
        echo "🧹 Cleaning up individual PDF files..."
        for pdf in "${pdf_files[@]}"; do
            if [ -f "$pdf" ]; then
                rm "$pdf"
                echo "   Deleted $pdf"
            fi
        done
        
        # Open final PDF
        open "$OUTPUT_PDF"
        
        echo ""
        echo "✅ SUCCESS! All tutorial content merged into comprehensive manual."
        echo "💡 This approach preserves ALL original formatting and content from tutorial pages."
        echo "📈 Page count represents the actual full content from all 5 tutorials."
        
    else
        echo "❌ Failed to create merged PDF"
        echo "📋 Available individual PDFs:"
        for pdf in "${pdf_files[@]}"; do
            if [ -f "$pdf" ]; then
                pages=$(pdfinfo "$pdf" 2>/dev/null | grep Pages | awk '{print $2}' || echo "0")
                echo "   $pdf: $pages pages"
            fi
        done
    fi
    
else
    echo "❌ No PDFs were created successfully"
fi

echo ""
echo "🔍 Explanation: This method converts each tutorial HTML to PDF separately,"
echo "   then merges them to preserve ALL original content without any extraction issues."
