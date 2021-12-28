package com.luv2code.imusic.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "song")
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 64, nullable = false)
    private String name;

    @Column(length = 256, nullable = false)
    private String introduction;

    @Column(name = "created_time")
    private Date createTime;

    @Column(name = "updated_time")
    private Date updateTime;

    @Column(nullable = false)
    private String photo;

    @Column(length = 128)
    private String lyric;

    @Column( nullable = false)
    private String url;


    @Column(nullable = false)
    private boolean enabled;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "songs_categories",
            joinColumns=
            @JoinColumn(name="song_id", referencedColumnName="id"),
            inverseJoinColumns=
            @JoinColumn(name="category_id", referencedColumnName="id")
    )
    Set<Category> categories =  new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "songs_artists",
            joinColumns=
            @JoinColumn(name="song_id", referencedColumnName="id"),
            inverseJoinColumns=
            @JoinColumn(name="artist_id", referencedColumnName="id")
    )
    Set<Artist> artists =  new HashSet<>();

    public void addArtist(Artist artist ) {
        this.artists.add(artist);
    }

    public void addCategory(Category category ) {
        this.categories.add(category);
    }





    public boolean hasArtist(String artistName) {
        Iterator<Artist> iterator = this.artists.iterator();

        while (iterator.hasNext()) {
            Artist artist = iterator.next();
            if (artist.getName().equals(artistName)) {
                return true;
            }
        }
        return false;
    }
}
