package com.minibeit.file.domain.repository;

import com.minibeit.file.domain.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Long> {
}
