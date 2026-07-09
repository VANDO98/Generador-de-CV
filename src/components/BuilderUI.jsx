import React, { useState } from 'react';
import { 
  Eye, EyeOff, ArrowUp, ArrowDown, Plus, Trash2, 
  Save, Download, Upload, Printer, FolderOpen, PlusCircle,
  Globe, Mail, Phone, MapPin, Link, FileText, Edit2
} from 'lucide-react';
import { PDFDownloadLink, usePDF } from '@react-pdf/renderer';
import { CVPdf } from './CVPdf';

const ICON_OPTIONS = [
  { name: 'MapPin', label: 'Ubicación / Mapa' },
  { name: 'Phone', label: 'Teléfono' },
  { name: 'Mail', label: 'Correo' },
  { name: 'Linkedin', label: 'LinkedIn' },
  { name: 'Github', label: 'GitHub' },
  { name: 'Globe', label: 'Web / Portafolio' },
  { name: 'Link', label: 'Enlace Genérico' },
  { name: 'FileText', label: 'Documento' }
];

export default function BuilderUI({
  data,
  setData,
  sectionOrder,
  setSectionOrder,
  profiles,
  activeProfile,
  onSaveProfile,
  onLoadProfile,
  onDeleteProfile,
  onExportJSON,
  onImportJSON
}) {
  const [newProfileName, setNewProfileName] = useState('');
  const [activeTab, setActiveTab] = useState('data'); // 'data' | 'structure' | 'versions'
  const [pdfError, setPdfError] = useState(null);

  // Genera el PDF y lo descarga directamente
  const handleDownloadPdf = async () => {
    setPdfError(null);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const doc = <CVPdf data={data} sectionOrder={sectionOrder} />;
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const fileName = `CV_${data.personalInfo.name ? data.personalInfo.name.replace(/\s+/g, '_') : 'Nuevo'}.pdf`;
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generando PDF:', err);
      setPdfError('Error al generar PDF. Revisa la consola del navegador.');
    }
  };

  // States for adding custom sections
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionType, setNewSectionType] = useState('text'); // 'text' | 'list'

  const { personalInfo, sections, contactItems = [] } = data;

  // Handler for personal info changes
  const handlePersonalChange = (field, val) => {
    setData({
      ...data,
      personalInfo: {
        ...personalInfo,
        [field]: val
      }
    });
  };

  // Handler for section visibility toggle
  const toggleSectionVisibility = (sectionId) => {
    setData({
      ...data,
      sections: sections.map((sec) => 
        sec.id === sectionId ? { ...sec, visible: !sec.visible } : sec
      )
    });
  };

  // Reorder sections
  const moveSection = (index, direction) => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= sectionOrder.length) return;

    const newOrder = [...sectionOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[nextIndex];
    newOrder[nextIndex] = temp;
    setSectionOrder(newOrder);
  };

  // CRUD for generic items
  const updateSectionItems = (sectionId, updatedItems) => {
    setData({
      ...data,
      sections: sections.map((sec) => 
        sec.id === sectionId ? { ...sec, items: updatedItems } : sec
      )
    });
  };

  // Edit list sub-properties (for Skills section)
  const updateSkillsSection = (field, updatedData) => {
    setData({
      ...data,
      sections: sections.map((sec) => 
        sec.id === 'skills' ? { ...sec, [field]: updatedData } : sec
      )
    });
  };

  // Add Contact Link
  const addContactItem = () => {
    const newItem = {
      id: `contact_${Date.now()}`,
      type: 'custom',
      label: 'Nuevo Enlace',
      url: 'https://',
      iconName: 'Link'
    };
    setData({
      ...data,
      contactItems: [...contactItems, newItem]
    });
  };

  // Update Contact Link
  const updateContactItem = (id, field, value) => {
    setData({
      ...data,
      contactItems: contactItems.map((item) => 
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  // Delete Contact Link
  const deleteContactItem = (id) => {
    setData({
      ...data,
      contactItems: contactItems.filter((item) => item.id !== id)
    });
  };

  // Add Custom Section
  const handleAddSection = (e) => {
    e.preventDefault();
    if (!newSectionTitle.trim()) return;

    const id = `custom_${Date.now()}`;
    const newSec = {
      id,
      type: newSectionType,
      title: newSectionTitle,
      visible: true,
      content: newSectionType === 'text' ? 'Contenido de la nueva sección...' : '',
      items: newSectionType === 'list' ? [] : undefined
    };

    setData({
      ...data,
      sections: [...sections, newSec]
    });
    setSectionOrder([...sectionOrder, id]);
    setNewSectionTitle('');
    setShowAddSection(false);
  };

  // Delete Section
  const handleDeleteSection = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta sección completa de la estructura?')) {
      setData({
        ...data,
        sections: sections.filter((s) => s.id !== id)
      });
      setSectionOrder(sectionOrder.filter((o) => o !== id));
    }
  };

  // Handle file import
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImportJSON(file);
    }
  };

  return (
    <div className="w-full lg:w-[450px] bg-white border-r border-gray-200 h-screen flex flex-col no-print font-sans shadow-lg select-none">
      
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-linear-to-r from-purple-800 to-indigo-900 text-white flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">Generador CV ATS</h1>
          <p className="text-xs text-purple-200">Estilo Harvard LaTeX en HTML</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Export Backup Button */}
          <button 
            onClick={onExportJSON}
            title="Descargar respaldo (JSON)"
            className="p-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg transition-colors cursor-pointer shadow-md flex items-center justify-center"
          >
            <Download className="w-4 h-4" />
          </button>
          
          {/* Import Backup Button */}
          <label 
            title="Subir respaldo (JSON)"
            className="p-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg transition-colors cursor-pointer shadow-md flex items-center justify-center"
          >
            <Upload className="w-4 h-4" />
            <input 
              type="file" 
              accept=".json" 
              onChange={handleFileChange}
              className="hidden" 
            />
          </label>

          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer shadow-md"
            title="Descargar el CV como PDF con texto seleccionable (compatible con ATS)"
          >
            <Printer className="w-3.5 h-3.5" />
            Descargar PDF
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 text-sm font-semibold bg-gray-50">
        <button 
          onClick={() => setActiveTab('data')}
          className={`flex-1 py-3 text-center border-b-2 cursor-pointer transition-colors ${
            activeTab === 'data' 
              ? 'border-purple-600 text-purple-700' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Datos CV
        </button>
        <button 
          onClick={() => setActiveTab('structure')}
          className={`flex-1 py-3 text-center border-b-2 cursor-pointer transition-colors ${
            activeTab === 'structure' 
              ? 'border-purple-600 text-purple-700' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Estructura
        </button>
        <button 
          onClick={() => setActiveTab('versions')}
          className={`flex-1 py-3 text-center border-b-2 cursor-pointer transition-colors ${
            activeTab === 'versions' 
              ? 'border-purple-600 text-purple-700' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Versiones ({profiles.length})
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* TAB 1: DATOS DEL CV */}
        {activeTab === 'data' && (
          <div className="space-y-6 select-text">
            {/* DATOS PERSONALES */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3">
              <h3 className="font-bold text-gray-800 text-sm">Información Personal</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Nombre Completo</label>
                  <input 
                    type="text" 
                    value={personalInfo.name} 
                    onChange={(e) => handlePersonalChange('name', e.target.value)}
                    className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-purple-500 bg-white"
                    placeholder="Ej. Bruno Baldeon"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Título Profesional</label>
                  <input 
                    type="text" 
                    value={personalInfo.title} 
                    onChange={(e) => handlePersonalChange('title', e.target.value)}
                    className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-purple-500 bg-white"
                    placeholder="Ej. Bachiller en Ingeniería Industrial"
                  />
                </div>
              </div>

              {/* CONTACT & LINKS DYNAMIC SECTION */}
              <div className="pt-3 border-t border-gray-200 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-600">Contacto & Enlaces con Iconos</label>
                  <button 
                    onClick={addContactItem}
                    className="text-purple-600 hover:text-purple-800 text-xs font-semibold flex items-center gap-0.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Agregar Link
                  </button>
                </div>
                
                <div className="space-y-3">
                  {contactItems.map((item) => (
                    <div key={item.id} className="p-3 border border-gray-200 bg-white rounded-lg space-y-2 relative shadow-2xs">
                      <button 
                        onClick={() => deleteContactItem(item.id)}
                        className="absolute right-2 top-2 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        {/* Selector de Icono */}
                        <div>
                          <label className="block text-[9px] font-bold text-gray-400 mb-0.5">Icono</label>
                          <select 
                            value={item.iconName} 
                            onChange={(e) => updateContactItem(item.id, 'iconName', e.target.value)}
                            className="w-full text-xs px-2 py-1 border border-gray-300 rounded-md bg-gray-50 focus:outline-hidden"
                          >
                            {ICON_OPTIONS.map((opt) => (
                              <option key={opt.name} value={opt.name}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                        {/* Etiqueta / Texto visible */}
                        <div>
                          <label className="block text-[9px] font-bold text-gray-400 mb-0.5">Texto Visible</label>
                          <input 
                            type="text" 
                            value={item.label}
                            onChange={(e) => updateContactItem(item.id, 'label', e.target.value)}
                            className="w-full text-xs px-2 py-1 border border-gray-300 rounded-md focus:outline-hidden"
                            placeholder="Ej. Mi LinkedIn"
                          />
                        </div>
                      </div>

                      {/* Dirección URL */}
                      <div>
                        <label className="block text-[9px] font-bold text-gray-400 mb-0.5">URL / Link (Opcional)</label>
                        <input 
                          type="text" 
                          value={item.url || ''}
                          onChange={(e) => updateContactItem(item.id, 'url', e.target.value)}
                          className="w-full text-xs px-2 py-1 border border-gray-300 rounded-md focus:outline-hidden"
                          placeholder="Ej. https://... (dejar vacío para texto plano)"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* DYNAMIC SECTIONS EDITOR LIST */}
            {sectionOrder.map((sectionId) => {
              const section = sections.find(s => s.id === sectionId);
              if (!section || !section.visible) return null;

              return (
                <div key={section.id} className="bg-white p-4 rounded-xl border border-gray-200 space-y-4 shadow-2xs">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-800 text-sm">{section.title}</span>
                    </div>
                    <span className="text-[9px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full uppercase font-bold">
                      {section.type === 'text' ? 'Texto' : section.type === 'list' ? 'Lista' : section.type}
                    </span>
                  </div>

                  {/* 1. TEXT TYPE EDITOR */}
                  {section.type === 'text' && (
                    <textarea 
                      value={section.content || ''}
                      onChange={(e) => {
                        setData({
                          ...data,
                          sections: sections.map(s => s.id === section.id ? { ...s, content: e.target.value } : s)
                        });
                      }}
                      rows={5}
                      className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-purple-500 resize-y bg-white"
                      placeholder="Escribe el contenido..."
                    />
                  )}

                  {/* 2. LIST TYPE EDITOR (Experience, Projects, Custom Lists) */}
                  {section.type === 'list' && (
                    <div className="space-y-4">
                      <div className="flex justify-end">
                        <button 
                          onClick={() => {
                            const newItem = { 
                              title: 'Nuevo Título', 
                              company: 'Organización / Subtítulo', 
                              date: 'Fecha', 
                              bullets: ['Detalle clave.'] 
                            };
                            updateSectionItems(section.id, [newItem, ...(section.items || [])]);
                          }}
                          className="text-purple-600 hover:text-purple-800 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <PlusCircle className="w-3.5 h-3.5" /> Agregar Item
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {section.items && section.items.map((item, idx) => (
                          <div key={idx} className="p-3 border border-gray-100 rounded-lg space-y-2 bg-gray-50/50 relative">
                            <button 
                              onClick={() => {
                                updateSectionItems(section.id, section.items.filter((_, i) => i !== idx));
                              }}
                              className="absolute right-2 top-2 text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            
                            <input 
                              type="text" 
                              value={item.role || item.title || ''} 
                              onChange={(e) => {
                                const items = [...section.items];
                                if (items[idx].role !== undefined) items[idx].role = e.target.value;
                                else items[idx].title = e.target.value;
                                updateSectionItems(section.id, items);
                              }}
                              className="w-[85%] text-xs px-2 py-1 border border-gray-300 rounded-md bg-white font-semibold"
                              placeholder="Título / Cargo"
                            />
                            
                            <input 
                              type="text" 
                              value={item.company || item.technologies || ''} 
                              onChange={(e) => {
                                const items = [...section.items];
                                if (items[idx].company !== undefined) items[idx].company = e.target.value;
                                else items[idx].technologies = e.target.value;
                                updateSectionItems(section.id, items);
                              }}
                              className="w-full text-xs px-2 py-1 border border-gray-300 rounded-md bg-white"
                              placeholder="Empresa / Institución / Tecnologías"
                            />
                            
                            <input 
                              type="text" 
                              value={item.date || ''} 
                              onChange={(e) => {
                                const items = [...section.items];
                                items[idx].date = e.target.value;
                                updateSectionItems(section.id, items);
                              }}
                              className="w-full text-xs px-2 py-1 border border-gray-300 rounded-md bg-white"
                              placeholder="Fechas"
                            />
                            
                            {/* Bullets */}
                            <div className="space-y-1.5 pt-1">
                              <label className="block text-[9px] font-bold text-gray-400">Viñetas descriptivas</label>
                              {item.bullets && item.bullets.map((bullet, bIdx) => (
                                <div key={bIdx} className="flex gap-1.5 items-center">
                                  <textarea 
                                    value={bullet} 
                                    onChange={(e) => {
                                      const items = [...section.items];
                                      items[idx].bullets[bIdx] = e.target.value;
                                      updateSectionItems(section.id, items);
                                    }}
                                    className="flex-1 text-[11px] px-2 py-1 border border-gray-200 rounded-md bg-white resize-y"
                                    rows={2}
                                  />
                                  <button 
                                    onClick={() => {
                                      const items = [...section.items];
                                      items[idx].bullets = items[idx].bullets.filter((_, i) => i !== bIdx);
                                      updateSectionItems(section.id, items);
                                    }}
                                    className="text-gray-400 hover:text-red-500 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                              <button 
                                onClick={() => {
                                  const items = [...section.items];
                                  if (!items[idx].bullets) items[idx].bullets = [];
                                  items[idx].bullets.push('Nueva descripción o logro.');
                                  updateSectionItems(section.id, items);
                                }}
                                className="text-[10px] text-purple-600 hover:underline font-bold cursor-pointer"
                              >
                                + Añadir Viñeta
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. EDUCATION TYPE EDITOR */}
                  {section.type === 'education' && (
                    <div className="space-y-4">
                      <div className="flex justify-end">
                        <button 
                          onClick={() => {
                            const newItem = { institution: 'Institución', degree: 'Grado / Carrera', date: 'Fecha', status: '' };
                            updateSectionItems(section.id, [newItem, ...(section.items || [])]);
                          }}
                          className="text-purple-600 hover:text-purple-800 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <PlusCircle className="w-3.5 h-3.5" /> Agregar
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {section.items && section.items.map((item, idx) => (
                          <div key={idx} className="p-3 border border-gray-100 rounded-lg space-y-2 bg-gray-50/50 relative">
                            <button 
                              onClick={() => {
                                updateSectionItems(section.id, section.items.filter((_, i) => i !== idx));
                              }}
                              className="absolute right-2 top-2 text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            
                            <input 
                              type="text" 
                              value={item.institution} 
                              onChange={(e) => {
                                const items = [...section.items];
                                items[idx].institution = e.target.value;
                                updateSectionItems(section.id, items);
                              }}
                              className="w-[85%] text-xs px-2 py-1 border border-gray-300 rounded-md bg-white font-semibold"
                              placeholder="Universidad / Escuela"
                            />
                            <input 
                              type="text" 
                              value={item.degree} 
                              onChange={(e) => {
                                const items = [...section.items];
                                items[idx].degree = e.target.value;
                                updateSectionItems(section.id, items);
                              }}
                              className="w-full text-xs px-2 py-1 border border-gray-300 rounded-md bg-white"
                              placeholder="Grado obtenido"
                            />
                            <input 
                              type="text" 
                              value={item.date} 
                              onChange={(e) => {
                                const items = [...section.items];
                                items[idx].date = e.target.value;
                                updateSectionItems(section.id, items);
                              }}
                              className="w-full text-xs px-2 py-1 border border-gray-300 rounded-md bg-white"
                              placeholder="Fechas"
                            />
                            <input 
                              type="text" 
                              value={item.status || ''} 
                              onChange={(e) => {
                                const items = [...section.items];
                                items[idx].status = e.target.value;
                                updateSectionItems(section.id, items);
                              }}
                              className="w-full text-xs px-2 py-1 border border-gray-300 rounded-md bg-white"
                              placeholder="Estado (ej. Graduado, En Curso)"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 4. SKILLS TYPE EDITOR */}
                  {section.type === 'skills' && (
                    <div className="space-y-4">
                      {/* Habilidades Lista */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-gray-500">Habilidades Técnicas</label>
                          <button 
                            onClick={() => {
                              const skills = section.skillsList || [];
                              updateSkillsSection('skillsList', [...skills, { category: 'Categoría', items: 'Habilidad 1, 2' }]);
                            }}
                            className="text-purple-600 hover:text-purple-800 text-[10px] font-bold cursor-pointer"
                          >
                            + Añadir Fila
                          </button>
                        </div>
                        {(section.skillsList || []).map((sk, idx) => (
                          <div key={idx} className="flex gap-2 items-center bg-gray-50 p-2 rounded-md">
                            <input 
                              type="text" 
                              value={sk.category} 
                              onChange={(e) => {
                                const list = [...section.skillsList];
                                list[idx].category = e.target.value;
                                updateSkillsSection('skillsList', list);
                              }}
                              className="w-24 text-[11px] px-1.5 py-1 border border-gray-300 rounded-sm bg-white font-bold"
                            />
                            <input 
                              type="text" 
                              value={sk.items} 
                              onChange={(e) => {
                                const list = [...section.skillsList];
                                list[idx].items = e.target.value;
                                updateSkillsSection('skillsList', list);
                              }}
                              className="flex-1 text-[11px] px-1.5 py-1 border border-gray-300 rounded-sm bg-white"
                            />
                            <button 
                              onClick={() => {
                                const list = section.skillsList.filter((_, i) => i !== idx);
                                updateSkillsSection('skillsList', list);
                              }}
                              className="text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Idiomas */}
                      <div className="space-y-2 pt-2 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-gray-500">Idiomas</label>
                          <button 
                            onClick={() => {
                              const langs = section.languages || [];
                              updateSkillsSection('languages', [...langs, { language: 'Idioma', level: 'Nivel' }]);
                            }}
                            className="text-purple-600 hover:text-purple-800 text-[10px] font-bold cursor-pointer"
                          >
                            + Añadir Idioma
                          </button>
                        </div>
                        {(section.languages || []).map((l, idx) => (
                          <div key={idx} className="flex gap-2 items-center bg-gray-50 p-2 rounded-md">
                            <input 
                              type="text" 
                              value={l.language} 
                              onChange={(e) => {
                                const list = [...section.languages];
                                list[idx].language = e.target.value;
                                updateSkillsSection('languages', list);
                              }}
                              className="w-24 text-[11px] px-1.5 py-1 border border-gray-300 rounded-sm bg-white font-bold"
                            />
                            <input 
                              type="text" 
                              value={l.level} 
                              onChange={(e) => {
                                const list = [...section.languages];
                                list[idx].level = e.target.value;
                                updateSkillsSection('languages', list);
                              }}
                              className="flex-1 text-[11px] px-1.5 py-1 border border-gray-300 rounded-sm bg-white"
                            />
                            <button 
                              onClick={() => {
                                const list = section.languages.filter((_, i) => i !== idx);
                                updateSkillsSection('languages', list);
                              }}
                              className="text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Voluntariado */}
                      <div className="space-y-2 pt-2 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold text-gray-500">Voluntariado</label>
                          <button 
                            onClick={() => {
                              const vols = section.volunteering || [];
                              updateSkillsSection('volunteering', [...vols, { role: 'Rol', description: 'Descripción' }]);
                            }}
                            className="text-purple-600 hover:text-purple-800 text-[10px] font-bold cursor-pointer"
                          >
                            + Añadir Voluntariado
                          </button>
                        </div>
                        {(section.volunteering || []).map((v, idx) => (
                          <div key={idx} className="flex gap-2 items-center bg-gray-50 p-2 rounded-md">
                            <input 
                              type="text" 
                              value={v.role} 
                              onChange={(e) => {
                                const list = [...section.volunteering];
                                list[idx].role = e.target.value;
                                updateSkillsSection('volunteering', list);
                              }}
                              className="w-24 text-[11px] px-1.5 py-1 border border-gray-300 rounded-sm bg-white font-bold"
                            />
                            <input 
                              type="text" 
                              value={v.description} 
                              onChange={(e) => {
                                const list = [...section.volunteering];
                                list[idx].description = e.target.value;
                                updateSkillsSection('volunteering', list);
                              }}
                              className="flex-1 text-[11px] px-1.5 py-1 border border-gray-300 rounded-sm bg-white"
                            />
                            <button 
                              onClick={() => {
                                const list = section.volunteering.filter((_, i) => i !== idx);
                                updateSkillsSection('volunteering', list);
                              }}
                              className="text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: ORGANIZAR ESTRUCTURA & AGREGAR SECCIONES */}
        {activeTab === 'structure' && (
          <div className="space-y-4">
            
            {/* Formulario para agregar nueva sección */}
            {!showAddSection ? (
              <button 
                onClick={() => setShowAddSection(true)}
                className="w-full flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold py-2.5 rounded-lg cursor-pointer transition-colors shadow-2xs"
              >
                <Plus className="w-4 h-4" /> Añadir Nueva Sección
              </button>
            ) : (
              <form onSubmit={handleAddSection} className="bg-purple-50 border border-purple-200 p-4 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-purple-800 uppercase">Nueva Sección Personalizada</h4>
                
                <div>
                  <label className="block text-[10px] font-bold text-purple-700 mb-1">Título de la Sección</label>
                  <input 
                    type="text" 
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    placeholder="Ej. Certificaciones"
                    className="w-full text-xs px-2.5 py-2 border border-gray-300 rounded-lg focus:outline-hidden bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-purple-700 mb-1">Tipo de Sección</label>
                  <select 
                    value={newSectionType}
                    onChange={(e) => setNewSectionType(e.target.value)}
                    className="w-full text-xs px-2.5 py-2 border border-gray-300 rounded-lg focus:outline-hidden bg-white"
                  >
                    <option value="text">Texto Libre (Párrafo)</option>
                    <option value="list">Lista de Elementos (Roles, Logros, Fechas)</option>
                  </select>
                </div>

                <div className="flex gap-2 justify-end pt-1">
                  <button 
                    type="button"
                    onClick={() => setShowAddSection(false)}
                    className="text-xs text-gray-500 hover:text-gray-700 font-semibold px-2 py-1"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-3 py-1.5 rounded-md cursor-pointer transition-colors"
                  >
                    Crear Sección
                  </button>
                </div>
              </form>
            )}

            <div className="bg-purple-50 border border-purple-100 p-3 rounded-lg text-[11px] text-purple-800 leading-normal">
              Edita el título directamente escribiendo sobre él. Activa/desactiva la visibilidad del bloque con el ícono del ojo, u ordénalo con las flechas. Puedes eliminar las secciones personalizadas.
            </div>

            <div className="space-y-2">
              {sectionOrder.map((sectionId, idx) => {
                const section = sections.find((s) => s.id === sectionId);
                if (!section) return null;

                const isCustom = section.id.startsWith('custom_');

                return (
                  <div 
                    key={section.id} 
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                      section.visible 
                        ? 'bg-white border-gray-200 shadow-sm' 
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 flex-1 mr-2">
                      <button 
                        onClick={() => toggleSectionVisibility(section.id)}
                        className={`p-1.5 rounded-md hover:bg-gray-100 transition-colors cursor-pointer ${
                          section.visible ? 'text-purple-600' : 'text-gray-400'
                        }`}
                      >
                        {section.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      
                      {/* EDITABLE SECTION TITLE */}
                      <input 
                        type="text" 
                        value={section.title} 
                        onChange={(e) => {
                          setData({
                            ...data,
                            sections: sections.map(s => s.id === section.id ? { ...s, title: e.target.value } : s)
                          });
                        }}
                        className="text-xs font-bold border-b border-transparent hover:border-gray-200 focus:border-purple-500 focus:outline-hidden px-1 py-0.5 flex-1 min-w-0"
                        title="Haz clic para editar el título"
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      <button 
                        disabled={idx === 0}
                        onClick={() => moveSection(idx, 'up')}
                        className="p-1 rounded-sm hover:bg-gray-100 text-gray-500 disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        disabled={idx === sectionOrder.length - 1}
                        onClick={() => moveSection(idx, 'down')}
                        className="p-1 rounded-sm hover:bg-gray-100 text-gray-500 disabled:opacity-30 cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      
                      {isCustom && (
                        <button 
                          onClick={() => handleDeleteSection(section.id)}
                          className="p-1 rounded-sm text-red-400 hover:text-red-600 cursor-pointer"
                          title="Eliminar Sección de la Estructura"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: VERSIONES GUARDADAS */}
        {activeTab === 'versions' && (
          <div className="space-y-5">
            {/* Guardar versión actual */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
              <h4 className="text-xs font-bold text-gray-700 uppercase font-sans">Guardar versión actual</h4>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newProfileName}
                  onChange={(e) => setNewProfileName(e.target.value)}
                  placeholder="Ej. CV Analista Compras Farma"
                  className="flex-1 text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-purple-500 bg-white"
                />
                <button 
                  onClick={() => {
                    if (newProfileName.trim()) {
                      onSaveProfile(newProfileName.trim());
                      setNewProfileName('');
                    }
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" /> Guardar
                </button>
              </div>
            </div>

            {/* Listado de versiones */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-500 uppercase px-1">Versiones en navegador (LocalStorage)</h4>
              {profiles.length === 0 ? (
                <div className="text-center p-6 border border-dashed border-gray-200 rounded-xl text-gray-400 text-xs">
                  Aún no has guardado versiones locales en este navegador.
                </div>
              ) : (
                <div className="space-y-2">
                  {profiles.map((prof) => (
                    <div 
                      key={prof.name} 
                      className={`flex items-center justify-between p-3 rounded-lg border text-sm transition-all ${
                        activeProfile === prof.name 
                          ? 'border-purple-500 bg-purple-50/50 shadow-sm' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">{prof.name}</span>
                        <span className="text-[10px] text-gray-400">Actualizado: {new Date(prof.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => onLoadProfile(prof.name)}
                          className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <FolderOpen className="w-3 h-3" /> Cargar
                        </button>
                        <button 
                          onClick={() => onDeleteProfile(prof.name)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Importar y Exportar Archivos de Respaldo */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <h4 className="text-xs font-bold text-gray-500 uppercase px-1">Importar / Exportar Datos en JSON</h4>
              
              <div className="grid grid-cols-2 gap-3">
                {/* Exportar */}
                <button 
                  onClick={onExportJSON}
                  className="flex items-center justify-center gap-1.5 border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold py-2.5 rounded-lg cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-purple-600" />
                  Descargar Respaldo
                </button>

                {/* Importar */}
                <label 
                  className="flex items-center justify-center gap-1.5 border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold py-2.5 rounded-lg cursor-pointer transition-colors text-center"
                >
                  <Upload className="w-3.5 h-3.5 text-purple-600" />
                  Subir Respaldo
                  <input 
                    type="file" 
                    accept=".json" 
                    onChange={handleFileChange}
                    className="hidden" 
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer Info */}
      <div className="p-3 bg-gray-50 border-t border-gray-200 text-center text-[10px] text-gray-400">
        Diseñado para cumplir estándares ATS. 100% libre de costos de servidor.
      </div>
    </div>
  );
}
