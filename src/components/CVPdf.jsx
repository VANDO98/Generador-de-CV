import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Link, Svg, Path, Rect, Circle } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'EB Garamond',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/ebgaramond/v26/SlGUmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-6_RkI60.ttf' }, // Regular
    { src: 'https://fonts.gstatic.com/s/ebgaramond/v26/SlGUmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-M_RkI60.ttf', fontWeight: 500 }, // Medium
    { src: 'https://fonts.gstatic.com/s/ebgaramond/v26/SlGUmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-c_VkI60.ttf', fontWeight: 600 }, // SemiBold
    { src: 'https://fonts.gstatic.com/s/ebgaramond/v26/SlGUmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-0_VkI60.ttf', fontWeight: 700 }, // Bold
    { src: 'https://fonts.gstatic.com/s/ebgaramond/v26/SlGWmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-6_RkI60.ttf', fontStyle: 'italic' } // Italic
  ]
});

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf' }, // Regular
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuG1fMZhrib2Bg-4.ttf', fontWeight: 600 }, // SemiBold
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf', fontWeight: 700 } // Bold
  ]
});

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
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#1f2937',
  },
  title: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 12,
    fontFamily: 'Inter',
    fontSize: 9,
    color: '#4b5563',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    marginRight: 4,
  },
  contactSeparator: {
    marginHorizontal: 8,
    color: '#9ca3af',
  },
  link: {
    color: '#000000',
    textDecoration: 'none',
  },
  section: {
    marginBottom: 12,
  },
  sectionTitleContainer: {
    marginBottom: 6,
    marginTop: 8,
  },
  sectionTitle: {
    fontFamily: 'EB Garamond',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#323232',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#323232',
    marginTop: 2,
  },
  textContent: {
    textAlign: 'justify',
    marginTop: 6,
  },
  listItem: {
    marginBottom: 10,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  listDate: {
    fontStyle: 'italic',
    fontSize: 9,
  },
  listCompany: {
    fontSize: 9,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    color: '#374151',
  },
  listTech: {
    fontSize: 9,
    color: '#374151',
  },
  bulletList: {
    marginTop: 4,
    marginLeft: 10,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletPoint: {
    width: 10,
    fontSize: 11,
  },
  bulletText: {
    flex: 1,
    textAlign: 'justify',
  },
  educationItem: {
    marginBottom: 8,
  },
  educationInstitution: {
    fontWeight: 'bold',
  },
  educationDate: {
    fontStyle: 'italic',
    fontSize: 9,
  },
  educationDegree: {
    fontSize: 9,
  },
  educationStatus: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#4b5563',
  },
  skillsGroup: {
    marginTop: 6,
  },
  skillsGroupTitle: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  skillBulletItem: {
    flexDirection: 'row',
    marginBottom: 2,
    marginLeft: 10,
  },
  bold: {
    fontWeight: 'bold',
  }
});

// Helper for SVGs
const MapPinIcon = () => (
  <Svg viewBox="0 0 24 24" width="12" height="12" stroke="#4b5563" strokeWidth="2" fill="none">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <Circle cx="12" cy="10" r="3" />
  </Svg>
);
const PhoneIcon = () => (
  <Svg viewBox="0 0 24 24" width="12" height="12" stroke="#4b5563" strokeWidth="2" fill="none">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Svg>
);
const MailIcon = () => (
  <Svg viewBox="0 0 24 24" width="12" height="12" stroke="#4b5563" strokeWidth="2" fill="none">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <Path d="M22 6l-10 7L2 6" />
  </Svg>
);
const LinkedinIcon = () => (
  <Svg viewBox="0 0 24 24" width="12" height="12" stroke="#4b5563" strokeWidth="2" fill="none">
    <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <Rect x="2" y="9" width="4" height="12" />
    <Circle cx="4" cy="4" r="2" />
  </Svg>
);
const GithubIcon = () => (
  <Svg viewBox="0 0 24 24" width="12" height="12" stroke="#4b5563" strokeWidth="2" fill="none">
    <Path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </Svg>
);
const GlobeIcon = () => (
  <Svg viewBox="0 0 24 24" width="12" height="12" stroke="#4b5563" strokeWidth="2" fill="none">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M2 12h20" />
    <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Svg>
);
const LinkIcon = () => (
  <Svg viewBox="0 0 24 24" width="12" height="12" stroke="#4b5563" strokeWidth="2" fill="none">
    <Path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <Path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </Svg>
);
const FileTextIcon = () => (
  <Svg viewBox="0 0 24 24" width="12" height="12" stroke="#4b5563" strokeWidth="2" fill="none">
    <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <Path d="M14 2v6h6" />
    <Path d="M16 13H8" />
    <Path d="M16 17H8" />
    <Path d="M10 9H8" />
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
    case 'Link': return <LinkIcon />;
    case 'FileText': return <FileTextIcon />;
    default: return <LinkIcon />;
  }
};

export const CVPdf = ({ data, sectionOrder }) => {
  const { personalInfo, sections, contactItems } = data;
  const getSection = (id) => sections.find((s) => s.id === id);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name || 'TU NOMBRE COMPLETO'}</Text>
          {personalInfo.title ? <Text style={styles.title}>{personalInfo.title}</Text> : null}
          
          <View style={styles.contactContainer}>
            {contactItems && contactItems.map((item, idx) => {
              if (!item.label) return null;
              const hasUrl = !!item.url;
              return (
                <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {idx > 0 && <Text style={styles.contactSeparator}>|</Text>}
                  <View style={styles.contactItem}>
                    <View style={styles.contactIcon}>{renderIcon(item.iconName)}</View>
                    {hasUrl ? (
                      <Link src={item.url} style={styles.link}>
                        <Text style={styles.bold}>{item.label}</Text>
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

        {/* Sections */}
        {sectionOrder.map((sectionId) => {
          const section = getSection(sectionId);
          if (!section || !section.visible) return null;

          return (
            <View key={section.id} style={styles.section} wrap={false}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.sectionDivider} />
              </View>

              {section.type === 'text' && (
                <Text style={styles.textContent}>{section.content}</Text>
              )}

              {section.type === 'list' && (
                <View style={{ marginTop: 6 }}>
                  {section.items && section.items.map((item, idx) => (
                    <View key={idx} style={styles.listItem} wrap={false}>
                      <View style={styles.listHeader}>
                        <Text style={styles.listTitle}>{item.role || item.title}</Text>
                        <Text style={styles.listDate}>{item.date}</Text>
                      </View>
                      {item.company ? <Text style={styles.listCompany}>{item.company}</Text> : null}
                      {item.technologies ? (
                        <Text style={styles.listTech}>
                          <Text style={styles.bold}>Tecnologías: </Text>{item.technologies}
                        </Text>
                      ) : null}
                      {item.bullets && item.bullets.length > 0 ? (
                        <View style={styles.bulletList}>
                          {item.bullets.map((bullet, bIdx) => (
                            <View key={bIdx} style={styles.bulletItem}>
                              <Text style={styles.bulletPoint}>•</Text>
                              <Text style={styles.bulletText}>{bullet}</Text>
                            </View>
                          ))}
                        </View>
                      ) : null}
                    </View>
                  ))}
                </View>
              )}

              {section.type === 'education' && (
                <View style={{ marginTop: 6 }}>
                  {section.items && section.items.map((item, idx) => (
                    <View key={idx} style={styles.educationItem} wrap={false}>
                      <View style={styles.listHeader}>
                        <Text style={styles.educationInstitution}>{item.institution}</Text>
                        <Text style={styles.educationDate}>{item.date}</Text>
                      </View>
                      <Text style={styles.educationDegree}>{item.degree}</Text>
                      {item.status ? <Text style={styles.educationStatus}>Estado: {item.status}</Text> : null}
                    </View>
                  ))}
                </View>
              )}

              {section.type === 'skills' && (
                <View style={styles.skillsGroup}>
                  {section.skillsList && section.skillsList.length > 0 ? (
                    <View style={{ marginBottom: 4 }}>
                      <Text style={styles.skillsGroupTitle}>Habilidades Técnicas:</Text>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 10 }}>
                        {section.skillsList.map((skill, idx) => (
                          <View key={idx} style={{ flexDirection: 'row', marginRight: 15, marginBottom: 2 }}>
                            <Text style={styles.bold}>• {skill.category}: </Text>
                            <Text>{skill.items}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : null}
                  
                  {section.languages && section.languages.length > 0 ? (
                    <View style={{ marginBottom: 4 }}>
                      <Text style={styles.skillsGroupTitle}>Idiomas:</Text>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 10 }}>
                        {section.languages.map((lang, idx) => (
                          <View key={idx} style={{ flexDirection: 'row', marginRight: 15, marginBottom: 2 }}>
                            <Text style={styles.bold}>• {lang.language}: </Text>
                            <Text>{lang.level}</Text>
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
                          <View key={idx} style={styles.bulletItem}>
                            <Text style={styles.bulletPoint}>•</Text>
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
              )}
            </View>
          );
        })}
      </Page>
    </Document>
  );
};
