import{a as l,j as i}from"./jsx-runtime-670450c2.js";import{S as f,i as b,A as M,O as P}from"./index.esm-ac4cb3bc.js";import{r as n}from"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";const N={title:"Recipes/Devices",tags:["autodocs"]};function w(){const s=[];let t;for(t=f({min:1,max:10});t--;)s.push(m("audioinput"));for(t=f({min:1,max:10});t--;)s.push(m("audiooutput"));for(t=f({min:1,max:10});t--;)s.push(m("videoinput"));return new Promise((v,a)=>{setTimeout(()=>{Math.random()<.5&&a(new Error("Permission denied")),v(s)},1e3)})}function m(s){b(s);const t=M();return b(),{deviceId:M(),groupId:t,kind:s,label:P(),toJSON(){return this.deviceId}}}const r={render:function(){const[t,v]=n.useState(!0),[a,S]=n.useState([]),[x,C]=n.useState(!1);n.useEffect(()=>{let e=!0;return w().then(c=>{e&&S(c)}).catch(()=>{e&&C(!0)}).finally(()=>{e&&v(!1)}),()=>{e=!1}},[]);const d=n.useMemo(()=>a.filter(e=>e.kind==="audioinput"),[a]),o=n.useMemo(()=>a.filter(e=>e.kind==="audiooutput"),[a]),u=n.useMemo(()=>a.filter(e=>e.kind==="videoinput"),[a]),[I,p]=n.useState("");n.useEffect(()=>{d.length>0&&!d.some(e=>e.deviceId===I)&&p(d[0].deviceId)},[d,I]);const[h,O]=n.useState("");n.useEffect(()=>{o.length>0&&!o.some(e=>e.deviceId===h)&&O(o[0].deviceId)},[o,h]);const[D,g]=n.useState("");return n.useEffect(()=>{u.length>0&&!u.some(e=>e.deviceId===D)&&g(u[0].deviceId)},[u,D]),l("div",{children:[i("h1",{children:"Devices"}),x?i("p",{children:"Failed to get devices."}):t?i("div",{children:"Fetching devices..."}):l("div",{style:{display:"flex",flexDirection:"column",gap:4},children:[l("label",{children:[i("span",{children:"Microphone: "}),i("select",{onChange:e=>p(e.target.value),children:d.map(({deviceId:e,label:c})=>i("option",{value:e,children:c||"default"},e))})]}),l("label",{children:[i("span",{children:"Camera: "}),i("select",{onChange:e=>g(e.target.value),children:u.map(({deviceId:e,label:c})=>i("option",{value:e,children:c||"default"},e))})]}),l("label",{children:[i("span",{children:"Playback: "}),i("select",{onChange:e=>p(e.target.value),children:o.map(({deviceId:e,label:c})=>i("option",{value:e,children:c||"default"},e))})]})]})]})},parameters:{options:{showPanel:!1}}};var k,y,E;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: function Devices() {
    const [loading, setLoading] = useState(true);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [hasError, setError] = useState(false);
    useEffect(() => {
      let isMounted = true;
      getDevices().then(devices => {
        if (isMounted) setDevices(devices);
      })
      // **Note**: Make sure to handle errors that may occur when user denies access to media devices.
      .catch(() => {
        if (isMounted) setError(true);
      }).finally(() => {
        if (isMounted) setLoading(false);
      });
      return () => {
        isMounted = false;
      };
    }, []);
    const audioInputs = useMemo(() => devices.filter(e => e.kind === "audioinput"), [devices]);
    const audioOutputs = useMemo(() => devices.filter(e => e.kind === "audiooutput"), [devices]);
    const videoInputs = useMemo(() => devices.filter(e => e.kind === "videoinput"), [devices]);
    const [micDeviceId, setMicDeviceId] = useState("");
    // select first mic device if current mic device is not available
    useEffect(() => {
      if (audioInputs.length > 0 && !audioInputs.some(e => e.deviceId === micDeviceId)) {
        setMicDeviceId(audioInputs[0].deviceId);
      }
    }, [audioInputs, micDeviceId]);
    const [playbackDeviceId, setPlaybackDeviceId] = useState("");
    useEffect(() => {
      if (audioOutputs.length > 0 && !audioOutputs.some(e => e.deviceId === playbackDeviceId)) {
        setPlaybackDeviceId(audioOutputs[0].deviceId);
      }
    }, [audioOutputs, playbackDeviceId]);
    const [cameraDeviceId, setCameraDeviceId] = useState("");
    useEffect(() => {
      if (videoInputs.length > 0 && !videoInputs.some(e => e.deviceId === cameraDeviceId)) {
        setCameraDeviceId(videoInputs[0].deviceId);
      }
    }, [videoInputs, cameraDeviceId]);
    return <div>
        <h1>Devices</h1>
        {hasError ? <p>Failed to get devices.</p> : loading ? <div>Fetching devices...</div> : <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 4
      }}>
            <label>
              <span>Microphone:&nbsp;</span>
              <select onChange={e => setMicDeviceId(e.target.value)}>
                {audioInputs.map(({
              deviceId,
              label
            }) => <option key={deviceId} value={deviceId}>
                    {label || "default"}
                  </option>)}
              </select>
            </label>
            <label>
              <span>Camera:&nbsp;</span>
              <select onChange={e => setCameraDeviceId(e.target.value)}>
                {videoInputs.map(({
              deviceId,
              label
            }) => <option key={deviceId} value={deviceId}>
                    {label || "default"}
                  </option>)}
              </select>
            </label>
            <label>
              <span>Playback:&nbsp;</span>
              <select onChange={e => setMicDeviceId(e.target.value)}>
                {audioOutputs.map(({
              deviceId,
              label
            }) => <option key={deviceId} value={deviceId}>
                    {label || "default"}
                  </option>)}
              </select>
            </label>
          </div>}
      </div>;
  },
  parameters: {
    options: {
      showPanel: false
    }
  }
}`,...(E=(y=r.parameters)==null?void 0:y.docs)==null?void 0:E.source}}};const _=["Devices"];export{r as Devices,_ as __namedExportsOrder,N as default};
//# sourceMappingURL=Devices.stories-8f2defaf.js.map
