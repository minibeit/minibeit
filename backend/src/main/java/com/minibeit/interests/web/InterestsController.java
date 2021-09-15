package com.minibeit.interests.web;

import com.minibeit.interests.dto.InterestsResponse;
import com.minibeit.interests.service.InterestsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/interests")
public class InterestsController {
    private final InterestsService interestsService;

    @GetMapping("/list")
    public ResponseEntity<List<InterestsResponse.IdAndName>> getList() {
        List<InterestsResponse.IdAndName> response = interestsService.getList();
        return ResponseEntity.ok().body(response);
    }
}
