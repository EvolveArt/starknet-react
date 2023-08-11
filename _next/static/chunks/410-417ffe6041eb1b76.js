"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[410],{7154:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.Connector=void 0,t.Connector=class{constructor({options:e}){this.options=e}}},5651:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.InjectedConnector=t.Connector=void 0;var r=n(7154);Object.defineProperty(t,"Connector",{enumerable:!0,get:function(){return r.Connector}});var o=n(2094);Object.defineProperty(t,"InjectedConnector",{enumerable:!0,get:function(){return o.InjectedConnector}})},2094:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.InjectedConnector=void 0;let r=n(7154),o=n(6851),a=n(5540);class c extends r.Connector{constructor({options:e}){super({options:e})}available(){return this.ensureWallet(),void 0!==this._wallet}async ready(){return await this.ensureWallet(),!!this._wallet&&await this._wallet.isPreauthorized()}async connect(){if(await this.ensureWallet(),!this._wallet)throw new o.ConnectorNotFoundError;try{await this._wallet.enable({starknetVersion:"v5"})}catch{throw new o.UserRejectedRequestError}if(!this._wallet.isConnected)throw new o.UserRejectedRequestError;return this._wallet.account}async disconnect(){if(await this.ensureWallet(),!this.available())throw new o.ConnectorNotFoundError;if(!this._wallet?.isConnected)throw new o.UserNotConnectedError}async account(){if(await this.ensureWallet(),!this._wallet)throw new o.ConnectorNotConnectedError;return this._wallet.account?this._wallet.account:null}get id(){return this.options.id}get name(){if(this.ensureWallet(),!this._wallet)throw new o.ConnectorNotConnectedError;return this._wallet.name}get icon(){if(this.ensureWallet(),!this._wallet)throw new o.ConnectorNotConnectedError;return this._wallet.icon}async initEventListener(e){if(await this.ensureWallet(),!this._wallet)throw new o.ConnectorNotConnectedError;this._wallet.on("accountsChanged",e)}async removeEventListener(e){if(await this.ensureWallet(),!this._wallet)throw new o.ConnectorNotConnectedError;this._wallet.off("accountsChanged",e)}async ensureWallet(){let e=(0,a.getStarknet)(),t=await e.getAvailableWallets(),n=t.filter(e=>e.id===this.options.id)[0];n&&(this._wallet=n)}}t.InjectedConnector=c},6851:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.UnsupportedAccountInterfaceError=t.UserNotConnectedError=t.UserRejectedRequestError=t.ConnectorNotFoundError=t.ConnectorNotConnectedError=t.ConnectorAlreadyConnectedError=void 0,t.ConnectorAlreadyConnectedError=class extends Error{constructor(){super(...arguments),this.name="ConnectorAlreadyConnectedError",this.message="Connector already connected"}},t.ConnectorNotConnectedError=class extends Error{constructor(){super(...arguments),this.name="ConnectorNotConnectedError",this.message="Connector not connected"}},t.ConnectorNotFoundError=class extends Error{constructor(){super(...arguments),this.name="ConnectorNotFoundError",this.message="Connector not found"}},t.UserRejectedRequestError=class extends Error{constructor(){super(...arguments),this.name="UserRejectedRequestError",this.message="User rejected request"}},t.UserNotConnectedError=class extends Error{constructor(){super(...arguments),this.name="UserNotConnectedError",this.message="User not connected"}},t.UnsupportedAccountInterfaceError=class extends Error{constructor(){super(...arguments),this.name="UnsupportedAccountInterfaceError",this.message="Unsupported account interface. starknet-react v1 only supports the starknet.js v5 account interface"}}},7209:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.useAccount=void 0;let r=n(2267),o=n(4766),a=n(288);t.useAccount=function({onConnect:e,onDisconnect:t}={}){let{account:n}=(0,a.useStarknet)(),{connectors:c}=(0,o.useConnectors)(),[s,i]=(0,r.useState)({status:"disconnected"}),u=(0,r.useCallback)(async()=>{if(!n)return s.isDisconnected||void 0===t||t(),i({status:"disconnected",isDisconnected:!0,isConnected:!1,isConnecting:!1,isReconnecting:!1});for(let t of c){if(!t.available())continue;let r=await t.account();if(r&&r?.address===n)return s.isDisconnected&&void 0!==e&&e({address:n,connector:t}),i({connector:t,account:r,address:n,status:"connected",isConnected:!0,isConnecting:!1,isDisconnected:!1,isReconnecting:!1})}},[i,n,c,e,t,s.isDisconnected]);return(0,r.useEffect)(()=>{u()},[u]),s}},7465:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.useBalance=void 0;let r=n(9043),o=n(2267),a=n(7169),c=n(2335),s=n(5128),i=n(2042),u=[{members:[{name:"low",offset:0,type:"felt"},{name:"high",offset:1,type:"felt"}],name:"Uint256",size:2,type:"struct"},{name:"balanceOf",type:"function",inputs:[{name:"account",type:"felt"}],outputs:[{name:"balance",type:"Uint256"}],stateMutability:"view"},{inputs:[],name:"symbol",outputs:[{name:"symbol",type:"felt"}],stateMutability:"view",type:"function"},{inputs:[],name:"decimals",outputs:[{name:"decimals",type:"felt"}],stateMutability:"view",type:"function"}];t.useBalance=function({token:e="0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",address:t,formatUnits:n,watch:l=!1,blockIdentifier:d="pending"}){let{chain:f}=(0,s.useNetwork)(),{contract:y}=(0,s.useContract)({abi:u,address:e}),h=(0,o.useMemo)(()=>(function({chain:e,args:t}){let{contract:n,address:r,blockIdentifier:o}=t;return[{entity:"balance",chainId:e?.id,contract:n?.address,args:r,blockIdentifier:o}]})({chain:f,args:{contract:y,address:t,blockIdentifier:d}}),[f,y,t,d]),{data:v,error:b,isStale:p,isLoading:_,isFetching:C,isSuccess:m,isError:g,isFetched:w,isFetchedAfterMount:k,isRefetching:E,refetch:S,status:N}=(0,a.useQuery)(h,function({args:e}){return async()=>{if(!e.address||!e.contract)return null;try{let[t,n,r]=await Promise.all([e.contract.call("balanceOf",[e.address],{parseResponse:!0}),e.contract.call("symbol",[]),e.contract.call("decimals",[])]),o=i.balanceSchema.parse(t),a=i.symbolSchema.parse(n),c=i.decimalsSchema.parse(r);return{balance:o,symbol:a,decimals:c}}catch{return null}}}({args:{contract:y,address:t,blockIdentifier:d}}),{enabled:!!t});(0,c.useInvalidateOnBlock)({enabled:l,queryKey:h});let O=(0,o.useMemo)(()=>{if(!v)return;let{decimals:{decimals:e},balance:{balance:t},symbol:{symbol:o}}=v,a=Number(e),c=r.uint256.uint256ToBN(t),s=(Number(c.toString())/10**(n||a)).toString(),i=r.shortString.decodeShortString(r.num.toHex(o));return{decimals:a,formatted:s,symbol:i,value:c}},[v,n]);return{data:O,error:b??void 0,isIdle:p,isLoading:_,isFetching:C,isSuccess:m,isError:g,isFetched:w,isFetchedAfterMount:k,isRefetching:E,refetch:S,status:N}}},2042:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.balanceSchema=t.symbolSchema=t.decimalsSchema=t.uint256Schema=void 0;let r=n(2150);t.uint256Schema=r.z.object({low:r.z.bigint(),high:r.z.bigint()}),t.decimalsSchema=r.z.object({decimals:r.z.bigint()}),t.symbolSchema=r.z.object({symbol:r.z.bigint()}),t.balanceSchema=r.z.object({balance:t.uint256Schema})},4298:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.useBlockNumber=t.useBlock=void 0;let r=n(7169),o=n(288);function a({library:e,args:t}){return async()=>await e.getBlock(t.blockIdentifier)}t.useBlock=function({refetchInterval:e,onSuccess:t,blockIdentifier:n="latest"}={}){let{library:c}=(0,o.useStarknet)(),{data:s,error:i,isStale:u,isLoading:l,isFetching:d,isSuccess:f,isError:y,isFetched:h,isFetchedAfterMount:v,isRefetching:b,refetch:p,status:_}=(0,r.useQuery)(["block",n],a({library:c,args:{blockIdentifier:n}}),{refetchInterval:e,useErrorBoundary:!0,onSuccess:e=>{e&&t&&t(e)}});return{data:s,error:i,isIdle:u,isLoading:l,isFetching:d,isSuccess:f,isError:y,isFetched:h,isFetchedAfterMount:v,isRefetching:b,refetch:p,status:_}},t.useBlockNumber=function({refetchInterval:e,onSuccess:t}={}){let{library:n}=(0,o.useStarknet)(),{data:c,error:s,isStale:i,isLoading:u,isFetching:l,isSuccess:d,isError:f,isFetched:y,isFetchedAfterMount:h,isRefetching:v,refetch:b,status:p}=(0,r.useQuery)(["block","latest"],a({library:n,args:{blockIdentifier:"latest"}}),{refetchInterval:e,useErrorBoundary:!0,onSuccess:e=>{e&&t&&t(e.block_number)}});return{data:c?.block_number,error:s,isIdle:i,isLoading:u,isFetching:l,isSuccess:d,isError:f,isFetched:y,isFetchedAfterMount:h,isRefetching:v,refetch:b,status:p}}},4709:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.useContractRead=void 0;let r=n(7169),o=n(2267),a=n(3756),c=n(2335),s=n(8550);t.useContractRead=function({abi:e,address:t,functionName:n,args:i,watch:u=!1,blockIdentifier:l="pending"}){let{chain:d}=(0,s.useNetwork)(),{contract:f}=(0,a.useContract)({abi:e,address:t}),y=(0,o.useMemo)(()=>(function({chain:e,args:t}){let{contract:n,functionName:r,args:o,blockIdentifier:a}=t;return[{entity:"readContract",chain:e,contract:n?.address,functionName:r,args:o,blockIdentifier:a}]})({chain:d,args:{contract:f,functionName:n,args:i,blockIdentifier:l}}),[d,f,n,i,l]),{data:h,error:v,isStale:b,isLoading:p,isFetching:_,isSuccess:C,isError:m,isFetched:g,isFetchedAfterMount:w,isRefetching:k,refetch:E,status:S}=(0,r.useQuery)(y,function({args:e}){return async()=>{if(!e.args||!e.contract||!e.functionName)return null;let t=e.contract&&e.functionName;if(!t)return null;let n=e.contract[e.functionName];if(!n)throw Error(`Function ${e.functionName} not found on contract`);return await n(...e.args,{blockIdentifier:e.blockIdentifier})}}({args:{contract:f,functionName:n,args:i,blockIdentifier:l}}));return(0,c.useInvalidateOnBlock)({enabled:u,queryKey:y}),{data:h,error:v??void 0,isIdle:b,isLoading:p,isFetching:_,isSuccess:C,isError:m,isFetched:g,isFetchedAfterMount:w,isRefetching:k,refetch:E,status:S}}},4766:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.useConnectors=void 0;let r=n(2267),o=n(288);t.useConnectors=function(){let{connectors:e,connect:t,disconnect:n}=(0,o.useStarknet)(),[a,c]=(0,r.useState)([]),[s,i]=(0,r.useState)(!0);(0,r.useEffect)(()=>{c(e.filter(e=>e.available())),i(!1)},[e,c]);let u=(0,r.useCallback)(()=>{c(e.filter(e=>e.available())),i(!1)},[e,c,i]);return{available:a,connectors:e,connect:t,disconnect:n,refresh:u,isLoading:s}}},3756:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.useContractFactory=t.useContract=void 0;let r=n(2267),o=n(9043),a=n(288);t.useContract=function({abi:e,address:t}){let{library:n}=(0,a.useStarknet)(),c=(0,r.useMemo)(()=>{if(e&&t&&n)return new o.Contract(e,t,n)},[e,t,n]);return{contract:c}},t.useContractFactory=function({compiledContract:e,classHash:t,abi:n,account:a}){let c=(0,r.useMemo)(()=>{if(e&&a&&t)return new o.ContractFactory(e,t,a,n)},[e,t,a,n]);return{contractFactory:c}}},3767:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.useDeploy=void 0;let r=n(7169),o=n(9043);t.useDeploy=function({contractFactory:e,constructorCalldata:t,addressSalt:n}){let{data:a,isLoading:c,error:s,reset:i,mutateAsync:u,mutate:l,isError:d,isIdle:f,isSuccess:y,status:h}=(0,r.useMutation)(function({contractFactory:e,constructorCalldata:t,addressSalt:n}){return async()=>{if(void 0===e)throw Error("No contract factory defined");return await e.deploy(o.CallData.toCalldata(t),{addressSalt:n})}}({contractFactory:e,constructorCalldata:t,addressSalt:n}));return{data:a,isLoading:c,error:s??void 0,reset:i,deploy:l,deployAsync:u,isError:d,isIdle:f,isSuccess:y,status:h}}},8543:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.useContractWrite=void 0;let r=n(7169),o=n(7209);t.useContractWrite=function({calls:e,metadata:t}){let{account:n}=(0,o.useAccount)(),{data:a,isLoading:c,error:s,reset:i,mutate:u,mutateAsync:l,isIdle:d,isSuccess:f,status:y,isError:h}=(0,r.useMutation)(function({account:e,args:t}){return async()=>{let{calls:n,metadata:r}=t;if(void 0===e)throw Error("No connector connected");if(void 0===n)throw Error("No calls specified");let o=await e.execute(n);return console.warn("TODO: ignoring metadata",r),o}}({account:n,args:{calls:e,metadata:t}}));return{data:a,error:s??void 0,reset:i,write:u,writeAsync:l,isError:h,isIdle:d,isLoading:c,isSuccess:f,status:y}}},9289:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(7209),t),o(n(7465),t),o(n(4298),t),o(n(4709),t),o(n(4766),t),o(n(3756),t),o(n(3767),t),o(n(8543),t),o(n(2557),t),o(n(8550),t),o(n(2609),t),o(n(7104),t),o(n(7294),t),o(n(7317),t)},2335:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.useInvalidateOnBlock=void 0;let r=n(7169),o=n(2267),a=n(4298);t.useInvalidateOnBlock=function({enabled:e,queryKey:t}){let n=(0,r.useQueryClient)(),[c,s]=(0,o.useState)(void 0);(0,a.useBlock)({refetchInterval:5e3,onSuccess:e?async e=>{e.block_hash!==c&&(await n.invalidateQueries(t,{refetchType:"all"}),s(e.block_hash))}:void 0})}},2557:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.useProvider=void 0;let r=n(288);t.useProvider=function(){let{library:e}=(0,r.useStarknet)();return{provider:e}}},8550:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.useNetwork=void 0;let r=n(2267),o=n(288),a=n(2725);t.useNetwork=function(){let{library:e}=(0,o.useStarknet)(),[t,n]=(0,r.useState)();return(0,r.useEffect)(()=>{e?e.getChainId().then(e=>n((0,a.chainById)(e))):n(void 0)},[e]),{chain:t}}},7294:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.useWaitForTransaction=void 0;let r=n(7169),o=n(2267),a=n(288),c=n(2335),s=n(8550);t.useWaitForTransaction=function({hash:e,watch:t,onAcceptedOnL1:n,onAcceptedOnL2:i,onNotReceived:u,onPending:l,onReceived:d,onRejected:f}){let{library:y}=(0,a.useStarknet)(),{chain:h}=(0,s.useNetwork)(),v=(0,o.useMemo)(()=>(function({chain:e,hash:t}){return[{entity:"transactionReceipt",chainId:e?.id,hash:t}]})({chain:h,hash:e}),[h,e]),{data:b,error:p,isStale:_,isLoading:C,isFetching:m,isSuccess:g,isError:w,isFetched:k,isFetchedAfterMount:E,isRefetching:S,refetch:N,status:O}=(0,r.useQuery)(v,function({library:e,hash:t}){return async()=>{if(!t)throw Error("hash is required");return await e.getTransactionReceipt(t)}}({library:y,hash:e}),{enabled:!!e,refetchInterval:(e,n)=>!!t&&function(e){if(!e)return!1;let{status:t}=e;switch(t){case"ACCEPTED_ON_L1":case"REJECTED":default:return!1;case"ACCEPTED_ON_L2":return 6e4;case"NOT_RECEIVED":return 500;case"PENDING":case"RECEIVED":return 5e3}}(e),onSuccess:e=>{let{status:t}=e;switch(t){case"ACCEPTED_ON_L1":n&&n(e);break;case"ACCEPTED_ON_L2":i&&i(e);break;case"NOT_RECEIVED":u&&u(e);break;case"PENDING":l&&l(e);break;case"RECEIVED":d&&d(e);break;case"REJECTED":f&&f(e)}}});return(0,c.useInvalidateOnBlock)({enabled:t,queryKey:v}),{data:b,error:p??void 0,isIdle:_,isLoading:C,isFetching:m,isSuccess:g,isError:w,isFetched:k,isFetchedAfterMount:E,isRefetching:S,refetch:N,status:O}}},2609:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.useSignTypedData=void 0;let r=n(9043),o=n(2267),a=n(7209),c=n(4766);function s(e,t){return"start_signing"===t.type?{...e,isLoading:!0}:"set_signature"===t.type?{...e,data:r.stark.formatSignature(t.data),isLoading:!1}:"set_error"===t.type?{...e,error:t.error,isLoading:!1}:"reset"===t.type?{...e,data:void 0,error:void 0,isLoading:!1}:e}t.useSignTypedData=function(e){let[t,n]=(0,o.useReducer)(s,{isLoading:!1}),{address:r}=(0,a.useAccount)(),{connectors:i}=(0,c.useConnectors)(),u=(0,o.useCallback)(()=>{n({type:"reset"})},[n]),{data:l,error:d,isLoading:f}=t,y=(0,o.useCallback)(async()=>{n({type:"reset"}),n({type:"start_signing"});try{let t=null,o=i.filter(e=>e.available());for(let e of o){let n=await e.account();if(n&&n.address===r){t=n;break}}if(!t)throw Error(`No connector for address ${r}`);let a=await t.signMessage(e);return n({type:"set_signature",data:a}),a}catch(t){let e=t instanceof Error?t.message:String(t);n({type:"set_error",error:e}),console.error(t)}},[r,i,e]);return{data:l,error:d,isLoading:f,isError:!!d,signTypedData:y,reset:u}}},7317:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.useAddressFromStarkName=t.useStarkName=void 0;let r=n(7169),o=n(9043),a=n(288);t.useStarkName=function({address:e,contract:t}){let{library:n}=(0,a.useStarknet)(),{data:c,isLoading:s,isSuccess:i,isError:u,error:l,isFetching:d,isStale:f,isFetched:y,isFetchedAfterMount:h,isRefetching:v,refetch:b,status:p}=(0,r.useQuery)({queryKey:["starkName"],queryFn:async()=>{let r=new o.Provider(n);console.log("lookup ",e," on ",t);let a=r.getStarkName(e,t);if(console.log("result",a),a instanceof Error)throw Error(a.message);return a}});return{data:c,isLoading:s,isSuccess:i,isError:u,error:l,isIdle:f,isFetching:d,isFetched:y,isFetchedAfterMount:h,isRefetching:v,refetch:b,status:p}},t.useAddressFromStarkName=function({name:e,contract:t}){let{library:n}=(0,a.useStarknet)(),{data:c,isLoading:s,isSuccess:i,isError:u,error:l,isFetching:d,isStale:f,isFetched:y,isFetchedAfterMount:h,isRefetching:v,refetch:b,status:p}=(0,r.useQuery)({queryKey:["addressFromStarkName"],queryFn:async()=>{let r=new o.Provider(n),a=r.getAddressFromStarkName(e,t);if(a instanceof Error)throw Error(a.message);return a}});return{data:c,isLoading:s,isSuccess:i,isError:u,error:l,isIdle:f,isFetching:d,isFetched:y,isFetchedAfterMount:h,isRefetching:v,refetch:b,status:p}}},7104:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.useTransactions=t.useTransaction=void 0;let r=n(7169),o=n(288),a=n(2335),c=n(8550);function s({chain:e,hash:t}){return[{entity:"transaction",chainId:e?.id,hash:t}]}function i({library:e,hash:t}){return async()=>{if(!t)throw Error("hash is required");return await e.getTransaction(t)}}t.useTransaction=function({hash:e,watch:t=!1}){let{library:n}=(0,o.useStarknet)(),{chain:u}=(0,c.useNetwork)(),l=s({chain:u,hash:e}),{data:d,error:f,isStale:y,isLoading:h,isFetching:v,isSuccess:b,isError:p,isFetched:_,isFetchedAfterMount:C,isRefetching:m,refetch:g,status:w}=(0,r.useQuery)(l,i({library:n,hash:e}));return(0,a.useInvalidateOnBlock)({enabled:t,queryKey:l}),{data:d,error:f??void 0,isIdle:y,isLoading:h,isFetching:v,isSuccess:b,isError:p,isFetched:_,isFetchedAfterMount:C,isRefetching:m,refetch:g,status:w}},t.useTransactions=function({hashes:e,watch:t=!1}){let{library:n}=(0,o.useStarknet)(),{chain:u}=(0,c.useNetwork)(),l=(0,r.useQueries)({queries:e.map(e=>({queryKey:s({chain:u,hash:e}),queryFn:i({library:n,hash:e})}))});return(0,a.useInvalidateOnBlock)({enabled:t,queryKey:[{entity:"transaction",chainId:u?.id}]}),l.map(({data:e,error:t,isStale:n,isLoading:r,isFetching:o,isSuccess:a,isError:c,isFetched:s,isFetchedAfterMount:i,isRefetching:u,refetch:l,status:d})=>({data:e,error:t??void 0,isIdle:n,isLoading:r,isFetching:o,isSuccess:a,isError:c,isFetched:s,isFetchedAfterMount:i,isRefetching:u,refetch:l,status:d}))}},5128:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),t.useTransactionManager=t.StarknetConfig=void 0;var a=n(288);Object.defineProperty(t,"StarknetConfig",{enumerable:!0,get:function(){return a.StarknetConfig}}),Object.defineProperty(t,"useTransactionManager",{enumerable:!0,get:function(){return a.useTransactionManager}}),o(n(9289),t),o(n(5651),t),o(n(2725),t)},2725:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.chainById=void 0;let r=n(9043);t.chainById=function(e){return o[e]};let o={[r.constants.StarknetChainId.SN_MAIN]:{id:r.constants.StarknetChainId.SN_MAIN,name:"Starknet Mainnet",testnet:!1},[r.constants.StarknetChainId.SN_GOERLI]:{id:r.constants.StarknetChainId.SN_GOERLI,name:"Starknet G\xf6rli"},[r.constants.StarknetChainId.SN_GOERLI2]:{id:r.constants.StarknetChainId.SN_GOERLI2,name:"Starknet G\xf6rli 2"}}},288:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),t.StarknetConfig=void 0;let a=n(2079),c=n(2471),s=n(463);o(n(2471),t),o(n(463),t),t.StarknetConfig=function({children:e,...t}){return(0,a.jsx)(c.StarknetProvider,{...t,children:(0,a.jsx)(s.TransactionManagerProvider,{children:e})})}},2471:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.StarknetProvider=t.useStarknet=void 0;let r=n(2079),o=n(7169),a=n(2267),c=n(9043),s=n(6851),i=new c.Provider({sequencer:{network:c.constants.NetworkName.SN_MAIN}}),u=(0,a.createContext)({account:void 0,connect:()=>void 0,disconnect:()=>void 0,library:i,connectors:[]});function l(e,t){switch(t.type){case"set_account":return{...e,account:t.account};case"set_provider":return{...e,library:t.provider??i};case"set_connector":return{...e,connector:t.connector};case"set_error":return{...e,error:t.error};default:return e}}t.useStarknet=function(){return(0,a.useContext)(u)},t.StarknetProvider=function({children:e,defaultProvider:t,connectors:n,autoConnect:c,queryClient:d}){let f=function({defaultProvider:e,connectors:t,autoConnect:n}){let r=t??[],[o,c]=(0,a.useReducer)(l,{library:e||i,connectors:r}),{account:u,library:d,error:f}=o,y=(0,a.useCallback)(e=>{e.connect().then(t=>{c({type:"set_account",account:t.address}),c({type:"set_provider",provider:t}),c({type:"set_connector",connector:e}),n&&localStorage.setItem("lastUsedConnector",e.id)},e=>{console.error(e),c({type:"set_error",error:new s.ConnectorNotFoundError})})},[n]),h=(0,a.useCallback)(()=>{c({type:"set_account",account:void 0}),c({type:"set_provider",provider:e||i}),c({type:"set_connector",connector:void 0}),n&&localStorage.removeItem("lastUsedConnector"),o.connector&&(o.connector.removeEventListener(v),o.connector.disconnect().catch(e=>{console.error(e),c({type:"set_error",error:new s.ConnectorNotFoundError})}))},[n,o.connector,e]),v=(0,a.useCallback)(()=>{h(),o.connector&&y(o.connector)},[o.connector,y,h]);return(0,a.useEffect)(()=>{o.connector&&o.connector?.initEventListener(v)},[o.connector,v]),(0,a.useEffect)(()=>{async function e(e){let t=localStorage.getItem("lastUsedConnector");if(null===t)return;let n=e.find(e=>e.id===t);if(void 0!==n)try{if(!await n.ready())return;y(n)}catch{}}n&&!u&&e(r)},[]),{account:u,connect:y,disconnect:h,connectors:r,library:d,error:f}}({defaultProvider:t,connectors:n,autoConnect:c});return(0,r.jsx)(o.QueryClientProvider,{client:d??new o.QueryClient,children:(0,r.jsx)(u.Provider,{value:f,children:e})})}},463:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.TransactionManagerProvider=t.useTransactionManager=t.TransactionManagerContext=void 0;let r=n(2079),o=n(2267),a=n(9338);function c(e,t){switch(t.type){case"add_transaction":{let n=e.hashes.add(t.hash),r=e.transactions.set(t.hash,{hash:t.hash,metadata:t.metadata});return{...e,hashes:n,transactions:r}}case"remove_transaction":{let n=e.hashes.remove(t.hash),r=e.transactions.delete(t.hash);return{...e,hashes:n,transactions:r}}default:return e}}t.TransactionManagerContext=(0,o.createContext)({transactions:[],hashes:[],addTransaction:({hash:e,metadata:t})=>void 0,removeTransaction:({hash:e})=>void 0}),t.useTransactionManager=function(){let e=(0,o.useContext)(t.TransactionManagerContext);if(!e)throw Error("useTransactionManager must be used inside TransactionManagerProvider");return e},t.TransactionManagerProvider=function({children:e}){let[n,s]=(0,o.useReducer)(c,{hashes:(0,a.OrderedSet)(),transactions:(0,a.OrderedMap)()}),i=(0,o.useCallback)(({hash:e,metadata:t})=>{s({type:"add_transaction",hash:e,metadata:t})},[s]),u=(0,o.useCallback)(({hash:e})=>{s({type:"remove_transaction",hash:e})},[s]),l=t.TransactionManagerContext.Provider,d=n.transactions;return(0,r.jsx)(l,{value:{transactions:d.valueSeq().toArray(),hashes:d.keySeq().toArray(),addTransaction:i,removeTransaction:u},children:e})}}}]);