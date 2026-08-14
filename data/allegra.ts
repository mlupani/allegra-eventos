export interface NavLink {
  href: string
  label: string
}

export interface SocialLink {
  id: 'instagram' | 'facebook' | 'whatsapp'
  label: string
  href: string
}

export interface EventType {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  span: 'hero' | 'tall' | 'wide' | 'square'
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: 'sparkles' | 'palette' | 'utensils' | 'music' | 'clipboard' | 'heart'
}

export interface HowItWorksStep {
  id: string
  title: string
  description: string
}

export interface Testimonial {
  id: string
  quote: string
  attribution: string
  occasion: string
}

export interface SiteConfig {
  name: string
  wordmark: string
  tagline: string
  logo: string
  headline: string
  subheadline: string
  badge: string
  hero: {
    image: string
    imageAlt: string
  }
  about: {
    kicker: string
    title: string
    body: string[]
    image: string
    imageAlt: string
  }
  seo: {
    title: string
    description: string
    url: string
    image: string
    imageAlt: string
    keywords: string[]
  }
  location: {
    label: string
    detail: string
    mapsUrl: string
    embedUrl: string
    lat: number
    lng: number
  }
  whatsapp: {
    phone: string
    defaultMessage: string
    reservationMessage: string
  }
  social: {
    instagram: string
    facebook: string
  }
  nav: NavLink[]
  eventTypes: EventType[]
  gallery: GalleryImage[]
  services: ServiceItem[]
  howItWorks: HowItWorksStep[]
  testimonials: Testimonial[]
}

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '5491124597175'

export const siteConfig: SiteConfig = {
  name: 'Allegra Espacios',
  wordmark: 'allegra',
  tagline: 'espacio para eventos',
  logo: '/images/logo.jpg',
  headline: 'El espacio donde tus momentos se convierten en recuerdos',
  subheadline:
    'Un espacio pensado para celebrar cumpleaños, 15 años, casamientos, eventos corporativos y momentos especiales.',
  badge: 'Eventos sociales y corporativos',
  hero: {
    image: '/images/hero.png',
    imageAlt: 'Allegra Espacios, el salón ambientado para celebrar momentos especiales'
  },
  about: {
    kicker: 'Sobre Allegra',
    title: 'Un lugar para celebrar con calma, belleza y atención',
    body: [
      'Allegra Espacios nace como un entorno pensado para que cada celebración se viva con calidez y sofisticación. Un salón flexible, cuidado y con atmósfera propia, preparado para acompañar momentos que merecen ser recordados.',
      'La propuesta se centra en el espacio, la luz y la experiencia de quienes llegan a celebrar. Esta web es una demostración comercial: los textos, servicios e imágenes se pueden adaptar con la información real del negocio.'
    ],
    image: '/images/salon-interior.jpg',
    imageAlt: 'Interior de Allegra Espacios, con mesas blancas y el salón listo para un evento'
  },
  seo: {
    title: 'Allegra Espacios | Salón de Eventos en Gerli',
    description:
      'Un espacio pensado para celebrar tus momentos especiales. Cumpleaños, 15 años, casamientos, eventos corporativos y más. Allegra Espacios, Tte. Coronel Lafuente 1455, Gerli.',
    url: 'https://allegra-espacios.vercel.app',
    image: '/images/logo.jpg',
    imageAlt: 'Logo de Allegra Espacios',
    keywords: [
      'Allegra Espacios',
      'salón de eventos',
      'salón de eventos Gerli',
      'salón de fiestas Gerli',
      'cumpleaños',
      '15 años',
      'casamientos',
      'eventos corporativos',
      'Buenos Aires',
      'Avellaneda'
    ]
  },
  location: {
    label: 'Tte. Coronel Lafuente 1455, Gerli',
    detail: 'B1869ADU, Provincia de Buenos Aires',
    mapsUrl: 'https://www.google.com.ar/maps/place/Allegra+%22Espacio+para+Eventos%22/@-34.6823028,-58.3681212,19z',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1641!2d-58.3681212!3d-34.6823028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a3333268ebaa49%3A0xfbf09a9a26b64b32!2sAllegra%20%22Espacio%20para%20Eventos%22!5e0!3m2!1ses!2sar',
    lat: -34.6823028,
    lng: -58.3681212
  },
  whatsapp: {
    phone: whatsappPhone,
    defaultMessage:
      'Hola, quiero consultar disponibilidad para un evento en Allegra Espacios.',
    reservationMessage:
      'Hola, vengo desde la web de Allegra Espacios y me gustaría avanzar con una reserva.'
  },
  social: {
    instagram: 'https://www.instagram.com/allegraespacios/',
    facebook: 'https://facebook.com/allegraespacios'
  },
  nav: [
    { href: '#sobre-allegra', label: 'El espacio' },
    { href: '#eventos', label: 'Eventos' },
    { href: '#galeria', label: 'Galería' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#como-funciona', label: 'Cómo funciona' }
  ],
  eventTypes: [
    {
      id: 'cumpleanos',
      title: 'Cumpleaños',
      description: 'Celebraciones íntimas o grandes, con un entorno listo para que el festejo se sienta especial.',
      image: '/images/salon-cumpleanos.jpg',
      imageAlt: 'Cumpleaños temático ambientado en Allegra Espacios'
    },
    {
      id: 'quince',
      title: '15 años',
      description: 'Un escenario elegante para una noche que se recuerda toda la vida.',
      image: '/images/salon-fiesta.jpg',
      imageAlt: 'Pista y luces en Allegra Espacios para una celebración nocturna'
    },
    {
      id: 'casamientos',
      title: 'Casamientos',
      description: 'Un espacio cálido y sofisticado para el brindis, la cena y el after de la ceremonia.',
      image: '/images/salon-interior.jpg',
      imageAlt: 'Salón de Allegra Espacios preparado con mesas para un evento formal'
    },
    {
      id: 'corporativos',
      title: 'Eventos corporativos',
      description: 'Encuentros de empresa, lanzamientos y cenas institucionales con una atmósfera premium.',
      image: '/images/promo-lugar.jpg',
      imageAlt: 'Allegra Espacios, un lugar para eventos inolvidables'
    },
    {
      id: 'especiales',
      title: 'Celebraciones especiales',
      description: 'Aniversarios, baby showers, fiestas temáticas y cualquier momento que merezca un lugar distinto.',
      image: '/images/salon-primer-anio.jpg',
      imageAlt: 'Ambientación especial para un primer año en Allegra Espacios'
    }
  ],
  gallery: [
    {
      id: 'fiesta',
      src: '/images/salon-fiesta.jpg',
      alt: 'Pista, luces y mesas durante una fiesta en Allegra Espacios',
      span: 'hero'
    },
    {
      id: 'interior',
      src: '/images/salon-interior.jpg',
      alt: 'Interior del salón con mesas y sillas blancas',
      span: 'wide'
    },
    {
      id: 'cumpleanos',
      src: '/images/salon-cumpleanos.jpg',
      alt: 'Mesa de dulces y ambientación de cumpleaños en el salón',
      span: 'tall'
    },
    {
      id: 'primer-anio',
      src: '/images/salon-primer-anio.jpg',
      alt: 'Rincón decorado para un primer año en Allegra Espacios',
      span: 'square'
    },
    {
      id: 'conecta-cuatro',
      src: '/images/salon-conecta-cuatro.jpg',
      alt: 'Juego Conecta Cuatro en el espacio de Allegra',
      span: 'tall'
    },
    {
      id: 'promo-lugar',
      src: '/images/promo-lugar.jpg',
      alt: 'Identidad visual de Allegra Espacios',
      span: 'square'
    },
    {
      id: 'promo-recuerdos',
      src: '/images/promo-recuerdos.jpg',
      alt: 'Mensaje de Allegra Espacios sobre los recuerdos de cada evento',
      span: 'wide'
    }
  ],
  services: [
    {
      id: 'espacio',
      title: 'Espacio para eventos',
      description: 'El salón como protagonista: un entorno flexible para distintos formatos de celebración.',
      icon: 'sparkles'
    },
    {
      id: 'ambientacion',
      title: 'Ambientación',
      description: 'Orientación sobre clima, luces y puesta en escena. Contenido demo, editable según el negocio.',
      icon: 'palette'
    },
    {
      id: 'catering',
      title: 'Catering',
      description: 'Posible coordinación gastronómica. No implica un servicio confirmado ni precios publicados.',
      icon: 'utensils'
    },
    {
      id: 'musica',
      title: 'Música',
      description: 'Espacio preparado para DJ o propuestas musicales. A confirmar con el equipo.',
      icon: 'music'
    },
    {
      id: 'organizacion',
      title: 'Organización',
      description: 'Acompañamiento para ordenar fecha, cantidad de invitados y necesidades del evento.',
      icon: 'clipboard'
    },
    {
      id: 'atencion',
      title: 'Atención personalizada',
      description: 'Un trato cercano, pensado para que planificar se sienta simple y cuidado.',
      icon: 'heart'
    }
  ],
  howItWorks: [
    {
      id: 'contar',
      title: 'Contanos qué estás organizando',
      description: 'El tipo de evento, la fecha aproximada y cuántas personas querés recibir.'
    },
    {
      id: 'disponibilidad',
      title: 'Consultamos disponibilidad',
      description: 'El asistente revisa la fecha y te orienta con las opciones posibles.'
    },
    {
      id: 'propuesta',
      title: 'Elegís la propuesta',
      description: 'Ajustamos el espacio y los detalles para que el evento se sienta propio.'
    },
    {
      id: 'reservar',
      title: 'Reservás tu fecha',
      description: 'Confirmás y, si preferís, seguís la conversación por WhatsApp.'
    }
  ],
  testimonials: [
    {
      id: 't1',
      quote: 'El espacio se sintió íntimo y especial. Todo fluyó con naturalidad desde el primer contacto.',
      attribution: 'Testimonio de ejemplo',
      occasion: 'Cumpleaños · para reemplazar'
    },
    {
      id: 't2',
      quote: 'Encontramos un lugar elegante, sin ser frío. Ideal para un evento que pedía calidez y presencia.',
      attribution: 'Testimonio de ejemplo',
      occasion: 'Celebración familiar · para reemplazar'
    },
    {
      id: 't3',
      quote: 'La consulta de disponibilidad fue simple y clara. Transmitió orden y confianza desde el inicio.',
      attribution: 'Testimonio de ejemplo',
      occasion: 'Evento corporativo · para reemplazar'
    }
  ]
}

export const socialLinks: SocialLink[] = [
  { id: 'instagram', label: 'Instagram', href: siteConfig.social.instagram },
  { id: 'facebook', label: 'Facebook', href: siteConfig.social.facebook },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: `https://wa.me/${siteConfig.whatsapp.phone}`
  }
]
