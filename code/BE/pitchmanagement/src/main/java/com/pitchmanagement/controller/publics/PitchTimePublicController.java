package com.pitchmanagement.controller.publics;

import com.pitchmanagement.service.PitchTimeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("public/${api.prefix}/pitch_time")
public class PitchTimePublicController {

    private final PitchTimeService pitchTimeService;

}
