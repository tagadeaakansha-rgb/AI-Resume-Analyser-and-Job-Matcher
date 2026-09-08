package com.airesume.config;

import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DriverManager;

@Configuration
public class DataSourceConfig {

    private static final Logger log = LoggerFactory.getLogger(DataSourceConfig.class);

    @Value("${spring.datasource.url:jdbc:mysql://localhost:3306/resume_analyser_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC}")
    private String mysqlUrl;

    @Value("${spring.datasource.username:root}")
    private String mysqlUsername;

    @Value("${spring.datasource.password:root}")
    private String mysqlPassword;

    private String activeDatabaseType = "UNKNOWN";

    @Bean
    @Primary
    public DataSource dataSource() {
        log.info("Testing connection to MySQL at: {}", mysqlUrl);
        boolean mysqlAvailable = false;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            try (Connection conn = DriverManager.getConnection(mysqlUrl, mysqlUsername, mysqlPassword)) {
                if (conn != null && !conn.isClosed()) {
                    mysqlAvailable = true;
                    log.info(" Successfully connected to MySQL 8.0 database!");
                }
            }
        } catch (Exception e) {
            log.warn(" Could not connect to MySQL ({}). Reason: {}", mysqlUrl, e.getMessage());
            log.info("➡️ Initiating automatic fallback to embedded H2 database so the application runs seamlessly.");
        }

        if (mysqlAvailable) {
            activeDatabaseType = "MySQL 8.0 (Connected)";
            HikariDataSource ds = new HikariDataSource();
            ds.setDriverClassName("com.mysql.cj.jdbc.Driver");
            ds.setJdbcUrl(mysqlUrl);
            ds.setUsername(mysqlUsername);
            ds.setPassword(mysqlPassword);
            ds.setMaximumPoolSize(10);
            ds.setMinimumIdle(2);
            ds.setPoolName("MySQL-ResumePool");
            return ds;
        } else {
            activeDatabaseType = "H2 Embedded (Zero-Config Fallback)";
            HikariDataSource ds = new HikariDataSource();
            ds.setDriverClassName("org.h2.Driver");
            ds.setJdbcUrl("jdbc:h2:mem:resume_analyser_db;DB_CLOSE_DELAY=-1;MODE=MySQL;DATABASE_TO_LOWER=TRUE");
            ds.setUsername("sa");
            ds.setPassword("");
            ds.setMaximumPoolSize(10);
            ds.setMinimumIdle(2);
            ds.setPoolName("H2-ResumePool");
            return ds;
        }
    }

    public String getActiveDatabaseType() {
        return activeDatabaseType;
    }
}
