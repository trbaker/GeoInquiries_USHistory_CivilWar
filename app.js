/* =====================================================================
   DATA
   All historical statements below are drawn from the National Park
   Service (CWSAC battle summaries), the American Battlefield Trust,
   and the Esri GeoInquiry lesson. See the "Sources" panel in the app.
   ===================================================================== */

// State classification during the Civil War (modern state names, so this
// can be joined to Esri's USA States layer). Modern boundaries are used for
// display; see the Teacher notes about West Virginia and the territories.
const STATE_CLASS = {
  // Seceded and joined the Confederacy (secession ordinance dates)
  "South Carolina":{cls:"confed",note:"Seceded Dec. 20, 1860 (first state to secede)"},
  "Mississippi":{cls:"confed",note:"Seceded Jan. 9, 1861"},
  "Florida":{cls:"confed",note:"Seceded Jan. 10, 1861"},
  "Alabama":{cls:"confed",note:"Seceded Jan. 11, 1861"},
  "Georgia":{cls:"confed",note:"Seceded Jan. 19, 1861"},
  "Louisiana":{cls:"confed",note:"Seceded Jan. 26, 1861"},
  "Texas":{cls:"confed",note:"Seceded Feb. 1, 1861"},
  "Virginia":{cls:"confed",note:"Seceded Apr. 17, 1861 (after Fort Sumter); Richmond became the Confederate capital"},
  "Arkansas":{cls:"confed",note:"Seceded May 6, 1861"},
  "North Carolina":{cls:"confed",note:"Seceded May 20, 1861"},
  "Tennessee":{cls:"confed",note:"Seceded June 8, 1861 (last state to secede)"},
  // Border states: slavery legal, but did not secede
  "Delaware":{cls:"border",note:"Slave state that remained in the Union"},
  "Maryland":{cls:"border",note:"Slave state that remained in the Union; surrounds Washington, D.C."},
  "Kentucky":{cls:"border",note:"Slave state that remained in the Union"},
  "Missouri":{cls:"border",note:"Slave state that remained in the Union"},
  // Union free states
  "Maine":{cls:"union"},"New Hampshire":{cls:"union"},"Vermont":{cls:"union"},
  "Massachusetts":{cls:"union"},"Rhode Island":{cls:"union"},"Connecticut":{cls:"union"},
  "New York":{cls:"union"},"New Jersey":{cls:"union"},"Pennsylvania":{cls:"union"},
  "Ohio":{cls:"union"},"Indiana":{cls:"union"},"Illinois":{cls:"union"},
  "Michigan":{cls:"union"},"Wisconsin":{cls:"union"},"Minnesota":{cls:"union"},
  "Iowa":{cls:"union"},"California":{cls:"union"},"Oregon":{cls:"union"},
  "Kansas":{cls:"union",note:"Admitted as a free state Jan. 29, 1861"},
  "West Virginia":{cls:"union",note:"Formed from Virginia's western counties; admitted to the Union June 20, 1863"},
  "Nevada":{cls:"union",note:"Territory in 1861; admitted as a state Oct. 31, 1864"},
  // Territories in 1861 (shown with modern state outlines)
  "Washington":{cls:"territory"},"Idaho":{cls:"territory"},"Montana":{cls:"territory"},
  "Wyoming":{cls:"territory"},"North Dakota":{cls:"territory"},"South Dakota":{cls:"territory"},
  "Nebraska":{cls:"territory"},"Colorado":{cls:"territory"},"Utah":{cls:"territory"},
  "New Mexico":{cls:"territory"},"Arizona":{cls:"territory"},
  "Oklahoma":{cls:"territory",note:"Indian Territory in 1861"},
  "District of Columbia":{cls:"union",note:"Capital of the United States"}
};
const CLASS_LABEL = {union:"Union (North)",confed:"Confederate (South)",border:"Border state",territory:"Territory in 1861"};

const CAPITALS = [
  {name:"Washington, D.C.",side:"Union capital",lat:38.8895,lon:-77.0353,cls:"union"},
  {name:"Richmond, Virginia",side:"Confederate capital",lat:37.5386,lon:-77.4340,cls:"confed"}
];

// Key battles used in the "Find the battle" challenge. Locations are taken
// live from the ArcGIS Online battle layer (matched by name), not hard-coded.
const KEY_BATTLES = [
  {names:["Fort Sumter"],title:"Fort Sumter",date:"April 12–13, 1861",place:"Charleston Harbor, South Carolina",
   facts:"Confederate batteries bombarded the Union-held fort for about 34 hours; the garrison under Maj. Robert Anderson surrendered. It was the opening engagement of the war."},
  {names:["First Manassas","First Bull Run","Manassas I","Bull Run I"],title:"First Manassas (First Bull Run)",date:"July 21, 1861",place:"Manassas, Virginia",
   facts:"The first major land battle. A Confederate victory that ended expectations of a short war. Only about 30 miles from Washington, D.C."},
  {names:["Shiloh","Pittsburg Landing"],title:"Shiloh",date:"April 6–7, 1862",place:"Hardin County, Tennessee",
   facts:"Union forces under Ulysses S. Grant held after a surprise Confederate attack; Confederate commander Albert Sidney Johnston was killed. A Union victory in the Western Theater."},
  {names:["Antietam","Sharpsburg"],title:"Antietam",date:"September 17, 1862",place:"Sharpsburg, Maryland",
   facts:"The bloodiest single day of the war. Lee's first invasion of the North was turned back, and five days later Lincoln issued the preliminary Emancipation Proclamation (Sept. 22, 1862)."},
  {names:["Gettysburg"],title:"Gettysburg",date:"July 1–3, 1863",place:"Gettysburg, Pennsylvania",
   facts:"The largest battle of the war. George G. Meade's Union army defeated Robert E. Lee's second invasion of the North."},
  {names:["Vicksburg"],title:"Vicksburg",date:"May 18 – July 4, 1863",place:"Vicksburg, Mississippi",
   facts:"After a siege, the city surrendered to Grant on July 4, 1863. With the fall of Port Hudson, Louisiana, on July 9, the Union controlled the entire Mississippi River."},
  {names:["Chickamauga"],title:"Chickamauga",date:"September 18–20, 1863",place:"Catoosa and Walker counties, Georgia",
   facts:"A Confederate victory under Braxton Bragg; the Union army withdrew to Chattanooga, Tennessee."},
  {names:["Atlanta"],title:"Atlanta",date:"July 22, 1864 (city occupied Sept. 2, 1864)",place:"Atlanta, Georgia",
   facts:"Part of William T. Sherman's Atlanta Campaign. The city's capture on Sept. 2, 1864 was followed by the March to the Sea (Nov. 15 – Dec. 21, 1864) to Savannah."},
  {names:["Appomattox Court House","Appomattox Courthouse"],title:"Appomattox Court House",date:"April 9, 1865",place:"Appomattox County, Virginia",
   facts:"Robert E. Lee surrendered the Army of Northern Virginia to Ulysses S. Grant, effectively ending the war in Virginia."}
];

// Union control milestones for the Analyze mission (client-side markers).
const CONTROL_MILESTONES = [
  {year:1862,label:"New Orleans captured",date:"April 25 – May 1, 1862",lat:29.951,lon:-90.072,
   text:"Flag Officer David G. Farragut's fleet ran past the forts below the city; the Confederacy's largest city and port fell to the Union."},
  {year:1863,label:"Vicksburg surrenders",date:"July 4, 1863",lat:32.353,lon:-90.878,
   text:"Grant's siege ended with the surrender of Vicksburg."},
  {year:1863,label:"Port Hudson surrenders",date:"July 9, 1863",lat:30.689,lon:-91.323,
   text:"The last Confederate stronghold on the Mississippi fell; the river was now fully under Union control, splitting off Texas, Arkansas and most of Louisiana."},
  {year:1864,label:"Atlanta captured",date:"September 2, 1864",lat:33.749,lon:-84.388,
   text:"Sherman's army occupied Atlanta."},
  {year:1864,label:"Savannah captured",date:"December 21, 1864",lat:32.081,lon:-81.091,
   text:"End of the March to the Sea. Georgia had been cut through, splitting the eastern Confederacy."},
  {year:1865,label:"Richmond falls",date:"April 3, 1865",lat:37.541,lon:-77.436,
   text:"The Confederate government evacuated the capital on the night of April 2; Union troops entered on April 3. Lee surrendered at Appomattox on April 9."}
];

// Schematic line for the Union blockade (declared April 19, 1861 for the
// seven original Confederate states; extended April 27 to Virginia and North
// Carolina). The line is a simplified trace of the Atlantic and Gulf coasts.
const BLOCKADE_PATH = [
  [-75.85,36.95],[-75.35,35.25],[-77.75,33.75],[-79.55,32.55],[-80.55,31.85],[-81.05,30.25],
  [-80.25,28.35],[-79.85,26.5],[-79.9,25.3],[-81.7,24.35],[-83.1,26.6],[-83.3,28.6],[-84.6,29.4],
  [-85.6,29.7],[-87.4,30.05],[-88.35,30.05],[-89.6,29.55],[-89.3,28.85],[-91.5,28.9],[-93.6,29.3],
  [-95.2,28.8],[-96.6,27.9],[-97.2,26.4],[-97.15,25.95]
];

// Text feedback taken from the GeoInquiry answer key.
const KEY = {
  classification:"The lesson classifies states as Union (North), Confederate (South), or border states.",
  slavery:"Confederate states and the border states allowed slavery. The border states (Delaware, Maryland, Kentucky, Missouri) did not secede.",
  distance:"About 100 miles separate Washington, D.C. and Richmond, Virginia (straight-line distance is roughly 96 miles).",
  proximity:"Because the capitals were so close, each side was always either attacking or defending a capital, which is why so much fighting happened in northern Virginia.",
  blockade:"The blockade closed the South's Atlantic and Gulf of Mexico coastlines, cutting off trade and transportation.",
  patterns:"Battle locations cluster near the capitals; many occurred in Virginia; many occurred along rivers or coastlines.",
  direction:"Battles mostly moved south over time and clustered around the two capitals.",
  georgia:"The battles in Georgia form a linear pattern that traces Sherman's Atlanta Campaign and the March to the Sea in 1864.",
  mississippi:"1863: Vicksburg surrendered July 4 and Port Hudson July 9, giving the Union the whole river (New Orleans itself had fallen in April 1862).",
  split:"1864: Sherman captured Atlanta in September and Savannah in December, cutting through Georgia.",
  richmond:"1865: Union troops entered Richmond on April 3, 1865."
};

/* =====================================================================
   GAME STATE
   ===================================================================== */
const BADGES = [
  {id:"ask",letter:"1",name:"Cartographer",section:"Ask"},
  {id:"acquire",letter:"2",name:"Surveyor",section:"Acquire"},
  {id:"explore",letter:"3",name:"Scout",section:"Explore"},
  {id:"analyze",letter:"4",name:"Strategist",section:"Analyze"},
  {id:"act",letter:"5",name:"Historian",section:"Act"}
];
function badgeStatus(b){
  if(state.badges.includes(b.id)) return "complete";
  const started = b.id===state.mission || Object.keys(state.tasks).some(t=>t.startsWith({ask:"ask",acquire:"acq",explore:"exp",analyze:"ana",act:"act"}[b.id]));
  return started?"in progress":"not started";
}
const MISSIONS = ["ask","acquire","explore","analyze","act"];
const MISSION_TITLES = {ask:"Ask",acquire:"Acquire",explore:"Explore",analyze:"Analyze",act:"Act"};

let state = load() || {
  score:0, badges:[], mission:"ask", done:{}, answers:{}, tasks:{}, streak:0
};

function load(){
  try{ const s = localStorage.getItem("nationDividedState"); return s ? JSON.parse(s) : null; }catch(e){ return null; }
}
function save(){
  try{ localStorage.setItem("nationDividedState", JSON.stringify(state)); }catch(e){}
}
function award(points, label){
  state.score += points; save();
  document.getElementById("scoreVal").textContent = state.score;
  if(points>0) toast(`+${points} ${label||"points"}`);
}
function taskDone(id){ return !!state.tasks[id]; }
function markTask(id, points, label){
  if(state.tasks[id]) return false;
  state.tasks[id]=true; save();
  award(points,label);
  updateFinishBlock();
  return true;
}
function earnBadge(id){
  if(state.badges.includes(id)) return;
  state.badges.push(id); state.done[id]=true; save();
  renderBadges(); renderProgress();
  const b = BADGES.find(x=>x.id===id);
  toast(`Badge earned: ${b.name}`);
}
function toast(msg){
  const t=document.getElementById("toast"); t.textContent=msg; t.classList.add("show");
  clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove("show"),2200);
}
function renderBadges(){
  const el=document.getElementById("badges"); el.innerHTML="";
  BADGES.forEach(b=>{
    const d=document.createElement("div");
    d.className="badge"+(state.badges.includes(b.id)?" earned":"");
    const tip=`${b.letter}: ${b.section} ${badgeStatus(b)}`;
    // Visible digit for sighted users; full status as hidden text for screen readers;
    // native title gives mouse users the same text (user-agent tooltips are exempt from 1.4.13).
    d.innerHTML=`<span aria-hidden="true">${b.letter}</span><span class="visually-hidden">${tip}</span>`;
    d.setAttribute("role","listitem"); d.setAttribute("title",tip);
    el.appendChild(d);
  });
  document.getElementById("scoreVal").textContent=state.score;
}
function renderProgress(){
  const nav=document.getElementById("progressNav"); nav.innerHTML="";
  MISSIONS.forEach((m,i)=>{
    const b=document.createElement("button"); b.type="button";
    const unlocked = i===0 || state.done[MISSIONS[i-1]];
    const status=state.done[m]?"completed":(m===state.mission?"current section":(unlocked?"not started":"locked"));
    b.innerHTML=`<b>${i+1}</b>${MISSION_TITLES[m]}<span class="visually-hidden">, ${status}</span>`;
    b.className=(m===state.mission?"current ":"")+(state.done[m]?"done":"");
    if(m===state.mission) b.setAttribute("aria-current","step");
    b.disabled=!unlocked;
    b.addEventListener("click",()=>{ state.mission=m; save(); renderMission(); });
    nav.appendChild(b);
  });
}

/* =====================================================================
   MAP
   ===================================================================== */
const map = {ready:false, failed:false, battlesLoaded:false, view:null, layers:{}, battles:[], measure:null, clickHandler:null};
const LAYER_URLS = {
  states:"https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized_Boundaries/FeatureServer/0",
  battles:"https://services7.arcgis.com/tb6wALqFemkR7LHo/ArcGIS/rest/services/civilwarorg_battles/FeatureServer/0"
};

function initMap(){
  if(typeof require!=="function"){ mapFailed(); return; }
  require([
    "esri/Map","esri/views/MapView","esri/layers/FeatureLayer","esri/layers/GraphicsLayer",
    "esri/Graphic","esri/geometry/Point","esri/geometry/Polyline","esri/geometry/geometryEngine",
    "esri/widgets/DistanceMeasurement2D","esri/geometry/support/webMercatorUtils"
  ], function(Map,MapView,FeatureLayer,GraphicsLayer,Graphic,Point,Polyline,geometryEngine,DistanceMeasurement2D,wmUtils){
    try{
      const CLASS_COLORS = {union:[46,94,158,.62],confed:[156,122,74,.62],border:[201,162,39,.62],territory:[201,207,199,.45]};

      // ---- States (Esri Living Atlas) with Civil War classification ----
      const uniqueInfos = Object.keys(STATE_CLASS).map(name=>({
        value:name,
        symbol:{type:"simple-fill",color:CLASS_COLORS[STATE_CLASS[name].cls],outline:{color:[255,255,255,.9],width:1}}
      }));
      const states = new FeatureLayer({
        url:LAYER_URLS.states, title:"States in the Civil War",
        outFields:["STATE_NAME","STATE_ABBR"],
        definitionExpression:"STATE_NAME NOT IN ('Alaska','Hawaii','Puerto Rico')",
        renderer:{type:"unique-value",field:"STATE_NAME",uniqueValueInfos:uniqueInfos,
                  defaultSymbol:{type:"simple-fill",color:[220,220,220,.3],outline:{color:[255,255,255,.9],width:1}}},
        popupTemplate:{title:"{STATE_NAME}",content:(ev)=>{
          const n=ev.graphic.attributes.STATE_NAME; const c=STATE_CLASS[n];
          if(!c) return "No classification available.";
          return `<b>${CLASS_LABEL[c.cls]}</b>${c.note?"<br>"+c.note:""}`;
        }}
      });

      // ---- Battles: queried once from the public ArcGIS Online layer and drawn as graphics ----
      const battles = new GraphicsLayer({title:"Civil War battles",visible:false});
      const battleSource = new FeatureLayer({url:LAYER_URLS.battles,outFields:["*"]});
      // ---- Client-side graphics: capitals, blockade, control milestones, game markers ----
      const capitals = new GraphicsLayer({title:"Capitals"});
      CAPITALS.forEach(c=>{
        capitals.add(new Graphic({
          geometry:new Point({longitude:c.lon,latitude:c.lat}),
          symbol:{type:"simple-marker",style:"diamond",size:16,color:c.cls==="union"?"#2E5E9E":"#9C7A4A",outline:{color:"#fff",width:2}},
          attributes:c,
          popupTemplate:{title:"{name}",content:"{side}"}
        }));
        capitals.add(new Graphic({
          geometry:new Point({longitude:c.lon,latitude:c.lat}),
          symbol:{type:"text",color:"#1B2A3C",haloColor:"#fff",haloSize:2,text:c.name,yoffset:12,
                  font:{size:11,family:"Source Sans 3",weight:"bold"}}
        }));
      });

      const blockade = new GraphicsLayer({title:"Union blockade",visible:false});
      blockade.add(new Graphic({
        geometry:new Polyline({paths:[BLOCKADE_PATH]}),
        symbol:{type:"simple-line",color:[46,94,158,.9],width:4,style:"short-dash"},
        popupTemplate:{title:"Union naval blockade, 1861–1865",
          content:"Proclaimed by President Lincoln on April 19, 1861 (extended to Virginia and North Carolina on April 27). It closed the Confederacy's Atlantic and Gulf of Mexico coasts. This line is a simplified schematic of the blockaded coastline."}
      }));

      const control = new GraphicsLayer({title:"Union control milestones",visible:false});
      const yearColor = {1862:"#7FA7D9",1863:"#2E5E9E",1864:"#1F4275",1865:"#12294A"};
      CONTROL_MILESTONES.forEach(m=>{
        control.add(new Graphic({
          geometry:new Point({longitude:m.lon,latitude:m.lat}),
          symbol:{type:"simple-marker",style:"square",size:14,color:yearColor[m.year],outline:{color:"#fff",width:1.5}},
          attributes:m,
          popupTemplate:{title:"{label} ({year})",content:"<b>{date}</b><br>{text}"}
        }));
        control.add(new Graphic({
          geometry:new Point({longitude:m.lon,latitude:m.lat}),
          symbol:{type:"text",color:"#12294A",haloColor:"#fff",haloSize:2,text:String(m.year),yoffset:11,font:{size:10,weight:"bold"}}
        }));
      });

      const game = new GraphicsLayer({title:"Game markers"});

      const m = new Map({basemap:"gray-vector",layers:[states,blockade,control,battles,capitals,game]});
      const view = new MapView({container:"viewDiv",map:m,center:[-84,35.5],zoom:5,
        constraints:{minZoom:3,maxZoom:12},popup:{dockEnabled:false,dockOptions:{buttonEnabled:false}}});

      map.view=view; map.layers={states,battles,capitals,blockade,control,game};
      map.modules={Graphic,Point,geometryEngine,wmUtils,DistanceMeasurement2D};
      buildYearBar();

      view.when(()=>{
        map.ready=true;
        document.getElementById("mapError").classList.remove("show");
        renderMission();
        setStatus("Loading battles from ArcGIS Online");
        battleSource.queryFeatures({where:"1=1",outFields:["*"],returnGeometry:true,outSpatialReference:{wkid:4326},num:1000})
          .then(res=>{
            const feats=(res.features||[]).filter(f=>f.geometry);
            const fmt=(v)=>{ if(v===null||v===undefined||v==="") return ""; const d=new Date(v); return isNaN(d)?String(v):d.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}); };
            feats.forEach(f=>{
              const a=f.attributes, r=String(a.result||"").toLowerCase();
              const cls=r.includes("union")?"union":(r.includes("confeder")?"confed":"other");
              const color=cls==="union"?[46,94,158,.9]:cls==="confed"?[156,122,74,.95]:[110,110,110,.9];
              const shape=cls==="union"?"circle":cls==="confed"?"square":"triangle";   // shape + color, so results are not conveyed by color alone
              const yr=a.start_date?new Date(a.start_date).getFullYear():null;
              const attrs=Object.assign({},a,{start_text:fmt(a.start_date),end_text:fmt(a.end_date),year:yr,
                cas_text:(a.total_casualties||a.total_casualties===0)?Number(a.total_casualties).toLocaleString():"",
                link:a.url?`<a href="${a.url}" target="_blank" rel="noopener">American Battlefield Trust page</a>`:""});
              const g=new Graphic({
                geometry:f.geometry, attributes:attrs,
                symbol:{type:"simple-marker",style:shape,size:shape==="circle"?9:10,color:color,outline:{color:"#fff",width:1}},
                popupTemplate:{title:"{battle_name}",content:
                  "<b>Dates:</b> {start_text}{end_text_sep}{end_text}<br><b>Location:</b> {location}, {state}<br><b>Campaign:</b> {campaign}<br><b>Result:</b> {result}<br><b>Total casualties (dataset):</b> {cas_text}<br><b>NPS CWSAC ID:</b> {cwsac_id}<br>{link}"}
              });
              g.attributes.end_text_sep = (attrs.end_text && attrs.end_text!==attrs.start_text) ? " to " : "";
              if(!g.attributes.end_text_sep) g.attributes.end_text="";
              battles.add(g);
            });
            map.battles=feats; map.battlesLoaded=true;
            setStatus(feats.length?`${feats.length} battles loaded from ArcGIS Online`:"The battle layer returned 0 features",!feats.length);
            renderMission();
          })
          .catch(err=>{
            console.error("Battle query failed",err);
            map.battlesLoaded=true;
            setStatus("Battle layer failed to load: "+(err&&err.message?err.message:err),true);
            renderMission();
          });
      }, ()=>mapFailed());

      view.on("click",(ev)=>{ if(map.clickHandler) map.clickHandler(ev); });
      wireMapTools();
      renderLegend();
    }catch(e){ console.error(e); mapFailed(); }
  }, function(err){ console.error(err); mapFailed(); });
}
function mapFailed(){ document.getElementById("mapError").classList.add("show"); setStatus("Map failed to load",true); map.ready=false; map.failed=true; map.battlesLoaded=true; renderMission(); }

function setStatus(msg,isErr){ const el=document.getElementById("mapStatus"); el.textContent=msg; el.classList.toggle("err",!!isErr); }
function buildYearBar(){
  const bar=document.getElementById("yearBar"); bar.innerHTML="";
  ["All",1861,1862,1863,1864,1865].forEach(y=>{
    const b=document.createElement("button"); b.type="button"; b.textContent=y; if(y==="All") b.classList.add("on");
    b.addEventListener("click",()=>{ bar.querySelectorAll("button").forEach(x=>x.classList.remove("on")); b.classList.add("on"); filterBattleYear(y==="All"?null:y); });
    bar.appendChild(b);
  });
}
function filterBattleYear(year){
  if(!map.layers.battles) return;
  map.layers.battles.graphics.forEach(g=>{ g.visible = year===null || g.attributes.year===year; });
  banner(year?`<b>${year}</b>: showing only battles that began in ${year}.`:"");
}
function showAllBattles(){
  setLayer("battles",true);
  const bar=document.getElementById("yearBar"); bar.querySelectorAll("button").forEach((x,i)=>x.classList.toggle("on",i===0));
  filterBattleYear(null);
}
function setLayer(name, on){
  const cb=document.querySelector(`#layersList input[data-layer="${name}"]`);
  if(cb) cb.checked=on;
  if(map.layers[name]) map.layers[name].visible=on;
  if(name==="battles") document.getElementById("yearBar").classList.toggle("show",on);
  renderLegend();
}
function wireMapTools(){
  document.querySelectorAll("#layersList input[data-layer]").forEach(cb=>{
    cb.addEventListener("change",()=>setLayer(cb.dataset.layer,cb.checked));
  });
  const tg=document.getElementById("layersToggle"), list=document.getElementById("layersList");
  tg.addEventListener("click",()=>{ const open=list.classList.toggle("collapsed")===false; tg.textContent=open?"Hide":"Show"; tg.setAttribute("aria-expanded",String(open)); });
  const lg=document.getElementById("legendToggle"), lbody=document.getElementById("legend");
  lg.addEventListener("click",()=>{ const open=lbody.classList.toggle("collapsed")===false; lg.textContent=open?"Hide":"Show"; lg.setAttribute("aria-expanded",String(open)); });
  document.getElementById("btnMeasure").addEventListener("click",toggleMeasure);

}
function toggleMeasure(force){
  const btn=document.getElementById("btnMeasure");
  const on = (typeof force==="boolean")?force:!map.measure;
  if(on && map.ready && !map.measure){
    map.measure=new map.modules.DistanceMeasurement2D({view:map.view,unit:"miles"});
    map.view.ui.add(map.measure,"top-left");
    map.measure.viewModel.start();
    btn.classList.add("on"); btn.setAttribute("aria-pressed","true");
  }else if(!on && map.measure){
    map.view.ui.remove(map.measure); map.measure.destroy(); map.measure=null; btn.classList.remove("on"); btn.setAttribute("aria-pressed","false");
  }
}
function banner(html){
  const b=document.getElementById("mapBanner"); if(!html){b.classList.remove("show");b.innerHTML="";return;}
  b.innerHTML=html; b.classList.add("show");
}
function renderLegend(){
  const L=document.getElementById("legend"); const rows=[];
  const on=(n)=>map.layers[n]&&map.layers[n].visible;
  if(on("battles")){
    rows.push(`<h5>Battles (by result)</h5>
      <div><span class="sw dot" style="background:#2E5E9E"></span>Union victory (circle)</div>
      <div><span class="sw sq" style="background:#9C7A4A"></span>Confederate victory (square)</div>
      <div><span class="sw tri" style="border-bottom-color:#6E6E6E"></span>Inconclusive / other (triangle)</div>`);
  }
  if(on("control")) rows.push(`<h5>Union control milestones</h5><div><span class="sw" style="background:#7FA7D9"></span>1862</div><div><span class="sw" style="background:#2E5E9E"></span>1863</div><div><span class="sw" style="background:#1F4275"></span>1864</div><div><span class="sw" style="background:#12294A"></span>1865</div>`);
  if(on("blockade")) rows.push(`<h5>Blockade</h5><div><span class="sw" style="border:0;border-top:3px dashed #2E5E9E;height:0"></span>Union naval blockade</div>`);
  if(!map.layers.states||on("states")){
    rows.push(`<h5>States</h5>
      <div><span class="sw" style="background:rgba(46,94,158,.62)"></span>Union (North)</div>
      <div><span class="sw" style="background:rgba(156,122,74,.62)"></span>Confederate (South)</div>
      <div><span class="sw" style="background:rgba(201,162,39,.62)"></span>Border state</div>
      <div><span class="sw" style="background:rgba(201,207,199,.45)"></span>Territory in 1861</div>`);
  }
  L.innerHTML=rows.join("");
}
function goTo(target,zoom){ if(map.ready) map.view.goTo(Object.assign({},target,zoom?{zoom}:{})).catch(()=>{}); }
function clearGame(){ if(map.layers.game) map.layers.game.removeAll(); map.clickHandler=null; banner(""); }
function findBattle(kb){
  const norm=s=>(s||"").toLowerCase();
  for(const n of kb.names){
    const f=map.battles.find(f=>{ const a=f.attributes; return norm(a.battle_name)===norm(n) || norm(a.alternate_names).split(/[;,|]/).map(x=>x.trim()).includes(norm(n)); });
    if(f) return f;
  }
  for(const n of kb.names){
    const f=map.battles.find(f=>norm(f.attributes.battle_name).startsWith(norm(n)));
    if(f) return f;
  }
  return null;
}
function milesBetween(p1,p2){
  const g=map.modules.geometryEngine;
  const a=map.modules.wmUtils.geographicToWebMercator(p1), b=map.modules.wmUtils.geographicToWebMercator(p2);
  return g.geodesicLength({type:"polyline",paths:[[[a.x,a.y],[b.x,b.y]]],spatialReference:{wkid:3857}},"miles");
}

/* =====================================================================
   MISSIONS
   ===================================================================== */
const missionEl=document.getElementById("mission");
function h(html){ const t=document.createElement("template"); t.innerHTML=html.trim(); return t.content.firstElementChild; }
function fb(el,ok,text){ el.className="feedback "+(ok?"good":"bad"); el.innerHTML=text; }

function mcq(container,{id,points,question,choices,correct,explain,key}){
  const card=h(`<div class="task"><span class="pts">${points} pts</span><h3>${question}</h3><div class="choices"></div><div class="feedback" hidden></div></div>`);
  const ch=card.querySelector(".choices"), f=card.querySelector(".feedback");
  const done=taskDone(id);
  choices.forEach((c,i)=>{
    const b=h(`<button type="button">${c}</button>`);
    if(done){ b.disabled=true; if(i===correct) b.classList.add("correct"); }
    b.addEventListener("click",()=>{
      const ok=i===correct;
      ch.querySelectorAll("button").forEach(x=>x.disabled=true);
      b.classList.add(ok?"correct":"wrong"); if(!ok) ch.querySelectorAll("button")[correct].classList.add("correct");
      f.hidden=false; fb(f,ok,(ok?"Correct. ":"Not quite. ")+explain);
      if(ok){ state.streak++; markTask(id,points+(state.streak>=3?5:0),state.streak>=3?"points (streak bonus)":"points"); }
      else { state.streak=0; markTask(id,Math.max(2,Math.floor(points/3)),"points for trying"); }
      state.answers[id]=choices[i]; save();
    });
    ch.appendChild(b);
  });
  if(done){ f.hidden=false; fb(f,true,"Already answered. "+explain); }
  container.appendChild(card); return card;
}

function multiSelect(container,{id,points,question,choices,correct,explain}){
  const card=h(`<div class="task"><span class="pts">${points} pts</span><h3>${question}</h3><p class="hint">Select all that apply, then check.</p><div class="choices"></div><button class="primary" type="button">Check answer</button><div class="feedback" hidden></div></div>`);
  const ch=card.querySelector(".choices"), f=card.querySelector(".feedback"), btn=card.querySelector("button.primary");
  choices.forEach((c,i)=>ch.appendChild(h(`<label><input type="checkbox" value="${i}"> <span>${c}</span></label>`)));
  if(taskDone(id)){ btn.disabled=true; f.hidden=false; fb(f,true,"Already answered. "+explain); ch.querySelectorAll("input").forEach(x=>{x.disabled=true;x.checked=correct.includes(+x.value);}); }
  btn.addEventListener("click",()=>{
    const picked=[...ch.querySelectorAll("input:checked")].map(x=>+x.value);
    const right=picked.filter(p=>correct.includes(p)).length, wrong=picked.length-right;
    const ok = right===correct.length && wrong===0;
    btn.disabled=true; ch.querySelectorAll("input").forEach(x=>x.disabled=true);
    f.hidden=false;
    fb(f,ok,(ok?"Correct. ":`You found ${right} of ${correct.length} correct patterns${wrong?` and picked ${wrong} that did not fit`:""}. `)+explain);
    markTask(id, ok?points:Math.max(2,Math.round(points*right/correct.length)-wrong*2), "points");
    state.answers[id]=picked.map(p=>choices[p]); save();
  });
  container.appendChild(card); return card;
}

function renderMission(){
  renderProgress(); renderBadges();
  if(mode==="explore") return;
  missionEl.innerHTML=""; missionEl._finish=null; clearGame(); toggleMeasure(false);
  ({ask:missionAsk,acquire:missionAcquire,explore:missionExplore,analyze:missionAnalyze,act:missionAct})[state.mission]();
  missionEl.scrollTop=0;
}
function finishBlock(container,missionId,nextId,requiredTasks){
  missionEl._finish={container,missionId,nextId,requiredTasks};
  const allDone=requiredTasks.every(taskDone);
  const wrap=h(`<div class="task finish-block" style="border-color:${allDone?"var(--ok)":"var(--rule)"}"><h3>${allDone?"Section complete":"Finish every task to unlock the next section"}</h3><p class="hint">${requiredTasks.filter(taskDone).length} of ${requiredTasks.length} tasks done.</p><div class="row"></div></div>`);
  const row=wrap.querySelector(".row");
  if(allDone){
    earnBadge(missionId);
    if(nextId){ const b=h(`<button class="primary" type="button">Continue to ${MISSION_TITLES[nextId]}</button>`); b.addEventListener("click",()=>{state.mission=nextId;save();renderMission();}); row.appendChild(b); }
  }
  const old=container.querySelector(".finish-block");
  if(old) old.replaceWith(wrap); else container.appendChild(wrap);
}
function updateFinishBlock(){
  const f=missionEl._finish; if(!f||!f.container.isConnected) return;
  finishBlock(f.container,f.missionId,f.nextId,f.requiredTasks);
}

/* ---------- 1. ASK: Who fought in the Civil War? ---------- */
function missionAsk(){
  const c=missionEl;
  c.appendChild(h(`<h2>Ask</h2>`));
  c.appendChild(h(`<p class="question-head">Who fought in the Civil War?</p>`));
  c.appendChild(h(`<p>Click states on the map to see how each one lined up in 1861, or use the state list in the task below. Then complete the tasks.</p>`));
  setLayer("states",true); setLayer("capitals",true); setLayer("battles",false); setLayer("blockade",false); setLayer("control",false);
  goTo({center:[-88,37],zoom:4});

  // Map task: click one state of each kind
  const need=[{cls:"confed",label:"a state that seceded and joined the Confederacy"},{cls:"border",label:"a border state (slavery was legal, but it stayed in the Union)"},{cls:"union",label:"a free state that stayed in the Union"}];
  const card=h(`<div class="task"><span class="pts">15 pts</span><h3>Map task: find one of each</h3><ul class="steps"></ul><div class="feedback" hidden></div></div>`);
  const ul=card.querySelector(".steps"), f=card.querySelector(".feedback");
  const found=state.answers.askFound||{};
  function draw(){ const nxt=need.find(n=>!found[n.cls]); ul.innerHTML=""; need.forEach(n=>ul.appendChild(h(`<li class="${found[n.cls]?"done":(nxt&&nxt.cls===n.cls?"active":"")}">Find ${n.label}${found[n.cls]?` (you chose <b>${found[n.cls]}</b>)`:""}</li>`))); }
  draw();
  // Same judging for a map click and for the keyboard-accessible state picker
  function judgeState(name){
    const cls=(STATE_CLASS[name]||{}).cls;
    const target=need.find(n=>!found[n.cls]); if(!target) return;
    f.hidden=false;
    if(cls===target.cls){ found[cls]=name; state.answers.askFound=found; save(); draw();
      fb(f,true,`${name}: ${CLASS_LABEL[cls]}. ${(STATE_CLASS[name].note||"")}`); award(5,"points");
      if(need.every(n=>found[n.cls])){ state.tasks.askMap=true; save(); banner(""); map.clickHandler=null; renderMission(); }
    } else { fb(f,false,`${name} was ${cls?CLASS_LABEL[cls].toLowerCase():"not a state in 1861"}. Try again: choose ${target.label}.`); }
  }
  if(!taskDone("askMap")){
    // Keyboard / screen-reader alternative to clicking the map
    const names=Object.keys(STATE_CLASS).sort();
    const pick=h(`<div class="alt-input"><label for="askState">Or choose a state from the list</label>
      <div class="row"><select id="askState"><option value="">Select a state</option>${names.map(n=>`<option value="${n}">${n}</option>`).join("")}</select><button class="secondary" type="button" id="askStateBtn">Check state</button></div></div>`);
    pick.querySelector("#askStateBtn").addEventListener("click",()=>{ const v=pick.querySelector("#askState").value; if(!v){ f.hidden=false; fb(f,false,"Select a state first."); return; } judgeState(v); });
    card.insertBefore(pick,f);
  }
  if(map.failed && !taskDone("askMap")){ f.hidden=false; fb(f,false,"The map is not available. Use the state list above to complete this task."); }
  else if(!map.ready && !taskDone("askMap")){ f.hidden=false; fb(f,false,"Waiting for the map to load. You can use the state list above in the meantime."); }
  else if(!taskDone("askMap")){
    banner("<b>Click a state</b> on the map to identify it.");
    map.clickHandler=async(ev)=>{
      const hit=await map.view.hitTest(ev,{include:map.layers.states});
      const g=hit.results[0]&&hit.results[0].graphic; if(!g) return;
      judgeState(g.attributes.STATE_NAME);
    };
  } else { f.hidden=false; fb(f,true,"Done. All three kinds of state found."); }
  c.appendChild(card);

  mcq(c,{id:"askClassify",points:10,question:"How were states classified during the Civil War?",
    choices:["Union (North), Confederate (South), and border states","Free states and slave states only","Eastern and Western states","Original colonies and newer states"],
    correct:0,explain:KEY.classification});
  mcq(c,{id:"askSlavery",points:10,question:"Which states allowed slavery, and did all of them secede?",
    choices:["Only the Confederate states allowed slavery, and all of them seceded","Confederate and border states allowed slavery, but the border states did not secede","Every state allowed slavery in 1861","Border states did not allow slavery, so they stayed in the Union"],
    correct:1,explain:KEY.slavery});
  mcq(c,{id:"askCount",points:5,question:"How many states seceded and joined the Confederacy?",
    choices:["7","9","11","13"],correct:2,
    explain:"Eleven: seven seceded before Fort Sumter (South Carolina, Mississippi, Florida, Alabama, Georgia, Louisiana, Texas) and four after (Virginia, Arkansas, North Carolina, Tennessee). Four slave states stayed in the Union: Delaware, Maryland, Kentucky, Missouri."});
  finishBlock(c,"ask","acquire",["askMap","askClassify","askSlavery","askCount"]);
}

/* ---------- 2. ACQUIRE: How close were the capital cities? ---------- */
function missionAcquire(){
  const c=missionEl;
  c.appendChild(h(`<h2>Acquire</h2>`));
  c.appendChild(h(`<p class="question-head">How close were the capital cities?</p>`));
  setLayer("states",true); setLayer("capitals",true); setLayer("battles",false); setLayer("blockade",false); setLayer("control",false);
  goTo({center:[-77.3,38.2],zoom:7});

  mcq(c,{id:"acqUnionCap",points:5,question:"What was the Union's capital?",choices:["Philadelphia, Pennsylvania","Washington, D.C.","New York, New York","Baltimore, Maryland"],correct:1,explain:"Washington, D.C. is the blue diamond on the map."});
  mcq(c,{id:"acqConfedCap",points:5,question:"What was the Confederacy's capital?",choices:["Montgomery, Alabama","Charleston, South Carolina","Richmond, Virginia","Atlanta, Georgia"],correct:2,explain:"Richmond, Virginia (the tan diamond). Montgomery, Alabama was the first Confederate capital before the government moved to Richmond in May 1861."});

  // Measure task
  const card=h(`<div class="task"><span class="pts">15 pts</span><h3>Map task: measure the distance</h3>
    <p>Use the <b>Measure distance</b> tool (the ruler button under the Layers list, top right of the map): click once on Washington, D.C., then double-click on Richmond. Enter the straight-line distance in miles. If you cannot use the measure tool, press <b>Calculate the distance</b> and the app will measure it for you.</p>
    <div class="row"><label for="distIn">Distance in miles</label><input type="number" id="distIn" min="0" step="1" placeholder="miles"><button class="primary" type="button" id="distBtn">Check</button></div>
    <div class="row" style="margin-top:8px"><button class="secondary" type="button" id="distTool">Open measure tool</button><button class="secondary" type="button" id="distCalc">Calculate the distance</button></div>
    <div class="feedback" hidden></div></div>`);
  const f=card.querySelector(".feedback");
  card.querySelector("#distTool").addEventListener("click",()=>{ toggleMeasure(true); banner("<b>Measure:</b> click D.C., then double-click Richmond. Read the miles in the tool panel."); });
  card.querySelector("#distCalc").addEventListener("click",()=>{
    // Keyboard-accessible alternative to the pointer-only measure widget
    const dc=CAPITALS[0], rv=CAPITALS[1];
    let miles=96;
    if(map.ready&&map.modules){ const {Point}=map.modules; miles=Math.round(milesBetween(new Point({longitude:dc.lon,latitude:dc.lat}),new Point({longitude:rv.lon,latitude:rv.lat}))); }
    card.querySelector("#distIn").value=miles;
    f.hidden=false; fb(f,true,`Straight-line distance from Washington, D.C. to Richmond, Virginia: <b>${miles} miles</b>. The value is filled in above; press Check to record it.`);
    card.querySelector("#distIn").focus();
  });
  card.querySelector("#distBtn").addEventListener("click",()=>{
    const v=+card.querySelector("#distIn").value; f.hidden=false;
    if(!v){ fb(f,false,"Enter a number of miles first."); return; }
    const ok = v>=80 && v<=120;
    fb(f,ok,(ok?"Correct. ":`You entered ${v} miles. `)+KEY.distance);
    if(ok){ state.answers.acqDistance=v; save(); markTask("acqDistance",15,"points"); toggleMeasure(false); banner(""); renderMission(); }
    else markTask("acqDistanceTry",0);
  });
  if(taskDone("acqDistance")){ f.hidden=false; fb(f,true,`Done (you measured ${state.answers.acqDistance} miles). `+KEY.distance); card.querySelector("#distBtn").disabled=true; }
  if(map.failed && !taskDone("acqDistance")){ f.hidden=false; fb(f,false,"Map unavailable: the straight-line distance is about 96 miles. Enter it to continue."); }
  c.appendChild(card);

  mcq(c,{id:"acqWhy",points:10,question:"Why was this closeness significant to how the war was fought?",
    choices:["It made a peace treaty easier to negotiate","Each side was always either attacking or defending a capital, so armies clashed again and again in northern Virginia","It meant the capitals could share a railroad line","It had no real effect on the fighting"],
    correct:1,explain:KEY.proximity});
  finishBlock(c,"acquire","explore",["acqUnionCap","acqConfedCap","acqDistance","acqWhy"]);
}

/* ---------- 3. EXPLORE: Where did the armies fight? ---------- */
function missionExplore(){
  const c=missionEl;
  c.appendChild(h(`<h2>Explore</h2>`));
  c.appendChild(h(`<p class="question-head">Where did the armies fight?</p>`));
  setLayer("states",true); setLayer("capitals",true); setLayer("blockade",true); setLayer("battles",true); setLayer("control",false);
  goTo({center:[-86,34],zoom:5});

  c.appendChild(h(`<p>The <b>Union blockade</b> is now on the map as a dashed line, and every battle in the dataset is a marker: a circle for a Union victory, a square for a Confederate victory, a triangle for other results. Use the year buttons at the bottom of the map (1861 through 1865) to see where the fighting was each year, then choose All to see the whole war.</p>`));
  const yrRow=h(`<div class="row" style="margin-bottom:14px"></div>`);
  ["All",1861,1862,1863,1864,1865].forEach(y=>{ const b=h(`<button class="secondary" type="button">${y}</button>`); b.addEventListener("click",()=>{ if(!map.ready) return; setLayer("battles",true); const bar=document.getElementById("yearBar"); bar.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x.textContent===String(y))); filterBattleYear(y==="All"?null:y); if(y!=="All") markTask("expYears",5,"points"); }); yrRow.appendChild(b); });
  c.appendChild(yrRow);
  mcq(c,{id:"expBlockade",points:10,question:"Which coastlines did the Union blockade close, and why did it matter?",
    choices:["The Great Lakes; it stopped trade with Canada","The Pacific coast; it kept gold from reaching the South","The South Atlantic and Gulf of Mexico coasts; it cut off the Confederacy's trade and transportation by sea","The Mississippi River only; it stopped river trade"],
    correct:2,explain:KEY.blockade});

  multiSelect(c,{id:"expPatterns",points:15,question:"Looking at all the battles, what patterns do you notice in where they happened?",
    choices:["Many battles were close to the two capitals","Many battles occurred in Virginia","Many battles occurred along rivers or coastlines","Most battles happened in the far West (California and Oregon)","Battles were spread evenly across every state"],
    correct:[0,1,2],explain:KEY.patterns});

  mcq(c,{id:"expDirection",points:10,question:"In which direction did the fighting mostly move from 1861 to 1865?",
    choices:["North, toward Canada","South, deeper into the Confederacy, while staying clustered around the capitals","West, toward the Pacific","It did not move; every battle was in Virginia"],
    correct:1,explain:KEY.direction});

  mcq(c,{id:"expGeorgia",points:10,question:"Press 1864 and look at Georgia. What pattern do the battles form, and what does it show?",
    choices:["A circle around Atlanta, showing a long siege","A straight line from Atlanta to Savannah, showing Sherman's March to the Sea","A random scatter, showing guerrilla fighting","A line along the coast, showing the blockade"],
    correct:1,explain:KEY.georgia});

  // Find-the-battle challenge
  const card=h(`<div class="task"><span class="pts">up to ${KEY_BATTLES.length*10} pts</span><h3>Map challenge: find the battle</h3><p class="hint">Click where you think each battle was fought, or pan the map with the keyboard and guess the map center. Within 60 miles scores 10 points, within 150 miles scores 5. You can skip any battle (no points, but no penalty).</p><div id="fbArea"></div></div>`);
  c.appendChild(card);
  const area=card.querySelector("#fbArea");
  const prog=state.answers.findBattle||{index:0,earned:0,log:[]};
  function renderFind(){
    area.innerHTML="";
    if(!map.battlesLoaded){ area.appendChild(h(`<div class="feedback">Loading the battle layer.</div>`)); return; }
    if(map.failed||!map.battles.length){ area.appendChild(h(`<div class="feedback bad">The battle layer is not available, so this challenge is skipped.</div>`)); state.tasks.expFind=true; save(); return; }
    if(prog.index>=KEY_BATTLES.length){
      const skipped=prog.log.filter(x=>x.skipped).length;
      area.appendChild(h(`<div class="feedback good">Challenge complete: ${prog.earned} points earned across ${KEY_BATTLES.length-skipped} battles${skipped?` (${skipped} skipped)`:""}.</div>`));
      if(!taskDone("expFind")){ state.tasks.expFind=true; save(); updateFinishBlock(); }
      return;
    }
    const kb=KEY_BATTLES[prog.index]; const feat=findBattle(kb);
    if(!feat){ prog.log.push({title:kb.title,skipped:true}); prog.index++; state.answers.findBattle=prog; save(); renderFind(); return; }
    area.appendChild(h(`<p><b>${prog.index+1} of ${KEY_BATTLES.length}:</b> Where was the Battle of <b>${kb.title}</b> (${kb.date})?</p><p class="hint">Click the map, or move the map with the arrow keys (press + and − to zoom) and then press <b>Guess the map center</b>. Points so far: ${prog.earned}.</p>`));
    const skipRow=h(`<div class="row" style="margin-bottom:8px"><button class="primary" type="button">Guess the map center</button><button class="secondary" type="button">Skip this battle</button><button class="secondary" type="button">Skip the rest</button></div>`);
    const [guessCenter,skipOne,skipAll]=skipRow.querySelectorAll("button");
    guessCenter.addEventListener("click",()=>{ if(map.ready&&map.view.center) judgeGuess(map.view.center); });
    skipOne.addEventListener("click",()=>{ prog.log.push({title:kb.title,skipped:true}); prog.index++; state.answers.findBattle=prog; save(); map.layers.game.removeAll(); renderFind(); });
    skipAll.addEventListener("click",()=>{ for(let i=prog.index;i<KEY_BATTLES.length;i++) prog.log.push({title:KEY_BATTLES[i].title,skipped:true}); prog.index=KEY_BATTLES.length; state.answers.findBattle=prog; save(); map.layers.game.removeAll(); renderFind(); });
    area.appendChild(skipRow);
    banner(`<b>Find:</b> ${kb.title}, ${kb.date}. Click the map where it was fought.`);
    // Same judging for a map click and for the keyboard "Guess the map center" button
    function judgeGuess(mapPoint){
      const {Graphic}=map.modules;
      const clickPt=map.modules.wmUtils.webMercatorToGeographic(mapPoint);
      const miles=milesBetween(clickPt,feat.geometry);
      const pts= miles<=60?10 : miles<=150?5 : 0;
      map.layers.game.removeAll();
      map.layers.game.add(new Graphic({geometry:mapPoint,symbol:{type:"simple-marker",style:"x",size:14,color:"#A83A2A",outline:{color:"#A83A2A",width:2}}}));
      map.layers.game.add(new Graphic({geometry:feat.geometry,symbol:{type:"simple-marker",style:"circle",size:16,color:[180,132,45,.9],outline:{color:"#fff",width:2}}}));
      map.clickHandler=null; banner("");
      prog.earned+=pts; prog.log.push({title:kb.title,miles:Math.round(miles),pts});
      award(pts,"points"); state.answers.findBattle=prog; save();
      const a=feat.attributes;
      area.innerHTML="";
      area.appendChild(h(`<div class="feedback ${pts?"good":"bad"}">Your guess was <b>${Math.round(miles)} miles</b> from ${kb.title}. ${pts?`+${pts} points.`:"No points this time."}</div>
        <div class="battle-card"><h4>${kb.title}</h4><div class="meta">${kb.date} · ${kb.place}${a.result?` · Result in dataset: ${a.result}`:""}</div><p>${kb.facts}</p>${a.url?`<a href="${a.url}" target="_blank" rel="noopener">Read more (American Battlefield Trust)</a>`:""}</div>`));
      const next=h(`<button class="primary" type="button" style="margin-top:10px">${prog.index+1<KEY_BATTLES.length?"Next battle":"Finish challenge"}</button>`);
      next.addEventListener("click",()=>{ prog.index++; state.answers.findBattle=prog; save(); map.layers.game.removeAll(); renderFind(); });
      area.appendChild(next);
      next.focus();
      goTo({target:feat.geometry,zoom:Math.max(map.view.zoom,6)});
    }
    map.clickHandler=(ev)=>judgeGuess(ev.mapPoint);
  }
  renderFind();
  finishBlock(c,"explore","analyze",["expBlockade","expPatterns","expDirection","expGeorgia","expFind"]);
}

/* ---------- 4. ANALYZE: How did the Union gain control? ---------- */
function missionAnalyze(){
  const c=missionEl;
  c.appendChild(h(`<h2>Analyze</h2>`));
  c.appendChild(h(`<p class="question-head">How did the Union gain control of the Confederacy?</p>`));
  setLayer("states",true); setLayer("capitals",true); setLayer("battles",false); setLayer("blockade",true); setLayer("control",true);
  goTo({center:[-86,33.5],zoom:5});
  c.appendChild(h(`<p>The <b>Union control milestones</b> layer shows six dated events, shaded by year. Click each square on the map, then answer.</p>`));

  mcq(c,{id:"anaMiss",points:10,question:"In which year did the Union gain complete control of the Mississippi River (and hold New Orleans)?",
    choices:["1861","1862","1863","1864"],correct:2,explain:KEY.mississippi});
  mcq(c,{id:"anaSplit",points:10,question:"In which year was the Confederacy split in two again when Georgia came under Union control?",
    choices:["1862","1863","1864","1865"],correct:2,explain:KEY.split});
  mcq(c,{id:"anaRich",points:10,question:"In which year did the Union take control of Richmond, Virginia?",
    choices:["1863","1864","1865","1866"],correct:2,explain:KEY.richmond});

  // Sequencing challenge
  const events=[
    {t:"Confederate forces fire on Fort Sumter",d:"April 12, 1861"},
    {t:"Union navy captures New Orleans",d:"April 1862"},
    {t:"Battle of Antietam; Lincoln issues the preliminary Emancipation Proclamation days later",d:"September 1862"},
    {t:"Gettysburg and the surrender of Vicksburg",d:"July 1863"},
    {t:"Sherman captures Atlanta, then marches to Savannah",d:"September–December 1864"},
    {t:"Richmond falls; Lee surrenders at Appomattox",d:"April 1865"}
  ];
  const card=h(`<div class="task"><span class="pts">20 pts</span><h3>Put the events in order</h3><p class="hint">Use the arrows to move events until they run from earliest to latest, then check.</p><ol class="order-list"></ol><button class="primary" type="button">Check order</button><div class="feedback" hidden></div></div>`);
  const ol=card.querySelector(".order-list"), btn=card.querySelector("button.primary"), f=card.querySelector(".feedback");
  let order=state.answers.anaOrder || shuffle([0,1,2,3,4,5]);
  const done=taskDone("anaOrder");
  function draw(check){
    ol.innerHTML="";
    order.forEach((ei,pos)=>{
      const judged=check||done, isRight=ei===pos;
      const li=h(`<li><span class="num">${pos+1}</span><span>${events[ei].t}${judged?` <span class="hint">(${events[ei].d})</span>`:""}</span>${judged?`<span class="verdict ${isRight?"ok":"no"}">${isRight?"✓ In order":"✗ Out of order"}</span>`:""}<span class="mv"><button type="button" aria-label="Move up">↑</button><button type="button" aria-label="Move down">↓</button></span></li>`);
      if(judged) li.classList.add(isRight?"right":"wrong");
      const [up,dn]=li.querySelectorAll("button");
      up.disabled=pos===0||done; dn.disabled=pos===order.length-1||done;
      up.addEventListener("click",()=>{[order[pos-1],order[pos]]=[order[pos],order[pos-1]];draw();});
      dn.addEventListener("click",()=>{[order[pos+1],order[pos]]=[order[pos],order[pos+1]];draw();});
      ol.appendChild(li);
    });
  }
  draw(false);
  if(done){ btn.disabled=true; f.hidden=false; fb(f,true,state.answers.anaOrderMsg||"Already completed."); }
  btn.addEventListener("click",()=>{
    const right=order.filter((ei,pos)=>ei===pos).length;
    draw(true); btn.disabled=true; f.hidden=false;
    const ok=right===events.length;
    const msg=ok?"Correct: all six events are in order.":`${right} of ${events.length} events are in the right position. The dates are now shown so you can see the sequence.`;
    fb(f,ok,msg);
    state.answers.anaOrder=order; state.answers.anaOrderMsg=msg; save();
    markTask("anaOrder", ok?20:Math.round(20*right/events.length),"points");
    ol.querySelectorAll("button").forEach(b=>b.disabled=true);
  });
  c.appendChild(card);
  finishBlock(c,"analyze","act",["anaMiss","anaSplit","anaRich","anaOrder"]);
}
function shuffle(a){ for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a.every((v,i)=>v===i)?shuffle(a):a; }

/* ---------- 5. ACT: Which area was most important? ---------- */
function missionAct(){
  const c=missionEl;
  c.appendChild(h(`<h2>Act</h2>`));
  c.appendChild(h(`<p class="question-head">Which area was most important to the Confederacy?</p>`));
  setLayer("states",true); setLayer("capitals",true); setLayer("battles",true); setLayer("blockade",true); setLayer("control",true);
  goTo({center:[-86,34],zoom:5});
  if(map.ready) showAllBattles();

  const options=["The Union blockade (1861–1865)","Control of the Mississippi River (1863–1865)","Splitting the Confederacy through Georgia (1864–1865)","Taking Richmond, Virginia (1865)"];
  const saved=state.answers.act||{};
  const card=h(`<div class="task"><span class="pts">25 pts</span><h3>Make your case</h3>
    <p>Which area or event had the most impact on allowing the Union to take control of the Confederacy? There is no single right answer; points are for a complete, evidence-based argument.</p>
    <div class="choices" id="actChoices"></div>
    <label for="actText"><b>Support your answer</b> with at least two pieces of evidence from the map (at least 60 words).</label>
    <textarea id="actText" placeholder="I think ... had the most impact because ..."></textarea>
    <p class="hint" id="wc">0 words</p>
    <div class="row"><button class="primary" type="button" id="actSubmit">Log argument</button></div>
    <div class="feedback" hidden></div></div>`);
  const ch=card.querySelector("#actChoices"), ta=card.querySelector("#actText"), wc=card.querySelector("#wc"), f=card.querySelector(".feedback"), sub=card.querySelector("#actSubmit");
  let pick=saved.pick;
  options.forEach((o,i)=>{ const b=h(`<button type="button">${o}</button>`); if(pick===i) b.classList.add("correct"); b.addEventListener("click",()=>{ if(taskDone("act")) return; pick=i; ch.querySelectorAll("button").forEach(x=>x.classList.remove("correct")); b.classList.add("correct"); }); ch.appendChild(b); });
  ta.value=saved.text||"";
  const words=()=>ta.value.trim().split(/\s+/).filter(Boolean).length;
  const updWc=()=>wc.textContent=`${words()} words`; updWc(); ta.addEventListener("input",updWc);
  if(taskDone("act")){ ta.disabled=true; sub.disabled=true; ch.querySelectorAll("button").forEach(x=>x.disabled=true); f.hidden=false; fb(f,true,"Argument logged."); }
  sub.addEventListener("click",()=>{
    f.hidden=false;
    if(pick===undefined){ fb(f,false,"Choose one of the four options first."); return; }
    if(words()<60){ fb(f,false,`Your argument has ${words()} words. Add more evidence to reach 60.`); return; }
    state.answers.act={pick,text:ta.value,option:options[pick]}; markTask("act",25,"points"); save();
    fb(f,true,"Argument logged."); renderMission();
  });
  c.appendChild(card);

  const req=["act"];
  finishBlock(c,"act",null,req);
  if(taskDone("act")){
    const s=h(`<div class="summary-box"><h3 style="font-family:var(--serif);margin:0 0 8px">Your dispatch</h3><dl>
      <dt>Score</dt><dd>${state.score} points</dd>
      <dt>Badges</dt><dd>${state.badges.length} of ${BADGES.length}</dd>
      <dt>Distance measured</dt><dd>${state.answers.acqDistance||"—"} miles</dd>
      <dt>Find-the-battle</dt><dd>${(state.answers.findBattle||{}).earned||0} points</dd>
      <dt>Your position</dt><dd>${(state.answers.act||{}).option||"—"}</dd></dl>
      <div class="row" style="margin-top:12px"><button class="primary" type="button" id="dl">Download my answers</button><button class="secondary" type="button" id="cp">Copy to clipboard</button></div></div>`);
    c.appendChild(s);
    const report=()=>buildReport();
    s.querySelector("#dl").addEventListener("click",()=>{ const blob=new Blob([report()],{type:"text/plain"}); const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="civil-war-missions-answers.txt"; a.click(); });
    s.querySelector("#cp").addEventListener("click",()=>{ navigator.clipboard.writeText(report()).then(()=>toast("Copied")).catch(()=>toast("Copy failed; use Download")); });
  }
}
function buildReport(){
  const a=state.answers, L=[];
  L.push("A Nation Divided: Civil War Map Missions — student answers");
  L.push("Submitted: "+new Date().toLocaleString());
  L.push("Score: "+state.score+" | Badges: "+state.badges.map(b=>BADGES.find(x=>x.id===b).name).join(", "));
  L.push("");
  L.push("Ask: states found: "+JSON.stringify(a.askFound||{}));
  ["askClassify","askSlavery","askCount","acqUnionCap","acqConfedCap","acqWhy","expBlockade","expDirection","expGeorgia","anaMiss","anaSplit","anaRich"].forEach(k=>{ if(a[k]) L.push(k+": "+a[k]); });
  if(a.expPatterns) L.push("expPatterns: "+a.expPatterns.join(" | "));
  L.push("Distance D.C. to Richmond (entered): "+(a.acqDistance||"—")+" miles");
  if(a.findBattle) L.push("Find the battle: "+a.findBattle.log.map(x=>x.skipped?x.title+" (skipped)":`${x.title} ${x.miles} mi (+${x.pts})`).join("; "));
  if(a.anaOrder) L.push("Event order submitted: "+a.anaOrder.map(x=>x+1).join(","));
  if(a.act){ L.push(""); L.push("Act position: "+a.act.option); L.push(a.act.text); }
  return L.join("\n");
}

/* =====================================================================
   MODALS
   ===================================================================== */
const modalBack=document.getElementById("modalBack"), modalBody=document.getElementById("modalBody");
let modalOpener=null;
const FOCUSABLE='a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
function setPageInert(on){ document.querySelectorAll("header.topbar, main").forEach(el=>{ if(on) el.setAttribute("inert",""); else el.removeAttribute("inert"); el.setAttribute("aria-hidden",on?"true":"false"); }); }
function openModal(html){
  modalOpener=document.activeElement;
  modalBody.innerHTML=`<button class="secondary close" type="button">Close</button>`+html;
  const heading=modalBody.querySelector("h2"); if(heading){ heading.id="modalTitle"; modalBack.setAttribute("aria-labelledby","modalTitle"); }
  modalBack.classList.add("show"); setPageInert(true);
  modalBody.querySelector(".close").focus();
}
function closeModal(){
  if(!modalBack.classList.contains("show")) return;
  modalBack.classList.remove("show"); setPageInert(false);
  if(modalOpener&&typeof modalOpener.focus==="function") modalOpener.focus();
  modalOpener=null;
}
modalBack.addEventListener("click",e=>{ if(e.target===modalBack||e.target.classList.contains("close")) closeModal(); });
document.addEventListener("keydown",e=>{
  if(!modalBack.classList.contains("show")) return;
  if(e.key==="Escape"){ e.preventDefault(); closeModal(); return; }
  if(e.key==="Tab"){   // keep focus inside the dialog
    const items=[...modalBody.querySelectorAll(FOCUSABLE)].filter(el=>el.offsetParent!==null);
    if(!items.length) return;
    const first=items[0], last=items[items.length-1];
    if(e.shiftKey && (document.activeElement===first || !modalBody.contains(document.activeElement))){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
  }
});

document.getElementById("btnHelp").addEventListener("click",()=>openModal(`
  <h2>How to play</h2>
  <p>You work through five sections in the same order as the GeoInquiry lesson: Ask, Acquire, Explore, Analyze, Act. Each section unlocks the next once every task is done. Earn points for correct answers (a streak of three correct answers adds a bonus) and a badge for each section.</p>
  <h3>Map controls</h3>
  <ul>
    <li>The Layers list (top right) has a checkbox for each map layer. When Battles is checked, year buttons appear at the bottom of the map so you can look at one year of the war at a time.</li>
    <li>Click any state, capital, battle, or milestone marker to open its details.</li>
    <li>Measure distance: the ruler button under the Layers list opens the measure tool. Click a start point, then double-click to finish. The tool panel shows miles.</li>
    <li>Keyboard: every map task has a keyboard alternative. Choose a state from the list in Ask, press "Calculate the distance" in Acquire, and in the battle challenge press Tab until the map is focused, move it with the arrow keys (+ and − zoom), then press "Guess the map center."</li>
    <li>The app has two modes. GeoInquiry mode (the default) walks you through the five sections: Ask, Acquire, Explore, Analyze, Act. Explore mode hides the GeoInquiry panel and scoring and turns on every layer so you can use the map freely; switch with the GeoInquiry / Explore buttons in the header.</li>
    <li>Your progress saves in this browser. Use Reset to start over.</li>
  </ul>`));

document.getElementById("btnSources").addEventListener("click",()=>openModal(`
  <h2>Sources and data</h2>
  <h3>Map layers (ArcGIS Online)</h3>
  <table>
    <tr><th>Layer</th><th>Service</th><th>Notes</th></tr>
    <tr><td>Civil War battles</td><td><code>${LAYER_URLS.battles}</code></td><td>Public hosted feature layer of Civil War battles compiled from Civil War Trust (civilwar.org, now the American Battlefield Trust) battle pages, a subset of the National Park Service CWSAC battle list; each record carries its NPS CWSAC ID. Casualty and result values shown in popups come from this dataset.</td></tr>
    <tr><td>States</td><td><code>${LAYER_URLS.states}</code></td><td>Esri Living Atlas "USA States (Generalized)" (U.S. Census Bureau boundaries). Union/Confederate/border classification is applied in this app; boundaries are modern.</td></tr>
    <tr><td>Basemap</td><td>Esri "gray-vector"</td><td>Loaded through the ArcGIS Maps SDK for JavaScript 4.30. The status box at the bottom right of the map reports how many battles loaded.</td></tr>
  </table>
  <h3>Historical facts</h3>
  <ul>
    <li>National Park Service, Civil War Sites Advisory Commission (CWSAC) battle summaries (nps.gov).</li>
    <li>American Battlefield Trust battle pages (battlefields.org).</li>
    <li>Esri GeoInquiries, "A Nation Divided: the Civil War" (U.S. History collection).</li>
  </ul>
  <p>The blockade line and the Union-control milestone markers are drawn in this app from the dated events listed in their popups; the original GeoInquiry "Union Control" polygon layer is no longer available.</p>`));

document.getElementById("btnTeacher").addEventListener("click",()=>openModal(`
  <h2>Teacher notes</h2>
  <p><a href="https://esriurl.com/geoinquiries" target="_blank" rel="noopener">GeoInquiries home</a></p>
  <p>Aligned to the GeoInquiry outcomes: students compare the chronology of battle locations and Union control from 1861 to 1865, and identify Confederate, Union, and border states, Richmond, and Washington, D.C. C3 standards: D2.His.1.9-12, D2.His.2.9-12, D2.His.3.9-12.</p>
  <h3>Things to know</h3>
  <ul>
    <li>State outlines are modern. West Virginia is shown as a Union state (admitted June 20, 1863); Nevada as Union (statehood Oct. 31, 1864); modern states that were territories in 1861 are shaded gray. Point this out when students look at the map.</li>
    <li>The battle layer is a public ArcGIS Online service that this app does not control. If it is ever removed, the "Find the battle" challenge skips itself and the rest of the game still works. The Sources panel lists the service URL so you can swap in another layer (any point layer with battle_name, start_date, result, and location fields, or adjust the field names in the script).</li>
    <li>The map needs internet access to js.arcgis.com and arcgis.com. If your school filters those, the questions still run but map tasks are auto-skipped.</li>
    <li>Scoring: 10–15 points per question, streak bonus of 5 after three correct in a row, up to 90 points in the find-the-battle challenge, 20 for sequencing, 25 for the final argument.</li>
    <li>Extension ideas from the lesson: have students describe where a heat map of battles would be densest, or estimate which battles fall within 60 miles of a capital using the measure tool.</li>
  </ul>
  <p style="margin-top:22px;border-top:1px solid var(--rule);padding-top:12px">Designed by <a href="https://tbaker.com" target="_blank" rel="noopener">Tom Baker</a></p>
  <nav class="policy-links" aria-label="Policies"><a href="https://trbaker.github.io/geoinquiries/support/privacy.html" target="_blank" rel="noopener">Privacy</a><a href="https://trbaker.github.io/geoinquiries/support/accessibility.html" target="_blank" rel="noopener">Accessibility</a><a href="https://trbaker.github.io/geoinquiries/support/termsofuse.html" target="_blank" rel="noopener">Terms of use</a></nav>
  <p class="cc-badge"><a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="license noopener"><img src="cc-by-nc-sa.svg" data-fallback="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-sa.svg" alt="Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International license" width="88" height="31" onerror="if(this.dataset.fallback){this.src=this.dataset.fallback;delete this.dataset.fallback;}else{this.replaceWith(Object.assign(document.createElement('b'),{textContent:'CC BY-NC-SA 4.0'}))}"></a></p>`));

/* ---------- Mission / Explore modes ---------- */
let mode="mission";   // the app always starts in Mission mode
function setMode(next){
  if(next===mode) return;
  mode=next;
  document.body.classList.toggle("mode-explore",mode==="explore");
  document.getElementById("modeMission").setAttribute("aria-pressed",String(mode==="mission"));
  document.getElementById("modeExplore").setAttribute("aria-pressed",String(mode==="explore"));
  if(mode==="explore"){
    // Free exploration: no mission prompts or click tasks, every layer available
    clearGame(); toggleMeasure(false);
    ["states","capitals","battles","blockade","control"].forEach(n=>setLayer(n,true));
    if(map.ready) showAllBattles();
  } else {
    renderMission();   // restores the current mission's layers, prompts and map tasks
  }
  if(map.ready && map.view) setTimeout(()=>{ try{ map.view.resize(); }catch(e){} },50);
}
document.getElementById("modeMission").addEventListener("click",()=>setMode("mission"));
document.getElementById("modeExplore").addEventListener("click",()=>setMode("explore"));

document.getElementById("btnReset").addEventListener("click",()=>{
  if(!confirm("Reset all progress and start over?")) return;
  state={score:0,badges:[],mission:"ask",done:{},answers:{},tasks:{},streak:0}; save(); renderMission();
});

/* ---------- boot ---------- */
renderBadges(); renderProgress(); renderMission(); initMap();
