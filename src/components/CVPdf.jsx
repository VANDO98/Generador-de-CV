import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Link } from '@react-pdf/renderer';

// ── Registro de fuentes locales (servidas desde /public/fonts/) ────────────
// Al estar en el mismo origen, no hay CORS y la librería las carga correctamente.
Font.register({
  family: 'EB Garamond',
  fonts: [
    {
      src: `${window.location.origin}${import.meta.env.BASE_URL}fonts/EBGaramond-Regular.ttf`,
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      src: `${window.location.origin}${import.meta.env.BASE_URL}fonts/EBGaramond-Bold.ttf`,
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    {
      src: `${window.location.origin}${import.meta.env.BASE_URL}fonts/EBGaramond-Italic.ttf`,
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
  ],
});

// ── Estilos ────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    paddingTop: '25mm',
    paddingBottom: '25mm',
    paddingLeft: '25mm',
    paddingRight: '25mm',
    fontFamily: 'EB Garamond',
    fontSize: 11,
    color: '#2b2b2b',
    lineHeight: 1.4,
  },

  // Header
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontFamily: 'EB Garamond',
    fontWeight: 'bold',
    color: '#1f2937',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 11.5,
    fontFamily: 'EB Garamond',
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },

  // Fila de contacto — sin iconos SVG (usan emojis/símbolos unicode)
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
    fontSize: 9.5,
    color: '#4b5563',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  contactIcon: {
    fontSize: 9,
    marginRight: 3,
    color: '#4b5563',
  },
  contactSep: {
    marginHorizontal: 6,
    color: '#9ca3af',
    fontSize: 9,
  },
  linkText: {
    color: '#111827',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  plainText: {
    color: '#374151',
  },

  // Secciones
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    marginBottom: 4,
    marginTop: 8,
    breakAfter: 'avoid',
  },
  sectionTitle: {
    fontFamily: 'EB Garamond',
    fontWeight: 'bold',
    fontSize: 13.5,
    color: '#323232',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sectionDivider: {
    borderBottomWidth: 0.75,
    borderBottomColor: '#323232',
    marginTop: 2,
  },

  // Texto libre
  paragraph: {
    textAlign: 'justify',
    marginTop: 5,
    fontFamily: 'EB Garamond',
    fontStyle: 'normal',
  },

  // Items de lista
  listItem: {
    marginBottom: 7,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  listTitle: {
    fontFamily: 'EB Garamond',
    fontWeight: 'bold',
    fontSize: 11,
    flex: 1,
  },
  listDate: {
    fontFamily: 'EB Garamond',
    fontStyle: 'italic',
    fontSize: 10,
    marginLeft: 8,
  },
  listSubtitle: {
    fontFamily: 'EB Garamond',
    fontWeight: 'bold',
    fontSize: 10,
    color: '#374151',
    marginTop: 1,
  },
  listTechRow: {
    fontFamily: 'EB Garamond',
    fontSize: 10,
    color: '#374151',
    marginTop: 1,
  },

  // Viñetas
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
    fontFamily: 'EB Garamond',
    fontSize: 11,
  },
  bulletText: {
    flex: 1,
    textAlign: 'justify',
    fontFamily: 'EB Garamond',
  },

  // Educación
  educationItem: {
    marginBottom: 7,
  },
  eduInstitution: {
    fontFamily: 'EB Garamond',
    fontWeight: 'bold',
    fontSize: 11,
    flex: 1,
  },
  eduDate: {
    fontFamily: 'EB Garamond',
    fontStyle: 'italic',
    fontSize: 10,
    marginLeft: 8,
  },
  eduDegree: {
    fontFamily: 'EB Garamond',
    fontSize: 10.5,
    marginTop: 1,
  },
  eduStatus: {
    fontFamily: 'EB Garamond',
    fontStyle: 'italic',
    fontSize: 9.5,
    color: '#4b5563',
    marginTop: 1,
  },

  // Skills
  skillsGroupTitle: {
    fontFamily: 'EB Garamond',
    fontWeight: 'bold',
    fontSize: 11,
    marginBottom: 2,
    marginTop: 3,
  },
  skillsFlexRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
  },
  skillItem: {
    flexDirection: 'row',
    marginRight: 14,
    marginBottom: 2,
  },
  skillCategory: {
    fontFamily: 'EB Garamond',
    fontWeight: 'bold',
    fontSize: 10,
  },
  skillValue: {
    fontFamily: 'EB Garamond',
    fontSize: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});

// ── Componente principal ─────────────────────────────────────────────────────
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

          {/* Fila de contacto — solo texto, sin iconos para máxima compatibilidad */}
          <View style={styles.contactRow}>
            {(contactItems || []).map((item, idx) => {
              if (!item.label) return null;
              return (
                <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {idx > 0 ? <Text style={styles.contactSep}>|</Text> : null}
                  {item.url ? (
                    <Link src={item.url} style={{ textDecoration: 'none' }}>
                      <Text style={styles.linkText}>{item.label}</Text>
                    </Link>
                  ) : (
                    <Text style={styles.plainText}>{item.label}</Text>
                  )}
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
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.sectionDivider} />
              </View>

              {/* Texto libre */}
              {section.type === 'text' ? (
                <Text style={styles.paragraph}>{section.content || ''}</Text>
              ) : null}

              {/* Lista (experiencia, proyectos) */}
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
                          <Text style={styles.bold}>Tecnologías: </Text>
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

              {/* Educación */}
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

              {/* Skills */}
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
                              <Text style={styles.bold}>{vol.role}: </Text>
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
