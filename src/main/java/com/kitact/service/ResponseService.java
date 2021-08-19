package com.kitact.service;

import com.kitact.data.response.MultiResponse;
import com.kitact.data.response.SingleResponse;
import com.kitact.data.response.BaseResponse;
import lombok.Getter;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResponseService {
    @Getter
    public enum Response {
        SUCCESS(0, "성공"),
        FAIL(-1, "실패"),
        ;

        private final int code;
        private final String message;

        Response(int code, String message) {
            this.code = code;
            this.message = message;
        }
    }

    // 단일 데이터 반환
    public <T> SingleResponse getSingleResponse(T data) {
        SingleResponse response = new SingleResponse();
        response.setData(data);
        response.setSuccess(true);
        response.setCode(Response.SUCCESS.getCode());
        response.setMessage(Response.SUCCESS.getMessage());
        return response;
    }

    // 여러 개의 데이터 반환
    public <T> MultiResponse getMultiResponse(List<T> listData) {
        MultiResponse response = new MultiResponse();
        response.setListData(listData);
        response.setSuccess(true);
        response.setCode(Response.SUCCESS.getCode());
        response.setMessage(Response.SUCCESS.getMessage());
        return response;
    }

    // 단순 성공 여부만 반환
    public BaseResponse getSuccessResponse() {
        BaseResponse response = new BaseResponse();
        response.setSuccess(true);
        response.setCode(Response.SUCCESS.getCode());
        response.setMessage(Response.SUCCESS.getMessage());
        return response;
    }

    // 단순 실패 여부만 반환
    public BaseResponse getFailResponse() {
        BaseResponse response = new BaseResponse();
        response.setSuccess(false);
        response.setCode(Response.FAIL.getCode());
        response.setMessage(Response.FAIL.getMessage());
        return response;
    }

    // 실패 여부만 반환 (매개변수를 통해 정의된 오류 반환)
    public BaseResponse getFailResponse(Response responseType) {
        BaseResponse response = new BaseResponse();
        response.setSuccess(false);
        response.setCode(responseType.getCode());
        response.setMessage(responseType.getMessage());
        return response;
    }
}
