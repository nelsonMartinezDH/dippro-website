// hooks/useAcademicPrograms.ts
import { useState, useEffect } from 'react';
import { academicProgramsService, AcademicProgram, ProgramDetails } from '@/services/sections/for-companies/academic-programs-component/academicProgramsService';

interface UseAcademicProgramsReturn {
  programs: AcademicProgram[];
  programDetails: Record<string, ProgramDetails>;
  loading: boolean;
  error: string | null;
  searchPrograms: (searchTerm: string) => AcademicProgram[];
  getFeaturedPrograms: (featuredList: string[]) => AcademicProgram[];
  getProgramDetails: (programName: string) => ProgramDetails | null;
}

export const useAcademicPrograms = (): UseAcademicProgramsReturn => {
  const [programs, setPrograms] = useState<AcademicProgram[]>([]);
  const [programDetails, setProgramDetails] = useState<Record<string, ProgramDetails>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeService = async () => {
      try {
        setLoading(true);
        setError(null);
        
        await academicProgramsService.initialize();
        
        setPrograms(academicProgramsService.getPrograms());
        
        setProgramDetails({});
        
      } catch (err) {
        setError('Error al cargar los programas académicos');
        console.error('Error initializing academic programs:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeService();
  }, []);

  const searchPrograms = (searchTerm: string): AcademicProgram[] => {
    return academicProgramsService.searchPrograms(searchTerm);
  };

  const getFeaturedPrograms = (featuredList: string[]): AcademicProgram[] => {
    return academicProgramsService.getFeaturedPrograms(featuredList);
  };

  const getProgramDetails = (programName: string): ProgramDetails | null => {
    return academicProgramsService.getProgramDetails(programName);
  };

  return {
    programs,
    programDetails,
    loading,
    error,
    searchPrograms,
    getFeaturedPrograms,
    getProgramDetails,
  };
};