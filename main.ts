F=require('fs')
let W,H,D
U=(f,x,s)=>{let P=new Map([[s,-1]]),Q=[s]
for(let i=0;i<Q.length;i++){let c=Q[i]
for(let d of D){let n=c+d
if(!f.has(n)||x.has(n)||P.has(n))continue
P.set(n,c),Q.push(n)}}
return P}
C=(P,a,b)=>{if(!P.has(b))return null
let s=[],c=b
while(c!==a)s.push(c),c=P.get(c)
let o="",p=a
for(let i=s.length-1;i>=0;i--){let d=s[i]-p
o+="udlr"[D.indexOf(d)],p=s[i]}
return o}
V=(R,B,G,d,E)=>{let g=new Set(G),j=B.join(),M=new Map(),Q=[],z=new Set()
for(let c of R){if(g.has(c)||z.has(c))continue
let C=U(R,g,c)
for(let x of C.keys())z.add(x)
if(E&&!C.has(d))continue
let r=Math.min(...C.keys()),k=G.join()+"|"+r
if(!M.has(k))M.set(k,null),Q.push({b:[...G],p:r,k})}
let o=null
for(let i=0;i<Q.length;i++){if(Q.length>200000)return null
let s=Q[i],r=U(R,new Set(s.b),s.p)
if(s.b.join()==j&&r.has(d)){o=s;break}
let t=new Set(s.b)
for(let u of s.b)for(let k=0;k<4;k++){let e=D[k],A=u-e,P=A-e
if(!r.has(A))continue
if(!R.has(P)||t.has(P))continue
let n=s.b.map(v=>v==u?A:v).sort((a,b)=>a-b)
let K=n.join()+"|"+Math.min(...U(R,new Set(n),P).keys())
if(M.has(K))continue
M.set(K,[s.k,[u,A,P,k]]),Q.push({b:n,p:P,k:K})}}
if(!o)return null
let s=[],c=o.k
while(M.get(c)){let v=M.get(c);s.push(v[1]),c=v[0]}
let p=s.map(v=>({f:v[1],t:v[0],d:v[3],r:v[2]}))
return{p,e:p.length?p[p.length-1].f:d}}
T=(F,B,G,s)=>{let a=new Set(B),b=new Set(G),c=new Set(),r=[]
for(let x of B){if(c.has(x))continue
let C=U(F,s,x)
if(C.size>40)return null
let d=[...C.keys()].filter(v=>a.has(v)).sort((p,q)=>p-q)
let e=[...C.keys()].filter(v=>b.has(v)).sort((p,q)=>p-q)
if(d.length>4||d.length!=e.length)return null
for(let v of d)c.add(v)
let o=-1
for(let x of C.keys()){if(o>=0)break
for(let y of D)if(s.has(x+y)){o=x+y;break}}
if(o<0)return null
let R=new Set(C.keys());R.add(o)
r.push({R,D:o,B:d,G:e})}
if(c.size!=B.length)return null
return r}
L=t=>{let l=t.replace(/\r/g,"").split("\n")
while(l.length&&!l[0].trim())l.shift()
while(l.length&&!l[l.length-1].trim())l.pop()
H=l.length,W=0
for(let r of l)W=Math.max(W,r.length)
D=[-W,W,-1,1]
let S=l.map(r=>r.padEnd(W,"#")).join(""),N=W*H,B=[],G=[],p=-1,F=new Set()
for(let c=0;c<N;c++){let ch=S[c]
if(ch!="#")F.add(c)
if(ch=="$"||ch=="*")B.push(c)
if(ch=="."||ch=="*"||ch=="+")G.push(c)
if(ch=="@"||ch=="+")p=c}
let y=p/W|0,x=p%W,a=new Set(),b=new Set()
for(let i=0;i<W;i++)a.add(y*W+i)
for(let i=0;i<H;i++)b.add(i*W+x)
let r=T(F,B,G,a)||T(F,B,G,b)
if(!r)r=[{R:F,D:p,B,G}]
let o=[]
for(let R of r){let s=V(R.R,R.B,R.G,R.D,false)
if(!s)return null
let h=false
if(!U(R.R,new Set(R.G),s.e).has(R.D)){let v=V(R.R,R.B,R.G,R.D,true)
if(v)s=v;else h=true}
o.push({r:R,p:s.p,e:s.e,h})}
o.sort((x,y)=>x.h-y.h)
let O="",u=p,g=new Set(B)
for(let i=0;i<o.length;i++){let s=o[i],z=i==o.length-1
let e=C(U(F,g,u),u,s.r.D)
if(e==null)return null
O+=e
let q=s.r.D,w=new Set(s.r.B)
for(let v of s.p){let n=C(U(s.r.R,w,q),q,v.r)
if(n==null)return null
O+=n+"UDLR"[v.d],q=v.f,w.delete(v.f),w.add(v.t)}
for(let v of s.r.B)g.delete(v)
for(let v of s.r.G)g.add(v)
if(!z){let n=C(U(s.r.R,new Set(s.r.G),s.e),s.e,s.r.D)
if(n==null)return null
O+=n,u=s.r.D}else u=s.e}
return O}
let I=process.env.MAKEFUN_INPUT_DIR||process.argv[2],O=process.env.MAKEFUN_OUTPUT_DIR||process.argv[3],f=[]
let J=(d,id)=>{let m=L(F.readFileSync(d,"utf8"));if(m==null)m=""
if(O){F.mkdirSync(O+"/"+id,{recursive:true});F.writeFileSync(O+"/"+id+"/solution.txt",m+"\n")}else process.stdout.write(m+"\n")}
if(I&&F.statSync(I).isDirectory()){let s=F.readdirSync(I).sort()
for(let x of s){let p=I+"/"+x
if(F.statSync(p).isDirectory()&&F.existsSync(p+"/level.txt"))f.push([p+"/level.txt",x])
else if(x.toLowerCase().endsWith(".txt"))f.push([p,x.replace(/\.txt$/i,"")])}
if(!f.length&&F.existsSync(I+"/level.txt"))f=[[I+"/level.txt","i001"]]}
else if(I)f=[[I,"i001"]]
else if(F.existsSync("level.txt"))f=[["level.txt","i001"]]
else if(F.existsSync("levels"))f=F.readdirSync("levels").filter(x=>x.toLowerCase().endsWith(".txt")).sort().map(x=>["levels/"+x,x.replace(/\.txt$/i,"")])
if(!f.length)process.exit(1)
if(!O){let o=[]
for(let x of f){let m=L(F.readFileSync(x[0],"utf8"));o.push(m==null?"":m)}
process.stdout.write(o.join("\n")+"\n")}
else for(let x of f)J(x[0],x[1])
