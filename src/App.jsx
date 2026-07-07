import React, { useState, useEffect } from 'react';
import BuilderUI from './components/BuilderUI';
import CVPreview from './components/CVPreview';

// Initial pre-populated data (Bruno Baldeon's CV details)
const initialCVData = {
  personalInfo: {
    name: 'BRUNO BALDEON LAVALLE',
    title: 'BACHILLER EN INGENIERÍA INDUSTRIAL'
  },
  contactItems: [
    { id: '1', type: 'address', label: 'Carabayllo, Lima', url: '', iconName: 'MapPin' },
    { id: '2', type: 'phone', label: '921 900 483 / 998 384 815', url: '', iconName: 'Phone' },
    { id: '3', type: 'email', label: 'brunodb98@gmail.com', url: 'mailto:brunodb98@gmail.com', iconName: 'Mail' },
    { id: '4', type: 'linkedin', label: 'linkedin.com/in/brunobaldeon', url: 'https://www.linkedin.com/in/brunobaldeon/', iconName: 'Linkedin' },
    { id: '5', type: 'portfolio', label: 'Portafolio de Proyectos', url: 'https://mavenshowcase.com/profile/b8d10390-a0f1-7056-1608-da5609ff17ad', iconName: 'Globe' }
  ],
  sections: [
    {
      id: 'summary',
      type: 'text',
      title: 'Resumen Profesional',
      visible: true,
      content: 'Ingeniero Industrial con sólida experiencia en gestión logística, abastecimiento y negociación estratégica. Especializado en Business Intelligence (BI) y Análisis de Datos para la optimización de procesos y reducción de costos. Experto en el desarrollo de dashboards en Power BI y automatización con Python (Pandas) para transformar datos operativos en decisiones estratégicas de alto impacto. Enfocado en la mejora continua y rentabilidad.'
    },
    {
      id: 'experience',
      type: 'list',
      title: 'Experiencia Laboral',
      visible: true,
      items: [
        {
          role: 'Analista de Compras',
          company: 'NKC FOOD SERVICE SAC',
          date: 'Julio 2024 -- Octubre 2025',
          bullets: [
            'Impulsé estrategias de ahorro basadas en Data Analysis, modelando históricos de compra para optimizar volúmenes de pedido y renegociar tarifas, logrando una reducción de costos del 15% en el primer semestre de 2025.',
            'Garanticé la disponibilidad de inventario activo (cero quiebres de stock) alineado a los requerimientos del área de operaciones, asegurando la continuidad del flujo de trabajo.',
            'Participé en la implementación del sistema ERP corporativo, diseñando la estructura de datos maestros (artículos/proveedores) y ejecutando la migración masiva de datos para garantizar la integridad de la información logística.',
            'Realicé el control y cuadre de caja chica, garantizando la transparencia de los gastos menores y la correcta sustentación de las operaciones diarias.',
            'Planifiqué y coordiné entregas de mercadería, optimizando los tiempos de recepción y distribución interna.'
          ]
        },
        {
          role: 'Asistente Administrativo / Logístico',
          company: 'LOGICA INDUSTRIAL S.R.L.',
          date: 'Octubre 2020 -- Septiembre 2022',
          bullets: [
            'Gestioné procesos de facturación y elaboración de cotizaciones, mejorando la precisión administrativa y el flujo comercial.',
            'Coordiné eficazmente con proveedores para el abastecimiento oportuno de materiales.',
            'Redacté diversos documentos comerciales y administrativos para el soporte de la gerencia.'
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
          title: 'Dashboard de Analítica de Compras & Abastecimiento 2025',
          date: 'Portfolio Personal',
          technologies: 'Microsoft Power BI, Python (Pandas), SQLite, DAX Avanzado',
          bullets: [
            'Desarrollé un sistema integral de Business Intelligence para el control de compras en un concesionario de alimentos, integrando bases de datos SQLite y scripts de Python para la limpieza automática de datos.',
            'Implementé medidas DAX complejas para Inteligencia de Tiempo (Year-over-Year, Variaciones Mensuales) y análisis de inflación (Price Variance Analysis).',
            'Diseñé matrices de "Semáforo" para detectar variaciones de precios de proveedores en tiempo real, facilitando la re-negociación inmediata y evitando sobrecostos.'
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
          institution: 'Universidad Tecnológica del Perú (UTP)',
          degree: 'Bachiller en Ingeniería Industrial',
          date: '2020 -- 2025',
          status: 'Bachiller en trámite (Egresado en Diciembre 2025).'
        },
        {
          institution: 'IDAT',
          degree: 'Desarrollo de Sistemas de Información',
          date: '2022 -- 2023',
          status: 'Formación técnica en fundamentos de programación y base de datos (1 año cursado).'
        }
      ]
    },
    {
      id: 'skills',
      type: 'skills',
      title: 'Voluntariado y Habilidades',
      visible: true,
      skillsList: [
        { category: 'Análisis de Datos & BI', items: 'Microsoft Power BI (DAX, Modelado de Datos), Microsoft Excel (Avanzado)' },
        { category: 'Programación & BD', items: 'SQL Server (Básico), Python (Pandas, NumPy, Matplotlib)' },
        { category: 'Inteligencia Artificial', items: 'Prompt Engineering (Google Antigravity + Gemini, ChatGPT)' },
        { category: 'Logística & Gestión', items: 'Gestión de inventarios, Negociación con proveedores, Análisis de costos, ERP' }
      ],
      languages: [
        { language: 'Español', level: 'Nativo' },
        { language: 'Inglés', level: 'Intermedio (Lectura técnica y documentación)' }
      ],
      volunteering: [
        { role: 'Misionero Cristiano (Argentina)', description: 'Desarrollo de labores sociales, liderazgo y trabajo en equipo en entornos multiculturales (2017 -- 2019).' }
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
