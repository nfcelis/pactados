# Plan de mejora de landing page y UI general

Fecha de verificacion: 2026-03-27

## Objetivo de este documento

Este documento deja listo el terreno para un siguiente prompt de implementacion. La idea no es cambiar codigo todavia, sino definir con claridad:

- el estado actual de la landing
- como vamos a usar Stitch como referencia real
- que componentes, layout y estilo debemos revisar
- que decisiones faltan
- que necesito de su parte para llegar a una version final mas solida

## Estado de implementacion

Actualizacion 2026-03-27:

- se implemento una nueva landing tomando como referencia activa el screen de Stitch `e3ceb91cf0fd49e5840d2a5d6f239d35`
- se descargo el screenshot local de referencia en `docs/stitch-screen-e3ceb91cf0fd49e5840d2a5d6f239d35.png`
- la landing paso de una composicion por secciones tradicionales a una composicion de dos paneles inspirada en Stitch
- se mantuvo la data real de retos del proyecto para no convertir la landing en un mockup desconectado del producto
- se actualizaron `docs/stitch-reference.md` y esta guia para dejar trazabilidad del origen visual

## Verificacion del MCP de Stitch

Estado: operativo y utilizable en este entorno.

Validaciones realizadas:

- `list_projects` respondio correctamente el 2026-03-27.
- Existe un proyecto de Stitch llamado `Pactados Modern Landing Page`.
- Project ID confirmado: `16587430836768263937`.
- `get_project` respondio correctamente y devolvio metadata del proyecto.
- `list_screens` respondio correctamente y devolvio multiples screens asociadas.
- `get_screen` funciono correctamente para el screen `7693f15fe4374e8bbf5a5af6fb8e52f0`.
- `list_design_systems` no devolvio design systems para este proyecto.

Conclusion:

- El MCP de Stitch ya esta correctamente integrado en esta sesion.
- Podemos usarlo como fuente de verdad visual para la landing en siguientes iteraciones.
- Lo que aun no existe es un design system formal asociado al proyecto de Stitch.

## Referencia visual que vamos a usar

La referencia mas confiable disponible hoy no es el PNG local, porque la inspeccion directa del archivo `c:\Users\paula\Downloads\pactados_modern_landing_page.png` no pudo procesarse desde la herramienta de imagen de esta sesion.

Sin embargo, ya existe en Stitch un proyecto alineado con esa referencia:

- Proyecto: `Pactados Modern Landing Page`
- Screen de referencia documentado en [stitch-reference.md](c:\Users\paula\OneDrive\Desktop\PMC\pactados\docs\stitch-reference.md)

Para el siguiente prompt, la recomendacion es tomar Stitch como base primaria y adaptar el resultado a Next.js, en vez de reinterpretar la landing desde cero.

## Estado actual del proyecto

## Stack actual

- Next.js 16
- React 19
- Tailwind CSS 4
- componentes base tipo shadcn
- fuentes cargadas desde `next/font`: Bebas Neue y DM Sans

## Composicion actual de la landing

La pagina principal actual arma la landing con estas secciones:

- `Navbar`
- `Hero`
- `ComoFunciona`
- `RetosDestacados`
- `PorQueFunciona`
- `CTA`
- `Footer`

## Sistema visual actual

Hoy el proyecto ya tiene una direccion visual definida, pero todavia no se siente como un sistema totalmente consolidado:

- paleta calida con fondo crema, negro suave y naranja/rojo como acento
- uso muy dominante de titulares uppercase con `Bebas Neue`
- uso de `DM Sans` para parrafos y CTAs
- varios estilos inline por componente
- animaciones manuales de entrada (`fadeIn`, `fadeInUp`)
- fondo global con doodles aleatorios en todo el sitio
- mezcla de texturas, glow, tarjetas y bloques con fondos alternados

## Inventario de componentes y observaciones

## 1. Navbar

Lo que existe:

- logo a la izquierda
- CTA simple a `/retos`
- fondo translucido con blur

Oportunidades:

- falta una arquitectura de navegacion mas completa
- el header no establece todavia una narrativa premium o editorial
- el CTA cumple, pero no construye jerarquia con el resto del hero

## 2. Hero

Lo que existe:

- propuesta de valor fuerte
- titular grande y agresivo
- glow y grid de fondo
- un CTA principal

Oportunidades:

- el hero depende mucho del tamano del titular y menos de una composicion de layout moderna
- falta un segundo nivel de contenido: prueba social, mockup, highlights, metrica o visual de producto
- hoy se siente mas como un bloque de texto impactante que como una apertura completa de producto

## 3. ComoFunciona

Lo que existe:

- explicacion en 3 pasos
- tarjetas limpias con iconos

Oportunidades:

- la informacion es clara, pero la seccion usa un patron muy conocido y poco distintivo
- falta tension visual, ritmo y variacion en layout

## 4. RetosDestacados

Lo que existe:

- reutiliza datos reales del producto
- cards con dificultad, duracion e iconografia

Oportunidades:

- es valiosa porque conecta la landing con el producto real
- visualmente aun parece mas una grilla funcional que una vitrina de marca
- conviene decidir si esta seccion sera catalogo, teaser o prueba de oferta

## 5. PorQueFunciona

Lo que existe:

- beneficios/razones del modelo
- formula final visual

Oportunidades:

- el mensaje es bueno, pero la composicion vuelve a apoyarse en un patron repetido de tres columnas
- falta elevar esta seccion a una pieza mas memorable o mas aspiracional

## 6. CTA final

Lo que existe:

- bloque fuerte con degradado
- cierre directo hacia conversion

Oportunidades:

- hoy funciona como CTA tradicional, pero no como remate estrategico de una landing premium
- podria beneficiarse de mas contexto, prueba, urgencia o diferenciacion

## 7. Footer

Lo que existe:

- footer minimo con logo y copy

Oportunidades:

- falta estructura institucional minima
- faltan enlaces utilitarios, contacto, legales o sello de confianza si el producto lo requiere

## Hallazgos principales

## Hallazgo 1. Ya hay base funcional, pero no un sistema de landing premium

La landing actual no esta mal como estructura inicial. El problema es que todavia se percibe como una suma de secciones correctas, no como una experiencia visual cohesionada de alto impacto.

## Hallazgo 2. La jerarquia tipografica necesita mas niveles

Hoy casi todas las secciones importantes compiten con titulares muy grandes en uppercase. Eso da fuerza, pero reduce contraste y refinamiento. Hace falta una jerarquia mas rica:

- titulares hero
- subtitulos editoriales
- labels pequenos
- texto de apoyo
- microcopy de conversion

## Hallazgo 3. El sistema de fondos esta compitiendo consigo mismo

Actualmente conviven:

- doodles globales
- textura de grid en hero
- glow central
- fondos alternados por seccion
- degradado en CTA

Esto puede generar ruido y restar sofisticacion. Conviene decidir una logica principal de fondos y dejar las demas como soporte, no como capas que compiten.

## Hallazgo 4. Los estilos inline frenan la evolucion del sistema visual

Hay mucho valor en la implementacion actual, pero al estar distribuida en estilos inline por componente, es mas dificil:

- consolidar tokens
- iterar rapido
- alinear todo con Stitch
- mantener consistencia entre landing y resto del producto

## Hallazgo 5. Hay problemas de codificacion de texto

Se observan cadenas con caracteres rotos como signos de apertura, vocales acentuadas mal codificadas y palabras que hoy aparecen con mojibake en varios textos de la landing.

Esto no se implementara en este turno, pero debe entrar en la siguiente fase de pulido porque afecta calidad percibida.

## Hallazgo 6. El fondo global con doodles debe reevaluarse

`DoodleBackground` envuelve toda la app. Puede ser parte de la identidad, pero tambien puede chocar con una direccion mas moderna y limpia basada en Stitch. Antes de redisenar, conviene decidir si:

- se elimina del landing y se conserva solo en areas secundarias
- se reduce su presencia
- se reemplaza por una textura mas controlada

## Direccion recomendada para la nueva landing

Tomando como base la existencia del proyecto `Pactados Modern Landing Page` en Stitch y el objetivo expresado por usted, la direccion recomendada es:

- mantener el tono desafiante y directo de Pactados
- elevar la interfaz hacia una estetica mas moderna, intencional y editorial
- usar mas composicion y menos dependencia de texto gigante
- construir un sistema de tarjetas, espaciado y fondos mas coherente
- conservar la energia de marca sin caer en saturacion visual

## Componentes a revisar en profundidad antes de implementar

Checklist de auditoria para el siguiente prompt:

- hero principal
- barra de navegacion
- modulo de prueba social o confianza
- seccion de como funciona
- seccion de retos destacados
- seccion de beneficios o diferenciadores
- CTA intermedio y CTA final
- footer
- tipografia global
- sistema de color
- superficies y tarjetas
- iconografia
- fondos y texturas
- motion y animaciones
- responsive mobile
- continuidad visual entre landing y vistas internas de retos

## Plan propuesto por fases

## Fase 1. Alinear la referencia visual

Objetivo:

- definir cual screen de Stitch sera la fuente principal para implementar

Entregables esperados:

- screen principal elegido
- decision sobre que partes de Stitch se respetan 1:1 y cuales se adaptan

## Fase 2. Auditoria de contenido e informacion

Objetivo:

- decidir que mensajes deben vivir en la landing y en que orden

Preguntas clave:

- la landing debe vender la idea, mostrar retos o ambas cosas con el mismo peso
- cual es el CTA principal real
- que objecion queremos resolver primero

## Fase 3. Definir sistema visual

Objetivo:

- traducir el look deseado a tokens reutilizables

Definiciones:

- paleta principal y acentos
- tipografias definitivas
- reglas de bordes y radios
- sombras
- espaciado
- tratamiento de fondos
- estilo de botones
- estilo de cards

## Fase 4. Redisenar layout de la landing

Objetivo:

- reorganizar la pagina como una narrativa de conversion mas fuerte

Trabajo esperado:

- decidir orden final de bloques
- decidir ancho de contenedores
- definir ritmo vertical
- introducir modulos mas distintivos

## Fase 5. Redisenar componentes

Objetivo:

- rehacer visualmente cada seccion importante con el nuevo sistema

Trabajo esperado:

- hero
- navegacion
- cards de retos
- bloques informativos
- CTA final
- footer

## Fase 6. Pulido de calidad percibida

Objetivo:

- subir el nivel final de la experiencia

Trabajo esperado:

- corregir textos con codificacion danada
- ajustar microcopy
- afinar transiciones y animaciones
- revisar responsive
- revisar consistencia con el resto del producto

## Fase 7. Expandir la mejora al resto de la UI

Objetivo:

- evitar que la landing quede moderna y el resto del producto desalineado

Areas a revisar despues:

- listado de retos
- detalle de reto
- formulario de registro
- flujo de creacion de reto
- inputs, selects, textareas y botones base

## Que necesito de su parte

Para que el siguiente prompt ya pueda enfocarse en ejecutar bien, necesito idealmente esto:

- confirmacion de cual screen de Stitch debemos tomar como base principal
- confirmacion de si la imagen adjunta y el proyecto de Stitch representan exactamente la misma direccion
- archivos de marca si existen: logo en SVG, variantes de logo, favicon final
- colores oficiales si ya estan definidos
- definicion de si mantenemos `Bebas Neue` y `DM Sans` o quiere explorar otro sistema tipografico
- referencias adicionales de sitios que le gusten
- definicion del objetivo principal de la landing:
  - captar registros
  - llevar a explorar retos
  - explicar el producto
  - construir confianza
- assets de apoyo si existen:
  - testimonios
  - metricas
  - mockups
  - capturas del producto
  - ilustraciones
  - partners o logos
  - preguntas frecuentes
- confirmacion de si desea que el resto de vistas internas empiece a alinearse con la nueva landing en la misma etapa o despues

## Installs o dependencias

Por ahora no parece necesario instalar nada adicional para hacer la fase de analisis y planificacion.

Lo que ya tenemos:

- Stitch MCP operativo
- stack frontend moderno
- componentes base suficientes para iterar

Lo que podria hacer falta despues, segun el alcance:

- assets exportados desde Stitch
- recursos graficos finales
- decisiones de branding mas cerradas

## Recomendacion para el siguiente prompt

En el siguiente prompt deberiamos hacer esto:

1. elegir el screen o screens exactos de Stitch que seran la base
2. definir el orden final de secciones
3. aterrizar el nuevo sistema visual
4. implementar primero la landing
5. despues propagar el lenguaje visual a las vistas internas

## Resumen ejecutivo

La buena noticia es que la base tecnica ya esta lista: Stitch funciona, el proyecto de referencia existe y la landing actual ya tiene componentes utiles. Lo que falta no es capacidad tecnica sino una traduccion mas disciplinada entre referencia visual, sistema de diseno y estructura de conversion.

El siguiente paso ideal no es improvisar CSS nuevo, sino usar Stitch como fuente de verdad, consolidar el sistema visual y redisenar la landing con un criterio mucho mas cohesionado.
