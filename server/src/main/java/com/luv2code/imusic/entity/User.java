package com.luv2code.imusic.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 128, nullable = false, unique = true)
    private String email;

    @Column(length = 64, nullable = false)
    private String password;

    @Column(length = 64, nullable = false)
    private String username;

    @Column(nullable = false)
    private boolean enabled;

    @Column(length = 64)
    private String photos;

    @Column(name = "verification_code", length = 64)
    private String verificationCode;

    @Column(name = "created_time")
    private Date createdTime;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_roles",
            joinColumns=
            @JoinColumn(name="user_id", referencedColumnName="id"),
            inverseJoinColumns=
            @JoinColumn(name="role_id", referencedColumnName="id")
    )
    private Set<Role> roles = new HashSet<>();

    public User(String email, String password, String username, boolean enabled) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.enabled = enabled;
    }

    public void addRole(Role role ) {
        roles.add(role);
    }
}
