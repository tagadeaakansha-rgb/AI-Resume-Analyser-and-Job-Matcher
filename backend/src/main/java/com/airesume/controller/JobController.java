package com.airesume.controller;

import com.airesume.dto.JobMatchDto;
import com.airesume.dto.JobRecommendationRequestDto;
import com.airesume.dto.ResumeAnalysisResponseDto;
import com.airesume.entity.JobListing;
import com.airesume.repository.JobListingRepository;
import com.airesume.service.JobMatcherService;
import com.airesume.service.ResumeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobListingRepository jobListingRepository;
    private final JobMatcherService jobMatcherService;
    private final ResumeService resumeService;

    public JobController(JobListingRepository jobListingRepository,
                         JobMatcherService jobMatcherService,
                         ResumeService resumeService) {
        this.jobListingRepository = jobListingRepository;
        this.jobMatcherService = jobMatcherService;
        this.resumeService = resumeService;
    }

    /**
     * Get all jobs with optional keyword search or filters
     */
    @GetMapping
    public ResponseEntity<List<JobListing>> getJobs(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String workType,
            @RequestParam(required = false) String experienceLevel) {

        if (search != null && !search.trim().isEmpty()) {
            return ResponseEntity.ok(jobListingRepository.searchJobs(search.trim()));
        }
        if (category != null && !category.trim().isEmpty()) {
            return ResponseEntity.ok(jobListingRepository.findByCategoryIgnoreCase(category.trim()));
        }
        if (workType != null && !workType.trim().isEmpty()) {
            return ResponseEntity.ok(jobListingRepository.findByWorkTypeIgnoreCase(workType.trim()));
        }
        if (experienceLevel != null && !experienceLevel.trim().isEmpty()) {
            return ResponseEntity.ok(jobListingRepository.findByExperienceLevelIgnoreCase(experienceLevel.trim()));
        }

        return ResponseEntity.ok(jobListingRepository.findAll());
    }

    /**
     * Get single job by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getJobById(@PathVariable Long id) {
        return jobListingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Create a new job listing
     */
    @PostMapping
    public ResponseEntity<JobListing> createJob(@RequestBody JobListing job) {
        JobListing saved = jobListingRepository.save(job);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * Match candidate skills against jobs and return ranked recommendations
     */
    @PostMapping("/recommendations")
    public ResponseEntity<?> getRecommendations(@RequestBody JobRecommendationRequestDto request) {
        // If resumeId provided without skills, fetch skills from saved analysis
        if (request.getResumeId() != null && (request.getSkills() == null || request.getSkills().isEmpty())) {
            Optional<ResumeAnalysisResponseDto> resumeOpt = resumeService.getAnalysisById(request.getResumeId());
            if (resumeOpt.isPresent()) {
                request.setSkills(resumeOpt.get().getTechnicalSkills());
            } else {
                return ResponseEntity.badRequest().body(Map.of("error", "Resume with ID " + request.getResumeId() + " not found."));
            }
        }

        List<JobMatchDto> matches = jobMatcherService.matchJobs(request);
        return ResponseEntity.ok(matches);
    }
}
