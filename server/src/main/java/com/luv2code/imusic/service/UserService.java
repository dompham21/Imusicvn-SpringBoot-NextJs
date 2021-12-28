//package com.luv2code.yinmusic.service;
//
//import com.luv2code.yinmusic.entity.Role;
//import com.luv2code.yinmusic.entity.User;
//import com.luv2code.yinmusic.repository.RoleRepository;
//import com.luv2code.yinmusic.repository.UserRepository;
//import net.bytebuddy.utility.RandomString;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import org.thymeleaf.context.Context;
//
//import javax.mail.MessagingException;
//import javax.mail.internet.MimeMessage;
//import java.io.UnsupportedEncodingException;
//import java.nio.charset.StandardCharsets;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Service
//@Transactional
//public class UserService {
//    @Autowired
//    UserRepository userRepository;
//
//    @Autowired
//    RoleRepository roleRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    private JavaMailSender emailSender;
//
//    @Autowired
//    private org.thymeleaf.spring5.SpringTemplateEngine templateEngine;
//
//    public List<User> listAll() {
//        return (List<User>) userRepository.findAll();
//    }
//
//
//    public List<Role> listRoles() {
//        return (List<Role>) roleRepository.findAll();
//    }
//
//    public User saveUser(User user) {
//
//        encodePassword(user);
//        user.setEnabled(false);
//        user.setCreatedTime(new Date());
//
//        String randomCode = RandomString.make(64);
//        user.setVerificationCode(randomCode);
//        return userRepository.save(user);
//    }
//    public void encodePassword(User user) {
////        String encodePassword = passwordEncoder.encode(user.getPassword());
//        user.setPassword("encodePassword");
//    }
//
//    public boolean isEmailUnique(Integer id, String email) {
//        User userByEmail = userRepository.getUserByEmail(email);
//        if(userByEmail == null) return true;
//        else return false;
//    }
//
//    public void sendVerificationEmail(User user, String siteUrl)
//            throws UnsupportedEncodingException, MessagingException {
//       String subject = "Please verify your registration";
//       String senderName = "iMusic Team";
//       String verifyUrl = siteUrl + "/verify?code=" + user.getVerificationCode();
//
//       Map<String, Object> model = new HashMap<String, Object>();
//       model.put("verifyUrl", verifyUrl);
//       model.put("name", user.getUsername());
//       Context context = new Context();
//       context.setVariables(model);
//
//       String html = templateEngine.process("email/verify-code", context);
//
//       MimeMessage message = emailSender.createMimeMessage();
//       MimeMessageHelper helper = new MimeMessageHelper(message);
//
//       helper.setFrom("fannaruto09@gmail.com", senderName);
//       helper.setTo(user.getEmail());
//       helper.setSubject(subject);
//       helper.setText(html, true);
//       emailSender.send(message);
//
//    }
//
//    public boolean verify(String verificationCode) {
//        User user = userRepository.findByVerificationCode(verificationCode);
//
//        if (user == null || user.isEnabled()) {
//            return false;
//        } else {
//            user.setVerificationCode(null);
//            user.setEnabled(true);
//            userRepository.save(user);
//
//            return true;
//        }
//
//    }
//
//
//}
