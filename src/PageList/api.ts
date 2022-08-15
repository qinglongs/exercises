import { formatResquestParamsToQuery } from "../utils/shared";

/** 分页分页请求参数 */
export type BasePageRequestParams = {
  page_now: number;
  page_size: number;
};

/** 分页请返回数据结构 */
export type BasePagingReponse<ListItem> = {
  list: ListItem[];
  page: {
    page_now: number;
    page_size: number;
    page_total: number;
    total_num: number;
  };
};

/** list 中每一项的字段 */
export type GetListReponseItem = {
  create_time: number;
  duration: number;
  id: string;
  title: string;
};

enum Api {
  GetList = "https://6cxx9pggi4.execute-api.us-east-1.amazonaws.com/prod/mock/meeting-c/list",
}

export const getList = async (params: BasePageRequestParams) => {
  const response = await fetch(
    Api.GetList + formatResquestParamsToQuery(params),
    { method: "GET", mode: "cors" }
  );

  // 做一个建议的请求拦截
  if (response.status === 200) {
    const { data } = await  response.json();
    
    return data as BasePagingReponse<GetListReponseItem>;
  }
  return Promise.reject();
};


const res = {
	code: 0,
	msg: "success",
	data: {
		list: [
			{
				id: "d9414e60384a45b2917e10fa129eaecd",
				title: "After operation common question others business top free",
				duration: 4617,
				create_time: 1660292151000,
			},
			{
				id: "c78b6f7510e640348aef2f2e93b1677d",
				title: "Resource toward mention figure deep",
				duration: 3468,
				create_time: 1660292151000,
			},
			{
				id: "2397e75860f549978c43ca0796ec356e",
				title: "Beat page system him still",
				duration: 2051,
				create_time: 1660292151000,
			},
			{
				id: "bc23e6b377c7499a811aec332fb9cf64",
				title: "Nearly prevent environmental least thank point",
				duration: 4729,
				create_time: 1660292151000,
			},
			{
				id: "3cfbd47d88c44ae28051737cc58c3b88",
				title: "Forget subject among production house consumer single",
				duration: 5067,
				create_time: 1660292071000,
			},
			{
				id: "55e694cf3fd94e40b8b4aaebb83775c1",
				title: "Tonight experience none soldier international program",
				duration: 2452,
				create_time: 1660292071000,
			},
			{
				id: "fd9af3338ee74140acd8c2f188d3aa9b",
				title: "Dream audience home stuff defense sense scene thought",
				duration: 3256,
				create_time: 1660292071000,
			},
			{
				id: "cfb04a741b354a349bba36cf8f87d993",
				title: "Agree everybody stuff clearly",
				duration: 2126,
				create_time: 1660291991000,
			},
			{
				id: "ffdac88424a941d689bffad278d742ea",
				title: "Use about able child thousand raise leader",
				duration: 2005,
				create_time: 1660291991000,
			},
			{
				id: "d559c397f8a547c69e46fb4134682f32",
				title: "Police mention rather media information source protect",
				duration: 3329,
				create_time: 1660291971000,
			},
			{
				id: "a97ad056d8364c149604099007c7c38a",
				title: "Sort compare party firm have",
				duration: 606,
				create_time: 1660291971000,
			},
			{
				id: "a5a9fd60ffb8442eb199eff9c6fd3d13",
				title: "Impact water occur great",
				duration: 5911,
				create_time: 1660291931000,
			},
			{
				id: "0c7261145e1c49089eb403b7871b06ee",
				title: "Ball condition source they bill",
				duration: 1273,
				create_time: 1660291931000,
			},
			{
				id: "1378acdc87db414ea1fb4a2de34fcbac",
				title: "Impact water occur great",
				duration: 5241,
				create_time: 1660291931000,
			},
			{
				id: "0c1b9da881314dc1bb8582c2a53cd629",
				title: "Tonight experience none soldier international program",
				duration: 1075,
				create_time: 1660291871000,
			},
			{
				id: "f422a83fe87c472dba8c4c6aef7d76de",
				title: "Case back major number",
				duration: 4847,
				create_time: 1660291871000,
			},
			{
				id: "d6b18b2f061b4142b3d825ef24dd082c",
				title: "Kid every short dog chance",
				duration: 3312,
				create_time: 1660291831000,
			},
			{
				id: "f686bdb72c794880851f08dcd0bb3c24",
				title: "Use about able child thousand raise leader",
				duration: 1676,
				create_time: 1660291831000,
			},
			{
				id: "5b8c4ed6ec64449d8a6e934040d7ac9b",
				title: "Agree everybody stuff clearly",
				duration: 4447,
				create_time: 1660291791000,
			},
			{
				id: "268ea454356a4c7ca93c4fff4596af7d",
				title: "Resource toward mention figure deep",
				duration: 5198,
				create_time: 1660291771000,
			},
			null,
			{
				id: "591649652a3a414cbcf4b861503460ef",
				title: "Yeah task how occur game",
				duration: 1577,
				create_time: 1660291711000,
			},
			{
				id: "452646102f9b44e4b2acff21bcdbdbd2",
				title: "After operation common question others business top free",
				duration: 2775,
				create_time: 1660291711000,
			},
			{
				id: "030542a32592496494f651d06fbbd7ae",
				title: "Dream audience home stuff defense sense scene thought",
				duration: 4703,
				create_time: 1660291691000,
			},
			{
				id: "d6719fd88565434f83a3d0f85758d775",
				title: "Use about able child thousand raise leader",
				duration: 5531,
				create_time: 1660291631000,
			},
			{
				id: "67ed7e807e094d0c8764dea7bc182ddf",
				title: "Use about able child thousand raise leader",
				duration: 1071,
				create_time: 1660291631000,
			},
			{
				id: "86287803af224083bf6286054b5596f4",
				title: "Tonight experience none soldier international program",
				duration: 3290,
				create_time: 1660291631000,
			},
			{
				id: "0620d7e09a1a4c988f2d83c254f810fc",
				title: "Dream audience home stuff defense sense scene thought",
				duration: 1758,
				create_time: 1660291611000,
			},
			{
				id: "5b52a8a34f0644a39c5c03958cfb597f",
				title: "Impact water occur great",
				duration: 1415,
				create_time: 1660291591000,
			},
			{
				id: "75408d7c89834f4f80bf1019223d2ddb",
				title: "Police mention rather media information source protect",
				duration: 604,
				create_time: 1660291571000,
			},
			{
				id: "5905affabd3a4a03bb5bf52b855a223d",
				title: "Resource toward mention figure deep",
				duration: 983,
				create_time: 1660291611000,
			},
			{
				id: "c8c0bdb6527644c48a453f459df059c4",
				title: "Yeah task how occur game",
				duration: 4204,
				create_time: 1660291531000,
			},
			{
				id: "cd4644af1aeb44adb6080410c8bb5065",
				title: "Use about able child thousand raise leader",
				duration: 751,
				create_time: 1660291511000,
			},
			{
				id: "9fb098bf27f042e9847baf8a8eed1aa1",
				title: "Nearly prevent environmental least thank point",
				duration: 3307,
				create_time: 1660291491000,
			},
			{
				id: "b20ca5e700134581948b12ed43863e99",
				title: "Impact water occur great",
				duration: 4297,
				create_time: 1660291471000,
			},
			{
				id: "535af7d95e054a1eaff9f7c3e2a9888b",
				title: "Resource toward mention figure deep",
				duration: 2409,
				create_time: 1660291451000,
			},
			{
				id: "edf6519a3a1b48e8a5bd988cd5626d30",
				title: "Nearly prevent environmental least thank point",
				duration: 4611,
				create_time: 1660291431000,
			},
			{
				id: "f3d55bf4a72a48a2afb885caca5fe59f",
				title: "After operation common question others business top free",
				duration: 1307,
				create_time: 1660291411000,
			},
			{
				id: "06d127c182f549b1834a8c04158396b3",
				title: "Police mention rather media information source protect",
				duration: 1498,
				create_time: 1660291391000,
			},
			{
				id: "5512fea10b084c558ae345a5b6f336e2",
				title: "Police mention rather media information source protect",
				duration: 1099,
				create_time: 1660291371000,
			},
			{
				id: "00b0bd63a76a4f32ba16cbe6c82c23f2",
				title: "Hold thus door camera play price",
				duration: 2530,
				create_time: 1660291351000,
			},
			{
				id: "6f943bc132ba4a5f99cc5f0dea59a34b",
				title: "Police mention rather media information source protect",
				duration: 4200,
				create_time: 1660291331000,
			},
			{
				id: "43755f7e2917465681977d4bcc8a69ba",
				title: "Resource toward mention figure deep",
				duration: 2125,
				create_time: 1660291311000,
			},
			{
				id: "ab9ced3d138c44c9874da3d1b0a900cf",
				title: "Nearly prevent environmental least thank point",
				duration: 3174,
				create_time: 1660291291000,
			},
			{
				id: "5ef0df9f4b23442181a27db25c538f0d",
				title: "Sort compare party firm have",
				duration: 2153,
				create_time: 1660291271000,
			},
			{
				id: "8f3565412a4d4e8ca396a329dd89ae1b",
				title: "Forget subject among production house consumer single",
				duration: 2397,
				create_time: 1660291251000,
			},
			{
				id: "a71cb496a6844194a5984c78b46449fe",
				title: "Tonight experience none soldier international program",
				duration: 5258,
				create_time: 1660291231000,
			},
			{
				id: "548956879f6f42b8ae54941be1012fac",
				title: "Impact water occur great",
				duration: 5417,
				create_time: 1660291211000,
			},
			{
				id: "ca22934310524332ab3e9dc0ae4ab45b",
				title: "Resource toward mention figure deep",
				duration: 5719,
				create_time: 1660291191000,
			},
			{
				id: "1a42bf5da6844c5e8d0ecd66969922bc",
				title: "Tonight experience none soldier international program",
				duration: 4528,
				create_time: 1660291171000,
			},
			{
				id: "65a36ce3e6744eea89a7b9abb335ba29",
				title: "After operation common question others business top free",
				duration: 5976,
				create_time: 1660291151000,
			},
			{
				id: "fc9a94e321464df59d790c76b5727391",
				title: "Yeah task how occur game",
				duration: 4948,
				create_time: 1660291131000,
			},
			{
				id: "8e37bfc822964259b5bd18447f47abbb",
				title: "Agree everybody stuff clearly",
				duration: 1012,
				create_time: 1660291111000,
			},
			{
				id: "5985a2e362c34de49dce3b8565a2c279",
				title: "Resource toward mention figure deep",
				duration: 2221,
				create_time: 1660291091000,
			},
			{
				id: "94a44bc1b6274b7e83891e5d72f78bea",
				title: "Forget subject among production house consumer single",
				duration: 4275,
				create_time: 1660291071000,
			},
			{
				id: "dbeceded8a8b4577893ca05400182df5",
				title: "Tonight experience none soldier international program",
				duration: 1895,
				create_time: 1660291051000,
			},
			{
				id: "873654557b8e4c24a939c517f25e4c93",
				title: "Approach break pretty ever last month",
				duration: 4844,
				create_time: 1660291031000,
			},
			{
				id: "6dca448b9ca248ed9ee4ab6286082164",
				title: "Nearly prevent environmental least thank point",
				duration: 2656,
				create_time: 1660291011000,
			},
			{
				id: "8642d7e7243842f1ac6035eadd8bc302",
				title: "Impact water occur great",
				duration: 3456,
				create_time: 1660290991000,
			},
			{
				id: "3a844c67116a4695835652ac425b63b0",
				title: "Hold thus door camera play price",
				duration: 5279,
				create_time: 1660290971000,
			},
			{
				id: "3c7e98e0b07444d2a259f6deaadf1088",
				title: "Player but movie major put idea",
				duration: 3811,
				create_time: 1660290951000,
			},
			{
				id: "589f3d44cada4df1bb0dcadc21e5bed6",
				title: "Beat page system him still",
				duration: 1092,
				create_time: 1660290931000,
			},
			{
				id: "e63c3f6e6bf3483b9ca832b2afe9b9d1",
				title: "Case back major number",
				duration: 1652,
				create_time: 1660290911000,
			},
			{
				id: "7c5041de453543289467b2594d594d2d",
				title: "Hold thus door camera play price",
				duration: 4033,
				create_time: 1660290891000,
			},
			{
				id: "76ecdb5253d6412abdf6ee9acb9f2418",
				title: "Resource toward mention figure deep",
				duration: 4705,
				create_time: 1660290871000,
			},
			{
				id: "d610f56f524f409293847fd8fd404603",
				title: "Tonight experience none soldier international program",
				duration: 4082,
				create_time: 1660290851000,
			},
			{
				id: "30b06b982ec14ca0af4d6af7c1b71c61",
				title: "Sort compare party firm have",
				duration: 5348,
				create_time: 1660290831000,
			},
			{
				id: "3dba480ab7f9411fb13c8f7afddd5dd2",
				title: "Case back major number",
				duration: 5646,
				create_time: 1660290811000,
			},
			{
				id: "14f7cdabe3794280955c6ea832c300e7",
				title: "Approach break pretty ever last month",
				duration: 746,
				create_time: 1660290791000,
			},
			{
				id: "286641f29b2340fb89cdc9cf0040568c",
				title: "Kid every short dog chance",
				duration: 3650,
				create_time: 1660290771000,
			},
			{
				id: "b4fb57c779564731bd87f7c3ae1409f4",
				title: "Century statement scientist another",
				duration: 3284,
				create_time: 1660290751000,
			},
			{
				id: "c5b8a78d1b2749368710a162545d5c46",
				title: "Yeah task how occur game",
				duration: 672,
				create_time: 1660290731000,
			},
			{
				id: "7448940dc3a1446ea4e65acfa1624bee",
				title: "Player but movie major put idea",
				duration: 4697,
				create_time: 1660290711000,
			},
			{
				id: "476c568acfab4e589d1299fc7099401e",
				title: "Nearly prevent environmental least thank point",
				duration: 2327,
				create_time: 1660290691000,
			},
			{
				id: "33a3b971f4664b8ea96a2aef512eef0d",
				title: "Agree everybody stuff clearly",
				duration: 1897,
				create_time: 1660290671000,
			},
			{
				id: "60b8332628a04b9990535d7bdd53a22e",
				title: "Hold thus door camera play price",
				duration: 2780,
				create_time: 1660290651000,
			},
			{
				id: "034c29741e4547ea856ad224d5f691ea",
				title: "After operation common question others business top free",
				duration: 4656,
				create_time: 1660290631000,
			},
			{
				id: "576527c9f3b6484c9b7fa5f6133e9766",
				title: "Sort compare party firm have",
				duration: 4492,
				create_time: 1660290611000,
			},
			{
				id: "8235aa72d6cd4970aca99bb16da2abc5",
				title: "Tonight experience none soldier international program",
				duration: 4669,
				create_time: 1660290591000,
			},
			{
				id: "1b90bf6e794f4dd5b73528bc06f458bb",
				title: "Hold thus door camera play price",
				duration: 1033,
				create_time: 1660290571000,
			},
			{
				id: "b048a94e3f33478893bdb47c0eebac36",
				title: "Yeah task how occur game",
				duration: 1430,
				create_time: 1660290551000,
			},
			{
				id: "6bb568657fb94052a997cdff71c56f28",
				title: "Beat page system him still",
				duration: 3010,
				create_time: 1660290531000,
			},
			{
				id: "8929f7a191ae42788cac4a96bd0951e2",
				title: "Forget subject among production house consumer single",
				duration: 2585,
				create_time: 1660290511000,
			},
			{
				id: "a09edb918b5c4a6eb6e1cbd193d3f7e4",
				title: "Police mention rather media information source protect",
				duration: 1469,
				create_time: 1660290451000,
			},
			{
				id: "ed6ddeefbda64792ae312047be52848d",
				title: "Impact water occur great",
				duration: 1802,
				create_time: 1660290451000,
			},
			{
				id: "52ebf1da2e914822ac0c23a24791d59a",
				title: "Kid every short dog chance",
				duration: 2229,
				create_time: 1660290451000,
			},
			{
				id: "e944519d8c194dc6a2cea2f66f8e3f63",
				title: "Beat page system him still",
				duration: 5972,
				create_time: 1660290411000,
			},
			{
				id: "e9cb5b7a59f644bc849ca3868622453c",
				title: "Sort compare party firm have",
				duration: 5972,
				create_time: 1660290411000,
			},
			{
				id: "da360000683642548a604e5eddc8653b",
				title: "Century statement scientist another",
				duration: 5634,
				create_time: 1660290311000,
			},
			{
				id: "a478a56847024ffdabc412cc3d7a2aa6",
				title: "Tonight experience none soldier international program",
				duration: 5860,
				create_time: 1660290311000,
			},
			{
				id: "b3aa7dd85ef54bd19ca536c56299a9d2",
				title: "Player but movie major put idea",
				duration: 4132,
				create_time: 1660290311000,
			},
			{
				id: "e6f60b19f8f647919f3c678c363aebed",
				title: "Yeah task how occur game",
				duration: 1030,
				create_time: 1660290291000,
			},
			{
				id: "27573828c6fa4b8e974f4c52ca073d75",
				title: "Dream audience home stuff defense sense scene thought",
				duration: 3137,
				create_time: 1660290311000,
			},
			{
				id: "fd71adbf6a9e4f5eaae42d1eee448a9a",
				title: "Tonight experience none soldier international program",
				duration: 5090,
				create_time: 1660290291000,
			},
			{
				id: "02ea5a8451d24df5b9057942d3a13ab5",
				title: "Sort compare party firm have",
				duration: 4760,
				create_time: 1660290271000,
			},
			{
				id: "f288617a02c14dc995ad987764dfe735",
				title: "Beat page system him still",
				duration: 3999,
				create_time: 1660290271000,
			},
			{
				id: "7c06bcab19604de48318dcc819225a74",
				title: "Ball condition source they bill",
				duration: 3650,
				create_time: 1660290231000,
			},
			{
				id: "0994f708a826400fa5876e2d3af246c4",
				title: "Forget subject among production house consumer single",
				duration: 1642,
				create_time: 1660290171000,
			},
			{
				id: "c7c5cdd0a0e248e882bbd21aacc1da88",
				title: "Hold thus door camera play price",
				duration: 1509,
				create_time: 1660290191000,
			},
			{
				id: "631c6a30ea654cd695a1f91f02220964",
				title: "After operation common question others business top free",
				duration: 5904,
				create_time: 1660290171000,
			},
		],
		page: { page_now: 1, page_size: 100, page_total: 200, total_num: 20000 },
	},
};