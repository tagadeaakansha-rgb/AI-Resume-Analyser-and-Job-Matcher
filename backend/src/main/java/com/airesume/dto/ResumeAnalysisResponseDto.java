package com.airesume.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeAnalysisResponseDto {
    private Long id;
    private String fileName;
    private String candidateName;
    private String email;
    private String phone;
    private String location;
    private String linkedin;
    private String github;
    private String portfolio;
    private String professionalSummary;

    // ATS Metrics
    private Integer atsScore;
    private Integer keywordScore;
    private Integer impactScore;
    private Integer brevityScore;
    private Integer formattingScore;

    // Structured Skills
    private List<String> technicalSkills;
    private List<String> softSkills;
    private List<String> toolsAndFrameworks;
    private Map<String, List<String>> skillsByCategory;

    // Experience & Education summaries
    private List<String> experienceSummary;
    private List<String> educationSummary;

    // Qualitative Feedback
    private List<String> strengths;
    private List<String> weaknesses;
    private List<String> improvementTips;
    private List<String> missingKeywords;
    private String claudeAiCritique;

    private String rawExtractedText;
    private String aiModelUsed;
    private LocalDateTime analyzedAt;
}
