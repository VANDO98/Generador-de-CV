import React from 'react';
import * as Icons from 'lucide-react';

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

// Dynamic icon component
const ContactIcon = ({ name }) => {
  if (name === 'Linkedin') {
    return <LinkedinIcon className="w-3.5 h-3.5 inline mr-1 text-gray-700 align-text-bottom" />;
  }
  if (name === 'Github') {
    return <GithubIcon className="w-3.5 h-3.5 inline mr-1 text-gray-700 align-text-bottom" />;
  }
  const IconComponent = Icons[name];
  if (!IconComponent) return null;
  return <IconComponent className="w-3.5 h-3.5 inline mr-1 text-gray-700 align-text-bottom" />;
};

export default function CVPreview({ data, sectionOrder }) {
  const { personalInfo, sections, contactItems } = data;

  // Helper to get section by ID
  const getSection = (id) => sections.find((s) => s.id === id);

  return (
    <div className="page-container select-text">
      <div id="cv-print-area" className="a4-page text-sm select-text">
        
        {/* ENCABEZADO */}
        <div className="text-center mb-5">
          <h1 className="text-2xl font-bold tracking-wide uppercase text-gray-800 m-0">
            {personalInfo.name || 'TU NOMBRE COMPLETO'}
          </h1>
          {personalInfo.title && (
            <div className="text-md font-bold text-gray-700 mt-1 uppercase">
              {personalInfo.title}
            </div>
          )}
          
          {/* Dynamic Contact Items & Links with Icons */}
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5 text-xs text-gray-600 mt-3 font-sans">
            {contactItems && contactItems.map((item, idx) => {
              if (!item.label) return null;
              const hasUrl = !!item.url;
              return (
                <React.Fragment key={item.id}>
                  {idx > 0 && <span className="text-gray-400 select-none">|</span>}
                  <span className="inline-flex items-center">
                    <ContactIcon name={item.iconName} />
                    {hasUrl ? (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-black font-semibold">
                        {item.label}
                      </a>
                    ) : (
                      <span>{item.label}</span>
                    )}
                  </span>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* SECCIONES DINÁMICAS ORDENADAS */}
        {sectionOrder.map((sectionId) => {
          const section = getSection(sectionId);
          if (!section || !section.visible) return null;

          // Switch on section.type instead of section.id
          switch (section.type) {
            case 'text':
              return (
                <div key={section.id} className="mb-3">
                  <h2 className="latex-section-title">{section.title}</h2>
                  <p className="text-justify text-gray-800 mt-1.5 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              );

            case 'list':
              return (
                <div key={section.id} className="mb-3">
                  <h2 className="latex-section-title">{section.title}</h2>
                  <div className="space-y-3 mt-2">
                    {section.items && section.items.map((item, idx) => (
                      <div key={idx} className="text-gray-800 latex-item">
                        <div className="flex justify-between items-baseline font-bold">
                          <span>{item.role || item.title}</span>
                          <span className="text-sm font-medium text-gray-700">{item.date}</span>
                        </div>
                        {/* Show secondary header depending on item keys */}
                        {item.company && (
                          <div className="text-xs font-semibold text-gray-700">{item.company}</div>
                        )}
                        {item.technologies && (
                          <div className="text-xs text-gray-700">
                            <span className="font-bold">Tecnologías: </span>{item.technologies}
                          </div>
                        )}
                        {item.bullets && item.bullets.length > 0 && (
                          <ul className="latex-bullet-list text-justify">
                            {item.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="leading-snug">{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );

            case 'education':
              return (
                <div key={section.id} className="mb-3">
                  <h2 className="latex-section-title">{section.title}</h2>
                  <div className="space-y-2.5 mt-2">
                    {section.items && section.items.map((item, idx) => (
                      <div key={idx} className="text-gray-800 latex-item">
                        <div className="flex justify-between items-baseline">
                          <span className="font-bold">{item.institution}</span>
                          <span className="text-sm font-medium text-gray-700">{item.date}</span>
                        </div>
                        <div className="text-xs">{item.degree}</div>
                        {item.status && <div className="text-sm text-gray-700">Estado: {item.status}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              );

            case 'skills':
              return (
                <div key={section.id} className="mb-3">
                  <h2 className="latex-section-title">{section.title}</h2>
                  <div className="mt-2 space-y-2">
                    {section.skillsList && section.skillsList.length > 0 && (
                      <div>
                        <span className="font-bold">Habilidades Técnicas: </span>
                        <ul className="latex-bullet-list">
                          {section.skillsList.map((skill, idx) => (
                            <li key={idx} className="inline-block mr-4">
                              <span className="font-semibold">{skill.category}:</span> {skill.items}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {section.languages && section.languages.length > 0 && (
                      <div className="mt-1">
                        <span className="font-bold">Idiomas: </span>
                        <ul className="latex-bullet-list">
                          {section.languages.map((lang, idx) => (
                            <li key={idx} className="inline-block mr-4">
                              <span className="font-semibold">{lang.language}:</span> {lang.level}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {section.volunteering && section.volunteering.length > 0 && (
                      <div className="mt-1">
                        <span className="font-bold">Voluntariado: </span>
                        <ul className="latex-bullet-list">
                          {section.volunteering.map((vol, idx) => (
                            <li key={idx} className="leading-snug">
                              <span className="font-semibold">{vol.role}:</span> {vol.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
