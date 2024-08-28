export class PitchModel {
    id?: number
    name?: string;
    address?: string;
    pitchTypeId?: number;
}

type ImageResponse = {
    id: number;
    name: string;
}

type TimeReponse = {
    startTime: number;
    endTime: string;
    price: number
    status: string;
}

export type PitchResponse = {
    id: number;
    name: string;
    address: string;
    create_at: string;
    update_at: string;
    pitch_type_name: string;
    images: ImageResponse[];
    times: TimeReponse[];
    avg_star: number;
}