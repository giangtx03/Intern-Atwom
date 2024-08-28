export class EditPitchModel {
    id?: number
    name?: string
    address?: string
    createAt?: string
    updateAt?: string
    type?: string
    sumTime?: number
    sumImg?: number
    pitchTimeChildrenDtos?: [{
        startTime?: string,
        endTime?: string,
        price?: number,
        status?: string,
        idTime?: number
    }]
    imageDtos?: [{
        id?: number,
        name?: File,
    }]
}