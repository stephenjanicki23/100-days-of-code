var cb=Object.defineProperty;var lb=(yi,Hn,An)=>Hn in yi?cb(yi,Hn,{enumerable:!0,configurable:!0,writable:!0,value:An}):yi[Hn]=An;var Ye=(yi,Hn,An)=>lb(yi,typeof Hn!="symbol"?Hn+"":Hn,An);(function(){"use strict";function yi(n){let e=1779033703,t=3144134277,i=1013904242,s=2773480762;for(let r=0;r<n.length;r++){const a=n.charCodeAt(r);e=t^Math.imul(e^a,597399067),t=i^Math.imul(t^a,2869860233),i=s^Math.imul(i^a,951274213),s=e^Math.imul(s^a,2716044179)}return e=Math.imul(i^e>>>18,597399067),t=Math.imul(s^t>>>22,2869860233),i=Math.imul(e^i>>>17,951274213),s=Math.imul(t^s>>>19,2716044179),[(e^t^i^s)>>>0,(t^e)>>>0,(i^e)>>>0,(s^e)>>>0]}function Hn(n){return n.join("␟")}class An{constructor(e,t){Ye(this,"a");Ye(this,"b");Ye(this,"c");Ye(this,"d");this.address=t,[this.a,this.b,this.c,this.d]=e;for(let i=0;i<12;i++)this.nextUint32()}static fromSeed(...e){const t=Hn(e);return new An(yi(t),t)}derive(...e){return An.fromSeed(this.address,...e)}nextUint32(){const e=this.a+this.b|0;this.a=this.b^this.b>>>9,this.b=this.c+(this.c<<3)|0,this.c=this.c<<21|this.c>>>11,this.d=this.d+1|0;const t=e+this.d|0;return this.c=this.c+t|0,t>>>0}next(){return this.nextUint32()/4294967296}int(e,t){if(t<e)throw new RangeError(`Rng.int: max (${t}) < min (${e})`);return e+Math.floor(this.next()*(t-e+1))}float(e,t){return e+this.next()*(t-e)}bool(e=.5){return this.next()<e}pick(e){if(e.length===0)throw new RangeError("Rng.pick: empty collection");return e[Math.floor(this.next()*e.length)]}pickWeighted(e){let t=0;for(const[,s]of e)s>0&&(t+=s);if(t<=0)throw new RangeError("Rng.pickWeighted: no entry has a positive weight");let i=this.next()*t;for(const[s,r]of e)if(!(r<=0)&&(i-=r,i<0))return s;return e[e.length-1][0]}shuffle(e){const t=e.slice();for(let i=t.length-1;i>0;i--){const s=this.int(0,i);[t[i],t[s]]=[t[s],t[i]]}return t}sample(e,t){return this.shuffle(e).slice(0,Math.max(0,Math.min(t,e.length)))}normal(e=0,t=1){let i=0;for(;i===0;)i=this.next();const s=this.next();return e+t*Math.sqrt(-2*Math.log(i))*Math.cos(2*Math.PI*s)}clampedNormal(e,t,i,s){for(let r=0;r<24;r++){const a=this.normal(e,t);if(a>=i&&a<=s)return a}return Math.min(s,Math.max(i,this.normal(e,t)))}triangular(e,t,i){const s=this.next(),r=(t-e)/(i-e);return s<r?e+Math.sqrt(s*(i-e)*(t-e)):i-Math.sqrt((1-s)*(i-e)*(i-t))}}function $(n,e,t){return n<e?e:n>t?t:n}function yp(n){return $(n,1,100)}function Qa(n,e,t){return n+(e-n)*$(t,0,1)}function ut(n,e,t,i,s){return t===e?i:Qa(i,s,(n-e)/(t-e))}function He(n,e=0){const t=10**e;return Math.round(n*t)/t}function bp(n){let e=0;for(const t of n)e+=t;return e}function ja(n){return n.length===0?0:bp(n)/n.length}function Ep(n){if(n.length===0)return 0;const e=ja(n);return Math.sqrt(ja(n.map(t=>(t-e)**2)))}function Tn(n){let e=0,t=0;for(const[i,s]of n)s<=0||(e+=i*s,t+=s);return t===0?0:e/t}function Ap(n,e=0,t=1){return 1/(1+Math.exp(-t*(n-e)))}const ph=864e5;function $a(n){const[e,t,i]=n.split("-").map(Number);if(!e||!t||!i)throw new TypeError(`Invalid simulated date: ${n}`);return Date.UTC(e,t-1,i)}function Tp(n){return new Date(n).toISOString().slice(0,10)}function Gs(n,e){return Tp($a(n)+e*ph)}function eo(n,e){return Math.round(($a(e)-$a(n))/ph)}function to(n){return Number(n.slice(0,4))}function wp(n,e){return Math.floor(eo(n,e)/7)}const Mr=[{key:"boxing",label:"Boxing",group:"striking",agingClass:"skill",isStyleSkill:!0},{key:"muayThai",label:"Muay Thai",group:"striking",agingClass:"skill",isStyleSkill:!0},{key:"kickboxing",label:"Kickboxing",group:"striking",agingClass:"skill",isStyleSkill:!0},{key:"dutchKickboxing",label:"Dutch Kickboxing",group:"striking",agingClass:"skill",isStyleSkill:!0},{key:"karate",label:"Karate",group:"striking",agingClass:"skill",isStyleSkill:!0},{key:"taekwondo",label:"Taekwondo",group:"striking",agingClass:"skill",isStyleSkill:!0},{key:"sanda",label:"Sanda",group:"striking",agingClass:"skill",isStyleSkill:!0},{key:"strikingDefense",label:"Striking Defence",group:"striking",agingClass:"skill",isStyleSkill:!1},{key:"footwork",label:"Footwork",group:"striking",agingClass:"physical",isStyleSkill:!1},{key:"strikingPower",label:"Striking Power",group:"striking",agingClass:"physical",isStyleSkill:!1},{key:"strikingAccuracy",label:"Striking Accuracy",group:"striking",agingClass:"skill",isStyleSkill:!1},{key:"freestyleWrestling",label:"Freestyle Wrestling",group:"wrestling",agingClass:"skill",isStyleSkill:!0},{key:"folkstyleWrestling",label:"Folkstyle Wrestling",group:"wrestling",agingClass:"skill",isStyleSkill:!0},{key:"grecoRomanWrestling",label:"Greco-Roman Wrestling",group:"wrestling",agingClass:"skill",isStyleSkill:!0},{key:"takedownAbility",label:"Takedown Ability",group:"wrestling",agingClass:"skill",isStyleSkill:!1},{key:"takedownDefense",label:"Takedown Defence",group:"wrestling",agingClass:"skill",isStyleSkill:!1},{key:"chainWrestling",label:"Chain Wrestling",group:"wrestling",agingClass:"skill",isStyleSkill:!1},{key:"clinchWrestling",label:"Clinch Wrestling",group:"wrestling",agingClass:"skill",isStyleSkill:!1},{key:"cageWork",label:"Cage Work",group:"wrestling",agingClass:"skill",isStyleSkill:!1},{key:"brazilianJiuJitsu",label:"Brazilian Jiu-Jitsu",group:"grappling",agingClass:"skill",isStyleSkill:!0},{key:"submissionGrappling",label:"Submission Grappling",group:"grappling",agingClass:"skill",isStyleSkill:!0},{key:"judo",label:"Judo",group:"grappling",agingClass:"skill",isStyleSkill:!0},{key:"sambo",label:"Sambo",group:"grappling",agingClass:"skill",isStyleSkill:!0},{key:"guardGame",label:"Guard Game",group:"grappling",agingClass:"skill",isStyleSkill:!1},{key:"topControl",label:"Top Control",group:"grappling",agingClass:"skill",isStyleSkill:!1},{key:"submissionAbility",label:"Submission Ability",group:"grappling",agingClass:"skill",isStyleSkill:!1},{key:"submissionDefense",label:"Submission Defence",group:"grappling",agingClass:"skill",isStyleSkill:!1},{key:"scrambling",label:"Scrambling",group:"grappling",agingClass:"physical",isStyleSkill:!1},{key:"groundStriking",label:"Ground Striking",group:"grappling",agingClass:"skill",isStyleSkill:!1},{key:"strength",label:"Strength",group:"physical",agingClass:"physical",isStyleSkill:!1},{key:"explosiveness",label:"Explosiveness",group:"physical",agingClass:"physical",isStyleSkill:!1},{key:"speed",label:"Speed",group:"physical",agingClass:"physical",isStyleSkill:!1},{key:"agility",label:"Agility",group:"physical",agingClass:"physical",isStyleSkill:!1},{key:"cardio",label:"Cardio",group:"physical",agingClass:"physical",isStyleSkill:!1},{key:"durability",label:"Durability",group:"physical",agingClass:"physical",isStyleSkill:!1},{key:"recovery",label:"Recovery",group:"physical",agingClass:"physical",isStyleSkill:!1},{key:"balance",label:"Balance",group:"physical",agingClass:"physical",isStyleSkill:!1},{key:"fightIQ",label:"Fight IQ",group:"mental",agingClass:"mental",isStyleSkill:!1},{key:"composure",label:"Composure",group:"mental",agingClass:"mental",isStyleSkill:!1},{key:"adaptability",label:"Adaptability",group:"mental",agingClass:"mental",isStyleSkill:!1},{key:"confidence",label:"Confidence",group:"mental",agingClass:"mental",isStyleSkill:!1},{key:"aggression",label:"Aggression",group:"mental",agingClass:"mental",isStyleSkill:!1},{key:"decisionMaking",label:"Decision Making",group:"mental",agingClass:"mental",isStyleSkill:!1},{key:"pressureManagement",label:"Pressure Management",group:"mental",agingClass:"mental",isStyleSkill:!1}],bi=Mr.map(n=>n.key),Rp=new Map(Mr.map(n=>[n.key,n]));function Cp(n){const e=Rp.get(n);if(!e)throw new RangeError(`Unknown attribute: ${n}`);return e}function no(n){return Mr.filter(e=>e.group===n&&e.isStyleSkill).map(e=>e.key)}function Lp(n){const e={};for(const t of Mr)e[t.key]=n(t.key,t);return e}function Pp(n,e,t){return e.map(i=>n[i]).sort((i,s)=>s-i).slice(0,t)}const mh=[{key:"discipline",label:"Discipline",description:"Adherence to camp, diet and weight-cut demands."},{key:"confidence",label:"Confidence",description:"Baseline self-belief, distinct from in-fight composure."},{key:"ego",label:"Ego",description:"Resistance to correction; drives friction with coaches and rivals."},{key:"aggression",label:"Aggression",description:"Disposition toward forcing exchanges rather than managing them."},{key:"workEthic",label:"Work Ethic",description:"How much of the available training load is genuinely absorbed."},{key:"loyalty",label:"Loyalty",description:"Attachment to a camp, coach and team."},{key:"adaptability",label:"Adaptability",description:"Willingness to change a game plan or a habit."},{key:"coachability",label:"Coachability",description:"How much value is extracted from good coaching."},{key:"riskTolerance",label:"Risk Tolerance",description:"Appetite for dangerous fights and dangerous exchanges."},{key:"composure",label:"Composure",description:"Baseline temperament under career pressure."},{key:"ambition",label:"Ambition",description:"Drive toward titles, bigger camps and bigger fights."}];mh.map(n=>n.key);function Dp(n){const e={};for(const t of mh)e[t.key]=n(t.key);return e}const Ei=[{key:"m_flyweight",name:"Flyweight",sex:"male",weightLimitLbs:125,order:1,heightRangeIn:[62,67],reachBiasIn:.5,populationWeight:.6},{key:"m_bantamweight",name:"Bantamweight",sex:"male",weightLimitLbs:135,order:2,heightRangeIn:[63,69],reachBiasIn:.7,populationWeight:.9},{key:"m_featherweight",name:"Featherweight",sex:"male",weightLimitLbs:145,order:3,heightRangeIn:[64,70],reachBiasIn:.9,populationWeight:1.1},{key:"m_lightweight",name:"Lightweight",sex:"male",weightLimitLbs:155,order:4,heightRangeIn:[66,72],reachBiasIn:1,populationWeight:1.5},{key:"m_welterweight",name:"Welterweight",sex:"male",weightLimitLbs:170,order:5,heightRangeIn:[68,74],reachBiasIn:1.2,populationWeight:1.4},{key:"m_middleweight",name:"Middleweight",sex:"male",weightLimitLbs:185,order:6,heightRangeIn:[70,76],reachBiasIn:1.3,populationWeight:1.1},{key:"m_light_heavyweight",name:"Light Heavyweight",sex:"male",weightLimitLbs:205,order:7,heightRangeIn:[72,78],reachBiasIn:1.4,populationWeight:.8},{key:"m_heavyweight",name:"Heavyweight",sex:"male",weightLimitLbs:265,order:8,heightRangeIn:[73,80],reachBiasIn:1.5,populationWeight:.7},{key:"w_strawweight",name:"Women's Strawweight",sex:"female",weightLimitLbs:115,order:1,heightRangeIn:[60,66],reachBiasIn:.3,populationWeight:.45},{key:"w_flyweight",name:"Women's Flyweight",sex:"female",weightLimitLbs:125,order:2,heightRangeIn:[62,68],reachBiasIn:.4,populationWeight:.4},{key:"w_bantamweight",name:"Women's Bantamweight",sex:"female",weightLimitLbs:135,order:3,heightRangeIn:[63,70],reachBiasIn:.5,populationWeight:.3},{key:"w_featherweight",name:"Women's Featherweight",sex:"female",weightLimitLbs:145,order:4,heightRangeIn:[64,71],reachBiasIn:.6,populationWeight:.15}],Ip=new Map(Ei.map(n=>[n.key,n]));function Np(n){const e=Ip.get(n);if(!e)throw new RangeError(`Unknown division: ${n}`);return e}function Op(n){return Ei.filter(e=>e.sex===n).sort((e,t)=>e.order-t.order)}function Up(){const n={};for(const e of bi)n[e]=.25;return n.fightIQ=1,n.adaptability=.8,n.decisionMaking=.7,n}const Ai=[{key:"boxing",label:"Boxing",family:"striking",prevalence:10,attributeWeights:{boxing:1,strikingAccuracy:.6,strikingDefense:.5,footwork:.45,strikingPower:.35}},{key:"muay_thai",label:"Muay Thai",family:"striking",prevalence:9,attributeWeights:{muayThai:1,strikingPower:.5,clinchWrestling:.35,strikingDefense:.3,kickboxing:.25}},{key:"kickboxing",label:"Kickboxing",family:"striking",prevalence:6,attributeWeights:{kickboxing:1,footwork:.45,strikingAccuracy:.4,muayThai:.2}},{key:"dutch_kickboxing",label:"Dutch Kickboxing",family:"striking",prevalence:4,attributeWeights:{dutchKickboxing:1,kickboxing:.5,strikingPower:.55,boxing:.35,cardio:.25}},{key:"karate",label:"Karate",family:"striking",prevalence:2,attributeWeights:{karate:1,footwork:.6,speed:.35,strikingAccuracy:.35}},{key:"taekwondo",label:"Taekwondo",family:"striking",prevalence:1.2,attributeWeights:{taekwondo:1,agility:.45,speed:.4,footwork:.3}},{key:"sanda",label:"Sanda",family:"striking",prevalence:1.5,attributeWeights:{sanda:1,clinchWrestling:.4,takedownAbility:.3,strikingPower:.3}},{key:"freestyle_wrestling",label:"Freestyle Wrestling",family:"wrestling",prevalence:9,attributeWeights:{freestyleWrestling:1,takedownAbility:.7,chainWrestling:.5,scrambling:.35}},{key:"folkstyle_wrestling",label:"Folkstyle Wrestling",family:"wrestling",prevalence:7,attributeWeights:{folkstyleWrestling:1,topControl:.6,chainWrestling:.55,takedownAbility:.5}},{key:"greco_roman",label:"Greco-Roman Wrestling",family:"wrestling",prevalence:4,attributeWeights:{grecoRomanWrestling:1,clinchWrestling:.7,strength:.4,balance:.3}},{key:"cage_wrestling",label:"Cage Wrestling",family:"wrestling",prevalence:7,attributeWeights:{cageWork:1,clinchWrestling:.6,takedownAbility:.45,takedownDefense:.4}},{key:"takedown_defense",label:"Takedown Defence",family:"wrestling",prevalence:4,attributeWeights:{takedownDefense:1,balance:.5,scrambling:.4}},{key:"bjj",label:"Brazilian Jiu-Jitsu",family:"grappling",prevalence:10,attributeWeights:{brazilianJiuJitsu:1,guardGame:.65,submissionAbility:.6,submissionDefense:.45}},{key:"submission_grappling",label:"Submission Grappling",family:"grappling",prevalence:6,attributeWeights:{submissionGrappling:1,submissionAbility:.7,scrambling:.5,topControl:.3}},{key:"judo",label:"Judo",family:"grappling",prevalence:4,attributeWeights:{judo:1,clinchWrestling:.5,balance:.4,takedownAbility:.4}},{key:"sambo",label:"Sambo",family:"grappling",prevalence:3,attributeWeights:{sambo:1,submissionAbility:.5,takedownAbility:.45,topControl:.35}},{key:"ground_and_pound",label:"Ground and Pound",family:"grappling",prevalence:4,attributeWeights:{groundStriking:1,topControl:.75,strikingPower:.3}},{key:"positional_escapes",label:"Positional Escapes",family:"grappling",prevalence:3,attributeWeights:{scrambling:1,guardGame:.6,submissionDefense:.55}},{key:"strength_conditioning",label:"Strength & Conditioning",family:"physical",prevalence:7,attributeWeights:{strength:1,explosiveness:.8,strikingPower:.3,durability:.25}},{key:"conditioning",label:"Conditioning",family:"physical",prevalence:6,attributeWeights:{cardio:1,recovery:.55,durability:.35}},{key:"speed_agility",label:"Speed & Agility",family:"physical",prevalence:3,attributeWeights:{speed:1,agility:.8,footwork:.4,balance:.3}},{key:"sports_science",label:"Sports Science",family:"physical",prevalence:4,attributeWeights:{recovery:1,cardio:.5,durability:.5,balance:.2}},{key:"film_study",label:"Film Study",family:"mental",prevalence:4,attributeWeights:{fightIQ:1,decisionMaking:.7,adaptability:.55}},{key:"mental_performance",label:"Mental Performance",family:"mental",prevalence:3,attributeWeights:{composure:1,pressureManagement:.8,confidence:.6}},{key:"mma_integration",label:"MMA Integration",family:"integration",prevalence:9,attributeWeights:Up()}],kp=new Map(Ai.map(n=>[n.key,n]));function Fp(n){const e=kp.get(n);if(!e)throw new RangeError(`Unknown discipline: ${n}`);return e}const Bp=new Map(Ai.map(n=>{let e=0;for(const i of Object.values(n.attributeWeights))i>e&&(e=i);const t={};for(const[i,s]of Object.entries(n.attributeWeights))t[i]=e===0?0:s/e;return[n.key,t]}));function gh(n,e){return Bp.get(n)?.[e]??0}const xh=["strikingOffense","strikingDefense","wrestlingOffense","wrestlingDefense","clinch","groundOffense","groundDefense","physical","mental"],vh={strikingOffense:"Striking Offence",strikingDefense:"Striking Defence",wrestlingOffense:"Wrestling Offence",wrestlingDefense:"Wrestling Defence",clinch:"Clinch",groundOffense:"Ground Offence",groundDefense:"Ground Defence",physical:"Physical",mental:"Mental"},Gp=no("striking"),zp=no("wrestling"),Hp=no("grappling");function io(n,e){const[t=0,i=0]=Pp(n,e,2);return[t,i]}function so(n){const[e,t]=io(n,Gp),[i]=io(n,zp),[s,r]=io(n,Hp);return{strikingOffense:Tn([[e,.4],[t,.15],[n.strikingAccuracy,.2],[n.strikingPower,.25]]),strikingDefense:Tn([[n.strikingDefense,.55],[n.footwork,.3],[n.speed,.15]]),wrestlingOffense:Tn([[i,.3],[n.takedownAbility,.35],[n.chainWrestling,.2],[n.strength,.15]]),wrestlingDefense:Tn([[n.takedownDefense,.6],[n.balance,.25],[n.scrambling,.15]]),clinch:Tn([[n.clinchWrestling,.45],[n.cageWork,.3],[n.grecoRomanWrestling,.25]]),groundOffense:Tn([[s,.24],[r,.08],[n.submissionAbility,.24],[n.topControl,.24],[n.groundStriking,.2]]),groundDefense:Tn([[n.submissionDefense,.4],[n.guardGame,.3],[n.scrambling,.3]]),physical:Tn([[n.cardio,.2],[n.durability,.18],[n.speed,.14],[n.explosiveness,.13],[n.strength,.12],[n.agility,.09],[n.recovery,.08],[n.balance,.06]]),mental:Tn([[n.fightIQ,.3],[n.composure,.2],[n.decisionMaking,.2],[n.adaptability,.15],[n.pressureManagement,.15]])}}const Vp={strikingOffense:.16,strikingDefense:.11,wrestlingOffense:.12,wrestlingDefense:.11,clinch:.06,groundOffense:.11,groundDefense:.1,physical:.13,mental:.1};function Wp(n){return $(Tn(xh.map(e=>[n[e],Vp[e]])),0,100)}const Xp={pressure:.5,range:.5,strikeVolume:.5,takedownRate:.5,clinchRate:.5,submissionSeeking:.5,counterRate:.5,groundControl:.5,pace:.5},qt=n=>({...Xp,...n}),ro=[{key:"pressure_boxer",label:"Pressure Boxer",description:"Walks opponents down behind heavy hands and a suffocating pace.",offsets:{boxing:22,strikingPower:12,cardio:11,aggression:14,footwork:5,pressureManagement:6,taekwondo:-18,karate:-12,guardGame:-8},tendencies:qt({pressure:.88,range:.25,strikeVolume:.78,takedownRate:.22,counterRate:.2,pace:.8})},{key:"counter_striker",label:"Counter Striker",description:"Invites the lead and punishes it.",offsets:{strikingDefense:18,footwork:14,strikingAccuracy:15,boxing:10,composure:12,fightIQ:8,aggression:-12},tendencies:qt({pressure:.22,range:.68,counterRate:.9,strikeVolume:.42,takedownRate:.2,pace:.42})},{key:"muay_thai_destroyer",label:"Muay Thai Destroyer",description:"Elbows, knees and low kicks from a punishing clinch.",offsets:{muayThai:24,strikingPower:14,clinchWrestling:12,kickboxing:8,durability:6,brazilianJiuJitsu:-10,guardGame:-8},tendencies:qt({pressure:.68,range:.35,clinchRate:.78,strikeVolume:.6,takedownRate:.2,pace:.6})},{key:"out_fighter",label:"Out-Fighter",description:"Fights at the end of their range and refuses to be cornered.",offsets:{footwork:18,speed:14,kickboxing:12,strikingDefense:11,strikingAccuracy:8,strikingPower:-8,aggression:-8},tendencies:qt({pressure:.2,range:.9,strikeVolume:.55,counterRate:.6,clinchRate:.2,pace:.5})},{key:"wrestle_boxer",label:"Wrestle-Boxer",description:"Threatens the takedown to land the right hand, and the right hand to land the takedown.",offsets:{boxing:16,freestyleWrestling:16,takedownAbility:14,chainWrestling:8,topControl:8,fightIQ:6,taekwondo:-15,guardGame:-6},tendencies:qt({pressure:.68,range:.4,takedownRate:.62,strikeVolume:.55,groundControl:.6,pace:.6})},{key:"chain_wrestler",label:"Chain Wrestler",description:"Relentless entries; if the first shot fails the second is already coming.",offsets:{chainWrestling:22,freestyleWrestling:18,takedownAbility:18,folkstyleWrestling:14,cardio:11,strikingPower:-10,taekwondo:-12},tendencies:qt({pressure:.75,range:.3,takedownRate:.9,strikeVolume:.32,groundControl:.7,clinchRate:.65,pace:.72})},{key:"bjj_specialist",label:"BJJ Submission Specialist",description:"Happy anywhere the fight goes down, and hunting the finish from everywhere.",offsets:{brazilianJiuJitsu:24,submissionAbility:20,guardGame:18,submissionGrappling:12,scrambling:8,strikingDefense:-8,takedownDefense:-8},tendencies:qt({pressure:.42,submissionSeeking:.92,groundControl:.3,takedownRate:.55,strikeVolume:.35,pace:.48})},{key:"ground_and_pound_wrestler",label:"Ground-and-Pound Wrestler",description:"Takes you down and makes the round miserable.",offsets:{folkstyleWrestling:18,topControl:20,groundStriking:20,takedownAbility:14,strength:10,footwork:-8,taekwondo:-12},tendencies:qt({pressure:.7,takedownRate:.82,groundControl:.85,submissionSeeking:.25,strikeVolume:.45,pace:.6})},{key:"clinch_specialist",label:"Clinch Specialist",description:"Lives on the fence, where the fight becomes a wrestling match.",offsets:{clinchWrestling:22,cageWork:18,grecoRomanWrestling:18,muayThai:8,strength:10,footwork:-10,kickboxing:-8},tendencies:qt({pressure:.78,range:.15,clinchRate:.92,takedownRate:.55,strikeVolume:.4,pace:.62})},{key:"kicker",label:"Kicker",description:"Long, varied kicks that dismantle a lead leg over three rounds.",offsets:{kickboxing:18,taekwondo:14,karate:10,agility:12,footwork:10,boxing:-10,clinchWrestling:-10},tendencies:qt({pressure:.4,range:.82,strikeVolume:.6,takedownRate:.18,clinchRate:.2,pace:.55})},{key:"karate_counter_fighter",label:"Karate Counter Fighter",description:"Explodes in and out of range from a bladed stance.",offsets:{karate:24,footwork:18,speed:14,explosiveness:12,strikingAccuracy:10,clinchWrestling:-12,grecoRomanWrestling:-10},tendencies:qt({pressure:.3,range:.88,counterRate:.82,strikeVolume:.4,clinchRate:.15,pace:.45})},{key:"sambo_grappler",label:"Sambo Grappler",description:"Trips, throws and leg locks from a wrestling base.",offsets:{sambo:24,judo:14,submissionAbility:14,takedownAbility:12,scrambling:10,topControl:8,taekwondo:-12},tendencies:qt({pressure:.6,takedownRate:.75,submissionSeeking:.7,clinchRate:.6,groundControl:.6,pace:.58})},{key:"complete_mma",label:"Complete MMA Fighter",description:"No holes, no obvious lead — wins wherever the fight ends up.",offsets:{fightIQ:14,adaptability:12,decisionMaking:10,boxing:6,freestyleWrestling:6,brazilianJiuJitsu:6,cardio:6,takedownDefense:6,submissionDefense:6},tendencies:qt({pressure:.55,takedownRate:.5,strikeVolume:.55,pace:.58})},{key:"brawler",label:"Brawler",description:"Trades in the pocket and dares you to trade back.",offsets:{strikingPower:22,aggression:20,durability:12,boxing:8,strikingDefense:-16,fightIQ:-10,composure:-10},tendencies:qt({pressure:.85,range:.18,strikeVolume:.85,counterRate:.15,takedownRate:.2,pace:.88})},{key:"defensive_technician",label:"Defensive Technician",description:"Extremely hard to hit, extremely hard to take down, and content to win on points.",offsets:{strikingDefense:20,takedownDefense:18,submissionDefense:14,composure:14,fightIQ:12,aggression:-16,strikingPower:-8},tendencies:qt({pressure:.3,range:.7,counterRate:.72,strikeVolume:.42,takedownRate:.25,pace:.42})}];new Map(ro.map(n=>[n.key,n]));function Kp(n){const e=bi.map(r=>n[r]),t=ja(e),i=Ep(e)||1,s={};for(const r of bi)s[r]=(n[r]-t)/i;return ro.map(r=>{let a=0,o=0;for(const[c,l]of Object.entries(r.offsets))a+=l*s[c],o+=l*l;return{archetype:r,fit:o===0?0:a/Math.sqrt(o)}}).sort((r,a)=>a.fit-r.fit)}function Yp(n,e,t=.3){const i={};for(const s of Object.keys(n))i[s]=n[s]*(1-t)+e[s]*t;return i}function ao(n){const e=Kp(n),t=e[0].archetype,i=e[1].archetype,s=so(n),r=[...xh].sort((l,u)=>s[u]-s[l]),a=r[0],o=r[r.length-1];let c=bi[0];for(const l of bi)n[l]>n[c]&&(c=l);return{primary:t,secondary:i,strength:{facet:a,label:vh[a],rating:Math.round(s[a])},weakness:{facet:o,label:vh[o],rating:Math.round(s[o])},signatureSkill:{attribute:c,label:Cp(c).label,rating:Math.round(n[c])},ranking:e,tendencies:Yp(t.tendencies,i.tendencies)}}const oo=200,qp=12,Jp=86;function Zp(n){return $(ut(Wp(n),qp,Jp,0,oo),1,oo)}function yr(n){return Zp(so(n))}function Qp(n){return`${n.firstName} ${n.lastName}`}function xn(n){return n.nickname?`${n.firstName} "${n.nickname}" ${n.lastName}`:Qp(n)}function hn(n){return yr(n.attributes)}function co(n){return ao(n.attributes)}function _h(n){const{wins:e,losses:t,draws:i,noContests:s}=n.record,r=`${e}-${t}-${i}`;return s>0?`${r} (${s} NC)`:r}function Sh(n,e){return Lp(t=>yp(n+(e[t]??0)))}function jp(n,e){const t=Math.min(Math.max(n,1),oo);let i=-80,s=140,r=0,a=Sh(r,e),o=yr(a);for(let c=0;c<48&&(r=(i+s)/2,a=Sh(r,e),o=yr(a),!(Math.abs(o-t)<.05));c++)o<t?i=r:s=r;return{attributes:a,achievedAbility:o,level:r}}const zs=[{code:"USA",name:"United States",weight:26,regions:["California","Texas","Florida","New York","Colorado","Illinois","Ohio","Pennsylvania","Arizona","Georgia"],disciplineBias:["folkstyle_wrestling","freestyle_wrestling","boxing","bjj"],maleFirst:["Marcus","Cole","Dante","Tyler","Brandon","Jared","Malik","Trevor","Devin","Corey","Shane","Austin","Xavier","Blake"],femaleFirst:["Alexis","Danielle","Jasmine","Cassidy","Brooke","Morgan","Tiana","Kayla","Sierra","Nicole","Reagan","Simone"],last:["Vale","Corbin","Hargrove","Whitlock","Sandoval","Brennan","Okafor","Delgado","Mercer","Kowalczyk","Rhodes","Sutton","Ferrell","Boone","Castellano","Pike"]},{code:"BRA",name:"Brazil",weight:15,regions:["Rio de Janeiro","São Paulo","Curitiba","Belém","Fortaleza","Manaus","Porto Alegre"],disciplineBias:["bjj","muay_thai","submission_grappling"],maleFirst:["Rafael","Thiago","Vinícius","Bruno","Caio","Everton","Douglas","Matheus","Ronaldo","Igor","Wallace","Diego","Leandro","Fábio"],femaleFirst:["Amanda","Larissa","Jéssica","Bianca","Camila","Priscila","Rayssa","Vanessa","Tainara","Luana"],last:["Moraes","Bastos","Queiroz","Amaral","Teixeira","Rocha","Nogueira","Vasconcelos","Falcão","Bittencourt","Andrade","Peixoto","Cavalcanti","Guimarães","Barreto","Salgado"]},{code:"RUS",name:"Russia",weight:11,regions:["Dagestan","Chechnya","Moscow","Saint Petersburg","Krasnodar","Bashkortostan","Ossetia"],disciplineBias:["sambo","freestyle_wrestling","judo"],maleFirst:["Ruslan","Timur","Artem","Islam","Magomed","Shamil","Zaur","Anatoly","Vadim","Rustam","Askar","Gadzhi","Denis","Ilyas"],femaleFirst:["Yana","Anastasia","Marina","Liana","Polina","Ksenia","Aiza","Darya","Elvira"],last:["Gaziev","Ismailov","Tarasov","Bekov","Kurbanov","Zhukov","Aliyev","Sadulaev","Voronin","Magomedov","Terekhin","Nurgaliev","Osipov","Dzhabrailov","Semyonov","Rakhimov"]},{code:"MEX",name:"Mexico",weight:6,regions:["Mexico City","Guadalajara","Monterrey","Tijuana","Puebla","Mérida"],disciplineBias:["boxing","bjj"],maleFirst:["Alejandro","Emiliano","Rodrigo","Ángel","Iván","Santiago","Joaquín","Ramiro","Efraín","Cuauhtémoc","Néstor","Lalo"],femaleFirst:["Valeria","Ximena","Itzel","Renata","Fernanda","Guadalupe","Paola","Citlali"],last:["Arreola","Zamudio","Cervantes","Robledo","Ontiveros","Betancourt","Villalobos","Escárcega","Nájera","Quintanilla","Serrato","Palomino"]},{code:"ENG",name:"England",weight:6,regions:["London","Liverpool","Manchester","Birmingham","Newcastle","Bristol","Leeds"],disciplineBias:["boxing","bjj","freestyle_wrestling"],maleFirst:["Callum","Liam","Harvey","Reece","Declan","Josh","Kieran","Ashley","Nathan","Ollie","Jordan","Freddie"],femaleFirst:["Molly","Chloe","Georgia","Hollie","Imani","Sophie","Bethany","Amber"],last:["Fenwick","Ashcroft","Brailsford","Hollings","Marchetti","Wray","Pemberton","Dunmore","Kettering","Salford","Rennick","Trescott"]},{code:"IRL",name:"Ireland",weight:3,regions:["Dublin","Cork","Galway","Limerick","Belfast"],disciplineBias:["boxing","bjj"],maleFirst:["Cian","Eoin","Fionn","Darragh","Padraig","Ronan","Cormac","Oisín","Killian"],femaleFirst:["Aoife","Saoirse","Niamh","Róisín","Ciara","Orla"],last:["O'Rourke","Kavanagh","Lenihan","Mulcahy","Doheny","Fahey","Corrigan","Nolan","Ferriter","Brannigan"]},{code:"POL",name:"Poland",weight:4,regions:["Warsaw","Kraków","Gdańsk","Wrocław","Poznań","Łódź"],disciplineBias:["freestyle_wrestling","kickboxing","bjj"],maleFirst:["Mateusz","Kacper","Bartosz","Damian","Sebastian","Marcin","Grzegorz","Wojciech","Rafał","Tomasz"],femaleFirst:["Zuzanna","Karolina","Agnieszka","Weronika","Magdalena","Iwona"],last:["Wysocki","Zieliński","Ostrowski","Malinowski","Rutkowski","Bąk","Sikora","Górecki","Adamczyk","Lewandowicz"]},{code:"JPN",name:"Japan",weight:5,regions:["Tokyo","Osaka","Saitama","Fukuoka","Nagoya","Sapporo"],disciplineBias:["judo","karate","submission_grappling","freestyle_wrestling"],maleFirst:["Kenta","Hiroto","Sota","Riku","Yuma","Daiki","Naoya","Shohei","Takumi","Ryuji"],femaleFirst:["Ayaka","Rina","Mei","Kaori","Yui","Saki","Natsumi"],last:["Ishimura","Kawabata","Tsujimoto","Nakagawa","Ogasawara","Hoshino","Sakuraba","Kondo","Mizuhara","Fujinami"]},{code:"KOR",name:"South Korea",weight:3,regions:["Seoul","Busan","Incheon","Daegu"],disciplineBias:["taekwondo","judo","boxing"],maleFirst:["Jae-won","Min-seok","Do-yun","Seung-hyun","Tae-yang","Ji-ho","Chan-woo"],femaleFirst:["Ji-woo","Seo-yeon","Ha-eun","Min-ji","Yu-jin"],last:["Baek","Choe","Hwang","Jeong","Nam","Ryu","Seok","Yoon","Gwak","Pyo"]},{code:"CHN",name:"China",weight:4,regions:["Beijing","Shanghai","Chengdu","Guangzhou","Xi'an","Inner Mongolia"],disciplineBias:["sanda","freestyle_wrestling","boxing"],maleFirst:["Wei","Haoran","Jianguo","Zhenyu","Lianjie","Bolin","Qiang","Yulong"],femaleFirst:["Yaxin","Meilin","Jinghua","Xiulan","Ruoxi"],last:["Bao","Cheng","Dou","Fang","Geng","Hui","Lang","Mo","Qiao","Shen","Tang","Xue"]},{code:"THA",name:"Thailand",weight:3,regions:["Bangkok","Chiang Mai","Phuket","Buriram","Khon Kaen"],disciplineBias:["muay_thai"],maleFirst:["Somchai","Anuwat","Kiatisak","Thanapon","Nattapong","Sarawut","Chaiyaphum"],femaleFirst:["Nong","Pim","Kanya","Sarocha","Duangjai"],last:["Sitthichai","Rungrueang","Phromchan","Wongsawat","Chaiyasit","Boonmee","Naruemon"]},{code:"NGA",name:"Nigeria",weight:3,regions:["Lagos","Abuja","Kano","Port Harcourt","Ibadan"],disciplineBias:["boxing","kickboxing","freestyle_wrestling"],maleFirst:["Chidi","Emeka","Tunde","Ifeanyi","Obinna","Segun","Kelechi","Femi"],femaleFirst:["Adaeze","Ngozi","Chiamaka","Yewande","Zainab"],last:["Adeyemi","Nwachukwu","Balogun","Eze","Okonkwo","Abiodun","Uzoma","Olamide"]},{code:"FRA",name:"France",weight:4,regions:["Paris","Marseille","Lyon","Lille","Toulouse"],disciplineBias:["judo","kickboxing","boxing"],maleFirst:["Baptiste","Enzo","Théo","Yanis","Nathan","Amine","Loïc","Cédric"],femaleFirst:["Manon","Léa","Camille","Océane","Inès"],last:["Lefevre","Bouchard","Marchand","Delacroix","Traoré","Vasseur","Baumann","Charrier"]},{code:"NLD",name:"Netherlands",weight:3,regions:["Amsterdam","Rotterdam","Utrecht","Eindhoven","The Hague"],disciplineBias:["dutch_kickboxing","kickboxing","judo"],maleFirst:["Sven","Jelle","Bram","Ruben","Thijs","Daan","Joost","Marnix"],femaleFirst:["Fenna","Sanne","Lieke","Maud","Roos"],last:["van Dijk","Verhoeven","Bakker","de Groot","Hendriks","van Leeuwen","Kuipers","Molenaar"]},{code:"GEO",name:"Georgia",weight:2,regions:["Tbilisi","Kutaisi","Batumi","Gori"],disciplineBias:["judo","sambo","greco_roman"],maleFirst:["Giorgi","Levan","Irakli","Zurab","Nika","Beka","Vakhtang"],femaleFirst:["Nino","Ana","Mariam","Tamar"],last:["Kvaratskhelia","Beridze","Chkheidze","Gogoladze","Tsiklauri","Mikaberidze","Janashvili"]},{code:"KAZ",name:"Kazakhstan",weight:2,regions:["Almaty","Astana","Shymkent","Karaganda"],disciplineBias:["boxing","freestyle_wrestling","sambo"],maleFirst:["Yerlan","Nurlan","Daniyar","Almas","Bekzat","Aidos","Sanzhar"],femaleFirst:["Aigerim","Dana","Zhanel","Madina"],last:["Zhaksylykov","Serikbayev","Tulegenov","Abenov","Kaliyev","Nurpeisov","Omarov"]},{code:"AUS",name:"Australia",weight:3,regions:["Sydney","Melbourne","Brisbane","Perth","Adelaide"],disciplineBias:["boxing","bjj","muay_thai"],maleFirst:["Jayden","Kai","Lachlan","Beau","Riley","Hamish","Tyson"],femaleFirst:["Tayla","Indi","Bridie","Charlee","Meg"],last:["Callaghan","Whittaker","Doust","Hardacre","Prentice","Bannister","Tuiala"]},{code:"CAN",name:"Canada",weight:3,regions:["Montréal","Toronto","Vancouver","Calgary","Halifax"],disciplineBias:["freestyle_wrestling","bjj","boxing"],maleFirst:["Étienne","Nolan","Gabriel","Owen","Léo","Braden","Mathis"],femaleFirst:["Élodie","Hailey","Maude","Payton","Sadie"],last:["Tremblay","Boucher","Lapointe","Ferland","Harrow","Beauchamp","Cardinal"]}],$p=["The Anvil","Bad Intentions","Cold Steel","The Surgeon","Nightfall","The Riddle","Little Bear","The Blueprint","Hurricane","The Watchmaker","Pitbull","Silent Storm","The Professor","Iron Lung","The Butcher","Sandman","The Machine","Wildfire","Steel City","The Python","Blackout","Kingfisher","The Mongoose","Thunderclap","Ghost","The Hammer","Quicksand","Rolling Thunder","The Alchemist","Bonecrusher","The Lion","Red Mist","Stonewall","The Barber","Highlander","The Spider","Frostbite","The Cobra","Slow Burn","The Marshal","Gravedigger","Firecracker","The Technician","Deadbolt"],Mh=["Iron","Black","Apex","Titan","Vanguard","Granite","Storm","Crown","Sable","Forge","Summit","Ronin","Anvil","Wolf","Northgate","Redline","Ironwood","Cobalt","Hollow","Praetorian","Kestrel","Meridian","Basalt","Sundown","Ember","Bastion","Harbor","Lodestone","Vertex","Quarry"],e0=["Temple","Mountain","House","Works","Yard","Ridge","Lab","Athletic","Combat","Fight","Union","Academy","Institute","Foundry","Compound","Circle","Row","Guard","Camp"],lo=["MMA","Combat Academy","Fight Club","Martial Arts","Athletics","Fight Team","Training Center","Combat Sports","MMA Academy","Performance","Gym"];new Map(zs.map(n=>[n.code,n]));function t0(n){const e=n.next();return e<.02?n.clampedNormal(190,6,176,200):e<.1?n.clampedNormal(174,7,158,192):e<.32?n.clampedNormal(154,9,132,176):e<.66?n.clampedNormal(130,10,108,155):n.clampedNormal(104,13,60,132)}const Zi=[[18,.32],[21,.5],[24,.68],[27,.83],[30,.92],[33,.93],[36,.86],[39,.77],[43,.64]];function n0(n){const e=Zi[0],t=Zi[Zi.length-1];if(n<=e[0])return e[1];if(n>=t[0])return t[1];for(let i=1;i<Zi.length;i++){const[s,r]=Zi[i-1],[a,o]=Zi[i];if(n<=a)return Qa(r,o,(n-s)/(a-s))}return t[1]}function i0(n,e){const t=(n.workEthic*.4+n.discipline*.35+n.coachability*.25)/100;return $(.78+t*.3+e.normal(0,.05),.6,1.08)}function ho(n,e){let t=0;for(const[i,s]of Object.entries(n.offsets))s<=0||(t+=s*gh(e,i));return t}function s0(n,e){const t=ro.map(i=>{let s=0;for(const r of e.disciplineBias)s=Math.max(s,ho(i,r));return[i,1+s*.22]});return n.pickWeighted(t)}function r0(n,e,t){const i={};for(const s of bi){const r=e.offsets[s]??0;i[s]=r+n.normal(0,8.5)}for(const s of t.disciplineBias)for(const r of bi){const a=gh(s,r);a>0&&(i[r]=(i[r]??0)+a*n.float(1.5,6))}return i}function a0(n){const e=n.clampedNormal(52,17,5,95),t=(i,s,r)=>Math.round($(Qa(n.clampedNormal(i,r,1,100),e,s),1,100));return Dp(i=>{switch(i){case"workEthic":return t(55,.6,18);case"discipline":return t(54,.55,18);case"coachability":return t(55,.4,19);case"ambition":return t(58,.25,19);case"loyalty":return t(55,.15,21);case"composure":return t(53,.2,18);case"adaptability":return t(52,.25,18);case"confidence":return t(58,.1,18);case"ego":return Math.round($(n.clampedNormal(52,19,1,100)-(e-52)*.25,1,100));case"aggression":return Math.round(n.clampedNormal(55,19,1,100));case"riskTolerance":return Math.round(n.clampedNormal(53,19,1,100));default:return Math.round(n.clampedNormal(52,18,1,100))}})}function o0(n,e,t,i){const s={wins:0,losses:0,draws:0,noContests:0,koWins:0,submissionWins:0,decisionWins:0,koLosses:0,submissionLosses:0,decisionLosses:0,winStreak:0,lossStreak:0},r=$(.34+.52*((e-60)/140)**1.1,.25,.88),a=$(r+n.normal(0,.05),.2,.92),o=$(.2+i.tendencies.strikeVolume*.3+(i.offsets.strikingPower??0)/90,.08,.62),c=$(.06+i.tendencies.submissionSeeking*.45,.04,.5),l=[];for(let h=0;h<t;h++){const d=n.next();if(d<.018)s.draws++,l.push("draw");else if(d<.028)s.noContests++,l.push("nc");else if(n.bool(a)){s.wins++,l.push("win");const g=n.next();g<o?s.koWins++:g<o+c?s.submissionWins++:s.decisionWins++}else{s.losses++,l.push("loss");const g=n.next(),x=$(.32-(i.offsets.strikingDefense??0)/120+(i.offsets.aggression??0)/140,.08,.6),f=$(.14-(i.offsets.submissionDefense??0)/110+(i.offsets.guardGame??0)/-260,.03,.35);g<x?s.koLosses++:g<x+f?s.submissionLosses++:s.decisionLosses++}}for(let h=l.length-1;h>=0&&l[h]==="win";h--)s.winStreak++;for(let h=l.length-1;h>=0&&l[h]==="loss";h--)s.lossStreak++;const u=l.slice(-5),p=$(u.reduce((h,d)=>h+(d==="win"?22:d==="loss"?-24:-2),0),-100,100);return{record:s,proFights:t,momentum:p}}function c0(n){return n.pickWeighted([["orthodox",.77],["southpaw",.19],["switch",.04]])}function l0(n,e){const[t,i]=e.heightRangeIn,s=He(n.clampedNormal((t+i)/2,(i-t)/4.2,t-1,i+1),1),r=He(s+e.reachBiasIn+n.normal(0,1.9),1);return{heightIn:s,reachIn:r}}function h0(n,e){const t=Ai.map(i=>[i.key,ho(n,i.key)]).sort((i,s)=>s[1]-i[1]).slice(0,5).map(([i])=>i);if(e.bool(.25)){const i=Ai.map(s=>[s.key,ho(n,s.key)]).sort((s,r)=>s[1]-r[1])[0]?.[0];if(i)return[t[0],i].filter(Boolean)}return t.slice(0,2)}function uo(n,e){const t=n.derive(e.id),i=Np(e.divisionKey),s=t.pickWeighted(zs.map(se=>[se,se.weight])),r=i.sex,a=r==="male"?s.maleFirst:s.femaleFirst,[o,c]=e.ageRange??[19,40],l=Math.round($(t.clampedNormal(28.5,4.6,o,c),o,c)),u=Gs(e.date,-Math.round(l*365.2425+t.int(0,364))),p=a0(t);let h=t0(t);e.talentFloor!==void 0&&(h=Math.max(h,e.talentFloor)),e.talentCeiling!==void 0&&(h=Math.min(h,e.talentCeiling)),h=He($(h,40,200),1);const d=$(Math.max(n0(l)*i0(p,t),e.realisationFloor??0),.22,.99),g=$(h*d,25,h),x=s0(t,s),f=r0(t,x,s),{attributes:m}=jp(g,f),y=yr(m),b=t.int(19,$(l-1,19,24)),S=Math.max(0,l-b),A=$(t.float(1.5,2.7)-(y-110)/260,.9,2.8),E=Math.max(0,Math.round(S*A)),{record:R,momentum:_}=o0(t,y,E,x),{heightIn:T,reachIn:P}=l0(t,i),L=t.clampedNormal(0,14,-30,45),k=He($((y-60)*.4+R.winStreak*2.4+R.wins*.35+L,1,100),1),Y=He($((y-55)*.52+R.wins*.45+t.normal(0,6),1,100),1),q=E===0?void 0:t.int(20,430),G=q??999;let J=t.pick(a),K=t.pick(s.last);if(e.takenNames)for(let se=0;se<50&&e.takenNames.has(`${J} ${K}`);se++)J=t.pick(a),K=t.pick(s.last);return{id:e.id,firstName:J,lastName:K,nickname:t.bool(.42)?t.pick($p):void 0,sex:r,birthDate:u,nationality:s.code,homeRegion:t.pick(s.regions),heightIn:T,reachIn:P,stance:c0(t),divisionKey:e.divisionKey,campId:e.campId,promotionId:e.promotionId,attributes:m,personality:p,potentialAbility:h,seedArchetype:x.key,record:R,career:{debutDate:Gs(u,Math.round(b*365.2425)),amateurFights:t.int(0,14),careerEarnings:Math.round(R.wins*t.float(14e3,46e3)+E*t.float(8e3,26e3)),popularity:k,reputation:Y,momentum:Math.round(_),lastFightDate:q===void 0?void 0:Gs(e.date,-q),titleReigns:0,titleDefenses:0},condition:{fatigue:He(t.float(4,34),1),sharpness:He($(92-G/9+t.normal(0,6),20,100),1),weightManagement:He(t.clampedNormal(64,16,15,98),1),wearAndTear:He($(E*t.float(.5,1.6)+Math.max(0,l-30)*t.float(.6,1.9),0,100),1),injuries:[]},training:{intensity:t.pickWeighted([["recovery",.05],["light",.12],["moderate",.42],["hard",.33],["extreme",.08]]),focus:h0(x,t)},memories:[],status:"active"}}function u0(n){const e=n.toLowerCase().split(" ").map(t=>t.slice(0,5));return new Set(e).size!==e.length}function d0(n,e){for(let t=0;t<60;t++){const i=n.pick(Mh),s=n.bool(.55)?`${i} ${n.pick(e0)} ${n.pick(lo)}`:`${i} ${n.pick(lo)}`;if(!e.has(s)&&!u0(s))return s}return`${n.pick(Mh)} ${n.pick(lo)} ${n.int(2,9)}`}function f0(n,e){const t=n.pickWeighted(Ai.map(o=>[o,o.prevalence])),i=[],s=ut(e,20,95,.035,.12)+n.float(-.012,.012);i.push({disciplineKey:t.key,tier:1,multiplier:He(1+$(s,.02,.14),3)});const r=o=>o.key===t.key?0:o.prevalence*(o.family===t.family?3:o.family==="physical"||o.family==="mental"?2:1),a=n.pickWeighted(Ai.map(o=>[o,r(o)]));if(i.push({disciplineKey:a.key,tier:2,multiplier:He(1+$(s*n.float(.4,.65),.01,.08),3)}),e>62&&n.bool(.45)){const o=n.pickWeighted(Ai.filter(c=>!i.some(l=>l.disciplineKey===c.key)).map(c=>[c,r(c)]));i.push({disciplineKey:o.key,tier:3,multiplier:He(1+$(s*n.float(.2,.4),.01,.05),3)})}return i}const yh={striking:["boxing","muay_thai","kickboxing","dutch_kickboxing","karate","taekwondo","sanda"],wrestling:["freestyle_wrestling","folkstyle_wrestling","greco_roman","cage_wrestling","takedown_defense"],grappling:["bjj","submission_grappling","judo","sambo","ground_and_pound","positional_escapes"],strength:["strength_conditioning","conditioning","speed_agility"],sports_science:["sports_science","conditioning"],medical:["sports_science"]};function bh(n,e){const t=n.pickWeighted(zs.map(s=>[s,s.weight])),i=He($(n.clampedNormal(e.quality,9,20,99),20,99),1);return{id:e.id,firstName:n.pick(t.maleFirst.concat(t.femaleFirst)),lastName:n.pick(t.last),campId:e.campId,role:e.role,disciplineKey:e.disciplineKey,ability:i,manManagement:He($(n.clampedNormal(i*.55+24,15,15,99),15,99),1),reputation:He($(i*.7+n.normal(10,12),5,99),1),birthYear:to(e.date)-n.int(31,64),loyalty:Math.round(n.clampedNormal(58,20,5,98)),joinedDate:e.date}}function p0(n,e){const t=n.derive(e.id),i=t.pickWeighted(zs.map(x=>[x,x.weight])),s=He($(e.reputation,5,99),1),r=f0(t,s),a=Fp(r[0].disciplineKey),o=ut(s,5,99,22,92),c={training:He($(t.clampedNormal(o,9,10,99),10,99),1),medical:He($(t.clampedNormal(o-6,12,5,99),5,99),1),sportsScience:He($(t.clampedNormal(o-10,14,5,99),5,99),1),recovery:He($(t.clampedNormal(o-8,12,5,99),5,99),1)},l={discipline:He($(t.clampedNormal(o*.5+30,14,10,99),10,99),1),intensity:He(t.clampedNormal(58,17,12,99),1),cohesion:He(t.clampedNormal(60,16,10,99),1)},u=[],p=bh(t,{id:e.coachIdFactory(),campId:e.id,role:"head",disciplineKey:a.key,quality:ut(s,5,99,38,92),date:e.date});u.push(p);const h=Math.round($(ut(s,10,99,1,6)+t.float(-.6,.9),1,7)),d=["striking","wrestling","grappling","strength","sports_science","medical"];for(let x=0;x<h;x++){const f=d[x%d.length],m=r.find(b=>yh[f].includes(b.disciplineKey)),y=m?.disciplineKey??t.pick(yh[f]);u.push(bh(t,{id:e.coachIdFactory(),campId:e.id,role:f,disciplineKey:y,quality:ut(s,5,99,30,84)+(m?8:0),date:e.date}))}return{camp:{id:e.id,name:d0(t,e.takenNames??new Set),city:t.pick(i.regions),country:i.code,region:t.pick(i.regions),foundedYear:to(e.date)-t.int(2,34),reputation:s,peakReputation:s,capacity:Math.round($(ut(s,10,99,8,24)+t.float(-2,4),5,30)),facilities:c,culture:l,specialisations:r,headCoachId:p.id,coachIds:u.map(x=>x.id),history:{titlesWon:0,rankedFighterPeak:0,fightersDeveloped:0},status:"active"},coaches:u}}const Eh=["Grand","Union","Harbour","Central","Crown","Liberty","Summit","Pinnacle","Meridian","Coliseum","Vanguard","Northgate","Bayview","Kingsway","Silverdome","Sunset"],Ah=["Arena","Centre","Coliseum","Forum","Pavilion","Dome","Hall","Garden"];function m0(n,e,t){const i=[],s=new Set;for(let r=0;r<e;r++){const a=n.derive("venue",r),o=a.pickWeighted(zs.map(h=>[h,h.weight])),c=a.pick(o.regions);let l="";for(let h=0;h<40;h++){const d=`${a.pick(Eh)} ${a.pick(Ah)}`;if(!s.has(d)){l=d;break}}l||(l=`${a.pick(Eh)} ${a.pick(Ah)} ${r}`),s.add(l);const u=r/Math.max(1,e-1),p=Math.round($(21e3*(1-u)**1.5+a.float(2400,5500),2e3,22e3));i.push({id:t(),name:l,city:c,country:o.code,capacity:p,prestige:He($(p/22e3*88+a.normal(0,7),8,99),1)})}return i}function g0(n,e){return{promotionId:n,divisionKey:e,defences:0,lineage:[]}}function x0(n,e,t){return n.find(i=>i.promotionId===e&&i.divisionKey===t)}function v0(n,e,t){const i=n.lineage[n.lineage.length-1];i&&!i.to&&(i.to=t,i.defences=n.defences),n.championId=e,n.since=t,n.defences=0,n.interimChampionId=void 0,n.lineage.push({fighterId:e,from:t,defences:0})}function _0(n){if(n)return n.championId??n.interimChampionId}class S0{constructor(e){Ye(this,"fighterIndex",new Map);Ye(this,"campIndex",new Map);Ye(this,"coachIndex",new Map);Ye(this,"promotionIndex",new Map);Ye(this,"campRoster",new Map);this.state=e,this.reindex()}reindex(){this.fighterIndex=new Map(this.state.fighters.map(e=>[e.id,e])),this.campIndex=new Map(this.state.camps.map(e=>[e.id,e])),this.coachIndex=new Map(this.state.coaches.map(e=>[e.id,e])),this.promotionIndex=new Map(this.state.promotions.map(e=>[e.id,e])),this.campRoster=new Map;for(const e of this.state.fighters){if(!e.campId)continue;const t=this.campRoster.get(e.campId);t?t.push(e):this.campRoster.set(e.campId,[e])}}rngFor(e,...t){return An.fromSeed(this.state.seed,e,...t)}get date(){return this.state.currentDate}get day(){return eo(this.state.startDate,this.state.currentDate)}get week(){return wp(this.state.startDate,this.state.currentDate)}fighter(e){return this.fighterIndex.get(e)}requireFighter(e){const t=this.fighterIndex.get(e);if(!t)throw new RangeError(`Unknown fighter: ${e}`);return t}camp(e){return this.campIndex.get(e)}coach(e){return this.coachIndex.get(e)}promotion(e){return this.promotionIndex.get(e)}campFighters(e){return this.campRoster.get(e)??[]}campCoaches(e){const t=this.campIndex.get(e);return t?t.coachIds.map(i=>this.coachIndex.get(i)).filter(i=>i!==void 0):[]}activeFighters(){return this.state.fighters.filter(e=>e.status!=="retired")}fightersInDivision(e,t){return this.state.fighters.filter(i=>i.divisionKey===e&&i.status!=="retired"&&(t===void 0||i.promotionId===t))}rankingsFor(e,t){return this.state.rankings.filter(i=>i.promotionId===e&&i.divisionKey===t).sort((i,s)=>i.rank-s.rank)}contractFor(e){return this.state.contracts.find(t=>t.fighterId===e&&t.status==="active")}title(e,t){return x0(this.state.titles,e,t)}venue(e){return this.state.venues.find(t=>t.id===e)}card(e){return this.state.cards.find(t=>t.id===e)}fight(e){return this.state.fights.find(t=>t.id===e)}upcomingCards(e){return this.state.cards.filter(t=>t.status==="scheduled"&&t.date>=e).sort((t,i)=>t.date.localeCompare(i.date))}fightsOnCard(e){return this.state.fights.filter(t=>t.eventId===e).sort((t,i)=>t.boutOrder-i.boutOrder)}record(e){this.state.events.push(e)}nextId(e){const t=(this.state.idCounters[e]??0)+1;return this.state.idCounters[e]=t,`${e}_${String(t).padStart(5,"0")}`}}function M0(n,e){const t=hn(n),{wins:i,losses:s,winStreak:r,lossStreak:a,koWins:o,submissionWins:c}=n.record,l=n.career.lastFightDate?eo(n.career.lastFightDate,e):720,u=$((l-270)/30,0,22),p=Math.min(o+c,12)*1.1,h=i+s,d=h>=3?(i/h-.5)*70:0;return $(t*1.05+Math.min(i,18)*.75-s*.9+Math.min(r,6)*2.8-a*5.2+p+d+n.career.momentum*.14+n.career.reputation*.16+n.career.popularity*.06+n.career.titleDefenses*6-u,0,400)}function y0(n,e,t,i,s=[],r){const a=new Map(s.map(d=>[d.fighterId,d.rank])),o=t.filter(d=>d.divisionKey===e&&d.promotionId===n.id&&d.status!=="retired").map(d=>({fighter:d,points:M0(d,i)})).sort((d,g)=>g.points-d.points||d.fighter.id.localeCompare(g.fighter.id)),c=r?o.find(d=>d.fighter.id===r):void 0,l=c?[c,...o.filter(d=>d.fighter.id!==r)]:o,u=c?0:1,p=Math.min(l.length,n.ranksPerDivision+1),h=[];for(let d=0;d<p;d++){const{fighter:g,points:x}=l[d];h.push({promotionId:n.id,divisionKey:e,fighterId:g.id,rank:u+d,points:Math.round(x*10)/10,previousRank:a.get(g.id),updatedDate:i})}return h}function fo(n,e,t,i=[],s){const r=[];for(const a of n)if(!(a.ranksPerDivision<=0))for(const o of a.divisionKeys){const c=i.filter(p=>p.promotionId===a.id&&p.divisionKey===o),l=s?s(a.id,o):c.find(p=>p.rank===0)?.fighterId,u=e.some(p=>p.id===l&&p.status!=="retired"&&p.divisionKey===o);r.push(...y0(a,o,e,t,c,u?l:void 0))}return r}function b0(n){const{wins:e,losses:t,winStreak:i}=n.record;return e<3?!1:e>=t?!0:i>=3&&e+2>=t}const po={startDate:"2026-01-05",fighterCount:560,campCount:54},E0=[{name:"Apex Fighting Championship",shortName:"AFC",tier:"global",country:"USA",prestige:96,rosterShare:.4,ranksPerDivision:15},{name:"Continental Fight League",shortName:"CFL",tier:"regional",country:"NLD",prestige:68,rosterShare:.18,ranksPerDivision:10},{name:"Pacific Combat Alliance",shortName:"PCA",tier:"regional",country:"JPN",prestige:64,rosterShare:.16,ranksPerDivision:10},{name:"Frontier Cage Series",shortName:"FCS",tier:"developmental",country:"BRA",prestige:42,rosterShare:.1,ranksPerDivision:5},{name:"Northern Lights FC",shortName:"NLF",tier:"developmental",country:"CAN",prestige:38,rosterShare:.09,ranksPerDivision:5},{name:"Sunbelt Fight Nights",shortName:"SFN",tier:"developmental",country:"MEX",prestige:34,rosterShare:.07,ranksPerDivision:5}];function A0(n){const e=Ei.reduce((a,o)=>a+o.populationWeight,0),t=new Map;let i=0;for(const a of Ei){const o=Math.floor(a.populationWeight/e*n);t.set(a.key,o),i+=o}const s=[...Ei].sort((a,o)=>o.populationWeight-a.populationWeight);let r=0;for(;i<n;){const a=s[r%s.length];t.set(a.key,(t.get(a.key)??0)+1),i++,r++}return t}function T0(n,e,t){const s=20+75*(1-e/Math.max(1,t-1))**1.8;return He($(s+n.normal(0,5),8,97),1)}function w0(n){return 20+148*$((n-3)/94,0,1)**1.9}function R0(n,e,t){const i=new Map(t.map(a=>[a.id,a.capacity])),s=[...e].sort((a,o)=>hn(o)-hn(a)),r=[...t].sort((a,o)=>a.reputation-o.reputation);for(const a of s){const o=hn(a),c=n.derive("camp-assignment",a.id),l=t.filter(h=>o>=w0(h.reputation)),u=l.filter(h=>(i.get(h.id)??0)>0),p=u.length>0?c.pickWeighted(u.map(h=>{const d=(h.reputation/100)**1.6,g=h.country===a.nationality?2.2:1,x=(i.get(h.id)??0)/Math.max(1,h.capacity);return[h,Math.max(.02,d)*g*(.4+x)]})):[...l].sort((h,d)=>(h.capacity-(i.get(h.id)??0))/h.capacity-(d.capacity-(i.get(d.id)??0))/d.capacity||h.reputation-d.reputation)[0]??r[0];p&&(a.campId=p.id,i.set(p.id,(i.get(p.id)??1)-1))}}function C0(n,e,t,i,s){const r=[],a=[...t].sort((l,u)=>u.prestige-l.prestige),o=[...e].map(l=>({fighter:l,score:hn(l)+n.derive("scouting",l.id).normal(0,16)+l.career.popularity*.25})).sort((l,u)=>u.score-l.score),c=new Map;for(const l of o){const u=c.get(l.fighter.divisionKey);u?u.push(l):c.set(l.fighter.divisionKey,[l])}for(const[l,u]of c){let p=0;for(const h of a){if(!h.divisionKeys.includes(l))continue;const d=Math.round(u.length*h.rosterShare);for(let g=0;g<d&&p<u.length;g++,p++){const{fighter:x}=u[p];x.promotionId=h.id;const f=n.derive("contract",x.id),m=Math.round(ut(h.prestige,30,96,4e3,42e3)*(1+x.career.popularity/120)*f.float(.85,1.25));r.push({id:s(),fighterId:x.id,promotionId:h.id,signedDate:Gs(i,-f.int(30,900)),fightsTotal:f.pickWeighted([[3,.2],[4,.45],[6,.25],[8,.1]]),fightsRemaining:0,expiresDate:Gs(i,f.int(180,1100)),baseShow:m,winBonus:m,ppvPoints:h.tier==="global"&&x.career.popularity>78?f.float(.2,1.2):0,status:"active"});const y=r[r.length-1];y.fightsRemaining=f.int(1,y.fightsTotal)}}}return r}function L0(n){const e=n.startDate??po.startDate,t=n.fighterCount??po.fighterCount,i=n.campCount??po.campCount,s={seed:n.seed,startDate:e,currentDate:e,promotions:[],camps:[],coaches:[],fighters:[],contracts:[],rankings:[],titles:[],venues:[],cards:[],fights:[],news:[],storylines:[],events:[],targetPopulation:t,idCounters:{}},r=new S0(s),a=r.rngFor("genesis","promotions");for(const f of E0){const y={id:r.nextId("promotion"),name:f.name,shortName:f.shortName,tier:f.tier,country:f.country,foundedYear:to(e)-a.int(4,32),prestige:f.prestige,divisionKeys:Ei.filter(b=>f.tier==="global"||b.populationWeight>=(f.tier==="regional"?.3:.4)).map(b=>b.key),ranksPerDivision:f.ranksPerDivision,rosterShare:f.rosterShare};s.promotions.push(y)}const o=r.rngFor("genesis","camps"),c=new Set;for(let f=0;f<i;f++){const m=r.nextId("camp"),{camp:y,coaches:b}=p0(o,{id:m,date:e,reputation:T0(o.derive("reputation",f),f,i),coachIdFactory:()=>r.nextId("coach"),takenNames:c});c.add(y.name),s.camps.push(y),s.coaches.push(...b)}const l=r.rngFor("genesis","fighters"),u=new Set,p=f=>{u.add(`${f.firstName} ${f.lastName}`),s.fighters.push(f)},h=A0(t);for(const[f,m]of h)for(let y=0;y<m;y++){const b=r.nextId("fighter");p(uo(l,{id:b,date:e,divisionKey:f,takenNames:u}))}const d=r.rngFor("genesis","elite");for(const f of Ei){const m=f.populationWeight>=1?3:f.populationWeight>=.5?2:1;for(let y=0;y<m;y++){const b=r.nextId("fighter");p(uo(d,{id:b,date:e,divisionKey:f.key,talentFloor:184,ageRange:[26,34],realisationFloor:.9,takenNames:u}))}for(let y=0;y<2;y++){const b=r.nextId("fighter");p(uo(d,{id:b,date:e,divisionKey:f.key,talentFloor:172,ageRange:[19,23],realisationFloor:.45,takenNames:u}))}}r.reindex(),R0(r.rngFor("genesis","camp-assignment"),s.fighters,s.camps),s.contracts=C0(r.rngFor("genesis","promotion-assignment"),s.fighters,s.promotions,e,()=>r.nextId("contract")),s.venues=m0(r.rngFor("genesis","venues"),26,()=>r.nextId("venue"));for(const f of s.promotions)for(const m of f.divisionKeys)s.titles.push(g0(f.id,m));const g=fo(s.promotions,s.fighters,e),x=r.rngFor("genesis","champions");for(const f of s.promotions)if(!(f.ranksPerDivision<=0))for(const m of f.divisionKeys){const y=g.filter(A=>A.promotionId===f.id&&A.divisionKey===m).sort((A,E)=>A.rank-E.rank)[0];if(!y)continue;const b=r.fighter(y.fighterId),S=r.title(f.id,m);!b||!S||b0(b)&&(b.career.titleReigns=1,b.career.titleDefenses=x.derive(b.id).pickWeighted([[0,.34],[1,.3],[2,.2],[3,.11],[4,.05]]),v0(S,b.id,e),S.defences=b.career.titleDefenses)}return s.rankings=fo(s.promotions,s.fighters,e,g,(f,m)=>_0(r.title(f,m))),s.targetPopulation=s.fighters.length,r.reindex(),r.record({type:"UNIVERSE_CREATED",date:e,summary:`Universe seeded with ${s.fighters.length} fighters across ${s.camps.length} camps and ${s.promotions.length} promotions.`,payload:{seed:n.seed,fighters:s.fighters.length,camps:s.camps.length}}),r}const P0=1,D0=["STANDING","CLINCH","CAGE_CLINCH","TAKEDOWN_ATTEMPT","GROUND_TOP","GROUND_BOTTOM","GUARD","HALF_GUARD","SIDE_CONTROL","MOUNT","BACK_CONTROL","SCRAMBLE","SUBMISSION_ATTEMPT","STUNNED","RECOVERY"],I0=["FIGHT_START","ROUND_START","ROUND_END","STRIKE","SIGNIFICANT_STRIKE","TAKEDOWN_ATTEMPT","TAKEDOWN","SPRAWL","CLINCH_ENGAGE","CLINCH_BREAK","POSITION_CHANGE","SCRAMBLE","SUBMISSION_ATTEMPT","SUBMISSION_ESCAPE","KNOCKDOWN","STUN","CUT","DAMAGE_UPDATE","STAMINA_UPDATE","CORNER_INSTRUCTION","REFEREE_ACTION","DOCTOR_CHECK","POINT_DEDUCTION","FIGHT_END","DECISION"],N0=["HEAD","BODY","LEG","ARM"],O0=["LANDED","BLOCKED","PARTIAL","MISSED","SLIPPED","DEFENDED","COMPLETED","REVERSED"],U0=["KO","TKO","SUBMISSION","UNANIMOUS_DECISION","SPLIT_DECISION","MAJORITY_DECISION","DRAW","MAJORITY_DRAW","TECHNICAL_DECISION","TECHNICAL_DRAW","DOCTOR_STOPPAGE","INJURY","DISQUALIFICATION","NO_CONTEST","RETIREMENT"];function mo(n){const e=Math.max(0,Math.floor(n)),t=Math.floor(e/60),i=e%60;return`${String(t).padStart(2,"0")}:${String(i).padStart(2,"0")}`}function Th(n){return n.eventType==="STRIKE"||n.eventType==="SIGNIFICANT_STRIKE"}new Set(I0),new Set(D0),new Set(O0),new Set(N0),new Set(U0);function wh(n){return{...n,targetHead:.68,targetBody:.2,targetLegs:.12,acceptBottom:.4,urgency:.55,notes:[]}}function br(n){const e=n.targetHead+n.targetBody+n.targetLegs;if(e<=0){n.targetHead=1,n.targetBody=0,n.targetLegs=0;return}n.targetHead/=e,n.targetBody/=e,n.targetLegs/=e}const Er=[{key:"JAB",label:"jab",target:"HEAD",ranges:["long","mid"],power:2.2,accuracy:1.5,cost:.5,concussive:.2,skills:["boxing","strikingAccuracy"],cutChance:.01,significant:!1},{key:"CROSS",label:"straight right",target:"HEAD",ranges:["mid","long"],power:6,accuracy:1,cost:1,concussive:1,skills:["boxing","strikingPower"],cutChance:.012,significant:!0},{key:"LEFT_HOOK",label:"left hook",target:"HEAD",ranges:["close","mid"],power:6.8,accuracy:.88,cost:1.1,concussive:1.25,skills:["boxing","strikingPower"],cutChance:.015,significant:!0},{key:"RIGHT_HOOK",label:"right hook",target:"HEAD",ranges:["close","mid"],power:6.6,accuracy:.86,cost:1.1,concussive:1.2,skills:["boxing","strikingPower"],cutChance:.015,significant:!0},{key:"UPPERCUT",label:"uppercut",target:"HEAD",ranges:["close"],power:7,accuracy:.8,cost:1.15,concussive:1.35,skills:["boxing","strikingPower"],cutChance:.012,significant:!0},{key:"OVERHAND",label:"overhand right",target:"HEAD",ranges:["mid"],power:7.8,accuracy:.68,cost:1.35,concussive:1.5,skills:["boxing","strikingPower"],cutChance:.018,significant:!0},{key:"ELBOW",label:"elbow",target:"HEAD",ranges:["close"],power:6.2,accuracy:.9,cost:.9,concussive:.9,skills:["muayThai"],cutChance:.02,significant:!0},{key:"KNEE",label:"knee to the body",target:"BODY",ranges:["close"],power:6.5,accuracy:.95,cost:1.2,concussive:.5,skills:["muayThai","clinchWrestling"],cutChance:.02,significant:!0},{key:"FLYING_KNEE",label:"flying knee",target:"HEAD",ranges:["mid"],power:9.5,accuracy:.34,cost:2.1,concussive:2.2,skills:["muayThai","explosiveness"],cutChance:.015,significant:!0},{key:"LOW_KICK",label:"low kick to the lead leg",target:"LEG",ranges:["long","mid"],power:5.2,accuracy:1.15,cost:.85,concussive:0,skills:["muayThai","kickboxing"],cutChance:0,significant:!0},{key:"BODY_KICK",label:"kick to the body",target:"BODY",ranges:["long","mid"],power:6.4,accuracy:.92,cost:1.25,concussive:.2,skills:["muayThai","kickboxing"],cutChance:0,significant:!0},{key:"HEAD_KICK",label:"head kick",target:"HEAD",ranges:["long","mid"],power:9.2,accuracy:.5,cost:1.7,concussive:2.1,skills:["kickboxing","taekwondo","karate"],cutChance:.02,significant:!0},{key:"FRONT_KICK",label:"front kick to the body",target:"BODY",ranges:["long"],power:4.6,accuracy:1.05,cost:.8,concussive:.15,skills:["karate","taekwondo"],cutChance:0,significant:!0},{key:"SIDE_KICK",label:"side kick to the knee",target:"LEG",ranges:["long"],power:4.4,accuracy:.95,cost:.8,concussive:0,skills:["karate","taekwondo"],cutChance:0,significant:!0},{key:"SPINNING_BACK_KICK",label:"spinning back kick to the body",target:"BODY",ranges:["long","mid"],power:8.6,accuracy:.42,cost:1.9,concussive:1.1,skills:["taekwondo","sanda"],cutChance:.02,significant:!0},{key:"WHEEL_KICK",label:"spinning wheel kick",target:"HEAD",ranges:["long","mid"],power:10,accuracy:.3,cost:2.2,concussive:2.4,skills:["taekwondo","karate"],cutChance:.012,significant:!0},{key:"SUPERMAN_PUNCH",label:"superman punch",target:"HEAD",ranges:["mid"],power:7.4,accuracy:.55,cost:1.6,concussive:1.4,skills:["karate","explosiveness"],cutChance:.018,significant:!0},{key:"BACKFIST",label:"spinning backfist",target:"HEAD",ranges:["mid"],power:7.6,accuracy:.4,cost:1.5,concussive:1.5,skills:["sanda","karate"],cutChance:.02,significant:!0},{key:"GROUND_PUNCH",label:"punches from the top",target:"HEAD",ranges:["close"],power:4.4,accuracy:1.25,cost:.7,concussive:.7,skills:["groundStriking"],cutChance:.018,significant:!0},{key:"GROUND_ELBOW",label:"elbows on the ground",target:"HEAD",ranges:["close"],power:6,accuracy:1.05,cost:.85,concussive:.9,skills:["groundStriking"],cutChance:.012,significant:!0},{key:"HAMMERFIST",label:"hammerfists",target:"HEAD",ranges:["close"],power:3.4,accuracy:1.4,cost:.55,concussive:.5,skills:["groundStriking"],cutChance:.02,significant:!1}];new Map(Er.map(n=>[n.key,n]));function k0(n){return Er.filter(e=>e.ranges.includes(n)&&!Rh(e.key))}function Rh(n){return n==="GROUND_PUNCH"||n==="GROUND_ELBOW"||n==="HAMMERFIST"}const F0=Er.filter(n=>Rh(n.key)),B0=Er.filter(n=>n.key==="KNEE"||n.key==="ELBOW"||n.key==="UPPERCUT"||n.key==="LEFT_HOOK"),G0=[{key:"DOUBLE_LEG",label:"double-leg",ease:1,cost:2.1,from:["STANDING"],skills:["freestyleWrestling","takedownAbility"],lands:"GUARD"},{key:"SINGLE_LEG",label:"single-leg",ease:.95,cost:1.9,from:["STANDING","CLINCH"],skills:["freestyleWrestling","chainWrestling"],lands:"GUARD"},{key:"BODY_LOCK",label:"body-lock takedown",ease:.85,cost:1.7,from:["CLINCH","CAGE_CLINCH"],skills:["grecoRomanWrestling","clinchWrestling"],lands:"HALF_GUARD"},{key:"TRIP",label:"trip",ease:.9,cost:1.3,from:["CLINCH","CAGE_CLINCH"],skills:["judo","clinchWrestling"],lands:"HALF_GUARD"},{key:"THROW",label:"throw",ease:.62,cost:2.2,from:["CLINCH"],skills:["judo","sambo"],lands:"SIDE_CONTROL"},{key:"SUPLEX",label:"suplex",ease:.45,cost:2.6,from:["CLINCH","CAGE_CLINCH"],skills:["grecoRomanWrestling","strength"],lands:"SIDE_CONTROL"},{key:"ANKLE_PICK",label:"ankle pick",ease:.72,cost:1.2,from:["STANDING","CLINCH"],skills:["folkstyleWrestling","chainWrestling"],lands:"GUARD"},{key:"CAGE_DRAG",label:"drag along the fence",ease:.88,cost:1.5,from:["CAGE_CLINCH"],skills:["cageWork","clinchWrestling"],lands:"HALF_GUARD"}],z0=[{key:"REAR_NAKED_CHOKE",label:"rear-naked choke",from:{BACK_CONTROL:1},fromBottom:!1,ease:1,cost:1.6,skills:["brazilianJiuJitsu","submissionAbility"]},{key:"ARM_TRIANGLE",label:"arm-triangle",from:{MOUNT:.8,SIDE_CONTROL:.9},fromBottom:!1,ease:.8,cost:1.8,skills:["brazilianJiuJitsu","submissionAbility"]},{key:"ARMBAR",label:"armbar",from:{MOUNT:1,SIDE_CONTROL:.7,GUARD:.85,BACK_CONTROL:.5},fromBottom:!0,ease:.85,cost:1.5,skills:["brazilianJiuJitsu","submissionAbility"]},{key:"TRIANGLE",label:"triangle choke",from:{GUARD:1,MOUNT:.3},fromBottom:!0,ease:.8,cost:1.7,skills:["brazilianJiuJitsu","guardGame"]},{key:"GUILLOTINE",label:"guillotine",from:{GUARD:.9,STANDING:.5,HALF_GUARD:.5,CLINCH:.6},fromBottom:!0,ease:.85,cost:1.4,skills:["submissionGrappling","submissionAbility"]},{key:"KIMURA",label:"kimura",from:{HALF_GUARD:.9,SIDE_CONTROL:.85,GUARD:.7},fromBottom:!0,ease:.75,cost:1.5,skills:["submissionGrappling","judo"]},{key:"AMERICANA",label:"americana",from:{SIDE_CONTROL:.9,MOUNT:.7},fromBottom:!1,ease:.7,cost:1.3,skills:["brazilianJiuJitsu"]},{key:"D_ARCE",label:"d'arce choke",from:{HALF_GUARD:.9,SIDE_CONTROL:.7},fromBottom:!1,ease:.68,cost:1.7,skills:["submissionGrappling"]},{key:"ANACONDA",label:"anaconda choke",from:{HALF_GUARD:.7,SIDE_CONTROL:.7},fromBottom:!1,ease:.62,cost:1.7,skills:["submissionGrappling"]},{key:"HEEL_HOOK",label:"heel hook",from:{GUARD:.8,HALF_GUARD:.6,SCRAMBLE:.5},fromBottom:!0,ease:.6,cost:1.6,skills:["sambo","submissionGrappling"]},{key:"KNEEBAR",label:"kneebar",from:{GUARD:.7,HALF_GUARD:.5},fromBottom:!0,ease:.55,cost:1.5,skills:["sambo","submissionAbility"]},{key:"NECK_CRANK",label:"neck crank",from:{SIDE_CONTROL:.6,BACK_CONTROL:.7},fromBottom:!1,ease:.5,cost:1.5,skills:["submissionGrappling","strength"]}],H0=[{key:"GUARD",label:"in the guard",dominance:.35,strikeAccess:.45,escapeDifficulty:.35,advancesTo:["HALF_GUARD"]},{key:"HALF_GUARD",label:"in half guard",dominance:.55,strikeAccess:.7,escapeDifficulty:.5,advancesTo:["SIDE_CONTROL"]},{key:"SIDE_CONTROL",label:"in side control",dominance:.75,strikeAccess:.85,escapeDifficulty:.68,advancesTo:["MOUNT","BACK_CONTROL"]},{key:"MOUNT",label:"in mount",dominance:.92,strikeAccess:1.15,escapeDifficulty:.82,advancesTo:["BACK_CONTROL"]},{key:"BACK_CONTROL",label:"on the back",dominance:1,strikeAccess:.8,escapeDifficulty:.88,advancesTo:[]}],Ch=new Map(H0.map(n=>[n.key,n]));function Hs(n){return Ch.get(n)}function Ar(n){return Ch.has(n)}function V0(n){const{cardio:e,recovery:t}=n.attributes,i=ut(n.condition.weightManagement,1,100,12,0),s=ut(n.condition.fatigue,0,100,0,10);return{burst:$(100-i*.4-s*.3,55,100),cardio:$(100-i-s,45,100),recoveryRate:ut(t,1,100,.55,2.1),enduranceRate:ut(e,1,100,1.7,.5)}}function Qi(n){const e=ut(n.burst,0,100,.62,1),t=ut(n.cardio,0,100,.5,1);return $(e**.45*t**.55,.35,1)}function wn(n,e){n.burst=$(n.burst-e*1.35,0,100),n.cardio=$(n.cardio-e*.14*n.enduranceRate,0,100)}function Tr(n,e,t){const i=n.recoveryRate*(t?2.4:1),s=$(n.cardio+8,0,100);n.burst=$(Math.min(n.burst+i*e,s),0,100),n.cardio=$(n.cardio+(t?.55:.012)*e,0,100)}function Lh(n){Tr(n,60,!0)}function W0(){return{head:0,face:0,body:0,leadLeg:0,rearLeg:0,leadArm:0,rearArm:0,cuts:0,concussive:0}}function X0(n){const e=Math.max(n.leadLeg,n.rearLeg*.6),t=Math.max(n.leadArm,n.rearArm);return{strikingPower:ut(n.rearArm,0,100,1,.72),armFunction:ut(t,0,100,1,.7),legFunction:ut(e,0,100,1,.6),cardio:ut(n.body,0,100,1,.68),reaction:ut(n.concussive,0,100,1,.6)}}function K0(n,e,t,i){switch(e){case"HEAD":n.head=$(n.head+t,0,100),n.face=$(n.face+t*.8,0,100),n.concussive=$(n.concussive+t*.75,0,100);break;case"BODY":n.body=$(n.body+t,0,100);break;case"LEG":n.leadLeg=$(n.leadLeg+t,0,100);break;case"ARM":n.leadArm=$(n.leadArm+t,0,100);break}}function Ph(n){n.head=$(n.head*.9,0,100),n.body=$(n.body*.88,0,100),n.leadLeg=$(n.leadLeg*.96,0,100),n.rearLeg=$(n.rearLeg*.96,0,100),n.leadArm=$(n.leadArm*.93,0,100),n.rearArm=$(n.rearArm*.93,0,100),n.face=$(n.face*1.02,0,100),n.concussive=$(n.concussive*.985,0,100)}function go(n){return $(n.head*.3+n.body*.2+n.leadLeg*.15+n.rearLeg*.08+n.leadArm*.07+n.rearArm*.07+n.concussive*.13,0,100)}function Y0(n){return n.cuts>=3||n.cuts>=1&&n.face>78}function Dh(n){const e=[["badly marked up",n.face],["hurt to the body",n.body],["limping on the lead leg",n.leadLeg]],[t,i]=e.sort((s,r)=>r[1]-s[1])[0];return i>45?t:void 0}function Ih(){return{significantStrikesLanded:0,significantStrikesAttempted:0,totalStrikesLanded:0,totalStrikesAttempted:0,headStrikes:0,bodyStrikes:0,legStrikes:0,takedownsLanded:0,takedownsAttempted:0,submissionAttempts:0,knockdowns:0,controlTime:0,damageDealt:0}}function q0(n){return n.lastName}function Nh(n,e){const t=ao(n.attributes);return{id:n.id,name:n.nickname?`${n.firstName} "${n.nickname}" ${n.lastName}`:`${n.firstName} ${n.lastName}`,shortName:q0(n),reachIn:n.reachIn,heightIn:n.heightIn,stance:n.stance,attributes:{...n.attributes},baseFacets:so(n.attributes),tendencies:t.tendencies,ability:hn(n),styleLabel:t.primary.label,stamina:V0(n),damage:W0(),momentum:0,controlTime:0,stats:[Ih()],plan:wh(t.tendencies),stunnedFor:0,knockdowns:0,finished:!1}}function Ut(n,e){const t=n.baseFacets[e],i=Qi(n.stamina),s=X0(n.damage);let r=t*i;switch(e){case"strikingOffense":r*=s.strikingPower*s.armFunction;break;case"strikingDefense":r*=s.reaction*(n.stunnedFor>0?.45:1);break;case"wrestlingOffense":case"wrestlingDefense":r*=s.legFunction;break;case"clinch":r*=s.legFunction*s.armFunction;break;case"groundOffense":case"groundDefense":r*=s.armFunction;break;case"physical":r*=s.legFunction*s.cardio;break;case"mental":r*=s.reaction*(n.stunnedFor>0?.6:1);break}return r*=1+$(n.momentum,-100,100)/900,$(r,1,100)}function Vs(n){return n.stats[n.stats.length-1]}function Oh(n){n.stats.push(Ih())}function J0(n,e){return n.reachIn-e.reachIn}function Z0(n){return ut($(n,-8,8),-8,8,.93,1.07)}function Uh(n,e,t){const i=wh(n.tendencies),r=$(n.attributes.fightIQ/100,.15,1)*.55,a=e.baseFacets.wrestlingDefense,o=e.baseFacets.strikingDefense,c=e.baseFacets.groundDefense,l=e.baseFacets.groundOffense,u=n.baseFacets.wrestlingOffense,p=n.baseFacets.strikingOffense;return a<u-8&&(i.takedownRate=$(i.takedownRate+r*.5,0,1),i.notes.push("They have no answer for the takedown — put them on their back.")),l>n.baseFacets.groundDefense+10&&(i.takedownRate=$(i.takedownRate-r*.55,0,1),i.acceptBottom=$(i.acceptBottom-r*.6,0,1),i.notes.push("Do not go to the floor with them. Keep this standing.")),o<p-10&&(i.strikeVolume=$(i.strikeVolume+r*.35,0,1),i.pressure=$(i.pressure+r*.25,0,1),i.notes.push("They are there to be hit. Let your hands go.")),c<n.baseFacets.groundOffense-10&&(i.submissionSeeking=$(i.submissionSeeking+r*.4,0,1)),(e.tendencies.range>.65||e.attributes.footwork>75)&&(i.targetLegs=$(i.targetLegs+r*.35,0,.6),i.notes.push("Take their legs away — chop that lead leg every time they circle.")),e.attributes.cardio<62&&(i.targetBody=$(i.targetBody+r*.3,0,.55),i.notes.push("Go to the body early. They will fold in the third.")),br(i),i.pace=$(i.pace+t.float(-.06,.06),.05,1),i}function kh(n,e){const t=n.plan;n.damage.leadLeg>35&&(t.targetLegs=$(t.targetLegs-.25,0,1),t.range=$(t.range-.15,0,1),br(t)),(n.damage.rearArm>40||n.damage.leadArm>40)&&(t.strikeVolume=$(t.strikeVolume-.15,0,1),t.takedownRate=$(t.takedownRate+.1,0,1)),Ut(n,"strikingOffense")-Ut(e,"strikingDefense")<-12&&n.baseFacets.wrestlingOffense>55&&(t.takedownRate=$(t.takedownRate+.12,0,1),t.clinchRate=$(t.clinchRate+.08,0,1)),e.controlTime>n.controlTime+90&&(t.acceptBottom=$(t.acceptBottom-.15,0,1),t.range=$(t.range+.12,0,1));const s=Qi(n.stamina);if(t.urgency=$(s-.2+(n.momentum>20?.15:0),.1,1),s<.72&&(t.pace=$(t.pace-.1,.1,1),t.pressure=$(t.pressure-.08,0,1)),n.stunnedFor>0){const r=n.attributes.composure>70?0:.2;t.pressure=$(t.pressure-.3+r,0,1),t.strikeVolume=$(t.strikeVolume-.25+r,0,1)}}function Q0(n,e,t,i,s){const r=[],a=n.plan,o=n.stats[t-1],c=e.stats[t-1];if(!o||!c)return r;const l=(p,h)=>r.push({instruction:p,line:h});return e.damage.leadLeg>25&&a.targetLegs<.4&&(a.targetLegs=$(a.targetLegs+.2,0,.6),br(a),l("ATTACK_LEAD_LEG","That leg is done — keep chopping it.")),(o.significantStrikesAttempted>0?o.significantStrikesLanded/o.significantStrikesAttempted:1)<.32&&o.significantStrikesAttempted>8&&(a.strikeVolume=$(a.strikeVolume-.12,0,1),l("BEHIND_THE_JAB","You are swinging for the fences. Go back to the jab.")),c.takedownsLanded>=2&&(a.acceptBottom=$(a.acceptBottom-.2,0,1),a.range=$(a.range+.1,0,1),l("STOP_THE_TAKEDOWN","Get off the cage and make them carry your weight.")),o.takedownsLanded>=2&&o.takedownsAttempted<=o.takedownsLanded+1&&(a.takedownRate=$(a.takedownRate+.12,0,1),l("KEEP_WRESTLING","They cannot stop your takedowns. Go back to it.")),o.bodyStrikes===0&&o.significantStrikesLanded>4&&(a.targetBody=$(a.targetBody+.15,0,.5),br(a),l("ATTACK_THE_BODY","Everything is upstairs. Get to the body.")),i&&t>=2&&(a.pressure=$(a.pressure+.18,0,1),a.urgency=$(a.urgency+.2,0,1),l("NEED_A_FINISH","You need this round. Go and take it.")),Qi(n.stamina)<.7&&(a.pace=$(a.pace-.12,.1,1),l("MANAGE_PACE","Breathe. Pick your moments — do not chase them.")),s.shuffle(r).slice(0,2)}const Fh=["Alvarez","Petrov","Nakamura","O'Hara","Grimaldi","Baptiste","Lindqvist","Okafor","Duarte","Kaminski","Sorensen","Reyes","Whitfield","Marchetti"],Bh=["Ana","Bruce","Carla","Derek","Elena","Frank","Grace","Hugo","Ines","Karl"];function j0(n){const e=new Set,t=i=>{for(let r=0;r<40;r++){const a=`${i.pick(Bh)} ${i.pick(Fh)}`;if(!e.has(a))return e.add(a),a}const s=`${i.pick(Bh)} ${i.pick(Fh)} ${e.size+1}`;return e.add(s),s};return Array.from({length:3},(i,s)=>{const r=n.derive("judge",s),a=r.float(.7,1.35),o=r.float(.7,1.35);return{id:`judge_${s+1}`,name:t(r),weights:{significantStrikes:1*a,damage:r.float(.8,1.5),control:.55*o,takedowns:.7*o,submissionThreat:.65*o,aggression:r.float(.25,.6)},tenEightThreshold:r.float(3.4,5.6)}})}function Gh(n,e,t){const{weights:i}=n;return e.significantStrikesLanded*i.significantStrikes+t*i.damage*.35+e.controlTime/60*i.control*6+e.takedownsLanded*i.takedowns*4+e.submissionAttempts*i.submissionThreat*3.5+e.knockdowns*12+e.significantStrikesAttempted/10*i.aggression}function $0(n,e,t,i,s){const r=t.stats[s]??{...t.stats[0]},a=i.stats[s]??{...i.stats[0]},o=Gh(n,r,r.damageDealt),c=Gh(n,a,a.damageDealt);if(o+c===0)return{judgeId:n.id,round:e,a:10,b:9};const h=Math.abs(o-c)/Math.max(1,Math.min(o,c)+4)>n.tenEightThreshold||r.knockdowns>=2||a.knockdowns>=2?8:9;return o>=c?{judgeId:n.id,round:e,a:10,b:h}:{judgeId:n.id,round:e,a:h,b:10}}function zh(n,e){const t=n.map(a=>{const o=e.filter(c=>c.judgeId===a.id).sort((c,l)=>c.round-l.round).map(c=>({round:c.round,a:c.a,b:c.b}));return{judgeId:a.id,judgeName:a.name,rounds:o,totalA:o.reduce((c,l)=>c+l.a,0),totalB:o.reduce((c,l)=>c+l.b,0)}});let i=0,s=0,r=0;for(const a of t)a.totalA>a.totalB?i++:a.totalB>a.totalA?s++:r++;return i===3||s===3?{outcome:"UNANIMOUS_DECISION",winner:i===3?"a":"b",scorecards:t}:i===2&&s===1?{outcome:"SPLIT_DECISION",winner:"a",scorecards:t}:s===2&&i===1?{outcome:"SPLIT_DECISION",winner:"b",scorecards:t}:i===2&&r===1?{outcome:"MAJORITY_DECISION",winner:"a",scorecards:t}:s===2&&r===1?{outcome:"MAJORITY_DECISION",winner:"b",scorecards:t}:r>=2?{outcome:"MAJORITY_DRAW",winner:void 0,scorecards:t}:{outcome:"DRAW",winner:void 0,scorecards:t}}function em(n,e){let t=0,i=0;for(const s of n)t+=e==="a"?s.a:s.b,i+=e==="a"?s.b:s.a;return t<i}function ji(n){return`${/^[aeiou]/i.test(n)?"an":"a"} ${n}`}function tm(n){const e=ji(n);return e.charAt(0).toUpperCase()+e.slice(1)}const nm=["establishes the range","circles to the outside","feints and resets","measures the distance"];function Vn(n,e){const t=e.filter(([,i])=>i>0);if(t.length!==0)return n.pickWeighted(t)}function Ti(n,e,t=.075){return $(Ap(n-e,0,t),.04,.96)}function im(n,e,t,i){const s=i.derive("fight",t.fightId),r=t.rounds??3,a=t.roundSeconds??300,o=Nh(n),c=Nh(e);o.plan=Uh(o,c,s.derive("plan",o.id)),c.plan=Uh(c,o,s.derive("plan",c.id));const l=j0(s.derive("judges")),u=[],p=[],h={position:"STANDING",round:1,clock:a,elapsed:0,sequence:0,finished:!1,groundStall:0},d=C=>{p.push({schemaVersion:P0,fightId:t.fightId,sequence:h.sequence++,round:h.round,timestamp:He(h.elapsed,1),roundTime:mo(h.clock),timeRemaining:Math.max(0,Math.round(h.clock)),position:h.position,...C})};let g,x,f,m,y,b;const S=(C,N,Z,me,oe)=>{g=C,x=N,f=Z,m=me,y=h.round,b=mo(h.clock),Z.finished=!0,h.finished=!0,d({eventType:"FIGHT_END",outcome:C,winnerId:N.id,loserId:Z.id,finishRound:h.round,finishTime:mo(h.clock),technique:me,description:oe})};d({eventType:"FIGHT_START",description:`${o.name} versus ${c.name}${t.isTitleFight?" — for the title":""}, scheduled for ${r} rounds.`});function A(C,N,Z){const me=C.plan.pressure+(1-N.plan.range)*.4,oe=C.plan.range+N.plan.range*.4;return Vn(Z,[["close",me*1.1],["mid",1],["long",oe*1.1]])??"mid"}function E(C,N,Z){const me=C.plan,oe=new Map;for(const F of N)oe.set(F.target,(oe.get(F.target)??0)+1);return Vn(Z,N.map(F=>{const re=F.target==="HEAD"?me.targetHead:F.target==="BODY"?me.targetBody:F.target==="LEG"?me.targetLegs:.1,ie=F.skills.reduce((Ve,Ue)=>Math.max(Ve,C.attributes[Ue]),0)/100,he=$(1.2-F.cost*(1-Qi(C.stamina))*1.6,.05,1.2),Ee=F.concussive>1?.6+me.urgency*.9:1,Ae=re/(oe.get(F.target)??1);return[F,Ae*(.35+ie)*he*Ee]}))}function R(C,N,Z,me){const oe=Ut(C,"strikingOffense"),F=Ut(N,"strikingDefense"),re=Z.skills.reduce((Ee,Ae)=>Math.max(Ee,C.attributes[Ae]),0),ie=Ti(oe*.7+re*.3,F),he=me==="long"?Z0(J0(C,N)):1;return $(ie*Z.accuracy*he*.9,.03,.9)}function _(C,N,Z,me,oe){const F=Vs(C);F.totalStrikesAttempted++,Z.significant&&F.significantStrikesAttempted++,wn(C.stamina,Z.cost*(.7+C.plan.pace*.6));const re=R(C,N,Z,me);if(oe.next()>re){const Ue=oe.bool(.45)?"BLOCKED":oe.bool(.55)?"MISSED":"SLIPPED";return C.momentum=$(C.momentum-1.5,-100,100),d({eventType:Z.significant?"SIGNIFICANT_STRIKE":"STRIKE",attacker:C.id,defender:N.id,technique:Z.key,target:Z.target,result:Ue,damage:0,staminaCost:He(Z.cost,2),description:Ue==="BLOCKED"?`${N.shortName} blocks ${ji(Z.label)} from ${C.shortName}.`:Ue==="SLIPPED"?`${N.shortName} slips the ${Z.label}.`:`${C.shortName} misses with ${ji(Z.label)}.`}),!1}const he=oe.bool(.68),Ee=C.attributes.strikingPower,Ae=N.attributes.durability,Ve=$(Z.power*.22*ut(Ee,1,100,.55,1.5)*ut(Ae,1,100,1.35,.62)*(he?1:.45)*oe.float(.82,1.18),.1,9);return K0(N.damage,Z.target,Ve),F.totalStrikesLanded++,F.damageDealt+=Ve,Z.significant&&(F.significantStrikesLanded++,Z.target==="HEAD"?F.headStrikes++:Z.target==="BODY"?F.bodyStrikes++:Z.target==="LEG"&&F.legStrikes++),C.momentum=$(C.momentum+Ve*.9,-100,100),N.momentum=$(N.momentum-Ve*.7,-100,100),d({eventType:Z.significant?"SIGNIFICANT_STRIKE":"STRIKE",attacker:C.id,defender:N.id,technique:Z.key,target:Z.target,result:he?"LANDED":"PARTIAL",damage:He(Ve,1),staminaCost:He(Z.cost,2),description:`${C.shortName} lands ${he?"a clean":"a partial"} ${Z.label}.`}),he&&Z.target==="HEAD"&&oe.bool(Z.cutChance)&&(N.damage.cuts++,d({eventType:"CUT",attacker:C.id,defender:N.id,technique:Z.key,severity:He(Ve,1),description:`${N.shortName} has been opened up — blood coming from a cut.`})),Z.target==="HEAD"&&he&&T(C,N,Z,Ve,oe),!0}function T(C,N,Z,me,oe){if(Z.concussive<=0)return;const F=ut(N.attributes.durability,1,100,1.6,.45),re=1+N.damage.concussive/55,ie=ut(Qi(N.stamina),.35,1,1.7,1),he=$(.0085*Z.concussive*(me/1.6)*F*re*ie,0,.35);if(!oe.bool(he)){oe.bool(he*1.8)&&(N.stunnedFor=oe.float(3,9),d({eventType:"STUN",attacker:C.id,defender:N.id,technique:Z.key,severity:He(me,1),description:`${N.shortName} is hurt! ${C.shortName} has them wobbled.`}));return}N.knockdowns++,Vs(C).knockdowns++,N.stunnedFor=oe.float(6,16),N.damage.concussive=$(N.damage.concussive+12,0,100),C.momentum=100,N.momentum=-60,d({eventType:"KNOCKDOWN",attacker:C.id,defender:N.id,technique:Z.key,target:"HEAD",severity:He(me,1),description:`DOWN GOES ${N.shortName.toUpperCase()}! ${tm(Z.label)} puts them on the canvas.`});const Ee=ut(N.attributes.durability*.6+N.attributes.recovery*.4,1,100,.35,.03),Ae=$(Ee*(1+N.damage.concussive/70),0,.8);if(oe.bool(Ae)){S("KO",C,N,Z.key,`${C.shortName} has knocked them out cold with ${ji(Z.label)}.`);return}const Ve=$(.2+Ut(C,"strikingOffense")/480-N.attributes.recovery/300,.05,.5);oe.bool(Ve)?S("TKO",C,N,Z.key,`${C.shortName} swarms and the referee has seen enough — it is over.`):(d({eventType:"REFEREE_ACTION",fighterId:N.id,action:"ALLOWED_TO_CONTINUE",description:`${N.shortName} survives the follow-up and fights back to their feet.`}),h.position="STANDING")}function P(C,N,Z,me,oe){const F=C.plan.strikeVolume,re=Qi(C.stamina),ie=Vn(oe,[[1,1.1-F*.5],[2,1.2+F*.7],[3,(.85+F*.9)*re],[4,(.4+F*.7)*re*re],[5,(.15+F*.4)*re*re]])??1;for(let he=0;he<ie;he++){if(h.finished||Ar(h.position))return;const Ee=E(C,Z,oe);if(!Ee)return;const Ae=_(C,N,Ee,me,oe);if(he<ie-1){const Ve=oe.float(.6,1.4);h.clock=Math.max(0,h.clock-Ve),h.elapsed+=Ve}if(!Ae&&oe.bool(.45))return}}function L(C,N,Z){const me=G0.filter(Ee=>Ee.from.includes(h.position)),oe=Vn(Z,me.map(Ee=>{const Ae=Ee.skills.reduce((Ve,Ue)=>Math.max(Ve,C.attributes[Ue]),0)/100;return[Ee,Ee.ease*(.3+Ae*1.4)]}));if(!oe)return;const F=Vs(C);F.takedownsAttempted++,wn(C.stamina,oe.cost),d({eventType:"TAKEDOWN_ATTEMPT",attacker:C.id,defender:N.id,technique:oe.key,result:"DEFENDED",staminaCost:He(oe.cost,2),description:`${C.shortName} shoots for ${ji(oe.label)}.`});const re=Ut(C,"wrestlingOffense"),ie=Ut(N,"wrestlingDefense"),he=$(Ti(re,ie)*oe.ease*.82,.05,.82);Z.bool(he)?(F.takedownsLanded++,h.position=oe.lands,h.topId=C.id,C.momentum=$(C.momentum+14,-100,100),d({eventType:"TAKEDOWN",attacker:C.id,defender:N.id,technique:oe.key,result:"COMPLETED",staminaCost:0,description:`${C.shortName} completes the ${oe.label} and lands ${Hs(oe.lands)?.label??"on top"}.`})):(N.momentum=$(N.momentum+8,-100,100),wn(N.stamina,oe.cost*.55),d({eventType:"SPRAWL",attacker:N.id,defender:C.id,result:"DEFENDED",staminaCost:He(oe.cost*.55,2),description:`${N.shortName} sprawls and stuffs the takedown.`}),Z.bool(.35)&&(h.position="CAGE_CLINCH",h.topId=N.id))}function k(C,N,Z){wn(C.stamina,.9);const me=Ti(Ut(C,"clinch"),Ut(N,"wrestlingDefense")*.8);Z.bool(me)?(h.position=Z.bool(.6)?"CAGE_CLINCH":"CLINCH",h.topId=C.id,d({eventType:"CLINCH_ENGAGE",attacker:C.id,defender:N.id,result:"COMPLETED",staminaCost:.9,description:h.position==="CAGE_CLINCH"?`${C.shortName} closes the distance and presses ${N.shortName} into the fence.`:`${C.shortName} ties up in the clinch.`})):d({eventType:"CLINCH_BREAK",attacker:N.id,defender:C.id,result:"DEFENDED",staminaCost:.4,description:`${N.shortName} frames and keeps the fight at range.`})}function Y(C){const N=$(C.baseFacets.groundOffense/100,0,1);return C.plan.submissionSeeking*N**3*.75}function q(C,N,Z){const me=h.topId===C.id,oe=z0.filter(Ue=>{const it=Ue.from[h.position];return it?me?!Ue.fromBottom||it>.7:Ue.fromBottom:!1}),F=Vn(Z,oe.map(Ue=>{const it=Ue.skills.reduce((tt,$e)=>Math.max(tt,C.attributes[$e]),0)/100;return[Ue,(Ue.from[h.position]??0)*Ue.ease*(.25+it*1.5)]}));if(!F)return;const re=Vs(C);re.submissionAttempts++,wn(C.stamina,F.cost);const ie=Ut(C,"groundOffense"),he=Ut(N,"groundDefense"),Ee=$(Ti(ie,he)*F.ease*Z.float(.7,1.3),.05,.98);d({eventType:"SUBMISSION_ATTEMPT",attacker:C.id,defender:N.id,technique:F.key,result:"DEFENDED",tightness:He(Ee,2),staminaCost:He(F.cost,2),description:Ee>.7?`${C.shortName} has the ${F.label} locked in deep — this looks bad for ${N.shortName}!`:`${C.shortName} threatens with ${ji(F.label)}.`});const Ae=ut(Ut(N,"groundDefense"),1,100,.15,.9),Ve=$((Ee-.48)*1.25*(1-Ae*.7),0,.65);if(Z.bool(Ve)){S("SUBMISSION",C,N,F.key,`${N.shortName} taps! ${C.shortName} wins by ${F.label}.`);return}wn(N.stamina,F.cost*.8),N.momentum=$(N.momentum+6,-100,100),d({eventType:"SUBMISSION_ESCAPE",attacker:N.id,defender:C.id,technique:F.key,result:"DEFENDED",tightness:He(Ee,2),staminaCost:He(F.cost*.8,2),description:`${N.shortName} works free of the ${F.label}.`})}function G(C,N,Z){const me=Hs(h.position);if(!me)return;if(h.topId===C.id){const ie=Vn(Z,[["strike",(1-C.plan.submissionSeeking*.5)*me.strikeAccess*2.4],["advance",me.advancesTo.length>0?C.plan.groundControl*1.3:0],["submit",Y(C)],["hold",.5]]);if(ie==="strike"){h.groundStall=0;const he=E(C,F0,Z);he&&_(C,N,he,"close",Z)}else if(ie==="advance"){const he=Z.pick(me.advancesTo),Ee=Ti(Ut(C,"groundOffense"),Ut(N,"groundDefense"));if(wn(C.stamina,1.1),Z.bool(Ee)){const Ae=h.position;h.position=he,d({eventType:"POSITION_CHANGE",attacker:C.id,defender:N.id,fromPosition:Ae,toPosition:he,description:`${C.shortName} advances to ${Hs(he)?.label??he.toLowerCase()}.`})}else d({eventType:"SCRAMBLE",attacker:N.id,defender:C.id,result:"DEFENDED",staminaCost:1,description:`${N.shortName} defends the pass and stays busy from the bottom.`})}else ie==="submit"?(h.groundStall=0,q(C,N,Z)):(wn(C.stamina,.4),d({eventType:"POSITION_CHANGE",attacker:C.id,defender:N.id,fromPosition:h.position,toPosition:h.position,description:`${C.shortName} holds ${me.label} and controls the position.`}));return}const F=Vn(Z,[["standup",(1-C.plan.acceptBottom)*2.2],["sweep",C.baseFacets.groundOffense/90],["submit",Y(C)]]);if(F==="submit"){q(C,N,Z);return}wn(C.stamina,1.3);const re=$(Ti(Ut(C,"groundDefense")+C.attributes.scrambling*.3,Ut(N,"groundOffense"))*(1-me.escapeDifficulty*.55),.05,.85);if(Z.bool(re)){const ie=h.position;F==="sweep"?(h.topId=C.id,h.position="GUARD",d({eventType:"POSITION_CHANGE",attacker:C.id,defender:N.id,fromPosition:ie,toPosition:"GUARD",description:`${C.shortName} sweeps and comes up on top!`})):(h.position="STANDING",h.topId=void 0,d({eventType:"POSITION_CHANGE",attacker:C.id,defender:N.id,fromPosition:ie,toPosition:"STANDING",description:`${C.shortName} works back to their feet.`}))}else d({eventType:"SCRAMBLE",attacker:C.id,defender:N.id,result:"DEFENDED",staminaCost:1.3,description:`${C.shortName} scrambles but ${N.shortName} rides the position.`})}function J(C,N,Z){const me=Vn(Z,[["strike",C.plan.strikeVolume*1.4],["takedown",C.plan.takedownRate*.8],["break",h.topId===C.id?.35:1.4]]);if(me==="strike"){const oe=E(C,B0,Z);oe&&_(C,N,oe,"close",Z)}else if(me==="takedown")L(C,N,Z);else{wn(C.stamina,.6);const oe=Ti(Ut(C,"clinch"),Ut(N,"clinch"));Z.bool(oe)?(h.position="STANDING",h.topId=void 0,d({eventType:"CLINCH_BREAK",attacker:C.id,defender:N.id,result:"COMPLETED",staminaCost:.6,description:`${C.shortName} breaks the clinch and gets back to open space.`})):d({eventType:"CLINCH_ENGAGE",attacker:N.id,defender:C.id,result:"DEFENDED",staminaCost:.6,description:`${N.shortName} keeps them pinned against the fence.`})}}function K(C,N,Z){const me=A(C,N,Z),oe=Vn(Z,[["strike",C.plan.strikeVolume*(.7+C.plan.pace*.6)*4.2],["takedown",C.plan.takedownRate*.15],["clinch",C.plan.clinchRate*.35],["reset",.5*(1-C.plan.urgency)]]);oe==="strike"?P(C,N,k0(me),me,Z):oe==="takedown"?L(C,N,Z):oe==="clinch"?k(C,N,Z):(Tr(C.stamina,2,!1),d({eventType:"POSITION_CHANGE",attacker:C.id,defender:N.id,fromPosition:"STANDING",toPosition:"STANDING",description:`${C.shortName} ${Z.pick(nm)}.`}))}let ee=0;for(let C=1;C<=r&&!h.finished;C++){for(h.round=C,h.clock=a,C>1&&(Oh(o),Oh(c)),d({eventType:"ROUND_START",description:`Round ${C}.`});h.clock>0&&!h.finished;){const N=s.derive("exchange",C,ee++),Z=o.plan.pressure*1.4+Hh(o)+(o.stunnedFor>0?-1.2:0)+o.momentum/220,me=c.plan.pressure*1.4+Hh(c)+(c.stunnedFor>0?-1.2:0)+c.momentum/220,oe=N.bool($(Z/Math.max(.01,Z+me),.1,.9)),F=oe?o:c,re=oe?c:o;ee%4===0&&(kh(o,c),kh(c,o)),Ar(h.position)?G(F,re,N):h.position==="CLINCH"||h.position==="CAGE_CLINCH"?J(F,re,N):K(F,re,N);const ie=Ar(h.position)||h.position==="CLINCH"||h.position==="CAGE_CLINCH",he=$((ie?N.float(5,12):N.float(1.8,4.6))*(1.3-F.plan.pace*.45),1.2,16);if(h.clock-=he,h.elapsed+=he,ie){if(h.groundStall+=he,h.groundStall>40&&Ar(h.position)){const Ee=Hs(h.position)?.dominance??.5;N.bool($(.5-Ee*.45,.03,.5))&&(h.position="STANDING",h.topId=void 0,h.groundStall=0,d({eventType:"REFEREE_ACTION",action:"STAND_THEM_UP",description:"The referee restarts them on the feet."}))}}else h.groundStall=0;if(ie&&h.topId){const Ee=h.topId===o.id?o:c,Ae=Hs(h.position)?.dominance??.5,Ve=he*(Ae>.3?1:.5);Ee.controlTime+=Ve,Vs(Ee).controlTime+=Ve}Tr(o.stamina,he,!1),Tr(c.stamina,he,!1),o.stunnedFor=Math.max(0,o.stunnedFor-he),c.stunnedFor=Math.max(0,c.stunnedFor-he),o.momentum*=.94,c.momentum*=.94,!h.finished&&Y0(re.damage)&&N.bool(.015)&&(d({eventType:"DOCTOR_CHECK",fighterId:re.id,action:"CUT_INSPECTION",description:`The referee calls time — the doctor takes a look at ${re.shortName}'s cut.`}),N.bool(.18)&&S("DOCTOR_STOPPAGE",F,re,void 0,`The doctor will not let them continue. ${F.shortName} wins by doctor stoppage.`))}if(h.finished)break;h.clock=0,d({eventType:"ROUND_END",description:`End of round ${C}.`});for(const N of l)u.push($0(N,C,o,c,C-1));if(d({eventType:"DAMAGE_UPDATE",fighterId:o.id,damage:{...o.damage,leadLeg:He(o.damage.leadLeg,1)},description:`${o.shortName}: ${Dh(o.damage)??"no significant damage"}.`}),d({eventType:"DAMAGE_UPDATE",fighterId:c.id,damage:{...c.damage,leadLeg:He(c.damage.leadLeg,1)},description:`${c.shortName}: ${Dh(c.damage)??"no significant damage"}.`}),C<r){for(const[N,Z,me]of[["a",o,c],["b",c,o]]){const oe=Q0(Z,me,C,em(u,N),s.derive("corner",Z.id,C));for(const F of oe)d({eventType:"CORNER_INSTRUCTION",fighterId:Z.id,instruction:F.instruction,description:`Corner to ${Z.shortName}: "${F.line}"`})}Lh(o.stamina),Lh(c.stamina),Ph(o.damage),Ph(c.damage),o.stunnedFor=0,c.stunnedFor=0,o.momentum*=.4,c.momentum*=.4}}let se=[];if(g)se=zh(l,u).scorecards;else{const C=zh(l,u);se=C.scorecards,g=C.outcome,C.winner==="a"?(x=o,f=c):C.winner==="b"&&(x=c,f=o),h.clock=0,d({eventType:"DECISION",outcome:g,winnerId:x?.id,scorecards:se,description:x?`We go to the judges: ${x.shortName} takes it by ${g.replace(/_/g," ").toLowerCase()}.`:"We go to the judges, and this one is a draw."})}const de=C=>{const N=C.stats.reduce((Z,me)=>({significantStrikesLanded:Z.significantStrikesLanded+me.significantStrikesLanded,significantStrikesAttempted:Z.significantStrikesAttempted+me.significantStrikesAttempted,totalStrikesLanded:Z.totalStrikesLanded+me.totalStrikesLanded,headStrikes:Z.headStrikes+me.headStrikes,bodyStrikes:Z.bodyStrikes+me.bodyStrikes,legStrikes:Z.legStrikes+me.legStrikes,takedownsLanded:Z.takedownsLanded+me.takedownsLanded,takedownsAttempted:Z.takedownsAttempted+me.takedownsAttempted,submissionAttempts:Z.submissionAttempts+me.submissionAttempts,knockdowns:Z.knockdowns+me.knockdowns,controlTime:Z.controlTime+me.controlTime,damageTaken:0}),{significantStrikesLanded:0,significantStrikesAttempted:0,totalStrikesLanded:0,headStrikes:0,bodyStrikes:0,legStrikes:0,takedownsLanded:0,takedownsAttempted:0,submissionAttempts:0,knockdowns:0,controlTime:0,damageTaken:0});return{...N,controlTime:Math.round(N.controlTime),damageTaken:He(go(C.damage),1)}};return{fightId:t.fightId,outcome:g??"DRAW",winnerId:x?.id,loserId:f?.id,finishRound:y,finishTime:b,technique:m,rounds:h.round,events:p,scorecards:se,stats:{[o.id]:de(o),[c.id]:de(c)},damage:{[o.id]:He(go(o.damage),1),[c.id]:He(go(c.damage),1)}}}function Hh(n){return(n.attributes.speed*.5+n.attributes.aggression*.5)/100}const xo={JAB:{clip:"strike_jab",variants:3},CROSS:{clip:"strike_cross",variants:2},RIGHT_CROSS:{clip:"strike_cross",variants:2},LEFT_HOOK:{clip:"strike_hook_left",variants:2},RIGHT_HOOK:{clip:"strike_hook_right",variants:2},UPPERCUT:{clip:"strike_uppercut",variants:2},OVERHAND:{clip:"strike_overhand",variants:2,speed:.95},SUPERMAN_PUNCH:{clip:"strike_superman",variants:1,camera:"IMPACT"},BACKFIST:{clip:"strike_backfist",variants:1,camera:"IMPACT"},ELBOW:{clip:"strike_elbow",variants:2,camera:"CLOSE"},KNEE:{clip:"strike_knee",variants:2,camera:"CLOSE"},FLYING_KNEE:{clip:"strike_flying_knee",variants:1,camera:"IMPACT",speed:.9},LOW_KICK:{clip:"kick_low",variants:3},BODY_KICK:{clip:"kick_body",variants:2},HEAD_KICK:{clip:"kick_head",variants:2,camera:"IMPACT",speed:.92},FRONT_KICK:{clip:"kick_front",variants:2},SIDE_KICK:{clip:"kick_side",variants:1},SPINNING_BACK_KICK:{clip:"kick_spinning_back",variants:1,camera:"IMPACT",speed:.9},WHEEL_KICK:{clip:"kick_wheel",variants:1,camera:"IMPACT",speed:.9},GROUND_PUNCH:{clip:"ground_punch",variants:3,camera:"GROUND_OVERHEAD"},GROUND_ELBOW:{clip:"ground_elbow",variants:2,camera:"GROUND_OVERHEAD"},HAMMERFIST:{clip:"ground_hammerfist",variants:2,camera:"GROUND_OVERHEAD"},DOUBLE_LEG:{clip:"td_double_leg",variants:2,camera:"CAGE_SIDE"},SINGLE_LEG:{clip:"td_single_leg",variants:2,camera:"CAGE_SIDE"},BODY_LOCK:{clip:"td_body_lock",variants:1,camera:"CAGE_SIDE"},TRIP:{clip:"td_trip",variants:2},THROW:{clip:"td_throw",variants:2,camera:"IMPACT",speed:.95},SUPLEX:{clip:"td_suplex",variants:1,camera:"IMPACT",speed:.9},ANKLE_PICK:{clip:"td_ankle_pick",variants:1},CAGE_DRAG:{clip:"td_cage_drag",variants:1,camera:"CAGE_SIDE"},REAR_NAKED_CHOKE:{clip:"sub_rnc",variants:1,camera:"CLOSE"},GUILLOTINE:{clip:"sub_guillotine",variants:1,camera:"CLOSE"},TRIANGLE:{clip:"sub_triangle",variants:1,camera:"GROUND_OVERHEAD"},ARMBAR:{clip:"sub_armbar",variants:2,camera:"GROUND_OVERHEAD"},KIMURA:{clip:"sub_kimura",variants:1,camera:"CLOSE"},AMERICANA:{clip:"sub_americana",variants:1,camera:"CLOSE"},D_ARCE:{clip:"sub_darce",variants:1,camera:"CLOSE"},ANACONDA:{clip:"sub_anaconda",variants:1,camera:"CLOSE"},HEEL_HOOK:{clip:"sub_heel_hook",variants:1,camera:"GROUND_OVERHEAD"},KNEEBAR:{clip:"sub_kneebar",variants:1,camera:"GROUND_OVERHEAD"},ARM_TRIANGLE:{clip:"sub_arm_triangle",variants:1,camera:"GROUND_OVERHEAD"},NECK_CRANK:{clip:"sub_neck_crank",variants:1,camera:"CLOSE"},SPRAWL:{clip:"def_sprawl",variants:2,camera:"CAGE_SIDE"},CLINCH_ENGAGE:{clip:"clinch_enter",variants:2,camera:"CAGE_SIDE"},CLINCH_BREAK:{clip:"clinch_break",variants:2},SCRAMBLE:{clip:"scramble",variants:3,camera:"GROUND_OVERHEAD"},KNOCKDOWN:{clip:"knockdown",variants:2,camera:"IMPACT",speed:.85},STUN:{clip:"stun_wobble",variants:2,camera:"CLOSE"},CUT:{clip:"reaction_cut",variants:1,camera:"CLOSE"},FIGHT_START:{clip:"intro_touch_gloves",variants:1,camera:"WIDE"},ROUND_START:{clip:"stance_idle",variants:2,camera:"WIDE"},ROUND_END:{clip:"round_end_return",variants:1,camera:"CORNER"},CORNER_INSTRUCTION:{clip:"corner_seated",variants:2,camera:"CORNER"},REFEREE_ACTION:{clip:"ref_intervene",variants:2,camera:"BROADCAST"},DOCTOR_CHECK:{clip:"doctor_check",variants:1,camera:"CLOSE"},FIGHT_END:{clip:"fight_end_celebrate",variants:3,camera:"WIDE"},DECISION:{clip:"decision_announce",variants:1,camera:"WIDE"}},sm={clip:"stance_idle",variant:0,targetState:"STANDING",camera:"BROADCAST",reaction:"NONE",speed:1,triggersReplay:!1};function Vh(n){return n.eventType==="POSITION_CHANGE"?n.toPosition:n.eventType==="TAKEDOWN"?"GROUND_TOP":n.eventType==="SPRAWL"?"STANDING":n.eventType==="CLINCH_ENGAGE"?"CLINCH":n.eventType==="CLINCH_BREAK"?"STANDING":n.eventType==="KNOCKDOWN"?"STUNNED":n.eventType==="SUBMISSION_ATTEMPT"?"SUBMISSION_ATTEMPT":n.position}const rm=1.1,Wh=2.05,am=1.55,om=1.2;function cm(n){if(n.eventType==="KNOCKDOWN")return"DROP";if(n.eventType==="STUN")return"STAGGER";if(n.eventType==="SPRAWL")return"SPRAWL_DEFEND";if(Th(n))switch(n.result){case"LANDED":return n.target==="BODY"?n.damage>=am?"BODY_FOLD":"LIGHT":n.target==="LEG"?n.damage>=om?"LEG_BUCKLE":"LIGHT":n.damage>=Wh?"HEAVY":n.damage>=rm?"LIGHT":"NONE";case"PARTIAL":return"LIGHT";case"BLOCKED":return"BLOCK";case"SLIPPED":case"MISSED":return"SLIP";default:return"NONE"}return"NONE"}function lm(n,e){return e<=1?0:(n.sequence*2654435761>>>0)%e}function hm(n){if("technique"in n&&typeof n.technique=="string"&&xo[n.technique])return n.technique;if(xo[n.eventType])return n.eventType;if(n.eventType==="TAKEDOWN_ATTEMPT"||n.eventType==="TAKEDOWN")return"DOUBLE_LEG"}function Xh(n){const e=hm(n),t=e?xo[e]:void 0;if(!t)return{...sm,targetState:Vh(n)};const i=n.eventType==="KNOCKDOWN"||n.eventType==="FIGHT_END"||Th(n)&&n.eventType==="SIGNIFICANT_STRIKE"&&n.result==="LANDED"&&n.damage>=Wh,s="attacker"in n?n.attacker:"fighterId"in n?n.fighterId:void 0,r="defender"in n?n.defender:void 0;return{clip:t.clip,variant:lm(n,t.variants),targetState:Vh(n),camera:i?"IMPACT":t.camera??"BROADCAST",reaction:cm(n),speed:t.speed??1,triggersReplay:i,actorId:s,reactorId:r}}function um(n){return Math.max(0,Math.min(1,(n-20)/65))}function $i(n,e){let t=0,i=0;for(const[s,r]of e)t+=um(n[s])*r,i+=r;return i>0?t/i:.5}function dm(n){let e=2166136261;for(let t=0;t<n.length;t++)e^=n.charCodeAt(t),e=Math.imul(e,16777619);return(e>>>0)/4294967296*Math.PI*2}function Kh(n,e){const t=n.attributes,i=ao(n.attributes).tendencies,s=$i(t,[["aggression",.6],["pressureManagement",.2],["explosiveness",.2]]);return{fighterId:n.id,pressure:Math.max(0,Math.min(1,s*.5+i.pressure*.5-i.counterRate*.15)),reach:Math.max(0,Math.min(1,i.range)),mobility:$i(t,[["footwork",.6],["agility",.25],["speed",.15]]),recovery:$i(t,[["balance",.5],["composure",.3],["recovery",.2]]),engine:$i(t,[["cardio",1]]),guard:$i(t,[["strikingDefense",.6],["composure",.4]]),deception:$i(t,[["fightIQ",.5],["decisionMaking",.3],["adaptability",.2]]),phase:dm(`${n.id}:${e}`)}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const vo="185",fm=0,Yh=1,pm=2,wr=1,qh=2,Ws=3,ii=0,Jt=1,Rn=2,Cn=0,es=1,_o=2,Jh=3,Zh=4,mm=5,wi=100,gm=101,xm=102,vm=103,_m=104,Sm=200,Mm=201,ym=202,bm=203,So=204,Mo=205,Em=206,Am=207,Tm=208,wm=209,Rm=210,Cm=211,Lm=212,Pm=213,Dm=214,yo=0,bo=1,Eo=2,ts=3,Ao=4,To=5,wo=6,Ro=7,Co=0,Im=1,Nm=2,Ln=0,Lo=1,Po=2,Do=3,Rr=4,Io=5,No=6,Oo=7,Qh="attached",Om="detached",jh=300,Ri=301,ns=302,Uo=303,ko=304,Cr=306,Xs=1e3,Wn=1001,Fo=1002,Lt=1003,Um=1004,Lr=1005,Bt=1006,Bo=1007,Ci=1008,sn=1009,$h=1010,eu=1011,Ks=1012,Go=1013,Pn=1014,un=1015,Zt=1016,zo=1017,Ho=1018,Ys=1020,tu=35902,nu=35899,iu=1021,su=1022,dn=1023,Xn=1026,Li=1027,Vo=1028,Wo=1029,Pi=1030,Xo=1031,Ko=1033,Pr=33776,Dr=33777,Ir=33778,Nr=33779,Yo=35840,qo=35841,Jo=35842,Zo=35843,Qo=36196,jo=37492,$o=37496,ec=37488,tc=37489,Or=37490,nc=37491,ic=37808,sc=37809,rc=37810,ac=37811,oc=37812,cc=37813,lc=37814,hc=37815,uc=37816,dc=37817,fc=37818,pc=37819,mc=37820,gc=37821,xc=36492,vc=36494,_c=36495,Sc=36283,Mc=36284,Ur=36285,yc=36286,km=3200,kr=0,Fm=1,si="",rn="srgb",Fr="srgb-linear",Br="linear",st="srgb",is=7680,ru=519,Bm=512,Gm=513,zm=514,bc=515,Hm=516,Vm=517,Ec=518,Wm=519,au=35044,ou="300 es",Dn=2e3,qs=2001;function Xm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Gr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Km(){const n=Gr("canvas");return n.style.display="block",n}const cu={};function lu(...n){const e="THREE."+n.shift();console.log(e,...n)}function hu(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Oe(...n){n=hu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function et(...n){n=hu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function ss(...n){const e=n.join(" ");e in cu||(cu[e]=!0,Oe(...n))}function Ym(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const qm={[yo]:bo,[Eo]:wo,[Ao]:Ro,[ts]:To,[bo]:yo,[wo]:Eo,[Ro]:Ao,[To]:ts};class Di{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ac=Math.PI/180,zr=180/Math.PI;function Ii(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ht[n&255]+Ht[n>>8&255]+Ht[n>>16&255]+Ht[n>>24&255]+"-"+Ht[e&255]+Ht[e>>8&255]+"-"+Ht[e>>16&15|64]+Ht[e>>24&255]+"-"+Ht[t&63|128]+Ht[t>>8&255]+"-"+Ht[t>>16&255]+Ht[t>>24&255]+Ht[i&255]+Ht[i>>8&255]+Ht[i>>16&255]+Ht[i>>24&255]).toLowerCase()}function Je(n,e,t){return Math.max(e,Math.min(t,n))}function Jm(n,e){return(n%e+e)%e}function Tc(n,e,t){return(1-t)*n+t*e}function Js(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function $t(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const oh=class oh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};oh.prototype.isVector2=!0;let ue=oh;class rs{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let c=i[s+0],l=i[s+1],u=i[s+2],p=i[s+3],h=r[a+0],d=r[a+1],g=r[a+2],x=r[a+3];if(p!==x||c!==h||l!==d||u!==g){let f=c*h+l*d+u*g+p*x;f<0&&(h=-h,d=-d,g=-g,x=-x,f=-f);let m=1-o;if(f<.9995){const y=Math.acos(f),b=Math.sin(y);m=Math.sin(m*y)/b,o=Math.sin(o*y)/b,c=c*m+h*o,l=l*m+d*o,u=u*m+g*o,p=p*m+x*o}else{c=c*m+h*o,l=l*m+d*o,u=u*m+g*o,p=p*m+x*o;const y=1/Math.sqrt(c*c+l*l+u*u+p*p);c*=y,l*=y,u*=y,p*=y}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=p}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],c=i[s+1],l=i[s+2],u=i[s+3],p=r[a],h=r[a+1],d=r[a+2],g=r[a+3];return e[t]=o*g+u*p+c*d-l*h,e[t+1]=c*g+u*h+l*p-o*d,e[t+2]=l*g+u*d+o*h-c*p,e[t+3]=u*g-o*p-c*h-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(s/2),p=o(r/2),h=c(i/2),d=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=h*u*p+l*d*g,this._y=l*d*p-h*u*g,this._z=l*u*g+h*d*p,this._w=l*u*p-h*d*g;break;case"YXZ":this._x=h*u*p+l*d*g,this._y=l*d*p-h*u*g,this._z=l*u*g-h*d*p,this._w=l*u*p+h*d*g;break;case"ZXY":this._x=h*u*p-l*d*g,this._y=l*d*p+h*u*g,this._z=l*u*g+h*d*p,this._w=l*u*p-h*d*g;break;case"ZYX":this._x=h*u*p-l*d*g,this._y=l*d*p+h*u*g,this._z=l*u*g-h*d*p,this._w=l*u*p+h*d*g;break;case"YZX":this._x=h*u*p+l*d*g,this._y=l*d*p+h*u*g,this._z=l*u*g-h*d*p,this._w=l*u*p-h*d*g;break;case"XZY":this._x=h*u*p-l*d*g,this._y=l*d*p-h*u*g,this._z=l*u*g+h*d*p,this._w=l*u*p+h*d*g;break;default:Oe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],p=t[10],h=i+o+p;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(i>o&&i>p){const d=2*Math.sqrt(1+i-o-p);this._w=(u-c)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(o>p){const d=2*Math.sqrt(1+o-i-p);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+p-i-o);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-i*l,this._z=r*u+a*l+i*c-s*o,this._w=a*u-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const ch=class ch{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(uu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(uu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*i),u=2*(o*t-r*s),p=2*(r*i-a*t);return this.x=t+c*l+a*p-o*u,this.y=i+c*u+o*l-r*p,this.z=s+c*p+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return wc.copy(this).projectOnVector(e),this.sub(wc)}reflect(e){return this.sub(wc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ch.prototype.isVector3=!0;let D=ch;const wc=new D,uu=new rs,lh=class lh{constructor(e,t,i,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l)}set(e,t,i,s,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],p=i[7],h=i[2],d=i[5],g=i[8],x=s[0],f=s[3],m=s[6],y=s[1],b=s[4],S=s[7],A=s[2],E=s[5],R=s[8];return r[0]=a*x+o*y+c*A,r[3]=a*f+o*b+c*E,r[6]=a*m+o*S+c*R,r[1]=l*x+u*y+p*A,r[4]=l*f+u*b+p*E,r[7]=l*m+u*S+p*R,r[2]=h*x+d*y+g*A,r[5]=h*f+d*b+g*E,r[8]=h*m+d*S+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-i*r*u+i*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],p=u*a-o*l,h=o*c-u*r,d=l*r-a*c,g=t*p+i*h+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=p*x,e[1]=(s*l-u*i)*x,e[2]=(o*i-s*a)*x,e[3]=h*x,e[4]=(u*t-s*c)*x,e[5]=(s*r-o*t)*x,e[6]=d*x,e[7]=(i*c-l*t)*x,e[8]=(a*t-i*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return ss("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Rc.makeScale(e,t)),this}rotate(e){return ss("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Rc.makeRotation(-e)),this}translate(e,t){return ss("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Rc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};lh.prototype.isMatrix3=!0;let ze=lh;const Rc=new ze,du=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),fu=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zm(){const n={enabled:!0,workingColorSpace:Fr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===st&&(s.r=Kn(s.r),s.g=Kn(s.g),s.b=Kn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===st&&(s.r=as(s.r),s.g=as(s.g),s.b=as(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===si?Br:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ss("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ss("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Fr]:{primaries:e,whitePoint:i,transfer:Br,toXYZ:du,fromXYZ:fu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:rn},outputColorSpaceConfig:{drawingBufferColorSpace:rn}},[rn]:{primaries:e,whitePoint:i,transfer:st,toXYZ:du,fromXYZ:fu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:rn}}}),n}const Qe=Zm();function Kn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function as(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let os;class Qm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{os===void 0&&(os=Gr("canvas")),os.width=e.width,os.height=e.height;const s=os.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=os}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Gr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Kn(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Kn(t[i]/255)*255):t[i]=Kn(t[i]);return{data:t,width:e.width,height:e.height}}else return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let jm=0;class Cc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jm++}),this.uuid=Ii(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Lc(s[a].image)):r.push(Lc(s[a]))}else r=Lc(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Lc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Qm.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Oe("Texture: Unable to serialize Texture."),{})}let $m=0;const Pc=new D;class Pt extends Di{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,i=Wn,s=Wn,r=Bt,a=Ci,o=dn,c=sn,l=Pt.DEFAULT_ANISOTROPY,u=si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$m++}),this.uuid=Ii(),this.name="",this.source=new Cc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Pc).x}get height(){return this.source.getSize(Pc).y}get depth(){return this.source.getSize(Pc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Oe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==jh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Xs:e.x=e.x-Math.floor(e.x);break;case Wn:e.x=e.x<0?0:1;break;case Fo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Xs:e.y=e.y-Math.floor(e.y);break;case Wn:e.y=e.y<0?0:1;break;case Fo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pt.DEFAULT_IMAGE=null,Pt.DEFAULT_MAPPING=jh,Pt.DEFAULT_ANISOTROPY=1;const hh=class hh{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const c=e.elements,l=c[0],u=c[4],p=c[8],h=c[1],d=c[5],g=c[9],x=c[2],f=c[6],m=c[10];if(Math.abs(u-h)<.01&&Math.abs(p-x)<.01&&Math.abs(g-f)<.01){if(Math.abs(u+h)<.1&&Math.abs(p+x)<.1&&Math.abs(g+f)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,S=(d+1)/2,A=(m+1)/2,E=(u+h)/4,R=(p+x)/4,_=(g+f)/4;return b>S&&b>A?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=E/i,r=R/i):S>A?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=E/s,r=_/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=R/r,s=_/r),this.set(i,s,r,t),this}let y=Math.sqrt((f-g)*(f-g)+(p-x)*(p-x)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(f-g)/y,this.y=(p-x)/y,this.z=(h-u)/y,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};hh.prototype.isVector4=!0;let at=hh;class eg extends Di{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Pt(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Cc(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vt extends eg{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class pu extends Pt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class tg extends Pt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Lt,this.minFilter=Lt,this.wrapR=Wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const qa=class qa{constructor(e,t,i,s,r,a,o,c,l,u,p,h,d,g,x,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,c,l,u,p,h,d,g,x,f)}set(e,t,i,s,r,a,o,c,l,u,p,h,d,g,x,f){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=u,m[10]=p,m[14]=h,m[3]=d,m[7]=g,m[11]=x,m[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qa().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/cs.setFromMatrixColumn(e,0).length(),r=1/cs.setFromMatrixColumn(e,1).length(),a=1/cs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),p=Math.sin(r);if(e.order==="XYZ"){const h=a*u,d=a*p,g=o*u,x=o*p;t[0]=c*u,t[4]=-c*p,t[8]=l,t[1]=d+g*l,t[5]=h-x*l,t[9]=-o*c,t[2]=x-h*l,t[6]=g+d*l,t[10]=a*c}else if(e.order==="YXZ"){const h=c*u,d=c*p,g=l*u,x=l*p;t[0]=h+x*o,t[4]=g*o-d,t[8]=a*l,t[1]=a*p,t[5]=a*u,t[9]=-o,t[2]=d*o-g,t[6]=x+h*o,t[10]=a*c}else if(e.order==="ZXY"){const h=c*u,d=c*p,g=l*u,x=l*p;t[0]=h-x*o,t[4]=-a*p,t[8]=g+d*o,t[1]=d+g*o,t[5]=a*u,t[9]=x-h*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const h=a*u,d=a*p,g=o*u,x=o*p;t[0]=c*u,t[4]=g*l-d,t[8]=h*l+x,t[1]=c*p,t[5]=x*l+h,t[9]=d*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const h=a*c,d=a*l,g=o*c,x=o*l;t[0]=c*u,t[4]=x-h*p,t[8]=g*p+d,t[1]=p,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=d*p+g,t[10]=h-x*p}else if(e.order==="XZY"){const h=a*c,d=a*l,g=o*c,x=o*l;t[0]=c*u,t[4]=-p,t[8]=l*u,t[1]=h*p+x,t[5]=a*u,t[9]=d*p-g,t[2]=g*p-d,t[6]=o*u,t[10]=x*p+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ng,e,ig)}lookAt(e,t,i){const s=this.elements;return an.subVectors(e,t),an.lengthSq()===0&&(an.z=1),an.normalize(),ri.crossVectors(i,an),ri.lengthSq()===0&&(Math.abs(i.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),ri.crossVectors(i,an)),ri.normalize(),Hr.crossVectors(an,ri),s[0]=ri.x,s[4]=Hr.x,s[8]=an.x,s[1]=ri.y,s[5]=Hr.y,s[9]=an.y,s[2]=ri.z,s[6]=Hr.z,s[10]=an.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],p=i[5],h=i[9],d=i[13],g=i[2],x=i[6],f=i[10],m=i[14],y=i[3],b=i[7],S=i[11],A=i[15],E=s[0],R=s[4],_=s[8],T=s[12],P=s[1],L=s[5],k=s[9],Y=s[13],q=s[2],G=s[6],J=s[10],K=s[14],ee=s[3],se=s[7],de=s[11],C=s[15];return r[0]=a*E+o*P+c*q+l*ee,r[4]=a*R+o*L+c*G+l*se,r[8]=a*_+o*k+c*J+l*de,r[12]=a*T+o*Y+c*K+l*C,r[1]=u*E+p*P+h*q+d*ee,r[5]=u*R+p*L+h*G+d*se,r[9]=u*_+p*k+h*J+d*de,r[13]=u*T+p*Y+h*K+d*C,r[2]=g*E+x*P+f*q+m*ee,r[6]=g*R+x*L+f*G+m*se,r[10]=g*_+x*k+f*J+m*de,r[14]=g*T+x*Y+f*K+m*C,r[3]=y*E+b*P+S*q+A*ee,r[7]=y*R+b*L+S*G+A*se,r[11]=y*_+b*k+S*J+A*de,r[15]=y*T+b*Y+S*K+A*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],p=e[6],h=e[10],d=e[14],g=e[3],x=e[7],f=e[11],m=e[15],y=c*d-l*h,b=o*d-l*p,S=o*h-c*p,A=a*d-l*u,E=a*h-c*u,R=a*p-o*u;return t*(x*y-f*b+m*S)-i*(g*y-f*A+m*E)+s*(g*b-x*A+m*R)-r*(g*S-x*E+f*R)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-i*(r*u-o*c)+s*(r*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],p=e[9],h=e[10],d=e[11],g=e[12],x=e[13],f=e[14],m=e[15],y=t*o-i*a,b=t*c-s*a,S=t*l-r*a,A=i*c-s*o,E=i*l-r*o,R=s*l-r*c,_=u*x-p*g,T=u*f-h*g,P=u*m-d*g,L=p*f-h*x,k=p*m-d*x,Y=h*m-d*f,q=y*Y-b*k+S*L+A*P-E*T+R*_;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const G=1/q;return e[0]=(o*Y-c*k+l*L)*G,e[1]=(s*k-i*Y-r*L)*G,e[2]=(x*R-f*E+m*A)*G,e[3]=(h*E-p*R-d*A)*G,e[4]=(c*P-a*Y-l*T)*G,e[5]=(t*Y-s*P+r*T)*G,e[6]=(f*S-g*R-m*b)*G,e[7]=(u*R-h*S+d*b)*G,e[8]=(a*k-o*P+l*_)*G,e[9]=(i*P-t*k-r*_)*G,e[10]=(g*E-x*S+m*y)*G,e[11]=(p*S-u*E-d*y)*G,e[12]=(o*T-a*L-c*_)*G,e[13]=(t*L-i*T+s*_)*G,e[14]=(x*b-g*A-f*y)*G,e[15]=(u*A-p*b+h*y)*G,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+i,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,p=o+o,h=r*l,d=r*u,g=r*p,x=a*u,f=a*p,m=o*p,y=c*l,b=c*u,S=c*p,A=i.x,E=i.y,R=i.z;return s[0]=(1-(x+m))*A,s[1]=(d+S)*A,s[2]=(g-b)*A,s[3]=0,s[4]=(d-S)*E,s[5]=(1-(h+m))*E,s[6]=(f+y)*E,s[7]=0,s[8]=(g+b)*R,s[9]=(f-y)*R,s[10]=(1-(h+x))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=cs.set(s[0],s[1],s[2]).length();const o=cs.set(s[4],s[5],s[6]).length(),c=cs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),vn.copy(this);const l=1/a,u=1/o,p=1/c;return vn.elements[0]*=l,vn.elements[1]*=l,vn.elements[2]*=l,vn.elements[4]*=u,vn.elements[5]*=u,vn.elements[6]*=u,vn.elements[8]*=p,vn.elements[9]*=p,vn.elements[10]*=p,t.setFromRotationMatrix(vn),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,s,r,a,o=Dn,c=!1){const l=this.elements,u=2*r/(t-e),p=2*r/(i-s),h=(t+e)/(t-e),d=(i+s)/(i-s);let g,x;if(c)g=r/(a-r),x=a*r/(a-r);else if(o===Dn)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===qs)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=p,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Dn,c=!1){const l=this.elements,u=2/(t-e),p=2/(i-s),h=-(t+e)/(t-e),d=-(i+s)/(i-s);let g,x;if(c)g=1/(a-r),x=a/(a-r);else if(o===Dn)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===qs)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=p,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};qa.prototype.isMatrix4=!0;let je=qa;const cs=new D,vn=new je,ng=new D(0,0,0),ig=new D(1,1,1),ri=new D,Hr=new D,an=new D,mu=new je,gu=new rs;class Yn{constructor(e=0,t=0,i=0,s=Yn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],p=s[2],h=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(Je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-p,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Je(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:Oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return mu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(mu,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gu.setFromEuler(this),this.setFromQuaternion(gu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Yn.DEFAULT_ORDER="XYZ";class xu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let sg=0;const vu=new D,ls=new rs,qn=new je,Vr=new D,Zs=new D,rg=new D,ag=new rs,_u=new D(1,0,0),Su=new D(0,1,0),Mu=new D(0,0,1),yu={type:"added"},og={type:"removed"},hs={type:"childadded",child:null},Dc={type:"childremoved",child:null};class xt extends Di{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sg++}),this.uuid=Ii(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xt.DEFAULT_UP.clone();const e=new D,t=new Yn,i=new rs,s=new D(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new je},normalMatrix:{value:new ze}}),this.matrix=new je,this.matrixWorld=new je,this.matrixAutoUpdate=xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.multiply(ls),this}rotateOnWorldAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.premultiply(ls),this}rotateX(e){return this.rotateOnAxis(_u,e)}rotateY(e){return this.rotateOnAxis(Su,e)}rotateZ(e){return this.rotateOnAxis(Mu,e)}translateOnAxis(e,t){return vu.copy(e).applyQuaternion(this.quaternion),this.position.add(vu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_u,e)}translateY(e){return this.translateOnAxis(Su,e)}translateZ(e){return this.translateOnAxis(Mu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(qn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Vr.copy(e):Vr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qn.lookAt(Zs,Vr,this.up):qn.lookAt(Vr,Zs,this.up),this.quaternion.setFromRotationMatrix(qn),s&&(qn.extractRotation(s.matrixWorld),ls.setFromRotationMatrix(qn),this.quaternion.premultiply(ls.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yu),hs.child=e,this.dispatchEvent(hs),hs.child=null):et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(og),Dc.child=e,this.dispatchEvent(Dc),Dc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yu),hs.child=e,this.dispatchEvent(hs),hs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,e,rg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,ag,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const p=c[l];r(e.shapes,p)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),p=a(e.shapes),h=a(e.skeletons),d=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),p.length>0&&(i.shapes=p),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}xt.DEFAULT_UP=new D(0,1,0),xt.DEFAULT_MATRIX_AUTO_UPDATE=!0,xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class us extends xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const cg={type:"move"};class Ic{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new us,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new us,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new us,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const x of e.hand.values()){const f=t.getJointPose(x,i),m=this._getHandJoint(l,x);f!==null&&(m.matrix.fromArray(f.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=f.radius),m.visible=f!==null}const u=l.joints["index-finger-tip"],p=l.joints["thumb-tip"],h=u.position.distanceTo(p.position),d=.02,g=.005;l.inputState.pinching&&h>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(cg)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new us;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const bu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ai={h:0,s:0,l:0},Wr={h:0,s:0,l:0};function Nc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Be{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=rn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Qe.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Qe.workingColorSpace){if(e=Jm(e,1),t=Je(t,0,1),i=Je(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Nc(a,r,e+1/3),this.g=Nc(a,r,e),this.b=Nc(a,r,e-1/3)}return Qe.colorSpaceToWorking(this,s),this}setStyle(e,t=rn){function i(r){r!==void 0&&parseFloat(r)<1&&Oe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Oe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Oe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=rn){const i=bu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Oe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Kn(e.r),this.g=Kn(e.g),this.b=Kn(e.b),this}copyLinearToSRGB(e){return this.r=as(e.r),this.g=as(e.g),this.b=as(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=rn){return Qe.workingToColorSpace(Wt.copy(this),e),Math.round(Je(Wt.r*255,0,255))*65536+Math.round(Je(Wt.g*255,0,255))*256+Math.round(Je(Wt.b*255,0,255))}getHexString(e=rn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(Wt.copy(this),t);const i=Wt.r,s=Wt.g,r=Wt.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const p=a-o;switch(l=u<=.5?p/(a+o):p/(2-a-o),a){case i:c=(s-r)/p+(s<r?6:0);break;case s:c=(r-i)/p+2;break;case r:c=(i-s)/p+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(Wt.copy(this),t),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=rn){Qe.workingToColorSpace(Wt.copy(this),e);const t=Wt.r,i=Wt.g,s=Wt.b;return e!==rn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(ai),this.setHSL(ai.h+e,ai.s+t,ai.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ai),e.getHSL(Wr);const i=Tc(ai.h,Wr.h,t),s=Tc(ai.s,Wr.s,t),r=Tc(ai.l,Wr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new Be;Be.NAMES=bu;class Oc{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Be(e),this.near=t,this.far=i}clone(){return new Oc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Eu extends xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yn,this.environmentIntensity=1,this.environmentRotation=new Yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const _n=new D,Jn=new D,Uc=new D,Zn=new D,ds=new D,fs=new D,Au=new D,kc=new D,Fc=new D,Bc=new D,Gc=new at,zc=new at,Hc=new at;class Sn{constructor(e=new D,t=new D,i=new D){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),_n.subVectors(e,t),s.cross(_n);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){_n.subVectors(s,t),Jn.subVectors(i,t),Uc.subVectors(e,t);const a=_n.dot(_n),o=_n.dot(Jn),c=_n.dot(Uc),l=Jn.dot(Jn),u=Jn.dot(Uc),p=a*l-o*o;if(p===0)return r.set(0,0,0),null;const h=1/p,d=(l*c-o*u)*h,g=(a*u-o*c)*h;return r.set(1-d-g,g,d)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(e,t,i,s,r,a,o,c){return this.getBarycoord(e,t,i,s,Zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Zn.x),c.addScaledVector(a,Zn.y),c.addScaledVector(o,Zn.z),c)}static getInterpolatedAttribute(e,t,i,s,r,a){return Gc.setScalar(0),zc.setScalar(0),Hc.setScalar(0),Gc.fromBufferAttribute(e,t),zc.fromBufferAttribute(e,i),Hc.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Gc,r.x),a.addScaledVector(zc,r.y),a.addScaledVector(Hc,r.z),a}static isFrontFacing(e,t,i,s){return _n.subVectors(i,t),Jn.subVectors(e,t),_n.cross(Jn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return _n.subVectors(this.c,this.b),Jn.subVectors(this.a,this.b),_n.cross(Jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Sn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Sn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Sn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Sn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Sn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;ds.subVectors(s,i),fs.subVectors(r,i),kc.subVectors(e,i);const c=ds.dot(kc),l=fs.dot(kc);if(c<=0&&l<=0)return t.copy(i);Fc.subVectors(e,s);const u=ds.dot(Fc),p=fs.dot(Fc);if(u>=0&&p<=u)return t.copy(s);const h=c*p-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(i).addScaledVector(ds,a);Bc.subVectors(e,r);const d=ds.dot(Bc),g=fs.dot(Bc);if(g>=0&&d<=g)return t.copy(r);const x=d*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(fs,o);const f=u*g-d*p;if(f<=0&&p-u>=0&&d-g>=0)return Au.subVectors(r,s),o=(p-u)/(p-u+(d-g)),t.copy(s).addScaledVector(Au,o);const m=1/(f+x+h);return a=x*m,o=h*m,t.copy(i).addScaledVector(ds,a).addScaledVector(fs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class oi{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Mn):Mn.fromBufferAttribute(r,a),Mn.applyMatrix4(e.matrixWorld),this.expandByPoint(Mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Xr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Xr.copy(i.boundingBox)),Xr.applyMatrix4(e.matrixWorld),this.union(Xr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mn),Mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Qs),Kr.subVectors(this.max,Qs),ps.subVectors(e.a,Qs),ms.subVectors(e.b,Qs),gs.subVectors(e.c,Qs),ci.subVectors(ms,ps),li.subVectors(gs,ms),Ni.subVectors(ps,gs);let t=[0,-ci.z,ci.y,0,-li.z,li.y,0,-Ni.z,Ni.y,ci.z,0,-ci.x,li.z,0,-li.x,Ni.z,0,-Ni.x,-ci.y,ci.x,0,-li.y,li.x,0,-Ni.y,Ni.x,0];return!Vc(t,ps,ms,gs,Kr)||(t=[1,0,0,0,1,0,0,0,1],!Vc(t,ps,ms,gs,Kr))?!1:(Yr.crossVectors(ci,li),t=[Yr.x,Yr.y,Yr.z],Vc(t,ps,ms,gs,Kr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Qn=[new D,new D,new D,new D,new D,new D,new D,new D],Mn=new D,Xr=new oi,ps=new D,ms=new D,gs=new D,ci=new D,li=new D,Ni=new D,Qs=new D,Kr=new D,Yr=new D,Oi=new D;function Vc(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Oi.fromArray(n,r);const o=s.x*Math.abs(Oi.x)+s.y*Math.abs(Oi.y)+s.z*Math.abs(Oi.z),c=e.dot(Oi),l=t.dot(Oi),u=i.dot(Oi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Tt=new D,qr=new ue;let lg=0;class fn extends Di{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=au,this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)qr.fromBufferAttribute(this,t),qr.applyMatrix3(e),this.setXY(t,qr.x,qr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Js(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=$t(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Js(t,this.array)),t}setX(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Js(t,this.array)),t}setY(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Js(t,this.array)),t}setZ(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Js(t,this.array)),t}setW(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=$t(t,this.array),i=$t(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=$t(t,this.array),i=$t(i,this.array),s=$t(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=$t(t,this.array),i=$t(i,this.array),s=$t(s,this.array),r=$t(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==au&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Wc extends fn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Tu extends fn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ct extends fn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const hg=new oi,js=new D,Xc=new D;class hi{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):hg.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;js.subVectors(e,this.center);const t=js.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(js,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(js.copy(e.center).add(Xc)),this.expandByPoint(js.copy(e.center).sub(Xc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let ug=0;const pn=new je,Kc=new xt,xs=new D,on=new oi,$s=new oi,kt=new D;class Gt extends Di{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ug++}),this.uuid=Ii(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Xm(e)?Tu:Wc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new ze().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return pn.makeRotationFromQuaternion(e),this.applyMatrix4(pn),this}rotateX(e){return pn.makeRotationX(e),this.applyMatrix4(pn),this}rotateY(e){return pn.makeRotationY(e),this.applyMatrix4(pn),this}rotateZ(e){return pn.makeRotationZ(e),this.applyMatrix4(pn),this}translate(e,t,i){return pn.makeTranslation(e,t,i),this.applyMatrix4(pn),this}scale(e,t,i){return pn.makeScale(e,t,i),this.applyMatrix4(pn),this}lookAt(e){return Kc.lookAt(e),Kc.updateMatrix(),this.applyMatrix4(Kc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xs).negate(),this.translate(xs.x,xs.y,xs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ct(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new oi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];on.setFromBufferAttribute(r),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const i=this.boundingSphere.center;if(on.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];$s.setFromBufferAttribute(o),this.morphTargetsRelative?(kt.addVectors(on.min,$s.min),on.expandByPoint(kt),kt.addVectors(on.max,$s.max),on.expandByPoint(kt)):(on.expandByPoint($s.min),on.expandByPoint($s.max))}on.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)kt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(kt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)kt.fromBufferAttribute(o,l),c&&(xs.fromBufferAttribute(e,l),kt.add(xs)),s=Math.max(s,i.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new fn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let _=0;_<i.count;_++)o[_]=new D,c[_]=new D;const l=new D,u=new D,p=new D,h=new ue,d=new ue,g=new ue,x=new D,f=new D;function m(_,T,P){l.fromBufferAttribute(i,_),u.fromBufferAttribute(i,T),p.fromBufferAttribute(i,P),h.fromBufferAttribute(r,_),d.fromBufferAttribute(r,T),g.fromBufferAttribute(r,P),u.sub(l),p.sub(l),d.sub(h),g.sub(h);const L=1/(d.x*g.y-g.x*d.y);isFinite(L)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(p,-d.y).multiplyScalar(L),f.copy(p).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(L),o[_].add(x),o[T].add(x),o[P].add(x),c[_].add(f),c[T].add(f),c[P].add(f))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let _=0,T=y.length;_<T;++_){const P=y[_],L=P.start,k=P.count;for(let Y=L,q=L+k;Y<q;Y+=3)m(e.getX(Y+0),e.getX(Y+1),e.getX(Y+2))}const b=new D,S=new D,A=new D,E=new D;function R(_){A.fromBufferAttribute(s,_),E.copy(A);const T=o[_];b.copy(T),b.sub(A.multiplyScalar(A.dot(T))).normalize(),S.crossVectors(E,T);const L=S.dot(c[_])<0?-1:1;a.setXYZW(_,b.x,b.y,b.z,L)}for(let _=0,T=y.length;_<T;++_){const P=y[_],L=P.start,k=P.count;for(let Y=L,q=L+k;Y<q;Y+=3)R(e.getX(Y+0)),R(e.getX(Y+1)),R(e.getX(Y+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new fn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const s=new D,r=new D,a=new D,o=new D,c=new D,l=new D,u=new D,p=new D;if(e)for(let h=0,d=e.count;h<d;h+=3){const g=e.getX(h+0),x=e.getX(h+1),f=e.getX(h+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,f),u.subVectors(a,r),p.subVectors(s,r),u.cross(p),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,f),o.add(u),c.add(u),l.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(f,l.x,l.y,l.z)}else for(let h=0,d=t.count;h<d;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),p.subVectors(s,r),u.cross(p),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,p=o.normalized,h=new l.constructor(c.length*u);let d=0,g=0;for(let x=0,f=c.length;x<f;x++){o.isInterleavedBufferAttribute?d=c[x]*o.data.stride+o.offset:d=c[x]*u;for(let m=0;m<u;m++)h[g++]=l[d++]}return new fn(h,u,p)}if(this.index===null)return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Gt,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,i);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,p=l.length;u<p;u++){const h=l[u],d=e(h,i);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let p=0,h=l.length;p<h;p++){const d=l[p];u.push(d.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],p=r[l];for(let h=0,d=p.length;h<d;h++)u.push(p[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const p=a[l];this.addGroup(p.start,p.count,p.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let dg=0;class Ui extends Di{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:dg++}),this.uuid=Ii(),this.name="",this.type="Material",this.blending=es,this.side=ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=So,this.blendDst=Mo,this.blendEquation=wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ru,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=is,this.stencilZFail=is,this.stencilZPass=is,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Oe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==es&&(i.blending=this.blending),this.side!==ii&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==So&&(i.blendSrc=this.blendSrc),this.blendDst!==Mo&&(i.blendDst=this.blendDst),this.blendEquation!==wi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ts&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ru&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==is&&(i.stencilFail=this.stencilFail),this.stencilZFail!==is&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==is&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Be().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ue().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ue().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const jn=new D,Yc=new D,Jr=new D,ui=new D,qc=new D,Zr=new D,Jc=new D;class Zc{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(jn.copy(this.origin).addScaledVector(this.direction,t),jn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Yc.copy(e).add(t).multiplyScalar(.5),Jr.copy(t).sub(e).normalize(),ui.copy(this.origin).sub(Yc);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Jr),o=ui.dot(this.direction),c=-ui.dot(Jr),l=ui.lengthSq(),u=Math.abs(1-a*a);let p,h,d,g;if(u>0)if(p=a*c-o,h=a*o-c,g=r*u,p>=0)if(h>=-g)if(h<=g){const x=1/u;p*=x,h*=x,d=p*(p+a*h+2*o)+h*(a*p+h+2*c)+l}else h=r,p=Math.max(0,-(a*h+o)),d=-p*p+h*(h+2*c)+l;else h=-r,p=Math.max(0,-(a*h+o)),d=-p*p+h*(h+2*c)+l;else h<=-g?(p=Math.max(0,-(-a*r+o)),h=p>0?-r:Math.min(Math.max(-r,-c),r),d=-p*p+h*(h+2*c)+l):h<=g?(p=0,h=Math.min(Math.max(-r,-c),r),d=h*(h+2*c)+l):(p=Math.max(0,-(a*r+o)),h=p>0?r:Math.min(Math.max(-r,-c),r),d=-p*p+h*(h+2*c)+l);else h=a>0?-r:r,p=Math.max(0,-(a*h+o)),d=-p*p+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Yc).addScaledVector(Jr,h),d}intersectSphere(e,t){jn.subVectors(e.center,this.origin);const i=jn.dot(this.direction),s=jn.dot(jn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,p=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,s=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,s=(e.min.x-h.x)*l),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),p>=0?(o=(e.min.z-h.z)*p,c=(e.max.z-h.z)*p):(o=(e.max.z-h.z)*p,c=(e.min.z-h.z)*p),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,jn)!==null}intersectTriangle(e,t,i,s,r){qc.subVectors(t,e),Zr.subVectors(i,e),Jc.crossVectors(qc,Zr);let a=this.direction.dot(Jc),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ui.subVectors(this.origin,e);const c=o*this.direction.dot(Zr.crossVectors(ui,Zr));if(c<0)return null;const l=o*this.direction.dot(qc.cross(ui));if(l<0||c+l>a)return null;const u=-o*ui.dot(Jc);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qr extends Ui{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.combine=Co,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const wu=new je,ki=new Zc,jr=new hi,Ru=new D,$r=new D,ea=new D,ta=new D,Qc=new D,na=new D,Cu=new D,ia=new D;class pt extends xt{constructor(e=new Gt,t=new Qr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){na.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],p=r[c];u!==0&&(Qc.fromBufferAttribute(p,e),a?na.addScaledVector(Qc,u):na.addScaledVector(Qc.sub(t),u))}t.add(na)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),jr.copy(i.boundingSphere),jr.applyMatrix4(r),ki.copy(e.ray).recast(e.near),!(jr.containsPoint(ki.origin)===!1&&(ki.intersectSphere(jr,Ru)===null||ki.origin.distanceToSquared(Ru)>(e.far-e.near)**2))&&(wu.copy(r).invert(),ki.copy(e.ray).applyMatrix4(wu),!(i.boundingBox!==null&&ki.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ki)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,p=r.attributes.normal,h=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=h.length;g<x;g++){const f=h[g],m=a[f.materialIndex],y=Math.max(f.start,d.start),b=Math.min(o.count,Math.min(f.start+f.count,d.start+d.count));for(let S=y,A=b;S<A;S+=3){const E=o.getX(S),R=o.getX(S+1),_=o.getX(S+2);s=sa(this,m,e,i,l,u,p,E,R,_),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),x=Math.min(o.count,d.start+d.count);for(let f=g,m=x;f<m;f+=3){const y=o.getX(f),b=o.getX(f+1),S=o.getX(f+2);s=sa(this,a,e,i,l,u,p,y,b,S),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=h.length;g<x;g++){const f=h[g],m=a[f.materialIndex],y=Math.max(f.start,d.start),b=Math.min(c.count,Math.min(f.start+f.count,d.start+d.count));for(let S=y,A=b;S<A;S+=3){const E=S,R=S+1,_=S+2;s=sa(this,m,e,i,l,u,p,E,R,_),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const g=Math.max(0,d.start),x=Math.min(c.count,d.start+d.count);for(let f=g,m=x;f<m;f+=3){const y=f,b=f+1,S=f+2;s=sa(this,a,e,i,l,u,p,y,b,S),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}}function fg(n,e,t,i,s,r,a,o){let c;if(e.side===Jt?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,e.side===ii,o),c===null)return null;ia.copy(o),ia.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(ia);return l<t.near||l>t.far?null:{distance:l,point:ia.clone(),object:n}}function sa(n,e,t,i,s,r,a,o,c,l){n.getVertexPosition(o,$r),n.getVertexPosition(c,ea),n.getVertexPosition(l,ta);const u=fg(n,e,t,i,$r,ea,ta,Cu);if(u){const p=new D;Sn.getBarycoord(Cu,$r,ea,ta,p),s&&(u.uv=Sn.getInterpolatedAttribute(s,o,c,l,p,new ue)),r&&(u.uv1=Sn.getInterpolatedAttribute(r,o,c,l,p,new ue)),a&&(u.normal=Sn.getInterpolatedAttribute(a,o,c,l,p,new D),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new D,materialIndex:0};Sn.getNormal($r,ea,ta,h.normal),u.face=h,u.barycoord=p}return u}const er=new at,Lu=new at,Pu=new at,pg=new at,Du=new je,ra=new D,jc=new hi,Iu=new je,$c=new Zc;class mg extends pt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Qh,this.bindMatrix=new je,this.bindMatrixInverse=new je,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new oi),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,ra),this.boundingBox.expandByPoint(ra)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new hi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,ra),this.boundingSphere.expandByPoint(ra)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),jc.copy(this.boundingSphere),jc.applyMatrix4(s),e.ray.intersectsSphere(jc)!==!1&&(Iu.copy(s).invert(),$c.copy(e.ray).applyMatrix4(Iu),!(this.boundingBox!==null&&$c.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,$c)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new at,t=this.geometry.attributes.skinWeight;for(let i=0,s=t.count;i<s;i++){e.fromBufferAttribute(t,i);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Qh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Om?this.bindMatrixInverse.copy(this.bindMatrix).invert():Oe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const i=this.skeleton,s=this.geometry;Lu.fromBufferAttribute(s.attributes.skinIndex,e),Pu.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(er.copy(t),t.set(0,0,0,0)):(er.set(...t,1),t.set(0,0,0)),er.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){const a=Pu.getComponent(r);if(a!==0){const o=Lu.getComponent(r);Du.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(pg.copy(er).applyMatrix4(Du),a)}}return t.isVector4&&(t.w=er.w),t.applyMatrix4(this.bindMatrixInverse)}}class Nu extends xt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class el extends Pt{constructor(e=null,t=1,i=1,s,r,a,o,c,l=Lt,u=Lt,p,h){super(null,a,o,c,l,u,s,r,p,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ou=new je,gg=new je;class tl{constructor(e=[],t=[]){this.uuid=Ii(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Oe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new je)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const i=new je;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,t=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:gg;Ou.multiplyMatrices(o,t[r]),Ou.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new tl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const i=new el(t,e,e,dn,un);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,s=e.bones.length;i<s;i++){const r=e.bones[i];let a=t[r];a===void 0&&(Oe("Skeleton: No bone found with UUID:",r),a=new Nu),this.bones.push(a),this.boneInverses.push(new je().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,i=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=i[s];e.boneInverses.push(o.toArray())}return e}}class Uu extends fn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const vs=new je,ku=new je,aa=[],Fu=new oi,xg=new je,tr=new pt,nr=new hi;class vg extends pt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Uu(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,xg)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new oi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,vs),Fu.copy(e.boundingBox).applyMatrix4(vs),this.boundingBox.union(Fu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new hi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,vs),nr.copy(e.boundingSphere).applyMatrix4(vs),this.boundingSphere.union(nr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(tr.geometry=this.geometry,tr.material=this.material,tr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),nr.copy(this.boundingSphere),nr.applyMatrix4(i),e.ray.intersectsSphere(nr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,vs),ku.multiplyMatrices(i,vs),tr.matrixWorld=ku,tr.raycast(e,aa);for(let a=0,o=aa.length;a<o;a++){const c=aa[a];c.instanceId=r,c.object=this,t.push(c)}aa.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Uu(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new el(new Float32Array(s*this.count),s,this.count,Vo,un));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<i.length;l++)a+=i[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(i,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const nl=new D,_g=new D,Sg=new ze;class Fi{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=nl.subVectors(i,t).cross(_g.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(nl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Sg.getNormalMatrix(e),s=this.coplanarPoint(nl).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Bi=new hi,Mg=new ue(.5,.5),oa=new D;class il{constructor(e=new Fi,t=new Fi,i=new Fi,s=new Fi,r=new Fi,a=new Fi){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Dn,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],p=r[5],h=r[6],d=r[7],g=r[8],x=r[9],f=r[10],m=r[11],y=r[12],b=r[13],S=r[14],A=r[15];if(s[0].setComponents(l-a,d-u,m-g,A-y).normalize(),s[1].setComponents(l+a,d+u,m+g,A+y).normalize(),s[2].setComponents(l+o,d+p,m+x,A+b).normalize(),s[3].setComponents(l-o,d-p,m-x,A-b).normalize(),i)s[4].setComponents(c,h,f,S).normalize(),s[5].setComponents(l-c,d-h,m-f,A-S).normalize();else if(s[4].setComponents(l-c,d-h,m-f,A-S).normalize(),t===Dn)s[5].setComponents(l+c,d+h,m+f,A+S).normalize();else if(t===qs)s[5].setComponents(c,h,f,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(e){Bi.center.set(0,0,0);const t=Mg.distanceTo(e.center);return Bi.radius=.7071067811865476+t,Bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(oa.x=s.normal.x>0?e.max.x:e.min.x,oa.y=s.normal.y>0?e.max.y:e.min.y,oa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(oa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class sl extends Ui{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ca=new D,la=new D,Bu=new je,ir=new Zc,ha=new hi,rl=new D,Gu=new D;class yg extends xt{constructor(e=new Gt,t=new sl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)ca.fromBufferAttribute(t,s-1),la.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=ca.distanceTo(la);e.setAttribute("lineDistance",new ct(i,1))}else Oe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ha.copy(i.boundingSphere),ha.applyMatrix4(s),ha.radius+=r,e.ray.intersectsSphere(ha)===!1)return;Bu.copy(s).invert(),ir.copy(e.ray).applyMatrix4(Bu);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let x=d,f=g-1;x<f;x+=l){const m=u.getX(x),y=u.getX(x+1),b=ua(this,e,ir,c,m,y,x);b&&t.push(b)}if(this.isLineLoop){const x=u.getX(g-1),f=u.getX(d),m=ua(this,e,ir,c,x,f,g-1);m&&t.push(m)}}else{const d=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let x=d,f=g-1;x<f;x+=l){const m=ua(this,e,ir,c,x,x+1,x);m&&t.push(m)}if(this.isLineLoop){const x=ua(this,e,ir,c,g-1,d,g-1);x&&t.push(x)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ua(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(ca.fromBufferAttribute(o,s),la.fromBufferAttribute(o,r),t.distanceSqToSegment(ca,la,rl,Gu)>i)return;rl.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(rl);if(!(l<e.near||l>e.far))return{distance:l,point:Gu.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const zu=new D,Hu=new D;class Vu extends yg{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)zu.fromBufferAttribute(t,s),Hu.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+zu.distanceTo(Hu);e.setAttribute("lineDistance",new ct(i,1))}else Oe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Wu extends Pt{constructor(e=[],t=Ri,i,s,r,a,o,c,l,u){super(e,t,i,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class bg extends Pt{constructor(e,t,i,s,r,a,o,c,l){super(e,t,i,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _s extends Pt{constructor(e,t,i=Pn,s,r,a,o=Lt,c=Lt,l,u=Xn,p=1){if(u!==Xn&&u!==Li)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:p};super(h,s,r,a,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Cc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Eg extends _s{constructor(e,t=Pn,i=Ri,s,r,a=Lt,o=Lt,c,l=Xn){const u={width:e,height:e,depth:1},p=[u,u,u,u,u,u];super(e,e,t,i,s,r,a,o,c,l),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Xu extends Pt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ss extends Gt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],p=[];let h=0,d=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new ct(l,3)),this.setAttribute("normal",new ct(u,3)),this.setAttribute("uv",new ct(p,2));function g(x,f,m,y,b,S,A,E,R,_,T){const P=S/R,L=A/_,k=S/2,Y=A/2,q=E/2,G=R+1,J=_+1;let K=0,ee=0;const se=new D;for(let de=0;de<J;de++){const C=de*L-Y;for(let N=0;N<G;N++){const Z=N*P-k;se[x]=Z*y,se[f]=C*b,se[m]=q,l.push(se.x,se.y,se.z),se[x]=0,se[f]=0,se[m]=E>0?1:-1,u.push(se.x,se.y,se.z),p.push(N/R),p.push(1-de/_),K+=1}}for(let de=0;de<_;de++)for(let C=0;C<R;C++){const N=h+C+G*de,Z=h+C+G*(de+1),me=h+(C+1)+G*(de+1),oe=h+(C+1)+G*de;c.push(N,Z,oe),c.push(Z,me,oe),ee+=6}o.addGroup(d,ee,T),d+=ee,h+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ss(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class da extends Gt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],p=[],h=[],d=[];let g=0;const x=[],f=i/2;let m=0;y(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new ct(p,3)),this.setAttribute("normal",new ct(h,3)),this.setAttribute("uv",new ct(d,2));function y(){const S=new D,A=new D;let E=0;const R=(t-e)/i;for(let _=0;_<=r;_++){const T=[],P=_/r,L=P*(t-e)+e;for(let k=0;k<=s;k++){const Y=k/s,q=Y*c+o,G=Math.sin(q),J=Math.cos(q);A.x=L*G,A.y=-P*i+f,A.z=L*J,p.push(A.x,A.y,A.z),S.set(G,R,J).normalize(),h.push(S.x,S.y,S.z),d.push(Y,1-P),T.push(g++)}x.push(T)}for(let _=0;_<s;_++)for(let T=0;T<r;T++){const P=x[T][_],L=x[T+1][_],k=x[T+1][_+1],Y=x[T][_+1];(e>0||T!==0)&&(u.push(P,L,Y),E+=3),(t>0||T!==r-1)&&(u.push(L,k,Y),E+=3)}l.addGroup(m,E,0),m+=E}function b(S){const A=g,E=new ue,R=new D;let _=0;const T=S===!0?e:t,P=S===!0?1:-1;for(let k=1;k<=s;k++)p.push(0,f*P,0),h.push(0,P,0),d.push(.5,.5),g++;const L=g;for(let k=0;k<=s;k++){const q=k/s*c+o,G=Math.cos(q),J=Math.sin(q);R.x=T*J,R.y=f*P,R.z=T*G,p.push(R.x,R.y,R.z),h.push(0,P,0),E.x=G*.5+.5,E.y=J*.5*P+.5,d.push(E.x,E.y),g++}for(let k=0;k<s;k++){const Y=A+k,q=L+k;S===!0?u.push(q,q+1,Y):u.push(q+1,q,Y),_+=3}l.addGroup(m,_,S===!0?1:2),m+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new da(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class In{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Oe("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let s=0;const r=i.length;let a;t?a=t:a=e*i[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=i[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===a)return s/(r-1);const u=i[s],h=i[s+1]-u,d=(a-u)/h;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new ue:new D);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new D,s=[],r=[],a=[],o=new D,c=new je;for(let d=0;d<=e;d++){const g=d/e;s[d]=this.getTangentAt(g,new D)}r[0]=new D,a[0]=new D;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),p=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=l&&(l=u,i.set(1,0,0)),p<=l&&(l=p,i.set(0,1,0)),h<=l&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Je(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(o,g))}a[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(Je(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(d=-d);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class al extends In{constructor(e=0,t=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new ue){const i=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),p=Math.sin(this.aRotation),h=c-this.aX,d=l-this.aY;c=h*u-d*p+this.aX,l=h*p+d*u+this.aY}return i.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Ag extends al{constructor(e,t,i,s,r,a){super(e,t,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ol(){let n=0,e=0,t=0,i=0;function s(r,a,o,c){n=r,e=o,t=-3*r+3*a-2*o-c,i=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,p){let h=(a-r)/l-(o-r)/(l+u)+(o-a)/u,d=(o-a)/u-(c-a)/(u+p)+(c-o)/p;h*=u,d*=u,s(a,o,h,d)},calc:function(r){const a=r*r,o=a*r;return n+e*r+t*a+i*o}}}const Ku=new D,Yu=new D,cl=new ol,ll=new ol,hl=new ol;class Tg extends In{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new D){const i=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=s[(o-1)%r]:(Yu.subVectors(s[0],s[1]).add(s[0]),l=Yu);const p=s[o%r],h=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(Ku.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Ku),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(p),d),x=Math.pow(p.distanceToSquared(h),d),f=Math.pow(h.distanceToSquared(u),d);x<1e-4&&(x=1),g<1e-4&&(g=x),f<1e-4&&(f=x),cl.initNonuniformCatmullRom(l.x,p.x,h.x,u.x,g,x,f),ll.initNonuniformCatmullRom(l.y,p.y,h.y,u.y,g,x,f),hl.initNonuniformCatmullRom(l.z,p.z,h.z,u.z,g,x,f)}else this.curveType==="catmullrom"&&(cl.initCatmullRom(l.x,p.x,h.x,u.x,this.tension),ll.initCatmullRom(l.y,p.y,h.y,u.y,this.tension),hl.initCatmullRom(l.z,p.z,h.z,u.z,this.tension));return i.set(cl.calc(c),ll.calc(c),hl.calc(c)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new D().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function qu(n,e,t,i,s){const r=(i-e)*.5,a=(s-t)*.5,o=n*n,c=n*o;return(2*t-2*i+r+a)*c+(-3*t+3*i-2*r-a)*o+r*n+t}function wg(n,e){const t=1-n;return t*t*e}function Rg(n,e){return 2*(1-n)*n*e}function Cg(n,e){return n*n*e}function sr(n,e,t,i){return wg(n,e)+Rg(n,t)+Cg(n,i)}function Lg(n,e){const t=1-n;return t*t*t*e}function Pg(n,e){const t=1-n;return 3*t*t*n*e}function Dg(n,e){return 3*(1-n)*n*n*e}function Ig(n,e){return n*n*n*e}function rr(n,e,t,i,s){return Lg(n,e)+Pg(n,t)+Dg(n,i)+Ig(n,s)}class Ju extends In{constructor(e=new ue,t=new ue,i=new ue,s=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new ue){const i=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(rr(e,s.x,r.x,a.x,o.x),rr(e,s.y,r.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ng extends In{constructor(e=new D,t=new D,i=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new D){const i=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(rr(e,s.x,r.x,a.x,o.x),rr(e,s.y,r.y,a.y,o.y),rr(e,s.z,r.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Zu extends In{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Og extends In{constructor(e=new D,t=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new D){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new D){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Qu extends In{constructor(e=new ue,t=new ue,i=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ue){const i=t,s=this.v0,r=this.v1,a=this.v2;return i.set(sr(e,s.x,r.x,a.x),sr(e,s.y,r.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ug extends In{constructor(e=new D,t=new D,i=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new D){const i=t,s=this.v0,r=this.v1,a=this.v2;return i.set(sr(e,s.x,r.x,a.x),sr(e,s.y,r.y,a.y),sr(e,s.z,r.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ju extends In{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){const i=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],u=s[a>s.length-2?s.length-1:a+1],p=s[a>s.length-3?s.length-1:a+2];return i.set(qu(o,c.x,l.x,u.x,p.x),qu(o,c.y,l.y,u.y,p.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new ue().fromArray(s))}return this}}var $u=Object.freeze({__proto__:null,ArcCurve:Ag,CatmullRomCurve3:Tg,CubicBezierCurve:Ju,CubicBezierCurve3:Ng,EllipseCurve:al,LineCurve:Zu,LineCurve3:Og,QuadraticBezierCurve:Qu,QuadraticBezierCurve3:Ug,SplineCurve:ju});class kg extends In{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new $u[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const a=s[r]-i,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){const u=c[l];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(new $u[s.type]().fromJSON(s))}return this}}class ed extends kg{constructor(e){super(),this.type="Path",this.currentPoint=new ue,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Zu(this.currentPoint.clone(),new ue(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){const r=new Qu(this.currentPoint.clone(),new ue(e,t),new ue(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,r,a){const o=new Ju(this.currentPoint.clone(),new ue(e,t),new ue(i,s),new ue(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new ju(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,i,s,r,a),this}absarc(e,t,i,s,r,a){return this.absellipse(e,t,i,i,s,r,a),this}ellipse(e,t,i,s,r,a,o,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,i,s,r,a,o,c),this}absellipse(e,t,i,s,r,a,o,c){const l=new al(e,t,i,s,r,a,o,c);if(this.curves.length>0){const p=l.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class td extends ed{constructor(e){super(e),this.uuid=Ii(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,s=this.holes.length;i<s;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(new ed().fromJSON(s))}return this}}function Fg(n,e,t=2){const i=e&&e.length,s=i?e[0]*t:n.length;let r=nd(n,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(i&&(r=Vg(n,e,r,t)),n.length>80*t){o=n[0],c=n[1];let u=o,p=c;for(let h=t;h<s;h+=t){const d=n[h],g=n[h+1];d<o&&(o=d),g<c&&(c=g),d>u&&(u=d),g>p&&(p=g)}l=Math.max(u-o,p-c),l=l!==0?32767/l:0}return ar(r,a,t,o,c,l,0),a}function nd(n,e,t,i,s){let r;if(s===ex(n,e,t,i)>0)for(let a=e;a<t;a+=i)r=ad(a/i|0,n[a],n[a+1],r);else for(let a=t-i;a>=e;a-=i)r=ad(a/i|0,n[a],n[a+1],r);return r&&Ms(r,r.next)&&(lr(r),r=r.next),r}function Gi(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Ms(t,t.next)||mt(t.prev,t,t.next)===0)){if(lr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function ar(n,e,t,i,s,r,a){if(!n)return;!a&&r&&qg(n,i,s,r);let o=n;for(;n.prev!==n.next;){const c=n.prev,l=n.next;if(r?Gg(n,i,s,r):Bg(n)){e.push(c.i,n.i,l.i),lr(n),n=l.next,o=l.next;continue}if(n=l,n===o){a?a===1?(n=zg(Gi(n),e),ar(n,e,t,i,s,r,2)):a===2&&Hg(n,e,t,i,s,r):ar(Gi(n),e,t,i,s,r,1);break}}}function Bg(n){const e=n.prev,t=n,i=n.next;if(mt(e,t,i)>=0)return!1;const s=e.x,r=t.x,a=i.x,o=e.y,c=t.y,l=i.y,u=Math.min(s,r,a),p=Math.min(o,c,l),h=Math.max(s,r,a),d=Math.max(o,c,l);let g=i.next;for(;g!==e;){if(g.x>=u&&g.x<=h&&g.y>=p&&g.y<=d&&or(s,o,r,c,a,l,g.x,g.y)&&mt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Gg(n,e,t,i){const s=n.prev,r=n,a=n.next;if(mt(s,r,a)>=0)return!1;const o=s.x,c=r.x,l=a.x,u=s.y,p=r.y,h=a.y,d=Math.min(o,c,l),g=Math.min(u,p,h),x=Math.max(o,c,l),f=Math.max(u,p,h),m=ul(d,g,e,t,i),y=ul(x,f,e,t,i);let b=n.prevZ,S=n.nextZ;for(;b&&b.z>=m&&S&&S.z<=y;){if(b.x>=d&&b.x<=x&&b.y>=g&&b.y<=f&&b!==s&&b!==a&&or(o,u,c,p,l,h,b.x,b.y)&&mt(b.prev,b,b.next)>=0||(b=b.prevZ,S.x>=d&&S.x<=x&&S.y>=g&&S.y<=f&&S!==s&&S!==a&&or(o,u,c,p,l,h,S.x,S.y)&&mt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;b&&b.z>=m;){if(b.x>=d&&b.x<=x&&b.y>=g&&b.y<=f&&b!==s&&b!==a&&or(o,u,c,p,l,h,b.x,b.y)&&mt(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;S&&S.z<=y;){if(S.x>=d&&S.x<=x&&S.y>=g&&S.y<=f&&S!==s&&S!==a&&or(o,u,c,p,l,h,S.x,S.y)&&mt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function zg(n,e){let t=n;do{const i=t.prev,s=t.next.next;!Ms(i,s)&&sd(i,t,t.next,s)&&cr(i,s)&&cr(s,i)&&(e.push(i.i,t.i,s.i),lr(t),lr(t.next),t=n=s),t=t.next}while(t!==n);return Gi(t)}function Hg(n,e,t,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Qg(a,o)){let c=rd(a,o);a=Gi(a,a.next),c=Gi(c,c.next),ar(a,e,t,i,s,r,0),ar(c,e,t,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function Vg(n,e,t,i){const s=[];for(let r=0,a=e.length;r<a;r++){const o=e[r]*i,c=r<a-1?e[r+1]*i:n.length,l=nd(n,o,c,i,!1);l===l.next&&(l.steiner=!0),s.push(Zg(l))}s.sort(Wg);for(let r=0;r<s.length;r++)t=Xg(s[r],t);return t}function Wg(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=i-s}return t}function Xg(n,e){const t=Kg(n,e);if(!t)return e;const i=rd(t,n);return Gi(i,i.next),Gi(t,t.next)}function Kg(n,e){let t=e;const i=n.x,s=n.y;let r=-1/0,a;if(Ms(n,t))return t;do{if(Ms(n,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const p=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(p<=i&&p>r&&(r=p,a=t.x<t.next.x?t:t.next,p===i))return a}t=t.next}while(t!==e);if(!a)return null;const o=a,c=a.x,l=a.y;let u=1/0;t=a;do{if(i>=t.x&&t.x>=c&&i!==t.x&&id(s<l?i:r,s,c,l,s<l?r:i,s,t.x,t.y)){const p=Math.abs(s-t.y)/(i-t.x);cr(t,n)&&(p<u||p===u&&(t.x>a.x||t.x===a.x&&Yg(a,t)))&&(a=t,u=p)}t=t.next}while(t!==o);return a}function Yg(n,e){return mt(n.prev,n,e.prev)<0&&mt(e.next,n,n.next)<0}function qg(n,e,t,i){let s=n;do s.z===0&&(s.z=ul(s.x,s.y,e,t,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,Jg(s)}function Jg(n){let e,t=1;do{let i=n,s;n=null;let r=null;for(e=0;i;){e++;let a=i,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||i.z<=a.z)?(s=i,i=i.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=a}r.nextZ=null,t*=2}while(e>1);return n}function ul(n,e,t,i,s){return n=(n-t)*s|0,e=(e-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Zg(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function id(n,e,t,i,s,r,a,o){return(s-a)*(e-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(i-o)}function or(n,e,t,i,s,r,a,o){return!(n===a&&e===o)&&id(n,e,t,i,s,r,a,o)}function Qg(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!jg(n,e)&&(cr(n,e)&&cr(e,n)&&$g(n,e)&&(mt(n.prev,n,e.prev)||mt(n,e.prev,e))||Ms(n,e)&&mt(n.prev,n,n.next)>0&&mt(e.prev,e,e.next)>0)}function mt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Ms(n,e){return n.x===e.x&&n.y===e.y}function sd(n,e,t,i){const s=pa(mt(n,e,t)),r=pa(mt(n,e,i)),a=pa(mt(t,i,n)),o=pa(mt(t,i,e));return!!(s!==r&&a!==o||s===0&&fa(n,t,e)||r===0&&fa(n,i,e)||a===0&&fa(t,n,i)||o===0&&fa(t,e,i))}function fa(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function pa(n){return n>0?1:n<0?-1:0}function jg(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&sd(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function cr(n,e){return mt(n.prev,n,n.next)<0?mt(n,e,n.next)>=0&&mt(n,n.prev,e)>=0:mt(n,e,n.prev)<0||mt(n,n.next,e)<0}function $g(n,e){let t=n,i=!1;const s=(n.x+e.x)/2,r=(n.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function rd(n,e){const t=dl(n.i,n.x,n.y),i=dl(e.i,e.x,e.y),s=n.next,r=e.prev;return n.next=e,e.prev=n,t.next=s,s.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function ad(n,e,t,i){const s=dl(n,e,t);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function lr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function dl(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function ex(n,e,t,i){let s=0;for(let r=e,a=t-i;r<t;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}class tx{static triangulate(e,t,i=2){return Fg(e,t,i)}}class hr{static area(e){const t=e.length;let i=0;for(let s=t-1,r=0;r<t;s=r++)i+=e[s].x*e[r].y-e[r].x*e[s].y;return i*.5}static isClockWise(e){return hr.area(e)<0}static triangulateShape(e,t){const i=[],s=[],r=[];od(e),cd(i,e);let a=e.length;t.forEach(od);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,cd(i,t[c]);const o=tx.triangulate(i,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}}function od(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function cd(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class ma extends Gt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),c=Math.floor(s),l=o+1,u=c+1,p=e/o,h=t/c,d=[],g=[],x=[],f=[];for(let m=0;m<u;m++){const y=m*h-a;for(let b=0;b<l;b++){const S=b*p-r;g.push(S,-y,0),x.push(0,0,1),f.push(b/o),f.push(1-m/c)}}for(let m=0;m<c;m++)for(let y=0;y<o;y++){const b=y+l*m,S=y+l*(m+1),A=y+1+l*(m+1),E=y+1+l*m;d.push(b,S,E),d.push(S,A,E)}this.setIndex(d),this.setAttribute("position",new ct(g,3)),this.setAttribute("normal",new ct(x,3)),this.setAttribute("uv",new ct(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ma(e.width,e.height,e.widthSegments,e.heightSegments)}}class fl extends Gt{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);const o=[],c=[],l=[],u=[];let p=e;const h=(t-e)/s,d=new D,g=new ue;for(let x=0;x<=s;x++){for(let f=0;f<=i;f++){const m=r+f/i*a;d.x=p*Math.cos(m),d.y=p*Math.sin(m),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/t+1)/2,g.y=(d.y/t+1)/2,u.push(g.x,g.y)}p+=h}for(let x=0;x<s;x++){const f=x*(i+1);for(let m=0;m<i;m++){const y=m+f,b=y,S=y+i+1,A=y+i+2,E=y+1;o.push(b,S,E),o.push(S,A,E)}}this.setIndex(o),this.setAttribute("position",new ct(c,3)),this.setAttribute("normal",new ct(l,3)),this.setAttribute("uv",new ct(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fl(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class pl extends Gt{constructor(e=new td([new ue(0,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],s=[],r=[],a=[];let o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let u=0;u<e.length;u++)l(e[u]),this.addGroup(o,c,u),o+=c,c=0;this.setIndex(i),this.setAttribute("position",new ct(s,3)),this.setAttribute("normal",new ct(r,3)),this.setAttribute("uv",new ct(a,2));function l(u){const p=s.length/3,h=u.extractPoints(t);let d=h.shape;const g=h.holes;hr.isClockWise(d)===!1&&(d=d.reverse());for(let f=0,m=g.length;f<m;f++){const y=g[f];hr.isClockWise(y)===!0&&(g[f]=y.reverse())}const x=hr.triangulateShape(d,g);for(let f=0,m=g.length;f<m;f++){const y=g[f];d=d.concat(y)}for(let f=0,m=d.length;f<m;f++){const y=d[f];s.push(y.x,y.y,0),r.push(0,0,1),a.push(y.x,y.y)}for(let f=0,m=x.length;f<m;f++){const y=x[f],b=y[0]+p,S=y[1]+p,A=y[2]+p;i.push(b,S,A),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return nx(t,e)}static fromJSON(e,t){const i=[];for(let s=0,r=e.shapes.length;s<r;s++){const a=t[e.shapes[s]];i.push(a)}return new pl(i,e.curveSegments)}}function nx(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const s=n[t];e.shapes.push(s.uuid)}else e.shapes.push(n.uuid);return e}function ys(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(ld(s))s.isRenderTargetTexture?(Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(ld(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Qt(n){const e={};for(let t=0;t<n.length;t++){const i=ys(n[t]);for(const s in i)e[s]=i[s]}return e}function ld(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function ix(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function hd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const di={clone:ys,merge:Qt};var sx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Dt extends Ui{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sx,this.fragmentShader=rx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ys(e.uniforms),this.uniformsGroups=ix(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Be().setHex(s.value);break;case"v2":this.uniforms[i].value=new ue().fromArray(s.value);break;case"v3":this.uniforms[i].value=new D().fromArray(s.value);break;case"v4":this.uniforms[i].value=new at().fromArray(s.value);break;case"m3":this.uniforms[i].value=new ze().fromArray(s.value);break;case"m4":this.uniforms[i].value=new je().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class ud extends Dt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class $n extends Ui{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=kr,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class dd extends $n{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Je(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Be(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Be(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Be(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class ax extends Ui{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=kr,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.combine=Co,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ox extends Ui{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=km,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class cx extends Ui{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ga extends xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class lx extends ga{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const ml=new je,fd=new D,pd=new D;class gl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.mapType=sn,this.map=null,this.mapPass=null,this.matrix=new je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new il,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;fd.setFromMatrixPosition(e.matrixWorld),t.position.copy(fd),pd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(pd),t.updateMatrixWorld(),ml.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ml,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===qs||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ml)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const xa=new D,va=new rs,Nn=new D;class md extends xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new je,this.projectionMatrix=new je,this.projectionMatrixInverse=new je,this.coordinateSystem=Dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(xa,va,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xa,va,Nn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(xa,va,Nn),Nn.x===1&&Nn.y===1&&Nn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(xa,va,Nn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const fi=new D,gd=new ue,xd=new ue;class en extends md{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=zr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ac*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zr*2*Math.atan(Math.tan(Ac*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){fi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(fi.x,fi.y).multiplyScalar(-e/fi.z),fi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(fi.x,fi.y).multiplyScalar(-e/fi.z)}getViewSize(e,t){return this.getViewBounds(e,gd,xd),t.subVectors(xd,gd)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ac*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class hx extends gl{constructor(){super(new en(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=zr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class vd extends ga{constructor(e,t,i=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new hx}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class ux extends gl{constructor(){super(new en(90,1,.5,500)),this.isPointLightShadow=!0}}class dx extends ga{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new ux}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class _a extends md{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class fx extends gl{constructor(){super(new _a(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class px extends ga{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.shadow=new fx}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const bs=-90,Es=1;class mx extends xt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new en(bs,Es,e,t);s.layers=this.layers,this.add(s);const r=new en(bs,Es,e,t);r.layers=this.layers,this.add(r);const a=new en(bs,Es,e,t);a.layers=this.layers,this.add(a);const o=new en(bs,Es,e,t);o.layers=this.layers,this.add(o);const c=new en(bs,Es,e,t);c.layers=this.layers,this.add(c);const l=new en(bs,Es,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===Dn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===qs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,p=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let f=!1;e.isWebGLRenderer===!0?f=e.state.buffers.depth.getReversed():f=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(p,h,d),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class gx extends en{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class xx{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=vx.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function vx(){this._document.hidden===!1&&this.reset()}const uh=class uh{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}};uh.prototype.isMatrix2=!0;let _d=uh;function Sd(n,e,t,i){const s=_x(i);switch(t){case iu:return n*e;case Vo:return n*e/s.components*s.byteLength;case Wo:return n*e/s.components*s.byteLength;case Pi:return n*e*2/s.components*s.byteLength;case Xo:return n*e*2/s.components*s.byteLength;case su:return n*e*3/s.components*s.byteLength;case dn:return n*e*4/s.components*s.byteLength;case Ko:return n*e*4/s.components*s.byteLength;case Pr:case Dr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ir:case Nr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case qo:case Zo:return Math.max(n,16)*Math.max(e,8)/4;case Yo:case Jo:return Math.max(n,8)*Math.max(e,8)/2;case Qo:case jo:case ec:case tc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case $o:case Or:case nc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ic:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case sc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case rc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ac:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case oc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case cc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case lc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case hc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case uc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case dc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case fc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case pc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case mc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case gc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case xc:case vc:case _c:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Sc:case Mc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ur:case yc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function _x(n){switch(n){case sn:case $h:return{byteLength:1,components:1};case Ks:case eu:case Zt:return{byteLength:2,components:1};case zo:case Ho:return{byteLength:2,components:4};case Pn:case Go:case un:return{byteLength:4,components:1};case tu:case nu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:vo}})),typeof window<"u"&&(window.__THREE__?Oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=vo);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Md(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Sx(n){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,p=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,u),o.onUploadCallback();let d;if(l instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=n.SHORT;else if(l instanceof Uint32Array)d=n.UNSIGNED_INT;else if(l instanceof Int32Array)d=n.INT;else if(l instanceof Int8Array)d=n.BYTE;else if(l instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,c,l){const u=c.array,p=c.updateRanges;if(n.bindBuffer(l,o),p.length===0)n.bufferSubData(l,0,u);else{p.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<p.length;d++){const g=p[h],x=p[d];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++h,p[h]=x)}p.length=h+1;for(let d=0,g=p.length;d<g;d++){const x=p[d];n.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Mx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,yx=`#ifdef USE_ALPHAHASH
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
#endif`,bx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ex=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ax=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Tx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wx=`#ifdef USE_AOMAP
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
#endif`,Rx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cx=`#ifdef USE_BATCHING
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
#endif`,Lx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Px=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Dx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ix=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Nx=`#ifdef USE_IRIDESCENCE
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
#endif`,Ox=`#ifdef USE_BUMPMAP
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
#endif`,Ux=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,kx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Fx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Bx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Gx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,zx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Hx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Vx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Wx=`#define PI 3.141592653589793
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
} // validated`,Xx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Kx=`vec3 transformedNormal = objectNormal;
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
#endif`,Yx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,qx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Jx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qx="gl_FragColor = linearToOutputTexel( gl_FragColor );",jx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$x=`#ifdef USE_ENVMAP
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
#endif`,ev=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,tv=`#ifdef USE_ENVMAP
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
#endif`,nv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,iv=`#ifdef USE_ENVMAP
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
#endif`,sv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,av=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ov=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cv=`#ifdef USE_GRADIENTMAP
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
}`,lv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,uv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,dv=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,fv=`#ifdef USE_ENVMAP
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
#endif`,pv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vv=`PhysicalMaterial material;
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
#endif`,_v=`uniform sampler2D dfgLUT;
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
}`,Sv=`
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
#endif`,Mv=`#if defined( RE_IndirectDiffuse )
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
#endif`,yv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bv=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Ev=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Av=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Lv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Pv=`#if defined( USE_POINTS_UV )
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
#endif`,Dv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Iv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Nv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ov=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Uv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kv=`#ifdef USE_MORPHTARGETS
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
#endif`,Fv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Gv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,zv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Wv=`#ifdef USE_NORMALMAP
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
#endif`,Xv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Kv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Yv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Jv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Qv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$v=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,e_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,t_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,n_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,i_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,s_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,r_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,a_=`float getShadowMask() {
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
}`,o_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,c_=`#ifdef USE_SKINNING
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
#endif`,l_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,h_=`#ifdef USE_SKINNING
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
#endif`,u_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,d_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,f_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,p_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,m_=`#ifdef USE_TRANSMISSION
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
#endif`,g_=`#ifdef USE_TRANSMISSION
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
#endif`,x_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,v_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,__=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,S_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ke={alphahash_fragment:Mx,alphahash_pars_fragment:yx,alphamap_fragment:bx,alphamap_pars_fragment:Ex,alphatest_fragment:Ax,alphatest_pars_fragment:Tx,aomap_fragment:wx,aomap_pars_fragment:Rx,batching_pars_vertex:Cx,batching_vertex:Lx,begin_vertex:Px,beginnormal_vertex:Dx,bsdfs:Ix,iridescence_fragment:Nx,bumpmap_pars_fragment:Ox,clipping_planes_fragment:Ux,clipping_planes_pars_fragment:kx,clipping_planes_pars_vertex:Fx,clipping_planes_vertex:Bx,color_fragment:Gx,color_pars_fragment:zx,color_pars_vertex:Hx,color_vertex:Vx,common:Wx,cube_uv_reflection_fragment:Xx,defaultnormal_vertex:Kx,displacementmap_pars_vertex:Yx,displacementmap_vertex:qx,emissivemap_fragment:Jx,emissivemap_pars_fragment:Zx,colorspace_fragment:Qx,colorspace_pars_fragment:jx,envmap_fragment:$x,envmap_common_pars_fragment:ev,envmap_pars_fragment:tv,envmap_pars_vertex:nv,envmap_physical_pars_fragment:fv,envmap_vertex:iv,fog_vertex:sv,fog_pars_vertex:rv,fog_fragment:av,fog_pars_fragment:ov,gradientmap_pars_fragment:cv,lightmap_pars_fragment:lv,lights_lambert_fragment:hv,lights_lambert_pars_fragment:uv,lights_pars_begin:dv,lights_toon_fragment:pv,lights_toon_pars_fragment:mv,lights_phong_fragment:gv,lights_phong_pars_fragment:xv,lights_physical_fragment:vv,lights_physical_pars_fragment:_v,lights_fragment_begin:Sv,lights_fragment_maps:Mv,lights_fragment_end:yv,lightprobes_pars_fragment:bv,logdepthbuf_fragment:Ev,logdepthbuf_pars_fragment:Av,logdepthbuf_pars_vertex:Tv,logdepthbuf_vertex:wv,map_fragment:Rv,map_pars_fragment:Cv,map_particle_fragment:Lv,map_particle_pars_fragment:Pv,metalnessmap_fragment:Dv,metalnessmap_pars_fragment:Iv,morphinstance_vertex:Nv,morphcolor_vertex:Ov,morphnormal_vertex:Uv,morphtarget_pars_vertex:kv,morphtarget_vertex:Fv,normal_fragment_begin:Bv,normal_fragment_maps:Gv,normal_pars_fragment:zv,normal_pars_vertex:Hv,normal_vertex:Vv,normalmap_pars_fragment:Wv,clearcoat_normal_fragment_begin:Xv,clearcoat_normal_fragment_maps:Kv,clearcoat_pars_fragment:Yv,iridescence_pars_fragment:qv,opaque_fragment:Jv,packing:Zv,premultiplied_alpha_fragment:Qv,project_vertex:jv,dithering_fragment:$v,dithering_pars_fragment:e_,roughnessmap_fragment:t_,roughnessmap_pars_fragment:n_,shadowmap_pars_fragment:i_,shadowmap_pars_vertex:s_,shadowmap_vertex:r_,shadowmask_pars_fragment:a_,skinbase_vertex:o_,skinning_pars_vertex:c_,skinning_vertex:l_,skinnormal_vertex:h_,specularmap_fragment:u_,specularmap_pars_fragment:d_,tonemapping_fragment:f_,tonemapping_pars_fragment:p_,transmission_fragment:m_,transmission_pars_fragment:g_,uv_pars_fragment:x_,uv_pars_vertex:v_,uv_vertex:__,worldpos_vertex:S_,background_vert:`varying vec2 vUv;
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
}`},_e={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new D},probesMax:{value:new D},probesResolution:{value:new D}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},On={basic:{uniforms:Qt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:Qt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Be(0)},envMapIntensity:{value:1}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:Qt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:Qt([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:Qt([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Be(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:Qt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:Qt([_e.points,_e.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:Qt([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:Qt([_e.common,_e.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:Qt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:Qt([_e.sprite,_e.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distance:{uniforms:Qt([_e.common,_e.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distance_vert,fragmentShader:Ke.distance_frag},shadow:{uniforms:Qt([_e.lights,_e.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};On.physical={uniforms:Qt([On.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const Sa={r:0,b:0,g:0},M_=new je,yd=new ze;yd.set(-1,0,0,0,1,0,0,0,1);function y_(n,e,t,i,s,r){const a=new Be(0);let o=s===!0?0:1,c,l,u=null,p=0,h=null;function d(y){let b=y.isScene===!0?y.background:null;if(b&&b.isTexture){const S=y.backgroundBlurriness>0;b=e.get(b,S)}return b}function g(y){let b=!1;const S=d(y);S===null?f(a,o):S&&S.isColor&&(f(S,1),b=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(y,b){const S=d(b);S&&(S.isCubeTexture||S.mapping===Cr)?(l===void 0&&(l=new pt(new Ss(1,1,1),new Dt({name:"BackgroundCubeMaterial",uniforms:ys(On.backgroundCube.uniforms),vertexShader:On.backgroundCube.vertexShader,fragmentShader:On.backgroundCube.fragmentShader,side:Jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=S,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(M_.makeRotationFromEuler(b.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(yd),l.material.toneMapped=Qe.getTransfer(S.colorSpace)!==st,(u!==S||p!==S.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,p=S.version,h=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new pt(new ma(2,2),new Dt({name:"BackgroundMaterial",uniforms:ys(On.background.uniforms),vertexShader:On.background.vertexShader,fragmentShader:On.background.fragmentShader,side:ii,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(S.colorSpace)!==st,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||p!==S.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=S,p=S.version,h=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function f(y,b){y.getRGB(Sa,hd(n)),t.buffers.color.setClear(Sa.r,Sa.g,Sa.b,b,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,b=1){a.set(y),o=b,f(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,f(a,o)},render:g,addToRenderList:x,dispose:m}}function b_(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,a=!1;function o(L,k,Y,q,G){let J=!1;const K=p(L,q,Y,k);r!==K&&(r=K,l(r.object)),J=d(L,q,Y,G),J&&g(L,q,Y,G),G!==null&&e.update(G,n.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,S(L,k,Y,q),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function c(){return n.createVertexArray()}function l(L){return n.bindVertexArray(L)}function u(L){return n.deleteVertexArray(L)}function p(L,k,Y,q){const G=q.wireframe===!0;let J=i[k.id];J===void 0&&(J={},i[k.id]=J);const K=L.isInstancedMesh===!0?L.id:0;let ee=J[K];ee===void 0&&(ee={},J[K]=ee);let se=ee[Y.id];se===void 0&&(se={},ee[Y.id]=se);let de=se[G];return de===void 0&&(de=h(c()),se[G]=de),de}function h(L){const k=[],Y=[],q=[];for(let G=0;G<t;G++)k[G]=0,Y[G]=0,q[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:Y,attributeDivisors:q,object:L,attributes:{},index:null}}function d(L,k,Y,q){const G=r.attributes,J=k.attributes;let K=0;const ee=Y.getAttributes();for(const se in ee)if(ee[se].location>=0){const C=G[se];let N=J[se];if(N===void 0&&(se==="instanceMatrix"&&L.instanceMatrix&&(N=L.instanceMatrix),se==="instanceColor"&&L.instanceColor&&(N=L.instanceColor)),C===void 0||C.attribute!==N||N&&C.data!==N.data)return!0;K++}return r.attributesNum!==K||r.index!==q}function g(L,k,Y,q){const G={},J=k.attributes;let K=0;const ee=Y.getAttributes();for(const se in ee)if(ee[se].location>=0){let C=J[se];C===void 0&&(se==="instanceMatrix"&&L.instanceMatrix&&(C=L.instanceMatrix),se==="instanceColor"&&L.instanceColor&&(C=L.instanceColor));const N={};N.attribute=C,C&&C.data&&(N.data=C.data),G[se]=N,K++}r.attributes=G,r.attributesNum=K,r.index=q}function x(){const L=r.newAttributes;for(let k=0,Y=L.length;k<Y;k++)L[k]=0}function f(L){m(L,0)}function m(L,k){const Y=r.newAttributes,q=r.enabledAttributes,G=r.attributeDivisors;Y[L]=1,q[L]===0&&(n.enableVertexAttribArray(L),q[L]=1),G[L]!==k&&(n.vertexAttribDivisor(L,k),G[L]=k)}function y(){const L=r.newAttributes,k=r.enabledAttributes;for(let Y=0,q=k.length;Y<q;Y++)k[Y]!==L[Y]&&(n.disableVertexAttribArray(Y),k[Y]=0)}function b(L,k,Y,q,G,J,K){K===!0?n.vertexAttribIPointer(L,k,Y,G,J):n.vertexAttribPointer(L,k,Y,q,G,J)}function S(L,k,Y,q){x();const G=q.attributes,J=Y.getAttributes(),K=k.defaultAttributeValues;for(const ee in J){const se=J[ee];if(se.location>=0){let de=G[ee];if(de===void 0&&(ee==="instanceMatrix"&&L.instanceMatrix&&(de=L.instanceMatrix),ee==="instanceColor"&&L.instanceColor&&(de=L.instanceColor)),de!==void 0){const C=de.normalized,N=de.itemSize,Z=e.get(de);if(Z===void 0)continue;const me=Z.buffer,oe=Z.type,F=Z.bytesPerElement,re=oe===n.INT||oe===n.UNSIGNED_INT||de.gpuType===Go;if(de.isInterleavedBufferAttribute){const ie=de.data,he=ie.stride,Ee=de.offset;if(ie.isInstancedInterleavedBuffer){for(let Ae=0;Ae<se.locationSize;Ae++)m(se.location+Ae,ie.meshPerAttribute);L.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Ae=0;Ae<se.locationSize;Ae++)f(se.location+Ae);n.bindBuffer(n.ARRAY_BUFFER,me);for(let Ae=0;Ae<se.locationSize;Ae++)b(se.location+Ae,N/se.locationSize,oe,C,he*F,(Ee+N/se.locationSize*Ae)*F,re)}else{if(de.isInstancedBufferAttribute){for(let ie=0;ie<se.locationSize;ie++)m(se.location+ie,de.meshPerAttribute);L.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let ie=0;ie<se.locationSize;ie++)f(se.location+ie);n.bindBuffer(n.ARRAY_BUFFER,me);for(let ie=0;ie<se.locationSize;ie++)b(se.location+ie,N/se.locationSize,oe,C,N*F,N/se.locationSize*ie*F,re)}}else if(K!==void 0){const C=K[ee];if(C!==void 0)switch(C.length){case 2:n.vertexAttrib2fv(se.location,C);break;case 3:n.vertexAttrib3fv(se.location,C);break;case 4:n.vertexAttrib4fv(se.location,C);break;default:n.vertexAttrib1fv(se.location,C)}}}}y()}function A(){T();for(const L in i){const k=i[L];for(const Y in k){const q=k[Y];for(const G in q){const J=q[G];for(const K in J)u(J[K].object),delete J[K];delete q[G]}}delete i[L]}}function E(L){if(i[L.id]===void 0)return;const k=i[L.id];for(const Y in k){const q=k[Y];for(const G in q){const J=q[G];for(const K in J)u(J[K].object),delete J[K];delete q[G]}}delete i[L.id]}function R(L){for(const k in i){const Y=i[k];for(const q in Y){const G=Y[q];if(G[L.id]===void 0)continue;const J=G[L.id];for(const K in J)u(J[K].object),delete J[K];delete G[L.id]}}}function _(L){for(const k in i){const Y=i[k],q=L.isInstancedMesh===!0?L.id:0,G=Y[q];if(G!==void 0){for(const J in G){const K=G[J];for(const ee in K)u(K[ee].object),delete K[ee];delete G[J]}delete Y[q],Object.keys(Y).length===0&&delete i[k]}}}function T(){P(),a=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:P,dispose:A,releaseStatesOfGeometry:E,releaseStatesOfObject:_,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:f,disableUnusedAttributes:y}}function E_(n,e,t){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),t.update(l,i,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let h=0;for(let d=0;d<u;d++)h+=l[d];t.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function A_(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==dn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const _=R===Zt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==sn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==un&&!_)}function c(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(Oe("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const p=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Oe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),f=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:p,reversedDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:f,maxAttributes:m,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:S,maxSamples:A,samples:E}}function T_(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Fi,o=new ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(p,h){const d=p.length!==0||h||i!==0||s;return s=h,i=p.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,h){t=u(p,h,0)},this.setState=function(p,h,d){const g=p.clippingPlanes,x=p.clipIntersection,f=p.clipShadows,m=n.get(p);if(!s||g===null||g.length===0||r&&!f)r?u(null):l();else{const y=r?0:i,b=y*4;let S=m.clippingState||null;c.value=S,S=u(g,h,b,d);for(let A=0;A!==b;++A)S[A]=t[A];m.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(p,h,d,g){const x=p!==null?p.length:0;let f=null;if(x!==0){if(f=c.value,g!==!0||f===null){const m=d+x*4,y=h.matrixWorldInverse;o.getNormalMatrix(y),(f===null||f.length<m)&&(f=new Float32Array(m));for(let b=0,S=d;b!==x;++b,S+=4)a.copy(p[b]).applyMatrix4(y,o),a.normal.toArray(f,S),f[S+3]=a.constant}c.value=f,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,f}}const pi=4,bd=[.125,.215,.35,.446,.526,.582],zi=20,w_=256,ur=new _a,Ed=new Be;let xl=null,vl=0,_l=0,Sl=!1;const R_=new D;class Ml{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=R_}=r;xl=this._renderer.getRenderTarget(),vl=this._renderer.getActiveCubeFace(),_l=this._renderer.getActiveMipmapLevel(),Sl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Td(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(xl,vl,_l),this._renderer.xr.enabled=Sl,e.scissorTest=!1,As(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ri||e.mapping===ns?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),xl=this._renderer.getRenderTarget(),vl=this._renderer.getActiveCubeFace(),_l=this._renderer.getActiveMipmapLevel(),Sl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:Zt,format:dn,colorSpace:Fr,depthBuffer:!1},s=Ad(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ad(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=C_(r)),this._blurMaterial=P_(r,e,t),this._ggxMaterial=L_(r,e,t)}return s}_compileMaterial(e){const t=new pt(new Gt,e);this._renderer.compile(t,ur)}_sceneToCubeUV(e,t,i,s,r){const c=new en(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],p=this._renderer,h=p.autoClear,d=p.toneMapping;p.getClearColor(Ed),p.toneMapping=Ln,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new pt(new Ss,new Qr({name:"PMREM.Background",side:Jt,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,f=x.material;let m=!1;const y=e.background;y?y.isColor&&(f.color.copy(y),e.background=null,m=!0):(f.color.copy(Ed),m=!0);for(let b=0;b<6;b++){const S=b%3;S===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[b],r.y,r.z)):S===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[b]));const A=this._cubeSize;As(s,S*A,b>2?A:0,A,A),p.setRenderTarget(s),m&&p.render(x,c),p.render(e,c)}p.toneMapping=d,p.autoClear=h,e.background=y}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Ri||e.mapping===ns;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=wd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Td());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;As(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,ur)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),p=Math.sqrt(l*l-u*u),h=0+l*1.25,d=p*h,{_lodMax:g}=this,x=this._sizeLods[i],f=3*x*(i>g-pi?i-g+pi:0),m=4*(this._cubeSize-x);c.envMap.value=e.texture,c.roughness.value=d,c.mipInt.value=g-t,As(r,f,m,3*x,2*x),s.setRenderTarget(r),s.render(o,ur),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-i,As(e,f,m,3*x,2*x),s.setRenderTarget(e),s.render(o,ur)}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&et("blur direction must be either latitudinal or longitudinal!");const u=3,p=this._lodMeshes[s];p.material=l;const h=l.uniforms,d=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*zi-1),x=r/g,f=isFinite(r)?1+Math.floor(u*x):zi;f>zi&&Oe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${zi}`);const m=[];let y=0;for(let R=0;R<zi;++R){const _=R/x,T=Math.exp(-_*_/2);m.push(T),R===0?y+=T:R<f&&(y+=2*T)}for(let R=0;R<m.length;R++)m[R]=m[R]/y;h.envMap.value=e.texture,h.samples.value=f,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:b}=this;h.dTheta.value=g,h.mipInt.value=b-i;const S=this._sizeLods[s],A=3*S*(s>b-pi?s-b+pi:0),E=4*(this._cubeSize-S);As(t,A,E,3*S,2*S),c.setRenderTarget(t),c.render(p,ur)}}function C_(n){const e=[],t=[],i=[];let s=n;const r=n-pi+1+bd.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>n-pi?c=bd[a-n+pi-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),u=-l,p=1+l,h=[u,u,p,u,p,p,u,u,p,p,u,p],d=6,g=6,x=3,f=2,m=1,y=new Float32Array(x*g*d),b=new Float32Array(f*g*d),S=new Float32Array(m*g*d);for(let E=0;E<d;E++){const R=E%3*2/3-1,_=E>2?0:-1,T=[R,_,0,R+2/3,_,0,R+2/3,_+1,0,R,_,0,R+2/3,_+1,0,R,_+1,0];y.set(T,x*g*E),b.set(h,f*g*E);const P=[E,E,E,E,E,E];S.set(P,m*g*E)}const A=new Gt;A.setAttribute("position",new fn(y,x)),A.setAttribute("uv",new fn(b,f)),A.setAttribute("faceIndex",new fn(S,m)),i.push(new pt(A,null)),s>pi&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Ad(n,e,t){const i=new Vt(n,e,t);return i.texture.mapping=Cr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function As(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function L_(n,e,t){return new Dt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:w_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ma(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function P_(n,e,t){const i=new Float32Array(zi),s=new D(0,1,0);return new Dt({name:"SphericalGaussianBlur",defines:{n:zi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ma(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Td(){return new Dt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ma(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function wd(){return new Dt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ma(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Ma(){return`

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
	`}class Rd extends Vt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Wu(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ss(5,5,5),r=new Dt({name:"CubemapFromEquirect",uniforms:ys(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Jt,blending:Cn});r.uniforms.tEquirect.value=t;const a=new pt(s,r),o=t.minFilter;return t.minFilter===Ci&&(t.minFilter=Bt),new mx(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function D_(n){let e=new WeakMap,t=new WeakMap,i=null;function s(h,d=!1){return h==null?null:d?a(h):r(h)}function r(h){if(h&&h.isTexture){const d=h.mapping;if(d===Uo||d===ko)if(e.has(h)){const g=e.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const x=new Rd(g.height);return x.fromEquirectangularTexture(n,h),e.set(h,x),h.addEventListener("dispose",l),o(x.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const d=h.mapping,g=d===Uo||d===ko,x=d===Ri||d===ns;if(g||x){let f=t.get(h);const m=f!==void 0?f.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return i===null&&(i=new Ml(n)),f=g?i.fromEquirectangular(h,f):i.fromCubemap(h,f),f.texture.pmremVersion=h.pmremVersion,t.set(h,f),f.texture;if(f!==void 0)return f.texture;{const y=h.image;return g&&y&&y.height>0||x&&y&&c(y)?(i===null&&(i=new Ml(n)),f=g?i.fromEquirectangular(h):i.fromCubemap(h),f.texture.pmremVersion=h.pmremVersion,t.set(h,f),h.addEventListener("dispose",u),f.texture):null}}}return h}function o(h,d){return d===Uo?h.mapping=Ri:d===ko&&(h.mapping=ns),h}function c(h){let d=0;const g=6;for(let x=0;x<g;x++)h[x]!==void 0&&d++;return d===g}function l(h){const d=h.target;d.removeEventListener("dispose",l);const g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function u(h){const d=h.target;d.removeEventListener("dispose",u);const g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function p(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:p}}function I_(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&ss("WebGLRenderer: "+i+" extension not supported."),s}}}function N_(n,e,t,i){const s={},r=new WeakMap;function a(p){const h=p.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const d=r.get(h);d&&(e.remove(d),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(p,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function c(p){const h=p.attributes;for(const d in h)e.update(h[d],n.ARRAY_BUFFER)}function l(p){const h=[],d=p.index,g=p.attributes.position;let x=0;if(g===void 0)return;if(d!==null){const y=d.array;x=d.version;for(let b=0,S=y.length;b<S;b+=3){const A=y[b+0],E=y[b+1],R=y[b+2];h.push(A,E,E,R,R,A)}}else{const y=g.array;x=g.version;for(let b=0,S=y.length/3-1;b<S;b+=3){const A=b+0,E=b+1,R=b+2;h.push(A,E,E,R,R,A)}}const f=new(g.count>=65535?Tu:Wc)(h,1);f.version=x;const m=r.get(p);m&&e.remove(m),r.set(p,f)}function u(p){const h=r.get(p);if(h){const d=p.index;d!==null&&h.version<d.version&&l(p)}else l(p);return r.get(p)}return{get:o,update:c,getWireframeAttribute:u}}function O_(n,e,t){let i;function s(p){i=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function c(p,h){n.drawElements(i,h,r,p*a),t.update(h,i,1)}function l(p,h,d){d!==0&&(n.drawElementsInstanced(i,h,r,p*a,d),t.update(h,i,d))}function u(p,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,p,0,d);let x=0;for(let f=0;f<d;f++)x+=h[f];t.update(x,i,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function U_(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:et("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function k_(n,e,t){const i=new WeakMap,s=new at;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==p){let T=function(){R.dispose(),i.delete(o),o.removeEventListener("dispose",T)};h!==void 0&&h.texture.dispose();const d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let b=0;d===!0&&(b=1),g===!0&&(b=2),x===!0&&(b=3);let S=o.attributes.position.count*b,A=1;S>e.maxTextureSize&&(A=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const E=new Float32Array(S*A*4*p),R=new pu(E,S,A,p);R.type=un,R.needsUpdate=!0;const _=b*4;for(let P=0;P<p;P++){const L=f[P],k=m[P],Y=y[P],q=S*A*4*P;for(let G=0;G<L.count;G++){const J=G*_;d===!0&&(s.fromBufferAttribute(L,G),E[q+J+0]=s.x,E[q+J+1]=s.y,E[q+J+2]=s.z,E[q+J+3]=0),g===!0&&(s.fromBufferAttribute(k,G),E[q+J+4]=s.x,E[q+J+5]=s.y,E[q+J+6]=s.z,E[q+J+7]=0),x===!0&&(s.fromBufferAttribute(Y,G),E[q+J+8]=s.x,E[q+J+9]=s.y,E[q+J+10]=s.z,E[q+J+11]=Y.itemSize===4?s.w:1)}}h={count:p,texture:R,size:new ue(S,A)},i.set(o,h),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let d=0;for(let x=0;x<l.length;x++)d+=l[x];const g=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function F_(n,e,t,i,s){let r=new WeakMap;function a(l){const u=s.render.frame,p=l.geometry,h=e.get(l,p);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return h}function o(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const B_={[Lo]:"LINEAR_TONE_MAPPING",[Po]:"REINHARD_TONE_MAPPING",[Do]:"CINEON_TONE_MAPPING",[Rr]:"ACES_FILMIC_TONE_MAPPING",[No]:"AGX_TONE_MAPPING",[Oo]:"NEUTRAL_TONE_MAPPING",[Io]:"CUSTOM_TONE_MAPPING"};function G_(n,e,t,i,s,r){const a=new Vt(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,depthTexture:s?new _s(e,t):void 0}),o=new Vt(e,t,{type:Zt,depthBuffer:!1,stencilBuffer:!1}),c=new Gt;c.setAttribute("position",new ct([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ct([0,2,0,0,2,0],2));const l=new ud({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new pt(c,l),p=new _a(-1,1,1,-1,0,1);let h=null,d=null,g=!1,x,f=null,m=[],y=!1;this.setSize=function(b,S){a.setSize(b,S),o.setSize(b,S);for(let A=0;A<m.length;A++){const E=m[A];E.setSize&&E.setSize(b,S)}},this.setEffects=function(b){m=b,y=m.length>0&&m[0].isRenderPass===!0;const S=a.width,A=a.height;for(let E=0;E<m.length;E++){const R=m[E];R.setSize&&R.setSize(S,A)}},this.begin=function(b,S){if(g||b.toneMapping===Ln&&m.length===0)return!1;if(f=S,S!==null){const A=S.width,E=S.height;(a.width!==A||a.height!==E)&&this.setSize(A,E)}return y===!1&&b.setRenderTarget(a),x=b.toneMapping,b.toneMapping=Ln,!0},this.hasRenderPass=function(){return y},this.end=function(b,S){b.toneMapping=x,g=!0;let A=a,E=o;for(let R=0;R<m.length;R++){const _=m[R];if(_.enabled!==!1&&(_.render(b,E,A,S),_.needsSwap!==!1)){const T=A;A=E,E=T}}if(h!==b.outputColorSpace||d!==b.toneMapping){h=b.outputColorSpace,d=b.toneMapping,l.defines={},Qe.getTransfer(h)===st&&(l.defines.SRGB_TRANSFER="");const R=B_[d];R&&(l.defines[R]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=A.texture,b.setRenderTarget(f),b.render(u,p),f=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}const Cd=new Pt,yl=new _s(1,1),Ld=new pu,Pd=new tg,Dd=new Wu,Id=[],Nd=[],Od=new Float32Array(16),Ud=new Float32Array(9),kd=new Float32Array(4);function Ts(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Id[s];if(r===void 0&&(r=new Float32Array(s),Id[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function It(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Nt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ya(n,e){let t=Nd[e];t===void 0&&(t=new Int32Array(e),Nd[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function z_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function H_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;n.uniform2fv(this.addr,e),Nt(t,e)}}function V_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;n.uniform3fv(this.addr,e),Nt(t,e)}}function W_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;n.uniform4fv(this.addr,e),Nt(t,e)}}function X_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(It(t,i))return;kd.set(i),n.uniformMatrix2fv(this.addr,!1,kd),Nt(t,i)}}function K_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(It(t,i))return;Ud.set(i),n.uniformMatrix3fv(this.addr,!1,Ud),Nt(t,i)}}function Y_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(It(t,i))return;Od.set(i),n.uniformMatrix4fv(this.addr,!1,Od),Nt(t,i)}}function q_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function J_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;n.uniform2iv(this.addr,e),Nt(t,e)}}function Z_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;n.uniform3iv(this.addr,e),Nt(t,e)}}function Q_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;n.uniform4iv(this.addr,e),Nt(t,e)}}function j_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function $_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;n.uniform2uiv(this.addr,e),Nt(t,e)}}function eS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;n.uniform3uiv(this.addr,e),Nt(t,e)}}function tS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;n.uniform4uiv(this.addr,e),Nt(t,e)}}function nS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(yl.compareFunction=t.isReversedDepthBuffer()?Ec:bc,r=yl):r=Cd,t.setTexture2D(e||r,s)}function iS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Pd,s)}function sS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Dd,s)}function rS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Ld,s)}function aS(n){switch(n){case 5126:return z_;case 35664:return H_;case 35665:return V_;case 35666:return W_;case 35674:return X_;case 35675:return K_;case 35676:return Y_;case 5124:case 35670:return q_;case 35667:case 35671:return J_;case 35668:case 35672:return Z_;case 35669:case 35673:return Q_;case 5125:return j_;case 36294:return $_;case 36295:return eS;case 36296:return tS;case 35678:case 36198:case 36298:case 36306:case 35682:return nS;case 35679:case 36299:case 36307:return iS;case 35680:case 36300:case 36308:case 36293:return sS;case 36289:case 36303:case 36311:case 36292:return rS}}function oS(n,e){n.uniform1fv(this.addr,e)}function cS(n,e){const t=Ts(e,this.size,2);n.uniform2fv(this.addr,t)}function lS(n,e){const t=Ts(e,this.size,3);n.uniform3fv(this.addr,t)}function hS(n,e){const t=Ts(e,this.size,4);n.uniform4fv(this.addr,t)}function uS(n,e){const t=Ts(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function dS(n,e){const t=Ts(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function fS(n,e){const t=Ts(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function pS(n,e){n.uniform1iv(this.addr,e)}function mS(n,e){n.uniform2iv(this.addr,e)}function gS(n,e){n.uniform3iv(this.addr,e)}function xS(n,e){n.uniform4iv(this.addr,e)}function vS(n,e){n.uniform1uiv(this.addr,e)}function _S(n,e){n.uniform2uiv(this.addr,e)}function SS(n,e){n.uniform3uiv(this.addr,e)}function MS(n,e){n.uniform4uiv(this.addr,e)}function yS(n,e,t){const i=this.cache,s=e.length,r=ya(t,s);It(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=yl:a=Cd;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function bS(n,e,t){const i=this.cache,s=e.length,r=ya(t,s);It(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Pd,r[a])}function ES(n,e,t){const i=this.cache,s=e.length,r=ya(t,s);It(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Dd,r[a])}function AS(n,e,t){const i=this.cache,s=e.length,r=ya(t,s);It(i,r)||(n.uniform1iv(this.addr,r),Nt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Ld,r[a])}function TS(n){switch(n){case 5126:return oS;case 35664:return cS;case 35665:return lS;case 35666:return hS;case 35674:return uS;case 35675:return dS;case 35676:return fS;case 5124:case 35670:return pS;case 35667:case 35671:return mS;case 35668:case 35672:return gS;case 35669:case 35673:return xS;case 5125:return vS;case 36294:return _S;case 36295:return SS;case 36296:return MS;case 35678:case 36198:case 36298:case 36306:case 35682:return yS;case 35679:case 36299:case 36307:return bS;case 35680:case 36300:case 36308:case 36293:return ES;case 36289:case 36303:case 36311:case 36292:return AS}}class wS{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=aS(t.type)}}class RS{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=TS(t.type)}}class CS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const bl=/(\w+)(\])?(\[|\.)?/g;function Fd(n,e){n.seq.push(e),n.map[e.id]=e}function LS(n,e,t){const i=n.name,s=i.length;for(bl.lastIndex=0;;){const r=bl.exec(i),a=bl.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Fd(t,l===void 0?new wS(o,n,e):new RS(o,n,e));break}else{let p=t.map[o];p===void 0&&(p=new CS(o),Fd(t,p)),t=p}}}class ba{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);LS(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Bd(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const PS=37297;let DS=0;function IS(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Gd=new ze;function NS(n){Qe._getMatrix(Gd,Qe.workingColorSpace,n);const e=`mat3( ${Gd.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(n)){case Br:return[e,"LinearTransferOETF"];case st:return[e,"sRGBTransferOETF"];default:return Oe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function zd(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+IS(n.getShaderSource(e),o)}else return r}function OS(n,e){const t=NS(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const US={[Lo]:"Linear",[Po]:"Reinhard",[Do]:"Cineon",[Rr]:"ACESFilmic",[No]:"AgX",[Oo]:"Neutral",[Io]:"Custom"};function kS(n,e){const t=US[e];return t===void 0?(Oe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ea=new D;function FS(){Qe.getLuminanceCoefficients(Ea);const n=Ea.x.toFixed(4),e=Ea.y.toFixed(4),t=Ea.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function BS(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(dr).join(`
`)}function GS(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function zS(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function dr(n){return n!==""}function Hd(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Vd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const HS=/^[ \t]*#include +<([\w\d./]+)>/gm;function El(n){return n.replace(HS,WS)}const VS=new Map;function WS(n,e){let t=Ke[e];if(t===void 0){const i=VS.get(e);if(i!==void 0)t=Ke[i],Oe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return El(t)}const XS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wd(n){return n.replace(XS,KS)}function KS(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Xd(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const YS={[wr]:"SHADOWMAP_TYPE_PCF",[Ws]:"SHADOWMAP_TYPE_VSM"};function qS(n){return YS[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const JS={[Ri]:"ENVMAP_TYPE_CUBE",[ns]:"ENVMAP_TYPE_CUBE",[Cr]:"ENVMAP_TYPE_CUBE_UV"};function ZS(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":JS[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const QS={[ns]:"ENVMAP_MODE_REFRACTION"};function jS(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":QS[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const $S={[Co]:"ENVMAP_BLENDING_MULTIPLY",[Im]:"ENVMAP_BLENDING_MIX",[Nm]:"ENVMAP_BLENDING_ADD"};function eM(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":$S[n.combine]||"ENVMAP_BLENDING_NONE"}function tM(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function nM(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=qS(t),l=ZS(t),u=jS(t),p=eM(t),h=tM(t),d=BS(t),g=GS(r),x=s.createProgram();let f,m,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(dr).join(`
`),f.length>0&&(f+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(dr).join(`
`),m.length>0&&(m+=`
`)):(f=[Xd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(dr).join(`
`),m=[Xd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+p:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ln?"#define TONE_MAPPING":"",t.toneMapping!==Ln?Ke.tonemapping_pars_fragment:"",t.toneMapping!==Ln?kS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,OS("linearToOutputTexel",t.outputColorSpace),FS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(dr).join(`
`)),a=El(a),a=Hd(a,t),a=Vd(a,t),o=El(o),o=Hd(o,t),o=Vd(o,t),a=Wd(a),o=Wd(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,f=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,m=["#define varying in",t.glslVersion===ou?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ou?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const b=y+f+a,S=y+m+o,A=Bd(s,s.VERTEX_SHADER,b),E=Bd(s,s.FRAGMENT_SHADER,S);s.attachShader(x,A),s.attachShader(x,E),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function R(L){if(n.debug.checkShaderErrors){const k=s.getProgramInfoLog(x)||"",Y=s.getShaderInfoLog(A)||"",q=s.getShaderInfoLog(E)||"",G=k.trim(),J=Y.trim(),K=q.trim();let ee=!0,se=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(ee=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,A,E);else{const de=zd(s,A,"vertex"),C=zd(s,E,"fragment");et("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+G+`
`+de+`
`+C)}else G!==""?Oe("WebGLProgram: Program Info Log:",G):(J===""||K==="")&&(se=!1);se&&(L.diagnostics={runnable:ee,programLog:G,vertexShader:{log:J,prefix:f},fragmentShader:{log:K,prefix:m}})}s.deleteShader(A),s.deleteShader(E),_=new ba(s,x),T=zS(s,x)}let _;this.getUniforms=function(){return _===void 0&&R(this),_};let T;this.getAttributes=function(){return T===void 0&&R(this),T};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(x,PS)),P},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=DS++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=E,this}let iM=0;class sM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new rM(e),t.set(e,i)),i}}class rM{constructor(e){this.id=iM++,this.code=e,this.usedTimes=0}}function aM(n){return n===Pi||n===Or||n===Ur}function oM(n,e,t,i,s,r){const a=new xu,o=new sM,c=new Set,l=[],u=new Map,p=i.logarithmicDepthBuffer;let h=i.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return c.add(_),_===0?"uv":`uv${_}`}function x(_,T,P,L,k,Y){const q=L.fog,G=k.geometry,J=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?L.environment:null,K=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,ee=e.get(_.envMap||J,K),se=ee&&ee.mapping===Cr?ee.image.height:null,de=d[_.type];_.precision!==null&&(h=i.getMaxPrecision(_.precision),h!==_.precision&&Oe("WebGLProgram.getParameters:",_.precision,"not supported, using",h,"instead."));const C=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,N=C!==void 0?C.length:0;let Z=0;G.morphAttributes.position!==void 0&&(Z=1),G.morphAttributes.normal!==void 0&&(Z=2),G.morphAttributes.color!==void 0&&(Z=3);let me,oe,F,re;if(de){const Re=On[de];me=Re.vertexShader,oe=Re.fragmentShader}else{me=_.vertexShader,oe=_.fragmentShader;const Re=o.getVertexShaderStage(_),St=o.getFragmentShaderStage(_);o.update(_,Re,St),F=Re.id,re=St.id}const ie=n.getRenderTarget(),he=n.state.buffers.depth.getReversed(),Ee=k.isInstancedMesh===!0,Ae=k.isBatchedMesh===!0,Ve=!!_.map,Ue=!!_.matcap,it=!!ee,tt=!!_.aoMap,$e=!!_.lightMap,Rt=!!_.bumpMap&&_.wireframe===!1,Ot=!!_.normalMap,Ft=!!_.displacementMap,zt=!!_.emissiveMap,_t=!!_.metalnessMap,Ct=!!_.roughnessMap,O=_.anisotropy>0,nn=_.clearcoat>0,rt=_.dispersion>0,w=_.iridescence>0,v=_.sheen>0,B=_.transmission>0,W=O&&!!_.anisotropyMap,Q=nn&&!!_.clearcoatMap,le=nn&&!!_.clearcoatNormalMap,pe=nn&&!!_.clearcoatRoughnessMap,j=w&&!!_.iridescenceMap,ne=w&&!!_.iridescenceThicknessMap,ge=v&&!!_.sheenColorMap,Pe=v&&!!_.sheenRoughnessMap,Se=!!_.specularMap,xe=!!_.specularColorMap,Ne=!!_.specularIntensityMap,ke=B&&!!_.transmissionMap,We=B&&!!_.thicknessMap,I=!!_.gradientMap,fe=!!_.alphaMap,te=_.alphaTest>0,ve=!!_.alphaHash,be=!!_.extensions;let ae=Ln;_.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(ae=n.toneMapping);const Le={shaderID:de,shaderType:_.type,shaderName:_.name,vertexShader:me,fragmentShader:oe,defines:_.defines,customVertexShaderID:F,customFragmentShaderID:re,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:h,batching:Ae,batchingColor:Ae&&k._colorsTexture!==null,instancing:Ee,instancingColor:Ee&&k.instanceColor!==null,instancingMorph:Ee&&k.morphTexture!==null,outputColorSpace:ie===null?n.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Qe.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Ve,matcap:Ue,envMap:it,envMapMode:it&&ee.mapping,envMapCubeUVHeight:se,aoMap:tt,lightMap:$e,bumpMap:Rt,normalMap:Ot,displacementMap:Ft,emissiveMap:zt,normalMapObjectSpace:Ot&&_.normalMapType===Fm,normalMapTangentSpace:Ot&&_.normalMapType===kr,packedNormalMap:Ot&&_.normalMapType===kr&&aM(_.normalMap.format),metalnessMap:_t,roughnessMap:Ct,anisotropy:O,anisotropyMap:W,clearcoat:nn,clearcoatMap:Q,clearcoatNormalMap:le,clearcoatRoughnessMap:pe,dispersion:rt,iridescence:w,iridescenceMap:j,iridescenceThicknessMap:ne,sheen:v,sheenColorMap:ge,sheenRoughnessMap:Pe,specularMap:Se,specularColorMap:xe,specularIntensityMap:Ne,transmission:B,transmissionMap:ke,thicknessMap:We,gradientMap:I,opaque:_.transparent===!1&&_.blending===es&&_.alphaToCoverage===!1,alphaMap:fe,alphaTest:te,alphaHash:ve,combine:_.combine,mapUv:Ve&&g(_.map.channel),aoMapUv:tt&&g(_.aoMap.channel),lightMapUv:$e&&g(_.lightMap.channel),bumpMapUv:Rt&&g(_.bumpMap.channel),normalMapUv:Ot&&g(_.normalMap.channel),displacementMapUv:Ft&&g(_.displacementMap.channel),emissiveMapUv:zt&&g(_.emissiveMap.channel),metalnessMapUv:_t&&g(_.metalnessMap.channel),roughnessMapUv:Ct&&g(_.roughnessMap.channel),anisotropyMapUv:W&&g(_.anisotropyMap.channel),clearcoatMapUv:Q&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:le&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&g(_.sheenRoughnessMap.channel),specularMapUv:Se&&g(_.specularMap.channel),specularColorMapUv:xe&&g(_.specularColorMap.channel),specularIntensityMapUv:Ne&&g(_.specularIntensityMap.channel),transmissionMapUv:ke&&g(_.transmissionMap.channel),thicknessMapUv:We&&g(_.thicknessMap.channel),alphaMapUv:fe&&g(_.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Ot||O),vertexNormals:!!G.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!G.attributes.uv&&(Ve||fe),fog:!!q,useFog:_.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||G.attributes.normal===void 0&&Ot===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:he,skinning:k.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:Z,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:Y.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:ae,decodeVideoTexture:Ve&&_.map.isVideoTexture===!0&&Qe.getTransfer(_.map.colorSpace)===st,decodeVideoTextureEmissive:zt&&_.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(_.emissiveMap.colorSpace)===st,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Rn,flipSided:_.side===Jt,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:be&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&_.extensions.multiDraw===!0||Ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Le.vertexUv1s=c.has(1),Le.vertexUv2s=c.has(2),Le.vertexUv3s=c.has(3),c.clear(),Le}function f(_){const T=[];if(_.shaderID?T.push(_.shaderID):(T.push(_.customVertexShaderID),T.push(_.customFragmentShaderID)),_.defines!==void 0)for(const P in _.defines)T.push(P),T.push(_.defines[P]);return _.isRawShaderMaterial===!1&&(m(T,_),y(T,_),T.push(n.outputColorSpace)),T.push(_.customProgramCacheKey),T.join()}function m(_,T){_.push(T.precision),_.push(T.outputColorSpace),_.push(T.envMapMode),_.push(T.envMapCubeUVHeight),_.push(T.mapUv),_.push(T.alphaMapUv),_.push(T.lightMapUv),_.push(T.aoMapUv),_.push(T.bumpMapUv),_.push(T.normalMapUv),_.push(T.displacementMapUv),_.push(T.emissiveMapUv),_.push(T.metalnessMapUv),_.push(T.roughnessMapUv),_.push(T.anisotropyMapUv),_.push(T.clearcoatMapUv),_.push(T.clearcoatNormalMapUv),_.push(T.clearcoatRoughnessMapUv),_.push(T.iridescenceMapUv),_.push(T.iridescenceThicknessMapUv),_.push(T.sheenColorMapUv),_.push(T.sheenRoughnessMapUv),_.push(T.specularMapUv),_.push(T.specularColorMapUv),_.push(T.specularIntensityMapUv),_.push(T.transmissionMapUv),_.push(T.thicknessMapUv),_.push(T.combine),_.push(T.fogExp2),_.push(T.sizeAttenuation),_.push(T.morphTargetsCount),_.push(T.morphAttributeCount),_.push(T.numDirLights),_.push(T.numPointLights),_.push(T.numSpotLights),_.push(T.numSpotLightMaps),_.push(T.numHemiLights),_.push(T.numRectAreaLights),_.push(T.numDirLightShadows),_.push(T.numPointLightShadows),_.push(T.numSpotLightShadows),_.push(T.numSpotLightShadowsWithMaps),_.push(T.numLightProbes),_.push(T.shadowMapType),_.push(T.toneMapping),_.push(T.numClippingPlanes),_.push(T.numClipIntersection),_.push(T.depthPacking)}function y(_,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function b(_){const T=d[_.type];let P;if(T){const L=On[T];P=di.clone(L.uniforms)}else P=_.uniforms;return P}function S(_,T){let P=u.get(T);return P!==void 0?++P.usedTimes:(P=new nM(n,T,_,s),l.push(P),u.set(T,P)),P}function A(_){if(--_.usedTimes===0){const T=l.indexOf(_);l[T]=l[l.length-1],l.pop(),u.delete(_.cacheKey),_.destroy()}}function E(_){o.remove(_)}function R(){o.dispose()}return{getParameters:x,getProgramCacheKey:f,getUniforms:b,acquireProgram:S,releaseProgram:A,releaseShaderCache:E,programs:l,dispose:R}}function cM(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function lM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Kd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Yd(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(h){let d=0;return h.isInstancedMesh&&(d+=2),h.isSkinnedMesh&&(d+=1),d}function o(h,d,g,x,f,m){let y=n[e];return y===void 0?(y={id:h.id,object:h,geometry:d,material:g,materialVariant:a(h),groupOrder:x,renderOrder:h.renderOrder,z:f,group:m},n[e]=y):(y.id=h.id,y.object=h,y.geometry=d,y.material=g,y.materialVariant=a(h),y.groupOrder=x,y.renderOrder=h.renderOrder,y.z=f,y.group=m),e++,y}function c(h,d,g,x,f,m){const y=o(h,d,g,x,f,m);g.transmission>0?i.push(y):g.transparent===!0?s.push(y):t.push(y)}function l(h,d,g,x,f,m){const y=o(h,d,g,x,f,m);g.transmission>0?i.unshift(y):g.transparent===!0?s.unshift(y):t.unshift(y)}function u(h,d,g){t.length>1&&t.sort(h||lM),i.length>1&&i.sort(d||Kd),s.length>1&&s.sort(d||Kd),g&&(t.reverse(),i.reverse(),s.reverse())}function p(){for(let h=e,d=n.length;h<d;h++){const g=n[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:p,sort:u}}function hM(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Yd,n.set(i,[a])):s>=r.length?(a=new Yd,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function uM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Be};break;case"SpotLight":t={position:new D,direction:new D,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":t={color:new Be,position:new D,halfWidth:new D,halfHeight:new D};break}return n[e.id]=t,t}}}function dM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let fM=0;function pM(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function mM(n){const e=new uM,t=dM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new D);const s=new D,r=new je,a=new je;function o(l){let u=0,p=0,h=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let d=0,g=0,x=0,f=0,m=0,y=0,b=0,S=0,A=0,E=0,R=0;l.sort(pM);for(let T=0,P=l.length;T<P;T++){const L=l[T],k=L.color,Y=L.intensity,q=L.distance;let G=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Pi?G=L.shadow.map.texture:G=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)u+=k.r*Y,p+=k.g*Y,h+=k.b*Y;else if(L.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(L.sh.coefficients[J],Y);R++}else if(L.isDirectionalLight){const J=e.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const K=L.shadow,ee=t.get(L);ee.shadowIntensity=K.intensity,ee.shadowBias=K.bias,ee.shadowNormalBias=K.normalBias,ee.shadowRadius=K.radius,ee.shadowMapSize=K.mapSize,i.directionalShadow[d]=ee,i.directionalShadowMap[d]=G,i.directionalShadowMatrix[d]=L.shadow.matrix,y++}i.directional[d]=J,d++}else if(L.isSpotLight){const J=e.get(L);J.position.setFromMatrixPosition(L.matrixWorld),J.color.copy(k).multiplyScalar(Y),J.distance=q,J.coneCos=Math.cos(L.angle),J.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),J.decay=L.decay,i.spot[x]=J;const K=L.shadow;if(L.map&&(i.spotLightMap[A]=L.map,A++,K.updateMatrices(L),L.castShadow&&E++),i.spotLightMatrix[x]=K.matrix,L.castShadow){const ee=t.get(L);ee.shadowIntensity=K.intensity,ee.shadowBias=K.bias,ee.shadowNormalBias=K.normalBias,ee.shadowRadius=K.radius,ee.shadowMapSize=K.mapSize,i.spotShadow[x]=ee,i.spotShadowMap[x]=G,S++}x++}else if(L.isRectAreaLight){const J=e.get(L);J.color.copy(k).multiplyScalar(Y),J.halfWidth.set(L.width*.5,0,0),J.halfHeight.set(0,L.height*.5,0),i.rectArea[f]=J,f++}else if(L.isPointLight){const J=e.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity),J.distance=L.distance,J.decay=L.decay,L.castShadow){const K=L.shadow,ee=t.get(L);ee.shadowIntensity=K.intensity,ee.shadowBias=K.bias,ee.shadowNormalBias=K.normalBias,ee.shadowRadius=K.radius,ee.shadowMapSize=K.mapSize,ee.shadowCameraNear=K.camera.near,ee.shadowCameraFar=K.camera.far,i.pointShadow[g]=ee,i.pointShadowMap[g]=G,i.pointShadowMatrix[g]=L.shadow.matrix,b++}i.point[g]=J,g++}else if(L.isHemisphereLight){const J=e.get(L);J.skyColor.copy(L.color).multiplyScalar(Y),J.groundColor.copy(L.groundColor).multiplyScalar(Y),i.hemi[m]=J,m++}}f>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_e.LTC_FLOAT_1,i.rectAreaLTC2=_e.LTC_FLOAT_2):(i.rectAreaLTC1=_e.LTC_HALF_1,i.rectAreaLTC2=_e.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=p,i.ambient[2]=h;const _=i.hash;(_.directionalLength!==d||_.pointLength!==g||_.spotLength!==x||_.rectAreaLength!==f||_.hemiLength!==m||_.numDirectionalShadows!==y||_.numPointShadows!==b||_.numSpotShadows!==S||_.numSpotMaps!==A||_.numLightProbes!==R)&&(i.directional.length=d,i.spot.length=x,i.rectArea.length=f,i.point.length=g,i.hemi.length=m,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=S+A-E,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=R,_.directionalLength=d,_.pointLength=g,_.spotLength=x,_.rectAreaLength=f,_.hemiLength=m,_.numDirectionalShadows=y,_.numPointShadows=b,_.numSpotShadows=S,_.numSpotMaps=A,_.numLightProbes=R,i.version=fM++)}function c(l,u){let p=0,h=0,d=0,g=0,x=0;const f=u.matrixWorldInverse;for(let m=0,y=l.length;m<y;m++){const b=l[m];if(b.isDirectionalLight){const S=i.directional[p];S.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(f),p++}else if(b.isSpotLight){const S=i.spot[d];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(f),S.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(f),d++}else if(b.isRectAreaLight){const S=i.rectArea[g];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(f),a.identity(),r.copy(b.matrixWorld),r.premultiply(f),a.extractRotation(r),S.halfWidth.set(b.width*.5,0,0),S.halfHeight.set(0,b.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const S=i.point[h];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(f),h++}else if(b.isHemisphereLight){const S=i.hemi[x];S.direction.setFromMatrixPosition(b.matrixWorld),S.direction.transformDirection(f),x++}}}return{setup:o,setupView:c,state:i}}function qd(n){const e=new mM(n),t=[],i=[],s=[];function r(h){p.camera=h,t.length=0,i.length=0,s.length=0}function a(h){t.push(h)}function o(h){i.push(h)}function c(h){s.push(h)}function l(){e.setup(t)}function u(h){e.setupView(t,h)}const p={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:p,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function gM(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new qd(n),e.set(s,[o])):r>=a.length?(o=new qd(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const xM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vM=`uniform sampler2D shadow_pass;
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
}`,_M=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],SM=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],Jd=new je,fr=new D,Al=new D;function MM(n,e,t){let i=new il;const s=new ue,r=new ue,a=new at,o=new ox,c=new cx,l={},u=t.maxTextureSize,p={[ii]:Jt,[Jt]:ii,[Rn]:Rn},h=new Dt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:xM,fragmentShader:vM}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new Gt;g.setAttribute("position",new fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new pt(g,h),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wr;let m=this.type;this.render=function(E,R,_){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||E.length===0)return;this.type===qh&&(Oe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=wr);const T=n.getRenderTarget(),P=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),k=n.state;k.setBlending(Cn),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const Y=m!==this.type;Y&&R.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(G=>G.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,G=E.length;q<G;q++){const J=E[q],K=J.shadow;if(K===void 0){Oe("WebGLShadowMap:",J,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;s.copy(K.mapSize);const ee=K.getFrameExtents();s.multiply(ee),r.copy(K.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ee.x),s.x=r.x*ee.x,K.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ee.y),s.y=r.y*ee.y,K.mapSize.y=r.y));const se=n.state.buffers.depth.getReversed();if(K.camera._reversedDepth=se,K.map===null||Y===!0){if(K.map!==null&&(K.map.depthTexture!==null&&(K.map.depthTexture.dispose(),K.map.depthTexture=null),K.map.dispose()),this.type===Ws){if(J.isPointLight){Oe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}K.map=new Vt(s.x,s.y,{format:Pi,type:Zt,minFilter:Bt,magFilter:Bt,generateMipmaps:!1}),K.map.texture.name=J.name+".shadowMap",K.map.depthTexture=new _s(s.x,s.y,un),K.map.depthTexture.name=J.name+".shadowMapDepth",K.map.depthTexture.format=Xn,K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Lt,K.map.depthTexture.magFilter=Lt}else J.isPointLight?(K.map=new Rd(s.x),K.map.depthTexture=new Eg(s.x,Pn)):(K.map=new Vt(s.x,s.y),K.map.depthTexture=new _s(s.x,s.y,Pn)),K.map.depthTexture.name=J.name+".shadowMap",K.map.depthTexture.format=Xn,this.type===wr?(K.map.depthTexture.compareFunction=se?Ec:bc,K.map.depthTexture.minFilter=Bt,K.map.depthTexture.magFilter=Bt):(K.map.depthTexture.compareFunction=null,K.map.depthTexture.minFilter=Lt,K.map.depthTexture.magFilter=Lt);K.camera.updateProjectionMatrix()}const de=K.map.isWebGLCubeRenderTarget?6:1;for(let C=0;C<de;C++){if(K.map.isWebGLCubeRenderTarget)n.setRenderTarget(K.map,C),n.clear();else{C===0&&(n.setRenderTarget(K.map),n.clear());const N=K.getViewport(C);a.set(r.x*N.x,r.y*N.y,r.x*N.z,r.y*N.w),k.viewport(a)}if(J.isPointLight){const N=K.camera,Z=K.matrix,me=J.distance||N.far;me!==N.far&&(N.far=me,N.updateProjectionMatrix()),fr.setFromMatrixPosition(J.matrixWorld),N.position.copy(fr),Al.copy(N.position),Al.add(_M[C]),N.up.copy(SM[C]),N.lookAt(Al),N.updateMatrixWorld(),Z.makeTranslation(-fr.x,-fr.y,-fr.z),Jd.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),K._frustum.setFromProjectionMatrix(Jd,N.coordinateSystem,N.reversedDepth)}else K.updateMatrices(J);i=K.getFrustum(),S(R,_,K.camera,J,this.type)}K.isPointLightShadow!==!0&&this.type===Ws&&y(K,_),K.needsUpdate=!1}m=this.type,f.needsUpdate=!1,n.setRenderTarget(T,P,L)};function y(E,R){const _=e.update(x);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Vt(s.x,s.y,{format:Pi,type:Zt})),h.uniforms.shadow_pass.value=E.map.depthTexture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(R,null,_,h,x,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(R,null,_,d,x,null)}function b(E,R,_,T){let P=null;const L=_.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(L!==void 0)P=L;else if(P=_.isPointLight===!0?c:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const k=P.uuid,Y=R.uuid;let q=l[k];q===void 0&&(q={},l[k]=q);let G=q[Y];G===void 0&&(G=P.clone(),q[Y]=G,R.addEventListener("dispose",A)),P=G}if(P.visible=R.visible,P.wireframe=R.wireframe,T===Ws?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:p[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,_.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const k=n.properties.get(P);k.light=_}return P}function S(E,R,_,T,P){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&P===Ws)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,E.matrixWorld);const Y=e.update(E),q=E.material;if(Array.isArray(q)){const G=Y.groups;for(let J=0,K=G.length;J<K;J++){const ee=G[J],se=q[ee.materialIndex];if(se&&se.visible){const de=b(E,se,T,P);E.onBeforeShadow(n,E,R,_,Y,de,ee),n.renderBufferDirect(_,null,Y,de,E,ee),E.onAfterShadow(n,E,R,_,Y,de,ee)}}}else if(q.visible){const G=b(E,q,T,P);E.onBeforeShadow(n,E,R,_,Y,G,null),n.renderBufferDirect(_,null,Y,G,E,null),E.onAfterShadow(n,E,R,_,Y,G,null)}}const k=E.children;for(let Y=0,q=k.length;Y<q;Y++)S(k[Y],R,_,T,P)}function A(E){E.target.removeEventListener("dispose",A);for(const _ in l){const T=l[_],P=E.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function yM(n,e){function t(){let I=!1;const fe=new at;let te=null;const ve=new at(0,0,0,0);return{setMask:function(be){te!==be&&!I&&(n.colorMask(be,be,be,be),te=be)},setLocked:function(be){I=be},setClear:function(be,ae,Le,Re,St){St===!0&&(be*=Re,ae*=Re,Le*=Re),fe.set(be,ae,Le,Re),ve.equals(fe)===!1&&(n.clearColor(be,ae,Le,Re),ve.copy(fe))},reset:function(){I=!1,te=null,ve.set(-1,0,0,0)}}}function i(){let I=!1,fe=!1,te=null,ve=null,be=null;return{setReversed:function(ae){if(fe!==ae){const Le=e.get("EXT_clip_control");ae?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),fe=ae;const Re=be;be=null,this.setClear(Re)}},getReversed:function(){return fe},setTest:function(ae){ae?ie(n.DEPTH_TEST):he(n.DEPTH_TEST)},setMask:function(ae){te!==ae&&!I&&(n.depthMask(ae),te=ae)},setFunc:function(ae){if(fe&&(ae=qm[ae]),ve!==ae){switch(ae){case yo:n.depthFunc(n.NEVER);break;case bo:n.depthFunc(n.ALWAYS);break;case Eo:n.depthFunc(n.LESS);break;case ts:n.depthFunc(n.LEQUAL);break;case Ao:n.depthFunc(n.EQUAL);break;case To:n.depthFunc(n.GEQUAL);break;case wo:n.depthFunc(n.GREATER);break;case Ro:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ve=ae}},setLocked:function(ae){I=ae},setClear:function(ae){be!==ae&&(be=ae,fe&&(ae=1-ae),n.clearDepth(ae))},reset:function(){I=!1,te=null,ve=null,be=null,fe=!1}}}function s(){let I=!1,fe=null,te=null,ve=null,be=null,ae=null,Le=null,Re=null,St=null;return{setTest:function(dt){I||(dt?ie(n.STENCIL_TEST):he(n.STENCIL_TEST))},setMask:function(dt){fe!==dt&&!I&&(n.stencilMask(dt),fe=dt)},setFunc:function(dt,Bn,Gn){(te!==dt||ve!==Bn||be!==Gn)&&(n.stencilFunc(dt,Bn,Gn),te=dt,ve=Bn,be=Gn)},setOp:function(dt,Bn,Gn){(ae!==dt||Le!==Bn||Re!==Gn)&&(n.stencilOp(dt,Bn,Gn),ae=dt,Le=Bn,Re=Gn)},setLocked:function(dt){I=dt},setClear:function(dt){St!==dt&&(n.clearStencil(dt),St=dt)},reset:function(){I=!1,fe=null,te=null,ve=null,be=null,ae=null,Le=null,Re=null,St=null}}}const r=new t,a=new i,o=new s,c=new WeakMap,l=new WeakMap;let u={},p={},h={},d=new WeakMap,g=[],x=null,f=!1,m=null,y=null,b=null,S=null,A=null,E=null,R=null,_=new Be(0,0,0),T=0,P=!1,L=null,k=null,Y=null,q=null,G=null;const J=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,ee=0;const se=n.getParameter(n.VERSION);se.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(se)[1]),K=ee>=1):se.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(se)[1]),K=ee>=2);let de=null,C={};const N=n.getParameter(n.SCISSOR_BOX),Z=n.getParameter(n.VIEWPORT),me=new at().fromArray(N),oe=new at().fromArray(Z);function F(I,fe,te,ve){const be=new Uint8Array(4),ae=n.createTexture();n.bindTexture(I,ae),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Le=0;Le<te;Le++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(fe,0,n.RGBA,1,1,ve,0,n.RGBA,n.UNSIGNED_BYTE,be):n.texImage2D(fe+Le,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,be);return ae}const re={};re[n.TEXTURE_2D]=F(n.TEXTURE_2D,n.TEXTURE_2D,1),re[n.TEXTURE_CUBE_MAP]=F(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),re[n.TEXTURE_2D_ARRAY]=F(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),re[n.TEXTURE_3D]=F(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ie(n.DEPTH_TEST),a.setFunc(ts),Rt(!1),Ot(Yh),ie(n.CULL_FACE),tt(Cn);function ie(I){u[I]!==!0&&(n.enable(I),u[I]=!0)}function he(I){u[I]!==!1&&(n.disable(I),u[I]=!1)}function Ee(I,fe){return h[I]!==fe?(n.bindFramebuffer(I,fe),h[I]=fe,I===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=fe),I===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=fe),!0):!1}function Ae(I,fe){let te=g,ve=!1;if(I){te=d.get(fe),te===void 0&&(te=[],d.set(fe,te));const be=I.textures;if(te.length!==be.length||te[0]!==n.COLOR_ATTACHMENT0){for(let ae=0,Le=be.length;ae<Le;ae++)te[ae]=n.COLOR_ATTACHMENT0+ae;te.length=be.length,ve=!0}}else te[0]!==n.BACK&&(te[0]=n.BACK,ve=!0);ve&&n.drawBuffers(te)}function Ve(I){return x!==I?(n.useProgram(I),x=I,!0):!1}const Ue={[wi]:n.FUNC_ADD,[gm]:n.FUNC_SUBTRACT,[xm]:n.FUNC_REVERSE_SUBTRACT};Ue[vm]=n.MIN,Ue[_m]=n.MAX;const it={[Sm]:n.ZERO,[Mm]:n.ONE,[ym]:n.SRC_COLOR,[So]:n.SRC_ALPHA,[Rm]:n.SRC_ALPHA_SATURATE,[Tm]:n.DST_COLOR,[Em]:n.DST_ALPHA,[bm]:n.ONE_MINUS_SRC_COLOR,[Mo]:n.ONE_MINUS_SRC_ALPHA,[wm]:n.ONE_MINUS_DST_COLOR,[Am]:n.ONE_MINUS_DST_ALPHA,[Cm]:n.CONSTANT_COLOR,[Lm]:n.ONE_MINUS_CONSTANT_COLOR,[Pm]:n.CONSTANT_ALPHA,[Dm]:n.ONE_MINUS_CONSTANT_ALPHA};function tt(I,fe,te,ve,be,ae,Le,Re,St,dt){if(I===Cn){f===!0&&(he(n.BLEND),f=!1);return}if(f===!1&&(ie(n.BLEND),f=!0),I!==mm){if(I!==m||dt!==P){if((y!==wi||A!==wi)&&(n.blendEquation(n.FUNC_ADD),y=wi,A=wi),dt)switch(I){case es:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case _o:n.blendFunc(n.ONE,n.ONE);break;case Jh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Zh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:et("WebGLState: Invalid blending: ",I);break}else switch(I){case es:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case _o:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Jh:et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Zh:et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:et("WebGLState: Invalid blending: ",I);break}b=null,S=null,E=null,R=null,_.set(0,0,0),T=0,m=I,P=dt}return}be=be||fe,ae=ae||te,Le=Le||ve,(fe!==y||be!==A)&&(n.blendEquationSeparate(Ue[fe],Ue[be]),y=fe,A=be),(te!==b||ve!==S||ae!==E||Le!==R)&&(n.blendFuncSeparate(it[te],it[ve],it[ae],it[Le]),b=te,S=ve,E=ae,R=Le),(Re.equals(_)===!1||St!==T)&&(n.blendColor(Re.r,Re.g,Re.b,St),_.copy(Re),T=St),m=I,P=!1}function $e(I,fe){I.side===Rn?he(n.CULL_FACE):ie(n.CULL_FACE);let te=I.side===Jt;fe&&(te=!te),Rt(te),I.blending===es&&I.transparent===!1?tt(Cn):tt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const ve=I.stencilWrite;o.setTest(ve),ve&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),zt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ie(n.SAMPLE_ALPHA_TO_COVERAGE):he(n.SAMPLE_ALPHA_TO_COVERAGE)}function Rt(I){L!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),L=I)}function Ot(I){I!==fm?(ie(n.CULL_FACE),I!==k&&(I===Yh?n.cullFace(n.BACK):I===pm?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):he(n.CULL_FACE),k=I}function Ft(I){I!==Y&&(K&&n.lineWidth(I),Y=I)}function zt(I,fe,te){I?(ie(n.POLYGON_OFFSET_FILL),(q!==fe||G!==te)&&(q=fe,G=te,a.getReversed()&&(fe=-fe),n.polygonOffset(fe,te))):he(n.POLYGON_OFFSET_FILL)}function _t(I){I?ie(n.SCISSOR_TEST):he(n.SCISSOR_TEST)}function Ct(I){I===void 0&&(I=n.TEXTURE0+J-1),de!==I&&(n.activeTexture(I),de=I)}function O(I,fe,te){te===void 0&&(de===null?te=n.TEXTURE0+J-1:te=de);let ve=C[te];ve===void 0&&(ve={type:void 0,texture:void 0},C[te]=ve),(ve.type!==I||ve.texture!==fe)&&(de!==te&&(n.activeTexture(te),de=te),n.bindTexture(I,fe||re[I]),ve.type=I,ve.texture=fe)}function nn(){const I=C[de];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function rt(){try{n.compressedTexImage2D(...arguments)}catch(I){et("WebGLState:",I)}}function w(){try{n.compressedTexImage3D(...arguments)}catch(I){et("WebGLState:",I)}}function v(){try{n.texSubImage2D(...arguments)}catch(I){et("WebGLState:",I)}}function B(){try{n.texSubImage3D(...arguments)}catch(I){et("WebGLState:",I)}}function W(){try{n.compressedTexSubImage2D(...arguments)}catch(I){et("WebGLState:",I)}}function Q(){try{n.compressedTexSubImage3D(...arguments)}catch(I){et("WebGLState:",I)}}function le(){try{n.texStorage2D(...arguments)}catch(I){et("WebGLState:",I)}}function pe(){try{n.texStorage3D(...arguments)}catch(I){et("WebGLState:",I)}}function j(){try{n.texImage2D(...arguments)}catch(I){et("WebGLState:",I)}}function ne(){try{n.texImage3D(...arguments)}catch(I){et("WebGLState:",I)}}function ge(I){return p[I]!==void 0?p[I]:n.getParameter(I)}function Pe(I,fe){p[I]!==fe&&(n.pixelStorei(I,fe),p[I]=fe)}function Se(I){me.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),me.copy(I))}function xe(I){oe.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),oe.copy(I))}function Ne(I,fe){let te=l.get(fe);te===void 0&&(te=new WeakMap,l.set(fe,te));let ve=te.get(I);ve===void 0&&(ve=n.getUniformBlockIndex(fe,I.name),te.set(I,ve))}function ke(I,fe){const ve=l.get(fe).get(I);c.get(fe)!==ve&&(n.uniformBlockBinding(fe,ve,I.__bindingPointIndex),c.set(fe,ve))}function We(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},p={},de=null,C={},h={},d=new WeakMap,g=[],x=null,f=!1,m=null,y=null,b=null,S=null,A=null,E=null,R=null,_=new Be(0,0,0),T=0,P=!1,L=null,k=null,Y=null,q=null,G=null,me.set(0,0,n.canvas.width,n.canvas.height),oe.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ie,disable:he,bindFramebuffer:Ee,drawBuffers:Ae,useProgram:Ve,setBlending:tt,setMaterial:$e,setFlipSided:Rt,setCullFace:Ot,setLineWidth:Ft,setPolygonOffset:zt,setScissorTest:_t,activeTexture:Ct,bindTexture:O,unbindTexture:nn,compressedTexImage2D:rt,compressedTexImage3D:w,texImage2D:j,texImage3D:ne,pixelStorei:Pe,getParameter:ge,updateUBOMapping:Ne,uniformBlockBinding:ke,texStorage2D:le,texStorage3D:pe,texSubImage2D:v,texSubImage3D:B,compressedTexSubImage2D:W,compressedTexSubImage3D:Q,scissor:Se,viewport:xe,reset:We}}function bM(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ue,u=new WeakMap,p=new Set;let h;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(w,v){return g?new OffscreenCanvas(w,v):Gr("canvas")}function f(w,v,B){let W=1;const Q=rt(w);if((Q.width>B||Q.height>B)&&(W=B/Math.max(Q.width,Q.height)),W<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const le=Math.floor(W*Q.width),pe=Math.floor(W*Q.height);h===void 0&&(h=x(le,pe));const j=v?x(le,pe):h;return j.width=le,j.height=pe,j.getContext("2d").drawImage(w,0,0,le,pe),Oe("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+le+"x"+pe+")."),j}else return"data"in w&&Oe("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),w;return w}function m(w){return w.generateMipmaps}function y(w){n.generateMipmap(w)}function b(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(w,v,B,W,Q,le=!1){if(w!==null){if(n[w]!==void 0)return n[w];Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let pe;W&&(pe=e.get("EXT_texture_norm16"),pe||Oe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=v;if(v===n.RED&&(B===n.FLOAT&&(j=n.R32F),B===n.HALF_FLOAT&&(j=n.R16F),B===n.UNSIGNED_BYTE&&(j=n.R8),B===n.UNSIGNED_SHORT&&pe&&(j=pe.R16_EXT),B===n.SHORT&&pe&&(j=pe.R16_SNORM_EXT)),v===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.R8UI),B===n.UNSIGNED_SHORT&&(j=n.R16UI),B===n.UNSIGNED_INT&&(j=n.R32UI),B===n.BYTE&&(j=n.R8I),B===n.SHORT&&(j=n.R16I),B===n.INT&&(j=n.R32I)),v===n.RG&&(B===n.FLOAT&&(j=n.RG32F),B===n.HALF_FLOAT&&(j=n.RG16F),B===n.UNSIGNED_BYTE&&(j=n.RG8),B===n.UNSIGNED_SHORT&&pe&&(j=pe.RG16_EXT),B===n.SHORT&&pe&&(j=pe.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.RG8UI),B===n.UNSIGNED_SHORT&&(j=n.RG16UI),B===n.UNSIGNED_INT&&(j=n.RG32UI),B===n.BYTE&&(j=n.RG8I),B===n.SHORT&&(j=n.RG16I),B===n.INT&&(j=n.RG32I)),v===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.RGB8UI),B===n.UNSIGNED_SHORT&&(j=n.RGB16UI),B===n.UNSIGNED_INT&&(j=n.RGB32UI),B===n.BYTE&&(j=n.RGB8I),B===n.SHORT&&(j=n.RGB16I),B===n.INT&&(j=n.RGB32I)),v===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),B===n.UNSIGNED_INT&&(j=n.RGBA32UI),B===n.BYTE&&(j=n.RGBA8I),B===n.SHORT&&(j=n.RGBA16I),B===n.INT&&(j=n.RGBA32I)),v===n.RGB&&(B===n.UNSIGNED_SHORT&&pe&&(j=pe.RGB16_EXT),B===n.SHORT&&pe&&(j=pe.RGB16_SNORM_EXT),B===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(j=n.R11F_G11F_B10F)),v===n.RGBA){const ne=le?Br:Qe.getTransfer(Q);B===n.FLOAT&&(j=n.RGBA32F),B===n.HALF_FLOAT&&(j=n.RGBA16F),B===n.UNSIGNED_BYTE&&(j=ne===st?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT&&pe&&(j=pe.RGBA16_EXT),B===n.SHORT&&pe&&(j=pe.RGBA16_SNORM_EXT),B===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function A(w,v){let B;return w?v===null||v===Pn||v===Ys?B=n.DEPTH24_STENCIL8:v===un?B=n.DEPTH32F_STENCIL8:v===Ks&&(B=n.DEPTH24_STENCIL8,Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Pn||v===Ys?B=n.DEPTH_COMPONENT24:v===un?B=n.DEPTH_COMPONENT32F:v===Ks&&(B=n.DEPTH_COMPONENT16),B}function E(w,v){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Lt&&w.minFilter!==Bt?Math.log2(Math.max(v.width,v.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?v.mipmaps.length:1}function R(w){const v=w.target;v.removeEventListener("dispose",R),T(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&p.delete(v)}function _(w){const v=w.target;v.removeEventListener("dispose",_),L(v)}function T(w){const v=i.get(w);if(v.__webglInit===void 0)return;const B=w.source,W=d.get(B);if(W){const Q=W[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&P(w),Object.keys(W).length===0&&d.delete(B)}i.remove(w)}function P(w){const v=i.get(w);n.deleteTexture(v.__webglTexture);const B=w.source,W=d.get(B);delete W[v.__cacheKey],a.memory.textures--}function L(w){const v=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(v.__webglFramebuffer[W]))for(let Q=0;Q<v.__webglFramebuffer[W].length;Q++)n.deleteFramebuffer(v.__webglFramebuffer[W][Q]);else n.deleteFramebuffer(v.__webglFramebuffer[W]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[W])}else{if(Array.isArray(v.__webglFramebuffer))for(let W=0;W<v.__webglFramebuffer.length;W++)n.deleteFramebuffer(v.__webglFramebuffer[W]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let W=0;W<v.__webglColorRenderbuffer.length;W++)v.__webglColorRenderbuffer[W]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[W]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const B=w.textures;for(let W=0,Q=B.length;W<Q;W++){const le=i.get(B[W]);le.__webglTexture&&(n.deleteTexture(le.__webglTexture),a.memory.textures--),i.remove(B[W])}i.remove(w)}let k=0;function Y(){k=0}function q(){return k}function G(w){k=w}function J(){const w=k;return w>=s.maxTextures&&Oe("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),k+=1,w}function K(w){const v=[];return v.push(w.wrapS),v.push(w.wrapT),v.push(w.wrapR||0),v.push(w.magFilter),v.push(w.minFilter),v.push(w.anisotropy),v.push(w.internalFormat),v.push(w.format),v.push(w.type),v.push(w.generateMipmaps),v.push(w.premultiplyAlpha),v.push(w.flipY),v.push(w.unpackAlignment),v.push(w.colorSpace),v.join()}function ee(w,v){const B=i.get(w);if(w.isVideoTexture&&O(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&B.__version!==w.version){const W=w.image;if(W===null)Oe("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Oe("WebGLRenderer: Texture marked for update but image is incomplete");else{he(B,w,v);return}}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+v)}function se(w,v){const B=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){he(B,w,v);return}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+v)}function de(w,v){const B=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){he(B,w,v);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+v)}function C(w,v){const B=i.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&B.__version!==w.version){Ee(B,w,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+v)}const N={[Xs]:n.REPEAT,[Wn]:n.CLAMP_TO_EDGE,[Fo]:n.MIRRORED_REPEAT},Z={[Lt]:n.NEAREST,[Um]:n.NEAREST_MIPMAP_NEAREST,[Lr]:n.NEAREST_MIPMAP_LINEAR,[Bt]:n.LINEAR,[Bo]:n.LINEAR_MIPMAP_NEAREST,[Ci]:n.LINEAR_MIPMAP_LINEAR},me={[Bm]:n.NEVER,[Wm]:n.ALWAYS,[Gm]:n.LESS,[bc]:n.LEQUAL,[zm]:n.EQUAL,[Ec]:n.GEQUAL,[Hm]:n.GREATER,[Vm]:n.NOTEQUAL};function oe(w,v){if(v.type===un&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Bt||v.magFilter===Bo||v.magFilter===Lr||v.magFilter===Ci||v.minFilter===Bt||v.minFilter===Bo||v.minFilter===Lr||v.minFilter===Ci)&&Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,N[v.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,N[v.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,N[v.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,Z[v.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,Z[v.minFilter]),v.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,me[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Lt||v.minFilter!==Lr&&v.minFilter!==Ci||v.type===un&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function F(w,v){let B=!1;w.__webglInit===void 0&&(w.__webglInit=!0,v.addEventListener("dispose",R));const W=v.source;let Q=d.get(W);Q===void 0&&(Q={},d.set(W,Q));const le=K(v);if(le!==w.__cacheKey){Q[le]===void 0&&(Q[le]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Q[le].usedTimes++;const pe=Q[w.__cacheKey];pe!==void 0&&(Q[w.__cacheKey].usedTimes--,pe.usedTimes===0&&P(v)),w.__cacheKey=le,w.__webglTexture=Q[le].texture}return B}function re(w,v,B){return Math.floor(Math.floor(w/B)/v)}function ie(w,v,B,W){const le=w.updateRanges;if(le.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,B,W,v.data);else{le.sort((Pe,Se)=>Pe.start-Se.start);let pe=0;for(let Pe=1;Pe<le.length;Pe++){const Se=le[pe],xe=le[Pe],Ne=Se.start+Se.count,ke=re(xe.start,v.width,4),We=re(Se.start,v.width,4);xe.start<=Ne+1&&ke===We&&re(xe.start+xe.count-1,v.width,4)===ke?Se.count=Math.max(Se.count,xe.start+xe.count-Se.start):(++pe,le[pe]=xe)}le.length=pe+1;const j=t.getParameter(n.UNPACK_ROW_LENGTH),ne=t.getParameter(n.UNPACK_SKIP_PIXELS),ge=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let Pe=0,Se=le.length;Pe<Se;Pe++){const xe=le[Pe],Ne=Math.floor(xe.start/4),ke=Math.ceil(xe.count/4),We=Ne%v.width,I=Math.floor(Ne/v.width),fe=ke,te=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,We),t.pixelStorei(n.UNPACK_SKIP_ROWS,I),t.texSubImage2D(n.TEXTURE_2D,0,We,I,fe,te,B,W,v.data)}w.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,j),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ne),t.pixelStorei(n.UNPACK_SKIP_ROWS,ge)}}function he(w,v,B){let W=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(W=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(W=n.TEXTURE_3D);const Q=F(w,v),le=v.source;t.bindTexture(W,w.__webglTexture,n.TEXTURE0+B);const pe=i.get(le);if(le.version!==pe.__version||Q===!0){if(t.activeTexture(n.TEXTURE0+B),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const te=Qe.getPrimaries(Qe.workingColorSpace),ve=v.colorSpace===si?null:Qe.getPrimaries(v.colorSpace),be=v.colorSpace===si||te===ve?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let ne=f(v.image,!1,s.maxTextureSize);ne=nn(v,ne);const ge=r.convert(v.format,v.colorSpace),Pe=r.convert(v.type);let Se=S(v.internalFormat,ge,Pe,v.normalized,v.colorSpace,v.isVideoTexture);oe(W,v);let xe;const Ne=v.mipmaps,ke=v.isVideoTexture!==!0,We=pe.__version===void 0||Q===!0,I=le.dataReady,fe=E(v,ne);if(v.isDepthTexture)Se=A(v.format===Li,v.type),We&&(ke?t.texStorage2D(n.TEXTURE_2D,1,Se,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,Se,ne.width,ne.height,0,ge,Pe,null));else if(v.isDataTexture)if(Ne.length>0){ke&&We&&t.texStorage2D(n.TEXTURE_2D,fe,Se,Ne[0].width,Ne[0].height);for(let te=0,ve=Ne.length;te<ve;te++)xe=Ne[te],ke?I&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,xe.width,xe.height,ge,Pe,xe.data):t.texImage2D(n.TEXTURE_2D,te,Se,xe.width,xe.height,0,ge,Pe,xe.data);v.generateMipmaps=!1}else ke?(We&&t.texStorage2D(n.TEXTURE_2D,fe,Se,ne.width,ne.height),I&&ie(v,ne,ge,Pe)):t.texImage2D(n.TEXTURE_2D,0,Se,ne.width,ne.height,0,ge,Pe,ne.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){ke&&We&&t.texStorage3D(n.TEXTURE_2D_ARRAY,fe,Se,Ne[0].width,Ne[0].height,ne.depth);for(let te=0,ve=Ne.length;te<ve;te++)if(xe=Ne[te],v.format!==dn)if(ge!==null)if(ke){if(I)if(v.layerUpdates.size>0){const be=Sd(xe.width,xe.height,v.format,v.type);for(const ae of v.layerUpdates){const Le=xe.data.subarray(ae*be/xe.data.BYTES_PER_ELEMENT,(ae+1)*be/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,ae,xe.width,xe.height,1,ge,Le)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,xe.width,xe.height,ne.depth,ge,xe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,te,Se,xe.width,xe.height,ne.depth,0,xe.data,0,0);else Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ke?I&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,xe.width,xe.height,ne.depth,ge,Pe,xe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,te,Se,xe.width,xe.height,ne.depth,0,ge,Pe,xe.data)}else{ke&&We&&t.texStorage2D(n.TEXTURE_2D,fe,Se,Ne[0].width,Ne[0].height);for(let te=0,ve=Ne.length;te<ve;te++)xe=Ne[te],v.format!==dn?ge!==null?ke?I&&t.compressedTexSubImage2D(n.TEXTURE_2D,te,0,0,xe.width,xe.height,ge,xe.data):t.compressedTexImage2D(n.TEXTURE_2D,te,Se,xe.width,xe.height,0,xe.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?I&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,xe.width,xe.height,ge,Pe,xe.data):t.texImage2D(n.TEXTURE_2D,te,Se,xe.width,xe.height,0,ge,Pe,xe.data)}else if(v.isDataArrayTexture)if(ke){if(We&&t.texStorage3D(n.TEXTURE_2D_ARRAY,fe,Se,ne.width,ne.height,ne.depth),I)if(v.layerUpdates.size>0){const te=Sd(ne.width,ne.height,v.format,v.type);for(const ve of v.layerUpdates){const be=ne.data.subarray(ve*te/ne.data.BYTES_PER_ELEMENT,(ve+1)*te/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ve,ne.width,ne.height,1,ge,Pe,be)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,ge,Pe,ne.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Se,ne.width,ne.height,ne.depth,0,ge,Pe,ne.data);else if(v.isData3DTexture)ke?(We&&t.texStorage3D(n.TEXTURE_3D,fe,Se,ne.width,ne.height,ne.depth),I&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,ge,Pe,ne.data)):t.texImage3D(n.TEXTURE_3D,0,Se,ne.width,ne.height,ne.depth,0,ge,Pe,ne.data);else if(v.isFramebufferTexture){if(We)if(ke)t.texStorage2D(n.TEXTURE_2D,fe,Se,ne.width,ne.height);else{let te=ne.width,ve=ne.height;for(let be=0;be<fe;be++)t.texImage2D(n.TEXTURE_2D,be,Se,te,ve,0,ge,Pe,null),te>>=1,ve>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){const te=n.canvas;if(te.hasAttribute("layoutsubtree")||te.setAttribute("layoutsubtree","true"),ne.parentNode!==te){te.appendChild(ne),p.add(v),te.onpaint=ve=>{const be=ve.changedElements;for(const ae of p)be.includes(ae.image)&&(ae.needsUpdate=!0)},te.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ne);else{const be=n.RGBA,ae=n.RGBA,Le=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,be,ae,Le,ne)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ne.length>0){if(ke&&We){const te=rt(Ne[0]);t.texStorage2D(n.TEXTURE_2D,fe,Se,te.width,te.height)}for(let te=0,ve=Ne.length;te<ve;te++)xe=Ne[te],ke?I&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,ge,Pe,xe):t.texImage2D(n.TEXTURE_2D,te,Se,ge,Pe,xe);v.generateMipmaps=!1}else if(ke){if(We){const te=rt(ne);t.texStorage2D(n.TEXTURE_2D,fe,Se,te.width,te.height)}I&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ge,Pe,ne)}else t.texImage2D(n.TEXTURE_2D,0,Se,ge,Pe,ne);m(v)&&y(W),pe.__version=le.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function Ee(w,v,B){if(v.image.length!==6)return;const W=F(w,v),Q=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+B);const le=i.get(Q);if(Q.version!==le.__version||W===!0){t.activeTexture(n.TEXTURE0+B);const pe=Qe.getPrimaries(Qe.workingColorSpace),j=v.colorSpace===si?null:Qe.getPrimaries(v.colorSpace),ne=v.colorSpace===si||pe===j?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);const ge=v.isCompressedTexture||v.image[0].isCompressedTexture,Pe=v.image[0]&&v.image[0].isDataTexture,Se=[];for(let ae=0;ae<6;ae++)!ge&&!Pe?Se[ae]=f(v.image[ae],!0,s.maxCubemapSize):Se[ae]=Pe?v.image[ae].image:v.image[ae],Se[ae]=nn(v,Se[ae]);const xe=Se[0],Ne=r.convert(v.format,v.colorSpace),ke=r.convert(v.type),We=S(v.internalFormat,Ne,ke,v.normalized,v.colorSpace),I=v.isVideoTexture!==!0,fe=le.__version===void 0||W===!0,te=Q.dataReady;let ve=E(v,xe);oe(n.TEXTURE_CUBE_MAP,v);let be;if(ge){I&&fe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ve,We,xe.width,xe.height);for(let ae=0;ae<6;ae++){be=Se[ae].mipmaps;for(let Le=0;Le<be.length;Le++){const Re=be[Le];v.format!==dn?Ne!==null?I?te&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Le,0,0,Re.width,Re.height,Ne,Re.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Le,We,Re.width,Re.height,0,Re.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Le,0,0,Re.width,Re.height,Ne,ke,Re.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Le,We,Re.width,Re.height,0,Ne,ke,Re.data)}}}else{if(be=v.mipmaps,I&&fe){be.length>0&&ve++;const ae=rt(Se[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ve,We,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(Pe){I?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Se[ae].width,Se[ae].height,Ne,ke,Se[ae].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,We,Se[ae].width,Se[ae].height,0,Ne,ke,Se[ae].data);for(let Le=0;Le<be.length;Le++){const St=be[Le].image[ae].image;I?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Le+1,0,0,St.width,St.height,Ne,ke,St.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Le+1,We,St.width,St.height,0,Ne,ke,St.data)}}else{I?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Ne,ke,Se[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,We,Ne,ke,Se[ae]);for(let Le=0;Le<be.length;Le++){const Re=be[Le];I?te&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Le+1,0,0,Ne,ke,Re.image[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Le+1,We,Ne,ke,Re.image[ae])}}}m(v)&&y(n.TEXTURE_CUBE_MAP),le.__version=Q.version,v.onUpdate&&v.onUpdate(v)}w.__version=v.version}function Ae(w,v,B,W,Q,le){const pe=r.convert(B.format,B.colorSpace),j=r.convert(B.type),ne=S(B.internalFormat,pe,j,B.normalized,B.colorSpace),ge=i.get(v),Pe=i.get(B);if(Pe.__renderTarget=v,!ge.__hasExternalTextures){const Se=Math.max(1,v.width>>le),xe=Math.max(1,v.height>>le);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?t.texImage3D(Q,le,ne,Se,xe,v.depth,0,pe,j,null):t.texImage2D(Q,le,ne,Se,xe,0,pe,j,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),Ct(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,W,Q,Pe.__webglTexture,0,_t(v)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,W,Q,Pe.__webglTexture,le),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ve(w,v,B){if(n.bindRenderbuffer(n.RENDERBUFFER,w),v.depthBuffer){const W=v.depthTexture,Q=W&&W.isDepthTexture?W.type:null,le=A(v.stencilBuffer,Q),pe=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Ct(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t(v),le,v.width,v.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t(v),le,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,le,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,pe,n.RENDERBUFFER,w)}else{const W=v.textures;for(let Q=0;Q<W.length;Q++){const le=W[Q],pe=r.convert(le.format,le.colorSpace),j=r.convert(le.type),ne=S(le.internalFormat,pe,j,le.normalized,le.colorSpace);Ct(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t(v),ne,v.width,v.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t(v),ne,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ne,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ue(w,v,B){const W=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Q=i.get(v.depthTexture);if(Q.__renderTarget=v,(!Q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),W){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,v.depthTexture.addEventListener("dispose",R)),Q.__webglTexture===void 0){Q.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Q.__webglTexture),oe(n.TEXTURE_CUBE_MAP,v.depthTexture);const ge=r.convert(v.depthTexture.format),Pe=r.convert(v.depthTexture.type);let Se;v.depthTexture.format===Xn?Se=n.DEPTH_COMPONENT24:v.depthTexture.format===Li&&(Se=n.DEPTH24_STENCIL8);for(let xe=0;xe<6;xe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,Se,v.width,v.height,0,ge,Pe,null)}}else ee(v.depthTexture,0);const le=Q.__webglTexture,pe=_t(v),j=W?n.TEXTURE_CUBE_MAP_POSITIVE_X+B:n.TEXTURE_2D,ne=v.depthTexture.format===Li?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===Xn)Ct(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ne,j,le,0,pe):n.framebufferTexture2D(n.FRAMEBUFFER,ne,j,le,0);else if(v.depthTexture.format===Li)Ct(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ne,j,le,0,pe):n.framebufferTexture2D(n.FRAMEBUFFER,ne,j,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function it(w){const v=i.get(w),B=w.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==w.depthTexture){const W=w.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),W){const Q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,W.removeEventListener("dispose",Q)};W.addEventListener("dispose",Q),v.__depthDisposeCallback=Q}v.__boundDepthTexture=W}if(w.depthTexture&&!v.__autoAllocateDepthBuffer)if(B)for(let W=0;W<6;W++)Ue(v.__webglFramebuffer[W],w,W);else{const W=w.texture.mipmaps;W&&W.length>0?Ue(v.__webglFramebuffer[0],w,0):Ue(v.__webglFramebuffer,w,0)}else if(B){v.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[W]),v.__webglDepthbuffer[W]===void 0)v.__webglDepthbuffer[W]=n.createRenderbuffer(),Ve(v.__webglDepthbuffer[W],w,!1);else{const Q=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer[W];n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,le)}}else{const W=w.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Ve(v.__webglDepthbuffer,w,!1);else{const Q=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,le)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function tt(w,v,B){const W=i.get(w);v!==void 0&&Ae(W.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&it(w)}function $e(w){const v=w.texture,B=i.get(w),W=i.get(v);w.addEventListener("dispose",_);const Q=w.textures,le=w.isWebGLCubeRenderTarget===!0,pe=Q.length>1;if(pe||(W.__webglTexture===void 0&&(W.__webglTexture=n.createTexture()),W.__version=v.version,a.memory.textures++),le){B.__webglFramebuffer=[];for(let j=0;j<6;j++)if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer[j]=[];for(let ne=0;ne<v.mipmaps.length;ne++)B.__webglFramebuffer[j][ne]=n.createFramebuffer()}else B.__webglFramebuffer[j]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer=[];for(let j=0;j<v.mipmaps.length;j++)B.__webglFramebuffer[j]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(pe)for(let j=0,ne=Q.length;j<ne;j++){const ge=i.get(Q[j]);ge.__webglTexture===void 0&&(ge.__webglTexture=n.createTexture(),a.memory.textures++)}if(w.samples>0&&Ct(w)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let j=0;j<Q.length;j++){const ne=Q[j];B.__webglColorRenderbuffer[j]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[j]);const ge=r.convert(ne.format,ne.colorSpace),Pe=r.convert(ne.type),Se=S(ne.internalFormat,ge,Pe,ne.normalized,ne.colorSpace,w.isXRRenderTarget===!0),xe=_t(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,xe,Se,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.RENDERBUFFER,B.__webglColorRenderbuffer[j])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),Ve(B.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(le){t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),oe(n.TEXTURE_CUBE_MAP,v);for(let j=0;j<6;j++)if(v.mipmaps&&v.mipmaps.length>0)for(let ne=0;ne<v.mipmaps.length;ne++)Ae(B.__webglFramebuffer[j][ne],w,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ne);else Ae(B.__webglFramebuffer[j],w,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);m(v)&&y(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(pe){for(let j=0,ne=Q.length;j<ne;j++){const ge=Q[j],Pe=i.get(ge);let Se=n.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Se=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Se,Pe.__webglTexture),oe(Se,ge),Ae(B.__webglFramebuffer,w,ge,n.COLOR_ATTACHMENT0+j,Se,0),m(ge)&&y(Se)}t.unbindTexture()}else{let j=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(j=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(j,W.__webglTexture),oe(j,v),v.mipmaps&&v.mipmaps.length>0)for(let ne=0;ne<v.mipmaps.length;ne++)Ae(B.__webglFramebuffer[ne],w,v,n.COLOR_ATTACHMENT0,j,ne);else Ae(B.__webglFramebuffer,w,v,n.COLOR_ATTACHMENT0,j,0);m(v)&&y(j),t.unbindTexture()}w.depthBuffer&&it(w)}function Rt(w){const v=w.textures;for(let B=0,W=v.length;B<W;B++){const Q=v[B];if(m(Q)){const le=b(w),pe=i.get(Q).__webglTexture;t.bindTexture(le,pe),y(le),t.unbindTexture()}}}const Ot=[],Ft=[];function zt(w){if(w.samples>0){if(Ct(w)===!1){const v=w.textures,B=w.width,W=w.height;let Q=n.COLOR_BUFFER_BIT;const le=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pe=i.get(w),j=v.length>1;if(j)for(let ge=0;ge<v.length;ge++)t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer);const ne=w.texture.mipmaps;ne&&ne.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let ge=0;ge<v.length;ge++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),j){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,pe.__webglColorRenderbuffer[ge]);const Pe=i.get(v[ge]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Pe,0)}n.blitFramebuffer(0,0,B,W,0,0,B,W,Q,n.NEAREST),c===!0&&(Ot.length=0,Ft.length=0,Ot.push(n.COLOR_ATTACHMENT0+ge),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Ot.push(le),Ft.push(le),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ft)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ot))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),j)for(let ge=0;ge<v.length;ge++){t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,pe.__webglColorRenderbuffer[ge]);const Pe=i.get(v[ge]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,Pe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const v=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function _t(w){return Math.min(s.maxSamples,w.samples)}function Ct(w){const v=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function O(w){const v=a.render.frame;u.get(w)!==v&&(u.set(w,v),w.update())}function nn(w,v){const B=w.colorSpace,W=w.format,Q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||B!==Fr&&B!==si&&(Qe.getTransfer(B)===st?(W!==dn||Q!==sn)&&Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):et("WebGLTextures: Unsupported texture color space:",B)),v}function rt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=J,this.resetTextureUnits=Y,this.getTextureUnits=q,this.setTextureUnits=G,this.setTexture2D=ee,this.setTexture2DArray=se,this.setTexture3D=de,this.setTextureCube=C,this.rebindTextures=tt,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=Rt,this.updateMultisampleRenderTarget=zt,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=Ct,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function EM(n,e){function t(i,s=si){let r;const a=Qe.getTransfer(s);if(i===sn)return n.UNSIGNED_BYTE;if(i===zo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Ho)return n.UNSIGNED_SHORT_5_5_5_1;if(i===tu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===nu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===$h)return n.BYTE;if(i===eu)return n.SHORT;if(i===Ks)return n.UNSIGNED_SHORT;if(i===Go)return n.INT;if(i===Pn)return n.UNSIGNED_INT;if(i===un)return n.FLOAT;if(i===Zt)return n.HALF_FLOAT;if(i===iu)return n.ALPHA;if(i===su)return n.RGB;if(i===dn)return n.RGBA;if(i===Xn)return n.DEPTH_COMPONENT;if(i===Li)return n.DEPTH_STENCIL;if(i===Vo)return n.RED;if(i===Wo)return n.RED_INTEGER;if(i===Pi)return n.RG;if(i===Xo)return n.RG_INTEGER;if(i===Ko)return n.RGBA_INTEGER;if(i===Pr||i===Dr||i===Ir||i===Nr)if(a===st)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Pr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Pr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ir)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Nr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Yo||i===qo||i===Jo||i===Zo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Yo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===qo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Jo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Zo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Qo||i===jo||i===$o||i===ec||i===tc||i===Or||i===nc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Qo||i===jo)return a===st?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===$o)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===ec)return r.COMPRESSED_R11_EAC;if(i===tc)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Or)return r.COMPRESSED_RG11_EAC;if(i===nc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ic||i===sc||i===rc||i===ac||i===oc||i===cc||i===lc||i===hc||i===uc||i===dc||i===fc||i===pc||i===mc||i===gc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ic)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===sc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===rc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ac)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===oc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===cc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===lc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===hc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===uc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===dc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===fc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===pc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===mc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===gc)return a===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===xc||i===vc||i===_c)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===xc)return a===st?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===vc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===_c)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Sc||i===Mc||i===Ur||i===yc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Sc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Mc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ur)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===yc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ys?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const AM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,TM=`
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

}`;class wM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Xu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Dt({vertexShader:AM,fragmentShader:TM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pt(new ma(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class RM extends Di{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,p=null,h=null,d=null,g=null;const x=typeof XRWebGLBinding<"u",f=new wM,m={},y=t.getContextAttributes();let b=null,S=null;const A=[],E=[],R=new ue;let _=null;const T=new en;T.viewport=new at;const P=new en;P.viewport=new at;const L=[T,P],k=new gx;let Y=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(F){let re=A[F];return re===void 0&&(re=new Ic,A[F]=re),re.getTargetRaySpace()},this.getControllerGrip=function(F){let re=A[F];return re===void 0&&(re=new Ic,A[F]=re),re.getGripSpace()},this.getHand=function(F){let re=A[F];return re===void 0&&(re=new Ic,A[F]=re),re.getHandSpace()};function G(F){const re=E.indexOf(F.inputSource);if(re===-1)return;const ie=A[re];ie!==void 0&&(ie.update(F.inputSource,F.frame,l||a),ie.dispatchEvent({type:F.type,data:F.inputSource}))}function J(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",J),s.removeEventListener("inputsourceschange",K);for(let F=0;F<A.length;F++){const re=E[F];re!==null&&(E[F]=null,A[F].disconnect(re))}Y=null,q=null,f.reset();for(const F in m)delete m[F];e.setRenderTarget(b),d=null,h=null,p=null,s=null,S=null,oe.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(F){r=F,i.isPresenting===!0&&Oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(F){o=F,i.isPresenting===!0&&Oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(F){l=F},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return p===null&&x&&(p=new XRWebGLBinding(s,t)),p},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(F){if(s=F,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",J),s.addEventListener("inputsourceschange",K),y.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,he=null,Ee=null;y.depth&&(Ee=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=y.stencil?Li:Xn,he=y.stencil?Ys:Pn);const Ae={colorFormat:t.RGBA8,depthFormat:Ee,scaleFactor:r};p=this.getBinding(),h=p.createProjectionLayer(Ae),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new Vt(h.textureWidth,h.textureHeight,{format:dn,type:sn,depthTexture:new _s(h.textureWidth,h.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ie={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,ie),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),S=new Vt(d.framebufferWidth,d.framebufferHeight,{format:dn,type:sn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),oe.setContext(s),oe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function K(F){for(let re=0;re<F.removed.length;re++){const ie=F.removed[re],he=E.indexOf(ie);he>=0&&(E[he]=null,A[he].disconnect(ie))}for(let re=0;re<F.added.length;re++){const ie=F.added[re];let he=E.indexOf(ie);if(he===-1){for(let Ae=0;Ae<A.length;Ae++)if(Ae>=E.length){E.push(ie),he=Ae;break}else if(E[Ae]===null){E[Ae]=ie,he=Ae;break}if(he===-1)break}const Ee=A[he];Ee&&Ee.connect(ie)}}const ee=new D,se=new D;function de(F,re,ie){ee.setFromMatrixPosition(re.matrixWorld),se.setFromMatrixPosition(ie.matrixWorld);const he=ee.distanceTo(se),Ee=re.projectionMatrix.elements,Ae=ie.projectionMatrix.elements,Ve=Ee[14]/(Ee[10]-1),Ue=Ee[14]/(Ee[10]+1),it=(Ee[9]+1)/Ee[5],tt=(Ee[9]-1)/Ee[5],$e=(Ee[8]-1)/Ee[0],Rt=(Ae[8]+1)/Ae[0],Ot=Ve*$e,Ft=Ve*Rt,zt=he/(-$e+Rt),_t=zt*-$e;if(re.matrixWorld.decompose(F.position,F.quaternion,F.scale),F.translateX(_t),F.translateZ(zt),F.matrixWorld.compose(F.position,F.quaternion,F.scale),F.matrixWorldInverse.copy(F.matrixWorld).invert(),Ee[10]===-1)F.projectionMatrix.copy(re.projectionMatrix),F.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const Ct=Ve+zt,O=Ue+zt,nn=Ot-_t,rt=Ft+(he-_t),w=it*Ue/O*Ct,v=tt*Ue/O*Ct;F.projectionMatrix.makePerspective(nn,rt,w,v,Ct,O),F.projectionMatrixInverse.copy(F.projectionMatrix).invert()}}function C(F,re){re===null?F.matrixWorld.copy(F.matrix):F.matrixWorld.multiplyMatrices(re.matrixWorld,F.matrix),F.matrixWorldInverse.copy(F.matrixWorld).invert()}this.updateCamera=function(F){if(s===null)return;let re=F.near,ie=F.far;f.texture!==null&&(f.depthNear>0&&(re=f.depthNear),f.depthFar>0&&(ie=f.depthFar)),k.near=P.near=T.near=re,k.far=P.far=T.far=ie,(Y!==k.near||q!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),Y=k.near,q=k.far),k.layers.mask=F.layers.mask|6,T.layers.mask=k.layers.mask&-5,P.layers.mask=k.layers.mask&-3;const he=F.parent,Ee=k.cameras;C(k,he);for(let Ae=0;Ae<Ee.length;Ae++)C(Ee[Ae],he);Ee.length===2?de(k,T,P):k.projectionMatrix.copy(T.projectionMatrix),N(F,k,he)};function N(F,re,ie){ie===null?F.matrix.copy(re.matrixWorld):(F.matrix.copy(ie.matrixWorld),F.matrix.invert(),F.matrix.multiply(re.matrixWorld)),F.matrix.decompose(F.position,F.quaternion,F.scale),F.updateMatrixWorld(!0),F.projectionMatrix.copy(re.projectionMatrix),F.projectionMatrixInverse.copy(re.projectionMatrixInverse),F.isPerspectiveCamera&&(F.fov=zr*2*Math.atan(1/F.projectionMatrix.elements[5]),F.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(h===null&&d===null))return c},this.setFoveation=function(F){c=F,h!==null&&(h.fixedFoveation=F),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=F)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(k)},this.getCameraTexture=function(F){return m[F]};let Z=null;function me(F,re){if(u=re.getViewerPose(l||a),g=re,u!==null){const ie=u.views;d!==null&&(e.setRenderTargetFramebuffer(S,d.framebuffer),e.setRenderTarget(S));let he=!1;ie.length!==k.cameras.length&&(k.cameras.length=0,he=!0);for(let Ue=0;Ue<ie.length;Ue++){const it=ie[Ue];let tt=null;if(d!==null)tt=d.getViewport(it);else{const Rt=p.getViewSubImage(h,it);tt=Rt.viewport,Ue===0&&(e.setRenderTargetTextures(S,Rt.colorTexture,Rt.depthStencilTexture),e.setRenderTarget(S))}let $e=L[Ue];$e===void 0&&($e=new en,$e.layers.enable(Ue),$e.viewport=new at,L[Ue]=$e),$e.matrix.fromArray(it.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(it.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(tt.x,tt.y,tt.width,tt.height),Ue===0&&(k.matrix.copy($e.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),he===!0&&k.cameras.push($e)}const Ee=s.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){p=i.getBinding();const Ue=p.getDepthInformation(ie[0]);Ue&&Ue.isValid&&Ue.texture&&f.init(Ue,s.renderState)}if(Ee&&Ee.includes("camera-access")&&x){e.state.unbindTexture(),p=i.getBinding();for(let Ue=0;Ue<ie.length;Ue++){const it=ie[Ue].camera;if(it){let tt=m[it];tt||(tt=new Xu,m[it]=tt);const $e=p.getCameraImage(it);tt.sourceTexture=$e}}}}for(let ie=0;ie<A.length;ie++){const he=E[ie],Ee=A[ie];he!==null&&Ee!==void 0&&Ee.update(he,re,l||a)}Z&&Z(F,re),re.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:re}),g=null}const oe=new Md;oe.setAnimationLoop(me),this.setAnimationLoop=function(F){Z=F},this.dispose=function(){}}}const CM=new je,Zd=new ze;Zd.set(-1,0,0,0,1,0,0,0,1);function LM(n,e){function t(f,m){f.matrixAutoUpdate===!0&&f.updateMatrix(),m.value.copy(f.matrix)}function i(f,m){m.color.getRGB(f.fogColor.value,hd(n)),m.isFog?(f.fogNear.value=m.near,f.fogFar.value=m.far):m.isFogExp2&&(f.fogDensity.value=m.density)}function s(f,m,y,b,S){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(f,m):m.isMeshLambertMaterial?(r(f,m),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(f,m),p(f,m)):m.isMeshPhongMaterial?(r(f,m),u(f,m),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(f,m),h(f,m),m.isMeshPhysicalMaterial&&d(f,m,S)):m.isMeshMatcapMaterial?(r(f,m),g(f,m)):m.isMeshDepthMaterial?r(f,m):m.isMeshDistanceMaterial?(r(f,m),x(f,m)):m.isMeshNormalMaterial?r(f,m):m.isLineBasicMaterial?(a(f,m),m.isLineDashedMaterial&&o(f,m)):m.isPointsMaterial?c(f,m,y,b):m.isSpriteMaterial?l(f,m):m.isShadowMaterial?(f.color.value.copy(m.color),f.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(f,m){f.opacity.value=m.opacity,m.color&&f.diffuse.value.copy(m.color),m.emissive&&f.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(f.map.value=m.map,t(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,t(m.alphaMap,f.alphaMapTransform)),m.bumpMap&&(f.bumpMap.value=m.bumpMap,t(m.bumpMap,f.bumpMapTransform),f.bumpScale.value=m.bumpScale,m.side===Jt&&(f.bumpScale.value*=-1)),m.normalMap&&(f.normalMap.value=m.normalMap,t(m.normalMap,f.normalMapTransform),f.normalScale.value.copy(m.normalScale),m.side===Jt&&f.normalScale.value.negate()),m.displacementMap&&(f.displacementMap.value=m.displacementMap,t(m.displacementMap,f.displacementMapTransform),f.displacementScale.value=m.displacementScale,f.displacementBias.value=m.displacementBias),m.emissiveMap&&(f.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,f.emissiveMapTransform)),m.specularMap&&(f.specularMap.value=m.specularMap,t(m.specularMap,f.specularMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest);const y=e.get(m),b=y.envMap,S=y.envMapRotation;b&&(f.envMap.value=b,f.envMapRotation.value.setFromMatrix4(CM.makeRotationFromEuler(S)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(Zd),f.reflectivity.value=m.reflectivity,f.ior.value=m.ior,f.refractionRatio.value=m.refractionRatio),m.lightMap&&(f.lightMap.value=m.lightMap,f.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,f.lightMapTransform)),m.aoMap&&(f.aoMap.value=m.aoMap,f.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,f.aoMapTransform))}function a(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,m.map&&(f.map.value=m.map,t(m.map,f.mapTransform))}function o(f,m){f.dashSize.value=m.dashSize,f.totalSize.value=m.dashSize+m.gapSize,f.scale.value=m.scale}function c(f,m,y,b){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.size.value=m.size*y,f.scale.value=b*.5,m.map&&(f.map.value=m.map,t(m.map,f.uvTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,t(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function l(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.rotation.value=m.rotation,m.map&&(f.map.value=m.map,t(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,t(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function u(f,m){f.specular.value.copy(m.specular),f.shininess.value=Math.max(m.shininess,1e-4)}function p(f,m){m.gradientMap&&(f.gradientMap.value=m.gradientMap)}function h(f,m){f.metalness.value=m.metalness,m.metalnessMap&&(f.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,f.metalnessMapTransform)),f.roughness.value=m.roughness,m.roughnessMap&&(f.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,f.roughnessMapTransform)),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)}function d(f,m,y){f.ior.value=m.ior,m.sheen>0&&(f.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),f.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(f.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,f.sheenColorMapTransform)),m.sheenRoughnessMap&&(f.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,f.sheenRoughnessMapTransform))),m.clearcoat>0&&(f.clearcoat.value=m.clearcoat,f.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(f.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,f.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(f.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Jt&&f.clearcoatNormalScale.value.negate())),m.dispersion>0&&(f.dispersion.value=m.dispersion),m.iridescence>0&&(f.iridescence.value=m.iridescence,f.iridescenceIOR.value=m.iridescenceIOR,f.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(f.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,f.iridescenceMapTransform)),m.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),m.transmission>0&&(f.transmission.value=m.transmission,f.transmissionSamplerMap.value=y.texture,f.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(f.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,f.transmissionMapTransform)),f.thickness.value=m.thickness,m.thicknessMap&&(f.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=m.attenuationDistance,f.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(f.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(f.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=m.specularIntensity,f.specularColor.value.copy(m.specularColor),m.specularColorMap&&(f.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,f.specularColorMapTransform)),m.specularIntensityMap&&(f.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,m){m.matcap&&(f.matcap.value=m.matcap)}function x(f,m){const y=e.get(m).light;f.referencePosition.value.setFromMatrixPosition(y.matrixWorld),f.nearDistance.value=y.shadow.camera.near,f.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function PM(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,A){const E=A.program;i.uniformBlockBinding(S,E)}function l(S,A){let E=s[S.id];E===void 0&&(f(S),E=u(S),s[S.id]=E,S.addEventListener("dispose",y));const R=A.program;i.updateUBOMapping(S,R);const _=e.render.frame;r[S.id]!==_&&(h(S),r[S.id]=_)}function u(S){const A=p();S.__bindingPointIndex=A;const E=n.createBuffer(),R=S.__size,_=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,R,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,A,E),E}function p(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return et("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const A=s[S.id],E=S.uniforms,R=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let _=0,T=E.length;_<T;_++){const P=E[_];if(Array.isArray(P))for(let L=0,k=P.length;L<k;L++)d(P[L],_,L,R);else d(P,_,0,R)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(S,A,E,R){if(x(S,A,E,R)===!0){const _=S.__offset,T=S.value;if(Array.isArray(T)){let P=0;for(let L=0;L<T.length;L++){const k=T[L],Y=m(k);g(k,S.__data,P),typeof k!="number"&&typeof k!="boolean"&&!k.isMatrix3&&!ArrayBuffer.isView(k)&&(P+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,S.__data)}}function g(S,A,E){typeof S=="number"||typeof S=="boolean"?A[0]=S:S.isMatrix3?(A[0]=S.elements[0],A[1]=S.elements[1],A[2]=S.elements[2],A[3]=0,A[4]=S.elements[3],A[5]=S.elements[4],A[6]=S.elements[5],A[7]=0,A[8]=S.elements[6],A[9]=S.elements[7],A[10]=S.elements[8],A[11]=0):ArrayBuffer.isView(S)?A.set(new S.constructor(S.buffer,S.byteOffset,A.length)):S.toArray(A,E)}function x(S,A,E,R){const _=S.value,T=A+"_"+E;if(R[T]===void 0)return typeof _=="number"||typeof _=="boolean"?R[T]=_:ArrayBuffer.isView(_)?R[T]=_.slice():R[T]=_.clone(),!0;{const P=R[T];if(typeof _=="number"||typeof _=="boolean"){if(P!==_)return R[T]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(P.equals(_)===!1)return P.copy(_),!0}}return!1}function f(S){const A=S.uniforms;let E=0;const R=16;for(let T=0,P=A.length;T<P;T++){const L=Array.isArray(A[T])?A[T]:[A[T]];for(let k=0,Y=L.length;k<Y;k++){const q=L[k],G=Array.isArray(q.value)?q.value:[q.value];for(let J=0,K=G.length;J<K;J++){const ee=G[J],se=m(ee),de=E%R,C=de%se.boundary,N=de+C;E+=C,N!==0&&R-N<se.storage&&(E+=R-N),q.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=E,E+=se.storage}}}const _=E%R;return _>0&&(E+=R-_),S.__size=E,S.__cache={},this}function m(S){const A={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(A.boundary=4,A.storage=4):S.isVector2?(A.boundary=8,A.storage=8):S.isVector3||S.isColor?(A.boundary=16,A.storage=12):S.isVector4?(A.boundary=16,A.storage=16):S.isMatrix3?(A.boundary=48,A.storage=48):S.isMatrix4?(A.boundary=64,A.storage=64):S.isTexture?Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(A.boundary=16,A.storage=S.byteLength):Oe("WebGLRenderer: Unsupported uniform value type.",S),A}function y(S){const A=S.target;A.removeEventListener("dispose",y);const E=a.indexOf(A.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function b(){for(const S in s)n.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:c,update:l,dispose:b}}const DM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Un=null;function IM(){return Un===null&&(Un=new el(DM,16,16,Pi,Zt),Un.name="DFG_LUT",Un.minFilter=Bt,Un.magFilter=Bt,Un.wrapS=Wn,Un.wrapT=Wn,Un.generateMipmaps=!1,Un.needsUpdate=!0),Un}class NM{constructor(e={}){const{canvas:t=Km(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:h=!1,outputBufferType:d=sn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const x=d,f=new Set([Ko,Xo,Wo]),m=new Set([sn,Pn,Ks,Ys,zo,Ho]),y=new Uint32Array(4),b=new Int32Array(4),S=new D;let A=null,E=null;const R=[],_=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ln,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let L=!1,k=null,Y=null,q=null,G=null;this._outputColorSpace=rn;let J=0,K=0,ee=null,se=-1,de=null;const C=new at,N=new at;let Z=null;const me=new Be(0);let oe=0,F=t.width,re=t.height,ie=1,he=null,Ee=null;const Ae=new at(0,0,F,re),Ve=new at(0,0,F,re);let Ue=!1;const it=new il;let tt=!1,$e=!1;const Rt=new je,Ot=new D,Ft=new at,zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let _t=!1;function Ct(){return ee===null?ie:1}let O=i;function nn(M,U){return t.getContext(M,U)}try{const M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${vo}`),t.addEventListener("webglcontextlost",St,!1),t.addEventListener("webglcontextrestored",dt,!1),t.addEventListener("webglcontextcreationerror",Bn,!1),O===null){const U="webgl2";if(O=nn(U,M),O===null)throw nn(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(M){throw et("WebGLRenderer: "+M.message),M}let rt,w,v,B,W,Q,le,pe,j,ne,ge,Pe,Se,xe,Ne,ke,We,I,fe,te,ve,be,ae;function Le(){rt=new I_(O),rt.init(),ve=new EM(O,rt),w=new A_(O,rt,e,ve),v=new yM(O,rt),w.reversedDepthBuffer&&h&&v.buffers.depth.setReversed(!0),Y=O.createFramebuffer(),q=O.createFramebuffer(),G=O.createFramebuffer(),B=new U_(O),W=new cM,Q=new bM(O,rt,v,W,w,ve,B),le=new D_(P),pe=new Sx(O),be=new b_(O,pe),j=new N_(O,pe,B,be),ne=new F_(O,j,pe,be,B),I=new k_(O,w,Q),Ne=new T_(W),ge=new oM(P,le,rt,w,be,Ne),Pe=new LM(P,W),Se=new hM,xe=new gM(rt),We=new y_(P,le,v,ne,g,c),ke=new MM(P,ne,w),ae=new PM(O,B,w,v),fe=new E_(O,rt,B),te=new O_(O,rt,B),B.programs=ge.programs,P.capabilities=w,P.extensions=rt,P.properties=W,P.renderLists=Se,P.shadowMap=ke,P.state=v,P.info=B}Le(),x!==sn&&(T=new G_(x,t.width,t.height,o,s,r));const Re=new RM(P,O);this.xr=Re,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const M=rt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=rt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(M){M!==void 0&&(ie=M,this.setSize(F,re,!1))},this.getSize=function(M){return M.set(F,re)},this.setSize=function(M,U,X=!0){if(Re.isPresenting){Oe("WebGLRenderer: Can't change size while VR device is presenting.");return}F=M,re=U,t.width=Math.floor(M*ie),t.height=Math.floor(U*ie),X===!0&&(t.style.width=M+"px",t.style.height=U+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set(F*ie,re*ie).floor()},this.setDrawingBufferSize=function(M,U,X){F=M,re=U,ie=X,t.width=Math.floor(M*X),t.height=Math.floor(U*X),this.setViewport(0,0,M,U)},this.setEffects=function(M){if(x===sn){et("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let U=0;U<M.length;U++)if(M[U].isOutputPass===!0){Oe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(C)},this.getViewport=function(M){return M.copy(Ae)},this.setViewport=function(M,U,X,H){M.isVector4?Ae.set(M.x,M.y,M.z,M.w):Ae.set(M,U,X,H),v.viewport(C.copy(Ae).multiplyScalar(ie).round())},this.getScissor=function(M){return M.copy(Ve)},this.setScissor=function(M,U,X,H){M.isVector4?Ve.set(M.x,M.y,M.z,M.w):Ve.set(M,U,X,H),v.scissor(N.copy(Ve).multiplyScalar(ie).round())},this.getScissorTest=function(){return Ue},this.setScissorTest=function(M){v.setScissorTest(Ue=M)},this.setOpaqueSort=function(M){he=M},this.setTransparentSort=function(M){Ee=M},this.getClearColor=function(M){return M.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor(...arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha(...arguments)},this.clear=function(M=!0,U=!0,X=!0){let H=0;if(M){let V=!1;if(ee!==null){const ye=ee.texture.format;V=f.has(ye)}if(V){const ye=ee.texture.type,we=m.has(ye),Me=We.getClearColor(),Ce=We.getClearAlpha(),De=Me.r,Xe=Me.g,qe=Me.b;we?(y[0]=De,y[1]=Xe,y[2]=qe,y[3]=Ce,O.clearBufferuiv(O.COLOR,0,y)):(b[0]=De,b[1]=Xe,b[2]=qe,b[3]=Ce,O.clearBufferiv(O.COLOR,0,b))}else H|=O.COLOR_BUFFER_BIT}U&&(H|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(H|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&O.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),k=M},this.dispose=function(){t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",dt,!1),t.removeEventListener("webglcontextcreationerror",Bn,!1),We.dispose(),Se.dispose(),xe.dispose(),W.dispose(),le.dispose(),ne.dispose(),be.dispose(),ae.dispose(),ge.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",pp),Re.removeEventListener("sessionend",mp),Ji.stop()};function St(M){M.preventDefault(),lu("WebGLRenderer: Context Lost."),L=!0}function dt(){lu("WebGLRenderer: Context Restored."),L=!1;const M=B.autoReset,U=ke.enabled,X=ke.autoUpdate,H=ke.needsUpdate,V=ke.type;Le(),B.autoReset=M,ke.enabled=U,ke.autoUpdate=X,ke.needsUpdate=H,ke.type=V}function Bn(M){et("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Gn(M){const U=M.target;U.removeEventListener("dispose",Gn),tb(U)}function tb(M){nb(M),W.remove(M)}function nb(M){const U=W.get(M).programs;U!==void 0&&(U.forEach(function(X){ge.releaseProgram(X)}),M.isShaderMaterial&&ge.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,X,H,V,ye){U===null&&(U=zt);const we=V.isMesh&&V.matrixWorld.determinantAffine()<0,Me=rb(M,U,X,H,V);v.setMaterial(H,we);let Ce=X.index,De=1;if(H.wireframe===!0){if(Ce=j.getWireframeAttribute(X),Ce===void 0)return;De=2}const Xe=X.drawRange,qe=X.attributes.position;let Ie=Xe.start*De,ot=(Xe.start+Xe.count)*De;ye!==null&&(Ie=Math.max(Ie,ye.start*De),ot=Math.min(ot,(ye.start+ye.count)*De)),Ce!==null?(Ie=Math.max(Ie,0),ot=Math.min(ot,Ce.count)):qe!=null&&(Ie=Math.max(Ie,0),ot=Math.min(ot,qe.count));const Et=ot-Ie;if(Et<0||Et===1/0)return;be.setup(V,H,Me,X,Ce);let Mt,lt=fe;if(Ce!==null&&(Mt=pe.get(Ce),lt=te,lt.setIndex(Mt)),V.isMesh)H.wireframe===!0?(v.setLineWidth(H.wireframeLinewidth*Ct()),lt.setMode(O.LINES)):lt.setMode(O.TRIANGLES);else if(V.isLine){let Yt=H.linewidth;Yt===void 0&&(Yt=1),v.setLineWidth(Yt*Ct()),V.isLineSegments?lt.setMode(O.LINES):V.isLineLoop?lt.setMode(O.LINE_LOOP):lt.setMode(O.LINE_STRIP)}else V.isPoints?lt.setMode(O.POINTS):V.isSprite&&lt.setMode(O.TRIANGLES);if(V.isBatchedMesh)if(rt.get("WEBGL_multi_draw"))lt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Yt=V._multiDrawStarts,Te=V._multiDrawCounts,ln=V._multiDrawCount,nt=Ce?pe.get(Ce).bytesPerElement:1,gn=W.get(H).currentProgram.getUniforms();for(let zn=0;zn<ln;zn++)gn.setValue(O,"_gl_DrawID",zn),lt.render(Yt[zn]/nt,Te[zn])}else if(V.isInstancedMesh)lt.renderInstances(Ie,Et,V.count);else if(X.isInstancedBufferGeometry){const Yt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Te=Math.min(X.instanceCount,Yt);lt.renderInstances(Ie,Et,Te)}else lt.render(Ie,Et)};function fp(M,U,X){M.transparent===!0&&M.side===Rn&&M.forceSinglePass===!1?(M.side=Jt,M.needsUpdate=!0,Za(M,U,X),M.side=ii,M.needsUpdate=!0,Za(M,U,X),M.side=Rn):Za(M,U,X)}this.compile=function(M,U,X=null){X===null&&(X=M),E=xe.get(X),E.init(U),_.push(E),X.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),M!==X&&M.traverseVisible(function(V){V.isLight&&V.layers.test(U.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),E.setupLights();const H=new Set;return M.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const ye=V.material;if(ye)if(Array.isArray(ye))for(let we=0;we<ye.length;we++){const Me=ye[we];fp(Me,X,V),H.add(Me)}else fp(ye,X,V),H.add(ye)}),E=_.pop(),H},this.compileAsync=function(M,U,X=null){const H=this.compile(M,U,X);return new Promise(V=>{function ye(){if(H.forEach(function(we){W.get(we).currentProgram.isReady()&&H.delete(we)}),H.size===0){V(M);return}setTimeout(ye,10)}rt.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let dh=null;function ib(M){dh&&dh(M)}function pp(){Ji.stop()}function mp(){Ji.start()}const Ji=new Md;Ji.setAnimationLoop(ib),typeof self<"u"&&Ji.setContext(self),this.setAnimationLoop=function(M){dh=M,Re.setAnimationLoop(M),M===null?Ji.stop():Ji.start()},Re.addEventListener("sessionstart",pp),Re.addEventListener("sessionend",mp),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;k!==null&&k.renderStart(M,U);const X=Re.enabled===!0&&Re.isPresenting===!0,H=T!==null&&(ee===null||X)&&T.begin(P,ee);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Re.cameraAutoUpdate===!0&&Re.updateCamera(U),U=Re.getCamera()),M.isScene===!0&&M.onBeforeRender(P,M,U,ee),E=xe.get(M,_.length),E.init(U),E.state.textureUnits=Q.getTextureUnits(),_.push(E),Rt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),it.setFromProjectionMatrix(Rt,Dn,U.reversedDepth),$e=this.localClippingEnabled,tt=Ne.init(this.clippingPlanes,$e),A=Se.get(M,R.length),A.init(),R.push(A),Re.enabled===!0&&Re.isPresenting===!0){const we=P.xr.getDepthSensingMesh();we!==null&&fh(we,U,-1/0,P.sortObjects)}fh(M,U,0,P.sortObjects),A.finish(),P.sortObjects===!0&&A.sort(he,Ee,U.reversedDepth),_t=Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1,_t&&We.addToRenderList(A,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),tt===!0&&Ne.beginShadows();const V=E.state.shadowsArray;if(ke.render(V,M,U),tt===!0&&Ne.endShadows(),(H&&T.hasRenderPass())===!1){const we=A.opaque,Me=A.transmissive;if(E.setupLights(),U.isArrayCamera){const Ce=U.cameras;if(Me.length>0)for(let De=0,Xe=Ce.length;De<Xe;De++){const qe=Ce[De];xp(we,Me,M,qe)}_t&&We.render(M);for(let De=0,Xe=Ce.length;De<Xe;De++){const qe=Ce[De];gp(A,M,qe,qe.viewport)}}else Me.length>0&&xp(we,Me,M,U),_t&&We.render(M),gp(A,M,U)}ee!==null&&K===0&&(Q.updateMultisampleRenderTarget(ee),Q.updateRenderTargetMipmap(ee)),H&&T.end(P),M.isScene===!0&&M.onAfterRender(P,M,U),be.resetDefaultState(),se=-1,de=null,_.pop(),_.length>0?(E=_[_.length-1],Q.setTextureUnits(E.state.textureUnits),tt===!0&&Ne.setGlobalState(P.clippingPlanes,E.state.camera)):E=null,R.pop(),R.length>0?A=R[R.length-1]:A=null,k!==null&&k.renderEnd()};function fh(M,U,X,H){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)X=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLightProbeGrid)E.pushLightProbeGrid(M);else if(M.isLight)E.pushLight(M),M.castShadow&&E.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||it.intersectsSprite(M)){H&&Ft.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Rt);const we=ne.update(M),Me=M.material;Me.visible&&A.push(M,we,Me,X,Ft.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||it.intersectsObject(M))){const we=ne.update(M),Me=M.material;if(H&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ft.copy(M.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),Ft.copy(we.boundingSphere.center)),Ft.applyMatrix4(M.matrixWorld).applyMatrix4(Rt)),Array.isArray(Me)){const Ce=we.groups;for(let De=0,Xe=Ce.length;De<Xe;De++){const qe=Ce[De],Ie=Me[qe.materialIndex];Ie&&Ie.visible&&A.push(M,we,Ie,X,Ft.z,qe)}}else Me.visible&&A.push(M,we,Me,X,Ft.z,null)}}const ye=M.children;for(let we=0,Me=ye.length;we<Me;we++)fh(ye[we],U,X,H)}function gp(M,U,X,H){const{opaque:V,transmissive:ye,transparent:we}=M;E.setupLightsView(X),tt===!0&&Ne.setGlobalState(P.clippingPlanes,X),H&&v.viewport(C.copy(H)),V.length>0&&Ja(V,U,X),ye.length>0&&Ja(ye,U,X),we.length>0&&Ja(we,U,X),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function xp(M,U,X,H){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[H.id]===void 0){const Ie=rt.has("EXT_color_buffer_half_float")||rt.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[H.id]=new Vt(1,1,{generateMipmaps:!0,type:Ie?Zt:sn,minFilter:Ci,samples:Math.max(4,w.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace})}const ye=E.state.transmissionRenderTarget[H.id],we=H.viewport||C;ye.setSize(we.z*P.transmissionResolutionScale,we.w*P.transmissionResolutionScale);const Me=P.getRenderTarget(),Ce=P.getActiveCubeFace(),De=P.getActiveMipmapLevel();P.setRenderTarget(ye),P.getClearColor(me),oe=P.getClearAlpha(),oe<1&&P.setClearColor(16777215,.5),P.clear(),_t&&We.render(X);const Xe=P.toneMapping;P.toneMapping=Ln;const qe=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),E.setupLightsView(H),tt===!0&&Ne.setGlobalState(P.clippingPlanes,H),Ja(M,X,H),Q.updateMultisampleRenderTarget(ye),Q.updateRenderTargetMipmap(ye),rt.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let ot=0,Et=U.length;ot<Et;ot++){const Mt=U[ot],{object:lt,geometry:Yt,material:Te,group:ln}=Mt;if(Te.side===Rn&&lt.layers.test(H.layers)){const nt=Te.side;Te.side=Jt,Te.needsUpdate=!0,vp(lt,X,H,Yt,Te,ln),Te.side=nt,Te.needsUpdate=!0,Ie=!0}}Ie===!0&&(Q.updateMultisampleRenderTarget(ye),Q.updateRenderTargetMipmap(ye))}P.setRenderTarget(Me,Ce,De),P.setClearColor(me,oe),qe!==void 0&&(H.viewport=qe),P.toneMapping=Xe}function Ja(M,U,X){const H=U.isScene===!0?U.overrideMaterial:null;for(let V=0,ye=M.length;V<ye;V++){const we=M[V],{object:Me,geometry:Ce,group:De}=we;let Xe=we.material;Xe.allowOverride===!0&&H!==null&&(Xe=H),Me.layers.test(X.layers)&&vp(Me,U,X,Ce,Xe,De)}}function vp(M,U,X,H,V,ye){M.onBeforeRender(P,U,X,H,V,ye),M.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),V.onBeforeRender(P,U,X,H,M,ye),V.transparent===!0&&V.side===Rn&&V.forceSinglePass===!1?(V.side=Jt,V.needsUpdate=!0,P.renderBufferDirect(X,U,H,V,M,ye),V.side=ii,V.needsUpdate=!0,P.renderBufferDirect(X,U,H,V,M,ye),V.side=Rn):P.renderBufferDirect(X,U,H,V,M,ye),M.onAfterRender(P,U,X,H,V,ye)}function Za(M,U,X){U.isScene!==!0&&(U=zt);const H=W.get(M),V=E.state.lights,ye=E.state.shadowsArray,we=V.state.version,Me=ge.getParameters(M,V.state,ye,U,X,E.state.lightProbeGridArray),Ce=ge.getProgramCacheKey(Me);let De=H.programs;H.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?U.environment:null,H.fog=U.fog;const Xe=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;H.envMap=le.get(M.envMap||H.environment,Xe),H.envMapRotation=H.environment!==null&&M.envMap===null?U.environmentRotation:M.envMapRotation,De===void 0&&(M.addEventListener("dispose",Gn),De=new Map,H.programs=De);let qe=De.get(Ce);if(qe!==void 0){if(H.currentProgram===qe&&H.lightsStateVersion===we)return Sp(M,Me),qe}else Me.uniforms=ge.getUniforms(M),k!==null&&M.isNodeMaterial&&k.build(M,X,Me),M.onBeforeCompile(Me,P),qe=ge.acquireProgram(Me,Ce),De.set(Ce,qe),H.uniforms=Me.uniforms;const Ie=H.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ie.clippingPlanes=Ne.uniform),Sp(M,Me),H.needsLights=ob(M),H.lightsStateVersion=we,H.needsLights&&(Ie.ambientLightColor.value=V.state.ambient,Ie.lightProbe.value=V.state.probe,Ie.directionalLights.value=V.state.directional,Ie.directionalLightShadows.value=V.state.directionalShadow,Ie.spotLights.value=V.state.spot,Ie.spotLightShadows.value=V.state.spotShadow,Ie.rectAreaLights.value=V.state.rectArea,Ie.ltc_1.value=V.state.rectAreaLTC1,Ie.ltc_2.value=V.state.rectAreaLTC2,Ie.pointLights.value=V.state.point,Ie.pointLightShadows.value=V.state.pointShadow,Ie.hemisphereLights.value=V.state.hemi,Ie.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ie.spotLightMatrix.value=V.state.spotLightMatrix,Ie.spotLightMap.value=V.state.spotLightMap,Ie.pointShadowMatrix.value=V.state.pointShadowMatrix),H.lightProbeGrid=E.state.lightProbeGridArray.length>0,H.currentProgram=qe,H.uniformsList=null,qe}function _p(M){if(M.uniformsList===null){const U=M.currentProgram.getUniforms();M.uniformsList=ba.seqWithValue(U.seq,M.uniforms)}return M.uniformsList}function Sp(M,U){const X=W.get(M);X.outputColorSpace=U.outputColorSpace,X.batching=U.batching,X.batchingColor=U.batchingColor,X.instancing=U.instancing,X.instancingColor=U.instancingColor,X.instancingMorph=U.instancingMorph,X.skinning=U.skinning,X.morphTargets=U.morphTargets,X.morphNormals=U.morphNormals,X.morphColors=U.morphColors,X.morphTargetsCount=U.morphTargetsCount,X.numClippingPlanes=U.numClippingPlanes,X.numIntersection=U.numClipIntersection,X.vertexAlphas=U.vertexAlphas,X.vertexTangents=U.vertexTangents,X.toneMapping=U.toneMapping}function sb(M,U){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;S.setFromMatrixPosition(U.matrixWorld);for(let X=0,H=M.length;X<H;X++){const V=M[X];if(V.texture!==null&&V.boundingBox.containsPoint(S))return V}return null}function rb(M,U,X,H,V){U.isScene!==!0&&(U=zt),Q.resetTextureUnits();const ye=U.fog,we=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?U.environment:null,Me=ee===null?P.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Qe.workingColorSpace,Ce=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,De=le.get(H.envMap||we,Ce),Xe=H.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,qe=!!X.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ie=!!X.morphAttributes.position,ot=!!X.morphAttributes.normal,Et=!!X.morphAttributes.color;let Mt=Ln;H.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Mt=P.toneMapping);const lt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Yt=lt!==void 0?lt.length:0,Te=W.get(H),ln=E.state.lights;if(tt===!0&&($e===!0||M!==de)){const ft=M===de&&H.id===se;Ne.setState(H,M,ft)}let nt=!1;H.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==ln.state.version||Te.outputColorSpace!==Me||V.isBatchedMesh&&Te.batching===!1||!V.isBatchedMesh&&Te.batching===!0||V.isBatchedMesh&&Te.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Te.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Te.instancing===!1||!V.isInstancedMesh&&Te.instancing===!0||V.isSkinnedMesh&&Te.skinning===!1||!V.isSkinnedMesh&&Te.skinning===!0||V.isInstancedMesh&&Te.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Te.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Te.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Te.instancingMorph===!1&&V.morphTexture!==null||Te.envMap!==De||H.fog===!0&&Te.fog!==ye||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==Ne.numPlanes||Te.numIntersection!==Ne.numIntersection)||Te.vertexAlphas!==Xe||Te.vertexTangents!==qe||Te.morphTargets!==Ie||Te.morphNormals!==ot||Te.morphColors!==Et||Te.toneMapping!==Mt||Te.morphTargetsCount!==Yt||!!Te.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(nt=!0):(nt=!0,Te.__version=H.version);let gn=Te.currentProgram;nt===!0&&(gn=Za(H,U,V),k&&H.isNodeMaterial&&k.onUpdateProgram(H,gn,Te));let zn=!1,_i=!1,Fs=!1;const ht=gn.getUniforms(),At=Te.uniforms;if(v.useProgram(gn.program)&&(zn=!0,_i=!0,Fs=!0),H.id!==se&&(se=H.id,_i=!0),Te.needsLights){const ft=sb(E.state.lightProbeGridArray,V);Te.lightProbeGrid!==ft&&(Te.lightProbeGrid=ft,_i=!0)}if(zn||de!==M){v.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ht.setValue(O,"projectionMatrix",M.projectionMatrix),ht.setValue(O,"viewMatrix",M.matrixWorldInverse);const Mi=ht.map.cameraPosition;Mi!==void 0&&Mi.setValue(O,Ot.setFromMatrixPosition(M.matrixWorld)),w.logarithmicDepthBuffer&&ht.setValue(O,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ht.setValue(O,"isOrthographic",M.isOrthographicCamera===!0),de!==M&&(de=M,_i=!0,Fs=!0)}if(Te.needsLights&&(ln.state.directionalShadowMap.length>0&&ht.setValue(O,"directionalShadowMap",ln.state.directionalShadowMap,Q),ln.state.spotShadowMap.length>0&&ht.setValue(O,"spotShadowMap",ln.state.spotShadowMap,Q),ln.state.pointShadowMap.length>0&&ht.setValue(O,"pointShadowMap",ln.state.pointShadowMap,Q)),V.isSkinnedMesh){ht.setOptional(O,V,"bindMatrix"),ht.setOptional(O,V,"bindMatrixInverse");const ft=V.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),ht.setValue(O,"boneTexture",ft.boneTexture,Q))}V.isBatchedMesh&&(ht.setOptional(O,V,"batchingTexture"),ht.setValue(O,"batchingTexture",V._matricesTexture,Q),ht.setOptional(O,V,"batchingIdTexture"),ht.setValue(O,"batchingIdTexture",V._indirectTexture,Q),ht.setOptional(O,V,"batchingColorTexture"),V._colorsTexture!==null&&ht.setValue(O,"batchingColorTexture",V._colorsTexture,Q));const Si=X.morphAttributes;if((Si.position!==void 0||Si.normal!==void 0||Si.color!==void 0)&&I.update(V,X,gn),(_i||Te.receiveShadow!==V.receiveShadow)&&(Te.receiveShadow=V.receiveShadow,ht.setValue(O,"receiveShadow",V.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&U.environment!==null&&(At.envMapIntensity.value=U.environmentIntensity),At.dfgLUT!==void 0&&(At.dfgLUT.value=IM()),_i){if(ht.setValue(O,"toneMappingExposure",P.toneMappingExposure),Te.needsLights&&ab(At,Fs),ye&&H.fog===!0&&Pe.refreshFogUniforms(At,ye),Pe.refreshMaterialUniforms(At,H,ie,re,E.state.transmissionRenderTarget[M.id]),Te.needsLights&&Te.lightProbeGrid){const ft=Te.lightProbeGrid;At.probesSH.value=ft.texture,At.probesMin.value.copy(ft.boundingBox.min),At.probesMax.value.copy(ft.boundingBox.max),At.probesResolution.value.copy(ft.resolution)}ba.upload(O,_p(Te),At,Q)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(ba.upload(O,_p(Te),At,Q),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ht.setValue(O,"center",V.center),ht.setValue(O,"modelViewMatrix",V.modelViewMatrix),ht.setValue(O,"normalMatrix",V.normalMatrix),ht.setValue(O,"modelMatrix",V.matrixWorld),H.uniformsGroups!==void 0){const ft=H.uniformsGroups;for(let Mi=0,Bs=ft.length;Mi<Bs;Mi++){const Mp=ft[Mi];ae.update(Mp,gn),ae.bind(Mp,gn)}}return gn}function ab(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function ob(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return K},this.getRenderTarget=function(){return ee},this.setRenderTargetTextures=function(M,U,X){const H=W.get(M);H.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),W.get(M.texture).__webglTexture=U,W.get(M.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:X,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,U){const X=W.get(M);X.__webglFramebuffer=U,X.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(M,U=0,X=0){ee=M,J=U,K=X;let H=null,V=!1,ye=!1;if(M){const Me=W.get(M);if(Me.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(O.FRAMEBUFFER,Me.__webglFramebuffer),C.copy(M.viewport),N.copy(M.scissor),Z=M.scissorTest,v.viewport(C),v.scissor(N),v.setScissorTest(Z),se=-1;return}else if(Me.__webglFramebuffer===void 0)Q.setupRenderTarget(M);else if(Me.__hasExternalTextures)Q.rebindTextures(M,W.get(M.texture).__webglTexture,W.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Xe=M.depthTexture;if(Me.__boundDepthTexture!==Xe){if(Xe!==null&&W.has(Xe)&&(M.width!==Xe.image.width||M.height!==Xe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(M)}}const Ce=M.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(ye=!0);const De=W.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(De[U])?H=De[U][X]:H=De[U],V=!0):M.samples>0&&Q.useMultisampledRTT(M)===!1?H=W.get(M).__webglMultisampledFramebuffer:Array.isArray(De)?H=De[X]:H=De,C.copy(M.viewport),N.copy(M.scissor),Z=M.scissorTest}else C.copy(Ae).multiplyScalar(ie).floor(),N.copy(Ve).multiplyScalar(ie).floor(),Z=Ue;if(X!==0&&(H=Y),v.bindFramebuffer(O.FRAMEBUFFER,H)&&v.drawBuffers(M,H),v.viewport(C),v.scissor(N),v.setScissorTest(Z),V){const Me=W.get(M.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+U,Me.__webglTexture,X)}else if(ye){const Me=U;for(let Ce=0;Ce<M.textures.length;Ce++){const De=W.get(M.textures[Ce]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Ce,De.__webglTexture,X,Me)}}else if(M!==null&&X!==0){const Me=W.get(M.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Me.__webglTexture,X)}se=-1},this.readRenderTargetPixels=function(M,U,X,H,V,ye,we,Me=0){if(!(M&&M.isWebGLRenderTarget)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=W.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&we!==void 0&&(Ce=Ce[we]),Ce){v.bindFramebuffer(O.FRAMEBUFFER,Ce);try{const De=M.textures[Me],Xe=De.format,qe=De.type;if(M.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Me),!w.textureFormatReadable(Xe)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!w.textureTypeReadable(qe)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-H&&X>=0&&X<=M.height-V&&O.readPixels(U,X,H,V,ve.convert(Xe),ve.convert(qe),ye)}finally{const De=ee!==null?W.get(ee).__webglFramebuffer:null;v.bindFramebuffer(O.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(M,U,X,H,V,ye,we,Me=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=W.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&we!==void 0&&(Ce=Ce[we]),Ce)if(U>=0&&U<=M.width-H&&X>=0&&X<=M.height-V){v.bindFramebuffer(O.FRAMEBUFFER,Ce);const De=M.textures[Me],Xe=De.format,qe=De.type;if(M.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Me),!w.textureFormatReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!w.textureTypeReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ie=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Ie),O.bufferData(O.PIXEL_PACK_BUFFER,ye.byteLength,O.STREAM_READ),O.readPixels(U,X,H,V,ve.convert(Xe),ve.convert(qe),0);const ot=ee!==null?W.get(ee).__webglFramebuffer:null;v.bindFramebuffer(O.FRAMEBUFFER,ot);const Et=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Ym(O,Et,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Ie),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,ye),O.deleteBuffer(Ie),O.deleteSync(Et),ye}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,U=null,X=0){const H=Math.pow(2,-X),V=Math.floor(M.image.width*H),ye=Math.floor(M.image.height*H),we=U!==null?U.x:0,Me=U!==null?U.y:0;Q.setTexture2D(M,0),O.copyTexSubImage2D(O.TEXTURE_2D,X,0,0,we,Me,V,ye),v.unbindTexture()},this.copyTextureToTexture=function(M,U,X=null,H=null,V=0,ye=0){let we,Me,Ce,De,Xe,qe,Ie,ot,Et;const Mt=M.isCompressedTexture?M.mipmaps[ye]:M.image;if(X!==null)we=X.max.x-X.min.x,Me=X.max.y-X.min.y,Ce=X.isBox3?X.max.z-X.min.z:1,De=X.min.x,Xe=X.min.y,qe=X.isBox3?X.min.z:0;else{const At=Math.pow(2,-V);we=Math.floor(Mt.width*At),Me=Math.floor(Mt.height*At),M.isDataArrayTexture?Ce=Mt.depth:M.isData3DTexture?Ce=Math.floor(Mt.depth*At):Ce=1,De=0,Xe=0,qe=0}H!==null?(Ie=H.x,ot=H.y,Et=H.z):(Ie=0,ot=0,Et=0);const lt=ve.convert(U.format),Yt=ve.convert(U.type);let Te;U.isData3DTexture?(Q.setTexture3D(U,0),Te=O.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Q.setTexture2DArray(U,0),Te=O.TEXTURE_2D_ARRAY):(Q.setTexture2D(U,0),Te=O.TEXTURE_2D),v.activeTexture(O.TEXTURE0),v.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,U.flipY),v.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),v.pixelStorei(O.UNPACK_ALIGNMENT,U.unpackAlignment);const ln=v.getParameter(O.UNPACK_ROW_LENGTH),nt=v.getParameter(O.UNPACK_IMAGE_HEIGHT),gn=v.getParameter(O.UNPACK_SKIP_PIXELS),zn=v.getParameter(O.UNPACK_SKIP_ROWS),_i=v.getParameter(O.UNPACK_SKIP_IMAGES);v.pixelStorei(O.UNPACK_ROW_LENGTH,Mt.width),v.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Mt.height),v.pixelStorei(O.UNPACK_SKIP_PIXELS,De),v.pixelStorei(O.UNPACK_SKIP_ROWS,Xe),v.pixelStorei(O.UNPACK_SKIP_IMAGES,qe);const Fs=M.isDataArrayTexture||M.isData3DTexture,ht=U.isDataArrayTexture||U.isData3DTexture;if(M.isDepthTexture){const At=W.get(M),Si=W.get(U),ft=W.get(At.__renderTarget),Mi=W.get(Si.__renderTarget);v.bindFramebuffer(O.READ_FRAMEBUFFER,ft.__webglFramebuffer),v.bindFramebuffer(O.DRAW_FRAMEBUFFER,Mi.__webglFramebuffer);for(let Bs=0;Bs<Ce;Bs++)Fs&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,W.get(M).__webglTexture,V,qe+Bs),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,W.get(U).__webglTexture,ye,Et+Bs)),O.blitFramebuffer(De,Xe,we,Me,Ie,ot,we,Me,O.DEPTH_BUFFER_BIT,O.NEAREST);v.bindFramebuffer(O.READ_FRAMEBUFFER,null),v.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(V!==0||M.isRenderTargetTexture||W.has(M)){const At=W.get(M),Si=W.get(U);v.bindFramebuffer(O.READ_FRAMEBUFFER,q),v.bindFramebuffer(O.DRAW_FRAMEBUFFER,G);for(let ft=0;ft<Ce;ft++)Fs?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,At.__webglTexture,V,qe+ft):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,At.__webglTexture,V),ht?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Si.__webglTexture,ye,Et+ft):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Si.__webglTexture,ye),V!==0?O.blitFramebuffer(De,Xe,we,Me,Ie,ot,we,Me,O.COLOR_BUFFER_BIT,O.NEAREST):ht?O.copyTexSubImage3D(Te,ye,Ie,ot,Et+ft,De,Xe,we,Me):O.copyTexSubImage2D(Te,ye,Ie,ot,De,Xe,we,Me);v.bindFramebuffer(O.READ_FRAMEBUFFER,null),v.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else ht?M.isDataTexture||M.isData3DTexture?O.texSubImage3D(Te,ye,Ie,ot,Et,we,Me,Ce,lt,Yt,Mt.data):U.isCompressedArrayTexture?O.compressedTexSubImage3D(Te,ye,Ie,ot,Et,we,Me,Ce,lt,Mt.data):O.texSubImage3D(Te,ye,Ie,ot,Et,we,Me,Ce,lt,Yt,Mt):M.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,ye,Ie,ot,we,Me,lt,Yt,Mt.data):M.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,ye,Ie,ot,Mt.width,Mt.height,lt,Mt.data):O.texSubImage2D(O.TEXTURE_2D,ye,Ie,ot,we,Me,lt,Yt,Mt);v.pixelStorei(O.UNPACK_ROW_LENGTH,ln),v.pixelStorei(O.UNPACK_IMAGE_HEIGHT,nt),v.pixelStorei(O.UNPACK_SKIP_PIXELS,gn),v.pixelStorei(O.UNPACK_SKIP_ROWS,zn),v.pixelStorei(O.UNPACK_SKIP_IMAGES,_i),ye===0&&U.generateMipmaps&&O.generateMipmap(Te),v.unbindTexture()},this.initRenderTarget=function(M){W.get(M).__webglFramebuffer===void 0&&Q.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Q.setTextureCube(M,0):M.isData3DTexture?Q.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Q.setTexture2DArray(M,0):Q.setTexture2D(M,0),v.unbindTexture()},this.resetState=function(){J=0,K=0,ee=null,v.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}class OM extends Eu{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new Ss;e.deleteAttribute("uv");const t=new $n({side:Jt}),i=new $n,s=new dx(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new pt(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new vg(e,i,6),o=new xt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const c=new pt(e,ws(50));c.position.set(-16.116,14.37,8.208),c.scale.set(.1,2.428,2.739),this.add(c);const l=new pt(e,ws(50));l.position.set(-16.109,18.021,-8.207),l.scale.set(.1,2.425,2.751),this.add(l);const u=new pt(e,ws(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);const p=new pt(e,ws(43));p.position.set(-.462,8.89,14.52),p.scale.set(4.38,5.441,.088),this.add(p);const h=new pt(e,ws(20));h.position.set(3.235,11.486,-12.541),h.scale.set(2.5,2,.1),this.add(h);const d=new pt(e,ws(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function ws(n){return new ax({color:0,emissive:16777215,emissiveIntensity:n})}const Aa={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Hi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const UM=new _a(-1,1,1,-1,0,1);class kM extends Gt{constructor(){super(),this.setAttribute("position",new ct([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ct([0,2,0,0,2,0],2))}}const FM=new kM;class Ta{constructor(e){this._mesh=new pt(FM,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,UM)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class BM extends Hi{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Dt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=di.clone(e.uniforms),this.material=new Dt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ta(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Qd extends Hi{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class GM extends Hi{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class zM{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new ue);this._width=i.width,this._height=i.height,t=new Vt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Zt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new BM(Aa),this.copyPass.material.blending=Cn,this.timer=new xx}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Qd!==void 0&&(a instanceof Qd?i=!0:a instanceof GM&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ue);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class HM extends Hi{constructor(e,t,i=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Be}render(e,t,i){const s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}const VM={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Be(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Rs extends Hi{constructor(e,t=1,i,s){super(),this.strength=t,this.radius=i,this.threshold=s,this.resolution=e!==void 0?new ue(e.x,e.y):new ue(256,256),this.clearColor=new Be(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Vt(r,a,{type:Zt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const p=new Vt(r,a,{type:Zt});p.texture.name="UnrealBloomPass.h"+u,p.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(p);const h=new Vt(r,a,{type:Zt});h.texture.name="UnrealBloomPass.v"+u,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),r=Math.round(r/2),a=Math.round(a/2)}const o=VM;this.highPassUniforms=di.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Dt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ue(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=di.clone(Aa.uniforms),this.blendMaterial=new Dt({uniforms:this.copyUniforms,vertexShader:Aa.vertexShader,fragmentShader:Aa.fragmentShader,premultipliedAlpha:!0,blending:_o,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Be,this._oldClearAlpha=1,this._basic=new Qr,this._fsQuad=new Ta(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ue(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(e,t,i,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=Rs.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Rs.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],i=e/3;for(let s=0;s<e;s++)t.push(.39894*Math.exp(-.5*s*s/(i*i))/i);return new Dt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ue(.5,.5)},direction:{value:new ue(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new Dt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}Rs.BlurDirectionX=new ue(1,0),Rs.BlurDirectionY=new ue(0,1);const wa={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class WM extends Hi{constructor(){super(),this.isOutputPass=!0,this.uniforms=di.clone(wa.uniforms),this.material=new ud({name:wa.name,uniforms:this.uniforms,vertexShader:wa.vertexShader,fragmentShader:wa.fragmentShader}),this._fsQuad=new Ta(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Qe.getTransfer(this._outputColorSpace)===st&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Lo?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Po?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Do?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Rr?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===No?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Oo?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Io&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Ra={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new ue(1/1024,1/512)}},vertexShader:`

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

		}`},Ca={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new ue(1/1024,1/512)}},vertexShader:`

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

		}`},Tl={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new ue(1/1024,1/512)}},vertexShader:`

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

		}`};class XM extends Hi{constructor(){super(),this._edgesRT=new Vt(1,1,{depthBuffer:!1,type:Zt}),this._edgesRT.texture.name="SMAAPass.edges",this._weightsRT=new Vt(1,1,{depthBuffer:!1,type:Zt}),this._weightsRT.texture.name="SMAAPass.weights";const e=this,t=new Image;t.src=this._getAreaTexture(),t.onload=function(){e._areaTexture.needsUpdate=!0},this._areaTexture=new Pt,this._areaTexture.name="SMAAPass.area",this._areaTexture.image=t,this._areaTexture.minFilter=Bt,this._areaTexture.generateMipmaps=!1,this._areaTexture.flipY=!1;const i=new Image;i.src=this._getSearchTexture(),i.onload=function(){e._searchTexture.needsUpdate=!0},this._searchTexture=new Pt,this._searchTexture.name="SMAAPass.search",this._searchTexture.image=i,this._searchTexture.magFilter=Lt,this._searchTexture.minFilter=Lt,this._searchTexture.generateMipmaps=!1,this._searchTexture.flipY=!1,this._uniformsEdges=di.clone(Ra.uniforms),this._materialEdges=new Dt({defines:Object.assign({},Ra.defines),uniforms:this._uniformsEdges,vertexShader:Ra.vertexShader,fragmentShader:Ra.fragmentShader}),this._uniformsWeights=di.clone(Ca.uniforms),this._uniformsWeights.tDiffuse.value=this._edgesRT.texture,this._uniformsWeights.tArea.value=this._areaTexture,this._uniformsWeights.tSearch.value=this._searchTexture,this._materialWeights=new Dt({defines:Object.assign({},Ca.defines),uniforms:this._uniformsWeights,vertexShader:Ca.vertexShader,fragmentShader:Ca.fragmentShader}),this._uniformsBlend=di.clone(Tl.uniforms),this._uniformsBlend.tDiffuse.value=this._weightsRT.texture,this._materialBlend=new Dt({uniforms:this._uniformsBlend,vertexShader:Tl.vertexShader,fragmentShader:Tl.fragmentShader}),this._fsQuad=new Ta(null)}render(e,t,i){this._uniformsEdges.tDiffuse.value=i.texture,this._fsQuad.material=this._materialEdges,e.setRenderTarget(this._edgesRT),this.clear&&e.clear(),this._fsQuad.render(e),this._fsQuad.material=this._materialWeights,e.setRenderTarget(this._weightsRT),this.clear&&e.clear(),this._fsQuad.render(e),this._uniformsBlend.tColor.value=i.texture,this._fsQuad.material=this._materialBlend,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this._fsQuad.render(e))}setSize(e,t){this._edgesRT.setSize(e,t),this._weightsRT.setSize(e,t),this._materialEdges.uniforms.resolution.value.set(1/e,1/t),this._materialWeights.uniforms.resolution.value.set(1/e,1/t),this._materialBlend.uniforms.resolution.value.set(1/e,1/t)}dispose(){this._edgesRT.dispose(),this._weightsRT.dispose(),this._areaTexture.dispose(),this._searchTexture.dispose(),this._materialEdges.dispose(),this._materialWeights.dispose(),this._materialBlend.dispose(),this._fsQuad.dispose()}_getAreaTexture(){return"data:image/png;base64,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"}_getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}}function Fe(n,e,t){return{joints:{...n.joints,...e},offset:t??n.offset}}function cn(n,e,t){const i={},s=new Set([...Object.keys(n.joints),...Object.keys(e.joints)]);for(const o of s){const c=n.joints[o]??[0,0,0],l=e.joints[o]??[0,0,0];i[o]=[c[0]+(l[0]-c[0])*t,c[1]+(l[1]-c[1])*t,c[2]+(l[2]-c[2])*t]}const r=n.offset??[0,0,0],a=e.offset??[0,0,0];return{joints:i,offset:[r[0]+(a[0]-r[0])*t,r[1]+(a[1]-r[1])*t,r[2]+(a[2]-r[2])*t]}}const ce={joints:{hips:[.04,-.34,0],spine:[.06,.12,0],chest:[.04,.1,0],neck:[-.06,0,0],head:[0,.16,0],shoulderL:[0,0,-.12],armL:[-.78,.1,-.16],forearmL:[-2.3,0,.2],handL:[0,0,0],shoulderR:[0,0,.12],armR:[-.62,-.1,.2],forearmR:[-2.42,0,-.24],handR:[0,0,0],thighL:[-.34,.06,.06],shinL:[.42,0,0],footL:[-.12,0,0],thighR:[.3,-.06,-.06],shinR:[.5,0,0],footR:[-.42,0,0]},offset:[0,-.075,0]},tn=Fe(ce,{hips:[.06,-.42,0],spine:[.1,.16,0],thighR:[.44,-.06,-.06],shinR:[.62,0,0]},[0,-.11,-.05]),KM=Fe(ce,{hips:[.04,-.22,0],chest:[.04,-.16,0],shoulderL:[0,0,-.3],armL:[-1.42,.16,-.06],forearmL:[-.1,0,0],armR:[-.58,-.1,.24]},[0,-.075,.14]),YM=Fe(tn,{hips:[.05,.06,0],spine:[.1,-.2,0],chest:[.05,-.24,0],shoulderR:[0,0,.3],armR:[-1.48,-.18,.06],forearmR:[-.08,0,0],armL:[-.7,.1,-.34],forearmL:[-2.4,0,.24],thighR:[.12,-.06,-.06],footR:[-.62,0,0]},[0,-.085,.2]),qM=Fe(ce,{hips:[.04,-.02,0],spine:[.05,-.24,0],chest:[.02,-.2,0],shoulderL:[0,0,-.36],armL:[-1.62,.9,-.2],forearmL:[-1.5,0,0]},[0,-.075,.13]),JM=Fe(tn,{hips:[.04,.1,0],spine:[.06,-.26,0],chest:[.03,-.22,0],shoulderR:[0,0,.36],armR:[-1.6,-.95,.2],forearmR:[-1.52,0,0]},[0,-.09,.15]),ZM=Fe(tn,{hips:[-.06,.04,0],spine:[-.14,-.18,0],chest:[-.1,-.18,0],armR:[-1.15,-.2,.24],forearmR:[-1.95,0,-.1],armL:[-.72,.1,-.3]},[0,-.09,.17]),QM=Fe(tn,{hips:[.14,.04,0],spine:[.24,-.22,0],chest:[.16,-.2,.14],armR:[-2.1,-.5,.2],forearmR:[-.9,0,0]},[0,-.08,.22]),jd=Fe(ce,{hips:[.3,0,0],spine:[.2,-.18,0],armR:[-1.9,-.2,.06],forearmR:[-.1,0,0],thighL:[.9,.06,.06],shinL:[.9,0,0],thighR:[1,-.06,-.06],shinR:[.7,0,0]},[0,.16,.24]),$d=Fe(ce,{hips:[.04,.6,0],spine:[.04,.4,0],chest:[.02,.3,0],armR:[-1.5,-1.2,.4],forearmR:[-.4,0,0]},[0,-.075,.12]),jM=Fe(tn,{hips:[.04,.08,0],spine:[.08,-.28,0],chest:[.04,-.24,0],shoulderR:[0,0,.44],armR:[-1.9,-.85,.3],forearmR:[-2.4,0,0]}),ef=Fe(ce,{hips:[-.16,-.2,0],spine:[-.18,.08,0],armL:[-1.1,.3,-.2],armR:[-1.05,-.3,.24],forearmL:[-1.9,0,0],forearmR:[-1.9,0,0],thighR:[-1.55,-.1,-.06],shinR:[1.9,0,0],thighL:[-.16,.06,.06],shinL:[.18,0,0]},[0,.02,.06]),tf=Fe(ef,{hips:[-.2,-.16,0],thighR:[-1.75,-.1,-.06],shinR:[1.6,0,0],thighL:[-.6,.06,.06],shinL:[1.5,0,0]},[0,.42,.18]);function wl(n,e,t){return Fe(ce,{hips:[.02,-.9,e*.4],spine:[-e*.5,.4,e*.6],chest:[-e*.3,.2,e*.4],armL:[-.4,.2,-.9],forearmL:[-1.2,0,0],armR:[-.2,-.2,1.1],forearmR:[-.6,0,0],thighR:[n,-.2,-1.05],shinR:[.34,0,0],footR:[-.3,0,0],thighL:[-.08,.06,.06],shinL:[.14,0,0],footL:[.5,0,0]},[0,t,.02])}const $M=wl(-.55,.2,-.04),ey=wl(-1.15,.5,.02),ty=wl(-1.75,.85,.08),ny=Fe(ce,{hips:[-.18,-.28,0],spine:[-.24,.1,0],armL:[-.9,.2,-.5],armR:[-.5,-.2,.6],thighR:[-1.5,-.06,-.06],shinR:[.12,0,0],footR:[-.5,0,0]},[0,-.02,.04]),iy=Fe(ce,{hips:[0,-1.35,.14],spine:[-.2,.6,-.2],chest:[-.1,.4,-.1],armL:[-.8,.2,-.7],armR:[-.2,-.2,.9],thighR:[-1.35,-.1,-.5],shinR:[.1,0,0],footR:[-.2,0,0]},[0,.02,0]),ei=Fe(ce,{hips:[.02,2.4,0],spine:[.06,.5,0],chest:[.04,.3,0],armL:[-.5,.3,-.8],armR:[-.5,-.3,.8],thighR:[-.7,-.06,-.3],shinR:[1,0,0]},[0,-.04,0]);function La(n,e){const t=n.joints.hips??[0,0,0];return Fe(n,{hips:[t[0],e,t[2]]})}const nf=Fe(ei,{hips:[.06,Math.PI,0],spine:[.1,.4,0],chest:[.06,.2,0],armL:[-.9,.3,-.5],forearmL:[-1.6,0,0],armR:[-.9,-.3,.5],forearmR:[-1.6,0,0],thighR:[2,0,-.06],shinR:[.1,0,0],footR:[.3,0,0],thighL:[-.1,.06,.06],shinL:[.16,0,0]},[0,-.02,.06]),sf=Fe(ce,{hips:[.04,Math.PI*2-.34,0]}),Rl=Math.PI*2+.93,Cl=Fe(ei,{hips:[.02,Rl,.08],spine:[-.1,.4,-.08],chest:[-.06,.2,-.06],thighR:[-1.7,-.2,-.95],shinR:[.2,0,0],thighL:[-.06,.06,.06],shinL:[.12,0,0]},[0,.06,.04]),rf=Fe(ce,{spine:[.14,.06,0],neck:[.18,0,0],head:[.1,.1,0],armL:[-1.15,.35,-.42],forearmL:[-2.35,0,.5],armR:[-1.15,-.35,.42],forearmR:[-2.35,0,-.5]},[0,-.13,-.02]),sy=Fe(ce,{hips:[.08,-.4,.22],spine:[.18,.16,.3],chest:[.1,.1,.22],neck:[.1,0,.16],thighL:[-.46,.06,.06],shinL:[.6,0,0]},[.12,-.17,-.03]),af=Fe(ce,{neck:[-.24,-.1,0],head:[-.16,.24,.1],spine:[-.06,.14,0]},[0,-.08,-.05]),Vi=Fe(ce,{hips:[-.12,-.3,0],spine:[-.26,.2,.1],chest:[-.18,.16,.08],neck:[-.5,-.16,0],head:[-.3,.3,.16],armL:[-.4,.1,-.3],forearmL:[-1.6,0,0],armR:[-.3,-.1,.34],forearmR:[-1.5,0,0],thighL:[-.1,.06,.06],shinL:[.3,0,0]},[0,-.12,-.18]),Ll=Fe(Vi,{hips:[-.2,-.1,.3],spine:[-.34,.1,.34],neck:[-.55,-.2,.12],armL:[-.2,.2,-.9],forearmL:[-.7,0,0],armR:[-.1,-.2,.8],forearmR:[-.5,0,0],thighL:[-.7,.1,.2],shinL:[.8,0,0],thighR:[.2,-.06,-.2],shinR:[.4,0,0]},[.18,-.22,-.3]),Pl=Fe(ce,{hips:[.42,-.3,0],spine:[.44,.12,.06],chest:[.3,.1,.04],neck:[.36,0,0],head:[.16,.14,0],armL:[-.34,.4,-.5],forearmL:[-2.5,0,.5],armR:[-.28,-.4,.52],forearmR:[-2.5,0,-.5],thighL:[-.6,.06,.08],shinL:[.8,0,0],thighR:[-.2,-.06,-.08],shinR:[.7,0,0]},[0,-.22,-.08]),Dl=Fe(ce,{hips:[.06,-.36,.26],spine:[.1,.12,-.14],chest:[.04,.1,-.08],neck:[-.02,0,-.08],armL:[-.66,.1,-.24],forearmL:[-2.2,0,.22],armR:[-.5,-.1,.3],forearmR:[-2.3,0,-.28],thighL:[-.16,.06,.3],shinL:[.96,0,0],footL:[-.3,0,0],thighR:[.22,-.06,-.18],shinR:[.72,0,0]},[.1,-.2,-.04]),Pa=Fe(ce,{hips:[.8,-.2,0],spine:[.5,.1,0],chest:[.3,.1,0],neck:[-.5,0,0],armL:[-2.5,.4,-.3],forearmL:[-.5,0,0],armR:[-2.5,-.4,.3],forearmR:[-.5,0,0],thighL:[.7,.06,.1],shinL:[.2,0,0],thighR:[.7,-.06,-.1],shinR:[.2,0,0]},[0,-.5,-.34]),ti=Fe(ce,{hips:[.34,-.34,0],spine:[.28,.12,0],thighL:[-.9,.06,.1],shinL:[1.2,0,0],thighR:[-.6,-.06,-.1],shinR:[1.3,0,0]},[0,-.3,.04]),Xt=Fe(ce,{hips:[.12,-.16,0],spine:[.2,.06,0],chest:[.14,0,0],neck:[-.3,.3,0],armL:[-1.5,.5,-.5],forearmL:[-1.9,0,.6],armR:[-1.5,-.5,.5],forearmR:[-1.9,0,-.6],thighL:[-.3,.06,.1],shinL:[.4,0,0],thighR:[.1,-.06,-.1],shinR:[.5,0,0]},[0,-.11,.06]),of=Fe(ce,{hips:[-.1,-.3,0],armL:[-1.6,.3,-.7],forearmL:[-.9,0,0],armR:[-1.6,-.3,.7],forearmR:[-.9,0,0]},[0,-.08,-.2]),pr={joints:{hips:[-1.5,0,0],spine:[-.1,0,0],chest:[-.06,0,0],neck:[.5,0,0],head:[.2,0,0],armL:[-.6,.2,-.7],forearmL:[-1.8,0,0],armR:[-.6,-.2,.7],forearmR:[-1.8,0,0],thighL:[-.7,.1,.3],shinL:[1.3,0,0],footL:[-.4,0,0],thighR:[-.7,-.1,-.3],shinR:[1.3,0,0],footR:[-.4,0,0]},offset:[0,-.66,-.18]},yt={joints:{hips:[.24,0,0],spine:[.16,0,0],chest:[.1,0,0],neck:[-.2,0,0],armL:[-1.2,.3,-.4],forearmL:[-1.5,0,0],armR:[-1.2,-.3,.4],forearmR:[-1.5,0,0],thighL:[-1.5,.1,.5],shinL:[2.2,0,0],thighR:[-1.5,-.1,-.5],shinR:[2.2,0,0]},offset:[0,-.44,0]},Da=Fe(pr,{neck:[.8,0,0],spine:[.2,0,0],thighL:[-1.5,.1,.4],shinL:[1.7,0,0],thighR:[-1.5,-.1,-.4],shinR:[1.7,0,0],armL:[-1.4,.3,-.4],forearmL:[-1.7,0,0],armR:[-1.4,-.3,.4],forearmR:[-1.7,0,0]},[0,-.6,-.16]),cf={joints:{hips:[1.2,0,0],spine:[.3,0,0],chest:[.2,0,0],neck:[-.8,0,0],armL:[-2.2,.3,-.3],forearmL:[-1.6,0,0],armR:[-2.2,-.3,.3],forearmR:[-1.6,0,0],thighL:[-.4,.1,.3],shinL:[2.3,0,0],thighR:[-.4,-.1,-.3],shinR:[2.3,0,0]},offset:[0,-.5,-.1]},lf=Fe(yt,{spine:[.3,-.16,0],armR:[-2.6,-.4,.3],forearmR:[-.4,0,0]}),Il=Fe(yt,{spine:[.42,-.1,0],chest:[.24,-.1,0],armR:[-.5,-.2,.3],forearmR:[-.5,0,0]}),Cs=Fe(yt,{spine:[.4,.1,0],chest:[.24,.1,0],neck:[-.4,.2,0],armL:[-1.9,.7,-.55],forearmL:[-2.5,0,.7],armR:[-1.9,-.7,.55],forearmR:[-2.5,0,-.7]},[0,-.46,-.1]),Ia=Fe(pr,{hips:[-1.35,.4,0],spine:[-.3,.2,0],armL:[-1.9,.6,-.5],forearmL:[-2.2,0,.4],armR:[-1.9,-.6,.5],forearmR:[-2.2,0,-.4],thighL:[-1.4,.1,.4],shinL:[.9,0,0],thighR:[-1.3,-.1,-.4],shinR:[.6,0,0]},[0,-.6,.1]),Na=Fe(pr,{neck:[.9,.2,0],spine:[.24,.1,0],armL:[-1.5,.6,-.5],forearmL:[-2.4,0,.6],armR:[-1.5,-.6,.5],forearmR:[-2.4,0,-.6],thighL:[-1.1,.1,.4],shinL:[1.1,0,0]},[0,-.56,-.16]),Oa=Fe(pr,{neck:[.3,.3,0],head:[.1,.3,0],armL:[-.3,.2,-1.1],forearmL:[-.6,0,0],armR:[-.3,-.2,1.1],forearmR:[-.5,0,0],thighL:[-.3,.1,.4],shinL:[.5,0,0],thighR:[-.4,-.1,-.3],shinR:[.7,0,0]},[0,-.68,-.3]),mr={joints:{hips:[.6,-.3,0],spine:[.4,.2,0],chest:[.2,.1,0],neck:[-.5,0,0],armL:[-2,.4,-.4],forearmL:[-.8,0,0],armR:[-1.2,-.3,.5],forearmR:[-1.4,0,0],thighL:[-1.5,.1,.3],shinL:[1.6,0,0],thighR:[-.2,-.1,-.3],shinR:[2.2,0,0]},offset:[0,-.44,-.06]},gr=Fe(ce,{hips:[.62,-.3,0],spine:[.4,.14,0],chest:[.24,.1,0],neck:[-.5,0,0],armL:[-2.2,.5,-.3],forearmL:[-.7,0,0],armR:[-2.2,-.5,.3],forearmR:[-.7,0,0],thighL:[-1.3,.1,.2],shinL:[1.5,0,0],thighR:[-.1,-.1,-.2],shinR:[1.7,0,0]},[0,-.42,.36]),Nl=Fe(gr,{hips:[.9,-.24,0],spine:[.3,.1,0],thighL:[-.9,.1,.2],shinL:[1,0,0],thighR:[.4,-.1,-.2],shinR:[.9,0,0]},[0,-.5,.62]),xr=Fe(ce,{hips:[-.2,-.2,0],spine:[-.24,.1,0],chest:[-.14,.1,0],armL:[-2.4,.5,-.4],forearmL:[-1.4,0,0],armR:[-2.4,-.5,.4],forearmR:[-1.4,0,0],thighL:[-.5,.1,.14],shinL:[.7,0,0],thighR:[-.3,-.1,-.14],shinR:[.6,0,0]},[0,-.02,.2]),Ol=Fe(ce,{hips:[.8,-.2,0],spine:[.5,.1,0],armL:[-2.6,.4,-.3],forearmL:[-.6,0,0],armR:[-2.6,-.4,.3],forearmR:[-.6,0,0],thighL:[-1.4,.1,.3],shinL:[2,0,0],thighR:[-1.4,-.1,-.3],shinR:[2,0,0]},[0,-.44,.34]),ry=Fe(xr,{hips:[-.7,-.2,0],spine:[-.5,.1,0],chest:[-.3,.1,0],neck:[.4,0,0],armL:[-2.8,.5,-.4],armR:[-2.8,-.5,.4],thighL:[-.2,.1,.14],thighR:[0,-.1,-.14]},[0,.06,.08]),kn=Fe(ce,{hips:[.02,-.2,0],armL:[-.5,.1,-.24],forearmL:[-1.4,0,.1],armR:[-.5,-.1,.24],forearmR:[-1.4,0,-.1]},[0,-.04,0]),hf=Fe(ce,{hips:[.2,-.1,0],spine:[.16,.06,0],armL:[-1.3,.3,-.2],forearmL:[-.5,0,0],armR:[-1.3,-.3,.2],forearmR:[-.5,0,0]},[0,-.1,.06]),vr=Fe(ce,{hips:[-.06,-.1,0],spine:[-.12,0,0],neck:[.2,0,0],head:[.1,0,0],armL:[-2.9,.3,-.5],forearmL:[-.3,0,0],armR:[-2.9,-.3,.5],forearmR:[-.3,0,0],thighL:[-.1,.06,.06],shinL:[.12,0,0],thighR:[.1,-.06,-.06],shinR:[.12,0,0]},[0,-.01,0]),Ul={joints:{hips:[.16,0,0],spine:[.1,0,0],chest:[.06,0,0],neck:[-.3,0,0],armL:[-.9,.2,-.4],forearmL:[-1.5,0,0],armR:[-.9,-.2,.4],forearmR:[-1.5,0,0],thighL:[-1.5,.1,.2],shinL:[1.5,0,0],thighR:[-1.5,-.1,-.2],shinR:[1.5,0,0]},offset:[0,-.42,-.06]},Ls=Fe(ce,{hips:[-.1,-.3,.24],spine:[-.2,.1,.2],neck:[-.3,-.2,.14],head:[-.1,.2,.2],armL:[-.4,.2,-.5],forearmL:[-1,0,0],armR:[-.3,-.2,.5],forearmR:[-.9,0,0],thighL:[-.5,.1,.2],shinL:[.7,0,0],thighR:[.2,-.06,-.16],shinR:[.5,0,0]},[.08,-.2,-.06]),kl=Fe(ce,{neck:[-.16,0,0],armL:[-2.3,.3,-.24],forearmL:[-2.2,0,.4],armR:[-.6,-.1,.2],forearmR:[-2.3,0,-.24]},[0,-.09,-.06]);function Ze(n,e,t){return{duration:n,impactAt:e,keys:t,variants:1}}function z(n,e,t){return t?{t:n,pose:e,ease:t}:{t:n,pose:e}}function Kt(n,e,t,i=ce){return Ze(t,.45,[z(0,i),z(.2,n,"anticipate"),z(.45,e,"snap"),z(.53,cn(n,e,1.08),"linear"),z(.74,cn(i,e,.22),"settle"),z(1,i,"settle")])}function Wi(n,e,t=ce){const i=[z(0,t)],s=["anticipate","snap","settle"];return e.forEach((r,a)=>{i.push(z((a+1)/e.length,r,s[Math.min(a,s.length-1)]))}),Ze(n,.72,i)}const ay={strike_jab:Kt(ce,KM,.4),strike_cross:Kt(tn,YM,.5),strike_hook_left:Kt(ce,qM,.52),strike_hook_right:Kt(tn,JM,.54),strike_uppercut:Kt(tn,ZM,.5),strike_overhand:Kt(tn,QM,.62),strike_elbow:Kt(Xt,jM,.48,Xt),strike_knee:Kt(Xt,ef,.54,Xt),strike_superman:Ze(.72,.52,[z(0,ce),z(.22,ti,"anticipate"),z(.52,jd,"snap"),z(.6,cn(ti,jd,1.06),"linear"),z(1,ce,"settle")]),strike_backfist:Ze(.62,.58,[z(0,ce),z(.34,ei,"anticipate"),z(.58,$d,"snap"),z(.66,cn(ei,$d,1.07),"linear"),z(1,ce,"settle")]),strike_flying_knee:Ze(.82,.48,[z(0,ce),z(.2,ti,"anticipate"),z(.48,tf,"snap"),z(.58,cn(ti,tf,1.05),"linear"),z(.86,ti,"settle"),z(1,ce,"settle")]),kick_low:Kt(tn,$M,.52),kick_body:Kt(tn,ey,.62),kick_head:Kt(tn,ty,.72),kick_front:Kt(ce,ny,.52),kick_side:Kt(tn,iy,.62),kick_spinning_back:Ze(.88,.64,[z(0,ce),z(.24,La(ei,1.1),"anticipate"),z(.46,ei,"linear"),z(.64,nf,"snap"),z(.72,cn(ei,nf,1.06),"linear"),z(1,sf,"settle")]),kick_wheel:Ze(.96,.68,[z(0,ce),z(.2,La(ei,1.1),"anticipate"),z(.38,ei,"linear"),z(.54,La(Cl,Rl-2.1),"linear"),z(.68,Cl,"snap"),z(.77,La(Cl,Rl+.22),"linear"),z(1,sf,"settle")]),ground_punch:Kt(yt,Il,.4,yt),ground_elbow:Kt(lf,Il,.46,yt),ground_hammerfist:Kt(lf,Il,.42,yt)},oy={td_double_leg:Wi(1,[gr,Nl,yt]),td_single_leg:Wi(1.05,[gr,xr,yt]),td_body_lock:Wi(1,[Xt,xr,yt],Xt),td_trip:Wi(.9,[Xt,Nl,yt],Xt),td_throw:Wi(1.05,[Xt,xr,Ol,yt],Xt),td_suplex:Ze(1.35,.66,[z(0,Xt),z(.24,xr),z(.46,ry),z(.66,Ol),z(.84,mr),z(1,yt)]),td_ankle_pick:Wi(.92,[gr,Ol,yt]),td_cage_drag:Wi(1,[Xt,Nl,yt],Xt)};function mi(n=1.2){return Ze(n,.75,[z(0,yt),z(.34,Cs),z(.75,Cs),z(1,Cs)])}function uf(n=1.25){return Ze(n,.72,[z(0,yt),z(.32,mr),z(.72,Ia),z(1,Ia)])}const cy={sub_rnc:mi(1.3),sub_guillotine:mi(1.15),sub_triangle:Ze(1.25,.74,[z(0,Da),z(.36,Na),z(.74,Na),z(1,Na)]),sub_armbar:Ze(1.3,.74,[z(0,yt),z(.34,Cs),z(.74,Ia),z(1,Ia)]),sub_kimura:mi(1.2),sub_americana:mi(1.15),sub_darce:mi(1.2),sub_anaconda:mi(1.2),sub_arm_triangle:mi(1.25),sub_neck_crank:mi(1.1),sub_heel_hook:uf(1.25),sub_kneebar:uf(1.3)},ly={def_sprawl:Ze(.7,.4,[z(0,ce),z(.24,ti),z(.5,Pa),z(.72,Pa),z(1,ce)]),clinch_enter:Ze(.7,.6,[z(0,ce),z(.4,ti),z(1,Xt)]),clinch_break:Ze(.6,.35,[z(0,Xt),z(.4,of),z(1,ce)]),scramble:Ze(.9,.5,[z(0,Da),z(.3,mr),z(.62,cf),z(1,mr)]),knockdown:Ze(1.15,.28,[z(0,ce),z(.14,Vi,"snap"),z(.42,Ll,"settle"),z(.72,Oa,"anticipate"),z(1,Oa,"settle")]),stun_wobble:Ze(1,.36,[z(0,ce),z(.26,Vi,"snap"),z(.62,Ls,"settle"),z(1,Ls,"smooth")]),reaction_cut:Ze(.9,.35,[z(0,ce),z(.3,af),z(.6,kl),z(1,ce)]),stance_idle:Ze(2.2,.5,[z(0,ce),z(.25,tn),z(.5,ce),z(.75,kn),z(1,ce)]),intro_touch_gloves:Ze(1.3,.55,[z(0,kn),z(.5,hf),z(.7,hf),z(1,ce)]),round_end_return:Ze(1.4,.5,[z(0,ce),z(.4,kn),z(1,kn)]),corner_seated:Ze(2,.5,[z(0,Ul),z(.5,Ul),z(1,Ul)]),ref_intervene:Ze(1,.4,[z(0,ce),z(.4,of),z(1,kn)]),doctor_check:Ze(1.6,.5,[z(0,kn),z(.4,kl),z(.8,kl),z(1,kn)]),fight_end_celebrate:Ze(2,.35,[z(0,ce),z(.3,vr),z(.6,vr),z(.8,kn),z(1,vr)]),decision_announce:Ze(2,.5,[z(0,kn),z(.35,kn),z(.6,vr),z(1,vr)])},df={...ay,...oy,...cy,...ly},hy=df.stance_idle,ff={NONE:Ze(.3,0,[z(0,ce),z(1,ce)]),LIGHT:Ze(.42,0,[z(0,ce),z(.22,af,"snap"),z(1,ce,"settle")]),HEAVY:Ze(.72,0,[z(0,ce),z(.18,cn(ce,Vi,1.12),"snap"),z(.42,Vi,"linear"),z(.68,Ls,"settle"),z(1,ce,"settle")]),STAGGER:Ze(1.1,0,[z(0,ce),z(.15,cn(ce,Vi,1.15),"snap"),z(.42,Ll,"settle"),z(.76,Ls,"smooth"),z(1,Ls,"settle")]),DROP:Ze(1.25,0,[z(0,ce),z(.13,cn(ce,Vi,1.18),"snap"),z(.4,Ll,"settle"),z(.72,Oa,"anticipate"),z(1,Oa,"settle")]),BLOCK:Ze(.44,0,[z(0,ce),z(.2,rf,"snap"),z(.5,rf,"linear"),z(1,ce,"settle")]),SLIP:Ze(.5,0,[z(0,ce),z(.26,sy,"snap"),z(1,ce,"settle")]),BODY_FOLD:Ze(.85,0,[z(0,ce),z(.16,cn(ce,Pl,1.1),"snap"),z(.44,Pl,"linear"),z(.78,cn(ce,Pl,.4),"settle"),z(1,ce,"settle")]),LEG_BUCKLE:Ze(.72,0,[z(0,ce),z(.14,cn(ce,Dl,1.12),"snap"),z(.4,Dl,"linear"),z(.74,cn(ce,Dl,.35),"settle"),z(1,ce,"settle")]),SPRAWL_DEFEND:Ze(.8,0,[z(0,ce),z(.22,ti,"anticipate"),z(.5,Pa,"snap"),z(1,ce,"settle")])};function Ua(n,e){const t=e==="REACTOR";switch(n){case"STANDING":return ce;case"CLINCH":case"CAGE_CLINCH":return Xt;case"TAKEDOWN_ATTEMPT":return t?Pa:gr;case"GROUND_TOP":case"SIDE_CONTROL":case"MOUNT":return t?pr:yt;case"GROUND_BOTTOM":return t?yt:Da;case"GUARD":case"HALF_GUARD":return t?Da:yt;case"BACK_CONTROL":return t?cf:Cs;case"SCRAMBLE":return mr;case"SUBMISSION_ATTEMPT":return t?Na:Cs;case"STUNNED":return Ls;case"RECOVERY":return ti;default:return ce}}function Fl(n){switch(n){case"GROUND_TOP":case"GROUND_BOTTOM":case"GUARD":case"HALF_GUARD":case"SIDE_CONTROL":case"MOUNT":case"BACK_CONTROL":case"SCRAMBLE":case"SUBMISSION_ATTEMPT":return!0;default:return!1}}const pf=[1,.93,1.08,.97],uy=[0,.06,-.05,.03];function dy(n,e){if(e<=0)return n;const t=e%pf.length,i=pf[t]??1,s=uy[t]??0;return i===1&&s===0?n:{...n,duration:n.duration*i,keys:n.keys.map(({t:r,pose:a})=>({t:r,pose:{joints:{...a.joints,spine:fy(a.joints.spine,s)},offset:a.offset}}))}}function fy(n,e){const t=n??[0,0,0];return[t[0],t[1]+e,t[2]]}function py(n,e=0){return dy(df[n]??hy,e)}const gi=["hips","spine","chest","neck","head","shoulderL","armL","forearmL","handL","shoulderR","armR","forearmR","handR","thighL","shinL","footL","thighR","shinR","footR"],yn={hips:{parent:null,offset:[0,.92,0],length:.14,axis:"UP",radius:.122,shape:"BOX"},spine:{parent:"hips",offset:[0,.14,0],length:.24,axis:"UP",radius:.128,shape:"BOX"},chest:{parent:"spine",offset:[0,.24,0],length:.2,axis:"UP",radius:.152,shape:"BOX"},neck:{parent:"chest",offset:[0,.2,0],length:.07,axis:"UP",radius:.058,shape:"BOX"},head:{parent:"neck",offset:[0,.07,0],length:.2,axis:"UP",radius:.108,shape:"SPHERE"},shoulderL:{parent:"chest",offset:[.175,.145,0],length:.06,axis:"DOWN",radius:.066,shape:"SPHERE"},armL:{parent:"shoulderL",offset:[0,-.06,0],length:.29,axis:"DOWN",radius:.055,shape:"CAPSULE"},forearmL:{parent:"armL",offset:[0,-.29,0],length:.26,axis:"DOWN",radius:.047,shape:"CAPSULE"},handL:{parent:"forearmL",offset:[0,-.26,0],length:.12,axis:"DOWN",radius:.066,shape:"SPHERE"},shoulderR:{parent:"chest",offset:[-.175,.145,0],length:.06,axis:"DOWN",radius:.066,shape:"SPHERE"},armR:{parent:"shoulderR",offset:[0,-.06,0],length:.29,axis:"DOWN",radius:.055,shape:"CAPSULE"},forearmR:{parent:"armR",offset:[0,-.29,0],length:.26,axis:"DOWN",radius:.047,shape:"CAPSULE"},handR:{parent:"forearmR",offset:[0,-.26,0],length:.12,axis:"DOWN",radius:.066,shape:"SPHERE"},thighL:{parent:"hips",offset:[.095,0,0],length:.44,axis:"DOWN",radius:.082,shape:"CAPSULE"},shinL:{parent:"thighL",offset:[0,-.44,0],length:.43,axis:"DOWN",radius:.068,shape:"CAPSULE"},footL:{parent:"shinL",offset:[0,-.43,0],length:.24,axis:"FORWARD",radius:.05,shape:"BOX"},thighR:{parent:"hips",offset:[-.095,0,0],length:.44,axis:"DOWN",radius:.082,shape:"CAPSULE"},shinR:{parent:"thighR",offset:[0,-.44,0],length:.43,axis:"DOWN",radius:.068,shape:"CAPSULE"},footR:{parent:"shinR",offset:[0,-.43,0],length:.24,axis:"FORWARD",radius:.05,shape:"BOX"}},Bl=(()=>{const n=[],e=new Set;for(;n.length<gi.length;){let t=!1;for(const i of gi){if(e.has(i))continue;const s=yn[i].parent;(s===null||e.has(s))&&(n.push(i),e.add(i),t=!0)}if(!t)throw new Error("SKELETON contains a cycle")}return n})(),mf=[0,0,0];function bn(n){const e={};for(const t of gi)e[t]=n.joints[t]??mf;return{joints:e,offset:n.offset??mf}}function Gl(n,e,t){return[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t]}function zl(n,e){let t=(e-n)%(Math.PI*2);return t>Math.PI&&(t-=Math.PI*2),t<=-Math.PI&&(t+=Math.PI*2),t}function Hl(n,e,t){if(t<=0)return n;const i={};for(const s of gi){const r=n.joints[s],a=e.joints[s];i[s]=[r[0]+zl(r[0],a[0])*t,r[1]+zl(r[1],a[1])*t,r[2]+zl(r[2],a[2])*t]}return{joints:i,offset:Gl(n.offset,e.offset,t)}}function my(n,e,t){if(t<=0)return n;if(t>=1)return e;const i={};for(const s of gi)i[s]=Gl(n.joints[s],e.joints[s],t);return{joints:i,offset:Gl(n.offset,e.offset,t)}}const gf={linear:n=>n,smooth:n=>n*n*(3-2*n),anticipate:n=>n*n*(2-n*.35),snap:n=>Math.pow(n*n*(3-2*n),.6),settle:n=>1-Math.pow(1-n,2.2)};function xf(n,e){const t=e<=0?0:e>=1?1:e;return(gf[n]??gf.smooth)(t)}function ka(n){return xf("smooth",n)}function vf(n,e){const t=n.keys,i=t[0],s=t[t.length-1];if(!i||!s)throw new Error("clip has no keyframes");if(e<=i.t)return bn(i.pose);if(e>=s.t)return bn(s.pose);for(let r=1;r<t.length;r++){const a=t[r],o=t[r-1];if(!(!a||!o)&&e<=a.t){const c=a.t-o.t,l=c<=0?1:xf(a.ease??"smooth",(e-o.t)/c);return my(bn(o.pose),bn(a.pose),l)}}return bn(s.pose)}function gy(n,e,t,i,s){const r=new Map,a=c=>{let l=r.get(c);return l||(l=vf(n,e-c/Math.max(t,1e-4)),r.set(c,l)),l},o={};for(const c of gi)o[c]=a(i[s[c]]??0).joints[c];return{joints:o,offset:a(0).offset}}const Vl=.06,_f=.03;function _r(n,e){return n>e?e:n<-e?-e:n}function mn(n,e,t,i,s){const r=n[e];n[e]=[r[0]+_r(t,Vl),r[1]+_r(i,Vl),r[2]+_r(s,Vl)]}function xy(n,e){const{time:t,phase:i,fatigue:s,grounded:r}=e,a=e.guard??.5,o=e.verve??.5,c=Math.max(0,Math.min(1,e.stagger??0)),l=Math.max(0,Math.min(1,e.feint??0)),u=Math.max(0,Math.min(1,e.intensity));if(u<=.001)return n;const p=t+i,h=.38+s*.42,d=Math.sin(p*Math.PI*2*h),g=(.01+s*.017)*u,x=r?0:u*(1-s*.45)*(.65+o*.7),f=Math.sin(p*Math.PI*2*(1.63-s*.5+o*.25)),m=Math.sin(p*Math.PI*2*.41+1.2),y=Math.sin(p*Math.PI*2*.29+2.6),b=Math.sin(p*Math.PI*2*.87+.4),S=Math.sin(p*Math.PI*2*.73+2.1),A=u*(r?.3:1),E=(s+c*.8+(1-a)*.35)*u*(r?.2:1),R=c===0?0:Math.sin(p*Math.PI*2*.55)*c*u,_={...n.joints};mn(_,"spine",d*g+y*.012*x+l*.05,m*.02*x+R*.05,m*.014*x+R*.06),mn(_,"chest",d*g*.8,y*.016*x,-m*.01*x),mn(_,"neck",-d*g*.5+E*.05,y*.02*u,0),mn(_,"head",y*.02*u,b*.026*u,m*.012*u),mn(_,"armL",b*.03*A+E*.055-l*.06,S*.012*A,-b*.016*A),mn(_,"forearmL",S*.034*A+E*.05,0,b*.012*A),mn(_,"armR",S*.028*A+E*.055,b*.012*A,S*.016*A),mn(_,"forearmR",b*.031*A+E*.05,0,-S*.012*A),mn(_,"thighL",-f*.022*x,0,m*.014*x),mn(_,"shinL",f*.026*x,0,0),mn(_,"thighR",f*.022*x,0,-m*.014*x),mn(_,"shinR",-f*.024*x,0,0);const T=_r((-Math.abs(f)*.014+d*.004)*x-l*.012-c*.02,_f),P=_r(m*.018*x+R*.02,_f);return{joints:_,offset:[n.offset[0]+P,n.offset[1]+T,n.offset[2]]}}function vy(n,e=.5){const t=(n-1)/4.5;return Math.max(0,Math.min(1,t*(1.45-e*.9)))}function _y(n,e,t){const i=7.5-Math.max(0,Math.min(1,n))*3.6,s=e/(Math.PI*2)*i,r=(t+s)%i/i,a=.16;return r<a?Math.sin(r/a*Math.PI):0}function Sy(n,e){let t=0;for(const i of n){if(i.at>e)break;const s=e-i.at,r=Math.exp(-s/3.2);t=Math.max(t,i.magnitude*r)}return Math.min(1,t)}const Sf=["LEGS","HIPS","SPINE","ARM_L","ARM_R","HEAD"],Wl={hips:"HIPS",spine:"SPINE",chest:"SPINE",neck:"HEAD",head:"HEAD",shoulderL:"ARM_L",armL:"ARM_L",forearmL:"ARM_L",handL:"ARM_L",shoulderR:"ARM_R",armR:"ARM_R",forearmR:"ARM_R",handR:"ARM_R",thighL:"LEGS",shinL:"LEGS",footL:"LEGS",thighR:"LEGS",shinR:"LEGS",footR:"LEGS"},My={LEGS:1,HIPS:1,SPINE:1,ARM_L:1,ARM_R:1,HEAD:1};function yy(n){const e=bn(ce),t={LEGS:0,HIPS:0,SPINE:0,ARM_L:0,ARM_R:0,HEAD:0};for(const i of n.keys){const s=bn(i.pose);for(const r of gi){let a=0;for(let c=0;c<3;c++)a+=Math.abs(s.joints[r][c]-e.joints[r][c]);const o=Wl[r];t[o]=Math.max(t[o],a)}}return t}const by=1.5;function Ey(n){const e=yy(n),t={};for(const i of Sf)t[i]=Math.min(1,e[i]/by);return t}const Mf=new Map;function yf(n){let e=Mf.get(n);return e||(e=Ey(n),Mf.set(n,e)),e}const Ay=new Set(["knockdown","td_double_leg","td_single_leg","td_body_lock","td_trip","td_throw","td_suplex","td_ankle_pick","td_cage_drag","scramble","def_sprawl","round_end_return","corner_seated","doctor_check","fight_end_celebrate","decision_announce","intro_touch_gloves"]);function bf(n){return Ay.has(n)||n.startsWith("sub_")}const Ef={HIPS:0,LEGS:.006,SPINE:.022,ARM_L:.048,ARM_R:.048,HEAD:.034};Math.max(...Object.values(Ef));const Af=.055,Ty=.16,Fa=.24,wy=.055,Ry=.28,Cy=2.6,Ly=[[.115,.155],[-.105,-.185]];function Py(n,e){const t=Math.cos(e),i=Math.sin(e);return[n[0]*t+n[1]*i,-n[0]*i+n[1]*t]}function Ba(n,e,t=0){const i=Ly[e],s=Py([i[0],i[1]+t],n.yaw);return[n.x+s[0],n.z+s[1]]}function Dy(n,e){return Math.hypot(n[0]-e[0],n[1]-e[1])}function Tf(n,e={}){const t=e.phase??0,i=Math.max(0,Math.min(1,e.mobility??.5)),s=Math.max(0,Math.min(1,e.pressure??.5)),r=Ty*(1.35-i*.7),a=Cy*(1.5-i*.9),o=(s-.5)*.06,c=n[0];if(!c)return{steps:[],start:[[0,0],[0,0]]};const l=[Ba(c,0,o),Ba(c,1,o)],u=[l[0],l[1]],p=[c.time-a*t,c.time-a*(1-t)],h=[];let d=-1/0;for(let g=1;g<n.length;g++){const x=n[g];if(!(x.time<d))for(const f of[0,1]){const m=Ba(x,f,o),y=Dy(u[f],m),b=x.time-p[f]>a;if(y<r&&!(b&&y>.02)||x.time-p[f]<Ry)continue;const S=n.find(E=>E.time>=x.time+Fa)??x,A=Ba(S,f,o);h.push({foot:f,lift:x.time,plant:x.time+Fa,from:u[f],to:A}),u[f]=A,p[f]=x.time+Fa,d=x.time+Fa;break}}return{steps:h,start:l}}function Iy(n,e,t){let i=n.start[e];for(const s of n.steps)if(s.foot===e){if(t>=s.plant){i=s.to;continue}if(t>=s.lift){const r=(t-s.lift)/Math.max(s.plant-s.lift,1e-4),a=ka(r);return{x:s.from[0]+(s.to[0]-s.from[0])*a,z:s.from[1]+(s.to[1]-s.from[1])*a,y:Af+Math.sin(Math.PI*r)*wy,swing:Math.sin(Math.PI*r)}}break}return{x:i[0],y:Af,z:i[1],swing:0}}const Ps=3.75,wf=.26,Ny=.09,Oy=.16,Uy=.09;function Ga(n,e){return Math.hypot(n,e)}function ky(n,e){const t=[];let i=0,s=0,r=0;const a=e.pressure[0]-e.pressure[1],o=e.mobility[0]-e.mobility[1];for(const[c,l]of n.entries()){const u=Math.sin(c*.043+e.phase[0])*.05;r+=Ny*(o*.7+Math.sin(c*.031+e.phase[1])*.5);const p=Math.sin(r),h=Math.cos(r);i+=p*(a*wf+u),s+=h*(a*wf+u);let d=i-p*l,g=s-h*l,x=i+p*l,f=s+h*l;const m=Ga(d,g),y=Ga(x,f),b=m>y?0:1,S=Math.max(m,y);let A=-1;if(S>Ps){const R=S-Ps,_=b===0?d:x,T=b===0?g:f,P=Ga(_,T)||1;i-=_/P*R,s-=T/P*R,A=b;const L=e.mobility[b]*.6+e.reach[b]*.4,k=Math.sin(c*.21+e.phase[b])>=0?1:-1,Y=Oy*L*k,q=Math.cos(Y),G=Math.sin(Y),J=i*q-s*G,K=i*G+s*q;i=J,s=K,r+=Y;const ee=Uy*e.reach[b],se=Ga(i,s)||1;i-=i/se*ee,s-=s/se*ee,d=i-Math.sin(r)*l,g=s-Math.cos(r)*l,x=i+Math.sin(r)*l,f=s+Math.cos(r)*l}const E=Fy(i,s,r,l);i=E[0],s=E[1],t.push({centre:[i,s],facing:r,pinned:A})}return t}function Fy(n,e,t,i){const s=Math.sin(t),r=Math.cos(t),a=n*s+e*r,o=n*r-e*s,c=Math.min(i,Ps);if(Math.hypot(Math.abs(a)+c,o)<=Ps)return[n,e];const l=a*a+o*o;if(l===0)return[n,e];const u=2*Math.abs(a)*c,p=c*c-Ps*Ps,h=(-u+Math.sqrt(Math.max(0,u*u-4*l*p)))/(2*l);return[n*h,e*h]}const Rf=3.9,By=4.42,Gy=2.1,Xl=.9,zy=2.7,Cf={WIDE:{offset:[-3.5,3.4,1.5],lookHeight:1,fov:52},BROADCAST:{offset:[-3.35,2,1.15],lookHeight:1.15,fov:46},CLOSE:{offset:[-2.75,1.8,.95],lookHeight:1.32,fov:42},IMPACT:{offset:[-2.5,1.7,.85],lookHeight:1.38,fov:42},GROUND_OVERHEAD:{offset:[-2.5,3.3,.9],lookHeight:.35,fov:46},CAGE_SIDE:{offset:[-2.6,1.65,2.4],lookHeight:1.1,fov:44},REPLAY:{offset:[-3.1,1.9,-1.05],lookHeight:1.28,fov:42},CORNER:{offset:[-2.4,2.1,-2.85],lookHeight:1.2,fov:46}};function Lf(n,e,t,i,s){const r=Math.sin(i),a=Math.cos(i),o=a*s,c=-r*s;let l=n[0]*o+n[2]*r,u=n[0]*c+n[2]*a;const p=Math.hypot(e,t);if(p<Xl)return[l,u];const h=Math.min(1,(p-Xl)/(zy-Xl)),d=h*h*(3-2*h),g=e/p,x=t/p,f=n[2]*(r*g+a*x);if(f>0){const m=2*f*d;l-=m*g,u-=m*x}return[l,u]}function Pf(n,e,t,i,s){const r=t*t+i*i;if(r===0)return 1;const a=2*(n*t+e*i),o=n*n+e*e-s*s;return r+a+o<=0?1:Math.min(1,Math.max(0,(-a+Math.sqrt(Math.max(0,a*a-4*r*o)))/(2*r)))}function Hy(n,e,t,i){const s=Pf(n,e,t,i,Rf);if(s===1)return 1;const r=Gy/Math.hypot(t,i),a=Pf(n,e,t,i,By);return Math.min(1,Math.max(s,Math.min(a,r)))}function Vy(n){const e=[];let t=1;for(const i of n){const s=Df(i.centre[0],i.centre[1],i.facing,t),r=Df(i.centre[0],i.centre[1],i.facing,-t);(r<s-Xy||s>Rf&&r<s)&&(t=-t),e.push(t)}return e}function Df(n,e,t,i){const s=Lf(Wy,n,e,t,i);return Math.hypot(n+s[0],e+s[1])}const Wy=[-3.2,2,1.1],Xy=.75;function Ky(n,e,t,i,s=0,r=1){const a=Cf[n]??Cf.BROADCAST,o=Lf(a.offset,e,t,s,r),c=o[0]+Math.sin(i*.53)*.035+Math.sin(i*1.31)*.012,l=o[1]+Math.sin(i*.43+2.6)*.03,u=a.offset[1]+Math.sin(i*.71+1.4)*.022,p=Hy(e,t,c,l);return{position:[e+c*p,u,t+l*p],target:[e,a.lookHeight+Math.sin(i*.61+.8)*.012,t],fov:a.fov}}function Yy(n){const[e,t,i]=n,s=Math.cos(e),r=Math.sin(e),a=Math.cos(t),o=Math.sin(t),c=Math.cos(i),l=Math.sin(i);return[a*c,-a*l,o,s*l+r*o*c,s*c-r*o*l,-r*a,r*l-s*o*c,r*c+s*o*l,s*a]}function If(n,e){return[n[0]*e[0]+n[3]*e[1]+n[6]*e[2],n[1]*e[0]+n[4]*e[1]+n[7]*e[2],n[2]*e[0]+n[5]*e[1]+n[8]*e[2]]}function Nf(n,e){return[n[0]-e[0],n[1]-e[1],n[2]-e[2]]}function Kl(n){return Math.hypot(n[0],n[1],n[2])}function Yl(n){const e=Kl(n)||1;return[n[0]/e,n[1]/e,n[2]/e]}function ql(n,e){const t=Math.cos(e),i=Math.sin(e);return[n[0]*t+n[2]*i,n[1],-n[0]*i+n[2]*t]}function qy(n,e,t){const i=Yl(e),s=Math.cos(t),r=Math.sin(t),a=i[0]*n[0]+i[1]*n[1]+i[2]*n[2],o=[i[1]*n[2]-i[2]*n[1],i[2]*n[0]-i[0]*n[2],i[0]*n[1]-i[1]*n[0]];return[n[0]*s+o[0]*r+i[0]*a*(1-s),n[1]*s+o[1]*r+i[1]*a*(1-s),n[2]*s+o[2]*r+i[2]*a*(1-s)]}function Jl(n,e){return[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]]}function Jy(n){const e=Math.asin(Math.max(-1,Math.min(1,n[2])));return Math.abs(n[2])<.9999999?[Math.atan2(-n[5],n[8]),e,Math.atan2(-n[1],n[0])]:[Math.atan2(n[7],n[4]),e,0]}function Zy(n,e,t,i=[0,0,1]){const s=Kl(n),r=e+t,a=Math.abs(e-t)+1e-4,o=Math.max(a,Math.min(r-1e-5,s)),c=Yl(n);let l=Jl(i,c);Kl(l)<1e-5&&(l=Jl([1,0,0],c)),l=Yl(l);const u=(e*e+o*o-t*t)/(2*e*o),p=Math.acos(Math.max(-1,Math.min(1,u))),h=(e*e+t*t-o*o)/(2*e*t),d=Math.PI-Math.acos(Math.max(-1,Math.min(1,h))),g=qy(c,l,-p),x=[-g[0],-g[1],-g[2]],f=l,m=Jl(f,x),y=[f[0],x[0],m[0],f[1],x[1],m[1],f[2],x[2],m[2]];return{thigh:Jy(y),shin:[d,0,0],overreached:s>r-1e-4}}const Qy=.1,jy=.09,$y=1.5,Of=.07,e1=.15,t1=.3,n1=.02,i1=.9,s1=.09,r1=.18;function Uf(n,e){return{fighterId:n,pressure:.5,mobility:.5,recovery:.5,engine:.5,guard:.5,deception:.5,reach:.5,phase:e*Math.PI}}const a1={DROP:1,STAGGER:.8,HEAVY:.45,BODY_FOLD:.4,LEG_BUCKLE:.3};function o1(n){if(Fl(n))return .46;switch(n){case"CLINCH":case"CAGE_CLINCH":return .82;case"TAKEDOWN_ATTEMPT":return .8;case"STUNNED":case"RECOVERY":return 1.3;default:return 1.05}}function c1(n,e,t){return t==="KNOCKDOWN"||t==="STUN"||e==="STAGGER"||e==="DROP"?Of:bf(n)?t1:e1}const kf=new Set(["STRIKE","SIGNIFICANT_STRIKE"]);function l1(n){return n.directive.targetState}function h1(n,e,t,i="CONDENSED",s){const r=s??[Uf(e,0),Uf(t,1)],a=[...n].sort((x,f)=>x.event.sequence-f.event.sequence),o=[];let c=0;for(const[x,f]of a.entries()){const{event:m,directive:y}=f,b=py(y.clip,y.variant),S=y.speed>0?y.speed:1,A=b.duration/S,E=o[o.length-1],R=E!==void 0&&E.actorId!==void 0&&E.actorId===y.actorId&&kf.has(E.event.eventType)&&kf.has(m.eventType)&&m.timestamp-E.event.timestamp<i1,_=i==="REALTIME"?Math.max(m.timestamp,c+jy):x===0?0:c+(R?n1:Qy),T=l1(f);o.push({index:x,start:_,end:_+A,event:m,clip:b,clipName:y.clip,camera:Fl(T)&&y.camera==="BROADCAST"?"GROUND_OVERHEAD":y.camera,position:T,grounded:Fl(T),spacing:o1(T),impactAt:_+A*b.impactAt,reaction:ff[y.reaction]??ff.NONE,reactionName:y.reaction,actorId:y.actorId,reactorId:y.reactorId,centre:[0,0,0],facing:0,pinned:-1,cameraSide:1,blend:R?Of:c1(y.clip,y.reaction,m.eventType),claim:bf(y.clip)?My:yf(b),follows:R}),c=_+A}const l=ky(o.map(x=>x.spacing/2),{pressure:[r[0].pressure,r[1].pressure],reach:[r[0].reach,r[1].reach],mobility:[r[0].mobility,r[1].mobility],phase:[r[0].phase,r[1].phase]}),u=Vy(l),p=o.map((x,f)=>{const m=l[f];return{...x,centre:[m.centre[0],0,m.centre[1]],facing:m.facing,pinned:m.pinned,cameraSide:u[f]}});o.length=0,o.push(...p);const h=[[],[]];for(const x of o){const f=a1[x.reactionName];if(f===void 0||x.reactorId===void 0)continue;const m=x.reactorId===e?0:1;h[m].push({at:x.impactAt,magnitude:f})}const d={beats:o,duration:c+$y,fighterA:e,fighterB:t,pacing:i,footPlans:[{steps:[],start:[[0,0],[0,0]]},{steps:[],start:[[0,0],[0,0]]}],profiles:r,staggerHits:h},g=u1(d);return{...d,footPlans:[Tf(g[0],{phase:0,mobility:r[0].mobility,pressure:r[0].pressure}),Tf(g[1],{phase:.5,mobility:r[1].mobility,pressure:r[1].pressure})]}}function u1(n){const e=.03333333333333333,t=[],i=[];for(let s=0;s<=n.duration;s+=e){const r=Ff(n,s);if(!r)continue;const a=Math.max(r.end-r.start,.001),o=Hf(n,r,(s-r.start)/a);t.push({time:s,x:o.a[0],z:o.a[2],yaw:o.yawA}),i.push({time:s,x:o.b[0],z:o.b[2],yaw:o.yawB})}return[t,i]}function Ff(n,e){const t=n.beats;if(t.length===0)return;let i=0,s=t.length-1,r;for(;i<=s;){const a=i+s>>1,o=t[a];if(!o)break;o.start<=e?(r=o,i=a+1):s=a-1}return r??t[0]}const Bf=bn(Ua("STANDING","ACTOR"));function Gf(n,e,t){const i=Math.max(e.end-e.start,.001),s=(t-e.start)/i,r=e.actorId===void 0,a=bn(Ua(e.position,"ACTOR")),o=gy(e.clip,s,i,Ef,Wl),c=Vf(a,o,e.claim),l=bn(Ua(e.position,"REACTOR")),u=d1(e,t),p=r?c:Vf(l,u.pose,u.claim),h=Math.max(.3,Math.min(1,Math.abs(s-e.clip.impactAt)*3)),d=r?h:u.active?.35:1,g=1-e.claim.LEGS,x=r?g:1-u.claim.LEGS,f=r?!0:e.actorId===n.fighterA;return{a:f?c:p,b:f?p:c,aRest:f?h:d,bRest:f?d:h,aLegs:f?g:x,bLegs:f?x:g}}function d1(n,e){const t=bn(Ua(n.position,"REACTOR"));if(e<n.impactAt)return{pose:t,claim:zf,active:!1};const i=e-n.impactAt,s=n.reaction.duration;if(i>=s)return{pose:t,claim:zf,active:!1};const r=vf(n.reaction,i/s),a=Math.min(1,i/s1),o=Math.min(1,(s-i)/r1),c=ka(Math.min(a,o)),l=yf(n.reaction),u={};for(const p of Sf)u[p]=l[p]*c;return{pose:Hl(t,r,c),claim:u,active:!0}}const zf={LEGS:0,HIPS:0,SPINE:0,ARM_L:0,ARM_R:0,HEAD:0};function Hf(n,e,t){const i=n.beats[e.index-1],s=i?i.centre:e.centre,r=i?i.spacing:e.spacing,a=i?i.facing:e.facing,o=ka(Math.max(0,Math.min(1,t))),c=s[0]+(e.centre[0]-s[0])*o,l=s[2]+(e.centre[2]-s[2])*o,u=(r+(e.spacing-r)*o)/2,p=a+(e.facing-a)*o,h=ql([0,0,-u],p),d=ql([0,0,u],p);return{a:[c+h[0],0,l+h[2]],b:[c+d[0],0,l+d[2]],yawA:p,yawB:p+Math.PI,half:u}}function Vf(n,e,t){const i={};for(const r of gi){const a=t[Wl[r]],o=n.joints[r],c=e.joints[r];i[r]=a>=1?c:a<=0?o:[o[0]+(c[0]-o[0])*a,o[1]+(c[1]-o[1])*a,o[2]+(c[2]-o[2])*a]}const s=Math.max(t.HIPS,t.LEGS);return{joints:i,offset:[n.offset[0]+(e.offset[0]-n.offset[0])*s,n.offset[1]+(e.offset[1]-n.offset[1])*s,n.offset[2]+(e.offset[2]-n.offset[2])*s]}}const f1=yn.thighL.length,p1=yn.shinL.length,m1=[["thighL","shinL","footL"],["thighR","shinR","footR"]];function g1(n,e,t,i,s,r){if(r<=.02)return n;const a={...n.joints},o=yn.hips.offset,c=[o[0]+n.offset[0],o[1]+n.offset[1],o[2]+n.offset[2]],l=Yy(n.joints.hips),u=If(l,[0,0,1]);for(const[p,h]of m1.entries()){const d=Iy(i,p,s),g=ql([d.x-e[0],d.y-e[1],d.z-e[2]],-t),x=If(l,Nf(g,c)),f=yn[h[0]].offset,m=Nf(x,f),y=Zy(m,f1,p1,u);for(const[E,R]of[h[0],h[1]].entries()){const _=a[R],T=E===0?y.thigh:y.shin;a[R]=[_[0]+(T[0]-_[0])*r,_[1]+(T[1]-_[1])*r,_[2]+(T[2]-_[2])*r]}const S=-(a[h[0]][0]+a[h[1]][0])+d.swing*.55,A=a[h[2]];a[h[2]]=[A[0]+(S-A[0])*r*.8,A[1],A[2]]}return{joints:a,offset:n.offset}}function x1(n,e){if(e<=0)return n;const t={...n.joints},i=.42;for(const[s,r]of[["neck",.35],["head",.65]]){const a=t[s],o=Math.max(-i,Math.min(i,-a[1]))*e*r;t[s]=[a[0],a[1]+o,a[2]]}return{joints:t,offset:n.offset}}function v1(n,e){const t=Ff(n,e);if(!t)return{time:e,a:{id:n.fighterA,pose:Bf,position:[0,0,-.81],yaw:0,legFreedom:1,rest:1,stagger:0,feint:0,fatigue:0},b:{id:n.fighterB,pose:Bf,position:[0,0,.81],yaw:Math.PI,legFreedom:1,rest:1,stagger:0,feint:0,fatigue:0},camera:"WIDE",cameraSide:1,description:"",round:1,roundTime:"05:00"};const i=Math.max(t.end-t.start,.001),s=e-t.start,r=s/i;let a=Gf(n,t,e);const o=n.beats[t.index-1];if(o&&s<t.blend){const x=Gf(n,o,o.end),f=ka(s/t.blend);a={a:Hl(x.a,a.a,f),b:Hl(x.b,a.b,f),aRest:x.aRest+(a.aRest-x.aRest)*f,bRest:x.bRest+(a.bRest-x.bRest)*f,aLegs:x.aLegs+(a.aLegs-x.aLegs)*f,bLegs:x.bLegs+(a.bLegs-x.bLegs)*f}}const c=Hf(n,t,r),l=[{pose:a.a,rest:a.aRest,legs:a.aLegs,root:c.a,yaw:c.yawA,plan:n.footPlans[0]},{pose:a.b,rest:a.bRest,legs:a.bLegs,root:c.b,yaw:c.yawB,plan:n.footPlans[1]}],u=l.map((x,f)=>{const m=n.profiles[f],y=vy(t.event.round,m.engine),b=t.grounded?0:Sy(n.staggerHits[f],e)*(1-m.recovery*.45),S=t.grounded?0:_y(m.deception,m.phase,e)*x.rest;return{profile:m,fatigue:y,stagger:b,feint:S}}),p=l.map((x,f)=>{const m=u[f];let y=xy(x.pose,{time:e,phase:m.profile.phase,intensity:x.rest,fatigue:m.fatigue,grounded:t.grounded,guard:m.profile.guard,verve:m.profile.mobility,stagger:m.stagger,feint:m.feint});return y=x1(y,t.grounded?0:.55*x.rest*(1-m.stagger*.6)),t.grounded||(y=g1(y,x.root,x.yaw,x.plan,e,x.legs)),y}),h=t.actorId===void 0,d=h?!0:t.actorId===n.fighterA,g=t.grounded&&!h?.22:0;return{time:e,beat:t,a:{id:n.fighterA,pose:p[0],position:[c.a[0],d?g:0,c.a[2]],yaw:c.yawA,legFreedom:a.aLegs,rest:a.aRest,stagger:u[0].stagger,feint:u[0].feint,fatigue:u[0].fatigue},b:{id:n.fighterB,pose:p[1],position:[c.b[0],d?0:g,c.b[2]],yaw:c.yawB,legFreedom:a.bLegs,rest:a.bRest,stagger:u[1].stagger,feint:u[1].feint,fatigue:u[1].fatigue},camera:t.camera,cameraSide:t.cameraSide,description:t.event.description,round:t.event.round,roundTime:t.event.roundTime}}const Fn=Math.PI/2,ni=-Math.PI/2,Zl=0,Ql=Math.PI,jl=n=>n==="L"?Zl:Ql,Wf=n=>n==="L"?Ql:Zl;function _1(n,e){let t=(n-e)%(Math.PI*2);return t>Math.PI&&(t-=Math.PI*2),t<=-Math.PI&&(t+=Math.PI*2),t}function S1(n,e){if(!n)return 1;let t=1;for(const i of n){const s=_1(e,i.at);t+=i.amount*Math.exp(-(s*s)/(2*i.spread*i.spread))}return t}const Xf=[{at:Fn+.5,spread:.33,amount:.075},{at:Fn-.5,spread:.33,amount:.075},{at:Fn,spread:.09,amount:-.04}],Kf=[{at:Fn+.34,spread:.24,amount:.05},{at:Fn-.34,spread:.24,amount:.05},{at:Fn,spread:.11,amount:-.045}],$l=[{at:Zl,spread:.42,amount:.07},{at:Ql,spread:.42,amount:.07}],Ds={at:ni,spread:.13,amount:-.055},Yf=[{at:ni+.58,spread:.32,amount:.06},{at:ni-.58,spread:.32,amount:.06}],za=[{at:ni,spread:.6,amount:.07}],qf=n=>[{at:jl(n),spread:.6,amount:.09},{at:ni,spread:.4,amount:.05}],Jf=n=>[{at:Fn,spread:.48,amount:.09},{at:ni,spread:.52,amount:.08},{at:Wf(n),spread:.22,amount:-.04}],M1=n=>[{at:jl(n),spread:.52,amount:.07},{at:ni,spread:.45,amount:.05}],eh=n=>[{at:Fn,spread:.48,amount:.08},{at:jl(n),spread:.44,amount:.05},{at:ni,spread:.48,amount:.06}],Zf=n=>[{at:ni,spread:.42,amount:.12},{at:Wf(n),spread:.3,amount:.05}],Ha=new Map(Bl.map((n,e)=>[n,e]));function y1(n){let[e,t,i]=[0,0,0],s=n;for(;s;){const r=yn[s];e+=r.offset[0],t+=r.offset[1],i+=r.offset[2],s=r.parent}return[e,t,i]}function b1(n){switch(yn[n].axis){case"UP":return[0,1,0];case"DOWN":return[0,-1,0];default:return[0,0,1]}}function Xi(n,e){const t=y1(n),i=b1(n),s=yn[n].length*e;return[t[0]+i[0]*s,t[1]+i[1]*s,t[2]+i[2]*s]}function Qf(n){const e=n.weights;if(!e)return[[n.bone,1]];const t=Object.entries(e),i=t.reduce((s,[,r])=>s+r,0);return i>0?t.map(([s,r])=>[s,r/i]):[[n.bone,1]]}function En(n,e=14,t=!0,i=!0){const s=[],r=[],a=[],o=[],c=[],l=(g,x,f,m,y,b)=>{const S=s.length/3;s.push(g,x,f),r.push(m,y);const A=b[0],E=b[1];return a.push(Ha.get(A?.[0]??"hips")??0,Ha.get(E?.[0]??"hips")??0,0,0),o.push(A?.[1]??1,E?.[1]??0,0,0),S},u=[];n.forEach((g,x)=>{const f=Xi(g.bone,g.at),m=Qf(g),y=yn[g.bone].axis==="FORWARD",b=x/Math.max(n.length-1,1),S=[];for(let A=0;A<e;A++){const E=A/e*Math.PI*2,R=S1(g.lobes,E),_=Math.cos(E)*g.rx*R,T=y?Math.sin(E)*g.rz*R:0,P=y?0:Math.sin(E)*g.rz*R;S.push(l(f[0]+_,f[1]+T,f[2]+P,A/e,b,m))}u.push(S)});for(let g=0;g<u.length-1;g++){const x=u[g],f=u[g+1];for(let m=0;m<e;m++){const y=(m+1)%e;c.push(x[m],f[m],x[y]),c.push(x[y],f[m],f[y])}}const p=(g,x,f)=>{const m=Xi(g.bone,g.at),y=l(m[0],m[1],m[2],.5,f?0:1,Qf(g));for(let b=0;b<e;b++){const S=(b+1)%e;f?c.push(y,x[S],x[b]):c.push(y,x[b],x[S])}},h=n[0],d=n[n.length-1];return t&&h&&u[0]&&p(h,u[0],!0),i&&d&&u[u.length-1]&&p(d,u[u.length-1],!1),{positions:s,uvs:r,skinIndices:a,skinWeights:o,indices:c}}function Ki(n,e,t,i=[0,0,0],s=16,r=12,a){const o=[],c=[],l=[],u=[],p=[],h=Xi(n,e),d=Ha.get(n)??0;for(let g=0;g<=r;g++){const x=g/r*Math.PI;for(let f=0;f<=s;f++){const m=f/s*Math.PI*2,y=Math.sin(x)*Math.cos(m),b=Math.cos(x),S=Math.sin(x)*Math.sin(m),A=a?a(y,b,S):1;o.push(h[0]+i[0]+y*t[0]*A,h[1]+i[1]+b*t[1]*A,h[2]+i[2]+S*t[2]*A),c.push(f/s,g/r),l.push(d,0,0,0),u.push(1,0,0,0)}}for(let g=0;g<r;g++)for(let x=0;x<s;x++){const f=g*(s+1)+x,m=f+s+1;p.push(f,f+1,m,f+1,m+1,m)}return{positions:o,uvs:c,skinIndices:l,skinWeights:u,indices:p}}function Va(n){const e={positions:[],uvs:[],skinIndices:[],skinWeights:[],indices:[]};for(const t of n){const i=e.positions.length/3;e.positions.push(...t.positions),e.uvs.push(...t.uvs),e.skinIndices.push(...t.skinIndices),e.skinWeights.push(...t.skinWeights);for(const s of t.indices)e.indices.push(s+i)}return e}const th=n=>[{bone:`shoulder${n}`,at:-.35,rx:.073,rz:.071,weights:{chest:.45,[`shoulder${n}`]:.55},lobes:qf(n)},{bone:`shoulder${n}`,at:1,rx:.062,rz:.06,weights:{[`shoulder${n}`]:.5,[`arm${n}`]:.5},lobes:qf(n)},{bone:`arm${n}`,at:.3,rx:.057,rz:.055,weights:{[`arm${n}`]:1},lobes:Jf(n)},{bone:`arm${n}`,at:.75,rx:.046,rz:.045,lobes:Jf(n).map(e=>({...e,amount:e.amount*.4}))},{bone:`arm${n}`,at:1,rx:.043,rz:.043,weights:{[`arm${n}`]:.5,[`forearm${n}`]:.5}},{bone:`forearm${n}`,at:.22,rx:.05,rz:.048,weights:{[`forearm${n}`]:1},lobes:M1(n)},{bone:`forearm${n}`,at:.75,rx:.037,rz:.035},{bone:`forearm${n}`,at:1,rx:.034,rz:.033,weights:{[`forearm${n}`]:.5,[`hand${n}`]:.5}}],nh=n=>[{bone:`thigh${n}`,at:0,rx:.1,rz:.098,weights:{[`thigh${n}`]:.6,hips:.4},lobes:eh(n)},{bone:`thigh${n}`,at:.3,rx:.09,rz:.089,weights:{[`thigh${n}`]:1},lobes:eh(n)},{bone:`thigh${n}`,at:.85,rx:.063,rz:.062,lobes:eh(n).map(e=>({...e,amount:e.amount*.3}))},{bone:`thigh${n}`,at:1,rx:.058,rz:.058,weights:{[`thigh${n}`]:.5,[`shin${n}`]:.5}},{bone:`shin${n}`,at:.22,rx:.07,rz:.072,weights:{[`shin${n}`]:1},lobes:Zf(n)},{bone:`shin${n}`,at:.7,rx:.043,rz:.044,lobes:Zf(n).map(e=>({...e,amount:e.amount*.3}))},{bone:`shin${n}`,at:1,rx:.038,rz:.04,weights:{[`shin${n}`]:.5,[`foot${n}`]:.5}}],jf=[{bone:"hips",at:-.62,rx:.104,rz:.084,weights:{hips:1},lobes:za},{bone:"hips",at:-.2,rx:.128,rz:.098,weights:{hips:1},lobes:za},{bone:"hips",at:.2,rx:.137,rz:.103,weights:{hips:1},lobes:za},{bone:"hips",at:.55,rx:.143,rz:.106,lobes:[...za,Ds]},{bone:"hips",at:1,rx:.132,rz:.096,weights:{hips:.55,spine:.45},lobes:[...Kf,Ds]},{bone:"spine",at:.35,rx:.113,rz:.083,weights:{spine:1},lobes:[...Kf,Ds]},{bone:"spine",at:.75,rx:.138,rz:.096,lobes:[...$l,Ds,{at:Fn,spread:.5,amount:.03}]},{bone:"spine",at:1,rx:.152,rz:.104,weights:{spine:.5,chest:.5},lobes:[...Xf,...$l,Ds]},{bone:"chest",at:.5,rx:.163,rz:.11,weights:{chest:1},lobes:[...Xf,...$l,Ds]},{bone:"chest",at:.88,rx:.15,rz:.101,lobes:[...Yf,{at:Fn,spread:.6,amount:.03}]},{bone:"chest",at:1.05,rx:.132,rz:.098,weights:{chest:.75,neck:.25},lobes:Yf}],$f=[{bone:"neck",at:-.55,rx:.075,rz:.072,weights:{chest:.55,neck:.45}},{bone:"neck",at:.1,rx:.068,rz:.065,weights:{neck:1}},{bone:"neck",at:.75,rx:.062,rz:.06,weights:{neck:1}}],E1=[{bone:"hips",at:-.42,rx:.152,rz:.124,weights:{hips:1}},{bone:"hips",at:-.12,rx:.156,rz:.127,weights:{hips:1}},{bone:"hips",at:.3,rx:.153,rz:.124,weights:{hips:1}},{bone:"hips",at:.72,rx:.145,rz:.116,weights:{hips:.9,spine:.1}},{bone:"hips",at:1.08,rx:.134,rz:.106,weights:{hips:.55,spine:.45}},{bone:"hips",at:1.34,rx:.126,rz:.099,weights:{hips:.25,spine:.75}}];function ep(n,e){const t=.3+Math.max(0,Math.min(1,e))*.48,i=`thigh${n}`;return[{bone:i,at:-.3,rx:.116,rz:.108,weights:{hips:.86,[i]:.14}},{bone:i,at:-.12,rx:.124,rz:.116,weights:{hips:.5,[i]:.5}},{bone:i,at:.06,rx:.126,rz:.12,weights:{hips:.15,[i]:.85}},{bone:i,at:t*.55,rx:.122,rz:.117,weights:{[i]:1}},{bone:i,at:t,rx:.113,rz:.109},{bone:i,at:t+.035,rx:.101,rz:.097}]}const ih=n=>[{bone:`foot${n}`,at:-.15,rx:.042,rz:.05,weights:{[`foot${n}`]:1}},{bone:`foot${n}`,at:.5,rx:.048,rz:.045},{bone:`foot${n}`,at:.92,rx:.04,rz:.032}],Yi=0,Is=[.093,.115,.104],xi=[0,.105,.004];function gt(n,e,t){const i=(n-e)/t;return Math.exp(-i*i)}function tp(n,e,t){const i=Math.max(0,t),s=i*i,r=Math.abs(n),a=.045*Math.max(0,-t)*gt(e,-.05,.45),o=-.03*Math.max(0,e-.7),c=-.035*i*gt(r,.78,.2)*gt(e,.32,.2),l=.062*i*gt(e,.2,.15)*gt(n,0,.55),u=-.038*i*gt(r,.33,.19)*gt(e,.04,.15),p=.105*s*gt(n,0,.13)*gt(e,0,.24),h=.165*s*i*gt(n,0,.16)*gt(e,-.17,.1),d=.055*s*i*gt(r,.14,.06)*gt(e,-.23,.06),g=-.022*s*gt(n,0,.055)*gt(e,-.31,.055),x=.05*s*gt(n,0,.28)*gt(e,-.41,.085),f=-.04*s*gt(n,0,.32)*gt(e,-.41,.028),m=.04*i*gt(r,.5,.2)*gt(e,-.1,.18),y=.052*i*gt(n,0,.24)*gt(e,-.7,.15),b=-.085*i*Math.max(0,-e-.35)*(.5+r);return 1+a+o+c+l+u+p+h+d+g+x+f+m+y+b}function A1(n,e,t){return 1-.18*Math.max(0,e-.45)}const T1=1.085;function np(n,e,t=24,i=12){const s=[],r=[],a=[],o=[],c=[],l=Xi("head",Yi),u=Ha.get("head")??0,p=(h,d,g,x,f,m)=>{const y=s.length/3,b=tp(h,d,g)*x;return s.push(l[0]+xi[0]+h*Is[0]*b,l[1]+xi[1]+d*Is[1]*b,l[2]+xi[2]+g*Is[2]*b),r.push(f,m),a.push(u,0,0,0),o.push(1,0,0,0),y};for(let h=0;h<=i;h++){const d=h/i;for(let g=0;g<=t;g++){const x=g/t*Math.PI*2,f=Math.cos(x),m=Math.sin(x),y=n*(1-e*Math.max(0,m)),b=d*y,S=Math.sin(b)*f,A=Math.cos(b),E=Math.sin(b)*m;p(S,A,E,h===i?.965:T1,g/t,d)}}for(let h=0;h<i;h++)for(let d=0;d<t;d++){const g=h*(t+1)+d,x=g+t+1;c.push(g,g+1,x,g+1,x+1,x)}return{positions:s,uvs:r,skinIndices:a,skinWeights:o,indices:c}}const sh=[{sweep:1.08,tilt:.3},{sweep:1.28,tilt:.22}];function w1(n=0){const e=sh[n%sh.length]??sh[0];return np(e.sweep,e.tilt)}function R1(){const n=np(.62,-.85,20,8),e={...n,positions:[...n.positions]},t=Xi("head",Yi)[1]+xi[1];for(let i=0;i<e.positions.length/3;i++)e.positions[i*3+1]=t-(e.positions[i*3+1]-t);return e}function C1(){return Va([Ki("head",Yi,ip,[Sr[0],Sr[1],Sr[2]],12,9),Ki("head",Yi,ip,[-.031,Sr[1],Sr[2]],12,9)])}const ip=[.0112,.01,.0105],Sr=[.031,.1085,.087];function sp(n){return Ki("head",Yi,[.009,.021,.014],[(n==="L"?1:-1)*.081,.098,-.016],10,8,A1)}function L1(){const n=[],e=i=>{for(const s of i)n.push({at:Xi(s.bone,s.at),radius:(s.rx+s.rz)/2})};e(jf),e($f);for(const i of["L","R"])e(th(i)),e(nh(i)),e(ih(i));const t=Xi("head",Yi);return n.push({at:[t[0]+xi[0],t[1]+xi[1],t[2]+xi[2]],radius:(Is[0]+Is[2])/2}),n}const P1=.5,rp=.62;function D1(n,e,t){let i=0;for(const s of t){const r=s.at[0]-n[0],a=s.at[1]-n[1],o=s.at[2]-n[2],c=Math.hypot(r,a,o);if(c<1e-6)continue;const l=(e[0]*r+e[1]*a+e[2]*o)/c;if(l<=0)continue;const u=Math.max(c,s.radius*1.05);i+=l*s.radius*s.radius/(u*u)}return rp+(1-rp)*Math.exp(-i*P1)}function I1(n){const e=n[1],t=Math.hypot(n[0],n[2])*2.2+Math.max(0,1.35-e)*.25,i=Math.min(.16,t*.16),s=Math.min(.06,Math.max(0,e-1)*.05);return[1+i*.55+s,1-i*.16+s,1-i*.42+s]}function ap(n){return Ki(`shoulder${n}`,.2,[.086,.09,.084],[n==="L"?-.026:.026,.006,0],18,14)}function N1(){return Va([En(jf,22),En($f,16),ap("L"),ap("R"),Ki("head",Yi,Is,xi,48,40,tp),sp("L"),sp("R"),En(th("L"),18),En(th("R"),18),En(nh("L"),20),En(nh("R"),20),En(ih("L"),14),En(ih("R"),14)])}function O1(n=.5){return Va([En(E1,18),En(ep("L",n),16),En(ep("R",n),16)])}function U1(){return Va([Ki("handL",.45,[.055,.067,.059],[0,0,.006],14,10),Ki("handR",.45,[.055,.067,.059],[0,0,.006],14,10)])}function k1(n=256,e=.5){const t=document.createElement("canvas");t.width=n,t.height=n;const i=t.getContext("2d");if(!i)return new Pt;const s=i.createImageData(n,n),r=(c,l)=>{const u=Math.sin(c*127.1+l*311.7)*43758.5453;return u-Math.floor(u)},a=(c,l,u)=>{const p=c/u,h=l/u,d=Math.floor(p),g=Math.floor(h),x=p-d,f=h-g,m=x*x*(3-2*x),y=f*f*(3-2*f),b=r(d,g),S=r(d+1,g),A=r(d,g+1),E=r(d+1,g+1);return(b+(S-b)*m)*(1-y)+(A+(E-A)*m)*y};for(let c=0;c<n;c++)for(let l=0;l<n;l++){const u=a(l,c,26)*.55+a(l,c,9)*.3+a(l,c,3)*.15,p=Math.round(255*(.5+(u-.5)*e)),h=(c*n+l)*4;s.data[h]=p,s.data[h+1]=p,s.data[h+2]=p,s.data[h+3]=255}i.putImageData(s,0,0);const o=new bg(t);return o.wrapS=Xs,o.wrapT=Xs,o.repeat.set(3,3),o}let op;function cp(){return op??(op=k1(256,.75)),op}const F1={skin:11565650,trunks:12071485,gloves:12857914,hair:2826265,hairStyle:0,trunkLength:.22,beard:!0,subsurface:11026986},B1={skin:8211760,trunks:2777028,gloves:3104464,hair:1643280,hairStyle:1,trunkLength:.85,beard:!1,subsurface:9187872},Wa="#include <opaque_fragment>",G1=`
  {
    vec3 ssViewDir = normalize( vViewPosition );
    vec3 ssLightDir = normalize( ( viewMatrix * vec4( uKeyDirection, 0.0 ) ).xyz );
    float ssBack = pow( clamp( dot( ssViewDir, -ssLightDir ), 0.0, 1.0 ), 3.0 );
    float ssThin = pow( 1.0 - clamp( dot( normal, ssViewDir ), 0.0, 1.0 ), 2.0 );
    float ssWrap = clamp( ( dot( normal, ssLightDir ) + 0.35 ) / 1.35, 0.0, 1.0 );
    outgoingLight += uSubsurface * uSubsurfaceStrength * ( ssBack * ssThin + 0.18 * ssWrap * ssThin );
  }
  ${Wa}`,z1=new D(2.6,10.5,3.4).normalize();function H1(n,e){const t=new dd({color:n.skin,roughness:.74,metalness:0,vertexColors:!0,clearcoat:.1,clearcoatRoughness:.62,clearcoatRoughnessMap:e,sheen:.22,sheenColor:new Be(16767426),sheenRoughness:.8,roughnessMap:e,bumpMap:e,bumpScale:.0032});return t.onBeforeCompile=i=>{if(i.uniforms.uSubsurface={value:new Be(n.subsurface)},i.uniforms.uSubsurfaceStrength={value:.62},i.uniforms.uKeyDirection={value:z1},i.fragmentShader=i.fragmentShader.replace("#include <common>",`#include <common>
      uniform vec3 uSubsurface;
      uniform float uSubsurfaceStrength;
      uniform vec3 uKeyDirection;`),!i.fragmentShader.includes(Wa))throw new Error(`skin shader: three.js no longer emits ${Wa}`);i.fragmentShader=i.fragmentShader.replace(Wa,G1)},t}function V1(n){const e=new Gt;return e.setAttribute("position",new ct(n.positions,3)),e.setAttribute("uv",new ct(n.uvs,2)),e.setAttribute("skinIndex",new Wc(n.skinIndices,4)),e.setAttribute("skinWeight",new ct(n.skinWeights,4)),e.setIndex(n.indices),e.computeVertexNormals(),e}function W1(n,e){const t=n.getAttribute("position"),i=n.getAttribute("normal"),s=L1(),r=new Float32Array(t.count*3);for(let a=0;a<t.count;a++){const o=[t.getX(a),t.getY(a),t.getZ(a)],c=[i.getX(a),i.getY(a),i.getZ(a)],l=D1(o,c,s),[u,p,h]=e?I1(o):[1,1,1];r[a*3]=l*u,r[a*3+1]=l*p,r[a*3+2]=l*h}n.setAttribute("color",new fn(r,3))}class lp{constructor(e){Ye(this,"root");Ye(this,"bones",new Map);Ye(this,"materials",[]);Ye(this,"geometries",[]);Ye(this,"meshes",[]);this.root=new us;for(const p of Bl){const h=yn[p],d=new Nu;d.position.set(h.offset[0],h.offset[1],h.offset[2]);const g=h.parent===null?this.root:this.bones.get(h.parent);if(!g)throw new Error(`joint ${p} has an unbuilt parent`);g.add(d),this.bones.set(p,d)}this.root.updateMatrixWorld(!0);const t=Bl.map(p=>this.bones.get(p)),i=new tl(t),s=cp(),r=H1(e,s),a=new $n({vertexColors:!0,color:e.trunks,roughness:.9,metalness:0,roughnessMap:s}),o=new dd({vertexColors:!0,color:e.gloves,roughness:.42,metalness:0,clearcoat:.55,clearcoatRoughness:.35,roughnessMap:s}),c=new $n({vertexColors:!0,color:e.hair,roughness:.82,metalness:0,roughnessMap:s}),l=new $n({color:1314572,roughness:.28,metalness:0});this.materials.push(r,a,o,c,l);const u=[[N1(),r,!0],[O1(e.trunkLength),a,!0],[U1(),o,!0],[w1(e.hairStyle),c,!1],[C1(),l,!1]];e.beard&&u.push([R1(),c,!1]);for(const[p,h,d]of u){const g=V1(p);h!==l&&W1(g,h===r),this.geometries.push(g);const x=new mg(g,h);x.castShadow=d,x.receiveShadow=!0,x.frustumCulled=!1,this.root.add(x),x.bind(i),this.meshes.push(x)}}applyPose(e){for(const[i,s]of this.bones){const r=e.joints[i];s.rotation.set(r[0],r[1],r[2])}const t=this.bones.get("hips");if(t){const i=yn.hips.offset;t.position.set(i[0]+e.offset[0],i[1]+e.offset[1],i[2]+e.offset[2])}}setPlacement(e,t){this.root.position.set(e[0],e[1],e[2]),this.root.rotation.y=t}headPosition(e){const t=this.bones.get("head");return t?t.getWorldPosition(e):e.set(0,1.6,0)}dispose(){for(const e of this.geometries)e.dispose();for(const e of this.materials)e.dispose();for(const e of this.meshes)e.skeleton.dispose();this.geometries.length=0,this.materials.length=0,this.meshes.length=0,this.bones.clear()}}const rh=4.55,Ns=1.83;function X1(n){const e=[];for(let t=0;t<8;t++){const i=t/8*Math.PI*2+Math.PI/8;e.push(new ue(Math.cos(i)*n,Math.sin(i)*n))}return e}function K1(){const n=new us,e=[],t=R=>(e.push(R),R),i=X1(rh),s=new td;i.forEach((R,_)=>{_===0?s.moveTo(R.x,R.y):s.lineTo(R.x,R.y)}),s.closePath();const r=t(new pl(s)),a=cp(),o=t(new $n({color:7239039,roughness:.94,metalness:0,roughnessMap:a,bumpMap:a,bumpScale:.004})),c=new pt(r,o);c.rotation.x=-Math.PI/2,c.receiveShadow=!0,n.add(c);const l=t(new da(rh+1.1,rh+1.4,.9,8,1)),u=t(new $n({color:1053465,roughness:1,roughnessMap:a})),p=new pt(l,u);p.position.y=-.46,p.rotation.y=Math.PI/8,p.receiveShadow=!0,n.add(p);const h=t(new fl(1.05,1.2,48)),d=t(new Qr({color:9344934,transparent:!0,opacity:.35,side:Rn})),g=new pt(h,d);g.rotation.x=-Math.PI/2,g.position.y=.005,n.add(g);const x=t(new da(.075,.075,Ns+.16,10)),f=t(new $n({color:2303791,roughness:.45,metalness:.55,roughnessMap:a}));for(const R of i){const _=new pt(x,f);_.position.set(R.x,(Ns+.16)/2,R.y),_.castShadow=!0,n.add(_)}const m=[],y=[];for(let R=0;R<i.length;R++){const _=i[R],T=i[(R+1)%i.length];if(!_||!T)continue;const P=14;for(let L=0;L<=P;L++){const k=L/P,Y=_.x+(T.x-_.x)*k,q=_.y+(T.y-_.y)*k;if(m.push(Y,.06,q,Y,Ns,q),L<P){const G=(L+1)/P,J=_.x+(T.x-_.x)*G,K=_.y+(T.y-_.y)*G;for(let ee=0;ee<5;ee++){const se=.06+(Ns-.06)*(ee/5),de=.06+(Ns-.06)*((ee+1)/5);m.push(Y,se,q,J,de,K),m.push(Y,de,q,J,se,K)}}}for(const L of[.06,Ns])y.push(_.x,L,_.y,T.x,L,T.y)}const b=t(new Gt);b.setAttribute("position",new ct(m,3));const S=t(new sl({color:7173766,transparent:!0,opacity:.32}));n.add(new Vu(b,S));const A=t(new Gt);A.setAttribute("position",new ct(y,3));const E=t(new sl({color:14212582,transparent:!0,opacity:.55}));return n.add(new Vu(A,E)),{group:n,dispose(){for(const R of e)R.dispose();e.length=0}}}function Y1(n){const e=new lx(7175321,461069,.12);n.add(e);const t=new px(16773856,1.5);t.position.set(2.6,10.5,3.4),t.castShadow=!0,t.shadow.mapSize.set(2048,2048),t.shadow.camera.near=2,t.shadow.camera.far=22,t.shadow.camera.left=-5.5,t.shadow.camera.right=5.5,t.shadow.camera.top=5.5,t.shadow.camera.bottom=-5.5,t.shadow.bias=-9e-4,t.shadow.normalBias=.02,t.shadow.radius=2,n.add(t);const i=[];for(const[r,a]of[[-3.2,-3.2],[3.2,-3.2],[-3.2,3.2],[3.2,3.2]]){const o=new vd(16774374,11,16,Math.PI/4.6,.55,1.6);o.position.set(r,7.4,a),o.target.position.set(r*.25,1,a*.25),n.add(o,o.target),i.push(o)}const s=new vd(10337535,14,20,Math.PI/5,.7,1.5);return s.position.set(-6.5,4.6,-5.2),s.target.position.set(0,1.1,0),n.add(s,s.target),()=>{n.remove(e,t,s,s.target);for(const r of i)n.remove(r,r.target);t.dispose(),s.dispose();for(const r of i)r.dispose()}}class q1{constructor(e,t={}){Ye(this,"renderer");Ye(this,"scene",new Eu);Ye(this,"camera",new en(40,16/9,.1,120));Ye(this,"arena");Ye(this,"disposeLighting");Ye(this,"fighterA",new lp(F1));Ye(this,"fighterB",new lp(B1));Ye(this,"cameraTarget",new D(0,1.2,0));Ye(this,"desiredPosition",new D);Ye(this,"desiredTarget",new D);Ye(this,"observer");Ye(this,"composer");Ye(this,"bloom");Ye(this,"environment");Ye(this,"timeline");Ye(this,"raf",0);Ye(this,"lastTick",0);Ye(this,"costs",[]);Ye(this,"downgraded",!1);Ye(this,"lastWidth",0);Ye(this,"lastHeight",0);Ye(this,"time",0);Ye(this,"rate",1);Ye(this,"running",!1);Ye(this,"disposed",!1);this.container=e,this.options=t,this.renderer=new NM({antialias:!0,alpha:!1}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=qh,this.renderer.setClearColor(329483,1),this.renderer.toneMapping=Rr,this.renderer.toneMappingExposure=.72,this.renderer.outputColorSpace=rn,e.appendChild(this.renderer.domElement),this.renderer.domElement.style.display="block",this.renderer.domElement.style.width="100%",this.renderer.domElement.style.height="100%",this.scene.fog=new Oc(329483,10,26);const i=new Ml(this.renderer);this.environment=i.fromScene(new OM,.04).texture,this.scene.environment=this.environment,this.scene.environmentIntensity=.16,i.dispose(),this.arena=K1(),this.scene.add(this.arena.group),this.disposeLighting=Y1(this.scene),this.scene.add(this.fighterA.root,this.fighterB.root),this.composer=new zM(this.renderer),this.composer.addPass(new HM(this.scene,this.camera)),this.bloom=new Rs(new ue(1,1),.22,.7,.92),this.composer.addPass(this.bloom),this.composer.addPass(new XM),this.composer.addPass(new WM),this.camera.position.set(2.9,2.5,4.6),this.camera.lookAt(this.cameraTarget),this.observer=new ResizeObserver(()=>this.resize()),this.observer.observe(e),this.resize()}resize(){const e=Math.max(this.container.clientWidth,1),t=Math.max(this.container.clientHeight,1);this.lastWidth=e,this.lastHeight=t,this.renderer.setSize(e,t,!1),this.composer?.setSize(e,t),this.bloom?.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}load(e){this.timeline=e,this.time=0,this.renderAt(0,!0)}get duration(){return this.timeline?.duration??0}get currentTime(){return this.time}get isPlaying(){return this.running}setRate(e){this.rate=e}seek(e){this.time=Math.max(0,Math.min(e,this.duration)),this.renderAt(this.time,!0)}play(){if(this.running||this.disposed)return;this.time>=this.duration&&(this.time=0),this.running=!0,this.lastTick=performance.now();const e=t=>{if(!this.running)return;const i=Math.min((t-this.lastTick)/1e3,.1);this.measure(i),this.lastTick=t,this.time+=i*this.rate,this.time>=this.duration&&(this.time=this.duration,this.running=!1),this.renderAt(this.time,!1,i),this.running&&(this.raf=requestAnimationFrame(e))};this.raf=requestAnimationFrame(e)}measure(e){if(this.downgraded||this.costs.length>60||(this.costs.push(e),this.costs.length<45))return;const t=[...this.costs].sort((s,r)=>s-r);(t[Math.floor(t.length/2)]??0)>.033?(this.downgraded=!0,this.renderer.setPixelRatio(1),this.renderer.shadowMap.enabled=!1,this.scene.environmentIntensity=.22,this.resize(),this.options.onQuality?.("reduced")):(this.downgraded=!0,this.options.onQuality?.("full"))}pause(){this.running=!1,this.raf&&cancelAnimationFrame(this.raf),this.raf=0}renderAt(e,t=!1,i=0){if(this.disposed||!this.timeline)return;(this.renderer.domElement.clientWidth!==this.lastWidth||this.renderer.domElement.clientHeight!==this.lastHeight)&&this.resize();const s=v1(this.timeline,e);this.fighterA.applyPose(s.a.pose),this.fighterA.setPlacement(s.a.position,s.a.yaw),this.fighterB.applyPose(s.b.pose),this.fighterB.setPlacement(s.b.position,s.b.yaw);const r=(s.a.position[0]+s.b.position[0])/2,a=(s.a.position[2]+s.b.position[2])/2,o=Math.atan2(s.b.position[0]-s.a.position[0],s.b.position[2]-s.a.position[2]),c=Ky(s.camera,r,a,e,o,s.cameraSide);if(this.desiredPosition.set(c.position[0],c.position[1],c.position[2]),this.desiredTarget.set(c.target[0],c.target[1],c.target[2]),t)this.camera.position.copy(this.desiredPosition),this.cameraTarget.copy(this.desiredTarget),this.camera.fov=c.fov;else{const l=1-Math.exp(-6*i);this.camera.position.lerp(this.desiredPosition,l),this.cameraTarget.lerp(this.desiredTarget,l),this.camera.fov+=(c.fov-this.camera.fov)*l}this.camera.updateProjectionMatrix(),this.camera.lookAt(this.cameraTarget),this.downgraded&&!this.renderer.shadowMap.enabled?this.renderer.render(this.scene,this.camera):this.composer.render(),this.options.onFrame?.(s)}dispose(){this.pause(),this.disposed=!0,this.observer.disconnect(),this.disposeLighting(),this.arena.dispose(),this.fighterA.dispose(),this.fighterB.dispose(),this.environment.dispose(),this.composer.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}}function J1(n,e={}){try{return new q1(n,e)}catch(t){e.onError?.(t instanceof Error?t.message:String(t));return}}let qi,Os=[],Us=new Map,vt=[void 0,void 0],wt,vi,jt;const Ge=n=>{const e=document.getElementById(n);if(!e)throw new Error(`missing #${n}`);return e},bt=n=>n.replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]??e),ah=n=>{const e=Math.max(0,Math.floor(n));return`${String(Math.floor(e/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`},Xa=n=>n.replace(/_/g," ").toLowerCase().replace(/(^|\s)\w/g,e=>e.toUpperCase());function Ka(n){const e=new Date(n.birthDate),t=new Date(qi.state.currentDate);let i=t.getFullYear()-e.getFullYear();const s=t.getMonth()-e.getMonth();return(s<0||s===0&&t.getDate()<e.getDate())&&i--,i}function hp(n){const e=performance.now();qi=L0({seed:n}),Os=qi.state.fighters.filter(c=>c.status==="active"),Us=new Map;for(const c of fo(qi.state.promotions,qi.state.fighters,qi.state.currentDate))Us.set(c.fighterId,c.rank);const t=Math.round(performance.now()-e);Ge("built").textContent=`${Os.length} active fighters across ${qi.state.camps.length} camps, built in ${t}ms`;const i=Ge("division"),s=new Set(Os.map(c=>c.divisionKey));i.innerHTML='<option value="">All divisions</option>'+["male","female"].flatMap(c=>Op(c).filter(l=>s.has(l.key))).map(c=>`<option value="${c.key}">${bt(c.name)}</option>`).join("");const r=[...Os].sort((c,l)=>hn(l)-hn(c)),a=r[0],o=r.find(c=>c!==a&&c.divisionKey===a?.divisionKey);vt=[a,o??r[1]],wt=void 0,vi=void 0,ks(),Ya(),Ge("result").hidden=!0,Ge("replay").hidden=!0,vt[0]&&vt[1]&&dp()}function up(){const n=Ge("division").value,e=Ge("search").value.trim().toLowerCase(),t=Ge("sort").value;let i=Os;n&&(i=i.filter(r=>r.divisionKey===n)),e&&(i=i.filter(r=>{const a=co(r).primary.label.toLowerCase();return xn(r).toLowerCase().includes(e)||a.includes(e)}));const s={ability:(r,a)=>hn(a)-hn(r),rank:(r,a)=>(Us.get(r.id)??999)-(Us.get(a.id)??999),name:(r,a)=>xn(r).localeCompare(xn(a)),age:(r,a)=>Ka(r)-Ka(a),wins:(r,a)=>a.record.wins-r.record.wins};return[...i].sort(s[t]??s.ability).slice(0,300)}function ks(){const n=up();Ge("count").textContent=`${n.length} shown`,Ge("roster").innerHTML=n.map(e=>{const t=co(e),i=Us.get(e.id),s=vt[0]?.id===e.id?"a":vt[1]?.id===e.id?"b":"";return`<tr data-id="${e.id}" class="${s}"><td class="rank">${i===0?"<b>C</b>":i&&i<=15?`#${i}`:""}</td><td class="who"><span class="nm">${bt(xn(e))}</span><span class="sub">${bt(t.primary.label)}</span></td><td class="div">${bt(e.divisionKey.replace(/^[mw]_/,"").replace(/_/g," "))}</td><td class="num">${bt(_h(e))}</td><td class="num">${Ka(e)}</td><td class="num ca">${Math.round(hn(e))}</td><td class="pick"><button data-corner="0">A</button><button data-corner="1">B</button></td></tr>`}).join("")}function Ya(){for(const e of[0,1]){const t=vt[e],i=Ge(`corner-${e}`);if(!t){i.innerHTML='<p class="empty">Pick a fighter from the roster</p>';continue}const s=co(t),r=Us.get(t.id),a=(o,c)=>`<div class="tp"><span>${o}</span><b>${bt(c)}</b></div>`;i.innerHTML=`<h3>${bt(xn(t))}</h3><p class="sub">${r===0?"Champion · ":r?`#${r} · `:""}${bt(t.divisionKey.replace(/^[mw]_/,"").replace(/_/g," "))}</p>`+a("Record",_h(t))+a("Style",s.primary.label)+a("Signature",s.signatureSkill.label)+a("Age",String(Ka(t)))+a("Height",`${Math.floor(t.heightIn/12)}'${t.heightIn%12}"`)+a("Reach",`${t.reachIn}"`)+a("Stance",Xa(t.stance))+a("Ability",String(Math.round(hn(t))))}const n=!!(vt[0]&&vt[1]&&vt[0].id!==vt[1].id);Ge("run").disabled=!n,Ge("mismatch").hidden=!(vt[0]&&vt[1]&&vt[0].divisionKey!==vt[1].divisionKey)}function dp(){const[n,e]=vt;if(!n||!e)return;const t=Number(Ge("rounds").value),i=Ge("fight-seed").value.trim()||`lab-${n.id}-${e.id}`;wt=im(n,e,{fightId:i,rounds:t},An.fromSeed(i));const s=wt.events.map(r=>({event:r,directive:Xh(r)}));vi=h1(s,n.id,e.id,void 0,[Kh(n,i),Kh(e,i)]),Z1(n,e),Q1(),j1()}function Z1(n,e){if(!wt)return;const t=wt.winnerId===n.id?n:wt.winnerId===e.id?e:void 0,i=wt.technique?` (${Xa(wt.technique)})`:"",s=wt.finishRound?`R${wt.finishRound} ${wt.finishTime}`:"decision";Ge("verdict").innerHTML=t?`<strong>${bt(xn(t))}</strong> def. ${bt(xn(t.id===n.id?e:n))} — ${bt(Xa(wt.outcome))}${bt(i)}, ${bt(s)}`:`<strong>${bt(Xa(wt.outcome))}</strong> after ${wt.rounds} rounds`;const r=wt.scorecards.map(l=>`<li>${bt(l.judgeName)}: ${l.totalA} &ndash; ${l.totalB}</li>`).join("");Ge("cards").innerHTML=wt.scorecards.length?`<ul>${r}</ul>`:"";const a=wt.stats[n.id],o=wt.stats[e.id],c=(l,u)=>a&&o?`<div class="tape-row"><span>${u(a)}</span><em>${l}</em><span>${u(o)}</span></div>`:"";Ge("stats").innerHTML=`<div class="tape-row head"><span>${bt(xn(n))}</span><em></em><span>${bt(xn(e))}</span></div>`+c("Significant strikes",l=>`${l.significantStrikesLanded}/${l.significantStrikesAttempted}`)+c("Head / body / leg",l=>`${l.headStrikes} / ${l.bodyStrikes} / ${l.legStrikes}`)+c("Takedowns",l=>`${l.takedownsLanded}/${l.takedownsAttempted}`)+c("Submission attempts",l=>String(l.submissionAttempts))+c("Knockdowns",l=>String(l.knockdowns))+c("Control time",l=>ah(l.controlTime)),Ge("result").hidden=!1}function Q1(){wt&&(Ge("stream").innerHTML=wt.events.map((n,e)=>{const t=Xh(n);return`<li data-beat="${e}"><span class="c1">R${n.round} ${n.roundTime}</span><span class="c2">${bt(t.clip)}</span><span class="c3">${bt(t.reaction.toLowerCase())}</span><span class="c4">${bt(n.description)}</span></li>`}).join(""))}function j1(){if(!vi)return;Ge("replay").hidden=!1;const[n,e]=vt;Ge("hud-a").textContent=n?xn(n):"",Ge("hud-b").textContent=e?xn(e):"",jt||(jt=J1(Ge("stage"),{onFrame:$1,onError:t=>{Ge("stage").innerHTML=`<p class="empty">${bt(t)}</p>`}})),jt&&(jt.load(vi),Ge("scrub").max=String(vi.duration),jt.seek(0),jt.play(),Ge("play").textContent="Pause")}function $1(n){Ge("scrub").value=String(n.time),Ge("time").textContent=`${ah(n.time)} / ${ah(vi?.duration??0)}`,Ge("hud-clock").textContent=`R${n.round} · ${n.roundTime}`,Ge("hud-line").textContent=n.description,Ge("hud-cam").textContent=n.camera.toLowerCase().replace(/_/g," ")}function eb(){Ge("generate").addEventListener("click",()=>hp(Ge("seed").value.trim()||"sandbox"));for(const n of["division","sort"])Ge(n).addEventListener("change",ks);Ge("search").addEventListener("input",ks),Ge("roster").addEventListener("click",n=>{const e=n.target.closest("button[data-corner]"),t=n.target.closest("tr[data-id]");if(!t)return;const i=Os.find(r=>r.id===t.dataset.id);if(!i)return;const s=e?Number(e.dataset.corner):vt[0]?1:0;vt[s]=i,ks(),Ya()}),Ge("swap").addEventListener("click",()=>{vt=[vt[1],vt[0]],ks(),Ya()}),Ge("random").addEventListener("click",()=>{const n=up();if(n.length<2)return;const e=Math.floor(Math.random()*n.length);let t=Math.floor(Math.random()*n.length);t===e&&(t=(t+1)%n.length),vt=[n[e],n[t]],ks(),Ya()}),Ge("run").addEventListener("click",dp),Ge("play").addEventListener("click",()=>{jt&&(jt.isPlaying?(jt.pause(),Ge("play").textContent="Play"):(jt.play(),Ge("play").textContent="Pause"))}),Ge("scrub").addEventListener("input",n=>{jt?.pause(),Ge("play").textContent="Play",jt?.seek(Number(n.target.value))}),Ge("rate").addEventListener("change",n=>{jt?.setRate(Number(n.target.value))}),Ge("stream").addEventListener("click",n=>{const e=n.target.closest("li[data-beat]");if(!e||!vi)return;const t=vi.beats[Number(e.dataset.beat)];t&&(jt?.pause(),Ge("play").textContent="Play",jt?.seek(t.start))})}eb(),hp("sandbox")})();
