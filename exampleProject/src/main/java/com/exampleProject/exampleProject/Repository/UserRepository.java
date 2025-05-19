package com.exampleProject.exampleProject.Repository;

import com.exampleProject.exampleProject.models.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE " +
            "(CAST(u.id AS string) = :keyword) " +
            "OR (LOWER(u.name) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "OR (LOWER(u.designation) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<User> searchByKeyword(@Param("keyword") String keyword);
}
