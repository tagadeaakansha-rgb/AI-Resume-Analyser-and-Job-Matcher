package com.airesume.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class PdfParserService {

    private static final Logger log = LoggerFactory.getLogger(PdfParserService.class);

    public String extractText(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        if (originalFilename != null && originalFilename.toLowerCase().endsWith(".pdf")) {
            return extractTextFromPdf(file.getBytes());
        } else {
            // Text or markdown file fallback
            return new String(file.getBytes(), StandardCharsets.UTF_8);
        }
    }

    public String extractTextFromPdf(byte[] pdfBytes) throws IOException {
        log.info("Parsing PDF resume ({} bytes)...", pdfBytes.length);
        try (PDDocument document = Loader.loadPDF(pdfBytes)) {
            PDFTextStripper stripper = new PDFTextStripper();
            stripper.setSortByPosition(true);
            String extracted = stripper.getText(document);
            if (extracted == null || extracted.trim().isEmpty()) {
                log.warn("PDFBox extracted empty text. The PDF might contain images or scanned text.");
                return "Empty PDF content or scanned image PDF.";
            }
            return extracted.trim();
        } catch (Exception e) {
            log.error("Failed to parse PDF using PDFBox 3: {}", e.getMessage(), e);
            throw new IOException("Unable to parse PDF document: " + e.getMessage(), e);
        }
    }
}
