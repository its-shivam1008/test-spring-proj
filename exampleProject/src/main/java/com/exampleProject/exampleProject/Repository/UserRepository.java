package com.exampleProject.exampleProject.Repository;

import com.exampleProject.exampleProject.models.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByNameAndDob(String name, LocalDate dob);
    @Transactional
    void deleteByNameAndDob(String name, LocalDate dob);
}
