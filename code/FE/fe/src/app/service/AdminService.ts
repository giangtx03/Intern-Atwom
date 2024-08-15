import axios, { AxiosResponse } from "axios";
import { MessageModel } from "../model/MessageModel";
import { BillModel } from "../model/BillModel";
import { RevenueDay } from "../model/RevenueDay";
import { RevenuePitch } from "../model/RevenuePitch";
import axiosCustom from "../config/interceptors/interceptors";


// List các thông báo
export const getMessageAll = async (status1: string, status2?: string) => {
    try {
        let url;
        if (status2) {
            url = `/booking/admin/confirm?status=${status1}&status=${status2}`
        } else {
            url = `/booking/admin/confirm?status=${status1}`
        }

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

// Lấy danh sách bill
export const getBillDay = async (month: number, year: number) => {
    try {

        const url = `/bill/admin/billday?month=${month}&year=${year}`

        const response: AxiosResponse<{ data: RevenueDay[] }> = await axiosCustom.get(url);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

// Lấy danh sách bill
export const getBillPitch = async (month: number, year: number) => {
    try {

        const url = `/bill/admin/billpitch?month=${month}&year=${year}`

        const response: AxiosResponse<{ data: RevenuePitch[] }> = await axiosCustom.get(url);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};



