package com.airesume.config;

import com.airesume.entity.JobListing;
import com.airesume.repository.JobListingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);
    private final JobListingRepository jobListingRepository;

    public DataSeeder(JobListingRepository jobListingRepository) {
        this.jobListingRepository = jobListingRepository;
    }

    @Override
    public void run(String... args) {
        if (jobListingRepository.count() > 0) {
            log.info("Database already populated with {} job listings.", jobListingRepository.count());
            return;
        }

        log.info("Seeding database with 32 realistic high-tech job listings across AI, Software Engineering, Cloud, and Data...");

        List<JobListing> jobs = Arrays.asList(
                // 1. Full-Stack & Java
                JobListing.builder()
                        .title("Senior Full-Stack Java Engineer")
                        .company("Nexus AI Cloud Systems")
                        .location("San Francisco, CA / Remote")
                        .workType("Remote")
                        .experienceLevel("Senior")
                        .salaryRange("$155,000 - $190,000")
                        .category("Software Engineering")
                        .requiredSkills("Java, Spring Boot, React, MySQL, Docker, REST API, Microservices")
                        .preferredSkills("AWS, Kubernetes, Kafka, TypeScript, GraphQL")
                        .description("Join our core cloud services team architecting scalable multi-tenant SaaS platforms handling 100M+ monthly transactions. You will lead full-stack feature delivery from high-performance Spring Boot microservices to responsive React interfaces.")
                        .applyUrl("https://nexus-cloud.careers/apply/eng-101")
                        .build(),

                JobListing.builder()
                        .title("Principal Cloud Java Architect")
                        .company("Stripe Financial Systems")
                        .location("New York, NY / Hybrid")
                        .workType("Hybrid")
                        .experienceLevel("Lead")
                        .salaryRange("$185,000 - $230,000")
                        .category("Software Engineering")
                        .requiredSkills("Java, Spring Boot, Microservices, AWS, Docker, Kubernetes, MySQL, Kafka")
                        .preferredSkills("Terraform, Redis, Distributed Systems, CI/CD, Agile")
                        .description("Lead the design and architectural evolution of Stripe's distributed ledger and checkout microservices. Mentor engineering teams and optimize sub-millisecond payment processing engines.")
                        .applyUrl("https://stripe.com/jobs/lead-java-architect")
                        .build(),

                JobListing.builder()
                        .title("Full-Stack React & Node Developer")
                        .company("Vercel Ecosystem Labs")
                        .location("Remote (US / Global)")
                        .workType("Remote")
                        .experienceLevel("Mid")
                        .salaryRange("$130,000 - $160,000")
                        .category("Software Engineering")
                        .requiredSkills("React, TypeScript, Node.js, Next.js, Tailwind CSS, PostgreSQL, REST API")
                        .preferredSkills("GraphQL, Redis, Docker, Jest, AWS")
                        .description("Build developer-first cloud deployment dashboards and real-time telemetry tools. Craft blazing fast WebGL and reactive interfaces using React and TypeScript.")
                        .applyUrl("https://vercel.com/careers/fullstack-engineer")
                        .build(),

                // 2. AI / ML / Claude & LLM Roles
                JobListing.builder()
                        .title("Generative AI & LLM Solutions Engineer")
                        .company("Anthropic Frontier Lab")
                        .location("San Francisco, CA")
                        .workType("Hybrid")
                        .experienceLevel("Senior")
                        .salaryRange("$175,000 - $225,000")
                        .category("AI & Machine Learning")
                        .requiredSkills("Python, PyTorch, LLM, Claude API, Docker, FastAPI, PostgreSQL, REST API")
                        .preferredSkills("LangChain, Vector Databases, AWS, Kubernetes, Prompt Engineering, Git")
                        .description("Design and scale generative AI applications utilizing Claude 3.5 Sonnet and state-of-the-art foundation models. Build robust agentic workflows, multi-modal reasoning engines, and production inference APIs.")
                        .applyUrl("https://anthropic.com/careers/genai-engineer")
                        .build(),

                JobListing.builder()
                        .title("Senior Machine Learning Engineer")
                        .company("Databricks AI")
                        .location("Seattle, WA / Remote")
                        .workType("Remote")
                        .experienceLevel("Senior")
                        .salaryRange("$165,000 - $210,000")
                        .category("AI & Machine Learning")
                        .requiredSkills("Python, Scikit-learn, PyTorch, Spark, SQL, Docker, AWS")
                        .preferredSkills("MLflow, Kubernetes, Kafka, CI/CD, Linux")
                        .description("Develop scalable distributed ML pipelines on Databricks Lakehouse. Optimize model training, feature store ingestion, and real-time scoring for Fortune 500 predictive analytics workloads.")
                        .applyUrl("https://databricks.com/company/careers/mle-senior")
                        .build(),

                JobListing.builder()
                        .title("AI Research Scientist (NLP & Speech)")
                        .company("DeepMind Horizons")
                        .location("New York, NY / London")
                        .workType("On-site")
                        .experienceLevel("Lead")
                        .salaryRange("$200,000 - $270,000")
                        .category("AI & Machine Learning")
                        .requiredSkills("Python, PyTorch, NLP, Transformers, Linux, Git, Mathematics")
                        .preferredSkills("C++, CUDA, Distributed Training, Research Publications")
                        .description("Push the frontiers of multi-modal language comprehension and acoustic reasoning. Collaborate with world-renowned AI scientists to publish breakthrough research and deploy state-of-the-art architectures.")
                        .applyUrl("https://deepmind.google/careers/research-nlp")
                        .build(),

                // 3. Cloud & DevOps
                JobListing.builder()
                        .title("Lead Cloud DevOps & Platform Architect")
                        .company("HashiCorp Infrastructure")
                        .location("Austin, TX / Remote")
                        .workType("Remote")
                        .experienceLevel("Senior")
                        .salaryRange("$160,000 - $195,000")
                        .category("Cloud & DevOps")
                        .requiredSkills("AWS, Terraform, Kubernetes, Docker, CI/CD, Linux, GitHub Actions")
                        .preferredSkills("Python, Go, Prometheus, Helm, Security Compliance")
                        .description("Orchestrate immutable multi-region cloud infrastructure on AWS. Drive GitOps transformation, zero-downtime cluster upgrades, and automated infrastructure as code across dozens of engineering squads.")
                        .applyUrl("https://hashicorp.com/jobs/lead-cloud-platform")
                        .build(),

                JobListing.builder()
                        .title("Site Reliability Engineer (SRE)")
                        .company("Netflix Streaming Platforms")
                        .location("Los Gatos, CA / Remote")
                        .workType("Remote")
                        .experienceLevel("Senior")
                        .salaryRange("$170,000 - $215,000")
                        .category("Cloud & DevOps")
                        .requiredSkills("Linux, Docker, Kubernetes, AWS, Python, CI/CD, Microservices")
                        .preferredSkills("Java, Go, Kafka, Observability, Chaos Engineering")
                        .description("Ensure 99.999% availability for Netflix's global media delivery mesh. Implement automated self-healing clusters, canary traffic deployments, and real-time telemetry.")
                        .applyUrl("https://netflix.com/jobs/sre-streaming")
                        .build(),

                JobListing.builder()
                        .title("Cloud Infrastructure Engineer")
                        .company("Cloudflare Edge Mesh")
                        .location("Austin, TX")
                        .workType("Hybrid")
                        .experienceLevel("Mid")
                        .salaryRange("$125,000 - $155,000")
                        .category("Cloud & DevOps")
                        .requiredSkills("Linux, Docker, Kubernetes, Terraform, Go, CI/CD, Git")
                        .preferredSkills("Python, Rust, BGP, WireGuard, Prometheus")
                        .description("Deploy and maintain low-latency edge services spanning 300+ cities globally. Automate container orchestration and protect against distributed DDoS threats.")
                        .applyUrl("https://cloudflare.com/careers/infra-eng")
                        .build(),

                // 4. Frontend & Design Systems
                JobListing.builder()
                        .title("Lead Frontend React Architect")
                        .company("Figma Interactive Tools")
                        .location("San Francisco, CA / Hybrid")
                        .workType("Hybrid")
                        .experienceLevel("Lead")
                        .salaryRange("$175,000 - $220,000")
                        .category("Software Engineering")
                        .requiredSkills("React, TypeScript, HTML5, CSS3, Tailwind CSS, Vite, Jest")
                        .preferredSkills("WebGL, Three.js, Canvas, WebAssembly, Design Systems")
                        .description("Pioneer next-generation collaborative design interfaces. Build high-performance canvas rendering engines, design tokens, and fluid 60fps micro-interactions.")
                        .applyUrl("https://figma.com/careers/lead-frontend")
                        .build(),

                JobListing.builder()
                        .title("Mobile App Specialist (React Native & Flutter)")
                        .company("Spotify Music Experience")
                        .location("Stockholm / Remote")
                        .workType("Remote")
                        .experienceLevel("Mid")
                        .salaryRange("$120,000 - $150,000")
                        .category("Software Engineering")
                        .requiredSkills("React, JavaScript, TypeScript, Mobile, REST API, Git")
                        .preferredSkills("Flutter, Swift, Kotlin, Redux, Audio Processing")
                        .description("Deliver seamless cross-platform mobile experiences enjoyed by over 600 million active listeners. Optimize audio streaming caches and personalized discovery interfaces.")
                        .applyUrl("https://spotify.com/careers/mobile-engineer")
                        .build(),

                // 5. Backend & Distributed Systems
                JobListing.builder()
                        .title("High-Throughput Golang Backend Engineer")
                        .company("Uber Core Marketplace")
                        .location("San Francisco, CA / Remote")
                        .workType("Remote")
                        .experienceLevel("Senior")
                        .salaryRange("$165,000 - $205,000")
                        .category("Software Engineering")
                        .requiredSkills("Go, Golang, Docker, Kubernetes, MySQL, Redis, Microservices, gRPC")
                        .preferredSkills("Kafka, Cassandra, Linux, System Architecture")
                        .description("Build real-time dispatch and geo-spatial pricing services handling millions of concurrent trips and deliveries worldwide with sub-20ms SLAs.")
                        .applyUrl("https://uber.com/careers/golang-backend")
                        .build(),

                JobListing.builder()
                        .title("Junior / Associate Java Backend Developer")
                        .company("Apex FinTech Solutions")
                        .location("Chicago, IL / Hybrid")
                        .workType("Hybrid")
                        .experienceLevel("Entry")
                        .salaryRange("$85,000 - $105,000")
                        .category("Software Engineering")
                        .requiredSkills("Java, Spring Boot, MySQL, REST API, Git, JUnit")
                        .preferredSkills("Docker, HTML5, CSS3, JavaScript, Postman")
                        .description("Great opportunity for rising engineers to build high-performance transactional APIs under the guidance of veteran software architects. Comprehensive mentorship provided.")
                        .applyUrl("https://apexfintech.com/careers/jr-java")
                        .build(),

                // 6. Data Engineering
                JobListing.builder()
                        .title("Senior Big Data & Stream Processing Engineer")
                        .company("Snowflake Data Cloud")
                        .location("San Mateo, CA / Remote")
                        .workType("Remote")
                        .experienceLevel("Senior")
                        .salaryRange("$160,000 - $205,000")
                        .category("Data Engineering")
                        .requiredSkills("Java, Python, SQL, Kafka, Spark, Docker, AWS")
                        .preferredSkills("Snowflake, Kubernetes, Scala, Airflow, CI/CD")
                        .description("Engineer petabyte-scale real-time data streaming engines and automated ingestion pipelines for Snowflake's multi-cloud data marketplace.")
                        .applyUrl("https://snowflake.com/careers/senior-data-eng")
                        .build(),

                JobListing.builder()
                        .title("Analytics Engineer & Data Modeler")
                        .company("DoorDash Logistics")
                        .location("San Francisco, CA / Hybrid")
                        .workType("Hybrid")
                        .experienceLevel("Mid")
                        .salaryRange("$130,000 - $160,000")
                        .category("Data Engineering")
                        .requiredSkills("SQL, Python, PostgreSQL, Git, Tableau, Agile")
                        .preferredSkills("Snowflake, dbt, Airflow, Docker, Machine Learning")
                        .description("Transform raw delivery logistics telemetry into dimensional data models powering company-wide dispatch optimization algorithms and merchant dashboards.")
                        .applyUrl("https://doordash.com/careers/analytics-eng")
                        .build(),

                // 7. Cyber Security
                JobListing.builder()
                        .title("Application Security & DevSecOps Engineer")
                        .company("CrowdStrike Threat Intelligence")
                        .location("Austin, TX / Remote")
                        .workType("Remote")
                        .experienceLevel("Senior")
                        .salaryRange("$155,000 - $195,000")
                        .category("Cyber Security")
                        .requiredSkills("Linux, Docker, Kubernetes, AWS, Python, CI/CD, Git")
                        .preferredSkills("Java, OWASP, Penetration Testing, Terraform, SIEM")
                        .description("Protect mission-critical cloud pipelines and microservices from emerging cyber threats. Embed automated vulnerability scanners and enforce zero-trust security postures.")
                        .applyUrl("https://crowdstrike.com/careers/appsec-engineer")
                        .build(),

                JobListing.builder()
                        .title("Python Backend & API Engineer")
                        .company("Notion Productivity Labs")
                        .location("New York, NY / Remote")
                        .workType("Remote")
                        .experienceLevel("Mid")
                        .salaryRange("$135,000 - $165,000")
                        .category("Software Engineering")
                        .requiredSkills("Python, FastAPI, Django, PostgreSQL, Docker, Redis, REST API")
                        .preferredSkills("React, TypeScript, AWS, Celery, Git")
                        .description("Help shape the backend architecture of Notion's AI-enhanced workspace tools. Build resilient collaborative APIs and high-volume indexing engines.")
                        .applyUrl("https://notion.so/careers/backend-eng")
                        .build(),

                JobListing.builder()
                        .title("Senior QA Automation Architect (SDET)")
                        .company("Atlassian Cloud Systems")
                        .location("Mountain View, CA / Remote")
                        .workType("Remote")
                        .experienceLevel("Senior")
                        .salaryRange("$145,000 - $180,000")
                        .category("Software Engineering")
                        .requiredSkills("Java, Selenium, TestNG, Jenkins, REST API, Git, Docker")
                        .preferredSkills("Python, Cypress, Spring Boot, Postman, Kubernetes")
                        .description("Architect enterprise test automation frameworks ensuring high quality across Jira and Confluence cloud releases. Champion shift-left testing methodologies.")
                        .applyUrl("https://atlassian.com/careers/sdet-senior")
                        .build()
        );

        jobListingRepository.saveAll(jobs);
        log.info(" Successfully seeded {} job listings into the database!", jobs.size());
    }
}
