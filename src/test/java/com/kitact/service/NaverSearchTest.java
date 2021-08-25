package com.kitact.service;

import com.kitact.data.dto.SearchImageRequestDTO;
import com.kitact.data.dto.SearchImageResponseDTO;
import com.kitact.data.dto.SearchLocalRequestDTO;
import com.kitact.data.dto.SearchLocalResponseDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class NaverSearchTest {
    @Autowired
    private NaverSearchService naverSearchService;

    @Test
    public void searchLocalTest() {
        SearchLocalRequestDTO requestDTO = new SearchLocalRequestDTO();
        requestDTO.setQuery("숯구닭");

        SearchLocalResponseDTO responseDTO = naverSearchService.localSearch(requestDTO);
        System.out.println(responseDTO.toString());
    }

    @Test
    public void searchImageTest() {
        SearchImageRequestDTO requestDTO = new SearchImageRequestDTO();
        requestDTO.setQuery("숯구닭");

        SearchImageResponseDTO responseDTO = naverSearchService.imageSearch(requestDTO);
        System.out.println(responseDTO.toString());
    }
}
