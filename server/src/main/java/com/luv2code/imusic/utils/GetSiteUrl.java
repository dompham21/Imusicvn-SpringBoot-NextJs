package com.luv2code.imusic.utils;

import javax.servlet.http.HttpServletRequest;

public class GetSiteUrl {
    public static String getSiteUrl(HttpServletRequest request) {
        String siteUrl = request.getRequestURL().toString();
        return siteUrl.replace(request.getServletPath(),"");
    }
}
