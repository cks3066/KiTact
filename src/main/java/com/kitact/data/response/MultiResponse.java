package com.kitact.data.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class MultiResponse<T> extends BaseResponse {
    private List<T> listData;
}
