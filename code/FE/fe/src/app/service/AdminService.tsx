import axios, { AxiosResponse } from "axios";
import { MessageModel } from "../model/MessageModel";
import { BillModel } from "../model/BillModel";

// Cấu hình axios
const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

// List các thông báo
export const getMessageAll = async (status1: string, status2?: string) => {
    try {
        let url;
        if (status2) {
            url = `/booking/admin/confirm?status=${status1}&status=${status2}`
        } else {
            url = `/booking/admin/confirm?status=${status1}`
        }

        const response: AxiosResponse<{ data: MessageModel[] }> = await api.get(url);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

// Cập nhật trạng thái đặt sân
export const updateStatus = async (statusObj: {}) => {
    try {
        await api.put('/booking/admin/confirm', statusObj);
    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
};

// Tạo bill thanh toán
export const createBill = async (bill: BillModel) => {
    try {
        await api.post(`/bill/admin`, bill);

    } catch (error) {
        console.error('Error fetching data', error);
        throw error;
    }
}



