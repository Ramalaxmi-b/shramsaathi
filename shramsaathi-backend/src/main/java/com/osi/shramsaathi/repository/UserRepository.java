package com.osi.shramsaathi.repository;

import com.osi.shramsaathi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByWorkTypeAndDistrict(String workType, String district);
}
// This interface extends JpaRepository to provide CRUD operations for User entities.
// It includes a custom method to find users by their work type and district.   
