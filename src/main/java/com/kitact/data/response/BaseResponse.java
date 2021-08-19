package com.kitact.data.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BaseResponse {
    protected boolean success;
    protected int code;
    protected String message;
}
