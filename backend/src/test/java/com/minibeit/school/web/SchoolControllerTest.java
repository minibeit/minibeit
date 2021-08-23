package com.minibeit.school.web;

import com.minibeit.MvcTest;
import com.minibeit.school.domain.School;
import com.minibeit.school.dto.SchoolResponse;
import com.minibeit.school.service.SchoolService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SchoolController.class)
class SchoolControllerTest extends MvcTest {
    @MockBean
    private SchoolService schoolService;

    private School school1;
    private School school2;
    private School school3;

    @BeforeEach
    public void setup() {
        school1 = School.builder().id(1L).name("동그라미대학교").build();
        school2 = School.builder().id(2L).name("세모대학교").build();
        school3 = School.builder().id(3L).name("네모대학교").build();
    }

    @Test
    @DisplayName("학교전체조회")
    public void getList() throws Exception {
        List<SchoolResponse.GetList> response = new ArrayList<>();
        SchoolResponse.GetList getList1 = SchoolResponse.GetList.build(school1);
        SchoolResponse.GetList getList2 = SchoolResponse.GetList.build(school2);
        SchoolResponse.GetList getList3 = SchoolResponse.GetList.build(school3);
        response.add(getList1);
        response.add(getList2);
        response.add(getList3);

        given(schoolService.getList()).willReturn(response);

        ResultActions results = mvc.perform(
                get("/api/school/list")
        );

        results.andExpect(status().isOk())
                .andDo(document("school-list",
                        responseFields(
                                fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("학교 식별자"),
                                fieldWithPath("[].name").type(JsonFieldType.STRING).description("학교 이름")
                        )
                ));
    }
}