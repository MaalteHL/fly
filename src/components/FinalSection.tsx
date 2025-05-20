import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface CountUpAnimationProps {
  target: string;
  duration: number;
  delay: number;
}

function CountUpAnimation({ target, duration, delay }: CountUpAnimationProps) {
  const [count, setCount] = useState("0");
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { amount: 0.8, once: false });

  useEffect(() => {
    if (isInView) {
      let targetNum = parseInt(target.replace(/\D/g, ''));
      if (isNaN(targetNum)) targetNum = 0;
      
      const controls = animate(0, targetNum, {
        duration: duration,
        delay: delay,
        onUpdate: (value) => {
          if (target.includes('K')) {
            setCount(Math.floor(value) + 'K+');
          } else if (target.includes('%')) {
            setCount(Math.floor(value) + '%');
          } else if (target.includes('/')) {
            setCount('24/7');
          } else {
            setCount(Math.floor(value) + '+');
          }
        },
        ease: "easeOut"
      });

      return () => controls.stop();
    }
  }, [isInView, target, duration, delay]);

  return <span ref={elementRef}>{count}</span>;
}

interface FinalSectionProps {
  opacity: number;
}

export function FinalSection({ opacity }: FinalSectionProps) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "85% end"]
  })

  // Enhanced scroll-based animations
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150])
  
  // New scroll-based animations
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.15, 0.05])
  const pathLength = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 100])
  
  return (
    <motion.div 
      ref={containerRef}
      className="relative"
      style={{ 
        opacity,
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(to bottom, #1a2f1a 0%, #0a1f0a 50%, #050f05 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '5vh 0 0 0',
        gap: '12vh',
        overflow: 'hidden'
      }}
    >
      {/* Animated Path Background */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        <motion.path
          d="M0,50 Q25,0 50,50 T100,50"
          style={{
            pathLength,
            stroke: 'rgba(34, 197, 94, 0.2)',
            strokeWidth: 2,
            fill: 'none',
            scale: 2,
          }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>

      {/* Vertical Progress Line */}
      <motion.div
        style={{
          position: 'fixed',
          left: '5%',
          top: 0,
          width: '2px',
          height: '100%',
          background: 'rgba(34, 197, 94, 0.2)',
          transformOrigin: 'top',
          scaleY: scrollYProgress
        }}
      >
        <motion.div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#22c55e',
            position: 'absolute',
            left: '-4px',
            top: lineProgress + '%'
          }}
        />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          width: '100%',
          padding: '0 5%',
          textAlign: 'center',
          position: 'relative',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* Background animated circles */}
        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            overflow: 'hidden',
            zIndex: 0
          }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: '40vw',
                height: '40vw',
                borderRadius: '50%',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>

        <motion.h1 
          className="text-white text-8xl font-bold mb-12"
          style={{
            position: 'relative',
            zIndex: 1,
            textShadow: '0 0 20px rgba(34, 197, 94, 0.3)'
          }}
          animate={{ 
            scale: [1, 1.02, 1],
            textShadow: [
              "0 0 20px rgba(34, 197, 94, 0)",
              "0 0 40px rgba(34, 197, 94, 0.5)",
              "0 0 20px rgba(34, 197, 94, 0)"
            ]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            ease: "easeInOut"
          }}
        >
          Rädda Vår Flygplats
        </motion.h1>

        <motion.div
          className="flex justify-center items-center gap-12 text-2xl flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
            padding: '0 2rem'
          }}
        >
          {/* Large diagonal background element */}
          <motion.div
            style={{
              position: 'absolute',
              width: '150%',
              height: '150%',
              background: 'linear-gradient(45deg, rgba(34, 197, 94, 0.05), transparent)',
              transform: 'rotate(-45deg)',
              zIndex: -1,
              pointerEvents: 'none'
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '3rem',
            width: '100%',
            position: 'relative'
          }}>
            {[
              { text: "Framtid", icon: "🚀", description: "Skapar en hållbar framtid för kommande generationer" },
              { text: "Innovation", icon: "💡", description: "Driver teknisk utveckling och smarta lösningar" },
              { text: "Hållbarhet", icon: "🌍", description: "Fokuserar på miljövänliga alternativ" }
            ].map((item, index) => (
              <motion.div
                key={index}
                style={{
                  position: 'relative',
                  padding: '2.5rem 2rem',
                  background: 'rgba(34, 197, 94, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.5rem',
                  minHeight: '320px',
                  justifyContent: 'center',
                  transform: `translateY(${index === 1 ? '40px' : '0px'})`,
                  zIndex: index === 1 ? 2 : 1
                }}
                initial={{ 
                  opacity: 0,
                  y: 50,
                  rotateX: -30
                }}
                whileInView={{ 
                  opacity: 1,
                  y: index === 1 ? 40 : 0,
                  rotateX: 0,
                  transition: {
                    type: "spring",
                    bounce: 0.4,
                    duration: 1.2,
                    delay: index * 0.2
                  }
                }}
                whileHover={{ 
                  scale: 1.05,
                  background: 'rgba(34, 197, 94, 0.1)',
                  boxShadow: '0 0 30px rgba(34, 197, 94, 0.2)',
                  zIndex: 3,
                  transition: {
                    type: "spring",
                    stiffness: 300
                  }
                }}
                viewport={{ once: false, amount: 0.3 }}
              >
                {/* Animated background gradient */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.15), transparent)',
                    borderRadius: '20px',
                    opacity: 0.5,
                    zIndex: 0
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3
                  }}
                />
                
                {/* Animated border */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: '-2px',
                    borderRadius: '22px',
                    background: 'linear-gradient(45deg, transparent, rgba(34, 197, 94, 0.3), transparent)',
                    zIndex: -1
                  }}
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <motion.div
                  style={{
                    fontSize: '3rem',
                    position: 'relative',
                    zIndex: 1
                  }}
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.4
                  }}
                >
                  {item.icon}
                </motion.div>

                <motion.div
                  style={{
                    color: '#22c55e',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    position: 'relative',
                    zIndex: 1
                  }}
                  whileHover={{
                    textShadow: '0 0 10px rgba(34, 197, 94, 0.5)'
                  }}
                >
                  {item.text}
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: '-8px',
                      left: '0',
                      width: '100%',
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, #22c55e, transparent)',
                      transformOrigin: 'left'
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </motion.div>

                <motion.p
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textAlign: 'center',
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    maxWidth: '280px',
                    position: 'relative',
                    zIndex: 1
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {item.description}
                </motion.p>

                {/* Floating particles */}
                {[...Array(3)].map((_, particleIndex) => (
                  <motion.div
                    key={particleIndex}
                    style={{
                      position: 'absolute',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'rgba(34, 197, 94, 0.3)',
                      zIndex: 0
                    }}
                    animate={{
                      x: [0, Math.random() * 100 - 50],
                      y: [0, Math.random() * 100 - 50],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: particleIndex * 0.5
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Mission Statement with Quote */}
      <motion.div
        style={{ 
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto 8rem auto',
          padding: '0 2rem',
          textAlign: 'center'
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '1.75rem',
            lineHeight: 1.6,
            fontStyle: 'italic',
            position: 'relative',
            maxWidth: '1000px',
            margin: '0 auto'
          }}
        >
          "Tillsammans skapar vi en hållbar framtid för vår flygplats, 
          där innovation möter miljömedvetenhet och samhällsutveckling går hand i hand."
        </motion.p>
      </motion.div>

      {/* Vision Cards with Connected Layout */}
      <motion.div
        style={{ 
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          padding: '0 2rem',
          minHeight: '100vh',
          marginTop: '5vh',
          marginBottom: '2rem'
        }}
      >
        {/* SVG for connecting lines */}
        <svg
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'visible'
          }}
          viewBox="0 0 1400 1200"
          preserveAspectRatio="none"
        >
          {/* Background glow effect */}
          <motion.path
            d={`M280,120 
                C${0.25 * 1400},${0.05 * 1200} 
                  ${0.2 * 1400},${0.25 * 1200}
                  ${0.3 * 1400},${0.35 * 1200}
                C${0.35 * 1400},${0.4 * 1200}
                  ${0.3 * 1400},${0.5 * 1200}
                  ${0.35 * 1400},${0.45 * 1200}
                C${0.4 * 1400},${0.5 * 1200}
                  ${0.5 * 1400},${0.7 * 1200}
                  ${0.6 * 1400},${0.85 * 1200}`}
            style={{
              fill: 'none',
              stroke: 'rgba(34, 197, 94, 0.1)',
              strokeWidth: 20,
              filter: 'blur(20px)',
              strokeLinecap: 'round',
              strokeLinejoin: 'round'
            }}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Main animated path */}
          <motion.path
            d={`M280,120 
                C${0.25 * 1400},${0.05 * 1200} 
                  ${0.2 * 1400},${0.25 * 1200}
                  ${0.3 * 1400},${0.35 * 1200}
                C${0.35 * 1400},${0.4 * 1200}
                  ${0.3 * 1400},${0.5 * 1200}
                  ${0.35 * 1400},${0.45 * 1200}
                C${0.4 * 1400},${0.5 * 1200}
                  ${0.5 * 1400},${0.7 * 1200}
                  ${0.6 * 1400},${0.85 * 1200}`}
            style={{
              fill: 'none',
              stroke: 'rgba(34, 197, 94, 0.3)',
              strokeWidth: 2,
              strokeDasharray: '12,8',
              strokeLinecap: 'round',
              strokeLinejoin: 'round'
            }}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Decorative dots along the path */}
          {[...Array(6)].map((_, i) => (
            <motion.circle
              key={i}
              r="4"
              fill="#22c55e"
              filter="drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))"
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: [0, 1, 1, 0],
                scale: [0.8, 1.2, 1.2, 0.8],
                offsetDistance: [`${i * 20}%`, `${(i * 20) + 100}%`],
              }}
              transition={{
                duration: 4,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              style={{
                offsetPath: `path("M280,120 
                  C${0.25 * 1400},${0.05 * 1200} 
                    ${0.2 * 1400},${0.25 * 1200}
                    ${0.3 * 1400},${0.35 * 1200}
                  C${0.35 * 1400},${0.4 * 1200}
                    ${0.3 * 1400},${0.5 * 1200}
                    ${0.35 * 1400},${0.45 * 1200}
                  C${0.4 * 1400},${0.5 * 1200}
                    ${0.5 * 1400},${0.7 * 1200}
                    ${0.6 * 1400},${0.85 * 1200}")`,
                offsetRotate: "auto"
              }}
            />
          ))}

          {/* Small decorative circles along the path */}
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={`small-${i}`}
              r="2"
              fill="rgba(34, 197, 94, 0.3)"
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: [0, 0.5, 0],
                scale: [0.5, 1, 0.5],
                offsetDistance: `${(i * 5)}%`,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.1
              }}
              style={{
                offsetPath: `path("M280,120 
                  C${0.25 * 1400},${0.05 * 1200} 
                    ${0.2 * 1400},${0.25 * 1200}
                    ${0.3 * 1400},${0.35 * 1200}
                  C${0.35 * 1400},${0.4 * 1200}
                    ${0.3 * 1400},${0.5 * 1200}
                    ${0.35 * 1400},${0.45 * 1200}
                  C${0.4 * 1400},${0.5 * 1200}
                    ${0.5 * 1400},${0.7 * 1200}
                    ${0.6 * 1400},${0.85 * 1200}")`,
                offsetRotate: "auto"
              }}
            />
          ))}
        </svg>

        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}>
          {[
            {
              title: "Miljövänlig Framtid",
              description: "Vi implementerar gröna teknologier och minskar vårt koldioxidavtryck genom innovativa lösningar",
              position: { left: '20%', top: '5vh' }
            },
            {
              title: "Lokal Utveckling",
              description: "Flygplatsen driver regional tillväxt och skapar nya möjligheter för näringslivet",
              position: { left: '35%', top: '45vh' }
            },
            {
              title: "Sammankopplad Värld",
              description: "Vi bygger broar mellan människor och platser, med fokus på hållbara transportlösningar",
              position: { left: '60%', top: '85vh' }
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ 
                opacity: 0,
                y: 50,
                x: index % 2 === 0 ? -50 : 50
              }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                x: 0,
                transition: {
                  duration: 0.6,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }
              }}
              viewport={{ 
                once: false, 
                amount: 0.3,
                margin: "-50px"
              }}
              style={{
                position: 'absolute',
                width: '400px',
                background: 'rgba(21, 128, 61, 0.3)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '2.5rem',
                transform: 'translateX(-50%)',
                ...item.position,
                zIndex: 1
              }}
            >
              {/* Glowing dot */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: index === 0 ? '-30px' : index === 1 ? '-30px' : '-30px',
                  top: '50%',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                  transform: 'translateY(-50%)',
                  boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)'
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <motion.h3
                style={{
                  color: 'white',
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  marginBottom: '1.5rem',
                  textAlign: 'left',
                  position: 'relative'
                }}
              >
                {item.title}
                <motion.div
                  style={{
                    width: '60px',
                    height: '2px',
                    background: '#22c55e',
                    margin: '0.75rem 0 0'
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </motion.h3>

              <motion.p
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textAlign: 'left',
                  lineHeight: 1.7,
                  fontSize: '1.1rem'
                }}
              >
                {item.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Section with Enhanced Layout */}
      <motion.div
        style={{ 
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '4rem 2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background Elements */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.1), transparent 70%)',
            opacity: 0.5,
            zIndex: 0
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            color: 'white',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '4rem',
            position: 'relative'
          }}
        >
          Vår Påverkan
          <motion.div
            style={{
              width: '60px',
              height: '4px',
              background: 'linear-gradient(90deg, transparent, #22c55e, transparent)',
              margin: '1rem auto 0'
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
          position: 'relative',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {[
            { number: "50K+", label: "Resenärer per år", icon: "✈️", description: "Växande passagerarantal visar flygplatsens betydelse" },
            { number: "100+", label: "Arbetstillfällen", icon: "💼", description: "Direkta och indirekta jobb i regionen" },
            { number: "30%", label: "Grön Energi", icon: "🌱", description: "Ökande andel förnybar energianvändning" },
            { number: "24/7", label: "Tillgänglighet", icon: "🌍", description: "Konstant beredskap och service" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ 
                opacity: 0,
                x: -30,
                y: 20
              }}
              whileInView={{ 
                opacity: 1,
                x: 0,
                y: 0
              }}
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 }
              }}
              transition={{ 
                duration: 0.8,
                delay: index * 0.2,
                type: "spring"
              }}
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                borderRadius: '16px',
                padding: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                minHeight: '200px',
                maxWidth: '280px',
                margin: '0 auto'
              }}
            >
              {/* Animated background pattern */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.2), transparent)',
                  opacity: 0.5
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              />

              <motion.div
                style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.5rem',
                  position: 'relative'
                }}
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              >
                {stat.icon}
              </motion.div>

              <motion.div
                style={{
                  color: '#22c55e',
                  fontSize: '2.25rem',
                  fontWeight: 'bold',
                  textShadow: '0 0 20px rgba(34, 197, 94, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '160px'
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.8,
                    delay: 0.3 + index * 0.2
                  }
                }}
                viewport={{ once: false, amount: 0.8 }}
              >
                <CountUpAnimation
                  target={stat.number}
                  duration={2}
                  delay={0.5 + index * 0.2}
                />
              </motion.div>

              <motion.div
                style={{
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: '0.5rem'
                }}
              >
                {stat.label}
                <motion.div
                  style={{
                    width: '40px',
                    height: '2px',
                    background: '#22c55e',
                    margin: '0.5rem auto'
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </motion.div>

              <motion.p
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textAlign: 'center',
                  fontSize: '1.1rem',
                  lineHeight: 1.6
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {stat.description}
              </motion.p>

              {/* Decorative corner elements */}
              {[...Array(4)].map((_, cornerIndex) => (
                <motion.div
                  key={cornerIndex}
                  style={{
                    position: 'absolute',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'rgba(34, 197, 94, 0.2)',
                    ...{
                      0: { top: '10px', left: '10px' },
                      1: { top: '10px', right: '10px' },
                      2: { bottom: '10px', left: '10px' },
                      3: { bottom: '10px', right: '10px' }
                    }[cornerIndex]
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: cornerIndex * 0.5
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Timeline with Progressive Animation */}
      <motion.div
        style={{ y: parallaxY }}
        className="w-full px-5 max-w-6xl mx-auto relative"
      >
        {/* Timeline scroll progress container */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '8rem', // Start after the title
          bottom: '2rem',
          width: '2px',
          background: 'rgba(34, 197, 94, 0.1)',
          transformOrigin: 'top',
          zIndex: 0
        }}>
          <motion.div
            style={{
              width: '100%',
              background: 'rgba(34, 197, 94, 0.2)',
              boxShadow: '0 0 8px rgba(34, 197, 94, 0.2)',
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              transformOrigin: 'top',
              scaleY: scrollYProgress
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 30,
              restDelta: 0.001
            }}
          />
        </div>
        <h2 style={{
          color: 'white',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '3rem',
          position: 'relative'
        }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Vår Resa Mot Framtiden
          </motion.span>
          <motion.div
            style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #22c55e, transparent)'
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4rem',
          position: 'relative',
          paddingTop: '2rem'
        }}>
          {/* Background timeline line */}
          <motion.div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'rgba(34, 197, 94, 0.1)',
              boxShadow: '0 0 10px rgba(34, 197, 94, 0.1)',
              transformOrigin: 'top',
              scaleY: scrollYProgress,
              zIndex: 0
            }}
          />
          {[
            {
              year: "2024",
              quarter: "Q1",
              title: "Initiativ Lansering",
              description: "Startskottet för vår gröna omställning med fokus på hållbar utveckling och framtidssäkring av flygplatsen.",
              icon: "🌱",
              milestone: "Projektstart"
            },
            {
              year: "2024",
              quarter: "Q2",
              title: "Miljöanalys & Planering",
              description: "Omfattande kartläggning av miljöpåverkan och utveckling av strategiska handlingsplaner.",
              icon: "📊",
              milestone: "Miljöcertifiering"
            },
            {
              year: "2024",
              quarter: "Q4",
              title: "Energioptimering",
              description: "Installation av smarta energisystem och implementering av energibesparande åtgärder.",
              icon: "⚡",
              milestone: "25% Energibesparing"
            },
            {
              year: "2025",
              quarter: "Q1",
              title: "Digital Transformation",
              description: "Modernisering av terminaler med smart teknologi och automatiserade system.",
              icon: "💻",
              milestone: "Digital Hub"
            },
            {
              year: "2025",
              quarter: "Q3",
              title: "Hållbar Transport",
              description: "Införande av elektriska marktransporter och laddinfrastruktur.",
              icon: "🚌",
              milestone: "Grön Logistik"
            },
            {
              year: "2025",
              quarter: "Q4",
              title: "Community Engagement",
              description: "Lansering av program för lokalsamhället med fokus på utbildning och delaktighet.",
              icon: "🤝",
              milestone: "Samhällspartnerskap"
            },
            {
              year: "2026",
              quarter: "Q2",
              title: "Förnybar Energi",
              description: "Installation av solpaneler och vindkraftverk för egen energiproduktion.",
              icon: "☀️",
              milestone: "75% Grön Energi"
            },
            {
              year: "2026",
              quarter: "Q4",
              title: "Framtidens Flygplats",
              description: "100% förnybar energi och fullständig integration av hållbara system.",
              icon: "✈️",
              milestone: "Grön Certifiering"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ 
                x: index % 2 === 0 ? -50 : 50,
                opacity: 0
              }}
              whileInView={{ 
                x: 0,
                opacity: 1
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '2rem',
                background: 'rgba(34, 197, 94, 0.05)',
                padding: '2rem',
                borderRadius: '1rem',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                position: 'relative',
                marginLeft: index % 2 === 0 ? '0' : 'auto',
                width: '80%',
                zIndex: 2,
                backdropFilter: 'blur(8px)'
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  minWidth: '120px',
                  position: 'relative'
                }}
              >
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '-2.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    border: '2px solid #22c55e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: false }}
                  whileHover={{ scale: 1.2, backgroundColor: 'rgba(34, 197, 94, 0.2)' }}
                >
                  {item.icon}
                </motion.div>
                <div style={{
                  color: '#22c55e',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem'
                }}>
                  {item.year}
                </div>
                <div style={{
                  color: 'rgba(34, 197, 94, 0.8)',
                  fontSize: '1rem'
                }}>
                  {item.quarter}
                </div>
              </motion.div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  color: 'white',
                  fontSize: '1.5rem',
                  marginBottom: '0.5rem'
                }}>
                  {item.title}
                </h3>
                <p style={{ 
                  color: 'rgba(255,255,255,0.8)',
                  marginBottom: '1rem',
                  lineHeight: '1.6'
                }}>
                  {item.description}
                </p>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.3 }}
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '999px',
                    color: '#22c55e',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}
                >
                  {item.milestone}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Enhanced Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: 0.2 }}
        style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '8rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated background elements */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: 'rgba(34, 197, 94, 0.3)',
              filter: 'blur(1px)',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%'
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}

        {/* Glowing orbs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            style={{
              position: 'absolute',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.2), transparent 70%)',
              filter: 'blur(20px)',
              top: '50%',
              left: '50%'
            }}
            animate={{
              x: [
                -100 + Math.cos(i * (2 * Math.PI / 3)) * 200,
                100 + Math.cos(i * (2 * Math.PI / 3)) * 200
              ],
              y: [
                -100 + Math.sin(i * (2 * Math.PI / 3)) * 200,
                100 + Math.sin(i * (2 * Math.PI / 3)) * 200
              ],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
          />
        ))}

        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '2rem',
            position: 'relative',
            textShadow: '0 0 20px rgba(34, 197, 94, 0.3)'
          }}
        >
          Var med och forma framtiden
          <motion.div
            style={{
              width: '100px',
              height: '4px',
              background: 'linear-gradient(90deg, transparent, #22c55e, transparent)',
              margin: '1rem auto 0',
              borderRadius: '2px'
            }}
            animate={{
              width: ['0%', '100%', '0%'],
              x: ['-50%', '0%', '50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: '1.5rem',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            lineHeight: 1.6
          }}
        >
          Din röst är viktig för flygplatsens framtid. Tillsammans kan vi skapa en hållbar och innovativ mötesplats för kommande generationer.
        </motion.p>

        <motion.div
          style={{
            position: 'relative',
            display: 'inline-block'
          }}
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(34, 197, 94, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(45deg, #15803d, #22c55e)',
              color: 'white',
              padding: '1.5rem 3rem',
              borderRadius: '9999px',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Shine effect */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                transform: 'skewX(-20deg) translateX(-100%)'
              }}
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
            />
            
            {/* Button text with icon */}
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                position: 'relative'
              }}
            >
              <span>Stöd Initiativet</span>
              <motion.span
                animate={{
                  x: [0, 5, 0],
                  opacity: [1, 0.8, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                →
              </motion.span>
            </motion.div>
          </motion.button>

          {/* Ripple effect on hover */}
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.2) 0%, transparent 50%)',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              opacity: 0
            }}
            whileHover={{
              opacity: 1,
              scale: [1, 1.2],
              transition: {
                duration: 0.8,
                repeat: Infinity
              }
            }}
          />
        </motion.div>
      </motion.div>

      {/* Footer Section */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          width: '100%',
          background: 'linear-gradient(to bottom, transparent, rgba(34, 197, 94, 0.05))',
          padding: '6rem 2rem 3rem',
          position: 'relative',
          overflow: 'hidden',
          marginTop: '4rem',
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Animated grid background */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.1
          }}
        >
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(34, 197, 94, 0.3)"
              strokeWidth="1"
            />
          </pattern>
          <motion.rect
            width="100%"
            height="100%"
            fill="url(#grid)"
            animate={{
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '4rem',
          position: 'relative'
        }}>
          {/* Logo and Description */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ gridColumn: 'span 2' }}
          >
            <motion.h3
              style={{
                fontSize: '2rem',
                color: '#22c55e',
                marginBottom: '1.5rem',
                fontWeight: 'bold'
              }}
              whileHover={{
                textShadow: '0 0 10px rgba(34, 197, 94, 0.5)'
              }}
            >
              Rädda Vår Flygplats
            </motion.h3>
            <motion.p
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: 1.8,
                maxWidth: '400px'
              }}
            >
              Vi arbetar för en hållbar och innovativ framtid för vår flygplats. 
              Tillsammans skapar vi möjligheter för kommande generationer genom 
              smart teknologi och miljömedvetna lösningar.
            </motion.p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 style={{
              color: '#22c55e',
              fontSize: '1.2rem',
              marginBottom: '1.5rem',
              fontWeight: 'bold'
            }}>
              Snabblänkar
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Om Oss', 'Nyheter', 'Kontakt', 'Karriär'].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ marginBottom: '1rem' }}
                >
                  <motion.a
                    href="#"
                    style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    whileHover={{
                      color: '#22c55e',
                      x: 5
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>→</span> {item}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 style={{
              color: '#22c55e',
              fontSize: '1.2rem',
              marginBottom: '1.5rem',
              fontWeight: 'bold'
            }}>
              Kontakt
            </h4>
            {[
              { icon: '📍', text: 'Flygplatsvägen 1, 123 45' },
              { icon: '📞', text: '123-456 789' },
              { icon: '✉️', text: 'info@flygplats.se' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            borderTop: '1px solid rgba(34, 197, 94, 0.2)',
            marginTop: '4rem',
            paddingTop: '2rem',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.6)',
            position: 'relative'
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: '-1px',
              left: '0',
              width: '50%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #22c55e)',
            }}
            animate={{
              x: ['0%', '200%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <p>© 2024 Rädda Vår Flygplats. Alla rättigheter förbehållna.</p>
        </motion.div>
      </motion.footer>
    </motion.div>
  )
} 