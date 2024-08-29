import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { EditPitchModel } from "../../model/EditPitchModel";
import {
  delEditPitch,
  getEditPitch,
  getPitchTypeAll,
  getTimeSlotAll,
  postEditPitchNewVersion,
  putEditPitchNewVersion,
} from "../../service/AdminService";
import { PitchTypeModel } from "../../model/PitchTypeModel";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { STATUS_PITCH_TIME_ACTIVE } from "../../constant/constant";
import { TimeSlot } from "../../model/TimeSlot";
import { ImagePitch, ImagePitchDto } from "../../model/ImagePitch";
import defaultAvatar from "../../../assets/image/defaultSanBong.jpeg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface EditPitchTimeRequestDto {
  price?: number;
  status: string;
  timeSlotId?: number;
}

interface PitchRequest {
  id?: number;
  name: string;
  address: string;
  pitchTypeId: number;
  editPitchTimeRequestDtos: EditPitchTimeRequestDto[];
  imageDtos: ImagePitchDto[];
}

interface TimeSlotResponse {
  id?: number;
  time?: string;
}

export default function EditPitches() {
  let emptyPitch: PitchRequest = {
    id: undefined,
    name: "",
    address: "",
    pitchTypeId: 0,
    editPitchTimeRequestDtos: [],
    imageDtos: [],
  };

  const [pitches, setPitches] = useState<EditPitchModel[]>([]);
  const [pitchDialog, setPitchDialog] = useState<boolean>(false);
  const [deletePitchDialog, setDeletePitchDialog] = useState<boolean>(false);
  const [visibleTime, setVisibleTime] = useState<boolean>(false);
  const [visibleImg, setVisibleImg] = useState<boolean>(false);
  const [btnSubmit, setBtnSubmit] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [pitchTypes, setPitchTypes] = useState<PitchTypeModel[]>([]);
  const [pitchType, setPitchType] = useState<PitchTypeModel>();
  const [pitchId, setPitchId] = useState<number>();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [totalRecords, setTotalRecords] = useState<number>();
  const [totalPages, setTotalPages] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [timeSlotResponses, setTimeSlotResponses] = useState<
    TimeSlotResponse[]
  >([]);
  const [imgPitches, setImgPitches] = useState<ImagePitch[]>([]);
  const [countIndex, setCountIndex] = useState(0);
  const dt = useRef<DataTable<EditPitchModel[]>>(null);

  const onRowSelect = (e: any) => {
    <Link
      to={`/pitch/${e.value.id}`}
      className="d-flex justify-content-between mb-3"
    ></Link>;
    window.open(`/pitch/${e.value.id}`, "_blank");
  };

  const [pitch2, setPitch2] = useState<PitchRequest>({
    name: "",
    address: "",
    pitchTypeId: 1,
    editPitchTimeRequestDtos: [
      { price: undefined, status: "", timeSlotId: undefined },
    ],
    imageDtos: [{ id: undefined }],
  });

  const handlePitchTimeChange = (
    index: number,
    key: keyof EditPitchTimeRequestDto,
    value: any
  ) => {
    const newPitchTimes: any = [...pitch2.editPitchTimeRequestDtos];
    newPitchTimes[index][key] = value;
    setPitch2({ ...pitch2, editPitchTimeRequestDtos: newPitchTimes });
  };

  const removePitchTime = (index: number) => {
    setCountIndex((prevCount) => prevCount - 1);
    const newPitchTimes = pitch2.editPitchTimeRequestDtos.filter(
      (_, i) => i !== index
    );
    setPitch2({ ...pitch2, editPitchTimeRequestDtos: newPitchTimes });

    const newTimeSlotResponses = timeSlotResponses.filter(
      (_, i) => i !== index
    );
    setTimeSlotResponses(newTimeSlotResponses);
  };

  const addPitchTime = () => {
    setCountIndex((prevCount) => prevCount + 1);
    setPitch2({
      ...pitch2,
      editPitchTimeRequestDtos: [
        ...pitch2.editPitchTimeRequestDtos,
        {
          price: undefined,
          status: STATUS_PITCH_TIME_ACTIVE,
          timeSlotId: undefined,
        },
      ],
    });
  };

  const handleDate = (date: any) => {
    if (typeof date === "string") {
      date = date.substring(0, date.length - 3).replace("T", " ");
    } else {
      console.error("Date is not a string:", date);
    }
    return date;
  };

  // Kiểm tra tồn tại
  const _timeSlotResponses: TimeSlotResponse[] = timeSlots
    .filter(
      (ts) =>
        !pitch2.editPitchTimeRequestDtos.some(
          (data) => data.timeSlotId === ts.id
        )
    )
    .map((ts) => ({
      id: ts.id!,
      time: `${handleDate(ts.startTime)} - ${handleDate(ts.endTime)}`,
    }));

  // Dropdown

  const handleTimeSlot = (index: number, e: TimeSlotResponse) => {
    const newTimeSlotResponses = [...timeSlotResponses];
    newTimeSlotResponses[index] = e;
    setTimeSlotResponses(newTimeSlotResponses);
    handlePitchTimeChange(index, "timeSlotId", e.id);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImages((prevImages) => [...prevImages, ...newFiles]);

      const urls = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prevUrls) => [...prevUrls, ...urls]);
    }
  };

  const handleDelImg = (id: number) => {
    const updatedImages = imgPitches.filter((pitchImg) => pitchImg.id !== id);
    setImgPitches(updatedImages);
    const _idTemp: ImagePitchDto[] = updatedImages.map((data) => {
      return { id: data.id! };
    });
    setPitch2({ ...pitch2, imageDtos: _idTemp });
  };

  const handleDelPre = (indexToRemove: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
    setPreviewUrls((prevUrls) =>
      prevUrls.filter((_, index) => index !== indexToRemove)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getEditPitch(first, rows);
        setPitches(result.items);
        setTotalRecords(result.total_items);
        setTotalPages(result.total_pages);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    fetchData();
  }, [btnSubmit, visibleTime, visibleImg]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPitchTypeAll();
        setPitchTypes(result);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    fetchData();
  }, [!btnSubmit]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTimeSlotAll();
        setTimeSlots(result);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };

    fetchData();
  }, []);

  const openNew = () => {
    setPitch2(emptyPitch);
    setPitchType({ ...pitchType, id: emptyPitch.pitchTypeId });
    setTimeSlotResponses([]);
    setCountIndex(0);
    setImages([]);
    setImgPitches([]);
    setPreviewUrls([]);
    setSubmitted(false);
    setPitchDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setPitchDialog(false);
  };

  const hideDeletePitchDialog = () => {
    setDeletePitchDialog(false);
  };

  const savePitch = async () => {
    setSubmitted(true);

    // Validation
    if (
      !pitch2.name?.trim() ||
      !pitch2.address?.trim() ||
      !pitch2.pitchTypeId ||
      !pitch2.editPitchTimeRequestDtos
    ) {
      toast.error("Tất cả thông tin phải được điền.");
      return;
    }

    // Validate each pitch time entry
    for (let i = 0; i < pitch2.editPitchTimeRequestDtos.length; i++) {
      const pitchTime = pitch2.editPitchTimeRequestDtos[i];
      if (!pitchTime.price || !pitchTime.status || !pitchTime.timeSlotId) {
        toast.error("Vui lòng điền đầy đủ thông tin cho tất cả các khung giờ.");
        return;
      }
    }

    let _pitch = { ...pitch2 };

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("multipartFiles", image);
    });
    formData.append("request", JSON.stringify(_pitch));

    if (pitch2.id) {
      try {
        setIsLoading(true);
        setSubmitted(false);
        await putEditPitchNewVersion(formData);
        toast.success("Sân đã được cập nhật");
      } catch (error: any) {
        console.error("Đã có lỗi xảy ra", error);
      }
    } else {
      try {
        setIsLoading(true);
        setSubmitted(false);
        await postEditPitchNewVersion(formData);
        toast.success("Sân đã được tạo");
      } catch (error: any) {
        console.error("Đã có lỗi xảy ra", error);
      }
    }
    setBtnSubmit(!btnSubmit);
    setPitchDialog(false);
    setPitch2(emptyPitch);
  };

  const editPitch = (temp: EditPitchModel) => {
    // Sử dụng map() để chuyển đổi
    const _editPitch: EditPitchTimeRequestDto[] = temp.pitchTimeChildrenDtos
      ? temp.pitchTimeChildrenDtos.map((dto) => {
          return {
            price: dto.price!,
            status: dto.status!,
            timeSlotId: dto.idTime!,
          };
        })
      : [];

    const _imgPitch: ImagePitch[] = temp.imageDtos
      ? temp.imageDtos.map((dto) => {
          return {
            id: dto.id!,
            name: dto.name!,
            pitchId: temp.id!,
          };
        })
      : [];

    const _idImg: ImagePitchDto[] = temp.imageDtos
      ? temp.imageDtos.map((dto) => {
          return { id: dto.id! };
        })
      : [];

    console.log(_idImg);

    // Tạo một mảng timeSlotResponses từ pitchTimeChildrenDtos
    const _timeSlotResponses = temp.pitchTimeChildrenDtos
      ? temp.pitchTimeChildrenDtos.map((dto) => {
          return {
            id: dto.idTime,
            time: `${handleDate(dto.startTime)} - ${handleDate(dto.endTime)}`, // assuming dto has a timeSlot property with the desired value
          };
        })
      : [];
    const foundType = pitchTypes.find((e) => e.name === temp.type);
    if (foundType) {
      setPitchType({ ...pitchType, id: foundType.id, name: foundType.name });
      setPitch2({
        ...pitch2,
        id: temp.id,
        name: temp.name!,
        address: temp.address!,
        pitchTypeId: foundType.id!,
        editPitchTimeRequestDtos: _editPitch,
        imageDtos: _idImg,
      });
      setImgPitches(_imgPitch);
      setTimeSlotResponses(_timeSlotResponses);
    } else {
      console.error("Pitch type not found");
    }
    setCountIndex(temp.sumTime!);
    setPreviewUrls([]);
    setImages([]);
    setPitchDialog(true);
  };

  const confirmDeletePitch = (temp: EditPitchModel) => {
    // Sử dụng map() để chuyển đổi
    const _editPitch: EditPitchTimeRequestDto[] =
      temp.pitchTimeChildrenDtos!.map((dto) => {
        return {
          price: dto.price!,
          status: dto.status!,
          timeSlotId: dto.idTime!,
        };
      });
    const foundType = pitchTypes.find((e) => e.name === temp.type);
    if (foundType) {
      setPitchType({ ...pitchType, id: foundType.id, name: foundType.name });
      setPitch2({
        ...pitch2,
        id: temp.id,
        name: temp.name!,
        address: temp.address!,
        pitchTypeId: foundType.id!,
        editPitchTimeRequestDtos: _editPitch,
      });
    } else {
      console.error("Pitch type not found");
    }
    setDeletePitchDialog(true);
  };

  const deletePitch = async () => {
    let _pitch = { ...pitch2 };

    try {
      setIsLoading(true);
      await delEditPitch(_pitch.id!);
      setFirst(0);
      toast.success("Sân đã được xóa");
    } catch (error: any) {
      console.error("Error fetching data", error);
    }

    setBtnSubmit(!btnSubmit);
    setDeletePitchDialog(false);
    setPitch2(emptyPitch);
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const val = (e.target && e.target.value) || "";
    let _pitch = { ...pitch2 };

    // @ts-ignore
    _pitch[name] = val;

    setPitch2(_pitch);
  };

  const onDropdownChange = (e: DropdownChangeEvent, name: string) => {
    const val = e.value.id ?? 0;
    let _pitch = { ...pitch2 };

    // @ts-ignore
    _pitch[name] = val;

    setPitch2(_pitch);
  };

  const actionBodyTemplate = (rowData: EditPitchModel) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="me-2"
          onClick={() => editPitch(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeletePitch(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
      <h3 className="m-0">Quản lý sân</h3>
      <Button
        label="Thêm"
        icon="pi pi-plus"
        severity="success"
        onClick={openNew}
      />
    </div>
  );
  const pitchDialogFooter = (
    <React.Fragment>
      <Button
        className="me-2"
        label="Hủy"
        icon="pi pi-times"
        outlined
        onClick={hideDialog}
      />
      <Button label="Lưu" icon="pi pi-check" onClick={savePitch} />
    </React.Fragment>
  );
  const deletePitchDialogFooter = (
    <React.Fragment>
      <Button
        className="me-2"
        label="Không"
        icon="pi pi-times"
        outlined
        onClick={hideDeletePitchDialog}
      />
      <Button
        label="Có"
        icon="pi pi-check"
        severity="danger"
        onClick={deletePitch}
      />
    </React.Fragment>
  );

  const createAt = (rowData: any) => {
    return <div>{handleDate(rowData.createAt)}</div>;
  };

  const updateAt = (rowData: any) => {
    return <div>{handleDate(rowData.updateAt)}</div>;
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  if (isLoading) {
    return (
      <div className="progress-spinner text-center">
        <div className="swm-loader"></div>
      </div>
    );
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        {pitches.length <= 0 ? (
          <div className="d-flex m-5 justify-content-between">
            <h3 className="text-center">Không có sân nào</h3>
            <Button
              label="Thêm"
              icon="pi pi-plus"
              severity="success"
              onClick={openNew}
            />
          </div>
        ) : (
          <>
            <DataTable
              ref={dt}
              value={pitches}
              dataKey="id"
              header={header}
              selectionMode="single"
              onSelectionChange={onRowSelect}
            >
              <Column
                field="name"
                header="Tên"
                style={{ minWidth: "7rem" }}
              ></Column>
              <Column
                field="address"
                header="Địa chỉ"
                style={{ minWidth: "12rem" }}
              ></Column>
              <Column
                field="createAt"
                header="Ngày tạo"
                sortable
                style={{ minWidth: "10rem" }}
                body={createAt}
              ></Column>
              <Column
                field="updateAt"
                header="Ngày sửa"
                sortable
                style={{ minWidth: "10rem" }}
                body={updateAt}
              ></Column>
              <Column
                field="type"
                header="Loại sân"
                style={{ minWidth: "8rem" }}
              ></Column>
              <Column
                body={actionBodyTemplate}
                style={{ minWidth: "12rem" }}
              ></Column>
            </DataTable>
            {totalPages! > 1 && (
              <Paginator
                first={first}
                rows={rows}
                totalRecords={totalRecords}
                onPageChange={onPageChange}
                onClick={() => setBtnSubmit(!btnSubmit)}
              />
            )}
          </>
        )}
      </div>

      <Dialog
        visible={pitchDialog}
        style={{ width: "40rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Thông tin sân"
        modal
        className="p-fluid"
        footer={pitchDialogFooter}
        onHide={hideDialog}
      >
        <div className="">
          <h3>Sân</h3>
          <div className="field mb-3">
            <label htmlFor="name" className="font-bold">
              Tên sân
            </label>
            <InputText
              id="name"
              value={pitch2.name}
              onChange={(e) => onInputChange(e, "name")}
              required
              autoFocus
              className={classNames({ "p-invalid": submitted && !pitch2.name })}
            />
            {submitted && !pitch2.name && (
              <small className="p-error">Tên sân không được để trống.</small>
            )}
          </div>
          <div className="field mb-3">
            <label htmlFor="address" className="font-bold">
              Địa chỉ
            </label>
            <InputText
              id="address"
              value={pitch2.address}
              onChange={(e) => onInputChange(e, "address")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !pitch2.address,
              })}
            />
            {submitted && !pitch2.address && (
              <small className="p-error">Địa chỉ không được để trống.</small>
            )}
          </div>

          <div className="field">
            <label htmlFor="pitchTypeId">Loại sân</label>
            <Dropdown
              value={pitchTypes.find((e) => e.id === pitch2.pitchTypeId)}
              onChange={(e) => onDropdownChange(e, "pitchTypeId")}
              options={pitchTypes}
              optionLabel="name"
              placeholder="Chọn loại sân"
              className={classNames({
                "p-invalid": submitted && !pitch2.pitchTypeId,
              })}
            />
            {submitted && !pitch2.pitchTypeId && (
              <small className="p-error">Vui lòng chọn loại sân.</small>
            )}
          </div>
        </div>
        <hr />
        <div className="mt-3">
          <h3>Khung giờ</h3>
          {pitch2.editPitchTimeRequestDtos.map((pitchTime: any, index: any) => (
            <div className="mt-3" key={index}>
              <div className="d-flex gap-2">
                <Dropdown
                  id="type"
                  onChange={(e: DropdownChangeEvent) =>
                    handleTimeSlot(index, e.target.value)
                  }
                  options={_timeSlotResponses}
                  optionLabel="time"
                  required
                  placeholder="Chọn giờ"
                  className={
                    submitted && !timeSlotResponses[index]?.id
                      ? "p-invalid"
                      : ""
                  }
                  disabled={_timeSlotResponses.length === 0}
                />
                <InputText
                  placeholder="Khung giờ"
                  value={timeSlotResponses[index]?.time}
                  required
                  readOnly
                />
                <InputNumber
                  placeholder="Giá"
                  value={pitchTime.price}
                  onValueChange={(e: InputNumberValueChangeEvent) =>
                    handlePitchTimeChange(index, "price", e.target.value)
                  }
                  required
                  className={
                    submitted && !pitchTime[index]?.price ? "p-invalid" : ""
                  }
                />
                <InputText
                  type="text"
                  placeholder="Status"
                  value={pitchTime.status}
                  onChange={(e) =>
                    handlePitchTimeChange(index, "status", e.target.value)
                  }
                  hidden
                />
                <div className="">
                  <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    onClick={() => removePitchTime(index)}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="mt-3">
            {timeSlots.length > countIndex && (
              <Button
                label="Thêm khung giờ"
                icon="pi pi-plus"
                severity="success"
                onClick={addPitchTime}
              />
            )}
          </div>
        </div>
        <hr />
        <div className="mt-3">
          <h3>Ảnh sân</h3>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={onSelect}
            multiple
          />
          <div className="my-2">
            {previewUrls.map((url, index) => (
              <div
                className="m-2"
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: 200,
                }}
              >
                <img
                  key={index}
                  src={url}
                  alt={`Preview ${index + 1}`}
                  style={{
                    width: 200,
                    height: 200,
                    objectFit: "cover",
                    border: "1px solid ",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "1px 6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                  onClick={() => handleDelPre(index)}
                >
                  x
                </span>
              </div>
            ))}
            {imgPitches.map((pitchImg) => (
              <div
                key={pitchImg.id}
                className="m-2"
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: 200,
                }}
              >
                <img
                  src={
                    process.env.REACT_APP_API_URL + `/image/${pitchImg.name}`
                  }
                  alt="Pitch"
                  width={200}
                  height={200}
                  onError={(e) => {
                    e.currentTarget.src = defaultAvatar;
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "1px 6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                  onClick={() => handleDelImg(pitchImg.id!)}
                >
                  x
                </span>
              </div>
            ))}
          </div>
          <Button
            icon="pi pi-plus"
            label="Thêm ảnh"
            className="p-button-success mt-2"
            onClick={handleButtonClick}
          />
        </div>
      </Dialog>

      <Dialog
        visible={deletePitchDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Xác nhận"
        modal
        footer={deletePitchDialogFooter}
        onHide={hideDeletePitchDialog}
      >
        <div className="d-flex align-items-center">
          <i
            className="pi pi-exclamation-triangle me-3"
            style={{ fontSize: "2rem" }}
          />
          {pitch2 && (
            <span>
              Bạn có chắc muốn xóa <b>{pitch2.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
}
