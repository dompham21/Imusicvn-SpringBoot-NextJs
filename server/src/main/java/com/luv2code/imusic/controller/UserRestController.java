//package com.luv2code.yinmusic.controller;
//
//
//import com.luv2code.yinmusic.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.repository.query.Param;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class UserRestController {
//    @Autowired
//    private UserService userService;
//
//    @PostMapping("/users/check_email")
//    public String checkEmailDuplicated(@Param("id") Integer id, @Param("email") String email) {
//        return userService.isEmailUnique(id, email) ? "Ok" : "Duplicated";
//    }
//
//}
