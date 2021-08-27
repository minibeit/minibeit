package com.minibeit.user.domain.repository;

import com.minibeit.user.domain.User;
import com.minibeit.user.domain.UserSchool;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserSchoolRepository extends JpaRepository<UserSchool, Long> {
    List<UserSchool> findAllByCreatedBy(User user);
}
