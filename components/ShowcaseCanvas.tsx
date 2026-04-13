"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, PresentationControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ClothesPlaceholder, { CLOTHES_COUNT } from "./ClothesPlaceholder";

const PRODUCTS = [
  { id: "CAPS", name: "Signature Baseball Cap", color: "#cc0000", price: "₹499" },
  { id: "GLSS", name: "Vintage Aviator Glasses", color: "#f7a721", price: "₹1,299" },
  { id: "JCKT", name: "Premium Varsity Jacket", color: "#004c97", price: "₹3,499" },
  { id: "SNKR", name: "Custom Urban Sneakers", color: "#ea1a85", price: "₹5,999" },
  { id: "SHRT", name: "Heavyweight Boxy T-Shirt", color: "#17449b", price: "₹999" },
  { id: "HATS", name: "Classic Top Hat", color: "#3a225d", price: "₹1,999" },
];

export default function ShowcaseCanvas() {
  const [index, setIndex] = useState(0);

  const activeProduct = PRODUCTS[index];

  const nextModel = () => setIndex((prev) => (prev + 1) % CLOTHES_COUNT);
  const prevModel = () => setIndex((prev) => (prev === 0 ? CLOTHES_COUNT - 1 : prev - 1));

  return (
    <motion.div
      className="w-screen h-screen p-4 sm:p-6 bg-black font-sans"
      animate={{ backgroundColor: activeProduct.color }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="relative w-full h-full bg-[#0a0a0a] rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col">

        {/* Massive Background Watermark */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/2 -translate-y-1/2 right-[5%] text-[20vw] font-black text-white/5 pointer-events-none select-none z-0"
          >
            {activeProduct.id}
          </motion.div>
        </AnimatePresence>

        {/* 3D Canvas Layer */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          <Canvas camera={{ position: [0, 0, 11], fov: 40 }}>
            <ambientLight intensity={2.5} />
            <directionalLight position={[10, 10, 5]} intensity={4.0} />
            <Environment preset="city" />

            <group position={[0, 0, 0]}>
              <PresentationControls
                global
                cursor={true}
                snap={false}
                speed={2}
                zoom={1}
                polar={[-Math.PI, Math.PI]}
                azimuth={[-Math.PI, Math.PI]}
                config={{ mass: 1, tension: 170, friction: 26 }}
              >
                <ClothesPlaceholder index={index} teamColor={activeProduct.color} />
              </PresentationControls>

              <ContactShadows
                position={[0, -2, 0]}
                opacity={0.5}
                scale={10}
                blur={2}
                far={4}
              />
            </group>
          </Canvas>
        </div>

        {/* Top Navbar Layer */}
        <nav className="absolute top-0 left-0 w-full p-8 px-12 flex justify-end items-center z-20 pointer-events-none">
          <div className="hidden sm:flex gap-10 text-sm font-bold tracking-widest text-[#a0a0a0] pointer-events-auto">
            <motion.a
              animate={{ color: activeProduct.color, borderBottomColor: activeProduct.color }}
              className="cursor-pointer pb-2 border-b-2"
            >
              PRODUCTS
            </motion.a>
            <a className="hover:text-white cursor-pointer transition-colors pb-2 border-b-2 border-transparent">COLLECTIONS</a>
            <a className="hover:text-white cursor-pointer transition-colors pb-2 border-b-2 border-transparent">CUSTOMIZE</a>
          </div>
        </nav>

        {/* Floating Nav Arrows spanning the entire page width */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-8 z-30 pointer-events-none w-full">
          <button onClick={prevModel} className="w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-white/10 pointer-events-auto transition-colors shadow-2xl">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextModel} className="w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-white/10 pointer-events-auto transition-colors shadow-2xl">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Main Content Layout Layer */}
        <div className="flex-1 flex w-full h-full z-20 pointer-events-none px-12 pb-12">

          {/* Left Column: Typography */}
          <div className="w-full sm:w-1/2 h-full flex flex-col justify-end pointer-events-auto">

            <div className="mb-10 sm:mb-24">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={activeProduct.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="text-white text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[1.05] tracking-tight mb-8 max-w-xl text-balance"
                >
                  {activeProduct.name}
                </motion.h1>
              </AnimatePresence>

              <div className="flex items-end gap-4">
                <motion.span
                  key={activeProduct.price}
                  animate={{ color: activeProduct.color }}
                  className="text-5xl font-black tracking-tighter"
                >
                  {activeProduct.price}
                </motion.span>
                <span className="text-[#a0a0a0] font-bold text-lg mb-1 tracking-widest">SIZE: M</span>
              </div>
            </div>

            {/* Bottom Footer Details */}
            <div className="mt-auto">
              <div className="flex gap-6 text-[#666] text-xs font-bold tracking-widest mb-3">
                <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
                <a href="#" className="hover:text-white transition-colors">TWITTER</a>
                <a href="#" className="hover:text-white transition-colors">TERMS</a>
              </div>
              <p className="text-[#333] text-[10px] font-bold tracking-widest uppercase">
                © 2026 AURA STUDIO. KINETIC BRUTALISM EDITION.
              </p>
            </div>
          </div>

          {/* Right Column: Customize button */}
          <div className="hidden sm:flex w-1/2 h-full relative pointer-events-none flex-col justify-end items-end">
            <div className="flex flex-col items-end gap-6 pointer-events-auto z-30">
              <motion.button
                animate={{ backgroundColor: activeProduct.color }}
                className="text-white font-black text-sm tracking-widest px-16 py-5 shadow-2xl hover:brightness-110 transition-all uppercase"
              >
                Customize
              </motion.button>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
