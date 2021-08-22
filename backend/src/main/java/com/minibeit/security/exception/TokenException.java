package com.minibeit.security.exception;

public class TokenException extends RuntimeException{
    public TokenException(){
        super("토큰을 확인해주세요");
    }
}
