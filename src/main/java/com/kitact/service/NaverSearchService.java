package com.kitact.service;

import com.kitact.data.dto.SearchImageRequestDTO;
import com.kitact.data.dto.SearchImageResponseDTO;
import com.kitact.data.dto.SearchLocalRequestDTO;
import com.kitact.data.dto.SearchLocalResponseDTO;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class NaverSearchService {
    @Value("${naver.client.id}")
    private String clientId;

    @Value("${naver.client.secret}")
    private String secret;

    @Value("${naver.url.search.local}")
    private String localSearchUrl;

    @Value("${naver.url.search.image}")
    private String imageSearchUrl;

    public SearchLocalResponseDTO localSearch(SearchLocalRequestDTO searchLocalRequestDTO) {
        URI uri = UriComponentsBuilder
                .fromUriString(localSearchUrl)
                .queryParams(searchLocalRequestDTO.toMultiValueMap())
                .build()
                .encode()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", clientId);
        headers.set("X-Naver-Client-Secret", secret);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(headers);
        ParameterizedTypeReference<SearchLocalResponseDTO> typeReference = new ParameterizedTypeReference<>() {};

        ResponseEntity<SearchLocalResponseDTO> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, requestEntity, typeReference);
        return responseEntity.getBody();
    }

    public SearchImageResponseDTO imageSearch(SearchImageRequestDTO searchImageRequestDTO) {
        URI uri = UriComponentsBuilder
                .fromUriString(imageSearchUrl)
                .queryParams(searchImageRequestDTO.toMultiValueMap())
                .build()
                .encode()
                .toUri();

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", clientId);
        headers.set("X-Naver-Client-Secret", secret);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(headers);
        ParameterizedTypeReference<SearchImageResponseDTO> typeReference = new ParameterizedTypeReference<>() {};

        ResponseEntity<SearchImageResponseDTO> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, requestEntity, typeReference);
        return responseEntity.getBody();
    }
}
