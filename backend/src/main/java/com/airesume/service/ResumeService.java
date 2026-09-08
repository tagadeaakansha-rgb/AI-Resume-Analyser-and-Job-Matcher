package com.airesume.service;

import com.airesume.dto.ResumeAnalysisResponseDto;
import com.airesume.entity.ResumeAnalysis;
import com.airesume.repository.ResumeAnalysisRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ResumeService {

    private static final Logger log = LoggerFactory.getLogger(ResumeService.class);

    private final PdfParserService pdfParserService;
    private final ClaudeAiService claudeAiService;
    private final ResumeAnalysisRepository resumeAnalysisRepository;
    private final ObjectMapper objectMapper;

    public ResumeService(PdfParserService pdfParserService,
                         ClaudeAiService claudeAiService,
                         ResumeAnalysisRepository resumeAnalysisRepository,
                         ObjectMapper objectMapper) {
        this.pdfParserService = pdfParserService;
        this.claudeAiService = claudeAiService;
        this.resumeAnalysisRepository = resumeAnalysisRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public ResumeAnalysisResponseDto processResumeFile(MultipartFile file, String apiKeyHeader) throws IOException {
        String fileName = file.getOriginalFilename() != null ? file.getOriginalFilename() : "Uploaded_Resume.pdf";
        String extractedText = pdfParserService.extractText(file);
        return processAndSave(extractedText, fileName, apiKeyHeader);
    }

    @Transactional
    public ResumeAnalysisResponseDto processResumeText(String resumeText, String sampleTitle, String apiKeyHeader) {
        String fileName = (sampleTitle != null && !sampleTitle.isEmpty()) ? sampleTitle : "Sample_Resume.txt";
        return processAndSave(resumeText, fileName, apiKeyHeader);
    }

    private ResumeAnalysisResponseDto processAndSave(String rawText, String fileName, String apiKeyHeader) {
        ResumeAnalysisResponseDto dto = claudeAiService.analyzeResume(rawText, fileName, apiKeyHeader);

        // Convert to entity for MySQL persistence
        try {
            ResumeAnalysis entity = ResumeAnalysis.builder()
                    .fileName(fileName)
                    .candidateName(dto.getCandidateName())
                    .email(dto.getEmail())
                    .phone(dto.getPhone())
                    .location(dto.getLocation())
                    .linkedin(dto.getLinkedin())
                    .github(dto.getGithub())
                    .portfolio(dto.getPortfolio())
                    .professionalSummary(dto.getProfessionalSummary())
                    .atsScore(dto.getAtsScore())
                    .keywordScore(dto.getKeywordScore())
                    .impactScore(dto.getImpactScore())
                    .brevityScore(dto.getBrevityScore())
                    .formattingScore(dto.getFormattingScore())
                    .technicalSkillsJson(objectMapper.writeValueAsString(dto.getTechnicalSkills()))
                    .softSkillsJson(objectMapper.writeValueAsString(dto.getSoftSkills()))
                    .toolsAndFrameworksJson(objectMapper.writeValueAsString(dto.getToolsAndFrameworks()))
                    .experienceSummaryJson(objectMapper.writeValueAsString(dto.getExperienceSummary()))
                    .educationSummaryJson(objectMapper.writeValueAsString(dto.getEducationSummary()))
                    .strengthsJson(objectMapper.writeValueAsString(dto.getStrengths()))
                    .weaknessesJson(objectMapper.writeValueAsString(dto.getWeaknesses()))
                    .improvementTipsJson(objectMapper.writeValueAsString(dto.getImprovementTips()))
                    .missingKeywordsJson(objectMapper.writeValueAsString(dto.getMissingKeywords()))
                    .claudeAiCritique(dto.getClaudeAiCritique())
                    .rawExtractedText(rawText)
                    .aiModelUsed(dto.getAiModelUsed())
                    .build();

            ResumeAnalysis saved = resumeAnalysisRepository.save(entity);
            dto.setId(saved.getId());
            dto.setAnalyzedAt(saved.getAnalyzedAt());
            log.info("Saved resume analysis in MySQL with ID: {}", saved.getId());
        } catch (Exception e) {
            log.error("Error saving resume analysis to database: {}", e.getMessage(), e);
        }

        return dto;
    }

    public List<ResumeAnalysisResponseDto> getHistory() {
        return resumeAnalysisRepository.findAllByOrderByAnalyzedAtDesc().stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    public Optional<ResumeAnalysisResponseDto> getAnalysisById(Long id) {
        return resumeAnalysisRepository.findById(id).map(this::mapEntityToDto);
    }

    @Transactional
    public boolean deleteAnalysis(Long id) {
        if (resumeAnalysisRepository.existsById(id)) {
            resumeAnalysisRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private ResumeAnalysisResponseDto mapEntityToDto(ResumeAnalysis entity) {
        return ResumeAnalysisResponseDto.builder()
                .id(entity.getId())
                .fileName(entity.getFileName())
                .candidateName(entity.getCandidateName())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .location(entity.getLocation())
                .linkedin(entity.getLinkedin())
                .github(entity.getGithub())
                .portfolio(entity.getPortfolio())
                .professionalSummary(entity.getProfessionalSummary())
                .atsScore(entity.getAtsScore())
                .keywordScore(entity.getKeywordScore())
                .impactScore(entity.getImpactScore())
                .brevityScore(entity.getBrevityScore())
                .formattingScore(entity.getFormattingScore())
                .technicalSkills(deserializeList(entity.getTechnicalSkillsJson()))
                .softSkills(deserializeList(entity.getSoftSkillsJson()))
                .toolsAndFrameworks(deserializeList(entity.getToolsAndFrameworksJson()))
                .experienceSummary(deserializeList(entity.getExperienceSummaryJson()))
                .educationSummary(deserializeList(entity.getEducationSummaryJson()))
                .strengths(deserializeList(entity.getStrengthsJson()))
                .weaknesses(deserializeList(entity.getWeaknessesJson()))
                .improvementTips(deserializeList(entity.getImprovementTipsJson()))
                .missingKeywords(deserializeList(entity.getMissingKeywordsJson()))
                .claudeAiCritique(entity.getClaudeAiCritique())
                .rawExtractedText(entity.getRawExtractedText())
                .aiModelUsed(entity.getAiModelUsed())
                .analyzedAt(entity.getAnalyzedAt())
                .build();
    }

    private List<String> deserializeList(String json) {
        if (json == null || json.trim().isEmpty()) {
            return Collections.emptyList();
        }
        try {
            return objectMapper.readValue(json, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }
}
