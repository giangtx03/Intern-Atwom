package com.pitchmanagement.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.pitchmanagement.constant.PitchTimeConstant;
import com.pitchmanagement.dao.ImageDao;
import com.pitchmanagement.dao.PitchDao;
import com.pitchmanagement.dao.PitchTimeDAO;
import com.pitchmanagement.dto.ImageDto;
import com.pitchmanagement.dto.admin.*;
import com.pitchmanagement.model.request.EditPitchRequest;
import com.pitchmanagement.model.request.ImageRequest;
import com.pitchmanagement.model.request.PitchRequest;
import com.pitchmanagement.model.request.PitchTimeRequest;
import com.pitchmanagement.model.response.PageResponse;
import com.pitchmanagement.model.response.PitchResponse;
import com.pitchmanagement.service.ImageService;
import com.pitchmanagement.service.PitchService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class PitchServiceImpl implements PitchService {

    private final PitchDao pitchDao;
    private final PitchTimeDAO pitchTimeDAO;
    private final ImageDao imageDao;
    private final ImageService imageService;

    @Override
    public void addEditPitch(EditPitchRequestDto dto, List<MultipartFile> multipartFiles) {

        LocalDateTime localDateTime = LocalDateTime.now();

        EditPitchRequest pitch = new EditPitchRequest();
        pitch.setName(dto.getName());
        pitch.setAddress(dto.getAddress());
        pitch.setPitchTypeId(dto.getPitchTypeId());
        pitch.setCreateAt(localDateTime);
        pitch.setUpdateAt(localDateTime);

        pitchDao.insertEditPitch(pitch);

        if (dto.getEditPitchTimeRequestDtos() != null) {
            for (EditPitchTimeRequestDto pitchTimeDto : dto.getEditPitchTimeRequestDtos()) {
                PitchTimeRequest pitchTime = new PitchTimeRequest();
                pitchTime.setPrice(pitchTimeDto.getPrice());
                pitchTime.setStatus(pitchTimeDto.getStatus());
                pitchTime.setTimeSlotId(pitchTimeDto.getTimeSlotId());
                pitchTime.setPitchId(pitch.getId());

                pitchTimeDAO.insertPitchTime(pitchTime);
            }
        }

        // Xử lý ImageDtos
        if (multipartFiles != null) {
            for (MultipartFile multipartFile : multipartFiles) {
                ImageRequest image = new ImageRequest();
                try {
                    image.setName(imageService.upload(multipartFile));
                    image.setPitchId(pitch.getId());

                    imageDao.insertImage(image);

                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

    @Override
    public PitchRequest addPitch(PitchRequest pitchRequest) {

        LocalDateTime localDateTime = LocalDateTime.now();
        pitchRequest.setCreateAt(localDateTime);
        pitchRequest.setUpdateAt(localDateTime);

        pitchDao.insertPitch(pitchRequest);

        return pitchRequest;
    }

    @Override
    public void editEditPitch(EditPitchRequestDto dto, List<MultipartFile> multipartFiles) {

        LocalDateTime localDateTime = LocalDateTime.now();

        EditPitchRequest pitch = new EditPitchRequest();
        pitch.setId(dto.getId());
        pitch.setName(dto.getName());
        pitch.setAddress(dto.getAddress());
        pitch.setPitchTypeId(dto.getPitchTypeId());
        pitch.setCreateAt(localDateTime);
        pitch.setUpdateAt(localDateTime);

        pitchDao.updateEditPitch(pitch);

        // Xử lý việc xóa pitch times không còn trong danh sách mới
        List<Integer> currentPitchTimeIds = dto.getEditPitchTimeRequestDtos().stream()
                .filter(pitchTime -> pitchTime.getTimeSlotId() != null)
                .map(EditPitchTimeRequestDto::getTimeSlotId)
                .collect(Collectors.toList());

        // Xóa các PitchTime không nằm trong danh sách cập nhật
        pitchTimeDAO.deleteByPitchIdAndNotIn(pitch.getId(), currentPitchTimeIds);

        // Thêm hoặc cập nhật PitchTime
        if (dto.getEditPitchTimeRequestDtos() != null) {
            for (EditPitchTimeRequestDto pitchTimeDto : dto.getEditPitchTimeRequestDtos()) {
                PitchTimeRequest pitchTime = new PitchTimeRequest();
                pitchTime.setPrice(pitchTimeDto.getPrice());
                pitchTime.setStatus(PitchTimeConstant.STATUS_PITCH_TIME_ACTIVE);
                pitchTime.setTimeSlotId(pitchTimeDto.getTimeSlotId());
                pitchTime.setPitchId(pitch.getId());

                // Kiểm tra xem PitchTime đã tồn tại chưa
                int count = pitchTimeDAO.countByPitchIdAndTimeSlotId(pitch.getId(), pitchTimeDto.getTimeSlotId());

                if (count > 0) {
                    // Cập nhật nếu PitchTime đã tồn tại
                    pitchTimeDAO.updatePricePitchTimeByIds(pitchTime);
                } else {
                    // Thêm mới nếu PitchTime chưa tồn tại
                    pitchTimeDAO.insertPitchTime(pitchTime);
                }
            }
        }

        // Xử lý việc xóa pitch img không còn trong danh sách mới
        List<Integer> imgIds = dto.getImageDtos().stream()
                .filter(pitchImg -> pitchImg.getId() != null)
                .map(EditPitchImageDto::getId)
                .collect(Collectors.toList());

        // Lấy danh sách các hình ảnh của pitch hiện tại
        List<EditPitchImageDto> existingImages = imageDao.getImageByEditPitchId(pitch.getId());

        // Lọc các ID hình ảnh đã tồn tại mà không có trong danh sách cập nhật
        List<EditPitchImageDto> imagesToDelete = existingImages.stream()
                .filter(image -> !imgIds.contains(image.getId()))  // Chỉ giữ lại các ảnh không có trong imgIds
                .collect(Collectors.toList());

        imagesToDelete.forEach(image -> System.out.println("Hình ảnh cần xóa: ID = " + image.getId()));

        // Xóa hình ảnh từ hệ thống tệp
        for (EditPitchImageDto image : imagesToDelete) {
            ImageDto imageDto = imageDao.getImageById(Long.valueOf(image.getId()));
            try {
                imageService.delete(imageDto.getName());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        // Xóa thông tin hình ảnh khỏi cơ sở dữ liệu
        imageDao.deleteByPitchIdAndNotIn(pitch.getId(), imgIds);

        // Xử lý ImageDtos
        if (multipartFiles != null) {
            for (MultipartFile multipartFile : multipartFiles) {
                ImageRequest image = new ImageRequest();
                try {
                    image.setName(imageService.upload(multipartFile));
                    image.setPitchId(pitch.getId());

                    imageDao.insertImage(image);

                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

    @Override
    public PitchRequest editPitch(PitchRequest pitchRequest) {

        LocalDateTime localDateTime = LocalDateTime.now();
        pitchRequest.setUpdateAt(localDateTime);

        pitchDao.updatePitch(pitchRequest);

        return pitchRequest;
    }

    @Override
    public void delPitch(int id) {

        List<ImageDto> imageDtos = imageDao.getImageByPitchId((long) id);

        for (ImageDto dto : imageDtos) {
            try {
                imageService.delete(dto.getName());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        pitchDao.deletePitch(id);
    }

    @Override
    public PageResponse getPitchAll(Integer offset, Integer limit) {
        PageHelper.offsetPage(offset, limit);
        List<PitchDto> pitchDtos = pitchDao.selectPitchAll();

        // Duyệt qua từng PitchDto để xử lý danh sách PitchTimeChildrenDto
        for (PitchDto pitchDto : pitchDtos) {
            List<PitchTimeChildrenDto> pitchTimeChildrenDtos = pitchTimeDAO.selectPictTimeByPitchId(Long.valueOf(pitchDto.getId()));
            pitchDto.setPitchTimeChildrenDtos(pitchTimeChildrenDtos);

            List<ImageDto> imageDtos = imageDao.getImageByPitchId(Long.valueOf(pitchDto.getId()));
            pitchDto.setImageDtos(imageDtos);
        }

        long totalRecords = ((com.github.pagehelper.Page<?>) pitchDtos).getTotal();

        int totalPages = (int) Math.ceil((double) totalRecords / limit);
        return PageResponse.builder()
                .items(pitchDtos)
                .totalItems(totalRecords)
                .totalPages(totalPages)
                .build();
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
