//package com.luv2code.yinmusic.principal;
//
//import com.luv2code.yinmusic.entity.Role;
//import com.luv2code.yinmusic.entity.User;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.*;
//
//public class UserPrincipal implements UserDetails {
//    private User user;
//
//    public UserPrincipal(User user) {
//        super();
//        this.user = user;
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        Set<Role> roles = user.getRoles();
//        List<SimpleGrantedAuthority>  authorities = new ArrayList<>();
//
//        for(Role role : roles) {
//            authorities.add(new SimpleGrantedAuthority(role.getName()));
//        }
//
//        return authorities;
//    }
//
//
//
//    public Long getId() {
//        return user.getId();
//    }
//
//    public String getEmail() {
//        return user.getEmail();
//    }
//
//    @Override
//    public String getUsername() {
//        return user.getUsername();
//    }
//
//    @Override
//    public String getPassword() {
//        return user.getPassword();
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return user.isEnabled();
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o)
//            return true;
//        if (o == null || getClass() != o.getClass())
//            return false;
//        UserPrincipal that = (UserPrincipal) o;
//        return Objects.equals(user.getId(), that.getId());
//    }
//
//
//
//    @Override
//    public int hashCode() {
//
//        return Objects.hash(user.getId());
//    }
//}
