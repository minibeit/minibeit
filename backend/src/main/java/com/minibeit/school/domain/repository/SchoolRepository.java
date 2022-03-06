package com.minibeit.school.domain.repository;

import com.minibeit.school.domain.School;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SchoolRepository extends JpaRepository<School, Long> {
    List<School> findByNameStartsWith(String name);
}
