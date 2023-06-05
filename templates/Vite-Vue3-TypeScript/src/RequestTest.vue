<script setup lang="ts">
import request from "./service";
import { onMounted } from "vue";

interface Req {
  apiKey: string;
  area?: string;
  areaID?: string;
}

interface Res {
  area: string;
  areaCode: string;
  areaid: string;
  dayList: any[];
}

const get15DaysWeatherByArea = (data: Req) => {
  return request<Req, Res>({
    url: "/api/common/weather/get15DaysWeatherByArea",
    method: "GET",
    data,
    interceptors: {
      requestInterceptors(res) {
        console.log("接口请求拦截");

        return res;
      },
      responseInterceptors(result) {
        console.log("接口响应拦截");
        return result;
      },
    },
  });
};

onMounted(async () => {
  const res = await get15DaysWeatherByArea({
    apiKey: 'XwjmKTh537ea31cda48b83ccecfa8731275fc9fb687e9b7',
    area: "北京市",
  });
  console.log(res.result.dayList);
});
</script>
