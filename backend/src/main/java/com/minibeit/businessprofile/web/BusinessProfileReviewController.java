package com.minibeit.businessprofile.web;

import com.minibeit.businessprofile.service.BusinessProfileReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class BusinessProfileReviewController {
    private final BusinessProfileReviewService businessProfileReviewService;

}