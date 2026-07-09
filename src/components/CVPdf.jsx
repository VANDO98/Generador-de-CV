import React from 'react';
import {
  Page, Text, View, Document, StyleSheet, Font, Link, Svg, Path, Rect, Circle
} from '@react-pdf/renderer';

// ── Fuentes locales (sin CORS, servidas desde el mismo origen) ─────────────
Font.register({
  family: 'Garamond',
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
const S = StyleSheet.create({
  page: {
    paddingTop: '25mm',
    paddingBottom: '25mm',
    paddingLeft: '25mm',
    paddingRight: '25mm',
    fontFamily: 'Garamond',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 11,
    color: '#2b2b2b',
    lineHeight: 1.4,
  },

  // Header
  header: { marginBottom: 16, alignItems: 'center' },
  name: {
    fontFamily: 'Garamond', fontWeight: 'bold', fontStyle: 'normal',
    fontSize: 22, color: '#1f2937', textTransform: 'uppercase', letterSpacing: 2, textAlign: 'center',
  },
  jobTitle: {
    fontFamily: 'Garamond', fontWeight: 'bold', fontStyle: 'normal',
    fontSize: 11.5, color: '#374151', marginTop: 12,
    textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center',
  },

  // Contacto
  contactRow: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    flexWrap: 'wrap', marginTop: 10, fontSize: 9.5, color: '#4b5563',
  },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 1 },
  contactSep: { marginHorizontal: 6, color: '#9ca3af', fontSize: 9.5 },
  contactLabel: {
    fontFamily: 'Garamond', fontStyle: 'normal', fontWeight: 'normal',
    color: '#374151', fontSize: 9.5,
  },
  contactLabelBold: {
    fontFamily: 'Garamond', fontStyle: 'normal', fontWeight: 'bold',
    color: '#111827', fontSize: 9.5, textDecoration: 'none',
  },

  // Sección
  section: { marginBottom: 8 },
  sectionHeader: { marginBottom: 4, marginTop: 8 },
  sectionTitle: {
    fontFamily: 'Garamond', fontWeight: 'bold', fontStyle: 'normal',
    fontSize: 13.5, color: '#323232', textTransform: 'uppercase', letterSpacing: 0.8,
  },
  divider: { borderBottomWidth: 0.75, borderBottomColor: '#323232', marginTop: 2 },

  // Párrafo
  para: {
    fontFamily: 'Garamond', fontStyle: 'normal', fontWeight: 'normal',
    textAlign: 'justify', marginTop: 5, fontSize: 11,
  },

  // Lista
  listItem: { marginBottom: 7 },
  listRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  listTitle: {
    fontFamily: 'Garamond', fontWeight: 'bold', fontStyle: 'normal',
    fontSize: 11, flex: 1,
  },
  listDate: {
    fontFamily: 'Garamond', fontStyle: 'italic', fontWeight: 'normal',
    fontSize: 10, marginLeft: 8,
  },
  listCompany: {
    fontFamily: 'Garamond', fontWeight: 'bold', fontStyle: 'normal',
    fontSize: 10, color: '#374151', marginTop: 1,
  },
  listTech: {
    fontFamily: 'Garamond', fontStyle: 'normal', fontWeight: 'normal',
    fontSize: 10, color: '#374151', marginTop: 1,
  },

  // Viñetas
  bullets: { marginTop: 3, marginLeft: 10 },
  bulletRow: { flexDirection: 'row', marginBottom: 2 },
  bulletDot: {
    fontFamily: 'Garamond', fontStyle: 'normal', fontWeight: 'normal',
    width: 10, fontSize: 11,
  },
  bulletText: {
    fontFamily: 'Garamond', fontStyle: 'normal', fontWeight: 'normal',
    flex: 1, textAlign: 'justify', fontSize: 11,
  },

  // Educación
  eduItem: { marginBottom: 7 },
  eduInst: {
    fontFamily: 'Garamond', fontWeight: 'bold', fontStyle: 'normal',
    fontSize: 11, flex: 1,
  },
  eduDate: {
    fontFamily: 'Garamond', fontStyle: 'italic', fontWeight: 'normal',
    fontSize: 10, marginLeft: 8,
  },
  eduDegree: {
    fontFamily: 'Garamond', fontStyle: 'normal', fontWeight: 'normal',
    fontSize: 10.5, marginTop: 1,
  },
  eduStatus: {
    fontFamily: 'Garamond', fontStyle: 'italic', fontWeight: 'normal',
    fontSize: 9.5, color: '#4b5563', marginTop: 1,
  },

  // Skills
  skillsTitle: {
    fontFamily: 'Garamond', fontWeight: 'bold', fontStyle: 'normal',
    fontSize: 11, marginBottom: 2, marginTop: 3,
  },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', marginLeft: 10 },
  skillItem: { flexDirection: 'row', marginRight: 14, marginBottom: 2 },
  skillCat: {
    fontFamily: 'Garamond', fontWeight: 'bold', fontStyle: 'normal', fontSize: 10,
  },
  skillVal: {
    fontFamily: 'Garamond', fontStyle: 'normal', fontWeight: 'normal', fontSize: 10,
  },
  bold: {
    fontFamily: 'Garamond', fontWeight: 'bold', fontStyle: 'normal',
  },
});

// ── Iconos SVG (paths extraídos de lucide-react, colores fijos sin currentColor) ──
const IC = '#6b7280'; // color gris fijo para todos los iconos

const IconMapPin = () => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="10" r="3" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const IconPhone = () => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 15a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2.82 4h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const IconMail = () => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const IconLinkedin = () => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Rect x="2" y="9" width="4" height="12" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="4" cy="4" r="2" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const IconGithub = () => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M9 18c-4.51 2-5-2-7-2" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const IconGlobe = () => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M2 12h20" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const IconLink = () => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const IconFileText = () => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M14 2v4a2 2 0 0 0 2 2h4" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M10 9H8" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 13H8" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 17H8" fill="none" stroke={IC} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const renderIcon = (name) => {
  const map = {
    MapPin: <IconMapPin />, Phone: <IconPhone />, Mail: <IconMail />,
    Linkedin: <IconLinkedin />, Github: <IconGithub />, Globe: <IconGlobe />,
    Link: <IconLink />, FileText: <IconFileText />,
  };
  return map[name] || <IconLink />;
};

// ── Documento PDF ──────────────────────────────────────────────────────────
export const CVPdf = ({ data, sectionOrder }) => {
  const { personalInfo, sections, contactItems } = data;
  const getSection = (id) => sections.find((s) => s.id === id);

  return (
    <Document>
      <Page size="A4" style={S.page}>

        {/* Encabezado */}
        <View style={S.header}>
          <Text style={S.name}>{personalInfo.name || 'TU NOMBRE'}</Text>
          {personalInfo.title ? <Text style={S.jobTitle}>{personalInfo.title}</Text> : null}

          <View style={S.contactRow}>
            {(contactItems || []).map((item, idx) => {
              if (!item.label) return null;
              return (
                <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {idx > 0 ? <Text style={S.contactSep}>|</Text> : null}
                  <View style={S.contactItem}>
                    <View style={{ marginRight: 3, marginTop: 1 }}>{renderIcon(item.iconName)}</View>
                    {item.url ? (
                      <Link src={item.url} style={{ textDecoration: 'none' }}>
                        <Text style={S.contactLabelBold}>{item.label}</Text>
                      </Link>
                    ) : (
                      <Text style={S.contactLabel}>{item.label}</Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Secciones */}
        {sectionOrder.map((sectionId) => {
          const section = getSection(sectionId);
          if (!section || !section.visible) return null;
          return (
            <View key={section.id} style={S.section}>
              <View style={S.sectionHeader}>
                <Text style={S.sectionTitle}>{section.title}</Text>
                <View style={S.divider} />
              </View>

              {/* Texto libre */}
              {section.type === 'text' ? (
                <Text style={S.para}>{section.content || ''}</Text>
              ) : null}

              {/* Lista */}
              {section.type === 'list' ? (
                <View style={{ marginTop: 4 }}>
                  {(section.items || []).map((item, idx) => (
                    <View key={idx} style={S.listItem}>
                      <View style={S.listRow}>
                        <Text style={S.listTitle}>{item.role || item.title || ''}</Text>
                        <Text style={S.listDate}>{item.date || ''}</Text>
                      </View>
                      {item.company ? <Text style={S.listCompany}>{item.company}</Text> : null}
                      {item.technologies ? (
                        <Text style={S.listTech}>
                          <Text style={S.bold}>Tecnologías: </Text>{item.technologies}
                        </Text>
                      ) : null}
                      {item.bullets && item.bullets.length > 0 ? (
                        <View style={S.bullets}>
                          {item.bullets.map((b, bi) => (
                            <View key={bi} style={S.bulletRow}>
                              <Text style={S.bulletDot}>•</Text>
                              <Text style={S.bulletText}>{b}</Text>
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
                    <View key={idx} style={S.eduItem}>
                      <View style={S.listRow}>
                        <Text style={S.eduInst}>{item.institution || ''}</Text>
                        <Text style={S.eduDate}>{item.date || ''}</Text>
                      </View>
                      <Text style={S.eduDegree}>{item.degree || ''}</Text>
                      {item.status ? <Text style={S.eduStatus}>Estado: {item.status}</Text> : null}
                    </View>
                  ))}
                </View>
              ) : null}

              {/* Skills */}
              {section.type === 'skills' ? (
                <View style={{ marginTop: 4 }}>
                  {section.skillsList && section.skillsList.length > 0 ? (
                    <View style={{ marginBottom: 4 }}>
                      <Text style={S.skillsTitle}>Habilidades Técnicas:</Text>
                      <View style={S.skillsRow}>
                        {section.skillsList.map((sk, i) => (
                          <View key={i} style={S.skillItem}>
                            <Text style={S.skillCat}>• {sk.category}: </Text>
                            <Text style={S.skillVal}>{sk.items}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : null}
                  {section.languages && section.languages.length > 0 ? (
                    <View style={{ marginBottom: 4 }}>
                      <Text style={S.skillsTitle}>Idiomas:</Text>
                      <View style={S.skillsRow}>
                        {section.languages.map((l, i) => (
                          <View key={i} style={S.skillItem}>
                            <Text style={S.skillCat}>• {l.language}: </Text>
                            <Text style={S.skillVal}>{l.level}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : null}
                  {section.volunteering && section.volunteering.length > 0 ? (
                    <View>
                      <Text style={S.skillsTitle}>Voluntariado:</Text>
                      <View style={S.bullets}>
                        {section.volunteering.map((v, i) => (
                          <View key={i} style={S.bulletRow}>
                            <Text style={S.bulletDot}>•</Text>
                            <Text style={S.bulletText}>
                              <Text style={S.bold}>{v.role}: </Text>{v.description}
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
