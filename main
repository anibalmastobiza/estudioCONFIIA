// ========================================
// CONFIGURACIÓN DE GOOGLE SHEETS
// ========================================
// IMPORTANTE: Reemplaza esta URL con la URL de tu Google Apps Script Web App
const GOOGLE_SCRIPT_URL = 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI';

// ========================================
// ESTADO DE LA APLICACIÓN
// ========================================
let currentSection = 'section-consent';
let currentComparison = 0;
let responses = {
    demographics: {},
    comparisons: [],
    timestamp: null,
    sessionId: null
};

// ========================================
// GESTIÓN DEL CONSENTIMIENTO
// ========================================
function startStudy() {
    // Generar ID de sesión único
    responses.sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    responses.timestamp = new Date().toISOString();
    
    goToSection('section-demographics');
}

// ========================================
// GESTIÓN DE DATOS DEMOGRÁFICOS
// ========================================
const demographicFields = [
    'professional-status',
    'experience',
    'specialty',
    'gender',
    'age-group',
    'ai-familiarity'
];

// Validar campos demográficos en tiempo real
demographicFields.forEach(fieldId => {
    document.getElementById(fieldId).addEventListener('change', validateDemographics);
});

function validateDemographics() {
    const allFilled = demographicFields.every(fieldId => {
        return document.getElementById(fieldId).value !== '';
    });
    
    document.getElementById('btn-demographics').disabled = !allFilled;
}

function startComparisons() {
    // Guardar datos demográficos
    demographicFields.forEach(fieldId => {
        const element = document.getElementById(fieldId);
        const label = element.previousElementSibling.textContent;
        responses.demographics[fieldId] = {
            question: label,
            answer: element.value
        };
    });
    
    // Inicializar comparaciones
    currentComparison = 0;
    responses.comparisons = vignettes.map((v, index) => ({
        pair: v.pair,
        vignetteA: v.vignetteA,
        vignetteB: v.vignetteB,
        selected: null,
        timestamp: null
    }));
    
    goToSection('section-comparisons');
    renderComparison();
}

// ========================================
// GESTIÓN DE COMPARACIONES
// ========================================
function renderComparison() {
    const comparison = vignettes[currentComparison];
    const container = document.getElementById('vignette-container');
    
    // Actualizar contador
    document.getElementById('question-counter').textContent = 
        `Comparación ${currentComparison + 1} de ${vignettes.length}`;
    
    // Actualizar barra de progreso
    const progress = ((currentComparison + 1) / vignettes.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    
    // Renderizar viñetas
    container.innerHTML = `
        <div>
            <div class="vignette-label">${comparison.vignetteA.title}</div>
            <div class="vignette" data-choice="A" onclick="selectVignette('A')">
                <div>${comparison.vignetteA.text}</div>
            </div>
        </div>
        <div>
            <div class="vignette-label">${comparison.vignetteB.title}</div>
            <div class="vignette" data-choice="B" onclick="selectVignette('B')">
                <div>${comparison.vignetteB.text}</div>
            </div>
        </div>
    `;
    
    // Restaurar selección previa si existe
    const previousSelection = responses.comparisons[currentComparison].selected;
    if (previousSelection) {
        const selectedVignette = container.querySelector(`[data-choice="${previousSelection}"]`);
        if (selectedVignette) {
            selectedVignette.classList.add('selected');
        }
    }
    
    // Actualizar estado de botones
    updateNavigationButtons();
}

function selectVignette(choice) {
    // Remover selección anterior
    document.querySelectorAll('.vignette').forEach(v => v.classList.remove('selected'));
    
    // Añadir selección actual
    const selectedVignette = document.querySelector(`[data-choice="${choice}"]`);
    selectedVignette.classList.add('selected');
    
    // Guardar respuesta
    responses.comparisons[currentComparison].selected = choice;
    responses.comparisons[currentComparison].timestamp = new Date().toISOString();
    
    // Actualizar botones
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const btnPrevious = document.getElementById('btn-previous');
    const btnNext = document.getElementById('btn-next');
    
    // Botón anterior
    btnPrevious.disabled = currentComparison === 0;
    
    // Botón siguiente
    const hasSelection = responses.comparisons[currentComparison].selected !== null;
    btnNext.disabled = !hasSelection;
    
    // Cambiar texto del botón en la última comparación
    if (currentComparison === vignettes.length - 1) {
        btnNext.textContent = 'Finalizar';
    } else {
        btnNext.textContent = 'Siguiente';
    }
}

function nextComparison() {
    if (currentComparison < vignettes.length - 1) {
        currentComparison++;
        renderComparison();
    } else {
        // Última comparación - enviar datos
        submitData();
    }
}

function previousComparison() {
    if (currentComparison > 0) {
        currentComparison--;
        renderComparison();
    }
}

// ========================================
// ENVÍO DE DATOS A GOOGLE SHEETS
// ========================================
async function submitData() {
    // Mostrar indicador de carga
    const btnNext = document.getElementById('btn-next');
    const originalText = btnNext.textContent;
    btnNext.textContent = 'Enviando...';
    btnNext.disabled = true;
    
    try {
        // Preparar datos para envío
        const dataToSend = prepareDataForSheets();
        
        // Enviar a Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Importante para Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
        });
        
        // Con mode: 'no-cors', no podemos leer la respuesta, pero si llega aquí, se envió
        console.log('Datos enviados exitosamente');
        
        // Ir a página de agradecimiento
        goToSection('section-thankyou');
        
    } catch (error) {
        console.error('Error al enviar datos:', error);
        alert('Hubo un error al enviar sus respuestas. Por favor, intente nuevamente o contacte con el equipo investigador.');
        btnNext.textContent = originalText;
        btnNext.disabled = false;
    }
}

function prepareDataForSheets() {
    // Crear una fila de datos para la hoja de cálculo
    const row = {
        sessionId: responses.sessionId,
        timestamp: responses.timestamp,
        
        // Datos demográficos
        professionalStatus: responses.demographics['professional-status']?.answer || '',
        experience: responses.demographics['experience']?.answer || '',
        specialty: responses.demographics['specialty']?.answer || '',
        gender: responses.demographics['gender']?.answer || '',
        ageGroup: responses.demographics['age-group']?.answer || '',
        aiFamiliarity: responses.demographics['ai-familiarity']?.answer || '',
        
        // Respuestas a comparaciones
        comparison1: responses.comparisons[0]?.selected || '',
        comparison1_timestamp: responses.comparisons[0]?.timestamp || '',
        comparison1_attributes_A: JSON.stringify(vignettes[0].vignetteA.attributes),
        comparison1_attributes_B: JSON.stringify(vignettes[0].vignetteB.attributes),
        
        comparison2: responses.comparisons[1]?.selected || '',
        comparison2_timestamp: responses.comparisons[1]?.timestamp || '',
        comparison2_attributes_A: JSON.stringify(vignettes[1].vignetteA.attributes),
        comparison2_attributes_B: JSON.stringify(vignettes[1].vignetteB.attributes),
        
        comparison3: responses.comparisons[2]?.selected || '',
        comparison3_timestamp: responses.comparisons[2]?.timestamp || '',
        comparison3_attributes_A: JSON.stringify(vignettes[2].vignetteA.attributes),
        comparison3_attributes_B: JSON.stringify(vignettes[2].vignetteB.attributes),
        
        comparison4: responses.comparisons[3]?.selected || '',
        comparison4_timestamp: responses.comparisons[3]?.timestamp || '',
        comparison4_attributes_A: JSON.stringify(vignettes[3].vignetteA.attributes),
        comparison4_attributes_B: JSON.stringify(vignettes[3].vignetteB.attributes),
        
        comparison5: responses.comparisons[4]?.selected || '',
        comparison5_timestamp: responses.comparisons[4]?.timestamp || '',
        comparison5_attributes_A: JSON.stringify(vignettes[4].vignetteA.attributes),
        comparison5_attributes_B: JSON.stringify(vignettes[4].vignetteB.attributes)
    };
    
    return row;
}

// ========================================
// NAVEGACIÓN GENERAL
// ========================================
function goToSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección solicitada
    document.getElementById(sectionId).classList.add('active');
    currentSection = sectionId;
    
    // Scroll al inicio
    window.scrollTo(0, 0);
}

// ========================================
// UTILIDADES
// ========================================
// Prevenir el cierre accidental de la página durante el estudio
window.addEventListener('beforeunload', function(e) {
    if (currentSection === 'section-comparisons' && responses.comparisons.some(c => c.selected !== null)) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

// Log de debugging (remover en producción)
console.log('CONFIIA Conjoint Study initialized');
console.log('Remember to update GOOGLE_SCRIPT_URL with your Google Apps Script URL');
