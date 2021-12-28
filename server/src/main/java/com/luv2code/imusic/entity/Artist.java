package com.luv2code.imusic.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "artist")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 64, nullable = false)
    private String name;

    @Column(name = "real_name",length = 64)
    private String realName;

    @Column(length = 128, nullable = false)
    private String photo;

    @Column(nullable = false)
    private String introduction;

    @Column(nullable = false)
    private boolean enabled;

    @Column(length = 128)
    private String nation;

    @Column(length = 64)
    private String birthday;


}
