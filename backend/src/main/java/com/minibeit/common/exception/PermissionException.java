package com.minibeit.common.exception;

public class PermissionException extends RuntimeException{
    public PermissionException(){
        super("권한이 없습니다.");
    }
}
