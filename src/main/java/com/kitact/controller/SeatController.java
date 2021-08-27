package com.kitact.controller;

import com.kitact.configuration.security.UserDetailsImpl;
import com.kitact.data.dto.SeatDto;
import com.kitact.data.model.Seat;
import com.kitact.data.model.User;
import com.kitact.data.response.BaseResponse;
import com.kitact.data.response.MultiResponse;
import com.kitact.repository.SeatRepository;
import com.kitact.service.ResponseService;
import com.kitact.service.SeatService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/seat")
public class SeatController {
    private final SeatRepository seatRepository;
    private final SeatService seatService;
    private final ResponseService responseService;

    // 자리 등록
    @PostMapping("/enroll")
    @PreAuthorize("hasRole('OWNER')")
    @Secured("ROLE_OWNER")
    public BaseResponse enroll(Authentication authentication,
                               @AuthenticationPrincipal UserDetailsImpl userDetails,
                               @RequestBody SeatDto seatDto) {
        User user = userDetails.getUser();
        String user_role = authentication.getAuthorities().toString();

        if (user == null) {
            throw new IllegalArgumentException("일치하는 회원 정보가 없습니다. 확인해주세요.");
        }
        if (user_role != null && user_role.equals("ROLE_OWNER")) {
            throw new IllegalArgumentException("관리자 권한이 필요합니다.");
        }

        seatService.enroll(seatDto);
        return responseService.getSuccessResponse();
    }

    // restaurant id로 자리 검색
    @GetMapping("/{restaurant_id}")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'OWNER')")
    public BaseResponse search(@PathVariable("restaurant_id") long restaurant_id) {
        return responseService.getMultiResponse(seatService.search(restaurant_id));
    }

    // 자리 삭제
    @DeleteMapping("/{seat_id}")
    @PreAuthorize("hasRole('OWNER')")
    @Secured("ROLE_OWNER")
    public BaseResponse delete(@PathVariable("seat_id") long seat_id, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        if (seatService.delete(seat_id) < 0) {
            throw new IllegalArgumentException("일치하는 회원 정보가 없습니다. 확인해주세요.");
        }
        return responseService.getSuccessResponse();
    }

    // 자리 수정
    @PatchMapping("/{seat_id}")
    @PreAuthorize("hasRole('OWNER')")
    @Secured("ROLE_OWNER")
    public BaseResponse patch(@PathVariable("seat_id") long seat_id, @RequestBody SeatDto seatDto) {
        if (seatService.patch(seat_id, seatDto) < 0) {
            throw new IllegalArgumentException("일치하는 회원 정보가 없습니다. 확인해주세요.");
        }
        return responseService.getSuccessResponse();
    }

}
