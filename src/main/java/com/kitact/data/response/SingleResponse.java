package com.kitact.data.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SingleResponse<T> extends BaseResponse {
    private T data;
}
