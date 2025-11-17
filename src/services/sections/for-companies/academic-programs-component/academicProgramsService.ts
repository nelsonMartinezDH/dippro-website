// services/academicProgramsService.ts
export interface AcademicProgram {
  program: string;
  faculty: string;
  description: string;
  skills: string[];
  featured?: boolean;
}

export interface Accreditation {
  type: string;
  entity: string;
  resolution?: string;
  year?: string;
  validity: string;
}

export interface OccupationalArea {
  area: string;
  description: string;
}

export interface LearningOutcome {
  code: string;
  description: string;
}

export interface ContactInfo {
  director: string;
  email: string;
  phone: string;
  location: string;
}

export interface ProgramDetails {
  description: string;
  accreditations: Accreditation[];
  mission: string;
  professionalProfile: string;
  occupationalProfile: OccupationalArea[];
  learningOutcomes: LearningOutcome[];
  contact: ContactInfo;
  qualifiedRegistry: {
    resolution: string;
    validity: string;
  };
}

class AcademicProgramsService {
  private programs: AcademicProgram[] = [];
  private programDetails: Record<string, ProgramDetails> = {};
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Cargar datos de forma asíncrona
      const [programsData, detailsData] = await Promise.all([
        import('@/../public/data/for-companies/academic-programs-component/academic-programs.json'),
        import('@/services/sections/for-companies/data/programDetails')
      ]);
      
      this.programs = programsData.default;
      this.programDetails = detailsData.programDetails;
      this.initialized = true;
      
      console.log('Academic programs service initialized successfully');
    } catch (error) {
      console.error('Error initializing academic programs service:', error);
      throw error;
    }
  }

  getPrograms(): AcademicProgram[] {
    if (!this.initialized) {
      throw new Error('Service not initialized. Call initialize() first.');
    }
    return this.programs;
  }

  getProgramDetails(programName: string): ProgramDetails | null {
    if (!this.initialized) {
      throw new Error('Service not initialized. Call initialize() first.');
    }
    return this.programDetails[programName] || null;
  }

  searchPrograms(searchTerm: string): AcademicProgram[] {
    if (!this.initialized) return [];
    
    if (!searchTerm.trim()) return [];

    const term = searchTerm.toLowerCase();
    return this.programs.filter(program =>
      program.program.toLowerCase().includes(term) ||
      program.faculty.toLowerCase().includes(term) ||
      program.skills.some(skill => skill.toLowerCase().includes(term))
    );
  }

  getFeaturedPrograms(featuredList: string[]): AcademicProgram[] {
    if (!this.initialized) return [];
    
    return this.programs.filter(program => 
      featuredList.includes(program.program)
    );
  }

  getAllProgramNames(): string[] {
    if (!this.initialized) return [];
    return this.programs.map(program => program.program);
  }

  isInitialized(): boolean {
    return this.initialized;
  }
}

export const academicProgramsService = new AcademicProgramsService();