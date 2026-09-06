var mb=Object.defineProperty;var gb=(Ti,Vn,Tn)=>Vn in Ti?mb(Ti,Vn,{enumerable:!0,configurable:!0,writable:!0,value:Tn}):Ti[Vn]=Tn;var Je=(Ti,Vn,Tn)=>gb(Ti,typeof Vn!="symbol"?Vn+"":Vn,Tn);(function(){"use strict";function Ti(n){let e=1779033703,t=3144134277,i=1013904242,s=2773480762;for(let r=0;r<n.length;r++){const a=n.charCodeAt(r);e=t^Math.imul(e^a,597399067),t=i^Math.imul(t^a,2869860233),i=s^Math.imul(i^a,951274213),s=e^Math.imul(s^a,2716044179)}return e=Math.imul(i^e>>>18,597399067),t=Math.imul(s^t>>>22,2869860233),i=Math.imul(e^i>>>17,951274213),s=Math.imul(t^s>>>19,2716044179),[(e^t^i^s)>>>0,(t^e)>>>0,(i^e)>>>0,(s^e)>>>0]}function Vn(n){return n.join("␟")}class Tn{constructor(e,t){Je(this,"a");Je(this,"b");Je(this,"c");Je(this,"d");this.address=t,[this.a,this.b,this.c,this.d]=e;for(let i=0;i<12;i++)this.nextUint32()}static fromSeed(...e){const t=Vn(e);return new Tn(Ti(t),t)}derive(...e){return Tn.fromSeed(this.address,...e)}nextUint32(){const e=this.a+this.b|0;this.a=this.b^this.b>>>9,this.b=this.c+(this.c<<3)|0,this.c=this.c<<21|this.c>>>11,this.d=this.d+1|0;const t=e+this.d|0;return this.c=this.c+t|0,t>>>0}next(){return this.nextUint32()/4294967296}int(e,t){if(t<e)throw new RangeError(`Rng.int: max (${t}) < min (${e})`);return e+Math.floor(this.next()*(t-e+1))}float(e,t){return e+this.next()*(t-e)}bool(e=.5){return this.next()<e}pick(e){if(e.length===0)throw new RangeError("Rng.pick: empty collection");return e[Math.floor(this.next()*e.length)]}pickWeighted(e){let t=0;for(const[,s]of e)s>0&&(t+=s);if(t<=0)throw new RangeError("Rng.pickWeighted: no entry has a positive weight");let i=this.next()*t;for(const[s,r]of e)if(!(r<=0)&&(i-=r,i<0))return s;return e[e.length-1][0]}shuffle(e){const t=e.slice();for(let i=t.length-1;i>0;i--){const s=this.int(0,i);[t[i],t[s]]=[t[s],t[i]]}return t}sample(e,t){return this.shuffle(e).slice(0,Math.max(0,Math.min(t,e.length)))}normal(e=0,t=1){let i=0;for(;i===0;)i=this.next();const s=this.next();return e+t*Math.sqrt(-2*Math.log(i))*Math.cos(2*Math.PI*s)}clampedNormal(e,t,i,s){for(let r=0;r<24;r++){const a=this.normal(e,t);if(a>=i&&a<=s)return a}return Math.min(s,Math.max(i,this.normal(e,t)))}triangular(e,t,i){const s=this.next(),r=(t-e)/(i-e);return s<r?e+Math.sqrt(s*(i-e)*(t-e)):i-Math.sqrt((1-s)*(i-e)*(i-t))}}function $(n,e,t){return n<e?e:n>t?t:n}function Tp(n){return $(n,1,100)}function Qa(n,e,t){return n+(e-n)*$(t,0,1)}function dt(n,e,t,i,s){return t===e?i:Qa(i,s,(n-e)/(t-e))}function He(n,e=0){const t=10**e;return Math.round(n*t)/t}function wp(n){let e=0;for(const t of n)e+=t;return e}function ja(n){return n.length===0?0:wp(n)/n.length}function Rp(n){if(n.length===0)return 0;const e=ja(n);return Math.sqrt(ja(n.map(t=>(t-e)**2)))}function wn(n){let e=0,t=0;for(const[i,s]of n)s<=0||(e+=i*s,t+=s);return t===0?0:e/t}function Cp(n,e=0,t=1){return 1/(1+Math.exp(-t*(n-e)))}const vh=864e5;function $a(n){const[e,t,i]=n.split("-").map(Number);if(!e||!t||!i)throw new TypeError(`Invalid simulated date: ${n}`);return Date.UTC(e,t-1,i)}function Lp(n){return new Date(n).toISOString().slice(0,10)}function zs(n,e){return Lp($a(n)+e*vh)}function eo(n,e){return Math.round(($a(e)-$a(n))/vh)}function to(n){return Number(n.slice(0,4))}function Pp(n,e){return Math.floor(eo(n,e)/7)}const br=[{key:"boxing",label:"Boxing",group:"striking",agingClass:"skill",isStyleSkill:!0},{key:"muayThai",label:"Muay Thai",group:"striking",agingClass:"skill",isStyleSkill:!0},{key:"kickboxing",label:"Kickboxing",group:"striking",agingClass:"skill",isStyleSkill:!0},{key:"dutchKickboxing",label:"Dutch Kickboxing",group:"striking",agingClass:"skill",isStyleSkill:!0},{key:"karate",label:"Karate",group:"striking",agingClass:"skill",isStyleSkill:!0},{key:"taekwondo",label:"Taekwondo",group:"striking",agingClass:"skill",isStyleSkill:!0},{key:"sanda",label:"Sanda",group:"striking",agingClass:"skill",isStyleSkill:!0},{key:"strikingDefense",label:"Striking Defence",group:"striking",agingClass:"skill",isStyleSkill:!1},{key:"footwork",label:"Footwork",group:"striking",agingClass:"physical",isStyleSkill:!1},{key:"strikingPower",label:"Striking Power",group:"striking",agingClass:"physical",isStyleSkill:!1},{key:"strikingAccuracy",label:"Striking Accuracy",group:"striking",agingClass:"skill",isStyleSkill:!1},{key:"freestyleWrestling",label:"Freestyle Wrestling",group:"wrestling",agingClass:"skill",isStyleSkill:!0},{key:"folkstyleWrestling",label:"Folkstyle Wrestling",group:"wrestling",agingClass:"skill",isStyleSkill:!0},{key:"grecoRomanWrestling",label:"Greco-Roman Wrestling",group:"wrestling",agingClass:"skill",isStyleSkill:!0},{key:"takedownAbility",label:"Takedown Ability",group:"wrestling",agingClass:"skill",isStyleSkill:!1},{key:"takedownDefense",label:"Takedown Defence",group:"wrestling",agingClass:"skill",isStyleSkill:!1},{key:"chainWrestling",label:"Chain Wrestling",group:"wrestling",agingClass:"skill",isStyleSkill:!1},{key:"clinchWrestling",label:"Clinch Wrestling",group:"wrestling",agingClass:"skill",isStyleSkill:!1},{key:"cageWork",label:"Cage Work",group:"wrestling",agingClass:"skill",isStyleSkill:!1},{key:"brazilianJiuJitsu",label:"Brazilian Jiu-Jitsu",group:"grappling",agingClass:"skill",isStyleSkill:!0},{key:"submissionGrappling",label:"Submission Grappling",group:"grappling",agingClass:"skill",isStyleSkill:!0},{key:"judo",label:"Judo",group:"grappling",agingClass:"skill",isStyleSkill:!0},{key:"sambo",label:"Sambo",group:"grappling",agingClass:"skill",isStyleSkill:!0},{key:"guardGame",label:"Guard Game",group:"grappling",agingClass:"skill",isStyleSkill:!1},{key:"topControl",label:"Top Control",group:"grappling",agingClass:"skill",isStyleSkill:!1},{key:"submissionAbility",label:"Submission Ability",group:"grappling",agingClass:"skill",isStyleSkill:!1},{key:"submissionDefense",label:"Submission Defence",group:"grappling",agingClass:"skill",isStyleSkill:!1},{key:"scrambling",label:"Scrambling",group:"grappling",agingClass:"physical",isStyleSkill:!1},{key:"groundStriking",label:"Ground Striking",group:"grappling",agingClass:"skill",isStyleSkill:!1},{key:"strength",label:"Strength",group:"physical",agingClass:"physical",isStyleSkill:!1},{key:"explosiveness",label:"Explosiveness",group:"physical",agingClass:"physical",isStyleSkill:!1},{key:"speed",label:"Speed",group:"physical",agingClass:"physical",isStyleSkill:!1},{key:"agility",label:"Agility",group:"physical",agingClass:"physical",isStyleSkill:!1},{key:"cardio",label:"Cardio",group:"physical",agingClass:"physical",isStyleSkill:!1},{key:"durability",label:"Durability",group:"physical",agingClass:"physical",isStyleSkill:!1},{key:"recovery",label:"Recovery",group:"physical",agingClass:"physical",isStyleSkill:!1},{key:"balance",label:"Balance",group:"physical",agingClass:"physical",isStyleSkill:!1},{key:"fightIQ",label:"Fight IQ",group:"mental",agingClass:"mental",isStyleSkill:!1},{key:"composure",label:"Composure",group:"mental",agingClass:"mental",isStyleSkill:!1},{key:"adaptability",label:"Adaptability",group:"mental",agingClass:"mental",isStyleSkill:!1},{key:"confidence",label:"Confidence",group:"mental",agingClass:"mental",isStyleSkill:!1},{key:"aggression",label:"Aggression",group:"mental",agingClass:"mental",isStyleSkill:!1},{key:"decisionMaking",label:"Decision Making",group:"mental",agingClass:"mental",isStyleSkill:!1},{key:"pressureManagement",label:"Pressure Management",group:"mental",agingClass:"mental",isStyleSkill:!1}],wi=br.map(n=>n.key),Dp=new Map(br.map(n=>[n.key,n]));function Ip(n){const e=Dp.get(n);if(!e)throw new RangeError(`Unknown attribute: ${n}`);return e}function no(n){return br.filter(e=>e.group===n&&e.isStyleSkill).map(e=>e.key)}function Np(n){const e={};for(const t of br)e[t.key]=n(t.key,t);return e}function kp(n,e,t){return e.map(i=>n[i]).sort((i,s)=>s-i).slice(0,t)}const xh=[{key:"discipline",label:"Discipline",description:"Adherence to camp, diet and weight-cut demands."},{key:"confidence",label:"Confidence",description:"Baseline self-belief, distinct from in-fight composure."},{key:"ego",label:"Ego",description:"Resistance to correction; drives friction with coaches and rivals."},{key:"aggression",label:"Aggression",description:"Disposition toward forcing exchanges rather than managing them."},{key:"workEthic",label:"Work Ethic",description:"How much of the available training load is genuinely absorbed."},{key:"loyalty",label:"Loyalty",description:"Attachment to a camp, coach and team."},{key:"adaptability",label:"Adaptability",description:"Willingness to change a game plan or a habit."},{key:"coachability",label:"Coachability",description:"How much value is extracted from good coaching."},{key:"riskTolerance",label:"Risk Tolerance",description:"Appetite for dangerous fights and dangerous exchanges."},{key:"composure",label:"Composure",description:"Baseline temperament under career pressure."},{key:"ambition",label:"Ambition",description:"Drive toward titles, bigger camps and bigger fights."}];xh.map(n=>n.key);function Op(n){const e={};for(const t of xh)e[t.key]=n(t.key);return e}const Ri=[{key:"m_flyweight",name:"Flyweight",sex:"male",weightLimitLbs:125,order:1,heightRangeIn:[62,67],reachBiasIn:.5,populationWeight:.6},{key:"m_bantamweight",name:"Bantamweight",sex:"male",weightLimitLbs:135,order:2,heightRangeIn:[63,69],reachBiasIn:.7,populationWeight:.9},{key:"m_featherweight",name:"Featherweight",sex:"male",weightLimitLbs:145,order:3,heightRangeIn:[64,70],reachBiasIn:.9,populationWeight:1.1},{key:"m_lightweight",name:"Lightweight",sex:"male",weightLimitLbs:155,order:4,heightRangeIn:[66,72],reachBiasIn:1,populationWeight:1.5},{key:"m_welterweight",name:"Welterweight",sex:"male",weightLimitLbs:170,order:5,heightRangeIn:[68,74],reachBiasIn:1.2,populationWeight:1.4},{key:"m_middleweight",name:"Middleweight",sex:"male",weightLimitLbs:185,order:6,heightRangeIn:[70,76],reachBiasIn:1.3,populationWeight:1.1},{key:"m_light_heavyweight",name:"Light Heavyweight",sex:"male",weightLimitLbs:205,order:7,heightRangeIn:[72,78],reachBiasIn:1.4,populationWeight:.8},{key:"m_heavyweight",name:"Heavyweight",sex:"male",weightLimitLbs:265,order:8,heightRangeIn:[73,80],reachBiasIn:1.5,populationWeight:.7},{key:"w_strawweight",name:"Women's Strawweight",sex:"female",weightLimitLbs:115,order:1,heightRangeIn:[60,66],reachBiasIn:.3,populationWeight:.45},{key:"w_flyweight",name:"Women's Flyweight",sex:"female",weightLimitLbs:125,order:2,heightRangeIn:[62,68],reachBiasIn:.4,populationWeight:.4},{key:"w_bantamweight",name:"Women's Bantamweight",sex:"female",weightLimitLbs:135,order:3,heightRangeIn:[63,70],reachBiasIn:.5,populationWeight:.3},{key:"w_featherweight",name:"Women's Featherweight",sex:"female",weightLimitLbs:145,order:4,heightRangeIn:[64,71],reachBiasIn:.6,populationWeight:.15}],Up=new Map(Ri.map(n=>[n.key,n]));function Fp(n){const e=Up.get(n);if(!e)throw new RangeError(`Unknown division: ${n}`);return e}function Bp(n){return Ri.filter(e=>e.sex===n).sort((e,t)=>e.order-t.order)}function Gp(){const n={};for(const e of wi)n[e]=.25;return n.fightIQ=1,n.adaptability=.8,n.decisionMaking=.7,n}const Ci=[{key:"boxing",label:"Boxing",family:"striking",prevalence:10,attributeWeights:{boxing:1,strikingAccuracy:.6,strikingDefense:.5,footwork:.45,strikingPower:.35}},{key:"muay_thai",label:"Muay Thai",family:"striking",prevalence:9,attributeWeights:{muayThai:1,strikingPower:.5,clinchWrestling:.35,strikingDefense:.3,kickboxing:.25}},{key:"kickboxing",label:"Kickboxing",family:"striking",prevalence:6,attributeWeights:{kickboxing:1,footwork:.45,strikingAccuracy:.4,muayThai:.2}},{key:"dutch_kickboxing",label:"Dutch Kickboxing",family:"striking",prevalence:4,attributeWeights:{dutchKickboxing:1,kickboxing:.5,strikingPower:.55,boxing:.35,cardio:.25}},{key:"karate",label:"Karate",family:"striking",prevalence:2,attributeWeights:{karate:1,footwork:.6,speed:.35,strikingAccuracy:.35}},{key:"taekwondo",label:"Taekwondo",family:"striking",prevalence:1.2,attributeWeights:{taekwondo:1,agility:.45,speed:.4,footwork:.3}},{key:"sanda",label:"Sanda",family:"striking",prevalence:1.5,attributeWeights:{sanda:1,clinchWrestling:.4,takedownAbility:.3,strikingPower:.3}},{key:"freestyle_wrestling",label:"Freestyle Wrestling",family:"wrestling",prevalence:9,attributeWeights:{freestyleWrestling:1,takedownAbility:.7,chainWrestling:.5,scrambling:.35}},{key:"folkstyle_wrestling",label:"Folkstyle Wrestling",family:"wrestling",prevalence:7,attributeWeights:{folkstyleWrestling:1,topControl:.6,chainWrestling:.55,takedownAbility:.5}},{key:"greco_roman",label:"Greco-Roman Wrestling",family:"wrestling",prevalence:4,attributeWeights:{grecoRomanWrestling:1,clinchWrestling:.7,strength:.4,balance:.3}},{key:"cage_wrestling",label:"Cage Wrestling",family:"wrestling",prevalence:7,attributeWeights:{cageWork:1,clinchWrestling:.6,takedownAbility:.45,takedownDefense:.4}},{key:"takedown_defense",label:"Takedown Defence",family:"wrestling",prevalence:4,attributeWeights:{takedownDefense:1,balance:.5,scrambling:.4}},{key:"bjj",label:"Brazilian Jiu-Jitsu",family:"grappling",prevalence:10,attributeWeights:{brazilianJiuJitsu:1,guardGame:.65,submissionAbility:.6,submissionDefense:.45}},{key:"submission_grappling",label:"Submission Grappling",family:"grappling",prevalence:6,attributeWeights:{submissionGrappling:1,submissionAbility:.7,scrambling:.5,topControl:.3}},{key:"judo",label:"Judo",family:"grappling",prevalence:4,attributeWeights:{judo:1,clinchWrestling:.5,balance:.4,takedownAbility:.4}},{key:"sambo",label:"Sambo",family:"grappling",prevalence:3,attributeWeights:{sambo:1,submissionAbility:.5,takedownAbility:.45,topControl:.35}},{key:"ground_and_pound",label:"Ground and Pound",family:"grappling",prevalence:4,attributeWeights:{groundStriking:1,topControl:.75,strikingPower:.3}},{key:"positional_escapes",label:"Positional Escapes",family:"grappling",prevalence:3,attributeWeights:{scrambling:1,guardGame:.6,submissionDefense:.55}},{key:"strength_conditioning",label:"Strength & Conditioning",family:"physical",prevalence:7,attributeWeights:{strength:1,explosiveness:.8,strikingPower:.3,durability:.25}},{key:"conditioning",label:"Conditioning",family:"physical",prevalence:6,attributeWeights:{cardio:1,recovery:.55,durability:.35}},{key:"speed_agility",label:"Speed & Agility",family:"physical",prevalence:3,attributeWeights:{speed:1,agility:.8,footwork:.4,balance:.3}},{key:"sports_science",label:"Sports Science",family:"physical",prevalence:4,attributeWeights:{recovery:1,cardio:.5,durability:.5,balance:.2}},{key:"film_study",label:"Film Study",family:"mental",prevalence:4,attributeWeights:{fightIQ:1,decisionMaking:.7,adaptability:.55}},{key:"mental_performance",label:"Mental Performance",family:"mental",prevalence:3,attributeWeights:{composure:1,pressureManagement:.8,confidence:.6}},{key:"mma_integration",label:"MMA Integration",family:"integration",prevalence:9,attributeWeights:Gp()}],Hp=new Map(Ci.map(n=>[n.key,n]));function zp(n){const e=Hp.get(n);if(!e)throw new RangeError(`Unknown discipline: ${n}`);return e}const Vp=new Map(Ci.map(n=>{let e=0;for(const i of Object.values(n.attributeWeights))i>e&&(e=i);const t={};for(const[i,s]of Object.entries(n.attributeWeights))t[i]=e===0?0:s/e;return[n.key,t]}));function _h(n,e){return Vp.get(n)?.[e]??0}const Sh=["strikingOffense","strikingDefense","wrestlingOffense","wrestlingDefense","clinch","groundOffense","groundDefense","physical","mental"],Mh={strikingOffense:"Striking Offence",strikingDefense:"Striking Defence",wrestlingOffense:"Wrestling Offence",wrestlingDefense:"Wrestling Defence",clinch:"Clinch",groundOffense:"Ground Offence",groundDefense:"Ground Defence",physical:"Physical",mental:"Mental"},Wp=no("striking"),Xp=no("wrestling"),Kp=no("grappling");function io(n,e){const[t=0,i=0]=kp(n,e,2);return[t,i]}function so(n){const[e,t]=io(n,Wp),[i]=io(n,Xp),[s,r]=io(n,Kp);return{strikingOffense:wn([[e,.4],[t,.15],[n.strikingAccuracy,.2],[n.strikingPower,.25]]),strikingDefense:wn([[n.strikingDefense,.55],[n.footwork,.3],[n.speed,.15]]),wrestlingOffense:wn([[i,.3],[n.takedownAbility,.35],[n.chainWrestling,.2],[n.strength,.15]]),wrestlingDefense:wn([[n.takedownDefense,.6],[n.balance,.25],[n.scrambling,.15]]),clinch:wn([[n.clinchWrestling,.45],[n.cageWork,.3],[n.grecoRomanWrestling,.25]]),groundOffense:wn([[s,.24],[r,.08],[n.submissionAbility,.24],[n.topControl,.24],[n.groundStriking,.2]]),groundDefense:wn([[n.submissionDefense,.4],[n.guardGame,.3],[n.scrambling,.3]]),physical:wn([[n.cardio,.2],[n.durability,.18],[n.speed,.14],[n.explosiveness,.13],[n.strength,.12],[n.agility,.09],[n.recovery,.08],[n.balance,.06]]),mental:wn([[n.fightIQ,.3],[n.composure,.2],[n.decisionMaking,.2],[n.adaptability,.15],[n.pressureManagement,.15]])}}const Yp={strikingOffense:.16,strikingDefense:.11,wrestlingOffense:.12,wrestlingDefense:.11,clinch:.06,groundOffense:.11,groundDefense:.1,physical:.13,mental:.1};function qp(n){return $(wn(Sh.map(e=>[n[e],Yp[e]])),0,100)}const Jp={pressure:.5,range:.5,strikeVolume:.5,takedownRate:.5,clinchRate:.5,submissionSeeking:.5,counterRate:.5,groundControl:.5,pace:.5},qt=n=>({...Jp,...n}),ro=[{key:"pressure_boxer",label:"Pressure Boxer",description:"Walks opponents down behind heavy hands and a suffocating pace.",offsets:{boxing:22,strikingPower:12,cardio:11,aggression:14,footwork:5,pressureManagement:6,taekwondo:-18,karate:-12,guardGame:-8},tendencies:qt({pressure:.88,range:.25,strikeVolume:.78,takedownRate:.22,counterRate:.2,pace:.8})},{key:"counter_striker",label:"Counter Striker",description:"Invites the lead and punishes it.",offsets:{strikingDefense:18,footwork:14,strikingAccuracy:15,boxing:10,composure:12,fightIQ:8,aggression:-12},tendencies:qt({pressure:.22,range:.68,counterRate:.9,strikeVolume:.42,takedownRate:.2,pace:.42})},{key:"muay_thai_destroyer",label:"Muay Thai Destroyer",description:"Elbows, knees and low kicks from a punishing clinch.",offsets:{muayThai:24,strikingPower:14,clinchWrestling:12,kickboxing:8,durability:6,brazilianJiuJitsu:-10,guardGame:-8},tendencies:qt({pressure:.68,range:.35,clinchRate:.78,strikeVolume:.6,takedownRate:.2,pace:.6})},{key:"out_fighter",label:"Out-Fighter",description:"Fights at the end of their range and refuses to be cornered.",offsets:{footwork:18,speed:14,kickboxing:12,strikingDefense:11,strikingAccuracy:8,strikingPower:-8,aggression:-8},tendencies:qt({pressure:.2,range:.9,strikeVolume:.55,counterRate:.6,clinchRate:.2,pace:.5})},{key:"wrestle_boxer",label:"Wrestle-Boxer",description:"Threatens the takedown to land the right hand, and the right hand to land the takedown.",offsets:{boxing:16,freestyleWrestling:16,takedownAbility:14,chainWrestling:8,topControl:8,fightIQ:6,taekwondo:-15,guardGame:-6},tendencies:qt({pressure:.68,range:.4,takedownRate:.62,strikeVolume:.55,groundControl:.6,pace:.6})},{key:"chain_wrestler",label:"Chain Wrestler",description:"Relentless entries; if the first shot fails the second is already coming.",offsets:{chainWrestling:22,freestyleWrestling:18,takedownAbility:18,folkstyleWrestling:14,cardio:11,strikingPower:-10,taekwondo:-12},tendencies:qt({pressure:.75,range:.3,takedownRate:.9,strikeVolume:.32,groundControl:.7,clinchRate:.65,pace:.72})},{key:"bjj_specialist",label:"BJJ Submission Specialist",description:"Happy anywhere the fight goes down, and hunting the finish from everywhere.",offsets:{brazilianJiuJitsu:24,submissionAbility:20,guardGame:18,submissionGrappling:12,scrambling:8,strikingDefense:-8,takedownDefense:-8},tendencies:qt({pressure:.42,submissionSeeking:.92,groundControl:.3,takedownRate:.55,strikeVolume:.35,pace:.48})},{key:"ground_and_pound_wrestler",label:"Ground-and-Pound Wrestler",description:"Takes you down and makes the round miserable.",offsets:{folkstyleWrestling:18,topControl:20,groundStriking:20,takedownAbility:14,strength:10,footwork:-8,taekwondo:-12},tendencies:qt({pressure:.7,takedownRate:.82,groundControl:.85,submissionSeeking:.25,strikeVolume:.45,pace:.6})},{key:"clinch_specialist",label:"Clinch Specialist",description:"Lives on the fence, where the fight becomes a wrestling match.",offsets:{clinchWrestling:22,cageWork:18,grecoRomanWrestling:18,muayThai:8,strength:10,footwork:-10,kickboxing:-8},tendencies:qt({pressure:.78,range:.15,clinchRate:.92,takedownRate:.55,strikeVolume:.4,pace:.62})},{key:"kicker",label:"Kicker",description:"Long, varied kicks that dismantle a lead leg over three rounds.",offsets:{kickboxing:18,taekwondo:14,karate:10,agility:12,footwork:10,boxing:-10,clinchWrestling:-10},tendencies:qt({pressure:.4,range:.82,strikeVolume:.6,takedownRate:.18,clinchRate:.2,pace:.55})},{key:"karate_counter_fighter",label:"Karate Counter Fighter",description:"Explodes in and out of range from a bladed stance.",offsets:{karate:24,footwork:18,speed:14,explosiveness:12,strikingAccuracy:10,clinchWrestling:-12,grecoRomanWrestling:-10},tendencies:qt({pressure:.3,range:.88,counterRate:.82,strikeVolume:.4,clinchRate:.15,pace:.45})},{key:"sambo_grappler",label:"Sambo Grappler",description:"Trips, throws and leg locks from a wrestling base.",offsets:{sambo:24,judo:14,submissionAbility:14,takedownAbility:12,scrambling:10,topControl:8,taekwondo:-12},tendencies:qt({pressure:.6,takedownRate:.75,submissionSeeking:.7,clinchRate:.6,groundControl:.6,pace:.58})},{key:"complete_mma",label:"Complete MMA Fighter",description:"No holes, no obvious lead — wins wherever the fight ends up.",offsets:{fightIQ:14,adaptability:12,decisionMaking:10,boxing:6,freestyleWrestling:6,brazilianJiuJitsu:6,cardio:6,takedownDefense:6,submissionDefense:6},tendencies:qt({pressure:.55,takedownRate:.5,strikeVolume:.55,pace:.58})},{key:"brawler",label:"Brawler",description:"Trades in the pocket and dares you to trade back.",offsets:{strikingPower:22,aggression:20,durability:12,boxing:8,strikingDefense:-16,fightIQ:-10,composure:-10},tendencies:qt({pressure:.85,range:.18,strikeVolume:.85,counterRate:.15,takedownRate:.2,pace:.88})},{key:"defensive_technician",label:"Defensive Technician",description:"Extremely hard to hit, extremely hard to take down, and content to win on points.",offsets:{strikingDefense:20,takedownDefense:18,submissionDefense:14,composure:14,fightIQ:12,aggression:-16,strikingPower:-8},tendencies:qt({pressure:.3,range:.7,counterRate:.72,strikeVolume:.42,takedownRate:.25,pace:.42})}];new Map(ro.map(n=>[n.key,n]));function Zp(n){const e=wi.map(r=>n[r]),t=ja(e),i=Rp(e)||1,s={};for(const r of wi)s[r]=(n[r]-t)/i;return ro.map(r=>{let a=0,o=0;for(const[c,l]of Object.entries(r.offsets))a+=l*s[c],o+=l*l;return{archetype:r,fit:o===0?0:a/Math.sqrt(o)}}).sort((r,a)=>a.fit-r.fit)}function Qp(n,e,t=.3){const i={};for(const s of Object.keys(n))i[s]=n[s]*(1-t)+e[s]*t;return i}function ao(n){const e=Zp(n),t=e[0].archetype,i=e[1].archetype,s=so(n),r=[...Sh].sort((l,u)=>s[u]-s[l]),a=r[0],o=r[r.length-1];let c=wi[0];for(const l of wi)n[l]>n[c]&&(c=l);return{primary:t,secondary:i,strength:{facet:a,label:Mh[a],rating:Math.round(s[a])},weakness:{facet:o,label:Mh[o],rating:Math.round(s[o])},signatureSkill:{attribute:c,label:Ip(c).label,rating:Math.round(n[c])},ranking:e,tendencies:Qp(t.tendencies,i.tendencies)}}const oo=200,jp=12,$p=86;function e0(n){return $(dt(qp(n),jp,$p,0,oo),1,oo)}function Er(n){return e0(so(n))}function t0(n){return`${n.firstName} ${n.lastName}`}function un(n){return n.nickname?`${n.firstName} "${n.nickname}" ${n.lastName}`:t0(n)}function dn(n){return Er(n.attributes)}function co(n){return ao(n.attributes)}function yh(n){const{wins:e,losses:t,draws:i,noContests:s}=n.record,r=`${e}-${t}-${i}`;return s>0?`${r} (${s} NC)`:r}function bh(n,e){return Np(t=>Tp(n+(e[t]??0)))}function n0(n,e){const t=Math.min(Math.max(n,1),oo);let i=-80,s=140,r=0,a=bh(r,e),o=Er(a);for(let c=0;c<48&&(r=(i+s)/2,a=bh(r,e),o=Er(a),!(Math.abs(o-t)<.05));c++)o<t?i=r:s=r;return{attributes:a,achievedAbility:o,level:r}}const Vs=[{code:"USA",name:"United States",weight:26,regions:["California","Texas","Florida","New York","Colorado","Illinois","Ohio","Pennsylvania","Arizona","Georgia"],disciplineBias:["folkstyle_wrestling","freestyle_wrestling","boxing","bjj"],maleFirst:["Marcus","Cole","Dante","Tyler","Brandon","Jared","Malik","Trevor","Devin","Corey","Shane","Austin","Xavier","Blake"],femaleFirst:["Alexis","Danielle","Jasmine","Cassidy","Brooke","Morgan","Tiana","Kayla","Sierra","Nicole","Reagan","Simone"],last:["Vale","Corbin","Hargrove","Whitlock","Sandoval","Brennan","Okafor","Delgado","Mercer","Kowalczyk","Rhodes","Sutton","Ferrell","Boone","Castellano","Pike"]},{code:"BRA",name:"Brazil",weight:15,regions:["Rio de Janeiro","São Paulo","Curitiba","Belém","Fortaleza","Manaus","Porto Alegre"],disciplineBias:["bjj","muay_thai","submission_grappling"],maleFirst:["Rafael","Thiago","Vinícius","Bruno","Caio","Everton","Douglas","Matheus","Ronaldo","Igor","Wallace","Diego","Leandro","Fábio"],femaleFirst:["Amanda","Larissa","Jéssica","Bianca","Camila","Priscila","Rayssa","Vanessa","Tainara","Luana"],last:["Moraes","Bastos","Queiroz","Amaral","Teixeira","Rocha","Nogueira","Vasconcelos","Falcão","Bittencourt","Andrade","Peixoto","Cavalcanti","Guimarães","Barreto","Salgado"]},{code:"RUS",name:"Russia",weight:11,regions:["Dagestan","Chechnya","Moscow","Saint Petersburg","Krasnodar","Bashkortostan","Ossetia"],disciplineBias:["sambo","freestyle_wrestling","judo"],maleFirst:["Ruslan","Timur","Artem","Islam","Magomed","Shamil","Zaur","Anatoly","Vadim","Rustam","Askar","Gadzhi","Denis","Ilyas"],femaleFirst:["Yana","Anastasia","Marina","Liana","Polina","Ksenia","Aiza","Darya","Elvira"],last:["Gaziev","Ismailov","Tarasov","Bekov","Kurbanov","Zhukov","Aliyev","Sadulaev","Voronin","Magomedov","Terekhin","Nurgaliev","Osipov","Dzhabrailov","Semyonov","Rakhimov"]},{code:"MEX",name:"Mexico",weight:6,regions:["Mexico City","Guadalajara","Monterrey","Tijuana","Puebla","Mérida"],disciplineBias:["boxing","bjj"],maleFirst:["Alejandro","Emiliano","Rodrigo","Ángel","Iván","Santiago","Joaquín","Ramiro","Efraín","Cuauhtémoc","Néstor","Lalo"],femaleFirst:["Valeria","Ximena","Itzel","Renata","Fernanda","Guadalupe","Paola","Citlali"],last:["Arreola","Zamudio","Cervantes","Robledo","Ontiveros","Betancourt","Villalobos","Escárcega","Nájera","Quintanilla","Serrato","Palomino"]},{code:"ENG",name:"England",weight:6,regions:["London","Liverpool","Manchester","Birmingham","Newcastle","Bristol","Leeds"],disciplineBias:["boxing","bjj","freestyle_wrestling"],maleFirst:["Callum","Liam","Harvey","Reece","Declan","Josh","Kieran","Ashley","Nathan","Ollie","Jordan","Freddie"],femaleFirst:["Molly","Chloe","Georgia","Hollie","Imani","Sophie","Bethany","Amber"],last:["Fenwick","Ashcroft","Brailsford","Hollings","Marchetti","Wray","Pemberton","Dunmore","Kettering","Salford","Rennick","Trescott"]},{code:"IRL",name:"Ireland",weight:3,regions:["Dublin","Cork","Galway","Limerick","Belfast"],disciplineBias:["boxing","bjj"],maleFirst:["Cian","Eoin","Fionn","Darragh","Padraig","Ronan","Cormac","Oisín","Killian"],femaleFirst:["Aoife","Saoirse","Niamh","Róisín","Ciara","Orla"],last:["O'Rourke","Kavanagh","Lenihan","Mulcahy","Doheny","Fahey","Corrigan","Nolan","Ferriter","Brannigan"]},{code:"POL",name:"Poland",weight:4,regions:["Warsaw","Kraków","Gdańsk","Wrocław","Poznań","Łódź"],disciplineBias:["freestyle_wrestling","kickboxing","bjj"],maleFirst:["Mateusz","Kacper","Bartosz","Damian","Sebastian","Marcin","Grzegorz","Wojciech","Rafał","Tomasz"],femaleFirst:["Zuzanna","Karolina","Agnieszka","Weronika","Magdalena","Iwona"],last:["Wysocki","Zieliński","Ostrowski","Malinowski","Rutkowski","Bąk","Sikora","Górecki","Adamczyk","Lewandowicz"]},{code:"JPN",name:"Japan",weight:5,regions:["Tokyo","Osaka","Saitama","Fukuoka","Nagoya","Sapporo"],disciplineBias:["judo","karate","submission_grappling","freestyle_wrestling"],maleFirst:["Kenta","Hiroto","Sota","Riku","Yuma","Daiki","Naoya","Shohei","Takumi","Ryuji"],femaleFirst:["Ayaka","Rina","Mei","Kaori","Yui","Saki","Natsumi"],last:["Ishimura","Kawabata","Tsujimoto","Nakagawa","Ogasawara","Hoshino","Sakuraba","Kondo","Mizuhara","Fujinami"]},{code:"KOR",name:"South Korea",weight:3,regions:["Seoul","Busan","Incheon","Daegu"],disciplineBias:["taekwondo","judo","boxing"],maleFirst:["Jae-won","Min-seok","Do-yun","Seung-hyun","Tae-yang","Ji-ho","Chan-woo"],femaleFirst:["Ji-woo","Seo-yeon","Ha-eun","Min-ji","Yu-jin"],last:["Baek","Choe","Hwang","Jeong","Nam","Ryu","Seok","Yoon","Gwak","Pyo"]},{code:"CHN",name:"China",weight:4,regions:["Beijing","Shanghai","Chengdu","Guangzhou","Xi'an","Inner Mongolia"],disciplineBias:["sanda","freestyle_wrestling","boxing"],maleFirst:["Wei","Haoran","Jianguo","Zhenyu","Lianjie","Bolin","Qiang","Yulong"],femaleFirst:["Yaxin","Meilin","Jinghua","Xiulan","Ruoxi"],last:["Bao","Cheng","Dou","Fang","Geng","Hui","Lang","Mo","Qiao","Shen","Tang","Xue"]},{code:"THA",name:"Thailand",weight:3,regions:["Bangkok","Chiang Mai","Phuket","Buriram","Khon Kaen"],disciplineBias:["muay_thai"],maleFirst:["Somchai","Anuwat","Kiatisak","Thanapon","Nattapong","Sarawut","Chaiyaphum"],femaleFirst:["Nong","Pim","Kanya","Sarocha","Duangjai"],last:["Sitthichai","Rungrueang","Phromchan","Wongsawat","Chaiyasit","Boonmee","Naruemon"]},{code:"NGA",name:"Nigeria",weight:3,regions:["Lagos","Abuja","Kano","Port Harcourt","Ibadan"],disciplineBias:["boxing","kickboxing","freestyle_wrestling"],maleFirst:["Chidi","Emeka","Tunde","Ifeanyi","Obinna","Segun","Kelechi","Femi"],femaleFirst:["Adaeze","Ngozi","Chiamaka","Yewande","Zainab"],last:["Adeyemi","Nwachukwu","Balogun","Eze","Okonkwo","Abiodun","Uzoma","Olamide"]},{code:"FRA",name:"France",weight:4,regions:["Paris","Marseille","Lyon","Lille","Toulouse"],disciplineBias:["judo","kickboxing","boxing"],maleFirst:["Baptiste","Enzo","Théo","Yanis","Nathan","Amine","Loïc","Cédric"],femaleFirst:["Manon","Léa","Camille","Océane","Inès"],last:["Lefevre","Bouchard","Marchand","Delacroix","Traoré","Vasseur","Baumann","Charrier"]},{code:"NLD",name:"Netherlands",weight:3,regions:["Amsterdam","Rotterdam","Utrecht","Eindhoven","The Hague"],disciplineBias:["dutch_kickboxing","kickboxing","judo"],maleFirst:["Sven","Jelle","Bram","Ruben","Thijs","Daan","Joost","Marnix"],femaleFirst:["Fenna","Sanne","Lieke","Maud","Roos"],last:["van Dijk","Verhoeven","Bakker","de Groot","Hendriks","van Leeuwen","Kuipers","Molenaar"]},{code:"GEO",name:"Georgia",weight:2,regions:["Tbilisi","Kutaisi","Batumi","Gori"],disciplineBias:["judo","sambo","greco_roman"],maleFirst:["Giorgi","Levan","Irakli","Zurab","Nika","Beka","Vakhtang"],femaleFirst:["Nino","Ana","Mariam","Tamar"],last:["Kvaratskhelia","Beridze","Chkheidze","Gogoladze","Tsiklauri","Mikaberidze","Janashvili"]},{code:"KAZ",name:"Kazakhstan",weight:2,regions:["Almaty","Astana","Shymkent","Karaganda"],disciplineBias:["boxing","freestyle_wrestling","sambo"],maleFirst:["Yerlan","Nurlan","Daniyar","Almas","Bekzat","Aidos","Sanzhar"],femaleFirst:["Aigerim","Dana","Zhanel","Madina"],last:["Zhaksylykov","Serikbayev","Tulegenov","Abenov","Kaliyev","Nurpeisov","Omarov"]},{code:"AUS",name:"Australia",weight:3,regions:["Sydney","Melbourne","Brisbane","Perth","Adelaide"],disciplineBias:["boxing","bjj","muay_thai"],maleFirst:["Jayden","Kai","Lachlan","Beau","Riley","Hamish","Tyson"],femaleFirst:["Tayla","Indi","Bridie","Charlee","Meg"],last:["Callaghan","Whittaker","Doust","Hardacre","Prentice","Bannister","Tuiala"]},{code:"CAN",name:"Canada",weight:3,regions:["Montréal","Toronto","Vancouver","Calgary","Halifax"],disciplineBias:["freestyle_wrestling","bjj","boxing"],maleFirst:["Étienne","Nolan","Gabriel","Owen","Léo","Braden","Mathis"],femaleFirst:["Élodie","Hailey","Maude","Payton","Sadie"],last:["Tremblay","Boucher","Lapointe","Ferland","Harrow","Beauchamp","Cardinal"]}],i0=["The Anvil","Bad Intentions","Cold Steel","The Surgeon","Nightfall","The Riddle","Little Bear","The Blueprint","Hurricane","The Watchmaker","Pitbull","Silent Storm","The Professor","Iron Lung","The Butcher","Sandman","The Machine","Wildfire","Steel City","The Python","Blackout","Kingfisher","The Mongoose","Thunderclap","Ghost","The Hammer","Quicksand","Rolling Thunder","The Alchemist","Bonecrusher","The Lion","Red Mist","Stonewall","The Barber","Highlander","The Spider","Frostbite","The Cobra","Slow Burn","The Marshal","Gravedigger","Firecracker","The Technician","Deadbolt"],Eh=["Iron","Black","Apex","Titan","Vanguard","Granite","Storm","Crown","Sable","Forge","Summit","Ronin","Anvil","Wolf","Northgate","Redline","Ironwood","Cobalt","Hollow","Praetorian","Kestrel","Meridian","Basalt","Sundown","Ember","Bastion","Harbor","Lodestone","Vertex","Quarry"],s0=["Temple","Mountain","House","Works","Yard","Ridge","Lab","Athletic","Combat","Fight","Union","Academy","Institute","Foundry","Compound","Circle","Row","Guard","Camp"],lo=["MMA","Combat Academy","Fight Club","Martial Arts","Athletics","Fight Team","Training Center","Combat Sports","MMA Academy","Performance","Gym"];new Map(Vs.map(n=>[n.code,n]));function r0(n){const e=n.next();return e<.02?n.clampedNormal(190,6,176,200):e<.1?n.clampedNormal(174,7,158,192):e<.32?n.clampedNormal(154,9,132,176):e<.66?n.clampedNormal(130,10,108,155):n.clampedNormal(104,13,60,132)}const $i=[[18,.32],[21,.5],[24,.68],[27,.83],[30,.92],[33,.93],[36,.86],[39,.77],[43,.64]];function a0(n){const e=$i[0],t=$i[$i.length-1];if(n<=e[0])return e[1];if(n>=t[0])return t[1];for(let i=1;i<$i.length;i++){const[s,r]=$i[i-1],[a,o]=$i[i];if(n<=a)return Qa(r,o,(n-s)/(a-s))}return t[1]}function o0(n,e){const t=(n.workEthic*.4+n.discipline*.35+n.coachability*.25)/100;return $(.78+t*.3+e.normal(0,.05),.6,1.08)}function ho(n,e){let t=0;for(const[i,s]of Object.entries(n.offsets))s<=0||(t+=s*_h(e,i));return t}function c0(n,e){const t=ro.map(i=>{let s=0;for(const r of e.disciplineBias)s=Math.max(s,ho(i,r));return[i,1+s*.22]});return n.pickWeighted(t)}function l0(n,e,t){const i={};for(const s of wi){const r=e.offsets[s]??0;i[s]=r+n.normal(0,8.5)}for(const s of t.disciplineBias)for(const r of wi){const a=_h(s,r);a>0&&(i[r]=(i[r]??0)+a*n.float(1.5,6))}return i}function h0(n){const e=n.clampedNormal(52,17,5,95),t=(i,s,r)=>Math.round($(Qa(n.clampedNormal(i,r,1,100),e,s),1,100));return Op(i=>{switch(i){case"workEthic":return t(55,.6,18);case"discipline":return t(54,.55,18);case"coachability":return t(55,.4,19);case"ambition":return t(58,.25,19);case"loyalty":return t(55,.15,21);case"composure":return t(53,.2,18);case"adaptability":return t(52,.25,18);case"confidence":return t(58,.1,18);case"ego":return Math.round($(n.clampedNormal(52,19,1,100)-(e-52)*.25,1,100));case"aggression":return Math.round(n.clampedNormal(55,19,1,100));case"riskTolerance":return Math.round(n.clampedNormal(53,19,1,100));default:return Math.round(n.clampedNormal(52,18,1,100))}})}function u0(n,e,t,i){const s={wins:0,losses:0,draws:0,noContests:0,koWins:0,submissionWins:0,decisionWins:0,koLosses:0,submissionLosses:0,decisionLosses:0,winStreak:0,lossStreak:0},r=$(.34+.52*((e-60)/140)**1.1,.25,.88),a=$(r+n.normal(0,.05),.2,.92),o=$(.2+i.tendencies.strikeVolume*.3+(i.offsets.strikingPower??0)/90,.08,.62),c=$(.06+i.tendencies.submissionSeeking*.45,.04,.5),l=[];for(let h=0;h<t;h++){const p=n.next();if(p<.018)s.draws++,l.push("draw");else if(p<.028)s.noContests++,l.push("nc");else if(n.bool(a)){s.wins++,l.push("win");const g=n.next();g<o?s.koWins++:g<o+c?s.submissionWins++:s.decisionWins++}else{s.losses++,l.push("loss");const g=n.next(),v=$(.32-(i.offsets.strikingDefense??0)/120+(i.offsets.aggression??0)/140,.08,.6),d=$(.14-(i.offsets.submissionDefense??0)/110+(i.offsets.guardGame??0)/-260,.03,.35);g<v?s.koLosses++:g<v+d?s.submissionLosses++:s.decisionLosses++}}for(let h=l.length-1;h>=0&&l[h]==="win";h--)s.winStreak++;for(let h=l.length-1;h>=0&&l[h]==="loss";h--)s.lossStreak++;const u=l.slice(-5),f=$(u.reduce((h,p)=>h+(p==="win"?22:p==="loss"?-24:-2),0),-100,100);return{record:s,proFights:t,momentum:f}}function d0(n){return n.pickWeighted([["orthodox",.77],["southpaw",.19],["switch",.04]])}function f0(n,e){const[t,i]=e.heightRangeIn,s=He(n.clampedNormal((t+i)/2,(i-t)/4.2,t-1,i+1),1),r=He(s+e.reachBiasIn+n.normal(0,1.9),1);return{heightIn:s,reachIn:r}}function p0(n,e){const t=Ci.map(i=>[i.key,ho(n,i.key)]).sort((i,s)=>s[1]-i[1]).slice(0,5).map(([i])=>i);if(e.bool(.25)){const i=Ci.map(s=>[s.key,ho(n,s.key)]).sort((s,r)=>s[1]-r[1])[0]?.[0];if(i)return[t[0],i].filter(Boolean)}return t.slice(0,2)}function uo(n,e){const t=n.derive(e.id),i=Fp(e.divisionKey),s=t.pickWeighted(Vs.map(re=>[re,re.weight])),r=i.sex,a=r==="male"?s.maleFirst:s.femaleFirst,[o,c]=e.ageRange??[19,40],l=Math.round($(t.clampedNormal(28.5,4.6,o,c),o,c)),u=zs(e.date,-Math.round(l*365.2425+t.int(0,364))),f=h0(t);let h=r0(t);e.talentFloor!==void 0&&(h=Math.max(h,e.talentFloor)),e.talentCeiling!==void 0&&(h=Math.min(h,e.talentCeiling)),h=He($(h,40,200),1);const p=$(Math.max(a0(l)*o0(f,t),e.realisationFloor??0),.22,.99),g=$(h*p,25,h),v=c0(t,s),d=l0(t,v,s),{attributes:m}=n0(g,d),y=Er(m),b=t.int(19,$(l-1,19,24)),S=Math.max(0,l-b),A=$(t.float(1.5,2.7)-(y-110)/260,.9,2.8),E=Math.max(0,Math.round(S*A)),{record:C,momentum:_}=u0(t,y,E,v),{heightIn:T,reachIn:N}=f0(t,i),I=t.clampedNormal(0,14,-30,45),F=He($((y-60)*.4+C.winStreak*2.4+C.wins*.35+I,1,100),1),J=He($((y-55)*.52+C.wins*.45+t.normal(0,6),1,100),1),q=E===0?void 0:t.int(20,430),H=q??999;let Z=t.pick(a),K=t.pick(s.last);if(e.takenNames)for(let re=0;re<50&&e.takenNames.has(`${Z} ${K}`);re++)Z=t.pick(a),K=t.pick(s.last);return{id:e.id,firstName:Z,lastName:K,nickname:t.bool(.42)?t.pick(i0):void 0,sex:r,birthDate:u,nationality:s.code,homeRegion:t.pick(s.regions),heightIn:T,reachIn:N,stance:d0(t),divisionKey:e.divisionKey,campId:e.campId,promotionId:e.promotionId,attributes:m,personality:f,potentialAbility:h,seedArchetype:v.key,record:C,career:{debutDate:zs(u,Math.round(b*365.2425)),amateurFights:t.int(0,14),careerEarnings:Math.round(C.wins*t.float(14e3,46e3)+E*t.float(8e3,26e3)),popularity:F,reputation:J,momentum:Math.round(_),lastFightDate:q===void 0?void 0:zs(e.date,-q),titleReigns:0,titleDefenses:0},condition:{fatigue:He(t.float(4,34),1),sharpness:He($(92-H/9+t.normal(0,6),20,100),1),weightManagement:He(t.clampedNormal(64,16,15,98),1),wearAndTear:He($(E*t.float(.5,1.6)+Math.max(0,l-30)*t.float(.6,1.9),0,100),1),injuries:[]},training:{intensity:t.pickWeighted([["recovery",.05],["light",.12],["moderate",.42],["hard",.33],["extreme",.08]]),focus:p0(v,t)},memories:[],status:"active"}}function m0(n){const e=n.toLowerCase().split(" ").map(t=>t.slice(0,5));return new Set(e).size!==e.length}function g0(n,e){for(let t=0;t<60;t++){const i=n.pick(Eh),s=n.bool(.55)?`${i} ${n.pick(s0)} ${n.pick(lo)}`:`${i} ${n.pick(lo)}`;if(!e.has(s)&&!m0(s))return s}return`${n.pick(Eh)} ${n.pick(lo)} ${n.int(2,9)}`}function v0(n,e){const t=n.pickWeighted(Ci.map(o=>[o,o.prevalence])),i=[],s=dt(e,20,95,.035,.12)+n.float(-.012,.012);i.push({disciplineKey:t.key,tier:1,multiplier:He(1+$(s,.02,.14),3)});const r=o=>o.key===t.key?0:o.prevalence*(o.family===t.family?3:o.family==="physical"||o.family==="mental"?2:1),a=n.pickWeighted(Ci.map(o=>[o,r(o)]));if(i.push({disciplineKey:a.key,tier:2,multiplier:He(1+$(s*n.float(.4,.65),.01,.08),3)}),e>62&&n.bool(.45)){const o=n.pickWeighted(Ci.filter(c=>!i.some(l=>l.disciplineKey===c.key)).map(c=>[c,r(c)]));i.push({disciplineKey:o.key,tier:3,multiplier:He(1+$(s*n.float(.2,.4),.01,.05),3)})}return i}const Ah={striking:["boxing","muay_thai","kickboxing","dutch_kickboxing","karate","taekwondo","sanda"],wrestling:["freestyle_wrestling","folkstyle_wrestling","greco_roman","cage_wrestling","takedown_defense"],grappling:["bjj","submission_grappling","judo","sambo","ground_and_pound","positional_escapes"],strength:["strength_conditioning","conditioning","speed_agility"],sports_science:["sports_science","conditioning"],medical:["sports_science"]};function Th(n,e){const t=n.pickWeighted(Vs.map(s=>[s,s.weight])),i=He($(n.clampedNormal(e.quality,9,20,99),20,99),1);return{id:e.id,firstName:n.pick(t.maleFirst.concat(t.femaleFirst)),lastName:n.pick(t.last),campId:e.campId,role:e.role,disciplineKey:e.disciplineKey,ability:i,manManagement:He($(n.clampedNormal(i*.55+24,15,15,99),15,99),1),reputation:He($(i*.7+n.normal(10,12),5,99),1),birthYear:to(e.date)-n.int(31,64),loyalty:Math.round(n.clampedNormal(58,20,5,98)),joinedDate:e.date}}function x0(n,e){const t=n.derive(e.id),i=t.pickWeighted(Vs.map(v=>[v,v.weight])),s=He($(e.reputation,5,99),1),r=v0(t,s),a=zp(r[0].disciplineKey),o=dt(s,5,99,22,92),c={training:He($(t.clampedNormal(o,9,10,99),10,99),1),medical:He($(t.clampedNormal(o-6,12,5,99),5,99),1),sportsScience:He($(t.clampedNormal(o-10,14,5,99),5,99),1),recovery:He($(t.clampedNormal(o-8,12,5,99),5,99),1)},l={discipline:He($(t.clampedNormal(o*.5+30,14,10,99),10,99),1),intensity:He(t.clampedNormal(58,17,12,99),1),cohesion:He(t.clampedNormal(60,16,10,99),1)},u=[],f=Th(t,{id:e.coachIdFactory(),campId:e.id,role:"head",disciplineKey:a.key,quality:dt(s,5,99,38,92),date:e.date});u.push(f);const h=Math.round($(dt(s,10,99,1,6)+t.float(-.6,.9),1,7)),p=["striking","wrestling","grappling","strength","sports_science","medical"];for(let v=0;v<h;v++){const d=p[v%p.length],m=r.find(b=>Ah[d].includes(b.disciplineKey)),y=m?.disciplineKey??t.pick(Ah[d]);u.push(Th(t,{id:e.coachIdFactory(),campId:e.id,role:d,disciplineKey:y,quality:dt(s,5,99,30,84)+(m?8:0),date:e.date}))}return{camp:{id:e.id,name:g0(t,e.takenNames??new Set),city:t.pick(i.regions),country:i.code,region:t.pick(i.regions),foundedYear:to(e.date)-t.int(2,34),reputation:s,peakReputation:s,capacity:Math.round($(dt(s,10,99,8,24)+t.float(-2,4),5,30)),facilities:c,culture:l,specialisations:r,headCoachId:f.id,coachIds:u.map(v=>v.id),history:{titlesWon:0,rankedFighterPeak:0,fightersDeveloped:0},status:"active"},coaches:u}}const wh=["Grand","Union","Harbour","Central","Crown","Liberty","Summit","Pinnacle","Meridian","Coliseum","Vanguard","Northgate","Bayview","Kingsway","Silverdome","Sunset"],Rh=["Arena","Centre","Coliseum","Forum","Pavilion","Dome","Hall","Garden"];function _0(n,e,t){const i=[],s=new Set;for(let r=0;r<e;r++){const a=n.derive("venue",r),o=a.pickWeighted(Vs.map(h=>[h,h.weight])),c=a.pick(o.regions);let l="";for(let h=0;h<40;h++){const p=`${a.pick(wh)} ${a.pick(Rh)}`;if(!s.has(p)){l=p;break}}l||(l=`${a.pick(wh)} ${a.pick(Rh)} ${r}`),s.add(l);const u=r/Math.max(1,e-1),f=Math.round($(21e3*(1-u)**1.5+a.float(2400,5500),2e3,22e3));i.push({id:t(),name:l,city:c,country:o.code,capacity:f,prestige:He($(f/22e3*88+a.normal(0,7),8,99),1)})}return i}function S0(n,e){return{promotionId:n,divisionKey:e,defences:0,lineage:[]}}function M0(n,e,t){return n.find(i=>i.promotionId===e&&i.divisionKey===t)}function y0(n,e,t){const i=n.lineage[n.lineage.length-1];i&&!i.to&&(i.to=t,i.defences=n.defences),n.championId=e,n.since=t,n.defences=0,n.interimChampionId=void 0,n.lineage.push({fighterId:e,from:t,defences:0})}function b0(n){if(n)return n.championId??n.interimChampionId}class E0{constructor(e){Je(this,"fighterIndex",new Map);Je(this,"campIndex",new Map);Je(this,"coachIndex",new Map);Je(this,"promotionIndex",new Map);Je(this,"campRoster",new Map);this.state=e,this.reindex()}reindex(){this.fighterIndex=new Map(this.state.fighters.map(e=>[e.id,e])),this.campIndex=new Map(this.state.camps.map(e=>[e.id,e])),this.coachIndex=new Map(this.state.coaches.map(e=>[e.id,e])),this.promotionIndex=new Map(this.state.promotions.map(e=>[e.id,e])),this.campRoster=new Map;for(const e of this.state.fighters){if(!e.campId)continue;const t=this.campRoster.get(e.campId);t?t.push(e):this.campRoster.set(e.campId,[e])}}rngFor(e,...t){return Tn.fromSeed(this.state.seed,e,...t)}get date(){return this.state.currentDate}get day(){return eo(this.state.startDate,this.state.currentDate)}get week(){return Pp(this.state.startDate,this.state.currentDate)}fighter(e){return this.fighterIndex.get(e)}requireFighter(e){const t=this.fighterIndex.get(e);if(!t)throw new RangeError(`Unknown fighter: ${e}`);return t}camp(e){return this.campIndex.get(e)}coach(e){return this.coachIndex.get(e)}promotion(e){return this.promotionIndex.get(e)}campFighters(e){return this.campRoster.get(e)??[]}campCoaches(e){const t=this.campIndex.get(e);return t?t.coachIds.map(i=>this.coachIndex.get(i)).filter(i=>i!==void 0):[]}activeFighters(){return this.state.fighters.filter(e=>e.status!=="retired")}fightersInDivision(e,t){return this.state.fighters.filter(i=>i.divisionKey===e&&i.status!=="retired"&&(t===void 0||i.promotionId===t))}rankingsFor(e,t){return this.state.rankings.filter(i=>i.promotionId===e&&i.divisionKey===t).sort((i,s)=>i.rank-s.rank)}contractFor(e){return this.state.contracts.find(t=>t.fighterId===e&&t.status==="active")}title(e,t){return M0(this.state.titles,e,t)}venue(e){return this.state.venues.find(t=>t.id===e)}card(e){return this.state.cards.find(t=>t.id===e)}fight(e){return this.state.fights.find(t=>t.id===e)}upcomingCards(e){return this.state.cards.filter(t=>t.status==="scheduled"&&t.date>=e).sort((t,i)=>t.date.localeCompare(i.date))}fightsOnCard(e){return this.state.fights.filter(t=>t.eventId===e).sort((t,i)=>t.boutOrder-i.boutOrder)}record(e){this.state.events.push(e)}nextId(e){const t=(this.state.idCounters[e]??0)+1;return this.state.idCounters[e]=t,`${e}_${String(t).padStart(5,"0")}`}}function A0(n,e){const t=dn(n),{wins:i,losses:s,winStreak:r,lossStreak:a,koWins:o,submissionWins:c}=n.record,l=n.career.lastFightDate?eo(n.career.lastFightDate,e):720,u=$((l-270)/30,0,22),f=Math.min(o+c,12)*1.1,h=i+s,p=h>=3?(i/h-.5)*70:0;return $(t*1.05+Math.min(i,18)*.75-s*.9+Math.min(r,6)*2.8-a*5.2+f+p+n.career.momentum*.14+n.career.reputation*.16+n.career.popularity*.06+n.career.titleDefenses*6-u,0,400)}function T0(n,e,t,i,s=[],r){const a=new Map(s.map(p=>[p.fighterId,p.rank])),o=t.filter(p=>p.divisionKey===e&&p.promotionId===n.id&&p.status!=="retired").map(p=>({fighter:p,points:A0(p,i)})).sort((p,g)=>g.points-p.points||p.fighter.id.localeCompare(g.fighter.id)),c=r?o.find(p=>p.fighter.id===r):void 0,l=c?[c,...o.filter(p=>p.fighter.id!==r)]:o,u=c?0:1,f=Math.min(l.length,n.ranksPerDivision+1),h=[];for(let p=0;p<f;p++){const{fighter:g,points:v}=l[p];h.push({promotionId:n.id,divisionKey:e,fighterId:g.id,rank:u+p,points:Math.round(v*10)/10,previousRank:a.get(g.id),updatedDate:i})}return h}function fo(n,e,t,i=[],s){const r=[];for(const a of n)if(!(a.ranksPerDivision<=0))for(const o of a.divisionKeys){const c=i.filter(f=>f.promotionId===a.id&&f.divisionKey===o),l=s?s(a.id,o):c.find(f=>f.rank===0)?.fighterId,u=e.some(f=>f.id===l&&f.status!=="retired"&&f.divisionKey===o);r.push(...T0(a,o,e,t,c,u?l:void 0))}return r}function w0(n){const{wins:e,losses:t,winStreak:i}=n.record;return e<3?!1:e>=t?!0:i>=3&&e+2>=t}const po={startDate:"2026-01-05",fighterCount:560,campCount:54},R0=[{name:"Apex Fighting Championship",shortName:"AFC",tier:"global",country:"USA",prestige:96,rosterShare:.4,ranksPerDivision:15},{name:"Continental Fight League",shortName:"CFL",tier:"regional",country:"NLD",prestige:68,rosterShare:.18,ranksPerDivision:10},{name:"Pacific Combat Alliance",shortName:"PCA",tier:"regional",country:"JPN",prestige:64,rosterShare:.16,ranksPerDivision:10},{name:"Frontier Cage Series",shortName:"FCS",tier:"developmental",country:"BRA",prestige:42,rosterShare:.1,ranksPerDivision:5},{name:"Northern Lights FC",shortName:"NLF",tier:"developmental",country:"CAN",prestige:38,rosterShare:.09,ranksPerDivision:5},{name:"Sunbelt Fight Nights",shortName:"SFN",tier:"developmental",country:"MEX",prestige:34,rosterShare:.07,ranksPerDivision:5}];function C0(n){const e=Ri.reduce((a,o)=>a+o.populationWeight,0),t=new Map;let i=0;for(const a of Ri){const o=Math.floor(a.populationWeight/e*n);t.set(a.key,o),i+=o}const s=[...Ri].sort((a,o)=>o.populationWeight-a.populationWeight);let r=0;for(;i<n;){const a=s[r%s.length];t.set(a.key,(t.get(a.key)??0)+1),i++,r++}return t}function L0(n,e,t){const s=20+75*(1-e/Math.max(1,t-1))**1.8;return He($(s+n.normal(0,5),8,97),1)}function P0(n){return 20+148*$((n-3)/94,0,1)**1.9}function D0(n,e,t){const i=new Map(t.map(a=>[a.id,a.capacity])),s=[...e].sort((a,o)=>dn(o)-dn(a)),r=[...t].sort((a,o)=>a.reputation-o.reputation);for(const a of s){const o=dn(a),c=n.derive("camp-assignment",a.id),l=t.filter(h=>o>=P0(h.reputation)),u=l.filter(h=>(i.get(h.id)??0)>0),f=u.length>0?c.pickWeighted(u.map(h=>{const p=(h.reputation/100)**1.6,g=h.country===a.nationality?2.2:1,v=(i.get(h.id)??0)/Math.max(1,h.capacity);return[h,Math.max(.02,p)*g*(.4+v)]})):[...l].sort((h,p)=>(h.capacity-(i.get(h.id)??0))/h.capacity-(p.capacity-(i.get(p.id)??0))/p.capacity||h.reputation-p.reputation)[0]??r[0];f&&(a.campId=f.id,i.set(f.id,(i.get(f.id)??1)-1))}}function I0(n,e,t,i,s){const r=[],a=[...t].sort((l,u)=>u.prestige-l.prestige),o=[...e].map(l=>({fighter:l,score:dn(l)+n.derive("scouting",l.id).normal(0,16)+l.career.popularity*.25})).sort((l,u)=>u.score-l.score),c=new Map;for(const l of o){const u=c.get(l.fighter.divisionKey);u?u.push(l):c.set(l.fighter.divisionKey,[l])}for(const[l,u]of c){let f=0;for(const h of a){if(!h.divisionKeys.includes(l))continue;const p=Math.round(u.length*h.rosterShare);for(let g=0;g<p&&f<u.length;g++,f++){const{fighter:v}=u[f];v.promotionId=h.id;const d=n.derive("contract",v.id),m=Math.round(dt(h.prestige,30,96,4e3,42e3)*(1+v.career.popularity/120)*d.float(.85,1.25));r.push({id:s(),fighterId:v.id,promotionId:h.id,signedDate:zs(i,-d.int(30,900)),fightsTotal:d.pickWeighted([[3,.2],[4,.45],[6,.25],[8,.1]]),fightsRemaining:0,expiresDate:zs(i,d.int(180,1100)),baseShow:m,winBonus:m,ppvPoints:h.tier==="global"&&v.career.popularity>78?d.float(.2,1.2):0,status:"active"});const y=r[r.length-1];y.fightsRemaining=d.int(1,y.fightsTotal)}}}return r}function N0(n){const e=n.startDate??po.startDate,t=n.fighterCount??po.fighterCount,i=n.campCount??po.campCount,s={seed:n.seed,startDate:e,currentDate:e,promotions:[],camps:[],coaches:[],fighters:[],contracts:[],rankings:[],titles:[],venues:[],cards:[],fights:[],news:[],storylines:[],events:[],targetPopulation:t,idCounters:{}},r=new E0(s),a=r.rngFor("genesis","promotions");for(const d of R0){const y={id:r.nextId("promotion"),name:d.name,shortName:d.shortName,tier:d.tier,country:d.country,foundedYear:to(e)-a.int(4,32),prestige:d.prestige,divisionKeys:Ri.filter(b=>d.tier==="global"||b.populationWeight>=(d.tier==="regional"?.3:.4)).map(b=>b.key),ranksPerDivision:d.ranksPerDivision,rosterShare:d.rosterShare};s.promotions.push(y)}const o=r.rngFor("genesis","camps"),c=new Set;for(let d=0;d<i;d++){const m=r.nextId("camp"),{camp:y,coaches:b}=x0(o,{id:m,date:e,reputation:L0(o.derive("reputation",d),d,i),coachIdFactory:()=>r.nextId("coach"),takenNames:c});c.add(y.name),s.camps.push(y),s.coaches.push(...b)}const l=r.rngFor("genesis","fighters"),u=new Set,f=d=>{u.add(`${d.firstName} ${d.lastName}`),s.fighters.push(d)},h=C0(t);for(const[d,m]of h)for(let y=0;y<m;y++){const b=r.nextId("fighter");f(uo(l,{id:b,date:e,divisionKey:d,takenNames:u}))}const p=r.rngFor("genesis","elite");for(const d of Ri){const m=d.populationWeight>=1?3:d.populationWeight>=.5?2:1;for(let y=0;y<m;y++){const b=r.nextId("fighter");f(uo(p,{id:b,date:e,divisionKey:d.key,talentFloor:184,ageRange:[26,34],realisationFloor:.9,takenNames:u}))}for(let y=0;y<2;y++){const b=r.nextId("fighter");f(uo(p,{id:b,date:e,divisionKey:d.key,talentFloor:172,ageRange:[19,23],realisationFloor:.45,takenNames:u}))}}r.reindex(),D0(r.rngFor("genesis","camp-assignment"),s.fighters,s.camps),s.contracts=I0(r.rngFor("genesis","promotion-assignment"),s.fighters,s.promotions,e,()=>r.nextId("contract")),s.venues=_0(r.rngFor("genesis","venues"),26,()=>r.nextId("venue"));for(const d of s.promotions)for(const m of d.divisionKeys)s.titles.push(S0(d.id,m));const g=fo(s.promotions,s.fighters,e),v=r.rngFor("genesis","champions");for(const d of s.promotions)if(!(d.ranksPerDivision<=0))for(const m of d.divisionKeys){const y=g.filter(A=>A.promotionId===d.id&&A.divisionKey===m).sort((A,E)=>A.rank-E.rank)[0];if(!y)continue;const b=r.fighter(y.fighterId),S=r.title(d.id,m);!b||!S||w0(b)&&(b.career.titleReigns=1,b.career.titleDefenses=v.derive(b.id).pickWeighted([[0,.34],[1,.3],[2,.2],[3,.11],[4,.05]]),y0(S,b.id,e),S.defences=b.career.titleDefenses)}return s.rankings=fo(s.promotions,s.fighters,e,g,(d,m)=>b0(r.title(d,m))),s.targetPopulation=s.fighters.length,r.reindex(),r.record({type:"UNIVERSE_CREATED",date:e,summary:`Universe seeded with ${s.fighters.length} fighters across ${s.camps.length} camps and ${s.promotions.length} promotions.`,payload:{seed:n.seed,fighters:s.fighters.length,camps:s.camps.length}}),r}const k0=1,O0=["STANDING","CLINCH","CAGE_CLINCH","TAKEDOWN_ATTEMPT","GROUND_TOP","GROUND_BOTTOM","GUARD","HALF_GUARD","SIDE_CONTROL","MOUNT","BACK_CONTROL","SCRAMBLE","SUBMISSION_ATTEMPT","STUNNED","RECOVERY"],U0=["FIGHT_START","ROUND_START","ROUND_END","STRIKE","SIGNIFICANT_STRIKE","TAKEDOWN_ATTEMPT","TAKEDOWN","SPRAWL","CLINCH_ENGAGE","CLINCH_BREAK","POSITION_CHANGE","SCRAMBLE","SUBMISSION_ATTEMPT","SUBMISSION_ESCAPE","KNOCKDOWN","STUN","CUT","DAMAGE_UPDATE","STAMINA_UPDATE","CORNER_INSTRUCTION","REFEREE_ACTION","DOCTOR_CHECK","POINT_DEDUCTION","FIGHT_END","DECISION"],F0=["HEAD","BODY","LEG","ARM"],B0=["LANDED","BLOCKED","PARTIAL","MISSED","SLIPPED","DEFENDED","COMPLETED","REVERSED"],G0=["KO","TKO","SUBMISSION","UNANIMOUS_DECISION","SPLIT_DECISION","MAJORITY_DECISION","DRAW","MAJORITY_DRAW","TECHNICAL_DECISION","TECHNICAL_DRAW","DOCTOR_STOPPAGE","INJURY","DISQUALIFICATION","NO_CONTEST","RETIREMENT"];function mo(n){const e=Math.max(0,Math.floor(n)),t=Math.floor(e/60),i=e%60;return`${String(t).padStart(2,"0")}:${String(i).padStart(2,"0")}`}function Ch(n){return n.eventType==="STRIKE"||n.eventType==="SIGNIFICANT_STRIKE"}new Set(U0),new Set(O0),new Set(B0),new Set(F0),new Set(G0);function Lh(n){return{...n,targetHead:.68,targetBody:.2,targetLegs:.12,acceptBottom:.4,urgency:.55,notes:[]}}function Ar(n){const e=n.targetHead+n.targetBody+n.targetLegs;if(e<=0){n.targetHead=1,n.targetBody=0,n.targetLegs=0;return}n.targetHead/=e,n.targetBody/=e,n.targetLegs/=e}const Tr=[{key:"JAB",label:"jab",target:"HEAD",ranges:["long","mid"],power:2.2,accuracy:1.34,cost:.42,concussive:.16,skills:["boxing","strikingAccuracy"],cutChance:.008,significant:!1,frequency:.3,time:.25,recovery:.12},{key:"CROSS",label:"straight right",target:"HEAD",ranges:["mid","long"],power:6,accuracy:1.02,cost:.9,concussive:1,skills:["boxing","strikingPower"],cutChance:.012,significant:!0,frequency:.2,time:.35,recovery:.22},{key:"LEFT_HOOK",label:"left hook",target:"HEAD",ranges:["close","mid"],power:6.8,accuracy:.9,cost:1,concussive:1.25,skills:["boxing","strikingPower"],cutChance:.015,significant:!0,frequency:.055,time:.4,recovery:.3},{key:"RIGHT_HOOK",label:"right hook",target:"HEAD",ranges:["close","mid"],power:6.6,accuracy:.88,cost:1,concussive:1.2,skills:["boxing","strikingPower"],cutChance:.015,significant:!0,frequency:.065,time:.4,recovery:.3},{key:"UPPERCUT",label:"uppercut",target:"HEAD",ranges:["close"],power:7,accuracy:.84,cost:1.05,concussive:1.35,skills:["boxing","strikingPower"],cutChance:.012,significant:!0,frequency:.07,time:.4,recovery:.32},{key:"OVERHAND",label:"overhand right",target:"HEAD",ranges:["mid"],power:7.8,accuracy:.7,cost:1.25,concussive:1.5,skills:["boxing","strikingPower"],cutChance:.018,significant:!0,frequency:.062,time:.45,recovery:.42},{key:"LOW_KICK",label:"low kick to the lead leg",target:"LEG",ranges:["long","mid"],power:5.2,accuracy:1.62,cost:.8,concussive:0,skills:["muayThai","kickboxing"],cutChance:0,significant:!0,frequency:.12,time:.6,recovery:.34},{key:"BODY_KICK",label:"kick to the body",target:"BODY",ranges:["long","mid"],power:6.4,accuracy:1.32,cost:1.15,concussive:.2,skills:["muayThai","kickboxing"],cutChance:0,significant:!0,frequency:.065,time:.62,recovery:.44},{key:"HEAD_KICK",label:"head kick",target:"HEAD",ranges:["long","mid"],power:9.2,accuracy:.5,cost:1.6,concussive:2.1,skills:["kickboxing","taekwondo","karate"],cutChance:.02,significant:!0,frequency:.02,time:.68,recovery:.62},{key:"FRONT_KICK",label:"front kick to the body",target:"BODY",ranges:["long"],power:4.6,accuracy:1.45,cost:.75,concussive:.15,skills:["karate","taekwondo"],cutChance:0,significant:!0,frequency:.018,time:.55,recovery:.3},{key:"SIDE_KICK",label:"side kick to the knee",target:"LEG",ranges:["long"],power:4.4,accuracy:1.38,cost:.75,concussive:0,skills:["karate","taekwondo"],cutChance:0,significant:!0,frequency:.012,time:.58,recovery:.32},{key:"ELBOW",label:"elbow",target:"HEAD",ranges:["close"],power:6.2,accuracy:.95,cost:.85,concussive:.9,skills:["muayThai"],cutChance:.045,significant:!0,frequency:.02,time:.32,recovery:.2,gate:{clinchOnly:!0}},{key:"KNEE",label:"knee to the body",target:"BODY",ranges:["close"],power:6.5,accuracy:1.2,cost:1.1,concussive:.5,skills:["muayThai","clinchWrestling"],cutChance:.012,significant:!0,frequency:.02,time:.45,recovery:.28,gate:{clinchOnly:!0}},{key:"SPINNING_BACK_KICK",label:"spinning back kick to the body",target:"BODY",ranges:["long","mid"],power:8.6,accuracy:.55,cost:1.8,concussive:1.1,skills:["taekwondo","sanda"],cutChance:.02,significant:!0,frequency:.016,time:.8,recovery:.75,gate:{flash:.62,neverLeads:!0,opponentRetreating:!0,minStamina:.62}},{key:"WHEEL_KICK",label:"spinning wheel kick",target:"HEAD",ranges:["long","mid"],power:10,accuracy:.32,cost:2.1,concussive:2.4,skills:["taekwondo","karate"],cutChance:.012,significant:!0,frequency:.009,time:.85,recovery:.9,gate:{flash:.72,neverLeads:!0,opponentRetreating:!0,minStamina:.68}},{key:"BACKFIST",label:"spinning backfist",target:"HEAD",ranges:["mid"],power:7.6,accuracy:.46,cost:1.4,concussive:1.5,skills:["sanda","karate"],cutChance:.02,significant:!0,frequency:.011,time:.55,recovery:.55,gate:{flash:.6,neverLeads:!0,opponentRetreating:!0,minStamina:.6}},{key:"SUPERMAN_PUNCH",label:"superman punch",target:"HEAD",ranges:["mid"],power:7.4,accuracy:.6,cost:1.5,concussive:1.4,skills:["karate","explosiveness"],cutChance:.018,significant:!0,frequency:.006,time:.5,recovery:.55,gate:{flash:.66,neverLeads:!0,opponentRetreating:!0,minStamina:.66}},{key:"FLYING_KNEE",label:"flying knee",target:"HEAD",ranges:["mid"],power:9.5,accuracy:.36,cost:2,concussive:2.2,skills:["muayThai","explosiveness"],cutChance:.015,significant:!0,frequency:.004,time:.7,recovery:.8,gate:{flash:.7,neverLeads:!0,opponentHurt:!0,minStamina:.66}},{key:"GROUND_PUNCH",label:"punches from the top",target:"HEAD",ranges:["close"],power:4.4,accuracy:1.25,cost:.62,concussive:.7,skills:["groundStriking"],cutChance:.018,significant:!0,frequency:.55,time:.35,recovery:.15},{key:"GROUND_ELBOW",label:"elbows on the ground",target:"HEAD",ranges:["close"],power:6,accuracy:1.05,cost:.8,concussive:.9,skills:["groundStriking"],cutChance:.05,significant:!0,frequency:.2,time:.4,recovery:.2},{key:"HAMMERFIST",label:"hammerfists",target:"HEAD",ranges:["close"],power:3.4,accuracy:1.4,cost:.5,concussive:.5,skills:["groundStriking"],cutChance:.02,significant:!1,frequency:.25,time:.3,recovery:.12}];new Map(Tr.map(n=>[n.key,n]));function H0(n){return Tr.filter(e=>e.ranges.includes(n)&&!Ph(e.key))}function Ph(n){return n==="GROUND_PUNCH"||n==="GROUND_ELBOW"||n==="HAMMERFIST"}const z0=Tr.filter(n=>Ph(n.key)),Dh=Tr.filter(n=>n.key==="KNEE"||n.key==="ELBOW"||n.key==="UPPERCUT"||n.key==="LEFT_HOOK");function V0(n){return H0(n).filter(e=>!e.gate?.clinchOnly)}const W0=[{key:"DOUBLE_LEG",label:"double-leg",ease:1,cost:2.1,from:["STANDING"],skills:["freestyleWrestling","takedownAbility"],lands:"GUARD"},{key:"SINGLE_LEG",label:"single-leg",ease:.95,cost:1.9,from:["STANDING","CLINCH"],skills:["freestyleWrestling","chainWrestling"],lands:"GUARD"},{key:"BODY_LOCK",label:"body-lock takedown",ease:.85,cost:1.7,from:["CLINCH","CAGE_CLINCH"],skills:["grecoRomanWrestling","clinchWrestling"],lands:"HALF_GUARD"},{key:"TRIP",label:"trip",ease:.9,cost:1.3,from:["CLINCH","CAGE_CLINCH"],skills:["judo","clinchWrestling"],lands:"HALF_GUARD"},{key:"THROW",label:"throw",ease:.62,cost:2.2,from:["CLINCH"],skills:["judo","sambo"],lands:"SIDE_CONTROL"},{key:"SUPLEX",label:"suplex",ease:.45,cost:2.6,from:["CLINCH","CAGE_CLINCH"],skills:["grecoRomanWrestling","strength"],lands:"SIDE_CONTROL"},{key:"ANKLE_PICK",label:"ankle pick",ease:.72,cost:1.2,from:["STANDING","CLINCH"],skills:["folkstyleWrestling","chainWrestling"],lands:"GUARD"},{key:"CAGE_DRAG",label:"drag along the fence",ease:.88,cost:1.5,from:["CAGE_CLINCH"],skills:["cageWork","clinchWrestling"],lands:"HALF_GUARD"}],X0=[{key:"REAR_NAKED_CHOKE",label:"rear-naked choke",from:{BACK_CONTROL:1},fromBottom:!1,ease:1,cost:1.6,skills:["brazilianJiuJitsu","submissionAbility"]},{key:"ARM_TRIANGLE",label:"arm-triangle",from:{MOUNT:.8,SIDE_CONTROL:.9},fromBottom:!1,ease:.8,cost:1.8,skills:["brazilianJiuJitsu","submissionAbility"]},{key:"ARMBAR",label:"armbar",from:{MOUNT:1,SIDE_CONTROL:.7,GUARD:.85,BACK_CONTROL:.5},fromBottom:!0,ease:.85,cost:1.5,skills:["brazilianJiuJitsu","submissionAbility"]},{key:"TRIANGLE",label:"triangle choke",from:{GUARD:1,MOUNT:.3},fromBottom:!0,ease:.8,cost:1.7,skills:["brazilianJiuJitsu","guardGame"]},{key:"GUILLOTINE",label:"guillotine",from:{GUARD:.9,STANDING:.5,HALF_GUARD:.5,CLINCH:.6},fromBottom:!0,ease:.85,cost:1.4,skills:["submissionGrappling","submissionAbility"]},{key:"KIMURA",label:"kimura",from:{HALF_GUARD:.9,SIDE_CONTROL:.85,GUARD:.7},fromBottom:!0,ease:.75,cost:1.5,skills:["submissionGrappling","judo"]},{key:"AMERICANA",label:"americana",from:{SIDE_CONTROL:.9,MOUNT:.7},fromBottom:!1,ease:.7,cost:1.3,skills:["brazilianJiuJitsu"]},{key:"D_ARCE",label:"d'arce choke",from:{HALF_GUARD:.9,SIDE_CONTROL:.7},fromBottom:!1,ease:.68,cost:1.7,skills:["submissionGrappling"]},{key:"ANACONDA",label:"anaconda choke",from:{HALF_GUARD:.7,SIDE_CONTROL:.7},fromBottom:!1,ease:.62,cost:1.7,skills:["submissionGrappling"]},{key:"HEEL_HOOK",label:"heel hook",from:{GUARD:.8,HALF_GUARD:.6,SCRAMBLE:.5},fromBottom:!0,ease:.6,cost:1.6,skills:["sambo","submissionGrappling"]},{key:"KNEEBAR",label:"kneebar",from:{GUARD:.7,HALF_GUARD:.5},fromBottom:!0,ease:.55,cost:1.5,skills:["sambo","submissionAbility"]},{key:"NECK_CRANK",label:"neck crank",from:{SIDE_CONTROL:.6,BACK_CONTROL:.7},fromBottom:!1,ease:.5,cost:1.5,skills:["submissionGrappling","strength"]}],K0=[{key:"GUARD",label:"in the guard",dominance:.35,strikeAccess:.45,escapeDifficulty:.35,advancesTo:["HALF_GUARD"]},{key:"HALF_GUARD",label:"in half guard",dominance:.55,strikeAccess:.7,escapeDifficulty:.5,advancesTo:["SIDE_CONTROL"]},{key:"SIDE_CONTROL",label:"in side control",dominance:.75,strikeAccess:.85,escapeDifficulty:.68,advancesTo:["MOUNT","BACK_CONTROL"]},{key:"MOUNT",label:"in mount",dominance:.92,strikeAccess:1.15,escapeDifficulty:.82,advancesTo:["BACK_CONTROL"]},{key:"BACK_CONTROL",label:"on the back",dominance:1,strikeAccess:.8,escapeDifficulty:.88,advancesTo:[]}],Ih=new Map(K0.map(n=>[n.key,n]));function Ws(n){return Ih.get(n)}function go(n){return Ih.has(n)}const vo={flyweight:{volume:1.12,tempo:.84,knockdown:.62,finishing:.6,power:.78,chin:1.16,drain:.84,recovery:1.16,takedownRate:3.4,chainWrestling:.72,targets:{thrownPerMin:[10,13.5],landedPerMin:[4,5.5],koRate:[.12,.26]}},bantamweight:{volume:1.2,tempo:.87,knockdown:.92,finishing:.68,power:.84,chin:1.11,drain:.88,recovery:1.12,takedownRate:3.2,chainWrestling:.68,targets:{thrownPerMin:[9.5,13],landedPerMin:[3.9,5.4],koRate:[.16,.31]}},featherweight:{volume:1.08,tempo:.91,knockdown:1.1,finishing:.76,power:.9,chin:1.06,drain:.92,recovery:1.08,takedownRate:3,chainWrestling:.62,targets:{thrownPerMin:[9,12],landedPerMin:[3.7,5.1],koRate:[.2,.36]}},lightweight:{volume:1.14,tempo:.95,knockdown:1,finishing:.85,power:.96,chin:1.02,drain:.96,recovery:1.04,takedownRate:2.9,chainWrestling:.56,targets:{thrownPerMin:[8.2,11.2],landedPerMin:[3.5,4.8],koRate:[.24,.4]}},welterweight:{volume:1.02,tempo:1,knockdown:1.5,finishing:.95,power:1.03,chin:.98,drain:1,recovery:1,takedownRate:2.7,chainWrestling:.5,targets:{thrownPerMin:[7.6,10.4],landedPerMin:[3.3,4.5],koRate:[.28,.45]}},middleweight:{volume:.98,tempo:1.06,knockdown:1.25,finishing:1.02,power:1.12,chin:.93,drain:1.06,recovery:.95,takedownRate:2.5,chainWrestling:.44,targets:{thrownPerMin:[7,9.6],landedPerMin:[3.1,4.2],koRate:[.33,.52]}},light_heavyweight:{volume:.94,tempo:1.13,knockdown:1.3,finishing:1.2,power:1.24,chin:.87,drain:1.14,recovery:.9,takedownRate:2.3,chainWrestling:.38,targets:{thrownPerMin:[6.4,8.8],landedPerMin:[2.9,3.9],koRate:[.4,.6]}},heavyweight:{volume:1,tempo:1.18,knockdown:1.9,finishing:1.2,power:1.42,chin:.79,drain:1.26,recovery:.82,takedownRate:2.1,chainWrestling:.28,targets:{thrownPerMin:[5.6,8],landedPerMin:[2.8,3.6],koRate:[.52,.75]}}},Y0={strawweight:{volume:1.13,tempo:.82,knockdown:1.1,finishing:.52,power:.72,chin:1.2,drain:.82,recovery:1.18,takedownRate:3.5,chainWrestling:.74,targets:{thrownPerMin:[10.5,14],landedPerMin:[4.2,5.7],koRate:[.08,.2]}},flyweight:{volume:1.08,tempo:.85,knockdown:.62,finishing:.56,power:.76,chin:1.17,drain:.85,recovery:1.15,takedownRate:3.4,chainWrestling:.7,targets:{thrownPerMin:[10,13.5],landedPerMin:[4.1,5.6],koRate:[.1,.23]}},bantamweight:{volume:1.03,tempo:.88,knockdown:.85,finishing:.64,power:.82,chin:1.12,drain:.89,recovery:1.1,takedownRate:3.2,chainWrestling:.66,targets:{thrownPerMin:[9.4,12.8],landedPerMin:[3.9,5.3],koRate:[.14,.28]}},featherweight:{volume:1.28,tempo:.92,knockdown:.62,finishing:.72,power:.88,chin:1.08,drain:.93,recovery:1.06,takedownRate:3,chainWrestling:.6,targets:{thrownPerMin:[9,12.2],landedPerMin:[3.7,5.1],koRate:[.18,.33]}}},q0=vo.welterweight;function si(n){const e=n.startsWith("w_"),t=n.replace(/^[mw]_/,"");return(e?Y0:vo)[t]??vo[t]??q0}function J0(n){const{cardio:e,recovery:t}=n.attributes,i=dt(n.condition.weightManagement,1,100,12,0),s=dt(n.condition.fatigue,0,100,0,10);return{burst:$(100-i*.4-s*.3,55,100),cardio:$(100-i-s,45,100),recoveryRate:dt(t,1,100,.55,2.1),enduranceRate:dt(e,1,100,1.7,.5)}}function Wn(n){const e=dt(n.burst,0,100,.62,1),t=dt(n.cardio,0,100,.5,1);return $(e**.45*t**.55,.35,1)}function Jt(n,e){n.burst=$(n.burst-e*1.35,0,100),n.cardio=$(n.cardio-e*.14*n.enduranceRate,0,100)}function xo(n,e,t){const i=n.recoveryRate*(t?2.4:1),s=$(n.cardio+8,0,100);n.burst=$(Math.min(n.burst+i*e,s),0,100),n.cardio=$(n.cardio+(t?.55:.012)*e,0,100)}function Nh(n,e=1){xo(n,60*e,!0)}function Z0(){return{head:0,face:0,body:0,leadLeg:0,rearLeg:0,leadArm:0,rearArm:0,cuts:0,concussive:0}}function Q0(n){const e=Math.max(n.leadLeg,n.rearLeg*.6),t=Math.max(n.leadArm,n.rearArm);return{strikingPower:dt(n.rearArm,0,100,1,.72),armFunction:dt(t,0,100,1,.7),legFunction:dt(e,0,100,1,.6),cardio:dt(n.body,0,100,1,.68),reaction:dt(n.concussive,0,100,1,.6)}}function j0(n,e,t,i){switch(e){case"HEAD":n.head=$(n.head+t,0,100),n.face=$(n.face+t*.8,0,100),n.concussive=$(n.concussive+t*.75,0,100);break;case"BODY":n.body=$(n.body+t,0,100);break;case"LEG":n.leadLeg=$(n.leadLeg+t,0,100);break;case"ARM":n.leadArm=$(n.leadArm+t,0,100);break}}function kh(n){n.head=$(n.head*.9,0,100),n.body=$(n.body*.88,0,100),n.leadLeg=$(n.leadLeg*.96,0,100),n.rearLeg=$(n.rearLeg*.96,0,100),n.leadArm=$(n.leadArm*.93,0,100),n.rearArm=$(n.rearArm*.93,0,100),n.face=$(n.face*1.02,0,100),n.concussive=$(n.concussive*.985,0,100)}function _o(n){return $(n.head*.3+n.body*.2+n.leadLeg*.15+n.rearLeg*.08+n.leadArm*.07+n.rearArm*.07+n.concussive*.13,0,100)}function $0(n){return n.cuts>=3||n.cuts>=1&&n.face>78}function Oh(n){const e=[["badly marked up",n.face],["hurt to the body",n.body],["limping on the lead leg",n.leadLeg]],[t,i]=e.sort((s,r)=>r[1]-s[1])[0];return i>45?t:void 0}function Uh(){return{significantStrikesLanded:0,significantStrikesAttempted:0,totalStrikesLanded:0,totalStrikesAttempted:0,headStrikes:0,bodyStrikes:0,legStrikes:0,takedownsLanded:0,takedownsAttempted:0,submissionAttempts:0,knockdowns:0,controlTime:0,damageDealt:0}}function em(n){return n.lastName}function Fh(n,e){const t=ao(n.attributes);return{id:n.id,name:n.nickname?`${n.firstName} "${n.nickname}" ${n.lastName}`:`${n.firstName} ${n.lastName}`,shortName:em(n),reachIn:n.reachIn,heightIn:n.heightIn,stance:n.stance,attributes:{...n.attributes},baseFacets:so(n.attributes),tendencies:t.tendencies,ability:dn(n),styleLabel:t.primary.label,stamina:J0(n),damage:Z0(),momentum:0,controlTime:0,stats:[Uh()],plan:Lh(t.tendencies),stunnedFor:0,knockdowns:0,finished:!1,divisionKey:n.divisionKey,readyAt:0,vulnerableUntil:0,comboLeft:0,retreatingFor:0,noted:{legs:!1,gassed:!1,body:!1},flash:$(Math.max(n.attributes.taekwondo,n.attributes.karate,n.attributes.sanda)/100*.5+n.personality.riskTolerance/100*.32+n.attributes.explosiveness/100*.18,0,1)}}function Tt(n,e){const t=n.baseFacets[e],i=Wn(n.stamina),s=Q0(n.damage);let r=t*i;switch(e){case"strikingOffense":r*=s.strikingPower*s.armFunction;break;case"strikingDefense":r*=s.reaction*(n.stunnedFor>0?.45:1);break;case"wrestlingOffense":case"wrestlingDefense":r*=s.legFunction;break;case"clinch":r*=s.legFunction*s.armFunction;break;case"groundOffense":case"groundDefense":r*=s.armFunction;break;case"physical":r*=s.legFunction*s.cardio;break;case"mental":r*=s.reaction*(n.stunnedFor>0?.6:1);break}return r*=1+$(n.momentum,-100,100)/900,$(r,1,100)}function Xs(n){return n.stats[n.stats.length-1]}function Bh(n){n.stats.push(Uh())}function tm(n,e){return n.reachIn-e.reachIn}function nm(n){return dt($(n,-8,8),-8,8,.93,1.07)}function Gh(n,e,t){const i=Lh(n.tendencies),r=$(n.attributes.fightIQ/100,.15,1)*.55,a=e.baseFacets.wrestlingDefense,o=e.baseFacets.strikingDefense,c=e.baseFacets.groundDefense,l=e.baseFacets.groundOffense,u=n.baseFacets.wrestlingOffense,f=n.baseFacets.strikingOffense;return a<u-8&&(i.takedownRate=$(i.takedownRate+r*.5,0,1),i.notes.push("They have no answer for the takedown — put them on their back.")),l>n.baseFacets.groundDefense+10&&(i.takedownRate=$(i.takedownRate-r*.55,0,1),i.acceptBottom=$(i.acceptBottom-r*.6,0,1),i.notes.push("Do not go to the floor with them. Keep this standing.")),o<f-10&&(i.strikeVolume=$(i.strikeVolume+r*.35,0,1),i.pressure=$(i.pressure+r*.25,0,1),i.notes.push("They are there to be hit. Let your hands go.")),c<n.baseFacets.groundOffense-10&&(i.submissionSeeking=$(i.submissionSeeking+r*.4,0,1)),(e.tendencies.range>.65||e.attributes.footwork>75)&&(i.targetLegs=$(i.targetLegs+r*.35,0,.6),i.notes.push("Take their legs away — chop that lead leg every time they circle.")),e.attributes.cardio<62&&(i.targetBody=$(i.targetBody+r*.3,0,.55),i.notes.push("Go to the body early. They will fold in the third.")),Ar(i),i.pace=$(i.pace+t.float(-.06,.06),.05,1),i}function Hh(n,e){const t=n.plan;n.damage.leadLeg>35&&(t.targetLegs=$(t.targetLegs-.25,0,1),t.range=$(t.range-.15,0,1),Ar(t)),(n.damage.rearArm>40||n.damage.leadArm>40)&&(t.strikeVolume=$(t.strikeVolume-.15,0,1),t.takedownRate=$(t.takedownRate+.1,0,1)),Tt(n,"strikingOffense")-Tt(e,"strikingDefense")<-12&&n.baseFacets.wrestlingOffense>55&&(t.takedownRate=$(t.takedownRate+.12,0,1),t.clinchRate=$(t.clinchRate+.08,0,1)),e.controlTime>n.controlTime+90&&(t.acceptBottom=$(t.acceptBottom-.15,0,1),t.range=$(t.range+.12,0,1));const s=Wn(n.stamina);if(t.urgency=$(s-.2+(n.momentum>20?.15:0),.1,1),s<.72&&(t.pace=$(t.pace-.1,.1,1),t.pressure=$(t.pressure-.08,0,1)),n.stunnedFor>0){const r=n.attributes.composure>70?0:.2;t.pressure=$(t.pressure-.3+r,0,1),t.strikeVolume=$(t.strikeVolume-.25+r,0,1)}}function im(n,e,t,i,s){const r=[],a=n.plan,o=n.stats[t-1],c=e.stats[t-1];if(!o||!c)return r;const l=(f,h)=>r.push({instruction:f,line:h});return e.damage.leadLeg>25&&a.targetLegs<.4&&(a.targetLegs=$(a.targetLegs+.2,0,.6),Ar(a),l("ATTACK_LEAD_LEG","That leg is done — keep chopping it.")),(o.significantStrikesAttempted>0?o.significantStrikesLanded/o.significantStrikesAttempted:1)<.32&&o.significantStrikesAttempted>8&&(a.strikeVolume=$(a.strikeVolume-.12,0,1),l("BEHIND_THE_JAB","You are swinging for the fences. Go back to the jab.")),c.takedownsLanded>=2&&(a.acceptBottom=$(a.acceptBottom-.2,0,1),a.range=$(a.range+.1,0,1),l("STOP_THE_TAKEDOWN","Get off the cage and make them carry your weight.")),o.takedownsLanded>=2&&o.takedownsAttempted<=o.takedownsLanded+1&&(a.takedownRate=$(a.takedownRate+.12,0,1),l("KEEP_WRESTLING","They cannot stop your takedowns. Go back to it.")),o.bodyStrikes===0&&o.significantStrikesLanded>4&&(a.targetBody=$(a.targetBody+.15,0,.5),Ar(a),l("ATTACK_THE_BODY","Everything is upstairs. Get to the body.")),i&&t>=2&&(a.pressure=$(a.pressure+.18,0,1),a.urgency=$(a.urgency+.2,0,1),l("NEED_A_FINISH","You need this round. Go and take it.")),Wn(n.stamina)<.7&&(a.pace=$(a.pace-.12,.1,1),l("MANAGE_PACE","Breathe. Pick your moments — do not chase them.")),s.shuffle(r).slice(0,2)}const zh=["Alvarez","Petrov","Nakamura","O'Hara","Grimaldi","Baptiste","Lindqvist","Okafor","Duarte","Kaminski","Sorensen","Reyes","Whitfield","Marchetti"],Vh=["Ana","Bruce","Carla","Derek","Elena","Frank","Grace","Hugo","Ines","Karl"];function sm(n){const e=new Set,t=i=>{for(let r=0;r<40;r++){const a=`${i.pick(Vh)} ${i.pick(zh)}`;if(!e.has(a))return e.add(a),a}const s=`${i.pick(Vh)} ${i.pick(zh)} ${e.size+1}`;return e.add(s),s};return Array.from({length:3},(i,s)=>{const r=n.derive("judge",s),a=r.float(.7,1.35),o=r.float(.7,1.35);return{id:`judge_${s+1}`,name:t(r),weights:{significantStrikes:1*a,damage:r.float(.8,1.5),control:.55*o,takedowns:.7*o,submissionThreat:.65*o,aggression:r.float(.25,.6)},tenEightThreshold:r.float(3.4,5.6)}})}function Wh(n,e,t){const{weights:i}=n;return e.significantStrikesLanded*i.significantStrikes+t*i.damage*.35+e.controlTime/60*i.control*6+e.takedownsLanded*i.takedowns*4+e.submissionAttempts*i.submissionThreat*3.5+e.knockdowns*12+e.significantStrikesAttempted/10*i.aggression}function rm(n,e,t,i,s){const r=t.stats[s]??{...t.stats[0]},a=i.stats[s]??{...i.stats[0]},o=Wh(n,r,r.damageDealt),c=Wh(n,a,a.damageDealt);if(o+c===0)return{judgeId:n.id,round:e,a:10,b:9};const h=Math.abs(o-c)/Math.max(1,Math.min(o,c)+4)>n.tenEightThreshold||r.knockdowns>=2||a.knockdowns>=2?8:9;return o>=c?{judgeId:n.id,round:e,a:10,b:h}:{judgeId:n.id,round:e,a:h,b:10}}function Xh(n,e){const t=n.map(a=>{const o=e.filter(c=>c.judgeId===a.id).sort((c,l)=>c.round-l.round).map(c=>({round:c.round,a:c.a,b:c.b}));return{judgeId:a.id,judgeName:a.name,rounds:o,totalA:o.reduce((c,l)=>c+l.a,0),totalB:o.reduce((c,l)=>c+l.b,0)}});let i=0,s=0,r=0;for(const a of t)a.totalA>a.totalB?i++:a.totalB>a.totalA?s++:r++;return i===3||s===3?{outcome:"UNANIMOUS_DECISION",winner:i===3?"a":"b",scorecards:t}:i===2&&s===1?{outcome:"SPLIT_DECISION",winner:"a",scorecards:t}:s===2&&i===1?{outcome:"SPLIT_DECISION",winner:"b",scorecards:t}:i===2&&r===1?{outcome:"MAJORITY_DECISION",winner:"a",scorecards:t}:s===2&&r===1?{outcome:"MAJORITY_DECISION",winner:"b",scorecards:t}:r>=2?{outcome:"MAJORITY_DRAW",winner:void 0,scorecards:t}:{outcome:"DRAW",winner:void 0,scorecards:t}}function am(n,e){let t=0,i=0;for(const s of n)t+=e==="a"?s.a:s.b,i+=e==="a"?s.b:s.a;return t<i}function Kh(n){return{significantStrikesLanded:n.significantStrikesLanded,significantStrikesAttempted:n.significantStrikesAttempted,totalStrikesLanded:n.totalStrikesLanded,headStrikes:n.headStrikes,bodyStrikes:n.bodyStrikes,legStrikes:n.legStrikes,takedownsLanded:n.takedownsLanded,takedownsAttempted:n.takedownsAttempted,submissionAttempts:n.submissionAttempts,knockdowns:n.knockdowns,controlTime:He(n.controlTime,0),damageTaken:0}}const Rn=.1;function es(n){return`${/^[aeiou]/i.test(n)?"an":"a"} ${n}`}function om(n){const e=es(n);return e.charAt(0).toUpperCase()+e.slice(1)}function ri(n,e){const t=e.filter(([,i])=>i>0);if(t.length!==0)return n.pickWeighted(t)}function ai(n,e,t=.075){return $(Cp(n-e,0,t),.04,.96)}function cm(n,e,t,i){const s=i.derive("fight",t.fightId),r=t.rounds??3,a=t.roundSeconds??300,o=Fh(n),c=Fh(e);o.plan=Gh(o,c,s.derive("plan",o.id)),c.plan=Gh(c,o,s.derive("plan",c.id));const l=sm(s.derive("judges")),u=[],f=[],h={position:"STANDING",round:1,clock:a,elapsed:0,sequence:0,finished:!1,groundStall:0,distance:"mid"},p=si(o.divisionKey),g=si(c.divisionKey),v=p.tempo>=g.tempo?p:g,d=L=>{f.push({schemaVersion:k0,fightId:t.fightId,sequence:h.sequence++,round:h.round,timestamp:He(h.elapsed,1),roundTime:mo(h.clock),timeRemaining:Math.max(0,Math.round(h.clock)),position:h.position,...L})};let m,y,b,S,A,E;const C=(L,R,D,P,ee)=>{m=L,y=R,b=D,S=P,A=h.round,E=mo(h.clock),D.finished=!0,h.finished=!0,d({eventType:"FIGHT_END",outcome:L,winnerId:R.id,loserId:D.id,finishRound:h.round,finishTime:mo(h.clock),technique:P,description:ee})};d({eventType:"FIGHT_START",description:`${o.name} versus ${c.name}${t.isTitleFight?" — for the title":""}, scheduled for ${r} rounds.`});function _(L,R,D,P){const ee=D.gate;if(!ee)return!0;const se=h.position==="CLINCH"||h.position==="CAGE_CLINCH";return!(ee.clinchOnly&&!se&&!R.stunnedFor||ee.flash!==void 0&&L.flash<ee.flash||ee.neverLeads&&P||ee.opponentRetreating&&R.retreatingFor<=0&&R.stunnedFor<=0||ee.opponentHurt&&R.stunnedFor<=0||ee.minStamina!==void 0&&Wn(L.stamina)<ee.minStamina)}function T(L,R,D){let P=1;const ee=L.lastStrike;return ee==="JAB"&&D.key==="CROSS"&&(P*=2.6),ee==="JAB"&&D.key==="LEFT_HOOK"&&(P*=1.4),ee==="JAB"&&D.key==="JAB"&&(P*=1.35),ee==="CROSS"&&(D.key==="LEFT_HOOK"||D.key==="RIGHT_HOOK")&&(P*=1.5),(ee==="LEFT_HOOK"||ee==="RIGHT_HOOK")&&D.key==="UPPERCUT"&&(P*=1.25),ee&&D.target==="LEG"&&(P*=1.5),h.distance==="long"&&(P*=D.key==="JAB"?1.5:D.target==="LEG"?1.3:.85),h.distance==="close"&&(P*=D.key==="UPPERCUT"||D.key==="ELBOW"?1.3:D.key==="JAB"?.6:1),R.retreatingFor<=0&&D.target==="LEG"&&(P*=1.45),R.stunnedFor>0&&(P*=D.concussive>1?2.2:.7),P}function N(L,R,D,P,ee=!0){const se=L.plan,he=Wn(L.stamina);return ri(P,D.filter(ke=>_(L,R,ke,ee)).map(ke=>{const Te=ke.target==="HEAD"?se.targetHead:ke.target==="BODY"?se.targetBody:ke.target==="LEG"?se.targetLegs:.1,Pe=ke.skills.reduce((Ye,ot)=>Math.max(Ye,L.attributes[ot]),0)/100,Be=$(1.2-ke.cost*(1-he)*1.6,.05,1.2),Ce=ke.frequency*(.62+Te*1.1)*(.7+Pe*.6)*Be*T(L,R,ke);return[ke,Ce]}))}function I(L,R,D,P){const ee=Tt(L,"strikingOffense"),se=1-$(R.damage.face/240+R.damage.cuts*.045,0,.3),he=Tt(R,"strikingDefense")*se,ke=D.skills.reduce((Ye,ot)=>Math.max(Ye,L.attributes[ot]),0),Te=ai(ee*.7+ke*.3,he),Pe=P==="long"?nm(tm(L,R)):1,Be=D.target==="HEAD"?.72:D.target==="BODY"?1.12:1.24,Ce=h.elapsed<R.vulnerableUntil?1.5:1;return $(Te*D.accuracy*Pe*Be*Ce*.62,.03,.92)}function F(L,R,D,P,ee){const se=Xs(L);se.totalStrikesAttempted++,D.significant&&se.significantStrikesAttempted++,Jt(L.stamina,D.cost*(.7+L.plan.pace*.6)*si(L.divisionKey).drain);const he=I(L,R,D,P);if(ee.next()>he){const Ye=ee.bool(.45)?"BLOCKED":ee.bool(.55)?"MISSED":"SLIPPED";return L.momentum=$(L.momentum-1.5,-100,100),d({eventType:D.significant?"SIGNIFICANT_STRIKE":"STRIKE",attacker:L.id,defender:R.id,technique:D.key,target:D.target,result:Ye,damage:0,staminaCost:He(D.cost,2),description:Ye==="BLOCKED"?`${R.shortName} blocks ${es(D.label)} from ${L.shortName}.`:Ye==="SLIPPED"?`${R.shortName} slips the ${D.label}.`:`${L.shortName} misses with ${es(D.label)}.`}),!1}const Te=ee.bool(.68),Pe=L.attributes.strikingPower,Be=R.attributes.durability,Ce=$(D.power*.22*si(L.divisionKey).power*dt(Pe,1,100,.55,1.5)*dt(Be,1,100,1.35,.62)*(Te?1:.45)*ee.float(.82,1.18),.1,9);return j0(R.damage,D.target,Ce),D.target==="BODY"&&(R.stamina.cardio=$(R.stamina.cardio-Ce*.55,0,100)),se.totalStrikesLanded++,se.damageDealt+=Ce,D.significant&&(se.significantStrikesLanded++,D.target==="HEAD"?se.headStrikes++:D.target==="BODY"?se.bodyStrikes++:D.target==="LEG"&&se.legStrikes++),L.momentum=$(L.momentum+Ce*.9,-100,100),R.momentum=$(R.momentum-Ce*.7,-100,100),d({eventType:D.significant?"SIGNIFICANT_STRIKE":"STRIKE",attacker:L.id,defender:R.id,technique:D.key,target:D.target,result:Te?"LANDED":"PARTIAL",damage:He(Ce,1),staminaCost:He(D.cost,2),description:`${L.shortName} lands ${Te?"a clean":"a partial"} ${D.label}.`}),Te&&D.target==="HEAD"&&ee.bool(D.cutChance)&&(R.damage.cuts++,d({eventType:"CUT",attacker:L.id,defender:R.id,technique:D.key,severity:He(Ce,1),description:`${R.shortName} has been opened up — blood coming from a cut.`})),D.target==="HEAD"&&Te&&J(L,R,D,Ce,ee),!0}function J(L,R,D,P,ee){if(D.concussive<=0)return;const se=si(L.divisionKey),he=dt(R.attributes.durability,1,100,1.6,.45)/se.chin,ke=1+R.damage.concussive/55,Te=dt(Wn(R.stamina),.35,1,1.7,1),Pe=$(.0085*se.knockdown*D.concussive*(P/1.6)*he*ke*Te,0,.45);if(!ee.bool(Pe)){ee.bool(Pe*1.8)&&(R.stunnedFor=ee.float(3,9),d({eventType:"STUN",attacker:L.id,defender:R.id,technique:D.key,severity:He(P,1),description:`${R.shortName} is hurt! ${L.shortName} has them wobbled.`}));return}R.knockdowns++,Xs(L).knockdowns++,R.stunnedFor=ee.float(6,16),R.damage.concussive=$(R.damage.concussive+12,0,100),L.momentum=100,R.momentum=-60,d({eventType:"KNOCKDOWN",attacker:L.id,defender:R.id,technique:D.key,target:"HEAD",severity:He(P,1),description:`DOWN GOES ${R.shortName.toUpperCase()}! ${om(D.label)} puts them on the canvas.`});const Be=dt(R.attributes.durability*.6+R.attributes.recovery*.4,1,100,.35,.03),Ce=$(Be*se.finishing*(1+R.damage.concussive/70),0,.85);if(ee.bool(Ce)){C("KO",L,R,D.key,`${L.shortName} has knocked them out cold with ${es(D.label)}.`);return}const Ye=$((.2+Tt(L,"strikingOffense")/480-R.attributes.recovery/300)*se.finishing,.05,.62);ee.bool(Ye)?C("TKO",L,R,D.key,`${L.shortName} swarms and the referee has seen enough — it is over.`):(d({eventType:"REFEREE_ACTION",fighterId:R.id,action:"ALLOWED_TO_CONTINUE",description:`${R.shortName} survives the follow-up and fights back to their feet.`}),h.position="STANDING")}function q(L,R,D){const P=L.comboLeft<=0,se=h.position==="CLINCH"||h.position==="CAGE_CLINCH"?Dh:V0(h.distance),he=N(L,R,se,D,P);if(!he)return .3;if(P){const Be=L.plan.strikeVolume,Ce=Wn(L.stamina);L.comboLeft=ri(D,[[1,.5+(1-Be)*.5],[2,1.5+Be*.5],[3,(1.35+Be*.7)*Ce],[4,(.75+Be*.6)*Ce*Ce],[5,(.22+Be*.35)*Ce*Ce]])??2}const ke=F(L,R,he,h.distance,D);L.lastStrike=he.key,L.comboLeft--,L.comboLeft<=0&&h.distance==="close"&&D.bool(.72)?h.distance="mid":L.comboLeft<=0&&h.distance==="mid"&&D.bool(.3)&&(h.distance="long"),!ke&&D.bool(.4)&&(L.comboLeft=0);const Te=!P,Pe=he.time*(Te?.78:1);return L.vulnerableUntil=h.elapsed+Pe+he.recovery,Pe+he.recovery*(L.comboLeft>0?.35:1)}function H(L,R,D){const P=W0.filter(Pe=>Pe.from.includes(h.position)),ee=ri(D,P.map(Pe=>{const Be=Pe.skills.reduce((Ce,Ye)=>Math.max(Ce,L.attributes[Ye]),0)/100;return[Pe,Pe.ease*(.3+Be*1.4)]}));if(!ee)return;const se=Xs(L);se.takedownsAttempted++,Jt(L.stamina,ee.cost),d({eventType:"TAKEDOWN_ATTEMPT",attacker:L.id,defender:R.id,technique:ee.key,result:"DEFENDED",staminaCost:He(ee.cost,2),description:`${L.shortName} shoots for ${es(ee.label)}.`});const he=Tt(L,"wrestlingOffense"),ke=Tt(R,"wrestlingDefense"),Te=$(ai(he,ke)*ee.ease*.82,.05,.82);D.bool(Te)?(se.takedownsLanded++,h.position=ee.lands,h.topId=L.id,L.momentum=$(L.momentum+14,-100,100),d({eventType:"TAKEDOWN",attacker:L.id,defender:R.id,technique:ee.key,result:"COMPLETED",staminaCost:0,description:`${L.shortName} completes the ${ee.label} and lands ${Ws(ee.lands)?.label??"on top"}.`})):(R.momentum=$(R.momentum+8,-100,100),Jt(R.stamina,ee.cost*.55),d({eventType:"SPRAWL",attacker:R.id,defender:L.id,result:"DEFENDED",staminaCost:He(ee.cost*.55,2),description:`${R.shortName} sprawls and stuffs the takedown.`}),D.bool(.35)&&(h.position="CAGE_CLINCH",h.topId=R.id))}function Z(L,R,D){Jt(L.stamina,.9);const P=ai(Tt(L,"clinch"),Tt(R,"wrestlingDefense")*.8);D.bool(P)?(h.position=D.bool(.6)?"CAGE_CLINCH":"CLINCH",h.topId=L.id,d({eventType:"CLINCH_ENGAGE",attacker:L.id,defender:R.id,result:"COMPLETED",staminaCost:.9,description:h.position==="CAGE_CLINCH"?`${L.shortName} closes the distance and presses ${R.shortName} into the fence.`:`${L.shortName} ties up in the clinch.`})):d({eventType:"CLINCH_BREAK",attacker:R.id,defender:L.id,result:"DEFENDED",staminaCost:.4,description:`${R.shortName} frames and keeps the fight at range.`})}function K(L){const R=$(L.baseFacets.groundOffense/100,0,1);return L.plan.submissionSeeking*R**3*.75}function te(L,R,D){const P=h.topId===L.id,ee=X0.filter(Ye=>{const ot=Ye.from[h.position];return ot?P?!Ye.fromBottom||ot>.7:Ye.fromBottom:!1}),se=ri(D,ee.map(Ye=>{const ot=Ye.skills.reduce((Pt,Ft)=>Math.max(Pt,L.attributes[Ft]),0)/100;return[Ye,(Ye.from[h.position]??0)*Ye.ease*(.25+ot*1.5)]}));if(!se)return;const he=Xs(L);he.submissionAttempts++,Jt(L.stamina,se.cost);const ke=Tt(L,"groundOffense"),Te=Tt(R,"groundDefense"),Pe=$(ai(ke,Te)*se.ease*D.float(.7,1.3),.05,.98);d({eventType:"SUBMISSION_ATTEMPT",attacker:L.id,defender:R.id,technique:se.key,result:"DEFENDED",tightness:He(Pe,2),staminaCost:He(se.cost,2),description:Pe>.7?`${L.shortName} has the ${se.label} locked in deep — this looks bad for ${R.shortName}!`:`${L.shortName} threatens with ${es(se.label)}.`});const Be=dt(Tt(R,"groundDefense"),1,100,.15,.9),Ce=$((Pe-.48)*1.25*(1-Be*.7),0,.65);if(D.bool(Ce)){C("SUBMISSION",L,R,se.key,`${R.shortName} taps! ${L.shortName} wins by ${se.label}.`);return}Jt(R.stamina,se.cost*.8),R.momentum=$(R.momentum+6,-100,100),d({eventType:"SUBMISSION_ESCAPE",attacker:R.id,defender:L.id,technique:se.key,result:"DEFENDED",tightness:He(Pe,2),staminaCost:He(se.cost*.8,2),description:`${R.shortName} works free of the ${se.label}.`})}function re(L,R,D){const P=Ws(h.position);if(!P)return;if(h.topId===L.id){const ke=ri(D,[["strike",(1-L.plan.submissionSeeking*.5)*P.strikeAccess*2.4],["advance",P.advancesTo.length>0?L.plan.groundControl*1.3:0],["submit",K(L)],["hold",.5]]);if(ke==="strike"){h.groundStall=0;const Te=N(L,R,z0,D);Te&&F(L,R,Te,"close",D)}else if(ke==="advance"){const Te=D.pick(P.advancesTo),Pe=ai(Tt(L,"groundOffense"),Tt(R,"groundDefense"));if(Jt(L.stamina,1.1),D.bool(Pe)){const Be=h.position;h.position=Te,d({eventType:"POSITION_CHANGE",attacker:L.id,defender:R.id,fromPosition:Be,toPosition:Te,description:`${L.shortName} advances to ${Ws(Te)?.label??Te.toLowerCase()}.`})}else d({eventType:"SCRAMBLE",attacker:R.id,defender:L.id,result:"DEFENDED",staminaCost:1,description:`${R.shortName} defends the pass and stays busy from the bottom.`})}else ke==="submit"?(h.groundStall=0,te(L,R,D)):(Jt(L.stamina,.4),d({eventType:"POSITION_CHANGE",attacker:L.id,defender:R.id,fromPosition:h.position,toPosition:h.position,description:`${L.shortName} holds ${P.label} and controls the position.`}));return}const se=ri(D,[["standup",(1-L.plan.acceptBottom)*2.2],["sweep",L.baseFacets.groundOffense/90],["submit",K(L)]]);if(se==="submit"){te(L,R,D);return}Jt(L.stamina,1.3);const he=$(ai(Tt(L,"groundDefense")+L.attributes.scrambling*.3,Tt(R,"groundOffense"))*(1-P.escapeDifficulty*.55),.05,.85);if(D.bool(he)){const ke=h.position;se==="sweep"?(h.topId=L.id,h.position="GUARD",d({eventType:"POSITION_CHANGE",attacker:L.id,defender:R.id,fromPosition:ke,toPosition:"GUARD",description:`${L.shortName} sweeps and comes up on top!`})):(h.position="STANDING",h.topId=void 0,d({eventType:"POSITION_CHANGE",attacker:L.id,defender:R.id,fromPosition:ke,toPosition:"STANDING",description:`${L.shortName} works back to their feet.`}))}else d({eventType:"SCRAMBLE",attacker:L.id,defender:R.id,result:"DEFENDED",staminaCost:1.3,description:`${L.shortName} scrambles but ${R.shortName} rides the position.`})}function ue(L,R,D){const P=ri(D,[["strike",L.plan.strikeVolume*1.4],["takedown",L.plan.takedownRate*.22],["break",h.topId===L.id?.35:1.4]]);if(P==="strike"){const ee=N(L,R,Dh,D);ee&&F(L,R,ee,"close",D)}else if(P==="takedown")H(L,R,D);else{Jt(L.stamina,.6);const ee=ai(Tt(L,"clinch"),Tt(R,"clinch"));D.bool(ee)?(h.position="STANDING",h.topId=void 0,d({eventType:"CLINCH_BREAK",attacker:L.id,defender:R.id,result:"COMPLETED",staminaCost:.6,description:`${L.shortName} breaks the clinch and gets back to open space.`})):d({eventType:"CLINCH_ENGAGE",attacker:R.id,defender:L.id,result:"DEFENDED",staminaCost:.6,description:`${R.shortName} keeps them pinned against the fence.`})}}function Se(L,R,D,P){const ee=(se,he)=>(h.distance=he,se!==he);if(D==="advance"){const se=ee(h.distance,h.distance==="long"?"mid":P.bool(.45)?"close":"mid");return L.retreatingFor=0,Jt(L.stamina,.14),se&&P.bool(.24)&&d({eventType:"POSITION_CHANGE",attacker:L.id,defender:R.id,fromPosition:"STANDING",toPosition:"STANDING",description:`${L.shortName} steps in behind the guard.`}),P.float(.55,1.1)}if(D==="retreat")return ee(h.distance,h.distance==="close"?"mid":"long"),L.retreatingFor=P.float(.8,2.2),Jt(L.stamina,.12),P.float(.6,1.2);if(D==="circle"){L.retreatingFor=Math.max(L.retreatingFor,P.float(.3,1)),Jt(L.stamina,.1);const se=1+L.damage.leadLeg/90;return P.float(.8,1.8)*se}if(D==="feint"){Jt(L.stamina,.16);const se=ai(Tt(L,("fightIQ"in L.attributes,"strikingOffense")),Tt(R,"strikingDefense"),.06);return P.bool(se*.5)&&(R.readyAt=Math.max(R.readyAt,h.elapsed+P.float(.15,.4))),P.bool(.2)&&d({eventType:"POSITION_CHANGE",attacker:L.id,defender:R.id,fromPosition:"STANDING",toPosition:"STANDING",description:`${L.shortName} feints and ${R.shortName} bites on it.`}),P.float(.5,.9)}return Jt(L.stamina,.22),P.bool(.28)&&d({eventType:"POSITION_CHANGE",attacker:L.id,defender:R.id,fromPosition:"STANDING",toPosition:"STANDING",description:`${L.shortName} drops levels and ${R.shortName} has to respect it.`}),P.float(.5,.9)}function Ae(L,R,D){if(L.comboLeft>0)return q(L,R,D);const P=L.plan,ee=si(L.divisionKey),se=Wn(L.stamina),he=L.stunnedFor>0,ke=he?.25:1,Te=Tt(L,"wrestlingOffense")/100,Pe=ri(D,[["strike",P.strikeVolume*(.62+P.pressure*.95)*ee.volume*se*ke*1.37],["advance",.75+P.pressure*.8+(h.distance==="long"?.9:.2)],["retreat",P.range*1.1+(he?2.4:0)+(h.distance==="close"?.7:.15)],["circle",1.5+P.counterRate*.9],["feint",1.15+P.counterRate*.7],["level",P.takedownRate*.9],["takedown",P.takedownRate**1.7*ee.takedownRate*Te*.0075*ke],["clinch",P.clinchRate*.26*ke]])??"circle";return Pe==="strike"?q(L,R,D):Pe==="takedown"?(H(L,R,D),L.vulnerableUntil=h.elapsed+1.2,1.2):Pe==="clinch"?(Z(L,R,D),.9):Se(L,R,Pe,D)}for(let L=1;L<=r&&!h.finished;L++){h.round=L,h.clock=a,L>1&&(Bh(o),Bh(c));for(const D of[o,c])D.readyAt=h.elapsed,D.vulnerableUntil=0,D.comboLeft=0,D.retreatingFor=0,D.lastStrike=void 0;h.distance="mid",d({eventType:"ROUND_START",description:`Round ${L}.`});const R=s.derive("round",L);for(;h.clock>0&&!h.finished;){h.clock-=Rn,h.elapsed+=Rn,xo(o.stamina,Rn,!1),xo(c.stamina,Rn,!1);for(const P of[o,c])P.stunnedFor=Math.max(0,P.stunnedFor-Rn),P.retreatingFor=Math.max(0,P.retreatingFor-Rn),P.momentum*=.9993;if(go(h.position)||h.position==="CLINCH"||h.position==="CAGE_CLINCH"){if(h.groundStall+=Rn,h.topId){const P=h.topId===o.id?o:c,ee=Ws(h.position)?.dominance??.5,se=Rn*(ee>.3?1:.5);P.controlTime+=se,Xs(P).controlTime+=se}}else h.groundStall=0;for(const[P,ee]of[[o,c],[c,o]]){if(h.finished||h.clock<=0)break;if(h.elapsed<P.readyAt)continue;let se;go(h.position)?(re(P,ee,R),se=R.float(1.6,3.4)):h.position==="CLINCH"||h.position==="CAGE_CLINCH"?(ue(P,ee,R),se=R.float(1.1,2.6)):se=Ae(P,ee,R),P.readyAt=h.elapsed+Math.max(Rn,se*v.tempo)}for(const P of[o,c]){if(h.finished)break;!P.noted.legs&&P.damage.leadLeg>34&&(P.noted.legs=!0,d({eventType:"DAMAGE_UPDATE",fighterId:P.id,damage:{...P.damage,leadLeg:He(P.damage.leadLeg,1)},description:`${P.shortName} is limping now — that lead leg has been chopped up and the circling has stopped.`})),!P.noted.gassed&&Wn(P.stamina)<.62&&h.round>=2&&(P.noted.gassed=!0,d({eventType:"STAMINA_UPDATE",fighterId:P.id,stamina:{burst:He(P.stamina.burst,0),cardio:He(P.stamina.cardio,0)},description:`The pace has dropped. ${P.shortName} has their hands on their knees between exchanges.`})),!P.noted.body&&P.damage.body>30&&(P.noted.body=!0,d({eventType:"DAMAGE_UPDATE",fighterId:P.id,damage:{...P.damage,leadLeg:He(P.damage.leadLeg,1)},description:`${P.shortName} is wincing every time that body shot lands — the investment is paying off.`}))}if(Math.abs(h.elapsed%25)<Rn/2&&(Hh(o,c),Hh(c,o)),h.groundStall>40&&go(h.position)){const P=Ws(h.position)?.dominance??.5;R.bool($(.02-P*.018,.001,.02))&&(h.position="STANDING",h.topId=void 0,h.groundStall=0,h.distance="mid",d({eventType:"REFEREE_ACTION",action:"STAND_THEM_UP",description:"The referee restarts them on the feet."}))}if(!h.finished&&R.bool(6e-4)){for(const[P,ee]of[[o,c],[c,o]])if($0(P.damage)){d({eventType:"DOCTOR_CHECK",fighterId:P.id,action:"CUT_INSPECTION",description:`The referee calls time — the doctor takes a look at ${P.shortName}'s cut.`}),R.bool(.18)&&C("DOCTOR_STOPPAGE",ee,P,void 0,`The doctor will not let them continue. ${ee.shortName} wins by doctor stoppage.`);break}}}if(h.finished)break;h.clock=0,d({eventType:"ROUND_END",description:`End of round ${L}.`});for(const D of l)u.push(rm(D,L,o,c,L-1));if(d({eventType:"DAMAGE_UPDATE",fighterId:o.id,damage:{...o.damage,leadLeg:He(o.damage.leadLeg,1)},description:`${o.shortName}: ${Oh(o.damage)??"no significant damage"}.`}),d({eventType:"DAMAGE_UPDATE",fighterId:c.id,damage:{...c.damage,leadLeg:He(c.damage.leadLeg,1)},description:`${c.shortName}: ${Oh(c.damage)??"no significant damage"}.`}),L<r){for(const[D,P,ee]of[["a",o,c],["b",c,o]]){const se=im(P,ee,L,am(u,D),s.derive("corner",P.id,L));for(const he of se)d({eventType:"CORNER_INSTRUCTION",fighterId:P.id,instruction:he.instruction,description:`Corner to ${P.shortName}: "${he.line}"`})}Nh(o.stamina,si(o.divisionKey).recovery),Nh(c.stamina,si(c.divisionKey).recovery),kh(o.damage),kh(c.damage),o.stunnedFor=0,c.stunnedFor=0,o.momentum*=.4,c.momentum*=.4}}let tt=[];if(m)tt=Xh(l,u).scorecards;else{const L=Xh(l,u);tt=L.scorecards,m=L.outcome,L.winner==="a"?(y=o,b=c):L.winner==="b"&&(y=c,b=o),h.clock=0,d({eventType:"DECISION",outcome:m,winnerId:y?.id,scorecards:tt,description:y?`We go to the judges: ${y.shortName} takes it by ${m.replace(/_/g," ").toLowerCase()}.`:"We go to the judges, and this one is a draw."})}const gt=L=>{const R=L.stats.reduce((D,P)=>({significantStrikesLanded:D.significantStrikesLanded+P.significantStrikesLanded,significantStrikesAttempted:D.significantStrikesAttempted+P.significantStrikesAttempted,totalStrikesLanded:D.totalStrikesLanded+P.totalStrikesLanded,headStrikes:D.headStrikes+P.headStrikes,bodyStrikes:D.bodyStrikes+P.bodyStrikes,legStrikes:D.legStrikes+P.legStrikes,takedownsLanded:D.takedownsLanded+P.takedownsLanded,takedownsAttempted:D.takedownsAttempted+P.takedownsAttempted,submissionAttempts:D.submissionAttempts+P.submissionAttempts,knockdowns:D.knockdowns+P.knockdowns,controlTime:D.controlTime+P.controlTime,damageTaken:0}),{significantStrikesLanded:0,significantStrikesAttempted:0,totalStrikesLanded:0,headStrikes:0,bodyStrikes:0,legStrikes:0,takedownsLanded:0,takedownsAttempted:0,submissionAttempts:0,knockdowns:0,controlTime:0,damageTaken:0});return{...R,controlTime:Math.round(R.controlTime),damageTaken:He(_o(L.damage),1)}};return{fightId:t.fightId,outcome:m??"DRAW",winnerId:y?.id,loserId:b?.id,finishRound:A,finishTime:E,technique:S,rounds:h.round,events:f,scorecards:tt,stats:{[o.id]:gt(o),[c.id]:gt(c)},roundStats:{[o.id]:o.stats.map(Kh),[c.id]:c.stats.map(Kh)},damage:{[o.id]:He(_o(o.damage),1),[c.id]:He(_o(c.damage),1)}}}const So={JAB:{clip:"strike_jab",variants:3},CROSS:{clip:"strike_cross",variants:2},RIGHT_CROSS:{clip:"strike_cross",variants:2},LEFT_HOOK:{clip:"strike_hook_left",variants:2},RIGHT_HOOK:{clip:"strike_hook_right",variants:2},UPPERCUT:{clip:"strike_uppercut",variants:2},OVERHAND:{clip:"strike_overhand",variants:2,speed:.95},SUPERMAN_PUNCH:{clip:"strike_superman",variants:1,camera:"IMPACT"},BACKFIST:{clip:"strike_backfist",variants:1,camera:"IMPACT"},ELBOW:{clip:"strike_elbow",variants:2,camera:"CLOSE"},KNEE:{clip:"strike_knee",variants:2,camera:"CLOSE"},FLYING_KNEE:{clip:"strike_flying_knee",variants:1,camera:"IMPACT",speed:.9},LOW_KICK:{clip:"kick_low",variants:3},BODY_KICK:{clip:"kick_body",variants:2},HEAD_KICK:{clip:"kick_head",variants:2,camera:"IMPACT",speed:.92},FRONT_KICK:{clip:"kick_front",variants:2},SIDE_KICK:{clip:"kick_side",variants:1},SPINNING_BACK_KICK:{clip:"kick_spinning_back",variants:1,camera:"IMPACT",speed:.9},WHEEL_KICK:{clip:"kick_wheel",variants:1,camera:"IMPACT",speed:.9},GROUND_PUNCH:{clip:"ground_punch",variants:3,camera:"GROUND_OVERHEAD"},GROUND_ELBOW:{clip:"ground_elbow",variants:2,camera:"GROUND_OVERHEAD"},HAMMERFIST:{clip:"ground_hammerfist",variants:2,camera:"GROUND_OVERHEAD"},DOUBLE_LEG:{clip:"td_double_leg",variants:2,camera:"CAGE_SIDE"},SINGLE_LEG:{clip:"td_single_leg",variants:2,camera:"CAGE_SIDE"},BODY_LOCK:{clip:"td_body_lock",variants:1,camera:"CAGE_SIDE"},TRIP:{clip:"td_trip",variants:2},THROW:{clip:"td_throw",variants:2,camera:"IMPACT",speed:.95},SUPLEX:{clip:"td_suplex",variants:1,camera:"IMPACT",speed:.9},ANKLE_PICK:{clip:"td_ankle_pick",variants:1},CAGE_DRAG:{clip:"td_cage_drag",variants:1,camera:"CAGE_SIDE"},REAR_NAKED_CHOKE:{clip:"sub_rnc",variants:1,camera:"CLOSE"},GUILLOTINE:{clip:"sub_guillotine",variants:1,camera:"CLOSE"},TRIANGLE:{clip:"sub_triangle",variants:1,camera:"GROUND_OVERHEAD"},ARMBAR:{clip:"sub_armbar",variants:2,camera:"GROUND_OVERHEAD"},KIMURA:{clip:"sub_kimura",variants:1,camera:"CLOSE"},AMERICANA:{clip:"sub_americana",variants:1,camera:"CLOSE"},D_ARCE:{clip:"sub_darce",variants:1,camera:"CLOSE"},ANACONDA:{clip:"sub_anaconda",variants:1,camera:"CLOSE"},HEEL_HOOK:{clip:"sub_heel_hook",variants:1,camera:"GROUND_OVERHEAD"},KNEEBAR:{clip:"sub_kneebar",variants:1,camera:"GROUND_OVERHEAD"},ARM_TRIANGLE:{clip:"sub_arm_triangle",variants:1,camera:"GROUND_OVERHEAD"},NECK_CRANK:{clip:"sub_neck_crank",variants:1,camera:"CLOSE"},SPRAWL:{clip:"def_sprawl",variants:2,camera:"CAGE_SIDE"},CLINCH_ENGAGE:{clip:"clinch_enter",variants:2,camera:"CAGE_SIDE"},CLINCH_BREAK:{clip:"clinch_break",variants:2},SCRAMBLE:{clip:"scramble",variants:3,camera:"GROUND_OVERHEAD"},KNOCKDOWN:{clip:"knockdown",variants:2,camera:"IMPACT",speed:.85},STUN:{clip:"stun_wobble",variants:2,camera:"CLOSE"},CUT:{clip:"reaction_cut",variants:1,camera:"CLOSE"},FIGHT_START:{clip:"intro_touch_gloves",variants:1,camera:"WIDE"},ROUND_START:{clip:"stance_idle",variants:2,camera:"WIDE"},ROUND_END:{clip:"round_end_return",variants:1,camera:"CORNER"},CORNER_INSTRUCTION:{clip:"corner_seated",variants:2,camera:"CORNER"},REFEREE_ACTION:{clip:"ref_intervene",variants:2,camera:"BROADCAST"},DOCTOR_CHECK:{clip:"doctor_check",variants:1,camera:"CLOSE"},FIGHT_END:{clip:"fight_end_celebrate",variants:3,camera:"WIDE"},DECISION:{clip:"decision_announce",variants:1,camera:"WIDE"}},lm={clip:"stance_idle",variant:0,targetState:"STANDING",camera:"BROADCAST",reaction:"NONE",speed:1,triggersReplay:!1};function Yh(n){return n.eventType==="POSITION_CHANGE"?n.toPosition:n.eventType==="TAKEDOWN"?"GROUND_TOP":n.eventType==="SPRAWL"?"STANDING":n.eventType==="CLINCH_ENGAGE"?"CLINCH":n.eventType==="CLINCH_BREAK"?"STANDING":n.eventType==="KNOCKDOWN"?"STUNNED":n.eventType==="SUBMISSION_ATTEMPT"?"SUBMISSION_ATTEMPT":n.position}const hm=.45,qh=1.5,um=1.25,dm=1;function fm(n){if(n.eventType==="KNOCKDOWN")return"DROP";if(n.eventType==="STUN")return"STAGGER";if(n.eventType==="SPRAWL")return"SPRAWL_DEFEND";if(Ch(n))switch(n.result){case"LANDED":return n.target==="BODY"?n.damage>=um?"BODY_FOLD":"LIGHT":n.target==="LEG"?n.damage>=dm?"LEG_BUCKLE":"LIGHT":n.damage>=qh?"HEAVY":n.damage>=hm?"LIGHT":"NONE";case"PARTIAL":return"LIGHT";case"BLOCKED":return"BLOCK";case"SLIPPED":case"MISSED":return"SLIP";default:return"NONE"}return"NONE"}function pm(n,e){return e<=1?0:(n.sequence*2654435761>>>0)%e}function mm(n){if("technique"in n&&typeof n.technique=="string"&&So[n.technique])return n.technique;if(So[n.eventType])return n.eventType;if(n.eventType==="TAKEDOWN_ATTEMPT"||n.eventType==="TAKEDOWN")return"DOUBLE_LEG"}function Jh(n){const e=mm(n),t=e?So[e]:void 0;if(!t)return{...lm,targetState:Yh(n)};const i=n.eventType==="KNOCKDOWN"||n.eventType==="FIGHT_END"||Ch(n)&&n.eventType==="SIGNIFICANT_STRIKE"&&n.result==="LANDED"&&n.damage>=qh,s="attacker"in n?n.attacker:"fighterId"in n?n.fighterId:void 0,r="defender"in n?n.defender:void 0;return{clip:t.clip,variant:pm(n,t.variants),targetState:Yh(n),camera:i?"IMPACT":t.camera??"BROADCAST",reaction:fm(n),speed:t.speed??1,triggersReplay:i,actorId:s,reactorId:r}}function gm(n){return Math.max(0,Math.min(1,(n-20)/65))}function ts(n,e){let t=0,i=0;for(const[s,r]of e)t+=gm(n[s])*r,i+=r;return i>0?t/i:.5}function vm(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0)/4294967296*Math.PI*2}function Zh(n,e){const t=n.attributes,i=ao(n.attributes).tendencies,s=ts(t,[["aggression",.6],["pressureManagement",.2],["explosiveness",.2]]);return{fighterId:n.id,pressure:Math.max(0,Math.min(1,s*.5+i.pressure*.5-i.counterRate*.15)),reach:Math.max(0,Math.min(1,i.range)),mobility:ts(t,[["footwork",.6],["agility",.25],["speed",.15]]),recovery:ts(t,[["balance",.5],["composure",.3],["recovery",.2]]),engine:ts(t,[["cardio",1]]),guard:ts(t,[["strikingDefense",.6],["composure",.4]]),deception:ts(t,[["fightIQ",.5],["decisionMaking",.3],["adaptability",.2]]),phase:vm(`${n.id}:${e}`)}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Mo="185",xm=0,Qh=1,_m=2,wr=1,jh=2,Ks=3,oi=0,Zt=1,Cn=2,Ln=0,ns=1,yo=2,$h=3,eu=4,Sm=5,Li=100,Mm=101,ym=102,bm=103,Em=104,Am=200,Tm=201,wm=202,Rm=203,bo=204,Eo=205,Cm=206,Lm=207,Pm=208,Dm=209,Im=210,Nm=211,km=212,Om=213,Um=214,Ao=0,To=1,wo=2,is=3,Ro=4,Co=5,Lo=6,Po=7,Do=0,Fm=1,Bm=2,Pn=0,Io=1,No=2,ko=3,Rr=4,Oo=5,Uo=6,Fo=7,tu="attached",Gm="detached",nu=300,Pi=301,ss=302,Bo=303,Go=304,Cr=306,Ys=1e3,Xn=1001,Ho=1002,It=1003,Hm=1004,Lr=1005,Gt=1006,zo=1007,Di=1008,rn=1009,iu=1010,su=1011,qs=1012,Vo=1013,Dn=1014,fn=1015,Qt=1016,Wo=1017,Xo=1018,Js=1020,ru=35902,au=35899,ou=1021,cu=1022,pn=1023,Kn=1026,Ii=1027,Ko=1028,Yo=1029,Ni=1030,qo=1031,Jo=1033,Pr=33776,Dr=33777,Ir=33778,Nr=33779,Zo=35840,Qo=35841,jo=35842,$o=35843,ec=36196,tc=37492,nc=37496,ic=37488,sc=37489,kr=37490,rc=37491,ac=37808,oc=37809,cc=37810,lc=37811,hc=37812,uc=37813,dc=37814,fc=37815,pc=37816,mc=37817,gc=37818,vc=37819,xc=37820,_c=37821,Sc=36492,Mc=36494,yc=36495,bc=36283,Ec=36284,Or=36285,Ac=36286,zm=3200,Ur=0,Vm=1,ci="",an="srgb",Fr="srgb-linear",Br="linear",st="srgb",rs=7680,lu=519,Wm=512,Xm=513,Km=514,Tc=515,Ym=516,qm=517,wc=518,Jm=519,hu=35044,uu="300 es",In=2e3,Zs=2001;function Zm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Gr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Qm(){const n=Gr("canvas");return n.style.display="block",n}const du={};function fu(...n){const e="THREE."+n.shift();console.log(e,...n)}function pu(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ue(...n){n=pu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function nt(...n){n=pu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function as(...n){const e=n.join(" ");e in du||(du[e]=!0,Ue(...n))}function jm(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const $m={[Ao]:To,[wo]:Lo,[Ro]:Po,[is]:Co,[To]:Ao,[Lo]:wo,[Po]:Ro,[Co]:is};class ki{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Rc=Math.PI/180,Hr=180/Math.PI;function Oi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(zt[n&255]+zt[n>>8&255]+zt[n>>16&255]+zt[n>>24&255]+"-"+zt[e&255]+zt[e>>8&255]+"-"+zt[e>>16&15|64]+zt[e>>24&255]+"-"+zt[t&63|128]+zt[t>>8&255]+"-"+zt[t>>16&255]+zt[t>>24&255]+zt[i&255]+zt[i>>8&255]+zt[i>>16&255]+zt[i>>24&255]).toLowerCase()}function Qe(n,e,t){return Math.max(e,Math.min(t,n))}function eg(n,e){return(n%e+e)%e}function Cc(n,e,t){return(1-t)*n+t*e}function Qs(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function en(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const hh=class hh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};hh.prototype.isVector2=!0;let le=hh;class os{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let c=i[s+0],l=i[s+1],u=i[s+2],f=i[s+3],h=r[a+0],p=r[a+1],g=r[a+2],v=r[a+3];if(f!==v||c!==h||l!==p||u!==g){let d=c*h+l*p+u*g+f*v;d<0&&(h=-h,p=-p,g=-g,v=-v,d=-d);let m=1-o;if(d<.9995){const y=Math.acos(d),b=Math.sin(y);m=Math.sin(m*y)/b,o=Math.sin(o*y)/b,c=c*m+h*o,l=l*m+p*o,u=u*m+g*o,f=f*m+v*o}else{c=c*m+h*o,l=l*m+p*o,u=u*m+g*o,f=f*m+v*o;const y=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=y,l*=y,u*=y,f*=y}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],c=i[s+1],l=i[s+2],u=i[s+3],f=r[a],h=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+u*f+c*p-l*h,e[t+1]=c*g+u*h+l*f-o*p,e[t+2]=l*g+u*p+o*h-c*f,e[t+3]=u*g-o*f-c*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(s/2),f=o(r/2),h=c(i/2),p=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=h*u*f+l*p*g,this._y=l*p*f-h*u*g,this._z=l*u*g+h*p*f,this._w=l*u*f-h*p*g;break;case"YXZ":this._x=h*u*f+l*p*g,this._y=l*p*f-h*u*g,this._z=l*u*g-h*p*f,this._w=l*u*f+h*p*g;break;case"ZXY":this._x=h*u*f-l*p*g,this._y=l*p*f+h*u*g,this._z=l*u*g+h*p*f,this._w=l*u*f-h*p*g;break;case"ZYX":this._x=h*u*f-l*p*g,this._y=l*p*f+h*u*g,this._z=l*u*g-h*p*f,this._w=l*u*f+h*p*g;break;case"YZX":this._x=h*u*f+l*p*g,this._y=l*p*f+h*u*g,this._z=l*u*g-h*p*f,this._w=l*u*f-h*p*g;break;case"XZY":this._x=h*u*f-l*p*g,this._y=l*p*f-h*u*g,this._z=l*u*g+h*p*f,this._w=l*u*f+h*p*g;break;default:Ue("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],f=t[10],h=i+o+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(u-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qe(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-i*l,this._z=r*u+a*l+i*c-s*o,this._w=a*u-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const uh=class uh{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(mu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(mu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*i),u=2*(o*t-r*s),f=2*(r*i-a*t);return this.x=t+c*l+a*f-o*u,this.y=i+c*u+o*l-r*f,this.z=s+c*f+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Lc.copy(this).projectOnVector(e),this.sub(Lc)}reflect(e){return this.sub(Lc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};uh.prototype.isVector3=!0;let k=uh;const Lc=new k,mu=new os,dh=class dh{constructor(e,t,i,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l)}set(e,t,i,s,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],f=i[7],h=i[2],p=i[5],g=i[8],v=s[0],d=s[3],m=s[6],y=s[1],b=s[4],S=s[7],A=s[2],E=s[5],C=s[8];return r[0]=a*v+o*y+c*A,r[3]=a*d+o*b+c*E,r[6]=a*m+o*S+c*C,r[1]=l*v+u*y+f*A,r[4]=l*d+u*b+f*E,r[7]=l*m+u*S+f*C,r[2]=h*v+p*y+g*A,r[5]=h*d+p*b+g*E,r[8]=h*m+p*S+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-i*r*u+i*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=u*a-o*l,h=o*c-u*r,p=l*r-a*c,g=t*f+i*h+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=f*v,e[1]=(s*l-u*i)*v,e[2]=(o*i-s*a)*v,e[3]=h*v,e[4]=(u*t-s*c)*v,e[5]=(s*r-o*t)*v,e[6]=p*v,e[7]=(i*c-l*t)*v,e[8]=(a*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return as("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Pc.makeScale(e,t)),this}rotate(e){return as("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Pc.makeRotation(-e)),this}translate(e,t){return as("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Pc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};dh.prototype.isMatrix3=!0;let We=dh;const Pc=new We,gu=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vu=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function tg(){const n={enabled:!0,workingColorSpace:Fr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===st&&(s.r=Yn(s.r),s.g=Yn(s.g),s.b=Yn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===st&&(s.r=cs(s.r),s.g=cs(s.g),s.b=cs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ci?Br:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return as("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return as("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Fr]:{primaries:e,whitePoint:i,transfer:Br,toXYZ:gu,fromXYZ:vu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:an},outputColorSpaceConfig:{drawingBufferColorSpace:an}},[an]:{primaries:e,whitePoint:i,transfer:st,toXYZ:gu,fromXYZ:vu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:an}}}),n}const $e=tg();function Yn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function cs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ls;class ng{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ls===void 0&&(ls=Gr("canvas")),ls.width=e.width,ls.height=e.height;const s=ls.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=ls}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Gr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Yn(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Yn(t[i]/255)*255):t[i]=Yn(t[i]);return{data:t,width:e.width,height:e.height}}else return Ue("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ig=0;class Dc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ig++}),this.uuid=Oi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ic(s[a].image)):r.push(Ic(s[a]))}else r=Ic(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Ic(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ng.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ue("Texture: Unable to serialize Texture."),{})}let sg=0;const Nc=new k;class Nt extends ki{constructor(e=Nt.DEFAULT_IMAGE,t=Nt.DEFAULT_MAPPING,i=Xn,s=Xn,r=Gt,a=Di,o=pn,c=rn,l=Nt.DEFAULT_ANISOTROPY,u=ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sg++}),this.uuid=Oi(),this.name="",this.source=new Dc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new le(0,0),this.repeat=new le(1,1),this.center=new le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Nc).x}get height(){return this.source.getSize(Nc).y}get depth(){return this.source.getSize(Nc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ue(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ue(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==nu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ys:e.x=e.x-Math.floor(e.x);break;case Xn:e.x=e.x<0?0:1;break;case Ho:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ys:e.y=e.y-Math.floor(e.y);break;case Xn:e.y=e.y<0?0:1;break;case Ho:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Nt.DEFAULT_IMAGE=null,Nt.DEFAULT_MAPPING=nu,Nt.DEFAULT_ANISOTROPY=1;const fh=class fh{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const c=e.elements,l=c[0],u=c[4],f=c[8],h=c[1],p=c[5],g=c[9],v=c[2],d=c[6],m=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-v)<.01&&Math.abs(g-d)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+v)<.1&&Math.abs(g+d)<.1&&Math.abs(l+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,S=(p+1)/2,A=(m+1)/2,E=(u+h)/4,C=(f+v)/4,_=(g+d)/4;return b>S&&b>A?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=E/i,r=C/i):S>A?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=E/s,r=_/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=C/r,s=_/r),this.set(i,s,r,t),this}let y=Math.sqrt((d-g)*(d-g)+(f-v)*(f-v)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(d-g)/y,this.y=(f-v)/y,this.z=(h-u)/y,this.w=Math.acos((l+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Qe(this.x,e.x,t.x),this.y=Qe(this.y,e.y,t.y),this.z=Qe(this.z,e.z,t.z),this.w=Qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Qe(this.x,e,t),this.y=Qe(this.y,e,t),this.z=Qe(this.z,e,t),this.w=Qe(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};fh.prototype.isVector4=!0;let at=fh;class rg extends ki{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Nt(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Gt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Dc(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vt extends rg{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class xu extends Nt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=It,this.minFilter=It,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ag extends Nt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=It,this.minFilter=It,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const qa=class qa{constructor(e,t,i,s,r,a,o,c,l,u,f,h,p,g,v,d){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l,u,f,h,p,g,v,d)}set(e,t,i,s,r,a,o,c,l,u,f,h,p,g,v,d){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=u,m[10]=f,m[14]=h,m[3]=p,m[7]=g,m[11]=v,m[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qa().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/hs.setFromMatrixColumn(e,0).length(),r=1/hs.setFromMatrixColumn(e,1).length(),a=1/hs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const h=a*u,p=a*f,g=o*u,v=o*f;t[0]=c*u,t[4]=-c*f,t[8]=l,t[1]=p+g*l,t[5]=h-v*l,t[9]=-o*c,t[2]=v-h*l,t[6]=g+p*l,t[10]=a*c}else if(e.order==="YXZ"){const h=c*u,p=c*f,g=l*u,v=l*f;t[0]=h+v*o,t[4]=g*o-p,t[8]=a*l,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=p*o-g,t[6]=v+h*o,t[10]=a*c}else if(e.order==="ZXY"){const h=c*u,p=c*f,g=l*u,v=l*f;t[0]=h-v*o,t[4]=-a*f,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*u,t[9]=v-h*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const h=a*u,p=a*f,g=o*u,v=o*f;t[0]=c*u,t[4]=g*l-p,t[8]=h*l+v,t[1]=c*f,t[5]=v*l+h,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const h=a*c,p=a*l,g=o*c,v=o*l;t[0]=c*u,t[4]=v-h*f,t[8]=g*f+p,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=p*f+g,t[10]=h-v*f}else if(e.order==="XZY"){const h=a*c,p=a*l,g=o*c,v=o*l;t[0]=c*u,t[4]=-f,t[8]=l*u,t[1]=h*f+v,t[5]=a*u,t[9]=p*f-g,t[2]=g*f-p,t[6]=o*u,t[10]=v*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(og,e,cg)}lookAt(e,t,i){const s=this.elements;return on.subVectors(e,t),on.lengthSq()===0&&(on.z=1),on.normalize(),li.crossVectors(i,on),li.lengthSq()===0&&(Math.abs(i.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),li.crossVectors(i,on)),li.normalize(),zr.crossVectors(on,li),s[0]=li.x,s[4]=zr.x,s[8]=on.x,s[1]=li.y,s[5]=zr.y,s[9]=on.y,s[2]=li.z,s[6]=zr.z,s[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],f=i[5],h=i[9],p=i[13],g=i[2],v=i[6],d=i[10],m=i[14],y=i[3],b=i[7],S=i[11],A=i[15],E=s[0],C=s[4],_=s[8],T=s[12],N=s[1],I=s[5],F=s[9],J=s[13],q=s[2],H=s[6],Z=s[10],K=s[14],te=s[3],re=s[7],ue=s[11],Se=s[15];return r[0]=a*E+o*N+c*q+l*te,r[4]=a*C+o*I+c*H+l*re,r[8]=a*_+o*F+c*Z+l*ue,r[12]=a*T+o*J+c*K+l*Se,r[1]=u*E+f*N+h*q+p*te,r[5]=u*C+f*I+h*H+p*re,r[9]=u*_+f*F+h*Z+p*ue,r[13]=u*T+f*J+h*K+p*Se,r[2]=g*E+v*N+d*q+m*te,r[6]=g*C+v*I+d*H+m*re,r[10]=g*_+v*F+d*Z+m*ue,r[14]=g*T+v*J+d*K+m*Se,r[3]=y*E+b*N+S*q+A*te,r[7]=y*C+b*I+S*H+A*re,r[11]=y*_+b*F+S*Z+A*ue,r[15]=y*T+b*J+S*K+A*Se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],f=e[6],h=e[10],p=e[14],g=e[3],v=e[7],d=e[11],m=e[15],y=c*p-l*h,b=o*p-l*f,S=o*h-c*f,A=a*p-l*u,E=a*h-c*u,C=a*f-o*u;return t*(v*y-d*b+m*S)-i*(g*y-d*A+m*E)+s*(g*b-v*A+m*C)-r*(g*S-v*E+d*C)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-i*(r*u-o*c)+s*(r*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=e[9],h=e[10],p=e[11],g=e[12],v=e[13],d=e[14],m=e[15],y=t*o-i*a,b=t*c-s*a,S=t*l-r*a,A=i*c-s*o,E=i*l-r*o,C=s*l-r*c,_=u*v-f*g,T=u*d-h*g,N=u*m-p*g,I=f*d-h*v,F=f*m-p*v,J=h*m-p*d,q=y*J-b*F+S*I+A*N-E*T+C*_;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/q;return e[0]=(o*J-c*F+l*I)*H,e[1]=(s*F-i*J-r*I)*H,e[2]=(v*C-d*E+m*A)*H,e[3]=(h*E-f*C-p*A)*H,e[4]=(c*N-a*J-l*T)*H,e[5]=(t*J-s*N+r*T)*H,e[6]=(d*S-g*C-m*b)*H,e[7]=(u*C-h*S+p*b)*H,e[8]=(a*F-o*N+l*_)*H,e[9]=(i*N-t*F-r*_)*H,e[10]=(g*E-v*S+m*y)*H,e[11]=(f*S-u*E-p*y)*H,e[12]=(o*T-a*I-c*_)*H,e[13]=(t*I-i*T+s*_)*H,e[14]=(v*b-g*A-d*y)*H,e[15]=(u*A-f*b+h*y)*H,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+i,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,f=o+o,h=r*l,p=r*u,g=r*f,v=a*u,d=a*f,m=o*f,y=c*l,b=c*u,S=c*f,A=i.x,E=i.y,C=i.z;return s[0]=(1-(v+m))*A,s[1]=(p+S)*A,s[2]=(g-b)*A,s[3]=0,s[4]=(p-S)*E,s[5]=(1-(h+m))*E,s[6]=(d+y)*E,s[7]=0,s[8]=(g+b)*C,s[9]=(d-y)*C,s[10]=(1-(h+v))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=hs.set(s[0],s[1],s[2]).length();const o=hs.set(s[4],s[5],s[6]).length(),c=hs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),_n.copy(this);const l=1/a,u=1/o,f=1/c;return _n.elements[0]*=l,_n.elements[1]*=l,_n.elements[2]*=l,_n.elements[4]*=u,_n.elements[5]*=u,_n.elements[6]*=u,_n.elements[8]*=f,_n.elements[9]*=f,_n.elements[10]*=f,t.setFromRotationMatrix(_n),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,s,r,a,o=In,c=!1){const l=this.elements,u=2*r/(t-e),f=2*r/(i-s),h=(t+e)/(t-e),p=(i+s)/(i-s);let g,v;if(c)g=r/(a-r),v=a*r/(a-r);else if(o===In)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Zs)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=In,c=!1){const l=this.elements,u=2/(t-e),f=2/(i-s),h=-(t+e)/(t-e),p=-(i+s)/(i-s);let g,v;if(c)g=1/(a-r),v=a/(a-r);else if(o===In)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===Zs)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};qa.prototype.isMatrix4=!0;let et=qa;const hs=new k,_n=new et,og=new k(0,0,0),cg=new k(1,1,1),li=new k,zr=new k,on=new k,_u=new et,Su=new os;class qn{constructor(e=0,t=0,i=0,s=qn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],f=s[2],h=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Qe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Qe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ue("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return _u.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_u,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Su.setFromEuler(this),this.setFromQuaternion(Su,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qn.DEFAULT_ORDER="XYZ";class Mu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let lg=0;const yu=new k,us=new os,Jn=new et,Vr=new k,js=new k,hg=new k,ug=new os,bu=new k(1,0,0),Eu=new k(0,1,0),Au=new k(0,0,1),Tu={type:"added"},dg={type:"removed"},ds={type:"childadded",child:null},kc={type:"childremoved",child:null};class Mt extends ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:lg++}),this.uuid=Oi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mt.DEFAULT_UP.clone();const e=new k,t=new qn,i=new os,s=new k(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new et},normalMatrix:{value:new We}}),this.matrix=new et,this.matrixWorld=new et,this.matrixAutoUpdate=Mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Mu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return us.setFromAxisAngle(e,t),this.quaternion.multiply(us),this}rotateOnWorldAxis(e,t){return us.setFromAxisAngle(e,t),this.quaternion.premultiply(us),this}rotateX(e){return this.rotateOnAxis(bu,e)}rotateY(e){return this.rotateOnAxis(Eu,e)}rotateZ(e){return this.rotateOnAxis(Au,e)}translateOnAxis(e,t){return yu.copy(e).applyQuaternion(this.quaternion),this.position.add(yu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(bu,e)}translateY(e){return this.translateOnAxis(Eu,e)}translateZ(e){return this.translateOnAxis(Au,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Jn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Vr.copy(e):Vr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),js.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jn.lookAt(js,Vr,this.up):Jn.lookAt(Vr,js,this.up),this.quaternion.setFromRotationMatrix(Jn),s&&(Jn.extractRotation(s.matrixWorld),us.setFromRotationMatrix(Jn),this.quaternion.premultiply(us.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(nt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Tu),ds.child=e,this.dispatchEvent(ds),ds.child=null):nt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(dg),kc.child=e,this.dispatchEvent(kc),kc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Jn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Tu),ds.child=e,this.dispatchEvent(ds),ds.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,e,hg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(js,ug,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];r(e.shapes,f)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Mt.DEFAULT_UP=new k(0,1,0),Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0,Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class fs extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const fg={type:"move"};class Oc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const d=t.getJointPose(v,i),m=this._getHandJoint(l,v);d!==null&&(m.matrix.fromArray(d.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=d.radius),m.visible=d!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,g=.005;l.inputState.pinching&&h>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(fg)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new fs;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const wu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hi={h:0,s:0,l:0},Wr={h:0,s:0,l:0};function Uc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ve{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=an){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=$e.workingColorSpace){if(e=eg(e,1),t=Qe(t,0,1),i=Qe(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Uc(a,r,e+1/3),this.g=Uc(a,r,e),this.b=Uc(a,r,e-1/3)}return $e.colorSpaceToWorking(this,s),this}setStyle(e,t=an){function i(r){r!==void 0&&parseFloat(r)<1&&Ue("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ue("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ue("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=an){const i=wu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ue("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Yn(e.r),this.g=Yn(e.g),this.b=Yn(e.b),this}copyLinearToSRGB(e){return this.r=cs(e.r),this.g=cs(e.g),this.b=cs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=an){return $e.workingToColorSpace(Wt.copy(this),e),Math.round(Qe(Wt.r*255,0,255))*65536+Math.round(Qe(Wt.g*255,0,255))*256+Math.round(Qe(Wt.b*255,0,255))}getHexString(e=an){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.workingToColorSpace(Wt.copy(this),t);const i=Wt.r,s=Wt.g,r=Wt.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=u<=.5?f/(a+o):f/(2-a-o),a){case i:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-i)/f+2;break;case r:c=(i-s)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=$e.workingColorSpace){return $e.workingToColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=an){$e.workingToColorSpace(Wt.copy(this),e);const t=Wt.r,i=Wt.g,s=Wt.b;return e!==an?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(hi),this.setHSL(hi.h+e,hi.s+t,hi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(hi),e.getHSL(Wr);const i=Cc(hi.h,Wr.h,t),s=Cc(hi.s,Wr.s,t),r=Cc(hi.l,Wr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new Ve;Ve.NAMES=wu;class Fc{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ve(e),this.near=t,this.far=i}clone(){return new Fc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ru extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qn,this.environmentIntensity=1,this.environmentRotation=new qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Sn=new k,Zn=new k,Bc=new k,Qn=new k,ps=new k,ms=new k,Cu=new k,Gc=new k,Hc=new k,zc=new k,Vc=new at,Wc=new at,Xc=new at;class Mn{constructor(e=new k,t=new k,i=new k){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Sn.subVectors(e,t),s.cross(Sn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Sn.subVectors(s,t),Zn.subVectors(i,t),Bc.subVectors(e,t);const a=Sn.dot(Sn),o=Sn.dot(Zn),c=Sn.dot(Bc),l=Zn.dot(Zn),u=Zn.dot(Bc),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;const h=1/f,p=(l*c-o*u)*h,g=(a*u-o*c)*h;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Qn)===null?!1:Qn.x>=0&&Qn.y>=0&&Qn.x+Qn.y<=1}static getInterpolation(e,t,i,s,r,a,o,c){return this.getBarycoord(e,t,i,s,Qn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Qn.x),c.addScaledVector(a,Qn.y),c.addScaledVector(o,Qn.z),c)}static getInterpolatedAttribute(e,t,i,s,r,a){return Vc.setScalar(0),Wc.setScalar(0),Xc.setScalar(0),Vc.fromBufferAttribute(e,t),Wc.fromBufferAttribute(e,i),Xc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Vc,r.x),a.addScaledVector(Wc,r.y),a.addScaledVector(Xc,r.z),a}static isFrontFacing(e,t,i,s){return Sn.subVectors(i,t),Zn.subVectors(e,t),Sn.cross(Zn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Sn.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),Sn.cross(Zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Mn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;ps.subVectors(s,i),ms.subVectors(r,i),Gc.subVectors(e,i);const c=ps.dot(Gc),l=ms.dot(Gc);if(c<=0&&l<=0)return t.copy(i);Hc.subVectors(e,s);const u=ps.dot(Hc),f=ms.dot(Hc);if(u>=0&&f<=u)return t.copy(s);const h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(i).addScaledVector(ps,a);zc.subVectors(e,r);const p=ps.dot(zc),g=ms.dot(zc);if(g>=0&&p<=g)return t.copy(r);const v=p*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(ms,o);const d=u*g-p*f;if(d<=0&&f-u>=0&&p-g>=0)return Cu.subVectors(r,s),o=(f-u)/(f-u+(p-g)),t.copy(s).addScaledVector(Cu,o);const m=1/(d+v+h);return a=v*m,o=h*m,t.copy(i).addScaledVector(ps,a).addScaledVector(ms,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ui{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,yn):yn.fromBufferAttribute(r,a),yn.applyMatrix4(e.matrixWorld),this.expandByPoint(yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Xr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Xr.copy(i.boundingBox)),Xr.applyMatrix4(e.matrixWorld),this.union(Xr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,yn),yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter($s),Kr.subVectors(this.max,$s),gs.subVectors(e.a,$s),vs.subVectors(e.b,$s),xs.subVectors(e.c,$s),di.subVectors(vs,gs),fi.subVectors(xs,vs),Ui.subVectors(gs,xs);let t=[0,-di.z,di.y,0,-fi.z,fi.y,0,-Ui.z,Ui.y,di.z,0,-di.x,fi.z,0,-fi.x,Ui.z,0,-Ui.x,-di.y,di.x,0,-fi.y,fi.x,0,-Ui.y,Ui.x,0];return!Kc(t,gs,vs,xs,Kr)||(t=[1,0,0,0,1,0,0,0,1],!Kc(t,gs,vs,xs,Kr))?!1:(Yr.crossVectors(di,fi),t=[Yr.x,Yr.y,Yr.z],Kc(t,gs,vs,xs,Kr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const jn=[new k,new k,new k,new k,new k,new k,new k,new k],yn=new k,Xr=new ui,gs=new k,vs=new k,xs=new k,di=new k,fi=new k,Ui=new k,$s=new k,Kr=new k,Yr=new k,Fi=new k;function Kc(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Fi.fromArray(n,r);const o=s.x*Math.abs(Fi.x)+s.y*Math.abs(Fi.y)+s.z*Math.abs(Fi.z),c=e.dot(Fi),l=t.dot(Fi),u=i.dot(Fi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Lt=new k,qr=new le;let pg=0;class mn extends ki{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:pg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=hu,this.updateRanges=[],this.gpuType=fn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)qr.fromBufferAttribute(this,t),qr.applyMatrix3(e),this.setXY(t,qr.x,qr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Qs(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=en(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Qs(t,this.array)),t}setX(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Qs(t,this.array)),t}setY(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Qs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Qs(t,this.array)),t}setW(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),i=en(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),i=en(i,this.array),s=en(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),i=en(i,this.array),s=en(s,this.array),r=en(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==hu&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Yc extends mn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Lu extends mn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class lt extends mn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const mg=new ui,er=new k,qc=new k;class pi{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):mg.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;er.subVectors(e,this.center);const t=er.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(er,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(qc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(er.copy(e.center).add(qc)),this.expandByPoint(er.copy(e.center).sub(qc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let gg=0;const gn=new et,Jc=new Mt,_s=new k,cn=new ui,tr=new ui,Bt=new k;class Ht extends ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gg++}),this.uuid=Oi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Zm(e)?Lu:Yc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new We().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return gn.makeRotationFromQuaternion(e),this.applyMatrix4(gn),this}rotateX(e){return gn.makeRotationX(e),this.applyMatrix4(gn),this}rotateY(e){return gn.makeRotationY(e),this.applyMatrix4(gn),this}rotateZ(e){return gn.makeRotationZ(e),this.applyMatrix4(gn),this}translate(e,t,i){return gn.makeTranslation(e,t,i),this.applyMatrix4(gn),this}scale(e,t,i){return gn.makeScale(e,t,i),this.applyMatrix4(gn),this}lookAt(e){return Jc.lookAt(e),Jc.updateMatrix(),this.applyMatrix4(Jc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_s).negate(),this.translate(_s.x,_s.y,_s.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new lt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ue("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ui);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&nt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){const i=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];tr.setFromBufferAttribute(o),this.morphTargetsRelative?(Bt.addVectors(cn.min,tr.min),cn.expandByPoint(Bt),Bt.addVectors(cn.max,tr.max),cn.expandByPoint(Bt)):(cn.expandByPoint(tr.min),cn.expandByPoint(tr.max))}cn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Bt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Bt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Bt.fromBufferAttribute(o,l),c&&(_s.fromBufferAttribute(e,l),Bt.add(_s)),s=Math.max(s,i.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&nt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){nt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new mn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let _=0;_<i.count;_++)o[_]=new k,c[_]=new k;const l=new k,u=new k,f=new k,h=new le,p=new le,g=new le,v=new k,d=new k;function m(_,T,N){l.fromBufferAttribute(i,_),u.fromBufferAttribute(i,T),f.fromBufferAttribute(i,N),h.fromBufferAttribute(r,_),p.fromBufferAttribute(r,T),g.fromBufferAttribute(r,N),u.sub(l),f.sub(l),p.sub(h),g.sub(h);const I=1/(p.x*g.y-g.x*p.y);isFinite(I)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(I),d.copy(f).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(I),o[_].add(v),o[T].add(v),o[N].add(v),c[_].add(d),c[T].add(d),c[N].add(d))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let _=0,T=y.length;_<T;++_){const N=y[_],I=N.start,F=N.count;for(let J=I,q=I+F;J<q;J+=3)m(e.getX(J+0),e.getX(J+1),e.getX(J+2))}const b=new k,S=new k,A=new k,E=new k;function C(_){A.fromBufferAttribute(s,_),E.copy(A);const T=o[_];b.copy(T),b.sub(A.multiplyScalar(A.dot(T))).normalize(),S.crossVectors(E,T);const I=S.dot(c[_])<0?-1:1;a.setXYZW(_,b.x,b.y,b.z,I)}for(let _=0,T=y.length;_<T;++_){const N=y[_],I=N.start,F=N.count;for(let J=I,q=I+F;J<q;J+=3)C(e.getX(J+0)),C(e.getX(J+1)),C(e.getX(J+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new mn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const s=new k,r=new k,a=new k,o=new k,c=new k,l=new k,u=new k,f=new k;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),v=e.getX(h+1),d=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,d),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,d),o.add(u),c.add(u),l.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(d,l.x,l.y,l.z)}else for(let h=0,p=t.count;h<p;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Bt.fromBufferAttribute(e,t),Bt.normalize(),e.setXYZ(t,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,f=o.normalized,h=new l.constructor(c.length*u);let p=0,g=0;for(let v=0,d=c.length;v<d;v++){o.isInterleavedBufferAttribute?p=c[v]*o.data.stride+o.offset:p=c[v]*u;for(let m=0;m<u;m++)h[g++]=l[p++]}return new mn(h,u,f)}if(this.index===null)return Ue("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ht,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,i);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,f=l.length;u<f;u++){const h=l[u],p=e(h,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){const p=l[f];u.push(p.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],f=r[l];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let vg=0;class Bi extends ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:vg++}),this.uuid=Oi(),this.name="",this.type="Material",this.blending=ns,this.side=oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bo,this.blendDst=Eo,this.blendEquation=Li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ve(0,0,0),this.blendAlpha=0,this.depthFunc=is,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=lu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=rs,this.stencilZFail=rs,this.stencilZPass=rs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ue(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Ue(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ns&&(i.blending=this.blending),this.side!==oi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==bo&&(i.blendSrc=this.blendSrc),this.blendDst!==Eo&&(i.blendDst=this.blendDst),this.blendEquation!==Li&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==is&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==lu&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==rs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==rs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==rs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ve().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new le().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new le().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const $n=new k,Zc=new k,Jr=new k,mi=new k,Qc=new k,Zr=new k,jc=new k;class $c{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,$n)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=$n.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):($n.copy(this.origin).addScaledVector(this.direction,t),$n.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Zc.copy(e).add(t).multiplyScalar(.5),Jr.copy(t).sub(e).normalize(),mi.copy(this.origin).sub(Zc);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Jr),o=mi.dot(this.direction),c=-mi.dot(Jr),l=mi.lengthSq(),u=Math.abs(1-a*a);let f,h,p,g;if(u>0)if(f=a*c-o,h=a*o-c,g=r*u,f>=0)if(h>=-g)if(h<=g){const v=1/u;f*=v,h*=v,p=f*(f+a*h+2*o)+h*(a*f+h+2*c)+l}else h=r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*c)+l;else h=-r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*c)+l;else h<=-g?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-c),r),p=-f*f+h*(h+2*c)+l):h<=g?(f=0,h=Math.min(Math.max(-r,-c),r),p=h*(h+2*c)+l):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-c),r),p=-f*f+h*(h+2*c)+l);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Zc).addScaledVector(Jr,h),p}intersectSphere(e,t){$n.subVectors(e.center,this.origin);const i=$n.dot(this.direction),s=$n.dot($n)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,s=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,s=(e.min.x-h.x)*l),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-h.z)*f,c=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,c=(e.min.z-h.z)*f),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,$n)!==null}intersectTriangle(e,t,i,s,r){Qc.subVectors(t,e),Zr.subVectors(i,e),jc.crossVectors(Qc,Zr);let a=this.direction.dot(jc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;mi.subVectors(this.origin,e);const c=o*this.direction.dot(Zr.crossVectors(mi,Zr));if(c<0)return null;const l=o*this.direction.dot(Qc.cross(mi));if(l<0||c+l>a)return null;const u=-o*mi.dot(jc);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qr extends Bi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=Do,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Pu=new et,Gi=new $c,jr=new pi,Du=new k,$r=new k,ea=new k,ta=new k,el=new k,na=new k,Iu=new k,ia=new k;class vt extends Mt{constructor(e=new Ht,t=new Qr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){na.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],f=r[c];u!==0&&(el.fromBufferAttribute(f,e),a?na.addScaledVector(el,u):na.addScaledVector(el.sub(t),u))}t.add(na)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),jr.copy(i.boundingSphere),jr.applyMatrix4(r),Gi.copy(e.ray).recast(e.near),!(jr.containsPoint(Gi.origin)===!1&&(Gi.intersectSphere(jr,Du)===null||Gi.origin.distanceToSquared(Du)>(e.far-e.near)**2))&&(Pu.copy(r).invert(),Gi.copy(e.ray).applyMatrix4(Pu),!(i.boundingBox!==null&&Gi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Gi)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const d=h[g],m=a[d.materialIndex],y=Math.max(d.start,p.start),b=Math.min(o.count,Math.min(d.start+d.count,p.start+p.count));for(let S=y,A=b;S<A;S+=3){const E=o.getX(S),C=o.getX(S+1),_=o.getX(S+2);s=sa(this,m,e,i,l,u,f,E,C,_),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=d.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let d=g,m=v;d<m;d+=3){const y=o.getX(d),b=o.getX(d+1),S=o.getX(d+2);s=sa(this,a,e,i,l,u,f,y,b,S),s&&(s.faceIndex=Math.floor(d/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,v=h.length;g<v;g++){const d=h[g],m=a[d.materialIndex],y=Math.max(d.start,p.start),b=Math.min(c.count,Math.min(d.start+d.count,p.start+p.count));for(let S=y,A=b;S<A;S+=3){const E=S,C=S+1,_=S+2;s=sa(this,m,e,i,l,u,f,E,C,_),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=d.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let d=g,m=v;d<m;d+=3){const y=d,b=d+1,S=d+2;s=sa(this,a,e,i,l,u,f,y,b,S),s&&(s.faceIndex=Math.floor(d/3),t.push(s))}}}}function xg(n,e,t,i,s,r,a,o){let c;if(e.side===Zt?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,e.side===oi,o),c===null)return null;ia.copy(o),ia.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(ia);return l<t.near||l>t.far?null:{distance:l,point:ia.clone(),object:n}}function sa(n,e,t,i,s,r,a,o,c,l){n.getVertexPosition(o,$r),n.getVertexPosition(c,ea),n.getVertexPosition(l,ta);const u=xg(n,e,t,i,$r,ea,ta,Iu);if(u){const f=new k;Mn.getBarycoord(Iu,$r,ea,ta,f),s&&(u.uv=Mn.getInterpolatedAttribute(s,o,c,l,f,new le)),r&&(u.uv1=Mn.getInterpolatedAttribute(r,o,c,l,f,new le)),a&&(u.normal=Mn.getInterpolatedAttribute(a,o,c,l,f,new k),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new k,materialIndex:0};Mn.getNormal($r,ea,ta,h.normal),u.face=h,u.barycoord=f}return u}const nr=new at,Nu=new at,ku=new at,_g=new at,Ou=new et,ra=new k,tl=new pi,Uu=new et,nl=new $c;class Sg extends vt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=tu,this.bindMatrix=new et,this.bindMatrixInverse=new et,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ui),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,ra),this.boundingBox.expandByPoint(ra)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new pi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,ra),this.boundingSphere.expandByPoint(ra)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),tl.copy(this.boundingSphere),tl.applyMatrix4(s),e.ray.intersectsSphere(tl)!==!1&&(Uu.copy(s).invert(),nl.copy(e.ray).applyMatrix4(Uu),!(this.boundingBox!==null&&nl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,nl)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new at,t=this.geometry.attributes.skinWeight;for(let i=0,s=t.count;i<s;i++){e.fromBufferAttribute(t,i);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===tu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Gm?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ue("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const i=this.skeleton,s=this.geometry;Nu.fromBufferAttribute(s.attributes.skinIndex,e),ku.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(nr.copy(t),t.set(0,0,0,0)):(nr.set(...t,1),t.set(0,0,0)),nr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){const a=ku.getComponent(r);if(a!==0){const o=Nu.getComponent(r);Ou.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(_g.copy(nr).applyMatrix4(Ou),a)}}return t.isVector4&&(t.w=nr.w),t.applyMatrix4(this.bindMatrixInverse)}}class Fu extends Mt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class il extends Nt{constructor(e=null,t=1,i=1,s,r,a,o,c,l=It,u=It,f,h){super(null,a,o,c,l,u,s,r,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Bu=new et,Mg=new et;class sl{constructor(e=[],t=[]){this.uuid=Oi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ue("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new et)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const i=new et;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,t=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:Mg;Bu.multiplyMatrices(o,t[r]),Bu.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new sl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const i=new il(t,e,e,pn,fn);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,s=e.bones.length;i<s;i++){const r=e.bones[i];let a=t[r];a===void 0&&(Ue("Skeleton: No bone found with UUID:",r),a=new Fu),this.bones.push(a),this.boneInverses.push(new et().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,i=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=i[s];e.boneInverses.push(o.toArray())}return e}}class Gu extends mn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ss=new et,Hu=new et,aa=[],zu=new ui,yg=new et,ir=new vt,sr=new pi;class bg extends vt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Gu(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,yg)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ui),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ss),zu.copy(e.boundingBox).applyMatrix4(Ss),this.boundingBox.union(zu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new pi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Ss),sr.copy(e.boundingSphere).applyMatrix4(Ss),this.boundingSphere.union(sr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(ir.geometry=this.geometry,ir.material=this.material,ir.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sr.copy(this.boundingSphere),sr.applyMatrix4(i),e.ray.intersectsSphere(sr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ss),Hu.multiplyMatrices(i,Ss),ir.matrixWorld=Hu,ir.raycast(e,aa);for(let a=0,o=aa.length;a<o;a++){const c=aa[a];c.instanceId=r,c.object=this,t.push(c)}aa.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Gu(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new il(new Float32Array(s*this.count),s,this.count,Ko,fn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<i.length;l++)a+=i[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(i,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const rl=new k,Eg=new k,Ag=new We;class Hi{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=rl.subVectors(i,t).cross(Eg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(rl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Ag.getNormalMatrix(e),s=this.coplanarPoint(rl).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zi=new pi,Tg=new le(.5,.5),oa=new k;class al{constructor(e=new Hi,t=new Hi,i=new Hi,s=new Hi,r=new Hi,a=new Hi){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=In,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],f=r[5],h=r[6],p=r[7],g=r[8],v=r[9],d=r[10],m=r[11],y=r[12],b=r[13],S=r[14],A=r[15];if(s[0].setComponents(l-a,p-u,m-g,A-y).normalize(),s[1].setComponents(l+a,p+u,m+g,A+y).normalize(),s[2].setComponents(l+o,p+f,m+v,A+b).normalize(),s[3].setComponents(l-o,p-f,m-v,A-b).normalize(),i)s[4].setComponents(c,h,d,S).normalize(),s[5].setComponents(l-c,p-h,m-d,A-S).normalize();else if(s[4].setComponents(l-c,p-h,m-d,A-S).normalize(),t===In)s[5].setComponents(l+c,p+h,m+d,A+S).normalize();else if(t===Zs)s[5].setComponents(c,h,d,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),zi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),zi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(zi)}intersectsSprite(e){zi.center.set(0,0,0);const t=Tg.distanceTo(e.center);return zi.radius=.7071067811865476+t,zi.applyMatrix4(e.matrixWorld),this.intersectsSphere(zi)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(oa.x=s.normal.x>0?e.max.x:e.min.x,oa.y=s.normal.y>0?e.max.y:e.min.y,oa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(oa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ol extends Bi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ve(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ca=new k,la=new k,Vu=new et,rr=new $c,ha=new pi,cl=new k,Wu=new k;class wg extends Mt{constructor(e=new Ht,t=new ol){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)ca.fromBufferAttribute(t,s-1),la.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=ca.distanceTo(la);e.setAttribute("lineDistance",new lt(i,1))}else Ue("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ha.copy(i.boundingSphere),ha.applyMatrix4(s),ha.radius+=r,e.ray.intersectsSphere(ha)===!1)return;Vu.copy(s).invert(),rr.copy(e.ray).applyMatrix4(Vu);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=p,d=g-1;v<d;v+=l){const m=u.getX(v),y=u.getX(v+1),b=ua(this,e,rr,c,m,y,v);b&&t.push(b)}if(this.isLineLoop){const v=u.getX(g-1),d=u.getX(p),m=ua(this,e,rr,c,v,d,g-1);m&&t.push(m)}}else{const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=p,d=g-1;v<d;v+=l){const m=ua(this,e,rr,c,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){const v=ua(this,e,rr,c,g-1,p,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ua(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(ca.fromBufferAttribute(o,s),la.fromBufferAttribute(o,r),t.distanceSqToSegment(ca,la,cl,Wu)>i)return;cl.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(cl);if(!(l<e.near||l>e.far))return{distance:l,point:Wu.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const Xu=new k,Ku=new k;class Yu extends wg{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)Xu.fromBufferAttribute(t,s),Ku.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Xu.distanceTo(Ku);e.setAttribute("lineDistance",new lt(i,1))}else Ue("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class qu extends Nt{constructor(e=[],t=Pi,i,s,r,a,o,c,l,u){super(e,t,i,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Rg extends Nt{constructor(e,t,i,s,r,a,o,c,l){super(e,t,i,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ms extends Nt{constructor(e,t,i=Dn,s,r,a,o=It,c=It,l,u=Kn,f=1){if(u!==Kn&&u!==Ii)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:f};super(h,s,r,a,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Dc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Cg extends Ms{constructor(e,t=Dn,i=Pi,s,r,a=It,o=It,c,l=Kn){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,s,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Ju extends Nt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ys extends Ht{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],f=[];let h=0,p=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new lt(l,3)),this.setAttribute("normal",new lt(u,3)),this.setAttribute("uv",new lt(f,2));function g(v,d,m,y,b,S,A,E,C,_,T){const N=S/C,I=A/_,F=S/2,J=A/2,q=E/2,H=C+1,Z=_+1;let K=0,te=0;const re=new k;for(let ue=0;ue<Z;ue++){const Se=ue*I-J;for(let Ae=0;Ae<H;Ae++){const tt=Ae*N-F;re[v]=tt*y,re[d]=Se*b,re[m]=q,l.push(re.x,re.y,re.z),re[v]=0,re[d]=0,re[m]=E>0?1:-1,u.push(re.x,re.y,re.z),f.push(Ae/C),f.push(1-ue/_),K+=1}}for(let ue=0;ue<_;ue++)for(let Se=0;Se<C;Se++){const Ae=h+Se+H*ue,tt=h+Se+H*(ue+1),gt=h+(Se+1)+H*(ue+1),L=h+(Se+1)+H*ue;c.push(Ae,tt,L),c.push(tt,gt,L),te+=6}o.addGroup(p,te,T),p+=te,h+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ys(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class da extends Ht{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],h=[],p=[];let g=0;const v=[],d=i/2;let m=0;y(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new lt(f,3)),this.setAttribute("normal",new lt(h,3)),this.setAttribute("uv",new lt(p,2));function y(){const S=new k,A=new k;let E=0;const C=(t-e)/i;for(let _=0;_<=r;_++){const T=[],N=_/r,I=N*(t-e)+e;for(let F=0;F<=s;F++){const J=F/s,q=J*c+o,H=Math.sin(q),Z=Math.cos(q);A.x=I*H,A.y=-N*i+d,A.z=I*Z,f.push(A.x,A.y,A.z),S.set(H,C,Z).normalize(),h.push(S.x,S.y,S.z),p.push(J,1-N),T.push(g++)}v.push(T)}for(let _=0;_<s;_++)for(let T=0;T<r;T++){const N=v[T][_],I=v[T+1][_],F=v[T+1][_+1],J=v[T][_+1];(e>0||T!==0)&&(u.push(N,I,J),E+=3),(t>0||T!==r-1)&&(u.push(I,F,J),E+=3)}l.addGroup(m,E,0),m+=E}function b(S){const A=g,E=new le,C=new k;let _=0;const T=S===!0?e:t,N=S===!0?1:-1;for(let F=1;F<=s;F++)f.push(0,d*N,0),h.push(0,N,0),p.push(.5,.5),g++;const I=g;for(let F=0;F<=s;F++){const q=F/s*c+o,H=Math.cos(q),Z=Math.sin(q);C.x=T*Z,C.y=d*N,C.z=T*H,f.push(C.x,C.y,C.z),h.push(0,N,0),E.x=H*.5+.5,E.y=Z*.5*N+.5,p.push(E.x,E.y),g++}for(let F=0;F<s;F++){const J=A+F,q=I+F;S===!0?u.push(q,q+1,J):u.push(q+1,q,J),_+=3}l.addGroup(m,_,S===!0?1:2),m+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new da(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Nn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ue("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let s=0;const r=i.length;let a;t?a=t:a=e*i[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=i[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===a)return s/(r-1);const u=i[s],h=i[s+1]-u,p=(a-u)/h;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new le:new k);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new k,s=[],r=[],a=[],o=new k,c=new et;for(let p=0;p<=e;p++){const g=p/e;s[p]=this.getTangentAt(g,new k)}r[0]=new k,a[0]=new k;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),f=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=l&&(l=u,i.set(1,0,0)),f<=l&&(l=f,i.set(0,1,0)),h<=l&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Qe(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(o,g))}a[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(Qe(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(p=-p);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],p*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ll extends Nn{constructor(e=0,t=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new le){const i=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=c-this.aX,p=l-this.aY;c=h*u-p*f+this.aX,l=h*f+p*u+this.aY}return i.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Lg extends ll{constructor(e,t,i,s,r,a){super(e,t,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function hl(){let n=0,e=0,t=0,i=0;function s(r,a,o,c){n=r,e=o,t=-3*r+3*a-2*o-c,i=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,f){let h=(a-r)/l-(o-r)/(l+u)+(o-a)/u,p=(o-a)/u-(c-a)/(u+f)+(c-o)/f;h*=u,p*=u,s(a,o,h,p)},calc:function(r){const a=r*r,o=a*r;return n+e*r+t*a+i*o}}}const Zu=new k,Qu=new k,ul=new hl,dl=new hl,fl=new hl;class Pg extends Nn{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new k){const i=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=s[(o-1)%r]:(Qu.subVectors(s[0],s[1]).add(s[0]),l=Qu);const f=s[o%r],h=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(Zu.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Zu),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(f),p),v=Math.pow(f.distanceToSquared(h),p),d=Math.pow(h.distanceToSquared(u),p);v<1e-4&&(v=1),g<1e-4&&(g=v),d<1e-4&&(d=v),ul.initNonuniformCatmullRom(l.x,f.x,h.x,u.x,g,v,d),dl.initNonuniformCatmullRom(l.y,f.y,h.y,u.y,g,v,d),fl.initNonuniformCatmullRom(l.z,f.z,h.z,u.z,g,v,d)}else this.curveType==="catmullrom"&&(ul.initCatmullRom(l.x,f.x,h.x,u.x,this.tension),dl.initCatmullRom(l.y,f.y,h.y,u.y,this.tension),fl.initCatmullRom(l.z,f.z,h.z,u.z,this.tension));return i.set(ul.calc(c),dl.calc(c),fl.calc(c)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new k().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ju(n,e,t,i,s){const r=(i-e)*.5,a=(s-t)*.5,o=n*n,c=n*o;return(2*t-2*i+r+a)*c+(-3*t+3*i-2*r-a)*o+r*n+t}function Dg(n,e){const t=1-n;return t*t*e}function Ig(n,e){return 2*(1-n)*n*e}function Ng(n,e){return n*n*e}function ar(n,e,t,i){return Dg(n,e)+Ig(n,t)+Ng(n,i)}function kg(n,e){const t=1-n;return t*t*t*e}function Og(n,e){const t=1-n;return 3*t*t*n*e}function Ug(n,e){return 3*(1-n)*n*n*e}function Fg(n,e){return n*n*n*e}function or(n,e,t,i,s){return kg(n,e)+Og(n,t)+Ug(n,i)+Fg(n,s)}class $u extends Nn{constructor(e=new le,t=new le,i=new le,s=new le){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new le){const i=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(or(e,s.x,r.x,a.x,o.x),or(e,s.y,r.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Bg extends Nn{constructor(e=new k,t=new k,i=new k,s=new k){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new k){const i=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(or(e,s.x,r.x,a.x,o.x),or(e,s.y,r.y,a.y,o.y),or(e,s.z,r.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ed extends Nn{constructor(e=new le,t=new le){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new le){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new le){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Gg extends Nn{constructor(e=new k,t=new k){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new k){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new k){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class td extends Nn{constructor(e=new le,t=new le,i=new le){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new le){const i=t,s=this.v0,r=this.v1,a=this.v2;return i.set(ar(e,s.x,r.x,a.x),ar(e,s.y,r.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Hg extends Nn{constructor(e=new k,t=new k,i=new k){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new k){const i=t,s=this.v0,r=this.v1,a=this.v2;return i.set(ar(e,s.x,r.x,a.x),ar(e,s.y,r.y,a.y),ar(e,s.z,r.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class nd extends Nn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new le){const i=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],u=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return i.set(ju(o,c.x,l.x,u.x,f.x),ju(o,c.y,l.y,u.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new le().fromArray(s))}return this}}var id=Object.freeze({__proto__:null,ArcCurve:Lg,CatmullRomCurve3:Pg,CubicBezierCurve:$u,CubicBezierCurve3:Bg,EllipseCurve:ll,LineCurve:ed,LineCurve3:Gg,QuadraticBezierCurve:td,QuadraticBezierCurve3:Hg,SplineCurve:nd});class zg extends Nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new id[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const a=s[r]-i,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(new id[s.type]().fromJSON(s))}return this}}class sd extends zg{constructor(e){super(),this.type="Path",this.currentPoint=new le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new ed(this.currentPoint.clone(),new le(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){const r=new td(this.currentPoint.clone(),new le(e,t),new le(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,r,a){const o=new $u(this.currentPoint.clone(),new le(e,t),new le(i,s),new le(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new nd(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,i,s,r,a),this}absarc(e,t,i,s,r,a){return this.absellipse(e,t,i,i,s,r,a),this}ellipse(e,t,i,s,r,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,i,s,r,a,o,c),this}absellipse(e,t,i,s,r,a,o,c){const l=new ll(e,t,i,s,r,a,o,c);if(this.curves.length>0){const f=l.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class rd extends sd{constructor(e){super(e),this.uuid=Oi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,s=this.holes.length;i<s;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(new sd().fromJSON(s))}return this}}function Vg(n,e,t=2){const i=e&&e.length,s=i?e[0]*t:n.length;let r=ad(n,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(i&&(r=qg(n,e,r,t)),n.length>80*t){o=n[0],c=n[1];let u=o,f=c;for(let h=t;h<s;h+=t){const p=n[h],g=n[h+1];p<o&&(o=p),g<c&&(c=g),p>u&&(u=p),g>f&&(f=g)}l=Math.max(u-o,f-c),l=l!==0?32767/l:0}return cr(r,a,t,o,c,l,0),a}function ad(n,e,t,i,s){let r;if(s===rv(n,e,t,i)>0)for(let a=e;a<t;a+=i)r=hd(a/i|0,n[a],n[a+1],r);else for(let a=t-i;a>=e;a-=i)r=hd(a/i|0,n[a],n[a+1],r);return r&&bs(r,r.next)&&(ur(r),r=r.next),r}function Vi(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(bs(t,t.next)||_t(t.prev,t,t.next)===0)){if(ur(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function cr(n,e,t,i,s,r,a){if(!n)return;!a&&r&&$g(n,i,s,r);let o=n;for(;n.prev!==n.next;){const c=n.prev,l=n.next;if(r?Xg(n,i,s,r):Wg(n)){e.push(c.i,n.i,l.i),ur(n),n=l.next,o=l.next;continue}if(n=l,n===o){a?a===1?(n=Kg(Vi(n),e),cr(n,e,t,i,s,r,2)):a===2&&Yg(n,e,t,i,s,r):cr(Vi(n),e,t,i,s,r,1);break}}}function Wg(n){const e=n.prev,t=n,i=n.next;if(_t(e,t,i)>=0)return!1;const s=e.x,r=t.x,a=i.x,o=e.y,c=t.y,l=i.y,u=Math.min(s,r,a),f=Math.min(o,c,l),h=Math.max(s,r,a),p=Math.max(o,c,l);let g=i.next;for(;g!==e;){if(g.x>=u&&g.x<=h&&g.y>=f&&g.y<=p&&lr(s,o,r,c,a,l,g.x,g.y)&&_t(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Xg(n,e,t,i){const s=n.prev,r=n,a=n.next;if(_t(s,r,a)>=0)return!1;const o=s.x,c=r.x,l=a.x,u=s.y,f=r.y,h=a.y,p=Math.min(o,c,l),g=Math.min(u,f,h),v=Math.max(o,c,l),d=Math.max(u,f,h),m=pl(p,g,e,t,i),y=pl(v,d,e,t,i);let b=n.prevZ,S=n.nextZ;for(;b&&b.z>=m&&S&&S.z<=y;){if(b.x>=p&&b.x<=v&&b.y>=g&&b.y<=d&&b!==s&&b!==a&&lr(o,u,c,f,l,h,b.x,b.y)&&_t(b.prev,b,b.next)>=0||(b=b.prevZ,S.x>=p&&S.x<=v&&S.y>=g&&S.y<=d&&S!==s&&S!==a&&lr(o,u,c,f,l,h,S.x,S.y)&&_t(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;b&&b.z>=m;){if(b.x>=p&&b.x<=v&&b.y>=g&&b.y<=d&&b!==s&&b!==a&&lr(o,u,c,f,l,h,b.x,b.y)&&_t(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;S&&S.z<=y;){if(S.x>=p&&S.x<=v&&S.y>=g&&S.y<=d&&S!==s&&S!==a&&lr(o,u,c,f,l,h,S.x,S.y)&&_t(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function Kg(n,e){let t=n;do{const i=t.prev,s=t.next.next;!bs(i,s)&&cd(i,t,t.next,s)&&hr(i,s)&&hr(s,i)&&(e.push(i.i,t.i,s.i),ur(t),ur(t.next),t=n=s),t=t.next}while(t!==n);return Vi(t)}function Yg(n,e,t,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&nv(a,o)){let c=ld(a,o);a=Vi(a,a.next),c=Vi(c,c.next),cr(a,e,t,i,s,r,0),cr(c,e,t,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function qg(n,e,t,i){const s=[];for(let r=0,a=e.length;r<a;r++){const o=e[r]*i,c=r<a-1?e[r+1]*i:n.length,l=ad(n,o,c,i,!1);l===l.next&&(l.steiner=!0),s.push(tv(l))}s.sort(Jg);for(let r=0;r<s.length;r++)t=Zg(s[r],t);return t}function Jg(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=i-s}return t}function Zg(n,e){const t=Qg(n,e);if(!t)return e;const i=ld(t,n);return Vi(i,i.next),Vi(t,t.next)}function Qg(n,e){let t=e;const i=n.x,s=n.y;let r=-1/0,a;if(bs(n,t))return t;do{if(bs(n,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const f=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=i&&f>r&&(r=f,a=t.x<t.next.x?t:t.next,f===i))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,c=a.x,l=a.y;let u=1/0;t=a;do{if(i>=t.x&&t.x>=c&&i!==t.x&&od(s<l?i:r,s,c,l,s<l?r:i,s,t.x,t.y)){const f=Math.abs(s-t.y)/(i-t.x);hr(t,n)&&(f<u||f===u&&(t.x>a.x||t.x===a.x&&jg(a,t)))&&(a=t,u=f)}t=t.next}while(t!==o);return a}function jg(n,e){return _t(n.prev,n,e.prev)<0&&_t(e.next,n,n.next)<0}function $g(n,e,t,i){let s=n;do s.z===0&&(s.z=pl(s.x,s.y,e,t,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,ev(s)}function ev(n){let e,t=1;do{let i=n,s;n=null;let r=null;for(e=0;i;){e++;let a=i,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||i.z<=a.z)?(s=i,i=i.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=a}r.nextZ=null,t*=2}while(e>1);return n}function pl(n,e,t,i,s){return n=(n-t)*s|0,e=(e-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function tv(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function od(n,e,t,i,s,r,a,o){return(s-a)*(e-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(i-o)}function lr(n,e,t,i,s,r,a,o){return!(n===a&&e===o)&&od(n,e,t,i,s,r,a,o)}function nv(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!iv(n,e)&&(hr(n,e)&&hr(e,n)&&sv(n,e)&&(_t(n.prev,n,e.prev)||_t(n,e.prev,e))||bs(n,e)&&_t(n.prev,n,n.next)>0&&_t(e.prev,e,e.next)>0)}function _t(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function bs(n,e){return n.x===e.x&&n.y===e.y}function cd(n,e,t,i){const s=pa(_t(n,e,t)),r=pa(_t(n,e,i)),a=pa(_t(t,i,n)),o=pa(_t(t,i,e));return!!(s!==r&&a!==o||s===0&&fa(n,t,e)||r===0&&fa(n,i,e)||a===0&&fa(t,n,i)||o===0&&fa(t,e,i))}function fa(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function pa(n){return n>0?1:n<0?-1:0}function iv(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&cd(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function hr(n,e){return _t(n.prev,n,n.next)<0?_t(n,e,n.next)>=0&&_t(n,n.prev,e)>=0:_t(n,e,n.prev)<0||_t(n,n.next,e)<0}function sv(n,e){let t=n,i=!1;const s=(n.x+e.x)/2,r=(n.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function ld(n,e){const t=ml(n.i,n.x,n.y),i=ml(e.i,e.x,e.y),s=n.next,r=e.prev;return n.next=e,e.prev=n,t.next=s,s.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function hd(n,e,t,i){const s=ml(n,e,t);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function ur(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function ml(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function rv(n,e,t,i){let s=0;for(let r=e,a=t-i;r<t;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}class av{static triangulate(e,t,i=2){return Vg(e,t,i)}}class dr{static area(e){const t=e.length;let i=0;for(let s=t-1,r=0;r<t;s=r++)i+=e[s].x*e[r].y-e[r].x*e[s].y;return i*.5}static isClockWise(e){return dr.area(e)<0}static triangulateShape(e,t){const i=[],s=[],r=[];ud(e),dd(i,e);let a=e.length;t.forEach(ud);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,dd(i,t[c]);const o=av.triangulate(i,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}}function ud(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function dd(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class ma extends Ht{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),c=Math.floor(s),l=o+1,u=c+1,f=e/o,h=t/c,p=[],g=[],v=[],d=[];for(let m=0;m<u;m++){const y=m*h-a;for(let b=0;b<l;b++){const S=b*f-r;g.push(S,-y,0),v.push(0,0,1),d.push(b/o),d.push(1-m/c)}}for(let m=0;m<c;m++)for(let y=0;y<o;y++){const b=y+l*m,S=y+l*(m+1),A=y+1+l*(m+1),E=y+1+l*m;p.push(b,S,E),p.push(S,A,E)}this.setIndex(p),this.setAttribute("position",new lt(g,3)),this.setAttribute("normal",new lt(v,3)),this.setAttribute("uv",new lt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ma(e.width,e.height,e.widthSegments,e.heightSegments)}}class gl extends Ht{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);const o=[],c=[],l=[],u=[];let f=e;const h=(t-e)/s,p=new k,g=new le;for(let v=0;v<=s;v++){for(let d=0;d<=i;d++){const m=r+d/i*a;p.x=f*Math.cos(m),p.y=f*Math.sin(m),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,u.push(g.x,g.y)}f+=h}for(let v=0;v<s;v++){const d=v*(i+1);for(let m=0;m<i;m++){const y=m+d,b=y,S=y+i+1,A=y+i+2,E=y+1;o.push(b,S,E),o.push(S,A,E)}}this.setIndex(o),this.setAttribute("position",new lt(c,3)),this.setAttribute("normal",new lt(l,3)),this.setAttribute("uv",new lt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gl(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class vl extends Ht{constructor(e=new rd([new le(0,.5),new le(-.5,-.5),new le(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],s=[],r=[],a=[];let o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let u=0;u<e.length;u++)l(e[u]),this.addGroup(o,c,u),o+=c,c=0;this.setIndex(i),this.setAttribute("position",new lt(s,3)),this.setAttribute("normal",new lt(r,3)),this.setAttribute("uv",new lt(a,2));function l(u){const f=s.length/3,h=u.extractPoints(t);let p=h.shape;const g=h.holes;dr.isClockWise(p)===!1&&(p=p.reverse());for(let d=0,m=g.length;d<m;d++){const y=g[d];dr.isClockWise(y)===!0&&(g[d]=y.reverse())}const v=dr.triangulateShape(p,g);for(let d=0,m=g.length;d<m;d++){const y=g[d];p=p.concat(y)}for(let d=0,m=p.length;d<m;d++){const y=p[d];s.push(y.x,y.y,0),r.push(0,0,1),a.push(y.x,y.y)}for(let d=0,m=v.length;d<m;d++){const y=v[d],b=y[0]+f,S=y[1]+f,A=y[2]+f;i.push(b,S,A),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return ov(t,e)}static fromJSON(e,t){const i=[];for(let s=0,r=e.shapes.length;s<r;s++){const a=t[e.shapes[s]];i.push(a)}return new vl(i,e.curveSegments)}}function ov(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const s=n[t];e.shapes.push(s.uuid)}else e.shapes.push(n.uuid);return e}function Es(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(fd(s))s.isRenderTargetTexture?(Ue("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(fd(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function jt(n){const e={};for(let t=0;t<n.length;t++){const i=Es(n[t]);for(const s in i)e[s]=i[s]}return e}function fd(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function cv(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function pd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const gi={clone:Es,merge:jt};var lv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class kt extends Bi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lv,this.fragmentShader=hv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Es(e.uniforms),this.uniformsGroups=cv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Ve().setHex(s.value);break;case"v2":this.uniforms[i].value=new le().fromArray(s.value);break;case"v3":this.uniforms[i].value=new k().fromArray(s.value);break;case"v4":this.uniforms[i].value=new at().fromArray(s.value);break;case"m3":this.uniforms[i].value=new We().fromArray(s.value);break;case"m4":this.uniforms[i].value=new et().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class md extends kt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ei extends Bi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ur,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gd extends ei{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new le(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Qe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ve(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ve(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ve(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class uv extends Bi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ur,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=Do,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class dv extends Bi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=zm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class fv extends Bi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ga extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class pv extends ga{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const xl=new et,vd=new k,xd=new k;class _l{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new le(512,512),this.mapType=rn,this.map=null,this.mapPass=null,this.matrix=new et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new al,this._frameExtents=new le(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;vd.setFromMatrixPosition(e.matrixWorld),t.position.copy(vd),xd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xd),t.updateMatrixWorld(),xl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xl,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Zs||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(xl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const va=new k,xa=new os,kn=new k;class _d extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new et,this.projectionMatrix=new et,this.projectionMatrixInverse=new et,this.coordinateSystem=In,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(va,xa,kn),kn.x===1&&kn.y===1&&kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,xa,kn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(va,xa,kn),kn.x===1&&kn.y===1&&kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(va,xa,kn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const vi=new k,Sd=new le,Md=new le;class tn extends _d{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Hr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Rc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Hr*2*Math.atan(Math.tan(Rc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(vi.x,vi.y).multiplyScalar(-e/vi.z),vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(vi.x,vi.y).multiplyScalar(-e/vi.z)}getViewSize(e,t){return this.getViewBounds(e,Sd,Md),t.subVectors(Md,Sd)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Rc*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class mv extends _l{constructor(){super(new tn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=Hr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class yd extends ga{constructor(e,t,i=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new mv}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class gv extends _l{constructor(){super(new tn(90,1,.5,500)),this.isPointLightShadow=!0}}class vv extends ga{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new gv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class _a extends _d{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class xv extends _l{constructor(){super(new _a(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class _v extends ga{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new xv}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const As=-90,Ts=1;class Sv extends Mt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new tn(As,Ts,e,t);s.layers=this.layers,this.add(s);const r=new tn(As,Ts,e,t);r.layers=this.layers,this.add(r);const a=new tn(As,Ts,e,t);a.layers=this.layers,this.add(a);const o=new tn(As,Ts,e,t);o.layers=this.layers,this.add(o);const c=new tn(As,Ts,e,t);c.layers=this.layers,this.add(c);const l=new tn(As,Ts,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===In)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Zs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let d=!1;e.isWebGLRenderer===!0?d=e.state.buffers.depth.getReversed():d=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,s),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),d&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,h,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Mv extends tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class yv{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=bv.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function bv(){this._document.hidden===!1&&this.reset()}const ph=class ph{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};ph.prototype.isMatrix2=!0;let bd=ph;function Ed(n,e,t,i){const s=Ev(i);switch(t){case ou:return n*e;case Ko:return n*e/s.components*s.byteLength;case Yo:return n*e/s.components*s.byteLength;case Ni:return n*e*2/s.components*s.byteLength;case qo:return n*e*2/s.components*s.byteLength;case cu:return n*e*3/s.components*s.byteLength;case pn:return n*e*4/s.components*s.byteLength;case Jo:return n*e*4/s.components*s.byteLength;case Pr:case Dr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ir:case Nr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Qo:case $o:return Math.max(n,16)*Math.max(e,8)/4;case Zo:case jo:return Math.max(n,8)*Math.max(e,8)/2;case ec:case tc:case ic:case sc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case nc:case kr:case rc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ac:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case oc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case cc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case lc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case hc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case uc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case dc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case fc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case pc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case mc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case gc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case vc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case xc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case _c:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Sc:case Mc:case yc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case bc:case Ec:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Or:case Ac:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ev(n){switch(n){case rn:case iu:return{byteLength:1,components:1};case qs:case su:case Qt:return{byteLength:2,components:1};case Wo:case Xo:return{byteLength:2,components:4};case Dn:case Vo:case fn:return{byteLength:4,components:1};case ru:case au:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Mo}})),typeof window<"u"&&(window.__THREE__?Ue("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Mo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ad(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Av(n){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,f=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,c,l){const u=c.array,f=c.updateRanges;if(n.bindBuffer(l,o),f.length===0)n.bufferSubData(l,0,u);else{f.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<f.length;p++){const g=f[h],v=f[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,f[h]=v)}f.length=h+1;for(let p=0,g=f.length;p<g;p++){const v=f[p];n.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Tv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Rv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Cv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Pv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Iv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Nv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,kv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ov=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Uv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Bv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Gv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Hv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,zv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Kv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Yv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,qv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Jv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Zv=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Qv=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,jv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$v=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ex=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,tx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,nx="gl_FragColor = linearToOutputTexel( gl_FragColor );",ix=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,sx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,rx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ax=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ox=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,cx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,lx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ux=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,dx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,px=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,mx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gx=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vx=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,xx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,_x=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Sx=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Mx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ex=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ax=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Tx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Rx=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Cx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Px=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ix=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Nx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ox=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ux=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Fx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Vx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Xx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Kx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Jx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Zx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$x=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,e_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,t_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,n_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,i_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,s_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,r_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,a_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,o_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,c_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,l_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,h_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,u_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,d_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,f_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,p_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,m_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,g_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,v_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,x_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,__=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,S_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,M_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,y_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,b_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,E_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,A_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const qe={alphahash_fragment:Tv,alphahash_pars_fragment:wv,alphamap_fragment:Rv,alphamap_pars_fragment:Cv,alphatest_fragment:Lv,alphatest_pars_fragment:Pv,aomap_fragment:Dv,aomap_pars_fragment:Iv,batching_pars_vertex:Nv,batching_vertex:kv,begin_vertex:Ov,beginnormal_vertex:Uv,bsdfs:Fv,iridescence_fragment:Bv,bumpmap_pars_fragment:Gv,clipping_planes_fragment:Hv,clipping_planes_pars_fragment:zv,clipping_planes_pars_vertex:Vv,clipping_planes_vertex:Wv,color_fragment:Xv,color_pars_fragment:Kv,color_pars_vertex:Yv,color_vertex:qv,common:Jv,cube_uv_reflection_fragment:Zv,defaultnormal_vertex:Qv,displacementmap_pars_vertex:jv,displacementmap_vertex:$v,emissivemap_fragment:ex,emissivemap_pars_fragment:tx,colorspace_fragment:nx,colorspace_pars_fragment:ix,envmap_fragment:sx,envmap_common_pars_fragment:rx,envmap_pars_fragment:ax,envmap_pars_vertex:ox,envmap_physical_pars_fragment:xx,envmap_vertex:cx,fog_vertex:lx,fog_pars_vertex:hx,fog_fragment:ux,fog_pars_fragment:dx,gradientmap_pars_fragment:fx,lightmap_pars_fragment:px,lights_lambert_fragment:mx,lights_lambert_pars_fragment:gx,lights_pars_begin:vx,lights_toon_fragment:_x,lights_toon_pars_fragment:Sx,lights_phong_fragment:Mx,lights_phong_pars_fragment:yx,lights_physical_fragment:bx,lights_physical_pars_fragment:Ex,lights_fragment_begin:Ax,lights_fragment_maps:Tx,lights_fragment_end:wx,lightprobes_pars_fragment:Rx,logdepthbuf_fragment:Cx,logdepthbuf_pars_fragment:Lx,logdepthbuf_pars_vertex:Px,logdepthbuf_vertex:Dx,map_fragment:Ix,map_pars_fragment:Nx,map_particle_fragment:kx,map_particle_pars_fragment:Ox,metalnessmap_fragment:Ux,metalnessmap_pars_fragment:Fx,morphinstance_vertex:Bx,morphcolor_vertex:Gx,morphnormal_vertex:Hx,morphtarget_pars_vertex:zx,morphtarget_vertex:Vx,normal_fragment_begin:Wx,normal_fragment_maps:Xx,normal_pars_fragment:Kx,normal_pars_vertex:Yx,normal_vertex:qx,normalmap_pars_fragment:Jx,clearcoat_normal_fragment_begin:Zx,clearcoat_normal_fragment_maps:Qx,clearcoat_pars_fragment:jx,iridescence_pars_fragment:$x,opaque_fragment:e_,packing:t_,premultiplied_alpha_fragment:n_,project_vertex:i_,dithering_fragment:s_,dithering_pars_fragment:r_,roughnessmap_fragment:a_,roughnessmap_pars_fragment:o_,shadowmap_pars_fragment:c_,shadowmap_pars_vertex:l_,shadowmap_vertex:h_,shadowmask_pars_fragment:u_,skinbase_vertex:d_,skinning_pars_vertex:f_,skinning_vertex:p_,skinnormal_vertex:m_,specularmap_fragment:g_,specularmap_pars_fragment:v_,tonemapping_fragment:x_,tonemapping_pars_fragment:__,transmission_fragment:S_,transmission_pars_fragment:M_,uv_pars_fragment:y_,uv_pars_vertex:b_,uv_vertex:E_,worldpos_vertex:A_,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},ve={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new k},probesMax:{value:new k},probesResolution:{value:new k}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},On={basic:{uniforms:jt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:jt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new Ve(0)},envMapIntensity:{value:1}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:jt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:jt([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:jt([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new Ve(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:jt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:jt([ve.points,ve.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:jt([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:jt([ve.common,ve.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:jt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:jt([ve.sprite,ve.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distance:{uniforms:jt([ve.common,ve.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distance_vert,fragmentShader:qe.distance_frag},shadow:{uniforms:jt([ve.lights,ve.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};On.physical={uniforms:jt([On.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const Sa={r:0,b:0,g:0},T_=new et,Td=new We;Td.set(-1,0,0,0,1,0,0,0,1);function w_(n,e,t,i,s,r){const a=new Ve(0);let o=s===!0?0:1,c,l,u=null,f=0,h=null;function p(y){let b=y.isScene===!0?y.background:null;if(b&&b.isTexture){const S=y.backgroundBlurriness>0;b=e.get(b,S)}return b}function g(y){let b=!1;const S=p(y);S===null?d(a,o):S&&S.isColor&&(d(S,1),b=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(y,b){const S=p(b);S&&(S.isCubeTexture||S.mapping===Cr)?(l===void 0&&(l=new vt(new ys(1,1,1),new kt({name:"BackgroundCubeMaterial",uniforms:Es(On.backgroundCube.uniforms),vertexShader:On.backgroundCube.vertexShader,fragmentShader:On.backgroundCube.fragmentShader,side:Zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=S,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(T_.makeRotationFromEuler(b.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Td),l.material.toneMapped=$e.getTransfer(S.colorSpace)!==st,(u!==S||f!==S.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,f=S.version,h=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new vt(new ma(2,2),new kt({name:"BackgroundMaterial",uniforms:Es(On.background.uniforms),vertexShader:On.background.vertexShader,fragmentShader:On.background.fragmentShader,side:oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=$e.getTransfer(S.colorSpace)!==st,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||f!==S.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=S,f=S.version,h=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function d(y,b){y.getRGB(Sa,pd(n)),t.buffers.color.setClear(Sa.r,Sa.g,Sa.b,b,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,b=1){a.set(y),o=b,d(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,d(a,o)},render:g,addToRenderList:v,dispose:m}}function R_(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,a=!1;function o(I,F,J,q,H){let Z=!1;const K=f(I,q,J,F);r!==K&&(r=K,l(r.object)),Z=p(I,q,J,H),Z&&g(I,q,J,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,S(I,F,J,q),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function c(){return n.createVertexArray()}function l(I){return n.bindVertexArray(I)}function u(I){return n.deleteVertexArray(I)}function f(I,F,J,q){const H=q.wireframe===!0;let Z=i[F.id];Z===void 0&&(Z={},i[F.id]=Z);const K=I.isInstancedMesh===!0?I.id:0;let te=Z[K];te===void 0&&(te={},Z[K]=te);let re=te[J.id];re===void 0&&(re={},te[J.id]=re);let ue=re[H];return ue===void 0&&(ue=h(c()),re[H]=ue),ue}function h(I){const F=[],J=[],q=[];for(let H=0;H<t;H++)F[H]=0,J[H]=0,q[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:J,attributeDivisors:q,object:I,attributes:{},index:null}}function p(I,F,J,q){const H=r.attributes,Z=F.attributes;let K=0;const te=J.getAttributes();for(const re in te)if(te[re].location>=0){const Se=H[re];let Ae=Z[re];if(Ae===void 0&&(re==="instanceMatrix"&&I.instanceMatrix&&(Ae=I.instanceMatrix),re==="instanceColor"&&I.instanceColor&&(Ae=I.instanceColor)),Se===void 0||Se.attribute!==Ae||Ae&&Se.data!==Ae.data)return!0;K++}return r.attributesNum!==K||r.index!==q}function g(I,F,J,q){const H={},Z=F.attributes;let K=0;const te=J.getAttributes();for(const re in te)if(te[re].location>=0){let Se=Z[re];Se===void 0&&(re==="instanceMatrix"&&I.instanceMatrix&&(Se=I.instanceMatrix),re==="instanceColor"&&I.instanceColor&&(Se=I.instanceColor));const Ae={};Ae.attribute=Se,Se&&Se.data&&(Ae.data=Se.data),H[re]=Ae,K++}r.attributes=H,r.attributesNum=K,r.index=q}function v(){const I=r.newAttributes;for(let F=0,J=I.length;F<J;F++)I[F]=0}function d(I){m(I,0)}function m(I,F){const J=r.newAttributes,q=r.enabledAttributes,H=r.attributeDivisors;J[I]=1,q[I]===0&&(n.enableVertexAttribArray(I),q[I]=1),H[I]!==F&&(n.vertexAttribDivisor(I,F),H[I]=F)}function y(){const I=r.newAttributes,F=r.enabledAttributes;for(let J=0,q=F.length;J<q;J++)F[J]!==I[J]&&(n.disableVertexAttribArray(J),F[J]=0)}function b(I,F,J,q,H,Z,K){K===!0?n.vertexAttribIPointer(I,F,J,H,Z):n.vertexAttribPointer(I,F,J,q,H,Z)}function S(I,F,J,q){v();const H=q.attributes,Z=J.getAttributes(),K=F.defaultAttributeValues;for(const te in Z){const re=Z[te];if(re.location>=0){let ue=H[te];if(ue===void 0&&(te==="instanceMatrix"&&I.instanceMatrix&&(ue=I.instanceMatrix),te==="instanceColor"&&I.instanceColor&&(ue=I.instanceColor)),ue!==void 0){const Se=ue.normalized,Ae=ue.itemSize,tt=e.get(ue);if(tt===void 0)continue;const gt=tt.buffer,L=tt.type,R=tt.bytesPerElement,D=L===n.INT||L===n.UNSIGNED_INT||ue.gpuType===Vo;if(ue.isInterleavedBufferAttribute){const P=ue.data,ee=P.stride,se=ue.offset;if(P.isInstancedInterleavedBuffer){for(let he=0;he<re.locationSize;he++)m(re.location+he,P.meshPerAttribute);I.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=P.meshPerAttribute*P.count)}else for(let he=0;he<re.locationSize;he++)d(re.location+he);n.bindBuffer(n.ARRAY_BUFFER,gt);for(let he=0;he<re.locationSize;he++)b(re.location+he,Ae/re.locationSize,L,Se,ee*R,(se+Ae/re.locationSize*he)*R,D)}else{if(ue.isInstancedBufferAttribute){for(let P=0;P<re.locationSize;P++)m(re.location+P,ue.meshPerAttribute);I.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let P=0;P<re.locationSize;P++)d(re.location+P);n.bindBuffer(n.ARRAY_BUFFER,gt);for(let P=0;P<re.locationSize;P++)b(re.location+P,Ae/re.locationSize,L,Se,Ae*R,Ae/re.locationSize*P*R,D)}}else if(K!==void 0){const Se=K[te];if(Se!==void 0)switch(Se.length){case 2:n.vertexAttrib2fv(re.location,Se);break;case 3:n.vertexAttrib3fv(re.location,Se);break;case 4:n.vertexAttrib4fv(re.location,Se);break;default:n.vertexAttrib1fv(re.location,Se)}}}}y()}function A(){T();for(const I in i){const F=i[I];for(const J in F){const q=F[J];for(const H in q){const Z=q[H];for(const K in Z)u(Z[K].object),delete Z[K];delete q[H]}}delete i[I]}}function E(I){if(i[I.id]===void 0)return;const F=i[I.id];for(const J in F){const q=F[J];for(const H in q){const Z=q[H];for(const K in Z)u(Z[K].object),delete Z[K];delete q[H]}}delete i[I.id]}function C(I){for(const F in i){const J=i[F];for(const q in J){const H=J[q];if(H[I.id]===void 0)continue;const Z=H[I.id];for(const K in Z)u(Z[K].object),delete Z[K];delete H[I.id]}}}function _(I){for(const F in i){const J=i[F],q=I.isInstancedMesh===!0?I.id:0,H=J[q];if(H!==void 0){for(const Z in H){const K=H[Z];for(const te in K)u(K[te].object),delete K[te];delete H[Z]}delete J[q],Object.keys(J).length===0&&delete i[F]}}}function T(){N(),a=!0,r!==s&&(r=s,l(r.object))}function N(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:N,dispose:A,releaseStatesOfGeometry:E,releaseStatesOfObject:_,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:d,disableUnusedAttributes:y}}function C_(n,e,t){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),t.update(l,i,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let h=0;for(let p=0;p<u;p++)h+=l[p];t.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function L_(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==pn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const _=C===Qt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==rn&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==fn&&!_)}function c(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(Ue("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Ue("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),d=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:d,maxAttributes:m,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:S,maxSamples:A,samples:E}}function P_(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Hi,o=new We,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||i!==0||s;return s=h,i=f.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,p){const g=f.clippingPlanes,v=f.clipIntersection,d=f.clipShadows,m=n.get(f);if(!s||g===null||g.length===0||r&&!d)r?u(null):l();else{const y=r?0:i,b=y*4;let S=m.clippingState||null;c.value=S,S=u(g,h,b,p);for(let A=0;A!==b;++A)S[A]=t[A];m.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,p,g){const v=f!==null?f.length:0;let d=null;if(v!==0){if(d=c.value,g!==!0||d===null){const m=p+v*4,y=h.matrixWorldInverse;o.getNormalMatrix(y),(d===null||d.length<m)&&(d=new Float32Array(m));for(let b=0,S=p;b!==v;++b,S+=4)a.copy(f[b]).applyMatrix4(y,o),a.normal.toArray(d,S),d[S+3]=a.constant}c.value=d,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,d}}const xi=4,wd=[.125,.215,.35,.446,.526,.582],Wi=20,D_=256,fr=new _a,Rd=new Ve;let Sl=null,Ml=0,yl=0,bl=!1;const I_=new k;class El{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=I_}=r;Sl=this._renderer.getRenderTarget(),Ml=this._renderer.getActiveCubeFace(),yl=this._renderer.getActiveMipmapLevel(),bl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ld(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Sl,Ml,yl),this._renderer.xr.enabled=bl,e.scissorTest=!1,ws(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Pi||e.mapping===ss?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Sl=this._renderer.getRenderTarget(),Ml=this._renderer.getActiveCubeFace(),yl=this._renderer.getActiveMipmapLevel(),bl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Gt,minFilter:Gt,generateMipmaps:!1,type:Qt,format:pn,colorSpace:Fr,depthBuffer:!1},s=Cd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cd(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=N_(r)),this._blurMaterial=O_(r,e,t),this._ggxMaterial=k_(r,e,t)}return s}_compileMaterial(e){const t=new vt(new Ht,e);this._renderer.compile(t,fr)}_sceneToCubeUV(e,t,i,s,r){const c=new tn(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,p=f.toneMapping;f.getClearColor(Rd),f.toneMapping=Pn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new vt(new ys,new Qr({name:"PMREM.Background",side:Zt,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,d=v.material;let m=!1;const y=e.background;y?y.isColor&&(d.color.copy(y),e.background=null,m=!0):(d.color.copy(Rd),m=!0);for(let b=0;b<6;b++){const S=b%3;S===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[b],r.y,r.z)):S===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[b]));const A=this._cubeSize;ws(s,S*A,b>2?A:0,A,A),f.setRenderTarget(s),m&&f.render(v,c),f.render(e,c)}f.toneMapping=p,f.autoClear=h,e.background=y}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Pi||e.mapping===ss;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ld());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;ws(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,fr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),h=0+l*1.25,p=f*h,{_lodMax:g}=this,v=this._sizeLods[i],d=3*v*(i>g-xi?i-g+xi:0),m=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=g-t,ws(r,d,m,3*v,2*v),s.setRenderTarget(r),s.render(o,fr),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-i,ws(e,d,m,3*v,2*v),s.setRenderTarget(e),s.render(o,fr)}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&nt("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[s];f.material=l;const h=l.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Wi-1),v=r/g,d=isFinite(r)?1+Math.floor(u*v):Wi;d>Wi&&Ue(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Wi}`);const m=[];let y=0;for(let C=0;C<Wi;++C){const _=C/v,T=Math.exp(-_*_/2);m.push(T),C===0?y+=T:C<d&&(y+=2*T)}for(let C=0;C<m.length;C++)m[C]=m[C]/y;h.envMap.value=e.texture,h.samples.value=d,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:b}=this;h.dTheta.value=g,h.mipInt.value=b-i;const S=this._sizeLods[s],A=3*S*(s>b-xi?s-b+xi:0),E=4*(this._cubeSize-S);ws(t,A,E,3*S,2*S),c.setRenderTarget(t),c.render(f,fr)}}function N_(n){const e=[],t=[],i=[];let s=n;const r=n-xi+1+wd.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>n-xi?c=wd[a-n+xi-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),u=-l,f=1+l,h=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,g=6,v=3,d=2,m=1,y=new Float32Array(v*g*p),b=new Float32Array(d*g*p),S=new Float32Array(m*g*p);for(let E=0;E<p;E++){const C=E%3*2/3-1,_=E>2?0:-1,T=[C,_,0,C+2/3,_,0,C+2/3,_+1,0,C,_,0,C+2/3,_+1,0,C,_+1,0];y.set(T,v*g*E),b.set(h,d*g*E);const N=[E,E,E,E,E,E];S.set(N,m*g*E)}const A=new Ht;A.setAttribute("position",new mn(y,v)),A.setAttribute("uv",new mn(b,d)),A.setAttribute("faceIndex",new mn(S,m)),i.push(new vt(A,null)),s>xi&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Cd(n,e,t){const i=new Vt(n,e,t);return i.texture.mapping=Cr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ws(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function k_(n,e,t){return new kt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:D_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ma(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function O_(n,e,t){const i=new Float32Array(Wi),s=new k(0,1,0);return new kt({name:"SphericalGaussianBlur",defines:{n:Wi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ma(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Ld(){return new kt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ma(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Pd(){return new kt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ma(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Ma(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Dd extends Vt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new qu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ys(5,5,5),r=new kt({name:"CubemapFromEquirect",uniforms:Es(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Zt,blending:Ln});r.uniforms.tEquirect.value=t;const a=new vt(s,r),o=t.minFilter;return t.minFilter===Di&&(t.minFilter=Gt),new Sv(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function U_(n){let e=new WeakMap,t=new WeakMap,i=null;function s(h,p=!1){return h==null?null:p?a(h):r(h)}function r(h){if(h&&h.isTexture){const p=h.mapping;if(p===Bo||p===Go)if(e.has(h)){const g=e.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const v=new Dd(g.height);return v.fromEquirectangularTexture(n,h),e.set(h,v),h.addEventListener("dispose",l),o(v.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const p=h.mapping,g=p===Bo||p===Go,v=p===Pi||p===ss;if(g||v){let d=t.get(h);const m=d!==void 0?d.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return i===null&&(i=new El(n)),d=g?i.fromEquirectangular(h,d):i.fromCubemap(h,d),d.texture.pmremVersion=h.pmremVersion,t.set(h,d),d.texture;if(d!==void 0)return d.texture;{const y=h.image;return g&&y&&y.height>0||v&&y&&c(y)?(i===null&&(i=new El(n)),d=g?i.fromEquirectangular(h):i.fromCubemap(h),d.texture.pmremVersion=h.pmremVersion,t.set(h,d),h.addEventListener("dispose",u),d.texture):null}}}return h}function o(h,p){return p===Bo?h.mapping=Pi:p===Go&&(h.mapping=ss),h}function c(h){let p=0;const g=6;for(let v=0;v<g;v++)h[v]!==void 0&&p++;return p===g}function l(h){const p=h.target;p.removeEventListener("dispose",l);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(h){const p=h.target;p.removeEventListener("dispose",u);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function F_(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&as("WebGLRenderer: "+i+" extension not supported."),s}}}function B_(n,e,t,i){const s={},r=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const p=r.get(h);p&&(e.remove(p),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function c(f){const h=f.attributes;for(const p in h)e.update(h[p],n.ARRAY_BUFFER)}function l(f){const h=[],p=f.index,g=f.attributes.position;let v=0;if(g===void 0)return;if(p!==null){const y=p.array;v=p.version;for(let b=0,S=y.length;b<S;b+=3){const A=y[b+0],E=y[b+1],C=y[b+2];h.push(A,E,E,C,C,A)}}else{const y=g.array;v=g.version;for(let b=0,S=y.length/3-1;b<S;b+=3){const A=b+0,E=b+1,C=b+2;h.push(A,E,E,C,C,A)}}const d=new(g.count>=65535?Lu:Yc)(h,1);d.version=v;const m=r.get(f);m&&e.remove(m),r.set(f,d)}function u(f){const h=r.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:u}}function G_(n,e,t){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,h){n.drawElements(i,h,r,f*a),t.update(h,i,1)}function l(f,h,p){p!==0&&(n.drawElementsInstanced(i,h,r,f*a,p),t.update(h,i,p))}function u(f,h,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,p);let v=0;for(let d=0;d<p;d++)v+=h[d];t.update(v,i,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function H_(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:nt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function z_(n,e,t){const i=new WeakMap,s=new at;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==f){let T=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",T)};h!==void 0&&h.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let b=0;p===!0&&(b=1),g===!0&&(b=2),v===!0&&(b=3);let S=o.attributes.position.count*b,A=1;S>e.maxTextureSize&&(A=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const E=new Float32Array(S*A*4*f),C=new xu(E,S,A,f);C.type=fn,C.needsUpdate=!0;const _=b*4;for(let N=0;N<f;N++){const I=d[N],F=m[N],J=y[N],q=S*A*4*N;for(let H=0;H<I.count;H++){const Z=H*_;p===!0&&(s.fromBufferAttribute(I,H),E[q+Z+0]=s.x,E[q+Z+1]=s.y,E[q+Z+2]=s.z,E[q+Z+3]=0),g===!0&&(s.fromBufferAttribute(F,H),E[q+Z+4]=s.x,E[q+Z+5]=s.y,E[q+Z+6]=s.z,E[q+Z+7]=0),v===!0&&(s.fromBufferAttribute(J,H),E[q+Z+8]=s.x,E[q+Z+9]=s.y,E[q+Z+10]=s.z,E[q+Z+11]=J.itemSize===4?s.w:1)}}h={count:f,texture:C,size:new le(S,A)},i.set(o,h),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let v=0;v<l.length;v++)p+=l[v];const g=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function V_(n,e,t,i,s){let r=new WeakMap;function a(l){const u=s.render.frame,f=l.geometry,h=e.get(l,f);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return h}function o(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const W_={[Io]:"LINEAR_TONE_MAPPING",[No]:"REINHARD_TONE_MAPPING",[ko]:"CINEON_TONE_MAPPING",[Rr]:"ACES_FILMIC_TONE_MAPPING",[Uo]:"AGX_TONE_MAPPING",[Fo]:"NEUTRAL_TONE_MAPPING",[Oo]:"CUSTOM_TONE_MAPPING"};function X_(n,e,t,i,s,r){const a=new Vt(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new Ms(e,t):void 0}),o=new Vt(e,t,{type:Qt,depthBuffer:!1,stencilBuffer:!1}),c=new Ht;c.setAttribute("position",new lt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new lt([0,2,0,0,2,0],2));const l=new md({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new vt(c,l),f=new _a(-1,1,1,-1,0,1);let h=null,p=null,g=!1,v,d=null,m=[],y=!1;this.setSize=function(b,S){a.setSize(b,S),o.setSize(b,S);for(let A=0;A<m.length;A++){const E=m[A];E.setSize&&E.setSize(b,S)}},this.setEffects=function(b){m=b,y=m.length>0&&m[0].isRenderPass===!0;const S=a.width,A=a.height;for(let E=0;E<m.length;E++){const C=m[E];C.setSize&&C.setSize(S,A)}},this.begin=function(b,S){if(g||b.toneMapping===Pn&&m.length===0)return!1;if(d=S,S!==null){const A=S.width,E=S.height;(a.width!==A||a.height!==E)&&this.setSize(A,E)}return y===!1&&b.setRenderTarget(a),v=b.toneMapping,b.toneMapping=Pn,!0},this.hasRenderPass=function(){return y},this.end=function(b,S){b.toneMapping=v,g=!0;let A=a,E=o;for(let C=0;C<m.length;C++){const _=m[C];if(_.enabled!==!1&&(_.render(b,E,A,S),_.needsSwap!==!1)){const T=A;A=E,E=T}}if(h!==b.outputColorSpace||p!==b.toneMapping){h=b.outputColorSpace,p=b.toneMapping,l.defines={},$e.getTransfer(h)===st&&(l.defines.SRGB_TRANSFER="");const C=W_[p];C&&(l.defines[C]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=A.texture,b.setRenderTarget(d),b.render(u,f),d=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}const Id=new Nt,Al=new Ms(1,1),Nd=new xu,kd=new ag,Od=new qu,Ud=[],Fd=[],Bd=new Float32Array(16),Gd=new Float32Array(9),Hd=new Float32Array(4);function Rs(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Ud[s];if(r===void 0&&(r=new Float32Array(s),Ud[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Ot(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ut(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ya(n,e){let t=Fd[e];t===void 0&&(t=new Int32Array(e),Fd[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function K_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Y_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;n.uniform2fv(this.addr,e),Ut(t,e)}}function q_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ot(t,e))return;n.uniform3fv(this.addr,e),Ut(t,e)}}function J_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;n.uniform4fv(this.addr,e),Ut(t,e)}}function Z_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ot(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(Ot(t,i))return;Hd.set(i),n.uniformMatrix2fv(this.addr,!1,Hd),Ut(t,i)}}function Q_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ot(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(Ot(t,i))return;Gd.set(i),n.uniformMatrix3fv(this.addr,!1,Gd),Ut(t,i)}}function j_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ot(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(Ot(t,i))return;Bd.set(i),n.uniformMatrix4fv(this.addr,!1,Bd),Ut(t,i)}}function $_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function eS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;n.uniform2iv(this.addr,e),Ut(t,e)}}function tS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;n.uniform3iv(this.addr,e),Ut(t,e)}}function nS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;n.uniform4iv(this.addr,e),Ut(t,e)}}function iS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function sS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;n.uniform2uiv(this.addr,e),Ut(t,e)}}function rS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;n.uniform3uiv(this.addr,e),Ut(t,e)}}function aS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;n.uniform4uiv(this.addr,e),Ut(t,e)}}function oS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Al.compareFunction=t.isReversedDepthBuffer()?wc:Tc,r=Al):r=Id,t.setTexture2D(e||r,s)}function cS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||kd,s)}function lS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Od,s)}function hS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Nd,s)}function uS(n){switch(n){case 5126:return K_;case 35664:return Y_;case 35665:return q_;case 35666:return J_;case 35674:return Z_;case 35675:return Q_;case 35676:return j_;case 5124:case 35670:return $_;case 35667:case 35671:return eS;case 35668:case 35672:return tS;case 35669:case 35673:return nS;case 5125:return iS;case 36294:return sS;case 36295:return rS;case 36296:return aS;case 35678:case 36198:case 36298:case 36306:case 35682:return oS;case 35679:case 36299:case 36307:return cS;case 35680:case 36300:case 36308:case 36293:return lS;case 36289:case 36303:case 36311:case 36292:return hS}}function dS(n,e){n.uniform1fv(this.addr,e)}function fS(n,e){const t=Rs(e,this.size,2);n.uniform2fv(this.addr,t)}function pS(n,e){const t=Rs(e,this.size,3);n.uniform3fv(this.addr,t)}function mS(n,e){const t=Rs(e,this.size,4);n.uniform4fv(this.addr,t)}function gS(n,e){const t=Rs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function vS(n,e){const t=Rs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function xS(n,e){const t=Rs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function _S(n,e){n.uniform1iv(this.addr,e)}function SS(n,e){n.uniform2iv(this.addr,e)}function MS(n,e){n.uniform3iv(this.addr,e)}function yS(n,e){n.uniform4iv(this.addr,e)}function bS(n,e){n.uniform1uiv(this.addr,e)}function ES(n,e){n.uniform2uiv(this.addr,e)}function AS(n,e){n.uniform3uiv(this.addr,e)}function TS(n,e){n.uniform4uiv(this.addr,e)}function wS(n,e,t){const i=this.cache,s=e.length,r=ya(t,s);Ot(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Al:a=Id;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function RS(n,e,t){const i=this.cache,s=e.length,r=ya(t,s);Ot(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||kd,r[a])}function CS(n,e,t){const i=this.cache,s=e.length,r=ya(t,s);Ot(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Od,r[a])}function LS(n,e,t){const i=this.cache,s=e.length,r=ya(t,s);Ot(i,r)||(n.uniform1iv(this.addr,r),Ut(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Nd,r[a])}function PS(n){switch(n){case 5126:return dS;case 35664:return fS;case 35665:return pS;case 35666:return mS;case 35674:return gS;case 35675:return vS;case 35676:return xS;case 5124:case 35670:return _S;case 35667:case 35671:return SS;case 35668:case 35672:return MS;case 35669:case 35673:return yS;case 5125:return bS;case 36294:return ES;case 36295:return AS;case 36296:return TS;case 35678:case 36198:case 36298:case 36306:case 35682:return wS;case 35679:case 36299:case 36307:return RS;case 35680:case 36300:case 36308:case 36293:return CS;case 36289:case 36303:case 36311:case 36292:return LS}}class DS{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=uS(t.type)}}class IS{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=PS(t.type)}}class NS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Tl=/(\w+)(\])?(\[|\.)?/g;function zd(n,e){n.seq.push(e),n.map[e.id]=e}function kS(n,e,t){const i=n.name,s=i.length;for(Tl.lastIndex=0;;){const r=Tl.exec(i),a=Tl.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){zd(t,l===void 0?new DS(o,n,e):new IS(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new NS(o),zd(t,f)),t=f}}}class ba{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);kS(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Vd(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const OS=37297;let US=0;function FS(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Wd=new We;function BS(n){$e._getMatrix(Wd,$e.workingColorSpace,n);const e=`mat3( ${Wd.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(n)){case Br:return[e,"LinearTransferOETF"];case st:return[e,"sRGBTransferOETF"];default:return Ue("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Xd(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+FS(n.getShaderSource(e),o)}else return r}function GS(n,e){const t=BS(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const HS={[Io]:"Linear",[No]:"Reinhard",[ko]:"Cineon",[Rr]:"ACESFilmic",[Uo]:"AgX",[Fo]:"Neutral",[Oo]:"Custom"};function zS(n,e){const t=HS[e];return t===void 0?(Ue("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ea=new k;function VS(){$e.getLuminanceCoefficients(Ea);const n=Ea.x.toFixed(4),e=Ea.y.toFixed(4),t=Ea.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function WS(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pr).join(`
`)}function XS(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function KS(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function pr(n){return n!==""}function Kd(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Yd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const YS=/^[ \t]*#include +<([\w\d./]+)>/gm;function wl(n){return n.replace(YS,JS)}const qS=new Map;function JS(n,e){let t=qe[e];if(t===void 0){const i=qS.get(e);if(i!==void 0)t=qe[i],Ue('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return wl(t)}const ZS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qd(n){return n.replace(ZS,QS)}function QS(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Jd(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const jS={[wr]:"SHADOWMAP_TYPE_PCF",[Ks]:"SHADOWMAP_TYPE_VSM"};function $S(n){return jS[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const eM={[Pi]:"ENVMAP_TYPE_CUBE",[ss]:"ENVMAP_TYPE_CUBE",[Cr]:"ENVMAP_TYPE_CUBE_UV"};function tM(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":eM[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const nM={[ss]:"ENVMAP_MODE_REFRACTION"};function iM(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":nM[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const sM={[Do]:"ENVMAP_BLENDING_MULTIPLY",[Fm]:"ENVMAP_BLENDING_MIX",[Bm]:"ENVMAP_BLENDING_ADD"};function rM(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":sM[n.combine]||"ENVMAP_BLENDING_NONE"}function aM(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function oM(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=$S(t),l=tM(t),u=iM(t),f=rM(t),h=aM(t),p=WS(t),g=XS(r),v=s.createProgram();let d,m,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(pr).join(`
`),d.length>0&&(d+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(pr).join(`
`),m.length>0&&(m+=`
`)):(d=[Jd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pr).join(`
`),m=[Jd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pn?"#define TONE_MAPPING":"",t.toneMapping!==Pn?qe.tonemapping_pars_fragment:"",t.toneMapping!==Pn?zS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,GS("linearToOutputTexel",t.outputColorSpace),VS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(pr).join(`
`)),a=wl(a),a=Kd(a,t),a=Yd(a,t),o=wl(o),o=Kd(o,t),o=Yd(o,t),a=qd(a),o=qd(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,d=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,m=["#define varying in",t.glslVersion===uu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===uu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const b=y+d+a,S=y+m+o,A=Vd(s,s.VERTEX_SHADER,b),E=Vd(s,s.FRAGMENT_SHADER,S);s.attachShader(v,A),s.attachShader(v,E),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function C(I){if(n.debug.checkShaderErrors){const F=s.getProgramInfoLog(v)||"",J=s.getShaderInfoLog(A)||"",q=s.getShaderInfoLog(E)||"",H=F.trim(),Z=J.trim(),K=q.trim();let te=!0,re=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(te=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,A,E);else{const ue=Xd(s,A,"vertex"),Se=Xd(s,E,"fragment");nt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+H+`
`+ue+`
`+Se)}else H!==""?Ue("WebGLProgram: Program Info Log:",H):(Z===""||K==="")&&(re=!1);re&&(I.diagnostics={runnable:te,programLog:H,vertexShader:{log:Z,prefix:d},fragmentShader:{log:K,prefix:m}})}s.deleteShader(A),s.deleteShader(E),_=new ba(s,v),T=KS(s,v)}let _;this.getUniforms=function(){return _===void 0&&C(this),_};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(v,OS)),N},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=US++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=E,this}let cM=0;class lM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new hM(e),t.set(e,i)),i}}class hM{constructor(e){this.id=cM++,this.code=e,this.usedTimes=0}}function uM(n){return n===Ni||n===kr||n===Or}function dM(n,e,t,i,s,r){const a=new Mu,o=new lM,c=new Set,l=[],u=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return c.add(_),_===0?"uv":`uv${_}`}function v(_,T,N,I,F,J){const q=I.fog,H=F.geometry,Z=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?I.environment:null,K=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,te=e.get(_.envMap||Z,K),re=te&&te.mapping===Cr?te.image.height:null,ue=p[_.type];_.precision!==null&&(h=i.getMaxPrecision(_.precision),h!==_.precision&&Ue("WebGLProgram.getParameters:",_.precision,"not supported, using",h,"instead."));const Se=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ae=Se!==void 0?Se.length:0;let tt=0;H.morphAttributes.position!==void 0&&(tt=1),H.morphAttributes.normal!==void 0&&(tt=2),H.morphAttributes.color!==void 0&&(tt=3);let gt,L,R,D;if(ue){const we=On[ue];gt=we.vertexShader,L=we.fragmentShader}else{gt=_.vertexShader,L=_.fragmentShader;const we=o.getVertexShaderStage(_),Et=o.getFragmentShaderStage(_);o.update(_,we,Et),R=we.id,D=Et.id}const P=n.getRenderTarget(),ee=n.state.buffers.depth.getReversed(),se=F.isInstancedMesh===!0,he=F.isBatchedMesh===!0,ke=!!_.map,Te=!!_.matcap,Pe=!!te,Be=!!_.aoMap,Ce=!!_.lightMap,Ye=!!_.bumpMap&&_.wireframe===!1,ot=!!_.normalMap,Pt=!!_.displacementMap,Ft=!!_.emissiveMap,bt=!!_.metalnessMap,Dt=!!_.roughnessMap,U=_.anisotropy>0,sn=_.clearcoat>0,rt=_.dispersion>0,w=_.iridescence>0,x=_.sheen>0,G=_.transmission>0,X=U&&!!_.anisotropyMap,Q=sn&&!!_.clearcoatMap,ce=sn&&!!_.clearcoatNormalMap,fe=sn&&!!_.clearcoatRoughnessMap,j=w&&!!_.iridescenceMap,ie=w&&!!_.iridescenceThicknessMap,pe=x&&!!_.sheenColorMap,De=x&&!!_.sheenRoughnessMap,xe=!!_.specularMap,me=!!_.specularColorMap,Oe=!!_.specularIntensityMap,Ge=G&&!!_.transmissionMap,Xe=G&&!!_.thicknessMap,O=!!_.gradientMap,de=!!_.alphaMap,ne=_.alphaTest>0,ge=!!_.alphaHash,ye=!!_.extensions;let ae=Pn;_.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ae=n.toneMapping);const Le={shaderID:ue,shaderType:_.type,shaderName:_.name,vertexShader:gt,fragmentShader:L,defines:_.defines,customVertexShaderID:R,customFragmentShaderID:D,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:h,batching:he,batchingColor:he&&F._colorsTexture!==null,instancing:se,instancingColor:se&&F.instanceColor!==null,instancingMorph:se&&F.morphTexture!==null,outputColorSpace:P===null?n.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:$e.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:ke,matcap:Te,envMap:Pe,envMapMode:Pe&&te.mapping,envMapCubeUVHeight:re,aoMap:Be,lightMap:Ce,bumpMap:Ye,normalMap:ot,displacementMap:Pt,emissiveMap:Ft,normalMapObjectSpace:ot&&_.normalMapType===Vm,normalMapTangentSpace:ot&&_.normalMapType===Ur,packedNormalMap:ot&&_.normalMapType===Ur&&uM(_.normalMap.format),metalnessMap:bt,roughnessMap:Dt,anisotropy:U,anisotropyMap:X,clearcoat:sn,clearcoatMap:Q,clearcoatNormalMap:ce,clearcoatRoughnessMap:fe,dispersion:rt,iridescence:w,iridescenceMap:j,iridescenceThicknessMap:ie,sheen:x,sheenColorMap:pe,sheenRoughnessMap:De,specularMap:xe,specularColorMap:me,specularIntensityMap:Oe,transmission:G,transmissionMap:Ge,thicknessMap:Xe,gradientMap:O,opaque:_.transparent===!1&&_.blending===ns&&_.alphaToCoverage===!1,alphaMap:de,alphaTest:ne,alphaHash:ge,combine:_.combine,mapUv:ke&&g(_.map.channel),aoMapUv:Be&&g(_.aoMap.channel),lightMapUv:Ce&&g(_.lightMap.channel),bumpMapUv:Ye&&g(_.bumpMap.channel),normalMapUv:ot&&g(_.normalMap.channel),displacementMapUv:Pt&&g(_.displacementMap.channel),emissiveMapUv:Ft&&g(_.emissiveMap.channel),metalnessMapUv:bt&&g(_.metalnessMap.channel),roughnessMapUv:Dt&&g(_.roughnessMap.channel),anisotropyMapUv:X&&g(_.anisotropyMap.channel),clearcoatMapUv:Q&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:ce&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:fe&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:De&&g(_.sheenRoughnessMap.channel),specularMapUv:xe&&g(_.specularMap.channel),specularColorMapUv:me&&g(_.specularColorMap.channel),specularIntensityMapUv:Oe&&g(_.specularIntensityMap.channel),transmissionMapUv:Ge&&g(_.transmissionMap.channel),thicknessMapUv:Xe&&g(_.thicknessMap.channel),alphaMapUv:de&&g(_.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(ot||U),vertexNormals:!!H.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!H.attributes.uv&&(ke||de),fog:!!q,useFog:_.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||H.attributes.normal===void 0&&ot===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ee,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:Ae,morphTextureStride:tt,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:J.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&N.length>0,shadowMapType:n.shadowMap.type,toneMapping:ae,decodeVideoTexture:ke&&_.map.isVideoTexture===!0&&$e.getTransfer(_.map.colorSpace)===st,decodeVideoTextureEmissive:Ft&&_.emissiveMap.isVideoTexture===!0&&$e.getTransfer(_.emissiveMap.colorSpace)===st,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Cn,flipSided:_.side===Zt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:ye&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ye&&_.extensions.multiDraw===!0||he)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Le.vertexUv1s=c.has(1),Le.vertexUv2s=c.has(2),Le.vertexUv3s=c.has(3),c.clear(),Le}function d(_){const T=[];if(_.shaderID?T.push(_.shaderID):(T.push(_.customVertexShaderID),T.push(_.customFragmentShaderID)),_.defines!==void 0)for(const N in _.defines)T.push(N),T.push(_.defines[N]);return _.isRawShaderMaterial===!1&&(m(T,_),y(T,_),T.push(n.outputColorSpace)),T.push(_.customProgramCacheKey),T.join()}function m(_,T){_.push(T.precision),_.push(T.outputColorSpace),_.push(T.envMapMode),_.push(T.envMapCubeUVHeight),_.push(T.mapUv),_.push(T.alphaMapUv),_.push(T.lightMapUv),_.push(T.aoMapUv),_.push(T.bumpMapUv),_.push(T.normalMapUv),_.push(T.displacementMapUv),_.push(T.emissiveMapUv),_.push(T.metalnessMapUv),_.push(T.roughnessMapUv),_.push(T.anisotropyMapUv),_.push(T.clearcoatMapUv),_.push(T.clearcoatNormalMapUv),_.push(T.clearcoatRoughnessMapUv),_.push(T.iridescenceMapUv),_.push(T.iridescenceThicknessMapUv),_.push(T.sheenColorMapUv),_.push(T.sheenRoughnessMapUv),_.push(T.specularMapUv),_.push(T.specularColorMapUv),_.push(T.specularIntensityMapUv),_.push(T.transmissionMapUv),_.push(T.thicknessMapUv),_.push(T.combine),_.push(T.fogExp2),_.push(T.sizeAttenuation),_.push(T.morphTargetsCount),_.push(T.morphAttributeCount),_.push(T.numDirLights),_.push(T.numPointLights),_.push(T.numSpotLights),_.push(T.numSpotLightMaps),_.push(T.numHemiLights),_.push(T.numRectAreaLights),_.push(T.numDirLightShadows),_.push(T.numPointLightShadows),_.push(T.numSpotLightShadows),_.push(T.numSpotLightShadowsWithMaps),_.push(T.numLightProbes),_.push(T.shadowMapType),_.push(T.toneMapping),_.push(T.numClippingPlanes),_.push(T.numClipIntersection),_.push(T.depthPacking)}function y(_,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function b(_){const T=p[_.type];let N;if(T){const I=On[T];N=gi.clone(I.uniforms)}else N=_.uniforms;return N}function S(_,T){let N=u.get(T);return N!==void 0?++N.usedTimes:(N=new oM(n,T,_,s),l.push(N),u.set(T,N)),N}function A(_){if(--_.usedTimes===0){const T=l.indexOf(_);l[T]=l[l.length-1],l.pop(),u.delete(_.cacheKey),_.destroy()}}function E(_){o.remove(_)}function C(){o.dispose()}return{getParameters:v,getProgramCacheKey:d,getUniforms:b,acquireProgram:S,releaseProgram:A,releaseShaderCache:E,programs:l,dispose:C}}function fM(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function pM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Zd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Qd(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,g,v,d,m){let y=n[e];return y===void 0?(y={id:h.id,object:h,geometry:p,material:g,materialVariant:a(h),groupOrder:v,renderOrder:h.renderOrder,z:d,group:m},n[e]=y):(y.id=h.id,y.object=h,y.geometry=p,y.material=g,y.materialVariant=a(h),y.groupOrder=v,y.renderOrder=h.renderOrder,y.z=d,y.group=m),e++,y}function c(h,p,g,v,d,m){const y=o(h,p,g,v,d,m);g.transmission>0?i.push(y):g.transparent===!0?s.push(y):t.push(y)}function l(h,p,g,v,d,m){const y=o(h,p,g,v,d,m);g.transmission>0?i.unshift(y):g.transparent===!0?s.unshift(y):t.unshift(y)}function u(h,p,g){t.length>1&&t.sort(h||pM),i.length>1&&i.sort(p||Zd),s.length>1&&s.sort(p||Zd),g&&(t.reverse(),i.reverse(),s.reverse())}function f(){for(let h=e,p=n.length;h<p;h++){const g=n[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:f,sort:u}}function mM(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Qd,n.set(i,[a])):s>=r.length?(a=new Qd,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function gM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new k,color:new Ve};break;case"SpotLight":t={position:new k,direction:new k,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new k,halfWidth:new k,halfHeight:new k};break}return n[e.id]=t,t}}}function vM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let xM=0;function _M(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function SM(n){const e=new gM,t=vM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new k);const s=new k,r=new et,a=new et;function o(l){let u=0,f=0,h=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let p=0,g=0,v=0,d=0,m=0,y=0,b=0,S=0,A=0,E=0,C=0;l.sort(_M);for(let T=0,N=l.length;T<N;T++){const I=l[T],F=I.color,J=I.intensity,q=I.distance;let H=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Ni?H=I.shadow.map.texture:H=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=F.r*J,f+=F.g*J,h+=F.b*J;else if(I.isLightProbe){for(let Z=0;Z<9;Z++)i.probe[Z].addScaledVector(I.sh.coefficients[Z],J);C++}else if(I.isDirectionalLight){const Z=e.get(I);if(Z.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const K=I.shadow,te=t.get(I);te.shadowIntensity=K.intensity,te.shadowBias=K.bias,te.shadowNormalBias=K.normalBias,te.shadowRadius=K.radius,te.shadowMapSize=K.mapSize,i.directionalShadow[p]=te,i.directionalShadowMap[p]=H,i.directionalShadowMatrix[p]=I.shadow.matrix,y++}i.directional[p]=Z,p++}else if(I.isSpotLight){const Z=e.get(I);Z.position.setFromMatrixPosition(I.matrixWorld),Z.color.copy(F).multiplyScalar(J),Z.distance=q,Z.coneCos=Math.cos(I.angle),Z.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Z.decay=I.decay,i.spot[v]=Z;const K=I.shadow;if(I.map&&(i.spotLightMap[A]=I.map,A++,K.updateMatrices(I),I.castShadow&&E++),i.spotLightMatrix[v]=K.matrix,I.castShadow){const te=t.get(I);te.shadowIntensity=K.intensity,te.shadowBias=K.bias,te.shadowNormalBias=K.normalBias,te.shadowRadius=K.radius,te.shadowMapSize=K.mapSize,i.spotShadow[v]=te,i.spotShadowMap[v]=H,S++}v++}else if(I.isRectAreaLight){const Z=e.get(I);Z.color.copy(F).multiplyScalar(J),Z.halfWidth.set(I.width*.5,0,0),Z.halfHeight.set(0,I.height*.5,0),i.rectArea[d]=Z,d++}else if(I.isPointLight){const Z=e.get(I);if(Z.color.copy(I.color).multiplyScalar(I.intensity),Z.distance=I.distance,Z.decay=I.decay,I.castShadow){const K=I.shadow,te=t.get(I);te.shadowIntensity=K.intensity,te.shadowBias=K.bias,te.shadowNormalBias=K.normalBias,te.shadowRadius=K.radius,te.shadowMapSize=K.mapSize,te.shadowCameraNear=K.camera.near,te.shadowCameraFar=K.camera.far,i.pointShadow[g]=te,i.pointShadowMap[g]=H,i.pointShadowMatrix[g]=I.shadow.matrix,b++}i.point[g]=Z,g++}else if(I.isHemisphereLight){const Z=e.get(I);Z.skyColor.copy(I.color).multiplyScalar(J),Z.groundColor.copy(I.groundColor).multiplyScalar(J),i.hemi[m]=Z,m++}}d>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ve.LTC_FLOAT_1,i.rectAreaLTC2=ve.LTC_FLOAT_2):(i.rectAreaLTC1=ve.LTC_HALF_1,i.rectAreaLTC2=ve.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const _=i.hash;(_.directionalLength!==p||_.pointLength!==g||_.spotLength!==v||_.rectAreaLength!==d||_.hemiLength!==m||_.numDirectionalShadows!==y||_.numPointShadows!==b||_.numSpotShadows!==S||_.numSpotMaps!==A||_.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=v,i.rectArea.length=d,i.point.length=g,i.hemi.length=m,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=S+A-E,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=C,_.directionalLength=p,_.pointLength=g,_.spotLength=v,_.rectAreaLength=d,_.hemiLength=m,_.numDirectionalShadows=y,_.numPointShadows=b,_.numSpotShadows=S,_.numSpotMaps=A,_.numLightProbes=C,i.version=xM++)}function c(l,u){let f=0,h=0,p=0,g=0,v=0;const d=u.matrixWorldInverse;for(let m=0,y=l.length;m<y;m++){const b=l[m];if(b.isDirectionalLight){const S=i.directional[f];S.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(d),f++}else if(b.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(d),S.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(d),p++}else if(b.isRectAreaLight){const S=i.rectArea[g];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(d),a.identity(),r.copy(b.matrixWorld),r.premultiply(d),a.extractRotation(r),S.halfWidth.set(b.width*.5,0,0),S.halfHeight.set(0,b.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const S=i.point[h];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(d),h++}else if(b.isHemisphereLight){const S=i.hemi[v];S.direction.setFromMatrixPosition(b.matrixWorld),S.direction.transformDirection(d),v++}}}return{setup:o,setupView:c,state:i}}function jd(n){const e=new SM(n),t=[],i=[],s=[];function r(h){f.camera=h,t.length=0,i.length=0,s.length=0}function a(h){t.push(h)}function o(h){i.push(h)}function c(h){s.push(h)}function l(){e.setup(t)}function u(h){e.setupView(t,h)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function MM(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new jd(n),e.set(s,[o])):r>=a.length?(o=new jd(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const yM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,EM=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],AM=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],$d=new et,mr=new k,Rl=new k;function TM(n,e,t){let i=new al;const s=new le,r=new le,a=new at,o=new dv,c=new fv,l={},u=t.maxTextureSize,f={[oi]:Zt,[Zt]:oi,[Cn]:Cn},h=new kt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new le},radius:{value:4}},vertexShader:yM,fragmentShader:bM}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ht;g.setAttribute("position",new mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new vt(g,h),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wr;let m=this.type;this.render=function(E,C,_){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||E.length===0)return;this.type===jh&&(Ue("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=wr);const T=n.getRenderTarget(),N=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Ln),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const J=m!==this.type;J&&C.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(H=>H.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,H=E.length;q<H;q++){const Z=E[q],K=Z.shadow;if(K===void 0){Ue("WebGLShadowMap:",Z,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;s.copy(K.mapSize);const te=K.getFrameExtents();s.multiply(te),r.copy(K.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/te.x),s.x=r.x*te.x,K.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/te.y),s.y=r.y*te.y,K.mapSize.y=r.y));const re=n.state.buffers.depth.getReversed();if(K.camera._reversedDepth=re,K.map===null||J===!0){if(K.map!==null&&(K.map.depthTexture!==null&&(K.map.depthTexture.dispose(),K.map.depthTexture=null),K.map.dispose()),this.type===Ks){if(Z.isPointLight){Ue("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}K.map=new Vt(s.x,s.y,{format:Ni,type:Qt,minFilter:Gt,magFilter:Gt,generateMipmaps:!1}),K.map.texture.name=Z.name+".shadowMap",K.map.depthTexture=new Ms(s.x,s.y,fn),K.map.depthTexture.name=Z.name+".shadowMapDepth",K.map.depthTexture.format=Kn,K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=It,K.map.depthTexture.magFilter=It}else Z.isPointLight?(K.map=new Dd(s.x),K.map.depthTexture=new Cg(s.x,Dn)):(K.map=new Vt(s.x,s.y),K.map.depthTexture=new Ms(s.x,s.y,Dn)),K.map.depthTexture.name=Z.name+".shadowMap",K.map.depthTexture.format=Kn,this.type===wr?(K.map.depthTexture.compareFunction=re?wc:Tc,K.map.depthTexture.minFilter=Gt,K.map.depthTexture.magFilter=Gt):(K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=It,K.map.depthTexture.magFilter=It);K.camera.updateProjectionMatrix()}const ue=K.map.isWebGLCubeRenderTarget?6:1;for(let Se=0;Se<ue;Se++){if(K.map.isWebGLCubeRenderTarget)n.setRenderTarget(K.map,Se),n.clear();else{Se===0&&(n.setRenderTarget(K.map),n.clear());const Ae=K.getViewport(Se);a.set(r.x*Ae.x,r.y*Ae.y,r.x*Ae.z,r.y*Ae.w),F.viewport(a)}if(Z.isPointLight){const Ae=K.camera,tt=K.matrix,gt=Z.distance||Ae.far;gt!==Ae.far&&(Ae.far=gt,Ae.updateProjectionMatrix()),mr.setFromMatrixPosition(Z.matrixWorld),Ae.position.copy(mr),Rl.copy(Ae.position),Rl.add(EM[Se]),Ae.up.copy(AM[Se]),Ae.lookAt(Rl),Ae.updateMatrixWorld(),tt.makeTranslation(-mr.x,-mr.y,-mr.z),$d.multiplyMatrices(Ae.projectionMatrix,Ae.matrixWorldInverse),K._frustum.setFromProjectionMatrix($d,Ae.coordinateSystem,Ae.reversedDepth)}else K.updateMatrices(Z);i=K.getFrustum(),S(C,_,K.camera,Z,this.type)}K.isPointLightShadow!==!0&&this.type===Ks&&y(K,_),K.needsUpdate=!1}m=this.type,d.needsUpdate=!1,n.setRenderTarget(T,N,I)};function y(E,C){const _=e.update(v);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Vt(s.x,s.y,{format:Ni,type:Qt})),h.uniforms.shadow_pass.value=E.map.depthTexture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(C,null,_,h,v,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(C,null,_,p,v,null)}function b(E,C,_,T){let N=null;const I=_.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(I!==void 0)N=I;else if(N=_.isPointLight===!0?c:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const F=N.uuid,J=C.uuid;let q=l[F];q===void 0&&(q={},l[F]=q);let H=q[J];H===void 0&&(H=N.clone(),q[J]=H,C.addEventListener("dispose",A)),N=H}if(N.visible=C.visible,N.wireframe=C.wireframe,T===Ks?N.side=C.shadowSide!==null?C.shadowSide:C.side:N.side=C.shadowSide!==null?C.shadowSide:f[C.side],N.alphaMap=C.alphaMap,N.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,N.map=C.map,N.clipShadows=C.clipShadows,N.clippingPlanes=C.clippingPlanes,N.clipIntersection=C.clipIntersection,N.displacementMap=C.displacementMap,N.displacementScale=C.displacementScale,N.displacementBias=C.displacementBias,N.wireframeLinewidth=C.wireframeLinewidth,N.linewidth=C.linewidth,_.isPointLight===!0&&N.isMeshDistanceMaterial===!0){const F=n.properties.get(N);F.light=_}return N}function S(E,C,_,T,N){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&N===Ks)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,E.matrixWorld);const J=e.update(E),q=E.material;if(Array.isArray(q)){const H=J.groups;for(let Z=0,K=H.length;Z<K;Z++){const te=H[Z],re=q[te.materialIndex];if(re&&re.visible){const ue=b(E,re,T,N);E.onBeforeShadow(n,E,C,_,J,ue,te),n.renderBufferDirect(_,null,J,ue,E,te),E.onAfterShadow(n,E,C,_,J,ue,te)}}}else if(q.visible){const H=b(E,q,T,N);E.onBeforeShadow(n,E,C,_,J,H,null),n.renderBufferDirect(_,null,J,H,E,null),E.onAfterShadow(n,E,C,_,J,H,null)}}const F=E.children;for(let J=0,q=F.length;J<q;J++)S(F[J],C,_,T,N)}function A(E){E.target.removeEventListener("dispose",A);for(const _ in l){const T=l[_],N=E.target.uuid;N in T&&(T[N].dispose(),delete T[N])}}}function wM(n,e){function t(){let O=!1;const de=new at;let ne=null;const ge=new at(0,0,0,0);return{setMask:function(ye){ne!==ye&&!O&&(n.colorMask(ye,ye,ye,ye),ne=ye)},setLocked:function(ye){O=ye},setClear:function(ye,ae,Le,we,Et){Et===!0&&(ye*=we,ae*=we,Le*=we),de.set(ye,ae,Le,we),ge.equals(de)===!1&&(n.clearColor(ye,ae,Le,we),ge.copy(de))},reset:function(){O=!1,ne=null,ge.set(-1,0,0,0)}}}function i(){let O=!1,de=!1,ne=null,ge=null,ye=null;return{setReversed:function(ae){if(de!==ae){const Le=e.get("EXT_clip_control");ae?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),de=ae;const we=ye;ye=null,this.setClear(we)}},getReversed:function(){return de},setTest:function(ae){ae?P(n.DEPTH_TEST):ee(n.DEPTH_TEST)},setMask:function(ae){ne!==ae&&!O&&(n.depthMask(ae),ne=ae)},setFunc:function(ae){if(de&&(ae=$m[ae]),ge!==ae){switch(ae){case Ao:n.depthFunc(n.NEVER);break;case To:n.depthFunc(n.ALWAYS);break;case wo:n.depthFunc(n.LESS);break;case is:n.depthFunc(n.LEQUAL);break;case Ro:n.depthFunc(n.EQUAL);break;case Co:n.depthFunc(n.GEQUAL);break;case Lo:n.depthFunc(n.GREATER);break;case Po:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ge=ae}},setLocked:function(ae){O=ae},setClear:function(ae){ye!==ae&&(ye=ae,de&&(ae=1-ae),n.clearDepth(ae))},reset:function(){O=!1,ne=null,ge=null,ye=null,de=!1}}}function s(){let O=!1,de=null,ne=null,ge=null,ye=null,ae=null,Le=null,we=null,Et=null;return{setTest:function(ft){O||(ft?P(n.STENCIL_TEST):ee(n.STENCIL_TEST))},setMask:function(ft){de!==ft&&!O&&(n.stencilMask(ft),de=ft)},setFunc:function(ft,Gn,Hn){(ne!==ft||ge!==Gn||ye!==Hn)&&(n.stencilFunc(ft,Gn,Hn),ne=ft,ge=Gn,ye=Hn)},setOp:function(ft,Gn,Hn){(ae!==ft||Le!==Gn||we!==Hn)&&(n.stencilOp(ft,Gn,Hn),ae=ft,Le=Gn,we=Hn)},setLocked:function(ft){O=ft},setClear:function(ft){Et!==ft&&(n.clearStencil(ft),Et=ft)},reset:function(){O=!1,de=null,ne=null,ge=null,ye=null,ae=null,Le=null,we=null,Et=null}}}const r=new t,a=new i,o=new s,c=new WeakMap,l=new WeakMap;let u={},f={},h={},p=new WeakMap,g=[],v=null,d=!1,m=null,y=null,b=null,S=null,A=null,E=null,C=null,_=new Ve(0,0,0),T=0,N=!1,I=null,F=null,J=null,q=null,H=null;const Z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,te=0;const re=n.getParameter(n.VERSION);re.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(re)[1]),K=te>=1):re.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),K=te>=2);let ue=null,Se={};const Ae=n.getParameter(n.SCISSOR_BOX),tt=n.getParameter(n.VIEWPORT),gt=new at().fromArray(Ae),L=new at().fromArray(tt);function R(O,de,ne,ge){const ye=new Uint8Array(4),ae=n.createTexture();n.bindTexture(O,ae),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Le=0;Le<ne;Le++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(de,0,n.RGBA,1,1,ge,0,n.RGBA,n.UNSIGNED_BYTE,ye):n.texImage2D(de+Le,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ye);return ae}const D={};D[n.TEXTURE_2D]=R(n.TEXTURE_2D,n.TEXTURE_2D,1),D[n.TEXTURE_CUBE_MAP]=R(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),D[n.TEXTURE_2D_ARRAY]=R(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),D[n.TEXTURE_3D]=R(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),P(n.DEPTH_TEST),a.setFunc(is),Ye(!1),ot(Qh),P(n.CULL_FACE),Be(Ln);function P(O){u[O]!==!0&&(n.enable(O),u[O]=!0)}function ee(O){u[O]!==!1&&(n.disable(O),u[O]=!1)}function se(O,de){return h[O]!==de?(n.bindFramebuffer(O,de),h[O]=de,O===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=de),O===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=de),!0):!1}function he(O,de){let ne=g,ge=!1;if(O){ne=p.get(de),ne===void 0&&(ne=[],p.set(de,ne));const ye=O.textures;if(ne.length!==ye.length||ne[0]!==n.COLOR_ATTACHMENT0){for(let ae=0,Le=ye.length;ae<Le;ae++)ne[ae]=n.COLOR_ATTACHMENT0+ae;ne.length=ye.length,ge=!0}}else ne[0]!==n.BACK&&(ne[0]=n.BACK,ge=!0);ge&&n.drawBuffers(ne)}function ke(O){return v!==O?(n.useProgram(O),v=O,!0):!1}const Te={[Li]:n.FUNC_ADD,[Mm]:n.FUNC_SUBTRACT,[ym]:n.FUNC_REVERSE_SUBTRACT};Te[bm]=n.MIN,Te[Em]=n.MAX;const Pe={[Am]:n.ZERO,[Tm]:n.ONE,[wm]:n.SRC_COLOR,[bo]:n.SRC_ALPHA,[Im]:n.SRC_ALPHA_SATURATE,[Pm]:n.DST_COLOR,[Cm]:n.DST_ALPHA,[Rm]:n.ONE_MINUS_SRC_COLOR,[Eo]:n.ONE_MINUS_SRC_ALPHA,[Dm]:n.ONE_MINUS_DST_COLOR,[Lm]:n.ONE_MINUS_DST_ALPHA,[Nm]:n.CONSTANT_COLOR,[km]:n.ONE_MINUS_CONSTANT_COLOR,[Om]:n.CONSTANT_ALPHA,[Um]:n.ONE_MINUS_CONSTANT_ALPHA};function Be(O,de,ne,ge,ye,ae,Le,we,Et,ft){if(O===Ln){d===!0&&(ee(n.BLEND),d=!1);return}if(d===!1&&(P(n.BLEND),d=!0),O!==Sm){if(O!==m||ft!==N){if((y!==Li||A!==Li)&&(n.blendEquation(n.FUNC_ADD),y=Li,A=Li),ft)switch(O){case ns:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case yo:n.blendFunc(n.ONE,n.ONE);break;case $h:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case eu:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:nt("WebGLState: Invalid blending: ",O);break}else switch(O){case ns:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case yo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case $h:nt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case eu:nt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:nt("WebGLState: Invalid blending: ",O);break}b=null,S=null,E=null,C=null,_.set(0,0,0),T=0,m=O,N=ft}return}ye=ye||de,ae=ae||ne,Le=Le||ge,(de!==y||ye!==A)&&(n.blendEquationSeparate(Te[de],Te[ye]),y=de,A=ye),(ne!==b||ge!==S||ae!==E||Le!==C)&&(n.blendFuncSeparate(Pe[ne],Pe[ge],Pe[ae],Pe[Le]),b=ne,S=ge,E=ae,C=Le),(we.equals(_)===!1||Et!==T)&&(n.blendColor(we.r,we.g,we.b,Et),_.copy(we),T=Et),m=O,N=!1}function Ce(O,de){O.side===Cn?ee(n.CULL_FACE):P(n.CULL_FACE);let ne=O.side===Zt;de&&(ne=!ne),Ye(ne),O.blending===ns&&O.transparent===!1?Be(Ln):Be(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),a.setFunc(O.depthFunc),a.setTest(O.depthTest),a.setMask(O.depthWrite),r.setMask(O.colorWrite);const ge=O.stencilWrite;o.setTest(ge),ge&&(o.setMask(O.stencilWriteMask),o.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),o.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Ft(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?P(n.SAMPLE_ALPHA_TO_COVERAGE):ee(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(O){I!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),I=O)}function ot(O){O!==xm?(P(n.CULL_FACE),O!==F&&(O===Qh?n.cullFace(n.BACK):O===_m?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ee(n.CULL_FACE),F=O}function Pt(O){O!==J&&(K&&n.lineWidth(O),J=O)}function Ft(O,de,ne){O?(P(n.POLYGON_OFFSET_FILL),(q!==de||H!==ne)&&(q=de,H=ne,a.getReversed()&&(de=-de),n.polygonOffset(de,ne))):ee(n.POLYGON_OFFSET_FILL)}function bt(O){O?P(n.SCISSOR_TEST):ee(n.SCISSOR_TEST)}function Dt(O){O===void 0&&(O=n.TEXTURE0+Z-1),ue!==O&&(n.activeTexture(O),ue=O)}function U(O,de,ne){ne===void 0&&(ue===null?ne=n.TEXTURE0+Z-1:ne=ue);let ge=Se[ne];ge===void 0&&(ge={type:void 0,texture:void 0},Se[ne]=ge),(ge.type!==O||ge.texture!==de)&&(ue!==ne&&(n.activeTexture(ne),ue=ne),n.bindTexture(O,de||D[O]),ge.type=O,ge.texture=de)}function sn(){const O=Se[ue];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function rt(){try{n.compressedTexImage2D(...arguments)}catch(O){nt("WebGLState:",O)}}function w(){try{n.compressedTexImage3D(...arguments)}catch(O){nt("WebGLState:",O)}}function x(){try{n.texSubImage2D(...arguments)}catch(O){nt("WebGLState:",O)}}function G(){try{n.texSubImage3D(...arguments)}catch(O){nt("WebGLState:",O)}}function X(){try{n.compressedTexSubImage2D(...arguments)}catch(O){nt("WebGLState:",O)}}function Q(){try{n.compressedTexSubImage3D(...arguments)}catch(O){nt("WebGLState:",O)}}function ce(){try{n.texStorage2D(...arguments)}catch(O){nt("WebGLState:",O)}}function fe(){try{n.texStorage3D(...arguments)}catch(O){nt("WebGLState:",O)}}function j(){try{n.texImage2D(...arguments)}catch(O){nt("WebGLState:",O)}}function ie(){try{n.texImage3D(...arguments)}catch(O){nt("WebGLState:",O)}}function pe(O){return f[O]!==void 0?f[O]:n.getParameter(O)}function De(O,de){f[O]!==de&&(n.pixelStorei(O,de),f[O]=de)}function xe(O){gt.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),gt.copy(O))}function me(O){L.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),L.copy(O))}function Oe(O,de){let ne=l.get(de);ne===void 0&&(ne=new WeakMap,l.set(de,ne));let ge=ne.get(O);ge===void 0&&(ge=n.getUniformBlockIndex(de,O.name),ne.set(O,ge))}function Ge(O,de){const ge=l.get(de).get(O);c.get(de)!==ge&&(n.uniformBlockBinding(de,ge,O.__bindingPointIndex),c.set(de,ge))}function Xe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},ue=null,Se={},h={},p=new WeakMap,g=[],v=null,d=!1,m=null,y=null,b=null,S=null,A=null,E=null,C=null,_=new Ve(0,0,0),T=0,N=!1,I=null,F=null,J=null,q=null,H=null,gt.set(0,0,n.canvas.width,n.canvas.height),L.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:P,disable:ee,bindFramebuffer:se,drawBuffers:he,useProgram:ke,setBlending:Be,setMaterial:Ce,setFlipSided:Ye,setCullFace:ot,setLineWidth:Pt,setPolygonOffset:Ft,setScissorTest:bt,activeTexture:Dt,bindTexture:U,unbindTexture:sn,compressedTexImage2D:rt,compressedTexImage3D:w,texImage2D:j,texImage3D:ie,pixelStorei:De,getParameter:pe,updateUBOMapping:Oe,uniformBlockBinding:Ge,texStorage2D:ce,texStorage3D:fe,texSubImage2D:x,texSubImage3D:G,compressedTexSubImage2D:X,compressedTexSubImage3D:Q,scissor:xe,viewport:me,reset:Xe}}function RM(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new le,u=new WeakMap,f=new Set;let h;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(w,x){return g?new OffscreenCanvas(w,x):Gr("canvas")}function d(w,x,G){let X=1;const Q=rt(w);if((Q.width>G||Q.height>G)&&(X=G/Math.max(Q.width,Q.height)),X<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const ce=Math.floor(X*Q.width),fe=Math.floor(X*Q.height);h===void 0&&(h=v(ce,fe));const j=x?v(ce,fe):h;return j.width=ce,j.height=fe,j.getContext("2d").drawImage(w,0,0,ce,fe),Ue("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+ce+"x"+fe+")."),j}else return"data"in w&&Ue("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),w;return w}function m(w){return w.generateMipmaps}function y(w){n.generateMipmap(w)}function b(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(w,x,G,X,Q,ce=!1){if(w!==null){if(n[w]!==void 0)return n[w];Ue("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let fe;X&&(fe=e.get("EXT_texture_norm16"),fe||Ue("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=x;if(x===n.RED&&(G===n.FLOAT&&(j=n.R32F),G===n.HALF_FLOAT&&(j=n.R16F),G===n.UNSIGNED_BYTE&&(j=n.R8),G===n.UNSIGNED_SHORT&&fe&&(j=fe.R16_EXT),G===n.SHORT&&fe&&(j=fe.R16_SNORM_EXT)),x===n.RED_INTEGER&&(G===n.UNSIGNED_BYTE&&(j=n.R8UI),G===n.UNSIGNED_SHORT&&(j=n.R16UI),G===n.UNSIGNED_INT&&(j=n.R32UI),G===n.BYTE&&(j=n.R8I),G===n.SHORT&&(j=n.R16I),G===n.INT&&(j=n.R32I)),x===n.RG&&(G===n.FLOAT&&(j=n.RG32F),G===n.HALF_FLOAT&&(j=n.RG16F),G===n.UNSIGNED_BYTE&&(j=n.RG8),G===n.UNSIGNED_SHORT&&fe&&(j=fe.RG16_EXT),G===n.SHORT&&fe&&(j=fe.RG16_SNORM_EXT)),x===n.RG_INTEGER&&(G===n.UNSIGNED_BYTE&&(j=n.RG8UI),G===n.UNSIGNED_SHORT&&(j=n.RG16UI),G===n.UNSIGNED_INT&&(j=n.RG32UI),G===n.BYTE&&(j=n.RG8I),G===n.SHORT&&(j=n.RG16I),G===n.INT&&(j=n.RG32I)),x===n.RGB_INTEGER&&(G===n.UNSIGNED_BYTE&&(j=n.RGB8UI),G===n.UNSIGNED_SHORT&&(j=n.RGB16UI),G===n.UNSIGNED_INT&&(j=n.RGB32UI),G===n.BYTE&&(j=n.RGB8I),G===n.SHORT&&(j=n.RGB16I),G===n.INT&&(j=n.RGB32I)),x===n.RGBA_INTEGER&&(G===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),G===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),G===n.UNSIGNED_INT&&(j=n.RGBA32UI),G===n.BYTE&&(j=n.RGBA8I),G===n.SHORT&&(j=n.RGBA16I),G===n.INT&&(j=n.RGBA32I)),x===n.RGB&&(G===n.UNSIGNED_SHORT&&fe&&(j=fe.RGB16_EXT),G===n.SHORT&&fe&&(j=fe.RGB16_SNORM_EXT),G===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),G===n.UNSIGNED_INT_10F_11F_11F_REV&&(j=n.R11F_G11F_B10F)),x===n.RGBA){const ie=ce?Br:$e.getTransfer(Q);G===n.FLOAT&&(j=n.RGBA32F),G===n.HALF_FLOAT&&(j=n.RGBA16F),G===n.UNSIGNED_BYTE&&(j=ie===st?n.SRGB8_ALPHA8:n.RGBA8),G===n.UNSIGNED_SHORT&&fe&&(j=fe.RGBA16_EXT),G===n.SHORT&&fe&&(j=fe.RGBA16_SNORM_EXT),G===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),G===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function A(w,x){let G;return w?x===null||x===Dn||x===Js?G=n.DEPTH24_STENCIL8:x===fn?G=n.DEPTH32F_STENCIL8:x===qs&&(G=n.DEPTH24_STENCIL8,Ue("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Dn||x===Js?G=n.DEPTH_COMPONENT24:x===fn?G=n.DEPTH_COMPONENT32F:x===qs&&(G=n.DEPTH_COMPONENT16),G}function E(w,x){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==It&&w.minFilter!==Gt?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function C(w){const x=w.target;x.removeEventListener("dispose",C),T(x),x.isVideoTexture&&u.delete(x),x.isHTMLTexture&&f.delete(x)}function _(w){const x=w.target;x.removeEventListener("dispose",_),I(x)}function T(w){const x=i.get(w);if(x.__webglInit===void 0)return;const G=w.source,X=p.get(G);if(X){const Q=X[x.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&N(w),Object.keys(X).length===0&&p.delete(G)}i.remove(w)}function N(w){const x=i.get(w);n.deleteTexture(x.__webglTexture);const G=w.source,X=p.get(G);delete X[x.__cacheKey],a.memory.textures--}function I(w){const x=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(x.__webglFramebuffer[X]))for(let Q=0;Q<x.__webglFramebuffer[X].length;Q++)n.deleteFramebuffer(x.__webglFramebuffer[X][Q]);else n.deleteFramebuffer(x.__webglFramebuffer[X]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[X])}else{if(Array.isArray(x.__webglFramebuffer))for(let X=0;X<x.__webglFramebuffer.length;X++)n.deleteFramebuffer(x.__webglFramebuffer[X]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let X=0;X<x.__webglColorRenderbuffer.length;X++)x.__webglColorRenderbuffer[X]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[X]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const G=w.textures;for(let X=0,Q=G.length;X<Q;X++){const ce=i.get(G[X]);ce.__webglTexture&&(n.deleteTexture(ce.__webglTexture),a.memory.textures--),i.remove(G[X])}i.remove(w)}let F=0;function J(){F=0}function q(){return F}function H(w){F=w}function Z(){const w=F;return w>=s.maxTextures&&Ue("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),F+=1,w}function K(w){const x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function te(w,x){const G=i.get(w);if(w.isVideoTexture&&U(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&G.__version!==w.version){const X=w.image;if(X===null)Ue("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Ue("WebGLRenderer: Texture marked for update but image is incomplete");else{ee(G,w,x);return}}else w.isExternalTexture&&(G.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,G.__webglTexture,n.TEXTURE0+x)}function re(w,x){const G=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&G.__version!==w.version){ee(G,w,x);return}else w.isExternalTexture&&(G.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,G.__webglTexture,n.TEXTURE0+x)}function ue(w,x){const G=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&G.__version!==w.version){ee(G,w,x);return}t.bindTexture(n.TEXTURE_3D,G.__webglTexture,n.TEXTURE0+x)}function Se(w,x){const G=i.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&G.__version!==w.version){se(G,w,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+x)}const Ae={[Ys]:n.REPEAT,[Xn]:n.CLAMP_TO_EDGE,[Ho]:n.MIRRORED_REPEAT},tt={[It]:n.NEAREST,[Hm]:n.NEAREST_MIPMAP_NEAREST,[Lr]:n.NEAREST_MIPMAP_LINEAR,[Gt]:n.LINEAR,[zo]:n.LINEAR_MIPMAP_NEAREST,[Di]:n.LINEAR_MIPMAP_LINEAR},gt={[Wm]:n.NEVER,[Jm]:n.ALWAYS,[Xm]:n.LESS,[Tc]:n.LEQUAL,[Km]:n.EQUAL,[wc]:n.GEQUAL,[Ym]:n.GREATER,[qm]:n.NOTEQUAL};function L(w,x){if(x.type===fn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Gt||x.magFilter===zo||x.magFilter===Lr||x.magFilter===Di||x.minFilter===Gt||x.minFilter===zo||x.minFilter===Lr||x.minFilter===Di)&&Ue("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,Ae[x.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,Ae[x.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,Ae[x.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,tt[x.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,tt[x.minFilter]),x.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,gt[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===It||x.minFilter!==Lr&&x.minFilter!==Di||x.type===fn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function R(w,x){let G=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",C));const X=x.source;let Q=p.get(X);Q===void 0&&(Q={},p.set(X,Q));const ce=K(x);if(ce!==w.__cacheKey){Q[ce]===void 0&&(Q[ce]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,G=!0),Q[ce].usedTimes++;const fe=Q[w.__cacheKey];fe!==void 0&&(Q[w.__cacheKey].usedTimes--,fe.usedTimes===0&&N(x)),w.__cacheKey=ce,w.__webglTexture=Q[ce].texture}return G}function D(w,x,G){return Math.floor(Math.floor(w/G)/x)}function P(w,x,G,X){const ce=w.updateRanges;if(ce.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,G,X,x.data);else{ce.sort((De,xe)=>De.start-xe.start);let fe=0;for(let De=1;De<ce.length;De++){const xe=ce[fe],me=ce[De],Oe=xe.start+xe.count,Ge=D(me.start,x.width,4),Xe=D(xe.start,x.width,4);me.start<=Oe+1&&Ge===Xe&&D(me.start+me.count-1,x.width,4)===Ge?xe.count=Math.max(xe.count,me.start+me.count-xe.start):(++fe,ce[fe]=me)}ce.length=fe+1;const j=t.getParameter(n.UNPACK_ROW_LENGTH),ie=t.getParameter(n.UNPACK_SKIP_PIXELS),pe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let De=0,xe=ce.length;De<xe;De++){const me=ce[De],Oe=Math.floor(me.start/4),Ge=Math.ceil(me.count/4),Xe=Oe%x.width,O=Math.floor(Oe/x.width),de=Ge,ne=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Xe),t.pixelStorei(n.UNPACK_SKIP_ROWS,O),t.texSubImage2D(n.TEXTURE_2D,0,Xe,O,de,ne,G,X,x.data)}w.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,j),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ie),t.pixelStorei(n.UNPACK_SKIP_ROWS,pe)}}function ee(w,x,G){let X=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(X=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(X=n.TEXTURE_3D);const Q=R(w,x),ce=x.source;t.bindTexture(X,w.__webglTexture,n.TEXTURE0+G);const fe=i.get(ce);if(ce.version!==fe.__version||Q===!0){if(t.activeTexture(n.TEXTURE0+G),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const ne=$e.getPrimaries($e.workingColorSpace),ge=x.colorSpace===ci?null:$e.getPrimaries(x.colorSpace),ye=x.colorSpace===ci||ne===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye)}t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment);let ie=d(x.image,!1,s.maxTextureSize);ie=sn(x,ie);const pe=r.convert(x.format,x.colorSpace),De=r.convert(x.type);let xe=S(x.internalFormat,pe,De,x.normalized,x.colorSpace,x.isVideoTexture);L(X,x);let me;const Oe=x.mipmaps,Ge=x.isVideoTexture!==!0,Xe=fe.__version===void 0||Q===!0,O=ce.dataReady,de=E(x,ie);if(x.isDepthTexture)xe=A(x.format===Ii,x.type),Xe&&(Ge?t.texStorage2D(n.TEXTURE_2D,1,xe,ie.width,ie.height):t.texImage2D(n.TEXTURE_2D,0,xe,ie.width,ie.height,0,pe,De,null));else if(x.isDataTexture)if(Oe.length>0){Ge&&Xe&&t.texStorage2D(n.TEXTURE_2D,de,xe,Oe[0].width,Oe[0].height);for(let ne=0,ge=Oe.length;ne<ge;ne++)me=Oe[ne],Ge?O&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,me.width,me.height,pe,De,me.data):t.texImage2D(n.TEXTURE_2D,ne,xe,me.width,me.height,0,pe,De,me.data);x.generateMipmaps=!1}else Ge?(Xe&&t.texStorage2D(n.TEXTURE_2D,de,xe,ie.width,ie.height),O&&P(x,ie,pe,De)):t.texImage2D(n.TEXTURE_2D,0,xe,ie.width,ie.height,0,pe,De,ie.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ge&&Xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,xe,Oe[0].width,Oe[0].height,ie.depth);for(let ne=0,ge=Oe.length;ne<ge;ne++)if(me=Oe[ne],x.format!==pn)if(pe!==null)if(Ge){if(O)if(x.layerUpdates.size>0){const ye=Ed(me.width,me.height,x.format,x.type);for(const ae of x.layerUpdates){const Le=me.data.subarray(ae*ye/me.data.BYTES_PER_ELEMENT,(ae+1)*ye/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,ae,me.width,me.height,1,pe,Le)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,me.width,me.height,ie.depth,pe,me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ne,xe,me.width,me.height,ie.depth,0,me.data,0,0);else Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ge?O&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,me.width,me.height,ie.depth,pe,De,me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ne,xe,me.width,me.height,ie.depth,0,pe,De,me.data)}else{Ge&&Xe&&t.texStorage2D(n.TEXTURE_2D,de,xe,Oe[0].width,Oe[0].height);for(let ne=0,ge=Oe.length;ne<ge;ne++)me=Oe[ne],x.format!==pn?pe!==null?Ge?O&&t.compressedTexSubImage2D(n.TEXTURE_2D,ne,0,0,me.width,me.height,pe,me.data):t.compressedTexImage2D(n.TEXTURE_2D,ne,xe,me.width,me.height,0,me.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?O&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,me.width,me.height,pe,De,me.data):t.texImage2D(n.TEXTURE_2D,ne,xe,me.width,me.height,0,pe,De,me.data)}else if(x.isDataArrayTexture)if(Ge){if(Xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,de,xe,ie.width,ie.height,ie.depth),O)if(x.layerUpdates.size>0){const ne=Ed(ie.width,ie.height,x.format,x.type);for(const ge of x.layerUpdates){const ye=ie.data.subarray(ge*ne/ie.data.BYTES_PER_ELEMENT,(ge+1)*ne/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ge,ie.width,ie.height,1,pe,De,ye)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,pe,De,ie.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,xe,ie.width,ie.height,ie.depth,0,pe,De,ie.data);else if(x.isData3DTexture)Ge?(Xe&&t.texStorage3D(n.TEXTURE_3D,de,xe,ie.width,ie.height,ie.depth),O&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,pe,De,ie.data)):t.texImage3D(n.TEXTURE_3D,0,xe,ie.width,ie.height,ie.depth,0,pe,De,ie.data);else if(x.isFramebufferTexture){if(Xe)if(Ge)t.texStorage2D(n.TEXTURE_2D,de,xe,ie.width,ie.height);else{let ne=ie.width,ge=ie.height;for(let ye=0;ye<de;ye++)t.texImage2D(n.TEXTURE_2D,ye,xe,ne,ge,0,pe,De,null),ne>>=1,ge>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in n){const ne=n.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),ie.parentNode!==ne){ne.appendChild(ie),f.add(x),ne.onpaint=ge=>{const ye=ge.changedElements;for(const ae of f)ye.includes(ae.image)&&(ae.needsUpdate=!0)},ne.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ie);else{const ye=n.RGBA,ae=n.RGBA,Le=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,ye,ae,Le,ie)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Oe.length>0){if(Ge&&Xe){const ne=rt(Oe[0]);t.texStorage2D(n.TEXTURE_2D,de,xe,ne.width,ne.height)}for(let ne=0,ge=Oe.length;ne<ge;ne++)me=Oe[ne],Ge?O&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,pe,De,me):t.texImage2D(n.TEXTURE_2D,ne,xe,pe,De,me);x.generateMipmaps=!1}else if(Ge){if(Xe){const ne=rt(ie);t.texStorage2D(n.TEXTURE_2D,de,xe,ne.width,ne.height)}O&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe,De,ie)}else t.texImage2D(n.TEXTURE_2D,0,xe,pe,De,ie);m(x)&&y(X),fe.__version=ce.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function se(w,x,G){if(x.image.length!==6)return;const X=R(w,x),Q=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+G);const ce=i.get(Q);if(Q.version!==ce.__version||X===!0){t.activeTexture(n.TEXTURE0+G);const fe=$e.getPrimaries($e.workingColorSpace),j=x.colorSpace===ci?null:$e.getPrimaries(x.colorSpace),ie=x.colorSpace===ci||fe===j?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);const pe=x.isCompressedTexture||x.image[0].isCompressedTexture,De=x.image[0]&&x.image[0].isDataTexture,xe=[];for(let ae=0;ae<6;ae++)!pe&&!De?xe[ae]=d(x.image[ae],!0,s.maxCubemapSize):xe[ae]=De?x.image[ae].image:x.image[ae],xe[ae]=sn(x,xe[ae]);const me=xe[0],Oe=r.convert(x.format,x.colorSpace),Ge=r.convert(x.type),Xe=S(x.internalFormat,Oe,Ge,x.normalized,x.colorSpace),O=x.isVideoTexture!==!0,de=ce.__version===void 0||X===!0,ne=Q.dataReady;let ge=E(x,me);L(n.TEXTURE_CUBE_MAP,x);let ye;if(pe){O&&de&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,Xe,me.width,me.height);for(let ae=0;ae<6;ae++){ye=xe[ae].mipmaps;for(let Le=0;Le<ye.length;Le++){const we=ye[Le];x.format!==pn?Oe!==null?O?ne&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Le,0,0,we.width,we.height,Oe,we.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Le,Xe,we.width,we.height,0,we.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Le,0,0,we.width,we.height,Oe,Ge,we.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Le,Xe,we.width,we.height,0,Oe,Ge,we.data)}}}else{if(ye=x.mipmaps,O&&de){ye.length>0&&ge++;const ae=rt(xe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,Xe,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(De){O?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,xe[ae].width,xe[ae].height,Oe,Ge,xe[ae].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Xe,xe[ae].width,xe[ae].height,0,Oe,Ge,xe[ae].data);for(let Le=0;Le<ye.length;Le++){const Et=ye[Le].image[ae].image;O?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Le+1,0,0,Et.width,Et.height,Oe,Ge,Et.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Le+1,Xe,Et.width,Et.height,0,Oe,Ge,Et.data)}}else{O?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Oe,Ge,xe[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Xe,Oe,Ge,xe[ae]);for(let Le=0;Le<ye.length;Le++){const we=ye[Le];O?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Le+1,0,0,Oe,Ge,we.image[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Le+1,Xe,Oe,Ge,we.image[ae])}}}m(x)&&y(n.TEXTURE_CUBE_MAP),ce.__version=Q.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function he(w,x,G,X,Q,ce){const fe=r.convert(G.format,G.colorSpace),j=r.convert(G.type),ie=S(G.internalFormat,fe,j,G.normalized,G.colorSpace),pe=i.get(x),De=i.get(G);if(De.__renderTarget=x,!pe.__hasExternalTextures){const xe=Math.max(1,x.width>>ce),me=Math.max(1,x.height>>ce);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?t.texImage3D(Q,ce,ie,xe,me,x.depth,0,fe,j,null):t.texImage2D(Q,ce,ie,xe,me,0,fe,j,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),Dt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,X,Q,De.__webglTexture,0,bt(x)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,X,Q,De.__webglTexture,ce),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ke(w,x,G){if(n.bindRenderbuffer(n.RENDERBUFFER,w),x.depthBuffer){const X=x.depthTexture,Q=X&&X.isDepthTexture?X.type:null,ce=A(x.stencilBuffer,Q),fe=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Dt(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,bt(x),ce,x.width,x.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,bt(x),ce,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,ce,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,fe,n.RENDERBUFFER,w)}else{const X=x.textures;for(let Q=0;Q<X.length;Q++){const ce=X[Q],fe=r.convert(ce.format,ce.colorSpace),j=r.convert(ce.type),ie=S(ce.internalFormat,fe,j,ce.normalized,ce.colorSpace);Dt(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,bt(x),ie,x.width,x.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,bt(x),ie,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,ie,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Te(w,x,G){const X=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Q=i.get(x.depthTexture);if(Q.__renderTarget=x,(!Q.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),X){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,x.depthTexture.addEventListener("dispose",C)),Q.__webglTexture===void 0){Q.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Q.__webglTexture),L(n.TEXTURE_CUBE_MAP,x.depthTexture);const pe=r.convert(x.depthTexture.format),De=r.convert(x.depthTexture.type);let xe;x.depthTexture.format===Kn?xe=n.DEPTH_COMPONENT24:x.depthTexture.format===Ii&&(xe=n.DEPTH24_STENCIL8);for(let me=0;me<6;me++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,xe,x.width,x.height,0,pe,De,null)}}else te(x.depthTexture,0);const ce=Q.__webglTexture,fe=bt(x),j=X?n.TEXTURE_CUBE_MAP_POSITIVE_X+G:n.TEXTURE_2D,ie=x.depthTexture.format===Ii?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===Kn)Dt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ie,j,ce,0,fe):n.framebufferTexture2D(n.FRAMEBUFFER,ie,j,ce,0);else if(x.depthTexture.format===Ii)Dt(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ie,j,ce,0,fe):n.framebufferTexture2D(n.FRAMEBUFFER,ie,j,ce,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Pe(w){const x=i.get(w),G=w.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==w.depthTexture){const X=w.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),X){const Q=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,X.removeEventListener("dispose",Q)};X.addEventListener("dispose",Q),x.__depthDisposeCallback=Q}x.__boundDepthTexture=X}if(w.depthTexture&&!x.__autoAllocateDepthBuffer)if(G)for(let X=0;X<6;X++)Te(x.__webglFramebuffer[X],w,X);else{const X=w.texture.mipmaps;X&&X.length>0?Te(x.__webglFramebuffer[0],w,0):Te(x.__webglFramebuffer,w,0)}else if(G){x.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[X]),x.__webglDepthbuffer[X]===void 0)x.__webglDepthbuffer[X]=n.createRenderbuffer(),ke(x.__webglDepthbuffer[X],w,!1);else{const Q=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=x.__webglDepthbuffer[X];n.bindRenderbuffer(n.RENDERBUFFER,ce),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,ce)}}else{const X=w.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),ke(x.__webglDepthbuffer,w,!1);else{const Q=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ce),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,ce)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Be(w,x,G){const X=i.get(w);x!==void 0&&he(X.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),G!==void 0&&Pe(w)}function Ce(w){const x=w.texture,G=i.get(w),X=i.get(x);w.addEventListener("dispose",_);const Q=w.textures,ce=w.isWebGLCubeRenderTarget===!0,fe=Q.length>1;if(fe||(X.__webglTexture===void 0&&(X.__webglTexture=n.createTexture()),X.__version=x.version,a.memory.textures++),ce){G.__webglFramebuffer=[];for(let j=0;j<6;j++)if(x.mipmaps&&x.mipmaps.length>0){G.__webglFramebuffer[j]=[];for(let ie=0;ie<x.mipmaps.length;ie++)G.__webglFramebuffer[j][ie]=n.createFramebuffer()}else G.__webglFramebuffer[j]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){G.__webglFramebuffer=[];for(let j=0;j<x.mipmaps.length;j++)G.__webglFramebuffer[j]=n.createFramebuffer()}else G.__webglFramebuffer=n.createFramebuffer();if(fe)for(let j=0,ie=Q.length;j<ie;j++){const pe=i.get(Q[j]);pe.__webglTexture===void 0&&(pe.__webglTexture=n.createTexture(),a.memory.textures++)}if(w.samples>0&&Dt(w)===!1){G.__webglMultisampledFramebuffer=n.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let j=0;j<Q.length;j++){const ie=Q[j];G.__webglColorRenderbuffer[j]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,G.__webglColorRenderbuffer[j]);const pe=r.convert(ie.format,ie.colorSpace),De=r.convert(ie.type),xe=S(ie.internalFormat,pe,De,ie.normalized,ie.colorSpace,w.isXRRenderTarget===!0),me=bt(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,me,xe,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.RENDERBUFFER,G.__webglColorRenderbuffer[j])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(G.__webglDepthRenderbuffer=n.createRenderbuffer(),ke(G.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ce){t.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture),L(n.TEXTURE_CUBE_MAP,x);for(let j=0;j<6;j++)if(x.mipmaps&&x.mipmaps.length>0)for(let ie=0;ie<x.mipmaps.length;ie++)he(G.__webglFramebuffer[j][ie],w,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ie);else he(G.__webglFramebuffer[j],w,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);m(x)&&y(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(fe){for(let j=0,ie=Q.length;j<ie;j++){const pe=Q[j],De=i.get(pe);let xe=n.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(xe=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(xe,De.__webglTexture),L(xe,pe),he(G.__webglFramebuffer,w,pe,n.COLOR_ATTACHMENT0+j,xe,0),m(pe)&&y(xe)}t.unbindTexture()}else{let j=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(j=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(j,X.__webglTexture),L(j,x),x.mipmaps&&x.mipmaps.length>0)for(let ie=0;ie<x.mipmaps.length;ie++)he(G.__webglFramebuffer[ie],w,x,n.COLOR_ATTACHMENT0,j,ie);else he(G.__webglFramebuffer,w,x,n.COLOR_ATTACHMENT0,j,0);m(x)&&y(j),t.unbindTexture()}w.depthBuffer&&Pe(w)}function Ye(w){const x=w.textures;for(let G=0,X=x.length;G<X;G++){const Q=x[G];if(m(Q)){const ce=b(w),fe=i.get(Q).__webglTexture;t.bindTexture(ce,fe),y(ce),t.unbindTexture()}}}const ot=[],Pt=[];function Ft(w){if(w.samples>0){if(Dt(w)===!1){const x=w.textures,G=w.width,X=w.height;let Q=n.COLOR_BUFFER_BIT;const ce=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=i.get(w),j=x.length>1;if(j)for(let pe=0;pe<x.length;pe++)t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer);const ie=w.texture.mipmaps;ie&&ie.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let pe=0;pe<x.length;pe++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),j){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,fe.__webglColorRenderbuffer[pe]);const De=i.get(x[pe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,De,0)}n.blitFramebuffer(0,0,G,X,0,0,G,X,Q,n.NEAREST),c===!0&&(ot.length=0,Pt.length=0,ot.push(n.COLOR_ATTACHMENT0+pe),w.depthBuffer&&w.resolveDepthBuffer===!1&&(ot.push(ce),Pt.push(ce),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Pt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ot))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),j)for(let pe=0;pe<x.length;pe++){t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,fe.__webglColorRenderbuffer[pe]);const De=i.get(x[pe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,De,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const x=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function bt(w){return Math.min(s.maxSamples,w.samples)}function Dt(w){const x=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function U(w){const x=a.render.frame;u.get(w)!==x&&(u.set(w,x),w.update())}function sn(w,x){const G=w.colorSpace,X=w.format,Q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||G!==Fr&&G!==ci&&($e.getTransfer(G)===st?(X!==pn||Q!==rn)&&Ue("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):nt("WebGLTextures: Unsupported texture color space:",G)),x}function rt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=Z,this.resetTextureUnits=J,this.getTextureUnits=q,this.setTextureUnits=H,this.setTexture2D=te,this.setTexture2DArray=re,this.setTexture3D=ue,this.setTextureCube=Se,this.rebindTextures=Be,this.setupRenderTarget=Ce,this.updateRenderTargetMipmap=Ye,this.updateMultisampleRenderTarget=Ft,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=he,this.useMultisampledRTT=Dt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function CM(n,e){function t(i,s=ci){let r;const a=$e.getTransfer(s);if(i===rn)return n.UNSIGNED_BYTE;if(i===Wo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Xo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===ru)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===au)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===iu)return n.BYTE;if(i===su)return n.SHORT;if(i===qs)return n.UNSIGNED_SHORT;if(i===Vo)return n.INT;if(i===Dn)return n.UNSIGNED_INT;if(i===fn)return n.FLOAT;if(i===Qt)return n.HALF_FLOAT;if(i===ou)return n.ALPHA;if(i===cu)return n.RGB;if(i===pn)return n.RGBA;if(i===Kn)return n.DEPTH_COMPONENT;if(i===Ii)return n.DEPTH_STENCIL;if(i===Ko)return n.RED;if(i===Yo)return n.RED_INTEGER;if(i===Ni)return n.RG;if(i===qo)return n.RG_INTEGER;if(i===Jo)return n.RGBA_INTEGER;if(i===Pr||i===Dr||i===Ir||i===Nr)if(a===st)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Pr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Pr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ir)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Nr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Zo||i===Qo||i===jo||i===$o)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Zo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Qo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===jo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===$o)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ec||i===tc||i===nc||i===ic||i===sc||i===kr||i===rc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ec||i===tc)return a===st?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===nc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===ic)return r.COMPRESSED_R11_EAC;if(i===sc)return r.COMPRESSED_SIGNED_R11_EAC;if(i===kr)return r.COMPRESSED_RG11_EAC;if(i===rc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ac||i===oc||i===cc||i===lc||i===hc||i===uc||i===dc||i===fc||i===pc||i===mc||i===gc||i===vc||i===xc||i===_c)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ac)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===oc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===cc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===lc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===hc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===uc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===dc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===fc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===pc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===mc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===gc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===vc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===xc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===_c)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Sc||i===Mc||i===yc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Sc)return a===st?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Mc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===yc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===bc||i===Ec||i===Or||i===Ac)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===bc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ec)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Or)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ac)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Js?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const LM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,PM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class DM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Ju(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new kt({vertexShader:LM,fragmentShader:PM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new vt(new ma(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class IM extends ki{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,f=null,h=null,p=null,g=null;const v=typeof XRWebGLBinding<"u",d=new DM,m={},y=t.getContextAttributes();let b=null,S=null;const A=[],E=[],C=new le;let _=null;const T=new tn;T.viewport=new at;const N=new tn;N.viewport=new at;const I=[T,N],F=new Mv;let J=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(R){let D=A[R];return D===void 0&&(D=new Oc,A[R]=D),D.getTargetRaySpace()},this.getControllerGrip=function(R){let D=A[R];return D===void 0&&(D=new Oc,A[R]=D),D.getGripSpace()},this.getHand=function(R){let D=A[R];return D===void 0&&(D=new Oc,A[R]=D),D.getHandSpace()};function H(R){const D=E.indexOf(R.inputSource);if(D===-1)return;const P=A[D];P!==void 0&&(P.update(R.inputSource,R.frame,l||a),P.dispatchEvent({type:R.type,data:R.inputSource}))}function Z(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",K);for(let R=0;R<A.length;R++){const D=E[R];D!==null&&(E[R]=null,A[R].disconnect(D))}J=null,q=null,d.reset();for(const R in m)delete m[R];e.setRenderTarget(b),p=null,h=null,f=null,s=null,S=null,L.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(R){r=R,i.isPresenting===!0&&Ue("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(R){o=R,i.isPresenting===!0&&Ue("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(R){l=R},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(R){if(s=R,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",K),y.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(C),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let P=null,ee=null,se=null;y.depth&&(se=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,P=y.stencil?Ii:Kn,ee=y.stencil?Js:Dn);const he={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(he),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new Vt(h.textureWidth,h.textureHeight,{format:pn,type:rn,depthTexture:new Ms(h.textureWidth,h.textureHeight,ee,void 0,void 0,void 0,void 0,void 0,void 0,P),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const P={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,P),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Vt(p.framebufferWidth,p.framebufferHeight,{format:pn,type:rn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),L.setContext(s),L.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return d.getDepthTexture()};function K(R){for(let D=0;D<R.removed.length;D++){const P=R.removed[D],ee=E.indexOf(P);ee>=0&&(E[ee]=null,A[ee].disconnect(P))}for(let D=0;D<R.added.length;D++){const P=R.added[D];let ee=E.indexOf(P);if(ee===-1){for(let he=0;he<A.length;he++)if(he>=E.length){E.push(P),ee=he;break}else if(E[he]===null){E[he]=P,ee=he;break}if(ee===-1)break}const se=A[ee];se&&se.connect(P)}}const te=new k,re=new k;function ue(R,D,P){te.setFromMatrixPosition(D.matrixWorld),re.setFromMatrixPosition(P.matrixWorld);const ee=te.distanceTo(re),se=D.projectionMatrix.elements,he=P.projectionMatrix.elements,ke=se[14]/(se[10]-1),Te=se[14]/(se[10]+1),Pe=(se[9]+1)/se[5],Be=(se[9]-1)/se[5],Ce=(se[8]-1)/se[0],Ye=(he[8]+1)/he[0],ot=ke*Ce,Pt=ke*Ye,Ft=ee/(-Ce+Ye),bt=Ft*-Ce;if(D.matrixWorld.decompose(R.position,R.quaternion,R.scale),R.translateX(bt),R.translateZ(Ft),R.matrixWorld.compose(R.position,R.quaternion,R.scale),R.matrixWorldInverse.copy(R.matrixWorld).invert(),se[10]===-1)R.projectionMatrix.copy(D.projectionMatrix),R.projectionMatrixInverse.copy(D.projectionMatrixInverse);else{const Dt=ke+Ft,U=Te+Ft,sn=ot-bt,rt=Pt+(ee-bt),w=Pe*Te/U*Dt,x=Be*Te/U*Dt;R.projectionMatrix.makePerspective(sn,rt,w,x,Dt,U),R.projectionMatrixInverse.copy(R.projectionMatrix).invert()}}function Se(R,D){D===null?R.matrixWorld.copy(R.matrix):R.matrixWorld.multiplyMatrices(D.matrixWorld,R.matrix),R.matrixWorldInverse.copy(R.matrixWorld).invert()}this.updateCamera=function(R){if(s===null)return;let D=R.near,P=R.far;d.texture!==null&&(d.depthNear>0&&(D=d.depthNear),d.depthFar>0&&(P=d.depthFar)),F.near=N.near=T.near=D,F.far=N.far=T.far=P,(J!==F.near||q!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),J=F.near,q=F.far),F.layers.mask=R.layers.mask|6,T.layers.mask=F.layers.mask&-5,N.layers.mask=F.layers.mask&-3;const ee=R.parent,se=F.cameras;Se(F,ee);for(let he=0;he<se.length;he++)Se(se[he],ee);se.length===2?ue(F,T,N):F.projectionMatrix.copy(T.projectionMatrix),Ae(R,F,ee)};function Ae(R,D,P){P===null?R.matrix.copy(D.matrixWorld):(R.matrix.copy(P.matrixWorld),R.matrix.invert(),R.matrix.multiply(D.matrixWorld)),R.matrix.decompose(R.position,R.quaternion,R.scale),R.updateMatrixWorld(!0),R.projectionMatrix.copy(D.projectionMatrix),R.projectionMatrixInverse.copy(D.projectionMatrixInverse),R.isPerspectiveCamera&&(R.fov=Hr*2*Math.atan(1/R.projectionMatrix.elements[5]),R.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function(R){c=R,h!==null&&(h.fixedFoveation=R),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=R)},this.hasDepthSensing=function(){return d.texture!==null},this.getDepthSensingMesh=function(){return d.getMesh(F)},this.getCameraTexture=function(R){return m[R]};let tt=null;function gt(R,D){if(u=D.getViewerPose(l||a),g=D,u!==null){const P=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let ee=!1;P.length!==F.cameras.length&&(F.cameras.length=0,ee=!0);for(let Te=0;Te<P.length;Te++){const Pe=P[Te];let Be=null;if(p!==null)Be=p.getViewport(Pe);else{const Ye=f.getViewSubImage(h,Pe);Be=Ye.viewport,Te===0&&(e.setRenderTargetTextures(S,Ye.colorTexture,Ye.depthStencilTexture),e.setRenderTarget(S))}let Ce=I[Te];Ce===void 0&&(Ce=new tn,Ce.layers.enable(Te),Ce.viewport=new at,I[Te]=Ce),Ce.matrix.fromArray(Pe.transform.matrix),Ce.matrix.decompose(Ce.position,Ce.quaternion,Ce.scale),Ce.projectionMatrix.fromArray(Pe.projectionMatrix),Ce.projectionMatrixInverse.copy(Ce.projectionMatrix).invert(),Ce.viewport.set(Be.x,Be.y,Be.width,Be.height),Te===0&&(F.matrix.copy(Ce.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),ee===!0&&F.cameras.push(Ce)}const se=s.enabledFeatures;if(se&&se.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){f=i.getBinding();const Te=f.getDepthInformation(P[0]);Te&&Te.isValid&&Te.texture&&d.init(Te,s.renderState)}if(se&&se.includes("camera-access")&&v){e.state.unbindTexture(),f=i.getBinding();for(let Te=0;Te<P.length;Te++){const Pe=P[Te].camera;if(Pe){let Be=m[Pe];Be||(Be=new Ju,m[Pe]=Be);const Ce=f.getCameraImage(Pe);Be.sourceTexture=Ce}}}}for(let P=0;P<A.length;P++){const ee=E[P],se=A[P];ee!==null&&se!==void 0&&se.update(ee,D,l||a)}tt&&tt(R,D),D.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:D}),g=null}const L=new Ad;L.setAnimationLoop(gt),this.setAnimationLoop=function(R){tt=R},this.dispose=function(){}}}const NM=new et,ef=new We;ef.set(-1,0,0,0,1,0,0,0,1);function kM(n,e){function t(d,m){d.matrixAutoUpdate===!0&&d.updateMatrix(),m.value.copy(d.matrix)}function i(d,m){m.color.getRGB(d.fogColor.value,pd(n)),m.isFog?(d.fogNear.value=m.near,d.fogFar.value=m.far):m.isFogExp2&&(d.fogDensity.value=m.density)}function s(d,m,y,b,S){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(d,m):m.isMeshLambertMaterial?(r(d,m),m.envMap&&(d.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(d,m),f(d,m)):m.isMeshPhongMaterial?(r(d,m),u(d,m),m.envMap&&(d.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(d,m),h(d,m),m.isMeshPhysicalMaterial&&p(d,m,S)):m.isMeshMatcapMaterial?(r(d,m),g(d,m)):m.isMeshDepthMaterial?r(d,m):m.isMeshDistanceMaterial?(r(d,m),v(d,m)):m.isMeshNormalMaterial?r(d,m):m.isLineBasicMaterial?(a(d,m),m.isLineDashedMaterial&&o(d,m)):m.isPointsMaterial?c(d,m,y,b):m.isSpriteMaterial?l(d,m):m.isShadowMaterial?(d.color.value.copy(m.color),d.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(d,m){d.opacity.value=m.opacity,m.color&&d.diffuse.value.copy(m.color),m.emissive&&d.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(d.map.value=m.map,t(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,t(m.alphaMap,d.alphaMapTransform)),m.bumpMap&&(d.bumpMap.value=m.bumpMap,t(m.bumpMap,d.bumpMapTransform),d.bumpScale.value=m.bumpScale,m.side===Zt&&(d.bumpScale.value*=-1)),m.normalMap&&(d.normalMap.value=m.normalMap,t(m.normalMap,d.normalMapTransform),d.normalScale.value.copy(m.normalScale),m.side===Zt&&d.normalScale.value.negate()),m.displacementMap&&(d.displacementMap.value=m.displacementMap,t(m.displacementMap,d.displacementMapTransform),d.displacementScale.value=m.displacementScale,d.displacementBias.value=m.displacementBias),m.emissiveMap&&(d.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,d.emissiveMapTransform)),m.specularMap&&(d.specularMap.value=m.specularMap,t(m.specularMap,d.specularMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest);const y=e.get(m),b=y.envMap,S=y.envMapRotation;b&&(d.envMap.value=b,d.envMapRotation.value.setFromMatrix4(NM.makeRotationFromEuler(S)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&d.envMapRotation.value.premultiply(ef),d.reflectivity.value=m.reflectivity,d.ior.value=m.ior,d.refractionRatio.value=m.refractionRatio),m.lightMap&&(d.lightMap.value=m.lightMap,d.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,d.lightMapTransform)),m.aoMap&&(d.aoMap.value=m.aoMap,d.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,d.aoMapTransform))}function a(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,m.map&&(d.map.value=m.map,t(m.map,d.mapTransform))}function o(d,m){d.dashSize.value=m.dashSize,d.totalSize.value=m.dashSize+m.gapSize,d.scale.value=m.scale}function c(d,m,y,b){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.size.value=m.size*y,d.scale.value=b*.5,m.map&&(d.map.value=m.map,t(m.map,d.uvTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,t(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function l(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.rotation.value=m.rotation,m.map&&(d.map.value=m.map,t(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,t(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function u(d,m){d.specular.value.copy(m.specular),d.shininess.value=Math.max(m.shininess,1e-4)}function f(d,m){m.gradientMap&&(d.gradientMap.value=m.gradientMap)}function h(d,m){d.metalness.value=m.metalness,m.metalnessMap&&(d.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,d.metalnessMapTransform)),d.roughness.value=m.roughness,m.roughnessMap&&(d.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,d.roughnessMapTransform)),m.envMap&&(d.envMapIntensity.value=m.envMapIntensity)}function p(d,m,y){d.ior.value=m.ior,m.sheen>0&&(d.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),d.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(d.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,d.sheenColorMapTransform)),m.sheenRoughnessMap&&(d.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,d.sheenRoughnessMapTransform))),m.clearcoat>0&&(d.clearcoat.value=m.clearcoat,d.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(d.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,d.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(d.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Zt&&d.clearcoatNormalScale.value.negate())),m.dispersion>0&&(d.dispersion.value=m.dispersion),m.iridescence>0&&(d.iridescence.value=m.iridescence,d.iridescenceIOR.value=m.iridescenceIOR,d.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(d.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,d.iridescenceMapTransform)),m.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),m.transmission>0&&(d.transmission.value=m.transmission,d.transmissionSamplerMap.value=y.texture,d.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(d.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,d.transmissionMapTransform)),d.thickness.value=m.thickness,m.thicknessMap&&(d.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=m.attenuationDistance,d.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(d.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(d.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=m.specularIntensity,d.specularColor.value.copy(m.specularColor),m.specularColorMap&&(d.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,d.specularColorMapTransform)),m.specularIntensityMap&&(d.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,d.specularIntensityMapTransform))}function g(d,m){m.matcap&&(d.matcap.value=m.matcap)}function v(d,m){const y=e.get(m).light;d.referencePosition.value.setFromMatrixPosition(y.matrixWorld),d.nearDistance.value=y.shadow.camera.near,d.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function OM(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,A){const E=A.program;i.uniformBlockBinding(S,E)}function l(S,A){let E=s[S.id];E===void 0&&(d(S),E=u(S),s[S.id]=E,S.addEventListener("dispose",y));const C=A.program;i.updateUBOMapping(S,C);const _=e.render.frame;r[S.id]!==_&&(h(S),r[S.id]=_)}function u(S){const A=f();S.__bindingPointIndex=A;const E=n.createBuffer(),C=S.__size,_=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,C,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,A,E),E}function f(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return nt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const A=s[S.id],E=S.uniforms,C=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let _=0,T=E.length;_<T;_++){const N=E[_];if(Array.isArray(N))for(let I=0,F=N.length;I<F;I++)p(N[I],_,I,C);else p(N,_,0,C)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(S,A,E,C){if(v(S,A,E,C)===!0){const _=S.__offset,T=S.value;if(Array.isArray(T)){let N=0;for(let I=0;I<T.length;I++){const F=T[I],J=m(F);g(F,S.__data,N),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(N+=J.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,S.__data)}}function g(S,A,E){typeof S=="number"||typeof S=="boolean"?A[0]=S:S.isMatrix3?(A[0]=S.elements[0],A[1]=S.elements[1],A[2]=S.elements[2],A[3]=0,A[4]=S.elements[3],A[5]=S.elements[4],A[6]=S.elements[5],A[7]=0,A[8]=S.elements[6],A[9]=S.elements[7],A[10]=S.elements[8],A[11]=0):ArrayBuffer.isView(S)?A.set(new S.constructor(S.buffer,S.byteOffset,A.length)):S.toArray(A,E)}function v(S,A,E,C){const _=S.value,T=A+"_"+E;if(C[T]===void 0)return typeof _=="number"||typeof _=="boolean"?C[T]=_:ArrayBuffer.isView(_)?C[T]=_.slice():C[T]=_.clone(),!0;{const N=C[T];if(typeof _=="number"||typeof _=="boolean"){if(N!==_)return C[T]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(N.equals(_)===!1)return N.copy(_),!0}}return!1}function d(S){const A=S.uniforms;let E=0;const C=16;for(let T=0,N=A.length;T<N;T++){const I=Array.isArray(A[T])?A[T]:[A[T]];for(let F=0,J=I.length;F<J;F++){const q=I[F],H=Array.isArray(q.value)?q.value:[q.value];for(let Z=0,K=H.length;Z<K;Z++){const te=H[Z],re=m(te),ue=E%C,Se=ue%re.boundary,Ae=ue+Se;E+=Se,Ae!==0&&C-Ae<re.storage&&(E+=C-Ae),q.__data=new Float32Array(re.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=E,E+=re.storage}}}const _=E%C;return _>0&&(E+=C-_),S.__size=E,S.__cache={},this}function m(S){const A={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(A.boundary=4,A.storage=4):S.isVector2?(A.boundary=8,A.storage=8):S.isVector3||S.isColor?(A.boundary=16,A.storage=12):S.isVector4?(A.boundary=16,A.storage=16):S.isMatrix3?(A.boundary=48,A.storage=48):S.isMatrix4?(A.boundary=64,A.storage=64):S.isTexture?Ue("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(A.boundary=16,A.storage=S.byteLength):Ue("WebGLRenderer: Unsupported uniform value type.",S),A}function y(S){const A=S.target;A.removeEventListener("dispose",y);const E=a.indexOf(A.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function b(){for(const S in s)n.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:c,update:l,dispose:b}}const UM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Un=null;function FM(){return Un===null&&(Un=new il(UM,16,16,Ni,Qt),Un.name="DFG_LUT",Un.minFilter=Gt,Un.magFilter=Gt,Un.wrapS=Xn,Un.wrapT=Xn,Un.generateMipmaps=!1,Un.needsUpdate=!0),Un}class BM{constructor(e={}){const{canvas:t=Qm(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:p=rn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const v=p,d=new Set([Jo,qo,Yo]),m=new Set([rn,Dn,qs,Js,Wo,Xo]),y=new Uint32Array(4),b=new Int32Array(4),S=new k;let A=null,E=null;const C=[],_=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const N=this;let I=!1,F=null,J=null,q=null,H=null;this._outputColorSpace=an;let Z=0,K=0,te=null,re=-1,ue=null;const Se=new at,Ae=new at;let tt=null;const gt=new Ve(0);let L=0,R=t.width,D=t.height,P=1,ee=null,se=null;const he=new at(0,0,R,D),ke=new at(0,0,R,D);let Te=!1;const Pe=new al;let Be=!1,Ce=!1;const Ye=new et,ot=new k,Pt=new at,Ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let bt=!1;function Dt(){return te===null?P:1}let U=i;function sn(M,B){return t.getContext(M,B)}try{const M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Mo}`),t.addEventListener("webglcontextlost",Et,!1),t.addEventListener("webglcontextrestored",ft,!1),t.addEventListener("webglcontextcreationerror",Gn,!1),U===null){const B="webgl2";if(U=sn(B,M),U===null)throw sn(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(M){throw nt("WebGLRenderer: "+M.message),M}let rt,w,x,G,X,Q,ce,fe,j,ie,pe,De,xe,me,Oe,Ge,Xe,O,de,ne,ge,ye,ae;function Le(){rt=new F_(U),rt.init(),ge=new CM(U,rt),w=new L_(U,rt,e,ge),x=new wM(U,rt),w.reversedDepthBuffer&&h&&x.buffers.depth.setReversed(!0),J=U.createFramebuffer(),q=U.createFramebuffer(),H=U.createFramebuffer(),G=new H_(U),X=new fM,Q=new RM(U,rt,x,X,w,ge,G),ce=new U_(N),fe=new Av(U),ye=new R_(U,fe),j=new B_(U,fe,G,ye),ie=new V_(U,j,fe,ye,G),O=new z_(U,w,Q),Oe=new P_(X),pe=new dM(N,ce,rt,w,ye,Oe),De=new kM(N,X),xe=new mM,me=new MM(rt),Xe=new w_(N,ce,x,ie,g,c),Ge=new TM(N,ie,w),ae=new OM(U,G,w,x),de=new C_(U,rt,G),ne=new G_(U,rt,G),G.programs=pe.programs,N.capabilities=w,N.extensions=rt,N.properties=X,N.renderLists=xe,N.shadowMap=Ge,N.state=x,N.info=G}Le(),v!==rn&&(T=new X_(v,t.width,t.height,o,s,r));const we=new IM(N,U);this.xr=we,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const M=rt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=rt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return P},this.setPixelRatio=function(M){M!==void 0&&(P=M,this.setSize(R,D,!1))},this.getSize=function(M){return M.set(R,D)},this.setSize=function(M,B,Y=!0){if(we.isPresenting){Ue("WebGLRenderer: Can't change size while VR device is presenting.");return}R=M,D=B,t.width=Math.floor(M*P),t.height=Math.floor(B*P),Y===!0&&(t.style.width=M+"px",t.style.height=B+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,M,B)},this.getDrawingBufferSize=function(M){return M.set(R*P,D*P).floor()},this.setDrawingBufferSize=function(M,B,Y){R=M,D=B,P=Y,t.width=Math.floor(M*Y),t.height=Math.floor(B*Y),this.setViewport(0,0,M,B)},this.setEffects=function(M){if(v===rn){nt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let B=0;B<M.length;B++)if(M[B].isOutputPass===!0){Ue("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(Se)},this.getViewport=function(M){return M.copy(he)},this.setViewport=function(M,B,Y,V){M.isVector4?he.set(M.x,M.y,M.z,M.w):he.set(M,B,Y,V),x.viewport(Se.copy(he).multiplyScalar(P).round())},this.getScissor=function(M){return M.copy(ke)},this.setScissor=function(M,B,Y,V){M.isVector4?ke.set(M.x,M.y,M.z,M.w):ke.set(M,B,Y,V),x.scissor(Ae.copy(ke).multiplyScalar(P).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(M){x.setScissorTest(Te=M)},this.setOpaqueSort=function(M){ee=M},this.setTransparentSort=function(M){se=M},this.getClearColor=function(M){return M.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor(...arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha(...arguments)},this.clear=function(M=!0,B=!0,Y=!0){let V=0;if(M){let W=!1;if(te!==null){const Me=te.texture.format;W=d.has(Me)}if(W){const Me=te.texture.type,Ee=m.has(Me),_e=Xe.getClearColor(),Re=Xe.getClearAlpha(),Ie=_e.r,Ke=_e.g,Ze=_e.b;Ee?(y[0]=Ie,y[1]=Ke,y[2]=Ze,y[3]=Re,U.clearBufferuiv(U.COLOR,0,y)):(b[0]=Ie,b[1]=Ke,b[2]=Ze,b[3]=Re,U.clearBufferiv(U.COLOR,0,b))}else V|=U.COLOR_BUFFER_BIT}B&&(V|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(V|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&U.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),F=M},this.dispose=function(){t.removeEventListener("webglcontextlost",Et,!1),t.removeEventListener("webglcontextrestored",ft,!1),t.removeEventListener("webglcontextcreationerror",Gn,!1),Xe.dispose(),xe.dispose(),me.dispose(),X.dispose(),ce.dispose(),ie.dispose(),ye.dispose(),ae.dispose(),pe.dispose(),we.dispose(),we.removeEventListener("sessionstart",xp),we.removeEventListener("sessionend",_p),ji.stop()};function Et(M){M.preventDefault(),fu("WebGLRenderer: Context Lost."),I=!0}function ft(){fu("WebGLRenderer: Context Restored."),I=!1;const M=G.autoReset,B=Ge.enabled,Y=Ge.autoUpdate,V=Ge.needsUpdate,W=Ge.type;Le(),G.autoReset=M,Ge.enabled=B,Ge.autoUpdate=Y,Ge.needsUpdate=V,Ge.type=W}function Gn(M){nt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Hn(M){const B=M.target;B.removeEventListener("dispose",Hn),cb(B)}function cb(M){lb(M),X.remove(M)}function lb(M){const B=X.get(M).programs;B!==void 0&&(B.forEach(function(Y){pe.releaseProgram(Y)}),M.isShaderMaterial&&pe.releaseShaderCache(M))}this.renderBufferDirect=function(M,B,Y,V,W,Me){B===null&&(B=Ft);const Ee=W.isMesh&&W.matrixWorld.determinantAffine()<0,_e=db(M,B,Y,V,W);x.setMaterial(V,Ee);let Re=Y.index,Ie=1;if(V.wireframe===!0){if(Re=j.getWireframeAttribute(Y),Re===void 0)return;Ie=2}const Ke=Y.drawRange,Ze=Y.attributes.position;let Ne=Ke.start*Ie,ct=(Ke.start+Ke.count)*Ie;Me!==null&&(Ne=Math.max(Ne,Me.start*Ie),ct=Math.min(ct,(Me.start+Me.count)*Ie)),Re!==null?(Ne=Math.max(Ne,0),ct=Math.min(ct,Re.count)):Ze!=null&&(Ne=Math.max(Ne,0),ct=Math.min(ct,Ze.count));const Rt=ct-Ne;if(Rt<0||Rt===1/0)return;ye.setup(W,V,_e,Y,Re);let At,ht=de;if(Re!==null&&(At=fe.get(Re),ht=ne,ht.setIndex(At)),W.isMesh)V.wireframe===!0?(x.setLineWidth(V.wireframeLinewidth*Dt()),ht.setMode(U.LINES)):ht.setMode(U.TRIANGLES);else if(W.isLine){let Yt=V.linewidth;Yt===void 0&&(Yt=1),x.setLineWidth(Yt*Dt()),W.isLineSegments?ht.setMode(U.LINES):W.isLineLoop?ht.setMode(U.LINE_LOOP):ht.setMode(U.LINE_STRIP)}else W.isPoints?ht.setMode(U.POINTS):W.isSprite&&ht.setMode(U.TRIANGLES);if(W.isBatchedMesh)if(rt.get("WEBGL_multi_draw"))ht.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Yt=W._multiDrawStarts,be=W._multiDrawCounts,hn=W._multiDrawCount,it=Re?fe.get(Re).bytesPerElement:1,xn=X.get(V).currentProgram.getUniforms();for(let zn=0;zn<hn;zn++)xn.setValue(U,"_gl_DrawID",zn),ht.render(Yt[zn]/it,be[zn])}else if(W.isInstancedMesh)ht.renderInstances(Ne,Rt,W.count);else if(Y.isInstancedBufferGeometry){const Yt=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,be=Math.min(Y.instanceCount,Yt);ht.renderInstances(Ne,Rt,be)}else ht.render(Ne,Rt)};function vp(M,B,Y){M.transparent===!0&&M.side===Cn&&M.forceSinglePass===!1?(M.side=Zt,M.needsUpdate=!0,Za(M,B,Y),M.side=oi,M.needsUpdate=!0,Za(M,B,Y),M.side=Cn):Za(M,B,Y)}this.compile=function(M,B,Y=null){Y===null&&(Y=M),E=me.get(Y),E.init(B),_.push(E),Y.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(E.pushLight(W),W.castShadow&&E.pushShadow(W))}),M!==Y&&M.traverseVisible(function(W){W.isLight&&W.layers.test(B.layers)&&(E.pushLight(W),W.castShadow&&E.pushShadow(W))}),E.setupLights();const V=new Set;return M.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const Me=W.material;if(Me)if(Array.isArray(Me))for(let Ee=0;Ee<Me.length;Ee++){const _e=Me[Ee];vp(_e,Y,W),V.add(_e)}else vp(Me,Y,W),V.add(Me)}),E=_.pop(),V},this.compileAsync=function(M,B,Y=null){const V=this.compile(M,B,Y);return new Promise(W=>{function Me(){if(V.forEach(function(Ee){X.get(Ee).currentProgram.isReady()&&V.delete(Ee)}),V.size===0){W(M);return}setTimeout(Me,10)}rt.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let mh=null;function hb(M){mh&&mh(M)}function xp(){ji.stop()}function _p(){ji.start()}const ji=new Ad;ji.setAnimationLoop(hb),typeof self<"u"&&ji.setContext(self),this.setAnimationLoop=function(M){mh=M,we.setAnimationLoop(M),M===null?ji.stop():ji.start()},we.addEventListener("sessionstart",xp),we.addEventListener("sessionend",_p),this.render=function(M,B){if(B!==void 0&&B.isCamera!==!0){nt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;F!==null&&F.renderStart(M,B);const Y=we.enabled===!0&&we.isPresenting===!0,V=T!==null&&(te===null||Y)&&T.begin(N,te);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),we.enabled===!0&&we.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(we.cameraAutoUpdate===!0&&we.updateCamera(B),B=we.getCamera()),M.isScene===!0&&M.onBeforeRender(N,M,B,te),E=me.get(M,_.length),E.init(B),E.state.textureUnits=Q.getTextureUnits(),_.push(E),Ye.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Pe.setFromProjectionMatrix(Ye,In,B.reversedDepth),Ce=this.localClippingEnabled,Be=Oe.init(this.clippingPlanes,Ce),A=xe.get(M,C.length),A.init(),C.push(A),we.enabled===!0&&we.isPresenting===!0){const Ee=N.xr.getDepthSensingMesh();Ee!==null&&gh(Ee,B,-1/0,N.sortObjects)}gh(M,B,0,N.sortObjects),A.finish(),N.sortObjects===!0&&A.sort(ee,se,B.reversedDepth),bt=we.enabled===!1||we.isPresenting===!1||we.hasDepthSensing()===!1,bt&&Xe.addToRenderList(A,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Be===!0&&Oe.beginShadows();const W=E.state.shadowsArray;if(Ge.render(W,M,B),Be===!0&&Oe.endShadows(),(V&&T.hasRenderPass())===!1){const Ee=A.opaque,_e=A.transmissive;if(E.setupLights(),B.isArrayCamera){const Re=B.cameras;if(_e.length>0)for(let Ie=0,Ke=Re.length;Ie<Ke;Ie++){const Ze=Re[Ie];Mp(Ee,_e,M,Ze)}bt&&Xe.render(M);for(let Ie=0,Ke=Re.length;Ie<Ke;Ie++){const Ze=Re[Ie];Sp(A,M,Ze,Ze.viewport)}}else _e.length>0&&Mp(Ee,_e,M,B),bt&&Xe.render(M),Sp(A,M,B)}te!==null&&K===0&&(Q.updateMultisampleRenderTarget(te),Q.updateRenderTargetMipmap(te)),V&&T.end(N),M.isScene===!0&&M.onAfterRender(N,M,B),ye.resetDefaultState(),re=-1,ue=null,_.pop(),_.length>0?(E=_[_.length-1],Q.setTextureUnits(E.state.textureUnits),Be===!0&&Oe.setGlobalState(N.clippingPlanes,E.state.camera)):E=null,C.pop(),C.length>0?A=C[C.length-1]:A=null,F!==null&&F.renderEnd()};function gh(M,B,Y,V){if(M.visible===!1)return;if(M.layers.test(B.layers)){if(M.isGroup)Y=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(B);else if(M.isLightProbeGrid)E.pushLightProbeGrid(M);else if(M.isLight)E.pushLight(M),M.castShadow&&E.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Pe.intersectsSprite(M)){V&&Pt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Ye);const Ee=ie.update(M),_e=M.material;_e.visible&&A.push(M,Ee,_e,Y,Pt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Pe.intersectsObject(M))){const Ee=ie.update(M),_e=M.material;if(V&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Pt.copy(M.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),Pt.copy(Ee.boundingSphere.center)),Pt.applyMatrix4(M.matrixWorld).applyMatrix4(Ye)),Array.isArray(_e)){const Re=Ee.groups;for(let Ie=0,Ke=Re.length;Ie<Ke;Ie++){const Ze=Re[Ie],Ne=_e[Ze.materialIndex];Ne&&Ne.visible&&A.push(M,Ee,Ne,Y,Pt.z,Ze)}}else _e.visible&&A.push(M,Ee,_e,Y,Pt.z,null)}}const Me=M.children;for(let Ee=0,_e=Me.length;Ee<_e;Ee++)gh(Me[Ee],B,Y,V)}function Sp(M,B,Y,V){const{opaque:W,transmissive:Me,transparent:Ee}=M;E.setupLightsView(Y),Be===!0&&Oe.setGlobalState(N.clippingPlanes,Y),V&&x.viewport(Se.copy(V)),W.length>0&&Ja(W,B,Y),Me.length>0&&Ja(Me,B,Y),Ee.length>0&&Ja(Ee,B,Y),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Mp(M,B,Y,V){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[V.id]===void 0){const Ne=rt.has("EXT_color_buffer_half_float")||rt.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[V.id]=new Vt(1,1,{generateMipmaps:!0,type:Ne?Qt:rn,minFilter:Di,samples:Math.max(4,w.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace})}const Me=E.state.transmissionRenderTarget[V.id],Ee=V.viewport||Se;Me.setSize(Ee.z*N.transmissionResolutionScale,Ee.w*N.transmissionResolutionScale);const _e=N.getRenderTarget(),Re=N.getActiveCubeFace(),Ie=N.getActiveMipmapLevel();N.setRenderTarget(Me),N.getClearColor(gt),L=N.getClearAlpha(),L<1&&N.setClearColor(16777215,.5),N.clear(),bt&&Xe.render(Y);const Ke=N.toneMapping;N.toneMapping=Pn;const Ze=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),E.setupLightsView(V),Be===!0&&Oe.setGlobalState(N.clippingPlanes,V),Ja(M,Y,V),Q.updateMultisampleRenderTarget(Me),Q.updateRenderTargetMipmap(Me),rt.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let ct=0,Rt=B.length;ct<Rt;ct++){const At=B[ct],{object:ht,geometry:Yt,material:be,group:hn}=At;if(be.side===Cn&&ht.layers.test(V.layers)){const it=be.side;be.side=Zt,be.needsUpdate=!0,yp(ht,Y,V,Yt,be,hn),be.side=it,be.needsUpdate=!0,Ne=!0}}Ne===!0&&(Q.updateMultisampleRenderTarget(Me),Q.updateRenderTargetMipmap(Me))}N.setRenderTarget(_e,Re,Ie),N.setClearColor(gt,L),Ze!==void 0&&(V.viewport=Ze),N.toneMapping=Ke}function Ja(M,B,Y){const V=B.isScene===!0?B.overrideMaterial:null;for(let W=0,Me=M.length;W<Me;W++){const Ee=M[W],{object:_e,geometry:Re,group:Ie}=Ee;let Ke=Ee.material;Ke.allowOverride===!0&&V!==null&&(Ke=V),_e.layers.test(Y.layers)&&yp(_e,B,Y,Re,Ke,Ie)}}function yp(M,B,Y,V,W,Me){M.onBeforeRender(N,B,Y,V,W,Me),M.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),W.onBeforeRender(N,B,Y,V,M,Me),W.transparent===!0&&W.side===Cn&&W.forceSinglePass===!1?(W.side=Zt,W.needsUpdate=!0,N.renderBufferDirect(Y,B,V,W,M,Me),W.side=oi,W.needsUpdate=!0,N.renderBufferDirect(Y,B,V,W,M,Me),W.side=Cn):N.renderBufferDirect(Y,B,V,W,M,Me),M.onAfterRender(N,B,Y,V,W,Me)}function Za(M,B,Y){B.isScene!==!0&&(B=Ft);const V=X.get(M),W=E.state.lights,Me=E.state.shadowsArray,Ee=W.state.version,_e=pe.getParameters(M,W.state,Me,B,Y,E.state.lightProbeGridArray),Re=pe.getProgramCacheKey(_e);let Ie=V.programs;V.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?B.environment:null,V.fog=B.fog;const Ke=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;V.envMap=ce.get(M.envMap||V.environment,Ke),V.envMapRotation=V.environment!==null&&M.envMap===null?B.environmentRotation:M.envMapRotation,Ie===void 0&&(M.addEventListener("dispose",Hn),Ie=new Map,V.programs=Ie);let Ze=Ie.get(Re);if(Ze!==void 0){if(V.currentProgram===Ze&&V.lightsStateVersion===Ee)return Ep(M,_e),Ze}else _e.uniforms=pe.getUniforms(M),F!==null&&M.isNodeMaterial&&F.build(M,Y,_e),M.onBeforeCompile(_e,N),Ze=pe.acquireProgram(_e,Re),Ie.set(Re,Ze),V.uniforms=_e.uniforms;const Ne=V.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ne.clippingPlanes=Oe.uniform),Ep(M,_e),V.needsLights=pb(M),V.lightsStateVersion=Ee,V.needsLights&&(Ne.ambientLightColor.value=W.state.ambient,Ne.lightProbe.value=W.state.probe,Ne.directionalLights.value=W.state.directional,Ne.directionalLightShadows.value=W.state.directionalShadow,Ne.spotLights.value=W.state.spot,Ne.spotLightShadows.value=W.state.spotShadow,Ne.rectAreaLights.value=W.state.rectArea,Ne.ltc_1.value=W.state.rectAreaLTC1,Ne.ltc_2.value=W.state.rectAreaLTC2,Ne.pointLights.value=W.state.point,Ne.pointLightShadows.value=W.state.pointShadow,Ne.hemisphereLights.value=W.state.hemi,Ne.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ne.spotLightMatrix.value=W.state.spotLightMatrix,Ne.spotLightMap.value=W.state.spotLightMap,Ne.pointShadowMatrix.value=W.state.pointShadowMatrix),V.lightProbeGrid=E.state.lightProbeGridArray.length>0,V.currentProgram=Ze,V.uniformsList=null,Ze}function bp(M){if(M.uniformsList===null){const B=M.currentProgram.getUniforms();M.uniformsList=ba.seqWithValue(B.seq,M.uniforms)}return M.uniformsList}function Ep(M,B){const Y=X.get(M);Y.outputColorSpace=B.outputColorSpace,Y.batching=B.batching,Y.batchingColor=B.batchingColor,Y.instancing=B.instancing,Y.instancingColor=B.instancingColor,Y.instancingMorph=B.instancingMorph,Y.skinning=B.skinning,Y.morphTargets=B.morphTargets,Y.morphNormals=B.morphNormals,Y.morphColors=B.morphColors,Y.morphTargetsCount=B.morphTargetsCount,Y.numClippingPlanes=B.numClippingPlanes,Y.numIntersection=B.numClipIntersection,Y.vertexAlphas=B.vertexAlphas,Y.vertexTangents=B.vertexTangents,Y.toneMapping=B.toneMapping}function ub(M,B){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;S.setFromMatrixPosition(B.matrixWorld);for(let Y=0,V=M.length;Y<V;Y++){const W=M[Y];if(W.texture!==null&&W.boundingBox.containsPoint(S))return W}return null}function db(M,B,Y,V,W){B.isScene!==!0&&(B=Ft),Q.resetTextureUnits();const Me=B.fog,Ee=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?B.environment:null,_e=te===null?N.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:$e.workingColorSpace,Re=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,Ie=ce.get(V.envMap||Ee,Re),Ke=V.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Ze=!!Y.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ne=!!Y.morphAttributes.position,ct=!!Y.morphAttributes.normal,Rt=!!Y.morphAttributes.color;let At=Pn;V.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(At=N.toneMapping);const ht=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Yt=ht!==void 0?ht.length:0,be=X.get(V),hn=E.state.lights;if(Be===!0&&(Ce===!0||M!==ue)){const pt=M===ue&&V.id===re;Oe.setState(V,M,pt)}let it=!1;V.version===be.__version?(be.needsLights&&be.lightsStateVersion!==hn.state.version||be.outputColorSpace!==_e||W.isBatchedMesh&&be.batching===!1||!W.isBatchedMesh&&be.batching===!0||W.isBatchedMesh&&be.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&be.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&be.instancing===!1||!W.isInstancedMesh&&be.instancing===!0||W.isSkinnedMesh&&be.skinning===!1||!W.isSkinnedMesh&&be.skinning===!0||W.isInstancedMesh&&be.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&be.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&be.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&be.instancingMorph===!1&&W.morphTexture!==null||be.envMap!==Ie||V.fog===!0&&be.fog!==Me||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==Oe.numPlanes||be.numIntersection!==Oe.numIntersection)||be.vertexAlphas!==Ke||be.vertexTangents!==Ze||be.morphTargets!==Ne||be.morphNormals!==ct||be.morphColors!==Rt||be.toneMapping!==At||be.morphTargetsCount!==Yt||!!be.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(it=!0):(it=!0,be.__version=V.version);let xn=be.currentProgram;it===!0&&(xn=Za(V,B,W),F&&V.isNodeMaterial&&F.onUpdateProgram(V,xn,be));let zn=!1,bi=!1,Gs=!1;const ut=xn.getUniforms(),Ct=be.uniforms;if(x.useProgram(xn.program)&&(zn=!0,bi=!0,Gs=!0),V.id!==re&&(re=V.id,bi=!0),be.needsLights){const pt=ub(E.state.lightProbeGridArray,W);be.lightProbeGrid!==pt&&(be.lightProbeGrid=pt,bi=!0)}if(zn||ue!==M){x.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ut.setValue(U,"projectionMatrix",M.projectionMatrix),ut.setValue(U,"viewMatrix",M.matrixWorldInverse);const Ai=ut.map.cameraPosition;Ai!==void 0&&Ai.setValue(U,ot.setFromMatrixPosition(M.matrixWorld)),w.logarithmicDepthBuffer&&ut.setValue(U,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ut.setValue(U,"isOrthographic",M.isOrthographicCamera===!0),ue!==M&&(ue=M,bi=!0,Gs=!0)}if(be.needsLights&&(hn.state.directionalShadowMap.length>0&&ut.setValue(U,"directionalShadowMap",hn.state.directionalShadowMap,Q),hn.state.spotShadowMap.length>0&&ut.setValue(U,"spotShadowMap",hn.state.spotShadowMap,Q),hn.state.pointShadowMap.length>0&&ut.setValue(U,"pointShadowMap",hn.state.pointShadowMap,Q)),W.isSkinnedMesh){ut.setOptional(U,W,"bindMatrix"),ut.setOptional(U,W,"bindMatrixInverse");const pt=W.skeleton;pt&&(pt.boneTexture===null&&pt.computeBoneTexture(),ut.setValue(U,"boneTexture",pt.boneTexture,Q))}W.isBatchedMesh&&(ut.setOptional(U,W,"batchingTexture"),ut.setValue(U,"batchingTexture",W._matricesTexture,Q),ut.setOptional(U,W,"batchingIdTexture"),ut.setValue(U,"batchingIdTexture",W._indirectTexture,Q),ut.setOptional(U,W,"batchingColorTexture"),W._colorsTexture!==null&&ut.setValue(U,"batchingColorTexture",W._colorsTexture,Q));const Ei=Y.morphAttributes;if((Ei.position!==void 0||Ei.normal!==void 0||Ei.color!==void 0)&&O.update(W,Y,xn),(bi||be.receiveShadow!==W.receiveShadow)&&(be.receiveShadow=W.receiveShadow,ut.setValue(U,"receiveShadow",W.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&B.environment!==null&&(Ct.envMapIntensity.value=B.environmentIntensity),Ct.dfgLUT!==void 0&&(Ct.dfgLUT.value=FM()),bi){if(ut.setValue(U,"toneMappingExposure",N.toneMappingExposure),be.needsLights&&fb(Ct,Gs),Me&&V.fog===!0&&De.refreshFogUniforms(Ct,Me),De.refreshMaterialUniforms(Ct,V,P,D,E.state.transmissionRenderTarget[M.id]),be.needsLights&&be.lightProbeGrid){const pt=be.lightProbeGrid;Ct.probesSH.value=pt.texture,Ct.probesMin.value.copy(pt.boundingBox.min),Ct.probesMax.value.copy(pt.boundingBox.max),Ct.probesResolution.value.copy(pt.resolution)}ba.upload(U,bp(be),Ct,Q)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(ba.upload(U,bp(be),Ct,Q),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ut.setValue(U,"center",W.center),ut.setValue(U,"modelViewMatrix",W.modelViewMatrix),ut.setValue(U,"normalMatrix",W.normalMatrix),ut.setValue(U,"modelMatrix",W.matrixWorld),V.uniformsGroups!==void 0){const pt=V.uniformsGroups;for(let Ai=0,Hs=pt.length;Ai<Hs;Ai++){const Ap=pt[Ai];ae.update(Ap,xn),ae.bind(Ap,xn)}}return xn}function fb(M,B){M.ambientLightColor.needsUpdate=B,M.lightProbe.needsUpdate=B,M.directionalLights.needsUpdate=B,M.directionalLightShadows.needsUpdate=B,M.pointLights.needsUpdate=B,M.pointLightShadows.needsUpdate=B,M.spotLights.needsUpdate=B,M.spotLightShadows.needsUpdate=B,M.rectAreaLights.needsUpdate=B,M.hemisphereLights.needsUpdate=B}function pb(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return K},this.getRenderTarget=function(){return te},this.setRenderTargetTextures=function(M,B,Y){const V=X.get(M);V.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),X.get(M.texture).__webglTexture=B,X.get(M.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:Y,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,B){const Y=X.get(M);Y.__webglFramebuffer=B,Y.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(M,B=0,Y=0){te=M,Z=B,K=Y;let V=null,W=!1,Me=!1;if(M){const _e=X.get(M);if(_e.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(U.FRAMEBUFFER,_e.__webglFramebuffer),Se.copy(M.viewport),Ae.copy(M.scissor),tt=M.scissorTest,x.viewport(Se),x.scissor(Ae),x.setScissorTest(tt),re=-1;return}else if(_e.__webglFramebuffer===void 0)Q.setupRenderTarget(M);else if(_e.__hasExternalTextures)Q.rebindTextures(M,X.get(M.texture).__webglTexture,X.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ke=M.depthTexture;if(_e.__boundDepthTexture!==Ke){if(Ke!==null&&X.has(Ke)&&(M.width!==Ke.image.width||M.height!==Ke.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(M)}}const Re=M.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(Me=!0);const Ie=X.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ie[B])?V=Ie[B][Y]:V=Ie[B],W=!0):M.samples>0&&Q.useMultisampledRTT(M)===!1?V=X.get(M).__webglMultisampledFramebuffer:Array.isArray(Ie)?V=Ie[Y]:V=Ie,Se.copy(M.viewport),Ae.copy(M.scissor),tt=M.scissorTest}else Se.copy(he).multiplyScalar(P).floor(),Ae.copy(ke).multiplyScalar(P).floor(),tt=Te;if(Y!==0&&(V=J),x.bindFramebuffer(U.FRAMEBUFFER,V)&&x.drawBuffers(M,V),x.viewport(Se),x.scissor(Ae),x.setScissorTest(tt),W){const _e=X.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+B,_e.__webglTexture,Y)}else if(Me){const _e=B;for(let Re=0;Re<M.textures.length;Re++){const Ie=X.get(M.textures[Re]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Re,Ie.__webglTexture,Y,_e)}}else if(M!==null&&Y!==0){const _e=X.get(M.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,_e.__webglTexture,Y)}re=-1},this.readRenderTargetPixels=function(M,B,Y,V,W,Me,Ee,_e=0){if(!(M&&M.isWebGLRenderTarget)){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=X.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ee!==void 0&&(Re=Re[Ee]),Re){x.bindFramebuffer(U.FRAMEBUFFER,Re);try{const Ie=M.textures[_e],Ke=Ie.format,Ze=Ie.type;if(M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+_e),!w.textureFormatReadable(Ke)){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!w.textureTypeReadable(Ze)){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=M.width-V&&Y>=0&&Y<=M.height-W&&U.readPixels(B,Y,V,W,ge.convert(Ke),ge.convert(Ze),Me)}finally{const Ie=te!==null?X.get(te).__webglFramebuffer:null;x.bindFramebuffer(U.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(M,B,Y,V,W,Me,Ee,_e=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=X.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Ee!==void 0&&(Re=Re[Ee]),Re)if(B>=0&&B<=M.width-V&&Y>=0&&Y<=M.height-W){x.bindFramebuffer(U.FRAMEBUFFER,Re);const Ie=M.textures[_e],Ke=Ie.format,Ze=Ie.type;if(M.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+_e),!w.textureFormatReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!w.textureTypeReadable(Ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ne=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Ne),U.bufferData(U.PIXEL_PACK_BUFFER,Me.byteLength,U.STREAM_READ),U.readPixels(B,Y,V,W,ge.convert(Ke),ge.convert(Ze),0);const ct=te!==null?X.get(te).__webglFramebuffer:null;x.bindFramebuffer(U.FRAMEBUFFER,ct);const Rt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await jm(U,Rt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Ne),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Me),U.deleteBuffer(Ne),U.deleteSync(Rt),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,B=null,Y=0){const V=Math.pow(2,-Y),W=Math.floor(M.image.width*V),Me=Math.floor(M.image.height*V),Ee=B!==null?B.x:0,_e=B!==null?B.y:0;Q.setTexture2D(M,0),U.copyTexSubImage2D(U.TEXTURE_2D,Y,0,0,Ee,_e,W,Me),x.unbindTexture()},this.copyTextureToTexture=function(M,B,Y=null,V=null,W=0,Me=0){let Ee,_e,Re,Ie,Ke,Ze,Ne,ct,Rt;const At=M.isCompressedTexture?M.mipmaps[Me]:M.image;if(Y!==null)Ee=Y.max.x-Y.min.x,_e=Y.max.y-Y.min.y,Re=Y.isBox3?Y.max.z-Y.min.z:1,Ie=Y.min.x,Ke=Y.min.y,Ze=Y.isBox3?Y.min.z:0;else{const Ct=Math.pow(2,-W);Ee=Math.floor(At.width*Ct),_e=Math.floor(At.height*Ct),M.isDataArrayTexture?Re=At.depth:M.isData3DTexture?Re=Math.floor(At.depth*Ct):Re=1,Ie=0,Ke=0,Ze=0}V!==null?(Ne=V.x,ct=V.y,Rt=V.z):(Ne=0,ct=0,Rt=0);const ht=ge.convert(B.format),Yt=ge.convert(B.type);let be;B.isData3DTexture?(Q.setTexture3D(B,0),be=U.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Q.setTexture2DArray(B,0),be=U.TEXTURE_2D_ARRAY):(Q.setTexture2D(B,0),be=U.TEXTURE_2D),x.activeTexture(U.TEXTURE0),x.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,B.flipY),x.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),x.pixelStorei(U.UNPACK_ALIGNMENT,B.unpackAlignment);const hn=x.getParameter(U.UNPACK_ROW_LENGTH),it=x.getParameter(U.UNPACK_IMAGE_HEIGHT),xn=x.getParameter(U.UNPACK_SKIP_PIXELS),zn=x.getParameter(U.UNPACK_SKIP_ROWS),bi=x.getParameter(U.UNPACK_SKIP_IMAGES);x.pixelStorei(U.UNPACK_ROW_LENGTH,At.width),x.pixelStorei(U.UNPACK_IMAGE_HEIGHT,At.height),x.pixelStorei(U.UNPACK_SKIP_PIXELS,Ie),x.pixelStorei(U.UNPACK_SKIP_ROWS,Ke),x.pixelStorei(U.UNPACK_SKIP_IMAGES,Ze);const Gs=M.isDataArrayTexture||M.isData3DTexture,ut=B.isDataArrayTexture||B.isData3DTexture;if(M.isDepthTexture){const Ct=X.get(M),Ei=X.get(B),pt=X.get(Ct.__renderTarget),Ai=X.get(Ei.__renderTarget);x.bindFramebuffer(U.READ_FRAMEBUFFER,pt.__webglFramebuffer),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,Ai.__webglFramebuffer);for(let Hs=0;Hs<Re;Hs++)Gs&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,X.get(M).__webglTexture,W,Ze+Hs),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,X.get(B).__webglTexture,Me,Rt+Hs)),U.blitFramebuffer(Ie,Ke,Ee,_e,Ne,ct,Ee,_e,U.DEPTH_BUFFER_BIT,U.NEAREST);x.bindFramebuffer(U.READ_FRAMEBUFFER,null),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(W!==0||M.isRenderTargetTexture||X.has(M)){const Ct=X.get(M),Ei=X.get(B);x.bindFramebuffer(U.READ_FRAMEBUFFER,q),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,H);for(let pt=0;pt<Re;pt++)Gs?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ct.__webglTexture,W,Ze+pt):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ct.__webglTexture,W),ut?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ei.__webglTexture,Me,Rt+pt):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ei.__webglTexture,Me),W!==0?U.blitFramebuffer(Ie,Ke,Ee,_e,Ne,ct,Ee,_e,U.COLOR_BUFFER_BIT,U.NEAREST):ut?U.copyTexSubImage3D(be,Me,Ne,ct,Rt+pt,Ie,Ke,Ee,_e):U.copyTexSubImage2D(be,Me,Ne,ct,Ie,Ke,Ee,_e);x.bindFramebuffer(U.READ_FRAMEBUFFER,null),x.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ut?M.isDataTexture||M.isData3DTexture?U.texSubImage3D(be,Me,Ne,ct,Rt,Ee,_e,Re,ht,Yt,At.data):B.isCompressedArrayTexture?U.compressedTexSubImage3D(be,Me,Ne,ct,Rt,Ee,_e,Re,ht,At.data):U.texSubImage3D(be,Me,Ne,ct,Rt,Ee,_e,Re,ht,Yt,At):M.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Me,Ne,ct,Ee,_e,ht,Yt,At.data):M.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Me,Ne,ct,At.width,At.height,ht,At.data):U.texSubImage2D(U.TEXTURE_2D,Me,Ne,ct,Ee,_e,ht,Yt,At);x.pixelStorei(U.UNPACK_ROW_LENGTH,hn),x.pixelStorei(U.UNPACK_IMAGE_HEIGHT,it),x.pixelStorei(U.UNPACK_SKIP_PIXELS,xn),x.pixelStorei(U.UNPACK_SKIP_ROWS,zn),x.pixelStorei(U.UNPACK_SKIP_IMAGES,bi),Me===0&&B.generateMipmaps&&U.generateMipmap(be),x.unbindTexture()},this.initRenderTarget=function(M){X.get(M).__webglFramebuffer===void 0&&Q.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Q.setTextureCube(M,0):M.isData3DTexture?Q.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Q.setTexture2DArray(M,0):Q.setTexture2D(M,0),x.unbindTexture()},this.resetState=function(){Z=0,K=0,te=null,x.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return In}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}class GM extends Ru{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new ys;e.deleteAttribute("uv");const t=new ei({side:Zt}),i=new ei,s=new vv(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new vt(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new bg(e,i,6),o=new Mt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const c=new vt(e,Cs(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new vt(e,Cs(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const u=new vt(e,Cs(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);const f=new vt(e,Cs(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);const h=new vt(e,Cs(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);const p=new vt(e,Cs(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Cs(n){return new uv({color:0,emissive:16777215,emissiveIntensity:n})}const Aa={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Xi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const HM=new _a(-1,1,1,-1,0,1);class zM extends Ht{constructor(){super(),this.setAttribute("position",new lt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new lt([0,2,0,0,2,0],2))}}const VM=new zM;class Ta{constructor(e){this._mesh=new vt(VM,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,HM)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class WM extends Xi{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof kt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=gi.clone(e.uniforms),this.material=new kt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ta(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class tf extends Xi{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class XM extends Xi{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class KM{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new le);this._width=i.width,this._height=i.height,t=new Vt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Qt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new WM(Aa),this.copyPass.material.blending=Ln,this.timer=new yv}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}tf!==void 0&&(a instanceof tf?i=!0:a instanceof XM&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new le);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class YM extends Xi{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ve}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const qM={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ve(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Ls extends Xi{constructor(e,t=1,i,s){super(),this.strength=t,this.radius=i,this.threshold=s,this.resolution=e!==void 0?new le(e.x,e.y):new le(256,256),this.clearColor=new Ve(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Vt(r,a,{type:Qt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new Vt(r,a,{type:Qt});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const h=new Vt(r,a,{type:Qt});h.texture.name="UnrealBloomPass.v"+u,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),r=Math.round(r/2),a=Math.round(a/2)}const o=qM;this.highPassUniforms=gi.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new kt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new le(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=gi.clone(Aa.uniforms),this.blendMaterial=new kt({uniforms:this.copyUniforms,vertexShader:Aa.vertexShader,fragmentShader:Aa.fragmentShader,premultipliedAlpha:!0,blending:yo,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ve,this._oldClearAlpha=1,this._basic=new Qr,this._fsQuad=new Ta(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new le(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(e,t,i,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=Ls.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Ls.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],i=e/3;for(let s=0;s<e;s++)t.push(.39894*Math.exp(-.5*s*s/(i*i))/i);return new kt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new le(.5,.5)},direction:{value:new le(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new kt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}Ls.BlurDirectionX=new le(1,0),Ls.BlurDirectionY=new le(0,1);const wa={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class JM extends Xi{constructor(){super(),this.isOutputPass=!0,this.uniforms=gi.clone(wa.uniforms),this.material=new md({name:wa.name,uniforms:this.uniforms,vertexShader:wa.vertexShader,fragmentShader:wa.fragmentShader}),this._fsQuad=new Ta(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},$e.getTransfer(this._outputColorSpace)===st&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Io?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===No?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ko?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Rr?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Uo?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Fo?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Oo&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Ra={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new le(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		void SMAAEdgeDetectionVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAAEdgeDetectionVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {
			vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );

			// Calculate color deltas:
			vec4 delta;
			vec3 C = texture2D( colorTex, texcoord ).rgb;

			vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;
			vec3 t = abs( C - Cleft );
			delta.x = max( max( t.r, t.g ), t.b );

			vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;
			t = abs( C - Ctop );
			delta.y = max( max( t.r, t.g ), t.b );

			// We do the usual threshold:
			vec2 edges = step( threshold, delta.xy );

			// Then discard if there is no edge:
			if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )
				discard;

			// Calculate right and bottom deltas:
			vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;
			t = abs( C - Cright );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;
			t = abs( C - Cbottom );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the maximum delta in the direct neighborhood:
			float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );

			// Calculate left-left and top-top deltas:
			vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;
			t = abs( C - Cleftleft );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;
			t = abs( C - Ctoptop );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the final maximum delta:
			maxDelta = max( max( maxDelta, delta.z ), delta.w );

			// Local contrast adaptation in action:
			edges.xy *= step( 0.5 * maxDelta, delta.xy );

			return vec4( edges, 0.0, 0.0 );
		}

		void main() {

			gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );

		}`},Ca={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new le(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];
		varying vec2 vPixcoord;

		void SMAABlendingWeightCalculationVS( vec2 texcoord ) {
			vPixcoord = texcoord / resolution;

			// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components

			// And these for the searches, they indicate the ends of the loops:
			vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );

		}

		void main() {

			vUv = uv;

			SMAABlendingWeightCalculationVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )

		uniform sampler2D tDiffuse;
		uniform sampler2D tArea;
		uniform sampler2D tSearch;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[3];
		varying vec2 vPixcoord;

		#if __VERSION__ == 100
		vec2 round( vec2 x ) {
			return sign( x ) * floor( abs( x ) + 0.5 );
		}
		#endif

		float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {
			// Not required if searchTex accesses are set to point:
			// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);
			// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +
			//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;
			e.r = bias + e.r * scale;
			return 255.0 * texture2D( searchTex, e, 0.0 ).r;
		}

		float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			/**
				* @PSEUDO_GATHER4
				* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to
				* sample between edge, thus fetching four edges in a row.
				* Sampling with different offsets in each direction allows to disambiguate
				* which edges are active from the four fetched ones.
				*/
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			// We correct the previous (-0.25, -0.125) offset we applied:
			texcoord.x += 0.25 * resolution.x;

			// The searches are bias by 1, so adjust the coords accordingly:
			texcoord.x += resolution.x;

			// Disambiguate the length added by the last step:
			texcoord.x += 2.0 * resolution.x; // Undo last step
			texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);

			return texcoord.x;
		}

		float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			texcoord.x -= 0.25 * resolution.x;
			texcoord.x -= resolution.x;
			texcoord.x -= 2.0 * resolution.x;
			texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );

			return texcoord.x;
		}

		float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y; // WebGL port note: Changed sign
			texcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y; // WebGL port note: Changed sign
			texcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {
			// Rounding prevents precision errors of bilinear filtering:
			vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;

			// We do a scale and bias for mapping to texel space:
			texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );

			// Move to proper place, according to the subpixel offset:
			texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;

			return texture2D( areaTex, texcoord, 0.0 ).rg;
		}

		vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {
			vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );

			vec2 e = texture2D( edgesTex, texcoord ).rg;

			if ( e.g > 0.0 ) { // Edge at north
				vec2 d;

				// Find the distance to the left:
				vec2 coords;
				coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );
				coords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)
				d.x = coords.x;

				// Now fetch the left crossing edges, two at a time using bilinear
				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to
				// discern what value each edge has:
				float e1 = texture2D( edgesTex, coords, 0.0 ).r;

				// Find the distance to the right:
				coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );
				d.y = coords.x;

				// We want the distances to be in pixel units (doing this here allow to
				// better interleave arithmetic and memory accesses):
				d = d / resolution.x - pixcoord.x;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the right crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;

				// Ok, we know how this pattern looks like, now it is time for getting
				// the actual area:
				weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );
			}

			if ( e.r > 0.0 ) { // Edge at west
				vec2 d;

				// Find the distance to the top:
				vec2 coords;

				coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );
				coords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;
				d.x = coords.y;

				// Fetch the top crossing edges:
				float e1 = texture2D( edgesTex, coords, 0.0 ).g;

				// Find the distance to the bottom:
				coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );
				d.y = coords.y;

				// We want the distances to be in pixel units:
				d = d / resolution.y - pixcoord.y;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the bottom crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;

				// Get the area for this direction:
				weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );
			}

			return weights;
		}

		void main() {

			gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );

		}`},Cl={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new le(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		void SMAANeighborhoodBlendingVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAANeighborhoodBlendingVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform sampler2D tColor;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {
			// Fetch the blending weights for current pixel:
			vec4 a;
			a.xz = texture2D( blendTex, texcoord ).xz;
			a.y = texture2D( blendTex, offset[ 1 ].zw ).g;
			a.w = texture2D( blendTex, offset[ 1 ].xy ).a;

			// Is there any blending weight with a value greater than 0.0?
			if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {
				return texture2D( colorTex, texcoord, 0.0 );
			} else {
				// Up to 4 lines can be crossing a pixel (one through each edge). We
				// favor blending by choosing the line with the maximum weight for each
				// direction:
				vec2 offset;
				offset.x = a.a > a.b ? a.a : -a.b; // left vs. right
				offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs

				// Then we go in the direction that has the maximum weight:
				if ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical
					offset.y = 0.0;
				} else {
					offset.x = 0.0;
				}

				// Fetch the opposite color and lerp by hand:
				vec4 C = texture2D( colorTex, texcoord, 0.0 );
				texcoord += sign( offset ) * resolution;
				vec4 Cop = texture2D( colorTex, texcoord, 0.0 );
				float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );

				// WebGL port note: Added gamma correction
				C.xyz = pow(C.xyz, vec3(2.2));
				Cop.xyz = pow(Cop.xyz, vec3(2.2));
				vec4 mixed = mix(C, Cop, s);
				mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));

				return mixed;
			}
		}

		void main() {

			gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );

		}`};class ZM extends Xi{constructor(){super(),this._edgesRT=new Vt(1,1,{depthBuffer:!1,type:Qt}),this._edgesRT.texture.name="SMAAPass.edges",this._weightsRT=new Vt(1,1,{depthBuffer:!1,type:Qt}),this._weightsRT.texture.name="SMAAPass.weights";const e=this,t=new Image;t.src=this._getAreaTexture(),t.onload=function(){e._areaTexture.needsUpdate=!0},this._areaTexture=new Nt,this._areaTexture.name="SMAAPass.area",this._areaTexture.image=t,this._areaTexture.minFilter=Gt,this._areaTexture.generateMipmaps=!1,this._areaTexture.flipY=!1;const i=new Image;i.src=this._getSearchTexture(),i.onload=function(){e._searchTexture.needsUpdate=!0},this._searchTexture=new Nt,this._searchTexture.name="SMAAPass.search",this._searchTexture.image=i,this._searchTexture.magFilter=It,this._searchTexture.minFilter=It,this._searchTexture.generateMipmaps=!1,this._searchTexture.flipY=!1,this._uniformsEdges=gi.clone(Ra.uniforms),this._materialEdges=new kt({defines:Object.assign({},Ra.defines),uniforms:this._uniformsEdges,vertexShader:Ra.vertexShader,fragmentShader:Ra.fragmentShader}),this._uniformsWeights=gi.clone(Ca.uniforms),this._uniformsWeights.tDiffuse.value=this._edgesRT.texture,this._uniformsWeights.tArea.value=this._areaTexture,this._uniformsWeights.tSearch.value=this._searchTexture,this._materialWeights=new kt({defines:Object.assign({},Ca.defines),uniforms:this._uniformsWeights,vertexShader:Ca.vertexShader,fragmentShader:Ca.fragmentShader}),this._uniformsBlend=gi.clone(Cl.uniforms),this._uniformsBlend.tDiffuse.value=this._weightsRT.texture,this._materialBlend=new kt({uniforms:this._uniformsBlend,vertexShader:Cl.vertexShader,fragmentShader:Cl.fragmentShader}),this._fsQuad=new Ta(null)}render(e,t,i){this._uniformsEdges.tDiffuse.value=i.texture,this._fsQuad.material=this._materialEdges,e.setRenderTarget(this._edgesRT),this.clear&&e.clear(),this._fsQuad.render(e),this._fsQuad.material=this._materialWeights,e.setRenderTarget(this._weightsRT),this.clear&&e.clear(),this._fsQuad.render(e),this._uniformsBlend.tColor.value=i.texture,this._fsQuad.material=this._materialBlend,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this._fsQuad.render(e))}setSize(e,t){this._edgesRT.setSize(e,t),this._weightsRT.setSize(e,t),this._materialEdges.uniforms.resolution.value.set(1/e,1/t),this._materialWeights.uniforms.resolution.value.set(1/e,1/t),this._materialBlend.uniforms.resolution.value.set(1/e,1/t)}dispose(){this._edgesRT.dispose(),this._weightsRT.dispose(),this._areaTexture.dispose(),this._searchTexture.dispose(),this._materialEdges.dispose(),this._materialWeights.dispose(),this._materialBlend.dispose(),this._fsQuad.dispose()}_getAreaTexture(){return"data:image/png;base64,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"}_getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}}function ze(n,e,t){return{joints:{...n.joints,...e},offset:t??n.offset}}function ln(n,e,t){const i={},s=new Set([...Object.keys(n.joints),...Object.keys(e.joints)]);for(const o of s){const c=n.joints[o]??[0,0,0],l=e.joints[o]??[0,0,0];i[o]=[c[0]+(l[0]-c[0])*t,c[1]+(l[1]-c[1])*t,c[2]+(l[2]-c[2])*t]}const r=n.offset??[0,0,0],a=e.offset??[0,0,0];return{joints:i,offset:[r[0]+(a[0]-r[0])*t,r[1]+(a[1]-r[1])*t,r[2]+(a[2]-r[2])*t]}}const oe={joints:{hips:[.04,-.34,0],spine:[.06,.12,0],chest:[.04,.1,0],neck:[-.06,0,0],head:[0,.16,0],shoulderL:[0,0,-.12],armL:[-.78,.1,-.16],forearmL:[-2.3,0,.2],handL:[0,0,0],shoulderR:[0,0,.12],armR:[-.62,-.1,.2],forearmR:[-2.42,0,-.24],handR:[0,0,0],thighL:[-.34,.06,.06],shinL:[.42,0,0],footL:[-.12,0,0],thighR:[.3,-.06,-.06],shinR:[.5,0,0],footR:[-.42,0,0]},offset:[0,-.075,0]},nn=ze(oe,{hips:[.06,-.42,0],spine:[.1,.16,0],thighR:[.44,-.06,-.06],shinR:[.62,0,0]},[0,-.11,-.05]),QM=ze(oe,{hips:[.04,-.22,0],chest:[.04,-.16,0],shoulderL:[0,0,-.3],armL:[-1.42,.16,-.06],forearmL:[-.1,0,0],armR:[-.58,-.1,.24]},[0,-.075,.14]),jM=ze(nn,{hips:[.05,.06,0],spine:[.1,-.2,0],chest:[.05,-.24,0],shoulderR:[0,0,.3],armR:[-1.48,-.18,.06],forearmR:[-.08,0,0],armL:[-.7,.1,-.34],forearmL:[-2.4,0,.24],thighR:[.12,-.06,-.06],footR:[-.62,0,0]},[0,-.085,.2]),$M=ze(oe,{hips:[.04,-.02,0],spine:[.05,-.24,0],chest:[.02,-.2,0],shoulderL:[0,0,-.36],armL:[-1.62,.9,-.2],forearmL:[-1.5,0,0]},[0,-.075,.13]),e1=ze(nn,{hips:[.04,.1,0],spine:[.06,-.26,0],chest:[.03,-.22,0],shoulderR:[0,0,.36],armR:[-1.6,-.95,.2],forearmR:[-1.52,0,0]},[0,-.09,.15]),t1=ze(nn,{hips:[-.06,.04,0],spine:[-.14,-.18,0],chest:[-.1,-.18,0],armR:[-1.15,-.2,.24],forearmR:[-1.95,0,-.1],armL:[-.72,.1,-.3]},[0,-.09,.17]),n1=ze(nn,{hips:[.14,.04,0],spine:[.24,-.22,0],chest:[.16,-.2,.14],armR:[-2.1,-.5,.2],forearmR:[-.9,0,0]},[0,-.08,.22]),nf=ze(oe,{hips:[.3,0,0],spine:[.2,-.18,0],armR:[-1.9,-.2,.06],forearmR:[-.1,0,0],thighL:[.9,.06,.06],shinL:[.9,0,0],thighR:[1,-.06,-.06],shinR:[.7,0,0]},[0,.16,.24]),sf=ze(oe,{hips:[.04,.6,0],spine:[.04,.4,0],chest:[.02,.3,0],armR:[-1.5,-1.2,.4],forearmR:[-.4,0,0]},[0,-.075,.12]),i1=ze(nn,{hips:[.04,.08,0],spine:[.08,-.28,0],chest:[.04,-.24,0],shoulderR:[0,0,.44],armR:[-1.9,-.85,.3],forearmR:[-2.4,0,0]}),rf=ze(oe,{hips:[-.16,-.2,0],spine:[-.18,.08,0],armL:[-1.1,.3,-.2],armR:[-1.05,-.3,.24],forearmL:[-1.9,0,0],forearmR:[-1.9,0,0],thighR:[-1.55,-.1,-.06],shinR:[1.9,0,0],thighL:[-.16,.06,.06],shinL:[.18,0,0]},[0,.02,.06]),af=ze(rf,{hips:[-.2,-.16,0],thighR:[-1.75,-.1,-.06],shinR:[1.6,0,0],thighL:[-.6,.06,.06],shinL:[1.5,0,0]},[0,.42,.18]);function Ll(n,e,t){return ze(oe,{hips:[.02,-.9,e*.4],spine:[-e*.5,.4,e*.6],chest:[-e*.3,.2,e*.4],armL:[-.4,.2,-.9],forearmL:[-1.2,0,0],armR:[-.2,-.2,1.1],forearmR:[-.6,0,0],thighR:[n,-.2,-1.05],shinR:[.34,0,0],footR:[-.3,0,0],thighL:[-.08,.06,.06],shinL:[.14,0,0],footL:[.5,0,0]},[0,t,.02])}const s1=Ll(-.55,.2,-.04),r1=Ll(-1.15,.5,.02),a1=Ll(-1.75,.85,.08),o1=ze(oe,{hips:[-.18,-.28,0],spine:[-.24,.1,0],armL:[-.9,.2,-.5],armR:[-.5,-.2,.6],thighR:[-1.5,-.06,-.06],shinR:[.12,0,0],footR:[-.5,0,0]},[0,-.02,.04]),c1=ze(oe,{hips:[0,-1.35,.14],spine:[-.2,.6,-.2],chest:[-.1,.4,-.1],armL:[-.8,.2,-.7],armR:[-.2,-.2,.9],thighR:[-1.35,-.1,-.5],shinR:[.1,0,0],footR:[-.2,0,0]},[0,.02,0]),ti=ze(oe,{hips:[.02,2.4,0],spine:[.06,.5,0],chest:[.04,.3,0],armL:[-.5,.3,-.8],armR:[-.5,-.3,.8],thighR:[-.7,-.06,-.3],shinR:[1,0,0]},[0,-.04,0]);function La(n,e){const t=n.joints.hips??[0,0,0];return ze(n,{hips:[t[0],e,t[2]]})}const of=ze(ti,{hips:[.06,Math.PI,0],spine:[.1,.4,0],chest:[.06,.2,0],armL:[-.9,.3,-.5],forearmL:[-1.6,0,0],armR:[-.9,-.3,.5],forearmR:[-1.6,0,0],thighR:[2,0,-.06],shinR:[.1,0,0],footR:[.3,0,0],thighL:[-.1,.06,.06],shinL:[.16,0,0]},[0,-.02,.06]),cf=ze(oe,{hips:[.04,Math.PI*2-.34,0]}),Pl=Math.PI*2+.93,Dl=ze(ti,{hips:[.02,Pl,.08],spine:[-.1,.4,-.08],chest:[-.06,.2,-.06],thighR:[-1.7,-.2,-.95],shinR:[.2,0,0],thighL:[-.06,.06,.06],shinL:[.12,0,0]},[0,.06,.04]),lf=ze(oe,{spine:[.14,.06,0],neck:[.18,0,0],head:[.1,.1,0],armL:[-1.15,.35,-.42],forearmL:[-2.35,0,.5],armR:[-1.15,-.35,.42],forearmR:[-2.35,0,-.5]},[0,-.13,-.02]),l1=ze(oe,{hips:[.08,-.4,.22],spine:[.18,.16,.3],chest:[.1,.1,.22],neck:[.1,0,.16],thighL:[-.46,.06,.06],shinL:[.6,0,0]},[.12,-.17,-.03]),hf=ze(oe,{neck:[-.24,-.1,0],head:[-.16,.24,.1],spine:[-.06,.14,0]},[0,-.08,-.05]),Ki=ze(oe,{hips:[-.12,-.3,0],spine:[-.26,.2,.1],chest:[-.18,.16,.08],neck:[-.5,-.16,0],head:[-.3,.3,.16],armL:[-.4,.1,-.3],forearmL:[-1.6,0,0],armR:[-.3,-.1,.34],forearmR:[-1.5,0,0],thighL:[-.1,.06,.06],shinL:[.3,0,0]},[0,-.12,-.18]),Il=ze(Ki,{hips:[-.2,-.1,.3],spine:[-.34,.1,.34],neck:[-.55,-.2,.12],armL:[-.2,.2,-.9],forearmL:[-.7,0,0],armR:[-.1,-.2,.8],forearmR:[-.5,0,0],thighL:[-.7,.1,.2],shinL:[.8,0,0],thighR:[.2,-.06,-.2],shinR:[.4,0,0]},[.18,-.22,-.3]),Nl=ze(oe,{hips:[.42,-.3,0],spine:[.44,.12,.06],chest:[.3,.1,.04],neck:[.36,0,0],head:[.16,.14,0],armL:[-.34,.4,-.5],forearmL:[-2.5,0,.5],armR:[-.28,-.4,.52],forearmR:[-2.5,0,-.5],thighL:[-.6,.06,.08],shinL:[.8,0,0],thighR:[-.2,-.06,-.08],shinR:[.7,0,0]},[0,-.22,-.08]),kl=ze(oe,{hips:[.06,-.36,.26],spine:[.1,.12,-.14],chest:[.04,.1,-.08],neck:[-.02,0,-.08],armL:[-.66,.1,-.24],forearmL:[-2.2,0,.22],armR:[-.5,-.1,.3],forearmR:[-2.3,0,-.28],thighL:[-.16,.06,.3],shinL:[.96,0,0],footL:[-.3,0,0],thighR:[.22,-.06,-.18],shinR:[.72,0,0]},[.1,-.2,-.04]),Pa=ze(oe,{hips:[.8,-.2,0],spine:[.5,.1,0],chest:[.3,.1,0],neck:[-.5,0,0],armL:[-2.5,.4,-.3],forearmL:[-.5,0,0],armR:[-2.5,-.4,.3],forearmR:[-.5,0,0],thighL:[.7,.06,.1],shinL:[.2,0,0],thighR:[.7,-.06,-.1],shinR:[.2,0,0]},[0,-.5,-.34]),ni=ze(oe,{hips:[.34,-.34,0],spine:[.28,.12,0],thighL:[-.9,.06,.1],shinL:[1.2,0,0],thighR:[-.6,-.06,-.1],shinR:[1.3,0,0]},[0,-.3,.04]),Xt=ze(oe,{hips:[.12,-.16,0],spine:[.2,.06,0],chest:[.14,0,0],neck:[-.3,.3,0],armL:[-1.5,.5,-.5],forearmL:[-1.9,0,.6],armR:[-1.5,-.5,.5],forearmR:[-1.9,0,-.6],thighL:[-.3,.06,.1],shinL:[.4,0,0],thighR:[.1,-.06,-.1],shinR:[.5,0,0]},[0,-.11,.06]),uf=ze(oe,{hips:[-.1,-.3,0],armL:[-1.6,.3,-.7],forearmL:[-.9,0,0],armR:[-1.6,-.3,.7],forearmR:[-.9,0,0]},[0,-.08,-.2]),gr={joints:{hips:[-1.5,0,0],spine:[-.1,0,0],chest:[-.06,0,0],neck:[.5,0,0],head:[.2,0,0],armL:[-.6,.2,-.7],forearmL:[-1.8,0,0],armR:[-.6,-.2,.7],forearmR:[-1.8,0,0],thighL:[-.7,.1,.3],shinL:[1.3,0,0],footL:[-.4,0,0],thighR:[-.7,-.1,-.3],shinR:[1.3,0,0],footR:[-.4,0,0]},offset:[0,-.66,-.18]},wt={joints:{hips:[.24,0,0],spine:[.16,0,0],chest:[.1,0,0],neck:[-.2,0,0],armL:[-1.2,.3,-.4],forearmL:[-1.5,0,0],armR:[-1.2,-.3,.4],forearmR:[-1.5,0,0],thighL:[-1.5,.1,.5],shinL:[2.2,0,0],thighR:[-1.5,-.1,-.5],shinR:[2.2,0,0]},offset:[0,-.44,0]},Da=ze(gr,{neck:[.8,0,0],spine:[.2,0,0],thighL:[-1.5,.1,.4],shinL:[1.7,0,0],thighR:[-1.5,-.1,-.4],shinR:[1.7,0,0],armL:[-1.4,.3,-.4],forearmL:[-1.7,0,0],armR:[-1.4,-.3,.4],forearmR:[-1.7,0,0]},[0,-.6,-.16]),df={joints:{hips:[1.2,0,0],spine:[.3,0,0],chest:[.2,0,0],neck:[-.8,0,0],armL:[-2.2,.3,-.3],forearmL:[-1.6,0,0],armR:[-2.2,-.3,.3],forearmR:[-1.6,0,0],thighL:[-.4,.1,.3],shinL:[2.3,0,0],thighR:[-.4,-.1,-.3],shinR:[2.3,0,0]},offset:[0,-.5,-.1]},ff=ze(wt,{spine:[.3,-.16,0],armR:[-2.6,-.4,.3],forearmR:[-.4,0,0]}),Ol=ze(wt,{spine:[.42,-.1,0],chest:[.24,-.1,0],armR:[-.5,-.2,.3],forearmR:[-.5,0,0]}),Ps=ze(wt,{spine:[.4,.1,0],chest:[.24,.1,0],neck:[-.4,.2,0],armL:[-1.9,.7,-.55],forearmL:[-2.5,0,.7],armR:[-1.9,-.7,.55],forearmR:[-2.5,0,-.7]},[0,-.46,-.1]),Ia=ze(gr,{hips:[-1.35,.4,0],spine:[-.3,.2,0],armL:[-1.9,.6,-.5],forearmL:[-2.2,0,.4],armR:[-1.9,-.6,.5],forearmR:[-2.2,0,-.4],thighL:[-1.4,.1,.4],shinL:[.9,0,0],thighR:[-1.3,-.1,-.4],shinR:[.6,0,0]},[0,-.6,.1]),Na=ze(gr,{neck:[.9,.2,0],spine:[.24,.1,0],armL:[-1.5,.6,-.5],forearmL:[-2.4,0,.6],armR:[-1.5,-.6,.5],forearmR:[-2.4,0,-.6],thighL:[-1.1,.1,.4],shinL:[1.1,0,0]},[0,-.56,-.16]),ka=ze(gr,{neck:[.3,.3,0],head:[.1,.3,0],armL:[-.3,.2,-1.1],forearmL:[-.6,0,0],armR:[-.3,-.2,1.1],forearmR:[-.5,0,0],thighL:[-.3,.1,.4],shinL:[.5,0,0],thighR:[-.4,-.1,-.3],shinR:[.7,0,0]},[0,-.68,-.3]),vr={joints:{hips:[.6,-.3,0],spine:[.4,.2,0],chest:[.2,.1,0],neck:[-.5,0,0],armL:[-2,.4,-.4],forearmL:[-.8,0,0],armR:[-1.2,-.3,.5],forearmR:[-1.4,0,0],thighL:[-1.5,.1,.3],shinL:[1.6,0,0],thighR:[-.2,-.1,-.3],shinR:[2.2,0,0]},offset:[0,-.44,-.06]},xr=ze(oe,{hips:[.62,-.3,0],spine:[.4,.14,0],chest:[.24,.1,0],neck:[-.5,0,0],armL:[-2.2,.5,-.3],forearmL:[-.7,0,0],armR:[-2.2,-.5,.3],forearmR:[-.7,0,0],thighL:[-1.3,.1,.2],shinL:[1.5,0,0],thighR:[-.1,-.1,-.2],shinR:[1.7,0,0]},[0,-.42,.36]),Ul=ze(xr,{hips:[.9,-.24,0],spine:[.3,.1,0],thighL:[-.9,.1,.2],shinL:[1,0,0],thighR:[.4,-.1,-.2],shinR:[.9,0,0]},[0,-.5,.62]),_r=ze(oe,{hips:[-.2,-.2,0],spine:[-.24,.1,0],chest:[-.14,.1,0],armL:[-2.4,.5,-.4],forearmL:[-1.4,0,0],armR:[-2.4,-.5,.4],forearmR:[-1.4,0,0],thighL:[-.5,.1,.14],shinL:[.7,0,0],thighR:[-.3,-.1,-.14],shinR:[.6,0,0]},[0,-.02,.2]),Fl=ze(oe,{hips:[.8,-.2,0],spine:[.5,.1,0],armL:[-2.6,.4,-.3],forearmL:[-.6,0,0],armR:[-2.6,-.4,.3],forearmR:[-.6,0,0],thighL:[-1.4,.1,.3],shinL:[2,0,0],thighR:[-1.4,-.1,-.3],shinR:[2,0,0]},[0,-.44,.34]),h1=ze(_r,{hips:[-.7,-.2,0],spine:[-.5,.1,0],chest:[-.3,.1,0],neck:[.4,0,0],armL:[-2.8,.5,-.4],armR:[-2.8,-.5,.4],thighL:[-.2,.1,.14],thighR:[0,-.1,-.14]},[0,.06,.08]),Fn=ze(oe,{hips:[.02,-.2,0],armL:[-.5,.1,-.24],forearmL:[-1.4,0,.1],armR:[-.5,-.1,.24],forearmR:[-1.4,0,-.1]},[0,-.04,0]),pf=ze(oe,{hips:[.2,-.1,0],spine:[.16,.06,0],armL:[-1.3,.3,-.2],forearmL:[-.5,0,0],armR:[-1.3,-.3,.2],forearmR:[-.5,0,0]},[0,-.1,.06]),Sr=ze(oe,{hips:[-.06,-.1,0],spine:[-.12,0,0],neck:[.2,0,0],head:[.1,0,0],armL:[-2.9,.3,-.5],forearmL:[-.3,0,0],armR:[-2.9,-.3,.5],forearmR:[-.3,0,0],thighL:[-.1,.06,.06],shinL:[.12,0,0],thighR:[.1,-.06,-.06],shinR:[.12,0,0]},[0,-.01,0]),Bl={joints:{hips:[.16,0,0],spine:[.1,0,0],chest:[.06,0,0],neck:[-.3,0,0],armL:[-.9,.2,-.4],forearmL:[-1.5,0,0],armR:[-.9,-.2,.4],forearmR:[-1.5,0,0],thighL:[-1.5,.1,.2],shinL:[1.5,0,0],thighR:[-1.5,-.1,-.2],shinR:[1.5,0,0]},offset:[0,-.42,-.06]},Ds=ze(oe,{hips:[-.1,-.3,.24],spine:[-.2,.1,.2],neck:[-.3,-.2,.14],head:[-.1,.2,.2],armL:[-.4,.2,-.5],forearmL:[-1,0,0],armR:[-.3,-.2,.5],forearmR:[-.9,0,0],thighL:[-.5,.1,.2],shinL:[.7,0,0],thighR:[.2,-.06,-.16],shinR:[.5,0,0]},[.08,-.2,-.06]),Gl=ze(oe,{neck:[-.16,0,0],armL:[-2.3,.3,-.24],forearmL:[-2.2,0,.4],armR:[-.6,-.1,.2],forearmR:[-2.3,0,-.24]},[0,-.09,-.06]);function je(n,e,t){return{duration:n,impactAt:e,keys:t,variants:1}}function z(n,e,t){return t?{t:n,pose:e,ease:t}:{t:n,pose:e}}function Kt(n,e,t,i=oe){return je(t,.45,[z(0,i),z(.2,n,"anticipate"),z(.45,e,"snap"),z(.53,ln(n,e,1.08),"linear"),z(.74,ln(i,e,.22),"settle"),z(1,i,"settle")])}function Yi(n,e,t=oe){const i=[z(0,t)],s=["anticipate","snap","settle"];return e.forEach((r,a)=>{i.push(z((a+1)/e.length,r,s[Math.min(a,s.length-1)]))}),je(n,.72,i)}const u1={strike_jab:Kt(oe,QM,.4),strike_cross:Kt(nn,jM,.5),strike_hook_left:Kt(oe,$M,.52),strike_hook_right:Kt(nn,e1,.54),strike_uppercut:Kt(nn,t1,.5),strike_overhand:Kt(nn,n1,.62),strike_elbow:Kt(Xt,i1,.48,Xt),strike_knee:Kt(Xt,rf,.54,Xt),strike_superman:je(.72,.52,[z(0,oe),z(.22,ni,"anticipate"),z(.52,nf,"snap"),z(.6,ln(ni,nf,1.06),"linear"),z(1,oe,"settle")]),strike_backfist:je(.62,.58,[z(0,oe),z(.34,ti,"anticipate"),z(.58,sf,"snap"),z(.66,ln(ti,sf,1.07),"linear"),z(1,oe,"settle")]),strike_flying_knee:je(.82,.48,[z(0,oe),z(.2,ni,"anticipate"),z(.48,af,"snap"),z(.58,ln(ni,af,1.05),"linear"),z(.86,ni,"settle"),z(1,oe,"settle")]),kick_low:Kt(nn,s1,.52),kick_body:Kt(nn,r1,.62),kick_head:Kt(nn,a1,.72),kick_front:Kt(oe,o1,.52),kick_side:Kt(nn,c1,.62),kick_spinning_back:je(.88,.64,[z(0,oe),z(.24,La(ti,1.1),"anticipate"),z(.46,ti,"linear"),z(.64,of,"snap"),z(.72,ln(ti,of,1.06),"linear"),z(1,cf,"settle")]),kick_wheel:je(.96,.68,[z(0,oe),z(.2,La(ti,1.1),"anticipate"),z(.38,ti,"linear"),z(.54,La(Dl,Pl-2.1),"linear"),z(.68,Dl,"snap"),z(.77,La(Dl,Pl+.22),"linear"),z(1,cf,"settle")]),ground_punch:Kt(wt,Ol,.4,wt),ground_elbow:Kt(ff,Ol,.46,wt),ground_hammerfist:Kt(ff,Ol,.42,wt)},d1={td_double_leg:Yi(1,[xr,Ul,wt]),td_single_leg:Yi(1.05,[xr,_r,wt]),td_body_lock:Yi(1,[Xt,_r,wt],Xt),td_trip:Yi(.9,[Xt,Ul,wt],Xt),td_throw:Yi(1.05,[Xt,_r,Fl,wt],Xt),td_suplex:je(1.35,.66,[z(0,Xt),z(.24,_r),z(.46,h1),z(.66,Fl),z(.84,vr),z(1,wt)]),td_ankle_pick:Yi(.92,[xr,Fl,wt]),td_cage_drag:Yi(1,[Xt,Ul,wt],Xt)};function _i(n=1.2){return je(n,.75,[z(0,wt),z(.34,Ps),z(.75,Ps),z(1,Ps)])}function mf(n=1.25){return je(n,.72,[z(0,wt),z(.32,vr),z(.72,Ia),z(1,Ia)])}const f1={sub_rnc:_i(1.3),sub_guillotine:_i(1.15),sub_triangle:je(1.25,.74,[z(0,Da),z(.36,Na),z(.74,Na),z(1,Na)]),sub_armbar:je(1.3,.74,[z(0,wt),z(.34,Ps),z(.74,Ia),z(1,Ia)]),sub_kimura:_i(1.2),sub_americana:_i(1.15),sub_darce:_i(1.2),sub_anaconda:_i(1.2),sub_arm_triangle:_i(1.25),sub_neck_crank:_i(1.1),sub_heel_hook:mf(1.25),sub_kneebar:mf(1.3)},p1={def_sprawl:je(.7,.4,[z(0,oe),z(.24,ni),z(.5,Pa),z(.72,Pa),z(1,oe)]),clinch_enter:je(.7,.6,[z(0,oe),z(.4,ni),z(1,Xt)]),clinch_break:je(.6,.35,[z(0,Xt),z(.4,uf),z(1,oe)]),scramble:je(.9,.5,[z(0,Da),z(.3,vr),z(.62,df),z(1,vr)]),knockdown:je(1.15,.28,[z(0,oe),z(.14,Ki,"snap"),z(.42,Il,"settle"),z(.72,ka,"anticipate"),z(1,ka,"settle")]),stun_wobble:je(1,.36,[z(0,oe),z(.26,Ki,"snap"),z(.62,Ds,"settle"),z(1,Ds,"smooth")]),reaction_cut:je(.9,.35,[z(0,oe),z(.3,hf),z(.6,Gl),z(1,oe)]),stance_idle:je(2.2,.5,[z(0,oe),z(.25,nn),z(.5,oe),z(.75,Fn),z(1,oe)]),intro_touch_gloves:je(1.3,.55,[z(0,Fn),z(.5,pf),z(.7,pf),z(1,oe)]),round_end_return:je(1.4,.5,[z(0,oe),z(.4,Fn),z(1,Fn)]),corner_seated:je(2,.5,[z(0,Bl),z(.5,Bl),z(1,Bl)]),ref_intervene:je(1,.4,[z(0,oe),z(.4,uf),z(1,Fn)]),doctor_check:je(1.6,.5,[z(0,Fn),z(.4,Gl),z(.8,Gl),z(1,Fn)]),fight_end_celebrate:je(2,.35,[z(0,oe),z(.3,Sr),z(.6,Sr),z(.8,Fn),z(1,Sr)]),decision_announce:je(2,.5,[z(0,Fn),z(.35,Fn),z(.6,Sr),z(1,Sr)])},gf={...u1,...d1,...f1,...p1},m1=gf.stance_idle,vf={NONE:je(.3,0,[z(0,oe),z(1,oe)]),LIGHT:je(.42,0,[z(0,oe),z(.22,hf,"snap"),z(1,oe,"settle")]),HEAVY:je(.72,0,[z(0,oe),z(.18,ln(oe,Ki,1.12),"snap"),z(.42,Ki,"linear"),z(.68,Ds,"settle"),z(1,oe,"settle")]),STAGGER:je(1.1,0,[z(0,oe),z(.15,ln(oe,Ki,1.15),"snap"),z(.42,Il,"settle"),z(.76,Ds,"smooth"),z(1,Ds,"settle")]),DROP:je(1.25,0,[z(0,oe),z(.13,ln(oe,Ki,1.18),"snap"),z(.4,Il,"settle"),z(.72,ka,"anticipate"),z(1,ka,"settle")]),BLOCK:je(.44,0,[z(0,oe),z(.2,lf,"snap"),z(.5,lf,"linear"),z(1,oe,"settle")]),SLIP:je(.5,0,[z(0,oe),z(.26,l1,"snap"),z(1,oe,"settle")]),BODY_FOLD:je(.85,0,[z(0,oe),z(.16,ln(oe,Nl,1.1),"snap"),z(.44,Nl,"linear"),z(.78,ln(oe,Nl,.4),"settle"),z(1,oe,"settle")]),LEG_BUCKLE:je(.72,0,[z(0,oe),z(.14,ln(oe,kl,1.12),"snap"),z(.4,kl,"linear"),z(.74,ln(oe,kl,.35),"settle"),z(1,oe,"settle")]),SPRAWL_DEFEND:je(.8,0,[z(0,oe),z(.22,ni,"anticipate"),z(.5,Pa,"snap"),z(1,oe,"settle")])};function Oa(n,e){const t=e==="REACTOR";switch(n){case"STANDING":return oe;case"CLINCH":case"CAGE_CLINCH":return Xt;case"TAKEDOWN_ATTEMPT":return t?Pa:xr;case"GROUND_TOP":case"SIDE_CONTROL":case"MOUNT":return t?gr:wt;case"GROUND_BOTTOM":return t?wt:Da;case"GUARD":case"HALF_GUARD":return t?Da:wt;case"BACK_CONTROL":return t?df:Ps;case"SCRAMBLE":return vr;case"SUBMISSION_ATTEMPT":return t?Na:Ps;case"STUNNED":return Ds;case"RECOVERY":return ni;default:return oe}}function Hl(n){switch(n){case"GROUND_TOP":case"GROUND_BOTTOM":case"GUARD":case"HALF_GUARD":case"SIDE_CONTROL":case"MOUNT":case"BACK_CONTROL":case"SCRAMBLE":case"SUBMISSION_ATTEMPT":return!0;default:return!1}}const xf=[1,.93,1.08,.97],g1=[0,.06,-.05,.03];function v1(n,e){if(e<=0)return n;const t=e%xf.length,i=xf[t]??1,s=g1[t]??0;return i===1&&s===0?n:{...n,duration:n.duration*i,keys:n.keys.map(({t:r,pose:a})=>({t:r,pose:{joints:{...a.joints,spine:x1(a.joints.spine,s)},offset:a.offset}}))}}function x1(n,e){const t=n??[0,0,0];return[t[0],t[1]+e,t[2]]}function _1(n,e=0){return v1(gf[n]??m1,e)}const Si=["hips","spine","chest","neck","head","shoulderL","armL","forearmL","handL","shoulderR","armR","forearmR","handR","thighL","shinL","footL","thighR","shinR","footR"],bn={hips:{parent:null,offset:[0,.92,0],length:.14,axis:"UP",radius:.122,shape:"BOX"},spine:{parent:"hips",offset:[0,.14,0],length:.24,axis:"UP",radius:.128,shape:"BOX"},chest:{parent:"spine",offset:[0,.24,0],length:.2,axis:"UP",radius:.152,shape:"BOX"},neck:{parent:"chest",offset:[0,.2,0],length:.07,axis:"UP",radius:.058,shape:"BOX"},head:{parent:"neck",offset:[0,.07,0],length:.2,axis:"UP",radius:.108,shape:"SPHERE"},shoulderL:{parent:"chest",offset:[.175,.145,0],length:.06,axis:"DOWN",radius:.066,shape:"SPHERE"},armL:{parent:"shoulderL",offset:[0,-.06,0],length:.29,axis:"DOWN",radius:.055,shape:"CAPSULE"},forearmL:{parent:"armL",offset:[0,-.29,0],length:.26,axis:"DOWN",radius:.047,shape:"CAPSULE"},handL:{parent:"forearmL",offset:[0,-.26,0],length:.12,axis:"DOWN",radius:.066,shape:"SPHERE"},shoulderR:{parent:"chest",offset:[-.175,.145,0],length:.06,axis:"DOWN",radius:.066,shape:"SPHERE"},armR:{parent:"shoulderR",offset:[0,-.06,0],length:.29,axis:"DOWN",radius:.055,shape:"CAPSULE"},forearmR:{parent:"armR",offset:[0,-.29,0],length:.26,axis:"DOWN",radius:.047,shape:"CAPSULE"},handR:{parent:"forearmR",offset:[0,-.26,0],length:.12,axis:"DOWN",radius:.066,shape:"SPHERE"},thighL:{parent:"hips",offset:[.095,0,0],length:.44,axis:"DOWN",radius:.082,shape:"CAPSULE"},shinL:{parent:"thighL",offset:[0,-.44,0],length:.43,axis:"DOWN",radius:.068,shape:"CAPSULE"},footL:{parent:"shinL",offset:[0,-.43,0],length:.24,axis:"FORWARD",radius:.05,shape:"BOX"},thighR:{parent:"hips",offset:[-.095,0,0],length:.44,axis:"DOWN",radius:.082,shape:"CAPSULE"},shinR:{parent:"thighR",offset:[0,-.44,0],length:.43,axis:"DOWN",radius:.068,shape:"CAPSULE"},footR:{parent:"shinR",offset:[0,-.43,0],length:.24,axis:"FORWARD",radius:.05,shape:"BOX"}},zl=(()=>{const n=[],e=new Set;for(;n.length<Si.length;){let t=!1;for(const i of Si){if(e.has(i))continue;const s=bn[i].parent;(s===null||e.has(s))&&(n.push(i),e.add(i),t=!0)}if(!t)throw new Error("SKELETON contains a cycle")}return n})(),_f=[0,0,0];function En(n){const e={};for(const t of Si)e[t]=n.joints[t]??_f;return{joints:e,offset:n.offset??_f}}function Vl(n,e,t){return[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t]}function Wl(n,e){let t=(e-n)%(Math.PI*2);return t>Math.PI&&(t-=Math.PI*2),t<=-Math.PI&&(t+=Math.PI*2),t}function Xl(n,e,t){if(t<=0)return n;const i={};for(const s of Si){const r=n.joints[s],a=e.joints[s];i[s]=[r[0]+Wl(r[0],a[0])*t,r[1]+Wl(r[1],a[1])*t,r[2]+Wl(r[2],a[2])*t]}return{joints:i,offset:Vl(n.offset,e.offset,t)}}function S1(n,e,t){if(t<=0)return n;if(t>=1)return e;const i={};for(const s of Si)i[s]=Vl(n.joints[s],e.joints[s],t);return{joints:i,offset:Vl(n.offset,e.offset,t)}}const Sf={linear:n=>n,smooth:n=>n*n*(3-2*n),anticipate:n=>n*n*(2-n*.35),snap:n=>Math.pow(n*n*(3-2*n),.6),settle:n=>1-Math.pow(1-n,2.2)};function Mf(n,e){const t=e<=0?0:e>=1?1:e;return(Sf[n]??Sf.smooth)(t)}function Ua(n){return Mf("smooth",n)}function yf(n,e){const t=n.keys,i=t[0],s=t[t.length-1];if(!i||!s)throw new Error("clip has no keyframes");if(e<=i.t)return En(i.pose);if(e>=s.t)return En(s.pose);for(let r=1;r<t.length;r++){const a=t[r],o=t[r-1];if(!(!a||!o)&&e<=a.t){const c=a.t-o.t,l=c<=0?1:Mf(a.ease??"smooth",(e-o.t)/c);return S1(En(o.pose),En(a.pose),l)}}return En(s.pose)}function M1(n,e,t,i,s){const r=new Map,a=c=>{let l=r.get(c);return l||(l=yf(n,e-c/Math.max(t,1e-4)),r.set(c,l)),l},o={};for(const c of Si)o[c]=a(i[s[c]]??0).joints[c];return{joints:o,offset:a(0).offset}}const Kl=.06,bf=.03;function Mr(n,e){return n>e?e:n<-e?-e:n}function vn(n,e,t,i,s){const r=n[e];n[e]=[r[0]+Mr(t,Kl),r[1]+Mr(i,Kl),r[2]+Mr(s,Kl)]}function y1(n,e){const{time:t,phase:i,fatigue:s,grounded:r}=e,a=e.guard??.5,o=e.verve??.5,c=Math.max(0,Math.min(1,e.stagger??0)),l=Math.max(0,Math.min(1,e.feint??0)),u=Math.max(0,Math.min(1,e.intensity));if(u<=.001)return n;const f=t+i,h=.38+s*.42,p=Math.sin(f*Math.PI*2*h),g=(.01+s*.017)*u,v=r?0:u*(1-s*.45)*(.65+o*.7),d=Math.sin(f*Math.PI*2*(1.63-s*.5+o*.25)),m=Math.sin(f*Math.PI*2*.41+1.2),y=Math.sin(f*Math.PI*2*.29+2.6),b=Math.sin(f*Math.PI*2*.87+.4),S=Math.sin(f*Math.PI*2*.73+2.1),A=u*(r?.3:1),E=(s+c*.8+(1-a)*.35)*u*(r?.2:1),C=c===0?0:Math.sin(f*Math.PI*2*.55)*c*u,_={...n.joints};vn(_,"spine",p*g+y*.012*v+l*.05,m*.02*v+C*.05,m*.014*v+C*.06),vn(_,"chest",p*g*.8,y*.016*v,-m*.01*v),vn(_,"neck",-p*g*.5+E*.05,y*.02*u,0),vn(_,"head",y*.02*u,b*.026*u,m*.012*u),vn(_,"armL",b*.03*A+E*.055-l*.06,S*.012*A,-b*.016*A),vn(_,"forearmL",S*.034*A+E*.05,0,b*.012*A),vn(_,"armR",S*.028*A+E*.055,b*.012*A,S*.016*A),vn(_,"forearmR",b*.031*A+E*.05,0,-S*.012*A),vn(_,"thighL",-d*.022*v,0,m*.014*v),vn(_,"shinL",d*.026*v,0,0),vn(_,"thighR",d*.022*v,0,-m*.014*v),vn(_,"shinR",-d*.024*v,0,0);const T=Mr((-Math.abs(d)*.014+p*.004)*v-l*.012-c*.02,bf),N=Mr(m*.018*v+C*.02,bf);return{joints:_,offset:[n.offset[0]+N,n.offset[1]+T,n.offset[2]]}}function b1(n,e=.5){const t=(n-1)/4.5;return Math.max(0,Math.min(1,t*(1.45-e*.9)))}function E1(n,e,t){const i=7.5-Math.max(0,Math.min(1,n))*3.6,s=e/(Math.PI*2)*i,r=(t+s)%i/i,a=.16;return r<a?Math.sin(r/a*Math.PI):0}function A1(n,e){let t=0;for(const i of n){if(i.at>e)break;const s=e-i.at,r=Math.exp(-s/3.2);t=Math.max(t,i.magnitude*r)}return Math.min(1,t)}const Ef=["LEGS","HIPS","SPINE","ARM_L","ARM_R","HEAD"],Yl={hips:"HIPS",spine:"SPINE",chest:"SPINE",neck:"HEAD",head:"HEAD",shoulderL:"ARM_L",armL:"ARM_L",forearmL:"ARM_L",handL:"ARM_L",shoulderR:"ARM_R",armR:"ARM_R",forearmR:"ARM_R",handR:"ARM_R",thighL:"LEGS",shinL:"LEGS",footL:"LEGS",thighR:"LEGS",shinR:"LEGS",footR:"LEGS"},T1={LEGS:1,HIPS:1,SPINE:1,ARM_L:1,ARM_R:1,HEAD:1};function w1(n){const e=En(oe),t={LEGS:0,HIPS:0,SPINE:0,ARM_L:0,ARM_R:0,HEAD:0};for(const i of n.keys){const s=En(i.pose);for(const r of Si){let a=0;for(let c=0;c<3;c++)a+=Math.abs(s.joints[r][c]-e.joints[r][c]);const o=Yl[r];t[o]=Math.max(t[o],a)}}return t}const R1=1.5;function C1(n){const e=w1(n),t={};for(const i of Ef)t[i]=Math.min(1,e[i]/R1);return t}const Af=new Map;function Tf(n){let e=Af.get(n);return e||(e=C1(n),Af.set(n,e)),e}const L1=new Set(["knockdown","td_double_leg","td_single_leg","td_body_lock","td_trip","td_throw","td_suplex","td_ankle_pick","td_cage_drag","scramble","def_sprawl","round_end_return","corner_seated","doctor_check","fight_end_celebrate","decision_announce","intro_touch_gloves"]);function wf(n){return L1.has(n)||n.startsWith("sub_")}const Rf={HIPS:0,LEGS:.006,SPINE:.022,ARM_L:.048,ARM_R:.048,HEAD:.034};Math.max(...Object.values(Rf));const Cf=.055,P1=.16,Fa=.24,D1=.055,I1=.28,N1=2.6,k1=[[.115,.155],[-.105,-.185]];function O1(n,e){const t=Math.cos(e),i=Math.sin(e);return[n[0]*t+n[1]*i,-n[0]*i+n[1]*t]}function Ba(n,e,t=0){const i=k1[e],s=O1([i[0],i[1]+t],n.yaw);return[n.x+s[0],n.z+s[1]]}function U1(n,e){return Math.hypot(n[0]-e[0],n[1]-e[1])}function Lf(n,e={}){const t=e.phase??0,i=Math.max(0,Math.min(1,e.mobility??.5)),s=Math.max(0,Math.min(1,e.pressure??.5)),r=P1*(1.35-i*.7),a=N1*(1.5-i*.9),o=(s-.5)*.06,c=n[0];if(!c)return{steps:[],start:[[0,0],[0,0]]};const l=[Ba(c,0,o),Ba(c,1,o)],u=[l[0],l[1]],f=[c.time-a*t,c.time-a*(1-t)],h=[];let p=-1/0;for(let g=1;g<n.length;g++){const v=n[g];if(!(v.time<p))for(const d of[0,1]){const m=Ba(v,d,o),y=U1(u[d],m),b=v.time-f[d]>a;if(y<r&&!(b&&y>.02)||v.time-f[d]<I1)continue;const S=n.find(E=>E.time>=v.time+Fa)??v,A=Ba(S,d,o);h.push({foot:d,lift:v.time,plant:v.time+Fa,from:u[d],to:A}),u[d]=A,f[d]=v.time+Fa,p=v.time+Fa;break}}return{steps:h,start:l}}function F1(n,e,t){let i=n.start[e];for(const s of n.steps)if(s.foot===e){if(t>=s.plant){i=s.to;continue}if(t>=s.lift){const r=(t-s.lift)/Math.max(s.plant-s.lift,1e-4),a=Ua(r);return{x:s.from[0]+(s.to[0]-s.from[0])*a,z:s.from[1]+(s.to[1]-s.from[1])*a,y:Cf+Math.sin(Math.PI*r)*D1,swing:Math.sin(Math.PI*r)}}break}return{x:i[0],y:Cf,z:i[1],swing:0}}const Is=3.75,Pf=.26,B1=.09,G1=.16,H1=.09;function Ga(n,e){return Math.hypot(n,e)}function z1(n,e){const t=[];let i=0,s=0,r=0;const a=e.pressure[0]-e.pressure[1],o=e.mobility[0]-e.mobility[1];for(const[c,l]of n.entries()){const u=Math.sin(c*.043+e.phase[0])*.05;r+=B1*(o*.7+Math.sin(c*.031+e.phase[1])*.5);const f=Math.sin(r),h=Math.cos(r);i+=f*(a*Pf+u),s+=h*(a*Pf+u);let p=i-f*l,g=s-h*l,v=i+f*l,d=s+h*l;const m=Ga(p,g),y=Ga(v,d),b=m>y?0:1,S=Math.max(m,y);let A=-1;if(S>Is){const C=S-Is,_=b===0?p:v,T=b===0?g:d,N=Ga(_,T)||1;i-=_/N*C,s-=T/N*C,A=b;const I=e.mobility[b]*.6+e.reach[b]*.4,F=Math.sin(c*.21+e.phase[b])>=0?1:-1,J=G1*I*F,q=Math.cos(J),H=Math.sin(J),Z=i*q-s*H,K=i*H+s*q;i=Z,s=K,r+=J;const te=H1*e.reach[b],re=Ga(i,s)||1;i-=i/re*te,s-=s/re*te,p=i-Math.sin(r)*l,g=s-Math.cos(r)*l,v=i+Math.sin(r)*l,d=s+Math.cos(r)*l}const E=V1(i,s,r,l);i=E[0],s=E[1],t.push({centre:[i,s],facing:r,pinned:A})}return t}function V1(n,e,t,i){const s=Math.sin(t),r=Math.cos(t),a=n*s+e*r,o=n*r-e*s,c=Math.min(i,Is);if(Math.hypot(Math.abs(a)+c,o)<=Is)return[n,e];const l=a*a+o*o;if(l===0)return[n,e];const u=2*Math.abs(a)*c,f=c*c-Is*Is,h=(-u+Math.sqrt(Math.max(0,u*u-4*l*f)))/(2*l);return[n*h,e*h]}const Df=3.9,W1=4.42,X1=2.1,ql=.9,K1=2.7,If={WIDE:{offset:[-3.5,3.4,1.5],lookHeight:1,fov:52},BROADCAST:{offset:[-3.35,2,1.15],lookHeight:1.15,fov:46},CLOSE:{offset:[-2.75,1.8,.95],lookHeight:1.32,fov:42},IMPACT:{offset:[-2.5,1.7,.85],lookHeight:1.38,fov:42},GROUND_OVERHEAD:{offset:[-2.5,3.3,.9],lookHeight:.35,fov:46},CAGE_SIDE:{offset:[-2.6,1.65,2.4],lookHeight:1.1,fov:44},REPLAY:{offset:[-3.1,1.9,-1.05],lookHeight:1.28,fov:42},CORNER:{offset:[-2.4,2.1,-2.85],lookHeight:1.2,fov:46}};function Nf(n,e,t,i,s){const r=Math.sin(i),a=Math.cos(i),o=a*s,c=-r*s;let l=n[0]*o+n[2]*r,u=n[0]*c+n[2]*a;const f=Math.hypot(e,t);if(f<ql)return[l,u];const h=Math.min(1,(f-ql)/(K1-ql)),p=h*h*(3-2*h),g=e/f,v=t/f,d=n[2]*(r*g+a*v);if(d>0){const m=2*d*p;l-=m*g,u-=m*v}return[l,u]}function kf(n,e,t,i,s){const r=t*t+i*i;if(r===0)return 1;const a=2*(n*t+e*i),o=n*n+e*e-s*s;return r+a+o<=0?1:Math.min(1,Math.max(0,(-a+Math.sqrt(Math.max(0,a*a-4*r*o)))/(2*r)))}function Y1(n,e,t,i){const s=kf(n,e,t,i,Df);if(s===1)return 1;const r=X1/Math.hypot(t,i),a=kf(n,e,t,i,W1);return Math.min(1,Math.max(s,Math.min(a,r)))}function q1(n){const e=[];let t=1;for(const i of n){const s=Of(i.centre[0],i.centre[1],i.facing,t),r=Of(i.centre[0],i.centre[1],i.facing,-t);(r<s-Z1||s>Df&&r<s)&&(t=-t),e.push(t)}return e}function Of(n,e,t,i){const s=Nf(J1,n,e,t,i);return Math.hypot(n+s[0],e+s[1])}const J1=[-3.2,2,1.1],Z1=.75;function Q1(n,e,t,i,s=0,r=1){const a=If[n]??If.BROADCAST,o=Nf(a.offset,e,t,s,r),c=o[0]+Math.sin(i*.53)*.035+Math.sin(i*1.31)*.012,l=o[1]+Math.sin(i*.43+2.6)*.03,u=a.offset[1]+Math.sin(i*.71+1.4)*.022,f=Y1(e,t,c,l);return{position:[e+c*f,u,t+l*f],target:[e,a.lookHeight+Math.sin(i*.61+.8)*.012,t],fov:a.fov}}function j1(n){const[e,t,i]=n,s=Math.cos(e),r=Math.sin(e),a=Math.cos(t),o=Math.sin(t),c=Math.cos(i),l=Math.sin(i);return[a*c,-a*l,o,s*l+r*o*c,s*c-r*o*l,-r*a,r*l-s*o*c,r*c+s*o*l,s*a]}function Uf(n,e){return[n[0]*e[0]+n[3]*e[1]+n[6]*e[2],n[1]*e[0]+n[4]*e[1]+n[7]*e[2],n[2]*e[0]+n[5]*e[1]+n[8]*e[2]]}function Ff(n,e){return[n[0]-e[0],n[1]-e[1],n[2]-e[2]]}function Jl(n){return Math.hypot(n[0],n[1],n[2])}function Zl(n){const e=Jl(n)||1;return[n[0]/e,n[1]/e,n[2]/e]}function Ql(n,e){const t=Math.cos(e),i=Math.sin(e);return[n[0]*t+n[2]*i,n[1],-n[0]*i+n[2]*t]}function $1(n,e,t){const i=Zl(e),s=Math.cos(t),r=Math.sin(t),a=i[0]*n[0]+i[1]*n[1]+i[2]*n[2],o=[i[1]*n[2]-i[2]*n[1],i[2]*n[0]-i[0]*n[2],i[0]*n[1]-i[1]*n[0]];return[n[0]*s+o[0]*r+i[0]*a*(1-s),n[1]*s+o[1]*r+i[1]*a*(1-s),n[2]*s+o[2]*r+i[2]*a*(1-s)]}function jl(n,e){return[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]]}function ey(n){const e=Math.asin(Math.max(-1,Math.min(1,n[2])));return Math.abs(n[2])<.9999999?[Math.atan2(-n[5],n[8]),e,Math.atan2(-n[1],n[0])]:[Math.atan2(n[7],n[4]),e,0]}function ty(n,e,t,i=[0,0,1]){const s=Jl(n),r=e+t,a=Math.abs(e-t)+1e-4,o=Math.max(a,Math.min(r-1e-5,s)),c=Zl(n);let l=jl(i,c);Jl(l)<1e-5&&(l=jl([1,0,0],c)),l=Zl(l);const u=(e*e+o*o-t*t)/(2*e*o),f=Math.acos(Math.max(-1,Math.min(1,u))),h=(e*e+t*t-o*o)/(2*e*t),p=Math.PI-Math.acos(Math.max(-1,Math.min(1,h))),g=$1(c,l,-f),v=[-g[0],-g[1],-g[2]],d=l,m=jl(d,v),y=[d[0],v[0],m[0],d[1],v[1],m[1],d[2],v[2],m[2]];return{thigh:ey(y),shin:[p,0,0],overreached:s>r-1e-4}}const ny=.1,iy=.09,sy=1.5,Bf=.07,ry=.15,ay=.3,oy=.02,cy=.9,ly=.09,hy=.18;function Gf(n,e){return{fighterId:n,pressure:.5,mobility:.5,recovery:.5,engine:.5,guard:.5,deception:.5,reach:.5,phase:e*Math.PI}}const uy={DROP:1,STAGGER:.8,HEAVY:.45,BODY_FOLD:.4,LEG_BUCKLE:.3};function dy(n){if(Hl(n))return .46;switch(n){case"CLINCH":case"CAGE_CLINCH":return .82;case"TAKEDOWN_ATTEMPT":return .8;case"STUNNED":case"RECOVERY":return 1.3;default:return 1.05}}function fy(n,e,t){return t==="KNOCKDOWN"||t==="STUN"||e==="STAGGER"||e==="DROP"?Bf:wf(n)?ay:ry}const Hf=new Set(["STRIKE","SIGNIFICANT_STRIKE"]);function py(n){return n.directive.targetState}function my(n,e,t,i="CONDENSED",s){const r=s??[Gf(e,0),Gf(t,1)],a=[...n].sort((v,d)=>v.event.sequence-d.event.sequence),o=[];let c=0;for(const[v,d]of a.entries()){const{event:m,directive:y}=d,b=_1(y.clip,y.variant),S=y.speed>0?y.speed:1,A=b.duration/S,E=o[o.length-1],C=E!==void 0&&E.actorId!==void 0&&E.actorId===y.actorId&&Hf.has(E.event.eventType)&&Hf.has(m.eventType)&&m.timestamp-E.event.timestamp<cy,_=i==="REALTIME"?Math.max(m.timestamp,c+iy):v===0?0:c+(C?oy:ny),T=py(d);o.push({index:v,start:_,end:_+A,event:m,clip:b,clipName:y.clip,camera:Hl(T)&&y.camera==="BROADCAST"?"GROUND_OVERHEAD":y.camera,position:T,grounded:Hl(T),spacing:dy(T),impactAt:_+A*b.impactAt,reaction:vf[y.reaction]??vf.NONE,reactionName:y.reaction,actorId:y.actorId,reactorId:y.reactorId,centre:[0,0,0],facing:0,pinned:-1,cameraSide:1,blend:C?Bf:fy(y.clip,y.reaction,m.eventType),claim:wf(y.clip)?T1:Tf(b),follows:C}),c=_+A}const l=z1(o.map(v=>v.spacing/2),{pressure:[r[0].pressure,r[1].pressure],reach:[r[0].reach,r[1].reach],mobility:[r[0].mobility,r[1].mobility],phase:[r[0].phase,r[1].phase]}),u=q1(l),f=o.map((v,d)=>{const m=l[d];return{...v,centre:[m.centre[0],0,m.centre[1]],facing:m.facing,pinned:m.pinned,cameraSide:u[d]}});o.length=0,o.push(...f);const h=[[],[]];for(const v of o){const d=uy[v.reactionName];if(d===void 0||v.reactorId===void 0)continue;const m=v.reactorId===e?0:1;h[m].push({at:v.impactAt,magnitude:d})}const p={beats:o,duration:c+sy,fighterA:e,fighterB:t,pacing:i,footPlans:[{steps:[],start:[[0,0],[0,0]]},{steps:[],start:[[0,0],[0,0]]}],profiles:r,staggerHits:h},g=gy(p);return{...p,footPlans:[Lf(g[0],{phase:0,mobility:r[0].mobility,pressure:r[0].pressure}),Lf(g[1],{phase:.5,mobility:r[1].mobility,pressure:r[1].pressure})]}}function gy(n){const e=.03333333333333333,t=[],i=[];for(let s=0;s<=n.duration;s+=e){const r=zf(n,s);if(!r)continue;const a=Math.max(r.end-r.start,.001),o=Kf(n,r,(s-r.start)/a);t.push({time:s,x:o.a[0],z:o.a[2],yaw:o.yawA}),i.push({time:s,x:o.b[0],z:o.b[2],yaw:o.yawB})}return[t,i]}function zf(n,e){const t=n.beats;if(t.length===0)return;let i=0,s=t.length-1,r;for(;i<=s;){const a=i+s>>1,o=t[a];if(!o)break;o.start<=e?(r=o,i=a+1):s=a-1}return r??t[0]}const Vf=En(Oa("STANDING","ACTOR"));function Wf(n,e,t){const i=Math.max(e.end-e.start,.001),s=(t-e.start)/i,r=e.actorId===void 0,a=En(Oa(e.position,"ACTOR")),o=M1(e.clip,s,i,Rf,Yl),c=Yf(a,o,e.claim),l=En(Oa(e.position,"REACTOR")),u=vy(e,t),f=r?c:Yf(l,u.pose,u.claim),h=Math.max(.3,Math.min(1,Math.abs(s-e.clip.impactAt)*3)),p=r?h:u.active?.35:1,g=1-e.claim.LEGS,v=r?g:1-u.claim.LEGS,d=r?!0:e.actorId===n.fighterA;return{a:d?c:f,b:d?f:c,aRest:d?h:p,bRest:d?p:h,aLegs:d?g:v,bLegs:d?v:g}}function vy(n,e){const t=En(Oa(n.position,"REACTOR"));if(e<n.impactAt)return{pose:t,claim:Xf,active:!1};const i=e-n.impactAt,s=n.reaction.duration;if(i>=s)return{pose:t,claim:Xf,active:!1};const r=yf(n.reaction,i/s),a=Math.min(1,i/ly),o=Math.min(1,(s-i)/hy),c=Ua(Math.min(a,o)),l=Tf(n.reaction),u={};for(const f of Ef)u[f]=l[f]*c;return{pose:Xl(t,r,c),claim:u,active:!0}}const Xf={LEGS:0,HIPS:0,SPINE:0,ARM_L:0,ARM_R:0,HEAD:0};function Kf(n,e,t){const i=n.beats[e.index-1],s=i?i.centre:e.centre,r=i?i.spacing:e.spacing,a=i?i.facing:e.facing,o=Ua(Math.max(0,Math.min(1,t))),c=s[0]+(e.centre[0]-s[0])*o,l=s[2]+(e.centre[2]-s[2])*o,u=(r+(e.spacing-r)*o)/2,f=a+(e.facing-a)*o,h=Ql([0,0,-u],f),p=Ql([0,0,u],f);return{a:[c+h[0],0,l+h[2]],b:[c+p[0],0,l+p[2]],yawA:f,yawB:f+Math.PI,half:u}}function Yf(n,e,t){const i={};for(const r of Si){const a=t[Yl[r]],o=n.joints[r],c=e.joints[r];i[r]=a>=1?c:a<=0?o:[o[0]+(c[0]-o[0])*a,o[1]+(c[1]-o[1])*a,o[2]+(c[2]-o[2])*a]}const s=Math.max(t.HIPS,t.LEGS);return{joints:i,offset:[n.offset[0]+(e.offset[0]-n.offset[0])*s,n.offset[1]+(e.offset[1]-n.offset[1])*s,n.offset[2]+(e.offset[2]-n.offset[2])*s]}}const xy=bn.thighL.length,_y=bn.shinL.length,Sy=[["thighL","shinL","footL"],["thighR","shinR","footR"]];function My(n,e,t,i,s,r){if(r<=.02)return n;const a={...n.joints},o=bn.hips.offset,c=[o[0]+n.offset[0],o[1]+n.offset[1],o[2]+n.offset[2]],l=j1(n.joints.hips),u=Uf(l,[0,0,1]);for(const[f,h]of Sy.entries()){const p=F1(i,f,s),g=Ql([p.x-e[0],p.y-e[1],p.z-e[2]],-t),v=Uf(l,Ff(g,c)),d=bn[h[0]].offset,m=Ff(v,d),y=ty(m,xy,_y,u);for(const[E,C]of[h[0],h[1]].entries()){const _=a[C],T=E===0?y.thigh:y.shin;a[C]=[_[0]+(T[0]-_[0])*r,_[1]+(T[1]-_[1])*r,_[2]+(T[2]-_[2])*r]}const S=-(a[h[0]][0]+a[h[1]][0])+p.swing*.55,A=a[h[2]];a[h[2]]=[A[0]+(S-A[0])*r*.8,A[1],A[2]]}return{joints:a,offset:n.offset}}function yy(n,e){if(e<=0)return n;const t={...n.joints},i=.42;for(const[s,r]of[["neck",.35],["head",.65]]){const a=t[s],o=Math.max(-i,Math.min(i,-a[1]))*e*r;t[s]=[a[0],a[1]+o,a[2]]}return{joints:t,offset:n.offset}}function by(n,e){const t=zf(n,e);if(!t)return{time:e,a:{id:n.fighterA,pose:Vf,position:[0,0,-.81],yaw:0,legFreedom:1,rest:1,stagger:0,feint:0,fatigue:0},b:{id:n.fighterB,pose:Vf,position:[0,0,.81],yaw:Math.PI,legFreedom:1,rest:1,stagger:0,feint:0,fatigue:0},camera:"WIDE",cameraSide:1,description:"",round:1,roundTime:"05:00"};const i=Math.max(t.end-t.start,.001),s=e-t.start,r=s/i;let a=Wf(n,t,e);const o=n.beats[t.index-1];if(o&&s<t.blend){const v=Wf(n,o,o.end),d=Ua(s/t.blend);a={a:Xl(v.a,a.a,d),b:Xl(v.b,a.b,d),aRest:v.aRest+(a.aRest-v.aRest)*d,bRest:v.bRest+(a.bRest-v.bRest)*d,aLegs:v.aLegs+(a.aLegs-v.aLegs)*d,bLegs:v.bLegs+(a.bLegs-v.bLegs)*d}}const c=Kf(n,t,r),l=[{pose:a.a,rest:a.aRest,legs:a.aLegs,root:c.a,yaw:c.yawA,plan:n.footPlans[0]},{pose:a.b,rest:a.bRest,legs:a.bLegs,root:c.b,yaw:c.yawB,plan:n.footPlans[1]}],u=l.map((v,d)=>{const m=n.profiles[d],y=b1(t.event.round,m.engine),b=t.grounded?0:A1(n.staggerHits[d],e)*(1-m.recovery*.45),S=t.grounded?0:E1(m.deception,m.phase,e)*v.rest;return{profile:m,fatigue:y,stagger:b,feint:S}}),f=l.map((v,d)=>{const m=u[d];let y=y1(v.pose,{time:e,phase:m.profile.phase,intensity:v.rest,fatigue:m.fatigue,grounded:t.grounded,guard:m.profile.guard,verve:m.profile.mobility,stagger:m.stagger,feint:m.feint});return y=yy(y,t.grounded?0:.55*v.rest*(1-m.stagger*.6)),t.grounded||(y=My(y,v.root,v.yaw,v.plan,e,v.legs)),y}),h=t.actorId===void 0,p=h?!0:t.actorId===n.fighterA,g=t.grounded&&!h?.22:0;return{time:e,beat:t,a:{id:n.fighterA,pose:f[0],position:[c.a[0],p?g:0,c.a[2]],yaw:c.yawA,legFreedom:a.aLegs,rest:a.aRest,stagger:u[0].stagger,feint:u[0].feint,fatigue:u[0].fatigue},b:{id:n.fighterB,pose:f[1],position:[c.b[0],p?0:g,c.b[2]],yaw:c.yawB,legFreedom:a.bLegs,rest:a.bRest,stagger:u[1].stagger,feint:u[1].feint,fatigue:u[1].fatigue},camera:t.camera,cameraSide:t.cameraSide,description:t.event.description,round:t.event.round,roundTime:t.event.roundTime}}const Bn=Math.PI/2,ii=-Math.PI/2,$l=0,eh=Math.PI,th=n=>n==="L"?$l:eh,qf=n=>n==="L"?eh:$l;function Ey(n,e){let t=(n-e)%(Math.PI*2);return t>Math.PI&&(t-=Math.PI*2),t<=-Math.PI&&(t+=Math.PI*2),t}function Ay(n,e){if(!n)return 1;let t=1;for(const i of n){const s=Ey(e,i.at);t+=i.amount*Math.exp(-(s*s)/(2*i.spread*i.spread))}return t}const Jf=[{at:Bn+.5,spread:.33,amount:.075},{at:Bn-.5,spread:.33,amount:.075},{at:Bn,spread:.09,amount:-.04}],Zf=[{at:Bn+.34,spread:.24,amount:.05},{at:Bn-.34,spread:.24,amount:.05},{at:Bn,spread:.11,amount:-.045}],nh=[{at:$l,spread:.42,amount:.07},{at:eh,spread:.42,amount:.07}],Ns={at:ii,spread:.13,amount:-.055},Qf=[{at:ii+.58,spread:.32,amount:.06},{at:ii-.58,spread:.32,amount:.06}],Ha=[{at:ii,spread:.6,amount:.07}],jf=n=>[{at:th(n),spread:.6,amount:.09},{at:ii,spread:.4,amount:.05}],$f=n=>[{at:Bn,spread:.48,amount:.09},{at:ii,spread:.52,amount:.08},{at:qf(n),spread:.22,amount:-.04}],Ty=n=>[{at:th(n),spread:.52,amount:.07},{at:ii,spread:.45,amount:.05}],ih=n=>[{at:Bn,spread:.48,amount:.08},{at:th(n),spread:.44,amount:.05},{at:ii,spread:.48,amount:.06}],ep=n=>[{at:ii,spread:.42,amount:.12},{at:qf(n),spread:.3,amount:.05}],za=new Map(zl.map((n,e)=>[n,e]));function wy(n){let[e,t,i]=[0,0,0],s=n;for(;s;){const r=bn[s];e+=r.offset[0],t+=r.offset[1],i+=r.offset[2],s=r.parent}return[e,t,i]}function Ry(n){switch(bn[n].axis){case"UP":return[0,1,0];case"DOWN":return[0,-1,0];default:return[0,0,1]}}function qi(n,e){const t=wy(n),i=Ry(n),s=bn[n].length*e;return[t[0]+i[0]*s,t[1]+i[1]*s,t[2]+i[2]*s]}function tp(n){const e=n.weights;if(!e)return[[n.bone,1]];const t=Object.entries(e),i=t.reduce((s,[,r])=>s+r,0);return i>0?t.map(([s,r])=>[s,r/i]):[[n.bone,1]]}function An(n,e=14,t=!0,i=!0){const s=[],r=[],a=[],o=[],c=[],l=(g,v,d,m,y,b)=>{const S=s.length/3;s.push(g,v,d),r.push(m,y);const A=b[0],E=b[1];return a.push(za.get(A?.[0]??"hips")??0,za.get(E?.[0]??"hips")??0,0,0),o.push(A?.[1]??1,E?.[1]??0,0,0),S},u=[];n.forEach((g,v)=>{const d=qi(g.bone,g.at),m=tp(g),y=bn[g.bone].axis==="FORWARD",b=v/Math.max(n.length-1,1),S=[];for(let A=0;A<e;A++){const E=A/e*Math.PI*2,C=Ay(g.lobes,E),_=Math.cos(E)*g.rx*C,T=y?Math.sin(E)*g.rz*C:0,N=y?0:Math.sin(E)*g.rz*C;S.push(l(d[0]+_,d[1]+T,d[2]+N,A/e,b,m))}u.push(S)});for(let g=0;g<u.length-1;g++){const v=u[g],d=u[g+1];for(let m=0;m<e;m++){const y=(m+1)%e;c.push(v[m],d[m],v[y]),c.push(v[y],d[m],d[y])}}const f=(g,v,d)=>{const m=qi(g.bone,g.at),y=l(m[0],m[1],m[2],.5,d?0:1,tp(g));for(let b=0;b<e;b++){const S=(b+1)%e;d?c.push(y,v[S],v[b]):c.push(y,v[b],v[S])}},h=n[0],p=n[n.length-1];return t&&h&&u[0]&&f(h,u[0],!0),i&&p&&u[u.length-1]&&f(p,u[u.length-1],!1),{positions:s,uvs:r,skinIndices:a,skinWeights:o,indices:c}}function Ji(n,e,t,i=[0,0,0],s=16,r=12,a){const o=[],c=[],l=[],u=[],f=[],h=qi(n,e),p=za.get(n)??0;for(let g=0;g<=r;g++){const v=g/r*Math.PI;for(let d=0;d<=s;d++){const m=d/s*Math.PI*2,y=Math.sin(v)*Math.cos(m),b=Math.cos(v),S=Math.sin(v)*Math.sin(m),A=a?a(y,b,S):1;o.push(h[0]+i[0]+y*t[0]*A,h[1]+i[1]+b*t[1]*A,h[2]+i[2]+S*t[2]*A),c.push(d/s,g/r),l.push(p,0,0,0),u.push(1,0,0,0)}}for(let g=0;g<r;g++)for(let v=0;v<s;v++){const d=g*(s+1)+v,m=d+s+1;f.push(d,d+1,m,d+1,m+1,m)}return{positions:o,uvs:c,skinIndices:l,skinWeights:u,indices:f}}function Va(n){const e={positions:[],uvs:[],skinIndices:[],skinWeights:[],indices:[]};for(const t of n){const i=e.positions.length/3;e.positions.push(...t.positions),e.uvs.push(...t.uvs),e.skinIndices.push(...t.skinIndices),e.skinWeights.push(...t.skinWeights);for(const s of t.indices)e.indices.push(s+i)}return e}const sh=n=>[{bone:`shoulder${n}`,at:-.35,rx:.073,rz:.071,weights:{chest:.45,[`shoulder${n}`]:.55},lobes:jf(n)},{bone:`shoulder${n}`,at:1,rx:.062,rz:.06,weights:{[`shoulder${n}`]:.5,[`arm${n}`]:.5},lobes:jf(n)},{bone:`arm${n}`,at:.3,rx:.057,rz:.055,weights:{[`arm${n}`]:1},lobes:$f(n)},{bone:`arm${n}`,at:.75,rx:.046,rz:.045,lobes:$f(n).map(e=>({...e,amount:e.amount*.4}))},{bone:`arm${n}`,at:1,rx:.043,rz:.043,weights:{[`arm${n}`]:.5,[`forearm${n}`]:.5}},{bone:`forearm${n}`,at:.22,rx:.05,rz:.048,weights:{[`forearm${n}`]:1},lobes:Ty(n)},{bone:`forearm${n}`,at:.75,rx:.037,rz:.035},{bone:`forearm${n}`,at:1,rx:.034,rz:.033,weights:{[`forearm${n}`]:.5,[`hand${n}`]:.5}}],rh=n=>[{bone:`thigh${n}`,at:0,rx:.1,rz:.098,weights:{[`thigh${n}`]:.6,hips:.4},lobes:ih(n)},{bone:`thigh${n}`,at:.3,rx:.09,rz:.089,weights:{[`thigh${n}`]:1},lobes:ih(n)},{bone:`thigh${n}`,at:.85,rx:.063,rz:.062,lobes:ih(n).map(e=>({...e,amount:e.amount*.3}))},{bone:`thigh${n}`,at:1,rx:.058,rz:.058,weights:{[`thigh${n}`]:.5,[`shin${n}`]:.5}},{bone:`shin${n}`,at:.22,rx:.07,rz:.072,weights:{[`shin${n}`]:1},lobes:ep(n)},{bone:`shin${n}`,at:.7,rx:.043,rz:.044,lobes:ep(n).map(e=>({...e,amount:e.amount*.3}))},{bone:`shin${n}`,at:1,rx:.038,rz:.04,weights:{[`shin${n}`]:.5,[`foot${n}`]:.5}}],np=[{bone:"hips",at:-.62,rx:.104,rz:.084,weights:{hips:1},lobes:Ha},{bone:"hips",at:-.2,rx:.128,rz:.098,weights:{hips:1},lobes:Ha},{bone:"hips",at:.2,rx:.137,rz:.103,weights:{hips:1},lobes:Ha},{bone:"hips",at:.55,rx:.143,rz:.106,lobes:[...Ha,Ns]},{bone:"hips",at:1,rx:.132,rz:.096,weights:{hips:.55,spine:.45},lobes:[...Zf,Ns]},{bone:"spine",at:.35,rx:.113,rz:.083,weights:{spine:1},lobes:[...Zf,Ns]},{bone:"spine",at:.75,rx:.138,rz:.096,lobes:[...nh,Ns,{at:Bn,spread:.5,amount:.03}]},{bone:"spine",at:1,rx:.152,rz:.104,weights:{spine:.5,chest:.5},lobes:[...Jf,...nh,Ns]},{bone:"chest",at:.5,rx:.163,rz:.11,weights:{chest:1},lobes:[...Jf,...nh,Ns]},{bone:"chest",at:.88,rx:.15,rz:.101,lobes:[...Qf,{at:Bn,spread:.6,amount:.03}]},{bone:"chest",at:1.05,rx:.132,rz:.098,weights:{chest:.75,neck:.25},lobes:Qf}],ip=[{bone:"neck",at:-.55,rx:.075,rz:.072,weights:{chest:.55,neck:.45}},{bone:"neck",at:.1,rx:.068,rz:.065,weights:{neck:1}},{bone:"neck",at:.75,rx:.062,rz:.06,weights:{neck:1}}],Cy=[{bone:"hips",at:-.42,rx:.152,rz:.124,weights:{hips:1}},{bone:"hips",at:-.12,rx:.156,rz:.127,weights:{hips:1}},{bone:"hips",at:.3,rx:.153,rz:.124,weights:{hips:1}},{bone:"hips",at:.72,rx:.145,rz:.116,weights:{hips:.9,spine:.1}},{bone:"hips",at:1.08,rx:.134,rz:.106,weights:{hips:.55,spine:.45}},{bone:"hips",at:1.34,rx:.126,rz:.099,weights:{hips:.25,spine:.75}}];function sp(n,e){const t=.3+Math.max(0,Math.min(1,e))*.48,i=`thigh${n}`;return[{bone:i,at:-.3,rx:.116,rz:.108,weights:{hips:.86,[i]:.14}},{bone:i,at:-.12,rx:.124,rz:.116,weights:{hips:.5,[i]:.5}},{bone:i,at:.06,rx:.126,rz:.12,weights:{hips:.15,[i]:.85}},{bone:i,at:t*.55,rx:.122,rz:.117,weights:{[i]:1}},{bone:i,at:t,rx:.113,rz:.109},{bone:i,at:t+.035,rx:.101,rz:.097}]}const ah=n=>[{bone:`foot${n}`,at:-.15,rx:.042,rz:.05,weights:{[`foot${n}`]:1}},{bone:`foot${n}`,at:.5,rx:.048,rz:.045},{bone:`foot${n}`,at:.92,rx:.04,rz:.032}],Zi=0,ks=[.093,.115,.104],Mi=[0,.105,.004];function St(n,e,t){const i=(n-e)/t;return Math.exp(-i*i)}function rp(n,e,t){const i=Math.max(0,t),s=i*i,r=Math.abs(n),a=.045*Math.max(0,-t)*St(e,-.05,.45),o=-.03*Math.max(0,e-.7),c=-.035*i*St(r,.78,.2)*St(e,.32,.2),l=.062*i*St(e,.2,.15)*St(n,0,.55),u=-.038*i*St(r,.33,.19)*St(e,.04,.15),f=.105*s*St(n,0,.13)*St(e,0,.24),h=.165*s*i*St(n,0,.16)*St(e,-.17,.1),p=.055*s*i*St(r,.14,.06)*St(e,-.23,.06),g=-.022*s*St(n,0,.055)*St(e,-.31,.055),v=.05*s*St(n,0,.28)*St(e,-.41,.085),d=-.04*s*St(n,0,.32)*St(e,-.41,.028),m=.04*i*St(r,.5,.2)*St(e,-.1,.18),y=.052*i*St(n,0,.24)*St(e,-.7,.15),b=-.085*i*Math.max(0,-e-.35)*(.5+r);return 1+a+o+c+l+u+f+h+p+g+v+d+m+y+b}function Ly(n,e,t){return 1-.18*Math.max(0,e-.45)}const Py=1.085;function ap(n,e,t=24,i=12){const s=[],r=[],a=[],o=[],c=[],l=qi("head",Zi),u=za.get("head")??0,f=(h,p,g,v,d,m)=>{const y=s.length/3,b=rp(h,p,g)*v;return s.push(l[0]+Mi[0]+h*ks[0]*b,l[1]+Mi[1]+p*ks[1]*b,l[2]+Mi[2]+g*ks[2]*b),r.push(d,m),a.push(u,0,0,0),o.push(1,0,0,0),y};for(let h=0;h<=i;h++){const p=h/i;for(let g=0;g<=t;g++){const v=g/t*Math.PI*2,d=Math.cos(v),m=Math.sin(v),y=n*(1-e*Math.max(0,m)),b=p*y,S=Math.sin(b)*d,A=Math.cos(b),E=Math.sin(b)*m;f(S,A,E,h===i?.965:Py,g/t,p)}}for(let h=0;h<i;h++)for(let p=0;p<t;p++){const g=h*(t+1)+p,v=g+t+1;c.push(g,g+1,v,g+1,v+1,v)}return{positions:s,uvs:r,skinIndices:a,skinWeights:o,indices:c}}const oh=[{sweep:1.08,tilt:.3},{sweep:1.28,tilt:.22}];function Dy(n=0){const e=oh[n%oh.length]??oh[0];return ap(e.sweep,e.tilt)}function Iy(){const n=ap(.62,-.85,20,8),e={...n,positions:[...n.positions]},t=qi("head",Zi)[1]+Mi[1];for(let i=0;i<e.positions.length/3;i++)e.positions[i*3+1]=t-(e.positions[i*3+1]-t);return e}function Ny(){return Va([Ji("head",Zi,op,[yr[0],yr[1],yr[2]],12,9),Ji("head",Zi,op,[-.031,yr[1],yr[2]],12,9)])}const op=[.0112,.01,.0105],yr=[.031,.1085,.087];function cp(n){return Ji("head",Zi,[.009,.021,.014],[(n==="L"?1:-1)*.081,.098,-.016],10,8,Ly)}function ky(){const n=[],e=i=>{for(const s of i)n.push({at:qi(s.bone,s.at),radius:(s.rx+s.rz)/2})};e(np),e(ip);for(const i of["L","R"])e(sh(i)),e(rh(i)),e(ah(i));const t=qi("head",Zi);return n.push({at:[t[0]+Mi[0],t[1]+Mi[1],t[2]+Mi[2]],radius:(ks[0]+ks[2])/2}),n}const Oy=.5,lp=.62;function Uy(n,e,t){let i=0;for(const s of t){const r=s.at[0]-n[0],a=s.at[1]-n[1],o=s.at[2]-n[2],c=Math.hypot(r,a,o);if(c<1e-6)continue;const l=(e[0]*r+e[1]*a+e[2]*o)/c;if(l<=0)continue;const u=Math.max(c,s.radius*1.05);i+=l*s.radius*s.radius/(u*u)}return lp+(1-lp)*Math.exp(-i*Oy)}function Fy(n){const e=n[1],t=Math.hypot(n[0],n[2])*2.2+Math.max(0,1.35-e)*.25,i=Math.min(.16,t*.16),s=Math.min(.06,Math.max(0,e-1)*.05);return[1+i*.55+s,1-i*.16+s,1-i*.42+s]}function hp(n){return Ji(`shoulder${n}`,.2,[.086,.09,.084],[n==="L"?-.026:.026,.006,0],18,14)}function By(){return Va([An(np,22),An(ip,16),hp("L"),hp("R"),Ji("head",Zi,ks,Mi,48,40,rp),cp("L"),cp("R"),An(sh("L"),18),An(sh("R"),18),An(rh("L"),20),An(rh("R"),20),An(ah("L"),14),An(ah("R"),14)])}function Gy(n=.5){return Va([An(Cy,18),An(sp("L",n),16),An(sp("R",n),16)])}function Hy(){return Va([Ji("handL",.45,[.055,.067,.059],[0,0,.006],14,10),Ji("handR",.45,[.055,.067,.059],[0,0,.006],14,10)])}function zy(n=256,e=.5){const t=document.createElement("canvas");t.width=n,t.height=n;const i=t.getContext("2d");if(!i)return new Nt;const s=i.createImageData(n,n),r=(c,l)=>{const u=Math.sin(c*127.1+l*311.7)*43758.5453;return u-Math.floor(u)},a=(c,l,u)=>{const f=c/u,h=l/u,p=Math.floor(f),g=Math.floor(h),v=f-p,d=h-g,m=v*v*(3-2*v),y=d*d*(3-2*d),b=r(p,g),S=r(p+1,g),A=r(p,g+1),E=r(p+1,g+1);return(b+(S-b)*m)*(1-y)+(A+(E-A)*m)*y};for(let c=0;c<n;c++)for(let l=0;l<n;l++){const u=a(l,c,26)*.55+a(l,c,9)*.3+a(l,c,3)*.15,f=Math.round(255*(.5+(u-.5)*e)),h=(c*n+l)*4;s.data[h]=f,s.data[h+1]=f,s.data[h+2]=f,s.data[h+3]=255}i.putImageData(s,0,0);const o=new Rg(t);return o.wrapS=Ys,o.wrapT=Ys,o.repeat.set(3,3),o}let up;function dp(){return up??(up=zy(256,.75)),up}const Vy={skin:11565650,trunks:12071485,gloves:12857914,hair:2826265,hairStyle:0,trunkLength:.22,beard:!0,subsurface:11026986},Wy={skin:8211760,trunks:2777028,gloves:3104464,hair:1643280,hairStyle:1,trunkLength:.85,beard:!1,subsurface:9187872},Wa="#include <opaque_fragment>",Xy=`
  {
    vec3 ssViewDir = normalize( vViewPosition );
    vec3 ssLightDir = normalize( ( viewMatrix * vec4( uKeyDirection, 0.0 ) ).xyz );
    float ssBack = pow( clamp( dot( ssViewDir, -ssLightDir ), 0.0, 1.0 ), 3.0 );
    float ssThin = pow( 1.0 - clamp( dot( normal, ssViewDir ), 0.0, 1.0 ), 2.0 );
    float ssWrap = clamp( ( dot( normal, ssLightDir ) + 0.35 ) / 1.35, 0.0, 1.0 );
    outgoingLight += uSubsurface * uSubsurfaceStrength * ( ssBack * ssThin + 0.18 * ssWrap * ssThin );
  }
  ${Wa}`,Ky=new k(2.6,10.5,3.4).normalize();function Yy(n,e){const t=new gd({color:n.skin,roughness:.74,metalness:0,vertexColors:!0,clearcoat:.1,clearcoatRoughness:.62,clearcoatRoughnessMap:e,sheen:.22,sheenColor:new Ve(16767426),sheenRoughness:.8,roughnessMap:e,bumpMap:e,bumpScale:.0032});return t.onBeforeCompile=i=>{if(i.uniforms.uSubsurface={value:new Ve(n.subsurface)},i.uniforms.uSubsurfaceStrength={value:.62},i.uniforms.uKeyDirection={value:Ky},i.fragmentShader=i.fragmentShader.replace("#include <common>",`#include <common>
      uniform vec3 uSubsurface;
      uniform float uSubsurfaceStrength;
      uniform vec3 uKeyDirection;`),!i.fragmentShader.includes(Wa))throw new Error(`skin shader: three.js no longer emits ${Wa}`);i.fragmentShader=i.fragmentShader.replace(Wa,Xy)},t}function qy(n){const e=new Ht;return e.setAttribute("position",new lt(n.positions,3)),e.setAttribute("uv",new lt(n.uvs,2)),e.setAttribute("skinIndex",new Yc(n.skinIndices,4)),e.setAttribute("skinWeight",new lt(n.skinWeights,4)),e.setIndex(n.indices),e.computeVertexNormals(),e}function Jy(n,e){const t=n.getAttribute("position"),i=n.getAttribute("normal"),s=ky(),r=new Float32Array(t.count*3);for(let a=0;a<t.count;a++){const o=[t.getX(a),t.getY(a),t.getZ(a)],c=[i.getX(a),i.getY(a),i.getZ(a)],l=Uy(o,c,s),[u,f,h]=e?Fy(o):[1,1,1];r[a*3]=l*u,r[a*3+1]=l*f,r[a*3+2]=l*h}n.setAttribute("color",new mn(r,3))}class fp{constructor(e){Je(this,"root");Je(this,"bones",new Map);Je(this,"materials",[]);Je(this,"geometries",[]);Je(this,"meshes",[]);this.root=new fs;for(const f of zl){const h=bn[f],p=new Fu;p.position.set(h.offset[0],h.offset[1],h.offset[2]);const g=h.parent===null?this.root:this.bones.get(h.parent);if(!g)throw new Error(`joint ${f} has an unbuilt parent`);g.add(p),this.bones.set(f,p)}this.root.updateMatrixWorld(!0);const t=zl.map(f=>this.bones.get(f)),i=new sl(t),s=dp(),r=Yy(e,s),a=new ei({vertexColors:!0,color:e.trunks,roughness:.9,metalness:0,roughnessMap:s}),o=new gd({vertexColors:!0,color:e.gloves,roughness:.42,metalness:0,clearcoat:.55,clearcoatRoughness:.35,roughnessMap:s}),c=new ei({vertexColors:!0,color:e.hair,roughness:.82,metalness:0,roughnessMap:s}),l=new ei({color:1314572,roughness:.28,metalness:0});this.materials.push(r,a,o,c,l);const u=[[By(),r,!0],[Gy(e.trunkLength),a,!0],[Hy(),o,!0],[Dy(e.hairStyle),c,!1],[Ny(),l,!1]];e.beard&&u.push([Iy(),c,!1]);for(const[f,h,p]of u){const g=qy(f);h!==l&&Jy(g,h===r),this.geometries.push(g);const v=new Sg(g,h);v.castShadow=p,v.receiveShadow=!0,v.frustumCulled=!1,this.root.add(v),v.bind(i),this.meshes.push(v)}}applyPose(e){for(const[i,s]of this.bones){const r=e.joints[i];s.rotation.set(r[0],r[1],r[2])}const t=this.bones.get("hips");if(t){const i=bn.hips.offset;t.position.set(i[0]+e.offset[0],i[1]+e.offset[1],i[2]+e.offset[2])}}setPlacement(e,t){this.root.position.set(e[0],e[1],e[2]),this.root.rotation.y=t}headPosition(e){const t=this.bones.get("head");return t?t.getWorldPosition(e):e.set(0,1.6,0)}dispose(){for(const e of this.geometries)e.dispose();for(const e of this.materials)e.dispose();for(const e of this.meshes)e.skeleton.dispose();this.geometries.length=0,this.materials.length=0,this.meshes.length=0,this.bones.clear()}}const ch=4.55,Os=1.83;function Zy(n){const e=[];for(let t=0;t<8;t++){const i=t/8*Math.PI*2+Math.PI/8;e.push(new le(Math.cos(i)*n,Math.sin(i)*n))}return e}function Qy(){const n=new fs,e=[],t=C=>(e.push(C),C),i=Zy(ch),s=new rd;i.forEach((C,_)=>{_===0?s.moveTo(C.x,C.y):s.lineTo(C.x,C.y)}),s.closePath();const r=t(new vl(s)),a=dp(),o=t(new ei({color:7239039,roughness:.94,metalness:0,roughnessMap:a,bumpMap:a,bumpScale:.004})),c=new vt(r,o);c.rotation.x=-Math.PI/2,c.receiveShadow=!0,n.add(c);const l=t(new da(ch+1.1,ch+1.4,.9,8,1)),u=t(new ei({color:1053465,roughness:1,roughnessMap:a})),f=new vt(l,u);f.position.y=-.46,f.rotation.y=Math.PI/8,f.receiveShadow=!0,n.add(f);const h=t(new gl(1.05,1.2,48)),p=t(new Qr({color:9344934,transparent:!0,opacity:.35,side:Cn})),g=new vt(h,p);g.rotation.x=-Math.PI/2,g.position.y=.005,n.add(g);const v=t(new da(.075,.075,Os+.16,10)),d=t(new ei({color:2303791,roughness:.45,metalness:.55,roughnessMap:a}));for(const C of i){const _=new vt(v,d);_.position.set(C.x,(Os+.16)/2,C.y),_.castShadow=!0,n.add(_)}const m=[],y=[];for(let C=0;C<i.length;C++){const _=i[C],T=i[(C+1)%i.length];if(!_||!T)continue;const N=14;for(let I=0;I<=N;I++){const F=I/N,J=_.x+(T.x-_.x)*F,q=_.y+(T.y-_.y)*F;if(m.push(J,.06,q,J,Os,q),I<N){const H=(I+1)/N,Z=_.x+(T.x-_.x)*H,K=_.y+(T.y-_.y)*H;for(let te=0;te<5;te++){const re=.06+(Os-.06)*(te/5),ue=.06+(Os-.06)*((te+1)/5);m.push(J,re,q,Z,ue,K),m.push(J,ue,q,Z,re,K)}}}for(const I of[.06,Os])y.push(_.x,I,_.y,T.x,I,T.y)}const b=t(new Ht);b.setAttribute("position",new lt(m,3));const S=t(new ol({color:7173766,transparent:!0,opacity:.32}));n.add(new Yu(b,S));const A=t(new Ht);A.setAttribute("position",new lt(y,3));const E=t(new ol({color:14212582,transparent:!0,opacity:.55}));return n.add(new Yu(A,E)),{group:n,dispose(){for(const C of e)C.dispose();e.length=0}}}function jy(n){const e=new pv(7175321,461069,.12);n.add(e);const t=new _v(16773856,1.5);t.position.set(2.6,10.5,3.4),t.castShadow=!0,t.shadow.mapSize.set(2048,2048),t.shadow.camera.near=2,t.shadow.camera.far=22,t.shadow.camera.left=-5.5,t.shadow.camera.right=5.5,t.shadow.camera.top=5.5,t.shadow.camera.bottom=-5.5,t.shadow.bias=-9e-4,t.shadow.normalBias=.02,t.shadow.radius=2,n.add(t);const i=[];for(const[r,a]of[[-3.2,-3.2],[3.2,-3.2],[-3.2,3.2],[3.2,3.2]]){const o=new yd(16774374,11,16,Math.PI/4.6,.55,1.6);o.position.set(r,7.4,a),o.target.position.set(r*.25,1,a*.25),n.add(o,o.target),i.push(o)}const s=new yd(10337535,14,20,Math.PI/5,.7,1.5);return s.position.set(-6.5,4.6,-5.2),s.target.position.set(0,1.1,0),n.add(s,s.target),()=>{n.remove(e,t,s,s.target);for(const r of i)n.remove(r,r.target);t.dispose(),s.dispose();for(const r of i)r.dispose()}}class $y{constructor(e,t={}){Je(this,"renderer");Je(this,"scene",new Ru);Je(this,"camera",new tn(40,16/9,.1,120));Je(this,"arena");Je(this,"disposeLighting");Je(this,"fighterA",new fp(Vy));Je(this,"fighterB",new fp(Wy));Je(this,"cameraTarget",new k(0,1.2,0));Je(this,"desiredPosition",new k);Je(this,"desiredTarget",new k);Je(this,"observer");Je(this,"composer");Je(this,"bloom");Je(this,"environment");Je(this,"timeline");Je(this,"raf",0);Je(this,"lastTick",0);Je(this,"costs",[]);Je(this,"downgraded",!1);Je(this,"lastWidth",0);Je(this,"lastHeight",0);Je(this,"time",0);Je(this,"rate",1);Je(this,"running",!1);Je(this,"disposed",!1);this.container=e,this.options=t,this.renderer=new BM({antialias:!0,alpha:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=jh,this.renderer.setClearColor(329483,1),this.renderer.toneMapping=Rr,this.renderer.toneMappingExposure=.72,this.renderer.outputColorSpace=an,e.appendChild(this.renderer.domElement),this.renderer.domElement.style.display="block",this.renderer.domElement.style.width="100%",this.renderer.domElement.style.height="100%",this.scene.fog=new Fc(329483,10,26);const i=new El(this.renderer);this.environment=i.fromScene(new GM,.04).texture,this.scene.environment=this.environment,this.scene.environmentIntensity=.16,i.dispose(),this.arena=Qy(),this.scene.add(this.arena.group),this.disposeLighting=jy(this.scene),this.scene.add(this.fighterA.root,this.fighterB.root),this.composer=new KM(this.renderer),this.composer.addPass(new YM(this.scene,this.camera)),this.bloom=new Ls(new le(1,1),.22,.7,.92),this.composer.addPass(this.bloom),this.composer.addPass(new ZM),this.composer.addPass(new JM),this.camera.position.set(2.9,2.5,4.6),this.camera.lookAt(this.cameraTarget),this.observer=new ResizeObserver(()=>this.resize()),this.observer.observe(e),this.resize()}resize(){const e=Math.max(this.container.clientWidth,1),t=Math.max(this.container.clientHeight,1);this.lastWidth=e,this.lastHeight=t,this.renderer.setSize(e,t,!1),this.composer?.setSize(e,t),this.bloom?.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}load(e){this.timeline=e,this.time=0,this.renderAt(0,!0)}get duration(){return this.timeline?.duration??0}get currentTime(){return this.time}get isPlaying(){return this.running}setRate(e){this.rate=e}seek(e){this.time=Math.max(0,Math.min(e,this.duration)),this.renderAt(this.time,!0)}play(){if(this.running||this.disposed)return;this.time>=this.duration&&(this.time=0),this.running=!0,this.lastTick=performance.now();const e=t=>{if(!this.running)return;const i=Math.min((t-this.lastTick)/1e3,.1);this.measure(i),this.lastTick=t,this.time+=i*this.rate,this.time>=this.duration&&(this.time=this.duration,this.running=!1),this.renderAt(this.time,!1,i),this.running&&(this.raf=requestAnimationFrame(e))};this.raf=requestAnimationFrame(e)}measure(e){if(this.downgraded||this.costs.length>60||(this.costs.push(e),this.costs.length<45))return;const t=[...this.costs].sort((s,r)=>s-r);(t[Math.floor(t.length/2)]??0)>.033?(this.downgraded=!0,this.renderer.setPixelRatio(1),this.renderer.shadowMap.enabled=!1,this.scene.environmentIntensity=.22,this.resize(),this.options.onQuality?.("reduced")):(this.downgraded=!0,this.options.onQuality?.("full"))}pause(){this.running=!1,this.raf&&cancelAnimationFrame(this.raf),this.raf=0}renderAt(e,t=!1,i=0){if(this.disposed||!this.timeline)return;(this.renderer.domElement.clientWidth!==this.lastWidth||this.renderer.domElement.clientHeight!==this.lastHeight)&&this.resize();const s=by(this.timeline,e);this.fighterA.applyPose(s.a.pose),this.fighterA.setPlacement(s.a.position,s.a.yaw),this.fighterB.applyPose(s.b.pose),this.fighterB.setPlacement(s.b.position,s.b.yaw);const r=(s.a.position[0]+s.b.position[0])/2,a=(s.a.position[2]+s.b.position[2])/2,o=Math.atan2(s.b.position[0]-s.a.position[0],s.b.position[2]-s.a.position[2]),c=Q1(s.camera,r,a,e,o,s.cameraSide);if(this.desiredPosition.set(c.position[0],c.position[1],c.position[2]),this.desiredTarget.set(c.target[0],c.target[1],c.target[2]),t)this.camera.position.copy(this.desiredPosition),this.cameraTarget.copy(this.desiredTarget),this.camera.fov=c.fov;else{const l=1-Math.exp(-6*i);this.camera.position.lerp(this.desiredPosition,l),this.cameraTarget.lerp(this.desiredTarget,l),this.camera.fov+=(c.fov-this.camera.fov)*l}this.camera.updateProjectionMatrix(),this.camera.lookAt(this.cameraTarget),this.downgraded&&!this.renderer.shadowMap.enabled?this.renderer.render(this.scene,this.camera):this.composer.render(),this.options.onFrame?.(s)}dispose(){this.pause(),this.disposed=!0,this.observer.disconnect(),this.disposeLighting(),this.arena.dispose(),this.fighterA.dispose(),this.fighterB.dispose(),this.environment.dispose(),this.composer.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}}function eb(n,e={}){try{return new $y(n,e)}catch(t){e.onError?.(t instanceof Error?t.message:String(t));return}}let Qi,Us=[],Fs=new Map,mt=[void 0,void 0],xt,yi,$t;const Fe=n=>{const e=document.getElementById(n);if(!e)throw new Error(`missing #${n}`);return e},yt=n=>n.replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]??e),lh=n=>{const e=Math.max(0,Math.floor(n));return`${String(Math.floor(e/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`},Xa=n=>n.replace(/_/g," ").toLowerCase().replace(/(^|\s)\w/g,e=>e.toUpperCase());function Ka(n){const e=new Date(n.birthDate),t=new Date(Qi.state.currentDate);let i=t.getFullYear()-e.getFullYear();const s=t.getMonth()-e.getMonth();return(s<0||s===0&&t.getDate()<e.getDate())&&i--,i}function pp(n){const e=performance.now();Qi=N0({seed:n}),Us=Qi.state.fighters.filter(c=>c.status==="active"),Fs=new Map;for(const c of fo(Qi.state.promotions,Qi.state.fighters,Qi.state.currentDate))Fs.set(c.fighterId,c.rank);const t=Math.round(performance.now()-e);Fe("built").textContent=`${Us.length} active fighters across ${Qi.state.camps.length} camps, built in ${t}ms`;const i=Fe("division"),s=new Set(Us.map(c=>c.divisionKey));i.innerHTML='<option value="">All divisions</option>'+["male","female"].flatMap(c=>Bp(c).filter(l=>s.has(l.key))).map(c=>`<option value="${c.key}">${yt(c.name)}</option>`).join("");const r=[...Us].sort((c,l)=>dn(l)-dn(c)),a=r[0],o=r.find(c=>c!==a&&c.divisionKey===a?.divisionKey);mt=[a,o??r[1]],xt=void 0,yi=void 0,Bs(),Ya(),Fe("result").hidden=!0,Fe("replay").hidden=!0,mt[0]&&mt[1]&&gp()}function mp(){const n=Fe("division").value,e=Fe("search").value.trim().toLowerCase(),t=Fe("sort").value;let i=Us;n&&(i=i.filter(r=>r.divisionKey===n)),e&&(i=i.filter(r=>{const a=co(r).primary.label.toLowerCase();return un(r).toLowerCase().includes(e)||a.includes(e)}));const s={ability:(r,a)=>dn(a)-dn(r),rank:(r,a)=>(Fs.get(r.id)??999)-(Fs.get(a.id)??999),name:(r,a)=>un(r).localeCompare(un(a)),age:(r,a)=>Ka(r)-Ka(a),wins:(r,a)=>a.record.wins-r.record.wins};return[...i].sort(s[t]??s.ability).slice(0,300)}function Bs(){const n=mp();Fe("count").textContent=`${n.length} shown`,Fe("roster").innerHTML=n.map(e=>{const t=co(e),i=Fs.get(e.id),s=mt[0]?.id===e.id?"a":mt[1]?.id===e.id?"b":"";return`<tr data-id="${e.id}" class="${s}"><td class="rank">${i===0?"<b>C</b>":i&&i<=15?`#${i}`:""}</td><td class="who"><span class="nm">${yt(un(e))}</span><span class="sub">${yt(t.primary.label)}</span></td><td class="div">${yt(e.divisionKey.replace(/^[mw]_/,"").replace(/_/g," "))}</td><td class="num">${yt(yh(e))}</td><td class="num">${Ka(e)}</td><td class="num ca">${Math.round(dn(e))}</td><td class="pick"><button data-corner="0">A</button><button data-corner="1">B</button></td></tr>`}).join("")}function Ya(){for(const e of[0,1]){const t=mt[e],i=Fe(`corner-${e}`);if(!t){i.innerHTML='<p class="empty">Pick a fighter from the roster</p>';continue}const s=co(t),r=Fs.get(t.id),a=(o,c)=>`<div class="tp"><span>${o}</span><b>${yt(c)}</b></div>`;i.innerHTML=`<h3>${yt(un(t))}</h3><p class="sub">${r===0?"Champion · ":r?`#${r} · `:""}${yt(t.divisionKey.replace(/^[mw]_/,"").replace(/_/g," "))}</p>`+a("Record",yh(t))+a("Style",s.primary.label)+a("Signature",s.signatureSkill.label)+a("Age",String(Ka(t)))+a("Height",`${Math.floor(t.heightIn/12)}'${t.heightIn%12}"`)+a("Reach",`${t.reachIn}"`)+a("Stance",Xa(t.stance))+a("Ability",String(Math.round(dn(t))))}const n=!!(mt[0]&&mt[1]&&mt[0].id!==mt[1].id);Fe("run").disabled=!n,Fe("mismatch").hidden=!(mt[0]&&mt[1]&&mt[0].divisionKey!==mt[1].divisionKey)}function gp(){const[n,e]=mt;if(!n||!e)return;const t=Number(Fe("rounds").value),i=Fe("fight-seed").value.trim()||`lab-${n.id}-${e.id}`;xt=cm(n,e,{fightId:i,rounds:t},Tn.fromSeed(i));const s=xt.events.map(r=>({event:r,directive:Jh(r)}));yi=my(s,n.id,e.id,void 0,[Zh(n,i),Zh(e,i)]),tb(n,e),ib(),sb()}function tb(n,e){if(!xt)return;const t=xt.winnerId===n.id?n:xt.winnerId===e.id?e:void 0,i=xt.technique?` (${Xa(xt.technique)})`:"",s=xt.finishRound?`R${xt.finishRound} ${xt.finishTime}`:"decision";Fe("verdict").innerHTML=t?`<strong>${yt(un(t))}</strong> def. ${yt(un(t.id===n.id?e:n))} — ${yt(Xa(xt.outcome))}${yt(i)}, ${yt(s)}`:`<strong>${yt(Xa(xt.outcome))}</strong> after ${xt.rounds} rounds`;const r=xt.scorecards.map(l=>`<li>${yt(l.judgeName)}: ${l.totalA} &ndash; ${l.totalB}</li>`).join("");Fe("cards").innerHTML=xt.scorecards.length?`<ul>${r}</ul>`:"";const a=xt.stats[n.id],o=xt.stats[e.id],c=(l,u)=>a&&o?`<div class="tape-row"><span>${u(a)}</span><em>${l}</em><span>${u(o)}</span></div>`:"";Fe("stats").innerHTML=`<div class="tape-row head"><span>${yt(un(n))}</span><em></em><span>${yt(un(e))}</span></div>`+c("Significant strikes",l=>`${l.significantStrikesLanded}/${l.significantStrikesAttempted}`)+c("Head / body / leg",l=>`${l.headStrikes} / ${l.bodyStrikes} / ${l.legStrikes}`)+c("Takedowns",l=>`${l.takedownsLanded}/${l.takedownsAttempted}`)+c("Submission attempts",l=>String(l.submissionAttempts))+c("Knockdowns",l=>String(l.knockdowns))+c("Control time",l=>lh(l.controlTime)),nb(n,e),Fe("result").hidden=!1}function nb(n,e){if(!xt)return;const t=xt.roundStats,i=t[n.id]??[],s=t[e.id]??[],r=Math.max(i.length,s.length);if(r===0){Fe("breakdown").innerHTML="";return}const a=c=>c?`<b>${c.significantStrikesLanded}</b><span>${c.headStrikes}/${c.bodyStrikes}/${c.legStrikes}</span>`:"<b>—</b><span></span>";let o='<div class="rounds"><div class="rhead"><span></span>';for(let c=0;c<r;c++)o+=`<span>R${c+1}</span>`;o+="</div>";for(const[c,l,u]of[[n,i,"red"],[e,s,"blue"]]){o+=`<div class="rrow ${u}"><span class="rname">${yt(un(c))}</span>`;for(let f=0;f<r;f++){const h=l[f]?.significantStrikesLanded??0,p=(c===n?s:i)[f]?.significantStrikesLanded??0;o+=`<span class="rcell${h>p?" won":""}">${a(l[f])}</span>`}o+="</div>"}o+='</div><p class="rlegend">Significant strikes landed, with head / body / leg beneath. Shaded cell led the round on volume.</p>',Fe("breakdown").innerHTML=o}function ib(){xt&&(Fe("stream").innerHTML=xt.events.map((n,e)=>{const t=Jh(n);return`<li data-beat="${e}"><span class="c1">R${n.round} ${n.roundTime}</span><span class="c2">${yt(t.clip)}</span><span class="c3">${yt(t.reaction.toLowerCase())}</span><span class="c4">${yt(n.description)}</span></li>`}).join(""))}function sb(){if(!yi)return;Fe("replay").hidden=!1;const[n,e]=mt;Fe("hud-a").textContent=n?un(n):"",Fe("hud-b").textContent=e?un(e):"",$t||($t=eb(Fe("stage"),{onFrame:rb,onError:t=>{Fe("stage").innerHTML=`<p class="empty">${yt(t)}</p>`}})),$t&&($t.load(yi),Fe("scrub").max=String(yi.duration),$t.seek(0),$t.play(),Fe("play").textContent="Pause")}function rb(n){Fe("scrub").value=String(n.time),ab(n.time),Fe("time").textContent=`${lh(n.time)} / ${lh(yi?.duration??0)}`,Fe("hud-clock").textContent=`R${n.round} · ${n.roundTime}`,Fe("hud-line").textContent=n.description,Fe("hud-cam").textContent=n.camera.toLowerCase().replace(/_/g," ")}function ab(n){if(!xt||!mt[0]||!mt[1])return;let e=0,t=0;for(const i of xt.events){if(i.timestamp>n)break;i.eventType!=="SIGNIFICANT_STRIKE"||!("result"in i&&(i.result==="LANDED"||i.result==="PARTIAL"))||!("attacker"in i)||(i.attacker===mt[0].id?e++:t++)}Fe("count-a").textContent=String(e),Fe("count-b").textContent=String(t)}function ob(){Fe("generate").addEventListener("click",()=>pp(Fe("seed").value.trim()||"sandbox"));for(const n of["division","sort"])Fe(n).addEventListener("change",Bs);Fe("search").addEventListener("input",Bs),Fe("roster").addEventListener("click",n=>{const e=n.target.closest("button[data-corner]"),t=n.target.closest("tr[data-id]");if(!t)return;const i=Us.find(r=>r.id===t.dataset.id);if(!i)return;const s=e?Number(e.dataset.corner):mt[0]?1:0;mt[s]=i,Bs(),Ya()}),Fe("swap").addEventListener("click",()=>{mt=[mt[1],mt[0]],Bs(),Ya()}),Fe("random").addEventListener("click",()=>{const n=mp();if(n.length<2)return;const e=Math.floor(Math.random()*n.length);let t=Math.floor(Math.random()*n.length);t===e&&(t=(t+1)%n.length),mt=[n[e],n[t]],Bs(),Ya()}),Fe("run").addEventListener("click",gp),Fe("play").addEventListener("click",()=>{$t&&($t.isPlaying?($t.pause(),Fe("play").textContent="Play"):($t.play(),Fe("play").textContent="Pause"))}),Fe("scrub").addEventListener("input",n=>{$t?.pause(),Fe("play").textContent="Play",$t?.seek(Number(n.target.value))}),Fe("rate").addEventListener("change",n=>{$t?.setRate(Number(n.target.value))}),Fe("stream").addEventListener("click",n=>{const e=n.target.closest("li[data-beat]");if(!e||!yi)return;const t=yi.beats[Number(e.dataset.beat)];t&&($t?.pause(),Fe("play").textContent="Play",$t?.seek(t.start))})}ob(),pp("sandbox")})();
