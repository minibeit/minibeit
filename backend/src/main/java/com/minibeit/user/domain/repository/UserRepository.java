package com.minibeit.user.domain.repository;

import com.minibeit.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {
    Optional<User> findByNickname(String nickname);

    List<User> findByNicknameStartsWith(String nickname);

    boolean existsByNickname(String nickname);

    Optional<User> findByTestId(String id);
}
