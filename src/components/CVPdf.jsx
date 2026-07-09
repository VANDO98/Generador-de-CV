import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link, Svg, Path, Rect, Circle } from '@react-pdf/renderer';

// ── Estilos del documento PDF ──────────────────────────────────────────────
// Usamos fuentes estándar de PDF (Helvetica / Times-Roman) para evitar
// cualquier problema de CORS al cargar fuentes externas desde el navegador.
const styles = StyleSheet.create({
  page: {
    paddingTop: '25mm',
    paddingBottom: '25mm',
    paddingLeft: '25mm',
    paddingRight: '25mm',
    fontFamily: 'Times-Roman',
    fontSize: 11,
    color: '#2b2b2b',
    lineHeight: 1.4,
  },

  // ── Header ────────────────────────────────────────────────────────────
  header: {
    marginBottom: 16,
    textAlign: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: '#1f2937',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#4b5563',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  contactSeparator: {
    color: '#9ca3af',
    marginHorizontal: 4,
  },
  linkStyle: {
    color: '#111827',
    fontFamily: 'Helvetica-Bold',
    textDecoration: 'none',
  },

  // ── Secciones ────────────────────────────────────────────────────────
  section: {
    marginBottom: 10,
  },
  sectionHeader: {
    marginBottom: 5,
    marginTop: 6,
    breakAfter: 'avoid',
  },
  sectionTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 13,
    color: '#323232',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sectionDivider: {
    borderBottomWidth: 0.75,
    borderBottomColor: '#323232',
    marginTop: 2,
  },

  // ── Texto libre ───────────────────────────────────────────────────────
  paragraph: {
    textAlign: 'justify',
    marginTop: 4,
    fontFamily: 'Times-Roman',
  },

  // ── Items de lista (Experiencia / Proyectos) ──────────────────────────
  listItem: {
    marginBottom: 8,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  listTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 11,
    flex: 1,
  },
  listDate: {
    fontFamily: 'Times-Italic',
    fontSize: 9,
    marginLeft: 8,
  },
  listSubtitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: '#374151',
    marginTop: 1,
  },
  listTechRow: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#374151',
    marginTop: 1,
  },
  techBold: {
    fontFamily: 'Helvetica-Bold',
  },

  // ── Viñetas ───────────────────────────────────────────────────────────
  bulletList: {
    marginTop: 3,
    marginLeft: 10,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletDot: {
    width: 10,
    fontFamily: 'Times-Roman',
    fontSize: 11,
  },
  bulletText: {
    flex: 1,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },

  // ── Educación ─────────────────────────────────────────────────────────
  educationItem: {
    marginBottom: 7,
  },
  eduInstitution: {
    fontFamily: 'Times-Bold',
    fontSize: 11,
    flex: 1,
  },
  eduDate: {
    fontFamily: 'Times-Italic',
    fontSize: 9,
    marginLeft: 8,
  },
  eduDegree: {
    fontFamily: 'Times-Roman',
    fontSize: 10,
    marginTop: 1,
  },
  eduStatus: {
    fontFamily: 'Times-Italic',
    fontSize: 9,
    color: '#4b5563',
    marginTop: 1,
  },

  // ── Skills ────────────────────────────────────────────────────────────
  skillsGroupTitle: {
    fontFamily: 'Times-Bold',
    fontSize: 11,
    marginBottom: 3,
    marginTop: 4,
  },
  skillsFlexRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
  },
  skillItem: {
    flexDirection: 'row',
    marginRight: 16,
    marginBottom: 2,
  },
  skillCategory: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
  },
  skillValue: {
    fontFamily: 'Helvetica',
    fontSize: 9,
  },
});

// ── Iconos SVG (para el PDF, deben usar colores fijos, no currentColor) ───
const MapPinIcon = () => (
  <Svg viewBox="0 0 24 24" width={10} height={10} stroke="#6b7280" strokeWidth="2" fill="none">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <Circle cx="12" cy="10" r="3" />
  </Svg>
);
const PhoneIcon = () => (
  <Svg viewBox="0 0 24 24" width={10} height={10} stroke="#6b7280" strokeWidth="2" fill="none">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Svg>
);
const MailIcon = () => (
  <Svg viewBox="0 0 24 24" width={10} height={10} stroke="#6b7280" strokeWidth="2" fill="none">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <Path d="M22 6l-10 7L2 6" />
  </Svg>
);
const LinkedinIcon = () => (
  <Svg viewBox="0 0 24 24" width={10} height={10} stroke="#6b7280" strokeWidth="2" fill="none">
    <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <Rect x="2" y="9" width="4" height="12" />
    <Circle cx="4" cy="4" r="2" />
  </Svg>
);
const GithubIcon = () => (
  <Svg viewBox="0 0 24 24" width={10} height={10} stroke="#6b7280" strokeWidth="2" fill="none">
    <Path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </Svg>
);
const GlobeIcon = () => (
  <Svg viewBox="0 0 24 24" width={10} height={10} stroke="#6b7280" strokeWidth="2" fill="none">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M2 12h20" />
    <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Svg>
);
const GenericLinkIcon = () => (
  <Svg viewBox="0 0 24 24" width={10} height={10} stroke="#6b7280" strokeWidth="2" fill="none">
    <Path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <Path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </Svg>
);

const renderIcon = (name) => {
  switch (name) {
    case 'MapPin': return <MapPinIcon />;
    case 'Phone': return <PhoneIcon />;
    case 'Mail': return <MailIcon />;
    case 'Linkedin': return <LinkedinIcon />;
    case 'Github': return <GithubIcon />;
    case 'Globe': return <GlobeIcon />;
    default: return <GenericLinkIcon />;
  }
};

// ── Componente principal del documento PDF ─────────────────────────────────
export const CVPdf = ({ data, sectionOrder }) => {
  const { personalInfo, sections, contactItems } = data;
  const getSection = (id) => sections.find((s) => s.id === id);

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* ── Encabezado ── */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name || 'TU NOMBRE COMPLETO'}</Text>
          {personalInfo.title ? (
            <Text style={styles.jobTitle}>{personalInfo.title}</Text>
          ) : null}

          {/* Contacto */}
          <View style={styles.contactRow}>
            {(contactItems || []).map((item, idx) => {
              if (!item.label) return null;
              return (
                <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {idx > 0 ? <Text style={styles.contactSeparator}>|</Text> : null}
                  <View style={styles.contactItem}>
                    <View style={{ marginRight: 3 }}>{renderIcon(item.iconName)}</View>
                    {item.url ? (
                      <Link src={item.url} style={styles.linkStyle}>
                        <Text>{item.label}</Text>
                      </Link>
                    ) : (
                      <Text>{item.label}</Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* ── Secciones dinámicas ── */}
        {sectionOrder.map((sectionId) => {
          const section = getSection(sectionId);
          if (!section || !section.visible) return null;

          return (
            <View key={section.id} style={styles.section}>
              {/* Título de la sección */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.sectionDivider} />
              </View>

              {/* ── Texto libre ── */}
              {section.type === 'text' ? (
                <Text style={styles.paragraph}>{section.content || ''}</Text>
              ) : null}

              {/* ── Lista (experiencia, proyectos) ── */}
              {section.type === 'list' ? (
                <View style={{ marginTop: 4 }}>
                  {(section.items || []).map((item, idx) => (
                    <View key={idx} style={styles.listItem}>
                      <View style={styles.listHeaderRow}>
                        <Text style={styles.listTitle}>{item.role || item.title || ''}</Text>
                        <Text style={styles.listDate}>{item.date || ''}</Text>
                      </View>
                      {item.company ? (
                        <Text style={styles.listSubtitle}>{item.company}</Text>
                      ) : null}
                      {item.technologies ? (
                        <Text style={styles.listTechRow}>
                          <Text style={styles.techBold}>Tecnologías: </Text>
                          {item.technologies}
                        </Text>
                      ) : null}
                      {item.bullets && item.bullets.length > 0 ? (
                        <View style={styles.bulletList}>
                          {item.bullets.map((bullet, bIdx) => (
                            <View key={bIdx} style={styles.bulletRow}>
                              <Text style={styles.bulletDot}>•</Text>
                              <Text style={styles.bulletText}>{bullet}</Text>
                            </View>
                          ))}
                        </View>
                      ) : null}
                    </View>
                  ))}
                </View>
              ) : null}

              {/* ── Educación ── */}
              {section.type === 'education' ? (
                <View style={{ marginTop: 4 }}>
                  {(section.items || []).map((item, idx) => (
                    <View key={idx} style={styles.educationItem}>
                      <View style={styles.listHeaderRow}>
                        <Text style={styles.eduInstitution}>{item.institution || ''}</Text>
                        <Text style={styles.eduDate}>{item.date || ''}</Text>
                      </View>
                      <Text style={styles.eduDegree}>{item.degree || ''}</Text>
                      {item.status ? (
                        <Text style={styles.eduStatus}>Estado: {item.status}</Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              ) : null}

              {/* ── Habilidades / Skills ── */}
              {section.type === 'skills' ? (
                <View style={{ marginTop: 4 }}>
                  {section.skillsList && section.skillsList.length > 0 ? (
                    <View style={{ marginBottom: 4 }}>
                      <Text style={styles.skillsGroupTitle}>Habilidades Técnicas:</Text>
                      <View style={styles.skillsFlexRow}>
                        {section.skillsList.map((skill, idx) => (
                          <View key={idx} style={styles.skillItem}>
                            <Text style={styles.skillCategory}>• {skill.category}: </Text>
                            <Text style={styles.skillValue}>{skill.items}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : null}

                  {section.languages && section.languages.length > 0 ? (
                    <View style={{ marginBottom: 4 }}>
                      <Text style={styles.skillsGroupTitle}>Idiomas:</Text>
                      <View style={styles.skillsFlexRow}>
                        {section.languages.map((lang, idx) => (
                          <View key={idx} style={styles.skillItem}>
                            <Text style={styles.skillCategory}>• {lang.language}: </Text>
                            <Text style={styles.skillValue}>{lang.level}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : null}

                  {section.volunteering && section.volunteering.length > 0 ? (
                    <View>
                      <Text style={styles.skillsGroupTitle}>Voluntariado:</Text>
                      <View style={styles.bulletList}>
                        {section.volunteering.map((vol, idx) => (
                          <View key={idx} style={styles.bulletRow}>
                            <Text style={styles.bulletDot}>•</Text>
                            <Text style={styles.bulletText}>
                              <Text style={{ fontFamily: 'Times-Bold' }}>{vol.role}: </Text>
                              {vol.description}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          );
        })}
      </Page>
    </Document>
  );
};
