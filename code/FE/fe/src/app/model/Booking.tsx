export default class Booking {
  status?: String;
  note?: String;
  userId?: number;
  pitchId?: number;
  timeSlotId?: number;

  constructor(
    status?: String,
    note?: String,
    userId?: number,
    pitchId?: number,
    timeSlotId?: number
  ) {
    this.status = status;
    this.note = note;
    this.userId = userId;
    this.pitchId = pitchId;
    this.timeSlotId = timeSlotId;
  }
}
