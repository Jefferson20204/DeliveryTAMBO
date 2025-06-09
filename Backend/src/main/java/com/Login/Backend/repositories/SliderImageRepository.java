package com.Login.Backend.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Login.Backend.entities.SliderImage;

public interface SliderImageRepository extends JpaRepository<SliderImage, UUID> {
    List<SliderImage> findAllByOrderByPositionAsc();
}