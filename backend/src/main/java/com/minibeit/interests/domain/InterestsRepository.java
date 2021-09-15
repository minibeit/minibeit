package com.minibeit.interests.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InterestsRepository extends JpaRepository<Interests, Long> {
    @Query("select i from Interests i where i.id in :interestsIds")
    List<Interests> findAllByIds(List<Long> interestsIds);
}
