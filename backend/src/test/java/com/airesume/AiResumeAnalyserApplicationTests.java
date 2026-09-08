package com.airesume;

import com.airesume.dto.BenchmarkStatsDto;
import com.airesume.dto.JobMatchDto;
import com.airesume.dto.JobRecommendationRequestDto;
import com.airesume.dto.ResumeAnalysisResponseDto;
import com.airesume.service.BenchmarkTestService;
import com.airesume.service.ClaudeAiService;
import com.airesume.service.JobMatcherService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AiResumeAnalyserApplicationTests {

    @Autowired
    private ClaudeAiService claudeAiService;

    @Autowired
    private JobMatcherService jobMatcherService;

    @Autowired
    private BenchmarkTestService benchmarkTestService;

    @Test
    void contextLoads() {
        assertNotNull(claudeAiService);
        assertNotNull(jobMatcherService);
        assertNotNull(benchmarkTestService);
    }

    @Test
    void testLocalAiAnalysisAndSkillExtraction() {
        String sampleResume = """
                Sarah Connor
                sarah.connor@example.com | (555) 234-5678
                linkedin.com/in/sarah-connor | github.com/sarah-connor
                San Francisco, CA

                Summary:
                Senior Full Stack Java Engineer with 7 years of experience in microservices and cloud.

                Skills:
                Java, Spring Boot, React, MySQL, Docker, Kubernetes, AWS, REST API, Git, CI/CD

                Experience:
                Senior Engineer at CloudCorp (2020 - Present)
                • Spearheaded migration of legacy monolith to Spring Boot microservices, improving throughput by 40%.
                • Engineered resilient REST APIs backed by MySQL and Redis cache.
                • Automated Docker container deployments on Kubernetes clusters.
                """;

        ResumeAnalysisResponseDto dto = claudeAiService.analyzeWithLocalAiEngine(sampleResume, "Test_Resume.txt");

        assertNotNull(dto);
        assertEquals("Sarah Connor", dto.getCandidateName());
        assertEquals("sarah.connor@example.com", dto.getEmail());
        assertTrue(dto.getAtsScore() >= 70, "ATS score should be high for structured resume");
        assertTrue(dto.getTechnicalSkills().contains("Java"));
        assertTrue(dto.getTechnicalSkills().contains("Spring Boot"));
        assertTrue(dto.getTechnicalSkills().contains("React"));
        assertTrue(dto.getTechnicalSkills().contains("Docker"));
    }

    @Test
    void testJobRecommendationMatching() {
        JobRecommendationRequestDto req = new JobRecommendationRequestDto();
        req.setSkills(List.of("Java", "Spring Boot", "React", "MySQL", "Docker", "AWS"));

        List<JobMatchDto> matches = jobMatcherService.matchJobs(req);
        assertNotNull(matches);
        assertFalse(matches.isEmpty(), "Should return job matches");

        JobMatchDto topMatch = matches.get(0);
        assertTrue(topMatch.getMatchPercentage() >= 60, "Top match should have high %");
        assertNotNull(topMatch.getMatchedSkills());
    }

    @Test
    void testBenchmarkSuiteFiftyResumes() {
        BenchmarkStatsDto stats = benchmarkTestService.runBenchmarkSuite();
        assertNotNull(stats);
        assertTrue(stats.getTotalResumesTested() >= 50, "Should test 50+ resumes");
        assertTrue(stats.getOverallAccuracyRate() >= 95.0, "Accuracy should exceed 95%");
        assertTrue(stats.getParseSuccessRate() >= 99.0, "Parse success rate should be ~100%");
    }
}
