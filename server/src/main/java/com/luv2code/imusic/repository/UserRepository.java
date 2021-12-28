package com.luv2code.imusic.repository;

import com.luv2code.imusic.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Integer> {
    @Query("SELECT u FROM User u WHERE u.email = :email" )
    public User getUserByEmail(@Param("email") String email);

    @Query("SELECT u FROM User u WHERE CONCAT(u.id, ' ', u.username,' ', u.email )  LIKE %:keyword%")
    public Page<User> findAll(@Param("keyword") String keyword, @Param("pageable") Pageable pageable);

    @Query("SELECT u FROM User u WHERE u.verificationCode = ?1")
    public User findByVerificationCode(String code);
}
