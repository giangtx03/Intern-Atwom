import axios, { AxiosResponse } from "axios";
import { MessageModel } from "../model/MessageModel";
import { BillModel } from "../model/BillModel";
import { RevenuePitchModel } from "../model/RevenuePitchModel";
import axiosCustom from "../config/interceptors/interceptors";
import { RevenueDayModel } from "../model/RevenueDayModel";
import { EditPitchModel } from "../model/EditPitchModel";
import { PitchTimeModel, PitchTimeRequest } from "../model/PitchTimeModel";
import { PitchTypeModel } from "../model/PitchTypeModel";
import { PitchModel } from "../model/PitchModel";
import { TimeSlot } from "../model/TimeSlot";
import { ImagePitch } from "../model/ImagePitch";



// List các thông báo
export const getMessageAll = async (status: string) => {
    try {

        const url = `/booking/admin/confirm?status=${status}`
        const response: AxiosResponse<{ data: MessageModel[] }> = await axiosCustom.get(url);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

// Cập nhật trạng thái đặt sân
export const updateStatus = async (statusObj: {}) => {
    try {
        await axiosCustom.put('/booking/admin/confirm', statusObj);
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

// Tạo bill thanh toán
export const createBill = async (bill: BillModel) => {
    try {
        await axiosCustom.post(`/bill/admin`, bill);
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
}

// Lấy danh sách bill theo ngày
export const getBillDay = async (month: number, year: number) => {
    try {

        const url = `/bill/admin/billday?month=${month}&year=${year}`

        const response: AxiosResponse<{ data: RevenueDayModel[] }> = await axiosCustom.get(url);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

// Lấy danh sách bill theo sân
export const getBillPitch = async (month: number, year: number) => {
    try {

        const url = `/bill/admin/billpitch?month=${month}&year=${year}`

        const response: AxiosResponse<{ data: RevenuePitchModel[] }> = await axiosCustom.get(url);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

// Lấy danh sách pitch
export const getEditPitch = async () => {
    try {

        const url = `/pitch/admin`

        const response: AxiosResponse<{ data: EditPitchModel[] }> = await axiosCustom.get(url);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

// Thêm pitch
export const postEditPitch = async (pitch: PitchModel) => {
    try {

        const url = `/pitch/admin`
        await axiosCustom.post(url, pitch);

    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

// Cập nhật pitch
export const putEditPitch = async (pitch: PitchModel) => {
    try {

        const url = `/pitch/admin`
        await axiosCustom.put(url, pitch);

    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

// Xóa pitch
export const delEditPitch = async (id: number) => {
    try {

        const url = `/pitch/admin?id=${id}`
        await axiosCustom.delete(url);

    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};


// Thêm pitch_time
export const postPitchTime = async (pitchTime: PitchTimeRequest) => {
    try {

        const url = `/pitchtime/admin`
        await axiosCustom.post(url, pitchTime);

    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

// cập nhật pitch_time
export const putPitchTime = async (pitchTime: PitchTimeRequest) => {
    try {

        const url = `/pitchtime/admin`
        await axiosCustom.put(url, pitchTime);

    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

// Xóa pitch_time
export const deletePitchTime = async (pitchId: number, timeSlotId: number) => {


    try {
        const url = `/pitchtime/admin?pitchId=${pitchId}&timeSlotId=${timeSlotId}`
        await axiosCustom.delete(url);

    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

// Lấy danh sách pitch_time
export const getPitchTimeByPitchId = async (id: number) => {
    try {

        const url = `/pitchtime/admin?pitchId=${id}`

        const response: AxiosResponse<{ data: PitchTimeModel[] }> = await axiosCustom.get(url);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

// Lấy danh sách pitch_type
export const getPitchTypeAll = async () => {
    try {

        const url = `/pitchtype/admin`

        const response: AxiosResponse<{ data: PitchTypeModel[] }> = await axiosCustom.get(url);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

// Lấy danh sách time_slot
export const getTimeSlotAll = async () => {
    try {

        const url = `/timeslot/admin`

        const response: AxiosResponse<{ data: TimeSlot[] }> = await axiosCustom.get(url);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

// Thêm img
export const postImagePitch = async (formData: FormData) => {
    try {
        const url = `/image/admin`;
        const response = await axiosCustom.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Error uploading image');
    }
};

// Xóa img
export const deleteImagePitch = async (id: number) => {

    try {
        const url = `/image/admin?id=${id}`
        await axiosCustom.delete(url);

    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

// Lấy danh sách img
export const getImgByPitchId = async (pitchId: number) => {
    try {

        const url = `/image/admin?pitchId=${pitchId}`

        const response: AxiosResponse<{ data: ImagePitch[] }> = await axiosCustom.get(url);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

