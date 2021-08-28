package com.kitact.service;

import com.kitact.advice.NotFoundException;
import com.kitact.data.dto.SeatDTO;
import com.kitact.data.model.Restaurant;
import com.kitact.data.model.Seat;
import com.kitact.repository.RestaurantRepository;
import com.kitact.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class SeatService {
    private final RestaurantRepository restaurantRepository;
    private final SeatRepository seatRepository;

    // 식당 검색
    public Restaurant findRestaurantById(long restaurant_id) {
        return restaurantRepository.findById(restaurant_id)
                .orElseThrow(NotFoundException::new);
    }

    // 자리 등록
    public Seat enroll(SeatDTO seatDto) {
        Restaurant restaurant = restaurantRepository.findById(seatDto.getRestaurantId()).orElseThrow(
                () -> new IllegalArgumentException("해당 음식점을 찾을 수 없습니다.")
        );

        Seat seat = new Seat();
        seat.setRestaurant(restaurant);
        seat.setType(seatDto.getType());
        seat.setPeople(seatDto.getPeople());
        if (seatDto.getVacancy() != null && seatDto.getClient() != null) {
            seat.setVacancy(seatDto.getVacancy());
            seat.setClient(seatDto.getClient());
        }
        else
            seat.setVacancy(true);
            seat.setClient("");
        seat.setX(seatDto.getPosX());
        seat.setY(seatDto.getPosY());

        return seatRepository.save(seat);
    }

    // 레스토랑을 기준으로 자리 검색
    public List<Seat> search(long restaurant_id) {
        Restaurant restaurant = restaurantRepository.findById(restaurant_id).orElseThrow(
                () -> new IllegalArgumentException("해당 음식점을 찾을 수 없습니다.")
        );

        List<Seat> found = seatRepository.findAllByRestaurant(restaurant);
        if (found.isEmpty()){
            throw new IllegalArgumentException("등록된 자리 정보가 없습니다. 확인해주세요.");
        }
        return found;
    }


    // 자리 삭제
    public int delete(long seat_id) {
        Optional<Seat> found = seatRepository.findById(seat_id);
        if (found.isPresent()) {
            seatRepository.delete(found.get());
            return 1;
        }
        return 0;
    }


    // 자리 수정
    public int patch(long seat_id, SeatDTO seatDto) {
        Optional<Seat> found = seatRepository.findById(seat_id);
        if (found.isPresent()) {
            Seat seat = found.get();
            if (seatDto.getType() != null)
                seat.setType(seatDto.getType());
            if (seatDto.getPosX() != null)
                seat.setX(seatDto.getPosX());
            if (seatDto.getPosY() != null)
                seat.setY(seatDto.getPosY());
            if (seatDto.getPeople() != null)
                seat.setPeople(seatDto.getPeople());
            if (seatDto.getVacancy() != null)
                seat.setVacancy(seatDto.getVacancy());
            if (seatDto.getClient() != null)
                seat.setClient(seatDto.getClient());

            seatRepository.save(seat);
            return 1;
        }
        return 0;
    }

}



