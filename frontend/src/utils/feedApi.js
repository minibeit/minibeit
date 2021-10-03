import { API_URLS } from "../constants";
import { withAuthInstance, withoutAuthInstance } from "./common";

const {
    FEED_NEW,
    FEED_DELETE,
    FEED_DATE_NEW,
    GET_FEEDLIST,
    GET_FEEDDETAIL,
    APPLY_POST,
    BOOKMARK_POST,
    STATE_COMPLETE,
} = API_URLS;

export const feedCreateApi = async(infoinputs, files) => {
    const formData = new FormData();
    formData.append("title", infoinputs.title);
    formData.append("headcount", infoinputs.headcount);
    formData.append("content", infoinputs.content);
    formData.append("place", infoinputs.place);
    formData.append("payment", infoinputs.payment);
    if (infoinputs.payment === "CACHE") {
        formData.append("cache", infoinputs.cache);
    } else {
        formData.append("goods", infoinputs.goods);
    }
    formData.append("condition", infoinputs.condition);
    if (infoinputs.condition === "true") {
        formData.append("conditionDetail", infoinputs.conditionDetail);
    }
    formData.append("doTime", infoinputs.doTime);
    if (files) {
        formData.append("files", files);
    }
    formData.append("contact", infoinputs.contact);
    formData.append("schoolId", infoinputs.schoolId);
    formData.append("businessProfileId", infoinputs.businessProfileId);

    return await withAuthInstance.post(FEED_NEW, formData);
};

export const feedDateCreateApi = async(postId, dateinputs) => {
    const data = {
        startDate: dateinputs.startDay + "T" + dateinputs.startTime,
        endDate: dateinputs.endDay + "T" + dateinputs.endTime,
        doDateList: ["2021-09-02T03:30"],
    };
    return await withAuthInstance.post(
        FEED_DATE_NEW + postId + "/info/date",
        data
    );
};

export const feedDetailApi = async(feedId, isLogin) => {
    if (isLogin) {
        return await withAuthInstance.get(GET_FEEDDETAIL + feedId);
    } else {
        return await withoutAuthInstance.get(GET_FEEDDETAIL + feedId);
    }
};

export const feedDetailTimeApi = async(feedId, doDate) => {
    return await withoutAuthInstance.get(
        GET_FEEDDETAIL + feedId + `/start?doDate=${doDate}`
    );
};

export const feedEditApi = async(inputs, files, postId) => {
    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("content", inputs.content);
    formData.append("place", inputs.place);
    formData.append("pay", inputs.pay);
    formData.append("time", inputs.time);
    formData.append("files", files);
    formData.append("phoneNum", inputs.phoneNum);
    formData.append("dueDate", inputs.dueDate);
    formData.append("doDate", inputs.doDate);
    return await withAuthInstance.post(
        `http://3.36.95.15:8080/api/board/${postId}`,
        formData
    );
};

export const feedlistApi = async(page, schoolId, date, payment, isLogin) => {
    const doDate = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
    if (isLogin) {
        return await withAuthInstance.get(
            GET_FEEDLIST +
            `${schoolId}?page=${page}&size=10&paymentType=${payment}&doDate=${doDate}`
        );
    } else {
        return await withoutAuthInstance.get(
            GET_FEEDLIST +
            `${schoolId}?page=${page}&size=10&paymentType=${payment}&doDate=${doDate}`
        );
    }
};

export const applyApi = async(postId, postDoDateId) => {
    return await withAuthInstance.post(
        APPLY_POST + `${postId}/date/${postDoDateId}/apply`
    );
};

export const bookmarkApi = async(postId) => {
    return await withAuthInstance.post(BOOKMARK_POST + `${postId}/like`);
};

export const stateCompleteApi = async(postId, rejectComment) => {
    const data = {
        rejectComment: rejectComment
    }
    return await withAuthInstance.post(
        STATE_COMPLETE + postId + "/completed", data
    );
};

export const feedDeleteApi = async(postId) => {
    return await withAuthInstance.delete(FEED_DELETE + postId);
};