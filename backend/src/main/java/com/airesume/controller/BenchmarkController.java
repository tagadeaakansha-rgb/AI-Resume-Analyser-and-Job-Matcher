package com.airesume.controller;

import com.airesume.dto.BenchmarkStatsDto;
import com.airesume.service.BenchmarkTestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/benchmark")
public class BenchmarkController {

    private final BenchmarkTestService benchmarkTestService;

    public BenchmarkController(BenchmarkTestService benchmarkTestService) {
        this.benchmarkTestService = benchmarkTestService;
    }

    /**
     * Get benchmark statistics demonstrating accuracy across 50+ resumes
     */
    @GetMapping("/stats")
    public ResponseEntity<BenchmarkStatsDto> getBenchmarkStats() {
        return ResponseEntity.ok(benchmarkTestService.getBenchmarkStats());
    }

    /**
     * Re-run live 50+ resume validation suite
     */
    @PostMapping("/run")
    public ResponseEntity<BenchmarkStatsDto> runBenchmarkLive() {
        return ResponseEntity.ok(benchmarkTestService.runBenchmarkSuite());
    }
}
