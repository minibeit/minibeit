package com.minibeit.common.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Component
public class AES256 {
    private static final String AES = "AES";
    public static final String ALGORITHM = "AES/CBC/PKCS5Padding";
    @Value("${crypto.key}")
    private String key;

    public String encrypt(String text) throws Exception {
        String iv = RandomStringBuilder.generateAlphaNumeric(16);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), AES);
        IvParameterSpec ivParamSpec = new IvParameterSpec(iv.getBytes());
        cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivParamSpec);

        byte[] encrypted = cipher.doFinal(text.getBytes(StandardCharsets.UTF_8));
        return iv + Base64.getEncoder().encodeToString(encrypted);
    }

    public String decrypt(String text) throws Exception {
        String iv = text.substring(0, 16);
        String cipherText = text.substring(16);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), AES);
        IvParameterSpec ivParamSpec = new IvParameterSpec(iv.getBytes());
        cipher.init(Cipher.DECRYPT_MODE, keySpec, ivParamSpec);

        byte[] decodedBytes = Base64.getDecoder().decode(cipherText);
        byte[] decrypted = cipher.doFinal(decodedBytes);
        return new String(decrypted, StandardCharsets.UTF_8);
    }
}