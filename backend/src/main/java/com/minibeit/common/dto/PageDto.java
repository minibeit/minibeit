package com.minibeit.common.dto;

import lombok.Getter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Getter
public class PageDto {
    private int page;
    private int size;

    public PageDto(int page, int size) {
        this.page = page;
        this.size = size;
    }

    public void setPage(int page) {
        this.page = page <= 0 ? 1 : page;
    }

    public void setSize(int size) {
        int DEFAULT_SIZE = 10;
        int MAX_SIZE = 50;
        this.size = size > MAX_SIZE ? DEFAULT_SIZE : size;
    }

    public Pageable of() {
        return PageRequest.of(this.page - 1, this.size);
    }
}
