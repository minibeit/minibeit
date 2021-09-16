package com.minibeit.businessprofile.domain.repository;

import com.minibeit.businessprofile.domain.UserBusinessProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserBusinessProfileRepository extends JpaRepository<UserBusinessProfile, Long> {
    boolean existsByUserIdAndBusinessProfileId(Long userId, Long businessProfileId);

    @Query("select ub from UserBusinessProfile ub where ub.user.id in :userIdList and ub.businessProfile.id=:businessProfileId")
    List<UserBusinessProfile> findAllByUserIdListAndBusinessProfileId(List<Long> userIdList, Long businessProfileId);

    @Modifying
    @Query("delete from UserBusinessProfile ub where ub.user.id in :userIdList and ub.businessProfile.id=:businessProfileId")
    void deleteAllByIdAndBusinessProfileIdInQuery(List<Long> userIdList, Long businessProfileId);
}
