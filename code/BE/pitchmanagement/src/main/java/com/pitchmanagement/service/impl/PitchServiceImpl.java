package com.pitchmanagement.service.impl;

import com.pitchmanagement.dao.ImageDao;
import com.pitchmanagement.dao.PitchDao;
import com.pitchmanagement.dao.PitchTimeDAO;
import com.pitchmanagement.dto.ImageDto;
import com.pitchmanagement.dto.admin.PitchDto;
import com.pitchmanagement.dto.admin.PitchTimeChildrenDto;
import com.pitchmanagement.model.request.PitchRequest;
import com.pitchmanagement.model.response.PitchResponse;
import com.pitchmanagement.service.PitchService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class PitchServiceImpl implements PitchService {

    private final PitchDao pitchDao;
    private final PitchTimeDAO pitchTimeDAO;
    private final ImageDao imageDao;

    @Override
    public PitchRequest addPitch(PitchRequest pitchRequest) {

        LocalDateTime localDateTime = LocalDateTime.now();
        pitchRequest.setCreateAt(localDateTime);

        pitchDao.insertPitch(pitchRequest);

        return pitchRequest;
    }

    @Override
    public List<PitchDto> getPitchAll() {
        return pitchDao.selectPitchAll();
    }

    @Override
    public PitchResponse getPitchById(Long id) throws Exception {

        Map<String, Object> src = pitchDao.getPitchById(id);

        if(src == null || src.isEmpty()){
            throw new NotFoundException("Không tìm thấy thông tin sân!!!");
        }

        List<ImageDto> imageDtos = imageDao.getImageByPitchId(id);
        List<PitchTimeChildrenDto> timeDtos = pitchTimeDAO.selectPictTimeByPitchId(id);

        return PitchResponse.fromSrc(src, imageDtos, timeDtos);
    }
}
