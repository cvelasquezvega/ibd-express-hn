export type Book = {
  id: string;
  slug: string;
  title: string;
  author: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  publisher: string;
  badge?: "Más vendido" | "Novedad" | "Recomendado" | "Premiado";
  language?: string;
  pages?: number;
  format?: "Tapa blanda" | "Tapa dura";
  year?: number;
  isbn?: string;
  description?: string;
  c1: string;
  c2: string;
};

export const books: Book[] = [
  { id: "1", slug: "la-cartografia-del-silencio", title: "La cartografía del silencio", author: "Adriana Vélez", price: 24.9, oldPrice: 29.9, rating: 4.8, reviews: 1284, category: "Ficción literaria", publisher: "Nordsea Editorial", badge: "Más vendido", language: "Español", pages: 312, format: "Tapa blanda", year: 2024, isbn: "978-84-1234-001-2", description: "Una novela introspectiva sobre el silencio como territorio. Adriana Vélez teje un mapa íntimo de una protagonista que regresa al pueblo costero donde aprendió a callar.", c1: "#e85d3a", c2: "#a8341c" },
  { id: "2", slug: "fundamentos-cognicion-cuantica", title: "Fundamentos de cognición cuántica", author: "Dr. Henrik Sørensen", price: 48.0, rating: 4.9, reviews: 312, category: "Académico", publisher: "Cambridge Press", badge: "Recomendado", language: "Español", pages: 540, format: "Tapa dura", year: 2023, isbn: "978-0-521-99887-1", description: "Un compendio académico esencial sobre los modelos cuánticos aplicados a la cognición.", c1: "#7c4dff", c2: "#3d1f99" },
  { id: "3", slug: "cartas-desde-una-costa-lejana", title: "Cartas desde una costa lejana", author: "Maya Okafor", price: 19.5, rating: 4.7, reviews: 892, category: "Ensayo", publisher: "Atlas & Owl", language: "Español", pages: 224, format: "Tapa blanda", year: 2024, isbn: "978-1-9876-3210-9", description: "Una colección de ensayos que circulan entre lo personal y lo geopolítico.", c1: "#f4b942", c2: "#a07419" },
  { id: "4", slug: "la-arquitectura-de-la-memoria", title: "La arquitectura de la memoria", author: "Lucas Marín", price: 32.0, oldPrice: 38.0, rating: 4.9, reviews: 2104, category: "No ficción", publisher: "Meridian House", badge: "Premiado", language: "Español", pages: 388, format: "Tapa dura", year: 2023, isbn: "978-84-3344-110-5", description: "Premiado en la Feria de Frankfurt, un libro que explora cómo construimos recuerdos.", c1: "#2bb673", c2: "#0f5c39" },
  { id: "5", slug: "mareas-del-mar-interior", title: "Mareas del mar interior", author: "Saoirse Caldwell", price: 22.0, rating: 4.6, reviews: 567, category: "Poesía", publisher: "Lantern Press", badge: "Novedad", language: "Español", pages: 142, format: "Tapa blanda", year: 2025, isbn: "978-1-2200-4477-3", description: "Poesía breve sobre el mar como metáfora del yo.", c1: "#3a8dde", c2: "#1c4a85" },
  { id: "6", slug: "manual-cartopolitica-moderna", title: "Manual de cartopolítica moderna", author: "Prof. Yuki Tanaka", price: 56.5, rating: 4.8, reviews: 198, category: "Académico", publisher: "Tokyo University Press", language: "Español", pages: 612, format: "Tapa dura", year: 2024, isbn: "978-4-99001-002-4", description: "Manual universitario sobre la cartografía como herramienta política.", c1: "#d9344b", c2: "#7a1525" },
  { id: "7", slug: "tierra-salvaje-fuego-lento", title: "Tierra salvaje, fuego lento", author: "Élise Beaumont", price: 28.0, rating: 4.7, reviews: 743, category: "Cocina", publisher: "Petite Maison", badge: "Novedad", language: "Español", pages: 256, format: "Tapa dura", year: 2025, isbn: "978-2-7654-3333-1", description: "Recetas de fuego lento y producto estacional desde la Provenza.", c1: "#ff8a3d", c2: "#a04619" },
  { id: "8", slug: "atlas-ciudades-olvidadas", title: "El atlas de las ciudades olvidadas", author: "Rashid al-Hassan", price: 42.0, oldPrice: 49.0, rating: 4.9, reviews: 1876, category: "Historia", publisher: "Old World Editions", badge: "Más vendido", language: "Español", pages: 420, format: "Tapa dura", year: 2023, isbn: "978-1-4480-7799-2", description: "Un atlas ilustrado de 47 ciudades borradas del mapa.", c1: "#8b6f3d", c2: "#3e3220" },
  { id: "9", slug: "el-cuaderno-de-los-nombres", title: "El cuaderno de los nombres", author: "Belén Lilienthal", price: 18.5, rating: 4.5, reviews: 423, category: "Ficción literaria", publisher: "Río Editorial", badge: "Novedad", language: "Español", pages: 198, format: "Tapa blanda", year: 2025, isbn: "978-987-1234-55-7", c1: "#e85d8a", c2: "#a02156" },
  { id: "10", slug: "1177-ac-civilizacion", title: "1177 a.C.: la civilización", author: "Eric H. Cline", price: 26.95, oldPrice: 32.0, rating: 4.8, reviews: 3210, category: "Historia", publisher: "Crítica", badge: "Más vendido", language: "Español", pages: 360, format: "Tapa blanda", year: 2022, isbn: "978-84-9199-321-1", c1: "#6b3a1a", c2: "#3a1d0a" },
  { id: "11", slug: "democracia-gobiernos-de-facto", title: "Democracia y gobiernos de facto", author: "Juan Córdenas", price: 28.7, rating: 4.6, reviews: 145, category: "Filosofía", publisher: "Sirena Negra", language: "Español", pages: 290, format: "Tapa blanda", year: 2024, isbn: "978-958-7710-44-3", c1: "#d99030", c2: "#7a4d10" },
  { id: "12", slug: "drawing-down-the-moon", title: "Dibujando la luna", author: "Radcliffe G. Edmonds III", price: 36.15, rating: 4.7, reviews: 88, category: "Académico", publisher: "Princeton University Press", language: "Español", pages: 480, format: "Tapa dura", year: 2023, isbn: "978-0-691-15693-3", c1: "#1b2a5c", c2: "#0a1230" },
];

export const collections = [
  { tag: "Editorial", title: "Clásicos modernos reimaginados", count: "248 títulos", description: "Literatura seleccionada en ediciones restauradas, impresas bajo demanda en 14 idiomas." },
  { tag: "Académico", title: "Catálogo universitario", count: "12.400 títulos", description: "Directo de 86 editoriales universitarias. Precios especiales para adopción en curso." },
  { tag: "Descubrimiento", title: "Voces nuevas, primeras ediciones", count: "92 debuts", description: "Autores emergentes de sellos independientes. Ejemplares firmados disponibles." },
];

export const categories = [
  { name: "Ficción literaria", count: "12.840" },
  { name: "Académico y textos", count: "48.210" },
  { name: "Historia y biografía", count: "9.320" },
  { name: "Filosofía", count: "4.118" },
  { name: "Arte y diseño", count: "6.742" },
  { name: "Ciencia y tecnología", count: "11.094" },
  { name: "Poesía", count: "2.486" },
  { name: "Cocina y bienestar", count: "5.310" },
];

export const publishers = [
  "Cambridge Press", "Nordsea Editorial", "Meridian House", "Atlas & Owl", "Lantern Press",
  "Tokyo University Press", "Petite Maison", "Old World Editions", "Hesperus Books", "Río Editorial",
];

export const idiomas = ["Español", "Inglés", "Francés", "Alemán", "Italiano", "Portugués"];
export const formatos = ["Tapa blanda", "Tapa dura"];
export const ordenes = ["Más relevantes", "Más vendidos", "Novedades", "Precio: menor a mayor", "Precio: mayor a menor", "Mejor valorados"];

export function getBookBySlug(slug: string) {
  return books.find(b => b.slug === slug);
}
