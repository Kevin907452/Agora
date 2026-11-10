import foto1 from "../assets/deberes.png";
import foto2 from "../assets/valores.png";
import foto3 from "../assets/historia.jpg";
import foto4 from "../assets/demypo.png";
import foto5 from "../assets/trespoderes.png";
import foto6 from "../assets/orga.png";

const materialOriginal = [
{
    id: 1,
    title: "Deberes ciudadanos",
    descripcion: "Conoce las responsabilidades y los deberes fundamentales que compartimos como ciudadanos en Costa Rica.",
    imagen: foto1,
    categoria: "Ciudadanía",
    topics: [
      {
        id: "deberes-1",
        title: "Cumplir leyes y constitución",
        type: "content",
        content: "En Costa Rica, el Estado de Derecho se sustenta en la Constitución Política de 1949 y el ordenamiento jurídico. Todo ciudadano tiene el deber ético y legal de acatar la Constitución y las leyes, ya que estas garantizan la convivencia pacífica, la justicia y el respeto a la institucionalidad democrática del país.",
        cards: [
          { 
            id: 1, 
            title: "Constitución Política", 
            frontText: "¿Por qué es la norma suprema?", 
            backText: "Porque regula la organización del Estado y establece los derechos y obligaciones de todos los habitantes." 
          },
          { 
            id: 2, 
            title: "Principio de Legalidad", 
            frontText: "¿Qué significa para la ciudadanía?", 
            backText: "Significa que ninguna persona está por encima de la ley y todos debemos cumplir las normas establecidas." 
          }
        ]
      },
      {
        id: "deberes-2",
        title: "Respeto a los derechos humanos",
        type: "content",
        content: "El respeto a la dignidad humana es un pilar fundamental en la sociedad costarricense. Los deberes ciudadanos implican no solo exigir derechos, sino también garantizar que no se vulneren los derechos de las demás personas, promoviendo la igualdad, la no discriminación y el apoyo de instituciones como la Sala Constitucional.",
        cards: [
          { 
            id: 1, 
            title: "Dignidad Humana", 
            frontText: "¿Cuál es el fundamento?", 
            backText: "Todo habitante de Costa Rica merece un trato respetuoso que garantice sus libertades básicas y su bienestar." 
          },
          { 
            id: 2, 
            title: "Convivencia Armónica", 
            frontText: "¿Cómo se practica?", 
            backText: "Reconociendo y respetando la diversidad de opiniones, culturas y formas de vida en el país." 
          }
        ]
      },
      {
        id: "quiz-deberes-1",
        title: "Quiz 1: Leyes, Constitución y Derechos",
        type: "quiz",
        quizId: 101,
        questions: [
          {
            id: 1,
            question: "¿Cuál es la norma suprema que rige el ordenamiento jurídico en Costa Rica?",
            options: [
              "El Reglamento Municipal",
              "La Constitución Política",
              "Los decretos de alcaldía",
              "El Código de Trabajo únicamente"
            ],
            correctAnswer: 1,
            explanation: "La Constitución Política es la ley fundamental del país a la cual deben subordinarse todas las demás normas."
          },
          {
            id: 2,
            question: "Además de exigir derechos, ¿qué implica el respeto a los derechos humanos como deber ciudadano?",
            options: [
              "Ignorar las leyes del país",
              "Garantizar que no se vulnere la dignidad y los derechos de los demás",
              "Evitar la convivencia en comunidad",
              "Participar únicamente en actividades privadas"
            ],
            correctAnswer: 1,
            explanation: "Los derechos humanos conllevan la responsabilidad ciudadana de respetar y proteger la dignidad de todas las personas."
          },
          {
            id: 3,
            question: "¿Qué institución en Costa Rica es la encargada principal de velar por la protección de los derechos fundamentales y la Constitución?",
            options: [
              "El Ministerio de Obras Públicas",
              "La Sala Constitucional (Sala IV)",
              "Un partido político",
              "El Registro Civil exclusivamente para multas"
            ],
            correctAnswer: 1,
            explanation: "La Sala Constitucional es el órgano del Poder Judicial encargado de garantizar la observancia de las normas constitucionales y los derechos fundamentales."
          }
        ]
      },
      {
        id: "deberes-3",
        title: "Cuido del ambiente y la comunidad",
        type: "content",
        content: "Costa Rica es reconocida a nivel mundial por su compromiso ambiental. Cuidar la naturaleza, proteger los recursos naturales, reciclar y participar activamente en el bienestar de la comunidad local son deberes cívicos indispensables para heredar un país sostenible a las futuras generaciones.",
        cards: [
          { 
            id: 1, 
            title: "Sostenibilidad", 
            frontText: "¿Por qué es un deber ciudadano?", 
            backText: "Porque el derecho a un ambiente sano, consagrado en la Constitución, exige la corresponsabilidad de todos en su protección." 
          },
          { 
            id: 2, 
            title: "Acción Comunal", 
            frontText: "¿Cómo impacta a la comunidad?", 
            backText: "A través del trabajo vecinal, el cuido de espacios públicos y la gestión responsable de residuos sólidos." 
          }
        ]
      },
      {
        id: "deberes-4",
        title: "Participar en la vida democrática",
        type: "content",
        content: "La democracia costarricense no se sostiene únicamente votando cada cuatro años. Requiere una ciudadanía activa que participe en procesos electorales, plebiscitos, cabildos abiertos municipales, rendición de cuentas y fiscalización del uso correcto de los fondos públicos.",
        cards: [
          { 
            id: 1, 
            title: "Ciudadanía Activa", 
            frontText: "¿Qué implica participar?", 
            backText: "Involucrarse en asuntos de interés público, debatir con argumentos e informarse responsablemente." 
          },
          { 
            id: 2, 
            title: "Mecanismos Ciudadanos", 
            frontText: "¿Qué herramientas existen?", 
            backText: "El sufragio, la consulta popular, la participación en partidos políticos y las asociaciones de desarrollo." 
          }
        ]
      },
      {
        id: "quiz-deberes-2",
        title: "Quiz 2: Ambiente y Participación Democrática",
        type: "quiz",
        quizId: 102,
        questions: [
          {
            id: 1,
            question: "¿Por qué se considera el cuido del ambiente como un deber ciudadano en Costa Rica?",
            options: [
              "Porque es una moda internacional sin base legal",
              "Porque el derecho a un ambiente sano exige la corresponsabilidad de proteger los recursos naturales",
              "Porque el gobierno se encarga de todo sin ayuda ciudadana",
              "Porque las leyes prohíben salir a la naturaleza"
            ],
            correctAnswer: 1,
            explanation: "La protección ambiental en Costa Rica es un compromiso compartido entre el Estado y los habitantes para asegurar el desarrollo sostenible."
          },
          {
            id: 2,
            question: "En una democracia participativa como la costarricense, ¿la participación ciudadana se limita únicamente a votar?",
            options: [
              "Sí, una vez electo el gobierno el ciudadano ya no debe involucrarse",
              "No, incluye la fiscalización, el diálogo comunitario y el uso de mecanismos de consulta",
              "Sí, la ley prohíbe opinar sobre política entre elecciones",
              "No, solo pueden opinar los diputados"
            ],
            correctAnswer: 1,
            explanation: "La democracia costarricense fomenta una ciudadanía activa que va más allá del sufragio, abarcando el control político y comunitario."
          },
          {
            id: 3,
            question: "¿Cuál de las siguientes opciones representa una forma de participación en la vida democrática local?",
            options: [
              "Ignorar los problemas del cantón",
              "Destruir los espacios públicos",
              "Participar en asociaciones de desarrollo o cabildos municipales",
              "Desentenderse de las decisiones de la comunidad"
            ],
            correctAnswer: 2,
            explanation: "Las asociaciones de desarrollo y los cabildos abiertos son canales directos para que la ciudadanía incida en el bienestar local."
          }
        ]
      }
    ]
  },
 {
    id: 2,
    title: "Valores ciudadanos",
    descripcion: "Descubre los valores democráticos esenciales para la convivencia armónica, el respeto mutuo y el desarrollo social en Costa Rica.",
    imagen: foto2, // Asegúrate de mantener tu importación de imagen para valores
    categoria: "Ciudadanía",
    topics: [
      {
        id: "valores-respeto",
        title: "El Respeto",
        type: "content",
        content: "El respeto es la base fundamental de toda sociedad democrática. En Costa Rica, implica reconocer la dignidad, los derechos y las diferencias de todas las personas, permitiendo una convivencia pacífica donde se rechaza cualquier forma de discriminación o imposición autoritaria.",
        cards: [
          { 
            id: 1, 
            title: "Reconocimiento del Otro", 
            frontText: "¿Qué implica?", 
            backText: "Valorar la opinión y la existencia de los demás aunque no se piense igual." 
          },
          { 
            id: 2, 
            title: "Tolerancia Activa", 
            frontText: "¿Cómo se aplica en la comunidad?", 
            backText: "Aceptando la pluralidad cultural y social que enriquece al país." 
          }
        ]
      },
      {
        id: "valores-igualdad",
        title: "La Igualdad",
        type: "content",
        content: "La igualdad ciudadana establece que todas las personas tienen los mismos derechos y obligaciones ante la ley, sin privilegios ni discriminaciones. En la democracia costarricense, este valor busca garantizar equidad de oportunidades en educación, salud y participación social.",
        cards: [
          { 
            id: 1, 
            title: "Igualdad ante la Ley", 
            frontText: "¿Qué garantiza?", 
            backText: "Que ningún habitante esté por encima de las normas jurídicas del país." 
          },
          { 
            id: 2, 
            title: "Equidad de Oportunidades", 
            frontText: "¿Cuál es su objetivo?", 
            backText: "Reducir brechas sociales para que todos puedan desarrollarse plenamente." 
          }
        ]
      },
      {
        id: "valores-libertad",
        title: "La Libertad",
        type: "content",
        content: "La libertad es un derecho y un valor supremo garantizado por la Constitución Política de Costa Rica. Comprende la libertad de expresión, de tránsito, de reunión, de culto y el derecho a elegir y ser elegido, siempre enmarcada en el respeto a las leyes y los derechos de los demás.",
        cards: [
          { 
            id: 1, 
            title: "Libertad de Expresión", 
            frontText: "¿Por qué es vital?", 
            backText: "Permite el debate libre de ideas y el ejercicio de una opinión pública informada." 
          },
          { 
            id: 2, 
            title: "Libertades Civiles", 
            frontText: "¿Qué protegen?", 
            backText: "Las decisiones autónomas de los ciudadanos dentro de un marco de respeto democrático." 
          }
        ]
      },
      {
        id: "valores-solidaridad",
        title: "La Solidaridad",
        type: "content",
        content: "La solidaridad es un sello distintivo de la sociedad costarricense. Se manifiesta en el apoyo mutuo, la cooperación comunitaria y el respaldo a los sectores más vulnerables a través de políticas públicas de bienestar social, seguridad social y ayuda humanitaria.",
        cards: [
          { 
            id: 1, 
            title: "Bien Común", 
            frontText: "¿Qué busca?", 
            backText: "Priorizar el bienestar de toda la comunidad por encima del individualismo." 
          },
          { 
            id: 2, 
            title: "Seguridad Social", 
            frontText: "¿Cómo se refleja?", 
            backText: "En sistemas solidarios como la salud y la educación pública universal." 
          }
        ]
      },
      {
        id: "valores-pluralismo",
        title: "El Pluralismo",
        type: "content",
        content: "El pluralismo reconoce y estimula la diversidad de opiniones, corrientes políticas, creencias religiosas e ideologías en una sociedad. En Costa Rica, permite que diferentes partidos políticos y grupos sociales compitan pacíficamente y participen en la toma de decisiones.",
        cards: [
          { 
            id: 1, 
            title: "Diversidad de Ideas", 
            frontText: "¿Por qué fortalece al Estado?", 
            backText: "Porque evita el pensamiento único y fomenta la construcción de acuerdos mediante el diálogo." 
          }
        ]
      },
      {
        id: "valores-empatia",
        title: "La Empatía",
        type: "content",
        content: "La empatía es la capacidad de ponerse en el lugar del otro, comprender sus necesidades y sentir sus realidades. Ciudadanos empáticos construyen comunidades más inclusivas, comprensivas y dispuestas a colaborar ante las dificultades colectivas.",
        cards: [
          { 
            id: 1, 
            title: "Escucha Activa", 
            frontText: "¿Cómo se demuestra?", 
            backText: "Atendiendo las perspectivas de los demás con apertura y sin prejuicios." 
          }
        ]
      },
      {
        id: "quiz-valores",
        title: "Quiz: Valores Ciudadanos y Democráticos",
        type: "quiz",
        quizId: 201, // ID único para el quiz del módulo de valores
        questions: [
          {
            id: 1,
            question: "¿Qué significa el principio de igualdad ante la ley en Costa Rica?",
            options: [
              "Que algunas personas tienen privilegios especiales según su estatus",
              "Que todos los habitantes tienen los mismos derechos y deberes sin discriminación",
              "Que las leyes cambian dependiendo de quién las cumpla",
              "Que la ley solo aplica para los funcionarios públicos"
            ],
            correctAnswer: 1,
            explanation: "La igualdad garantiza que las normas jurídicas apliquen por igual para todos los habitantes del país."
          },
          {
            id: 2,
            question: "¿Cómo se refleja el valor de la solidaridad en la historia y sociedad de Costa Rica?",
            options: [
              "A través del individualismo estricto en las comunidades",
              "Mediante instituciones y sistemas de bienestar social universales como la salud y educación",
              "Eliminando la ayuda humanitaria",
              "Prohibiendo la cooperación vecinal"
            ],
            correctAnswer: 1,
            explanation: "La solidaridad costarricense se institucionaliza a través de redes de apoyo social y sistemas públicos universales."
          },
          {
            id: 3,
            question: "¿Por qué es importante el pluralismo en una democracia?",
            options: [
              "Porque impone una sola ideología oficial obligatoria",
              "Porque permite la coexistencia pacífica y la participación de diversas ideas y corrientes de pensamiento",
              "Porque elimina la necesidad de elecciones",
              "Porque evita que los ciudadanos opinen"
            ],
            correctAnswer: 1,
            explanation: "El pluralismo fomenta la diversidad y asegura que diferentes sectores sociales estén representados y sean escuchados."
          }
        ]
      }
    ]
  },

{
    id: 3,
    title: "Historia de la democracia en Costa Rica",
    descripcion: "Un recorrido por los acontecimientos, reformas e hitos históricos clave que forjaron la identidad democrática costarricense.",
    imagen: foto3,
    categoria: "Historia",
    topics: [

      {
        id: "historia-independencia",
        title: "La Independencia y los inicios",
        type: "content",
        content: "La historia democrática de Costa Rica comienza a gestarse tras la independencia de Centroamérica en 1821. A diferencia de otras naciones marcadas por largos conflictos armados tras su emancipación, Costa Rica buscó construir un sistema basado en el civismo, la educación y la participación ciudadana progresiva.",
        cards: [
          { 
            id: 1, 
            title: "Año 1821", 
            frontText: "¿Qué significó?", 
            backText: "El inicio de la vida republicana independiente y la construcción soberana de las instituciones patrias." 
          }
        ]
      },


      {
        id: "historia-1889",
        title: "Día de la Democracia: 7 de noviembre de 1889",
        type: "content",
        content: "El 7 de noviembre de 1889 se considera un hito fundacional de la democracia costarricense. Ese día, el pueblo salió cívicamente a las calles para defender el respeto a la voluntad popular en las urnas frente a intentos de irrespeto institucional, consolidando la tradición civilista del país.",
        cards: [
          { 
            id: 1, 
            title: "Defensa Cívica", 
            frontText: "¿Por qué es tan relevante?", 
            backText: "Porque demostró que la ciudadanía estaba dispuesta a defender el sufragio y el orden constitucional pacíficamente." 
          }
        ]
      },

      {
        id: "historia-voto-directo",
        title: "Consolidación del voto directo y secreto",
        type: "content",
        content: "Durante décadas el sufragio fue indirecto (a través de electores). Las reformas electorales posteriores eliminaron este filtro para garantizar que cada ciudadano emitiera su voto de manera directa y secreta, protegiendo al elector de presiones externas y asegurando elecciones transparentes.",
        cards: [
          { 
            id: 1, 
            title: "Voto Secreto", 
            frontText: "¿Qué impacto tuvo?", 
            backText: "Garantizó la absoluta libertad de conciencia del votante dentro de la urna electoral." 
          }
        ]
      },


      {
        id: "quiz-historia-1",
        title: "Quiz",
        type: "quiz",
        quizId: 301,
        questions: [
          {
            id: 1,
            question: "¿Qué acontecimiento histórico se conmemora en Costa Rica cada 7 de noviembre de 1889?",
            options: [
              "La independencia de Centroamérica",
              "La defensa cívica de la voluntad popular y el respeto al sufragio",
              "La abolición del ejército",
              "La creación del voto femenino"
            ],
            correctAnswer: 1,
            explanation: "El 7 de noviembre de 1889 simboliza la defensa histórica del sistema democrático y el respeto a las urnas."
          },
          {
            id: 2,
            question: "¿Cuál fue la principal ventaja de implementar el voto secreto en Costa Rica?",
            options: [
              "Permitió que las elecciones fueran públicas para todos",
              "Garantizó la libertad de conciencia del elector protegiéndolo de presiones externas",
              "Obligó a los partidos a no hacer propaganda",
              "Eliminó el conteo de papeletas"
            ],
            correctAnswer: 1,
            explanation: "El voto secreto protege la privacidad del elector para que decida libremente sin intimidación."
          },
          {
            id: 3,
            question: "A diferencia de otras naciones de la región, ¿cuál fue una característica distintiva de Costa Rica tras su independencia en 1821?",
            options: [
              "El desarrollo de guerras civiles constantes",
              "La construcción de una tradición civilista enfocada en la educación y la paz",
              "La imposición de un gobierno militar definitivo",
              "La renuncia absoluta a redactar constituciones"
            ],
            correctAnswer: 1,
            explanation: "Costa Rica priorizó las soluciones cívicas, la institucionalidad y la educación sobre el militarismo."
          }
        ]
      },


      {
        id: "historia-voto-femenino",
        title: "El Voto Femenino",
        type: "content",
        content: "La Constitución Política de 1949 consagró uno de los avances más transformadores en la historia de Costa Rica: el derecho al sufragio para las mujeres. Gracias a la incansable lucha de valientes lideresas y sufragistas costarricenses, la democracia se hizo verdaderamente universal e inclusiva, permitiendo por primera vez que las mujeres votaran y fueran electas en los comicios de 1953, marcando un antes y un después en la equidad social del país.",
        cards: [
          { 
            id: 1, 
            title: "Universalidad", 
            frontText: "¿Por qué cambió la historia?", 
            backText: "Porque integró a más de la mitad de la población en la toma de decisiones políticas del Estado." 
          },
          { 
            id: 2, 
            title: "Lucha Sufragista", 
            frontText: "¿Quiénes lo impulsaron?", 
            backText: "Mujeres visionarias que exigieron igualdad de derechos civiles y políticos ante la Asamblea Constituyente." 
          }
        ]
      },

      {
        id: "historia-constitucion-1949",
        title: "La Constitución Política de 1949",
        type: "content",
        content: "Promulgada tras los acontecimientos de 1948, la Constitución Política de 1949 es la piedra angular del Estado democrático moderno en Costa Rica. Abolió el ejército, creó el Tribunal Supremo de Elecciones (TSE) como un cuarto poder independiente y blindó las garantías sociales y de derechos humanos.",
        cards: [
          { 
            id: 1, 
            title: "Abolición del Ejército", 
            frontText: "¿Cuál fue su legado?", 
            backText: "Destinar los recursos militares a la educación, la salud y la paz social del país." 
          }
        ]
      },

      {
        id: "historia-sala-constitucional",
        title: "Creación de la Sala Constitucional",
        type: "content",
        content: "Conocida popularmente como la 'Sala IV', fue creada en 1989 dentro del Poder Judicial. Su objetivo principal es velar por la defensa de la Constitución y proteger de manera directa los derechos fundamentales de los habitantes mediante recursos sencillos como el Hábeas Corpus y el Recurso de Amparo.",
        cards: [
          { 
            id: 1, 
            title: "Defensa de Derechos", 
            frontText: "¿Qué herramientas brinda al ciudadano?", 
            backText: "El recurso de amparo y de hábeas corpus para frenar abusos de poder o violaciones a libertades." 
          }
        ]
      },

      {
        id: "quiz-historia-2",
        title: "Quiz 2: Voto Femenino e Institucionalidad",
        type: "quiz",
        quizId: 302,
        questions: [
          {
            id: 1,
            question: "¿Qué transformador derecho político consagró la Constitución Política de 1949 en favor de las mujeres?",
            options: [
              "El derecho exclusivo a ocupar cargos militares",
              "El derecho al sufragio (voto) y a la participación política",
              "La obligación de eximirse de pagar impuestos",
              "La prohibición de trabajar en el sector público"
            ],
            correctAnswer: 1,
            explanation: "La Constitución de 1949 otorgó a las mujeres el derecho al voto, convirtiendo la democracia en un sistema universal."
          },
          {
            id: 2,
            question: "Además de abolir el ejército, ¿qué importante órgano con rango constitucional creó la Constitución de 1949 para velar por las elecciones?",
            options: [
              "El Ministerio de Hacienda",
              "El Tribunal Supremo de Elecciones (TSE)",
              "La Asamblea Legislativa únicamente",
              "El Consejo Municipal de Alajuela"
            ],
            correctAnswer: 1,
            explanation: "El TSE fue creado con independencia de poderes para garantizar la pureza y transparencia del sufragio."
          },
          {
            id: 3,
            question: "¿Cuál es la función principal de la Sala Constitucional (Sala IV), creada en 1989?",
            options: [
              "Organizar y dirigir el conteo de votos presidenciales",
              "Velar por la protección de la Constitución y los derechos fundamentales de los ciudadanos",
              "Crear leyes de presupuesto nacional",
              "Aprobar la emisión de pasaportes"
            ],
            correctAnswer: 1,
            explanation: "La Sala Constitucional es el órgano encargado de velar por el respeto de los derechos fundamentales y la norma constitucional."
          }
        ]
      }
    ]
  },

{
    id: 4,
    title: "Por qué la democracia y la política son importantes",
    descripcion: "Comprende la relevancia social de la política y el sistema democrático como herramientas para la paz, la justicia y el bienestar común en Costa Rica.",
    imagen: foto4, // Mantén la importación de tu imagen para el Módulo 4
    categoria: "Democracia y Política",
    topics: [
      // 1. PRIMER TEMA DE CONTENIDO
      {
        id: "demo-gestion-publica",
        title: "Gestión de asuntos públicos",
        type: "content",
        content: "La política es el mecanismo mediante el cual la sociedad organiza la toma de decisiones colectivas. En Costa Rica, permite gestionar los recursos públicos para responder a necesidades sociales indispensables como la salud, la educación, la infraestructura y la seguridad comunitaria.",
        cards: [
          { 
            id: 1, 
            title: "Bienestar General", 
            frontText: "¿Cuál es el objetivo principal?", 
            backText: "Administrar los recursos del país para asegurar la calidad de vida de todos sus habitantes." 
          },
          { 
            id: 2, 
            title: "Toma de Decisiones", 
            frontText: "¿Cómo influye la política?", 
            backText: "Permite definir prioridades nacionales a través de leyes, presupuestos y políticas públicas." 
          }
        ]
      },

      // 2. SEGUNDO TEMA DE CONTENIDO
      {
        id: "demo-representacion",
        title: "Representación de diferentes voces y perspectivas",
        type: "content",
        content: "En un país diverso como Costa Rica, la democracia asegura que distintos grupos sociales, regiones y visiones del mundo tengan voz e incidencia política a través de diputados, concejos municipales y organizaciones de la sociedad civil.",
        cards: [
          { 
            id: 1, 
            title: "Representatividad", 
            frontText: "¿Qué garantiza el voto?", 
            backText: "Que las comunidades y minorías elijan representantes que lleven sus necesidades al debate nacional." 
          },
          { 
            id: 2, 
            title: "Inclusión Social", 
            frontText: "¿Por qué es clave?", 
            backText: "Porque evita la marginación e integra múltiples opiniones en la construcción del país." 
          }
        ]
      },

      // 3. TERCER TEMA DE CONTENIDO
      {
        id: "demo-poder-pueblo",
        title: "El poder del pueblo",
        type: "content",
        content: "La democracia radica en la soberanía popular: el poder supremo pertenece a la ciudadanía. En Costa Rica, este poder se ejerce no solo al votar periódicamente, sino al fiscalizar a las autoridades y participar en cabildos, referentes comunitarios e iniciativa ciudadana.",
        cards: [
          { 
            id: 1, 
            title: "Soberanía Popular", 
            frontText: "¿En quién reside el poder?", 
            backText: "En el pueblo, de quien emanan las potestades de los gobernantes y las leyes." 
          }
        ]
      },

      {
        id: "quiz-demo-1",
        title: "Quiz 1: Asuntos Públicos",
        type: "quiz",
        quizId: 401,
        questions: [
          {
            id: 1,
            question: "¿Cuál es la función esencial de la política en la gestión de asuntos públicos?",
            options: [
              "Beneficiar únicamente a los partidos políticos electos",
              "Organizar la toma de decisiones y administrar recursos para el bienestar social de la comunidad",
              "Eliminar los impuestos y servicios públicos",
              "Impedir la participación de los ciudadanos"
            ],
            correctAnswer: 1,
            explanation: "La política permite administrar colectivamente los bienes y servicios esenciales del país."
          },
          {
            id: 2,
            question: "¿En quién reside la soberanía en el sistema democrático costarricense?",
            options: [
              "En los diputados exclusivamente",
              "En el pueblo",
              "En las empresas privadas",
              "En los organismos internacionales"
            ],
            correctAnswer: 1,
            explanation: "La Constitución establece que la soberanía reside fundamentalmente en el pueblo."
          },
          {
            id: 3,
            question: "¿Por qué la representación de diferentes voces fortalece a la sociedad?",
            options: [
              "Porque asegura que solo una visión del mundo sea escuchada",
              "Porque promueve la inclusión y evita la marginación de sectores diversos",
              "Porque retrasa la aprobación de proyectos",
              "Porque prohíbe el debate público"
            ],
            correctAnswer: 1,
            explanation: "La representación pluralista integra a diversos grupos en las decisiones nacionales."
          }
        ]
      },


      {
        id: "demo-derechos-humanos",
        title: "Protección de los derechos humanos",
        type: "content",
        content: "El valor de un sistema democrático radica en su capacidad de salvaguardar la vida, la libertad, la integridad y el bienestar de cada ser humano. En Costa Rica, las instituciones democráticas velan activamente por el cumplimiento de las garantías fundamentales.",
        cards: [
          { 
            id: 1, 
            title: "Garantías Fundamentales", 
            frontText: "¿Qué se protege?", 
            backText: "Derechos civiles, políticos, económicos, sociales y ambientales indispensables." 
          }
        ]
      },

  
      {
        id: "demo-estado-derecho",
        title: "Estado de derecho e igualdad ante la ley",
        type: "content",
        content: "Bajo el Estado de Derecho, todas las personas e instituciones (incluidos los gobernantes) están sujetas a la ley. Nadie está por encima del marco constitucional y jurídico, garantizando la justicia imparcial y la certidumbre social.",
        cards: [
          { 
            id: 1, 
            title: "Principio de Legalidad", 
            frontText: "¿Qué exige?", 
            backText: "Que las autoridades actúen estrictamente dentro de lo que la ley les autoriza." 
          }
        ]
      },

      {
        id: "demo-transparencia-crisis",
        title: "Transparencia y prevención de crisis",
        type: "content",
        content: "La rendición de cuentas, la transparencia institucional y la libertad de prensa son salvaguardas que previenen la corrupción. La democracia ofrece vías pacíficas e institucionales para resolver conflictos sociales antes de que deriven en crisis graves.",
        cards: [
          { 
            id: 1, 
            title: "Rendición de Cuentas", 
            frontText: "¿Por qué es necesaria?", 
            backText: "Porque el ciudadano tiene derecho a conocer cómo se usan los fondos y recursos públicos." 
          },
          { 
            id: 2, 
            title: "Paz Social", 
            frontText: "¿Cómo previene crisis?", 
            backText: "Ofreciendo el diálogo, la negociación y el voto como canales de resoluciónPacífica." 
          }
        ]
      },


      {
        id: "quiz-demo-2",
        title: "Quiz 2: Derechos, Estado de Derecho y Transparencia",
        type: "quiz",
        quizId: 402,
        questions: [
          {
            id: 1,
            question: "¿Qué postula el principio del Estado de Derecho en una democracia?",
            options: [
              "Que el presidente puede ignorar la ley si lo considera necesario",
              "Que todas las personas e instituciones están sujetas y subordinadas a la ley",
              "Que las leyes se aplican solo a la oposición política",
              "Que las normas cambian a diario sin aviso"
            ],
            correctAnswer: 1,
            explanation: "El Estado de Derecho impone la supremacía de la ley por igual para gobernantes y ciudadanos."
          },
          {
            id: 2,
            question: "¿De qué manera contribuye la transparencia a la prevención de crisis sociales?",
            options: [
              "Ocultando la información pública",
              "Fomentando la rendición de cuentas y resolviendo conflictos pacíficamente mediante el diálogo",
              "Prohibiendo la fiscalización de los recursos públicas",
              "Suspendiendo las garantias constitucionales"
            ],
            correctAnswer: 1,
            explanation: "La transparencia genera confianza institucional y ofrece vías pacíficas para resolver diferencias."
          },
          {
            id: 3,
            question: "¿Por qué las instituciones democráticas están obligadas a proteger los derechos humanos?",
            options: [
              "Porque la dignidad humana es la base fundamental que da legitimidad a la democracia",
              "Porque es una medida opcional de cada gobierno",
              "Porque solo aplica para extranjeros",
              "Porque lo exige el mercado económico"
            ],
            correctAnswer: 0,
            explanation: "Sin el respeto a la dignidad y a los derechos humanos la democracia pierde su razón de ser."
          }
        ]
      }
    ]
  },

{
    id: 5,
    title: "Funcionamiento de los tres poderes",
    descripcion: "Aprende cómo se divide y equilibra el poder en Costa Rica a través de los Poderes Ejecutivo, Legislativo y Judicial.",
    imagen: foto5, // Mantén la importación de tu imagen para el Módulo 5
    categoria: "Estructura del Estado",
    topics: [
      // 1. PRIMER TEMA: PODER EJECUTIVO
      {
        id: "poderes-ejecutivo",
        title: "El Poder Ejecutivo",
        type: "content",
        content: "El Poder Ejecutivo se encarga de administrar el Estado, ejecutar las leyes y dirigir la política pública del país. En Costa Rica está integrado por el Presidente de la República, dos Vicepresidentes y los Ministros de Gobierno. Se administra principalmente desde la Casa Presidencial (ubicada en Zapote, San José) y las sedes de cada Ministerio (como el Ministerio de Educación Pública, Salud, Hacienda, entre otros). Su importancia radica en garantizar la prestación de servicios públicos, velar por la seguridad nacional y gestionar el presupuesto del país.",
        cards: [
          { 
            id: 1, 
            title: "¿Quiénes lo integran?", 
            frontText: "Composición", 
            backText: "El Presidente de la República, el Primer y Segundo Vicepresidente, y los Ministros de Estado." 
          },
          { 
            id: 2, 
            title: "Sede principal", 
            frontText: "¿Dónde se maneja?", 
            backText: "Casa Presidencial (Zapote, San José) y los diversos ministerios e instituciones ejecutivas." 
          },
          { 
            id: 3, 
            title: "Funciones e Importancia", 
            frontText: "¿Cuál es su labor?", 
            backText: "Ejecutar y hacer cumplir las leyes, administrar los recursos públicos y reglamentar las políticas nacionales." 
          }
        ]
      },

      // 2. SEGUNDO TEMA: PODER LEGISLATIVO
      {
        id: "poderes-legislativo",
        title: "El Poder Legislativo",
        type: "content",
        content: "El Poder Legislativo es el órgano encargado de crear, reformar y derogar las leyes del país, además de fiscalizar las acciones del Poder Ejecutivo. Está integrado por 57 Diputadas y Diputados electos por votación popular directa cada cuatro años. Su institución representativa es la Asamblea Legislativa de la República de Costa Rica, ubicada en el edificio legislativo en Cuesta de Moras, San José. Su importancia es fundamental, ya que en él reside la representación de todas las provincias y fuerzas políticas del país para debatir y aprobar el presupuesto nacional, los impuestos y los marcos legales.",
        cards: [
          { 
            id: 1, 
            title: "¿Quiénes lo integran?", 
            frontText: "Composición", 
            backText: "57 Diputados y Diputadas elegidos por representación provincial cada 4 años." 
          },
          { 
            id: 2, 
            title: "Sede e Institución", 
            frontText: "¿Dónde se ubica?", 
            backText: "La Asamblea Legislativa de Costa Rica (Cuesta de Moras, San José)." 
          },
          { 
            id: 3, 
            title: "Funciones e Importancia", 
            frontText: "¿Cuál es su labor?", 
            backText: "Discutir y aprobar leyes, aprobar el Presupuesto Nacional y ejercer control político sobre el gobierno." 
          }
        ]
      },

      // 📝 3. PRIMER QUIZ (EN EL MEDIO)
      {
        id: "quiz-poderes-1",
        title: "Quiz 1: Poder Ejecutivo y Poder Legislativo",
        type: "quiz",
        quizId: 501,
        questions: [
          {
            id: 1,
            question: "¿Quiénes integran principalmente el Poder Ejecutivo en Costa Rica?",
            options: [
              "Los 57 diputados de la República",
              "El Presidente, los dos Vicepresidentes y los Ministros de Estado",
              "Los Magistrados de la Corte Suprema",
              "Los Alcaldes de los cantones"
            ],
            correctAnswer: 1,
            explanation: "El Poder Ejecutivo lo conforman el Presidente, sus vicepresidentes y el gabinete de ministros."
          },
          {
            id: 2,
            question: "¿Cuántos Diputados integran la Asamblea Legislativa de Costa Rica y dónde se ubica su sede principal?",
            options: [
              "100 diputados en Zapote",
              "57 diputados en la Asamblea Legislativa (Cuesta de Moras, San José)",
              "81 diputados en la Corte Suprema de Justicia",
              "50 diputados en el Tribunal Supremo de Elecciones"
            ],
            correctAnswer: 1,
            explanation: "El Poder Legislativo lo componen 57 diputados y opera en la Asamblea Legislativa en Cuesta de Moras."
          },
          {
            id: 3,
            question: "¿Cuál de las siguientes es una función clave del Poder Legislativo?",
            options: [
              "Reglamentar y ejecutar la construcción de carreteras",
              "Debatir, redactar y aprobar las leyes del país y el Presupuesto Nacional",
              "Dictar sentencias de prisión para delitos penales",
              "Administrar los hospitales públicos"
            ],
            correctAnswer: 1,
            explanation: "La función primaria de los diputados en la Asamblea Legislativa es legislar y fiscalizar el presupuesto del Estado."
          }
        ]
      },

      // 4. TERCER TEMA: PODER JUDICIAL
      {
        id: "poderes-judicial",
        title: "El Poder Judicial",
        type: "content",
        content: "El Poder Judicial se encarga de administrar justicia, interpretar y hacer cumplir las leyes en los casos concretos, garantizando los derechos de todos los habitantes. Está integrado por los Magistrados de las cuatro Salas de la Corte Suprema de Justicia (incluyendo la Sala Constitucional o Sala IV), Jueces, Fiscales del Ministerio Público y Defensores Públicos. Se maneja institucionalmente desde la Corte Suprema de Justicia y los Tribunales de Justicia ubicados en los Tribunales del Primer Circuito Judicial en San José y juzgados de todo el país. Su importancia es esencial para mantener la paz social, resolver conflictos entre particulares o el Estado, y proteger los derechos fundamentales frente a abusos de poder.",
        cards: [
          { 
            id: 1, 
            title: "¿Quiénes lo integran?", 
            frontText: "Composición", 
            backText: "Magistrados(as) de la Corte Suprema, Jueces, Fiscales del Ministerio Público y Defensores." 
          },
          { 
            id: 2, 
            title: "Sedes e Instituciones", 
            frontText: "¿Dónde se maneja?", 
            backText: "Corte Suprema de Justicia (Barrio González Lahmann, San José) y Tribunales de todo el país." 
          },
          { 
            id: 3, 
            title: "Funciones e Importancia", 
            frontText: "¿Cuál es su labor?", 
            backText: "Juzgar y hacer ejecutar lo juzgado, resolver litigios con imparcialidad y tutelar los derechos fundamentales." 
          }
        ]
      },

      // 📝 5. SEGUNDO QUIZ (AL FINAL)
      {
        id: "quiz-poderes-2",
        title: "Quiz 2: El Poder Judicial y el Equilibrio de Poderes",
        type: "quiz",
        quizId: 502,
        questions: [
          {
            id: 1,
            question: "¿Cuál es la función principal del Poder Judicial en la democracia costarricense?",
            options: [
              "Aprobar proyectos de ley y reformas a los impuestos",
              "Administrar justicia, resolver conflictos de forma imparcial y hacer cumplir las leyes",
              "Dirigir la política exterior y nombrar embajadores",
              "Organizar los comicios electorales"
            ],
            correctAnswer: 1,
            explanation: "El Poder Judicial se encarga exclusivamente de juzgar y aplicar las leyes de forma independiente e imparcial."
          },
          {
            id: 2,
            question: "¿Dónde se ubica la sede principal de la Corte Suprema de Justicia?",
            options: [
              "En la Casa Presidencial en Zapote",
              "En la Corte Suprema de Justicia (Primer Circuito Judicial, San José)",
              "En el Tribunal Supremo de Elecciones",
              "En el Parque Central de Heredia"
            ],
            correctAnswer: 1,
            explanation: "La Corte Suprema de Justicia se ubica en el circuito judicial del barrio González Lahmann en San José."
          },
          {
            id: 3,
            question: "¿Por qué es vital la independencia y división entre los tres poderes del Estado?",
            options: [
              "Para evitar que una sola persona o grupo concentre el poder absoluto y se vulneren los derechos de la ciudadanía",
              "Para acelerar la compra de vehículos del Estado",
              "Porque la ley prohíbe que los poderes tengan comunicación",
              "Para aumentar el costo de las elecciones"
            ],
            correctAnswer: 0,
            explanation: "La separación de poderes garantiza un sistema de pesos y contrapesos que protege la libertad y el Estado de Derecho."
          }
        ]
      }
    ]
  },

  
 {
    id: 6,
    title: "Organización del gobierno",
    descripcion: "Conoce cómo se organiza el gobierno costarricense, cómo se eligen sus miembros, la ética del servicio público y la red del sector público descentralizado.",
    imagen: foto6, // Mantén la importación de tu imagen para el Módulo 6
    categoria: "Estructura del Estado",
    topics: [
      // 1. PRIMER TEMA: MIEMBROS Y ELECCIÓN DEL GOBIERNO
      {
        id: "gobierno-miembros-eleccion",
        title: "Miembros del Gobierno y cómo se eligen",
        type: "content",
        content: "El gobierno costarricense está compuesto por autoridades electas por el pueblo y por funcionarios nombrados constitucionalmente. El Presidente, las Vicepresidencias, los Diputados y los Alcaldes Municipales son elegidos mediante el voto directo, libre y secreto de la ciudadanía en elecciones nacionales y municipales organizadas con absoluta transparencia por el Tribunal Supremo de Elecciones (TSE). Los Ministros y Presidentes Ejecutivos son designados directamente por la Presidencia de la República.",
        cards: [
          { 
            id: 1, 
            title: "Elecciones Populares", 
            frontText: "¿Cómo se eligen los representantes?", 
            backText: "Mediante el sufragio universal en procesos electorales dirigidos imparcialmente por el TSE." 
          },
          { 
            id: 2, 
            title: "Gabinete y Ministros", 
            frontText: "¿Cómo son designados?", 
            backText: "Son nombrados libremente por el Presidente de la República para liderar las carteras gubernamentales." 
          }
        ]
      },

      // 2. SEGUNDO TEMA: EL SERVICIO AL PUEBLO
      {
        id: "gobierno-servicio-pueblo",
        title: "Gobernar para el pueblo: El deber de servir",
        type: "content",
        content: "Un principio ético y legal supremo de la democracia costarricense es que el Presidente y todo el gobierno siempre deben velar por el bienestar general del pueblo y trabajar para él, nunca al revés. El ejercicio del poder público no debe de otrogar privilegios personales ni soberanía absoluta a los gobernantes; son simples depositarios de la autoridad otorgada por la ciudadanía y están legalmente obligados a rendir cuentas de sus actos de forma transparente.",
        cards: [
          { 
            id: 1, 
            title: "Servidores Públicos", 
            frontText: "¿Cuál es el rol del gobernante?", 
            backText: "Actuar como servidores y administradores temporales al servicio estricto del bien común." 
          },
          { 
            id: 2, 
            title: "Rendición de Cuentas", 
            frontText: "¿Por qué es obligatoria?", 
            backText: "Porque el poder emana del pueblo y la ciudadanía tiene derecho a fiscalizar el uso de los fondos públicos." 
          }
        ]
      },

      // 📝 3. PRIMER QUIZ (EN EL MEDIO)
      {
        id: "quiz-gobierno-1",
        title: "Quiz 1: Elección de Autoridades y Ética Gubernamental",
        type: "quiz",
        quizId: 601,
        questions: [
          {
            id: 1,
            question: "¿Quién es el órgano encargado de organizar de manera transparente e imparcial las elecciones en Costa Rica?",
            options: [
              "El Ministerio de Hacienda",
              "El Tribunal Supremo de Elecciones (TSE)",
              "La Asamblea Legislativa",
              "La Presidencia de la República"
            ],
            correctAnswer: 1,
            explanation: "El TSE es el órgano independiente con rango constitucional encargado de organizar y arbitrar los comicios electorales."
          },
          {
            id: 2,
            question: "En una democracia costarricense, ¿cuál debe ser la relación primordial entre los gobernantes y la ciudadanía?",
            options: [
              "El pueblo debe someterse sin cuestionar a los deseos del gobernante",
              "El Presidente y el gobierno deben velar por el bienestar del pueblo y trabajar para él",
              "Los gobernantes pueden utilizar los recursos públicos para beneficio personal",
              "El gobierno solo debe responder ante las empresas privadas"
            ],
            correctAnswer: 1,
            explanation: "Los gobernantes son depositarios de la autoridad y su deber ético supremo es servir de forma transparente al bienestar del pueblo."
          },
          {
            id: 3,
            question: "¿Cómo son elegidos las diputadas, diputados y el Presidente de la República en Costa Rica?",
            options: [
              "Por nombramiento del ejército",
              "A través del voto directo, libre y secreto de la ciudadanía en las urnas",
              "Por herencia familiar o del linaje histórico",
              "Mediante sorteo realizado por la Corte Suprema"
            ],
            correctAnswer: 1,
            explanation: "En Costa Rica rige el sufragio universal directo donde la ciudadanía decide soberanamente en las urnas."
          }
        ]
      },

      // 4. TERCER TEMA: PRINCIPIOS DEMOCRÁTICOS ESENCIALES
      {
        id: "gobierno-principios-democraticos",
        title: "Principios democráticos esenciales",
        type: "content",
        content: "La organización del gobierno en Costa Rica descansa sobre pilares fundamentales de la democracia representativa y participativa: la separación estricta de poderes, el principio de legalidad, la alternancia periódica en el poder (prohibición de la reelección presidencial inmediata), el pluralismo político, la libertad de prensa y el pleno respeto a los derechos humanos fundamentales.",
        cards: [
          { 
            id: 1, 
            title: "Alternancia en el Poder", 
            frontText: "¿Por qué es crucial?", 
            backText: "Evita la perpetuación autoritaria en el gobierno al renovar las autoridades democráticamente." 
          },
          { 
            id: 2, 
            title: "Principio de Legalidad", 
            frontText: "¿Qué limita a los gobernantes?", 
            backText: "Les prohíbe atribuirse facultades no otorgadas expresamente por la ley." 
          }
        ]
      },

      // 5. CUARTO TEMA: SECTOR PÚBLICO DESCENTRALIZADO
      {
        id: "gobierno-sector-descentralizado",
        title: "El Sector Público Descentralizado",
        type: "content",
        content: "Además de los tres poderes tradicionales del Estado, Costa Rica cuenta con una amplia red institucional autónoma y descentralizada creada para garantizar el desarrollo económico y brindar servicios esenciales a la población sin interferencias políticas partidarias directas:\n\n• Instituciones autónomas y semiautónomas: Órganos con personalidad jurídica y patrimonio propio encargados de la salud pública y la seguridad social (como la Caja Costarricense de Seguro Social - CCSS), servicios de energía y telecomunicaciones (como el Instituto Costarricense de Electricidad - ICE), agua potable (AyA) o educación superior pública.\n\• Gobiernos Locales (Municipalidades): Encargados de administrar de forma autónoma los intereses, servicios, obras públicas, patentes y ordenamiento territorial de cada uno de los cantones del país.",
        cards: [
          { 
            id: 1, 
            title: "Instituciones Autónomas", 
            frontText: "¿Cuál es su función (ej. CCSS o ICE)?", 
            backText: "Garantizar servicios públicos esenciales como la salud y la energía con independencia técnica." 
          },
          { 
            id: 2, 
            title: "Gobiernos Locales", 
            frontText: "¿Qué administran las Municipalidades?", 
            backText: "Los servicios, obras públicas, patentes y desarrollo territorial directo de su cantón." 
          }
        ]
      },

      // 📝 6. SEGUNDO QUIZ (AL FINAL)
      {
        id: "quiz-gobierno-2",
        title: "Quiz 2: Principios y Descentralización del Estado",
        type: "quiz",
        quizId: 602,
        questions: [
          {
            id: 1,
            question: "¿Por qué es fundamental la alternancia periódica en el poder dentro de la democracia costarricense?",
            options: [
              "Para evitar la concentración autoritaria y permitir la renovación democrática del gobierno",
              "Porque la ley prohíbe realizar elecciones seguidas",
              "Para cambiar la Constitución cada cuatro años",
              "Para eliminar las instituciones públicas"
            ],
            correctAnswer: 0,
            explanation: "La alternancia garantiza que ningún gobernante o partido permanezca indefinidamente en el poder supremo."
          },
          {
            id: 2,
            question: "Instituciones como la Caja Costarricense de Seguro Social (CCSS) o el Instituto Costarricense de Electricidad (ICE) pertenecen a:",
            options: [
              "El Poder Judicial únicamente",
              "Las empresas privadas transnacionales",
              "El Sector Público Descentralizado de instituciones autónomas",
              "Los concejos de distritos municipales"
            ],
            correctAnswer: 2,
            explanation: "Son instituciones descentralizadas con autonomía para administrar servicios de interés social supremo."
          },
          {
            id: 3,
            question: "¿Cuál es la responsabilidad principal de las Municipalidades o Gobiernos Locales?",
            options: [
              "Dirigir la política exterior y firmar tratados internacionales",
              "Administrar de forma autónoma los intereses, obras y servicios de su respectivo cantón",
              "Aprobar el Presupuesto Nacional de la República",
              "Dictar sentencias penales a delincuentes"
            ],
            correctAnswer: 1,
            explanation: "Las Municipalidades se encargan del gobierno local, velando por el progreso y servicios directos de cada cantón."
          }
        ]
      }
    ]
  }
];

export default materialOriginal;