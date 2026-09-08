package com.airesume.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resume_analyses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResumeAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    private String candidateName;

    private String email;

    private String phone;

    private String location;

    private String linkedin;

    private String github;

    private String portfolio;

    @Column(columnDefinition = "TEXT")
    private String professionalSummary;

    // ATS Metrics
    private Integer atsScore; // 0-100

    private Integer keywordScore; // 0-100

    private Integer impactScore; // 0-100

    private Integer brevityScore; // 0-100

    private Integer formattingScore; // 0-100

    // Extracted Skills & Structured Data (JSON strings)
    @Column(columnDefinition = "TEXT")
    private String technicalSkillsJson;

    @Column(columnDefinition = "TEXT")
    private String softSkillsJson;

    @Column(columnDefinition = "TEXT")
    private String toolsAndFrameworksJson;

    @Column(columnDefinition = "TEXT")
    private String experienceSummaryJson;

    @Column(columnDefinition = "TEXT")
    private String educationSummaryJson;

    @Column(columnDefinition = "TEXT")
    private String strengthsJson;

    @Column(columnDefinition = "TEXT")
    private String weaknessesJson;

    @Column(columnDefinition = "TEXT")
    private String improvementTipsJson;

    @Column(columnDefinition = "TEXT")
    private String missingKeywordsJson;

    @Column(columnDefinition = "TEXT")
    private String claudeAiCritique;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String rawExtractedText;

    private String aiModelUsed; // claude-3-5-sonnet-20241022 or local-neural-engine

    private LocalDateTime analyzedAt;

    @PrePersist
    public void prePersist() {
        if (analyzedAt == null) {
            analyzedAt = LocalDateTime.now();
        }
    }
}
