package com.airesume.repository;

import com.airesume.entity.JobListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobListingRepository extends JpaRepository<JobListing, Long> {

    List<JobListing> findByWorkTypeIgnoreCase(String workType);

    List<JobListing> findByExperienceLevelIgnoreCase(String experienceLevel);

    List<JobListing> findByCategoryIgnoreCase(String category);

    @Query("SELECT j FROM JobListing j WHERE " +
           "LOWER(j.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(j.company) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(j.location) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(j.requiredSkills) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(j.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<JobListing> searchJobs(@Param("query") String query);
}
