package com.minibeit.school.web;

import com.minibeit.school.dto.SchoolResponse;
import com.minibeit.school.service.SchoolService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/school")
public class SchoolController {
    private final SchoolService schoolService;

    @GetMapping("/search")
    public List<SchoolResponse.GetList> getList(@RequestParam(name = "name") String name) {
        return schoolService.getList(name);
    }
}
