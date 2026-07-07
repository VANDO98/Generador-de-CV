import React, { useState, useEffect } from 'react';
import BuilderUI from './components/BuilderUI';
import CVPreview from './components/CVPreview';

// Initial pre-populated data (Generic CV details for demo)
const initialCVData = {
  personalInfo: {
    name: 'JUAN PÉREZ GÓMEZ',
    title: 'INGENIERO DE SOFTWARE / ANALISTA DE DATOS'
  },
  contactItems: [
    { id: '1', type: 'address', label: 'Caracas, Venezuela', url: '', iconName: 'MapPin' },
    { id: '2', type: 'phone', label: '+58 212 555 1234', url: '', iconName: 'Phone' },
    { id: '3', type: 'email', label: 'juan.perez@email.com', url: 'mailto:juan.perez@email.com', iconName: 'Mail' },
    { id: '4', type: 'linkedin', label: 'linkedin.com/in/juanperez', url: 'https://www.linkedin.com/', iconName: 'Linkedin' },
    { id: '5', type: 'portfolio', label: 'Portafolio de Proyectos', url: 'https://github.com/', iconName: 'Globe' }
  ],
  sections: [
    {
      id: 'summary',
      type: 'text',
      title: 'Resumen Profesional',
      visible: true,
      content: 'Profesional de Ingeniería con sólida experiencia en análisis de datos, desarrollo de software y optimización de procesos operativos. Especializado en Business Intelligence (BI) y automatización utilizando Python y SQL. Apasionado por transformar datos complejos en tableros visuales interactivos y soluciones de software de alto impacto que ayuden a la toma de decisiones estratégicas en entornos de rápido crecimiento.'
    },
    {
      id: 'experience',
      type: 'list',
      title: 'Experiencia Laboral',
      visible: true,
      items: [
        {
          role: 'Analista de Datos Senior',
          company: 'TECH SOLUTIONS INC.',
          date: 'Enero 2024 -- Actualidad',
          bullets: [
            'Lideré el diseño e implementación de un modelo de BI en Power BI que optimizó los reportes de ventas, reduciendo el tiempo de preparación de informes semanales en un 40%.',
            'Desarrollé scripts en Python (Pandas/NumPy) para automatizar la limpieza y migración de datos de un sistema legacy a la base de datos centralizada.',
            'Colaboré con equipos multidisciplinarios para definir KPIs operativos y mejorar la eficiencia en la cadena de distribución en un 12%.'
          ]
        },
        {
          role: 'Asistente de Sistemas / Soporte TI',
          company: 'GLOBAL LOGISTICS CORP.',
          date: 'Marzo 2021 -- Diciembre 2023',
          bullets: [
            'Supervisé el mantenimiento de servidores de bases de datos locales y presté soporte técnico a más de 100 usuarios corporativos.',
            'Diseñé y documenté flujos de procesos administrativos, reduciendo incidencias de facturación recurrente en un 15%.',
            'Colaboré en la inducción técnica de nuevos empleados y la administración de accesos y permisos de red.'
          ]
        }
      ]
    },
    {
      id: 'projects',
      type: 'list',
      title: 'Proyectos Destacados (Business Intelligence)',
      visible: true,
      items: [
        {
          title: 'Dashboard de Control de Inventarios Automatizado',
          date: 'Proyecto de Portafolio',
          technologies: 'Power BI, Python (Pandas), SQL Server, DAX',
          bullets: [
            'Construí una solución integral para el análisis de rotación de inventarios, conectando múltiples fuentes de datos en tiempo real mediante consultas SQL.',
            'Programé alertas dinámicas por correo electrónico ante quiebres de stock utilizando flujos automatizados de bajo costo.'
          ]
        }
      ]
    },
    {
      id: 'education',
      type: 'education',
      title: 'Educación',
      visible: true,
      items: [
        {
          institution: 'Universidad Nacional de Ingeniería',
          degree: 'Licenciatura en Ingeniería de Sistemas',
          date: '2016 -- 2021',
          status: 'Graduado (Título en trámite).'
        },
        {
          institution: 'Instituto Tecnológico Superior',
          degree: 'Diplomado en Analítica de Negocios y Big Data',
          date: '2022',
          status: 'Certificado de Especialización obtenido.'
        }
      ]
    },
    {
      id: 'skills',
      type: 'skills',
      title: 'Voluntariado y Habilidades',
      visible: true,
      skillsList: [
        { category: 'Análisis de Datos & BI', items: 'Microsoft Power BI (DAX, Modelado de datos), Excel Avanzado' },
        { category: 'Programación & BD', items: 'SQL (PostgreSQL, SQL Server), Python (Pandas, NumPy, Matplotlib)' },
        { category: 'Idiomas', items: 'Español (Nativo), Inglés (Intermedio)' },
        { category: 'Competencias Clave', items: 'Trabajo en equipo, Automatización de procesos, Resolución de problemas' }
      ],
      languages: [
        { language: 'Español', level: 'Nativo' },
        { language: 'Inglés', level: 'Intermedio (Lectura y conversación técnica)' }
      ],
      volunteering: [
        { role: 'Tutor de Programación Voluntario', description: 'Impartí clases básicas de lógica de programación y Python a jóvenes de escasos recursos (2022 -- 2023).' }
      ]
    }
  ]
};

const initialSectionOrder = ['summary', 'experience', 'projects', 'education', 'skills'];

export default function App() {
  const [data, setData] = useState(initialCVData);
  const [sectionOrder, setSectionOrder] = useState(initialSectionOrder);
  const [profiles, setProfiles] = useState([]);
  const [activeProfile, setActiveProfile] = useState('');

  // Load profiles from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cv_builder_profiles_v2');
    if (saved) {
      try {
        setProfiles(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading profiles', e);
      }
    } else {
      // Fallback to v1 profiles if migration needed
      const savedV1 = localStorage.getItem('cv_builder_profiles');
      if (savedV1) {
        try {
          const v1 = JSON.parse(savedV1);
          // Convert v1 profiles to v2 (contact items)
          const migrated = v1.map(p => {
            const contactItems = [
              { id: '1', type: 'address', label: p.data.personalInfo.address || '', url: '', iconName: 'MapPin' },
              { id: '2', type: 'phone', label: p.data.personalInfo.phone || '', url: '', iconName: 'Phone' },
              { id: '3', type: 'email', label: p.data.personalInfo.email || '', url: p.data.personalInfo.email ? `mailto:${p.data.personalInfo.email}` : '', iconName: 'Mail' },
              { id: '4', type: 'linkedin', label: 'LinkedIn', url: p.data.personalInfo.linkedin || '', iconName: 'Linkedin' },
              { id: '5', type: 'portfolio', label: 'Portafolio de Proyectos', url: p.data.personalInfo.portfolio || '', iconName: 'Globe' }
            ];
            return {
              ...p,
              data: {
                personalInfo: {
                  name: p.data.personalInfo.name,
                  title: p.data.personalInfo.title
                },
                contactItems,
                sections: p.data.sections.map(s => {
                  // Ensure sections have type
                  let type = 'list';
                  if (s.id === 'summary') type = 'text';
                  if (s.id === 'education') type = 'education';
                  if (s.id === 'skills') type = 'skills';
                  return { ...s, type };
                })
              }
            };
          });
          setProfiles(migrated);
          localStorage.setItem('cv_builder_profiles_v2', JSON.stringify(migrated));
        } catch (e) {
          console.error('Error migrating profiles', e);
        }
      }
    }
  }, []);

  // Save profile to LocalStorage
  const handleSaveProfile = (name) => {
    const newProfile = {
      name,
      timestamp: Date.now(),
      data,
      sectionOrder
    };

    const updated = [...profiles.filter((p) => p.name !== name), newProfile];
    setProfiles(updated);
    localStorage.setItem('cv_builder_profiles_v2', JSON.stringify(updated));
    setActiveProfile(name);
    alert(`Versión "${name}" guardada correctamente.`);
  };

  // Load selected profile
  const handleLoadProfile = (name) => {
    const profile = profiles.find((p) => p.name === name);
    if (profile) {
      setData(profile.data);
      setSectionOrder(profile.sectionOrder || initialSectionOrder);
      setActiveProfile(name);
    }
  };

  // Delete profile
  const handleDeleteProfile = (name) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar la versión "${name}"?`)) {
      const updated = profiles.filter((p) => p.name !== name);
      setProfiles(updated);
      localStorage.setItem('cv_builder_profiles_v2', JSON.stringify(updated));
      if (activeProfile === name) {
        setActiveProfile('');
      }
    }
  };

  // Export JSON file
  const handleExportJSON = () => {
    const fileData = JSON.stringify({ data, sectionOrder }, null, 2);
    const blob = new Blob([fileData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cv_respaldo_${data.personalInfo.name.replace(/\s+/g, '_').toLowerCase()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON file
  const handleImportJSON = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.data && parsed.sectionOrder) {
          setData(parsed.data);
          setSectionOrder(parsed.sectionOrder);
          alert('Respaldo cargado correctamente.');
        } else {
          alert('El archivo JSON no tiene el formato correcto.');
        }
      } catch (error) {
        alert('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden w-full bg-gray-100">
      {/* Panel izquierdo (Builder UI) - no-print está dentro de BuilderUI */}
      <BuilderUI
        data={data}
        setData={setData}
        sectionOrder={sectionOrder}
        setSectionOrder={setSectionOrder}
        profiles={profiles}
        activeProfile={activeProfile}
        onSaveProfile={handleSaveProfile}
        onLoadProfile={handleLoadProfile}
        onDeleteProfile={handleDeleteProfile}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
      />

      {/* Panel derecho (Vista Previa) - IMPORTANTE: NO DEBE TENER no-print EN EL DIV CONTENEDOR PRINCIPAL */}
      <div className="flex-1 h-screen overflow-auto bg-gray-200">
        <div className="p-4 bg-gray-300 border-b border-gray-400 text-xs font-semibold text-gray-600 flex justify-between items-center no-print">
          <span>Vista Previa del CV (Imitación de Página A4)</span>
          <span className="text-gray-500 italic">Usa el botón verde "Imprimir / PDF" para descargar el PDF</span>
        </div>
        <CVPreview 
          data={data} 
          sectionOrder={sectionOrder} 
        />
      </div>
    </div>
  );
}
