import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "Admin" | "Production Head" | "Dept Manager" | "Karigar" | "QC" | "User";

export type JobStage = "Created" | "Issued" | "In Progress" | "Returned" | "Completed";

interface User {
  username: string;
  role: UserRole;
}

export interface DepartmentAllocation {
  id: string;
  dept: string;
  plannedWeight: string;
  allowedWastage: string;
  issuedWeight?: number;
  returnedWeight?: number;
  status?: "Pending" | "Issued" | "Returned" | "Completed";
  karigarAssigned?: string;
  meltingType?: string;
  expectedReturn?: string;
  scrapExpected?: string;
  authorizedBy?: string;
  returnAttempts?: ReturnAttempt[];
}

export interface ReturnAttempt {
  attemptDate: Date;
  finishedPartsWeight: string;
  scrapWeight: string;
  dustWeight: string;
  metalLoss: string;
  recovery: number;
  shortage: number;
}

export interface Job {
  jobId: string;
  orderNo: string;
  designCode: string;
  customer: string;
  totalWeight: string;
  metalType: string;
  departments: DepartmentAllocation[];
  stage: JobStage;
  issuedVia?: "karigar" | "department";
  createdAt: Date;
  updatedAt: Date;
}

export interface ProcurementEntry {
  serialNo: string;
  customerName: string;
  invoiceNumber: string;
  grossWeight: string;
  purity: string;
  storageLocation: string;
  date: string;
  assayFileName: string | null;
  assayFileUrl: string | null;
}

export interface ConversionEntry {
  id: string;
  serialNo: string;
  timestamp: string;
  batchNumber: string;
  productionPlan: string;
  targetKarat: string;
  inputWeight: string;
  purity: string;
  outputWeight: string;
  expectedOutput: string;
  lossWeight: string;
  lossPercent: string;
  date: string;
}

interface AppContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  stockData: StockData;
  updateStock: (updates: Partial<StockData>) => void;
  jobs: Job[];
  addJob: (job: Job) => void;
  updateJob: (jobId: string, updates: Partial<Job>) => void;
  getJobByOrderNo: (orderNo: string) => Job | undefined;
  getJobById: (jobId: string) => Job | undefined;
  procurementEntries: ProcurementEntry[];
  addProcurementEntry: (entry: ProcurementEntry) => void;
  conversionEntries: ConversionEntry[];
  addConversionEntry: (entry: ConversionEntry) => void;
}

interface StockData {
  stock24K: number;
  stock24K_999: number;  // 99.9% purity
  stock24K_995: number;  // 99.50% purity
  stock22K: number;
  stock20K: number;
  stock18K: number;
  scrapBalance: number;
  conversionLoss: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Version for localStorage data - increment this to force a reset
const STORAGE_VERSION = "3.1"; // Bumped for ConversionEntry interface change

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Hard Reset logic: clear everything if version doesn't match
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentVersion = localStorage.getItem('erp_version');
      if (currentVersion !== STORAGE_VERSION) {
        localStorage.clear();
        localStorage.setItem('erp_version', STORAGE_VERSION);
        window.location.reload();
      }
    }
  }, []);

  // Initialize stockData from localStorage or use defaults
  const [stockData, setStockData] = useState<StockData>(() => {
    if (typeof window !== 'undefined') {
      const savedStock = localStorage.getItem('erp_stock_data');
      if (savedStock) {
        try {
          const parsed = JSON.parse(savedStock);
          // Ensure new fields exist and clamp negatives to 0
          return {
            stock24K: Math.max(0, parsed.stock24K || 0),
            stock24K_999: Math.max(0, parsed.stock24K_999 || 0),
            stock24K_995: Math.max(0, parsed.stock24K_995 || 0),
            stock22K: Math.max(0, parsed.stock22K || 0),
            stock20K: Math.max(0, parsed.stock20K || 0),
            stock18K: Math.max(0, parsed.stock18K || 0),
            scrapBalance: Math.max(0, parsed.scrapBalance || 0),
            conversionLoss: parsed.conversionLoss || 0,
          };
        } catch (e) {
          console.error('Error parsing stock data:', e);
        }
      }
    }
    return {
      stock24K: 0,
      stock24K_999: 0,
      stock24K_995: 0,
      stock22K: 0,
      stock20K: 0,
      stock18K: 0,
      scrapBalance: 0,
      conversionLoss: 0,
    };
  });

  // Initialize jobs from localStorage or use empty array
  const [jobs, setJobs] = useState<Job[]>(() => {
    if (typeof window !== 'undefined') {
      const savedJobs = localStorage.getItem('erp_jobs');
      if (savedJobs) {
        try {
          const parsedJobs = JSON.parse(savedJobs);
          return parsedJobs.map((job: any) => ({
            ...job,
            createdAt: new Date(job.createdAt),
            updatedAt: new Date(job.updatedAt),
          }));
        } catch (e) { console.error('Error parsing jobs data:', e); }
      }
    }
    return [];
  });

  // Initialize procurementEntries from localStorage or use defaults
  const [procurementEntries, setProcurementEntries] = useState<ProcurementEntry[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('erp_procurement_entries');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) { console.error('Error parsing procurement entries:', e); }
      }
    }
    // Return empty array by default if none exist
    return [];
  });

  // Initialize conversionEntries from localStorage
  const [conversionEntries, setConversionEntries] = useState<ConversionEntry[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('erp_conversion_entries');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) { console.error('Error parsing conversion entries:', e); }
      }
    }
    return [];
  });

  // Save stockData to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('erp_stock_data', JSON.stringify(stockData));
    }
  }, [stockData]);

  // Save jobs to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('erp_jobs', JSON.stringify(jobs));
    }
  }, [jobs]);

  // Save procurementEntries to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('erp_procurement_entries', JSON.stringify(procurementEntries));
    }
  }, [procurementEntries]);

  // Save conversionEntries to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('erp_conversion_entries', JSON.stringify(conversionEntries));
    }
  }, [conversionEntries]);

  const login = (username: string, password: string): boolean => {
    // Mock authentication per requirements
    if (username === "admin" && password === "admin123") {
      setUser({ username, role: "Admin" });
      return true;
    }
    if (username === "user" && password === "user123") {
      setUser({ username, role: "User" });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateStock = (updates: Partial<StockData>) => {
    setStockData((prev) => {
      const merged = { ...prev, ...updates };
      // Clamp all stock values to minimum 0 — stock can never go negative
      return {
        ...merged,
        stock24K: Math.max(0, merged.stock24K),
        stock24K_999: Math.max(0, merged.stock24K_999),
        stock24K_995: Math.max(0, merged.stock24K_995),
        stock22K: Math.max(0, merged.stock22K),
        stock20K: Math.max(0, merged.stock20K),
        stock18K: Math.max(0, merged.stock18K),
        scrapBalance: Math.max(0, merged.scrapBalance),
      };
    });
  };

  const addJob = (job: Job) => {
    setJobs((prev) => [...prev, job]);
  };

  const updateJob = (jobId: string, updates: Partial<Job>) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.jobId === jobId) {
          return { ...job, ...updates, updatedAt: new Date() };
        }
        return job;
      })
    );
  };

  const getJobByOrderNo = (orderNo: string) => {
    return jobs.find((job) => job.orderNo === orderNo);
  };

  const getJobById = (jobId: string) => {
    return jobs.find((job) => job.jobId === jobId);
  };

  const addProcurementEntry = (entry: ProcurementEntry) => {
    setProcurementEntries(prev => [entry, ...prev]);
  };

  const addConversionEntry = (entry: ConversionEntry) => {
    setConversionEntries(prev => [entry, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        stockData,
        updateStock,
        jobs,
        addJob,
        updateJob,
        getJobByOrderNo,
        getJobById,
        procurementEntries,
        addProcurementEntry,
        conversionEntries,
        addConversionEntry,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    // During development, hot reload might temporarily cause this
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      console.warn("useApp called outside AppProvider - returning safe defaults");
      // Return a dummy context to prevent crash during HMR
      return {
        user: null,
        login: () => false,
        logout: () => { },
        stockData: {
          stock24K: 0,
          stock24K_999: 0,
          stock24K_995: 0,
          stock22K: 0,
          stock20K: 0,
          stock18K: 0,
          scrapBalance: 0,
          conversionLoss: 0,
        },
        updateStock: () => { },
        jobs: [],
        addJob: () => { },
        updateJob: () => { },
        getJobByOrderNo: () => undefined,
        getJobById: () => undefined,
        procurementEntries: [],
        addProcurementEntry: () => { },
        conversionEntries: [],
        addConversionEntry: () => { },
      } as AppContextType;
    }
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};