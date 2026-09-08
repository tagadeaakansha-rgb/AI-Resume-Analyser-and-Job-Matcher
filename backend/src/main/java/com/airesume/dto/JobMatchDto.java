package com.airesume.dto;

import com.airesume.entity.JobListing;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobMatchDto {
    private JobListing job;
    private int matchPercentage; // 0-100
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private String matchTier; // Strong Match, Good Match, Potential Match
    private String aiRecommendation; // Custom advice to tailor resume for this job
}
