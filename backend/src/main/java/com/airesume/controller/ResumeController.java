package com.airesume.controller;

import com.airesume.dto.ResumeAnalysisResponseDto;
import com.airesume.service.ResumeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    /**
     * Upload and analyze a PDF or text resume file
     */
    @PostMapping("/upload")
    public ResponseEntity<?> uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestHeader(value = "X-Claude-Api-Key", required = false) String apiKeyHeader) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Please upload a valid resume file."));
        }

        try {
            ResumeAnalysisResponseDto result = resumeService.processResumeFile(file, apiKeyHeader);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to parse PDF file: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Analysis failed: " + e.getMessage()));
        }
    }

    /**
     * Submit raw resume text (useful for demo presets or direct pasting)
     */
    @PostMapping("/upload-text")
    public ResponseEntity<?> uploadResumeText(
            @RequestBody Map<String, String> payload,
            @RequestHeader(value = "X-Claude-Api-Key", required = false) String apiKeyHeader) {

        String text = payload.get("text");
        String title = payload.getOrDefault("title", "Sample_Candidate.txt");

        if (text == null || text.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Resume text content cannot be empty."));
        }

        ResumeAnalysisResponseDto result = resumeService.processResumeText(text, title, apiKeyHeader);
        return ResponseEntity.ok(result);
    }

    /**
     * Retrieve all previous resume analyses from MySQL
     */
    @GetMapping("/history")
    public ResponseEntity<List<ResumeAnalysisResponseDto>> getHistory() {
        return ResponseEntity.ok(resumeService.getHistory());
    }

    /**
     * Retrieve a specific analysis by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getAnalysis(@PathVariable Long id) {
        return resumeService.getAnalysisById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Delete an analysis by ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAnalysis(@PathVariable Long id) {
        boolean deleted = resumeService.deleteAnalysis(id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "Analysis deleted successfully."));
        }
        return ResponseEntity.notFound().build();
    }
}
