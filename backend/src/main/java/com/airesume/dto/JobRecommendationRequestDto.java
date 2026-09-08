package com.airesume.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobRecommendationRequestDto {
    private Long resumeId;
    private List<String> skills;
    private String workType; // Optional filter
    private String experienceLevel; // Optional filter
    private String category; // Optional filter
}
