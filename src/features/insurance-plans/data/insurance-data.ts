import { InsuranceCompany } from "../types";
import AXALogo from '../../../assets/logos/axa.svg'
import GNPLogo from '../../../assets/logos/gnp.svg'
import MetlifeLogo from '../../../assets/logos/metlife.svg'

export const insuranceCompanies: InsuranceCompany[] = [
  {
    id: 1,
    uuid: "123e4567-e89b-12d3-a456-426614174000",
    name: "Axa",
    logo: AXALogo,
    description: "Compañía líder en seguros de salud",
    status: "ACTIVE",
    createdAt: new Date("2024-09-27T10:00:00Z"),
    updatedAt: new Date("2024-09-27T10:00:00Z"),
    plans: [
      {
        id: 1,
        uuid: "223e4567-e89b-12d3-a456-426614174001",
        name: "Esencial",
        companyId: 1,
        description: "Plan básico con cobertura esencial",
        sumInsured: 5000000,
        deductible: 10000,
        coInsurance: 0.20,
        coInsuranceCap: 50000,
        hospitalTier: "BASIC",
        medicalFeeSchedule: "BASIC",
        additionalClauses: {
          internationalCoverage: false,
          maternityWaitingPeriod: 12
        },
        benefits: {
          dentalCoverage: true,
          opticalCoverage: {
            examinations: true,
            lenses: 200,
            frames: 150
          }
        },
        customizableOptions: {
          deductibleOptions: [8000, 10000, 12000],
          coInsuranceOptions: [0.20, 0.25, 0.30]
        },
        status: "ACTIVE",
        createdAt: new Date("2024-09-27T10:00:00Z"),
        updatedAt: new Date("2024-09-27T10:00:00Z")
      },
      {
        id: 2,
        uuid: "323e4567-e89b-12d3-a456-426614174002",
        name: "Protegido",
        companyId: 1,
        description: "Plan intermedio con mayor cobertura",
        sumInsured: 10000000,
        deductible: 7500,
        coInsurance: 0.15,
        coInsuranceCap: 75000,
        hospitalTier: "INTERMEDIATE",
        medicalFeeSchedule: "INTERMEDIATE",
        additionalClauses: {
          internationalCoverage: true,
          maternityWaitingPeriod: 10
        },
        benefits: {
          dentalCoverage: true,
          opticalCoverage: {
            examinations: true,
            lenses: 300,
            frames: 200
          }
        },
        customizableOptions: {
          deductibleOptions: [5000, 7500, 10000],
          coInsuranceOptions: [0.15, 0.20, 0.25]
        },
        status: "ACTIVE",
        createdAt: new Date("2024-09-27T11:00:00Z"),
        updatedAt: new Date("2024-09-27T11:00:00Z")
      },
      {
        id: 3,
        uuid: "423e4567-e89b-12d3-a456-426614174003",
        name: "Blindado",
        companyId: 1,
        description: "Plan premium con cobertura completa",
        sumInsured: 20000000,
        deductible: 5000,
        coInsurance: 0.10,
        coInsuranceCap: 100000,
        hospitalTier: "EXECUTIVE",
        medicalFeeSchedule: "HIGH",
        additionalClauses: {
          internationalCoverage: true,
          maternityWaitingPeriod: 0
        },
        benefits: {
          dentalCoverage: true,
          opticalCoverage: {
            examinations: true,
            lenses: 400,
            frames: 250
          }
        },
        customizableOptions: {
          deductibleOptions: [3000, 5000, 7000],
          coInsuranceOptions: [0.10, 0.15, 0.20]
        },
        status: "ACTIVE",
        createdAt: new Date("2024-09-27T12:00:00Z"),
        updatedAt: new Date("2024-09-27T12:00:00Z")
      }
    ]
  },
  {
    id: 2,
    uuid: "523e4567-e89b-12d3-a456-426614174004",
    name: "Seguros Beta",
    logo: GNPLogo,
    description: "Innovación en seguros de salud",
    status: "ACTIVE",
    createdAt: new Date("2024-09-28T10:00:00Z"),
    updatedAt: new Date("2024-09-28T10:00:00Z"),
    plans: [
      {
        id: 4,
        uuid: "623e4567-e89b-12d3-a456-426614174005",
        name: "Esencial",
        companyId: 2,
        description: "Cobertura básica a precio accesible",
        sumInsured: 5500000,
        deductible: 9000,
        coInsurance: 0.18,
        coInsuranceCap: 55000,
        hospitalTier: "BASIC",
        medicalFeeSchedule: "BASIC",
        additionalClauses: {
          internationalCoverage: false,
          maternityWaitingPeriod: 12
        },
        benefits: {
          dentalCoverage: true,
          opticalCoverage: {
            examinations: true,
            lenses: 180,
            frames: 120
          }
        },
        customizableOptions: {
          deductibleOptions: [7000, 9000, 11000],
          coInsuranceOptions: [0.18, 0.23, 0.28]
        },
        status: "ACTIVE",
        createdAt: new Date("2024-09-28T10:00:00Z"),
        updatedAt: new Date("2024-09-28T10:00:00Z")
      },
      {
        id: 5,
        uuid: "723e4567-e89b-12d3-a456-426614174006",
        name: "Protegido",
        companyId: 2,
        description: "Protección integral para ti y tu familia",
        sumInsured: 11000000,
        deductible: 6500,
        coInsurance: 0.14,
        coInsuranceCap: 80000,
        hospitalTier: "INTERMEDIATE",
        medicalFeeSchedule: "INTERMEDIATE",
        additionalClauses: {
          internationalCoverage: true,
          maternityWaitingPeriod: 9
        },
        benefits: {
          dentalCoverage: true,
          opticalCoverage: {
            examinations: true,
            lenses: 320,
            frames: 220
          }
        },
        customizableOptions: {
          deductibleOptions: [4500, 6500, 8500],
          coInsuranceOptions: [0.14, 0.19, 0.24]
        },
        status: "ACTIVE",
        createdAt: new Date("2024-09-28T11:00:00Z"),
        updatedAt: new Date("2024-09-28T11:00:00Z")
      },
      {
        id: 6,
        uuid: "823e4567-e89b-12d3-a456-426614174007",
        name: "Blindado",
        companyId: 2,
        description: "Máxima cobertura y beneficios exclusivos",
        sumInsured: 22000000,
        deductible: 4000,
        coInsurance: 0.09,
        coInsuranceCap: 110000,
        hospitalTier: "EXECUTIVE",
        medicalFeeSchedule: "HIGH",
        additionalClauses: {
          internationalCoverage: true,
          maternityWaitingPeriod: 0
        },
        benefits: {
          dentalCoverage: true,
          opticalCoverage: {
            examinations: true,
            lenses: 450,
            frames: 300
          }
        },
        customizableOptions: {
          deductibleOptions: [2000, 4000, 6000],
          coInsuranceOptions: [0.09, 0.14, 0.19]
        },
        status: "ACTIVE",
        createdAt: new Date("2024-09-28T12:00:00Z"),
        updatedAt: new Date("2024-09-28T12:00:00Z")
      }
    ]
  },
  {
    id: 3,
    uuid: "923e4567-e89b-12d3-a456-426614174008",
    name: "Seguros Gamma",
    logo: MetlifeLogo,
    description: "Seguros personalizados para cada necesidad",
    status: "ACTIVE",
    createdAt: new Date("2024-09-29T10:00:00Z"),
    updatedAt: new Date("2024-09-29T10:00:00Z"),
    plans: [
      {
        id: 7,
        uuid: "a23e4567-e89b-12d3-a456-426614174009",
        name: "Esencial",
        companyId: 3,
        description: "Cobertura esencial a tu medida",
        sumInsured: 4800000,
        deductible: 11000,
        coInsurance: 0.22,
        coInsuranceCap: 48000,
        hospitalTier: "BASIC",
        medicalFeeSchedule: "BASIC",
        additionalClauses: {
          internationalCoverage: false,
          maternityWaitingPeriod: 12
        },
        benefits: {
          dentalCoverage: true,
          opticalCoverage: {
            examinations: true,
            lenses: 160,
            frames: 100
          }
        },
        customizableOptions: {
          deductibleOptions: [9000, 11000, 13000],
          coInsuranceOptions: [0.22, 0.27, 0.32]
        },
        status: "ACTIVE",
        createdAt: new Date("2024-09-29T10:00:00Z"),
        updatedAt: new Date("2024-09-29T10:00:00Z")
      },
      {
        id: 8,
        uuid: "b23e4567-e89b-12d3-a456-426614174010",
        name: "Protegido",
        companyId: 3,
        description: "Protección completa para tu tranquilidad",
        sumInsured: 9500000,
        deductible: 8000,
        coInsurance: 0.16,
        coInsuranceCap: 70000,
        hospitalTier: "INTERMEDIATE",
        medicalFeeSchedule: "INTERMEDIATE",
        additionalClauses: {
          internationalCoverage: true,
          maternityWaitingPeriod: 10
        },
        benefits: {
          dentalCoverage: true,
          opticalCoverage: {
            examinations: true,
            lenses: 280,
            frames: 180
          }
        },
        customizableOptions: {
          deductibleOptions: [6000, 8000, 10000],
          coInsuranceOptions: [0.16, 0.21, 0.26]
        },
        status: "ACTIVE",
        createdAt: new Date("2024-09-29T11:00:00Z"),
        updatedAt: new Date("2024-09-29T11:00:00Z")
      },
      {
        id: 9,
        uuid: "c23e4567-e89b-12d3-a456-426614174011",
        name: "Blindado",
        companyId: 3,
        description: "La mejor protección sin límites",
        sumInsured: 19000000,
        deductible: 6000,
        coInsurance: 0.11,
        coInsuranceCap: 95000,
        hospitalTier: "EXECUTIVE",
        medicalFeeSchedule: "HIGH",
        additionalClauses: {
          internationalCoverage: true,
          maternityWaitingPeriod: 0
        },
        benefits: {
          dentalCoverage: true,
          opticalCoverage: {
            examinations: true,
            lenses: 380,
            frames: 230
          }
        },
        customizableOptions: {
          deductibleOptions: [4000, 6000, 8000],
          coInsuranceOptions: [0.11, 0.16, 0.21]
        },
        status: "ACTIVE",
        createdAt: new Date("2024-09-29T12:00:00Z"),
        updatedAt: new Date("2024-09-29T12:00:00Z")
      }
    ]
  }
];