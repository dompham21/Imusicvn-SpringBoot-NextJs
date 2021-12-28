//package com.luv2code.yinmusic.controller;
//
//import com.luv2code.yinmusic.entity.Role;
//import com.luv2code.yinmusic.entity.User;
//import com.luv2code.yinmusic.service.UserService;
//import com.luv2code.yinmusic.utils.GetSiteUrl;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.servlet.mvc.support.RedirectAttributes;
//
//import javax.mail.MessagingException;
//import javax.servlet.http.HttpServletRequest;
//import java.io.UnsupportedEncodingException;
//import java.util.List;
//
//@Controller
//public class UserController {
//    @Autowired
//    private UserService service;
//
//    @GetMapping("/signup")
//    public String createNew( Model model) {
//        User user = new User();
//        List<Role> listRoles = service.listRoles();
//
//        model.addAttribute("user", user);
//        model.addAttribute("listRoles", listRoles);
//
//        return "auth/signup";
//    }
//
//    @PostMapping("/signup/save")
//    public String signUp(User user, RedirectAttributes redirectAttributes, HttpServletRequest request)
//            throws UnsupportedEncodingException, MessagingException {
//        if(user.getRoles().isEmpty()) {
//            user.setRoles(null);
//        }
//        user.setEnabled(true);
//
//        service.saveUser(user);
//        String siteUrl = GetSiteUrl.getSiteUrl(request);
//        service.sendVerificationEmail(user, siteUrl);
//
//        redirectAttributes.addFlashAttribute("email",user.getEmail());
//
//        return "redirect:/auth/signup/success";
//    }
//    @GetMapping("/signup/success")
//    public String signupSuccess() {
//        return "auth/signup_success";
//    }
//
//    @GetMapping("/verify")
//    public String verifyUser(@Param("code") String code) {
//        if (service.verify(code)) {
//            return "auth/verify_success";
//        } else {
//            return "auth/verify_fail";
//        }
//    }
//
//}
