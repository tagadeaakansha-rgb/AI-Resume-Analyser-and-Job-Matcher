package com.airesume.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_listings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private String workType; // Remote, Hybrid, On-site

    @Column(nullable = false)
    private String experienceLevel; // Entry, Mid, Senior, Lead

    private String salaryRange;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String requiredSkills; // Comma separated

    @Column(columnDefinition = "TEXT")
    private String preferredSkills; // Comma separated

    private String applyUrl;

    private String category; // Software Engineering, AI/ML, DevOps, Data

    private LocalDateTime postedDate;

    @PrePersist
    public void prePersist() {
        if (postedDate == null) {
            postedDate = LocalDateTime.now();
        }
    }
}
