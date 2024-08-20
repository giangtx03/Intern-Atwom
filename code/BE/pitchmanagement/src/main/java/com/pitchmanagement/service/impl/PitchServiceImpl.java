package com.pitchmanagement.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.pitchmanagement.dao.ImageDao;
import com.pitchmanagement.dao.PitchDao;
import com.pitchmanagement.dao.PitchTimeDAO;
import com.pitchmanagement.dto.ImageDto;
import com.pitchmanagement.dto.admin.PitchDto;
import com.pitchmanagement.dto.admin.PitchTimeChildrenDto;
import com.pitchmanagement.model.request.PitchRequest;
import com.pitchmanagement.model.response.PageResponse;
import com.pitchmanagement.model.response.PitchResponse;
import com.pitchmanagement.service.PitchService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        pitchRequest.setUpdateAt(localDateTime);

        pitchDao.insertPitch(pitchRequest);

        return pitchRequest;
    }

    @Override
    public PitchRequest editPitch(PitchRequest pitchRequest) {

        LocalDateTime localDateTime = LocalDateTime.now();
        pitchRequest.setUpdateAt(localDateTime);

        pitchDao.updatePitch(pitchRequest);

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

    @Override
    public PageResponse getAllPitch(String keyword, Long pitchTypeId, Long timeSlotId, int pageNumber, int limit, String sortBy, String sortOrder) {
        PageHelper.startPage(pageNumber, limit);
        PageHelper.orderBy(sortBy + " " + sortOrder);
        List<Map<String, Object>> list = pitchDao.getAllPitch(keyword, pitchTypeId, timeSlotId);
        PageInfo<Map<String, Object>> pageInfo = new PageInfo<>(list);
        List<PitchResponse> listPitch=  list.stream()
                .map((src) -> {
                    List<ImageDto> imageDtos = imageDao.getImageByPitchId(Long.parseLong(src.get("id").toString()));
                    List<PitchTimeChildrenDto> timeDtos = pitchTimeDAO.selectPictTimeByPitchId(Long.parseLong(src.get("id").toString()));
                    return PitchResponse.fromSrc(src, imageDtos, timeDtos);
                })
                .toList();
        return PageResponse.builder()
                .items(listPitch)
                .totalItems(pageInfo.getTotal())
                .totalPages(pageInfo.getPages())
                .build();
    }
}
