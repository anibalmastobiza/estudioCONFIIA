// Viñetas clínicas para el estudio conjoint
// Cada comparación varía sistemáticamente en las dimensiones de confianza:
// - Objetiva (precisión, evidencia científica)
// - Relacional (supervisión profesional)
// - Contextual (complejidad del caso)
// - Subjetiva (explicabilidad)

const vignettes = [
    // Comparación 1: Dimensión OBJETIVA - Precisión del diagnóstico
    {
        pair: 1,
        vignetteA: {
            title: "Escenario A",
            text: `Un paciente de 45 años con dolor lumbar crónico acude a su consulta. Utiliza un sistema de IA que analiza imágenes de resonancia magnética, historial clínico y patrones de movimiento. 

El sistema identifica un diagnóstico de <strong>alta precisión (95% de fiabilidad)</strong> basado en estudios científicos recientes, detectando una discopatía L4-L5 con componente radicular. 

El fisioterapeuta supervisa directamente la evaluación y el sistema proporciona un plan de tratamiento detallado que incluye terapia manual, ejercicio terapéutico y educación del paciente.`,
            attributes: {
                precision: "Alta",
                evidence: "Validada",
                supervision: "Directa",
                complexity: "Media",
                explainability: "Transparente"
            }
        },
        vignetteB: {
            title: "Escenario B",
            text: `Un paciente de 45 años con dolor lumbar crónico acude a su consulta. Utiliza un sistema de IA que analiza imágenes de resonancia magnética, historial clínico y patrones de movimiento. 

El sistema identifica un diagnóstico de <strong>precisión moderada (75% de fiabilidad)</strong> basado en estudios científicos recientes, detectando una discopatía L4-L5 con componente radicular. 

El fisioterapeuta supervisa directamente la evaluación y el sistema proporciona un plan de tratamiento detallado que incluye terapia manual, ejercicio terapéutico y educación del paciente.`,
            attributes: {
                precision: "Moderada",
                evidence: "Validada",
                supervision: "Directa",
                complexity: "Media",
                explainability: "Transparente"
            }
        }
    },

    // Comparación 2: Dimensión OBJETIVA - Base de evidencia científica
    {
        pair: 2,
        vignetteA: {
            title: "Escenario A",
            text: `Una paciente de 62 años con artrosis de rodilla bilateral requiere un plan de rehabilitación. Un sistema de IA analiza su estado funcional, rango articular y nivel de dolor para diseñar un programa personalizado de ejercicios.

Las recomendaciones del sistema se basan <strong>exclusivamente en protocolos clínicos validados</strong> por sociedades científicas de fisioterapia, incluyendo ejercicios de fortalecimiento, movilidad y control del dolor.

El fisioterapeuta trabaja junto al paciente siguiendo las pautas del sistema, ajustando progresivamente la intensidad según la evolución.`,
            attributes: {
                precision: "Alta",
                evidence: "Protocolos validados",
                supervision: "Directa",
                complexity: "Media",
                explainability: "Transparente"
            }
        },
        vignetteB: {
            title: "Escenario B",
            text: `Una paciente de 62 años con artrosis de rodilla bilateral requiere un plan de rehabilitación. Un sistema de IA analiza su estado funcional, rango articular y nivel de dolor para diseñar un programa personalizado de ejercicios.

Las recomendaciones del sistema incluyen <strong>un tratamiento innovador no validado aún</strong> por sociedades científicas, pero basado en análisis de big data de casos similares, que combina ejercicios convencionales con nuevas técnicas de neuromodulación.

El fisioterapeuta trabaja junto al paciente siguiendo las pautas del sistema, ajustando progresivamente la intensidad según la evolución.`,
            attributes: {
                precision: "Alta",
                evidence: "Innovador no validado",
                supervision: "Directa",
                complexity: "Media",
                explainability: "Transparente"
            }
        }
    },

    // Comparación 3: Dimensión RELACIONAL - Supervisión profesional
    {
        pair: 3,
        vignetteA: {
            title: "Escenario A",
            text: `Un deportista de 28 años con tendinopatía del manguito rotador utiliza una aplicación de IA para su recuperación. La app monitoriza en tiempo real sus ejercicios mediante sensores de movimiento y proporciona feedback inmediato sobre la técnica.

<strong>El fisioterapeuta está presente durante todas las sesiones</strong>, supervisa directamente cada ejercicio, corrige la técnica cuando es necesario y ajusta las recomendaciones del sistema según las sensaciones del paciente.

El sistema proporciona información detallada sobre la progresión, alertando sobre posibles riesgos de sobrecarga.`,
            attributes: {
                precision: "Alta",
                evidence: "Validada",
                supervision: "Presencial continua",
                complexity: "Media",
                explainability: "Transparente"
            }
        },
        vignetteB: {
            title: "Escenario B",
            text: `Un deportista de 28 años con tendinopatía del manguito rotador utiliza una aplicación de IA para su recuperación. La app monitoriza en tiempo real sus ejercicios mediante sensores de movimiento y proporciona feedback inmediato sobre la técnica.

<strong>El fisioterapeuta realiza consultas de seguimiento quincenales por videollamada</strong>, revisa los datos registrados por el sistema y ajusta las recomendaciones según los informes automáticos de progresión.

El sistema proporciona información detallada sobre la progresión, alertando sobre posibles riesgos de sobrecarga.`,
            attributes: {
                precision: "Alta",
                evidence: "Validada",
                supervision: "Remota periódica",
                complexity: "Media",
                explainability: "Transparente"
            }
        }
    },

    // Comparación 4: Dimensión CONTEXTUAL - Complejidad del caso
    {
        pair: 4,
        vignetteA: {
            title: "Escenario A",
            text: `Una paciente con <strong>una lesión muscular simple en el cuádriceps</strong> tras una práctica deportiva acude a valoración. Un sistema de IA analiza la ecografía, realiza mediciones de fuerza y recomienda un programa de recuperación gradual.

El sistema identifica el grado de la lesión (grado II), estima el tiempo de recuperación (4-6 semanas) y genera automáticamente un protocolo de ejercicios progresivos de eficacia demostrada.

El fisioterapeuta revisa las recomendaciones y las implementa, realizando seguimiento semanal de la evolución funcional del paciente.`,
            attributes: {
                precision: "Alta",
                evidence: "Validada",
                supervision: "Directa",
                complexity: "Baja - caso rutinario",
                explainability: "Transparente"
            }
        },
        vignetteB: {
            title: "Escenario B",
            text: `Un paciente con <strong>dolor crónico complejo de origen multifactorial</strong> (fibromialgia, sensibilización central, comorbilidad psicológica) acude a valoración. Un sistema de IA analiza múltiples variables biopsicosociales y recomienda un abordaje multimodal.

El sistema identifica patrones complejos de dolor, factores perpetuantes y genera un protocolo que integra ejercicio terapéutico, educación en neurociencia del dolor y estrategias de afrontamiento.

El fisioterapeuta revisa las recomendaciones y las implementa, realizando seguimiento semanal de la evolución funcional del paciente.`,
            attributes: {
                precision: "Alta",
                evidence: "Validada",
                supervision: "Directa",
                complexity: "Alta - caso complejo",
                explainability: "Transparente"
            }
        }
    },

    // Comparación 5: Dimensión SUBJETIVA - Explicabilidad del sistema
    {
        pair: 5,
        vignetteA: {
            title: "Escenario A",
            text: `Una paciente de 55 años con linfedema post-mastectomía requiere un plan de tratamiento. Un sistema de IA analiza volumetrías, elasticidad tisular y función linfática mediante múltiples sensores.

El sistema <strong>explica detalladamente su razonamiento</strong>: muestra qué variables ha considerado más relevantes (edema de +3cm en antebrazo, restricción fascial en axila), cómo ha ponderado cada factor y por qué recomienda drenaje linfático manual combinado con vendaje multicapa.

El fisioterapeuta puede revisar paso a paso el análisis del sistema y comprende claramente cómo se ha llegado a cada recomendación terapéutica.`,
            attributes: {
                precision: "Alta",
                evidence: "Validada",
                supervision: "Directa",
                complexity: "Media",
                explainability: "Transparente - explicable"
            }
        },
        vignetteB: {
            title: "Escenario B",
            text: `Una paciente de 55 años con linfedema post-mastectomía requiere un plan de tratamiento. Un sistema de IA analiza volumetrías, elasticidad tisular y función linfática mediante múltiples sensores.

El sistema <strong>no puede explicar cómo ha llegado a sus conclusiones</strong>: funciona como una "caja negra" que procesa los datos y genera recomendaciones (drenaje linfático manual combinado con vendaje multicapa), pero ni médicos ni ingenieros pueden justificar el razonamiento interno del algoritmo.

El fisioterapeuta solo recibe las recomendaciones finales sin poder comprender el proceso de toma de decisiones del sistema.`,
            attributes: {
                precision: "Alta",
                evidence: "Validada",
                supervision: "Directa",
                complexity: "Media",
                explainability: "Caja negra - inexplicable"
            }
        }
    }
];

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = vignettes;
}
