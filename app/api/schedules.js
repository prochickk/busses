import client from "./client";

const endpoint = "/schedules";

const getSchedules = (user) => client.get("/schedules?userId=" + user.userId);

export const addSchedule = (schedule, onUploadProgress) => {
  const data = new FormData();
  data.append("typeCateLabel", schedule.typeCate.label);
  data.append("dayCateLabel", schedule.dayCate.label);
  data.append("timeCateLabel", schedule.timeCate.label);
  data.append("addressCateId", schedule.addressCate.idAddress);
  data.append("group", schedule.user.group);
  data.append("useId", schedule.user.userId);
  
  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export const deleteSchedule = (schedule, onUploadProgress) => {

  return client.delete("/schedules?scheduleId=" + schedule.item.idSchedule, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });

};

export default {
  deleteSchedule,
  addSchedule,
  getSchedules,
};
