package com.airesume.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BenchmarkStatsDto {
    private int totalResumesTested;
    private double overallAccuracyRate;
    private double skillExtractionPrecision;
    private double atsScoringConsistency;
    private double parseSuccessRate;
    private int averageProcessingTimeMs;
    private Map<String, Integer> testedByDomain;
    private List<BenchmarkCaseResultDto> recentTestResults;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BenchmarkCaseResultDto {
        private String id;
        private String domain;
        private String resumeRole;
        private int skillsIdentified;
        private int atsScore;
        private boolean passed;
        private String benchmarkNotes;
    }
}
