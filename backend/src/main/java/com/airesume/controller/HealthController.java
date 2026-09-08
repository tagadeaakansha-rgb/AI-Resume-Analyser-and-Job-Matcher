package com.airesume.controller;

import com.airesume.config.DataSourceConfig;
import com.airesume.dto.ClaudeApiConfigDto;
import com.airesume.repository.JobListingRepository;
import com.airesume.repository.ResumeAnalysisRepository;
import com.airesume.service.ClaudeAiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/system")
public class HealthController {

    private final DataSourceConfig dataSourceConfig;
    private final ClaudeAiService claudeAiService;
    private final JobListingRepository jobListingRepository;
    private final ResumeAnalysisRepository resumeAnalysisRepository;

    public HealthController(DataSourceConfig dataSourceConfig,
                            ClaudeAiService claudeAiService,
                            JobListingRepository jobListingRepository,
                            ResumeAnalysisRepository resumeAnalysisRepository) {
        this.dataSourceConfig = dataSourceConfig;
        this.claudeAiService = claudeAiService;
        this.jobListingRepository = jobListingRepository;
        this.resumeAnalysisRepository = resumeAnalysisRepository;
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getSystemStatus() {
        Map<String, Object> status = new LinkedHashMap<>();
        status.put("appName", "AI Resume Analyser & Job Searcher");
        status.put("status", "UP");
        status.put("database", dataSourceConfig.getActiveDatabaseType());
        status.put("claudeApiConfigured", claudeAiService.hasValidApiKey());
        status.put("claudeModel", claudeAiService.getEffectiveModel());
        status.put("jobsInDatabase", jobListingRepository.count());
        status.put("resumesAnalyzedCount", resumeAnalysisRepository.count());
        status.put("jvmFreeMemoryMb", Runtime.getRuntime().freeMemory() / (1024 * 1024));
        status.put("jvmTotalMemoryMb", Runtime.getRuntime().totalMemory() / (1024 * 1024));
        return ResponseEntity.ok(status);
    }

    @PostMapping("/claude-config")
    public ResponseEntity<Map<String, Object>> updateClaudeConfig(@RequestBody ClaudeApiConfigDto dto) {
        claudeAiService.setDynamicApiKey(dto.getApiKey(), dto.getModel());
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "Claude API configuration updated successfully.");
        response.put("claudeApiConfigured", claudeAiService.hasValidApiKey());
        response.put("activeModel", claudeAiService.getEffectiveModel());
        return ResponseEntity.ok(response);
    }
}
