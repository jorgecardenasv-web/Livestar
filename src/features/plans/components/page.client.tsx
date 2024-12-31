'use client'

import { useState } from 'react'

import { DollarSign, Percent, Building2, FileText } from 'lucide-react'
import { TextInput } from '@/shared/components/ui/text-input'

export default function InsurancePlanForm() {
  const [costosPorEdad, setCostosPorEdad] = useState(
    Array.from({ length: 65 }, (_, i) => ({ edad: i, costo: 0 }))
  )
  const [deducibles, setDeducibles] = useState([
    { nivel: 'A', deducible: 0 },
    { nivel: 'B', deducible: 0 },
    { nivel: 'C', deducible: 0 },
    { nivel: 'D', deducible: 0 }
  ])

  async function handleSubmit(formData: FormData) {
    formData.append('costosPorEdad', JSON.stringify(costosPorEdad))
    formData.append('deducibles', JSON.stringify(deducibles))
  }

  return (
    <form action={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <TextInput
        name="name"
        label="Nombre del Plan"
        icon={<FileText className="w-4 h-4 text-gray-500" />}
        placeholder="Ingrese nombre del plan"
        required
      />

      <TextInput
        name="companyId"
        label="Compañía"
        type="number"
        icon={<Building2 className="w-4 h-4 text-gray-500" />}
        placeholder="ID de la compañía"
        required
      />

      <TextInput
        name="sumInsured"
        label="Suma Asegurada"
        type="number"
        icon={<DollarSign className="w-4 h-4 text-gray-500" />}
        placeholder="Ingrese suma asegurada"
        required
      />

      <TextInput
        name="coInsurance"
        label="Coaseguro"
        type="number"
        icon={<Percent className="w-4 h-4 text-gray-500" />}
        step="0.01"
        min="0"
        max="1"
        placeholder="Ej: 0.10"
        required
      />

      <TextInput
        name="coInsuranceCap"
        label="Tope de Coaseguro"
        type="number"
        icon={<DollarSign className="w-4 h-4 text-gray-500" />}
        placeholder="Ingrese tope de coaseguro"
      />

      <button 
        type="submit"
        className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
      >
        Crear Plan
      </button>
    </form>
  )
}
