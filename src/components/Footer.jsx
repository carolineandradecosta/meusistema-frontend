import React from 'react'
import { Container } from 'react-bootstrap'
import { FaAws, FaJava, FaJs, FaReact } from 'react-icons/fa'
import { SiSpringboot, SiVercel } from 'react-icons/si'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark text-light mt-4 border-top">
      <Container className="py-3 text-center small">
        <div className="fw-semibold">Meu Sistema &copy; {year}</div>

        <div className="mt-1" style={{ color: '#adb5bd' }}>
          Projeto web do curso Fullstack do Prof. Kelson na Programa AI.
        </div>

        <div className="mt-2" style={{ color: '#adb5bd' }}>
          Feito orgulhosamente com:
        </div>

        <div className="mt-2 d-flex justify-content-center align-items-center gap-3 flex-wrap">
          <FaJs title="JavaScript" className="text-warning" style={{ fontSize: '1.75rem' }} />
          <FaReact title="React" className="text-info" style={{ fontSize: '1.75rem' }} />
          <FaJava title="Java" style={{ color: '#f89820', fontSize: '1.75rem' }} />
          <SiSpringboot title="Spring Boot" style={{ color: '#6db33f', fontSize: '1.75rem' }} />
          <FaAws title="AWS" style={{ color: '#ff9900', fontSize: '1.75rem' }} />
          <SiVercel title="Vercel" style={{ fontSize: '1.75rem' }} />
        </div>
      </Container>
    </footer>
  )
}

export default Footer