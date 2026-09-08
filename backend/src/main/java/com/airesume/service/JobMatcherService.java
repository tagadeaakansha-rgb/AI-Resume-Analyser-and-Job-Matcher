package com.airesume.service;

import com.airesume.dto.JobMatchDto;
import com.airesume.dto.JobRecommendationRequestDto;
import com.airesume.entity.JobListing;
import com.airesume.repository.JobListingRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class JobMatcherService {

    private final JobListingRepository jobListingRepository;

    public JobMatcherService(JobListingRepository jobListingRepository) {
        this.jobListingRepository = jobListingRepository;
    }

    public List<JobMatchDto> matchJobs(JobRecommendationRequestDto request) {
        List<String> candidateSkills = request.getSkills() != null ? request.getSkills() : Collections.emptyList();
        List<JobListing> allJobs = jobListingRepository.findAll();

        // Filter by workType, experienceLevel, category if provided
        List<JobListing> filtered = allJobs.stream()
                .filter(job -> request.getWorkType() == null || request.getWorkType().isEmpty() ||
                        job.getWorkType().equalsIgnoreCase(request.getWorkType()))
                .filter(job -> request.getExperienceLevel() == null || request.getExperienceLevel().isEmpty() ||
                        job.getExperienceLevel().equalsIgnoreCase(request.getExperienceLevel()))
                .filter(job -> request.getCategory() == null || request.getCategory().isEmpty() ||
                        job.getCategory().equalsIgnoreCase(request.getCategory()))
                .collect(Collectors.toList());

        List<JobMatchDto> matches = new ArrayList<>();
        Set<String> normalizedCandidate = candidateSkills.stream()
                .map(this::normalizeSkill)
                .collect(Collectors.toSet());

        for (JobListing job : filtered) {
            List<String> requiredList = parseSkills(job.getRequiredSkills());
            List<String> preferredList = parseSkills(job.getPreferredSkills());

            List<String> matchedReq = new ArrayList<>();
            List<String> missingReq = new ArrayList<>();

            for (String req : requiredList) {
                if (hasSkillMatch(normalizedCandidate, req)) {
                    matchedReq.add(req);
                } else {
                    missingReq.add(req);
                }
            }

            List<String> matchedPref = new ArrayList<>();
            for (String pref : preferredList) {
                if (hasSkillMatch(normalizedCandidate, pref)) {
                    matchedPref.add(pref);
                }
            }

            int reqTotal = Math.max(1, requiredList.size());
            int prefTotal = preferredList.size();

            double reqScore = ((double) matchedReq.size() / reqTotal) * 85.0;
            double prefScore = prefTotal > 0 ? (((double) matchedPref.size() / prefTotal) * 15.0) : 0.0;
            int totalPercent = Math.min(99, Math.max(15, (int) Math.round(reqScore + prefScore)));

            String tier;
            if (totalPercent >= 70) {
                tier = "Strong Match";
            } else if (totalPercent >= 45) {
                tier = "Good Match";
            } else {
                tier = "Potential Match";
            }

            String aiAdvice = generateMatchAdvice(job.getTitle(), job.getCompany(), missingReq, matchedReq);

            List<String> allMatched = new ArrayList<>(matchedReq);
            allMatched.addAll(matchedPref);

            matches.add(JobMatchDto.builder()
                    .job(job)
                    .matchPercentage(totalPercent)
                    .matchedSkills(allMatched)
                    .missingSkills(missingReq)
                    .matchTier(tier)
                    .aiRecommendation(aiAdvice)
                    .build());
        }

        // Sort descending by match percentage
        matches.sort((a, b) -> Integer.compare(b.getMatchPercentage(), a.getMatchPercentage()));
        return matches;
    }

    private List<String> parseSkills(String raw) {
        if (raw == null || raw.trim().isEmpty()) {
            return Collections.emptyList();
        }
        return Arrays.stream(raw.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());
    }

    private boolean hasSkillMatch(Set<String> candidateSkills, String requiredSkill) {
        String normReq = normalizeSkill(requiredSkill);
        if (candidateSkills.contains(normReq)) {
            return true;
        }
        for (String c : candidateSkills) {
            if (c.contains(normReq) || normReq.contains(c)) {
                return true;
            }
        }
        return false;
    }

    private String normalizeSkill(String skill) {
        if (skill == null) return "";
        String s = skill.trim().toLowerCase()
                .replace(".js", "")
                .replace(" ", "")
                .replace("-", "");
        if (s.equals("golang")) return "go";
        if (s.equals("reactjs")) return "react";
        if (s.equals("nodejs")) return "node";
        if (s.equals("springboot")) return "spring";
        if (s.equals("restapi")) return "rest";
        return s;
    }

    private String generateMatchAdvice(String title, String company, List<String> missing, List<String> matched) {
        if (missing.isEmpty()) {
            return String.format("You possess all core required skills for this %s opening at %s. Highlight your accomplishments with %s to secure priority interview screening.",
                    title, company, matched.isEmpty() ? "these technologies" : matched.get(0));
        } else {
            return String.format("To increase your match rate for %s at %s, emphasize experience or coursework in %s on your resume.",
                    title, company, String.join(", ", missing.subList(0, Math.min(2, missing.size()))));
        }
    }
}
