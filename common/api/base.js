import http from "./http";

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 *
 */

const homeAlbum = (data) => {
  return http.request({
    url: "/addon/face/home/album",
    method: "GET",
    data: data,
  });
};
const homeRandom = (data) => {
  return http.request({
    url: "/addon/face/home/random",
    method: "GET",
    data: data,
  });
};
const homeSearch = (data) => {
  return http.request({
    url: "/addon/face/home/search",
    method: "GET",
    data: data,
  });
};
const homeRelate = (data) => {
  return http.request({
    url: "/addon/face/home/relate",
    method: "GET",
    data: data,
  });
};
const homeAlbumList = (data) => {
  return http.request({
    url: "/addon/face/home/albumList",
    method: "GET",
    data: data,
  });
};
const homeDownload = (data) => {
  return http.request({
    url: "/addon/face/home/download",
    method: "GET",
    data: data,
  });
};

// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
  homeAlbum,
  homeRandom,
  homeSearch,
  homeRelate,
  homeAlbumList,
  homeDownload,
};
