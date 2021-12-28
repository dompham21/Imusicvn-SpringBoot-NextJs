package com.luv2code.imusic.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "gallery")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Gallery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String title;

    @Column(name = "section_type",nullable = false)
    private String sectionType;

    @Column(nullable = false)
    private boolean enabled;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "gallery_songs",
            joinColumns=
            @JoinColumn(name="gallery_id", referencedColumnName="id"),
            inverseJoinColumns=
            @JoinColumn(name="song_id", referencedColumnName="id")
    )
    Set<Song> songs =  new HashSet<>();


    public void addSong(Song song ) {
        this.songs.add(song);
    }

}
