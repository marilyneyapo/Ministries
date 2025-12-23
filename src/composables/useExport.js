import { ref, computed } from 'vue'
import { useDataStore } from '../stores/data.js'
import { useEventsStore } from '../stores/events.js'

export function useExport() {
  const dataStore = useDataStore()
  const eventsStore = useEventsStore()

  // Variables réactives pour l'exportation
  const showExportModal = ref(false)
  const exportPeriod = ref('all')
  const customStartDate = ref('')
  const customEndDate = ref('')
  const exportFormat = ref('excel')
  const isExporting = ref(false)

  const exportOptions = ref({
    members: true,
    children: true,
    events: true,
    activities: true,
    statistics: true
  })

  // Computed pour vérifier si des données sont sélectionnées
  const hasSelectedData = computed(() => {
    return Object.values(exportOptions.value).some(option => option)
  })

  // Fonction pour obtenir la plage de dates
  function getDateRange() {
    const today = new Date()
    let startDate, endDate
    
    switch (exportPeriod.value) {
      case 'thisMonth':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1)
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        break
      case 'lastMonth':
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        endDate = new Date(today.getFullYear(), today.getMonth(), 0)
        break
      case 'thisYear':
        startDate = new Date(today.getFullYear(), 0, 1)
        endDate = new Date(today.getFullYear(), 11, 31)
        break
      case 'lastYear':
        startDate = new Date(today.getFullYear() - 1, 0, 1)
        endDate = new Date(today.getFullYear() - 1, 11, 31)
        break
      case 'custom':
        startDate = customStartDate.value ? new Date(customStartDate.value) : null
        endDate = customEndDate.value ? new Date(customEndDate.value) : null
        break
      default:
        return { startDate: null, endDate: null }
    }
    
    return { startDate, endDate }
  }

  // Fonction pour filtrer les données par date
  function filterDataByDate(data, dateField) {
    const { startDate, endDate } = getDateRange()
    
    if (!startDate && !endDate) return data
    
    return data.filter(item => {
      const itemDate = new Date(item[dateField])
      if (startDate && itemDate < startDate) return false
      if (endDate && itemDate > endDate) return false
      return true
    })
  }

  // Fonction pour générer les données Excel
  function generateExcelData(customStats = {}) {
    const workbook = []
    
    if (exportOptions.value.members) {
      const members = filterDataByDate(dataStore.users || [], 'createdAt')
      workbook.push({
        name: 'Membres',
        data: [
          ['Nom', 'Prénom', 'Email', 'Téléphone', 'Groupe', 'Date d\'inscription'],
          ...members.map(member => [
            member.nom || '',
            member.prenom || '',
            member.email || '',
            member.telephone || '',
            member.groupe_id === 1 ? 'Femmes' : member.groupe_id === 2 ? 'Hommes' : 'Jeunes',
            member.createdAt ? new Date(member.createdAt).toLocaleDateString('fr-FR') : ''
          ])
        ]
      })
    }
    
    if (exportOptions.value.children) {
      const children = filterDataByDate(dataStore.children || [], 'createdAt')
      workbook.push({
        name: 'Enfants',
        data: [
          ['Nom', 'Prénom', 'Âge', 'Classe', 'Parent/Tuteur', 'Date d\'inscription'],
          ...children.map(child => [
            child.nom || '',
            child.prenom || '',
            child.age || '',
            child.classe || '',
            child.parent || '',
            child.createdAt ? new Date(child.createdAt).toLocaleDateString('fr-FR') : ''
          ])
        ]
      })
    }
    
    if (exportOptions.value.events) {
      const events = filterDataByDate(eventsStore.events || [], 'date')
      workbook.push({
        name: 'Événements',
        data: [
          ['Titre', 'Type', 'Date', 'Heure', 'Lieu', 'Description', 'Statut'],
          ...events.map(event => [
            event.titre || '',
            event.type || '',
            event.date || '',
            event.heure || '',
            event.lieu || '',
            event.description || '',
            event.statut || ''
          ])
        ]
      })
    }
    
    if (exportOptions.value.activities) {
      const activities = filterDataByDate(dataStore.activities || [], 'date')
      workbook.push({
        name: 'Activités',
        data: [
          ['Nom', 'Type', 'Date', 'Responsable', 'Participants', 'Statut'],
          ...activities.map(activity => [
            activity.nom || '',
            activity.type || '',
            activity.date || '',
            activity.responsable || '',
            activity.participants?.length || 0,
            activity.statut || ''
          ])
        ]
      })
    }
    
    if (exportOptions.value.statistics) {
      // Utiliser les stats personnalisées ou les stats par défaut
      const stats = customStats.membersByCategory || {
        hommes: dataStore.users?.filter(u => u.groupe_id === 2).length || 150,
        femmes: dataStore.users?.filter(u => u.groupe_id === 1).length || 180,
        jeunes: dataStore.users?.filter(u => u.groupe_id === 3).length || 85
      }

      const totalMembers = customStats.totalMembers || dataStore.users?.length || 0
      const totalChildren = customStats.totalChildren || dataStore.children?.length || 0
      const totalEvents = customStats.totalEvents || eventsStore.events?.length || 0
      const totalActivities = customStats.totalActivities || dataStore.activities?.length || 0
      const newMembersThisMonth = customStats.newMembersThisMonth || 5
      const upcomingEvents = customStats.upcomingEvents || 0
      const activeActivities = customStats.activeActivities || 0
      const averageAttendance = customStats.averageAttendance || 85

      workbook.push({
        name: 'Statistiques',
        data: [
          ['Métrique', 'Valeur'],
          ['Total Membres', totalMembers],
          ['Total Enfants', totalChildren],
          ['Total Événements', totalEvents],
          ['Total Activités', totalActivities],
          ['Nouveaux membres ce mois', newMembersThisMonth],
          ['Événements à venir', upcomingEvents],
          ['Activités actives', activeActivities],
          ['Hommes', stats.hommes],
          ['Femmes', stats.femmes],
          ['Jeunes', stats.jeunes],
          ['Présence moyenne', averageAttendance + '%']
        ]
      })
    }
    
    return workbook
  }

  // Fonction pour obtenir le texte de la période
  function getPeriodText() {
    const { startDate, endDate } = getDateRange()
    
    switch (exportPeriod.value) {
      case 'thisMonth':
        return 'Ce mois (' + new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) + ')'
      case 'lastMonth':
        const lastMonth = new Date()
        lastMonth.setMonth(lastMonth.getMonth() - 1)
        return 'Le mois dernier (' + lastMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) + ')'
      case 'thisYear':
        return 'Cette année (' + new Date().getFullYear() + ')'
      case 'lastYear':
        return 'L\'année dernière (' + (new Date().getFullYear() - 1) + ')'
      case 'custom':
        if (startDate && endDate) {
          return `Du ${startDate.toLocaleDateString('fr-FR')} au ${endDate.toLocaleDateString('fr-FR')}`
        }
        return 'Période personnalisée'
      default:
        return 'Toutes les données disponibles'
    }
  }

  // Fonction pour télécharger le fichier Excel
  function downloadExcel(workbook, customStats = {}) {
    // Créer un fichier Excel professionnel avec formatage
    let excelContent = ''
    
    // En-tête du fichier Excel
    excelContent += '<?xml version="1.0"?>\n'
    excelContent += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n'
    excelContent += ' xmlns:o="urn:schemas-microsoft-com:office:office"\n'
    excelContent += ' xmlns:x="urn:schemas-microsoft-com:office:excel"\n'
    excelContent += ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\n'
    excelContent += ' xmlns:html="http://www.w3.org/TR/REC-html40">\n'
    
    // Styles Excel
    excelContent += '<Styles>\n'
    
    // Style pour les en-têtes
    excelContent += '<Style ss:ID="HeaderStyle">\n'
    excelContent += '<Font ss:Bold="1" ss:Size="12" ss:Color="#FFFFFF"/>\n'
    excelContent += '<Interior ss:Color="#4472C4" ss:Pattern="Solid"/>\n'
    excelContent += '<Alignment ss:Horizontal="Center" ss:Vertical="Center"/>\n'
    excelContent += '<Borders>\n'
    excelContent += '<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>\n'
    excelContent += '<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>\n'
    excelContent += '<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>\n'
    excelContent += '<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>\n'
    excelContent += '</Borders>\n'
    excelContent += '</Style>\n'
    
    // Style pour les données
    excelContent += '<Style ss:ID="DataStyle">\n'
    excelContent += '<Font ss:Size="10"/>\n'
    excelContent += '<Alignment ss:Horizontal="Left" ss:Vertical="Center"/>\n'
    excelContent += '<Borders>\n'
    excelContent += '<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
    excelContent += '<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
    excelContent += '<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
    excelContent += '<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
    excelContent += '</Borders>\n'
    excelContent += '</Style>\n'
    
    // Style pour les nombres
    excelContent += '<Style ss:ID="NumberStyle">\n'
    excelContent += '<Font ss:Size="10"/>\n'
    excelContent += '<Alignment ss:Horizontal="Right" ss:Vertical="Center"/>\n'
    excelContent += '<Borders>\n'
    excelContent += '<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
    excelContent += '<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
    excelContent += '<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
    excelContent += '<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
    excelContent += '</Borders>\n'
    excelContent += '</Style>\n'
    
    // Style pour les titres de feuilles
    excelContent += '<Style ss:ID="SheetTitleStyle">\n'
    excelContent += '<Font ss:Bold="1" ss:Size="16" ss:Color="#2F5597"/>\n'
    excelContent += '<Alignment ss:Horizontal="Center" ss:Vertical="Center"/>\n'
    excelContent += '</Style>\n'
    
    // Style pour les sous-titres
    excelContent += '<Style ss:ID="SubtitleStyle">\n'
    excelContent += '<Font ss:Bold="1" ss:Size="11" ss:Color="#70AD47"/>\n'
    excelContent += '<Alignment ss:Horizontal="Left" ss:Vertical="Center"/>\n'
    excelContent += '</Style>\n'
    
    excelContent += '</Styles>\n'
    
    // Créer chaque feuille de calcul
    workbook.forEach((sheet, sheetIndex) => {
      excelContent += `<Worksheet ss:Name="${sheet.name}">\n`
      excelContent += '<Table>\n'
      
      // Définir les colonnes avec largeur automatique
      const maxCols = Math.max(...sheet.data.map(row => row.length))
      for (let i = 0; i < maxCols; i++) {
        excelContent += '<Column ss:AutoFitWidth="1" ss:Width="120"/>\n'
      }
      
      // Ajouter le titre de la feuille
      excelContent += '<Row ss:Height="30">\n'
      excelContent += `<Cell ss:MergeAcross="${maxCols - 1}" ss:StyleID="SheetTitleStyle">\n`
      excelContent += `<Data ss:Type="String">📊 ${sheet.name} - MERCV Dashboard</Data>\n`
      excelContent += '</Cell>\n'
      excelContent += '</Row>\n'
      
      // Ajouter la date d'exportation
      const exportDate = new Date().toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
      excelContent += '<Row ss:Height="20">\n'
      excelContent += `<Cell ss:MergeAcross="${maxCols - 1}" ss:StyleID="SubtitleStyle">\n`
      excelContent += `<Data ss:Type="String">Exporté le ${exportDate}</Data>\n`
      excelContent += '</Cell>\n'
      excelContent += '</Row>\n'
      
      // Ligne vide pour l'espacement
      excelContent += '<Row ss:Height="10"></Row>\n'
      
      // Ajouter les données
      sheet.data.forEach((row, rowIndex) => {
        const isHeader = rowIndex === 0
        const rowHeight = isHeader ? '25' : '20'
        
        excelContent += `<Row ss:Height="${rowHeight}">\n`
        
        row.forEach((cell, cellIndex) => {
          let cellStyle = 'DataStyle'
          let cellType = 'String'
          let cellValue = String(cell || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
          
          if (isHeader) {
            cellStyle = 'HeaderStyle'
          } else if (typeof cell === 'number' || (!isNaN(cell) && cell !== '')) {
            cellStyle = 'NumberStyle'
            cellType = 'Number'
            cellValue = cell
          }
          
          excelContent += `<Cell ss:StyleID="${cellStyle}">\n`
          excelContent += `<Data ss:Type="${cellType}">${cellValue}</Data>\n`
          excelContent += '</Cell>\n'
        })
        
        excelContent += '</Row>\n'
      })
      
      // Ajouter un résumé en bas pour certaines feuilles
      if (sheet.name === 'Membres' || sheet.name === 'Enfants') {
        excelContent += '<Row ss:Height="10"></Row>\n'
        excelContent += '<Row>\n'
        excelContent += '<Cell ss:StyleID="SubtitleStyle">\n'
        excelContent += `<Data ss:Type="String">📈 Total: ${sheet.data.length - 1} enregistrements</Data>\n`
        excelContent += '</Cell>\n'
        excelContent += '</Row>\n'
      }
      
      excelContent += '</Table>\n'
      excelContent += '</Worksheet>\n'
    })
    
    // Ajouter une feuille de résumé
    const periodText = getPeriodText()
    
    excelContent += '<Worksheet ss:Name="📋 Résumé Exécutif">\n'
    excelContent += '<Table>\n'
    excelContent += '<Column ss:AutoFitWidth="1" ss:Width="200"/>\n'
    excelContent += '<Column ss:AutoFitWidth="1" ss:Width="150"/>\n'
    
    // Titre du résumé
    excelContent += '<Row ss:Height="35">\n'
    excelContent += '<Cell ss:MergeAcross="1" ss:StyleID="SheetTitleStyle">\n'
    excelContent += '<Data ss:Type="String">📊 RÉSUMÉ EXÉCUTIF - MERCV</Data>\n'
    excelContent += '</Cell>\n'
    excelContent += '</Row>\n'
    
    excelContent += '<Row ss:Height="20">\n'
    excelContent += '<Cell ss:MergeAcross="1" ss:StyleID="SubtitleStyle">\n'
    excelContent += `<Data ss:Type="String">Période: ${periodText}</Data>\n`
    excelContent += '</Cell>\n'
    excelContent += '</Row>\n'
    
    excelContent += '<Row ss:Height="10"></Row>\n'
    
    // En-têtes du résumé
    excelContent += '<Row ss:Height="25">\n'
    excelContent += '<Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">📊 INDICATEUR</Data></Cell>\n'
    excelContent += '<Cell ss:StyleID="HeaderStyle"><Data ss:Type="String">📈 VALEUR</Data></Cell>\n'
    excelContent += '</Row>\n'
    
    // Données du résumé avec stats personnalisées
    const totalMembers = customStats.totalMembers || dataStore.users?.length || 0
    const totalChildren = customStats.totalChildren || dataStore.children?.length || 0
    const totalEvents = customStats.totalEvents || eventsStore.events?.length || 0
    const totalActivities = customStats.totalActivities || dataStore.activities?.length || 0
    const newMembersThisMonth = customStats.newMembersThisMonth || 5
    const upcomingEvents = customStats.upcomingEvents || 0
    const activeActivities = customStats.activeActivities || 0
    const averageAttendance = customStats.averageAttendance || 85

    const summaryData = [
      ['👥 Total Membres', totalMembers],
      ['👶 Total Enfants', totalChildren],
      ['📅 Total Événements', totalEvents],
      ['⭐ Total Activités', totalActivities],
      ['🆕 Nouveaux membres ce mois', newMembersThisMonth],
      ['🔜 Événements à venir', upcomingEvents],
      ['🏃 Activités actives', activeActivities],
      ['📊 Présence moyenne', averageAttendance + '%']
    ]
    
    summaryData.forEach(([label, value]) => {
      excelContent += '<Row ss:Height="22">\n'
      excelContent += '<Cell ss:StyleID="DataStyle">\n'
      excelContent += `<Data ss:Type="String">${label}</Data>\n`
      excelContent += '</Cell>\n'
      excelContent += '<Cell ss:StyleID="NumberStyle">\n'
      excelContent += `<Data ss:Type="String">${value}</Data>\n`
      excelContent += '</Cell>\n'
      excelContent += '</Row>\n'
    })
    
    // Pied de page
    excelContent += '<Row ss:Height="15"></Row>\n'
    excelContent += '<Row>\n'
    excelContent += '<Cell ss:MergeAcross="1" ss:StyleID="SubtitleStyle">\n'
    excelContent += '<Data ss:Type="String">🏛️ Mission Évangélique Réveil du Christ Vivant (MERCV)</Data>\n'
    excelContent += '</Cell>\n'
    excelContent += '</Row>\n'
    
    excelContent += '<Row>\n'
    excelContent += '<Cell ss:MergeAcross="1" ss:StyleID="DataStyle">\n'
    excelContent += '<Data ss:Type="String">📧 Contact: admin@mercv.org | 📞 Tél: +33 1 23 45 67 89</Data>\n'
    excelContent += '</Cell>\n'
    excelContent += '</Row>\n'
    
    excelContent += '</Table>\n'
    excelContent += '</Worksheet>\n'
    
    excelContent += '</Workbook>\n'
    
    // Créer et télécharger le fichier
    const blob = new Blob([excelContent], { 
      type: 'application/vnd.ms-excel;charset=utf-8' 
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    
    const { startDate, endDate } = getDateRange()
    let filename = 'MERCV_Dashboard_Export'
    
    if (startDate && endDate) {
      const start = startDate.toISOString().split('T')[0]
      const end = endDate.toISOString().split('T')[0]
      filename += `_${start}_${end}`
    } else if (exportPeriod.value !== 'all') {
      filename += `_${exportPeriod.value}`
    }
    
    filename += '.xls'
    link.download = filename
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  // Fonction principale d'exportation
  async function handleExport(customStats = {}) {
    if (!hasSelectedData.value) return
    
    isExporting.value = true
    
    try {
      // Simuler un délai d'exportation
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const workbook = generateExcelData(customStats)
      downloadExcel(workbook, customStats)
      
      showExportModal.value = false
      
      // Retourner un succès pour permettre aux composants d'afficher une notification
      return { success: true, message: 'Exportation réussie!' }
      
    } catch (error) {
      console.error('Erreur lors de l\'exportation:', error)
      return { success: false, message: 'Erreur lors de l\'exportation' }
    } finally {
      isExporting.value = false
    }
  }

  // Fonction pour réinitialiser les options d'export
  function resetExportOptions() {
    exportPeriod.value = 'all'
    customStartDate.value = ''
    customEndDate.value = ''
    exportFormat.value = 'excel'
    exportOptions.value = {
      members: true,
      children: true,
      events: true,
      activities: true,
      statistics: true
    }
  }

  return {
    // Variables réactives
    showExportModal,
    exportPeriod,
    customStartDate,
    customEndDate,
    exportFormat,
    isExporting,
    exportOptions,
    hasSelectedData,
    
    // Fonctions
    handleExport,
    resetExportOptions,
    getDateRange,
    getPeriodText,
    filterDataByDate,
    generateExcelData,
    downloadExcel
  }
}