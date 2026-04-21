// app/lib/database.ts
import 'server-only';
import { neon } from '@neondatabase/serverless';
import type {
  Profil,
  Formation,
  Experience,
  CompetenceTechnique,
  CompetenceTechniqueItem,
  CompetenceComportementale,
  Langue,
  CentreInteret,
  Projet
} from '../types';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL manquant dans .env.local');
}

export const sql = neon(process.env.DATABASE_URL);

// ==========================================
// PROFIL
// ==========================================
export async function getProfile(): Promise<Profil> {
  const result = await sql`SELECT * FROM profil WHERE id = 1`;
  return result[0] as Profil;
}

// ==========================================
// FORMATIONS
// ==========================================
export async function getFormations(): Promise<Formation[]> {
  return await sql`
    SELECT id, profil_id, etablissement, description_etablissement, ville, diplome, date_debut, date_fin,
           description, technologies, cours, ordre
    FROM formations
    WHERE profil_id = 1
    ORDER BY ordre ASC
  ` as Formation[];
}

// ==========================================
// EXPÉRIENCES
// ==========================================
export async function getExperiences(): Promise<Experience[]> {
  const result = await sql`
    SELECT 
      e.*,
      COALESCE(
        json_agg(
          json_build_object(
            'id', t.id,
            'experience_id', t.experience_id,
            'description', t.description,
            'ordre', t.ordre
          ) ORDER BY t.ordre
        ) FILTER (WHERE t.id IS NOT NULL),
        '[]'
      ) as taches
    FROM experiences e
    LEFT JOIN taches_experience t ON t.experience_id = e.id
    WHERE e.profil_id = 1
    GROUP BY e.id
    ORDER BY e.ordre ASC
  `;
  return result as Experience[];
}

// ==========================================
// COMPÉTENCES TECHNIQUES
// ==========================================
export async function getCompetencesTechniques(): Promise<CompetenceTechnique[]> {
  const result = await sql`
    SELECT 
      ct.*,
      COALESCE(
        json_agg(
          json_build_object(
            'id', cti.id,
            'competence_id', cti.competence_id,
            'nom', cti.nom,
            'niveau', cti.niveau,
            'ordre', cti.ordre,
            'definition', cti.definition,
            'preuves', cti.preuves,
            'autocritique', cti.autocritique,
            'evolution', cti.evolution
          ) ORDER BY cti.ordre
        ) FILTER (WHERE cti.id IS NOT NULL),
        '[]'
      ) as items
    FROM competences_techniques ct
    LEFT JOIN competences_techniques_items cti ON cti.competence_id = ct.id
    WHERE ct.profil_id = 1
    GROUP BY ct.id
    ORDER BY ct.ordre ASC
  `;
  return result as CompetenceTechnique[];
}

export async function getCompetenceTechniqueItemBySlug(
  slug: string
): Promise<CompetenceTechniqueItem | null> {
  const result = await sql`
    SELECT cti.*
    FROM competences_techniques_items cti
    JOIN competences_techniques ct ON ct.id = cti.competence_id
    WHERE ct.profil_id = 1
      AND LOWER(
        REPLACE(
          TRANSLATE(cti.nom, 'àâäéèêëîïôöùûüç', 'aaaeeeeiioouuuc'),
          ' ', '-'
        )
      ) = ${slug.toLowerCase()}
    LIMIT 1
  `;
  return (result[0] as CompetenceTechniqueItem) ?? null;
}

export async function getCompetencesTechniquesItemsRelated(
  excludeId: number
): Promise<CompetenceTechniqueItem[]> {
  return await sql`
    SELECT cti.*
    FROM competences_techniques_items cti
    JOIN competences_techniques ct ON ct.id = cti.competence_id
    WHERE ct.profil_id = 1 AND cti.id != ${excludeId}
    ORDER BY cti.ordre ASC
  ` as CompetenceTechniqueItem[];
}

// ==========================================
// COMPÉTENCES COMPORTEMENTALES
// ==========================================
export async function getCompetencesComportementales(): Promise<CompetenceComportementale[]> {
  return await sql`
    SELECT * FROM competences_comportementales
    WHERE profil_id = 1
    ORDER BY ordre ASC
  ` as CompetenceComportementale[];
}

export async function getCompetenceComportementaleBySlug(
  slug: string
): Promise<CompetenceComportementale | null> {
  const result = await sql`
    SELECT * FROM competences_comportementales
    WHERE profil_id = 1
      AND LOWER(
        REPLACE(
          TRANSLATE(nom, 'àâäéèêëîïôöùûüç', 'aaaeeeeiioouuuc'),
          ' ', '-'
        )
      ) = ${slug.toLowerCase()}
    LIMIT 1
  `;
  return (result[0] as CompetenceComportementale) ?? null;
}

// ==========================================
// LANGUES
// ==========================================
export async function getLangues(): Promise<Langue[]> {
  return await sql`
    SELECT * FROM langues
    WHERE profil_id = 1
    ORDER BY ordre ASC
  ` as Langue[];
}

// ==========================================
// CENTRES D'INTÉRÊT
// ==========================================
export async function getCentresInteret(): Promise<CentreInteret[]> {
  return await sql`
    SELECT * FROM centres_interet
    WHERE profil_id = 1
    ORDER BY ordre ASC
  ` as CentreInteret[];
}

// ==========================================
// PROJETS
// ==========================================

// Récupère tous les projets
export async function getProjets(): Promise<Projet[]> {
  return await sql`
      SELECT * FROM projets
      WHERE profil_id = 1
      ORDER BY ordre ASC
  ` as Projet[];
}

export async function getProjetBySlug(slug: string): Promise<Projet | null> {
  try {
    const result = await sql`
      SELECT * FROM projets
      WHERE profil_id = 1
        AND LOWER(nom) = ${slug.toLowerCase()}
      LIMIT 1
    `;
    return (result[0] as Projet) ?? null;
  } catch {
    return null;
  }
}

// ==========================================
// FONCTION GLOBALE (récupère tout)
// ==========================================
export async function getAllPortfolioData() {
  const [
    profil,
    formations,
    experiences,
    competences_techniques,
    competences_comportementales,
    langues,
    centres_interet
  ] = await Promise.all([
    getProfile(),
    getFormations(),
    getExperiences(),
    getCompetencesTechniques(),
    getCompetencesComportementales(),
    getLangues(),
    getCentresInteret()
  ]);

  return {
    profil,
    formations,
    experiences,
    competences_techniques,
    competences_comportementales,
    langues,
    centres_interet
  };
}