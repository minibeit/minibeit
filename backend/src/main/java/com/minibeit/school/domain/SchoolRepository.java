package com.minibeit.school.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SchoolRepository extends JpaRepository<School, Long> {
    List<School> findByNameStartsWithOrderByIdDesc(String name);
}
