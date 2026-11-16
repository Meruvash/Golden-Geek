import React, { useLayoutEffect, useMemo } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { fontesProntas } from "../tema";

// Animação 3D do desenho técnico "Mesa Eliteboardgamers" (Rev. 04, nov/2026, 13 folhas).
// Todas as medidas vêm do PDF, em mm. Eixos: x = comprimento (2220), z = largura (1620), y = altura (chão = 0).
// Ordem da montagem: folha 13. Corte e Detalhe A: folha 5. Pés: folha 7. Tampo: folha 8. Trilho e acessórios: folha 9.
void fontesProntas;
const SANS = "Public Sans";
const S = 1080;

// ---------------- cores dos materiais (legenda do PDF) ----------------
const COR = {
  naval: "#e8c89a", // compensado naval 18 (estrutura)
  bp: "#c4925e", // MDF BP amadeirado 18 (acabamento)
  cru: "#d9ccb4", // MDF cru (miolo do tampo)
  preto: "#2c2c2e", // preto acetinado (naval tingido)
  neo: "#2f5a40", // neoprene 3 mm
  metal: "#b9bec6",
  feltro: "#555a66",
};
const AZUL = "#1f3a5f";
const VERM = "#c0392b";
const OURO = "#e8a020";

// ---------------- linha do tempo (s) ----------------
const T = {
  intro: 0, medidas: 7, monta: 16.5,
  fundo: 18, saias: 26, borda: 33, pes: 45, vao: 55, trilho: 61, neo: 70, tampo: 75, corte: 89, final: 99, fim: 108,
};
export const DUR_MESA = T.fim;

type V3 = [number, number, number];
const mm = (v: V3): V3 => [v[0] / 1000, v[1] / 1000, v[2] / 1000];
const ease = Easing.bezier(0.45, 0, 0.2, 1);
const p = (s: number, t0: number, d: number) => interpolate(s, [t0, t0 + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });

// ---------------- peças ----------------
type Peca = { id: string; c: V3; t: V3; cor: string; t0: number; rotY?: number; tipo?: "caixa" | "pe" | "cil"; de?: "cima" | "baixo"; fim?: number; so?: "montagem" | "sempre" };
const SG = [-1, 1];

function montarPecas(): Peca[] {
  const P: Peca[] = [];
  // Etapa 1 · fundo + viga central (folha 6)
  P.push({ id: "fundo", c: [0, 688, 0], t: [2164, 18, 1564], cor: COR.naval, t0: T.fundo + 0.6 });
  P.push({ id: "viga", c: [0, 579, 0], t: [2164, 200, 36], cor: COR.preto, t0: T.fundo + 3.6, de: "baixo" });
  // Etapa 2 · saias de canto (8) e blocos de canto (4)
  let k = 0;
  for (const sx of SG) for (const sz of SG) {
    P.push({ id: `saiaL${sx}${sz}`, c: [sx * (1082 - 150), 579, sz * (782 - 9)], t: [300, 200, 18], cor: COR.preto, t0: T.saias + 0.6 + 0.25 * k, de: "baixo" });
    P.push({ id: `saiaC${sx}${sz}`, c: [sx * (1082 - 9), 579, sz * (782 - 150)], t: [18, 200, 300], cor: COR.preto, t0: T.saias + 0.7 + 0.25 * k, de: "baixo" });
    P.push({ id: `bloco${sx}${sz}`, c: [sx * (1064 - 115), 604, sz * (764 - 115)], t: [330, 150, 36], cor: COR.preto, t0: T.saias + 3.4 + 0.2 * k, rotY: Math.atan2(sz, sx), de: "baixo" });
    k++;
  }
  // Etapa 3 · caixa da borda: paredes internas, calços, faixas externas, borda de cima
  for (const sz of SG) P.push({ id: `W1${sz}`, c: [0, 729.5, sz * 709], t: [2036, 65, 18], cor: COR.bp, t0: T.borda + 0.6 });
  for (const sx of SG) P.push({ id: `W2${sx}`, c: [sx * 1009, 729.5, 0], t: [18, 65, 1400], cor: COR.bp, t0: T.borda + 0.9 });
  let c = 0;
  for (const sz of SG) for (let x = -800; x <= 800; x += 400) P.push({ id: `cL${sz}${x}`, c: [x, 729.5, sz * 750], t: [100, 65, 64], cor: COR.naval, t0: T.borda + 3.0 + 0.08 * c++ });
  for (const sx of SG) for (const z of [-400, 0, 400]) P.push({ id: `cC${sx}${z}`, c: [sx * 1050, 729.5, z], t: [64, 65, 100], cor: COR.naval, t0: T.borda + 3.0 + 0.08 * c++ });
  for (const sz of SG) P.push({ id: `E1${sz}`, c: [0, 720.5, sz * 791], t: [2200, 83, 18], cor: COR.preto, t0: T.borda + 5.8 });
  for (const sx of SG) P.push({ id: `E2${sx}`, c: [sx * 1091, 720.5, 0], t: [18, 83, 1564], cor: COR.preto, t0: T.borda + 6.1 });
  for (const sz of SG) P.push({ id: `B1${sz}`, c: [0, 771, sz * 755], t: [2220, 18, 110], cor: COR.bp, t0: T.borda + 8.4 });
  for (const sx of SG) P.push({ id: `B2${sx}`, c: [sx * 1055, 771, 0], t: [110, 18, 1400], cor: COR.bp, t0: T.borda + 8.7 });
  // rasgo porta-cartas 4 x 10 a 15 mm da beirada de dentro
  for (const sz of SG) P.push({ id: `rasgoL${sz}`, c: [0, 780.2, sz * 717], t: [2000, 1, 4], cor: "#4a3020", t0: T.borda + 9.6 });
  for (const sx of SG) P.push({ id: `rasgoC${sx}`, c: [sx * 1017, 780.2, 0], t: [4, 1, 1400], cor: "#4a3020", t0: T.borda + 9.6 });
  // Etapa 4 · pés (folha 7): 90 x 90, afinam por dentro até 55 no chão, sapata M8, parafusos
  k = 0;
  for (const sx of SG) for (const sz of SG) {
    P.push({ id: `pe${sx}${sz}`, c: [sx * 1064, 0, sz * 764], t: [sx, 1, sz], cor: COR.naval, t0: T.pes + 0.6 + 0.35 * k, tipo: "pe", de: "baixo" });
    P.push({ id: `sap${sx}${sz}`, c: [sx * (1064 - 27), 7.5, sz * (764 - 27)], t: [30, 15, 30], cor: COR.metal, t0: T.pes + 0.9 + 0.35 * k, tipo: "cil", de: "baixo" });
    for (const yy of [649, 509]) {
      P.push({ id: `pL${sx}${sz}${yy}`, c: [sx * (1064 - 45), yy, sz * (782 + 6)], t: [16, 16, 12], cor: VERM, t0: T.pes + 4.2, tipo: "cil", rotY: 0 });
      P.push({ id: `pC${sx}${sz}${yy}`, c: [sx * (1082 + 6), yy, sz * (764 - 45)], t: [16, 16, 12], cor: VERM, t0: T.pes + 4.4, tipo: "cil" });
    }
    k++;
  }
  // Etapa 6 · trilho (French cleat) e acessórios (folha 9)
  for (const sz of SG) P.push({ id: `TR1${sz}`, c: [0, 709.5, sz * 809], t: [2200, 51, 18], cor: COR.naval, t0: T.trilho + 0.6 });
  for (const sx of SG) P.push({ id: `TR2${sx}`, c: [sx * 1109, 709.5, 0], t: [18, 51, 1636], cor: COR.naval, t0: T.trilho + 0.9 });
  k = 0;
  for (const sz of SG) for (const x of [-550, 550]) {
    P.push({ id: `pc${sz}${x}`, c: [x, 730, sz * 896], t: [120, 18, 120], cor: COR.bp, t0: T.trilho + 3.0 + 0.3 * k });
    P.push({ id: `copo${sz}${x}`, c: [x, 770, sz * 896], t: [80, 110, 80], cor: COR.metal, t0: T.trilho + 3.3 + 0.3 * k, tipo: "cil" });
    k++;
  }
  for (const sx of SG) {
    P.push({ id: `pcC${sx}`, c: [sx * 1196, 730, 0], t: [120, 18, 120], cor: COR.bp, t0: T.trilho + 4.3 });
    P.push({ id: `copoC${sx}`, c: [sx * 1196, 770, 0], t: [80, 110, 80], cor: COR.metal, t0: T.trilho + 4.5, tipo: "cil" });
  }
  // bandeja de dados (250 x 180, paredes 40, fundo de neoprene) e uma bandeja de tokens (300 x 120, 3 divisões)
  P.push({ id: "dadosF", c: [0, 725, 926], t: [250, 8, 180], cor: COR.neo, t0: T.trilho + 5.6 });
  for (const [dx, dz, w, d] of [[0, -86, 250, 8], [0, 86, 250, 8], [-121, 0, 8, 180], [121, 0, 8, 180]] as const)
    P.push({ id: `dadosP${dx}${dz}`, c: [dx, 745, 926 + dz], t: [w, 40, d], cor: COR.bp, t0: T.trilho + 5.6 });
  P.push({ id: "tokF", c: [0, 725, -866], t: [300, 8, 120], cor: COR.cru, t0: T.trilho + 6.2 });
  for (const [dx, w, d] of [[-146, 8, 120], [146, 8, 120], [-50, 6, 120], [50, 6, 120]] as const)
    P.push({ id: `tokP${dx}`, c: [dx, 745, -866], t: [w, 40, d], cor: COR.bp, t0: T.trilho + 6.2 });
  for (const dz of [-56, 56]) P.push({ id: `tokL${dz}`, c: [0, 745, -866 + dz], t: [300, 40, 8], cor: COR.bp, t0: T.trilho + 6.2 });
  // Etapa 7 · neoprene 3 mm, solto
  P.push({ id: "neo", c: [0, 698.5, 0], t: [2000, 3, 1400], cor: COR.neo, t0: T.neo + 0.6 });
  // Etapa 8 · tampo: 4 módulos 560 x 1640 x 52 (caixa oca), cavilhas 8 mm
  [-840, -280, 280, 840].forEach((x, i) => {
    P.push({ id: `mod${i}`, c: [x, 806, 0], t: [558, 52, 1640], cor: COR.bp, t0: T.tampo + 7.0 + 0.6 * i });
    for (const sz of SG) P.push({ id: `cav${i}${sz}`, c: [x, 770, sz * 755], t: [8, 40, 8], cor: "#8a5a2a", t0: T.tampo + 6.6, tipo: "cil" });
  });
  return P;
}

// Módulo do tampo explodido (folha 8): pele de baixo crua, 5 nervuras + 2 travessas, pele de cima amadeirada.
function moduloExplodido(s: number): { c: V3; t: V3; cor: string }[] {
  const a = (t0: number) => p(s, T.tampo + t0, 0.8);
  const base = 1500;
  const out: { c: V3; t: V3; cor: string }[] = [];
  if (a(0.6) > 0) out.push({ c: [0, base - 300 * (1 - a(0.6)), 0], t: [560, 6, 1640], cor: COR.cru });
  [-271, -135, 0, 135, 271].forEach((x, i) => { if (a(1.4 + 0.15 * i) > 0) out.push({ c: [x, base + 23 + 300 * (1 - a(1.4 + 0.15 * i)), 0], t: [18, 40, 1640], cor: COR.cru }); });
  for (const z of [-811, 811]) if (a(2.3) > 0) out.push({ c: [0, base + 23 + 300 * (1 - a(2.3)), z], t: [524, 40, 18], cor: COR.cru });
  const topo = 220 * a(3.4) * (1 - a(5.0));
  if (a(3.4) > 0) out.push({ c: [0, base + 46 + 120 + topo - 120 * a(5.0), 0], t: [560, 6, 1640], cor: COR.bp });
  return out;
}

// ---------------- geometria do pé (afina pelas 2 faces de dentro) ----------------
function geometriaPe(): THREE.BufferGeometry {
  // canto de fora em (0,0); topo 90 x 90 até 200 mm abaixo do topo; depois afina até 55 x 55 no chão (y = 15, sobre a sapata)
  const yt = 679, ym = 479, yb = 15;
  const sec = (y: number, w: number) => [[0, y, 0], [-w, y, 0], [-w, y, -w], [0, y, -w]].map((v) => new THREE.Vector3(v[0] / 1000, v[1] / 1000, v[2] / 1000));
  const camadas = [sec(yt, 90), sec(ym, 90), sec(yb, 55)];
  const pos: number[] = [];
  const quad = (a: THREE.Vector3, b: THREE.Vector3, c2: THREE.Vector3, d: THREE.Vector3) => pos.push(...a.toArray(), ...b.toArray(), ...c2.toArray(), ...a.toArray(), ...c2.toArray(), ...d.toArray());
  for (let l = 0; l < 2; l++) for (let i = 0; i < 4; i++) { const A = camadas[l][i], B = camadas[l][(i + 1) % 4], C = camadas[l + 1][(i + 1) % 4], D = camadas[l + 1][i]; quad(A, B, C, D); }
  quad(camadas[0][0], camadas[0][1], camadas[0][2], camadas[0][3]);
  quad(camadas[2][3], camadas[2][2], camadas[2][1], camadas[2][0]);
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  return g;
}

// ---------------- câmera por etapa ----------------
type Cam = { az: number; el: number; d: number; alvo: V3; fov?: number };
const CAMS: { t: number; cam: Cam; giro?: number }[] = [
  { t: T.intro, cam: { az: 38, el: 24, d: 5.6, alvo: [150, 380, 0] }, giro: 3 },
  { t: T.medidas, cam: { az: 0, el: 4, d: 6.2, alvo: [300, 420, 0] } },
  { t: T.monta, cam: { az: 32, el: 30, d: 4.3, alvo: [0, 600, 0] }, giro: 1.2 },
  { t: T.fundo, cam: { az: 28, el: 14, d: 4.0, alvo: [0, 640, 0] }, giro: 1 },
  { t: T.saias, cam: { az: 38, el: -22, d: 3.6, alvo: [450, 600, 250] }, giro: 1 },
  { t: T.borda, cam: { az: 30, el: 34, d: 3.6, alvo: [250, 700, 150] }, giro: 0.8 },
  { t: T.pes, cam: { az: 38, el: 6, d: 3.0, alvo: [500, 380, 350] }, giro: 0.8 },
  { t: T.vao, cam: { az: 0, el: 3, d: 5.6, alvo: [0, 380, 0] } },
  { t: T.trilho, cam: { az: 22, el: 22, d: 2.9, alvo: [200, 720, 500] }, giro: 0.8 },
  { t: T.neo, cam: { az: 25, el: 48, d: 3.9, alvo: [0, 700, 0] } },
  { t: T.tampo, cam: { az: 30, el: 32, d: 5.2, alvo: [0, 950, 0] }, giro: 0.6 },
  { t: T.corte, cam: { az: 90, el: 4, d: 0.95, alvo: [0, 735, 735], fov: 40 } },
  { t: T.final, cam: { az: 215, el: 22, d: 5.6, alvo: [-150, 360, 0] }, giro: 3.5 },
];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function camEm(s: number): Cam & { pos: V3 } {
  let i = 0;
  CAMS.forEach((c, k) => { if (s >= c.t) i = k; });
  const atual = CAMS[i], ant = CAMS[Math.max(0, i - 1)];
  const tr = i === 0 ? 1 : ease(Math.min(1, (s - atual.t) / 1.8));
  const giroAnt = (ant.giro ?? 0) * (atual.t - ant.t);
  const az = lerp(ant.cam.az + giroAnt, atual.cam.az, tr) + (atual.giro ?? 0) * (s - atual.t) * tr;
  const el = lerp(ant.cam.el, atual.cam.el, tr), d = lerp(ant.cam.d, atual.cam.d, tr);
  const alvo: V3 = [0, 1, 2].map((j) => lerp(ant.cam.alvo[j], atual.cam.alvo[j], tr)) as V3;
  const fov = lerp(ant.cam.fov ?? 34, atual.cam.fov ?? 34, tr);
  const a = (az * Math.PI) / 180, e = (el * Math.PI) / 180;
  const A = mm(alvo);
  const pos: V3 = [A[0] + d * Math.cos(e) * Math.sin(a), A[1] + d * Math.sin(e), A[2] + d * Math.cos(e) * Math.cos(a)];
  return { az, el, d, alvo, fov, pos };
}

const CameraSync: React.FC<{ s: number }> = ({ s }) => {
  const { camera } = useThree();
  useLayoutEffect(() => {
    const c = camEm(s);
    camera.position.set(...c.pos);
    (camera as THREE.PerspectiveCamera).fov = c.fov ?? 34;
    (camera as THREE.PerspectiveCamera).near = 0.01;
    (camera as THREE.PerspectiveCamera).far = 60;
    camera.lookAt(...mm(c.alvo));
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
  }, [s, camera]);
  return null;
};

// projeção 3D (mm) → tela (px), com a mesma câmera da cena
function projetor(s: number) {
  const c = camEm(s);
  const cam = new THREE.PerspectiveCamera(c.fov ?? 34, 1, 0.01, 60);
  cam.position.set(...c.pos);
  cam.lookAt(...mm(c.alvo));
  cam.updateMatrixWorld();
  cam.updateProjectionMatrix();
  return (v: V3) => { const q = new THREE.Vector3(...mm(v)).project(cam); return { x: ((q.x + 1) / 2) * S, y: ((1 - q.y) / 2) * S, atras: q.z > 1 }; };
}

// ---------------- materiais e peças na cena ----------------
const PLANO_CORTE = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0); // mostra só x <= 0
const PecaMesh: React.FC<{ pc: Peca; s: number; geoPe: THREE.BufferGeometry; corte: boolean }> = ({ pc, s, geoPe, corte }) => {
  const emMontagem = s >= T.monta - 0.5 && s < T.final;
  let a = 1;
  if (emMontagem) a = p(s, pc.t0, 0.9);
  else if (s >= T.medidas + 7.5 && s < T.monta) a = 1 - p(s, T.medidas + 7.5, 1.2); // a mesa pronta some antes de montar
  if (a <= 0.001) return null;
  const desloc = pc.de === "baixo" ? -0.45 : 0.55;
  const y = (1 - a) * desloc;
  const brilho = emMontagem ? Math.max(0, 1 - (s - pc.t0) / 1.6) : 0;
  const pos = mm(pc.c);
  const mat = (
    <meshStandardMaterial color={pc.cor} roughness={pc.cor === COR.metal ? 0.3 : 0.75} metalness={pc.cor === COR.metal ? 0.6 : 0} transparent={a < 1} opacity={a}
      emissive={OURO} emissiveIntensity={0.55 * brilho} side={THREE.DoubleSide} clippingPlanes={corte ? [PLANO_CORTE] : []} />
  );
  if (pc.tipo === "pe") {
    return (
      <mesh position={[pos[0], pos[1] + y, pos[2]]} scale={[pc.t[0], 1, pc.t[2]]} castShadow receiveShadow geometry={geoPe}>{mat}</mesh>
    );
  }
  if (pc.tipo === "cil") {
    const t = mm(pc.t);
    const deitado = pc.id.startsWith("pL") || pc.id.startsWith("pC");
    return (
      <mesh position={[pos[0], pos[1] + y, pos[2]]} rotation={deitado ? (pc.id.startsWith("pL") ? [Math.PI / 2, 0, 0] : [0, 0, Math.PI / 2]) : [0, 0, 0]} castShadow>
        <cylinderGeometry args={[t[0] / 2, t[0] / 2, t[1], 20]} />{mat}
      </mesh>
    );
  }
  const t = mm(pc.t);
  return (
    <group position={[pos[0], pos[1] + y, pos[2]]} rotation={[0, pc.rotY ?? 0, 0]}>
      <mesh castShadow receiveShadow><boxGeometry args={t} />{mat}</mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...t)]} />
        <lineBasicMaterial color="#2a1e14" transparent opacity={0.35 * a} clippingPlanes={corte ? [PLANO_CORTE] : []} />
      </lineSegments>
    </group>
  );
};

const Cena: React.FC<{ s: number }> = ({ s }) => {
  const pecas = useMemo(montarPecas, []);
  const geoPe = useMemo(geometriaPe, []);
  const corte = s >= T.corte + 0.8 && s < T.final;
  const explodido = s >= T.tampo && s < T.tampo + 7.6 ? moduloExplodido(s) : [];
  const someExpl = s >= T.tampo + 6.0 ? 1 - p(s, T.tampo + 6.0, 1.0) : 1;
  return (
    <>
      <CameraSync s={s} />
      <hemisphereLight args={["#ffffff", "#b8aa98", 0.75]} />
      <directionalLight position={[2.5, 5, 3.5]} intensity={1.6} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}
        shadow-camera-left={-3} shadow-camera-right={3} shadow-camera-top={3} shadow-camera-bottom={-3} shadow-bias={-0.0005} />
      <directionalLight position={[-3, 2, -2]} intensity={0.45} />
      {/* chão com grade de oficina */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#e6e2da" roughness={1} />
      </mesh>
      <gridHelper args={[14, 70, "#c9c2b5", "#d8d2c6"]} position={[0, 0.001, 0]} />
      {pecas.map((pc) => <PecaMesh key={pc.id} pc={pc} s={s} geoPe={geoPe} corte={corte} />)}
      {explodido.map((e, i) => {
        const t = mm(e.t), c = mm(e.c);
        return (
          <group key={`ex${i}`} position={c}>
            <mesh castShadow><boxGeometry args={t} /><meshStandardMaterial color={e.cor} roughness={0.8} transparent opacity={someExpl} side={THREE.DoubleSide} /></mesh>
            <lineSegments><edgesGeometry args={[new THREE.BoxGeometry(...t)]} /><lineBasicMaterial color="#2a1e14" transparent opacity={0.4 * someExpl} /></lineSegments>
          </group>
        );
      })}
    </>
  );
};

// ---------------- camada 2D: títulos, cotas e etiquetas ----------------
type Cota = { a: V3; b: V3; txt: string; t0: number; t1: number; cor?: string };
type Etiqueta = { em: V3; txt: string; sub?: string; dx: number; dy: number; t0: number; t1: number };

const COTAS: Cota[] = [
  // medidas gerais (vista de frente)
  { a: [1300, 0, 820], b: [1300, 679, 820], txt: "679 vão livre", t0: T.medidas + 0.8, t1: T.medidas + 2.8 },
  { a: [1300, 0, 820], b: [1300, 700, 820], txt: "700 superfície de jogo", t0: T.medidas + 2.6, t1: T.medidas + 4.6 },
  { a: [1300, 0, 820], b: [1300, 780, 820], txt: "780 borda (apoio do braço)", t0: T.medidas + 4.4, t1: T.medidas + 6.4, cor: VERM },
  { a: [1300, 0, 820], b: [1300, 832, 820], txt: "832 com tampo", t0: T.medidas + 6.2, t1: T.medidas + 8.4 },
  { a: [-1110, -60, 820], b: [1110, -60, 820], txt: "2220", t0: T.medidas + 4.0, t1: T.medidas + 8.4 },
  // etapa 1
  { a: [-1082, 700, 860], b: [1082, 700, 860], txt: "2164", t0: T.fundo + 1.6, t1: T.saias },
  { a: [1180, 700, -782], b: [1180, 700, 782], txt: "1564", t0: T.fundo + 2.0, t1: T.saias },
  // etapa 3
  { a: [1110, 790, 820], b: [1000, 790, 820], txt: "110", t0: T.borda + 9.0, t1: T.pes },
  // pés
  { a: [1150, 15, 820], b: [1150, 679, 820], txt: "664 + sapata", t0: T.pes + 2.4, t1: T.vao },
  // vão livre
  { a: [-1110, 0, 840], b: [-1110, 679, 840], txt: "679 vão livre", t0: T.vao + 0.8, t1: T.trilho },
  { a: [-974, 330, 840], b: [974, 330, 840], txt: "1948 entre pés", t0: T.vao + 1.6, t1: T.trilho, cor: VERM },
  // neoprene
  { a: [-1000, 720, 760], b: [1000, 720, 760], txt: "2000", t0: T.neo + 1.6, t1: T.tampo },
  { a: [1060, 720, -700], b: [1060, 720, 700], txt: "1400", t0: T.neo + 2.0, t1: T.tampo },
  // tampo
  { a: [-1120, 870, 880], b: [1120, 870, 880], txt: "2240 (sobra 10 mm em cada ponta)", t0: T.tampo + 10.0, t1: T.corte },
  { a: [-1120, 870, 960], b: [-560, 870, 960], txt: "560", t0: T.tampo + 10.4, t1: T.corte },
  // detalhe A (corte em x = 0, olhando a beirada comprida)
  { a: [0, 845, 700], b: [0, 845, 810], txt: "110 borda", t0: T.corte + 2.0, t1: T.final, cor: VERM },
  { a: [0, 700, 655], b: [0, 780, 655], txt: "80 rebaixo", t0: T.corte + 2.6, t1: T.final },
  { a: [0, 780, 660], b: [0, 832, 660], txt: "52 tampo", t0: T.corte + 3.2, t1: T.final },
  { a: [0, 679, 830], b: [0, 762, 830], txt: "83 faixa", t0: T.corte + 3.8, t1: T.final },
  { a: [0, 664, 718], b: [0, 664, 782], txt: "64", t0: T.corte + 4.4, t1: T.final },
];

const ETIQUETAS: Etiqueta[] = [
  { em: [0, 688, 600], txt: "Fundo F1 · 2164 × 1564", sub: "compensado naval 18 · peça inteira", dx: -260, dy: -200, t0: T.fundo + 1.2, t1: T.saias },
  { em: [-600, 560, 0], txt: "Viga central · 2164 × 200 × 36", sub: "2 lâminas coladas · preta · no meio", dx: -120, dy: 230, t0: T.fundo + 4.4, t1: T.saias },
  { em: [930, 520, 773], txt: "8 saias de canto · 300 × 200", sub: "2 por canto · tingidas de preto", dx: -330, dy: 170, t0: T.saias + 1.6, t1: T.borda },
  { em: [949, 560, 649], txt: "Bloco de canto · 36 mm", sub: "pontas a 45° · puxa o pé", dx: -380, dy: -190, t0: T.saias + 4.2, t1: T.borda },
  { em: [-300, 750, 709], txt: "Paredes internas · MDF BP", sub: "65 de altura · lado bonito para dentro", dx: -200, dy: -230, t0: T.borda + 1.2, t1: T.borda + 5.6 },
  { em: [400, 740, 750], txt: "Calços · a cada 400 mm", sub: "naval 100 × 64 × 65 · em volta toda", dx: 40, dy: 210, t0: T.borda + 3.6, t1: T.borda + 8.2 },
  { em: [-500, 700, 800], txt: "Faixa externa · 83 de altura", sub: "naval tingido de preto", dx: -160, dy: 220, t0: T.borda + 6.4, t1: T.pes },
  { em: [-200, 780, 755], txt: "Borda de cima · 110", sub: "MDF BP · 10 mm para fora da faixa", dx: -120, dy: -250, t0: T.borda + 9.2, t1: T.pes },
  { em: [500, 781, 717], txt: "Rasgo porta-cartas", sub: "4 × 10 mm · a 15 mm da beirada", dx: 60, dy: -200, t0: T.borda + 9.8, t1: T.pes },
  { em: [1020, 300, 720], txt: "Pé · 90 × 90", sub: "5 lâminas de naval · verniz", dx: -420, dy: -60, t0: T.pes + 1.4, t1: T.vao },
  { em: [1037, 100, 737], txt: "Afina por dentro até 55", sub: "sapata niveladora M8", dx: -400, dy: 120, t0: T.pes + 3.0, t1: T.vao },
  { em: [1019, 580, 788], txt: "4 parafusos M8 × 60", sub: "+ rosca dupla M8 × 100 no bloco", dx: -360, dy: -230, t0: T.pes + 4.6, t1: T.vao },
  { em: [300, 120, 760], txt: "Pés livres", sub: "nenhuma travessa embaixo", dx: 60, dy: 150, t0: T.vao + 2.4, t1: T.trilho },
  { em: [-300, 700, 809], txt: "Trilho 18 × 51 · chanfro 45°", sub: "27 mm abaixo da borda · volta toda", dx: -300, dy: 200, t0: T.trilho + 1.4, t1: T.neo },
  { em: [550, 790, 896], txt: "6 porta-copos · 120 × 120", sub: "copo de inox encaixado", dx: 40, dy: -230, t0: T.trilho + 3.6, t1: T.neo },
  { em: [0, 760, 926], txt: "Bandeja de dados · 250 × 180", sub: "fundo de neoprene", dx: -320, dy: 150, t0: T.trilho + 6.0, t1: T.neo },
  { em: [0, 700, 0], txt: "Neoprene 3 mm · verde-escuro", sub: "solto, sem cola: sai para limpar", dx: -220, dy: -260, t0: T.neo + 1.0, t1: T.tampo },
  { em: [0, 1560, 0], txt: "Módulo do tampo · caixa oca", sub: "5 nervuras + 2 travessas · peles de 6 mm", dx: 120, dy: -220, t0: T.tampo + 1.2, t1: T.tampo + 6.6 },
  { em: [-840, 832, 0], txt: "4 módulos · 560 × 1640 × 52", sub: "cerca de 12 kg cada", dx: -150, dy: -240, t0: T.tampo + 8.2, t1: T.corte },
  { em: [840, 790, 755], txt: "Cavilhas 8 mm", sub: "2 por módulo · alinham o tampo", dx: -40, dy: 200, t0: T.tampo + 8.8, t1: T.corte },
  { em: [0, 698, 690], txt: "Neoprene 3", sub: "superfície de jogo a 700", dx: -330, dy: 120, t0: T.corte + 5.2, t1: T.final },
  { em: [0, 688, 760], txt: "Fundo naval 18", sub: "a caixa fechada deixa a mesa rígida", dx: 60, dy: 200, t0: T.corte + 5.8, t1: T.final },
];

const ETAPAS: { t0: number; t1: number; n?: string; tit: string; sub: string }[] = [
  { t0: T.medidas, t1: T.monta, tit: "As medidas que importam", sub: "Altura da borda 780 · jogo a 700 · com tampo 832" },
  { t0: T.fundo, t1: T.saias, n: "1", tit: "Fundo + viga central", sub: "Folha 6 · cola + parafuso a cada 150 mm" },
  { t0: T.saias, t1: T.borda, n: "2", tit: "Saias e blocos de canto", sub: "Folhas 6 e 7 · vista por baixo" },
  { t0: T.borda, t1: T.pes, n: "3", tit: "Caixa da borda", sub: "Paredes · calços · faixa preta · borda de cima" },
  { t0: T.pes, t1: T.vao, n: "4", tit: "Pés removíveis", sub: "Folha 7 · entram no canto, entre as 2 saias" },
  { t0: T.vao, t1: T.trilho, n: "5", tit: "Espaço para as pernas", sub: "Folha 3 · nada preso embaixo da borda" },
  { t0: T.trilho, t1: T.neo, n: "6", tit: "Trilho e acessórios", sub: "Folha 9 · põe e tira em qualquer lugar" },
  { t0: T.neo, t1: T.tampo, n: "7", tit: "Neoprene", sub: "Área de jogo 2000 × 1400" },
  { t0: T.tampo, t1: T.corte, n: "8", tit: "Tampo removível", sub: "Folha 8 · leve e não empena" },
  { t0: T.corte, t1: T.final, n: "9", tit: "Corte · Detalhe A", sub: "Folha 5 · as camadas da borda por dentro" },
];

const Ponta: React.FC<{ x: number; y: number; ang: number; cor: string }> = ({ x, y, ang, cor }) => (
  <path d="M0,0 L-14,-6 L-14,6 Z" fill={cor} transform={`translate(${x},${y}) rotate(${(ang * 180) / Math.PI})`} />
);

const Camada2D: React.FC<{ s: number }> = ({ s }) => {
  const proj = projetor(s);
  const vis = (t0: number, t1: number) => Math.min(p(s, t0, 0.45), 1 - p(s, t1 - 0.45, 0.45));
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg width={S} height={S} style={{ position: "absolute", left: 0, top: 0 }}>
        {COTAS.map((c, i) => {
          const o = vis(c.t0, c.t1);
          if (o <= 0) return null;
          const A = proj(c.a), B = proj(c.b);
          const cor = c.cor ?? AZUL;
          const ang = Math.atan2(B.y - A.y, B.x - A.x);
          const k = p(s, c.t0, 0.7);
          const bx = A.x + (B.x - A.x) * k, by = A.y + (B.y - A.y) * k;
          const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
          const nx = -Math.sin(ang) * 12, ny = Math.cos(ang) * 12;
          return (
            <g key={i} opacity={o}>
              <path d={`M${A.x + nx},${A.y + ny} L${A.x - nx},${A.y - ny} M${B.x + nx},${B.y + ny} L${B.x - nx},${B.y - ny}`} stroke={cor} strokeWidth={3} />
              <line x1={A.x} y1={A.y} x2={bx} y2={by} stroke={cor} strokeWidth={3.5} />
              <Ponta x={A.x} y={A.y} ang={ang + Math.PI} cor={cor} />
              {k > 0.98 ? <Ponta x={B.x} y={B.y} ang={ang} cor={cor} /> : null}
              <g opacity={p(s, c.t0 + 0.5, 0.3)}>
                <rect x={mx - (c.txt.length * 10.5 + 24) / 2} y={my - 22} width={c.txt.length * 10.5 + 24} height={44} rx={8} fill="#ffffff" stroke={cor} strokeWidth={3} />
                <text x={mx} y={my + 9} textAnchor="middle" fontFamily={SANS} fontWeight={900} fontSize={26} fill={cor}>{c.txt}</text>
              </g>
            </g>
          );
        })}
        {ETIQUETAS.map((e, i) => {
          const o = vis(e.t0, e.t1);
          if (o <= 0) return null;
          const P0 = proj(e.em);
          const cx = Math.max(30, Math.min(S - 30, P0.x + e.dx)), cy = Math.max(150, Math.min(S - 70, P0.y + e.dy));
          return (
            <g key={`e${i}`} opacity={o}>
              <line x1={P0.x} y1={P0.y} x2={cx} y2={cy} stroke={VERM} strokeWidth={3} />
              <circle cx={P0.x} cy={P0.y} r={7} fill={VERM} stroke="#fff" strokeWidth={2} />
            </g>
          );
        })}
      </svg>
      {ETIQUETAS.map((e, i) => {
        const o = vis(e.t0, e.t1);
        if (o <= 0) return null;
        const P0 = proj(e.em);
        const cx = Math.max(30, Math.min(S - 30, P0.x + e.dx)), cy = Math.max(150, Math.min(S - 70, P0.y + e.dy));
        const largura = 420;
        const esq = Math.max(24, Math.min(S - largura - 24, cx - (e.dx < 0 ? largura - 20 : 20)));
        return (
          <div key={`d${i}`} style={{ position: "absolute", left: esq, top: cy - 40, width: largura, opacity: o, transform: `translateY(${10 * (1 - p(s, e.t0, 0.5))}px)` }}>
            <div style={{ background: "#ffffff", borderLeft: `8px solid ${VERM}`, borderRadius: 10, padding: "10px 16px", boxShadow: "0 8px 24px rgba(20,30,50,.18)" }}>
              <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 27, color: AZUL, lineHeight: 1.15 }}>{e.txt}</div>
              {e.sub ? <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 21, color: "#4a5568", marginTop: 3 }}>{e.sub}</div> : null}
            </div>
          </div>
        );
      })}
      {ETAPAS.map((e, i) => {
        const o = vis(e.t0, e.t1);
        if (o <= 0) return null;
        return (
          <div key={`t${i}`} style={{ position: "absolute", left: 36, top: 32, opacity: o, transform: `translateX(${-30 * (1 - p(s, e.t0, 0.5))}px)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {e.n ? <div style={{ width: 70, height: 70, borderRadius: 35, background: AZUL, color: "#fff", fontFamily: SANS, fontWeight: 900, fontSize: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>{e.n}</div> : null}
              <div>
                {e.n ? <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 18, letterSpacing: "0.18em", color: VERM }}>ETAPA {e.n} DE 9</div> : null}
                <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 46, color: AZUL, lineHeight: 1.05 }}>{e.tit}</div>
                <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 22, color: "#4a5568", marginTop: 4 }}>{e.sub}</div>
              </div>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------------- abertura, legenda de materiais e final ----------------
const Legenda: React.FC<{ o: number }> = ({ o }) => (
  <div style={{ position: "absolute", right: 30, bottom: 30, background: "rgba(255,255,255,.92)", borderRadius: 12, padding: "14px 18px", opacity: o, boxShadow: "0 8px 24px rgba(20,30,50,.15)" }}>
    {[["Compensado naval 18", COR.naval], ["MDF BP amadeirado 18", COR.bp], ["MDF cru (miolo do tampo)", COR.cru], ["Preto acetinado", COR.preto], ["Neoprene 3 mm", COR.neo]].map(([t, c]) => (
      <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <div style={{ width: 26, height: 18, background: c, border: "1.5px solid #333", borderRadius: 3 }} />
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 19, color: AZUL }}>{t}</div>
      </div>
    ))}
  </div>
);

const Abertura: React.FC<{ s: number }> = ({ s }) => {
  const o = Math.min(p(s, 0.3, 0.6), 1 - p(s, T.medidas - 0.6, 0.6));
  if (o <= 0) return null;
  return (
    <div style={{ position: "absolute", left: 50, top: 50, opacity: o }}>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: "0.22em", color: VERM }}>DESENHO TÉCNICO · REV. 04</div>
      <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 68, color: AZUL, lineHeight: 1, marginTop: 8 }}>Mesa</div>
      <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 68, color: AZUL, lineHeight: 1 }}>Eliteboardgamers</div>
      <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 26, color: "#4a5568", marginTop: 14 }}>Mesa para board games · 4 a 6 jogadores</div>
      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        {[["Área de jogo", "2000 × 1400"], ["Mesa", "2220 × 1620"], ["Borda", "780 mm"]].map(([a, b], i) => (
          <div key={a} style={{ background: "#fff", borderRadius: 10, padding: "10px 16px", boxShadow: "0 6px 18px rgba(20,30,50,.14)", opacity: p(s, 1.2 + 0.4 * i, 0.4) }}>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 18, color: "#4a5568" }}>{a}</div>
            <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 30, color: AZUL }}>{b}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Final: React.FC<{ s: number }> = ({ s }) => {
  const o = p(s, T.final + 0.6, 0.6);
  if (o <= 0) return null;
  const itens = [["Mesa", "2220 × 1620 · cantos raio 30"], ["Área de jogo", "2000 × 1400 · rebaixo 80"], ["Alturas", "borda 780 · jogo 700 · tampo 832"], ["Vão livre", "679 · pés sem travessa"], ["Tampo", "4 módulos · ~12 kg cada"], ["Caixa", "~70 kg sem pés e sem tampo"]];
  return (
    <div style={{ position: "absolute", left: 40, top: 40, opacity: o }}>
      <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 54, color: AZUL, lineHeight: 1 }}>Mesa Eliteboardgamers</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 18, width: 760 }}>
        {itens.map(([a, b], i) => (
          <div key={a} style={{ background: "rgba(255,255,255,.94)", borderRadius: 10, padding: "8px 14px", boxShadow: "0 6px 18px rgba(20,30,50,.12)", opacity: p(s, T.final + 1 + 0.25 * i, 0.4) }}>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 17, letterSpacing: "0.12em", color: VERM }}>{a.toUpperCase()}</div>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 24, color: AZUL }}>{b}</div>
          </div>
        ))}
      </div>
      <Img src={staticFile("img/logo.webp")} style={{ width: 210, marginTop: 22, opacity: p(s, T.final + 3, 0.5) }} />
    </div>
  );
};

export const Mesa3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const s = frame / fps;
  const legenda = Math.max(Math.min(p(s, 1.5, 0.5), 1 - p(s, T.medidas, 0.4)), p(s, T.final + 2, 0.5), s >= T.monta && s < T.corte ? Math.min(p(s, T.monta, 0.5), 1 - p(s, T.corte - 0.5, 0.4)) * 0.0 : 0);
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #f4f6f9 0%, #e4e7ec 100%)" }}>
      <ThreeCanvas width={width} height={height} shadows onCreated={({ gl }) => { gl.localClippingEnabled = true; }} camera={{ fov: 34, position: [3, 2, 3] }}>
        <Cena s={s} />
      </ThreeCanvas>
      <Camada2D s={s} />
      <Abertura s={s} />
      <Final s={s} />
      <Legenda o={legenda} />
      <Audio src={staticFile("audio/mesa/trilha.mp3")} volume={(f) => interpolate(f / fps, [0, 1, T.fim - 2.5, T.fim], [0, 0.55, 0.55, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      {[T.medidas, T.fundo, T.saias, T.borda, T.pes, T.vao, T.trilho, T.neo, T.tampo, T.corte, T.final].map((t, i) => (
        <Sequence key={i} from={Math.round((t - 0.25) * fps)} durationInFrames={Math.round(0.8 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh-short.mp3")} volume={0.18} /></Sequence>
      ))}
    </AbsoluteFill>
  );
};
